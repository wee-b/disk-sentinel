/**
 * Disk Sentinel 插件客户端入口（浏览器侧）——「磁盘哨兵」专属页面。
 *
 * 点击侧边栏顶部入口按钮时：确保「磁盘哨兵」工作区存在（官方 ctx.workspaces 服务，
 * 幂等创建）→ startSession 跳转到该工作区的对话（首次自动新建，之后复用）
 * → 右侧展开与对话等宽的磁盘哨兵页面。
 *
 * 页面通过 ctx.connection.rpc（DSH client-connection）直连宿主的 /disk-sentinel
 * 通道触发全盘扫描 —— 完全不经过 LLM、不需要在提示词里写"调用 xx 工具"：
 *   选择盘符（或整个硬盘） → 开始分析（后台一次性全盘扫描） → 实时进度
 *   → 结果展示（容量/Top 大目录/Top 大文件） → 一键让 AI 基于结果给出
 *   「可删除 / 不能动 / 可移动」建议。
 *
 * 扫描完成后，完整报告自动保存到工作区目录（带时间戳的「扫描结果-*.md」+
 * JSON 结构化副本），滚动保留最近 10 份；点进页面可查看历史分析结果并手动
 * 删除。会话模型通过「让 AI 分析」直接读取报告文件，不向对话填充大段数据。
 *
 * 源码拆分见 src/client/ 下各模块；本目录经 build/client.mjs 用 esbuild
 * 打包为单文件 lib/client.js（DSH client-modules 懒 CJS 契约：
 * window.__ModuleLoader__.load 包裹，react 由宿主模块表提供，无需自带依赖）。
 *
 * @module @dsh-plugin/disk-sentinel/client
 */
import * as React from "react";
var createElement = React.createElement;
import { injectCss } from "./css.js";
import { stopLayoutWatch } from "./layout.js";
import { PCCleanerSidebarAction, PCCleanerPanel } from "./panel.js";

var inject = ["slots", "connection", "workspaces", "sessions", "layout", "sidebarRight"];

/**
 * 客户端插件入口：注册侧边栏入口与右侧磁盘哨兵页面。
 *
 * @param {Object} ctx - 客户端 Cordis 上下文。
 */
function apply(ctx) {
	injectCss();

	// 卸载时恢复对话列布局
	ctx.effect(
		function () {
			return function () {
				stopLayoutWatch();
			};
		},
		"disk-sentinel: layout cleanup"
	);

	ctx.effect(
		function () {
			return ctx.slots.inject(
				"sidebar.footer.action",
				function () {
					return ctx.slots.register(
						{
							name: "sidebar.footer.action",
							id: "disk-sentinel-entry",
							order: 5,
							label: function () {
								return "磁盘哨兵";
							},
						},
						function (props) {
							return createElement(PCCleanerSidebarAction, {
								ctx: ctx,
								wide: (props ?? {}).wide,
							});
						}
					);
				}
			);
		},
		"disk-sentinel: sidebar top action"
	);

	ctx.effect(
		function () {
			return ctx.slots.inject(
				"shell.overlay",
				function () {
					return ctx.slots.register(
						{
							name: "shell.overlay",
							id: "disk-sentinel-panel",
							order: 50,
							label: function () {
								return "磁盘哨兵";
							},
						},
						function (props) {
							return createElement(PCCleanerPanel, { ctx: ctx });
						}
					);
				}
			);
		},
		"disk-sentinel: cleaner panel"
	);
}

export { apply, inject };
