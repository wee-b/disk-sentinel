/**
 * 测试脚本：验证报告差量对比功能（全量目录明细落盘 + report/diff 端点）。
 *
 * 覆盖：.dirs.json.gz 生成与滚动保留、hasDirs 标记、增长/缩小/新增/消失
 * 计算、祖先过滤、自动定向（早者为基准）、缺明细时的友好报错、
 * 同一份报告对比拒绝、删除时三件套清理；
 * 差量结果自动持久化（摘要 + 变化明细两件套）、同对幂等复用、
 * diff/list / diff/get / diff/delete 端点、滚动保留。
 *
 * 通过最小 ctx 桩直接驱动 RPC handler，不触发真实扫描。
 * 运行: node test/diff-test.mjs
 */
import { mkdtemp, readdir, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { applyRpc, writeReport, REPORT_KEEP } from "../lib/rpc.js";
import { saveDiff, DIFF_KEEP } from "../lib/rpc/diff.js";

let passed = 0;
let failed = 0;

function assert(condition, message) {
	if (condition) {
		console.log(`  ✅ ${message}`);
		passed++;
	} else {
		console.error(`  ❌ ${message}`);
		failed++;
	}
}

/** 构造带全量目录明细的假报告。 */
function fakeReport(target, directories, driveStats) {
	return {
		target,
		driveStats: driveStats ?? [
			{ drive: "X:", totalBytes: 100, freeBytes: 40, scannedBytes: 60, fileCount: 10, dirCount: 2 },
		],
		topDirectories: (directories ?? []).slice(0, 3).map((d) => ({
			path: d.p, name: d.p, size: d.s, fileCount: d.f ?? 0,
		})),
		topFiles: [],
		durationMs: 1234,
		totalDirsScanned: directories?.length ?? 3,
		directories,
	};
}

async function main() {
	console.log("🧪 差量对比测试（全量明细落盘 / report/diff）");
	console.log(`Node.js: ${process.version}`);

	// RPC handler 桩
	let handler;
	const ctx = {
		connection: { rpc: { handle: (channel, h) => { handler = h; return () => {}; } } },
		effect: () => () => {},
	};
	applyRpc(ctx);

	// 沙箱目录（writeReport 不可注入目录，走真实工作区；滚动保留用沙箱验证）
	const sandbox = await mkdtemp(join(tmpdir(), "pcc-diff-test-"));

	// ---- 1. .dirs.json.gz 落盘与滚动保留 ----
	console.log("\n=== 全量目录明细落盘（沙箱）===");
	const dirsA = [
		{ p: "X:\\", s: 100, f: 10, d: 3 },
		{ p: "X:\\app", s: 60, f: 5, d: 1 },
		{ p: "X:\\app\\cache", s: 50, f: 4, d: 0 },
		{ p: "X:\\docs", s: 40, f: 5, d: 0 },
	];
	for (let i = 0; i < REPORT_KEEP + 1; i++) {
		await writeReport(sandbox, fakeReport(["X:"], dirsA), new Date(2026, 0, 1, 8, 0, i));
	}
	const sandboxNames = await readdir(sandbox);
	const dirsFiles = sandboxNames.filter((n) => n.endsWith(".dirs.json.gz"));
	assert(dirsFiles.length === REPORT_KEEP, `滚动保留后 .dirs.json.gz 共 ${REPORT_KEEP} 份（实际 ${dirsFiles.length}）`);
	assert(!dirsFiles.some((n) => n.includes("080000")), "最旧的明细已随报告滚动清理");

	// ---- 2. report/diff：增长/缩小/新增/消失 + 祖先过滤 + 自动定向 ----
	console.log("\n=== report/diff 端点（真实工作区）===");
	const wsResp = await handler("workspace/dir", {});
	assert(wsResp.ok, "workspace/dir 返回目录");
	const wsDir = wsResp.value.path;

	// 清理真实工作区里已有的差量报告，避免历史遗留干扰后续 list 断言
	const preDiffs = await handler("diff/list", {});
	for (const d of preDiffs.value?.diffs ?? []) {
		await handler("diff/delete", { file: d.file });
	}

	// 基准（昨天）：app 缓存 50MB，docs 40MB，old 20MB，未安装 docker
	const dirsYesterday = [
		{ p: "X:\\", s: 200, f: 20, d: 5 },
		{ p: "X:\\app", s: 60, f: 5, d: 1 },
		{ p: "X:\\app\\cache", s: 50, f: 4, d: 0 },
		{ p: "X:\\docs", s: 40, f: 5, d: 0 },
		{ p: "X:\\old", s: 20, f: 2, d: 0 },
	];
	// 目标（今天）：cache 涨到 3GB，docs 缩到 10MB，old 消失，docker 新增 1.5GB
	const dirsToday = [
		{ p: "X:\\", s: 4750, f: 30, d: 5 },
		{ p: "X:\\app", s: 3060, f: 6, d: 1 },
		{ p: "X:\\app\\cache", s: 3000, f: 5, d: 0 },
		{ p: "X:\\docs", s: 10, f: 5, d: 0 },
		{ p: "X:\\docker", s: 1500, f: 3, d: 0 },
	];
	const yesterday = new Date(2026, 8, 3, 10, 0, 0);
	const today = new Date(2026, 8, 4, 10, 0, 0);
	const mdOld = await writeReport(wsDir, fakeReport(["X:"], dirsYesterday, [
		{ drive: "X:", totalBytes: 100, freeBytes: 50, scannedBytes: 200, fileCount: 20, dirCount: 5 },
	]), yesterday);
	const mdNew = await writeReport(wsDir, fakeReport(["X:"], dirsToday, [
		{ drive: "X:", totalBytes: 100, freeBytes: 47, scannedBytes: 4750, fileCount: 30, dirCount: 5 },
	]), today);
	assert(mdOld.endsWith(".md") && mdNew.endsWith(".md"), "两份报告写入成功");

	const listResp = await handler("report/list", {});
	const reports = listResp.value.reports.filter((r) => !r.legacy);
	assert(reports.every((r) => typeof r.hasDirs === "boolean"), "report/list 每份报告带 hasDirs 标记");
	const oldEntry = reports.find((r) => r.createdAt === yesterday.getTime());
	const newEntry = reports.find((r) => r.createdAt === today.getTime());
	assert(oldEntry?.hasDirs === true && newEntry?.hasDirs === true, "两份新报告均有明细数据");

	// 故意把新的当 baseFile 传入 —— 端点应自动换向（早者为基准）
	const diffResp = await handler("report/diff", {
		baseFile: newEntry.file,
		targetFile: oldEntry.file,
	});
	assert(diffResp.ok, "report/diff 成功（参数顺序颠倒）");
	const diff = diffResp.value;
	assert(diff.base.createdAt === yesterday.getTime(), "自动定向：较早者为基准");
	assert(diff.target.createdAt === today.getTime(), "自动定向：较晚者为目标");

	// 增长：盘根被排除（总量由 driveDeltas 呈现），X:\app 成为顶层增长点；
	// X:\app\cache 作为其后代被祖先过滤跳过；X:\docker 是新增目录，只进新增榜
	const growthPaths = diff.growth.map((g) => g.path);
	assert(growthPaths[0] === "X:\\app", `增长榜首为顶层增长点 X:\\app（实际 ${growthPaths[0]}）`);
	assert(!growthPaths.includes("X:\\"), "盘根不进入增长榜（总量由 driveDeltas 呈现）");
	assert(!growthPaths.includes("X:\\app\\cache"), "祖先过滤：X:\\app 已在榜时跳过后代 cache");
	assert(!growthPaths.includes("X:\\docker"), "新增目录不进入增长榜（在新增榜单独呈现）");
	const appGrowth = diff.growth.find((g) => g.path === "X:\\app");
	assert(appGrowth && appGrowth.delta === 3000, "X:\\app 增长量正确（+3000，含 cache 变化）");

	const shrinkPaths = diff.shrink.map((s) => s.path);
	assert(shrinkPaths.includes("X:\\docs"), "缩小榜包含 X:\\docs（40 → 10）");
	const docsShrink = diff.shrink.find((s) => s.path === "X:\\docs");
	assert(docsShrink.delta === -30, "docs 缩小量正确（-30）");

	const addedPaths = diff.added.map((a) => a.path);
	assert(addedPaths.includes("X:\\docker"), "新增目录榜包含 X:\\docker");
	assert(diff.added.find((a) => a.path === "X:\\docker").size === 1500, "新增目录体积正确");

	const removedPaths = diff.removed.map((r) => r.path);
	assert(removedPaths.includes("X:\\old"), "消失目录榜包含 X:\\old");
	assert(diff.removed.find((r) => r.path === "X:\\old").size === 20, "消失目录体积正确");

	// 各盘变化
	const driveDelta = diff.driveDeltas.find((d) => d.drive === "X:");
	assert(driveDelta && driveDelta.freeDelta === -3, "盘符剩余空间变化正确（-3）");
	assert(driveDelta && driveDelta.scannedDelta === 4550, "盘符扫描量变化正确（+4550）");

	// 全量变化明细（供前端变化树逐层下钻）
	assert(Array.isArray(diff.changes), "diff 返回全量变化明细 changes");
	const changeMap = new Map(diff.changes.map((c) => [c.p, c]));
	assert(changeMap.size === 5, `changes 含 5 个变化目录（实际 ${changeMap.size}，盘根不计）`);
	assert(!changeMap.has("X:\\"), "盘根不进入 changes（总量由 driveDeltas 呈现）");
	assert(changeMap.get("X:\\app")?.d === 3000 && changeMap.get("X:\\app")?.n === 0, "X:\\app 变化 +3000（n=0 常规变化）");
	// 下钻关键：cache 的自身变化 +2950 也在明细中，用户可从 app 展开精确定位到 cache
	assert(changeMap.get("X:\\app\\cache")?.d === 2950, "X:\\app\\cache 自身变化 +2950 在明细中（可下钻定位）");
	assert(changeMap.get("X:\\app")?.f === 1, "X:\\app 文件数变化 +1");
	assert(changeMap.get("X:\\docker")?.d === 1500 && changeMap.get("X:\\docker")?.n === 1, "X:\\docker 为新增目录（n=1，+1500）");
	assert(changeMap.get("X:\\old")?.d === -20 && changeMap.get("X:\\old")?.n === -1, "X:\\old 为消失目录（n=-1，-20）");
	assert(changeMap.get("X:\\docs")?.d === -30, "X:\\docs 变化 -30");
	assert(diff.changes[0]?.p === "X:\\app", "changes 按 |变化量| 降序（首位 X:\\app）");

	// ---- 3. 错误分支 ----
	console.log("\n=== 错误分支 ===");
	const sameResp = await handler("report/diff", { baseFile: oldEntry.file, targetFile: oldEntry.file });
	assert(!sameResp.ok, "同一份报告对比被拒绝");

	const badResp = await handler("report/diff", { baseFile: "..\\..\\secret.json", targetFile: oldEntry.file });
	assert(!badResp.ok, "非法文件名被拒绝（路径穿越防护）");

	// 无明细数据的旧版报告：手写一份只有 .md+.json 的报告
	const noDirsBase = "扫描结果-2026-09-01-000000";
	await writeFile(join(wsDir, noDirsBase + ".md"), "# 旧数据报告", "utf8");
	await writeFile(join(wsDir, noDirsBase + ".json"), JSON.stringify({ createdAt: 1, target: ["X:"], driveStats: [] }), "utf8");
	const noDirsResp = await handler("report/diff", { baseFile: noDirsBase + ".json", targetFile: oldEntry.file });
	assert(!noDirsResp.ok && /明细/.test(noDirsResp.error?.message ?? ""), "缺明细数据时给出可操作的提示");

	// ---- 4. 差量结果自动持久化 ----
	console.log("\n=== 差量持久化 ===");
	const diffList1 = await handler("diff/list", {});
	assert(diffList1.ok && diffList1.value.diffs.length === 1,
		`report/diff 自动持久化（diff/list 共 1 份，实际 ${diffList1.value.diffs.length}）`);
	const savedDiff = diffList1.value.diffs[0];
	assert(savedDiff.base.file === oldEntry.file && savedDiff.target.file === newEntry.file,
		"持久化差量记录定向后的基准/目标报告");
	assert(savedDiff.changesCount === 5, `摘要含 changesCount（5 个变化目录，实际 ${savedDiff.changesCount}）`);

	// 幂等复用：同对报告（顺序颠倒）重复对比直接读已有差量，不重算不新增
	const diffAgain = await handler("report/diff", { baseFile: newEntry.file, targetFile: oldEntry.file });
	assert(diffAgain.ok && diffAgain.value.file === savedDiff.file, "同对报告重复对比复用已持久化差量（秒回）");
	const diffList2 = await handler("diff/list", {});
	assert(diffList2.value.diffs.length === 1, "复用不产生新的差量文件");
	assert(/\.md$/.test(diffAgain.value.resultFile ?? ""), "即时计算返回 resultFile（差量 .md 绝对路径）");

	// diff/get：返回完整结构（与即时计算一致，含全量变化明细）
	const getResp = await handler("diff/get", { file: savedDiff.file });
	assert(getResp.ok && Array.isArray(getResp.value.changes) && getResp.value.changes.length === 5,
		"diff/get 返回全量变化明细");
	assert(getResp.value.growth?.[0]?.path === "X:\\app" && getResp.value.base?.file === oldEntry.file,
		"diff/get 榜单与即时计算一致（自动定向信息保留）");
	assert(getResp.value.driveDeltas?.[0]?.freeDelta === -3, "diff/get 各盘变化一致");
	assert(/\.md$/.test(getResp.value.resultFile ?? ""), "diff/get 补充 resultFile（差量 .md 绝对路径）");

	// 差量 .md 三件套：人类/AI 可读的 markdown（含 AI 分析指引）
	const diffMd = await readFile(getResp.value.resultFile, "utf8");
	assert(diffMd.includes("# 差量报告"), "差量 .md 含标题");
	assert(diffMd.includes("AI 分析指引"), "差量 .md 含「AI 分析指引」章节");
	assert(diffMd.includes("增长主因") && diffMd.includes("磁盘清理方案-YYYY-MM-DD.md"), "AI 指引含差量场景分析与输出要求");
	assert(diffMd.includes("新增") && diffMd.includes("X:\\docker"), "差量 .md 记录新增目录 X:\\docker");

	// diff/get 非法文件名拒绝（路径穿越防护）
	const badDiffGet = await handler("diff/get", { file: "..\\..\\secret.json" });
	assert(!badDiffGet.ok, "diff/get 拒绝非法文件名");

	// 沙箱验证滚动保留：saveDiff 写 DIFF_KEEP + 1 份（注入递增时间戳避免同名覆盖）
	for (let i = 0; i < DIFF_KEEP + 1; i++) {
		await saveDiff(sandbox, {
			createdAt: i,
			base: { file: "a.json" },
			target: { file: "b.json" },
			changes: [{ p: "X:\\x", d: i, f: 0, n: 0 }],
		}, new Date(2026, 0, 1, 8, 0, i));
	}
	const sandboxDiffFiles = (await readdir(sandbox)).filter((n) => n.startsWith("差量报告-"));
	const sandboxDiffBases = new Set(sandboxDiffFiles.map((n) => n.replace(/\.(json|changes\.json\.gz|md)$/, "")));
	assert(sandboxDiffBases.size === DIFF_KEEP,
		`滚动保留后差量共 ${DIFF_KEEP} 份（实际 ${sandboxDiffBases.size}）`);
	assert(!sandboxDiffBases.has("差量报告-2026-01-01-080000"), "最旧的差量已随滚动清理淘汰（秒 00）");
	assert(sandboxDiffBases.has("差量报告-2026-01-01-080001"), "次旧的差量保留（秒 01）");

	// ---- 5. 删除时三件套清理 ----
	console.log("\n=== 删除清理 ===");
	const delResp = await handler("report/delete", { file: newEntry.file });
	assert(delResp.ok, "report/delete 成功");
	const afterNames = await readdir(wsDir);
	const newBase = newEntry.file.replace(/\.json$/, "");
	assert(
		!afterNames.includes(newBase + ".md") &&
		!afterNames.includes(newBase + ".json") &&
		!afterNames.includes(newBase + ".dirs.json.gz"),
		".md / .json / .dirs.json.gz 三件套均被删除"
	);
	// 清理另一份测试报告与无明细报告
	await handler("report/delete", { file: oldEntry.file });
	await handler("report/delete", { file: noDirsBase + ".json" });

	// 清理测试产生的差量报告（摘要与明细成对删除）
	const delDiffResp = await handler("diff/delete", { file: savedDiff.file });
	assert(delDiffResp.ok, "diff/delete 成功");
	const wsFinalNames = await readdir(wsDir);
	assert(!wsFinalNames.some((n) => n.startsWith("差量报告-")),
		"差量两件套（.json/.changes.json.gz）均被删除");

	// 清理沙箱
	await rm(sandbox, { recursive: true, force: true });

	console.log("\n" + "=".repeat(50));
	console.log(`结果: ${passed} 通过, ${failed} 失败`);
	process.exit(failed > 0 ? 1 : 0);
}

main().catch((err) => {
	console.error("💥 测试异常:", err);
	process.exit(1);
});
