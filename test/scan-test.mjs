/**
 * 测试脚本：验证 disk-sentinel 插件核心模块功能。
 *
 * 不依赖完整 DSH 运行时，直接 import 模块函数进行单元测试。
 * 运行: node test/scan-test.mjs
 */
import {
	scanTree,
	topDirectoriesBySize,
	topFilesBySize,
	renderTreeText,
	formatBytes,
} from "../lib/scan.js";
import {
	JUNK_CATEGORIES,
	TRANSFERABLE_SUGGESTIONS,
	listJunkCategories,
	getJunkCategory,
	resolveEnvPath,
} from "../lib/junk-definitions.js";

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

async function testFormatBytes() {
	console.log("\n=== 测试 formatBytes ===");
	assert(formatBytes(0) === "0 B", "0 B");
	assert(formatBytes(512) === "512 B", "512 B");
	assert(formatBytes(1024) === "1.00 KB", "1024 = 1.00 KB");
	assert(formatBytes(1048576) === "1.00 MB", "1048576 = 1.00 MB");
	assert(formatBytes(1073741824) === "1.00 GB", "1073741824 = 1.00 GB");
}

async function testScanTree() {
	console.log("\n=== 测试 scanTree（扫描当前目录）===");
	const tree = await scanTree(process.cwd(), { maxDepth: 3 });

	assert(tree.isDir === true, "根节点是目录");
	assert(tree.path === process.cwd(), "根路径正确");
	assert(tree.size > 0, "目录总大小 > 0");
	assert(typeof tree.fileCount === "number" && tree.fileCount >= 0, "fileCount 是非负数");
	assert(typeof tree.dirCount === "number" && tree.dirCount >= 0, "dirCount 是非负数");
	assert(Array.isArray(tree.children), "children 是数组");

	console.log(`  📊 扫描结果: ${formatBytes(tree.size)}, ${tree.fileCount} 文件, ${tree.dirCount} 目录`);

	// 验证子节点按 size 降序
	if (tree.children.length > 1) {
		let sorted = true;
		for (let i = 1; i < tree.children.length; i++) {
			if (tree.children[i].size > tree.children[i - 1].size) {
				sorted = false;
				break;
			}
		}
		assert(sorted, "子节点按 size 降序排列");
	}
}

async function testTopDirectories() {
	console.log("\n=== 测试 topDirectoriesBySize ===");
	const tree = await scanTree(process.cwd(), { maxDepth: 3 });
	const topDirs = topDirectoriesBySize(tree, 5);

	assert(Array.isArray(topDirs), "返回数组");
	assert(topDirs.length <= 5, "不超过 5 个");

	if (topDirs.length > 0) {
		assert(topDirs[0].path.includes(":\\"), "路径是绝对路径");
		assert(typeof topDirs[0].size === "number", "size 是数字");
		assert(topDirs[0].size >= 0, "size 非负");

		// 验证降序
		let sorted = true;
		for (let i = 1; i < topDirs.length; i++) {
			if (topDirs[i].size > topDirs[i - 1].size) {
				sorted = false;
				break;
			}
		}
		assert(sorted, "Top 目录按 size 降序");
	}

	console.log("  Top 目录:");
	for (const d of topDirs) {
		console.log(`    ${formatBytes(d.size)}  ${d.path}`);
	}
}

async function testTopFiles() {
	console.log("\n=== 测试 topFilesBySize ===");
	const tree = await scanTree(process.cwd(), { maxDepth: 3 });
	const topFiles = topFilesBySize(tree, 10);

	assert(Array.isArray(topFiles), "返回数组");
	assert(topFiles.length <= 10, "不超过 10 个");

	if (topFiles.length > 0) {
		assert(!topFiles[0].path.endsWith("\\"), "文件路径不以分隔符结尾");

		let sorted = true;
		for (let i = 1; i < topFiles.length; i++) {
			if (topFiles[i].size > topFiles[i - 1].size) {
				sorted = false;
				break;
			}
		}
		assert(sorted, "Top 文件按 size 降序");
	}

	console.log("  Top 文件:");
	for (const f of topFiles.slice(0, 5)) {
		console.log(`    ${formatBytes(f.size)}  ${f.path}`);
	}
}

async function testRenderTreeText() {
	console.log("\n=== 测试 renderTreeText ===");
	const tree = await scanTree(process.cwd(), { maxDepth: 2 });
	const text = renderTreeText(tree, 50);

	assert(typeof text === "string", "返回字符串");
	assert(text.includes("📁"), "包含目录图标");
	assert(text.includes("["), "包含大小标注");

	const lines = text.split("\n").filter((l) => l.length > 0);
	console.log(`  渲染了 ${lines.length} 行文本（前 50 节点限制）`);
	console.log("  前 5 行:");
	for (const line of lines.slice(0, 5)) {
		console.log(`    ${line}`);
	}
}

async function testJunkDefinitions() {
	console.log("\n=== 测试 junk-definitions ===");

	assert(JUNK_CATEGORIES.length > 0, "JUNK_CATEGORIES 非空");
	assert(TRANSFERABLE_SUGGESTIONS.length > 0, "TRANSFERABLE_SUGGESTIONS 非空");

	// 验证每个类别有必需字段
	for (const cat of JUNK_CATEGORIES) {
		assert(typeof cat.id === "string" && cat.id.length > 0, `类别 ${cat.id} 有 id`);
		assert(typeof cat.label === "string", `类别 ${cat.id} 有 label`);
		assert(typeof cat.description === "string", `类别 ${cat.id} 有 description`);
	}

	// 测试 listJunkCategories
	const list = listJunkCategories();
	assert(list.length === JUNK_CATEGORIES.length, "listJunkCategories 返回全部类别");
	assert(typeof list[0].id === "string", "列表项有 id");

	// 测试 getJunkCategory
	const recycleBin = getJunkCategory("recycle_bin");
	assert(recycleBin !== undefined, "能获取 recycle_bin 类别");
	assert(recycleBin.method === "powershell", "recycle_bin 方法是 powershell");

	const unknown = getJunkCategory("nonexistent");
	assert(unknown === undefined, "不存在的类别返回 undefined");

	// 测试 resolveEnvPath
	const tempPath = resolveEnvPath("%TEMP%");
	assert(tempPath === process.env.TEMP, "%TEMP% 正确解析");

	const userPath = resolveEnvPath("%USERPROFILE%\\Downloads");
	assert(userPath === `${process.env.USERPROFILE}\\Downloads`, "%USERPROFILE%\\Downloads 正确解析");

	// 验证关键类别存在
	const ids = JUNK_CATEGORIES.map((c) => c.id);
	assert(ids.includes("windows_temp"), "包含 windows_temp");
	assert(ids.includes("recycle_bin"), "包含 recycle_bin");
	assert(ids.includes("npm_cache"), "包含 npm_cache");
	assert(ids.includes("pnpm_store"), "包含 pnpm_store");
	assert(ids.includes("windows_update_cache"), "包含 windows_update_cache");

	console.log(`  共 ${JUNK_CATEGORIES.length} 个清理类别, ${TRANSFERABLE_SUGGESTIONS.length} 个转移建议`);
}

async function testAbortSignal() {
	console.log("\n=== 测试 AbortSignal 取消 ===");
	const controller = new AbortController();
	// 立即取消
	controller.abort();

	try {
		await scanTree(process.cwd(), { signal: controller.signal, maxDepth: 5 });
		assert(false, "应该抛出取消错误");
	} catch (err) {
		assert(err.code === "SCAN_ABORTED", `抛出 SCAN_ABORTED (got ${err.code})`);
	}
}

async function main() {
	console.log("🧪 disk-sentinel 插件核心模块测试");
	console.log(`工作目录: ${process.cwd()}`);
	console.log(`Node.js: ${process.version}`);

	try {
		await testFormatBytes();
		await testScanTree();
		await testTopDirectories();
		await testTopFiles();
		await testRenderTreeText();
		await testJunkDefinitions();
		await testAbortSignal();
	} catch (err) {
		console.error("\n💥 测试过程中抛出异常:", err);
		failed++;
	}

	console.log("\n" + "=".repeat(50));
	console.log(`结果: ${passed} 通过, ${failed} 失败`);
	process.exit(failed > 0 ? 1 : 0);
}

main();
