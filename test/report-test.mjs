/**
 * 测试脚本：验证报告管理（时间戳命名、JSON 副本、滚动保留、
 * report/list / report/get / report/delete RPC 端点）。
 *
 * 通过最小 ctx 桩直接驱动 RPC handler，不触发真实扫描。
 * 运行: node test/report-test.mjs
 */
import { mkdtemp, readdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { applyRpc, writeReport, REPORT_KEEP } from "../lib/rpc.js";

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

/** 构造最小可写的假报告。 */
function fakeReport(target) {
	return {
		target,
		driveStats: [
			{ drive: "X:", totalBytes: 100, freeBytes: 40, scannedBytes: 60, fileCount: 10, dirCount: 2 },
		],
		topDirectories: [{ path: "X:\\a", name: "a", size: 50, fileCount: 5 }],
		topFiles: [{ path: "X:\\a\\f.bin", name: "f.bin", size: 50, lastModified: 0 }],
		durationMs: 1234,
		totalDirsScanned: 3,
	};
}

/** 沙箱目录里现存报告基名列表。 */
async function listBases(dir) {
	const names = await readdir(dir);
	return names
		.filter((n) => n.startsWith("扫描结果-"))
		.map((n) => n.replace(/\.(md|json)$/, ""))
		.filter((v, i, arr) => arr.indexOf(v) === i)
		.sort();
}

async function main() {
	console.log("🧪 报告管理测试（时间戳 / 滚动保留 / RPC 端点）");
	console.log(`Node.js: ${process.version}`);

	// RPC handler 桩
	let handler;
	const ctx = {
		connection: { rpc: { handle: (channel, h) => { handler = h; return () => {}; } } },
		effect: () => () => {},
	};
	applyRpc(ctx);

	// ---- 1. 沙箱：滚动保留 ----
	console.log("\n=== 滚动保留（沙箱目录）===");
	const sandbox = await mkdtemp(join(tmpdir(), "pcc-report-test-"));
	for (let i = 0; i < REPORT_KEEP + 2; i++) {
		// 注入不同时间戳（间隔 1 秒）
		await writeReport(sandbox, fakeReport(["X:"]), new Date(2026, 0, 1, 8, 0, i));
	}
	const bases = await listBases(sandbox);
	assert(bases.length === REPORT_KEEP, `写入 ${REPORT_KEEP + 2} 份后仅保留 ${REPORT_KEEP} 份（实际 ${bases.length}）`);
	assert(!bases.includes("扫描结果-2026-01-01-080000"), "最旧的报告已被滚动清理");
	assert(bases.includes("扫描结果-2026-01-01-080011"), "最新的报告保留");

	// ---- 2. 真实工作区：list / get / delete ----
	console.log("\n=== RPC 端点（真实工作区目录）===");
	const wsResp = await handler("workspace/dir", {});
	assert(wsResp.ok && wsResp.value.path, "workspace/dir 返回目录");

	// 写入一份带特殊 target 的测试报告
	const marker = `TEST-${Date.now()}`;
	const mdPath = await writeReport(wsResp.value.path, fakeReport([marker]));
	assert(mdPath.endsWith(".md"), "writeReport 返回 Markdown 路径");

	const listResp = await handler("report/list", {});
	assert(listResp.ok, "report/list 成功");
	const reports = listResp.value.reports;
	assert(Array.isArray(reports), "report/list 返回数组");
	assert(reports.length >= 1 && reports.length <= REPORT_KEEP, `报告数量在 1..${REPORT_KEEP} 内（实际 ${reports.length}）`);
	const entry = reports.find((r) => (r.target ?? []).includes(marker));
	assert(entry !== undefined, "新建的测试报告出现在列表中");
	assert(reports[0].createdAt >= (reports[1]?.createdAt ?? 0), "列表按新→旧排序");

	const getResp = await handler("report/get", { file: entry.file });
	assert(getResp.ok && getResp.value.report.target[0] === marker, "report/get 返回完整报告数据");
	assert(getResp.value.report.resultFile.endsWith(".md"), "report/get 补充 Markdown 路径");

	// 路径穿越防护
	const badResp = await handler("report/get", { file: "..\\..\\secret.json" });
	assert(!badResp.ok, "非法文件名被拒绝（路径穿越防护）");

	// 删除（.md + .json 成对）
	const delResp = await handler("report/delete", { file: entry.file });
	assert(delResp.ok, "report/delete 成功");
	const listResp2 = await handler("report/list", {});
	assert(
		!listResp2.value.reports.some((r) => r.file === entry.file),
		"删除后列表中不再出现"
	);
	const after = await readdir(wsResp.value.path);
	assert(
		!after.some((n) => n.startsWith("扫描结果-") && n.includes(entry.file.replace(/\.json$/, ""))),
		".md 与 .json 均已删除"
	);

	// ---- 3. 旧格式报告兼容（升级前无时间戳命名）----
	console.log("\n=== 旧格式报告兼容 ===");
	// 模拟升级前生成的旧命名报告（仅 .md，无时间戳无 JSON 副本）
	const legacyName = "扫描结果-2026-09-03.md";
	await writeFile(join(wsResp.value.path, legacyName), "# 旧格式报告", "utf8");

	const legacyList = await handler("report/list", {});
	assert(legacyList.ok, "存在旧格式文件时 report/list 仍成功");
	const legacyEntry = legacyList.value.reports.find((r) => r.file === legacyName);
	assert(legacyEntry !== undefined, "旧格式报告出现在历史列表中（不再是僵尸文件）");
	assert(legacyEntry.legacy === true, "旧格式报告标记 legacy: true");
	assert(typeof legacyEntry.createdAt === "number" && legacyEntry.createdAt > 0, "旧格式报告取文件 mtime 作为时间");

	// 旧格式不支持页面查看，但拒绝信息友好
	const legacyGet = await handler("report/get", { file: legacyName });
	assert(!legacyGet.ok && /旧格式/.test(legacyGet.error?.message ?? ""), "旧格式 report/get 被拒并说明原因");

	// 旧格式可删除（清理僵尸文件）
	const legacyDel = await handler("report/delete", { file: legacyName });
	assert(legacyDel.ok, "旧格式 report/delete 成功");
	const afterLegacy = await readdir(wsResp.value.path);
	assert(!afterLegacy.includes(legacyName), "旧格式 .md 已删除");

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
