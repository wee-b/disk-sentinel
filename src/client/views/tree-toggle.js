/**
 * 目录树展开按钮。
 *
 * @module @dsh-plugin/disk-sentinel/client/views/tree-toggle
 */
import * as React from "react";
var createElement = React.createElement;

/**
 * @param {Object} props - {hasChildren, isOpen, label, onToggle}
 */
function TreeToggle(props) {
	var hasChildren = !!props.hasChildren;
	if (!hasChildren) {
		return createElement("span", {
			className: "pcc-tree-toggle pcc-tree-toggle-spacer",
			"aria-hidden": true,
		});
	}
	return createElement("button", {
		type: "button",
		className: "pcc-tree-toggle",
		"data-open": props.isOpen || undefined,
		"aria-label": props.label || (props.isOpen ? "收起目录" : "展开目录"),
		"aria-expanded": !!props.isOpen,
		onClick: function (event) {
			event.stopPropagation();
			if (props.onToggle) props.onToggle();
		},
	},
		createElement("svg", {
			viewBox: "0 0 16 16",
			width: "14",
			height: "14",
			"aria-hidden": true,
		},
			createElement("path", {
				d: "M6 4l4 4-4 4",
				fill: "none",
				stroke: "currentColor",
				strokeWidth: "1.8",
				strokeLinecap: "round",
				strokeLinejoin: "round",
			})));
}

export { TreeToggle };
