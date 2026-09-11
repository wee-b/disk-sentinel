/** 开发工具持久配置文件的最小、安全更新器。 */
function escapeRegExp(value) {
	return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function escapeXmlText(value) {
	return String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function escapeXmlAttribute(value) {
	return escapeXmlText(value).replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}

function activeXmlMatch(source, regex) {
	for (const match of source.matchAll(regex)) {
		const before = source.slice(0, match.index);
		if (before.lastIndexOf("<!--") <= before.lastIndexOf("-->")) return match;
	}
	return null;
}

function replaceMatch(source, match, replacement) {
	return source.slice(0, match.index) + replacement + source.slice(match.index + match[0].length);
}

function decodeXml(value) {
	return String(value)
		.replace(/&quot;/gi, "\"")
		.replace(/&apos;/gi, "'")
		.replace(/&lt;/gi, "<")
		.replace(/&gt;/gi, ">")
		.replace(/&amp;/gi, "&");
}

function readConfigValue(content, format, key) {
	const source = String(content ?? "");
	if (format === "key-value") {
		const match = source.match(new RegExp("^\\s*" + escapeRegExp(key) + "\\s*=\\s*(.*?)\\s*$", "im"));
		return match ? match[1].replace(/^([\"'])(.*)\1$/, "$2") : "";
	}
	if (format === "yarn-v1") {
		const match = source.match(/^\s*cache-folder\s+(.+?)\s*$/im);
		return match ? match[1].replace(/^([\"'])(.*)\1$/, "$2") : "";
	}
	if (format === "yarn-yaml") {
		const match = source.match(/^\s*cacheFolder\s*:\s*(.*?)\s*$/im);
		if (!match) return "";
		try {
			return JSON.parse(match[1]);
		} catch {
			return match[1].replace(/^([\"'])(.*)\1$/, "$2");
		}
	}
	if (format === "maven-settings") {
		const match = activeXmlMatch(source, /<localRepository(?:\s[^>]*)?>([\s\S]*?)<\/localRepository\s*>/gi);
		return match ? decodeXml(match[1].trim()) : "";
	}
	if (format === "nuget-config") {
		const match = activeXmlMatch(source, /<add\s+[^>]*key\s*=\s*["']globalPackagesFolder["'][^>]*\/?\s*>/gi);
		if (!match) return "";
		const value = match[0].match(/\bvalue\s*=\s*(["'])(.*?)\1/i);
		return value ? decodeXml(value[2]) : "";
	}
	throw new Error("不支持的配置文件格式: " + format);
}

function updateConfigContent(content, format, key, destination) {
	const source = String(content ?? "");
	const lineBreak = source.includes("\r\n") ? "\r\n" : "\n";
	if (format === "key-value") {
		const line = new RegExp("^(\\s*" + escapeRegExp(key) + "\\s*=).*$", "im");
		if (line.test(source)) return source.replace(line, (_, prefix) => prefix + destination);
		return source + (source && !source.endsWith("\n") ? lineBreak : "") + key + "=" + destination + lineBreak;
	}
	if (format === "yarn-v1") {
		const line = /^\s*cache-folder\s+.*$/im;
		const next = "cache-folder \"" + destination.replace(/"/g, "\\\"") + "\"";
		if (line.test(source)) return source.replace(line, next);
		return source + (source && !source.endsWith("\n") ? lineBreak : "") + next + lineBreak;
	}
	if (format === "yarn-yaml") {
		const line = /^\s*cacheFolder\s*:.*$/im;
		const next = "cacheFolder: " + JSON.stringify(destination);
		if (line.test(source)) return source.replace(line, next);
		return source + (source && !source.endsWith("\n") ? lineBreak : "") + next + lineBreak;
	}
	if (format === "maven-settings") {
		if (!/<settings(?:\s|>)/i.test(source) || !/<\/settings\s*>/i.test(source)) {
			throw new Error("Maven settings.xml 结构无效");
		}
		const value = escapeXmlText(destination);
		const node = activeXmlMatch(source, /<localRepository(?:\s[^>]*)?>[\s\S]*?<\/localRepository\s*>/gi);
		if (node) return replaceMatch(source, node, "<localRepository>" + value + "</localRepository>");
		return source.replace(/<\/settings\s*>/i, "  <localRepository>" + value + "</localRepository>" + lineBreak + "</settings>");
	}
	if (format === "nuget-config") {
		if (!/<configuration(?:\s|>)/i.test(source) || !/<\/configuration\s*>/i.test(source)) {
			throw new Error("NuGet.Config 结构无效");
		}
		const value = escapeXmlAttribute(destination);
		const add = activeXmlMatch(source, /<add\s+[^>]*key\s*=\s*["']globalPackagesFolder["'][^>]*\/?\s*>/gi);
		if (add) {
			const next = (() => {
				const tag = add[0];
				if (/\bvalue\s*=\s*["'][^"']*["']/i.test(tag)) {
					return tag.replace(/\bvalue\s*=\s*(["'])[^"']*\1/i, "value=\"" + value + "\"");
				}
				return tag.replace(/\s*\/?\s*>$/, " value=\"" + value + "\" />");
			})();
			return replaceMatch(source, add, next);
		}
		const entry = "    <add key=\"globalPackagesFolder\" value=\"" + value + "\" />";
		if (/<config(?:\s|>)[\s\S]*?<\/config\s*>/i.test(source)) {
			return source.replace(/<\/config\s*>/i, entry + lineBreak + "  </config>");
		}
		return source.replace(/<\/configuration\s*>/i,
			"  <config>" + lineBreak + entry + lineBreak + "  </config>" + lineBreak + "</configuration>");
	}
	throw new Error("不支持的配置文件格式: " + format);
}

export { readConfigValue, updateConfigContent };
