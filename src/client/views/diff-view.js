/**
 * 差量报告视图：两份历史报告对比后的空间变化（变化目录树下钻）。
 *
 * @module @dsh-plugin/disk-sentinel/client/views/diff-view
 */
import * as React from "react";
var useState = React.useState;
var useEffect = React.useEffect;
var createElement = React.createElement;
import { formatBytes, formatDuration, isRootPath, baseName } from "../format.js";
import { buildDiffAnalysisPrompt, sendChatMessage } from "../chat.js";
import { TreeToggle } from "./tree-toggle.js";

/**
 * 差量报告视图：两份历史报告对比后的空间变化（变化目录树下钻）。
 *
 * @param {Object} props - {ctx, result, onBack}。
 */
function DiffView(props) {
	var result = props.result;
	var base = result.base ?? {};
	var target = result.target ?? {};
	var gapMs = (target.createdAt ?? 0) - (base.createdAt ?? 0);

	// 变化树模型：惰性构建一次（changes 为全量变化目录明细，可逐层下钻）
	var modelState = useState(function () {
		return buildChangeTree(result.changes ?? []);
	});
	var model = modelState[0];
	var expandedState = useState(null);
	var expanded = expandedState[0];
	var setExpanded = expandedState[1];
	// AI 分析入口：有差量 .md 时只发送 @ 引用，旧版差量降级为内联摘要
	var aiPromptState = useState(null);
	var aiPrompt = aiPromptState[0];
	var setAiPrompt = aiPromptState[1];
	var sendState = useState("idle");
	var sendStatus = sendState[0];
	var setSendStatus = sendState[1];
	var sendErrorState = useState(null);
	var sendError = sendErrorState[0];
	var setSendError = sendErrorState[1];

	useEffect(function () {
		try {
			setAiPrompt(buildDiffAnalysisPrompt(result));
			setSendStatus("idle");
			setSendError(null);
		} catch (err) {
			setAiPrompt(null);
			setSendStatus("error");
			setSendError(err.message ?? String(err));
		}
	}, [result]);

	/** 切换展开/收起（复制 Set 触发重渲染）。 */
	function toggle(path) {
		setExpanded(function (prev) {
			var next = new Set(prev ?? []);
			if (next.has(path)) next.delete(path);
			else next.add(path);
			return next;
		});
	}

	/** 递归渲染一个变化节点（仅展开的部分）。 */
	function renderNode(path, depth) {
		var meta = model.metaOf.get(path) ?? { d: 0, f: 0, n: 0 };
		var kids = model.childrenOf.get(path);
		var hasKids = !!(kids && kids.length > 0);
		var isOpen = expanded ? expanded.has(path) : false;
		var width = Math.max(2, Math.round((Math.abs(meta.d) / model.maxAbs) * 100));
		var isUp = meta.d >= 0;
		var rows = [];
		rows.push(
			createElement("div", {
				key: path,
				className: "pcc-tree-row",
				"data-leaf": !hasKids || undefined,
				style: { paddingLeft: depth * 14 + "px" },
				title: path + "\n变化 " + (meta.d > 0 ? "+" : "") + formatBytes(meta.d) +
					(meta.f ? " · " + (meta.f > 0 ? "+" : "") + meta.f + " 文件" : ""),
				onClick: function () {
					if (hasKids) toggle(path);
				},
			},
				createElement("div", {
					className: "pcc-row-bar",
					["data-" + (isUp ? "up" : "down")]: true,
					style: { width: width + "%" },
				}),
				createElement(TreeToggle, {
					hasChildren: hasKids,
					isOpen: isOpen,
					label: (isOpen ? "收起 " : "展开 ") + baseName(path),
					onToggle: function () {
						toggle(path);
					},
				}),
				createElement("span", { className: "pcc-tree-name" },
					"📁 " + baseName(path) +
					(meta.n === 1 ? "（新增）" : meta.n === -1 ? "（消失）" : "")),
				meta.f ? createElement("span", { className: "pcc-tree-meta" },
						(meta.f > 0 ? "+" : "") + meta.f.toLocaleString() + " 文件") : null,
				createElement("span", {
					className: "pcc-tree-size " + (isUp ? "pcc-delta-up" : "pcc-delta-down"),
				}, (meta.d > 0 ? "+" : "") + formatBytes(meta.d))
			)
		);
		if (isOpen && hasKids) {
			var shown = Math.min(kids.length, 100);
			for (var i = 0; i < shown; i++) {
				rows.push(renderNode(kids[i], depth + 1));
			}
			if (kids.length > shown) {
				rows.push(createElement("div", {
					key: path + "-more",
					className: "pcc-tree-more",
					style: { paddingLeft: (depth + 1) * 14 + "px" },
				}, "…已按变化量展示前 " + shown + " 个，共 " + kids.length.toLocaleString() + " 个"));
			}
		}
		return rows;
	}

	var children = [];
	children.push(createElement("p", { key: "title", className: "pcc-section-title" },
		"⚖ 差量报告（" + (base.name ?? "") + " → " + (target.name ?? "") + "）"));
	children.push(createElement("p", { key: "meta", className: "pcc-desc" },
		(base.createdAt ? new Date(base.createdAt).toLocaleString() : "-") +
		" → " + (target.createdAt ? new Date(target.createdAt).toLocaleString() : "-") +
		(gapMs > 0 ? "（间隔 " + formatDuration(gapMs) + "）" : "")));
	children.push(createElement("div", { key: "summary", className: "pcc-statrow" },
		createElement("div", { className: "pcc-stat" },
			createElement("div", { className: "pcc-stat-value" }, gapMs > 0 ? formatDuration(gapMs) : "-"),
			createElement("div", { className: "pcc-stat-label" }, "扫描间隔")),
		createElement("div", { className: "pcc-stat" },
			createElement("div", { className: "pcc-stat-value" }, (result.changes ?? []).length.toLocaleString()),
			createElement("div", { className: "pcc-stat-label" }, "变化目录")),
		createElement("div", { className: "pcc-stat" },
			createElement("div", { className: "pcc-stat-value" }, (result.driveDeltas ?? []).length),
			createElement("div", { className: "pcc-stat-label" }, "影响盘符"))));

	// AI 分析按钮（导入对话）：发送带 @文件 引用的简短指令
	var aiChildren = [];
	aiChildren.push(createElement("button", {
		key: "ai",
		className: "pcc-btn pcc-btn-primary",
		style: { width: "100%", padding: "10px 0" },
		disabled: sendStatus === "sending" || sendStatus === "sent",
		onClick: async function () {
			if (!aiPrompt || sendStatus === "sending" || sendStatus === "sent") return;
			setSendStatus("sending");
			setSendError(null);
			try {
				await sendChatMessage(props.ctx, aiPrompt);
				setSendStatus("sent");
			} catch (err) {
				setSendStatus("error");
				setSendError(err.message ?? String(err));
			}
		},
	}, sendStatus === "sending"
		? "AI 差量分析请求发送中…"
		: sendStatus === "sent"
			? "✓ 已提交到当前会话"
			: sendStatus === "error"
				? "↻ 重新发送差量分析请求"
				: "🤖 让 AI 分析差量（增长原因/可回收）"));
	if (sendStatus === "sent") {
		aiChildren.push(createElement("p", { key: "ai-hint", className: "pcc-desc" },
			"差量报告已作为 @文件 引用提交到当前会话，请在对话区查看 AI 的分析进度。"));
	} else if (sendStatus === "error") {
		aiChildren.push(createElement("p", { key: "ai-error", className: "pcc-error" },
			"发送失败，可重试: " + (sendError ?? "未知错误")));
	}
	for (var a = 0; a < aiChildren.length; a++) children.push(aiChildren[a]);

	// 各盘剩余空间变化：freeDelta < 0 表示剩余减少（被占用）
	(result.driveDeltas ?? []).forEach(function (d) {
		var cls = d.freeDelta < 0 ? "pcc-delta-up" : "pcc-delta-down";
		children.push(createElement("p", { key: "drv-" + d.drive, className: "pcc-desc" },
			"▤ " + d.drive + " 剩余变化 ",
			createElement("span", { className: cls },
				(d.freeDelta > 0 ? "+" : "") + formatBytes(d.freeDelta)),
			" · 扫描量变化 " +
			createElement("span", { className: d.scannedDelta < 0 ? "pcc-delta-down" : "pcc-delta-up" },
				(d.scannedDelta > 0 ? "+" : "") + formatBytes(d.scannedDelta))));
	});

	// 变化目录树：点击逐层下钻，精确定位真正变化的目录（而非浅层祖先的累计值）
	if (!model || (model.roots ?? []).length === 0) {
		children.push(createElement("p", { key: "t-none", className: "pcc-desc" }, "✅ 两次扫描之间目录无任何变化"));
	} else {
		children.push(createElement("p", { key: "t-tree", className: "pcc-section-title", style: { marginTop: "8px" } },
			"🔍 变化目录（" + model.total.toLocaleString() + " 个，点击逐层下钻精确定位）"));
		for (var i = 0; i < model.roots.length; i++) {
			var rows = renderNode(model.roots[i], 0);
			for (var j = 0; j < rows.length; j++) children.push(rows[j]);
		}
		children.push(createElement("p", { key: "tree-hint", className: "pcc-desc", style: { marginTop: "6px" } },
			"说明：首层为变化的顶层目录，点击展开可看其内部哪个子目录变化；红色为增长、绿色为缩小；“（新增）/（消失）”为两次扫描间出现/删除的目录；“·”表示变化发生在此目录的直接内容（已到精确位置）。"));
	}

	// 页面级返回已统一到顶部导航栏（CleanerPanelBody 的 panel-head）
	return createElement("div", null, children);
}

/**
 * 由全量变化明细构建变化树模型：metaOf（路径→{d 大小差, f 文件数差, n 新增/消失标记}）、
 * childrenOf（父→有变化的子目录）、roots（父不在变化集合中的顶层变化目录，
 * 天然祖先过滤）、maxAbs（最大 |delta|，背景条基准）、total（变化目录总数）。
 *
 * @param {Array<{p: string, d: number, f: number, n: number}>} changes
 */
function buildChangeTree(changes) {
	var metaOf = new Map();
	var childrenOf = new Map();
	var roots = [];
	var maxAbs = 1;
	for (var i = 0; i < changes.length; i++) {
		var c = changes[i];
		metaOf.set(c.p, { d: c.d ?? 0, f: c.f ?? 0, n: c.n ?? 0 });
		var abs = Math.abs(c.d ?? 0);
		if (abs > maxAbs) maxAbs = abs;
	}
	var paths = Array.from(metaOf.keys());
	for (var i = 0; i < paths.length; i++) {
		var p = paths[i];
		if (isRootPath(p)) {
			roots.push(p);
			continue;
		}
		var cut = p.lastIndexOf("\\");
		var parent = cut === 2 && p.charAt(1) === ":" ? p.slice(0, 3) : p.slice(0, cut);
		if (metaOf.has(parent)) {
			var list = childrenOf.get(parent);
			if (!list) childrenOf.set(parent, (list = []));
			list.push(p);
		} else {
			// 父无变化/不在集合（含盘根）：作为顶层变化目录
			roots.push(p);
		}
	}
	var byAbs = function (a, b) {
		return Math.abs(metaOf.get(b)?.d ?? 0) - Math.abs(metaOf.get(a)?.d ?? 0);
	};
	childrenOf.forEach(function (list) { list.sort(byAbs); });
	roots.sort(byAbs);
	return { metaOf: metaOf, childrenOf: childrenOf, roots: roots, maxAbs: maxAbs, total: changes.length };
}

export { DiffView, buildChangeTree };
