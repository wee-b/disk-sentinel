import assert from "node:assert/strict";
import {
	devEnvJobSnapshot,
	startDevEnvScanJob,
} from "../lib/rpc/dev-env-scan-job.js";

const fakeResult = { createdAt: Date.now(), knownDirs: [], envPathGroups: [] };
const started = startDevEnvScanJob(true, {
	scan: async function (options) {
		options.onProgress({ fileDelta: 12, dirDelta: 3, pathsScanned: 0, currentPath: "C:\\dev" });
		await Promise.resolve();
		options.onProgress({ fileDelta: 8, dirDelta: 2, pathsScanned: 1, currentPath: "C:\\dev\\cache" });
		return fakeResult;
	},
});
assert.equal(started.started, true);
assert.equal(startDevEnvScanJob(false).started, false);

for (let index = 0; index < 20 && devEnvJobSnapshot().state === "running"; index++) {
	await new Promise((resolve) => setImmediate(resolve));
}

const snapshot = devEnvJobSnapshot();
assert.equal(snapshot.state, "done");
assert.equal(snapshot.filesScanned, 20);
assert.equal(snapshot.dirsScanned, 5);
assert.equal(snapshot.pathsScanned, 1);
assert.equal(snapshot.currentPath, "C:\\dev\\cache");
assert.equal(snapshot.result, fakeResult);

console.log("dev environment scan job tests passed");
