/**
 * 基准测试：验证 statSync 在 worker_threads 中的吞吐扩展性。
 *
 * node test/bench-worker.mjs [worker数]
 */
import { readdirSync, statSync } from "node:fs";
import { Worker } from "node:worker_threads";
import { join } from "node:path";

const target = process.argv[2] ?? "C:\\Program Files";
const WORKER_COUNT = Number(process.argv[3] ?? 8);
const SAMPLE_LIMIT = Number(process.argv[4] ?? 20000);

function collectFiles(dir, out, depth = 0) {
	if (out.length >= SAMPLE_LIMIT || depth > 10) return;
	let entries;
	try {
		entries = readdirSync(dir, { withFileTypes: true });
	} catch {
		return;
	}
	for (const e of entries) {
		if (out.length >= SAMPLE_LIMIT) return;
		const p = join(dir, e.name);
		if (e.isDirectory()) collectFiles(p, out, depth + 1);
		else if (e.isFile()) out.push(p);
	}
}

const files = [];
collectFiles(target, files);
console.log(`目标: ${target}, 样本: ${files.length} 文件, workers: ${WORKER_COUNT}`);

// --- 单线程 statSync 基线 ---
{
	let n = 0;
	const t = Date.now();
	for (const f of files) {
		try {
			statSync(f);
			n++;
		} catch {}
	}
	const ms = Date.now() - t;
	console.log(`单线程 statSync: ${ms} ms (${(files.length / (ms / 1000)).toFixed(0)} files/s)`);
}

// --- 多 worker 并行 ---
const workerSource = `
const { parentPort, workerData } = require("node:worker_threads");
const { statSync } = require("node:fs");
(async () => {
	const { files } = workerData;
	const t = Date.now();
	let n = 0;
	for (const f of files) {
		try { statSync(f); n++; } catch {}
	}
	parentPort.postMessage({ ms: Date.now() - t, n });
})();
`;

const chunks = Array.from({ length: WORKER_COUNT }, (_, i) =>
	files.filter((_, idx) => idx % WORKER_COUNT === i)
);

{
	const t = Date.now();
	const results = await Promise.all(
		chunks.map(
			(chunk) =>
				new Promise((resolve) => {
					const w = new Worker(workerSource, { eval: true, workerData: { files: chunk } });
					w.on("message", (m) => { resolve(m); w.terminate(); });
				})
		)
	);
	const ms = Date.now() - t;
	const total = results.reduce((s, r) => s + r.n, 0);
	console.log(`${WORKER_COUNT} workers statSync: ${ms} ms (${(total / (ms / 1000)).toFixed(0)} files/s 聚合)`);
}
