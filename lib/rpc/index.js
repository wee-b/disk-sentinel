/**
 * 宿主侧 RPC 通道 —— 让浏览器「磁盘哨兵」页面直接触发扫描，绕过 LLM。
 *
 * 在 ctx.connection（DSH client-connection 宿主半）上注册 /disk-sentinel 逻辑通道：
 * - drives:     列出所有可用盘符及容量
 * - workspace/dir: 确保「磁盘哨兵」工作区目录存在（系统临时目录下）并返回路径
 * - scan/start: 启动后台全盘扫描任务（立即返回，不阻塞 RPC）
 * - scan/status: 轮询任务进度；完成时附带紧凑结果（Top 目录/文件 + 各盘统计）
 * - scan/cancel: 取消进行中的任务
 * - report/list:   列出工作区目录内的历史扫描报告（摘要）
 * - report/get:    读取某份历史报告的完整结构化数据（页面查看用）
 * - report/tree:   读取某份报告的全量目录明细（页面渲染目录树用）
 * - report/delete: 删除某份历史报告（.md/.json/.dirs.json.gz 成套删除）
 * - report/diff:   对比两份历史报告，返回差量（增长/缩小/新增/消失目录）并自动持久化
 * - diff/list:     列出已持久化的历史差量报告（摘要）
 * - diff/get:      读取一份历史差量（含全量变化明细，页面回看用）
 * - diff/delete:   删除某份历史差量（摘要与明细成对删除）
 * - plan/list:     列出工作区目录内的磁盘清理方案（AI 分析产物 .md）
 * - plan/get:      读取某份清理方案全文（页面查看用）
 * - plan/delete:   删除某份清理方案
 * - plan/open:     用系统默认关联程序打开某份清理方案
 * - dev-env/scan:  扫描开发环境变量与常见开发缓存目录
 *
 * 各端点的具体实现见 rpc/ 目录下的兄弟模块。
 *
 * @module @dsh-plugin/disk-sentinel/rpc
 */
import {
	WORKSPACE_DIRNAME,
	ensureWorkspaceDir,
} from "./workspace.js";
import {
	REPORT_NAME_RE,
	LEGACY_REPORT_NAME_RE,
	listReports,
	getReport,
	getReportTree,
	deleteReport,
} from "./reports.js";
import { diffReports, listDiffs, getDiff, deleteDiff, DIFF_NAME_RE } from "./diff.js";
import { PLAN_NAME_RE, listPlans, getPlan, deletePlan, openPlan } from "./plans.js";
import { scanDevEnvironment } from "./dev-env.js";
import { listDrives, normalizeDrive } from "./drives.js";
import { startScanJob, cancelScanJob, jobSnapshot } from "./scan-job.js";

/** RPC 逻辑通道名（须匹配 CHANNEL_PATTERN: /^\/[A-Za-z0-9._~-]+$/）。 */
const CHANNEL = "/disk-sentinel";

/** RPC 成功分支。 */
function ok(value) {
	return { ok: true, value };
}

/** RPC 失败分支（internal 为万能错误码）。 */
function fail(message) {
	return { ok: false, error: { code: "internal", message: String(message), details: {} } };
}

/**
 * 注册 /disk-sentinel RPC 通道。
 *
 * @param {Object} ctx - 已注入 connection 服务的 Cordis 上下文。
 */
export function applyRpc(ctx) {
	const dispose = ctx.connection.rpc.handle(
		CHANNEL,
		async (endpoint, payload) => {
			try {
				switch (endpoint) {
					case "drives": {
						return ok({ drives: await listDrives() });
					}
					case "workspace/dir": {
						const path = await ensureWorkspaceDir();
						return ok({ path, name: WORKSPACE_DIRNAME });
					}
					case "report/list": {
						return ok(await listReports());
					}
					case "report/get": {
						const name = String(payload?.file ?? "");
						if (LEGACY_REPORT_NAME_RE.test(name)) {
							return fail("旧格式报告无结构化数据（升级前生成），仅支持删除；可让 AI 直接读取该 .md 文件");
						}
						if (!REPORT_NAME_RE.test(name) || !name.endsWith(".json")) {
							return fail("无效的报告文件名");
						}
						try {
							return ok(await getReport(name));
						} catch {
							return fail("报告不存在或已损坏");
						}
					}
					case "report/tree": {
						// 返回一份报告的全量目录明细，供页面渲染可折叠目录树（WinDirStat 式）
						const name = String(payload?.file ?? "");
						if (!REPORT_NAME_RE.test(name) || !name.endsWith(".json")) {
							return fail("无效的报告文件名");
						}
						try {
							return ok(await getReportTree(name));
						} catch (err) {
							if (err?.code === "ENOENT") {
								return fail("该报告无全量目录明细（旧版本插件生成），仅支持榜单查看");
							}
							return fail("目录明细读取失败: " + (err?.message ?? String(err)));
						}
					}
					case "report/delete": {
						const name = String(payload?.file ?? "");
						if (!REPORT_NAME_RE.test(name) && !LEGACY_REPORT_NAME_RE.test(name)) {
							return fail("无效的报告文件名");
						}
						return ok(await deleteReport(name));
					}
					case "report/diff": {
						// 对比两份历史报告（顺序不限，自动以较早者为基准）
						const baseFile = String(payload?.baseFile ?? "");
						const targetFile = String(payload?.targetFile ?? "");
						const valid = (n) => REPORT_NAME_RE.test(n) && n.endsWith(".json");
						if (!valid(baseFile) || !valid(targetFile)) {
							return fail("无效的报告文件名");
						}
						if (baseFile === targetFile) {
							return fail("请选择两份不同的报告进行对比");
						}
						try {
							return ok(await diffReports(baseFile, targetFile));
						} catch (err) {
							// 明细文件缺失（旧版本生成的报告）时给出可操作的提示
							const message = err?.code === "ENOENT"
								? "所选报告缺少全量目录明细（旧版本插件生成），无法对比；请用新版插件重新扫描后再试"
								: "报告对比失败: " + (err?.message ?? String(err));
							return fail(message);
						}
					}
					case "diff/list": {
						return ok(await listDiffs());
					}
					case "diff/get": {
						const name = String(payload?.file ?? "");
						if (!DIFF_NAME_RE.test(name)) {
							return fail("无效的差量报告文件名");
						}
						try {
							return ok(await getDiff(name));
						} catch {
							return fail("差量报告不存在或已损坏");
						}
					}
					case "diff/delete": {
						const name = String(payload?.file ?? "");
						if (!DIFF_NAME_RE.test(name)) {
							return fail("无效的差量报告文件名");
						}
						return ok(await deleteDiff(name));
					}
					case "plan/list": {
						return ok(await listPlans());
					}
					case "plan/get": {
						const name = String(payload?.file ?? "");
						if (!PLAN_NAME_RE.test(name)) {
							return fail("无效的清理方案文件名");
						}
						try {
							return ok(await getPlan(name));
						} catch {
							return fail("清理方案不存在或已损坏");
						}
					}
					case "plan/delete": {
						const name = String(payload?.file ?? "");
						if (!PLAN_NAME_RE.test(name)) {
							return fail("无效的清理方案文件名");
						}
						return ok(await deletePlan(name));
					}
					case "plan/open": {
						const name = String(payload?.file ?? "");
						if (!PLAN_NAME_RE.test(name)) {
							return fail("无效的清理方案文件名");
						}
						try {
							return ok(await openPlan(name));
						} catch (err) {
							if (err?.code === "ENOENT") {
								return fail("清理方案不存在或已被删除");
							}
							return fail("打开清理方案失败: " + (err?.message ?? String(err)));
						}
					}
					case "dev-env/scan": {
						return ok(await scanDevEnvironment({ force: payload?.force === true }));
					}
					case "scan/start": {
						const started = await startScanJob(payload?.target, { listDrives, normalizeDrive });
						if (started.error) return fail(started.error);
						return ok(started);
					}
					case "scan/status": {
						return ok(jobSnapshot());
					}
					case "scan/cancel": {
						return ok(cancelScanJob());
					}
					default:
						return fail(`未知端点: ${endpoint}`);
				}
			} catch (err) {
				return fail(err?.message ?? String(err));
			}
		},
		{ authority: "loopback" }
	);

	ctx.effect(
		() => () => {
			// 卸载时取消进行中的扫描任务并注销通道
			cancelScanJob();
			Promise.resolve(dispose).catch(() => {});
		},
		"disk-sentinel: rpc channel"
	);
}
