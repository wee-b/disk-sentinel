/**
 * clean_disk 工具注册（LLM 可调用）：三模式垃圾清理。
 *
 * list → estimate → (用户确认) → clean 的工作流由系统提示词约束。
 *
 * @module @dsh-plugin/disk-sentinel/tools/clean-disk
 */
import { defineTool } from "@deepseek-ai/dsh-tools";
import {
	JUNK_CATEGORIES,
	TRANSFERABLE_SUGGESTIONS,
	listJunkCategories,
	getJunkCategory,
} from "../junk-definitions.js";
import {
	executeCleanCategory,
	estimateCategoriesSize,
} from "../clean.js";
import { formatBytes } from "../scan.js";

/**
 * 注册 clean_disk 工具。
 *
 * @param {Object} ctx  - 插件上下文。
 * @param {Object} caps - 解析后的配置。
 */
export function applyCleanDiskTool(ctx, caps) {
	ctx.systemPrompt.section({
		name: "tool:clean_disk",
		order: 131,
		text: [
			"Use the clean_disk tool for disk cleanup. It has three modes:\n",
			"- mode='list': Returns all predefined junk categories (Windows temp, recycle bin, browser cache, npm/pnpm cache, etc.) with descriptions. Call this first to see available cleanup options.\n",
			"- mode='estimate': Estimate reclaimable space for one or more categories (by IDs) WITHOUT deleting anything. Always estimate before cleaning.\n",
			"- mode='clean': Actually delete files for the specified category IDs. This is IRREVERSIBLE — always confirm with the user first and run 'estimate' beforehand.\n",
			"\nWorkflow: list → estimate → (confirm with user) → clean. For cleanup categories outside the predefined list, use the pwsh tool directly after user confirmation. Developer-environment directory migration must use dev_env_migrate instead.",
		].join(""),
	});

	const tool = defineTool({
		name: "clean_disk",
		description:
			"Disk cleanup tool with three modes: 'list' (show predefined junk categories), " +
			"'estimate' (preview reclaimable space without deleting), 'clean' (irreversibly delete files). " +
			"Always use 'list' then 'estimate' before 'clean', and confirm with the user before any deletion.",
		parameters: {
			mode: {
				type: "string",
				required: true,
				description: "Operation mode: 'list' | 'estimate' | 'clean'.",
			},
			categoryIds: {
				type: "array",
				items: { type: "string" },
				description:
					"Junk category IDs to estimate or clean (required for 'estimate' and 'clean' modes). " +
					"Use mode='list' to see available IDs. Can specify multiple IDs.",
			},
		},
		timeoutMs: caps.cleanTimeoutMs,
		output: {
			schema: {
				type: "object",
				additionalProperties: false,
				properties: {
					mode: { type: "string", required: true },
					categories: {
						type: "array",
						items: {
							type: "object",
							additionalProperties: false,
							properties: {
								id: { type: "string", required: true },
								label: { type: "string", required: true },
								description: { type: "string", required: true },
								tags: { type: "array", items: { type: "string" } },
								estimatedBytes: { type: "number" },
							},
						},
					},
					results: {
						type: "array",
						items: {
							type: "object",
							additionalProperties: false,
							properties: {
								categoryId: { type: "string", required: true },
								label: { type: "string", required: true },
								success: { type: "boolean", required: true },
								message: { type: "string", required: true },
							},
						},
					},
					transferableSuggestions: {
						type: "array",
						items: {
							type: "object",
							additionalProperties: false,
							properties: {
								path: { type: "string", required: true },
								label: { type: "string", required: true },
								note: { type: "string", required: true },
							},
						},
					},
					totalEstimatedBytes: { type: "number" },
				},
			},
			render: (_args, value) => [{
				type: "text",
				text: formatCleanResult(value),
			}],
			presentationMeta: (_args, value) => ({
				card: "disk-sentinel-clean",
				...value,
			}),
		},
		async execute(args, exec) {
			const mode = args.mode;

			if (mode === "list") {
				return {
					mode: "list",
					categories: listJunkCategories(),
					transferableSuggestions: TRANSFERABLE_SUGGESTIONS.map((s) => ({
						path: s.path,
						label: s.label,
						note: s.note,
					})),
				};
			}

			if (mode === "estimate") {
				const ids = args.categoryIds ?? [];
				if (ids.length === 0) throw new Error("estimate 模式需要至少一个 categoryId");
				// 所有类别合并为一次 PowerShell 调用批量预估；逐类别串行 spawn 时
				// 12 个类别要 2-3 分钟，合并后只需一次进程启动
				const entries = ids.map((id) => ({ id, category: getJunkCategory(id) }));
				const knownCategories = entries
					.filter((e) => e.category)
					.map((e) => e.category);
				const sizeMap = await estimateCategoriesSize(ctx, knownCategories, exec.signal);
				const results = entries.map(({ id, category }) => {
					if (!category) {
						return {
							id,
							label: id,
							description: `未知类别: ${id}`,
							tags: [],
							estimatedBytes: 0,
						};
					}
					return {
						id: category.id,
						label: category.label,
						description: category.description,
						tags: category.tags ?? [],
						estimatedBytes: sizeMap.get(id) ?? 0,
					};
				});
				const total = results.reduce((acc, r) => acc + r.estimatedBytes, 0);
				return {
					mode: "estimate",
					categories: results,
					totalEstimatedBytes: total,
				};
			}

			if (mode === "clean") {
				const ids = args.categoryIds ?? [];
				if (ids.length === 0) throw new Error("clean 模式需要至少一个 categoryId");
				const results = [];
				for (const id of ids) {
					const category = getJunkCategory(id);
					if (!category) {
						results.push({
							categoryId: id,
							label: id,
							success: false,
							message: `未知类别: ${id}`,
						});
						continue;
					}
					const result = await executeCleanCategory(ctx, category, exec.signal);
					results.push(result);
				}
				return {
					mode: "clean",
					results,
				};
			}

			throw new Error(`未知的模式: ${mode}。支持: list, estimate, clean`);
		},
		presentCall: (args) => ({
			card: "generic",
			title: `Clean Disk (${args.mode})`,
			kind: args.mode === "clean" ? "delete" : "other",
			rawInput: args.mode === "list" ? args.mode : { mode: args.mode, categoryIds: args.categoryIds },
		}),
		presentResult: (_args, result) => {
			if (result.isError) return undefined;
			return undefined; // 回退到 render 文本
		},
	});

	ctx.tools.register(tool);
}

/**
 * 格式化 clean_disk 结果为 LLM 可读文本。
 *
 * @param {Object} value
 * @returns {string}
 */
function formatCleanResult(value) {
	const parts = [];

	if (value.mode === "list") {
		parts.push("# 可用清理类别");
		parts.push("");
		if (value.categories && value.categories.length > 0) {
			parts.push("| ID | 名称 | 说明 | 标签 |");
			parts.push("|----|------|------|------|");
			for (const cat of value.categories) {
				parts.push(`| ${cat.id} | ${cat.label} | ${cat.description} | ${(cat.tags ?? []).join(", ")} |`);
			}
		}
		parts.push("");
		parts.push("**使用方式**:");
		parts.push("1. 调用 `clean_disk` mode='estimate' 传入选定的 categoryIds 预估可回收空间");
		parts.push("2. 与用户确认后，调用 `clean_disk` mode='clean' 执行清理");

		if (value.transferableSuggestions && value.transferableSuggestions.length > 0) {
			parts.push("");
			parts.push("## 可转移到其他盘符的目录建议");
			parts.push("");
			parts.push("| 路径 | 名称 | 说明 |");
			parts.push("|------|------|------|");
			for (const s of value.transferableSuggestions) {
				parts.push(`| ${s.path} | ${s.label} | ${s.note} |`);
			}
		}
		return parts.join("\n");
	}

	if (value.mode === "estimate") {
		parts.push("# 清理空间预估");
		parts.push("");
		if (value.categories && value.categories.length > 0) {
			parts.push("| 类别 | 名称 | 预估可回收 |");
			parts.push("|------|------|------------|");
			for (const cat of value.categories) {
				parts.push(`| ${cat.id} | ${cat.label} | ${formatBytes(cat.estimatedBytes ?? 0)} |`);
			}
		}
		parts.push("");
		parts.push(`**总预估可回收**: ${formatBytes(value.totalEstimatedBytes ?? 0)}`);
		parts.push("");
		parts.push("**⚠️ 确认后**调用 `clean_disk` mode='clean' 执行实际删除。删除不可逆。");
		return parts.join("\n");
	}

	if (value.mode === "clean") {
		parts.push("# 清理结果");
		parts.push("");
		if (value.results && value.results.length > 0) {
			parts.push("| 类别 | 名称 | 状态 | 信息 |");
			parts.push("|------|------|------|------|");
			for (const r of value.results) {
				const status = r.success ? "✅ 成功" : "❌ 失败";
				const msg = (r.message ?? "").replace(/\|/g, "\\|").replace(/\n/g, " ");
				parts.push(`| ${r.categoryId} | ${r.label} | ${status} | ${msg} |`);
			}
		}
		return parts.join("\n");
	}

	return JSON.stringify(value, null, 2);
}
