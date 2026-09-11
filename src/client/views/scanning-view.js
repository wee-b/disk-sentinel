/**
 * 扫描进行中视图：实时进度 + 取消按钮。
 *
 * @module @dsh-plugin/disk-sentinel/client/views/scanning-view
 */
import * as React from "react";
var useEffect = React.useEffect;
var createElement = React.createElement;
import { formatDuration } from "../format.js";
import { useAnimatedNumber } from "../hooks/use-animated-number.js";

/**
 * 扫描进行中视图：实时进度 + 取消按钮。
 *
 * @param {Object} props - {connection, status, onCancel, onRestart, onReadyToShowResult}。
 */
function ScanningView(props) {
	var status = props.status ?? {};
	var elapsed = status.elapsedMs ?? 0;
	var targetDirs = status.dirsScanned ?? 0;
	var dirsScanned = useAnimatedNumber(targetDirs);
	var cancelled = status.state === "cancelled";
	var cancelling = status.state === "cancelling";
	var driveLabel = cancelled
		? "扫描已取消"
		: cancelling
			? "正在取消扫描…"
			: status.driveCount > 1 && status.currentDrive
		? "正在扫描 " + status.currentDrive + "（第 " + status.driveIndex + "/" + status.driveCount + " 个盘符）"
		: status.state === "done"
			? "扫描完成"
			: "正在扫描…";

	useEffect(function () {
		if (status.state === "done" && dirsScanned >= targetDirs) {
			var timer = setTimeout(function () {
				props.onReadyToShowResult?.();
			}, 180);
			return function () {
				clearTimeout(timer);
			};
		}
	}, [status.state, dirsScanned, targetDirs, props.onReadyToShowResult]);

	return createElement("div", null,
		createElement("div", { className: "pcc-progress-card" },
			createElement("p", { className: "pcc-desc" },
				cancelled ? null : createElement("span", { className: "pcc-pulse" }),
				driveLabel),
			createElement("div", { className: "pcc-progress-num" },
				dirsScanned.toLocaleString()),
			createElement("p", { className: "pcc-section-title", style: { textAlign: "center" } },
				"已扫描目录数"),
			createElement("p", { className: "pcc-progress-path", title: status.currentPath ?? "" },
				status.currentPath ?? "正在建立目录索引…")),
		createElement("div", { className: "pcc-statrow" },
			createElement("div", { className: "pcc-stat" },
				createElement("div", { className: "pcc-stat-value" }, formatDuration(elapsed)),
				createElement("div", { className: "pcc-stat-label" }, "已用时")),
			createElement("div", { className: "pcc-stat" },
				createElement("div", { className: "pcc-stat-value" }, status.driveCount ?? "-" ),
				createElement("div", { className: "pcc-stat-label" }, "盘符总数"))
		),
		createElement("button", {
			className: cancelled ? "pcc-btn pcc-btn-primary" : "pcc-btn pcc-btn-danger",
			style: { width: "100%", marginTop: "14px" },
			disabled: cancelling,
			onClick: cancelled ? props.onRestart : props.onCancel,
		}, cancelled ? "重新开始" : cancelling ? "正在取消…" : "✕ 取消扫描")
	);
}

export { ScanningView };
