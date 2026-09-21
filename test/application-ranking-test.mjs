import { rankApplications } from "../lib/application-ranking.js";

function assert(condition, message) {
	if (!condition) throw new Error(message);
	console.log("  ✅ " + message);
}

const GB = 1024 ** 3;
const directories = [
	{ p: "C:\\Program Files\\Google\\Chrome", s: 2 * GB },
	{ p: "C:\\Users\\alice\\AppData\\Local\\Google\\Chrome", s: 3 * GB },
	{ p: "D:\\Program Files\\Google\\Chrome", s: 4 * GB },
	{ p: "C:\\Program Files (x86)\\Steam", s: 13 * GB },
	{ p: "C:\\Program Files (x86)\\Steam\\steamapps\\common\\Game A", s: 10 * GB },
	{ p: "E:\\SteamLibrary\\steamapps\\common\\Game A", s: 20 * GB },
	{ p: "D:\\Apps\\Portable Tool", s: 6 * GB },
	{ p: "C:\\Windows", s: 50 * GB },
];

const result = rankApplications(directories, 10);
const game = result.find((item) => item.name === "Game A");
const chrome = result.find((item) => item.name === "Google Chrome");
const steam = result.find((item) => item.name === "Steam");

assert(game?.size === 30 * GB, "同一游戏跨 C/E 盘聚合");
assert(game?.drives.length === 2, "跨盘结果保留各盘明细");
assert(chrome?.size === 9 * GB, "安装目录与用户数据跨 C/D 盘聚合");
assert(steam?.size === 3 * GB, "Steam 启动器扣除嵌套游戏，避免重复计数");
assert(result.some((item) => item.name === "Portable Tool"), "识别便携软件目录");
assert(!result.some((item) => item.name === "Windows"), "不把系统目录识别为应用");
assert(result[0].name === "Game A", "按聚合占用降序排列");

console.log("\n应用占用排名测试通过");
