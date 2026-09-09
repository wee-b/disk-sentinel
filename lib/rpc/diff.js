/**
 * 两份历史报告的差量对比（增长/缩小/新增/消失目录 + 全量变化明细）。
 *
 * 差量结果自动持久化为三件套（工作区目录，滚动保留最近 DIFF_KEEP 份）：
 * - .md              —— 供会话模型与用户阅读（含「AI 分析指引」章节，聊天框只需 @ 引用）
 * - .json            —— 差量摘要（基准/目标报告信息 + 各榜单 + changesCount）
 * - .changes.json.gz —— gzip 压缩的全量变化明细（变化树逐层下钻用）
 *
 * 同一对报告重复对比时直接复用已有差量（扫描报告不可变，
 * 同对差量结果确定相同，无需重新解压计算）。
 *
 * @module @dsh-plugin/disk-sentinel/rpc/diff
 */
import { readFile, writeFile, readdir, rm, stat } from "node:fs/promises";
import { join } from "node:path";
import { gzipSync, gunzipSync } from "node:zlib";
import { ensureWorkspaceDir } from "./workspace.js";
import { loadDirs } from "./reports.js";

/** 差量榜单数量上限（返回给前端，避免载荷过大）。 */
const DIFF_TOP_GROWTH = 30;
const DIFF_TOP_SHRINK = 15;
const DIFF_TOP_ADDED = 15;
const DIFF_TOP_REMOVED = 15;

/** 盘根路径（如 "C:\\" / "D:"，差量榜单排除，总量由 driveDeltas 呈现）。 */
const ROOT_PATH_RE = /^[a-zA-Z]:\\?$/;

/** 历史差量报告滚动保留份数（成套计数，超出自动删最旧）。 */
const DIFF_KEEP = 10;

/** 合法差量报告摘要文件名（时间戳定长，可安全校验、防止路径穿越）。 */
const DIFF_NAME_RE = /^差量报告-\d{4}-\d{2}-\d{2}-\d{6}\.json$/;

/** 全量变化明细文件后缀（gzip 压缩的 JSON，与差量摘要同基名）。 */
const DIFF_CHANGES_SUFFIX = ".changes.json.gz";

/** 差量 .md 内变化明细收录条数上限（全量明细在 .gz 里，md 只给头部）。 */
const DIFF_MD_CHANGES = 100;

/** 生成差量报告文件名基名（含秒级时间戳，避免重复生成互相覆盖）。 */
function diffFileBase(now = new Date()) {
	const p = (n) => String(n).padStart(2, "0");
	return `差量报告-${now.getFullYear()}-${p(now.getMonth() + 1)}-${p(now.getDate())}` +
		`-${p(now.getHours())}${p(now.getMinutes())}${p(now.getSeconds())}`;
}

/**
 * 计算两份全量目录明细的差量（基准→目标）。
 *
 * 父目录累计变化包含子目录变化，若不过滤榜单会被盘根/一级目录占据头部，
 * 因此增长/缩小榜单做祖先过滤：祖先已在榜时跳过后代（祖先的 delta 恒 ≥
 * 任意单个后代的 delta，排序后祖先必在前，一遍线性扫描即可）。
 *
 * @param {Array<{p: string, s: number}>} baseDirs   - 基准报告（较早）目录明细。
 * @param {Array<{p: string, s: number}>} targetDirs - 目标报告（较晚）目录明细。
 * @returns {{growth: Array, shrink: Array, added: Array, removed: Array}}
 */
function diffDirectories(baseDirs, targetDirs) {
	const baseMap = new Map(baseDirs.map((d) => [d.p, d]));
	const targetMap = new Map(targetDirs.map((d) => [d.p, d]));

	const growth = [];
	const shrink = [];
	const added = [];
	const removed = [];
	// 全量变化明细：每个大小或文件数有变化的目录（供前端变化树逐层下钻，
	// 精确定位到真正变化的叶子目录，而不只看浅层祖先的累计值）。
	// n: 1=新增目录（基准不存在） -1=消失目录（目标不存在） 0=大小/文件数变化
	const changes = [];
	for (const [p, t] of targetMap) {
		// 盘根（如 "X:\"）的总变化由 driveDeltas 呈现，排除以免独占榜首
		if (ROOT_PATH_RE.test(p)) continue;
		const b = baseMap.get(p);
		if (b === undefined) {
			added.push({ path: p, size: t.s });
			changes.push({ p, d: t.s, f: t.f ?? 0, n: 1 });
			continue;
		}
		const delta = t.s - b.s;
		if (delta > 0) growth.push({ path: p, fromSize: b.s, toSize: t.s, delta });
		else if (delta < 0) shrink.push({ path: p, fromSize: b.s, toSize: t.s, delta });
		const df = (t.f ?? 0) - (b.f ?? 0);
		if (delta !== 0 || df !== 0) changes.push({ p, d: delta, f: df, n: 0 });
	}
	for (const [p, b] of baseMap) {
		if (ROOT_PATH_RE.test(p)) continue;
		if (!targetMap.has(p)) {
			removed.push({ path: p, size: b.s });
			changes.push({ p, d: -b.s, f: -(b.f ?? 0), n: -1 });
		}
	}

	growth.sort((a, b) => b.delta - a.delta);
	shrink.sort((a, b) => a.delta - b.delta);
	added.sort((a, b) => b.size - a.size);
	removed.sort((a, b) => b.size - a.size);
	changes.sort((a, b) => Math.abs(b.d) - Math.abs(a.d));

	/** 祖先过滤 + 截断（盘根路径自带尾部反斜杠，需兼容拼接）。 */
	function pruneAndSlice(list, limit) {
		const out = [];
		outer: for (const item of list) {
			for (const kept of out) {
				const prefix = kept.path.endsWith("\\") ? kept.path : kept.path + "\\";
				if (item.path.startsWith(prefix)) continue outer;
			}
			out.push(item);
			if (out.length >= limit) break;
		}
		return out;
	}

	return {
		growth: pruneAndSlice(growth, DIFF_TOP_GROWTH),
		shrink: pruneAndSlice(shrink, DIFF_TOP_SHRINK),
		added: added.slice(0, DIFF_TOP_ADDED),
		removed: removed.slice(0, DIFF_TOP_REMOVED),
		changes,
	};
}

/**
 * 对比两份历史报告，返回差量结果（自动定向：创建时间早者为基准）。
 *
 * @param {string} fileA - 第一份报告 .json 文件名。
 * @param {string} fileB - 第二份报告 .json 文件名。
 * @returns {Promise<Object>} 差量结果。
 */
async function diffReports(fileA, fileB) {
	const dir = await ensureWorkspaceDir();
	const readSummary = async (name) => {
		const report = JSON.parse(await readFile(join(dir, name), "utf8"));
		return { name, report };
	};
	const a = await readSummary(fileA);
	const b = await readSummary(fileB);

	// 自动定向：早者为基准（base），晚者为目标（target）
	const aTime = a.report.createdAt ?? 0;
	const bTime = b.report.createdAt ?? 0;
	const older = aTime <= bTime ? a : b;
	const newer = aTime <= bTime ? b : a;

	// 幂等复用：同一对报告（定向后）已生成过差量则直接读取持久化结果，
	// 不重新解压计算（全量明细可能数 MB，重复对比应秒回）
	const existing = await findExistingDiff(dir, older.name, newer.name);
	if (existing) {
		try {
			return await getDiff(existing.file);
		} catch {
			// 明细损坏则重新计算并持久化为一份新的（旧文件随滚动清理淘汰）
		}
	}

	const [baseDirs, targetDirs] = await Promise.all([
		loadDirs(dir, older.name),
		loadDirs(dir, newer.name),
	]);
	const deltas = diffDirectories(baseDirs, targetDirs);

	// 各盘剩余/扫描量变化（按盘符对齐，仅取两份报告都有的盘）
	const baseStats = new Map((older.report.driveStats ?? []).map((d) => [d.drive, d]));
	const driveDeltas = (newer.report.driveStats ?? [])
		.filter((d) => baseStats.has(d.drive))
		.map((d) => ({
			drive: d.drive,
			freeDelta: d.freeBytes - (baseStats.get(d.drive)?.freeBytes ?? 0),
			scannedDelta: d.scannedBytes - (baseStats.get(d.drive)?.scannedBytes ?? 0),
		}));

	const result = {
		createdAt: Date.now(),
		base: {
			file: older.name,
			name: older.name.replace(/\.json$/, ""),
			createdAt: older.report.createdAt ?? 0,
			target: older.report.target ?? [],
		},
		target: {
			file: newer.name,
			name: newer.name.replace(/\.json$/, ""),
			createdAt: newer.report.createdAt ?? 0,
			target: newer.report.target ?? [],
		},
		driveDeltas,
		...deltas,
	};
	// 持久化三件套，供页面随时回看（无需源报告仍在，也无需重算）
	const saved = await saveDiff(dir, result);
	return {
		...result,
		file: saved + ".json",
		resultFile: join(dir, saved + ".md"),
	};
}

/** 查找同一对报告（定向后基准/目标）已持久化的差量摘要文件名。 */
async function findExistingDiff(dir, baseFile, targetFile) {
	let entries;
	try {
		entries = await readdir(dir);
	} catch {
		return null;
	}
	// 时间戳定长，文件名字典序逆排即最新在前
	const names = entries.filter((n) => DIFF_NAME_RE.test(n)).sort().reverse();
	for (const name of names) {
		try {
			const data = JSON.parse(await readFile(join(dir, name), "utf8"));
			if (data.base?.file === baseFile && data.target?.file === targetFile) {
				return { file: name };
			}
		} catch {
			// 损坏的摘要跳过
		}
	}
	return null;
}

/**
 * 将差量结果写入工作区目录（md + 摘要 + gzip 变化明细三件套），随后滚动清理。
 *
 * @param {string} dir    - 工作区目录。
 * @param {Object} result - diffReports 的返回值（含 changes 全量明细）。
 * @param {Date} [now]     - 差量时间戳（默认当前时间；测试可注入）。
 * @returns {Promise<string>} 差量摘要文件基名。
 */
async function saveDiff(dir, result, now = new Date()) {
	const { changes, ...summary } = result;
	summary.changesCount = Array.isArray(changes) ? changes.length : 0;
	const base = diffFileBase(now);
	await writeFile(join(dir, base + ".md"), formatDiffMarkdown(result), "utf8");
	await writeFile(join(dir, base + ".json"), JSON.stringify(summary), "utf8");
	// 全量变化明细 gzip 压缩：路径重复度高，数万条变化可压至数百 KB
	if (Array.isArray(changes) && changes.length > 0) {
		await writeFile(join(dir, base + DIFF_CHANGES_SUFFIX), gzipSync(JSON.stringify({ changes })));
	}
	await pruneDiffs(dir);
	return base;
}

/**
 * 将差量结果格式化为 Markdown（供会话模型与用户阅读）。
 * 榜单沿用前端展示的祖先过滤结果；变化明细只收录头部 DIFF_MD_CHANGES 条
 * （全量明细在 .gz 里，md 保持轻量）。
 *
 * @param {Object} result - diffReports 的返回值。
 * @returns {string}
 */
function formatDiffMarkdown(result) {
	const fmt = (bytes) => {
		if (!Number.isFinite(bytes) || bytes < 0) return "-";
		if (bytes < 1024) return `${bytes} B`;
		const units = ["KB", "MB", "GB", "TB"];
		let v = bytes / 1024;
		let i = 0;
		while (v >= 1024 && i < units.length - 1) {
			v /= 1024;
			i++;
		}
		return `${v.toFixed(2)} ${units[i]}`;
	};
	const when = (ts) => (ts ? new Date(ts).toLocaleString() : "-");
	const base = result.base ?? {};
	const target = result.target ?? {};
	const lines = []

	lines.push(`# 差量报告（${when(result.createdAt)} 生成）`);
	lines.push("");
	lines.push(`- **基准扫描**: ${base.name ?? "?"}（${when(base.createdAt)}）`);
	lines.push(`- **目标扫描**: ${target.name ?? "?"}（${when(target.createdAt)}）`);
	const gapMs = (target.createdAt ?? 0) - (base.createdAt ?? 0);
	if (gapMs > 0) {
		const gap = gapMs >= 86400000
			? `${(gapMs / 86400000).toFixed(1)} 天`
			: `${(gapMs / 3600000).toFixed(1)} 小时`;
		lines.push(`- **间隔**: 约 ${gap}`);
	}
	lines.push("");

	if ((result.driveDeltas ?? []).length > 0) {
		lines.push("## 各盘符变化");
		lines.push("| 盘符 | 剩余空间变化 | 扫描量变化 |");
		lines.push("|------|--------------|--------------|");
		for (const d of result.driveDeltas) {
			lines.push(`| ${d.drive} | ${d.freeDelta > 0 ? "+" : ""}${fmt(d.freeDelta)} | ${d.scannedDelta > 0 ? "+" : ""}${fmt(d.scannedDelta)} |`);
		}
		lines.push("");
	}

	if ((result.growth ?? []).length > 0) {
		lines.push(`## Top ${result.growth.length} 增长目录`);
		lines.push("| 路径 | 变化 | 之前 | 现在 |");
		lines.push("|------|------|--------|--------|");
		for (const g of result.growth) {
			lines.push(`| ${g.path} | +${fmt(g.delta)} | ${fmt(g.fromSize)} | ${fmt(g.toSize)} |`);
		}
		lines.push("");
	}

	if ((result.shrink ?? []).length > 0) {
		lines.push(`## Top ${result.shrink.length} 缩小目录`);
		lines.push("| 路径 | 变化 | 之前 | 现在 |");
		lines.push("|------|------|--------|--------|");
		for (const s of result.shrink) {
			lines.push(`| ${s.path} | ${fmt(s.delta)} | ${fmt(s.fromSize)} | ${fmt(s.toSize)} |`);
		}
		lines.push("");
	}

	if ((result.added ?? []).length > 0) {
		lines.push(`## 新增目录（Top ${result.added.length}）`);
		lines.push("| 路径 | 大小 |");
		lines.push("|------|--------|");
		for (const a of result.added) {
			lines.push(`| ${a.path} | ${fmt(a.size)} |`);
		}
		lines.push("");
	}

	if ((result.removed ?? []).length > 0) {
		lines.push(`## 消失目录（Top ${result.removed.length}）`);
		lines.push("| 路径 | 原大小 |");
		lines.push("|------|--------------|");
		for (const r of result.removed) {
			lines.push(`| ${r.path} | ${fmt(r.size)} |`);
		}
		lines.push("");
	}

	const changes = result.changes ?? [];
	if (changes.length > 0) {
		lines.push(`## 变化明细（按 |变化量| 降序，前 ${Math.min(DIFF_MD_CHANGES, changes.length)} 条，共 ${changes.length.toLocaleString()} 条）`);
		lines.push("| 路径 | 变化 | 文件数变化 | 状态 |");
		lines.push("|------|--------|------------|--------|");
		for (const c of changes.slice(0, DIFF_MD_CHANGES)) {
			const status = c.n === 1 ? "新增" : c.n === -1 ? "消失" : "";
			lines.push(`| ${c.p} | ${c.d > 0 ? "+" : ""}${fmt(c.d)} | ${c.f > 0 ? "+" : ""}${c.f ?? 0} | ${status} |`);
		}
		lines.push("");
	}

	lines.push("---");
	// 分析指令直接写入报告（同扫描报告的做法）：聊天框里只需填一条极简指令
	// + @文件 引用，模型读文件时自然拿到完整分析要求
	lines.push("## AI 分析指引");
	lines.push("");
	lines.push("本报告由「磁盘哨兵」自动生成，是两次磁盘扫描的差量对比结果（数据已获取，无需再调用任何扫描工具，禁止重新全盘扫描）。请基于以上真实数据给出空间变化分析：");
	lines.push("");
	lines.push("1. **空间增长主因**：结合增长榜与变化明细逐层定位，指出哪些目录因何增长（缓存堆积、日志膨胀、新装软件、下载文件等）；");
	lines.push("2. **可以安全回收的**：明确列出路径、理由和预估可回收空间（如临时文件、可再生的缓存）；");
	lines.push("3. **绝对不能动的**：系统关键文件/目录（如 pagefile.sys、WinSxS），说明为什么；");
	lines.push("4. **建议的处理顺序**：按「收益大、风险低优先」排序。");
	lines.push("");
	lines.push("输出要求：分析完成后，将完整清理方案写入当前工作区目录下的「磁盘清理方案-YYYY-MM-DD.md」（按当天日期命名，当天已存在则覆盖），面板会自动列出该文件供用户查看。");
	lines.push("");
	lines.push("注意：执行清理时不要删除「磁盘哨兵」工作区目录（含本报告）以及其他 DSH 自身的临时文件。");
	return lines.join("\n");
}

/**
 * 滚动清理旧差量：按基名（时间戳定长，字典序即时间序）排序，
 * 超出 DIFF_KEEP 份的最旧差量（摘要与明细）成对删除。
 *
 * @param {string} dir - 工作区目录。
 */
async function pruneDiffs(dir) {
	let entries;
	try {
		entries = await readdir(dir);
	} catch {
		return;
	}
	const bases = new Set();
	for (const name of entries) {
		if (!name.startsWith("差量报告-")) continue;
		if (name.endsWith(DIFF_CHANGES_SUFFIX)) bases.add(name.slice(0, -DIFF_CHANGES_SUFFIX.length));
		else if (name.endsWith(".json")) bases.add(name.slice(0, -5));
		else if (name.endsWith(".md")) bases.add(name.slice(0, -3));
	}
	const sorted = [...bases].sort();
	for (const base of sorted.slice(0, Math.max(0, sorted.length - DIFF_KEEP))) {
		await rm(join(dir, base + ".md"), { force: true }).catch(() => {});
		await rm(join(dir, base + ".json"), { force: true }).catch(() => {});
		await rm(join(dir, base + DIFF_CHANGES_SUFFIX), { force: true }).catch(() => {});
	}
}

/**
 * diff/list 端点：列出工作区目录内的历史差量报告摘要。
 *
 * @returns {Promise<{dir: string, diffs: Array}>}
 */
async function listDiffs() {
	const dir = await ensureWorkspaceDir();
	let entries;
	try {
		entries = await readdir(dir);
	} catch {
		return { dir, diffs: [] };
	}
	// 时间戳定长，文件名字典序逆排即最新在前
	const names = entries.filter((n) => DIFF_NAME_RE.test(n)).sort().reverse();
	const diffs = [];
	for (const name of names.slice(0, DIFF_KEEP)) {
		try {
			const data = JSON.parse(await readFile(join(dir, name), "utf8"));
			diffs.push({
				file: name,
				name: name.replace(/\.json$/, ""),
				createdAt: data.createdAt ?? null,
				base: data.base ?? {},
				target: data.target ?? {},
				changesCount: data.changesCount ?? 0,
			});
		} catch {
			// 损坏的摘要直接跳过，不影响其余差量
		}
	}
	return { dir, diffs };
}

/**
 * diff/get 端点：读取一份持久化差量（摘要 + 解压后的全量变化明细），
 * 返回结构与 report/diff 一致，前端 DiffView 可直接渲染。
 *
 * @param {string} name - 差量摘要 .json 文件名。
 * @returns {Promise<Object>}
 * @throws {Error} 摘要缺失/损坏或明细损坏。
 */
async function getDiff(name) {
	const dir = await ensureWorkspaceDir();
	const base = name.replace(/\.json$/, "");
	const summary = JSON.parse(await readFile(join(dir, base + ".json"), "utf8"));
	let changes = [];
	try {
		const raw = await readFile(join(dir, base + DIFF_CHANGES_SUFFIX));
		const data = JSON.parse(gunzipSync(raw).toString("utf8"));
		changes = Array.isArray(data.changes) ? data.changes : [];
	} catch (err) {
		// 空变化的差量不落明细文件（ENOENT 合法）；其余视为损坏报错
		if (err?.code !== "ENOENT") throw err;
	}
	// 补上 Markdown 路径（供「让 AI 分析」精确 @ 引用本次差量文件）；
	// 升级前生成的旧差量无 .md，resultFile 缺失时前端降级为内联摘要
	const out = { ...summary, changes, file: name };
	try {
		await stat(join(dir, base + ".md"));
		out.resultFile = join(dir, base + ".md");
	} catch {}
	return out;
}

/**
 * diff/delete 端点：删除一份差量报告（摘要与明细成对删除）。
 *
 * @param {string} name - 差量摘要文件名。
 */
async function deleteDiff(name) {
	const dir = await ensureWorkspaceDir();
	const base = name.replace(/\.json$/, "");
	await rm(join(dir, base + ".md"), { force: true }).catch(() => {});
	await rm(join(dir, base + ".json"), { force: true }).catch(() => {});
	await rm(join(dir, base + DIFF_CHANGES_SUFFIX), { force: true }).catch(() => {});
	return { deleted: base };
}

export {
	diffDirectories,
	diffReports,
	DIFF_KEEP,
	DIFF_NAME_RE,
	DIFF_CHANGES_SUFFIX,
	diffFileBase,
	saveDiff,
	pruneDiffs,
	listDiffs,
	getDiff,
	deleteDiff,
};
