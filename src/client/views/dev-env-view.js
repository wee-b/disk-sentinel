/**
 * 开发环境分析视图：盘点环境变量与 C 盘用户目录下的开发缓存。
 *
 * @module @dsh-plugin/disk-sentinel/client/views/dev-env-view
 */
import * as React from "react";
var useState = React.useState;
var useEffect = React.useEffect;
var createElement = React.createElement;
import { rpcCall } from "../rpc.js";
import { formatBytes, formatDuration } from "../format.js";
import { buildFileReference, sendChatMessage } from "../chat.js";

/** 路径是否在 C 盘。 */
function isOnCDrive(path) {
	return /^c:[\\/]/i.test(path ?? "");
}

/** 根据目标根目录和规则子目录生成迁移预览路径。 */
function migrationPreviewPath(root, subdir) {
	const base = String(root ?? "").trim().replace(/^"+|"+$/g, "").replace(/[\\/]+$/, "");
	const child = String(subdir ?? "").replace(/^[\\/]+/, "");
	return base && child ? base + "\\" + child : base;
}

/**
 * 开发环境分析视图。
 *
 * @param {Object} props - {ctx, connection}。
 */
function DevEnvView(props) {
	var ctx = props.ctx;
	var connection = props.connection;
	var scanState = useState(null);
	var scan = scanState[0];
	var setScan = scanState[1];
	var loadingState = useState(false);
	var loading = loadingState[0];
	var setLoading = loadingState[1];
	var errorState = useState(null);
	var error = errorState[0];
	var setError = errorState[1];
	var expandedState = useState({});
	var expanded = expandedState[0];
	var setExpanded = expandedState[1];
	var targetRootState = useState("");
	var targetRoot = targetRootState[0];
	var setTargetRoot = targetRootState[1];
	var migrationTargetState = useState(null);
	var migrationTarget = migrationTargetState[0];
	var setMigrationTarget = migrationTargetState[1];
	var previewPathState = useState("");
	var previewPath = previewPathState[0];
	var setPreviewPath = previewPathState[1];
	var browsingState = useState(false);
	var browsing = browsingState[0];
	var setBrowsing = browsingState[1];
	var planningState = useState(null);
	var planningId = planningState[0];
	var setPlanningId = planningState[1];
	var executingState = useState(false);
	var executing = executingState[0];
	var setExecuting = executingState[1];
	var aiSendingState = useState(false);
	var aiSending = aiSendingState[0];
	var setAiSending = aiSendingState[1];
	var actionMessageState = useState(null);
	var actionMessage = actionMessageState[0];
	var setActionMessage = actionMessageState[1];

	function load(force) {
		setLoading(true);
		setError(null);
		rpcCall(connection, "dev-env/scan", { force: force === true })
			.then(function (value) {
				setScan(value);
			})
			.catch(function (err) {
				setError(err.message ?? String(err));
			})
			.finally(function () {
				setLoading(false);
			});
	}

	async function sendToAi() {
		setAiSending(true);
		setError(null);
		setActionMessage(null);
		try {
			var report = await rpcCall(connection, "dev-env/report");
			await sendChatMessage(ctx, buildFileReference(report.resultFile));
			setActionMessage("迁移分析报告已发送给 AI。白名单外目录只会通过 AI 迁移流程处理。");
		} catch (err) {
			setError(err.message ?? String(err));
		} finally {
			setAiSending(false);
		}
	}

	async function createManualPlan(item) {
		if (!targetRoot.trim()) return;
		setPlanningId(item.id);
		setError(null);
		setActionMessage(null);
		try {
			var value = await rpcCall(connection, "dev-env/migration/plan-manual", {
				recipeId: item.id,
				targetRoot: targetRoot.trim(),
			});
			setMigrationTarget(null);
			var confirmed = window.confirm(
				"确定要迁移到 " + value.destinationPath + " 目录吗？\n\n" +
				"源目录: " + value.sourcePath + "\n" +
				"持久配置: " + (value.configChange?.path ?? value.envChanges.map(function (change) { return change.key; }).join(", ")) + "\n\n" +
				"确认后将迁移文件并修改持久配置，原目录会保留为备份。"
			);
			if (!confirmed) return;
			setExecuting(true);
			var result = await rpcCall(connection, "dev-env/migration/execute", { planId: value.planId });
			setActionMessage("迁移完成，工具配置已更新，备份保留在 " + result.backupPath + "。请重启终端和 IDE 后验证。");
		} catch (err) {
			setError(err.message ?? String(err));
		} finally {
			setExecuting(false);
			setPlanningId(null);
		}
	}

	async function browseTargetDirectory(item) {
		setBrowsing(true);
		setError(null);
		try {
			var result = await rpcCall(connection, "dev-env/migration/pick-directory", {
				initialPath: targetRoot.trim(),
			});
			if (result.cancelled) return;
			setTargetRoot(result.path);
			setPreviewPath(migrationPreviewPath(result.path, item.manualMigration.targetSubdir));
		} catch (err) {
			setError(err.message ?? String(err));
		} finally {
			setBrowsing(false);
		}
	}

	useEffect(function () {
		var cancelled = false;
		setLoading(true);
		setError(null);
		rpcCall(connection, "dev-env/scan", { force: false })
			.then(function (value) {
				if (!cancelled) setScan(value);
			})
			.catch(function (err) {
				if (!cancelled) setError(err.message ?? String(err));
			})
			.finally(function () {
				if (!cancelled) setLoading(false);
			});
		return function () {
			cancelled = true;
		};
	}, [connection]);

	var envVars = scan?.envVars ?? [];
	var envPathGroups = scan?.envPathGroups ?? [];
	var knownDirs = scan?.knownDirs ?? [];

	var children = [];
	children.push(createElement("div", { className: "pcc-hero", key: "hero" },
		createElement("p", { className: "pcc-section-title" }, "开发环境分析"),
		createElement("p", { className: "pcc-desc" },
			"扫描常见开发环境变量和用户目录下的开发缓存位置，先找出哪些工具链、仓库和缓存正在占用 C 盘。")));

	children.push(createElement("div", { key: "actions", className: "pcc-dev-actions" },
		createElement("button", {
			className: "pcc-btn pcc-btn-primary",
			disabled: loading,
			onClick: function () { load(true); },
		}, loading ? "正在读取开发环境分析…" : scan ? "重新扫描开发环境" : "扫描开发环境"),
		createElement("button", {
			className: "pcc-btn",
			disabled: !scan || aiSending,
			onClick: sendToAi,
		}, aiSending ? "正在发送…" : "交给 AI 分析迁移")));

	if (error) {
		children.push(createElement("p", { className: "pcc-error", key: "err" }, "⚠ " + error));
	}
	if (actionMessage) {
		children.push(createElement("p", { className: "pcc-dev-success", key: "action-message" }, actionMessage));
	}
	if (loading && !scan && !error) {
		children.push(createElement("p", { key: "loading", className: "pcc-desc" },
			"正在读取环境变量并统计常见开发缓存目录…"));
	}

	if (scan) {
		children.push(createElement("div", { key: "summary", className: "pcc-statrow" },
			createElement("div", { className: "pcc-stat" },
				createElement("div", { className: "pcc-stat-value" }, envVars.length),
				createElement("div", { className: "pcc-stat-label" }, "路径型环境变量")),
			createElement("div", { className: "pcc-stat" },
				createElement("div", { className: "pcc-stat-value" }, formatBytes(scan.totalEnvPathBytes ?? 0)),
				createElement("div", { className: "pcc-stat-label" }, "环境变量路径体积")),
			createElement("div", { className: "pcc-stat" },
				createElement("div", { className: "pcc-stat-value" }, formatBytes(scan.totalKnownBytes ?? 0)),
				createElement("div", { className: "pcc-stat-label" }, "常见开发目录体积"))));

		var scannedAt = scan.createdAt ? new Date(scan.createdAt).toLocaleString() : "-";
		children.push(createElement("p", { key: "meta", className: "pcc-desc" },
			"扫描时间: " + scannedAt +
			" · " + (scan.fromCache ? "读取缓存" : "刚刚扫描") +
			" · 扫描耗时 " + formatDuration(scan.durationMs ?? 0)));
		children.push(createElement("p", { key: "path-meta", className: "pcc-desc" },
			"用户目录: " + (scan.userProfile || "-")));

		children.push(createElement("p", { key: "dirs-title", className: "pcc-section-title", style: { marginTop: "10px" } },
			"用户目录 / AppData 开发缓存"));
		if (knownDirs.length === 0) {
			children.push(createElement("p", { key: "dirs-empty", className: "pcc-desc" },
				"未发现常见开发缓存目录。"));
		} else {
			knownDirs.forEach(function (d) {
				var displayPath = d.isLink && d.linkTarget ? d.path + " → " + d.linkTarget : d.path;
				var cDrive = isOnCDrive(d.linkTarget ?? d.path);
				var meta = d.isLink && d.linkTarget
					? d.tool + " · 已迁移到 " + d.linkTarget
					: d.exists
					? d.tool + " · " + (d.fileCount ?? 0).toLocaleString() + " 文件 · " + (d.dirCount ?? 0).toLocaleString() + " 目录"
					: d.tool + " · 未发现";
				children.push(createElement("div", {
					key: "dir-" + d.id,
					className: "pcc-devdir-item",
					"data-missing": !d.exists || undefined,
				},
					createElement("div", { className: "pcc-devdir-row" },
						createElement("span", { className: "pcc-devdir-name" }, d.label),
						createElement("span", { className: "pcc-devdir-size" }, d.exists ? formatBytes(d.sizeBytes ?? 0) : "-")),
					createElement("div", { className: "pcc-devdir-path", title: displayPath }, displayPath),
					createElement("div", { className: "pcc-devdir-foot" },
						createElement("span", null, meta),
						createElement("span", { className: "pcc-devdir-actions" },
							d.isLink ? createElement("span", { className: "pcc-badge" }, "已迁移") : null,
							!d.isLink && cDrive && d.exists ? createElement("span", { className: "pcc-badge" }, "C 盘") : null,
							d.exists && d.manualMigration ? createElement("button", {
								className: "pcc-btn pcc-dev-plan-btn",
								disabled: Boolean(planningId) || executing,
								onClick: function () {
									setTargetRoot("");
									setPreviewPath("");
									setMigrationTarget(d);
									setError(null);
								},
								title: d.manualMigration.note,
							}, planningId === d.id || executing ? "处理中…" : "迁移") : null))));
			});
		}

		children.push(createElement("div", { key: "env-divider", className: "pcc-dev-section-divider" },
			createElement("span", null, "环境变量")));
		children.push(createElement("p", { key: "env-title", className: "pcc-section-title" },
			"路径型环境变量（按盘符）"));
		if (envPathGroups.length === 0) {
			children.push(createElement("p", { key: "env-empty", className: "pcc-desc" },
				"未发现变量值为路径的开发环境变量。"));
		} else {
			envPathGroups.forEach(function (group) {
				var open = expanded[group.drive] === true;
				var paths = group.paths ?? [];
				var visible = open ? paths : paths.slice(0, 5);
				children.push(createElement("div", { key: "env-drive-" + group.drive, className: "pcc-env-drive" },
					createElement("div", { className: "pcc-env-drive-head" },
						createElement("span", { className: "pcc-env-drive-title" }, group.drive),
						createElement("span", { className: "pcc-env-drive-meta" },
							formatBytes(group.totalBytes ?? 0) + " · " + (group.pathCount ?? 0) + " 个路径")),
					visible.map(function (item) {
						var meta = item.exists
							? (item.isDirectory ? "目录" : item.isFile ? "文件" : "路径") +
								" · " + (item.fileCount ?? 0).toLocaleString() + " 文件 · " + (item.dirCount ?? 0).toLocaleString() + " 目录"
							: "路径未找到";
						return createElement("div", {
							key: group.drive + "-" + item.path,
							className: "pcc-env-path-item",
							"data-missing": !item.exists || undefined,
						},
							createElement("div", { className: "pcc-env-path-top" },
								createElement("span", { className: "pcc-env-name", title: item.envKeys.join(", ") },
									item.envKeys.join(", ")),
								createElement("span", { className: "pcc-devdir-size" },
									item.exists ? formatBytes(item.sizeBytes ?? 0) : "-")),
							createElement("div", { className: "pcc-env-path", title: item.path }, item.path),
							createElement("div", { className: "pcc-devdir-foot" },
								createElement("span", null, meta),
								item.labels.length > 0 ? createElement("span", { className: "pcc-badge" }, item.labels[0]) : null));
					}),
					paths.length > 5 ? createElement("button", {
						className: "pcc-more-btn",
						onClick: function () {
							setExpanded(function (prev) {
								return {
									...(prev ?? {}),
									[group.drive]: !open,
								};
							});
						},
					}, open ? "收起" : "展开其余 " + (paths.length - 5) + " 个路径") : null));
			});
		}
	}

	if (migrationTarget) {
		children.push(createElement("div", { key: "migration-dialog", className: "pcc-dev-dialog-backdrop" },
			createElement("form", {
				className: "pcc-dev-dialog",
				role: "dialog",
				"aria-modal": "true",
				"aria-label": "选择迁移目标目录",
				onSubmit: function (event) {
					event.preventDefault();
					createManualPlan(migrationTarget);
				},
			},
				createElement("p", { className: "pcc-section-title" }, "迁移 " + migrationTarget.label),
				createElement("p", { className: "pcc-desc" },
					"请输入或浏览选择其他磁盘上的目标根目录；目录不存在时将在下一步自动创建。确认迁移后，插件会同步修改 " +
					migrationTarget.manualMigration.settingLabel + "（" + migrationTarget.manualMigration.configSource + "）。"),
				error ? createElement("p", { className: "pcc-error" }, error) : null,
				createElement("div", { className: "pcc-dev-target-row" },
					createElement("input", {
						className: "pcc-dev-target-input",
						type: "text",
						autoFocus: true,
						value: targetRoot,
						placeholder: "例如 D:\\DevCache",
						onChange: function (event) {
							setTargetRoot(event.target.value);
							setPreviewPath("");
						},
					}),
					createElement("button", {
						type: "button",
						className: "pcc-btn pcc-dev-preview-btn",
						disabled: browsing || Boolean(planningId),
						onClick: function () {
							browseTargetDirectory(migrationTarget);
						},
					}, browsing ? "正在打开…" : "浏览")),
				previewPath ? createElement("p", {
					className: "pcc-dev-preview-path",
					title: previewPath,
				}, "迁移后目录: " + previewPath) : null,
				createElement("div", { className: "pcc-dev-dialog-actions" },
					createElement("button", {
						type: "button",
						className: "pcc-btn",
						disabled: Boolean(planningId) || browsing,
						onClick: function () {
							setMigrationTarget(null);
							setPreviewPath("");
						},
					}, "取消"),
					createElement("button", {
						type: "submit",
						className: "pcc-btn pcc-btn-primary",
						disabled: !targetRoot.trim() || Boolean(planningId) || browsing,
					}, planningId ? "正在校验…" : "下一步")))));
	}

	return createElement("div", null, children);
}

export { DevEnvView, migrationPreviewPath };
