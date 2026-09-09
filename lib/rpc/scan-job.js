/**
 * 后台全盘扫描任务（模块级单例状态，一次仅允许一个任务）。
 *
 * 扫描在后台 async 中执行，长任务不占用 RPC 请求；
 * 完成时结果裁剪为紧凑摘要（Top 目录/文件 + 各盘统计）写入 job.result，
 * 完整报告与全量目录明细另行走 writeReport 落盘。
 *
 * @module @dsh-plugin/disk-sentinel/rpc/scan-job
 */
import { scanDrivesFast } from "../scan-parallel.js";
import { probeDrive } from "./drives.js";
import { ensureWorkspaceDir } from "./workspace.js";
import { writeReport } from "./reports.js";

/** 全盘扫描的最大递归深度（放开限制，覆盖绝大多数真实目录层级）。 */
const FULL_SCAN_MAX_DEPTH = 32;

/** 返回给前端的 Top 汇总数量。 */
const RESULT_TOP_DIRS = 100;
const RESULT_TOP_FILES = 150;

/** 单次只允许一个扫描任务（模块级单例状态）。 */
let job = null;

/**
 * 执行扫描任务并更新 job 状态（在后台 async 中运行）。
 *
 * @param {string[]} drives - 要扫描的盘符列表。
 * @returns {Promise<void>}
 */
async function runScanJob(drives) {
	const controller = new AbortController();
	job.abortController = controller;

	const startedAt = Date.now();

	try {
		// 多线程并行扫描全部盘符（worker 线程 + 同步 fs，WinDirStat 式）
		const scan = await scanDrivesFast(
			drives.map((d) => `${d}\\`),
			{
				maxDepth: FULL_SCAN_MAX_DEPTH,
				signal: controller.signal,
				topDirsCount: 200,
				topFilesCount: 300,
				onProgress: (dirs, path, rootIndex) => {
					job.dirsScanned += dirs;
					if (path) {
						job.currentPath = path;
						if (rootIndex != null) {
							job.currentDrive = drives[rootIndex];
							job.driveIndex = rootIndex + 1;
						}
					}
				},
			}
		);

		// 并行探测各盘容量（仅用于报告展示）
		const capacities = await Promise.all(
			drives.map((d) => probeDrive(d).catch(() => null))
		);

		const driveStats = drives.map((drive, i) => ({
			drive,
			totalBytes: capacities[i]?.totalBytes ?? 0,
			freeBytes: capacities[i]?.freeBytes ?? 0,
			scannedBytes: scan.roots[i]?.size ?? 0,
			fileCount: scan.roots[i]?.fileCount ?? 0,
			dirCount: scan.roots[i]?.dirCount ?? 0,
		}));

		job.currentPath = "正在保存扫描报告…";
		const result = {
			target: drives,
			driveStats,
			topDirectories: scan.topDirectories.slice(0, RESULT_TOP_DIRS),
			topFiles: scan.topFiles.slice(0, RESULT_TOP_FILES),
			durationMs: Date.now() - startedAt,
			totalDirsScanned: job.dirsScanned,
			createdAt: Date.now(),
		};

		// 完整报告写入「磁盘哨兵」工作区目录，供会话中的模型读取（失败不影响结果）。
		// 全量目录明细只落盘、不进 job.result，避免 scan/status 轮询载荷膨胀
		try {
			const dir = await ensureWorkspaceDir();
			result.resultFile = await writeReport(dir, {
				...result,
				directories: scan.directories,
			});
		} catch {
			result.resultFile = null;
		}

		job.state = "done";
		job.finishedAt = Date.now();
		job.result = result;
	} catch (err) {
		job.finishedAt = Date.now();
		if (err && err.code === "SCAN_ABORTED") {
			job.state = "cancelled";
		} else {
			job.state = "error";
			job.error = err?.message ?? String(err);
		}
	}
}

/**
 * scan/start 端点：启动后台扫描任务（立即返回，不阻塞 RPC）。
 *
 * @param {"all"|string} target - "all" 扫全部盘符，否则为单个盘符。
 * @param {Object} deps        - { listDrives, normalizeDrive }（由 rpc/index 注入）。
 * @returns {Promise<{started: boolean, target: string, drives: string[]}|{error: string}>}
 *     失败时返回 {error}，由调用方转为 RPC 失败分支。
 */
async function startScanJob(target, { listDrives, normalizeDrive }) {
	if (job && job.state === "running") {
		return { error: "已有扫描任务进行中，请先取消或等待完成" };
	}
	let drives;
	if (target === "all") {
		drives = (await listDrives()).map((d) => d.drive);
		if (drives.length === 0) return { error: "未发现任何可用盘符" };
	} else {
		const drive = normalizeDrive(target);
		if (!drive) return { error: `无效的盘符: ${JSON.stringify(target)}` };
		drives = [drive];
	}
	job = {
		state: "running",
		target,
		drives,
		driveCount: drives.length,
		driveIndex: 0,
		currentDrive: null,
		dirsScanned: 0,
		currentPath: null,
		startedAt: Date.now(),
		finishedAt: null,
		result: null,
		error: null,
		abortController: null,
	};
	// 后台执行，不阻塞 RPC 响应
	Promise.resolve(runScanJob(drives)).catch(() => {});
	return { started: true, target, drives };
}

/**
 * scan/cancel 端点：取消进行中的任务。
 *
 * @returns {{cancelling: boolean}}
 */
function cancelScanJob() {
	if (job && job.state === "running" && job.abortController) {
		job.abortController.abort();
		return { cancelling: true };
	}
	return { cancelling: false };
}

/**
 * 任务状态快照（发送给浏览器）。
 *
 * @returns {Object}
 */
function jobSnapshot() {
	if (!job) {
		return { state: "idle" };
	}
	return {
		state: job.state,
		target: job.target,
		currentDrive: job.currentDrive ?? null,
		driveIndex: job.driveIndex ?? 0,
		driveCount: job.driveCount,
		dirsScanned: job.dirsScanned,
		currentPath: job.currentPath ?? null,
		elapsedMs: Date.now() - job.startedAt,
		result: job.state === "done" ? job.result : undefined,
		error: job.state === "error" ? job.error : undefined,
	};
}

export { runScanJob, startScanJob, cancelScanJob, jobSnapshot };
