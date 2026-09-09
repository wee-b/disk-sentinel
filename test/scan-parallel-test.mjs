/**
 * 测试脚本：验证多线程扫描器 scanDrivesFast 与 scanTree 结果一致。
 *
 * 运行: node test/scan-parallel-test.mjs
 */
import { scanTree, topDirectoriesBySize, topFilesBySize, formatBytes } from "../lib/scan.js";
import { scanDrivesFast } from "../lib/scan-parallel.js";

let passed = 0;
let failed = 0;

function assert(condition, message) {
	if (condition) {
		console.log(`  ✅ ${message}`);
		passed++;
	} else {
		console.error(`  ❌ ${message}`);
		failed++;
	}
}

async function compareOn(rootPath, label) {
	console.log(`\n=== 对比扫描: ${label} ===`);
	const maxDepth = 32;

	const t0 = Date.now();
	const tree = await scanTree(rootPath, { maxDepth });
	const tAsync = Date.now() - t0;

	const t1 = Date.now();
	const fast = await scanDrivesFast([rootPath], { maxDepth, topDirsCount: 200, topFilesCount: 300 });
	const tFast = Date.now() - t1;

	console.log(`  scanTree: ${tAsync}ms | scanDrivesFast: ${tFast}ms (加速 ${(tAsync / tFast).toFixed(1)}x)`);

	const root = fast.roots[0];
	assert(root.size === tree.size, `总大小一致 (${formatBytes(root.size)})`);
	assert(root.fileCount === tree.fileCount, `文件数一致 (${root.fileCount})`);
	assert(root.dirCount === tree.dirCount, `目录数一致 (${root.dirCount})`);

	// Top 文件大小必须逐个一致（两边都是精确值；等大小时的顺序由两个实现
	// 共用的「大小降序 + 路径升序」决胜规则保证一致）
	const oldTopFiles = topFilesBySize(tree, 20);
	const newTopFiles = fast.topFiles.slice(0, 20);
	assert(
		newTopFiles.length === oldTopFiles.length &&
			newTopFiles.every((f, i) => f.path === oldTopFiles[i].path && f.size === oldTopFiles[i].size),
		"Top 20 文件路径与大小逐个一致"
	);

	// Top 目录：默认从二级目录开始展示，与旧实现的全量 Top 按路径匹配验证
	const oldTopDirs = topDirectoriesBySize(tree, 400);
	const oldDirMap = new Map(oldTopDirs.map((d) => [d.path, d]));
	let dirMatch = true;
	for (const d of fast.topDirectories.slice(0, 30)) {
		const old = oldDirMap.get(d.path);
		if (old === undefined || old.size !== d.size || old.fileCount !== d.fileCount) {
			dirMatch = false;
			console.error(`    不一致: ${d.path} fast=${d.size}/${d.fileCount} old=${old?.size}/${old?.fileCount}`);
		}
	}
	assert(dirMatch, "Top 30 目录大小与文件数一致");

	// Top 目录必须从二级目录开始（相对盘根深度 >= 2）
	const minDepthOk = fast.topDirectories.every((d) => {
		const seps = d.path.split("\\").filter(Boolean).length;
		return seps >= 3;
	});
	assert(minDepthOk, "Top 目录全部从二级目录开始（如 C:\\Users\\bin）");

	console.log(`  最大文件: ${fast.topFiles[0]?.path} (${formatBytes(fast.topFiles[0]?.size ?? 0)})`);
	console.log(`  最大目录: ${fast.topDirectories[1]?.path ?? fast.topDirectories[0]?.path}`);
}

async function testAbort() {
	console.log("\n=== 测试取消 ===");
	const controller = new AbortController();
	setTimeout(() => controller.abort(), 100);
	try {
		await scanDrivesFast(["C:\\"], { signal: controller.signal });
		assert(false, "应该抛出取消错误");
	} catch (err) {
		assert(err.code === "SCAN_ABORTED", `抛出 SCAN_ABORTED (got ${err.code})`);
	}
	// 取消后进程应能正常退出（worker 已全部终止）
}

async function main() {
	console.log("🧪 scan-parallel 多线程扫描器测试");
	console.log(`Node.js: ${process.version}`);

	try {
		await compareOn(process.cwd(), "项目目录（小）");
		await compareOn("C:\\Program Files", "C:\\Program Files（中）");
		await testAbort();
	} catch (err) {
		console.error("\n💥 测试过程中抛出异常:", err);
		failed++;
	}

	console.log("\n" + "=".repeat(50));
	console.log(`结果: ${passed} 通过, ${failed} 失败`);
	process.exit(failed > 0 ? 1 : 0);
}

main();
