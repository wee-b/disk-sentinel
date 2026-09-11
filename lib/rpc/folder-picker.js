/**
 * Windows 文件夹选择器。
 *
 * @module @dsh-plugin/disk-sentinel/rpc/folder-picker
 */

/** 转义 PowerShell 单引号字符串。 */
function quotePowerShell(value) {
	return "'" + String(value ?? "").replace(/'/g, "''") + "'";
}

const PICKER_TIMEOUT_MS = 3 * 60 * 1000;

/** 构造带置顶宿主窗口的选择器脚本，避免对话框落到 DSH 主窗口后面。 */
function buildPickerScript(initialPath) {
	const selectedPath = String(initialPath ?? "").trim();
	return [
		"Add-Type -AssemblyName System.Windows.Forms",
		"Add-Type -AssemblyName System.Drawing",
		"$owner = New-Object System.Windows.Forms.Form",
		"$owner.TopMost = $true",
		"$owner.ShowInTaskbar = $false",
		"$owner.FormBorderStyle = [System.Windows.Forms.FormBorderStyle]::None",
		"$owner.StartPosition = [System.Windows.Forms.FormStartPosition]::CenterScreen",
		"$owner.Size = New-Object System.Drawing.Size(1, 1)",
		"$owner.Opacity = 0",
		"$dialog = New-Object System.Windows.Forms.FolderBrowserDialog",
		"$dialog.Description = '选择开发环境迁移目标根目录'",
		"$dialog.ShowNewFolderButton = $true",
		selectedPath
			? "$dialog.SelectedPath = " + quotePowerShell(selectedPath)
			: "",
		"try {",
		"  $owner.Show()",
		"  $owner.Activate()",
		"  $owner.BringToFront()",
		"  if ($dialog.ShowDialog($owner) -eq [System.Windows.Forms.DialogResult]::OK) {",
		"    [Console]::OutputEncoding = [System.Text.Encoding]::UTF8",
		"    Write-Output $dialog.SelectedPath",
		"  }",
		"} finally {",
		"  $dialog.Dispose()",
		"  $owner.Close()",
		"  $owner.Dispose()",
		"}",
	].filter(Boolean).join("\n");
}

/**
 * 打开系统文件夹选择器。
 *
 * @param {Object} ctx - Cordis 插件上下文（需注入 subprocess）。
 * @param {string} initialPath - 初始目录。
 * @returns {Promise<{cancelled: boolean, path?: string}>}
 */
export async function pickDirectory(ctx, initialPath, options = {}) {
	const script = buildPickerScript(initialPath);
	const timeoutMs = options.timeoutMs ?? PICKER_TIMEOUT_MS;
	const controller = new AbortController();
	const timer = setTimeout(() => controller.abort(), timeoutMs);

	const handle = ctx.subprocess.spawn({
		argv: ["powershell.exe", "-NoProfile", "-STA", "-Command", script],
		cwd: process.cwd(),
		stdio: {
			stdin: "ignore",
			stdout: { maxBytes: 64 * 1024 },
			stderr: { maxBytes: 64 * 1024 },
		},
		graceMs: 2000,
		signal: controller.signal,
	});
	let outcome;
	try {
		outcome = await handle.done;
	} finally {
		clearTimeout(timer);
	}
	const stdout = handle.collected.stdout?.readFrom(0)?.text?.trim() ?? "";
	const stderr = handle.collected.stderr?.readFrom(0)?.text?.trim() ?? "";

	if (controller.signal.aborted) {
		throw new Error("文件夹选择窗口等待超时，请重试或直接输入目标目录");
	}
	if (outcome.exitCode !== 0) {
		throw new Error(stderr || "无法打开系统文件夹选择器");
	}
	return stdout ? { cancelled: false, path: stdout } : { cancelled: true };
}

export { PICKER_TIMEOUT_MS, buildPickerScript, quotePowerShell };
