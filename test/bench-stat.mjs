/**
 * 基准测试：验证 stat 吞吐量与并发/线程池的关系。
 *
 * 用法:
 *   node test/bench-stat.mjs <目标目录>            # 主线程，默认线程池(4)
 *   $env:UV_THREADPOOL_SIZE=32; node test/...      # 大线程池
 *
 * 输出不同并发度下的 stat 吞吐（files/s），用于确定扫描器最优并发参数。
 */
import { readdir, stat } from "node:fs/promises";
import { join } from "node:path";

const target = process.argv[2] ?? "C:\\Program Files";
const SAMPLE_LIMIT = 20000;

/** 递归收集文件路径样本。 */
async function collectFiles(dir, out, depth = 0) {
	if (out.length >= SAMPLE_LIMIT || depth > 6) return;
	let entries;
	try {
		entries = await readdir(dir, { withFileTypes: true });
	} catch {
		return;
	}
	for (const e of entries) {
		if (out.length >= SAMPLE_LIMIT) return;
		const p = join(dir, e.name);
		if (e.isDirectory()) await collectFiles(p, out, depth + 1);
		else if (e.isFile()) out.push(p);
	}
}

/** 以固定并发度 stat 一批文件，返回耗时 ms。 */
async function statAll(paths, concurrency) {
	let index = 0;
	let errors = 0;
	async function worker() {
		while (index < paths.length) {
			const i = index++;
			try {
				await stat(paths[i]);
			} catch {
				errors++;
			}
		}
	}
	const start = Date.now();
	await Promise.all(Array.from({ length: Math.min(concurrency, paths.length) }, worker));
	return { ms: Date.now() - start, errors };
}

const files = [];
await collectFiles(target, files);
console.log(`目标: ${target}`);
console.log(`样本文件数: ${files.length}`);
console.log(`UV_THREADPOOL_SIZE = ${process.env.UV_THREADPOOL_SIZE ?? "4(默认)"}`);
console.log("---");

// 预热（填满文件系统缓存，保证各并发度公平对比）
await statAll(files.slice(0, 2000), 16);

for (const c of [1, 4, 16, 64, 128]) {
	const { ms, errors } = await statAll(files, c);
	const rate = (files.length / (ms / 1000)).toFixed(0);
	console.log(`并发 ${String(c).padStart(3)}: ${String(ms).padStart(6)} ms  (${rate} files/s)${errors ? `  errors=${errors}` : ""}`);
}
