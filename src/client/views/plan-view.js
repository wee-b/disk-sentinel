/**
 * 清理方案查看视图：展示 AI 生成的「磁盘清理方案-*.md」全文。
 *
 * @module @dsh-plugin/disk-sentinel/client/views/plan-view
 */
import * as React from "react";
var useState = React.useState;
var useEffect = React.useEffect;
var createElement = React.createElement;
import { rpcCall } from "../rpc.js";
import { buildPlanFollowUpPrompt, sendChatMessage } from "../chat.js";

/**
 * 清理方案查看视图：展示 AI 生成的「磁盘清理方案-*.md」全文。
 *
 * @param {Object} props - {ctx, connection, file, onBack, backLabel}。
 */
function PlanView(props) {
	var connection = props.connection;
	var file = props.file;
	var loadState = useState(null);
	var plan = loadState[0];
	var setPlan = loadState[1];
	var planErrorState = useState(null);
	var planError = planErrorState[0];
	var setPlanError = planErrorState[1];
	var sendState = useState("idle");
	var sendStatus = sendState[0];
	var setSendStatus = sendState[1];
	var sendErrorState = useState(null);
	var sendError = sendErrorState[0];
	var setSendError = sendErrorState[1];

	useEffect(function () {
		var cancelled = false;
		setPlan(null);
		setPlanError(null);
		setSendStatus("idle");
		setSendError(null);
		rpcCall(connection, "plan/get", { file: file })
			.then(function (value) {
				if (!cancelled) setPlan(value);
			})
			.catch(function (err) {
				if (!cancelled) setPlanError(err.message ?? String(err));
			});
		return function () {
			cancelled = true;
		};
	}, [connection, file]);

	var children = [];
	children.push(createElement("p", { key: "title", className: "pcc-section-title" },
		"📋 " + ((plan && plan.name) || (file ?? "").replace(/\.md$/, ""))));
	if (planError) {
		children.push(createElement("p", { key: "err", className: "pcc-error" }, "读取失败: " + planError));
	} else if (!plan) {
		children.push(createElement("p", { key: "loading", className: "pcc-desc" }, "正在读取清理方案…"));
	} else {
		if (plan.createdAt) {
			children.push(createElement("p", { key: "meta", className: "pcc-desc" },
				"生成于 " + new Date(plan.createdAt).toLocaleString()));
		}
		children.push(createElement("div", { key: "content", className: "pcc-plan-content" }, plan.content ?? ""));
		// 导入对话：@ 引用方案全文，让 AI 基于既有方案跟进（核实/执行/修订）。
		// plan.path 为 plan/get 补充的绝对路径，旧宿主未返回时提示重启
		var actionChildren = [];
		actionChildren.push(createElement("button", {
			key: "ai",
			className: "pcc-btn pcc-btn-primary",
			style: { width: "100%", marginTop: "6px" },
			disabled: sendStatus === "sending" || sendStatus === "sent",
			onClick: async function () {
				if (sendStatus === "sending" || sendStatus === "sent") return;
				if (!plan.path) {
					setSendStatus("error");
					setSendError("宿主未返回方案路径（可能仍在运行旧版插件，请重启 DSH 后重试）");
					return;
				}
				setSendStatus("sending");
				setSendError(null);
				try {
					await sendChatMessage(props.ctx, buildPlanFollowUpPrompt(plan.path));
					setSendStatus("sent");
				} catch (err) {
					setSendStatus("error");
					setSendError(err.message ?? String(err));
				}
			},
		}, sendStatus === "sending"
			? "执行请求发送中…"
			: sendStatus === "sent"
				? "✓ 已提交到当前会话"
				: sendStatus === "error"
					? "↻ 重新发送方案跟进请求"
					: "🤖 让 AI 按此方案执行"));
		if (sendStatus === "sent") {
			actionChildren.push(createElement("p", { key: "ai-hint", className: "pcc-desc" },
				"清理方案已提交到当前会话；AI 应先估算核实，实际清理仍需你的确认。"));
		} else if (sendStatus === "error") {
			actionChildren.push(createElement("p", { key: "ai-error", className: "pcc-error" },
				"发送失败，可重试: " + (sendError ?? "未知错误")));
		}
		for (var a = 0; a < actionChildren.length; a++) children.push(actionChildren[a]);
		children.push(createElement("button", {
			key: "open",
			className: "pcc-btn",
			style: { width: "100%", marginTop: "6px" },
			onClick: function () {
				rpcCall(connection, "plan/open", { file: file })
					.catch(function (err) {
						setPlanError(err.message ?? String(err));
					});
			},
		}, "✏ 用本地编辑器打开"));
	}
	// 页面级返回已统一到顶部导航栏（CleanerPanelBody 的 panel-head）
	return createElement("div", null, children);
}

export { PlanView };
