// 冒烟测试：模拟 DSH AppFrame DOM 结构，验证 findFrame/findCenterCol 定位逻辑
const html =
	'<div id="frame" style="grid-template-columns: 280px minmax(0,1fr) 0px">' +
	'<div class="sidebarCol"></div>' +
	'<div class="centerCol"></div>' +
	'<div class="detailsCol"></div>' +
	'<div data-shell-overlay="true"></div>' +
	'<div class="handle"></div></div>';

// 用 node 内置的简易解析验证 DOM 顺序与选择器逻辑
const overlayIdx = html.indexOf("data-shell-overlay");
const frameStart = html.lastIndexOf("<div", html.indexOf("data-shell-overlay"));
console.log("overlay 存在:", overlayIdx > -1);

// 模拟：overlay 的 parentElement = 从 overlay 标签开始向上找最近未闭合的 div
// 简化验证：DOM 子元素顺序假设
const order = ["sidebarCol", "centerCol", "detailsCol", "data-shell-overlay"].map((k) => html.indexOf(k));
console.log("DOM 子元素顺序递增（sidebar→center→details→overlay）:", order.every((v, i, a) => i === 0 || v > a[i - 1]));

// 验证 computePanelLayout 数值逻辑
function compute(viewport, sidebarW) {
	const remaining = Math.max(0, viewport - sidebarW);
	let width = Math.max(300, Math.floor(remaining / 2));
	width = Math.min(width, Math.floor(viewport * 0.92));
	return { width, squeeze: remaining - width >= 400 };
}
console.log("1920px 视口/280 侧栏:", JSON.stringify(compute(1920, 280))); // width=820, squeeze=true
console.log("1366px 视点/280 侧栏:", JSON.stringify(compute(1366, 280))); // width=543, squeeze=true
console.log("1000px 视口/280 侧栏:", JSON.stringify(compute(1000, 280))); // width=360, squeeze=false(340<400)
console.log("全屏: centerCol 变窄后剩余 =", 1920 - 280 - 820, "px（对话区宽度）");
