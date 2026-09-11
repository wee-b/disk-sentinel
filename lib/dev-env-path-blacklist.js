/**
 * 开发环境迁移的通用路径保护清单。
 *
 * 黑名单内是每台 Windows 电脑普遍存在、不可作为开发目录迁移对象的系统区域。
 * 命中目录及其所有后代都不能进入迁移计划。
 *
 * @module @dsh-plugin/disk-sentinel/dev-env-path-blacklist
 */
import { isAbsolute, join, normalize, parse, relative } from "node:path";

const COMMON_PATH_BLACKLIST = [
	{
		id: "windows",
		label: "Windows 系统目录",
		resolve: (env) => env.SystemRoot || env.WINDIR || join(env.SystemDrive || "C:", "Windows"),
	},
	{
		id: "program_files",
		label: "64 位程序安装目录",
		resolve: (env) => env.ProgramW6432 || env.ProgramFiles || join(env.SystemDrive || "C:", "Program Files"),
	},
	{
		id: "program_files_x86",
		label: "32 位程序安装目录",
		resolve: (env) => env["ProgramFiles(x86)"] || join(env.SystemDrive || "C:", "Program Files (x86)"),
	},
	{
		id: "program_data",
		label: "Windows 公共程序数据",
		resolve: (env) => env.ProgramData || join(env.SystemDrive || "C:", "ProgramData"),
	},
	{
		id: "windows_apps_aliases",
		label: "Windows 应用执行别名",
		resolve: (env) => env.LOCALAPPDATA ? join(env.LOCALAPPDATA, "Microsoft", "WindowsApps") : "",
	},
];

/** 任意盘符根目录下都不应扫描或迁移的标准 Windows 目录名。 */
const COMMON_DRIVE_ROOT_BLACKLIST = [
	"Windows",
	"Program Files",
	"Program Files (x86)",
	"ProgramData",
	"System Volume Information",
	"$Recycle.Bin",
	"Recovery",
];

function pathKey(path) {
	return normalize(String(path ?? "")).replace(/[\\/]+$/, "").toLowerCase();
}

function isInsidePath(parent, child) {
	const rel = relative(normalize(parent), normalize(child));
	return rel === "" || (!rel.startsWith("..") && !isAbsolute(rel));
}

function listCommonPathBlacklist(env = process.env) {
	const seen = new Set();
	const entries = [];
	for (const item of COMMON_PATH_BLACKLIST) {
		const path = normalize(item.resolve(env));
		const key = pathKey(path);
		if (!path || !isAbsolute(path) || seen.has(key)) continue;
		seen.add(key);
		entries.push({ id: item.id, label: item.label, path });
	}
	return entries;
}

function isDevEnvPathBlacklisted(path, env = process.env) {
	if (!path || !isAbsolute(path)) return false;
	const normalized = normalize(path);
	const driveRoot = parse(normalized).root;
	if (pathKey(normalized) === pathKey(driveRoot)) return true;
	if (COMMON_DRIVE_ROOT_BLACKLIST.some((name) => isInsidePath(join(driveRoot, name), normalized))) return true;
	return listCommonPathBlacklist(env).some((item) => isInsidePath(item.path, normalized));
}

export {
	COMMON_PATH_BLACKLIST,
	COMMON_DRIVE_ROOT_BLACKLIST,
	isDevEnvPathBlacklisted,
	listCommonPathBlacklist,
};
