import assert from "node:assert/strict";
import {
	findLatestWorkspaceSession,
	normalizeWorkspacePath,
	openLatestWorkspaceSession,
	sessionBelongsToWorkspace,
} from "../src/client/workspace-navigation.js";

const workspace = {
	workspaceId: "disk-sentinel",
	path: "C:\\Temp\\磁盘哨兵",
	sessionIds: ["old", "latest", "archived"],
};
const sessionState = {
	current: "latest",
	ids: ["old", "latest", "archived"],
	byId: {
		old: { id: "old", cwd: workspace.path, updatedAt: 100 },
		latest: { id: "latest", cwd: workspace.path, updatedAt: 300 },
		archived: { id: "archived", cwd: workspace.path, updatedAt: 500 },
	},
};

assert.equal(normalizeWorkspacePath("C:/Temp/磁盘哨兵/"), "c:\\temp\\磁盘哨兵");
assert.equal(
	findLatestWorkspaceSession(workspace, sessionState, ["archived"]),
	"latest",
	"应选择最近更新且未归档的会话"
);
assert.equal(sessionBelongsToWorkspace(workspace, sessionState, "latest"), true);
assert.equal(sessionBelongsToWorkspace(workspace, {
	byId: { child: { id: "child", cwd: "c:/temp/磁盘哨兵/" } },
}, "child"), true, "相同 cwd 的子会话也属于磁盘哨兵工作区");
assert.equal(sessionBelongsToWorkspace(workspace, {
	byId: { other: { id: "other", cwd: "D:\\其他项目" } },
}, "other"), false);
assert.equal(sessionBelongsToWorkspace(workspace, sessionState, undefined), false);

let opened = null;
let connectCalls = 0;
const existingCtx = {
	workspaces: {
		list: { getSnapshot: () => ({ archivedSessionIds: ["archived"] }) },
		async connectWorkspace() {
			connectCalls++;
			return "new";
		},
	},
	sessions: {
		list: { getSnapshot: () => sessionState },
		open(sessionId) {
			opened = sessionId;
		},
	},
};
assert.equal(await openLatestWorkspaceSession(existingCtx, workspace), "latest");
assert.equal(opened, "latest");
assert.equal(connectCalls, 0, "已有会话时不应创建新会话");

opened = null;
const emptyWorkspace = { ...workspace, sessionIds: [] };
assert.equal(await openLatestWorkspaceSession(existingCtx, emptyWorkspace), "new");
assert.equal(opened, "new");
assert.equal(connectCalls, 1, "仅无会话时连接空白会话");

console.log("workspace navigation tests passed");
