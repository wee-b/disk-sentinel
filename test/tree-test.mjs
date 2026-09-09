/**
 * 测试脚本：验证 report/tree 端点（全量目录明细读取，供页面目录树渲染）。
 *
 * 覆盖：正常返回紧凑明细数组、旧报告缺明细的友好报错、
 * 路径穿越防护、乱序明细的正确性（写入即读取）。
 *
 * 运行: node test/tree-test.mjs
 */
import { writeFile } from "node:fs/promises";
import { join } from "node:path";
import { applyRpc, writeReport } from "../lib/rpc.js";

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

async function main() {
	console.log("🧪 目录树端点测试（report/tree）");
	console.log(`Node.js: ${process.version}`);

	let handler;
	const ctx = {
		connection: { rpc: { handle: (channel, h) => { handler = h; return () => {}; } } },
		effect: () => () => {},
	};
	applyRpc(ctx);

	const wsResp = await handler("workspace/dir", {});
	assert(wsResp.ok, "workspace/dir 返回目录");
	const wsDir = wsResp.value.path;

	// 写入一份带明细的报告（故意乱序：子目录在父目录之前）
	const dirs = [
		{ p: "X:\\app\\cache", s: 300, f: 3, d: 0 },
		{ p: "X:\\", s: 1000, f: 10, d: 2 },
		{ p: "X:\\app", s: 600, f: 5, d: 1 },
	];
	const mdPath = await writeReport(wsDir, {
		target: ["X:"],
		driveStats: [{ drive: "X:", totalBytes: 1000, freeBytes: 0, scannedBytes: 1000, fileCount: 10, dirCount: 3 }],
		topDirectories: [],
		topFiles: [],
		durationMs: 100,
		totalDirsScanned: 3,
		directories: dirs,
	});
	const jsonName = mdPath.split(/[\\/]/).pop().replace(/\.md$/, ".json");

	// 正常读取
	const treeResp = await handler("report/tree", { file: jsonName });
	assert(treeResp.ok, "report/tree 成功");
	const treeDirs = treeResp.value.dirs;
	assert(Array.isArray(treeDirs) && treeDirs.length === 3, `返回全部 3 条目录明细（实际 ${treeDirs?.length}）`);
	const byPath = new Map(treeDirs.map((d) => [d.p, d]));
	assert(byPath.get("X:\\app")?.s === 600, "目录大小正确（X:\\app = 600）");
	assert(byPath.get("X:\\app\\cache")?.f === 3, "文件数正确（cache = 3）");
	assert(treeDirs.every((d) => !("d" in d)), "明细不含子目录数字段（紧凑载荷）");

	// 旧报告无明细
	const noDirsBase = "扫描结果-2026-09-01-000001";
	await writeFile(join(wsDir, noDirsBase + ".md"), "# 旧数据报告", "utf8");
	await writeFile(join(wsDir, noDirsBase + ".json"), JSON.stringify({ createdAt: 1 }), "utf8");
	const noDirsResp = await handler("report/tree", { file: noDirsBase + ".json" });
	assert(!noDirsResp.ok && /明细/.test(noDirsResp.error?.message ?? ""), "缺明细时报可操作的提示");

	// 路径穿越
	const badResp = await handler("report/tree", { file: "..\\..\\secret.json" });
	assert(!badResp.ok, "非法文件名被拒绝（路径穿越防护）");

	// 清理测试文件
	await handler("report/delete", { file: jsonName });
	await handler("report/delete", { file: noDirsBase + ".json" });

	console.log("\n" + "=".repeat(50));
	console.log(`结果: ${passed} 通过, ${failed} 失败`);
	process.exit(failed > 0 ? 1 : 0);
}

main().catch((err) => {
	console.error("💥 测试异常:", err);
	process.exit(1);
});
