/**
 * 清理执行模块 —— 通过 subprocess 服务执行实际的删除/清理操作。
 *
 * 清理操作通过 ctx.subprocess.spawn 执行 PowerShell，而非直接用 Node.js fs，
 * 因为部分操作（如清空回收站）需要 COM 对象，且删除大量文件时 PowerShell
 * 的 Remove-Item -Recurse -Force 更健壮。所有删除操作均为不可逆，需用户确认。
 *
 * @module @dsh-plugin/disk-sentinel/clean
 */
import { resolveEnvPath } from "./junk-definitions.js";

/** 清理被取消时的错误码。 */
export const CLEAN_ABORTED = "CLEAN_ABORTED";

/**
 * delete_contents 时必须保留的顶层子目录名（本插件工作区与扫描报告所在，
 * 位于 %TEMP% 下；避免清理临时文件时误删 DSH 自身数据）。
 */
const PROTECTED_CHILD_NAMES = ["磁盘哨兵"];

/**
 * 构建"删除目录内容"的 PowerShell 脚本。
 * 保留目录本身，仅删除其下所有文件和子目录。
 * 支持 filePattern 过滤（逗号分隔的通配符）。
 *
 * @param {string[]} resolvedPaths - 已解析环境变量的绝对路径数组。
 * @param {string} [filePattern]   - 可选的文件名通配符过滤（逗号分隔）。
 * @returns {string} PowerShell 脚本字符串。
 */
function buildDeleteContentsScript(resolvedPaths, filePattern) {
	const lines = [
		"$ErrorActionPreference = 'SilentlyContinue'",
		"$ProgressPreference = 'SilentlyContinue'",
	];
	for (const path of resolvedPaths) {
		if (!path) continue;
		if (filePattern) {
			// 按通配符过滤删除
			const patterns = filePattern.split(",").map((p) => p.trim()).filter(Boolean);
			for (const pattern of patterns) {
				lines.push(
					`Get-ChildItem -Path '${path}' -Filter '${pattern}' -Recurse -Force | ` +
					`Remove-Item -Recurse -Force`
				);
			}
		} else {
			// 删除目录下所有内容，保留目录本身；
			// -Exclude 排除受保护子目录（如「磁盘哨兵」工作区，含扫描报告），
			// 避免清理 %TEMP% 时把插件自身生成的数据一并删掉
			const exclude = PROTECTED_CHILD_NAMES.map((n) => `'${n}'`).join(",");
			lines.push(
				`Get-ChildItem -Path '${path}' -Force -Exclude ${exclude} | Remove-Item -Recurse -Force`
			);
		}
	}
	// 输出每条命令的结果摘要
	lines.push("Write-Output 'CLEAN_DONE'");
	return lines.join("\n");
}

/**
 * 构建"删除整个目录"的 PowerShell 脚本。
 *
 * @param {string[]} resolvedPaths - 已解析环境变量的绝对路径数组。
 * @returns {string}
 */
function buildDeleteDirScript(resolvedPaths) {
	const lines = [
		"$ErrorActionPreference = 'SilentlyContinue'",
		"$ProgressPreference = 'SilentlyContinue'",
	];
	for (const path of resolvedPaths) {
		if (!path) continue;
		lines.push(`Remove-Item -Path '${path}' -Recurse -Force`);
	}
	lines.push("Write-Output 'CLEAN_DONE'");
	return lines.join("\n");
}

/** 已缓存的 PowerShell 可执行文件路径（优先 pwsh.exe，回退 powershell.exe）。 */
let cachedPwshPath;

/**
 * 解析可用的 PowerShell 可执行文件路径。
 * 优先使用 pwsh.exe（PowerShell 7+），不可用时回退到 powershell.exe（Windows PowerShell 5.1）。
 * 结果在进程内缓存。
 *
 * @returns {Promise<string>} PowerShell 可执行文件路径。
 */
async function resolvePowerShellPath() {
	if (cachedPwshPath) return cachedPwshPath;
	const { execFileSync } = await import("node:child_process");
	// 检测 pwsh.exe（PowerShell 7+）
	for (const candidate of ["pwsh.exe", "powershell.exe"]) {
		try {
			execFileSync(candidate, ["-NoProfile", "-Command", "exit 0"], {
				stdio: "ignore",
				windowsHide: true,
				timeout: 5000,
			});
			cachedPwshPath = candidate;
			return candidate;
		} catch {
			// 尝试下一个
		}
	}
	// 默认回退到 powershell.exe
	cachedPwshPath = "powershell.exe";
	return cachedPwshPath;
}

/**
 * 通过 subprocess 服务执行一个 PowerShell 脚本并收集输出。
 *
 * subprocess 服务只响应 abort 信号、不自行计时：这里组合外部取消信号与超时
 * 定时器为一个 AbortController，任一触发都会终止整个进程树。超时不会抛错——
 * 仍返回已收集的部分输出（供批量预估解析已完成的部分）。
 *
 * @param {Object} ctx          - Cordis 插件上下文（需注入 subprocess）。
 * @param {string} script       - PowerShell 脚本。
 * @param {AbortSignal} signal  - 取消信号。
 * @param {number} [timeoutMs=60000] - 超时毫秒数（<= 0 表示不限制）。
 * @returns {Promise<{stdout: string, stderr: string, exitCode: number|null, timedOut: boolean}>}
 * @throws {Error} code 为 CLEAN_ABORTED 时表示被外部信号取消。
 */
export async function runPowerShell(ctx, script, signal, timeoutMs = 60000) {
	const workdir = process.cwd();
	const pwshExe = await resolvePowerShellPath();
	// 用 -Command 执行脚本。-EncodedParameter 方式更安全但复杂脚本用 -Command 足够。
	// 注意：subprocess 在 Windows 沙箱下通过 Node child_process piped stdio 可能 EPERM，
	// 但 ctx.subprocess 是 DSH 自己的 subprocess 服务实现，应能正常收集输出。
	const controller = new AbortController();
	const forwardAbort = () => controller.abort();
	let timedOut = false;
	if (signal) {
		if (signal.aborted) controller.abort();
		else signal.addEventListener("abort", forwardAbort, { once: true });
	}
	const timer =
		timeoutMs > 0
			? setTimeout(() => {
					timedOut = true;
					controller.abort();
			}, timeoutMs)
			: null;

	try {
		const handle = ctx.subprocess.spawn({
			argv: [
				pwshExe,
				"-NoProfile",
				"-NonInteractive",
				"-Command",
				script,
			],
			cwd: workdir,
			stdio: {
				stdin: "ignore",
				stdout: { maxBytes: 1024 * 1024 },   // 1MB stdout 上限
				stderr: { maxBytes: 256 * 1024 },    // 256KB stderr 上限
			},
			graceMs: 5000,
			signal: controller.signal,
		});

		const outcome = await handle.done;
		if (signal?.aborted) {
			const err = new Error("清理被取消");
			err.code = CLEAN_ABORTED;
			throw err;
		}
		const stdoutReader = handle.collected.stdout?.readFrom(0);
		const stderrReader = handle.collected.stderr?.readFrom(0);

		return {
			stdout: stdoutReader?.text ?? "",
			stderr: stderrReader?.text ?? "",
			exitCode: outcome.exitCode,
			signal: outcome.signal,
			timedOut,
		};
	} finally {
		if (timer) clearTimeout(timer);
		if (signal) signal.removeEventListener("abort", forwardAbort);
	}
}

/**
 * 执行一个清理类别。
 *
 * 根据 category.method 选择执行方式：
 * - 'delete_contents': PowerShell 删除目录内容
 * - 'delete_dir':      PowerShell 删除整个目录
 * - 'powershell':      执行 category.powershell 脚本
 * - 'command':         执行 category.command 命令
 *
 * @param {Object} ctx           - Cordis 插件上下文。
 * @param {JunkCategory} category - 要执行的清理类别定义。
 * @param {AbortSignal} signal   - 取消信号。
 * @returns {Promise<{categoryId: string, label: string, success: boolean, message: string, freedBytes?: number}>}
 */
export async function executeCleanCategory(ctx, category, signal) {
	if (signal?.aborted) {
		const err = new Error("清理被取消");
		err.code = CLEAN_ABORTED;
		throw err;
	}

	const method = category.method ?? "delete_contents";

	try {
		let script;
		let result;

		switch (method) {
			case "delete_contents": {
				const paths = (category.paths ?? []).map(resolveEnvPath);
				script = buildDeleteContentsScript(paths, category.filePattern);
				result = await runPowerShell(ctx, script, signal);
				break;
			}
			case "delete_dir": {
				const paths = (category.paths ?? []).map(resolveEnvPath);
				script = buildDeleteDirScript(paths);
				result = await runPowerShell(ctx, script, signal);
				break;
			}
			case "powershell": {
				result = await runPowerShell(ctx, category.powershell ?? "", signal);
				break;
			}
			case "command": {
				// 通过 PowerShell 执行命令（如 npm cache clean）
				// 这样统一走 subprocess 路径
				script = `$ErrorActionPreference = 'SilentlyContinue'\n${category.command}`;
				result = await runPowerShell(ctx, script, signal);
				break;
			}
			default:
				return {
					categoryId: category.id,
					label: category.label,
					success: false,
					message: `未知的清理方式: ${method}`,
				};
		}

		const success =
			!result.timedOut &&
			(result.exitCode === 0 || result.stdout.includes("CLEAN_DONE"));
		const messageParts = [];
		if (result.timedOut) messageParts.push("[timeout] PowerShell 执行超时，进程已强制终止");
		if (result.stdout.trim()) messageParts.push(result.stdout.trim());
		if (result.stderr.trim()) messageParts.push(`[stderr] ${result.stderr.trim()}`);
		// 截断过长的输出
		let message = messageParts.join("\n");
		if (message.length > 2000) message = message.slice(0, 2000) + "\n...(输出已截断)";

		return {
			categoryId: category.id,
			label: category.label,
			success,
			message: message || "(无输出)",
			exitCode: result.exitCode,
		};
	} catch (err) {
		if (err.code === CLEAN_ABORTED) throw err;
		return {
			categoryId: category.id,
			label: category.label,
			success: false,
			message: `执行失败: ${err.message ?? String(err)}`,
		};
	}
}

/**
 * 将字符串转义为 PowerShell 单引号字符串字面量。
 *
 * @param {string} value
 * @returns {string}
 */
function psQuote(value) {
	return `'${value.replace(/'/g, "''")}'`;
}

/**
 * 构建"批量预估多个类别可回收空间"的 PowerShell 脚本。
 *
 * 逐类别 spawn PowerShell 且用 Get-ChildItem -Recurse 管道统计时，十余个类别
 * 要 2-3 分钟（PS 5.1 管道为每个文件创建对象，%TEMP%/浏览器缓存动辄上万小文件）。
 * 这里合并为单次调用，并改用 .NET DirectoryInfo 枚举：无管道开销，且显式栈
 * 迭代便于跳过 reparse point（防符号链接循环）和按目录粒度容忍权限拒绝。
 * 根目录的直接子目录同样排除受保护名称，与 delete_contents 的 -Exclude 语义
 * 一致，保证"预估≈实际可释放"。每个类别在 stdout 输出一行 "EST:<id> <bytes>"。
 *
 * @param {JunkCategory[]} categories - 含至少一个可解析路径的类别。
 * @returns {string} PowerShell 脚本。
 */
function buildEstimateScript(categories) {
	const lines = [
		"$ErrorActionPreference = 'SilentlyContinue'",
		"$ProgressPreference = 'SilentlyContinue'",
		"function Get-TreeSize([string]$root, [string[]]$patterns, [string[]]$exclude) {",
		"  [long]$total = 0",
		"  if ([System.IO.File]::Exists($root)) {",
		"    if ($patterns.Count -eq 0) { return ([System.IO.FileInfo]::new($root)).Length }",
		"    foreach ($p in $patterns) {",
		"      if ([System.IO.Path]::GetFileName($root) -like $p) { return ([System.IO.FileInfo]::new($root)).Length }",
		"    }",
		"    return 0",
		"  }",
		"  if (-not [System.IO.Directory]::Exists($root)) { return 0 }",
		"  $stack = [System.Collections.Generic.Stack[string]]::new()",
		"  $stack.Push($root)",
		"  while ($stack.Count -gt 0) {",
		"    $dir = $stack.Pop()",
		"    $isRoot = $dir -eq $root",
		"    try {",
		"      $di = [System.IO.DirectoryInfo]::new($dir)",
		"      foreach ($fi in $di.EnumerateFiles()) {",
		"        if ($patterns.Count -gt 0) {",
		"          $matched = $false",
		"          foreach ($p in $patterns) { if ($fi.Name -like $p) { $matched = $true; break } }",
		"          if (-not $matched) { continue }",
		"        }",
		"        $total += $fi.Length",
		"      }",
		"      foreach ($sd in $di.EnumerateDirectories()) {",
		"        if (($sd.Attributes -band [System.IO.FileAttributes]::ReparsePoint) -ne 0) { continue }",
		"        if ($isRoot -and $exclude.Count -gt 0 -and $exclude -contains $sd.Name) { continue }",
		"        $stack.Push($sd.FullName)",
		"      }",
		"    } catch {}",
		"  }",
		"  return $total",
		"}",
	];
	for (const category of categories) {
		// 去重（%TEMP% 与 %TMP% 通常指向同一目录，避免重复计数）
		const paths = [...new Set((category.paths ?? []).map(resolveEnvPath).filter(Boolean))];
		if (paths.length === 0) continue;
		const patterns = category.filePattern
			? category.filePattern.split(",").map((p) => p.trim()).filter(Boolean)
			: [];
		const pathList = `@(${paths.map(psQuote).join(",")})`;
		const patternList = `@(${patterns.map(psQuote).join(",")})`;
		const excludeList = `@(${PROTECTED_CHILD_NAMES.map(psQuote).join(",")})`;
		lines.push(
			`$sum = 0L; foreach ($p in ${pathList}) { $sum += Get-TreeSize $p ${patternList} ${excludeList} }; ` +
			`Write-Output "EST:${category.id} $($sum)"`
		);
	}
	return lines.join("\n");
}

/**
 * 在清理前批量预估多个类别可回收的空间大小（单次 PowerShell 调用）。
 *
 * 超时或部分目录无权限时，缺失的类别记 0；整体失败（如被取消）时返回空 Map。
 *
 * @param {Object} ctx
 * @param {JunkCategory[]} categories
 * @param {AbortSignal} signal
 * @returns {Promise<Map<string, number>>} categoryId → 预估字节数。
 */
export async function estimateCategoriesSize(ctx, categories, signal) {
	const scannable = categories.filter((c) =>
		(c.paths ?? []).some((p) => resolveEnvPath(p))
	);
	if (scannable.length === 0) return new Map();

	const script = buildEstimateScript(scannable);
	const map = new Map();
	try {
		const result = await runPowerShell(ctx, script, signal, 120000);
		for (const m of result.stdout.matchAll(/^EST:(\S+) (\d+)\s*$/gm)) {
			map.set(m[1], parseInt(m[2], 10));
		}
	} catch {
		// 与旧版单类别失败返回 0 的行为一致：整体失败时按全 0 处理
	}
	return map;
}

/**
 * 在清理前预估某个类别可回收的空间大小。
 *
 * @param {Object} ctx
 * @param {JunkCategory} category
 * @param {AbortSignal} signal
 * @returns {Promise<number>} 预估字节数（无法计算返回 0）。
 */
export async function estimateCategorySize(ctx, category, signal) {
	const map = await estimateCategoriesSize(ctx, [category], signal);
	return map.get(category.id) ?? 0;
}
