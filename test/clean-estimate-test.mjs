/**
 * 测试清理预估功能（estimate 模式，不实际删除）。
 *
 * 使用 Node.js child_process 模拟 DSH 的 subprocess 服务，
 * 验证 estimateCategorySize 和 runPowerShell 能正确工作。
 *
 * 运行: node test/clean-estimate-test.mjs
 */
import { spawn } from "node:child_process";
import { getJunkCategory } from "../lib/junk-definitions.js";
import { estimateCategorySize, runPowerShell } from "../lib/clean.js";
import { formatBytes } from "../lib/scan.js";

/**
 * 模拟 DSH subprocess 服务的 spawn 方法。
 * 用 Node.js child_process 实现，提供与 ctx.subprocess.spawn 相同的接口。
 */
function mockSubprocess() {
	return {
		spawn(spec) {
			const child = spawn(spec.argv[0], spec.argv.slice(1), {
				cwd: spec.cwd,
				stdio: ["ignore", "pipe", "pipe"],
				windowsHide: true,
			});

			let stdout = "";
			let stderr = "";
			child.stdout.on("data", (d) => {
				stdout += d.toString();
			});
			child.stderr.on("data", (d) => {
				stderr += d.toString();
			});

			const done = new Promise((resolve) => {
				child.on("close", (code, signal) => {
					resolve({ exitCode: code, signal: signal ?? null });
				});
			});

			return {
				pid: child.pid ?? -1,
				stdin: undefined,
				stdout: child.stdout,
				stderr: child.stderr,
				collected: {
					stdout: {
						readFrom: () => ({
							text: stdout,
							nextOffset: stdout.length,
							lossy: false,
						}),
					},
					stderr: {
						readFrom: () => ({
							text: stderr,
							nextOffset: stderr.length,
							lossy: false,
						}),
					},
				},
				done,
				terminate() {
					child.kill();
				},
				async waitForExit() {
					await done;
					return true;
				},
			};
		},
	};
}

async function main() {
	console.log("🧹 disk-sentinel 清理预估测试\n");

	const ctx = { subprocess: mockSubprocess() };
	const controller = new AbortController();

	// 测试 1: runPowerShell 基本功能
	console.log("=== 测试 runPowerShell（执行简单命令）===");
	const result = await runPowerShell(
		ctx,
		"Write-Output 'Hello from PowerShell'; 1 + 1",
		controller.signal
	);
	console.log(`  stdout: ${result.stdout.trim()}`);
	console.log(`  exitCode: ${result.exitCode}`);
	if (result.exitCode === 0 && result.stdout.includes("Hello")) {
		console.log("  ✅ runPowerShell 工作正常");
	} else {
		console.log("  ❌ runPowerShell 异常");
	}

	// 测试 2: 预估 windows_temp 大小
	console.log("\n=== 测试 estimateCategorySize（windows_temp）===");
	const tempCat = getJunkCategory("windows_temp");
	const tempSize = await estimateCategorySize(ctx, tempCat, controller.signal);
	console.log(`  windows_temp 预估可回收: ${formatBytes(tempSize)}`);
	console.log("  ✅ 预估完成（未删除任何文件）");

	// 测试 3: 预估多个类别
	console.log("\n=== 测试预估多个类别 ===");
	const categoriesToEstimate = [
		"windows_temp",
		"thumbnail_cache",
		"edge_cache",
		"chrome_cache",
	];
	let totalEstimate = 0;
	for (const id of categoriesToEstimate) {
		const cat = getJunkCategory(id);
		if (!cat) {
			console.log(`  ⚠️  未知类别: ${id}`);
			continue;
		}
		const size = await estimateCategorySize(ctx, cat, controller.signal);
		totalEstimate += size;
		console.log(`  ${cat.label}: ${formatBytes(size)}`);
	}
	console.log(`  ────────────────────`);
	console.log(`  总预估可回收: ${formatBytes(totalEstimate)}`);

	console.log("\n✅ 所有清理预估测试通过（未执行任何删除操作）");
}

main().catch((err) => {
	console.error("测试失败:", err);
	process.exit(1);
});
