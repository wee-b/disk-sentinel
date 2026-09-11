/**
 * 平滑显示持续变化的数字。
 *
 * resetKey 变化时从 0 重新播放，适用于一次性加载完成的统计结果；不传时从当前
 * 显示值继续追赶目标，适用于扫描轮询进度。
 *
 * @module @dsh-plugin/disk-sentinel/client/hooks/use-animated-number
 */
import * as React from "react";
var useEffect = React.useEffect;
var useRef = React.useRef;
var useState = React.useState;

/**
 * @param {number} target - 后端当前真实值。
 * @param {string|number} [resetKey] - 变化时从 0 重新播放。
 * @returns {number}
 */
function useAnimatedNumber(target, resetKey) {
	var initial = resetKey === undefined && Number.isFinite(target) ? target : 0;
	var valueState = useState(initial);
	var value = valueState[0];
	var setValue = valueState[1];
	var valueRef = useRef(value);
	var frameRef = useRef(null);
	var resetKeyRef = useRef(resetKey);

	useEffect(function () {
		var shouldReset = resetKey !== undefined && resetKey !== resetKeyRef.current;
		resetKeyRef.current = resetKey;
		var from = shouldReset ? 0 : valueRef.current;
		var to = Number.isFinite(target) ? target : 0;
		if (shouldReset) {
			valueRef.current = 0;
			setValue(0);
		}
		if (to <= from) {
			valueRef.current = to;
			setValue(to);
			return;
		}

		if (frameRef.current) cancelAnimationFrame(frameRef.current);
		var started = performance.now();
		var duration = Math.min(900, Math.max(260, Math.log10(to - from + 10) * 210));

		function tick(now) {
			var progress = Math.min(1, (now - started) / duration);
			var eased = 1 - Math.pow(1 - progress, 3);
			var next = Math.round(from + (to - from) * eased);
			valueRef.current = next;
			setValue(next);
			if (progress < 1) {
				frameRef.current = requestAnimationFrame(tick);
			} else {
				frameRef.current = null;
			}
		}

		frameRef.current = requestAnimationFrame(tick);
		return function () {
			if (frameRef.current) {
				cancelAnimationFrame(frameRef.current);
				frameRef.current = null;
			}
		};
	}, [target, resetKey]);

	return value;
}

export { useAnimatedNumber };
