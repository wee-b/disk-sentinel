import assert from "node:assert/strict";
import {
	COMMON_ENV_VAR_BLACKLIST,
	isDevEnvVarBlacklisted,
} from "../lib/dev-env-var-blacklist.js";
import { isDevEnvKey } from "../lib/rpc/dev-env.js";

assert.ok(COMMON_ENV_VAR_BLACKLIST.includes("Path"));
assert.equal(isDevEnvVarBlacklisted("Path"), true);
assert.equal(isDevEnvVarBlacklisted("PATH"), true);
assert.equal(isDevEnvVarBlacklisted("SystemRoot"), true);
assert.equal(isDevEnvVarBlacklisted("ProgramFiles(x86)"), true);
assert.equal(isDevEnvVarBlacklisted("JAVA_HOME"), false);
assert.equal(isDevEnvVarBlacklisted("CUDA_PATH"), false);

assert.equal(isDevEnvKey("Path"), false);
assert.equal(isDevEnvKey("PATH"), false);
assert.equal(isDevEnvKey("JAVA_HOME"), true);
assert.equal(isDevEnvKey("GRADLE_USER_HOME"), true);
assert.equal(isDevEnvKey("CUDA_PATH"), true);

console.log("dev environment variable blacklist tests passed");
