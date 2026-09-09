/**
 * 磁盘清理方案（AI 分析产物 .md）的列出 / 读取 / 删除 / 打开。
 *
 * @module @dsh-plugin/disk-sentinel/rpc/plans
 */
import { readdir, readFile, rm, stat } from "node:fs/promises";
import { join } from "node:path";
import { exec } from "node:child_process";
import { promisify } from "node:util";
import { ensureWorkspaceDir } from "./workspace.js";

/**
 * 合法清理方案文件名（磁盘清理方案-日期[-时间].md，AI 分析产物；
 * 时间戳定长可安全校验、防止路径穿越）。
 */
const PLAN_NAME_RE = /^磁盘清理方案-\d{4}-\d{2}-\d{2}(-\d{6})?\.md$/;

/**
 * plan/list 端点：列出工作区目录内的清理方案摘要。
 *
 * @returns {Promise<{dir: string, plans: Array}>}
 */
async function listPlans() {
	const dir = await ensureWorkspaceDir();
	let entries;
	try {
		entries = await readdir(dir);
	} catch {
		return { dir, plans: [] };
	}
	const names = entries.filter((n) => PLAN_NAME_RE.test(n)).sort().reverse();
	const plans = [];
	for (const name of names) {
		try {
			const info = await stat(join(dir, name));
			plans.push({
				file: name,
				name: name.replace(/\.md$/, ""),
				createdAt: info.mtimeMs ?? null,
				size: info.size ?? 0,
			});
		} catch {
			// 文件消失则跳过
		}
	}
	return { dir, plans };
}

/**
 * plan/get 端点：读取一份清理方案全文。
 *
 * @param {string} name - 方案文件名。
 * @returns {Promise<{file: string, name: string, path: string, createdAt: number, content: string}>}
 * @throws {Error} 清理方案不存在或已损坏。
 */
async function getPlan(name) {
	const dir = await ensureWorkspaceDir();
	const content = await readFile(join(dir, name), "utf8");
	const info = await stat(join(dir, name));
	return {
		file: name,
		name: name.replace(/\.md$/, ""),
		// 绝对路径：供「让 AI 按此方案执行」以 @文件 引用精确挂到聊天指令中
		path: join(dir, name),
		createdAt: info.mtimeMs ?? null,
		content,
	};
}

/**
 * plan/delete 端点：删除一份清理方案。
 *
 * @param {string} name - 方案文件名。
 */
async function deletePlan(name) {
	const dir = await ensureWorkspaceDir();
	await rm(join(dir, name), { force: true }).catch(() => {});
	return { deleted: name };
}

/**
 * plan/open 端点：用系统默认关联程序打开方案 .md
 * （Windows: start / macOS: open / Linux: xdg-open）。
 * 文件名已过 PLAN_NAME_RE 白名单，无引号注入风险。
 *
 * @param {string} name - 方案文件名。
 * @throws {Error} 方案不存在或打开失败。
 */
async function openPlan(name) {
	const dir = await ensureWorkspaceDir();
	const filePath = join(dir, name);
	await stat(filePath);
	const cmd = process.platform === "win32"
		? `start "" "${filePath}"`
		: process.platform === "darwin" ? `open "${filePath}"` : `xdg-open "${filePath}"`;
	await promisify(exec)(cmd, { windowsHide: true });
	return { opened: name };
}

export { PLAN_NAME_RE, listPlans, getPlan, deletePlan, openPlan };
