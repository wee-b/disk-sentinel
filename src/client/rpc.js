/**
 * 浏览器 → 宿主 RPC 调用封装。
 *
 * @module @dsh-plugin/disk-sentinel/client/rpc
 */

/** RPC 逻辑通道名（须与宿主侧 lib/rpc/index.js 的 CHANNEL 一致）。 */
var CHANNEL = "/disk-sentinel";

/**
 * 调用宿主 RPC 端点。
 *
 * @param {Object} connection - ctx.connection。
 * @param {string} endpoint   - 端点名（如 "drives"）。
 * @param {*} [payload]       - 请求负载。
 * @returns {Promise<*>} 成功时的 value；失败时抛出 Error。
 */
async function rpcCall(connection, endpoint, payload) {
	var result = await connection.rpc.call(CHANNEL, endpoint, payload ?? {});
	if (result && result.ok) return result.value;
	var message = result && result.error ? result.error.message : "unknown error";
	throw new Error(message);
}

export { CHANNEL, rpcCall };
