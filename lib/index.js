/**
 * DeepSeek Harness 磁盘哨兵插件 —— Windows 磁盘分析与安全清理工具（插件入口）。
 *
 * 提供三个模型可调用工具：
 * - disk_scan:  扫描指定目录，返回 WinDirStat 风格的目录树 + Top-N 大文件/大目录摘要。
 * - clean_disk: 按预定义垃圾类别执行清理，或预估可回收空间。
 * - dev_env_migrate: 由 AI 为已扫描开发目录生成并执行可回滚迁移计划。
 *
 * 设计目标：让 LLM 一次工具调用即可获取完整目录结构，而非自己生成 shell 命令
 * 逐目录扫描（效率极低）。预定义常见垃圾目录覆盖常见清理需求；特殊需求由 LLM
 * 自行决策。
 *
 * 模块结构：
 * - tools/disk-scan.js / tools/clean-disk.js —— LLM 工具注册
 * - rpc.js（→ lib/rpc/）—— 浏览器「磁盘哨兵」页面直连宿主的 RPC 通道
 * - scan.js / scan-parallel.js —— 单线程 / worker 并行扫描器
 * - clean.js / junk-definitions.js —— 清理执行与预定义垃圾清单
 *
 * @module @dsh-plugin/disk-sentinel
 */
import z from "@deepseek-ai/schemastery";
import { scanTree, topDirectoriesBySize, topFilesBySize, renderTreeText, formatBytes } from "./scan.js";
import { rankApplications } from "./application-ranking.js";
import {
	JUNK_CATEGORIES,
	TRANSFERABLE_SUGGESTIONS,
	listJunkCategories,
	getJunkCategory,
	resolveEnvPath,
} from "./junk-definitions.js";
import {
	executeCleanCategory,
	estimateCategoriesSize,
	estimateCategorySize,
	runPowerShell,
} from "./clean.js";
import { applyRpc } from "./rpc.js";
import { applyDiskScanTool } from "./tools/disk-scan.js";
import { applyCleanDiskTool } from "./tools/clean-disk.js";
import { applyDevEnvMigrateTool } from "./tools/dev-env-migrate.js";

/** Cordis 插件名。 */
const name = "disk-sentinel";

/** 需要注入的服务。 */
const inject = [
	"tools",
	"systemPrompt",
	"subprocess",
	"connection",
	"webServer",
];

/** 默认扫描超时（ms）—— C 盘全盘扫描可能耗时数分钟。 */
const DEFAULT_SCAN_TIMEOUT_MS = 300000; // 5 分钟

/** 默认清理超时（ms）。 */
const DEFAULT_CLEAN_TIMEOUT_MS = 120000; // 2 分钟

/** 默认开发环境迁移超时（ms）。 */
const DEFAULT_MIGRATION_TIMEOUT_MS = 30 * 60 * 1000; // 30 分钟

/** 默认最大递归深度。 */
const DEFAULT_MAX_DEPTH = 8;

/** 默认 Top-N 数量。 */
const DEFAULT_TOP_DIRS = 30;
const DEFAULT_TOP_FILES = 50;

const Config = z.object({
	/** 扫描超时。 */
	scanTimeoutMs: z.number().default(DEFAULT_SCAN_TIMEOUT_MS),
	/** 清理超时。 */
	cleanTimeoutMs: z.number().default(DEFAULT_CLEAN_TIMEOUT_MS),
	/** 开发环境目录迁移超时。 */
	migrationTimeoutMs: z.number().default(DEFAULT_MIGRATION_TIMEOUT_MS),
	/** 最大递归深度。 */
	maxDepth: z.number().default(DEFAULT_MAX_DEPTH),
	/** 返回的 Top 目录数。 */
	topDirsCount: z.number().default(DEFAULT_TOP_DIRS),
	/** 返回的 Top 文件数。 */
	topFilesCount: z.number().default(DEFAULT_TOP_FILES),
	/** 树形文本渲染的最大节点数。 */
	treeRenderMaxNodes: z.number().default(200),
});

/**
 * 插件入口：注册工具与系统提示。
 *
 * @param {Object} ctx    - Cordis 插件上下文。
 * @param {Object} config - 解析后的插件配置。
 */
function apply(ctx, config) {
	const resolved = config;
	// 校验配置
	for (const [key, val] of Object.entries({
		scanTimeoutMs: resolved.scanTimeoutMs,
		cleanTimeoutMs: resolved.cleanTimeoutMs,
		migrationTimeoutMs: resolved.migrationTimeoutMs,
		maxDepth: resolved.maxDepth,
		topDirsCount: resolved.topDirsCount,
		topFilesCount: resolved.topFilesCount,
		treeRenderMaxNodes: resolved.treeRenderMaxNodes,
	})) {
		if (!Number.isInteger(val) || val < 1) {
			throw new Error(`disk-sentinel: ${key} must be a positive integer`);
		}
	}

	const caps = {
		scanTimeoutMs: resolved.scanTimeoutMs,
		cleanTimeoutMs: resolved.cleanTimeoutMs,
		migrationTimeoutMs: resolved.migrationTimeoutMs,
		maxDepth: resolved.maxDepth,
		topDirsCount: resolved.topDirsCount,
		topFilesCount: resolved.topFilesCount,
		treeRenderMaxNodes: resolved.treeRenderMaxNodes,
	};

	applyDiskScanTool(ctx, caps);
	applyCleanDiskTool(ctx, caps);
	applyDevEnvMigrateTool(ctx, caps);

	// connection 会把 RPC 路由挂到 webServer；二者均由本插件声明式注入。
	applyRpc(ctx);
}

export {
	Config,
	apply,
	name,
	inject,
	// 暴露子模块供测试
	scanTree,
	topDirectoriesBySize,
	topFilesBySize,
	renderTreeText,
	formatBytes,
	rankApplications,
	JUNK_CATEGORIES,
	TRANSFERABLE_SUGGESTIONS,
	listJunkCategories,
	getJunkCategory,
	resolveEnvPath,
	executeCleanCategory,
	estimateCategoriesSize,
	estimateCategorySize,
	runPowerShell,
};
