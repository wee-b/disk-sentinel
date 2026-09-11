/**
 * dev_env_migrate 工具注册：由 AI 为任意已扫描开发目录生成、确认并执行迁移计划。
 *
 * @module @dsh-plugin/disk-sentinel/tools/dev-env-migrate
 */
import { defineTool } from "@deepseek-ai/dsh-tools";
import { createAiMigrationPlan, executeMigrationPlan } from "../dev-env-migration.js";
import { formatBytes } from "../scan.js";

export function applyDevEnvMigrateTool(ctx, caps) {
	ctx.systemPrompt.section({
		name: "tool:dev_env_migrate",
		order: 132,
		text: [
			"Use dev_env_migrate for developer-environment directory migration. ",
			"The local whitelist controls only manual UI actions; AI may propose paths outside it when they appear in the latest developer-environment scan. ",
			"Always call mode='plan' first. Explain the plan and wait for explicit user confirmation before mode='execute'. ",
			"Never bypass this tool with shell commands. Use method='junction' when the original path must remain compatible, or method='user-env' only for non-Path environment variables that point to the source. ",
			"Execution copies and verifies first, preserves a backup, then switches the path or user environment variable.",
		].join(""),
	});

	const tool = defineTool({
		name: "dev_env_migrate",
		description:
			"Plan or execute migration of a directory from the latest developer-environment scan. " +
			"AI may select non-whitelisted scanned paths. Always plan first and execute only after explicit user confirmation.",
		parameters: {
			mode: {
				type: "string",
				required: true,
				description: "Operation mode: 'plan' | 'execute'.",
			},
			sourcePath: {
				type: "string",
				description: "Absolute source directory from the developer-environment scan; required for plan.",
			},
			destinationPath: {
				type: "string",
				description: "Absolute destination directory on another drive; it must not already exist.",
			},
			method: {
				type: "string",
				description: "Migration switch method: 'junction' or 'user-env'. Defaults to junction.",
			},
			envKeys: {
				type: "array",
				items: { type: "string" },
				description: "Non-Path environment variable names to update for method='user-env'. Each must currently point to sourcePath.",
			},
			label: {
				type: "string",
				description: "Short developer-tool or directory label shown in the plan.",
			},
			reason: {
				type: "string",
				description: "Why this path is safe and worthwhile to migrate.",
			},
			planId: {
				type: "string",
				description: "One-time plan ID returned by plan mode; required for execute.",
			},
			confirmed: {
				type: "boolean",
				description: "Must be true only after the user explicitly confirms the displayed plan.",
			},
		},
		timeoutMs: caps.migrationTimeoutMs,
		output: {
			schema: {
				type: "object",
				additionalProperties: false,
				properties: {
					mode: { type: "string", required: true },
					status: { type: "string", required: true },
					planId: { type: "string", required: true },
					label: { type: "string" },
					sourcePath: { type: "string", required: true },
					destinationPath: { type: "string", required: true },
					backupPath: { type: "string" },
					method: { type: "string", required: true },
					sizeBytes: { type: "number", required: true },
					fileCount: { type: "number" },
					expiresAt: { type: "number" },
					envKeys: { type: "array", items: { type: "string" } },
					reason: { type: "string" },
				},
			},
			render: (_args, value) => [{ type: "text", text: formatMigrationResult(value) }],
		},
		async execute(args) {
			if (args.mode === "plan") {
				if (!args.sourcePath || !args.destinationPath) {
					throw new Error("plan 模式需要 sourcePath 和 destinationPath");
				}
				const plan = await createAiMigrationPlan(args);
				return {
					mode: "plan",
					status: "awaiting-confirmation",
					planId: plan.planId,
					label: plan.label,
					sourcePath: plan.sourcePath,
					destinationPath: plan.destinationPath,
					backupPath: plan.backupPath,
					method: plan.method,
					sizeBytes: plan.sizeBytes,
					fileCount: plan.fileCount,
					expiresAt: plan.expiresAt,
					envKeys: plan.envChanges.map((item) => item.key),
					reason: plan.reason,
				};
			}
			if (args.mode === "execute") {
				if (!args.planId) throw new Error("execute 模式需要 planId");
				if (args.confirmed !== true) throw new Error("执行迁移前必须获得用户明确确认，并传入 confirmed=true");
				const result = await executeMigrationPlan(args.planId);
				return {
					mode: "execute",
					status: result.status,
					planId: result.planId,
					label: result.label,
					sourcePath: result.sourcePath,
					destinationPath: result.destinationPath,
					backupPath: result.backupPath,
					method: result.method,
					sizeBytes: result.sizeBytes,
					fileCount: result.fileCount,
					envKeys: result.envChanges.map((item) => item.key),
				};
			}
			throw new Error("未知的模式: " + args.mode + "。支持: plan, execute");
		},
		presentCall: (args) => ({
			card: "generic",
			title: args.mode === "execute" ? "执行开发环境迁移" : "生成开发环境迁移计划",
			kind: "other",
			rawInput: args,
		}),
	});

	ctx.tools.register(tool);
}

function formatMigrationResult(value) {
	if (value.mode === "plan") {
		const lines = [
			"# 开发环境迁移计划",
			"",
			"- 项目: " + (value.label || "开发目录"),
			"- 源目录: " + value.sourcePath,
			"- 目标目录: " + value.destinationPath,
			"- 回滚备份: " + value.backupPath,
			"- 数据量: " + formatBytes(value.sizeBytes ?? 0),
			"- 切换方式: " + (value.method === "user-env" ? "修改用户环境变量" : "原路径目录联接"),
			"- 环境变量: " + ((value.envKeys ?? []).join(", ") || "无"),
			"- 原因: " + (value.reason || "未填写"),
			"",
			"计划将在 30 分钟后失效。请向用户完整说明以上变化，获得明确确认后再执行。",
		];
		return lines.join("\n");
	}
	return [
		"# 开发环境迁移完成",
		"",
		"- 源目录: " + value.sourcePath,
		"- 目标目录: " + value.destinationPath,
		"- 保留备份: " + value.backupPath,
		"- 已迁移: " + formatBytes(value.sizeBytes ?? 0),
		"",
		"请重启终端和 IDE 验证开发工具；确认无误后再处理备份目录。",
	].join("\n");
}
