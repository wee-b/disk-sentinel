/**
 * 客户端构建脚本：将 src/client/ 的 ESM 源码打包为 lib/client.js。
 *
 * DSH client-modules 的懒 CJS 契约要求浏览器侧是单文件
 * `window.__ModuleLoader__.load({ id, factory })` 工厂；factory 内的
 * `require("react")` 由宿主模块表提供，因此 react 标记为 external，
 * 以 CJS 格式输出后包一层工厂。
 *
 * 用法：
 *   node build/client.mjs          一次性构建
 *   node build/client.mjs --watch  监听 src/client 变更自动重建
 */
import { context } from "esbuild";
import { writeFile, mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const entry = resolve(root, "src/client/index.js");
const outfile = resolve(root, "lib/client.js");
const watch = process.argv.includes("--watch");

/** 打包后的包装：ModuleLoader 工厂（保持与原手写版一致的契约）。 */
function wrapModuleLoader(cjsCode) {
	return [
		"/**",
		" * 本文件由 build/client.mjs 从 src/client/ 打包生成，请勿手改；",
		" * 修改请编辑 src/client/ 后运行 `npm run build:client`。",
		" */",
		"window.__ModuleLoader__.load({",
		'\tid: "@dsh-plugin/disk-sentinel",',
		"\tfactory: (require) => {",
		"\t\tvar module = { exports: {} };",
		"\t\tvar exports = module.exports;",
		'\t\tObject.defineProperty(exports, Symbol.toStringTag, { value: "Module" });',
		...cjsCode.split("\n").map((line) => "\t\t" + line),
		"\t\treturn module.exports;",
		"\t},",
		"});",
		"",
	].join("\n");
}

async function writeOut(cjsCode) {
	await mkdir(dirname(outfile), { recursive: true });
	await writeFile(outfile, wrapModuleLoader(cjsCode), "utf8");
}

// write:false 时构建产物仅存在于内存中，由 onEnd 钩子完成「包装 + 落盘」，
// 一次性构建与 watch 增量重建走同一条路径。
const ctx = await context({
	entryPoints: [entry],
	bundle: true,
	format: "cjs",
	platform: "neutral",
	target: "es2020",
	external: ["react"],
	legalComments: "none",
	loader: {
		".svg": "text",
	},
	write: false,
	logLevel: "info",
	plugins: [
		{
			name: "wrap-module-loader",
			setup(build) {
				build.onEnd(async (result) => {
					const file = result.outputFiles?.[0];
					if (file) await writeOut(file.text);
				});
			},
		},
	],
});

if (watch) {
	await ctx.watch();
	console.log(`[build:client] watch 模式：监听 src/client 变更并重建 ${outfile}（Ctrl+C 退出）`);
} else {
	await ctx.rebuild();
	await ctx.dispose();
	console.log(`[build:client] 已生成 ${outfile}`);
}
