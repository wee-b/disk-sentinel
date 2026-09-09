/**
 * 面板开合共享状态（跨槽位联动：入口按钮 <-> 右侧页面）
 * 与对话列布局适配（打开时压缩对话列 margin-right，让面板贴合右侧
 * 而不遮挡对话）。
 *
 * @module @dsh-plugin/disk-sentinel/client/layout
 */
import * as React from "react";

var panelOpen = false;
var openListeners = new Set();
var layoutObserver = null;

/**
 * 找到 DSH AppFrame 根元素（grid 三列容器）。
 * 注意：不能用 [data-sidebar-collapsed] —— 该属性在侧边栏展开时
 * 由 React 省略（undefined 不渲染）。overlayLayer 的 data-shell-overlay
 * 属性始终存在，其 parentElement 即 frame。
 */
function findFrame() {
	var overlay = document.querySelector("[data-shell-overlay]");
	return overlay ? overlay.parentElement : null;
}

/**
 * 取对话列（centerCol）。
 * frame 的 DOM 子元素顺序：[sidebarCol, centerCol, detailsCol, overlayLayer, dragHandles…]。
 * 从 overlayLayer 往前数两个兄弟即是 centerCol（不依赖索引，更稳健）。
 */
function findCenterCol() {
	var frame = findFrame();
	if (!frame) return null;
	var overlay = frame.querySelector(":scope > [data-shell-overlay]");
	if (!overlay) return null;
	var details = overlay.previousElementSibling;
	var center = details ? details.previousElementSibling : null;
	return center;
}

/**
 * 计算面板宽度：除侧边栏外剩余空间的一半。
 * 剩余空间不足以让对话区保有 400px 时，回退为覆盖模式（不挤压对话）。
 *
 * @returns {{width: number, squeeze: boolean}}
 */
function computePanelLayout() {
	var sidebarCol = findFrame()?.firstElementChild ?? null;
	var sidebarW = sidebarCol ? sidebarCol.getBoundingClientRect().width : 280;
	var viewport = window.innerWidth;
	var remaining = Math.max(0, viewport - sidebarW);
	var width = Math.max(300, Math.floor(remaining / 2));
	width = Math.min(width, Math.floor(viewport * 0.92));
	return { width: width, squeeze: remaining - width >= 400 };
}

/**
 * 应用面板布局：同步 CSS 变量（面板宽度）与对话列 margin-right。
 * 面板打开、侧边栏拖拽、窗口 resize 时都会重算。
 */
function applyPanelLayout() {
	var layout = computePanelLayout();
	document.documentElement.style.setProperty("--pcc-panel-w", layout.width + "px");
	var centerCol = findCenterCol();
	if (centerCol) {
		centerCol.style.marginRight = layout.squeeze ? layout.width + "px" : "";
	}
}

/** 恢复对话列原布局。 */
function resetPanelLayout() {
	document.documentElement.style.removeProperty("--pcc-panel-w");
	var centerCol = findCenterCol();
	if (centerCol) centerCol.style.marginRight = "";
}

/** 面板打开时监听布局变化（侧边栏拖动 / 窗口缩放）。 */
function startLayoutWatch() {
	stopLayoutWatch();
	applyPanelLayout();
	layoutObserver = new MutationObserver(function () {
		applyPanelLayout();
	});
	var frame = findFrame();
	if (frame) {
		// React 重写 grid-template-columns（拖动侧栏 / resize）时重算
		layoutObserver.observe(frame, { attributes: true, attributeFilter: ["style"] });
	} else {
		// frame 尚未挂载：等一帧重试
		setTimeout(function () {
			if (panelOpen && layoutObserver) {
				var late = findFrame();
				if (late) {
					applyPanelLayout();
					layoutObserver.observe(late, { attributes: true, attributeFilter: ["style"] });
				}
			}
		}, 300);
	}
	window.addEventListener("resize", applyPanelLayout);
}

/** 停止监听并清理布局修改。 */
function stopLayoutWatch() {
	if (layoutObserver) {
		layoutObserver.disconnect();
		layoutObserver = null;
	}
	window.removeEventListener("resize", applyPanelLayout);
	resetPanelLayout();
}

function setPanelOpen(next) {
	next = !!next;
	if (panelOpen === next) return;
	panelOpen = next;
	if (next) {
		startLayoutWatch();
	} else {
		stopLayoutWatch();
	}
	openListeners.forEach(function (fn) {
		fn();
	});
}

function subscribePanelOpen(listener) {
	openListeners.add(listener);
	return function () {
		openListeners.delete(listener);
	};
}

function usePanelOpen() {
	return React.useSyncExternalStore(
		subscribePanelOpen,
		function () {
			return panelOpen;
		},
		function () {
			return panelOpen;
		}
	);
}

export {
	setPanelOpen,
	subscribePanelOpen,
	usePanelOpen,
	startLayoutWatch,
	stopLayoutWatch,
};
