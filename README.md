# DSH Disk Sentinel

[中文文档](README.zh.md)

DeepSeek Harness disk analysis and safe cleanup plugin for Windows.

Disk Sentinel helps an agent understand disk usage quickly, produce a reusable report, and clean predefined junk locations through an explicit preview-and-confirm flow. It is designed for the cases where asking an LLM to generate ad hoc `dir` or `Get-ChildItem` commands would be slow, token-heavy, and risky.

## Features

| Feature | What it does |
| --- | --- |
| `disk_scan` | WinDirStat-style directory scan with a size tree, largest directories, and largest files |
| `clean_disk` | Lists, estimates, and cleans predefined junk categories such as Windows temp files, recycle bin, browser caches, and developer caches |
| `dev_env_migrate` | Lets AI plan and execute a confirmed migration for any eligible path in the latest developer-environment scan |
| Web panel | Adds a Disk Sentinel entry to the DSH Web UI for manual scan, review, cancellation, and AI report handoff |
| Report files | Saves scan reports into the plugin workspace so the current chat can reference the report directly |
| Developer environment analysis | Groups path-valued environment variables by drive, with persistent-configuration-backed manual migration and AI analysis |

## Safety Model

`clean_disk` uses a three-step workflow:

```text
list -> estimate -> user confirmation -> clean
```

The UI path is also user-driven: choose a target, start analysis, review the result, then ask the AI to analyze the saved report. The browser talks to the host through the `/disk-sentinel` RPC channel, so full-disk scans do not need to pass through the LLM.

Developer-environment migration has separate authority boundaries. Configuration discovery checks both standard user locations and paths derived from variables such as `MAVEN_HOME`, `M2_HOME`, `GOENV`, `NPM_CONFIG_USERCONFIG`, and `PNPM_HOME`. Cargo and Rustup use their officially supported `CARGO_HOME` and `RUSTUP_HOME` user variables. The Web UI exposes manual migration only when the persistent configuration is supported and currently maps to the scanned source cache. Other paths can only be selected by AI through `dev_env_migrate`. Manual migration creates a short-lived plan, requires confirmation, copies and verifies the cache before updating the persistent tool configuration, and retains the original directory as a rollback backup.

## Install

From this repository:

```sh
pnpm install
pnpm run build:client
dsh plugin --profile web add .
```

After installation, open DSH Web UI. You should see a **Disk Sentinel** entry near the sidebar settings area. Click it to open the dedicated panel.

## Manual Profile Link

If `dsh plugin add` has trouble creating the pnpm link on Windows, add this package manually to `%USERPROFILE%\.dsh\profiles\web\package.json`:

```json
{
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

Then run:

```sh
cd %USERPROFILE%\.dsh\profiles\web
pnpm install
dsh --profile web --dump-config | findstr disk-sentinel
dsh web
```

## Development

Build the browser client:

```sh
pnpm run build:client
```

Run focused checks:

```sh
node test/scan-test.mjs
node test/clean-estimate-test.mjs
node test/report-test.mjs
node test/dev-env-migration-test.mjs
```

## License

MIT
