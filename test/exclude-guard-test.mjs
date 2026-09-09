/**
 * 验证 clean.js 的 PowerShell -Exclude 保护：清理 %TEMP% 时排除「磁盘哨兵」。
 *
 * 运行: node test/exclude-guard-test.mjs
 * 只统计不删除，安全。
 */
import { execFile } from "node:child_process";
import { mkdirSync, writeFileSync, existsSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const guardDir = join(tmpdir(), "磁盘哨兵");

// 确保守卫目录存在（含一个模拟报告文件）
mkdirSync(guardDir, { recursive: true });
if (!existsSync(join(guardDir, "report-test.md"))) {
	writeFileSync(join(guardDir, "report-test.md"), "test", "utf8");
}

// 与 clean.js 生成的命令同构（把 Remove-Item 换成计数，不实际删除）
const cmd =
	"$items = Get-ChildItem -Path $env:TEMP -Force -Exclude '磁盘哨兵'; " +
	"Write-Output ('excluded_total=' + $items.Count + ' leak=' + " +
	"@($items | Where-Object {$_.Name -eq '磁盘哨兵'}).Count + ' guard_exists=' + " +
	"(Test-Path (Join-Path $env:TEMP '磁盘哨兵')))";

execFile("powershell.exe", ["-NoProfile", "-Command", cmd], { windowsHide: true }, (err, stdout, stderr) => {
	if (err) {
		console.error("执行失败:", err.message, stderr);
		process.exit(1);
	}
	console.log(stdout.trim());
	// 清理模拟文件
	rmSync(join(guardDir, "report-test.md"), { force: true });
});
