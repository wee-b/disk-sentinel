/**
 * 基准测试：worker 内完整流水线（readdirSync + statSync + 记录构建）的并行扩展性。
 *
 * node test/bench-pipeline.mjs [目标目录] [worker数]
 */
import { readdirSync } from "node:fs";
import { Worker } from "node:worker_threads";

const target = process.argv[2] ?? "C:\\Windows";
const WORKER_COUNT = Number(process.argv[3] ?? 8);

// 收集目标目录的一级子目录作为任务
const subdirs = readdirSync(target, { withFileTypes: true })
	.filter((e) => e.isDirectory())
	.map((e) => `${target}\\${e.name}`);
console.log(`目标: ${target}, 一级子目录任务: ${subdirs.length}, workers: ${WORKER_COUNT}`);

const workerSource = `
const { parentPort, workerData } = require("node:worker_threads");
const { readdirSync, statSync } = require("node:fs");
const SKIP = new Set(["$recycle.bin", "system volume information"]);
parentPort.on("message", (tasks) => {
  const t = Date.now();
  let entries = 0, files = 0, dirs = 0, bytes = 0;
  const stack = tasks.slice();
  while (stack.length > 0) {
    const dir = stack.pop();
    dirs++;
    let list;
    try { list = readdirSync(dir, { withFileTypes: true }); } catch { continue; }
    const sep = dir.endsWith("\\\\") ? "" : "\\\\";
    for (const e of list) {
      entries++;
      if (e.isDirectory()) {
        if (!SKIP.has(e.name.toLowerCase())) stack.push(dir + sep + e.name);
      } else if (e.isFile()) {
        try { bytes += statSync(dir + sep + e.name).size; files++; } catch {}
      }
    }
  }
  parentPort.postMessage({ ms: Date.now() - t, entries, files, dirs, bytes });
});
`;

// 轮询任务分发（模拟扫描器的动态调度）
const queue = [...subdirs];
const results = await new Promise((resolve) => {
	const collected = [];
	const idle = [];
	const workers = [];
	for (let i = 0; i < WORKER_COUNT; i++) {
		const w = new Worker(workerSource, { eval: true });
		workers.push(w);
		idle.push(w);
		w.on("message", (m) => {
			collected.push(m);
			if (queue.length > 0) w.postMessage([queue.shift()]);
			else if (collected.length === workers.length) resolve(collected);
			else idle.push(w);
		});
	}
	for (const w of idle.splice(0)) {
		if (queue.length > 0) w.postMessage([queue.shift()]);
	}
	// 剩余任务在 worker 回报后继续派发
	const timer = setInterval(() => {
		while (queue.length > 0 && idle.length > 0) {
			idle.shift().postMessage([queue.shift()]);
		}
		if (queue.length === 0) clearInterval(timer);
	}, 10);
});

for (const w of []) {} // noop
const total = results.reduce(
	(a, r) => ({ entries: a.entries + r.entries, files: a.files + r.files, dirs: a.dirs + r.dirs }),
	{ entries: 0, files: 0, dirs: 0 }
);
const maxMs = Math.max(...results.map((r) => r.ms));
console.log(`聚合: ${total.entries} entries (${total.files} files, ${total.dirs} dirs)`);
console.log(`最长 worker 耗时: ${maxMs} ms → 吞吐 ${(total.entries / (maxMs / 1000) / 1000).toFixed(0)}k entries/s`);
process.exit(0);
