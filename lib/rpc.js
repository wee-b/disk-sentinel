/**
 * 宿主侧 RPC 通道入口（ façade）。
 *
 * 实现已拆分到 lib/rpc/ 目录：
 * - rpc/index.js     —— /disk-sentinel 通道注册与端点分发
 * - rpc/workspace.js —— 「磁盘哨兵」工作区目录管理
 * - rpc/reports.js   —— 扫描报告三件套的持久化与读取
 * - rpc/diff.js      —— 两份报告的差量对比
 * - rpc/plans.js     —— 清理方案（AI 产物 .md）管理
 * - rpc/drives.js    —— 盘符探测与规范化
 * - rpc/scan-job.js  —— 后台全盘扫描任务（单例状态机）
 *
 * 此文件仅做再导出，保持既有导入路径（lib/rpc.js）兼容。
 *
 * @module @dsh-plugin/disk-sentinel/rpc
 */
export { applyRpc } from "./rpc/index.js";
export { writeReport, REPORT_KEEP } from "./rpc/reports.js";
