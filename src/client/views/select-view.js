/**
 * 选择视图：盘符列表（含"整个硬盘"）+ 开始分析按钮 + 历史分析列表 +
 * 清理方案列表 + 历史差量列表 + 差量对比勾选。
 *
 * @module @dsh-plugin/disk-sentinel/client/views/select-view
 */
import * as React from "react";
var useState = React.useState;
var useEffect = React.useEffect;
var createElement = React.createElement;
import { rpcCall } from "../rpc.js";
import { formatBytes, formatDuration } from "../format.js";

/**
 * 选择视图：盘符列表（含"整个硬盘"）+ 开始分析按钮 + 历史分析列表。
 *
 * @param {Object} props - {connection, onStart, onViewReport, onViewPlan, onViewDiff, onDiff}。
 */
function SelectView(props) {
	var connection = props.connection;
	var onStart = props.onStart;
	var onViewReport = props.onViewReport;
	var onViewPlan = props.onViewPlan;
	var onViewDiff = props.onViewDiff;
	var onDiff = props.onDiff;
	var driveState = useState(null);
	var drives = driveState[0];
	var setDrives = driveState[1];
	var errorState = useState(null);
	var error = errorState[0];
	var setError = errorState[1];
	var selectedState = useState(null);
	var selected = selectedState[0];
	var setSelected = selectedState[1];
	var historyState = useState(null);
	var history = historyState[0];
	var setHistory = historyState[1];
	var plansState = useState(null);
	var plans = plansState[0];
	var setPlans = plansState[1];
	// 历史差量列表（report/diff 生成时自动持久化，可随时回看）
	var diffsState = useState(null);
	var diffs = diffsState[0];
	var setDiffs = diffsState[1];
	// 差量对比基准：第一份报告点击「对比」选中，第二份触发对比
	var diffPickedState = useState([]);
	var diffPicked = diffPickedState[0];
	var setDiffPicked = diffPickedState[1];

	useEffect(function () {
		var cancelled = false;
		rpcCall(connection, "drives")
			.then(function (value) {
				if (!cancelled) setDrives(value.drives ?? []);
			})
			.catch(function (err) {
				if (!cancelled) setError(err.message ?? String(err));
			});
		// 历史分析列表：进入页面即展示，可查看 / 手动删除
		rpcCall(connection, "report/list")
			.then(function (value) {
				if (!cancelled) setHistory(value.reports ?? []);
			})
			.catch(function () {
				if (!cancelled) setHistory([]);
			});
		// 清理方案列表（AI 分析产物 .md）：可查看 / 手动删除。
		// 宿主运行旧版插件（无 plan/* 端点）时报「未知端点」—— 不静默，
		// 明确提示重启，否则方案区块会无声消失让用户误以为功能丢失。
		rpcCall(connection, "plan/list")
			.then(function (value) {
				if (!cancelled) setPlans(value.plans ?? []);
			})
			.catch(function (err) {
				if (!cancelled) {
					setPlans([]);
					setError("清理方案列表加载失败（宿主可能仍在运行旧版插件，请重启 DSH 加载 plan 端点）: " +
						(err.message ?? String(err)));
				}
			});
		// 历史差量列表（report/diff 生成时自动持久化）：可查看 / 手动删除。
		// 旧版宿主无 diff/* 端点时报「未知端点」—— 同 plan/list 不静默，明确提示重启
		rpcCall(connection, "diff/list")
			.then(function (value) {
				if (!cancelled) setDiffs(value.diffs ?? []);
			})
			.catch(function (err) {
				if (!cancelled) {
					setDiffs([]);
					setError("历史差量列表加载失败（宿主可能仍在运行旧版插件，请重启 DSH 加载 diff 端点）: " +
						(err.message ?? String(err)));
				}
			});
		return function () {
			cancelled = true;
		};
	}, [connection]);

	/** 删除一份历史报告（.md 与 .json 成对删除）。 */
	function handleDeleteReport(file) {
		rpcCall(connection, "report/delete", { file: file })
			.then(function () {
				setHistory(function (list) {
					return (list ?? []).filter(function (r) {
						return r.file !== file;
					});
				});
			})
			.catch(function (err) {
				setError(err.message ?? String(err));
			});
	}

	/** 删除一份清理方案（仅 .md）。 */
	function handleDeletePlan(file) {
		rpcCall(connection, "plan/delete", { file: file })
			.then(function () {
				setPlans(function (list) {
					return (list ?? []).filter(function (p) {
						return p.file !== file;
					});
				});
			})
			.catch(function (err) {
				setError(err.message ?? String(err));
			});
	}

	/** 用系统默认关联程序打开清理方案 .md。 */
	function handleOpenPlan(file) {
		rpcCall(connection, "plan/open", { file: file })
			.catch(function (err) {
				setError(err.message ?? String(err));
			});
	}

	/** 删除一份历史差量（摘要与明细成对删除）。 */
	function handleDeleteDiff(file) {
		rpcCall(connection, "diff/delete", { file: file })
			.then(function () {
				setDiffs(function (list) {
					return (list ?? []).filter(function (d) {
						return d.file !== file;
					});
			});
		})
			.catch(function (err) {
				setError(err.message ?? String(err));
		});
	}

	/** 勾选/取消勾选差量对比报告（最多 2 份，选满后再点新报告替换最早一份）。 */
	function handleTogglePick(file) {
		setDiffPicked(function (prev) {
			var list = prev ?? [];
			if (list.indexOf(file) >= 0) {
				return list.filter(function (f) { return f !== file; });
			}
			if (list.length >= 2) list = list.slice(1);
			return list.concat([file]);
		});
	}

	/** 用已勾选的两份报告生成差量报告（顺序无关，后端自动定向早者为基准）。 */
	function handleDiffGo() {
		if ((diffPicked ?? []).length === 2 && onDiff) {
			onDiff(diffPicked[0], diffPicked[1]);
			setDiffPicked([]);
		}
	}

	var children = [];

	children.push(
		createElement("div", { className: "pcc-hero", key: "hero" },
			createElement("p", { className: "pcc-section-title" }, "磁盘空间诊断"),
			createElement("p", { className: "pcc-desc" },
				"选择扫描范围后，插件会在后台完成 WinDirStat 式统计；报告会保存到工作区，随后可直接交给 AI 生成清理方案。"))
	);

	if (error) {
		children.push(createElement("p", { className: "pcc-error", key: "err" }, "⚠ " + error));
	}

	if (drives === null && !error) {
		children.push(createElement("p", { key: "loading", className: "pcc-desc" }, "正在读取盘符列表…"));
	}

	if (drives !== null) {
		var totalBytes = drives.reduce(function (sum, d) {
			return sum + (d.totalBytes ?? 0);
		}, 0);
		var freeBytes = drives.reduce(function (sum, d) {
			return sum + (d.freeBytes ?? 0);
		}, 0);
		var usedPctAll = totalBytes > 0 ? Math.round(((totalBytes - freeBytes) / totalBytes) * 100) : 0;
		children.push(createElement("div", { key: "drive-summary", className: "pcc-statrow" },
			createElement("div", { className: "pcc-stat" },
				createElement("div", { className: "pcc-stat-value" }, drives.length),
				createElement("div", { className: "pcc-stat-label" }, "可扫描盘符")),
			createElement("div", { className: "pcc-stat" },
				createElement("div", { className: "pcc-stat-value" }, formatBytes(freeBytes)),
				createElement("div", { className: "pcc-stat-label" }, "当前剩余空间"))));
		children.push(createElement("p", { key: "target-title", className: "pcc-section-title" }, "扫描目标"));
		// 「整个硬盘」选项
		children.push(
			createElement("div", {
				key: "all",
				className: "pcc-drive",
				"data-selected": selected === "all" || undefined,
				onClick: function () {
					setSelected("all");
				},
			},
				createElement("span", { className: "pcc-drive-label" }, "💽 整个硬盘"),
				createElement("div", { className: "pcc-capbar" },
					createElement("div", { className: "pcc-capbar-used", style: { width: usedPctAll + "%" } })
				),
				createElement("span", { className: "pcc-drive-meta" },
					"已用 " + usedPctAll + "% · 共 " + formatBytes(totalBytes) + " · 剩余 " + formatBytes(freeBytes))
			)
		);
		drives.forEach(function (d) {
			var usedPct = d.totalBytes > 0 ? Math.round(((d.totalBytes - d.freeBytes) / d.totalBytes) * 100) : 0;
			children.push(
				createElement("div", {
					key: d.drive,
					className: "pcc-drive",
					"data-selected": selected === d.drive || undefined,
					onClick: function () {
						setSelected(d.drive);
					},
				},
					createElement("span", { className: "pcc-drive-label" }, "🖴 " + d.drive + "\\"),
					createElement("div", { className: "pcc-capbar" },
						createElement("div", { className: "pcc-capbar-used", style: { width: usedPct + "%" } })
					),
					createElement("span", { className: "pcc-drive-meta" },
						"已用 " + formatBytes(d.totalBytes - d.freeBytes) +
						" / " + formatBytes(d.totalBytes) + "（剩余 " + formatBytes(d.freeBytes) + "）")
				)
			);
		});
	}

	children.push(
		createElement("button", {
			key: "start",
			className: "pcc-btn pcc-btn-primary",
			style: { width: "100%", padding: "10px 0", marginTop: "6px" },
			disabled: selected === null,
			onClick: function () {
				if (selected !== null) onStart(selected);
			},
		}, selected === null ? "请先选择分析目标" : "🚀 开始分析" + (selected === "all" ? "整个硬盘" : " " + selected + " 盘"))
	);

	// 历史分析列表：点进页面即可看到过往分析结果，可查看 / 勾选两份生成差量报告 / 手动删除
	if (history !== null && history.length > 0) {
		children.push(createElement("p", { key: "hist-title", className: "pcc-section-title", style: { marginTop: "14px" } },
			"🕘 历史分析（" + history.length + " 份）"));
		var pickedCount = (diffPicked ?? []).length;
		var diffable = (history ?? []).filter(function (r) {
			return !r.legacy && r.hasDirs;
		}).length;
		if (diffable >= 2) {
			children.push(createElement("p", { key: "diff-hint", className: "pcc-desc" },
				pickedCount > 0
					? "⚖ 已选 " + pickedCount + "/2 份，选满两份即可生成差量报告（点已选中的圆圈可取消）"
					: "⚖ 勾选两份报告可生成差量报告，查看两次扫描之间是什么占用了空间（无需重新扫描）"));
		} else if (diffable === 1 && (history ?? []).length > 1) {
			children.push(createElement("p", { key: "diff-hint", className: "pcc-desc" },
				"⚠ 仅 1 份报告有全量目录明细（新版扫描生成），再做一次扫描后即可使用差量对比"));
		}
		history.forEach(function (r) {
			var scanned = (r.driveStats ?? []).reduce(function (sum, d) {
				return sum + (d.scannedBytes ?? 0);
			}, 0);
			var target = (r.target ?? []).join("、") || "-";
			var when = r.createdAt ? new Date(r.createdAt).toLocaleString() : (r.name ?? r.file);
			var meta = r.legacy
				? when + " · 旧格式报告（升级前生成，无结构化数据，仅支持删除）"
				: when + " · " + target + " · " + formatBytes(scanned) + " · " + formatDuration(r.durationMs ?? 0);
			var isPicked = (diffPicked ?? []).indexOf(r.file) >= 0;
			children.push(
				createElement("div", {
					key: "hist-" + r.file,
					className: "pcc-history-item",
					"data-diff-base": isPicked || undefined,
				},
					!r.legacy && r.hasDirs ? createElement("button", {
						className: "pcc-pick",
						"data-on": isPicked || undefined,
						title: isPicked ? "取消勾选" : "勾选参与差量对比",
						onClick: function () {
							handleTogglePick(r.file);
						},
					}, isPicked ? "✓" : "") : null,
					createElement("span", { className: "pcc-history-meta", title: meta }, meta),
					r.legacy ? null : createElement("button", {
						className: "pcc-history-btn",
						onClick: function () {
							if (onViewReport) onViewReport(r.file);
						},
					}, "查看"),
					createElement("button", {
						className: "pcc-history-btn",
						"data-danger": true,
						onClick: function () {
							handleDeleteReport(r.file);
						},
					}, "删除")
				)
			);
		});
		// 选满两份 → 生成差量报告（纯历史数据对比，不重新扫描）
		if (pickedCount === 2) {
			children.push(createElement("button", {
				key: "diff-go",
				className: "pcc-btn pcc-btn-primary",
				style: { width: "100%", marginTop: "6px" },
				onClick: handleDiffGo,
			}, "⚖ 生成差量报告（对比两次扫描的变化）"));
		}
	}

	// 历史差量列表：report/diff 生成时自动持久化（摘要 + 变化明细两件套），
	// 可随时回看 —— 即使源扫描报告已被删除，差量数据依然完整
	if (diffs !== null && diffs.length > 0) {
		children.push(createElement("p", { key: "diffs-title", className: "pcc-section-title", style: { marginTop: "14px" } },
			"⚖ 历史差量（" + diffs.length + " 份）"));
		diffs.forEach(function (d) {
			var when = d.createdAt ? new Date(d.createdAt).toLocaleString() : (d.name ?? d.file);
			var pair = (d.base?.name ?? "?") + " → " + (d.target?.name ?? "?");
			var meta = when + " · " + pair +
				" · " + (d.changesCount ?? 0).toLocaleString() + " 个变化目录";
			children.push(
				createElement("div", { key: "diff-" + d.file, className: "pcc-history-item" },
					createElement("span", { className: "pcc-history-meta", title: meta }, meta),
					createElement("button", {
						className: "pcc-history-btn",
						onClick: function () {
							if (onViewDiff) onViewDiff(d.file);
						},
					}, "查看"),
					createElement("button", {
						className: "pcc-history-btn",
						"data-danger": true,
						onClick: function () {
							handleDeleteDiff(d.file);
						},
					}, "删除")
				)
			);
		});
	}

	// 清理方案列表：AI 分析生成的「磁盘清理方案-*.md」，可查看 / 手动删除
	if (plans !== null && plans.length > 0) {
		children.push(createElement("p", { key: "plan-title", className: "pcc-section-title", style: { marginTop: "14px" } },
			"📋 清理方案（" + plans.length + " 份）"));
		plans.forEach(function (p) {
			var when = p.createdAt ? new Date(p.createdAt).toLocaleString() : (p.name ?? p.file);
			children.push(
				createElement("div", { key: "plan-" + p.file, className: "pcc-history-item" },
					createElement("span", { className: "pcc-history-meta", title: when }, when),
					createElement("button", {
						className: "pcc-history-btn",
						onClick: function () {
							if (onViewPlan) onViewPlan(p.file);
						},
					}, "查看"),
					createElement("button", {
						className: "pcc-history-btn",
						onClick: function () {
							handleOpenPlan(p.file);
						},
					}, "打开"),
					createElement("button", {
						className: "pcc-history-btn",
						"data-danger": true,
						onClick: function () {
							handleDeletePlan(p.file);
						},
					}, "删除")
				)
			);
		});
	}

	return createElement("div", null, children);
}

export { SelectView };
