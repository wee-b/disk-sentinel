/**
 * 基准测试：全盘扫描后，全量目录明细（directories）的数据量实测。
 * 输出：目录数、原始 JSON 大小、gzip 压缩后大小、耗时。
 *
 * 运行: node test/dirs-size-bench.mjs
 */
import { gzipSync } from "node:zlib";
import { statfs } from "node:fs/promises";
import { scanDrivesFast } from "../lib/scan-parallel.js";
import { formatBytes } from "../lib/scan.js";

function formatBytesLocal(bytes) {
	return formatBytes(bytes);
}

async function listDrives() {
	const results = [];
	for (const letter of "ABCDEFGHIJKLMNOPQRSTUVWXYZ") {
		try {
			const stats = await statfs(`${letter}:\\`);
			const total = Number(stats.blocks) * Number(stats.bsize);
			if (total > 0) results.push(`${letter}:`);
		} catch {}
	}
	return results;
}

async function main() {
	const drives = await listDrives();
	console.log(` 盘符: ${drives.join(" ")}`);

	const t0 = Date.now();
	const scan = await scanDrivesFast(
		drives.map((d) => `${d}\\`),
		{ maxDepth: 32, topDirsCount: 200, topFilesCount: 300 }
	);
	const elapsed = Date.now() - t0;

	const dirs = scan.directories ?? [];
	const json = JSON.stringify({ createdAt: Date.now(), dirs });
	const gz = gzipSync(json);

	console.log(` 扫描耗时: ${(elapsed / 1000).toFixed(1)}s`);
	console.log(` 目录总数: ${dirs.length.toLocaleString()}`);
	console.log(` 原始 JSON: ${formatBytesLocal(Buffer.byteLength(json))}`);
	console.log(` gzip 压缩后: ${formatBytesLocal(gz.length)}（压缩率 ${((1 - gz.length / json.length) * 100).toFixed(1)}%）`);
	console.log(` 平均每目录: JSON ${(json.length / dirs.length).toFixed(1)} 字节 / gzip ${(gz.length / dirs.length).toFixed(1)} 字节`);
}

main().catch((err) => {
	console.error("失败:", err);
	process.exit(1);
});
