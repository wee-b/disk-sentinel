/**
 * 开发环境分析的通用环境变量黑名单。
 *
 * 这些变量由 Windows 或用户会话普遍维护，不代表一个可独立迁移的开发环境。
 * 命中后整项不展示，也不会拆分变量值或扫描其中的路径。
 *
 * @module @dsh-plugin/disk-sentinel/dev-env-var-blacklist
 */

const COMMON_ENV_VAR_BLACKLIST = [
	"Path",
	"PATHEXT",
	"PSModulePath",
	"SystemDrive",
	"SystemRoot",
	"WINDIR",
	"ProgramFiles",
	"ProgramW6432",
	"ProgramFiles(x86)",
	"CommonProgramFiles",
	"CommonProgramW6432",
	"CommonProgramFiles(x86)",
	"ProgramData",
	"ALLUSERSPROFILE",
	"USERPROFILE",
	"HOMEDRIVE",
	"HOMEPATH",
	"APPDATA",
	"LOCALAPPDATA",
	"PUBLIC",
	"TEMP",
	"TMP",
	"ComSpec",
	"DriverData",
];

const commonEnvVarBlacklistSet = new Set(COMMON_ENV_VAR_BLACKLIST.map((key) => key.toUpperCase()));

function isDevEnvVarBlacklisted(key) {
	return commonEnvVarBlacklistSet.has(String(key ?? "").toUpperCase());
}

export { COMMON_ENV_VAR_BLACKLIST, isDevEnvVarBlacklisted };
