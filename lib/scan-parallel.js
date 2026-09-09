/**
 * 多线程磁盘扫描器 —— WinDirStat 式「worker 线程池 + 同步 fs 调用」。
 *
 * 单线程 async 扫描的吞吐上限受事件循环的 Promise/微任务协调开销制约
 * （实测 ~12µs/文件，C 盘 67 万文件约 10s 即到顶）。本模块将目录任务
 * 动态分发到固定数量 worker 线程，线程内用 readdirSync/statSync 阻塞扫描：
 * - 免去 Promise 往返，单线程 stat 吞吐约 4 倍；
 * - 多线程并行撑满 NVMe 队列深度（8 线程实测聚合 ~35 万 stat/s）；
 * - 任务以「至多 budget 个目录」为粒度动态切分，自动负载均衡，
 *   避免巨型子树（WinSxS、AppData）造成单 worker 长尾；
 * - worker 仅回传目录级扁平记录（路径/直接文件字节/直接计数）与本地
 *   Top-K 文件堆（K ≥ 全局需求 N 时合并结果精确），不构建完整树，
 *   内存与 GC 压力极小；
 * - 主线程按父子路径自底向上求和，得到各根累计统计与全局 Top-N。
 *
 * 完整树 API（TreeNode）见 scan.js 的 scanTree，供小范围扫描使用；
 * 全盘扫描走本模块的紧凑结果。
 *
 * @module @dsh-plugin/disk-sentinel/scan-parallel
 */
import { Worker } from "node:worker_threads";
import { cpus } from "node:os";
import { SCAN_ABORTED } from "./scan.js";

/** 与 scan.js 保持一致的永久跳过目录（小写）。 */
const SKIP_DIR_NAMES = [
	"$recycle.bin",
	"system volume information",
	"$windows.~ws",
	"$windows.~bt",
];

/** 单个任务最多处理的目录数（负载均衡粒度）。 */
const TASK_BUDGET = 100;

/** worker 进度上报间隔（目录数）。 */
const PROGRESS_EVERY = 200;

/** 默认 worker 数：并行撑满磁盘队列，同时给宿主进程留出算力。 */
function defaultWorkerCount() {
	const n = cpus()?.length ?? 4;
	return Math.max(2, Math.min(8, n - 1));
}

/**
 * worker 线程源码（CJS，eval 模式执行，避免插件打包破坏文件路径解析）。
 *
 * 协议：
 * - 主线程 → worker: {type:"task", task:{dirPath, depth, root}}
 * - worker → 主线程: {type:"result", records, newTasks, dirs}
 *                 | {type:"progress", dirs, path, root}
 *                 | {type:"heaps", files}   （flush 时回传本地 Top-K 文件堆）
 */
const WORKER_SRC = String.raw`"use strict";
const { parentPort, workerData } = require("node:worker_threads");
const { readdirSync, statSync } = require("node:fs");

const SKIP = new Set(workerData.skipDirs);
const MAX_DEPTH = workerData.maxDepth;
const FILE_K = workerData.fileK;
const BUDGET = workerData.budget;
const PROGRESS_EVERY = workerData.progressEvery;

// 定容最小堆（按 size）：本地 Top-K 文件。K ≥ 全局需求 N 时合并结果精确。
// 全序比较：大小降序，等大小时路径升序决胜 —— 与主线程最终排序规则一致，
// 保证堆保留的成员与顺序在任意到达顺序下确定（否则边界平局会因遍历
// 顺序不同而互换，与 scanTree 的 Top-N 不可比）。
function betterFile(a, b) {
  if (a.size !== b.size) return a.size > b.size;
  return a.path < b.path;
}
const fileHeap = [];
function pushFile(v) {
  if (fileHeap.length < FILE_K) {
    fileHeap.push(v);
    let i = fileHeap.length - 1;
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (!betterFile(fileHeap[p], fileHeap[i])) break;
      const t = fileHeap[p]; fileHeap[p] = fileHeap[i]; fileHeap[i] = t;
      i = p;
    }
  } else if (betterFile(v, fileHeap[0])) {
    fileHeap[0] = v;
    let i = 0;
    for (;;) {
      const l = 2 * i + 1;
      const r = l + 1;
      let m = i;
      if (l < fileHeap.length && betterFile(fileHeap[m], fileHeap[l])) m = l;
      if (r < fileHeap.length && betterFile(fileHeap[m], fileHeap[r])) m = r;
      if (m === i) break;
      const t = fileHeap[m]; fileHeap[m] = fileHeap[i]; fileHeap[i] = t;
      i = m;
    }
  }
}

// 处理一个目录任务：DFS 扫描至多 BUDGET 个目录，剩余整目录作为新任务上交。
// 记录为扁平结构：p=路径 r=根索引 fb=直接文件字节 fc=直接文件数 dc=直接子目录数
// tr=深度截断 ae=访问错误。
function runTask(task) {
  const records = [];
  const newTasks = [];
  const stack = [task];
  let processed = 0;
  let dirs = 0;
  let sinceProgress = 0;

  while (stack.length > 0) {
    if (processed >= BUDGET) {
      while (stack.length > 0) newTasks.push(stack.pop());
      break;
    }
    const t = stack.pop();
    processed++;
    dirs++;
    sinceProgress++;
    if (sinceProgress >= PROGRESS_EVERY) {
      sinceProgress = 0;
      parentPort.postMessage({ type: "progress", dirs: dirs, path: t.dirPath, root: t.root });
      dirs = 0;
    }
    let entries;
    try {
      entries = readdirSync(t.dirPath, { withFileTypes: true });
    } catch (err) {
      records.push({ p: t.dirPath, r: t.root, fb: 0, fc: 0, dc: 0, ae: err.code || "UNKNOWN" });
      continue;
    }
    const sep = t.dirPath.endsWith("\\") || t.dirPath.endsWith("/") ? "" : "\\";
    let fb = 0;
    let fc = 0;
    let dc = 0;
    for (let i = 0; i < entries.length; i++) {
      const e = entries[i];
      const childPath = t.dirPath + sep + e.name;
      if (e.isDirectory()) {
        if (SKIP.has(e.name.toLowerCase())) continue;
        dc++;
        if (t.depth >= MAX_DEPTH) {
          // 超过最大深度：登记为截断目录（size 记 0，不再递归）
          records.push({ p: childPath, r: t.root, fb: 0, fc: 0, dc: 0, tr: 1 });
        } else {
          stack.push({ dirPath: childPath, depth: t.depth + 1, root: t.root });
        }
      } else if (e.isFile()) {
        let size = 0;
        let mtime = 0;
        try {
          const st = statSync(childPath);
          size = st.size;
          mtime = st.mtimeMs;
        } catch (e2) {}
        fb += size;
        fc++;
        pushFile({ path: childPath, name: e.name, size: size, lastModified: mtime });
      }
      // 符号链接、设备文件等跳过
    }
    records.push({ p: t.dirPath, r: t.root, fb: fb, fc: fc, dc: dc });
  }
  return { records: records, newTasks: newTasks, dirs: dirs };
}

parentPort.on("message", (msg) => {
  if (msg.type === "task") {
    const out = runTask(msg.task);
    parentPort.postMessage({
      type: "result",
      records: out.records,
      newTasks: out.newTasks,
      dirs: out.dirs,
    });
  } else if (msg.type === "flush") {
    parentPort.postMessage({ type: "heaps", files: fileHeap });
  }
});
`;

/**
 * 路径深度：根（如 "C:\"）为 0，"C:\Users" 为 1，"C:\Users\bin" 为 2。
 * 用于 Top 目录榜单的最小展示深度过滤。
 */
function pathDepth(p) {
	let depth = 0;
	for (let i = 0; i < p.length; i++) {
		if (p.charCodeAt(i) === 92) depth++;
	}
	return p.endsWith("\\") ? depth - 1 : depth;
}

/**
 * 汇总所有 worker 的扁平记录：建父子索引、自底向上求子树和，
 * 产出各根累计统计与全局 Top-N。
 */
function buildResult(roots, records, heapFiles, topDirsCount, topFilesCount, topDirsMinDepth) {
	// 父子索引：记录按父路径归类（父路径由路径截取，根记录除外）
	const byPath = new Map();
	for (const rec of records) byPath.set(rec.p, rec);

	const childrenOf = new Map();
	for (const rec of records) {
		const rootPath = roots[rec.r];
		if (rec.p === rootPath) continue;
		const cut = rec.p.lastIndexOf("\\");
		if (cut < 0) continue;
		// "C:\x" 的父是 "C:\"（保留分隔符），其余截到分隔符前
		const parent = cut === 2 && rec.p[1] === ":" ? rec.p.slice(0, 3) : rec.p.slice(0, cut);
		let list = childrenOf.get(parent);
		if (!list) childrenOf.set(parent, (list = []));
		list.push(rec);
	}

	// 自底向上求和（树深受 maxDepth 限制，递归安全）
	function resolve(rec) {
		if (rec.rs) return;
		rec.rs = 1;
		let size = rec.fb;
		let fc = rec.fc;
		let dc = rec.dc;
		const kids = childrenOf.get(rec.p);
		if (kids) {
			for (const k of kids) {
				resolve(k);
				size += k.size;
				fc += k.fileCount;
				dc += k.dirCount;
			}
		}
		rec.size = size;
		rec.fileCount = fc;
		rec.dirCount = dc;
	}
	for (const rec of records) resolve(rec);

	const rootStats = roots.map((p, i) => {
		const rec = byPath.get(p);
		return {
			path: p,
			size: rec?.size ?? 0,
			fileCount: rec?.fileCount ?? 0,
			dirCount: rec?.dirCount ?? 0,
			accessError: rec?.ae,
		};
	});

	// 全局 Top 目录（排除截断/不可访问目录；默认从二级目录开始展示，
	// 如 C:\Users\bin，避免根目录与一级目录占据榜单头部）
	const dirRecs = records.filter(
		(rec) => !rec.tr && !rec.ae && pathDepth(rec.p) >= topDirsMinDepth
	);
	// 等大小时按路径升序决胜（与 scan.js 的 Top-N 排序规则一致，见 betterFile 注释）
	const bySizeDescPath = (a, b) => (b.size - a.size) || (a.path < b.path ? -1 : a.path > b.path ? 1 : 0);
	dirRecs.sort(bySizeDescPath);
	const topDirectories = dirRecs.slice(0, topDirsCount).map((rec) => ({
		path: rec.p,
		name: rec.p.slice(rec.p.lastIndexOf("\\") + 1) || rec.p,
		size: rec.size,
		fileCount: rec.fileCount,
	}));

	// 全局 Top 文件（合并各 worker 本地堆，K ≥ N 保证精确）
	const files = [];
	for (const arr of heapFiles) {
		for (const f of arr) files.push(f);
	}
	files.sort(bySizeDescPath);
	const topFiles = files.slice(0, topFilesCount);

	// 全量目录明细（供两份报告间的差量对比）：非截断、无访问错误的自底向上
	// 求和结果，紧凑字段 p=路径 s=子树字节 f=文件数 d=子目录数。
	// records 本身已持有全部数据，这里只是投影，无额外扫描开销
	const directories = [];
	for (const rec of records) {
		if (rec.tr || rec.ae) continue;
		directories.push({ p: rec.p, s: rec.size, f: rec.fileCount, d: rec.dirCount });
	}

	return { roots: rootStats, topDirectories, topFiles, directories };
}

/**
 * 多线程扫描一个或多个根目录（通常是盘符根，如 "C:\"）。
 *
 * @param {string[]} rootPaths - 根目录绝对路径列表。
 * @param {Object} [options]
 * @param {number} [options.maxDepth=32]  - 最大递归深度。
 * @param {AbortSignal} [options.signal]  - 取消信号（终止全部 worker）。
 * @param {function(number, string|null, number|null): void} [options.onProgress]
 *     - 进度回调：(本次完成目录数增量, 当前扫描路径|null, 根索引|null)。
 * @param {number} [options.topDirsCount=200]  - 返回的 Top 目录数上限。
 * @param {number} [options.topDirsMinDepth=2] - Top 目录最小展示深度
 *     （相对盘根：1 = 一级目录如 C:\Users，2 = 二级目录如 C:\Users\bin）。
 * @param {number} [options.topFilesCount=300] - 返回的 Top 文件数上限
 *     （同时是 worker 本地堆容量；每 worker K ≥ N，合并结果精确）。
 * @param {number} [options.workerCount] - worker 线程数（默认按 CPU 数，2~8）。
 * @param {number} [options.budget=100]  - 单任务目录预算。
 * @returns {Promise<{roots: Array<{path: string, size: number, fileCount: number, dirCount: number, accessError?: string}>, topDirectories: Array<{path: string, name: string, size: number, fileCount: number}>, topFiles: Array<{path: string, name: string, size: number, lastModified: number}>, directories: Array<{p: string, s: number, f: number, d: number}>}>}
 *     directories 为全量目录明细（紧凑字段），供差量对比使用。
 */
export async function scanDrivesFast(rootPaths, options = {}) {
	const {
		maxDepth = 32,
		signal,
		onProgress,
		topDirsCount = 200,
		topDirsMinDepth = 2,
		topFilesCount = 300,
		workerCount = defaultWorkerCount(),
		budget = TASK_BUDGET,
	} = options;

	const roots = [...rootPaths];
	if (roots.length === 0) {
		return { roots: [], topDirectories: [], topFiles: [] };
	}
	if (signal?.aborted) {
		const err = new Error("扫描被取消");
		err.code = SCAN_ABORTED;
		throw err;
	}

	const records = [];
	const heapFiles = [];
	const workers = [];
	let queue = roots.map((p, i) => ({ dirPath: p, depth: 0, root: i }));
	let outstanding = queue.length;
	let idleWorkers = [];
	let flushRemaining = 0;
	let settled = false;

	return await new Promise((resolve, reject) => {
		function cleanup() {
			for (const w of workers) w.terminate().catch(() => {});
		}
		function fail(err) {
			if (settled) return;
			settled = true;
			signal?.removeEventListener("abort", onAbort);
			cleanup();
			reject(err);
		}
		function onAbort() {
			const err = new Error("扫描被取消");
			err.code = SCAN_ABORTED;
			fail(err);
		}
		signal?.addEventListener("abort", onAbort, { once: true });

		function dispatch() {
			while (queue.length > 0 && idleWorkers.length > 0) {
				const worker = idleWorkers.shift();
				worker.postMessage({ type: "task", task: queue.shift() });
			}
		}

		function handleResult(worker, msg) {
			for (const rec of msg.records) records.push(rec);
			outstanding += msg.newTasks.length - 1;
			for (const task of msg.newTasks) queue.push(task);
			if (msg.dirs > 0) onProgress?.(msg.dirs, null, null);
			if (outstanding === 0) {
				// 所有目录任务完成：回收各 worker 的本地 Top-K 文件堆
				flushRemaining = workers.length;
				for (const w of workers) w.postMessage({ type: "flush" });
			} else {
				idleWorkers.push(worker);
				dispatch();
			}
		}

		function handleHeaps(msg) {
			heapFiles.push(msg.files);
			flushRemaining--;
			if (flushRemaining === 0) {
				settled = true;
				signal?.removeEventListener("abort", onAbort);
				cleanup();
				resolve(buildResult(roots, records, heapFiles, topDirsCount, topFilesCount, topDirsMinDepth));
			}
		}

		for (let i = 0; i < workerCount; i++) {
			const worker = new Worker(WORKER_SRC, {
				eval: true,
				workerData: {
					skipDirs: SKIP_DIR_NAMES,
					maxDepth,
					fileK: topFilesCount,
					budget,
					progressEvery: PROGRESS_EVERY,
				},
			});
			workers.push(worker);
			idleWorkers.push(worker);
			worker.on("message", (msg) => {
				if (settled) return;
				if (msg.type === "result") handleResult(worker, msg);
				else if (msg.type === "progress") onProgress?.(msg.dirs, msg.path, msg.root);
				else if (msg.type === "heaps") handleHeaps(msg);
			});
			worker.on("error", (err) => fail(err));
		}
		dispatch();
	});
}
