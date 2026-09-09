/**
 * 「磁盘哨兵」工作区目录管理（系统临时目录下的固定子目录，幂等创建）。
 *
 * 扫描报告、清理方案等持久化产物都存放在该目录中。
 *
 * @module @dsh-plugin/disk-sentinel/rpc/workspace
 */
import { mkdir } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

/** 「磁盘哨兵」工作区目录名（也作为扫描报告的存储目录）。 */
const WORKSPACE_DIRNAME = "磁盘哨兵";

/**
 * 「磁盘哨兵」工作区目录绝对路径（系统临时目录下，幂等创建）。
 *
 * @returns {Promise<string>}
 */
async function ensureWorkspaceDir() {
	const dir = join(tmpdir(), WORKSPACE_DIRNAME);
	await mkdir(dir, { recursive: true });
	return dir;
}

export { WORKSPACE_DIRNAME, ensureWorkspaceDir };
