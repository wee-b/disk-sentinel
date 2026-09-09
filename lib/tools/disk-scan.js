/**
 * disk_scan 工具注册（LLM 可调用）：WinDirStat 风格目录扫描。
 *
 * 一次调用返回完整树形结构 + Top-N 大文件/目录，避免 LLM 自己生成
 * shell 命令逐目录扫描。
 *
 * @module @dsh-plugin/disk-sentinel/tools/disk-scan
 */
import { defineTool } from "@deepseek-ai/dsh-tools";
import {
	scanTree,
	topDirectoriesBySize,
	topFilesBySize,
	formatBytes,
} from "../scan.js";
import { resolveEnvPath } from "../junk-definitions.js";

/**
 * 注册 disk_scan 工具。
 *
 * @param {Object} ctx  - 插件上下文。
 * @param {Object} caps - 解析后的配置。
 */
export function applyDiskScanTool(ctx, caps) {
	ctx.systemPrompt.section({
		name: "tool:disk_scan",
		order: 130,
		text: [
			"Use the disk_scan tool to scan a directory and get a WinDirStat-style directory tree with sizes. ",
			"One call returns the full tree structure, Top-N largest directories, and Top-N largest files — ",
			"do NOT generate your own `dir`/`Get-ChildItem` commands to scan; this tool is far more efficient. ",
			"Use it to identify large files and junk locations for disk cleanup.",
		].join(""),
	});

	const tool = defineTool({
		name: "disk_scan",
		description:
			"Scan a directory and return a WinDirStat-style tree with per-node sizes, plus Top-N largest directories and files. " +
			"Use this instead of generating shell scan commands — it is much faster and returns structured data. " +
			"Ideal for identifying large files and junk locations for disk cleanup.",
		parameters: {
			path: {
				type: "string",
				required: true,
				description:
					"Absolute directory path to scan (e.g. \"C:\\\", \"C:\\Users\", \"%TEMP%\"). " +
					"Environment variables like %TEMP%, %USERPROFILE%, %LOCALAPPDATA% are resolved automatically.",
			},
			maxDepth: {
				type: "integer",
				description: `Maximum recursion depth (default ${caps.maxDepth}). Increase for deeper inspection of a specific subtree.`,
			},
		},
		timeoutMs: caps.scanTimeoutMs,
		output: {
			schema: {
				type: "object",
				additionalProperties: false,
				properties: {
					root: {
						type: "object",
						required: true,
						additionalProperties: true,
						properties: {
							path: { type: "string", required: true },
							name: { type: "string", required: true },
							size: { type: "number", required: true },
							isDir: { type: "boolean", required: true },
							fileCount: { type: "number" },
							dirCount: { type: "number" },
							lastModified: { type: "number" },
						},
					},
					topDirectories: {
						type: "array",
						required: true,
						items: {
							type: "object",
							additionalProperties: false,
							properties: {
								path: { type: "string", required: true },
								name: { type: "string", required: true },
								size: { type: "number", required: true },
								fileCount: { type: "number", required: true },
							},
						},
					},
					topFiles: {
						type: "array",
						required: true,
						items: {
							type: "object",
							additionalProperties: false,
							properties: {
								path: { type: "string", required: true },
								name: { type: "string", required: true },
								size: { type: "number", required: true },
								lastModified: { type: "number", required: true },
							},
						},
					},
					scanDurationMs: { type: "number", required: true },
					truncated: { type: "boolean", required: true },
				},
			},
			render: (_args, value) => [{
				type: "text",
				text: formatScanResult(value, caps),
			}],
			presentationMeta: (_args, value) => ({
				card: "disk-sentinel-scan",
				root: value.root,
				topDirectories: value.topDirectories,
				topFiles: value.topFiles,
				scanDurationMs: value.scanDurationMs,
			}),
		},
		async execute(args, exec) {
			const resolvedPath = resolveEnvPath(args.path);
			const maxDepth = args.maxDepth ?? caps.maxDepth;
			const startTime = Date.now();

			const tree = await scanTree(resolvedPath, {
				maxDepth,
				signal: exec.signal,
			});

			const topDirs = topDirectoriesBySize(tree, caps.topDirsCount);
			const topFiles = topFilesBySize(tree, caps.topFilesCount);
			const duration = Date.now() - startTime;

			return {
				root: {
					path: tree.path,
					name: tree.name,
					size: tree.size,
					isDir: tree.isDir,
					fileCount: tree.fileCount ?? 0,
					dirCount: tree.dirCount ?? 0,
					lastModified: tree.lastModified ?? 0,
				},
				topDirectories: topDirs,
				topFiles: topFiles,
				scanDurationMs: duration,
				truncated: false,
			};
		},
		presentCall: (args) => ({
			card: "generic",
			title: `Disk Scan ${args.path}`,
			kind: "search",
			rawInput: args.path,
		}),
		presentResult: (_args, result) => {
			if (result.isError) return undefined;
			// 用 generic 卡片展示格式化文本（未来可替换为专用 disk-sentinel 卡片）
			return undefined; // 回退到 render 文本
		},
	});

	ctx.tools.register(tool);
}

/**
 * 格式化 disk_scan 结果为 LLM 可读的文本摘要。
 *
 * @param {Object} value - 工具返回值。
 * @param {Object} caps  - 配置。
 * @returns {string}
 */
function formatScanResult(value, caps) {
	const parts = [];

	// 标题
	parts.push(`# 磁盘扫描结果: ${value.root.path}`);
	parts.push("");
	parts.push(`**总大小**: ${formatBytes(value.root.size)}`);
	parts.push(`**文件数**: ${value.root.fileCount ?? 0}`);
	parts.push(`**目录数**: ${value.root.dirCount ?? 0}`);
	parts.push(`**扫描耗时**: ${(value.scanDurationMs / 1000).toFixed(1)}s`);
	parts.push("");

	// Top 大目录
	if (value.topDirectories.length > 0) {
		parts.push(`## Top ${value.topDirectories.length} 大目录`);
		parts.push("");
		parts.push("| 排名 | 路径 | 大小 | 文件数 |");
		parts.push("|------|------|------|--------|");
		value.topDirectories.forEach((dir, i) => {
			parts.push(`| ${i + 1} | ${dir.path} | ${formatBytes(dir.size)} | ${dir.fileCount} |`);
		});
		parts.push("");
	}

	// Top 大文件
	if (value.topFiles.length > 0) {
		parts.push(`## Top ${value.topFiles.length} 大文件`);
		parts.push("");
		parts.push("| 排名 | 路径 | 大小 |");
		parts.push("|------|------|------|");
		value.topFiles.forEach((file, i) => {
			parts.push(`| ${i + 1} | ${file.path} | ${formatBytes(file.size)} |`);
		});
		parts.push("");
	}

	// 提示
	parts.push("---");
	parts.push("**提示**: 以上为按大小排序的摘要。调用 clean_disk 工具可清理预定义的垃圾类别；");
	parts.push("对于特殊清理需求，请与用户确认后使用 pwsh 工具执行。");

	return parts.join("\n");
}
