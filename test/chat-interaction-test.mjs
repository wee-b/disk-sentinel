import assert from "node:assert/strict";
import {
	buildAnalysisPrompt,
	buildDiffAnalysisPrompt,
	buildFileReference,
	buildPlanFollowUpPrompt,
	sendChatMessage,
	sendViaClientApi,
} from "../src/client/chat.js";

const reportPath = "C:\\Temp\\磁盘哨兵\\扫描结果-2026-09-07.md";
const reference = "@扫描结果-2026-09-07.md";

assert.equal(buildFileReference(reportPath), reference);
assert.equal(buildFileReference("  " + reportPath + "  "), reference);
assert.equal(buildFileReference("扫描结果-2026-09-07.md"), reference);
assert.throws(() => buildFileReference(""), /缺少/);
assert.throws(() => buildFileReference('C:\\bad"name.md'), /不支持/);
assert.throws(() => buildFileReference("C:\\bad\nname.md"), /不支持/);

assert.equal(buildAnalysisPrompt({ resultFile: reportPath }), reference);
assert.equal(buildDiffAnalysisPrompt({ resultFile: reportPath }), reference);

const fallback = buildAnalysisPrompt({
	driveStats: [{
		drive: "C:",
		totalBytes: 1000,
		freeBytes: 400,
		scannedBytes: 600,
		fileCount: 2,
		dirCount: 1,
	}],
	topDirectories: [{ path: "C:\\Cache", size: 200, fileCount: 2 }],
	topFiles: [{ path: "C:\\Cache\\large.bin", size: 200, lastModified: 0 }],
	durationMs: 100,
});
assert.match(fallback, /禁止重新全盘扫描/);
assert.match(fallback, /C:\\Cache/);
assert.match(fallback, /建议的清理顺序/);

const diffFallback = buildDiffAnalysisPrompt({
	base: { name: "旧报告", createdAt: 1 },
	target: { name: "新报告", createdAt: 2 },
	growth: [{ path: "C:\\Cache", delta: 100 }],
});
assert.match(diffFallback, /空间增长主因/);
assert.match(diffFallback, /C:\\Cache/);

const planPrompt = buildPlanFollowUpPrompt(reportPath);
assert.ok(planPrompt.startsWith(reference));
assert.match(planPrompt, /estimate/);
assert.match(planPrompt, /与我确认后/);

let received = null;
const apiResult = await sendViaClientApi({
	chat: {
		async sendMessage(message) {
			received = message;
		},
	},
}, "分析报告");
assert.equal(received, "分析报告");
assert.deepEqual(apiResult, { channel: "chat.sendMessage", accepted: true });

let queriedDom = false;
const originalDocument = globalThis.document;
globalThis.document = {
	querySelectorAll() {
		queriedDom = true;
		return [];
	},
};
await assert.rejects(
	sendChatMessage({
		chat: {
			async sendMessage() {
				throw new Error("会话繁忙");
			},
		},
	}, "不要重复发送"),
	/会话繁忙/
);
assert.equal(queriedDom, false, "公开 API 调用失败后不应通过 DOM 重复发送");

let submitted = 0;
const form = {
	requestSubmit() {
		submitted++;
	},
};
const input = {
	disabled: false,
	readOnly: false,
	textContent: "",
	parentElement: form,
	getAttribute(name) {
		return name === "contenteditable" ? "true" : null;
	},
	getClientRects() {
		return [{}];
	},
	closest(selector) {
		if (selector === ".pcc-panel") return null;
		if (selector === "form") return form;
		return null;
	},
	dispatchEvent() {},
	focus() {},
};
globalThis.InputEvent = class InputEvent {
	constructor(type, options) {
		this.type = type;
		this.options = options;
	}
};
globalThis.document = {
	querySelectorAll(selector) {
		// 模拟 DSH 输入框没有 placeholder、aria-label 和 role 的实际兼容场景。
		return selector === '[contenteditable="true"]' ? [input] : [];
	},
};
const domResult = await sendChatMessage({}, "通过 DOM 发送");
assert.equal(input.textContent, "通过 DOM 发送");
assert.equal(submitted, 1);
assert.deepEqual(domResult, { channel: "dom.form", accepted: true });

let keyboardEvents = 0;
globalThis.KeyboardEvent = class KeyboardEvent {
	constructor(type, options) {
		this.type = type;
		this.options = options;
	}
};
input.parentElement = { parentElement: null, querySelectorAll() { return []; } };
input.closest = function (selector) {
	return selector === ".pcc-panel" ? null : null;
};
input.dispatchEvent = function (event) {
	if (event.type === "keydown" || event.type === "keyup") keyboardEvents++;
};
const keyboardResult = await sendChatMessage({}, "通过 Enter 发送");
assert.equal(keyboardEvents, 2);
assert.deepEqual(keyboardResult, { channel: "dom.keyboard", accepted: true });

globalThis.document = { querySelectorAll() { return []; } };
await assert.rejects(sendChatMessage({}, "无输入框"), /找不到当前会话/);
await assert.rejects(sendChatMessage({}, "  "), /不能为空/);

if (originalDocument === undefined) delete globalThis.document;
else globalThis.document = originalDocument;

console.log("chat interaction tests passed");
