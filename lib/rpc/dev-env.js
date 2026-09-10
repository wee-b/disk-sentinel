/**
 * 开发环境盘点：读取常见开发环境变量，并扫描用户目录下常见开发缓存。
 *
 * @module @dsh-plugin/disk-sentinel/rpc/dev-env
 */
import { readFile, readdir, stat, writeFile } from "node:fs/promises";
import { join, normalize } from "node:path";
import { resolveEnvPath } from "../junk-definitions.js";
import { ensureWorkspaceDir } from "./workspace.js";

/** 开发环境分析缓存文件名（位于「磁盘哨兵」工作目录）。 */
const DEV_ENV_CACHE_NAME = "开发环境分析.json";

/** 自动缓存有效期：一天。 */
const DEV_ENV_CACHE_MAX_AGE_MS = 24 * 60 * 60 * 1000;

/** 常见开发环境变量。 */
const DEV_ENV_VARS = [
	{ key: "JAVA_HOME", label: "Java JDK" },
	{ key: "MAVEN_HOME", label: "Maven 安装目录" },
	{ key: "M2_HOME", label: "Maven 安装目录" },
	{ key: "GRADLE_HOME", label: "Gradle 安装目录" },
	{ key: "GRADLE_USER_HOME", label: "Gradle 用户目录" },
	{ key: "NODE_HOME", label: "Node.js 安装目录" },
	{ key: "NPM_CONFIG_CACHE", label: "npm 缓存目录" },
	{ key: "PNPM_HOME", label: "pnpm 全局目录" },
	{ key: "YARN_CACHE_FOLDER", label: "Yarn 缓存目录" },
	{ key: "PYTHON_HOME", label: "Python 安装目录" },
	{ key: "PYENV", label: "pyenv 目录" },
	{ key: "CONDA_PREFIX", label: "Conda 当前环境" },
	{ key: "GOPATH", label: "Go 工作区" },
	{ key: "GOROOT", label: "Go SDK" },
	{ key: "CARGO_HOME", label: "Cargo 缓存目录" },
	{ key: "RUSTUP_HOME", label: "Rustup 工具链目录" },
	{ key: "NUGET_PACKAGES", label: "NuGet 包缓存" },
	{ key: "ANDROID_HOME", label: "Android SDK" },
	{ key: "ANDROID_SDK_ROOT", label: "Android SDK" },
	{ key: "DOCKER_CONFIG", label: "Docker 配置目录" },
];

/**
 * 没有固定环境变量、但常在 C 盘用户目录/AppData 下膨胀的开发目录。
 * 路径会自动解析 %USERPROFILE% / %LOCALAPPDATA% / %APPDATA%。
 */
const DEV_KNOWN_DIRS = [
	{ id: "maven_repo", label: "Maven 本地仓库", path: "%USERPROFILE%\\.m2", tool: "Maven" },
	{ id: "gradle_cache", label: "Gradle 缓存", path: "%USERPROFILE%\\.gradle", tool: "Gradle" },
	{ id: "npm_cache", label: "npm 用户缓存", path: "%USERPROFILE%\\.npm", tool: "Node.js" },
	{ id: "npm_cache_local", label: "npm AppData 缓存", path: "%LOCALAPPDATA%\\npm-cache", tool: "Node.js" },
	{ id: "pnpm_store", label: "pnpm store", path: "%LOCALAPPDATA%\\pnpm-store", tool: "Node.js" },
	{ id: "yarn_cache", label: "Yarn 缓存", path: "%LOCALAPPDATA%\\Yarn\\Cache", tool: "Node.js" },
	{ id: "cargo", label: "Cargo 缓存与注册表", path: "%USERPROFILE%\\.cargo", tool: "Rust" },
	{ id: "rustup", label: "Rustup 工具链", path: "%USERPROFILE%\\.rustup", tool: "Rust" },
	{ id: "go_path", label: "Go 默认工作区", path: "%USERPROFILE%\\go", tool: "Go" },
	{ id: "nuget", label: "NuGet 包缓存", path: "%USERPROFILE%\\.nuget\\packages", tool: ".NET" },
	{ id: "ivy2", label: "Ivy 缓存", path: "%USERPROFILE%\\.ivy2", tool: "JVM" },
	{ id: "sbt", label: "sbt 缓存", path: "%USERPROFILE%\\.sbt", tool: "JVM" },
	{ id: "android_user", label: "Android 用户目录", path: "%USERPROFILE%\\.android", tool: "Android" },
	{ id: "android_sdk", label: "Android SDK", path: "%LOCALAPPDATA%\\Android\\Sdk", tool: "Android" },
	{ id: "docker_user", label: "Docker 用户目录", path: "%USERPROFILE%\\.docker", tool: "Docker" },
	{ id: "docker_local", label: "Docker Desktop 数据", path: "%LOCALAPPDATA%\\Docker", tool: "Docker" },
	{ id: "cache", label: "通用 .cache 目录", path: "%USERPROFILE%\\.cache", tool: "通用开发工具" },
];

/** 路径存在性与类型。 */
async function pathInfo(path) {
	try {
		const s = await stat(path);
		return {
			exists: true,
			isDirectory: s.isDirectory(),
			isFile: s.isFile(),
			modifiedAt: s.mtimeMs,
		};
	} catch {
		return { exists: false, isDirectory: false, isFile: false, modifiedAt: null };
	}
}

/** 目录体积估算：跳过符号链接/特殊项，权限失败时继续。 */
async function measurePath(path) {
	const info = await pathInfo(path);
	if (!info.exists) return { ...info, sizeBytes: 0, fileCount: 0, dirCount: 0 };
	if (info.isFile) {
		const s = await stat(path);
		return { ...info, sizeBytes: s.size, fileCount: 1, dirCount: 0 };
	}
	if (!info.isDirectory) return { ...info, sizeBytes: 0, fileCount: 0, dirCount: 0 };

	let sizeBytes = 0;
	let fileCount = 0;
	let dirCount = 0;
	const stack = [path];
	while (stack.length > 0) {
		const dir = stack.pop();
		let entries;
		try {
			entries = await readdir(dir, { withFileTypes: true });
		} catch {
			continue;
		}
		for (const entry of entries) {
			if (entry.isSymbolicLink()) continue;
			const child = join(dir, entry.name);
			if (entry.isDirectory()) {
				dirCount++;
				stack.push(child);
			} else if (entry.isFile()) {
				try {
					const s = await stat(child);
					sizeBytes += s.size;
					fileCount++;
				} catch {
					// 文件消失或权限不足时跳过
				}
			}
		}
	}
	return { ...info, sizeBytes, fileCount, dirCount };
}

/** 规范化路径用于去重。 */
function normKey(path) {
	return normalize(path).toLowerCase();
}

/** 小并发 map，避免一次性把所有目录扫描任务压到磁盘上。 */
async function mapLimit(items, limit, mapper) {
	const out = new Array(items.length);
	let next = 0;
	async function worker() {
		for (;;) {
			const index = next++;
			if (index >= items.length) return;
			out[index] = await mapper(items[index], index);
		}
	}
	await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
	return out;
}

/** 执行一次真实开发环境扫描。 */
async function runDevEnvironmentScan() {
	const startedAt = Date.now();
	const envVars = await Promise.all(DEV_ENV_VARS.map(async (item) => {
		const raw = process.env[item.key] ?? "";
		const value = raw ? resolveEnvPath(raw) : "";
		const info = value ? await pathInfo(value) : { exists: false, isDirectory: false, isFile: false, modifiedAt: null };
		return {
			key: item.key,
			label: item.label,
			value,
			defined: Boolean(raw),
			...info,
		};
	}));

	const seen = new Set();
	const uniqueDirs = [];
	for (const item of DEV_KNOWN_DIRS) {
		const path = resolveEnvPath(item.path);
		if (!path) continue;
		const key = normKey(path);
		if (seen.has(key)) continue;
		seen.add(key);
		uniqueDirs.push({ ...item, path });
	}
	const known = await mapLimit(uniqueDirs, 3, async (item) => {
		const measured = await measurePath(item.path);
		return {
			id: item.id,
			label: item.label,
			tool: item.tool,
			path: item.path,
			...measured,
		};
	});
	known.sort((a, b) => (b.sizeBytes - a.sizeBytes) || a.path.localeCompare(b.path));

	const totalKnownBytes = known.reduce((sum, item) => sum + (item.sizeBytes ?? 0), 0);
	return {
		createdAt: Date.now(),
		durationMs: Date.now() - startedAt,
		userProfile: process.env.USERPROFILE ?? "",
		localAppData: process.env.LOCALAPPDATA ?? "",
		envVars,
		knownDirs: known,
		totalKnownBytes,
		fromCache: false,
	};
}

/** 读取仍在有效期内的开发环境分析缓存。 */
async function readFreshCache(filePath, now) {
	try {
		const data = JSON.parse(await readFile(filePath, "utf8"));
		const createdAt = Number(data.createdAt ?? 0);
		if (!createdAt || now - createdAt > DEV_ENV_CACHE_MAX_AGE_MS) return null;
		return {
			...data,
			fromCache: true,
			cacheFile: filePath,
			cacheAgeMs: now - createdAt,
		};
	} catch {
		return null;
	}
}

/**
 * 扫描开发环境变量与常见开发缓存目录。
 *
 * 默认优先返回 24 小时内的工作区缓存；force=true 时跳过缓存重新扫描。
 *
 * @param {Object} [options]
 * @param {boolean} [options.force=false]
 */
async function scanDevEnvironment(options = {}) {
	const force = options.force === true;
	const dir = await ensureWorkspaceDir();
	const cacheFile = join(dir, DEV_ENV_CACHE_NAME);
	const now = Date.now();
	if (!force) {
		const cached = await readFreshCache(cacheFile, now);
		if (cached) return cached;
	}

	const result = await runDevEnvironmentScan();
	const payload = {
		...result,
		cacheFile,
		cacheAgeMs: 0,
	};
	await writeFile(cacheFile, JSON.stringify(payload, null, 2), "utf8");
	return payload;
}

export {
	DEV_ENV_VARS,
	DEV_KNOWN_DIRS,
	DEV_ENV_CACHE_NAME,
	DEV_ENV_CACHE_MAX_AGE_MS,
	runDevEnvironmentScan,
	scanDevEnvironment,
};
