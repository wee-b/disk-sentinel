/**
 * Windows 文件夹选择器。
 *
 * @module @dsh-plugin/disk-sentinel/rpc/folder-picker
 */

/** 转义 PowerShell 单引号字符串。 */
function quotePowerShell(value) {
	return "'" + String(value ?? "").replace(/'/g, "''") + "'";
}

/**
 * 打开系统文件夹选择器。
 *
 * @param {Object} ctx - Cordis 插件上下文（需注入 subprocess）。
 * @param {string} initialPath - 初始目录。
 * @returns {Promise<{cancelled: boolean, path?: string}>}
 */
export async function pickDirectory(ctx, initialPath) {
	const selectedPath = String(initialPath ?? "").trim();
	const script = [
		"Add-Type -AssemblyName System.Windows.Forms",
		"$dialog = New-Object System.Windows.Forms.FolderBrowserDialog",
		"$dialog.Description = '选择开发环境迁移目标根目录'",
		"$dialog.ShowNewFolderButton = $true",
		selectedPath
			? "$dialog.SelectedPath = " + quotePowerShell(selectedPath)
			: "",
		"if ($dialog.ShowDialog() -eq [System.Windows.Forms.DialogResult]::OK) {",
		"  [Console]::OutputEncoding = [System.Text.Encoding]::UTF8",
		"  Write-Output $dialog.SelectedPath",
		"}",
	].filter(Boolean).join("\n");

	const handle = ctx.subprocess.spawn({
		argv: ["powershell.exe", "-NoProfile", "-STA", "-Command", script],
		cwd: process.cwd(),
		stdio: {
			stdin: "ignore",
			stdout: { maxBytes: 64 * 1024 },
			stderr: { maxBytes: 64 * 1024 },
		},
		graceMs: 2000,
	});
	const outcome = await handle.done;
	const stdout = handle.collected.stdout?.readFrom(0)?.text?.trim() ?? "";
	const stderr = handle.collected.stderr?.readFrom(0)?.text?.trim() ?? "";

	if (outcome.exitCode !== 0) {
		throw new Error(stderr || "无法打开系统文件夹选择器");
	}
	return stdout ? { cancelled: false, path: stdout } : { cancelled: true };
}

export { quotePowerShell };
