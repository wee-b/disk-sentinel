/**
 * 磁盘目录扫描核心 —— 类 WinDirStat 的高效目录树构建。
 *
 * 使用 Node.js 原生 fs API 递归扫描，避免子进程开销和 Windows 沙箱下
 * piped stdio 的 EPERM 限制。扫描结果为嵌套树形结构，每个节点携带
 * 累计大小，同时产出按大小排序的 Top-N 摘要供 LLM 快速定位大文件。
 *
 * 性能设计（目录工作池模型）：
 * - 固定数量的 worker 从共享队列拉取目录任务，跨目录并行推进 readdir/stat，
 *   让磁盘 I/O 队列始终饱和；
 * - 每个目录内的文件 stat 按块派发，子目录任务入队而非递归挂起，
 *   任意时刻挂起的 Promise 数量恒定有界（worker 数 × 块大小），
 *   避免全量派发造成数十万挂起闭包带来的 GC 雪崩与微任务级联；
 * - 聚合自底向上：子树完成后立即并入父节点计数，父节点计数归零即完成，
 *   无需父任务驻留等待子树。
 *
 * @module @dsh-plugin/disk-sentinel/scan
 */
import { readdir, stat } from "node:fs/promises";

/** 扫描被取消时抛出的错误码。 */
export const SCAN_ABORTED = "SCAN_ABORTED";

/**
 * 单个目录/文件节点。目录节点的 size 是其所有后代累计大小；
 * 文件节点的 size 是文件本身大小。
 *
 * @typedef {Object} TreeNode
 * @property {string} path  - 节点绝对路径。
 * @property {string} name  - 节点名称（basename）。
 * @property {number} size  - 累计字节数（目录为后代之和，文件为自身大小）。
 * @property {boolean} isDir - 是否为目录。
 * @property {number} [fileCount]  - 目录后代文件总数（仅目录）。
 * @property {number} [dirCount]   - 目录后代子目录总数（仅目录）。
 * @property {number} [lastModified] - 最近修改时间戳 ms（目录取后代最新）。
 * @property {TreeNode[]} [children] - 子节点（仅目录），已按 size 降序排列。
 */

/**
 * 将字节数格式化为人类可读字符串。
 * @param {number} bytes
 * @returns {string}
 */
export function formatBytes(bytes) {
	if (bytes < 1024) return `${bytes} B`;
	const units = ["KB", "MB", "GB", "TB", "PB"];
	let value = bytes / 1024;
	let unitIndex = 0;
	while (value >= 1024 && unitIndex < units.length - 1) {
		value /= 1024;
		unitIndex++;
	}
	return `${value.toFixed(2)} ${units[unitIndex]}`;
}

/**
 * 永远跳过的目录名（系统关键目录，扫描它们无意义且有风险）。
 * 使用小写匹配。
 */
const SKIP_DIR_NAMES = new Set([
	"$recycle.bin",       // 回收站（单独处理）
	"system volume information",
	"$windows.~ws",
	"$windows.~bt",
]);

/**
 * 永远跳过的目录前缀（Windows 特殊目录）。
 */
const SKIP_PATH_PREFIXES = [
	"\\\\?\\",       // 长路径前缀，规范化后不应出现
];

/** 应当跳过的目录判断。 */
function shouldSkipDir(lowerName) {
	return SKIP_DIR_NAMES.has(lowerName);
}

/** 构造取消错误。 */
function abortError() {
	const err = new Error("扫描被取消");
	err.code = SCAN_ABORTED;
	return err;
}

/**
 * 并发调优参数（本机 NVMe 实测）：
 * - WORKERS：并行处理的目录数，16 即可让 4 线程的 libuv 线程池满载；
 * - STAT_CHUNK：单目录文件 stat 的分块大小，控制挂起 Promise 上限
 *   （WORKERS × STAT_CHUNK），同时保证块内并行度足够。
 */
const WORKERS = 16;
const STAT_CHUNK = 64;

/** 拼接子路径（替代 join()：全盘扫描有数百万次调用，规范化开销可观）。 */
function concatPath(dirPath, name) {
	return dirPath.endsWith("\\") || dirPath.endsWith("/")
		? dirPath + name
		: dirPath + "\\" + name;
}

/** 目录显示名（"C:\" → "C:"）。 */
function dirNameOf(dirPath) {
	return dirPath.split(/[\\/]/).filter(Boolean).pop() ?? dirPath;
}

/** 目录节点的错误占位形态（readdir 失败时返回）。 */
function inaccessibleNode(dirPath, code) {
	return {
		path: dirPath,
		name: dirNameOf(dirPath),
		size: 0,
		isDir: true,
		fileCount: 0,
		dirCount: 0,
		children: [],
		accessError: code ?? "UNKNOWN",
		lastModified: 0,
	};
}

/** 把子节点聚合进父节点的累计字段。 */
function aggregateInto(parent, node) {
	parent.children.push(node);
	parent.size += node.size;
	if (node.isDir) {
		parent.dirCount += 1 + (node.dirCount ?? 0);
		parent.fileCount += node.fileCount ?? 0;
	} else {
		parent.fileCount += 1;
	}
	if (node.lastModified > parent.lastModified) parent.lastModified = node.lastModified;
}

/**
 * 扫描指定目录，返回完整目录树。
 *
 * @param {string} rootPath - 要扫描的根目录绝对路径。
 * @param {Object} [options]
 * @param {number} [options.maxDepth=8]      - 最大递归深度。
 * @param {AbortSignal} [options.signal]     - 取消信号。
 * @param {function(string): void} [options.onDir] - 进度回调。
 * @returns {Promise<TreeNode>} 根节点（含完整子树）。
 */
export async function scanTree(rootPath, options = {}) {
	const { maxDepth = 8, signal, onDir } = options;

	// ---- 工作池状态 ----
	const queue = [];        // 待处理目录任务
	const wakeups = [];      // 空闲 worker 的唤醒队列
	let unfinished = 0;      // 未完成的目录任务数（排队中 / 处理中 / 待子项聚合）
	let stopped = false;
	let settle;
	const done = new Promise((resolve, reject) => (settle = { resolve, reject }));

	function wakeAll() {
		stopped = true;
		for (const wake of wakeups.splice(0)) wake();
	}

	function enqueue(task) {
		unfinished++;
		queue.push(task);
		wakeups.shift()?.();
	}

	/** 一个子单元（子目录任务或文件块）完成时回调。 */
	function childUnitDone(task) {
		task.pending--;
		if (task.pending === 0) finalizeTask(task);
	}

	/** 目录子树聚合完毕：排序、并入父节点、级联检查父节点完成。 */
	function finalizeTask(task) {
		unfinished--;
		const node = task.node;
		node.children.sort((a, b) => b.size - a.size);
		const parent = task.parent;
		if (!parent) {
			settle.resolve(node);
			wakeAll();
			return;
		}
		aggregateInto(parent.node, node);
		childUnitDone(parent);
	}

	/** 分块 stat 一个目录的文件列表，完成后并入目录节点。 */
	async function statChunk(task, node, chunkEntries) {
		try {
			const dirPath = node.path;
			const stats = await Promise.all(
				chunkEntries.map(async (entry) => {
					const childPath = concatPath(dirPath, entry.name);
					let fileStat;
					try {
						fileStat = await stat(childPath);
					} catch {
						fileStat = null;
					}
					return {
						path: childPath,
						name: entry.name,
						size: fileStat?.size ?? 0,
						isDir: false,
						lastModified: fileStat?.mtimeMs ?? 0,
					};
				})
			);
			for (const fileNode of stats) aggregateInto(node, fileNode);
		} finally {
			childUnitDone(task);
		}
	}

	/** 处理一个目录任务：readdir、登记子目录任务、分块 stat 文件。 */
	async function processTask(task) {
		if (signal?.aborted) {
			settle.reject(abortError());
			wakeAll();
			return;
		}
		onDir?.(task.dirPath);

		let entries;
		try {
			entries = await readdir(task.dirPath, { withFileTypes: true });
		} catch (err) {
			// 权限不足或目录不存在：返回空目录节点，不中断整体扫描
			task.node = inaccessibleNode(task.dirPath, err.code);
			finalizeTask(task);
			return;
		}

		const node = {
			path: task.dirPath,
			name: dirNameOf(task.dirPath),
			size: 0,
			isDir: true,
			fileCount: 0,
			dirCount: 0,
			children: [],
			lastModified: 0,
		};
		task.node = node;

		const subdirs = [];
		const files = [];
		for (const entry of entries) {
			if (entry.isDirectory()) {
				if (shouldSkipDir(entry.name.toLowerCase())) continue;
				const childPath = concatPath(task.dirPath, entry.name);
				if (task.depth >= maxDepth) {
					// 超过最大深度：只登记目录存在但不递归（不再额外 stat）
					node.children.push({
						path: childPath,
						name: entry.name,
						size: 0,
						isDir: true,
						fileCount: 0,
						dirCount: 0,
						children: [],
						truncated: true, // 标记因深度截断未展开
						lastModified: 0,
					});
				} else {
					subdirs.push({ dirPath: childPath, depth: task.depth + 1, parent: task, node: null, pending: 0 });
				}
			} else if (entry.isFile()) {
				files.push(entry);
			}
			// 符号链接、设备文件等跳过
		}

		task.pending = subdirs.length + Math.ceil(files.length / STAT_CHUNK);
		if (task.pending === 0) {
			finalizeTask(task);
			return;
		}

		// 子目录任务立即入队，由其他 worker 并行处理
		for (const sub of subdirs) enqueue(sub);
		// 本目录的文件块顺序处理：worker 在此驻留，使在途 stat 请求数
		// 恒定有界（WORKERS × STAT_CHUNK），避免无界派发导致 GC 雪崩
		for (let i = 0; i < files.length; i += STAT_CHUNK) {
			if (signal?.aborted) return;
			await statChunk(task, node, files.slice(i, i + STAT_CHUNK));
		}
	}

	// ---- worker 循环 ----
	async function worker() {
		while (!stopped) {
			if (signal?.aborted) {
				settle.reject(abortError());
				wakeAll();
				return;
			}
			const task = queue.shift();
			if (task) {
				await processTask(task);
				continue;
			}
			// 队列空：还有未完成任务时等待新任务入队；全部完成时由 finalizeTask 收尾
			await new Promise((wake) => wakeups.push(wake));
		}
	}

	enqueue({ dirPath: rootPath, depth: 0, parent: null, node: null, pending: 0 });
	await Promise.all(Array.from({ length: WORKERS }, worker));
	return done;
}

/**
 * 从树中提取按大小降序排列的 Top-N 目录列表。
 * 只包含非截断的已展开目录（有真实累计大小）。
 *
 * @param {TreeNode} tree     - 扫描得到的目录树。
 * @param {number} [count=30] - 返回的目录数量上限。
 * @returns {Array<{path: string, name: string, size: number, fileCount: number}>}
 */
export function topDirectoriesBySize(tree, count = 30) {
	const dirs = [];
	function walk(node) {
		if (!node.isDir) return;
		if (!node.truncated) {
			dirs.push({
				path: node.path,
				name: node.name,
				size: node.size,
				fileCount: node.fileCount ?? 0,
			});
		}
		if (node.children) {
			for (const child of node.children) walk(child);
		}
	}
	walk(tree);
	// 等大小时按路径升序决胜：与 scan-parallel 的排序规则一致，
	// 保证两个实现（及跨运行）的 Top-N 顺序确定
	dirs.sort((a, b) => (b.size - a.size) || (a.path < b.path ? -1 : a.path > b.path ? 1 : 0));
	return dirs.slice(0, count);
}

/**
 * 从树中提取按大小降序排列的 Top-N 文件列表。
 *
 * @param {TreeNode} tree     - 扫描得到的目录树。
 * @param {number} [count=50] - 返回的文件数量上限。
 * @returns {Array<{path: string, name: string, size: number, lastModified: number}>}
 */
export function topFilesBySize(tree, count = 50) {
	const files = [];
	function walk(node) {
		if (!node.isDir) {
			files.push({
				path: node.path,
				name: node.name,
				size: node.size,
				lastModified: node.lastModified ?? 0,
			});
			return;
		}
		if (node.children) {
			for (const child of node.children) walk(child);
		}
	}
	walk(tree);
	// 等大小时按路径升序决胜（与 topDirectoriesBySize / scan-parallel 一致）
	files.sort((a, b) => (b.size - a.size) || (a.path < b.path ? -1 : a.path > b.path ? 1 : 0));
	return files.slice(0, count);
}

/**
 * 将树渲染为缩进文本（类似 tree 命令），带大小标注。
 * 仅渲染前 maxNodes 个节点，避免输出过大。
 *
 * @param {TreeNode} tree
 * @param {number} [maxNodes=200] - 最多渲染的节点数。
 * @param {string} [prefix=""]    - 缩进前缀（递归用）。
 * @param {{count: number}} [state] - 内部计数状态。
 * @returns {string}
 */
export function renderTreeText(tree, maxNodes = 200, prefix = "", state = { count: 0 }) {
	if (state.count >= maxNodes) return "";
	state.count++;
	const sizeStr = formatBytes(tree.size);
	const marker = tree.isDir ? "📁" : "📄";
	let line = `${prefix}${marker} ${tree.name}  [${sizeStr}]`;
	if (tree.truncated) line += " (未展开)";
	if (tree.accessError) line += ` (无法访问: ${tree.accessError})`;
	let result = line + "\n";
	if (tree.isDir && tree.children && !tree.truncated) {
		const childPrefix = prefix + "  ";
		for (const child of tree.children) {
			if (state.count >= maxNodes) {
				result += `${childPrefix}... (已截断，共 ${tree.children.length} 个子项)\n`;
				break;
			}
			result += renderTreeText(child, maxNodes, childPrefix, state);
		}
	}
	return result;
}
