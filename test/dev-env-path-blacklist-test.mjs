import assert from "node:assert/strict";
import {
	isDevEnvPathBlacklisted,
	listCommonPathBlacklist,
} from "../lib/dev-env-path-blacklist.js";

const env = {
	SystemDrive: "C:",
	SystemRoot: "C:\\Windows",
	ProgramFiles: "C:\\Program Files",
	"ProgramFiles(x86)": "C:\\Program Files (x86)",
	ProgramData: "C:\\ProgramData",
	LOCALAPPDATA: "C:\\Users\\demo\\AppData\\Local",
};

assert.equal(isDevEnvPathBlacklisted("C:\\Windows", env), true);
assert.equal(isDevEnvPathBlacklisted("c:\\windows\\System32", env), true);
assert.equal(isDevEnvPathBlacklisted("C:\\Program Files\\Git\\cmd", env), true);
assert.equal(isDevEnvPathBlacklisted("E:\\Program Files\\Android\\Sdk", env), true);
assert.equal(isDevEnvPathBlacklisted("C:\\Program Files (x86)\\Tool", env), true);
assert.equal(isDevEnvPathBlacklisted("C:\\ProgramData\\Package Cache", env), true);
assert.equal(isDevEnvPathBlacklisted("C:\\Users\\demo\\AppData\\Local\\Microsoft\\WindowsApps", env), true);
assert.equal(isDevEnvPathBlacklisted("C:\\", env), true);
assert.equal(isDevEnvPathBlacklisted("D:\\System Volume Information", env), true);
assert.equal(isDevEnvPathBlacklisted("C:\\Users\\demo\\.m2", env), false);
assert.equal(isDevEnvPathBlacklisted("D:\\DevCache", env), false);
assert.equal(listCommonPathBlacklist(env).length, 5);

console.log("dev environment path blacklist tests passed");
