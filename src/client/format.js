/**
 * 展示格式化工具（浏览器侧）。
 *
 * @module @dsh-plugin/disk-sentinel/client/format
 */

/** 字节数 → 人类可读。 */
function formatBytes(bytes) {
	if (!Number.isFinite(bytes) || bytes < 0) return "-";
	if (bytes < 1024) return bytes + " B";
	var units = ["KB", "MB", "GB", "TB", "PB"];
	var value = bytes / 1024;
	var i = 0;
	while (value >= 1024 && i < units.length - 1) {
		value /= 1024;
		i++;
	}
	return value.toFixed(value >= 100 ? 0 : value >= 10 ? 1 : 2) + " " + units[i];
}

/** 时间戳 → 本地日期字符串。 */
function formatDate(ts) {
	if (!ts) return "-";
	try {
		return new Date(ts).toLocaleDateString();
	} catch {
		return "-";
	}
}

/** 秒 → "x 分 y 秒"。 */
function formatDuration(ms) {
	var s = Math.round(ms / 1000);
	if (s < 60) return s + " 秒";
	return Math.floor(s / 60) + " 分 " + (s % 60) + " 秒";
}

/** 盘根路径判断（如 "C:\"）。 */
function isRootPath(p) {
	return /^[A-Za-z]:\\?$/.test(p);
}

/** 路径 basename（"C:\\Users\\bin" → "bin"；根 → "C:\"）。 */
function baseName(p) {
	if (isRootPath(p)) return p;
	var cut = p.lastIndexOf("\\");
	return cut >= 0 ? p.slice(cut + 1) : p;
}

export { formatBytes, formatDate, formatDuration, isRootPath, baseName };
