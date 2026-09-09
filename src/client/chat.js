/**
 * 聊天交互：优先通过 DSH 客户端服务直接发送「让 AI 分析」指令，
 * 没有公开发送 API 时降级为提交聊天输入框。
 *
 * @module @dsh-plugin/disk-sentinel/client/chat
 */
import { formatBytes, formatDate, formatDuration } from "./format.js";

/**
 * 在聊天输入框填入指令（兼容 React 受控组件），并聚焦。
 *
 * @param {string} message - 要填入的文本。
 */
function fillChatInput(message) {
	var input = findChatInput();
	if (!input) {
		window.alert("找不到聊天输入框，请手动输入：\n" + message);
		return;
	}
	setChatInputValue(input, message);
	input.focus();
}

/** 设置输入框内容（兼容 textarea/input/contenteditable 和 React 受控组件）。 */
function setChatInputValue(input, message) {
	if (input.getAttribute && input.getAttribute("contenteditable") === "true") {
		input.textContent = message;
		input.dispatchEvent(new InputEvent("input", { bubbles: true, inputType: "insertText", data: message }));
		return;
	}
	var proto =
		input.tagName === "TEXTAREA"
			? window.HTMLTextAreaElement.prototype
			: window.HTMLInputElement.prototype;
	var setter = Object.getOwnPropertyDescriptor(proto, "value")?.set;
	if (setter) {
		setter.call(input, message);
	} else {
		input.value = message;
	}
	input.dispatchEvent(new Event("input", { bubbles: true }));
}

/** 判断元素是否为面板外、当前可用的聊天输入框。 */
function isVisibleElement(element) {
	if (!element || element.disabled || element.readOnly) return false;
	if (element.closest && element.closest(".pcc-panel")) return false;
	if (typeof element.getClientRects === "function" && element.getClientRects().length === 0) return false;
	return true;
}

/** 查找聊天输入框，仅接受具有明确聊天语义的可见输入控件。 */
function findChatInput(root) {
	var scope = root ?? document;
	var selectors = [
		'textarea[placeholder*="描述"]',
		'textarea[placeholder*="输入"]',
		'textarea[placeholder*="message"]',
		'textarea[placeholder*="Message"]',
		'textarea[aria-label*="消息"]',
		'textarea[aria-label*="message"]',
		'[contenteditable="true"][role="textbox"]',
		// 兼容旧版/当前 DSH 未提供 placeholder、aria-label 或 role 的输入框。
		// 通用选择器必须放最后，并继续经过可见性与面板范围过滤。
		"textarea",
		'[contenteditable="true"]',
	];
	for (var i = 0; i < selectors.length; i++) {
		var matches = scope.querySelectorAll(selectors[i]);
		for (var j = 0; j < matches.length; j++) {
			if (isVisibleElement(matches[j])) return matches[j];
		}
	}
	return null;
}

/** 判断按钮是否可用于提交聊天消息。 */
function isUsableSubmitButton(button) {
	if (!button || button.disabled) return false;
	var aria = (button.getAttribute("aria-label") ?? "") + " " + (button.getAttribute("title") ?? "");
	var text = button.textContent ?? "";
	var label = (aria + " " + text).toLowerCase();
	if (/发送|send|submit|arrow|enter/.test(label)) return true;
	return button.type === "submit";
}

/** 从输入框附近查找发送按钮。 */
function findSubmitButton(input) {
	var scopes = [];
	var form = input.closest ? input.closest("form") : null;
	if (form) scopes.push(form);
	var parent = input.parentElement;
	for (var i = 0; parent && i < 3; i++) {
		scopes.push(parent);
		parent = parent.parentElement;
	}
	for (var s = 0; s < scopes.length; s++) {
		var buttons = scopes[s].querySelectorAll(
			'button[type="submit"],button[aria-label*="发送"],button[title*="发送"],' +
			'button[aria-label*="Send"],button[title*="Send"],button[aria-label*="send"],button[title*="send"]'
		);
		for (var b = 0; b < buttons.length; b++) {
			if (isUsableSubmitButton(buttons[b])) return buttons[b];
		}
	}
	return null;
}

/** 通过 DOM 兜底提交当前聊天输入框。 */
async function submitChatInput(message) {
	var input = findChatInput();
	if (!input) throw new Error("找不到当前会话的聊天输入框，无法自动发送");
	setChatInputValue(input, message);
	input.focus();
	// React 受控输入框需要一次渲染机会，避免提交到更新前的空值。
	await new Promise(function (resolve) {
		if (typeof requestAnimationFrame === "function") requestAnimationFrame(resolve);
		else setTimeout(resolve, 0);
	});
	var form = input.closest ? input.closest("form") : null;
	if (form && typeof form.requestSubmit === "function") {
		form.requestSubmit();
		return { channel: "dom.form", accepted: true };
	}
	var button = findSubmitButton(input);
	if (button) {
		button.click();
		return { channel: "dom.button", accepted: true };
	}
	// 兼容没有 form、发送按钮也没有可识别标签的 DSH 版本。
	// 保留原实现已验证可用的 Enter 提交路径。
	input.dispatchEvent(new KeyboardEvent("keydown", {
		key: "Enter",
		code: "Enter",
		keyCode: 13,
		which: 13,
		bubbles: true,
		cancelable: true,
	}));
	input.dispatchEvent(new KeyboardEvent("keyup", {
		key: "Enter",
		code: "Enter",
		keyCode: 13,
		which: 13,
		bubbles: true,
		cancelable: true,
	}));
	return { channel: "dom.keyboard", accepted: true };
}

/** 安全读取可选客户端服务，不把服务名加入强制 inject，避免旧宿主加载失败。 */
function optionalService(ctx, name) {
	try {
		if (ctx && typeof ctx.get === "function") {
			var viaGet = ctx.get(name, false);
			if (viaGet) return viaGet;
		}
	} catch {}
	try {
		return ctx ? ctx[name] : null;
	} catch {
		return null;
	}
}

/**
 * 尝试通过 DSH 客户端公开服务发送一条用户消息。
 *
 * 这里只支持明确的 chat.sendMessage(message) 契约。接口存在但调用失败时
 * 直接向上抛错，不再转 DOM 重发，避免服务已入队但响应失败造成重复消息。
 */
async function sendViaClientApi(ctx, message) {
	var chat = optionalService(ctx, "chat");
	if (!chat || typeof chat.sendMessage !== "function") return null;
	await chat.sendMessage(message);
	return { channel: "chat.sendMessage", accepted: true };
}

/**
 * 发送聊天消息：优先使用 DSH 会话/聊天 API；不可用时提交输入框作为兼容兜底。
 *
 * @param {Object} ctx - DSH 客户端 Cordis 上下文。
 * @param {string} message - 要发送的用户消息。
 */
async function sendChatMessage(ctx, message) {
	if (typeof message !== "string" || message.trim().length === 0) {
		throw new Error("发送内容不能为空");
	}
	var apiResult = await sendViaClientApi(ctx, message);
	if (apiResult) return apiResult;
	return submitChatInput(message);
}

/**
 * 构造 DSH 工作区文件引用。报告和方案均保存在当前「磁盘哨兵」工作区，
 * 因此只发送文件名，避免向对话暴露完整本地路径。
 */
function buildFileReference(filePath) {
	var path = typeof filePath === "string" ? filePath.trim() : "";
	if (!path) throw new Error("缺少可供 AI 读取的文件路径");
	if (/[\r\n\0"]/.test(path)) throw new Error("文件路径包含不支持的字符");
	var fileName = path.split(/[\\/]/).pop();
	if (!fileName || fileName === "." || fileName === "..") {
		throw new Error("无法从路径中识别文件名");
	}
	return "@" + fileName;
}

/** 构造让 AI 基于既有方案估算、确认后再清理的指令。 */
function buildPlanFollowUpPrompt(filePath) {
	return buildFileReference(filePath) +
		" 请按此清理方案跟进：先用 clean_disk 的 estimate 模式核实各项可回收空间，列出核实结果并与我确认后，再执行实际清理。";
}

/**
 * 构造「让 AI 分析」的指令：有报告文件时只填一个官方 @file 引用
 * （完整分析要求已随报告生成时写入文件末尾的「AI 分析指引」章节）；
 * 文件缺失时降级为内联摘要。
 *
 * @param {Object} result - scan/status 或 report/get 返回的 result。
 * @returns {string} markdown 文本。
 */
function buildAnalysisPrompt(result) {
	var lines = [];
	if (result.resultFile) {
		// 有报告文件：只填官方共享 @file 引用语法（dsh-client-ui-reference /
		// dsh-file-reference-local），分析要求全部在报告文件内。
		return buildFileReference(result.resultFile);
	}
	// 报告文件缺失：降级为内联紧凑摘要
	lines.push("我用「磁盘哨兵」完成了磁盘空间扫描（数据已获取，无需再调用任何扫描工具，禁止重新全盘扫描），摘要如下：");
	lines.push("");
	lines.push("## 各盘符概况");
	lines.push("| 盘符 | 总容量 | 剩余 | 扫描统计到的数据量 | 文件数 | 目录数 | 扫描耗时 |");
	lines.push("|------|--------|------|--------------------|--------|--------|----------|");
	(result.driveStats ?? []).forEach(function (d) {
		lines.push(
			"| " + d.drive + " | " + formatBytes(d.totalBytes) + " | " + formatBytes(d.freeBytes) +
			" | " + formatBytes(d.scannedBytes) + " | " + d.fileCount + " | " + d.dirCount +
			" | " + formatDuration(result.durationMs ?? 0) + " |"
		);
	});
	lines.push("");
	var dirs = result.topDirectories ?? [];
	lines.push("## Top " + Math.min(30, dirs.length) + " 大目录");
	lines.push("| 路径 | 大小 | 文件数 |");
	lines.push("|------|------|--------|");
	dirs.slice(0, 30).forEach(function (d) {
		lines.push("| " + d.path + " | " + formatBytes(d.size) + " | " + (d.fileCount ?? "-") + " |");
	});
	lines.push("");
	var files = result.topFiles ?? [];
	lines.push("## Top " + Math.min(30, files.length) + " 大文件");
	lines.push("| 路径 | 大小 | 修改日期 |");
	lines.push("|------|------|----------|");
	files.slice(0, 30).forEach(function (f) {
		lines.push("| " + f.path + " | " + formatBytes(f.size) + " | " + formatDate(f.lastModified) + " |");
	});
	lines.push("");
	lines.push("请基于以上扫描数据，给出磁盘清理分析报告：");
	lines.push("1. **可以安全删除的**：明确列出路径、理由和预估可回收空间（如临时文件、缓存、休眠文件等）；");
	lines.push("2. **绝对不能动的**：系统关键文件/目录（如 pagefile.sys、系统组件），说明为什么；");
	lines.push("3. **适合移动到其他盘的**：如大体积可迁移的开发缓存、虚拟机镜像、下载目录等，给出迁移建议；");
	lines.push("4. **建议的清理顺序**：按「收益大、风险低优先」排序。");
	lines.push("直接基于上述数据分析即可；若确有需要可以用 clean_disk 的 estimate 模式核实某个类别，但不要重新全盘扫描。");
	lines.push("注意：执行清理时不要删除「磁盘哨兵」工作区目录（含扫描报告）以及其他 DSH 自身的临时文件。");
	return lines.join("\n");
}

/**
 * 构造「让 AI 分析差量」的指令：有差量 .md 时只填官方 @file 引用
 * （分析要求已写入差量文件末尾的「AI 分析指引」章节）；
 * 旧版差量无 .md（升级前生成）时降级为内联紧凑摘要。
 *
 * @param {Object} result - report/diff 或 diff/get 返回的差量结果。
 * @returns {string} markdown 文本。
 */
function buildDiffAnalysisPrompt(result) {
	if (result.resultFile) {
		// 有差量 .md：只填官方共享 @file 引用语法，分析要求全部在差量文件内
		return buildFileReference(result.resultFile);
	}
	// 旧版差量无 .md（升级前生成）：降级为内联紧凑摘要
	var base = result.base ?? {};
	var target = result.target ?? {};
	var lines = [];
	lines.push("我用「磁盘哨兵」对比了两次磁盘扫描的差量（数据已获取，无需再调用任何扫描工具，禁止重新全盘扫描），差量摘要如下：");
	lines.push("");
	lines.push("- **基准扫描**: " + (base.name ?? "?") + "（" + (base.createdAt ? new Date(base.createdAt).toLocaleString() : "-") + "）");
	lines.push("- **目标扫描**: " + (target.name ?? "?") + "（" + (target.createdAt ? new Date(target.createdAt).toLocaleString() : "-") + "）");
	lines.push("");
	if ((result.driveDeltas ?? []).length > 0) {
		lines.push("## 各盘符变化");
		lines.push("| 盘符 | 剩余空间变化 | 扫描量变化 |");
		lines.push("|------|--------------|-------------|");
		(result.driveDeltas ?? []).forEach(function (d) {
			lines.push("| " + d.drive + " | " + (d.freeDelta > 0 ? "+" : "") + formatBytes(d.freeDelta) +
				" | " + (d.scannedDelta > 0 ? "+" : "") + formatBytes(d.scannedDelta) + " |");
		});
		lines.push("");
	}
	var pushList = function (title, list, cols) {
		if (!list || list.length === 0) return;
		lines.push("## " + title);
		lines.push("| " + cols.map(function (c) { return c[0]; }).join(" | ") + " |");
		lines.push("|" + cols.map(function () { return "------"; }).join("|") + "|");
		list.slice(0, 10).forEach(function (item) {
			lines.push("| " + cols.map(function (c) { return c[1](item); }).join(" | ") + " |");
		});
		lines.push("");
	};
	pushList("Top 增长目录", result.growth, [
		["路径", function (g) { return g.path; }],
		["变化", function (g) { return "+" + formatBytes(g.delta); }],
	]);
	pushList("Top 缩小目录", result.shrink, [
		["路径", function (s) { return s.path; }],
		["变化", function (s) { return formatBytes(s.delta); }],
	]);
	pushList("新增目录", result.added, [
		["路径", function (a) { return a.path; }],
		["大小", function (a) { return formatBytes(a.size); }],
	]);
	pushList("消失目录", result.removed, [
		["路径", function (r) { return r.path; }],
		["原大小", function (r) { return formatBytes(r.size); }],
	]);
	lines.push("请基于以上差量数据给出空间变化分析：");
	lines.push("1. **空间增长主因**：指出哪些目录因何增长（缓存堆积、日志膨胀、新装软件等）；");
	lines.push("2. **可以安全回收的**：明确列出路径、理由和预估可回收空间；");
	lines.push("3. **绝对不能动的**：系统关键文件/目录，说明为什么；");
	lines.push("4. **建议的处理顺序**：按「收益大、风险低优先」排序。");
	lines.push("直接基于上述数据分析即可；若确有需要可以用 clean_disk 的 estimate 模式核实某个类别，但不要重新全盘扫描。");
	lines.push("注意：执行清理时不要删除「磁盘哨兵」工作区目录（含本报告）以及其他 DSH 自身的临时文件。");
	return lines.join("\n");
}

export {
	fillChatInput,
	findChatInput,
	submitChatInput,
	sendViaClientApi,
	sendChatMessage,
	buildFileReference,
	buildPlanFollowUpPrompt,
	buildAnalysisPrompt,
	buildDiffAnalysisPrompt,
};
