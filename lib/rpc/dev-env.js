/**
 * 开发环境盘点：读取常见开发环境变量，并扫描用户目录下常见开发缓存。
 *
 * @module @dsh-plugin/disk-sentinel/rpc/dev-env
 */
import { lstat, readFile, readdir, realpath, stat, writeFile } from "node:fs/promises";
import { join, normalize, parse } from "node:path";
import { resolveEnvPath } from "../junk-definitions.js";
import {
	DEV_ENV_DIRECTORY_RULES,
	resolveConfiguredLocation,
	resolveManualMigration,
	samePath,
} from "../dev-env-migration-rules.js";
import { isDevEnvVarBlacklisted } from "../dev-env-var-blacklist.js";
import { ensureWorkspaceDir } from "./workspace.js";

/** 开发环境分析缓存文件名（位于「磁盘哨兵」工作目录）。 */
const DEV_ENV_CACHE_NAME = "开发环境分析.json";

/** 缓存结构版本：路径型变量、盘符聚合和通用环境变量黑名单。 */
const DEV_ENV_CACHE_VERSION = 13;

/** 自动缓存有效期：一天。 */
const DEV_ENV_CACHE_MAX_AGE_MS = 24 * 60 * 60 * 1000;

/** 常见开发环境变量。 */
const DEV_ENV_VARS = [
	{ key: "JAVA_HOME", label: "Java JDK" },
	{ key: "JDK_HOME", label: "Java JDK" },
	{ key: "CLASSPATH", label: "Java classpath" },
	{ key: "JAVA_TOOL_OPTIONS", label: "Java 启动参数" },
	{ key: "MAVEN_HOME", label: "Maven 安装目录" },
	{ key: "M2_HOME", label: "Maven 安装目录" },
	{ key: "MAVEN_OPTS", label: "Maven JVM 参数" },
	{ key: "GRADLE_HOME", label: "Gradle 安装目录" },
	{ key: "GRADLE_USER_HOME", label: "Gradle 用户目录" },
	{ key: "GRADLE_OPTS", label: "Gradle JVM 参数" },
	{ key: "NODE_HOME", label: "Node.js 安装目录" },
	{ key: "NODE_PATH", label: "Node.js 模块路径" },
	{ key: "NVM_HOME", label: "nvm-windows 安装目录" },
	{ key: "NVM_SYMLINK", label: "nvm-windows 当前 Node 链接" },
	{ key: "VOLTA_HOME", label: "Volta 工具链目录" },
	{ key: "NPM_CONFIG_CACHE", label: "npm 缓存目录" },
	{ key: "PNPM_HOME", label: "pnpm 全局目录" },
	{ key: "YARN_CACHE_FOLDER", label: "Yarn 缓存目录" },
	{ key: "PYTHON_HOME", label: "Python 安装目录" },
	{ key: "PYTHONPATH", label: "Python 模块路径" },
	{ key: "PYENV", label: "pyenv 目录" },
	{ key: "PYENV_ROOT", label: "pyenv 根目录" },
	{ key: "CONDA_PREFIX", label: "Conda 当前环境" },
	{ key: "CONDA_ROOT", label: "Conda 根目录" },
	{ key: "CONDA_EXE", label: "Conda 可执行文件" },
	{ key: "VIRTUAL_ENV", label: "Python 虚拟环境" },
	{ key: "PIP_CACHE_DIR", label: "pip 缓存目录" },
	{ key: "POETRY_HOME", label: "Poetry 安装目录" },
	{ key: "POETRY_CACHE_DIR", label: "Poetry 缓存目录" },
	{ key: "PDM_HOME", label: "PDM 目录" },
	{ key: "UV_CACHE_DIR", label: "uv 缓存目录" },
	{ key: "GOPATH", label: "Go 工作区" },
	{ key: "GOROOT", label: "Go SDK" },
	{ key: "GOMODCACHE", label: "Go module 缓存" },
	{ key: "CARGO_HOME", label: "Cargo 缓存目录" },
	{ key: "RUSTUP_HOME", label: "Rustup 工具链目录" },
	{ key: "NUGET_PACKAGES", label: "NuGet 包缓存" },
	{ key: "DOTNET_ROOT", label: ".NET SDK" },
	{ key: "ANDROID_HOME", label: "Android SDK" },
	{ key: "ANDROID_SDK_ROOT", label: "Android SDK" },
	{ key: "ANDROID_NDK_HOME", label: "Android NDK" },
	{ key: "FLUTTER_HOME", label: "Flutter SDK" },
	{ key: "DART_SDK", label: "Dart SDK" },
	{ key: "KOTLIN_HOME", label: "Kotlin 编译器" },
	{ key: "SCALA_HOME", label: "Scala SDK" },
	{ key: "SBT_HOME", label: "sbt 安装目录" },
	{ key: "DOCKER_CONFIG", label: "Docker 配置目录" },
	{ key: "KUBECONFIG", label: "Kubernetes 配置" },
	{ key: "VCPKG_ROOT", label: "vcpkg 根目录" },
	{ key: "CMAKE_PREFIX_PATH", label: "CMake 包查找路径" },
	{ key: "CUDA_PATH", label: "CUDA Toolkit" },
];

/** 自动发现开发环境变量的名称关键词。 */
const DEV_ENV_KEY_RE = /(JAVA|JDK|CLASSPATH|MAVEN|M2_|GRADLE|NODE|NPM|PNPM|YARN|PYTHON|PYENV|CONDA|PIP|POETRY|PDM|UV_|GOPATH|GOROOT|GOMOD|CARGO|RUST|NUGET|DOTNET|ANDROID|FLUTTER|DART|KOTLIN|SCALA|SBT|IVY|DOCKER|KUBE|VCPKG|CMAKE|LLVM|MINGW|MSYS|GIT|VSCODE|IDEA|CUDA)/i;

/** 不展示敏感变量原值。 */
const SENSITIVE_ENV_KEY_RE = /(TOKEN|SECRET|PASSWORD|PASSWD|PRIVATE_KEY|API_KEY|ACCESS_KEY|AUTH|CREDENTIAL)/i;

/** 页面和迁移共用同一份目录规则，保留旧导出名供报告与测试使用。 */
const DEV_KNOWN_DIRS = DEV_ENV_DIRECTORY_RULES;

/** 路径存在性与类型。 */
async function pathInfo(path) {
	try {
		const linkInfo = await lstat(path);
		const isLink = linkInfo.isSymbolicLink();
		const s = isLink ? await stat(path) : linkInfo;
		const linkTarget = isLink ? await realpath(path) : null;
		return {
			exists: true,
			isDirectory: s.isDirectory(),
			isFile: s.isFile(),
			isLink,
			linkTarget,
			actualDrive: parse(linkTarget ?? path).root.replace(/[\\/]$/, ""),
			modifiedAt: s.mtimeMs,
		};
	} catch {
		return {
			exists: false,
			isDirectory: false,
			isFile: false,
			isLink: false,
			linkTarget: null,
			actualDrive: parse(path).root.replace(/[\\/]$/, ""),
			modifiedAt: null,
		};
	}
}

/** 目录体积估算：跳过符号链接/特殊项，权限失败时继续。 */
async function measurePath(path, options = {}) {
	const onProgress = typeof options.onProgress === "function" ? options.onProgress : null;
	const info = await pathInfo(path);
	if (!info.exists) return { ...info, sizeBytes: 0, fileCount: 0, dirCount: 0 };
	if (info.isFile) {
		const s = await stat(path);
		onProgress?.({ fileDelta: 1, dirDelta: 0, currentPath: path });
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
		let scannedFilesInDir = 0;
		let scannedDirsInDir = 0;
		for (const entry of entries) {
			if (entry.isSymbolicLink()) continue;
			const child = join(dir, entry.name);
			if (entry.isDirectory()) {
				scannedDirsInDir++;
				dirCount++;
				stack.push(child);
			} else if (entry.isFile()) {
				scannedFilesInDir++;
				try {
					const s = await stat(child);
					sizeBytes += s.size;
					fileCount++;
				} catch {
					// 文件消失或权限不足时跳过
				}
			}
		}
		onProgress?.({
			fileDelta: scannedFilesInDir,
			dirDelta: scannedDirsInDir,
			currentPath: dir,
		});
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

/** 环境变量值形态，用于展示状态文案。 */
function envValueKind(value) {
	if (!value) return "empty";
	if (value.includes(";")) return "path-list";
	if (/^[a-zA-Z]:[\\/]/.test(value) || value.startsWith("\\\\")) return "path";
	return "text";
}

/** 是否是可统计的绝对路径。 */
function isAbsolutePath(value) {
	return /^[a-zA-Z]:[\\/]/.test(value) || value.startsWith("\\\\");
}

/** 从环境变量值中提取路径。 */
function extractEnvPaths(value) {
	if (!value || value === "(已隐藏敏感值)") return [];
	return value
		.split(";")
		.map((part) => part.trim().replace(/^"+|"+$/g, ""))
		.filter((part) => part && isAbsolutePath(part));
}

/** 路径所属盘符。 */
function driveOf(path) {
	const match = String(path ?? "").match(/^([a-zA-Z]:)[\\/]/);
	if (match) return match[1].toUpperCase();
	if (String(path ?? "").startsWith("\\\\")) return "网络路径";
	return "其他";
}

/** 简单判断自动发现的环境变量是否可能和开发环境相关。 */
function isDevEnvKey(key) {
	return !isDevEnvVarBlacklisted(key) && DEV_ENV_KEY_RE.test(key);
}

/** 敏感变量只展示占位，不落盘明文。 */
function displayEnvValue(key, value) {
	if (!value) return "";
	if (SENSITIVE_ENV_KEY_RE.test(key)) return "(已隐藏敏感值)";
	return resolveEnvPath(value);
}

/** 构建完整开发环境变量清单：预设变量 + 自动发现变量。 */
async function collectDevEnvVars() {
	const preset = new Map(DEV_ENV_VARS.map((item) => [item.key.toUpperCase(), item]));
	const discovered = [];

	for (const [key, rawValue] of Object.entries(process.env)) {
		if (!rawValue || !isDevEnvKey(key)) continue;
		const presetItem = preset.get(key.toUpperCase());
		discovered.push({
			key,
			label: presetItem?.label ?? "自动发现",
			rawValue,
			source: presetItem ? "preset" : "discovered",
		});
	}

	for (const item of DEV_ENV_VARS) {
		if (process.env[item.key] !== undefined) continue;
		discovered.push({
			key: item.key,
			label: item.label,
			rawValue: "",
			source: "preset",
		});
	}

	discovered.sort((a, b) => {
		if (a.rawValue && !b.rawValue) return -1;
		if (!a.rawValue && b.rawValue) return 1;
		if (a.source !== b.source) return a.source === "preset" ? -1 : 1;
		return a.key.localeCompare(b.key);
	});

	const all = await Promise.all(discovered.map(async (item) => {
		const resolvedValue = displayEnvValue(item.key, item.rawValue);
		const paths = extractEnvPaths(resolvedValue);
		// 缓存和页面只保留过滤后的路径，避免黑名单内容从环境变量原值泄漏回 UI。
		const value = paths.join(";");
		const kind = envValueKind(value);
		const firstPath = paths.length === 1 ? paths[0] : "";
		const info = firstPath
			? await pathInfo(firstPath)
			: { exists: paths.length > 0, isDirectory: false, isFile: false, modifiedAt: null };
		return {
			key: item.key,
			label: item.label,
			value,
			defined: Boolean(item.rawValue),
			source: item.source,
			valueKind: paths.length > 1 ? "path-list" : paths.length === 1 ? "path" : kind,
			pathCount: paths.length,
			paths,
			...info,
		};
	}));
	return all.filter((item) => item.defined && item.paths.length > 0);
}

/** 按盘符聚合环境变量解析出的路径，并统计每个路径大小。 */
async function collectEnvPathGroups(envVars, measure = measurePath) {
	const byPath = new Map();
	for (const envVar of envVars) {
		for (const path of envVar.paths ?? []) {
			const key = normKey(path);
			let entry = byPath.get(key);
			if (!entry) {
				entry = {
					path,
					drive: driveOf(path),
					envKeys: [],
					labels: [],
				};
				byPath.set(key, entry);
			}
			if (!entry.envKeys.includes(envVar.key)) entry.envKeys.push(envVar.key);
			if (envVar.label && !entry.labels.includes(envVar.label)) entry.labels.push(envVar.label);
		}
	}

	const entries = await mapLimit([...byPath.values()], 3, async (entry) => {
		const measured = await measure(entry.path);
		return {
			...entry,
			...measured,
		};
	});
	entries.sort((a, b) => (b.sizeBytes - a.sizeBytes) || a.path.localeCompare(b.path));

	const groupsMap = new Map();
	for (const entry of entries) {
		let group = groupsMap.get(entry.drive);
		if (!group) {
			group = { drive: entry.drive, totalBytes: 0, pathCount: 0, paths: [] };
			groupsMap.set(entry.drive, group);
		}
		group.totalBytes += entry.sizeBytes ?? 0;
		group.pathCount++;
		group.paths.push(entry);
	}
	return [...groupsMap.values()].sort(compareDriveGroups);
}

/** C/D/E/F 固定在前，其余本地盘符和网络路径依次排在后面。 */
function compareDriveGroups(left, right) {
	const preferred = ["C:", "D:", "E:", "F:"];
	const leftDrive = String(left?.drive ?? "").toUpperCase();
	const rightDrive = String(right?.drive ?? "").toUpperCase();
	const leftIndex = preferred.indexOf(leftDrive);
	const rightIndex = preferred.indexOf(rightDrive);
	const leftRank = leftIndex >= 0 ? leftIndex : 100;
	const rightRank = rightIndex >= 0 ? rightIndex : 100;
	return (leftRank - rightRank) || leftDrive.localeCompare(rightDrive);
}

/** 执行一次真实开发环境扫描。 */
async function runDevEnvironmentScan(options = {}) {
	const startedAt = Date.now();
	const onProgress = typeof options.onProgress === "function" ? options.onProgress : null;
	let pathsScanned = 0;
	async function trackedMeasure(path) {
		onProgress?.({ currentPath: path, pathsScanned });
		const measured = await measurePath(path, {
			onProgress(progress) {
				onProgress?.({ ...progress, pathsScanned });
			},
		});
		pathsScanned++;
		onProgress?.({ currentPath: path, pathsScanned });
		return measured;
	}
	const envVars = await collectDevEnvVars();
	const envPathGroups = await collectEnvPathGroups(envVars, trackedMeasure);

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
	const scannedKnown = await mapLimit(uniqueDirs, 3, async (item) => {
		const defaultMeasured = await trackedMeasure(item.path);
		const configured = defaultMeasured.isLink ? null : await resolveConfiguredLocation(item);
		const defaultEffectivePath = item.sourceSubdir ? join(item.path, item.sourceSubdir) : item.path;
		const configuredElsewhere = Boolean(configured?.path) && !samePath(configured.path, defaultEffectivePath);
		const activePath = defaultMeasured.isLink
			? defaultMeasured.linkTarget
			: configuredElsewhere ? configured.path : item.path;
		const measured = activePath && !samePath(activePath, item.path)
			? await trackedMeasure(activePath)
			: defaultMeasured;
		const isMigrated = Boolean(activePath) && !samePath(activePath, item.path) && measured.exists;
		const manualMigration = isMigrated || defaultMeasured.isLink
			? null
			: await resolveManualMigration(item, item.path);
		return {
			id: item.id,
			label: item.label,
			tool: item.tool,
			path: item.path,
			effectivePath: activePath ?? item.path,
			isMigrated,
			migrationSource: defaultMeasured.isLink ? "目录链接" : configured?.source ?? null,
			migrationSetting: defaultMeasured.isLink ? item.path : configured?.settingLabel ?? null,
			sourceExists: defaultMeasured.exists,
			manualMigration,
			...measured,
			// 卡片仍以默认路径为源；链接信息来自默认路径而非目标目录的测量结果。
			isLink: defaultMeasured.isLink,
			linkTarget: defaultMeasured.linkTarget,
		};
	});
	// npm 等工具存在多个历史默认目录；它们若被同一份配置迁到同一目标，只展示和统计一次。
	const activePaths = new Set();
	const known = scannedKnown.filter((item) => {
		if (!item.isMigrated) return true;
		const key = normKey(item.effectivePath);
		if (activePaths.has(key)) return false;
		activePaths.add(key);
		return true;
	});
	known.sort((a, b) => (b.sizeBytes - a.sizeBytes) || a.path.localeCompare(b.path));

	const totalKnownBytes = known.reduce((sum, item) => sum + (item.sizeBytes ?? 0), 0);
	const totalEnvPathBytes = envPathGroups.reduce((sum, group) => sum + (group.totalBytes ?? 0), 0);
	const envPathCount = envPathGroups.reduce((sum, group) => sum + (group.pathCount ?? 0), 0);
	return {
		createdAt: Date.now(),
		cacheVersion: DEV_ENV_CACHE_VERSION,
		durationMs: Date.now() - startedAt,
		userProfile: process.env.USERPROFILE ?? "",
		localAppData: process.env.LOCALAPPDATA ?? "",
		envVars,
		envPathGroups,
		totalEnvPathBytes,
		envPathCount,
		knownDirs: known,
		totalKnownBytes,
		fromCache: false,
	};
}

/** 读取仍在有效期内的开发环境分析缓存。 */
async function readFreshCache(filePath, now) {
	try {
		const data = JSON.parse(await readFile(filePath, "utf8"));
		if (data.cacheVersion !== DEV_ENV_CACHE_VERSION) return null;
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

	const result = await runDevEnvironmentScan({ onProgress: options.onProgress });
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
	extractEnvPaths,
	isDevEnvKey,
	measurePath,
	normKey,
	compareDriveGroups,
	runDevEnvironmentScan,
	scanDevEnvironment,
};
