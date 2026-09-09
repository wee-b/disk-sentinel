# DSH Disk Sentinel / 磁盘哨兵

DeepSeek Harness 的 Windows 磁盘分析与安全清理插件。

磁盘哨兵用于解决一个很具体的问题：当 AI Agent 需要分析磁盘空间时，不应该临时生成大量 `dir`、`Get-ChildItem` 命令逐层扫描。这个插件把扫描、报告、预估、确认和清理收敛成稳定工具与可视化面板，让结果更快、更省 token，也更容易审计。

## 核心能力

| 能力 | 说明 |
| --- | --- |
| `disk_scan` | WinDirStat 风格目录扫描，一次返回目录树、Top 大目录、Top 大文件和耗时 |
| `clean_disk` | 预定义垃圾类别清理，支持 `list`、`estimate`、`clean` 三段式流程 |
| Web 面板 | 在 DSH Web UI 侧边栏提供磁盘哨兵入口，支持选择磁盘、后台扫描、取消、查看结果 |
| AI 报告 | 扫描完成后生成报告文件，一键把 `@文件` 引用发送给当前会话，让 AI 基于报告给出建议 |

## 安全设计

清理工具遵循固定流程：

```text
list -> estimate -> 用户确认 -> clean
```

其中 `estimate` 只预估空间，不删除文件；`clean` 才会执行不可逆清理。UI 面板的全盘扫描通过 `/disk-sentinel` RPC 通道直连宿主，不经过 LLM，也不需要在提示词里写“调用某某工具”。

插件会保护磁盘哨兵工作区目录，避免删除扫描报告等 DSH 自身运行数据。

## 预定义清理类别

| ID | 名称 | 说明 |
| --- | --- | --- |
| `windows_temp` | Windows 临时文件 | `%TEMP%`、`%TMP%`、`C:\Windows\Temp` |
| `windows_prefetch` | Windows 预读取 | `C:\Windows\Prefetch` |
| `windows_update_cache` | Windows 更新缓存 | `C:\Windows\SoftwareDistribution\Download` |
| `recycle_bin` | 回收站 | 通过 Shell COM 对象清空 |
| `npm_cache` | npm 缓存 | `npm cache clean --force` |
| `pnpm_store` | pnpm store | `%LOCALAPPDATA%\pnpm-store` |
| `yarn_cache` | yarn 缓存 | `yarn cache clean` |
| `pip_cache` | pip 缓存 | `pip cache purge` |
| `thumbnail_cache` | 缩略图缓存 | `thumbcache_*.db`、`iconcache_*.db` |
| `windows_logs` | Windows 日志 | `C:\Windows\Logs`、`C:\Windows\Panther` |
| `memory_dumps` | 内存转储 | `C:\Windows\Minidump`、`MEMORY.DMP` |
| `edge_cache` | Edge 浏览器缓存 | `Cache`、`Code Cache` |
| `chrome_cache` | Chrome 浏览器缓存 | `Cache`、`Code Cache` |
| `delivery_optimization` | 传递优化缓存 | Windows P2P 更新分发缓存 |
| `dns_cache` | DNS 客户端缓存 | `ipconfig /flushdns` |

## 安装

前置要求：

- 已安装 DeepSeek Harness (`dsh`)
- 已安装 pnpm
- Windows 系统

从仓库目录执行：

```sh
pnpm install
pnpm run build:client
dsh plugin --profile web add .
```

安装完成后，打开 DSH Web UI。侧边栏设置区域附近会出现 **磁盘哨兵** 入口，点击后会打开右侧专属面板。

## Windows pnpm link 手动安装

如果 `dsh plugin add` 在 Windows 上创建了错误的 pnpm junction，可以手动编辑 `%USERPROFILE%\.dsh\profiles\web\package.json`：

```json
{
  "name": "dsh-profile-web",
  "private": true,
  "dependencies": {
    "@dsh-plugin/disk-sentinel": "link:E:/develop/projects/nodequanzhan/dsh-plugin"
  },
  "dsh": {
    "profile": {
      "bundles": [
        "@deepseek-ai/dsh-base",
        "@deepseek-ai/dsh-web-app",
        "@dsh-plugin/disk-sentinel"
      ]
    }
  }
}
```

然后执行：

```sh
cd %USERPROFILE%\.dsh\profiles\web
pnpm install
dsh --profile web --dump-config | findstr disk-sentinel
dsh web
```

## 使用方式

在 Web 面板中：

1. 选择目标磁盘或整个硬盘。
2. 点击开始分析，等待后台扫描完成，也可以随时取消。
3. 查看容量统计、Top 大目录和 Top 大文件。
4. 点击让 AI 分析，当前会话会收到扫描报告的 `@文件` 引用，AI 可以直接读取报告并给出“可安全删除、不要动、适合迁移、建议清理顺序”等建议。

在对话中也可以直接让 agent 使用工具：

```text
帮我分析一下 C 盘空间，并在确认后清理可安全删除的缓存。
```

推荐链路是先调用 `clean_disk` 的 `list` 和 `estimate`，明确预计删除范围，再由用户确认是否执行 `clean`。

## 配置

| 配置项 | 默认值 | 说明 |
| --- | ---: | --- |
| `scanTimeoutMs` | 300000 | 扫描超时，默认 5 分钟 |
| `cleanTimeoutMs` | 120000 | 清理超时，默认 2 分钟 |
| `maxDepth` | 8 | 工具默认递归深度 |
| `topDirsCount` | 30 | 返回的 Top 目录数 |
| `topFilesCount` | 50 | 返回的 Top 文件数 |
| `treeRenderMaxNodes` | 200 | 树形文本最大渲染节点数 |

## 开发

构建浏览器客户端：

```sh
pnpm run build:client
```

运行核心检查：

```sh
node test/scan-test.mjs
node test/clean-estimate-test.mjs
node test/report-test.mjs
```

## 许可证

MIT
