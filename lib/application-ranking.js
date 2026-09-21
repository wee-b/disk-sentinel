/**
 * 从全盘目录明细中估算应用占用，并按规范化应用名跨盘聚合。
 *
 * Windows 没有统一、可靠的“应用实际占用”索引；注册表 EstimatedSize 也只
 * 覆盖安装目录。这里基于真实扫描大小识别常见安装/数据根目录，并对嵌套
 * 应用根做差，避免 Steam/Epic 启动器把游戏体积重复计入。
 *
 * @module @dsh-plugin/disk-sentinel/application-ranking
 */

const GENERIC_VENDORS = new Set([
	"adobe", "apple", "autodesk", "docker", "electronic arts", "google",
	"jetbrains", "meta", "microsoft", "mozilla", "nvidia", "nvidia corporation",
	"oracle", "riot games", "rockstar games", "tencent", "unity", "valve",
]);

const IGNORED_NAMES = new Set([
	"common files", "internet explorer", "windows defender", "windows mail",
	"windows media player", "windows multimedia platform", "windows nt",
	"windows photo viewer", "windows portable devices", "windows security",
	"windows sidebar", "windowsapps", "package cache", "packages", "temp",
]);

function normalizePath(path) {
	return String(path ?? "").replaceAll("/", "\\").replace(/\\+$/, "");
}

function pathParts(path) {
	const normalized = normalizePath(path);
	const match = /^([A-Za-z]:)\\(.*)$/.exec(normalized);
	if (!match) return null;
	return {
		drive: match[1].toUpperCase(),
		parts: match[2] ? match[2].split("\\").filter(Boolean) : [],
	};
}

function titleCaseWords(value) {
	return value
		.replace(/[._]+/g, " ")
		.replace(/([a-z])([A-Z])/g, "$1 $2")
		.replace(/\s+/g, " ")
		.trim()
		.replace(/\b[a-z]/g, (c) => c.toUpperCase());
}

function cleanPackageName(value) {
	let name = String(value ?? "").split("_")[0];
	name = name.replace(/[-_. ](?:v(?:ersion)?\s*)?\d+(?:\.\d+){1,}.*$/i, "");
	return titleCaseWords(name);
}

function displayName(vendor, app) {
	const cleanApp = cleanPackageName(app);
	const cleanVendor = titleCaseWords(vendor ?? "");
	if (!cleanVendor || cleanApp.toLowerCase().startsWith(cleanVendor.toLowerCase())) return cleanApp;
	return `${cleanVendor} ${cleanApp}`;
}

function applicationKey(name) {
	return String(name ?? "")
		.toLowerCase()
		.replace(/\b(?:x64|x86|32[- ]?bit|64[- ]?bit|edition|desktop)\b/g, "")
		.replace(/[^\p{L}\p{N}]+/gu, "");
}

function makeCandidate(path, size, drive, name, source) {
	const cleaned = String(name ?? "").trim();
	const key = applicationKey(cleaned);
	if (!cleaned || !key || IGNORED_NAMES.has(cleaned.toLowerCase())) return null;
	return {
		path: normalizePath(path),
		pathLower: normalizePath(path).toLowerCase(),
		drive,
		name: cleaned,
		key,
		source,
		size: Math.max(0, Number(size) || 0),
		ownSize: Math.max(0, Number(size) || 0),
	};
}

/** 仅当当前目录恰好是应用根时返回候选，避免累计目录重复计数。 */
function candidateFromDirectory(record) {
	const parsed = pathParts(record?.p);
	if (!parsed || parsed.parts.length === 0) return null;
	const parts = parsed.parts;
	const lower = parts.map((part) => part.toLowerCase());
	const size = record?.s;
	const path = record?.p;

	// 独立 Steam 游戏库，以及系统盘 Program Files 下的 Steam 库。
	let common = lower.findIndex((part, i) => part === "common" && lower[i - 1] === "steamapps");
	if (common >= 1 && parts.length === common + 2) {
		return makeCandidate(path, size, parsed.drive, cleanPackageName(parts[common + 1]), "game-library");
	}

	if (["apps", "applications", "games", "software", "tools"].includes(lower[0]) && parts.length === 2) {
		return makeCandidate(path, size, parsed.drive, cleanPackageName(parts[1]), "portable");
	}

	if (lower[0] === "program files" || lower[0] === "program files (x86)") {
		if (lower[1] === "windowsapps" && parts.length === 3) {
			return makeCandidate(path, size, parsed.drive, cleanPackageName(parts[2]), "windows-app");
		}
		if (lower[1] === "epic games" && parts.length === 3) {
			return makeCandidate(path, size, parsed.drive, cleanPackageName(parts[2]), "game-library");
		}
		if (GENERIC_VENDORS.has(lower[1]) && parts.length === 3) {
			return makeCandidate(path, size, parsed.drive, displayName(parts[1], parts[2]), "installed");
		}
		if (parts.length === 2) {
			return makeCandidate(path, size, parsed.drive, cleanPackageName(parts[1]), "installed");
		}
	}

	if (lower[0] === "programdata") {
		if (GENERIC_VENDORS.has(lower[1]) && parts.length === 3) {
			return makeCandidate(path, size, parsed.drive, displayName(parts[1], parts[2]), "shared-data");
		}
		if (parts.length === 2) {
			return makeCandidate(path, size, parsed.drive, cleanPackageName(parts[1]), "shared-data");
		}
	}

	// X:\Users\<用户>\AppData\Local|Roaming\...
	if (lower[0] === "users" && lower[2] === "appdata" && (lower[3] === "local" || lower[3] === "roaming")) {
		const base = 4;
		if (lower[base] === "packages" && parts.length === base + 2) {
			return makeCandidate(path, size, parsed.drive, cleanPackageName(parts[base + 1]), "user-data");
		}
		if (lower[base] === "programs" && parts.length === base + 2) {
			return makeCandidate(path, size, parsed.drive, cleanPackageName(parts[base + 1]), "user-install");
		}
		if (GENERIC_VENDORS.has(lower[base]) && parts.length === base + 2) {
			return makeCandidate(path, size, parsed.drive, displayName(parts[base], parts[base + 1]), "user-data");
		}
		if (parts.length === base + 1) {
			return makeCandidate(path, size, parsed.drive, cleanPackageName(parts[base]), "user-data");
		}
	}

	return null;
}

/**
 * @param {Array<{p:string,s:number}>} directories 全量目录明细。
 * @param {number} [limit=10] 返回应用数量。
 * @returns {Array<{name:string,size:number,drives:Array,locations:Array}>}
 */
export function rankApplications(directories, limit = 10) {
	const byPath = new Map();
	for (const record of directories ?? []) {
		const candidate = candidateFromDirectory(record);
		if (!candidate) continue;
		const previous = byPath.get(candidate.pathLower);
		if (!previous || candidate.size > previous.size) byPath.set(candidate.pathLower, candidate);
	}

	const candidates = [...byPath.values()].sort((a, b) => a.pathLower.length - b.pathLower.length);
	// 嵌套候选只从最近的候选祖先扣除一次，避免启动器/厂商容器重复统计游戏或子应用。
	for (let i = 0; i < candidates.length; i++) {
		const child = candidates[i];
		let parent = null;
		for (let j = 0; j < i; j++) {
			const maybe = candidates[j];
			if (child.pathLower.startsWith(maybe.pathLower + "\\") && (!parent || maybe.pathLower.length > parent.pathLower.length)) {
				parent = maybe;
			}
		}
		if (parent) parent.ownSize = Math.max(0, parent.ownSize - child.size);
	}

	const groups = new Map();
	for (const item of candidates) {
		if (item.ownSize <= 0) continue;
		let group = groups.get(item.key);
		if (!group) {
			group = { name: item.name, size: 0, drives: new Map(), locations: [] };
			groups.set(item.key, group);
		}
		group.size += item.ownSize;
		group.drives.set(item.drive, (group.drives.get(item.drive) ?? 0) + item.ownSize);
		group.locations.push({ path: item.path, size: item.ownSize, drive: item.drive, source: item.source });
	}

	return [...groups.values()]
		.map((group) => ({
			name: group.name,
			size: group.size,
			drives: [...group.drives.entries()]
				.map(([drive, size]) => ({ drive, size }))
				.sort((a, b) => (b.size - a.size) || a.drive.localeCompare(b.drive)),
			locations: group.locations.sort((a, b) => (b.size - a.size) || a.path.localeCompare(b.path)),
		}))
		.sort((a, b) => (b.size - a.size) || a.name.localeCompare(b.name))
		.slice(0, Math.max(1, Math.min(50, Number(limit) || 10)));
}

export { candidateFromDirectory, applicationKey };
