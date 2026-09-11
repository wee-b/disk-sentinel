/**
 * 开发环境目录与迁移规则。
 *
 * 同一份规则同时负责页面目录清单、当前生效路径识别和手动迁移能力，避免扫描层
 * 与迁移层各自维护一套互相漂移的路径定义。
 *
 * @module @dsh-plugin/disk-sentinel/dev-env-migration-rules
 */
import { constants } from "node:fs";
import { access, lstat, readFile, stat } from "node:fs/promises";
import { isAbsolute, join, normalize } from "node:path";
import { readConfigValue, updateConfigContent } from "./dev-env-config.js";
import { resolveEnvPath } from "./junk-definitions.js";

const MAVEN_CONFIG_CANDIDATES = [
	{ path: "%USERPROFILE%\\.m2\\settings.xml", format: "maven-settings" },
	{ envKey: "MAVEN_HOME", relativePath: "conf\\settings.xml", format: "maven-settings" },
	{ envKey: "M2_HOME", relativePath: "conf\\settings.xml", format: "maven-settings" },
	{ envKey: "MAVEN_CONF", relativePath: "settings.xml", format: "maven-settings" },
];

const NPM_CONFIG_CANDIDATES = [
	{ envKey: "NPM_CONFIG_USERCONFIG", format: "key-value" },
	{ path: "%USERPROFILE%\\.npmrc", format: "key-value" },
];

const PNPM_CONFIG_CANDIDATES = [
	...NPM_CONFIG_CANDIDATES,
	{ envKey: "PNPM_HOME", relativePath: "config\\rc", format: "key-value" },
	{ path: "%LOCALAPPDATA%\\pnpm\\config\\rc", format: "key-value" },
	{ path: "%APPDATA%\\pnpm\\config\\rc", format: "key-value" },
];

const YARN_CONFIG_CANDIDATES = [
	{ path: "%USERPROFILE%\\.yarnrc", format: "yarn-v1" },
	{ path: "%USERPROFILE%\\.yarnrc.yml", format: "yarn-yaml" },
];

const GO_CONFIG_CANDIDATES = [
	{ envKey: "GOENV", format: "key-value" },
	{ path: "%APPDATA%\\go\\env", format: "key-value" },
];

const NUGET_CONFIG_CANDIDATES = [
	{ path: "%APPDATA%\\NuGet\\NuGet.Config", format: "nuget-config" },
];

/**
 * 常见开发目录的唯一清单。locationCandidates 用于识别工具当前真正使用的目录；
 * 有 method 的条目才允许页面发起手动迁移。
 */
const DEV_ENV_DIRECTORY_RULES = [
	{
		id: "maven_repo", label: "Maven 本地仓库", path: "%USERPROFILE%\\.m2", tool: "Maven",
		sourceSubdir: "repository", targetSubdir: "Maven\\repository", method: "config-file",
		configKey: "localRepository", configCandidates: MAVEN_CONFIG_CANDIDATES,
		locationCandidates: MAVEN_CONFIG_CANDIDATES.map((candidate) => ({ ...candidate, type: "config" })),
		note: "修改 Maven settings.xml 中的 localRepository。",
	},
	{
		id: "gradle_cache", label: "Gradle 缓存", path: "%USERPROFILE%\\.gradle", tool: "Gradle",
		targetSubdir: "Gradle", method: "user-env", envKeys: ["GRADLE_USER_HOME"],
		locationCandidates: [{ type: "env", envKey: "GRADLE_USER_HOME" }],
		note: "设置 Gradle 官方支持的用户环境变量 GRADLE_USER_HOME。",
	},
	{
		id: "npm_cache", label: "npm 用户缓存", path: "%USERPROFILE%\\.npm", tool: "Node.js",
		targetSubdir: "Node\\npm-cache", method: "config-file", configKey: "cache",
		configCandidates: NPM_CONFIG_CANDIDATES,
		locationCandidates: [
			{ type: "env", envKey: "NPM_CONFIG_CACHE" },
			...NPM_CONFIG_CANDIDATES.map((candidate) => ({ ...candidate, type: "config" })),
		],
		note: "修改用户级 .npmrc 中的 cache。",
	},
	{
		id: "npm_cache_local", label: "npm AppData 缓存", path: "%LOCALAPPDATA%\\npm-cache", tool: "Node.js",
		targetSubdir: "Node\\npm-cache", method: "config-file", configKey: "cache",
		configCandidates: NPM_CONFIG_CANDIDATES,
		locationCandidates: [
			{ type: "env", envKey: "NPM_CONFIG_CACHE" },
			...NPM_CONFIG_CANDIDATES.map((candidate) => ({ ...candidate, type: "config" })),
		],
		note: "修改用户级 .npmrc 中的 cache。",
	},
	{
		id: "pnpm_store", label: "pnpm store", path: "%LOCALAPPDATA%\\pnpm-store", tool: "Node.js",
		targetSubdir: "Node\\pnpm-store", method: "config-file", configKey: "store-dir",
		configCandidates: PNPM_CONFIG_CANDIDATES,
		locationCandidates: PNPM_CONFIG_CANDIDATES.map((candidate) => ({ ...candidate, type: "config" })),
		note: "修改 pnpm 配置文件中的 store-dir。",
	},
	{
		id: "yarn_cache", label: "Yarn 缓存", path: "%LOCALAPPDATA%\\Yarn\\Cache", tool: "Node.js",
		targetSubdir: "Node\\yarn-cache", method: "config-file", configKey: "cache-folder",
		configCandidates: YARN_CONFIG_CANDIDATES,
		locationCandidates: [
			{ type: "env", envKey: "YARN_CACHE_FOLDER" },
			...YARN_CONFIG_CANDIDATES.map((candidate) => ({ ...candidate, type: "config" })),
		],
		note: "修改 Yarn 配置文件中的缓存目录。",
	},
	{
		id: "cargo", label: "Cargo 缓存与注册表", path: "%USERPROFILE%\\.cargo", tool: "Rust",
		targetSubdir: "Rust\\cargo", method: "user-env", envKeys: ["CARGO_HOME"],
		locationCandidates: [{ type: "env", envKey: "CARGO_HOME" }],
		note: "设置官方支持的用户环境变量 CARGO_HOME。",
	},
	{
		id: "rustup", label: "Rustup 工具链", path: "%USERPROFILE%\\.rustup", tool: "Rust",
		targetSubdir: "Rust\\rustup", method: "user-env", envKeys: ["RUSTUP_HOME"],
		locationCandidates: [{ type: "env", envKey: "RUSTUP_HOME" }],
		note: "设置官方支持的用户环境变量 RUSTUP_HOME。",
	},
	{
		id: "go_path", label: "Go 默认工作区", path: "%USERPROFILE%\\go", tool: "Go",
		targetSubdir: "Go", method: "config-file", configKey: "GOPATH",
		configCandidates: GO_CONFIG_CANDIDATES,
		locationCandidates: [
			{ type: "env", envKey: "GOPATH" },
			...GO_CONFIG_CANDIDATES.map((candidate) => ({ ...candidate, type: "config" })),
		],
		note: "修改 Go 持久配置文件中的 GOPATH。",
	},
	{
		id: "nuget", label: "NuGet 包缓存", path: "%USERPROFILE%\\.nuget\\packages", tool: ".NET",
		targetSubdir: "NuGet\\packages", method: "config-file", configKey: "globalPackagesFolder",
		configCandidates: NUGET_CONFIG_CANDIDATES,
		locationCandidates: [
			{ type: "env", envKey: "NUGET_PACKAGES" },
			...NUGET_CONFIG_CANDIDATES.map((candidate) => ({ ...candidate, type: "config" })),
		],
		note: "修改 NuGet.Config 中的 globalPackagesFolder。",
	},
	{
		id: "ivy2", label: "Ivy 缓存", path: "%USERPROFILE%\\.ivy2", tool: "JVM",
		locationCandidates: [{ type: "env", envKey: "IVY_HOME" }],
	},
	{ id: "sbt", label: "sbt 缓存", path: "%USERPROFILE%\\.sbt", tool: "JVM" },
	{
		id: "android_user", label: "Android 用户目录", path: "%USERPROFILE%\\.android", tool: "Android",
		targetSubdir: "Android\\user", method: "user-env", envKeys: ["ANDROID_USER_HOME"],
		locationCandidates: [
			{ type: "env", envKey: "ANDROID_USER_HOME" },
			{ type: "env", envKey: "ANDROID_SDK_HOME", relativePath: ".android" },
		],
		note: "设置 Android 官方支持的用户环境变量 ANDROID_USER_HOME。",
	},
	{
		id: "android_sdk", label: "Android SDK", path: "%LOCALAPPDATA%\\Android\\Sdk", tool: "Android",
		locationCandidates: [
			{ type: "env", envKey: "ANDROID_HOME" },
			{ type: "env", envKey: "ANDROID_SDK_ROOT" },
		],
	},
	{ id: "docker_user", label: "Docker 用户目录", path: "%USERPROFILE%\\.docker", tool: "Docker" },
	{ id: "docker_local", label: "Docker Desktop 数据", path: "%LOCALAPPDATA%\\Docker", tool: "Docker" },
	{ id: "cache", label: "通用 .cache 目录", path: "%USERPROFILE%\\.cache", tool: "通用开发工具" },
];

const MANUAL_MIGRATION_WHITELIST = DEV_ENV_DIRECTORY_RULES.filter((item) => item.method);

function getManualMigrationRule(id) {
	return MANUAL_MIGRATION_WHITELIST.find((item) => item.id === id) ?? null;
}

function getEnvValue(key) {
	const actualKey = Object.keys(process.env).find((item) => item.toLowerCase() === key.toLowerCase());
	return actualKey ? process.env[actualKey] ?? "" : "";
}

function cleanAbsolutePath(value) {
	const path = resolveEnvPath(String(value ?? "")).trim().replace(/^"+|"+$/g, "");
	return path && isAbsolute(path) ? normalize(path) : "";
}

function resolveConfigCandidatePath(candidate) {
	if (candidate.path) return cleanAbsolutePath(candidate.path);
	if (!candidate.envKey) return "";
	const envPath = cleanAbsolutePath(getEnvValue(candidate.envKey));
	if (!envPath) return "";
	return candidate.relativePath ? join(envPath, candidate.relativePath) : envPath;
}

function samePath(left, right) {
	return normalize(String(left)).replace(/[\\/]+$/, "").toLowerCase() ===
		normalize(String(right)).replace(/[\\/]+$/, "").toLowerCase();
}

/** 读取规则所指向的当前生效目录；这里只认明确的环境变量或可解析配置。 */
async function resolveConfiguredLocation(rule) {
	for (const candidate of rule?.locationCandidates ?? []) {
		if (candidate.type === "env") {
			const base = cleanAbsolutePath(getEnvValue(candidate.envKey));
			if (!base) continue;
			return {
				path: candidate.relativePath ? join(base, candidate.relativePath) : base,
				source: "环境变量 " + candidate.envKey,
				settingLabel: candidate.envKey,
			};
		}
		if (candidate.type !== "config") continue;
		const configPath = resolveConfigCandidatePath(candidate);
		if (!configPath) continue;
		try {
			if (!(await stat(configPath)).isFile()) continue;
			const content = await readFile(configPath, "utf8");
			const configuredPath = cleanAbsolutePath(readConfigValue(content, candidate.format, rule.configKey));
			if (!configuredPath) continue;
			return {
				path: configuredPath,
				source: candidate.envKey ? "环境变量 " + candidate.envKey : "配置文件",
				settingLabel: configPath,
				configPath,
			};
		} catch {
			// 继续寻找该工具的下一个受支持配置来源。
		}
	}
	return null;
}

/** 只有源缓存目录和可写持久配置都存在时，才暴露手动迁移能力。 */
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
			const configuredPath = cleanAbsolutePath(getEnvValue(key));
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
			const configuredPath = cleanAbsolutePath(readConfigValue(content, candidate.format, rule.configKey));
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
	DEV_ENV_DIRECTORY_RULES,
	MANUAL_MIGRATION_WHITELIST,
	getManualMigrationRule,
	resolveConfigCandidatePath,
	resolveConfiguredLocation,
	resolveManualMigration,
	samePath,
};
