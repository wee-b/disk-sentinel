/**
 * 开发环境后台扫描任务：让长时间目录统计不阻塞 RPC，并提供真实扫描进度。
 *
 * @module @dsh-plugin/disk-sentinel/rpc/dev-env-scan-job
 */
import { scanDevEnvironment } from "./dev-env.js";

let job = null;

async function runDevEnvScanJob(force, scan = scanDevEnvironment) {
	try {
		const result = await scan({
			force,
			onProgress(progress) {
				if (!job || job.state !== "running") return;
				job.filesScanned += Number(progress.fileDelta ?? 0);
				job.dirsScanned += Number(progress.dirDelta ?? 0);
				job.pathsScanned = Math.max(job.pathsScanned, Number(progress.pathsScanned ?? 0));
				if (progress.currentPath) job.currentPath = progress.currentPath;
			},
		});
		job.state = "done";
		job.finishedAt = Date.now();
		job.result = result;
	} catch (err) {
		job.state = "error";
		job.finishedAt = Date.now();
		job.error = err?.message ?? String(err);
	}
}

/** 启动扫描；已有任务运行时直接复用，便于页面切换后继续观察。 */
function startDevEnvScanJob(force, options = {}) {
	if (job?.state === "running") return { started: false, running: true };
	job = {
		state: "running",
		force: force === true,
		filesScanned: 0,
		dirsScanned: 0,
		pathsScanned: 0,
		currentPath: null,
		startedAt: Date.now(),
		finishedAt: null,
		result: null,
		error: null,
	};
	Promise.resolve(runDevEnvScanJob(job.force, options.scan)).catch(() => {});
	return { started: true, running: true };
}

/** 返回轻量状态快照，完成时才附带最终扫描结果。 */
function devEnvJobSnapshot() {
	if (!job) return { state: "idle" };
	return {
		state: job.state,
		filesScanned: job.filesScanned,
		dirsScanned: job.dirsScanned,
		pathsScanned: job.pathsScanned,
		currentPath: job.currentPath,
		elapsedMs: (job.finishedAt ?? Date.now()) - job.startedAt,
		result: job.state === "done" ? job.result : undefined,
		error: job.state === "error" ? job.error : undefined,
	};
}

export { runDevEnvScanJob, startDevEnvScanJob, devEnvJobSnapshot };
