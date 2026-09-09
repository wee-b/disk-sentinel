/**
 * 磁盘哨兵工作区的会话选择与归属判断。
 *
 * @module @dsh-plugin/disk-sentinel/client/workspace-navigation
 */

/** Windows 路径比较：忽略分隔符差异、末尾分隔符和大小写。 */
function normalizeWorkspacePath(path) {
	return String(path ?? "")
		.replace(/\//g, "\\")
		.replace(/\\+$/, "")
		.toLowerCase();
}

/**
 * 从工作区已有会话中选择最近更新且未归档的一条。
 *
 * @param {Object} workspace - WorkspaceView。
 * @param {Object} sessions - SessionListState。
 * @param {string[]} archivedSessionIds - 全局归档会话 ID。
 * @returns {string | null}
 */
function findLatestWorkspaceSession(workspace, sessions, archivedSessionIds) {
	var archived = new Set(archivedSessionIds ?? []);
	var latest = null;
	var latestUpdatedAt = Number.NEGATIVE_INFINITY;
	(workspace?.sessionIds ?? []).forEach(function (sessionId) {
		if (archived.has(sessionId)) return;
		var session = sessions?.byId?.[sessionId];
		if (!session) return;
		var updatedAt = Number(session.updatedAt);
		if (!Number.isFinite(updatedAt)) updatedAt = Number.NEGATIVE_INFINITY;
		if (latest === null || updatedAt > latestUpdatedAt) {
			latest = sessionId;
			latestUpdatedAt = updatedAt;
		}
	});
	return latest;
}

/**
 * 判断当前会话是否属于磁盘哨兵工作区。
 * 普通会话通过 sessionIds 判断；子代理等地址会话可通过 cwd 归属判断。
 */
function sessionBelongsToWorkspace(workspace, sessions, sessionId) {
	if (!workspace || !sessionId) return false;
	if ((workspace.sessionIds ?? []).includes(sessionId)) return true;
	var session = sessions?.byId?.[sessionId];
	if (!session?.cwd || !workspace.path) return false;
	return normalizeWorkspacePath(session.cwd) === normalizeWorkspacePath(workspace.path);
}

/**
 * 打开工作区最近会话；不存在会话时才创建或复用空白会话。
 *
 * @returns {Promise<string>} 打开的 session id。
 */
async function openLatestWorkspaceSession(ctx, workspace) {
	var workspaces = ctx?.workspaces;
	var sessions = ctx?.sessions;
	if (!workspaces || !sessions?.list || typeof sessions.open !== "function") {
		throw new Error("当前 DSH 客户端不支持工作区会话导航");
	}
	var sessionState = sessions.list.getSnapshot();
	var workspaceState = workspaces.list?.getSnapshot?.();
	var latest = findLatestWorkspaceSession(
		workspace,
		sessionState,
		workspaceState?.archivedSessionIds
	);
	if (latest) {
		sessions.open(latest);
		return latest;
	}
	var sessionId = await workspaces.connectWorkspace(workspace.workspaceId);
	sessions.open(sessionId);
	return sessionId;
}

export {
	normalizeWorkspacePath,
	findLatestWorkspaceSession,
	sessionBelongsToWorkspace,
	openLatestWorkspaceSession,
};
