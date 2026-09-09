/**
 * 批量预估性能基准：模拟 clean_disk estimate 模式一次传入全部类别，
 * 验证合并为单次 PowerShell 调用 + .NET 枚举后的耗时（不实际删除）。
 *
 * 运行: node test/clean-estimate-bench.mjs
 */
import { spawn } from "node:child_process";
import { getJunkCategory } from "../lib/junk-definitions.js";
import { estimateCategoriesSize } from "../lib/clean.js";
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
	console.log("🧹 disk-sentinel 批量预估性能基准\n");

	const ctx = { subprocess: mockSubprocess() };
	const controller = new AbortController();

	// 与用户实际调用相同的 12 个类别
	const ids = [
		"windows_temp",
		"windows_prefetch",
		"windows_update_cache",
		"recycle_bin",
		"npm_cache",
		"pip_cache",
		"thumbnail_cache",
		"windows_logs",
		"memory_dumps",
		"edge_cache",
		"chrome_cache",
		"delivery_optimization",
	];
	const categories = ids.map(getJunkCategory).filter(Boolean);

	const t0 = Date.now();
	const map = await estimateCategoriesSize(ctx, categories, controller.signal);
	const elapsed = Date.now() - t0;

	let total = 0;
	for (const id of ids) {
		const bytes = map.get(id) ?? 0;
		total += bytes;
		console.log(`  ${id}: ${formatBytes(bytes)}`);
	}
	console.log(`  ────────────────────`);
	console.log(`  总预估可回收: ${formatBytes(total)}`);
	console.log(`\n⏱️  12 个类别批量预估耗时: ${(elapsed / 1000).toFixed(1)}s（旧实现约 2-3 分钟）`);
}

main().catch((err) => {
	console.error("测试失败:", err);
	process.exit(1);
});
