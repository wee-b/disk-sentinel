/**
 * 开发环境手动迁移规则。
 *
 * 页面入口只开放给能定位并修改持久配置文件的缓存目录。环境变量和目录联接
 * 仍可供 AI 迁移计划使用，但不会成为手动迁移入口。
 *
 * @module @dsh-plugin/disk-sentinel/dev-env-migration-rules
 */
import { constants } from "node:fs";
import { access, lstat, readFile, stat } from "node:fs/promises";
import { isAbsolute, join, normalize } from "node:path";
import { readConfigValue, updateConfigContent } from "./dev-env-config.js";
import { resolveEnvPath } from "./junk-definitions.js";

const MANUAL_MIGRATION_WHITELIST = [
	{
		id: "cargo",
		label: "Cargo 缓存与注册表",
		targetSubdir: "Rust\\cargo",
		method: "user-env",
		envKeys: ["CARGO_HOME"],
		note: "设置官方支持的用户环境变量 CARGO_HOME。",
	},
	{
		id: "rustup",
		label: "Rustup 工具链",
		targetSubdir: "Rust\\rustup",
		method: "user-env",
		envKeys: ["RUSTUP_HOME"],
		note: "设置官方支持的用户环境变量 RUSTUP_HOME。",
	},
	{
		id: "maven_repo",
		label: "Maven 本地仓库",
		sourceSubdir: "repository",
		targetSubdir: "Maven\\repository",
		configKey: "localRepository",
		configCandidates: [
			{ path: "%USERPROFILE%\\.m2\\settings.xml", format: "maven-settings" },
			{ envKey: "MAVEN_HOME", relativePath: "conf\\settings.xml", format: "maven-settings" },
			{ envKey: "M2_HOME", relativePath: "conf\\settings.xml", format: "maven-settings" },
		],
		note: "修改 Maven settings.xml 中的 localRepository。",
	},
	{
		id: "npm_cache",
		label: "npm 用户缓存",
		targetSubdir: "Node\\npm-cache",
		configKey: "cache",
		configCandidates: [
			{ envKey: "NPM_CONFIG_USERCONFIG", format: "key-value" },
			{ path: "%USERPROFILE%\\.npmrc", format: "key-value" },
		],
		note: "修改用户级 .npmrc 中的 cache。",
	},
	{
		id: "npm_cache_local",
		label: "npm AppData 缓存",
		targetSubdir: "Node\\npm-cache",
		configKey: "cache",
		configCandidates: [
			{ envKey: "NPM_CONFIG_USERCONFIG", format: "key-value" },
			{ path: "%USERPROFILE%\\.npmrc", format: "key-value" },
		],
		note: "修改用户级 .npmrc 中的 cache。",
	},
	{
		id: "pnpm_store",
		label: "pnpm store",
		targetSubdir: "Node\\pnpm-store",
		configKey: "store-dir",
		configCandidates: [
			{ envKey: "NPM_CONFIG_USERCONFIG", format: "key-value" },
			{ path: "%USERPROFILE%\\.npmrc", format: "key-value" },
			{ envKey: "PNPM_HOME", relativePath: "config\\rc", format: "key-value" },
			{ path: "%LOCALAPPDATA%\\pnpm\\config\\rc", format: "key-value" },
			{ path: "%APPDATA%\\pnpm\\config\\rc", format: "key-value" },
		],
		note: "修改 pnpm 配置文件中的 store-dir。",
	},
	{
		id: "yarn_cache",
		label: "Yarn 缓存",
		targetSubdir: "Node\\yarn-cache",
		configKey: "cache-folder",
		configCandidates: [
			{ path: "%USERPROFILE%\\.yarnrc", format: "yarn-v1" },
			{ path: "%USERPROFILE%\\.yarnrc.yml", format: "yarn-yaml" },
		],
		note: "修改 Yarn 配置文件中的缓存目录。",
	},
	{
		id: "go_path",
		label: "Go 默认工作区",
		targetSubdir: "Go",
		configKey: "GOPATH",
		configCandidates: [
			{ envKey: "GOENV", format: "key-value" },
			{ path: "%APPDATA%\\go\\env", format: "key-value" },
		],
		note: "修改 Go 持久配置文件中的 GOPATH。",
	},
	{
		id: "nuget",
		label: "NuGet 包缓存",
		targetSubdir: "NuGet\\packages",
		configKey: "globalPackagesFolder",
		configCandidates: [{ path: "%APPDATA%\\NuGet\\NuGet.Config", format: "nuget-config" }],
		note: "修改 NuGet.Config 中的 globalPackagesFolder。",
	},
];

function getManualMigrationRule(id) {
	return MANUAL_MIGRATION_WHITELIST.find((item) => item.id === id) ?? null;
}

function getEnvValue(key) {
	const actualKey = Object.keys(process.env).find((item) => item.toLowerCase() === key.toLowerCase());
	return actualKey ? process.env[actualKey] ?? "" : "";
}

function resolveConfigCandidatePath(candidate) {
	if (candidate.path) return resolveEnvPath(candidate.path);
	if (!candidate.envKey) return "";
	const envPath = resolveEnvPath(getEnvValue(candidate.envKey)).trim().replace(/^"+|"+$/g, "");
	if (!envPath || !isAbsolute(envPath)) return "";
	return candidate.relativePath ? join(envPath, candidate.relativePath) : envPath;
}

function samePath(left, right) {
	return normalize(String(left)).replace(/[\\/]+$/, "").toLowerCase() ===
		normalize(String(right)).replace(/[\\/]+$/, "").toLowerCase();
}

/** 只有源缓存目录和可写配置文件都存在时，才暴露手动迁移能力。 */
async function resolveManualMigration(rule, baseSourcePath) {
	if (!rule) return null;
	const sourcePath = rule.sourceSubdir ? join(baseSourcePath, rule.sourceSubdir) : baseSourcePath;
	try {
		if ((await lstat(sourcePath)).isSymbolicLink()) return null;
		if (!(await stat(sourcePath)).isDirectory()) return null;
	} catch {
		return null;
	}
	if (rule.method === "user-env") {
		const envKeys = (rule.envKeys ?? []).filter((key) => !/^path$/i.test(key));
		if (envKeys.length === 0) return null;
		for (const key of envKeys) {
			const configuredPath = resolveEnvPath(getEnvValue(key)).trim().replace(/^"+|"+$/g, "");
			if (configuredPath && !samePath(configuredPath, sourcePath)) return null;
		}
		return {
			method: "user-env",
			sourcePath,
			targetSubdir: rule.targetSubdir,
			envKeys,
			configSource: "用户环境变量 " + envKeys.join(", "),
			settingLabel: envKeys.join(", "),
			note: rule.note,
		};
	}
	for (const candidate of rule.configCandidates ?? []) {
		const configPath = resolveConfigCandidatePath(candidate);
		if (!configPath) continue;
		try {
			if (!(await stat(configPath)).isFile()) continue;
			await access(configPath, constants.R_OK | constants.W_OK);
			const content = await readFile(configPath, "utf8");
			updateConfigContent(content, candidate.format, rule.configKey, "D:\\DiskSentinel\\ConfigCheck");
			const configuredPath = readConfigValue(content, candidate.format, rule.configKey);
			if (configuredPath && !samePath(configuredPath, sourcePath)) continue;
			return {
				method: "config-file",
				sourcePath,
				targetSubdir: rule.targetSubdir,
				configPath,
				configFormat: candidate.format,
				configKey: rule.configKey,
				configSource: candidate.envKey ? "环境变量 " + candidate.envKey : "默认位置",
				settingLabel: configPath,
				note: rule.note,
			};
		} catch {
			// 继续寻找该工具的下一个受支持配置文件。
		}
	}
	return null;
}

export {
	MANUAL_MIGRATION_WHITELIST,
	getManualMigrationRule,
	resolveConfigCandidatePath,
	resolveManualMigration,
};
