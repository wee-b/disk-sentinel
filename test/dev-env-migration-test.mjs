import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { lstat, mkdir, mkdtemp, readFile, rm, stat, unlink, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { readConfigValue } from "../lib/dev-env-config.js";
import { compareDriveGroups, measurePath } from "../lib/rpc/dev-env.js";
import {
	createMigrationPlan,
	executeMigrationPlan,
	ensureTargetRoot,
	renderDevEnvMigrationReport,
	updateConfigContent,
} from "../lib/dev-env-migration.js";
import {
	getManualMigrationRule,
	resolveConfigCandidatePath,
	resolveManualMigration,
} from "../lib/dev-env-migration-rules.js";

assert.ok(getManualMigrationRule("maven_repo"));
assert.equal(getManualMigrationRule("docker_local"), null);
assert.equal(getManualMigrationRule("cargo").envKeys[0], "CARGO_HOME");
assert.deepEqual(
	[{ drive: "网络路径" }, { drive: "F:" }, { drive: "C:" }, { drive: "E:" }, { drive: "D:" }]
		.sort(compareDriveGroups)
		.map((item) => item.drive),
	["C:", "D:", "E:", "F:", "网络路径"]
);

assert.equal(updateConfigContent("registry=x\r\n", "key-value", "cache", "D:\\Cache"),
	"registry=x\r\ncache=D:\\Cache\r\n");
assert.match(updateConfigContent("cache-folder \"C:\\Old\"\n", "yarn-v1", "cache-folder", "D:\\Cache"),
	/cache-folder "D:\\Cache"/);
assert.match(updateConfigContent("<settings></settings>", "maven-settings", "localRepository", "D:\\Maven"),
	/<localRepository>D:\\Maven<\/localRepository>/);
const mavenWithExample = "<settings><!-- <localRepository>C:\\Example</localRepository> -->" +
	"<localRepository>C:\\Active</localRepository></settings>";
const updatedMaven = updateConfigContent(mavenWithExample, "maven-settings", "localRepository", "D:\\Maven");
assert.match(updatedMaven, /<!-- <localRepository>C:\\Example<\/localRepository> -->/);
assert.equal(readConfigValue(updatedMaven, "maven-settings", "localRepository"), "D:\\Maven");
assert.match(updateConfigContent("<configuration></configuration>", "nuget-config", "globalPackagesFolder", "D:\\NuGet"),
	/globalPackagesFolder/);

const report = renderDevEnvMigrationReport({
	createdAt: Date.now(),
	envPathCount: 1,
	envPathGroups: [{
		drive: "C:",
		paths: [{ path: "C:\\Dev\\cache", sizeBytes: 1024, envKeys: ["DEV_CACHE"] }],
	}],
	knownDirs: [{
		id: "custom",
		label: "自定义缓存",
		path: "C:\\Dev\\cache",
		sizeBytes: 1024,
		exists: true,
		manualMigration: null,
	}],
});
assert.match(report, /仅 AI/);
assert.match(report, /dev_env_migrate/);

const protectedReport = renderDevEnvMigrationReport({
	createdAt: Date.now(),
	envPathCount: 1,
	envPathGroups: [{
		drive: "C:",
		paths: [{ path: process.env.WINDIR, sizeBytes: 1, envKeys: ["Path"] }],
	}],
	knownDirs: [],
});
assert.match(protectedReport, /禁止迁移/);

const source = await mkdtemp(join(tmpdir(), "disk-sentinel-migration-source-"));
const configSource = await mkdtemp(join(tmpdir(), "disk-sentinel-config-source-"));
const configFile = join(tmpdir(), "disk-sentinel-config-" + randomUUID() + ".rc");
const destinationRoot = join(process.cwd(), ".disk-sentinel-migration-test-" + randomUUID());
const destination = join(destinationRoot, "cache");
await assert.rejects(stat(destinationRoot), { code: "ENOENT" });
await ensureTargetRoot(destinationRoot);
assert.equal((await stat(destinationRoot)).isDirectory(), true);
await mkdir(join(source, "nested"));
await writeFile(join(source, "nested", "sample.txt"), "migration-check", "utf8");
await writeFile(join(configSource, "package.bin"), "config-migration", "utf8");
await writeFile(configFile, "cache=D:\\AlreadyMoved\r\n", "utf8");

try {
	const scan = {
		envPathGroups: [{
			drive: "C:",
			paths: [{
				path: source,
				exists: true,
				isDirectory: true,
				envKeys: ["TEST_DEV_CACHE"],
				labels: ["测试缓存"],
			}],
		}],
		knownDirs: [],
	};
	const plan = await createMigrationPlan(scan, {
		origin: "ai",
		label: "测试缓存",
		sourcePath: source,
		destinationPath: destination,
		method: "junction",
		reason: "验证跨盘复制、校验、备份和目录联接",
	});
	assert.equal(plan.origin, "ai");
	assert.equal(plan.method, "junction");
	assert.ok(plan.planId);

	process.env.TEST_DEV_CACHE = source;
	const envPlan = await createMigrationPlan(scan, {
		origin: "ai",
		label: "测试环境变量缓存",
		sourcePath: source,
		destinationPath: join(destinationRoot, "env-cache"),
		method: "user-env",
		envKeys: ["TEST_DEV_CACHE", "Path"],
		reason: "验证 AI 只能修改确实指向源目录的非 Path 环境变量",
	});
	assert.deepEqual(envPlan.envChanges.map((item) => item.key), ["TEST_DEV_CACHE"]);
	assert.equal(envPlan.envChanges[0].after, join(destinationRoot, "env-cache"));
	delete process.env.TEST_DEV_CACHE;

	const detectionRule = {
		targetSubdir: "cache",
		configKey: "cache",
		configCandidates: [{ path: configFile, format: "key-value" }],
	};
	assert.equal(await resolveManualMigration(detectionRule, configSource), null);
	await writeFile(configFile, "registry=x\r\n", "utf8");
	const detected = await resolveManualMigration(detectionRule, configSource);
	assert.equal(detected.configPath, configFile);
	assert.equal(detected.sourcePath, configSource);
	delete process.env.DSH_TEST_CACHE_HOME;
	const envDetected = await resolveManualMigration({
		targetSubdir: "cache",
		method: "user-env",
		envKeys: ["DSH_TEST_CACHE_HOME"],
	}, configSource);
	assert.equal(envDetected.method, "user-env");
	assert.deepEqual(envDetected.envKeys, ["DSH_TEST_CACHE_HOME"]);
	process.env.DSH_TEST_CACHE_HOME = "D:\\AlreadyMoved";
	assert.equal(await resolveManualMigration({
		targetSubdir: "cache",
		method: "user-env",
		envKeys: ["DSH_TEST_CACHE_HOME"],
	}, configSource), null);
	delete process.env.DSH_TEST_CACHE_HOME;
	process.env.DSH_TEST_CONFIG_HOME = tmpdir();
	assert.equal(resolveConfigCandidatePath({
		envKey: "DSH_TEST_CONFIG_HOME",
		relativePath: "tool.rc",
	}), join(tmpdir(), "tool.rc"));
	delete process.env.DSH_TEST_CONFIG_HOME;
	delete process.env.DSH_TEST_CACHE_HOME;

	const configDestination = join(destinationRoot, "configured-cache");
	const configPlan = await createMigrationPlan({
		envPathGroups: [],
		knownDirs: [{ path: configSource, exists: true, isDirectory: true, label: "配置缓存" }],
	}, {
		origin: "manual",
		label: "配置缓存",
		sourcePath: configSource,
		destinationPath: configDestination,
		method: "config-file",
		config: { path: configFile, format: "key-value", key: "cache" },
	});
	assert.equal(configPlan.method, "config-file");
	assert.equal(configPlan.configChange.path, configFile);
	assert.equal(Object.hasOwn(configPlan.configChange, "beforeContent"), false);
	const configResult = await executeMigrationPlan(configPlan.planId);
	assert.match(await readFile(configFile, "utf8"), new RegExp(configDestination.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
	assert.equal(await readFile(join(configDestination, "package.bin"), "utf8"), "config-migration");
	await rm(configResult.backupPath, { recursive: true, force: true });

	const result = await executeMigrationPlan(plan.planId);
	assert.equal(result.status, "completed");
	assert.equal(await readFile(join(source, "nested", "sample.txt"), "utf8"), "migration-check");
	assert.equal((await lstat(source)).isSymbolicLink(), true);
	const linkedSource = await measurePath(source);
	assert.equal(linkedSource.isLink, true);
	assert.equal(linkedSource.linkTarget.toLowerCase(), destination.toLowerCase());
	assert.equal(await resolveManualMigration({
		method: "user-env",
		targetSubdir: "cache",
		envKeys: ["DSH_TEST_LINK_HOME"],
	}, source), null);
	await lstat(result.backupPath);

	await assert.rejects(() => executeMigrationPlan(plan.planId), /不存在|已过期|已执行/);
	await unlink(source);
	await rm(result.backupPath, { recursive: true, force: true });
} finally {
	delete process.env.TEST_DEV_CACHE;
	delete process.env.DSH_TEST_CONFIG_HOME;
	await rm(source, { recursive: true, force: true }).catch(() => {});
	await rm(configSource, { recursive: true, force: true }).catch(() => {});
	await rm(configFile, { force: true }).catch(() => {});
	await rm(destinationRoot, { recursive: true, force: true }).catch(() => {});
}

console.log("dev environment migration tests passed");
