/**
 * 盘符探测与规范化。
 *
 * @module @dsh-plugin/disk-sentinel/rpc/drives
 */
import { statfs } from "node:fs/promises";

/** Windows 盘符字母候选。 */
const DRIVE_LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

/**
 * 探测一个盘符是否存在并返回容量信息。
 *
 * @param {string} drive - 形如 "C:" 的盘符。
 * @returns {Promise<{drive: string, totalBytes: number, freeBytes: number}|null>}
 */
async function probeDrive(drive) {
	try {
		const stats = await statfs(`${drive}\\`);
		// Windows statfs: bsize * (blocks / free_blocks)
		const total = Number(stats.blocks) * Number(stats.bsize);
		const free = Number(stats.bfree) * Number(stats.bsize);
		if (!Number.isFinite(total) || total <= 0) return null;
		return { drive, totalBytes: total, freeBytes: free };
	} catch {
		return null;
	}
}

/**
 * 列出所有可用盘符。
 *
 * @returns {Promise<Array<{drive: string, totalBytes: number, freeBytes: number}>>}
 */
async function listDrives() {
	const results = await Promise.all(DRIVE_LETTERS.map((letter) => probeDrive(`${letter}:`)));
	return results.filter(Boolean);
}

/** 规范化目标盘符（"c" / "c:\" / "C" → "C:"）。 */
function normalizeDrive(input) {
	const match = String(input ?? "").trim().match(/^([a-zA-Z]):?[\\/]?$/);
	return match ? `${match[0][0].toUpperCase()}:` : null;
}

export { DRIVE_LETTERS, probeDrive, listDrives, normalizeDrive };
