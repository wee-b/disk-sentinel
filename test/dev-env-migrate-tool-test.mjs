import assert from "node:assert/strict";
import { formatMigrationResult } from "../lib/tools/dev-env-migrate.js";

const planId = "d80cb1a5-364c-4cbe-b83f-c8f4823a72b5";
const rendered = formatMigrationResult({
	mode: "plan",
	planId,
	label: "Yarn 缓存",
	sourcePath: "C:\\Users\\bin\\AppData\\Local\\Yarn\\Cache",
	destinationPath: "E:\\cache\\yarn-cache",
	backupPath: "C:\\cache.disk-sentinel-backup-20260911084425-2604278c",
	method: "junction",
	sizeBytes: 0,
	envKeys: [],
});

assert.match(rendered, new RegExp("计划 ID: " + planId));
assert.doesNotMatch(rendered, /计划 ID: 20260911084425-2604278c/);

console.log("dev environment migrate tool tests passed");
