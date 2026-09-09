/**
 * 磁盘哨兵面板：状态机主体（select → scanning → result / history / plan / diff）、
 * 右侧页面外壳与侧边栏入口按钮。
 *
 * @module @dsh-plugin/disk-sentinel/client/panel
 */
import * as React from "react";
var useState = React.useState;
var useEffect = React.useEffect;
var useLayoutEffect = React.useLayoutEffect;
var useRef = React.useRef;
var createElement = React.createElement;
var Fragment = React.Fragment;
import { rpcCall } from "./rpc.js";
import { setPanelOpen, usePanelOpen } from "./layout.js";
import { openLatestWorkspaceSession, sessionBelongsToWorkspace } from "./workspace-navigation.js";
import { SelectView } from "./views/select-view.js";
import { ScanningView } from "./views/scanning-view.js";
import { ResultView } from "./views/result-view.js";
import { PlanView } from "./views/plan-view.js";
import { DiffView } from "./views/diff-view.js";
import cleanerIcon from "./assets/disk-sentinel.svg";

var cleanerWorkspaceId = null;
var cleanerWorkspaceFallback = null;
var cleanerNavigationPending = false;

/**
 * 磁盘哨兵页面主体（状态机：select → scanning → result / history）。
 *
 * @param {Object} props - {ctx}。
 */
function CleanerPanelBody(props) {
	var ctx = props.ctx;
	var connection = ctx.connection;
	var viewState = useState("select");
	var view = viewState[0];
	var setView = viewState[1];
	var statusState = useState(null);
	var status = statusState[0];
	var setStatus = statusState[1];
	var errorState = useState(null);
	var error = errorState[0];
	var setError = errorState[1];
	var timerRef = useRef(null);
	var historyResultState = useState(null);
	var historyResult = historyResultState[0];
	var setHistoryResult = historyResultState[1];
	// 当前查看的历史报告 .json 文件名（供目录树视图拉取全量明细）
	var historyFileState = useState(null);
	var historyFile = historyFileState[0];
	var setHistoryFile = historyFileState[1];
	var planFileState = useState(null);
	var planFile = planFileState[0];
	var setPlanFile = planFileState[1];
	var diffResultState = useState(null);
	var diffResult = diffResultState[0];
	var setDiffResult = diffResultState[1];

	// 轮询清理
	useEffect(function () {
		return function () {
			if (timerRef.current) {
				clearInterval(timerRef.current);
				timerRef.current = null;
			}
		};
	}, []);

	/** 开始扫描。 */
	function handleStart(target) {
		setError(null);
		setStatus(null);
		rpcCall(connection, "scan/start", { target: target })
			.then(function () {
				setView("scanning");
				// 立即拉一次状态，再进入轮询
				pollStatus();
				timerRef.current = setInterval(pollStatus, 900);
			})
			.catch(function (err) {
				setError(err.message ?? String(err));
			});
	}

	/** 拉取任务状态；完成/失败时停止轮询。 */
	function pollStatus() {
		rpcCall(connection, "scan/status")
			.then(function (snapshot) {
				setStatus(snapshot);
				if (snapshot.state === "running") return;
				if (timerRef.current) {
					clearInterval(timerRef.current);
					timerRef.current = null;
				}
				if (snapshot.state === "done") {
					setView("scanning");
				} else if (snapshot.state === "error") {
					setError(snapshot.error ?? "扫描失败");
					setView("select");
				} else if (snapshot.state === "cancelled") {
					setView("select");
				}
			})
			.catch(function (err) {
				// 网络抖动等临时错误：保留轮询，只更新提示
				setError(err.message ?? String(err));
			});
	}

	/** 取消扫描。 */
	function handleCancel() {
		if (timerRef.current) {
			clearInterval(timerRef.current);
			timerRef.current = null;
		}
		setStatus(function (prev) {
			return {
				...(prev ?? {}),
				state: "cancelling",
				currentPath: "正在取消扫描…",
			};
		});
		rpcCall(connection, "scan/cancel")
			.then(function () {
				setStatus(function (prev) {
					return {
						...(prev ?? {}),
						state: "cancelled",
						currentPath: "扫描已取消，可重新开始。",
					};
				});
			})
			.catch(function (err) {
				setStatus(function (prev) {
					return {
						...(prev ?? {}),
						state: "cancelled",
						currentPath: "取消请求已发送，可重新开始。",
					};
				});
				setError(err.message ?? String(err));
			});
	}

	/** 扫描页数字累加到最终值后，再进入结果页。 */
	function handleScanAnimationDone() {
		setView("result");
	}

	/** 重新扫描：回到选择页。 */
	function handleRescan() {
		setView("select");
		setStatus(null);
		setError(null);
	}

	/** 查看一份历史分析报告（JSON 副本直接渲染，无需重新扫描）。 */
	function handleViewReport(file) {
		setError(null);
		rpcCall(connection, "report/get", { file: file })
			.then(function (value) {
				setHistoryResult(value.report);
				setHistoryFile(file);
				setView("history");
			})
			.catch(function (err) {
				setError(err.message ?? String(err));
			});
	}

	/** 查看一份清理方案（.md 全文直接渲染）。 */
	function handleViewPlan(file) {
		setError(null);
		setPlanFile(file);
		setView("plan");
	}

	/** 对比两份历史报告，生成差量报告（谁占用了/释放了空间）。 */
	function handleDiff(baseFile, targetFile) {
		setError(null);
		rpcCall(connection, "report/diff", { baseFile: baseFile, targetFile: targetFile })
			.then(function (value) {
				setDiffResult(value);
				setView("diff");
			})
			.catch(function (err) {
				setError(err.message ?? String(err));
			});
	}

	/** 查看一份历史差量报告（report/diff 生成时已自动存盘，直接读取，无需重算）。 */
	function handleViewDiff(file) {
		setError(null);
		rpcCall(connection, "diff/get", { file: file })
			.then(function (value) {
				setDiffResult(value);
				setView("diff");
			})
			.catch(function (err) {
				setError(err.message ?? String(err));
			});
	}

	var body;
	if (view === "scanning") {
		body = createElement(ScanningView, {
			connection: connection,
			status: status,
			onCancel: handleCancel,
			onRestart: handleRescan,
			onReadyToShowResult: handleScanAnimationDone,
		});
	} else if (view === "result" && status && status.result) {
		body = createElement(ResultView, {
			ctx: ctx,
			connection: connection,
			result: status.result,
			onRescan: handleRescan,
		});
	} else if (view === "history" && historyResult) {
		// 历史报告查看：复用结果视图，返回按钮回到选择页
		body = createElement(ResultView, {
			ctx: ctx,
			connection: connection,
			result: historyResult,
			reportFile: historyFile,
			onRescan: function () {
				setView("select");
			},
			backLabel: "← 返回",
		});
	} else if (view === "plan" && planFile) {
		// 清理方案查看：渲染 AI 生成的 .md 全文
		body = createElement(PlanView, {
			ctx: ctx,
			connection: connection,
			file: planFile,
			onBack: function () {
				setView("select");
			},
		});
	} else if (view === "diff" && diffResult) {
		// 差量报告查看：两份历史报告的空间变化对比
		// key 确保切换对比对象时重建变化树模型（useState 惰性初始化仅首次挂载执行）
		body = createElement(DiffView, {
			key: (diffResult.base?.file ?? "") + "|" + (diffResult.target?.file ?? ""),
			ctx: ctx,
			result: diffResult,
			onBack: function () {
				setView("select");
			},
		});
	} else {
		body = createElement(SelectView, {
			connection: connection,
			onStart: handleStart,
			onViewReport: handleViewReport,
			onViewPlan: handleViewPlan,
			onViewDiff: handleViewDiff,
			onDiff: handleDiff,
		});
	}

	// 页面级返回统一到顶部导航栏：非首页/扫描中视图显示「←」返回按钮，
	// 标题带当前页面名，关闭按钮始终在右上角
	var canBack = view !== "select" && view !== "scanning";
	var pageNames = {
		scanning: "扫描中",
		result: "扫描结果",
		history: "历史分析",
		diff: "差量报告",
		plan: "清理方案",
	};
	var title = "🧹 磁盘哨兵" + (pageNames[view] ? " · " + pageNames[view] : "");

	return createElement(Fragment, null,
		createElement("div", { className: "pcc-panel-head" },
			canBack ? createElement("button", {
				className: "pcc-panel-back",
				title: "返回",
				"aria-label": "返回",
				onClick: function () {
					setView("select");
				},
			}, createElement("span", { className: "pcc-back-icon", "aria-hidden": true },
				createElement("svg", { viewBox: "0 0 24 24", width: "18", height: "18" },
					createElement("path", {
						d: "M15 6l-6 6 6 6",
						fill: "none",
						stroke: "currentColor",
						strokeWidth: "2",
						strokeLinecap: "round",
						strokeLinejoin: "round",
					})))) : null,
			createElement("h3", { className: "pcc-panel-title" }, title),
			createElement("button", {
				className: "pcc-panel-close",
				title: "关闭",
				onClick: function () {
					setPanelOpen(false);
				},
			}, "✕")),
		createElement("div", { className: "pcc-panel-body" },
			error ? createElement("p", { className: "pcc-error" }, "⚠ " + error) : null,
			body)
	);
}

/**
 * 右侧「磁盘哨兵」页面（shell.overlay 槽位组件，关闭时渲染 null）。
 *
 * @param {Object} props - {ctx}。
 */
function PCCleanerPanel(props) {
	var open = usePanelOpen();
	var ctx = props.ctx ?? {};

	// 当前会话离开「磁盘哨兵」工作区时自动收起插件页面。
	useEffect(function () {
		if (!open) return;
		var sessions = ctx.sessions;
		var workspaces = ctx.workspaces;
		if (!sessions?.list || typeof sessions.list.subscribe !== "function") return;

		function reconcileWorkspace() {
			if (cleanerNavigationPending || !cleanerWorkspaceId) return;
			var sessionState = sessions.list.getSnapshot();
			var workspaceState = workspaces?.list?.getSnapshot?.();
			var workspace = workspaceState?.items?.find(function (item) {
				return item.workspaceId === cleanerWorkspaceId;
			}) ?? cleanerWorkspaceFallback;
			if (!sessionBelongsToWorkspace(workspace, sessionState, sessionState.current)) {
				setPanelOpen(false);
			}
		}

		var unsubscribeSessions = sessions.list.subscribe(reconcileWorkspace);
		var unsubscribeWorkspaces =
			typeof workspaces?.list?.subscribe === "function"
				? workspaces.list.subscribe(reconcileWorkspace)
				: null;
		reconcileWorkspace();
		return function () {
			unsubscribeSessions();
			if (unsubscribeWorkspaces) unsubscribeWorkspaces();
		};
	}, [ctx, open]);

	if (!open) return null;

	// 面板外壳；头部导航（返回/标题/关闭）由 CleanerPanelBody 按当前视图渲染
	return createElement(
		"div",
		{ className: "pcc-panel" },
		createElement(CleanerPanelBody, { ctx: ctx })
	);
}

/**
 * 打开磁盘哨兵：确保「磁盘哨兵」工作区存在，优先跳转到该工作区
 * 最近更新的对话；没有任何对话时才创建或复用空白对话。
 * 任一步失败时仍打开面板（降级为纯面板模式）。
 *
 * @param {Object} ctx - 客户端 Cordis 上下文（注入了 workspaces）。
 */
function openCleaner(ctx) {
	cleanerNavigationPending = true;
	setPanelOpen(true);

	// 关闭官方详情列，避免与右侧面板重叠
	try {
		ctx.layout?.closeDetails();
	} catch {}

	var workspaces = ctx.workspaces;
	if (!workspaces) {
		cleanerNavigationPending = false;
		return;
	}

	rpcCall(ctx.connection, "workspace/dir")
		.then(function (value) {
			return workspaces.create({ path: value.path });
		})
		.then(function (workspace) {
			cleanerWorkspaceId = workspace.workspaceId;
			cleanerWorkspaceFallback = workspace;
			return openLatestWorkspaceSession(ctx, workspace);
		})
		.then(function () {
			cleanerNavigationPending = false;
		})
		.catch(function (err) {
			cleanerNavigationPending = false;
			console.warn("[disk-sentinel] 工作区跳转失败，仅打开面板:", err);
		});
}

/**
 * 从 footer 插槽组件所在位置向上找到官方侧边栏根节点。
 *
 * @param {HTMLElement | null} anchor - footer 插槽里的锚点。
 * @returns {HTMLElement | null}
 */
function findSidebarRoot(anchor) {
	var node = anchor?.parentElement ?? null;
	while (node && node !== document.body) {
		var hasRegion = Boolean(node.querySelector(":scope > [class*='_regionArea']"));
		var hasFoot = Boolean(node.querySelector(":scope > [class*='_footArea']"));
		if (hasRegion && hasFoot) return node;
		node = node.parentElement;
	}
	return null;
}

/**
 * 创建或复用磁盘哨兵在侧边栏顶部的挂载容器。
 *
 * @param {HTMLElement | null} anchor - footer 插槽里的锚点。
 * @param {boolean} wide - 当前是否展开侧边栏。
 * @returns {HTMLElement | null}
 */
function ensureSidebarTopMount(anchor, wide) {
	var root = findSidebarRoot(anchor);
	if (!root) return null;

	var mount = root.querySelector(":scope > .pcc-sidebar-top-slot");
	if (!mount) {
		mount = document.createElement("div");
		mount.className = "pcc-sidebar-top-slot";
		mount.setAttribute("data-pcc-sidebar-top-slot", "");
	}

	if (wide) {
		mount.removeAttribute("data-rail");
		var sectionHeader = root.querySelector('[class*="_sectionHeader"]');
		var searchSlot = sectionHeader?.querySelector('[class*="_searchSlot"]');
		if (sectionHeader && searchSlot) {
			sectionHeader.insertBefore(mount, searchSlot);
			return mount;
		}
		var headerActions = sectionHeader?.querySelector('[class*="_headerActions"]');
		if (sectionHeader && headerActions) {
			sectionHeader.insertBefore(mount, headerActions);
			return mount;
		}
		if (sectionHeader) {
			sectionHeader.appendChild(mount);
			return mount;
		}
	} else {
		mount.setAttribute("data-rail", "");
		var region = root.querySelector('[class*="_regionArea"]');
		var railSearch = region?.querySelector('[class*="_search"]');
		if (railSearch?.parentElement) {
			railSearch.parentElement.insertBefore(mount, railSearch.nextSibling);
			return mount;
		}
		var railHeader = region?.querySelector('[class*="_sectionHeader"]');
		if (railHeader?.parentElement) {
			railHeader.parentElement.insertBefore(mount, railHeader.nextSibling);
			return mount;
		}
	}

	return null;
}

/**
 * 侧边栏入口按钮（由 footer 插槽启动，实际渲染到工作区顶部）。
 *
 * @param {Object} props - {ctx, wide}。
 */
function PCCleanerSidebarAction(props) {
	var wide = props.wide !== false;
	var ctx = props.ctx;
	var open = usePanelOpen();
	var btnRef = useRef(null);
	var anchorRef = useRef(null);
	var mountState = useState(null);
	var mount = mountState[0];
	var setMount = mountState[1];

	useLayoutEffect(function () {
		var anchor = anchorRef.current;
		var button = btnRef.current;
		if (!anchor || !button) return;
		var originalParent = button.parentElement;
		var originalNext = button.nextSibling;

		function relocate() {
			var next = ensureSidebarTopMount(anchor, wide);
			if (next && button.parentElement !== next) next.appendChild(button);
			setMount(function (current) {
				return current === next ? current : next;
			});
		}

		relocate();
		var sidebarRoot = findSidebarRoot(anchor);
		return function () {
			if (originalParent && button.isConnected) {
				originalParent.insertBefore(button, originalNext);
			}
			var current = sidebarRoot?.querySelector(".pcc-sidebar-top-slot") ?? anchor.ownerDocument?.querySelector(".pcc-sidebar-top-slot");
			if (current && current.childElementCount === 0) current.remove();
		};
	}, [wide]);

	var iconOnly = Boolean(mount) || !wide;
	return createElement(Fragment, null,
		createElement("span", { ref: anchorRef, className: "pcc-sidebar-anchor", "aria-hidden": true }),
		createElement(
			"button",
			{
				ref: btnRef,
				className: "pcc-sidebar-btn",
				"data-active": open || undefined,
				"data-top": mount ? true : undefined,
				"data-collapsed": iconOnly || undefined,
				"aria-label": open ? "关闭磁盘哨兵" : "打开磁盘哨兵",
				title: open ? "关闭磁盘哨兵" : "打开磁盘哨兵（自动进入「磁盘哨兵」工作区对话）",
				onClick: function () {
					if (open) {
						setPanelOpen(false);
					} else {
						openCleaner(ctx);
					}
				},
			},
			createElement("span", {
				className: "pcc-sidebar-icon",
				"aria-hidden": true,
				dangerouslySetInnerHTML: { __html: cleanerIcon },
			}),
			iconOnly ? null : createElement("span", { className: "pcc-sidebar-label" }, "磁盘哨兵"),
			open && !iconOnly ? createElement("span", { className: "pcc-sidebar-caret", "aria-hidden": true }, "◂") : null
		)
	);
}

export {
	CleanerPanelBody,
	PCCleanerPanel,
	PCCleanerSidebarAction,
	openCleaner,
};
