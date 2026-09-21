/**
 * 扫描报告的持久化与读取（工作区目录下的成套文件）。
 *
 * 每次扫描生成带时间戳的报告三件套：
 * - .md           —— 供会话模型与用户阅读（含「AI 分析指引」章节）
 * - .json         —— 结构化摘要副本（页面历史查看用）
 * - .dirs.json.gz —— gzip 压缩的全量目录明细（报告间差量对比用）
 *
 * 滚动保留最近 REPORT_KEEP 份，更早的自动清理。
 *
 * @module @dsh-plugin/disk-sentinel/rpc/reports
 */
import { writeFile, readdir, readFile, rm, stat } from "node:fs/promises";
import { join } from "node:path";
import { gzipSync, gunzipSync } from "node:zlib";
import { ensureWorkspaceDir } from "./workspace.js";

/** 历史报告滚动保留份数（成套计数，超出自动删最旧）。 */
export const REPORT_KEEP = 10;

/** 合法报告文件名（时间戳定长，可安全校验、防止路径穿越）。 */
const REPORT_NAME_RE = /^扫描结果-\d{4}-\d{2}-\d{2}-\d{6}\.(md|json)$/;

/** 全量目录明细文件后缀（gzip 压缩的 JSON，与报告同基名）。 */
const DIRS_SUFFIX = ".dirs.json.gz";

/**
 * 旧版报告文件名（升级前的命名，仅 .md 无时间戳无 JSON 副本）。
 * 不支持页面查看（无结构化数据），但需要列出来供用户手动清理，
 * 否则会在 @ 文件引用里可见却无法从页面删除（僵尸文件）。
 */
const LEGACY_REPORT_NAME_RE = /^扫描结果-\d{4}-\d{2}-\d{2}\.md$/;

/** 生成报告文件名基名（含秒级时间戳，避免重扫互相覆盖）。 */
function reportFileBase(now = new Date()) {
	const p = (n) => String(n).padStart(2, "0");
	return `扫描结果-${now.getFullYear()}-${p(now.getMonth() + 1)}-${p(now.getDate())}` +
		`-${p(now.getHours())}${p(now.getMinutes())}${p(now.getSeconds())}`;
}

/**
 * 滚动清理旧报告：按基名（时间戳定长，字典序即时间序）排序，
 * 超出 REPORT_KEEP 份的最旧报告（.md 与 .json）成对删除。
 *
 * @param {string} dir - 工作区目录。
 */
async function pruneReports(dir) {
	let entries;
	try {
		entries = await readdir(dir);
	} catch {
		return;
	}
	const bases = new Set();
	for (const name of entries) {
		if (!name.startsWith("扫描结果-")) continue;
		if (name.endsWith(DIRS_SUFFIX)) bases.add(name.slice(0, -DIRS_SUFFIX.length));
		else if (name.endsWith(".md")) bases.add(name.slice(0, -3));
		else if (name.endsWith(".json")) bases.add(name.slice(0, -5));
	}
	const sorted = [...bases].sort();
	for (const base of sorted.slice(0, Math.max(0, sorted.length - REPORT_KEEP))) {
		await rm(join(dir, base + ".md"), { force: true }).catch(() => {});
		await rm(join(dir, base + ".json"), { force: true }).catch(() => {});
		await rm(join(dir, base + DIRS_SUFFIX), { force: true }).catch(() => {});
	}
}

/**
 * 将完整扫描报告写入工作区目录：Markdown（供会话中的模型与用户阅读）
 * + JSON 结构化副本（供页面历史查看），随后滚动清理超出保留份数的旧报告。
 *
 * @param {string} dir          - 工作区目录。
 * @param {Object} report       - {target, driveStats, applications, topDirectories, topFiles, durationMs, totalDirsScanned}。
 * @param {Date} [now]          - 报告时间戳（默认当前时间；测试可注入）。
 * @returns {Promise<string>}   - Markdown 报告文件绝对路径。
 */
export async function writeReport(dir, report, now = new Date()) {
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
	const date = new Date();
	const lines = [];
	lines.push(`# 磁盘扫描报告（${date.toLocaleString()}）`);
	lines.push("");
	lines.push(`- **扫描目标**: ${report.target.join(", ")}`);
	lines.push(`- **扫描耗时**: ${(report.durationMs / 1000).toFixed(1)} 秒`);
	lines.push(`- **扫描目录数**: ${report.totalDirsScanned.toLocaleString()}`);
	lines.push("");
	lines.push("## 各盘符概况");
	lines.push("| 盘符 | 总容量 | 剩余 | 扫描统计到 | 文件数 | 目录数 |");
	lines.push("|------|--------|------|------------|--------|--------|");
	for (const d of report.driveStats) {
		lines.push(`| ${d.drive} | ${fmt(d.totalBytes)} | ${fmt(d.freeBytes)} | ${fmt(d.scannedBytes)} | ${d.fileCount.toLocaleString()} | ${d.dirCount.toLocaleString()} |`);
	}
	lines.push("");
	if ((report.applications ?? []).length > 0) {
		lines.push(`## Top ${report.applications.length} 软件占用（估算）`);
		lines.push("| 软件 | 跨盘合计 | 盘符明细 | 识别位置数 |");
		lines.push("|------|----------|----------|------------|");
		for (const app of report.applications) {
			const drives = (app.drives ?? []).map((item) => `${item.drive} ${fmt(item.size)}`).join("、") || "-";
			lines.push(`| ${app.name} | ${fmt(app.size)} | ${drives} | ${(app.locations ?? []).length} |`);
		}
		lines.push("");
		lines.push("> 软件占用由常见安装目录、用户数据目录和游戏库的真实扫描结果聚合估算；共享组件或自定义目录可能无法准确归属。 ");
		lines.push("");
	}
	lines.push(`## Top ${report.topDirectories.length} 大目录`);
	lines.push("| 路径 | 大小 | 文件数 |");
	lines.push("|------|------|--------|");
	for (const d of report.topDirectories) {
		lines.push(`| ${d.path} | ${fmt(d.size)} | ${d.fileCount ?? "-"} |`);
	}
	lines.push("");
	lines.push(`## Top ${report.topFiles.length} 大文件`);
	lines.push("| 路径 | 大小 | 修改日期 |");
	lines.push("|------|------|----------|");
	for (const f of report.topFiles) {
		const md = f.lastModified ? new Date(f.lastModified).toLocaleDateString() : "-";
		lines.push(`| ${f.path} | ${fmt(f.size)} | ${md} |`);
	}
	lines.push("");
	lines.push("---");
	// 分析指令直接写入报告：聊天框里只需填一条极简指令 + @文件 引用，
	// 模型读文件时自然拿到完整分析要求，无需在提示词里携带长文本。
	lines.push("## AI 分析指引");
	lines.push("");
	lines.push("本报告由「磁盘哨兵」自动生成，扫描数据已获取，无需再调用任何扫描工具，禁止重新全盘扫描。请基于以上真实数据给出磁盘清理分析：");
	lines.push("");
	lines.push("1. **可以安全删除的**：明确列出路径、理由和预估可回收空间（如临时文件、缓存等）；");
	lines.push("2. **绝对不能动的**：系统关键文件/目录（如 pagefile.sys、WinSxS），说明为什么；");
	lines.push("3. **适合移动到其他盘的**：大体积可迁移的开发缓存、虚拟机镜像、下载目录等，给出迁移建议；");
	lines.push("4. **建议的清理顺序**：按「收益大、风险低优先」排序。");
	lines.push("");
	lines.push("输出要求：分析完成后，将完整清理方案写入当前工作区目录下的「磁盘清理方案-YYYY-MM-DD.md」（按当天日期命名，当天已存在则覆盖），面板会自动列出该文件供用户查看。");
	lines.push("");
	lines.push("注意：执行清理时不要删除「磁盘哨兵」工作区目录（含本报告）以及其他 DSH 自身的临时文件。");

	const base = reportFileBase(now);
	const filePath = join(dir, base + ".md");
	await writeFile(filePath, lines.join("\n"), "utf8");
	// 结构化 JSON 摘要副本：页面「历史分析」查看时直接渲染，无需解析 Markdown。
	// 不含全量目录明细（可能数十 MB），保持报告摘要轻量
	const { directories, ...summary } = report;
	await writeFile(join(dir, base + ".json"), JSON.stringify({ ...summary, createdAt: now.getTime() }), "utf8");
	// 全量目录明细（gzip 压缩）：供两份报告间的差量对比定位「谁占用了空间」。
	// 数十万目录的 JSON 约 30MB，路径重复度高、压缩后仅数 MB
	if (Array.isArray(directories) && directories.length > 0) {
		const dirsPayload = gzipSync(JSON.stringify({ createdAt: now.getTime(), dirs: directories }));
		await writeFile(join(dir, base + DIRS_SUFFIX), dirsPayload);
	}
	await pruneReports(dir);
	return filePath;
}

/**
 * 读取并解析一份报告的全量目录明细。
 *
 * @param {string} dir  - 工作区目录。
 * @param {string} name - 报告 .json 文件名。
 * @returns {Promise<Array<{p: string, s: number}>>}
 * @throws {Error} 明细文件缺失或损坏。
 */
async function loadDirs(dir, name) {
	const base = name.replace(/\.json$/, "");
	const raw = await readFile(join(dir, base + DIRS_SUFFIX));
	const data = JSON.parse(gunzipSync(raw).toString("utf8"));
	return Array.isArray(data.dirs) ? data.dirs : [];
}

/**
 * report/list 端点：列出工作区目录内的历史报告摘要
 * （含旧版命名报告，标记 legacy 供用户手动清理）。
 *
 * @returns {Promise<{dir: string, reports: Array}>}
 */
async function listReports() {
	const dir = await ensureWorkspaceDir();
	let entries;
	try {
		entries = await readdir(dir);
	} catch {
		return { dir, reports: [] };
	}
	// 时间戳定长，文件名字典序逆排即最新在前
	const names = entries
		.filter((n) => REPORT_NAME_RE.test(n) && n.endsWith(".json"))
		.sort()
		.reverse();
	const reports = [];
	for (const name of names.slice(0, REPORT_KEEP)) {
		try {
			const report = JSON.parse(await readFile(join(dir, name), "utf8"));
			// 是否有全量目录明细（决定能否参与差量对比）
			let hasDirs = false;
			try {
				await stat(join(dir, name.replace(/\.json$/, "") + DIRS_SUFFIX));
				hasDirs = true;
			} catch {}
			reports.push({
				file: name,
				name: name.replace(/\.json$/, ""),
				createdAt: report.createdAt ?? null,
				target: report.target ?? [],
				driveStats: report.driveStats ?? [],
				durationMs: report.durationMs ?? 0,
				totalDirsScanned: report.totalDirsScanned ?? 0,
				hasDirs,
				legacy: false,
			});
		} catch {
			// 损坏的 JSON 直接跳过，不影响其余报告
		}
	}
	// 旧版命名报告：无 JSON 副本，仅列出（标记 legacy）供用户手动清理，
	// 否则它们在 @ 文件引用里可见却不出现在历史列表，无法从页面删除
	const legacyNames = entries.filter((n) => LEGACY_REPORT_NAME_RE.test(n));
	for (const name of legacyNames) {
		try {
			const info = await stat(join(dir, name));
			reports.push({
				file: name,
				name: name.replace(/\.md$/, ""),
				createdAt: info.mtimeMs ?? null,
				target: [],
				driveStats: [],
				durationMs: 0,
				totalDirsScanned: 0,
				legacy: true,
			});
		} catch {
			// 文件消失则跳过
		}
	}
	return { dir, reports };
}

/**
 * report/get 端点：读取一份报告的结构化摘要（补上 Markdown 路径，
 * 供「让 AI 分析」精确引用本次报告文件）。
 *
 * @param {string} name - 报告 .json 文件名。
 * @returns {Promise<{report: Object}>}
 * @throws {Error} 报告不存在或已损坏。
 */
async function getReport(name) {
	const dir = await ensureWorkspaceDir();
	const report = JSON.parse(await readFile(join(dir, name), "utf8"));
	report.resultFile = join(dir, name.replace(/\.json$/, ".md"));
	return { report };
}

/**
 * report/tree 端点：返回一份报告的全量目录明细，
 * 供页面渲染可折叠目录树（WinDirStat 式）。
 *
 * @param {string} name - 报告 .json 文件名。
 * @returns {Promise<{file: string, dirs: Array}>}
 * @throws {Error} 明细缺失（旧版本插件生成）或读取失败。
 */
async function getReportTree(name) {
	const dir = await ensureWorkspaceDir();
	const dirs = await loadDirs(dir, name);
	return {
		file: name,
		dirs: dirs.map((d) => ({ p: d.p, s: d.s, f: d.f })),
	};
}

/**
 * report/delete 端点：删除一份报告（.md 与 .json 成对删除）。
 *
 * @param {string} name - 报告文件名。
 */
async function deleteReport(name) {
	const dir = await ensureWorkspaceDir();
	const base = name.replace(/\.(md|json)$/, "");
	await rm(join(dir, base + ".md"), { force: true }).catch(() => {});
	await rm(join(dir, base + ".json"), { force: true }).catch(() => {});
	await rm(join(dir, base + DIRS_SUFFIX), { force: true }).catch(() => {});
	return { deleted: base };
}

export {
	REPORT_NAME_RE,
	DIRS_SUFFIX,
	LEGACY_REPORT_NAME_RE,
	reportFileBase,
	pruneReports,
	loadDirs,
	listReports,
	getReport,
	getReportTree,
	deleteReport,
};
