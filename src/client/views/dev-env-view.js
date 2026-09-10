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

/** 路径是否在 C 盘。 */
function isOnCDrive(path) {
	return /^c:[\\/]/i.test(path ?? "");
}

/**
 * 开发环境分析视图。
 *
 * @param {Object} props - {connection}。
 */
function DevEnvView(props) {
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

	var envVars = (scan?.envVars ?? []).filter(function (e) {
		return e.defined;
	});
	var knownDirs = scan?.knownDirs ?? [];
	var cDirs = knownDirs.filter(function (d) {
		return d.exists && isOnCDrive(d.path);
	});

	var children = [];
	children.push(createElement("div", { className: "pcc-hero", key: "hero" },
		createElement("p", { className: "pcc-section-title" }, "开发环境分析"),
		createElement("p", { className: "pcc-desc" },
			"扫描常见开发环境变量和用户目录下的开发缓存位置，先找出哪些工具链、仓库和缓存正在占用 C 盘。")));

	children.push(createElement("button", {
		key: "scan",
		className: "pcc-btn pcc-btn-primary",
		style: { width: "100%", padding: "10px 0" },
		disabled: loading,
		onClick: function () {
			load(true);
		},
	}, loading ? "正在读取开发环境分析…" : scan ? "重新扫描开发环境" : "扫描开发环境"));

	if (error) {
		children.push(createElement("p", { className: "pcc-error", key: "err" }, "⚠ " + error));
	}
	if (loading && !scan && !error) {
		children.push(createElement("p", { key: "loading", className: "pcc-desc" },
			"正在读取环境变量并统计常见开发缓存目录…"));
	}

	if (scan) {
		children.push(createElement("div", { key: "summary", className: "pcc-statrow" },
			createElement("div", { className: "pcc-stat" },
				createElement("div", { className: "pcc-stat-value" }, envVars.length),
				createElement("div", { className: "pcc-stat-label" }, "已配置环境变量")),
			createElement("div", { className: "pcc-stat" },
				createElement("div", { className: "pcc-stat-value" }, formatBytes(scan.totalKnownBytes ?? 0)),
				createElement("div", { className: "pcc-stat-label" }, "常见开发目录体积")),
			createElement("div", { className: "pcc-stat" },
				createElement("div", { className: "pcc-stat-value" }, cDirs.length),
				createElement("div", { className: "pcc-stat-label" }, "位于 C 盘的目录"))));

		var scannedAt = scan.createdAt ? new Date(scan.createdAt).toLocaleString() : "-";
		children.push(createElement("p", { key: "meta", className: "pcc-desc" },
			"扫描时间: " + scannedAt +
			" · " + (scan.fromCache ? "读取缓存" : "刚刚扫描") +
			" · 扫描耗时 " + formatDuration(scan.durationMs ?? 0)));
		children.push(createElement("p", { key: "path-meta", className: "pcc-desc" },
			"用户目录: " + (scan.userProfile || "-")));

		children.push(createElement("p", { key: "env-title", className: "pcc-section-title", style: { marginTop: "10px" } },
			"环境变量"));
		if (envVars.length === 0) {
			children.push(createElement("p", { key: "env-empty", className: "pcc-desc" },
				"未发现常见开发环境变量。"));
		} else {
			envVars.forEach(function (e) {
				var meta = e.exists
					? (e.isDirectory ? "目录存在" : e.isFile ? "文件存在" : "路径存在")
					: "路径未找到";
				children.push(createElement("div", { key: "env-" + e.key, className: "pcc-env-item" },
					createElement("div", { className: "pcc-env-main" },
						createElement("span", { className: "pcc-env-name" }, e.key),
						createElement("span", { className: "pcc-env-label" }, e.label)),
					createElement("div", { className: "pcc-env-path", title: e.value }, e.value || "-"),
					createElement("span", {
						className: "pcc-badge",
						"data-warn": !e.exists || undefined,
					}, meta)));
			});
		}

		children.push(createElement("p", { key: "dirs-title", className: "pcc-section-title", style: { marginTop: "14px" } },
			"用户目录 / AppData 开发缓存"));
		if (knownDirs.length === 0) {
			children.push(createElement("p", { key: "dirs-empty", className: "pcc-desc" },
				"未发现常见开发缓存目录。"));
		} else {
			knownDirs.forEach(function (d) {
				var cDrive = isOnCDrive(d.path);
				var meta = d.exists
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
					createElement("div", { className: "pcc-devdir-path", title: d.path }, d.path),
					createElement("div", { className: "pcc-devdir-foot" },
						createElement("span", null, meta),
						cDrive && d.exists ? createElement("span", { className: "pcc-badge" }, "C 盘") : null)));
			});
		}
	}

	return createElement("div", null, children);
}

export { DevEnvView };
