/**
 * 预定义的常见垃圾目录与清理方法清单。
 *
 * 这些是 Windows 系统上常见的可安全清理位置。LLM 可参考此清单直接决策，
 * 无需为每个常见场景都重新扫描。对于清单外的特殊需求，LLM 自行判断。
 *
 * @module @dsh-plugin/disk-sentinel/junk-definitions
 */

/**
 * 解析环境变量占位符（如 %TEMP%, %LOCALAPPDATA%）。
 * 在 Windows 上使用 process.env，非 Windows 返回原始字符串。
 *
 * @param {string} path - 可能含 %VAR% 占位符的路径。
 * @returns {string} 解析后的绝对路径。
 */
export function resolveEnvPath(path) {
	return path.replace(/%([^%]+)%/g, (_, name) => process.env[name] ?? "");
}

/**
 * 一类垃圾的清理定义。
 * @typedef {Object} JunkCategory
 * @property {string} id           - 唯一标识符。
 * @property {string} label        - 人类可读名称（中文）。
 * @property {string} description  - 清理说明。
 * @property {string[]} [paths]    - 要清理的目录/文件路径（含 %VAR% 占位符）。
 * @property {string} [method]     - 清理方式：'delete_contents'（删除目录内容，保留目录本身）
 *                                    | 'delete_dir'（删除整个目录）
 *                                    | 'powershell'（执行 PowerShell 命令）
 *                                    | 'command'（执行 shell 命令）。
 * @property {string} [powershell] - method 为 'powershell' 时的命令。
 * @property {boolean} [needsConfirmation] - 是否必须用户确认（默认 true）。
 * @property {string[]} [tags]     - 分类标签。
 * @property {number} [estimatedSize] - 预估可回收大小（字节），未知则不设。
 */

/**
 * 预定义的垃圾清理类别。
 * 路径中的 %VAR% 会在执行时解析为环境变量。
 */
export const JUNK_CATEGORIES = [
	{
		id: "windows_temp",
		label: "Windows 临时文件",
		description: "系统临时目录，存放应用程序运行时的临时文件，通常可安全删除。自动排除「磁盘哨兵」等 DSH 工作区数据（含扫描报告），不会误删。",
		paths: [
			"%TEMP%",
			"%TMP%",
			"C:\\Windows\\Temp",
		],
		method: "delete_contents",
		tags: ["system", "temp"],
	},
	{
		id: "windows_prefetch",
		label: "Windows 预读取文件",
		description: "Windows 预读取缓存，删除后系统会在下次启动时重建，可安全清理。",
		paths: ["C:\\Windows\\Prefetch"],
		method: "delete_contents",
		tags: ["system", "prefetch"],
	},
	{
		id: "windows_update_cache",
		label: "Windows 更新下载缓存",
		description: "Windows Update 下载的安装包缓存，已安装的更新不受影响。",
		paths: ["C:\\Windows\\SoftwareDistribution\\Download"],
		method: "delete_contents",
		tags: ["system", "windows-update"],
	},
	{
		id: "recycle_bin",
		label: "回收站",
		description: "清空所有盘符的回收站。通过 Shell COM 对象执行，非简单文件删除。",
		method: "powershell",
		powershell:
			"Clear-RecycleBin -Force -ErrorAction SilentlyContinue; " +
			"$shell = New-Object -ComObject Shell.Application; " +
			"$shell.Namespace(0xA).Items() | ForEach-Object { Remove-Item $_.Path -Recurse -Force -ErrorAction SilentlyContinue }",
		tags: ["recycle-bin"],
	},
	{
		id: "npm_cache",
		label: "npm 缓存",
		description: "npm 包管理器的下载缓存。清理后下次安装会重新下载，不影响已安装的包。",
		method: "command",
		command: "npm cache clean --force",
		tags: ["dev", "npm"],
	},
	{
		id: "pnpm_store",
		label: "pnpn store 缓存",
		description: "pnpm 的全局 store。注意：清理后所有项目的 node_modules 需要重新执行 pnpm install。",
		paths: ["%LOCALAPPDATA%\\pnpm-store", "%PNPM_HOME%\\store"],
		method: "delete_dir",
		tags: ["dev", "pnpm"],
	},
	{
		id: "yarn_cache",
		label: "yarn 缓存",
		description: "yarn 包管理器的缓存。",
		method: "command",
		command: "yarn cache clean",
		tags: ["dev", "yarn"],
	},
	{
		id: "pip_cache",
		label: "pip 缓存",
		description: "Python pip 包管理器的下载缓存。",
		method: "command",
		command: "pip cache purge",
		tags: ["dev", "python"],
	},
	{
		id: "thumbnail_cache",
		label: "缩略图缓存",
		description: "Windows 资源管理器的缩略图缓存，删除后浏览图片时会重新生成。",
		paths: ["%LOCALAPPDATA%\\Microsoft\\Windows\\Explorer"],
		method: "delete_contents",
		// 仅删除 thumbcache_*.db 和 iconcache_*.db
		filePattern: "thumbcache_*.db,iconcache_*.db",
		tags: ["system", "thumbnail"],
	},
	{
		id: "windows_logs",
		label: "Windows 日志文件",
		description: "Windows 系统日志和安装日志，排查问题后可安全清理。",
		paths: ["C:\\Windows\\Logs", "C:\\Windows\\Panther"],
		method: "delete_contents",
		tags: ["system", "logs"],
	},
	{
		id: "memory_dumps",
		label: "内存转储文件",
		description: "蓝屏崩溃产生的内存转储文件，通常仅在排查蓝屏时需要保留。",
		paths: ["C:\\Windows\\Minidump", "C:\\Windows\\MEMORY.DMP"],
		method: "delete_contents",
		tags: ["system", "crash-dump"],
	},
	{
		id: "edge_cache",
		label: "Edge 浏览器缓存",
		description: "Microsoft Edge 的缓存数据，不影响书签和历史记录。",
		paths: [
			"%LOCALAPPDATA%\\Microsoft\\Edge\\User Data\\Default\\Cache",
			"%LOCALAPPDATA%\\Microsoft\\Edge\\User Data\\Default\\Code Cache",
		],
		method: "delete_contents",
		tags: ["browser", "edge"],
	},
	{
		id: "chrome_cache",
		label: "Chrome 浏览器缓存",
		description: "Google Chrome 的缓存数据，不影响书签和历史记录。",
		paths: [
			"%LOCALAPPDATA%\\Google\\Chrome\\User Data\\Default\\Cache",
			"%LOCALAPPDATA%\\Google\\Chrome\\User Data\\Default\\Code Cache",
		],
		method: "delete_contents",
		tags: ["browser", "chrome"],
	},
	{
		id: "delivery_optimization",
		label: "传递优化缓存",
		description: "Windows 传递优化（P2P 更新分发）的缓存文件。",
		paths: ["C:\\Windows\\ServiceProfiles\\NetworkService\\AppData\\Local\\Microsoft\\Windows\\DeliveryOptimization\\Cache"],
		method: "delete_contents",
		tags: ["system", "delivery-optimization"],
	},
	{
		id: "dns_cache",
		label: "DNS 客户端缓存",
		description: "刷新 DNS 解析缓存，不删除文件，仅清除内存中的 DNS 缓存记录。",
		method: "command",
		command: "ipconfig /flushdns",
		tags: ["system", "dns"],
	},
];

/**
 * 常见的可转移到其他盘符的目录建议（供 LLM 参考，非自动执行）。
 * 这些目录通常体积大，用户可考虑迁移到其他盘符以释放 C 盘空间。
 */
export const TRANSFERABLE_SUGGESTIONS = [
	{
		path: "%USERPROFILE%\\Downloads",
		label: "下载文件夹",
		note: "可通过文件夹属性 → 位置 → 移动，迁移到其他盘符。",
	},
	{
		path: "%USERPROFILE%\\Documents",
		label: "文档文件夹",
		note: "可通过文件夹属性 → 位置 → 移动，迁移到其他盘符。",
	},
	{
		path: "%USERPROFILE%\\Desktop",
		label: "桌面文件夹",
		note: "体积较大时可考虑迁移。通过文件夹属性 → 位置 → 移动。",
	},
	{
		path: "%LOCALAPPDATA%\\pnpm-store",
		label: "pnpm store",
		note: "设置 PNPM_HOME 环境变量到其他盘符后重新 install。",
	},
	{
		path: "%USERPROFILE%\\.cargo",
		label: "Cargo（Rust）缓存",
		note: "设置 CARGO_HOME 环境变量到其他盘符。",
	},
	{
		path: "%USERPROFILE%\\.gradle",
		label: "Gradle 缓存",
		note: "设置 GRADLE_USER_HOME 环境变量到其他盘符。",
	},
	{
		path: "%USERPROFILE%\\.nuget",
		label: "NuGet 缓存",
		note: "通过 dotnet nuget locals 全局缓存配置或环境变量迁移。",
	},
	{
		path: "%USERPROFILE%\\AppData\\Local\\Docker",
		label: "Docker 数据",
		note: "Docker Desktop 设置 → Resources → Disk image location 可迁移。",
	},
	{
		path: "%USERPROFILE%\\AppData\\Local\\pnpm",
		label: "pnpm 全局安装",
		note: "设置 PNPM_HOME 环境变量到其他盘符。",
	},
];

/**
 * 获取所有垃圾类别的简要清单（供 LLM 参考，不含执行细节）。
 * @returns {Array<{id: string, label: string, description: string, tags: string[]}>}
 */
export function listJunkCategories() {
	return JUNK_CATEGORIES.map((c) => ({
		id: c.id,
		label: c.label,
		description: c.description,
		tags: c.tags ?? [],
	}));
}

/**
 * 根据 id 获取垃圾类别的完整定义。
 * @param {string} id
 * @returns {JunkCategory | undefined}
 */
export function getJunkCategory(id) {
	return JUNK_CATEGORIES.find((c) => c.id === id);
}
