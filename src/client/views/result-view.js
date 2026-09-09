/**
 * 结果视图：各盘统计 + Top 大目录/文件 + AI 分析入口 + 可切换的全量目录树。
 *
 * @module @dsh-plugin/disk-sentinel/client/views/result-view
 */
import * as React from "react";
var useState = React.useState;
var useEffect = React.useEffect;
var createElement = React.createElement;
import { rpcCall } from "../rpc.js";
import { formatBytes, formatDuration, isRootPath, baseName } from "../format.js";
import { buildAnalysisPrompt, sendChatMessage } from "../chat.js";
import { TreeToggle } from "./tree-toggle.js";

/**
 * 目录树视图：全量目录明细的层级浏览（WinDirStat 式可折叠树）。
 *
 * 懒加载：首次挂载才调 report/tree 拉取明细（可能数 MB，仅本地 IPC）；
 * 前端按父路径建立 childrenOf 索引，只渲染展开的节点，几十万目录不卡。
 * 每个展开目录的子项按大小降序最多渲染 TREE_PAGE 个，超出提示。
 *
 * @param {Object} props - {connection, file, onBack}。
 */
function DirTreeView(props) {
	var connection = props.connection;
	var file = props.file;
	// load: "loading" | "ready" | "error"
	var loadState = useState("loading");
	var load = loadState[0];
	var setLoad = loadState[1];
	var errMsgState = useState(null);
	var errMsg = errMsgState[0];
	var setErrMsg = errMsgState[1];
	var modelState = useState(null);
	var model = modelState[0];
	var setModel = modelState[1];
	var expandedState = useState(null);
	var expanded = expandedState[0];
	var setExpanded = expandedState[1];

	useEffect(function () {
		var cancelled = false;
		setLoad("loading");
		setErrMsg(null);
		rpcCall(connection, "report/tree", { file: file })
			.then(function (value) {
				if (cancelled) return;
				var dirs = value.dirs ?? [];
				var childrenOf = new Map();
				var metaOf = new Map();
				var roots = [];
				// 第一遍：登记全部目录（明细顺序不保证父先于子，两遍扫描才能全量挂接）
				for (var i = 0; i < dirs.length; i++) {
					metaOf.set(dirs[i].p, { s: dirs[i].s, f: dirs[i].f });
				}
				// 第二遍：按父路径挂接，父缺失（不可访问/被排除）时作孤儿根挂载
				for (var i = 0; i < dirs.length; i++) {
					var p = dirs[i].p;
					if (isRootPath(p)) {
						roots.push(p);
						continue;
					}
					var cut = p.lastIndexOf("\\");
					var parent = cut === 2 && p.charAt(1) === ":" ? p.slice(0, 3) : p.slice(0, cut);
					if (!metaOf.has(parent)) {
						roots.push(p);
					} else {
						var list = childrenOf.get(parent);
						if (!list) childrenOf.set(parent, (list = []));
						list.push(p);
					}
				}
				// 各父目录的子项按大小降序（默认即展示最大的子目录）
				childrenOf.forEach(function (list) {
					list.sort(function (a, b) {
						return (metaOf.get(b)?.s ?? 0) - (metaOf.get(a)?.s ?? 0);
					});
				});
				roots.sort(function (a, b) {
					return (metaOf.get(b)?.s ?? 0) - (metaOf.get(a)?.s ?? 0);
				});
				var totalSize = roots.reduce(function (sum, r) {
					return sum + (metaOf.get(r)?.s ?? 0);
				}, 0) || 1;
				// 默认展开根层（第一层）
				var init = new Set(roots);
				setModel({ childrenOf: childrenOf, metaOf: metaOf, roots: roots, totalSize: totalSize });
				setExpanded(init);
				setLoad("ready");
			})
			.catch(function (err) {
				if (cancelled) return;
				setErrMsg(err.message ?? String(err));
				setLoad("error");
			});
		return function () {
				cancelled = true;
			};
	}, [connection, file]);

	/** 切换展开/收起（复制 Set 触发重渲染）。 */
	function toggle(path) {
		setExpanded(function (prev) {
			var next = new Set(prev ?? []);
			if (next.has(path)) next.delete(path);
			else next.add(path);
			return next;
		});
	}

	var children = [];
	children.push(createElement("p", { key: "title", className: "pcc-section-title" }, "🌳 目录树（点击展开/收起，按大小降序）"));

	if (load === "loading") {
		children.push(createElement("p", { key: "loading", className: "pcc-desc" },
			"正在加载全量目录明细…（数据较大，约数秒）"));
	} else if (load === "error") {
		children.push(createElement("p", { key: "err", className: "pcc-error" }, "⚠ " + errMsg));
		// 页面级返回已统一到顶部导航栏；出错时切回排行榜 tab 即可（tab 仍在上方）
		return createElement("div", null, children);
	} else if (!model || (model.roots ?? []).length === 0) {
		children.push(createElement("p", { key: "empty", className: "pcc-desc" }, "无目录数据"));
	} else {
		/** 递归渲染一个节点（仅展开的部分）。 */
		function renderNode(path, depth) {
			var meta = model.metaOf.get(path) ?? { s: 0, f: 0 };
			var kids = model.childrenOf.get(path);
			var hasKids = !!(kids && kids.length > 0);
			var isOpen = expanded ? expanded.has(path) : false;
			var width = Math.max(1, Math.round((meta.s / model.totalSize) * 100));
			var rows = [];
			rows.push(
				createElement("div", {
					key: path,
					className: "pcc-tree-row",
					"data-leaf": !hasKids || undefined,
					style: { paddingLeft: depth * 14 + "px" },
					title: path + "\n大小 " + formatBytes(meta.s) + " · " + (meta.f ?? 0).toLocaleString() + " 个文件",
					onClick: function () {
						if (hasKids) toggle(path);
					},
				},
					createElement("div", { className: "pcc-row-bar", style: { width: width + "%" } }),
					createElement(TreeToggle, {
						hasChildren: hasKids,
						isOpen: isOpen,
						label: (isOpen ? "收起 " : "展开 ") + baseName(path),
						onToggle: function () {
							toggle(path);
						},
					}),
					createElement("span", { className: "pcc-tree-name" }, "📁 " + baseName(path)),
					createElement("span", { className: "pcc-tree-meta" }, (meta.f ?? 0).toLocaleString() + " 文件"),
					createElement("span", { className: "pcc-tree-size" }, formatBytes(meta.s))
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
					}, "…已按大小展示前 " + shown + " 个子目录，共 " + kids.length.toLocaleString() + " 个"));
				}
			}
			return rows;
		}
		for (var i = 0; i < model.roots.length; i++) {
			var rows = renderNode(model.roots[i], 0);
			for (var j = 0; j < rows.length; j++) children.push(rows[j]);
		}
		children.push(createElement("p", { key: "tree-hint", className: "pcc-desc", style: { marginTop: "6px" } },
			"提示：目录按大小降序排列，背景条宽度为相对全部扫描量的占比；叶子目录的文件数为其直接子文件数。"));
		// 页面级返回已统一到顶部导航栏；上方 tab 可切回排行榜
	}

	return createElement("div", null, children);
}

/**
 * 结果视图：各盘统计 + Top 大目录/文件 + AI 分析入口。
 * 也用于查看历史分析报告（backLabel 定制返回按钮文案）。
 *
 * @param {Object} props - {ctx, connection, result, onRescan, backLabel, reportFile}。
 */
function ResultView(props) {
	var result = props.result;
	var onRescan = props.onRescan;
	var aiState = useState(null);
	var aiPrompt = aiState[0];
	var setAiPrompt = aiState[1];
	var sendState = useState("idle");
	var sendStatus = sendState[0];
	var setSendStatus = sendState[1];
	var sendErrorState = useState(null);
	var sendError = sendErrorState[0];
	var setSendError = sendErrorState[1];
	// Top 榜单默认展示 20 条，可展开全部（报告实际保存了 Top 100/150）
	var dirsAllState = useState(false);
	var dirsAll = dirsAllState[0];
	var setDirsAll = dirsAllState[1];
	var filesAllState = useState(false);
	var filesAll = filesAllState[0];
	var setFilesAll = filesAllState[1];
	// 视图切换：榜单 / 目录树（有全量明细时可用）
	var tabState = useState("list");
	var tab = tabState[0];
	var setTab = tabState[1];
	// 报告 .json 文件名：历史视图由 props.reportFile 直接传；
	// 实时结果从 resultFile（.md 绝对路径）推导，写盘失败则树视图不可用
	var reportFile = props.reportFile || null;
	if (!reportFile && result.resultFile) {
		var mdName = String(result.resultFile).split(/[\\/]/).pop();
		if (/\.md$/.test(mdName)) reportFile = mdName.replace(/\.md$/, ".json");
	}

	useEffect(function () {
		try {
			setAiPrompt(buildAnalysisPrompt(result));
			setSendStatus("idle");
			setSendError(null);
		} catch (err) {
			setAiPrompt(null);
			setSendStatus("error");
			setSendError(err.message ?? String(err));
		}
	}, [result]);

	var maxSize = Math.max(
		1,
		(result.topDirectories ?? []).reduce(function (m, d) { return Math.max(m, d.size); }, 0)
	);
	var scannedTotal = (result.driveStats ?? []).reduce(function (sum, d) {
		return sum + (d.scannedBytes ?? 0);
	}, 0);

	var children = [];
	children.push(createElement("div", { key: "summary", className: "pcc-statrow" },
		createElement("div", { className: "pcc-stat" },
			createElement("div", { className: "pcc-stat-value" }, formatBytes(scannedTotal)),
			createElement("div", { className: "pcc-stat-label" }, "扫描统计到")),
		createElement("div", { className: "pcc-stat" },
			createElement("div", { className: "pcc-stat-value" }, (result.totalDirsScanned ?? 0).toLocaleString()),
			createElement("div", { className: "pcc-stat-label" }, "已扫描目录")),
		createElement("div", { className: "pcc-stat" },
			createElement("div", { className: "pcc-stat-value" }, formatDuration(result.durationMs ?? 0)),
			createElement("div", { className: "pcc-stat-label" }, "扫描耗时"))));

	// 各盘统计卡
	(result.driveStats ?? []).forEach(function (d) {
		var usedPct = d.totalBytes > 0 ? Math.round(((d.totalBytes - d.freeBytes) / d.totalBytes) * 100) : 0;
		children.push(
			createElement("div", { key: "stat-" + d.drive, className: "pcc-drive-stat" },
				createElement("p", { className: "pcc-section-title" },
					"🖴 " + d.drive + " · 已用 " + usedPct + "%"),
				createElement("div", { className: "pcc-capbar", style: { marginBottom: "6px" } },
					createElement("div", { className: "pcc-capbar-used", style: { width: usedPct + "%" } })
				),
				createElement("p", { className: "pcc-desc" },
					"容量 " + formatBytes(d.totalBytes) + " · 剩余 " + formatBytes(d.freeBytes) +
					" · 扫描到 " + formatBytes(d.scannedBytes) + " · " +
					(d.fileCount ?? 0).toLocaleString() + " 个文件 / " +
					(d.dirCount ?? 0).toLocaleString() + " 个目录")
			)
		);
	});

	// 扫描耗时汇总
	children.push(
		createElement("p", { key: "dur", className: "pcc-desc" },
			"扫描完成。报告已保存，可继续查看目录树，或让 AI 基于报告给出清理方案。")
	);

	// AI 分析按钮（核心入口）：发送带 @文件 引用的简短指令（官方共享 @path 语法）
	var aiChildren = [];
	aiChildren.push(
		createElement("button", {
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
			? "AI 分析请求发送中…"
			: sendStatus === "sent"
				? "✓ 已提交到当前会话"
				: sendStatus === "error"
					? "↻ 重新发送 AI 分析请求"
					: "🤖 让 AI 分析（可删/不能动/可移动）")
	);
	if (sendStatus === "sent") {
		aiChildren.push(createElement("p", { key: "ai-hint", className: "pcc-desc" },
			"扫描报告已作为 @文件 引用提交到当前会话，请在对话区查看 AI 的分析进度。"));
	} else if (sendStatus === "error") {
		aiChildren.push(createElement("p", { key: "ai-error", className: "pcc-error" },
			"发送失败，可重试: " + (sendError ?? "未知错误")));
	}
	for (var a = 0; a < aiChildren.length; a++) children.push(aiChildren[a]);

	// 榜单 / 目录树切换（仅在有全量明细数据时提供树视图）
	if (reportFile) {
		children.push(createElement("div", { key: "tabs", className: "pcc-tabs" },
			createElement("button", {
				className: "pcc-tab",
				"data-active": tab !== "tree" || undefined,
				onClick: function () {
					setTab("list");
				},
			}, "📊 排行榜"),
			createElement("button", {
				className: "pcc-tab",
				"data-active": tab === "tree" || undefined,
				onClick: function () {
					setTab("tree");
				},
			}, "🌳 目录树")));
	}

	if (tab === "tree" && reportFile) {
		// 目录树视图：全量目录明细的层级浏览（WinDirStat 式）
		children.push(createElement(DirTreeView, {
				connection: props.connection,
				file: reportFile,
				onBack: function () {
					setTab("list");
				},
			}));
	} else {

	// Top 大目录
	var dirList = result.topDirectories ?? [];
	var dirLimit = dirsAll ? dirList.length : 20;
	children.push(createElement("p", { key: "t-dirs", className: "pcc-section-title", style: { marginTop: "6px" } },
		"📁 Top " + Math.min(dirLimit, dirList.length) + " 大目录"));
	dirList.slice(0, dirLimit).forEach(function (d, i) {
		children.push(
			createElement("div", { key: "d" + i, className: "pcc-row", title: d.path },
				createElement("div", {
					className: "pcc-row-bar",
					style: { width: Math.max(2, Math.round((d.size / maxSize) * 100)) + "%" },
				}),
				createElement("span", { className: "pcc-row-path" }, d.path),
				createElement("span", { className: "pcc-row-size" }, formatBytes(d.size))
			)
		);
	});
	if (dirList.length > 20) {
		children.push(createElement("button", {
			key: "t-dirs-more",
			className: "pcc-more-btn",
			style: { width: "100%" },
			onClick: function () {
				setDirsAll(!dirsAll);
			},
		}, dirsAll ? "▲ 收起目录榜单" : "▼ 显示全部 " + dirList.length + " 个目录"));
	}

	// Top 大文件
	var maxFileSize = Math.max(1, (result.topFiles ?? []).reduce(function (m, f) {
		return Math.max(m, f.size);
	}, 0));
	var fileList = result.topFiles ?? [];
	var fileLimit = filesAll ? fileList.length : 20;
	children.push(createElement("p", { key: "t-files", className: "pcc-section-title", style: { marginTop: "10px" } },
		"📄 Top " + Math.min(fileLimit, fileList.length) + " 大文件"));
	fileList.slice(0, fileLimit).forEach(function (f, i) {
		children.push(
			createElement("div", { key: "f" + i, className: "pcc-row", title: f.path },
				createElement("div", {
					className: "pcc-row-bar",
					style: { width: Math.max(2, Math.round((f.size / maxFileSize) * 100)) + "%" },
				}),
				createElement("span", { className: "pcc-row-path" }, f.path),
				createElement("span", { className: "pcc-row-size" }, formatBytes(f.size))
			)
		);
	});
	if (fileList.length > 20) {
		children.push(createElement("button", {
			key: "t-files-more",
			className: "pcc-more-btn",
			style: { width: "100%" },
			onClick: function () {
				setFilesAll(!filesAll);
			},
		}, filesAll ? "▲ 收起文件榜单" : "▼ 显示全部 " + fileList.length + " 个文件"));
	}
	} // end 榜单分支（else of 目录树）

	// 页面级返回已统一到顶部导航栏（CleanerPanelBody 的 panel-head）

	return createElement("div", null, children);
}

export { ResultView, DirTreeView };
