/**
 * 开发环境目录迁移：手动白名单计划、AI 计划、执行与报告生成。
 *
 * @module @dsh-plugin/disk-sentinel/dev-env-migration
 */
import { spawn } from "node:child_process";
import { randomUUID } from "node:crypto";
import {
	cp,
	lstat,
	mkdir,
	readFile,
	rename,
	rm,
	stat,
	statfs,
	symlink,
	unlink,
	writeFile,
} from "node:fs/promises";
import { dirname, isAbsolute, join, normalize, parse, relative } from "node:path";
import { updateConfigContent } from "./dev-env-config.js";
import {
	MANUAL_MIGRATION_WHITELIST,
	getManualMigrationRule,
	resolveManualMigration,
} from "./dev-env-migration-rules.js";
import { isDevEnvPathBlacklisted } from "./dev-env-path-blacklist.js";
import { measurePath, normKey, scanDevEnvironment } from "./rpc/dev-env.js";
import { ensureWorkspaceDir } from "./rpc/workspace.js";

const MIGRATION_PLAN_MAX_AGE_MS = 30 * 60 * 1000;
const migrationPlans = new Map();

function isInside(parent, child) {
	const rel = relative(normalize(parent), normalize(child));
	return rel === "" || (!rel.startsWith("..") && !isAbsolute(rel));
}

function existingPathFromScan(scan, sourcePath, knownParentPath) {
	const key = normKey(sourcePath);
	for (const group of scan.envPathGroups ?? []) {
		const item = (group.paths ?? []).find((entry) => normKey(entry.path) === key);
		if (item) return { ...item, kind: "environment" };
	}
	const known = (scan.knownDirs ?? []).find((entry) => normKey(entry.path) === key);
	if (known) return { ...known, envKeys: [], kind: "known-directory" };
	const parent = (scan.knownDirs ?? []).find((entry) => normKey(entry.path) === normKey(knownParentPath));
	return parent && isInside(parent.path, sourcePath)
		? { ...parent, path: sourcePath, envKeys: [], kind: "known-directory" }
		: null;
}

function isProtectedMigrationPath(path) {
	return isDevEnvPathBlacklisted(path);
}

async function validatePaths(sourcePath, destinationPath) {
	if (!isAbsolute(sourcePath) || !isAbsolute(destinationPath)) {
		throw new Error("源目录和目标目录都必须是绝对路径");
	}
	const source = normalize(sourcePath);
	const destination = normalize(destinationPath);
	if (normKey(source) === normKey(parse(source).root)) throw new Error("不允许迁移整个磁盘根目录");
	if (isProtectedMigrationPath(source)) throw new Error("不允许迁移 Windows 或程序安装目录: " + source);
	const workspace = await ensureWorkspaceDir();
	if (isInside(source, workspace)) throw new Error("源目录包含磁盘哨兵工作目录，不能迁移");
	if (isInside(source, destination) || isInside(destination, source)) {
		throw new Error("目标目录不能与源目录互相包含");
	}
	if (parse(source).root.toLowerCase() === parse(destination).root.toLowerCase()) {
		throw new Error("目标目录必须位于另一个磁盘");
	}
	const sourceInfo = await lstat(source);
	if (!sourceInfo.isDirectory() || sourceInfo.isSymbolicLink()) {
		throw new Error("当前仅支持迁移真实目录，不支持文件或链接");
	}
	try {
		await stat(destination);
		throw new Error("目标目录已存在，请选择一个尚未创建的目录");
	} catch (err) {
		if (err?.code !== "ENOENT") throw err;
	}
	return { source, destination };
}

function findEnvValue(key) {
	const actualKey = Object.keys(process.env).find((item) => item.toLowerCase() === key.toLowerCase());
	return actualKey ? { key: actualKey, value: process.env[actualKey] ?? "" } : { key, value: "" };
}

function replaceEnvPath(value, source, destination) {
	if (!value) return destination;
	const parts = value.split(";");
	let replaced = false;
	const next = parts.map((part) => {
		const clean = part.trim().replace(/^"+|"+$/g, "");
		if (clean && normKey(clean) === normKey(source)) {
			replaced = true;
			return destination;
		}
		return part;
	});
	return replaced ? next.join(";") : destination;
}

function buildEnvChanges(envKeys, source, destination, allowMissing) {
	const keys = [...new Set((envKeys ?? []).map(String))].filter((key) => key && !/^path$/i.test(key));
	return keys.map((requestedKey) => {
		const current = findEnvValue(requestedKey);
		if (!allowMissing) {
			const paths = current.value.split(";").map((item) => item.trim().replace(/^"+|"+$/g, ""));
			if (!paths.some((item) => item && normKey(item) === normKey(source))) {
				throw new Error("环境变量 " + requestedKey + " 当前未指向源目录");
			}
		}
		return {
			key: current.key,
			before: current.value,
			after: replaceEnvPath(current.value, source, destination),
		};
	});
}

async function buildConfigChange(config, destination) {
	if (!config?.path || !config.format || !config.key) throw new Error("缺少可修改的开发工具配置");
	const beforeContent = await readFile(config.path, "utf8");
	const afterContent = updateConfigContent(beforeContent, config.format, config.key, destination);
	if (afterContent === beforeContent) throw new Error("工具配置已经指向目标目录");
	return { ...config, beforeContent, afterContent };
}

async function applyConfigChange(change) {
	const current = await readFile(change.path, "utf8");
	if (current !== change.beforeContent) throw new Error("工具配置文件在计划生成后发生变化，请重新操作");
	await writeFile(change.path, change.afterContent, "utf8");
	if (await readFile(change.path, "utf8") !== change.afterContent) {
		await writeFile(change.path, change.beforeContent, "utf8").catch(() => {});
		throw new Error("工具配置文件写入校验失败");
	}
}

async function availableBytes(path) {
	const root = parse(path).root;
	const info = await statfs(root);
	return Number(info.bavail) * Number(info.bsize);
}

function prunePlans(now = Date.now()) {
	for (const [id, plan] of migrationPlans) {
		if (plan.used || now > plan.expiresAt) migrationPlans.delete(id);
	}
}

async function ensureTargetRoot(targetRoot) {
	await mkdir(targetRoot, { recursive: true });
	const rootInfo = await stat(targetRoot);
	if (!rootInfo.isDirectory()) throw new Error("目标根路径不是目录: " + targetRoot);
}

async function createMigrationPlan(scan, request) {
	prunePlans();
	const candidate = existingPathFromScan(scan, request.sourcePath, request.knownParentPath);
	if (!candidate || !candidate.exists || !candidate.isDirectory) {
		throw new Error("源目录不在最近一次开发环境扫描结果中，或目录已不存在");
	}
	const paths = await validatePaths(candidate.path, request.destinationPath);
	const method = request.method === "user-env"
		? "user-env"
		: request.method === "config-file" ? "config-file" : "junction";
	const requestedEnvKeys = request.envKeys ?? candidate.envKeys ?? [];
	const envChanges = method === "user-env"
		? buildEnvChanges(requestedEnvKeys, paths.source, paths.destination, request.origin === "manual")
		: [];
	if (method === "user-env" && envChanges.length === 0) {
		throw new Error("环境变量迁移方式至少需要一个非 Path 环境变量");
	}
	const configChange = method === "config-file"
		? await buildConfigChange(request.config, paths.destination)
		: null;
	// 计划必须基于此刻的真实目录状态，不能直接复用最长 24 小时的扫描缓存数值。
	const measured = await measurePath(paths.source);
	const freeBytes = await availableBytes(paths.destination);
	const requiredBytes = Math.ceil((measured.sizeBytes ?? 0) * 1.05);
	if (freeBytes < requiredBytes) throw new Error("目标磁盘剩余空间不足，至少需要源目录体积的 105%");

	const now = Date.now();
	const planId = randomUUID();
	const stamp = new Date(now).toISOString().replace(/[-:TZ.]/g, "").slice(0, 14);
	const plan = {
		planId,
		origin: request.origin,
		recipeId: request.recipeId ?? null,
		label: request.label ?? candidate.label ?? candidate.path,
		reason: request.reason ?? "",
		sourcePath: paths.source,
		destinationPath: paths.destination,
		backupPath: paths.source + ".disk-sentinel-backup-" + stamp + "-" + planId.slice(0, 8),
		method,
		envChanges,
		configChange,
		sizeBytes: measured.sizeBytes ?? 0,
		fileCount: measured.fileCount ?? 0,
		dirCount: measured.dirCount ?? 0,
		createdAt: now,
		expiresAt: now + MIGRATION_PLAN_MAX_AGE_MS,
		used: false,
	};
	migrationPlans.set(plan.planId, plan);
	return {
		...plan,
		configChange: configChange ? {
			path: configChange.path,
			format: configChange.format,
			key: configChange.key,
		} : null,
	};
}

async function createManualMigrationPlan(recipeId, targetRoot) {
	const rule = getManualMigrationRule(recipeId);
	if (!rule) throw new Error("该目录不在本地手动迁移白名单中");
	const normalizedRoot = normalize(String(targetRoot ?? "").trim());
	if (!isAbsolute(normalizedRoot)) throw new Error("请输入目标磁盘上的绝对目录，例如 D:\\DevCache");
	const scan = await scanDevEnvironment({ force: false });
	const source = (scan.knownDirs ?? []).find((item) => item.id === rule.id);
	if (!source?.exists) throw new Error("缓存目录不存在或尚未扫描到");
	const capability = await resolveManualMigration(rule, source.path);
	if (!capability) throw new Error("未找到可修改的工具配置文件，不能手动迁移");
	const plan = await createMigrationPlan(scan, {
		origin: "manual",
		recipeId: rule.id,
		label: rule.label,
		sourcePath: capability.sourcePath,
		destinationPath: join(normalizedRoot, rule.targetSubdir),
		method: capability.method,
		knownParentPath: source.path,
		envKeys: capability.envKeys,
		config: capability.method === "config-file" ? {
			path: capability.configPath,
			format: capability.configFormat,
			key: capability.configKey,
		} : null,
		reason: rule.note,
	});
	try {
		await ensureTargetRoot(normalizedRoot);
	} catch (err) {
		migrationPlans.delete(plan.planId);
		throw new Error("无法创建目标根目录 " + normalizedRoot + ": " + (err?.message ?? String(err)));
	}
	return plan;
}

async function createAiMigrationPlan(request) {
	const scan = await scanDevEnvironment({ force: false });
	return createMigrationPlan(scan, {
		origin: "ai",
		label: request.label,
		reason: request.reason,
		sourcePath: String(request.sourcePath ?? ""),
		destinationPath: String(request.destinationPath ?? ""),
		method: request.method,
		envKeys: request.envKeys,
	});
}

function runPowerShell(script, extraEnv) {
	return new Promise((resolve, reject) => {
		const child = spawn("powershell.exe", ["-NoProfile", "-NonInteractive", "-Command", script], {
			windowsHide: true,
			env: { ...process.env, ...extraEnv },
		});
		let stdout = "";
		let stderr = "";
		child.stdout.setEncoding("utf8");
		child.stderr.setEncoding("utf8");
		child.stdout.on("data", (chunk) => { stdout += chunk; });
		child.stderr.on("data", (chunk) => { stderr += chunk; });
		child.on("error", reject);
		child.on("close", (code) => {
			if (code === 0) resolve(stdout.trim());
			else reject(new Error(stderr.trim() || "环境变量修改失败，PowerShell 退出码 " + code));
		});
	});
}

async function setUserEnvironmentChanges(changes) {
	if (changes.length === 0) return;
	const payload = Buffer.from(JSON.stringify(changes.map((item) => ({ key: item.key, after: item.after }))), "utf8").toString("base64");
	const script = [
		"$items = [Text.Encoding]::UTF8.GetString([Convert]::FromBase64String($env:DSH_ENV_CHANGES_B64)) | ConvertFrom-Json;",
		"$done = @();",
		"try {",
		"  foreach ($item in $items) {",
		"    $key = [string]$item.key;",
		"    $old = [Environment]::GetEnvironmentVariable($key, 'User');",
		"    $done += [pscustomobject]@{ key = $key; value = $old };",
		"    [Environment]::SetEnvironmentVariable($key, [string]$item.after, 'User');",
		"  }",
		"} catch {",
		"  foreach ($entry in $done) { [Environment]::SetEnvironmentVariable($entry.key, $entry.value, 'User') }",
		"  throw",
		"}",
	].join("\n");
	await runPowerShell(script, { DSH_ENV_CHANGES_B64: payload });
	for (const change of changes) process.env[change.key] = change.after;
}

async function executeMigrationPlan(planId) {
	prunePlans();
	const plan = migrationPlans.get(String(planId ?? ""));
	if (!plan) throw new Error("迁移计划不存在或已过期，请重新生成");
	if (plan.used) throw new Error("该迁移计划已执行，不能重复使用");
	await validatePaths(plan.sourcePath, plan.destinationPath);
	const before = await measurePath(plan.sourcePath);
	if (before.sizeBytes !== plan.sizeBytes || before.fileCount !== plan.fileCount) {
		throw new Error("源目录在计划生成后发生变化，请重新生成迁移计划");
	}

	await mkdir(dirname(plan.destinationPath), { recursive: true });
	try {
		await cp(plan.sourcePath, plan.destinationPath, {
			recursive: true,
			force: false,
			errorOnExist: true,
			preserveTimestamps: true,
			filter: async (path) => path === plan.sourcePath || !(await lstat(path)).isSymbolicLink(),
		});
		const copied = await measurePath(plan.destinationPath);
		if (copied.sizeBytes !== before.sizeBytes || copied.fileCount !== before.fileCount) {
			throw new Error("目标目录校验失败：文件数量或体积与源目录不一致");
		}
	} catch (err) {
		await rm(plan.destinationPath, { recursive: true, force: true }).catch(() => {});
		throw err;
	}

	const backupPath = plan.backupPath;
	let sourceRenamed = false;
	let junctionCreated = false;
	let configApplied = false;
	try {
		await rename(plan.sourcePath, backupPath);
		sourceRenamed = true;
		if (plan.method === "junction") {
			await symlink(plan.destinationPath, plan.sourcePath, "junction");
			junctionCreated = true;
		} else if (plan.method === "user-env") {
			await setUserEnvironmentChanges(plan.envChanges);
		} else {
			await applyConfigChange(plan.configChange);
			configApplied = true;
		}
	} catch (err) {
		if (configApplied) await writeFile(plan.configChange.path, plan.configChange.beforeContent, "utf8").catch(() => {});
		if (junctionCreated) await unlink(plan.sourcePath).catch(() => {});
		if (sourceRenamed) await rename(backupPath, plan.sourcePath).catch(() => {});
		await rm(plan.destinationPath, { recursive: true, force: true }).catch(() => {});
		throw new Error("迁移切换失败，已尝试回滚: " + (err?.message ?? String(err)));
	}

	plan.used = true;
	plan.completedAt = Date.now();
	return {
		status: "completed",
		planId: plan.planId,
		origin: plan.origin,
		label: plan.label,
		sourcePath: plan.sourcePath,
		destinationPath: plan.destinationPath,
		backupPath,
		method: plan.method,
		envChanges: plan.envChanges.map((item) => ({ key: item.key, value: item.after })),
		configChange: plan.configChange ? { path: plan.configChange.path, key: plan.configChange.key } : null,
		sizeBytes: before.sizeBytes,
		fileCount: before.fileCount,
		completedAt: plan.completedAt,
	};
}

function escapeCell(value) {
	return String(value ?? "-").replace(/\|/g, "\\|").replace(/[\r\n]+/g, " ");
}

function renderDevEnvMigrationReport(scan) {
	const manualByPath = new Map();
	for (const item of scan.knownDirs ?? []) {
		if (item.manualMigration) manualByPath.set(normKey(item.path), item);
	}
	const lines = [
		"# 开发环境迁移分析",
		"",
		"- 扫描时间: " + new Date(scan.createdAt).toLocaleString("zh-CN"),
		"- 路径数量: " + (scan.envPathCount ?? 0),
		"- 手动迁移规则: " + MANUAL_MIGRATION_WHITELIST.length,
		"",
		"## 环境变量路径",
		"",
		"| 盘符 | 路径 | 大小（字节） | 环境变量 | 手动迁移 |",
		"|------|------|-------------:|------------|----------|",
	];
	for (const group of scan.envPathGroups ?? []) {
		for (const item of group.paths ?? []) {
			const access = isProtectedMigrationPath(item.path)
				? "禁止迁移"
				: manualByPath.has(normKey(item.path)) ? "白名单" : "仅 AI";
			lines.push("| " + escapeCell(group.drive) + " | " + escapeCell(item.path) + " | " +
				(item.sizeBytes ?? 0) + " | " + escapeCell((item.envKeys ?? []).join(", ")) + " | " +
				access + " |");
		}
	}
	lines.push("", "## 常见开发目录", "", "| 名称 | 路径 | 大小（字节） | 迁移权限 |", "|------|------|-------------:|----------|");
	for (const item of scan.knownDirs ?? []) {
		if (!item.exists) continue;
		const access = isProtectedMigrationPath(item.path)
			? "禁止迁移"
			: item.manualMigration ? "白名单手动 / AI" : "仅 AI";
		lines.push("| " + escapeCell(item.label) + " | " + escapeCell(item.path) + " | " +
			(item.sizeBytes ?? 0) + " | " + access + " |");
	}
	lines.push(
		"",
		"## AI 迁移规则",
		"",
		"请基于报告判断哪些目录值得迁移，并优先考虑释放系统盘空间、工具官方支持方式和回滚成本。",
		"白名单只控制页面手动入口；标记为“仅 AI”的项目只能由你决定是否迁移。",
		"需要迁移时必须调用 `dev_env_migrate`：先使用 `plan` 模式生成一次性计划，向用户说明源目录、目标目录、环境变量变化和备份位置；收到用户明确确认后，才能使用 `execute` 模式并传入 `confirmed=true`。",
		"不要使用 pwsh、shell 或其他工具绕过迁移计划。不要迁移 Windows、Program Files、ProgramData、磁盘根目录或磁盘哨兵工作目录。",
		"迁移完成后提醒用户重启终端和 IDE；原目录备份必须等用户验证开发环境正常后再处理。"
	);
	return lines.join("\n");
}

function reportFileName(now = new Date()) {
	const two = (value) => String(value).padStart(2, "0");
	return "开发环境迁移分析-" + now.getFullYear() + two(now.getMonth() + 1) + two(now.getDate()) + "-" +
		two(now.getHours()) + two(now.getMinutes()) + two(now.getSeconds()) + ".md";
}

async function writeDevEnvMigrationReport() {
	const scan = await scanDevEnvironment({ force: false });
	const dir = await ensureWorkspaceDir();
	const file = join(dir, reportFileName());
	await writeFile(file, renderDevEnvMigrationReport(scan), "utf8");
	return { resultFile: file, createdAt: Date.now(), scanCreatedAt: scan.createdAt };
}

export {
	MIGRATION_PLAN_MAX_AGE_MS,
	createAiMigrationPlan,
	createMigrationPlan,
	createManualMigrationPlan,
	ensureTargetRoot,
	executeMigrationPlan,
	renderDevEnvMigrationReport,
	updateConfigContent,
	writeDevEnvMigrationReport,
};
