/**
 * 本文件由 build/client.mjs 从 src/client/ 打包生成，请勿手改；
 * 修改请编辑 src/client/ 后运行 `npm run build:client`。
 */
window.__ModuleLoader__.load({
	id: "@dsh-plugin/disk-sentinel",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		var __create = Object.create;
		var __defProp = Object.defineProperty;
		var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
		var __getOwnPropNames = Object.getOwnPropertyNames;
		var __getProtoOf = Object.getPrototypeOf;
		var __hasOwnProp = Object.prototype.hasOwnProperty;
		var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
		var __export = (target, all) => {
		  for (var name in all)
		    __defProp(target, name, { get: all[name], enumerable: true });
		};
		var __copyProps = (to, from, except, desc) => {
		  if (from && typeof from === "object" || typeof from === "function") {
		    for (let key of __getOwnPropNames(from))
		      if (!__hasOwnProp.call(to, key) && key !== except)
		        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
		  }
		  return to;
		};
		var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
		  // If the importer is in node compatibility mode or this is not an ESM
		  // file that has been converted to a CommonJS file using a Babel-
		  // compatible transform (i.e. "__esModule" has not been set), then set
		  // "default" to the CommonJS "module.exports" for node compatibility.
		  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
		  mod
		));
		var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
		var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

		// src/client/index.js
		var index_exports = {};
		__export(index_exports, {
		  apply: () => apply2,
		  inject: () => inject
		});
		module.exports = __toCommonJS(index_exports);
		var React11 = __toESM(require("react"), 1);

		// src/client/css.js
		function injectCss() {
		  var TAG = "disk-sentinel/styles.css";
		  if (document.querySelector('style[data-plugin-css="' + TAG + '"]')) return;
		  var style = document.createElement("style");
		  style.setAttribute("data-plugin", "disk-sentinel");
		  style.setAttribute("data-plugin-css", TAG);
		  style.textContent = [
		    ".pcc-panel{position:fixed;top:0;right:0;bottom:0;width:var(--pcc-panel-w,50%);min-width:340px;max-width:92vw;z-index:1000;",
		    "background:linear-gradient(180deg,var(--dsw-alias-bg-base,#fff),var(--dsw-alias-bg-layer-1,#f7f8fa));",
		    "color:var(--dsw-alias-label-primary,#1f2329);border-left:1px solid var(--dsw-alias-border-l2,#e5e6eb);",
		    "box-shadow:-12px 0 32px rgba(17,24,39,.12);display:flex;flex-direction:column;",
		    "pointer-events:auto;font-size:13px;line-height:1.55;letter-spacing:0;}",
		    ".pcc-panel *{box-sizing:border-box;}",
		    ".pcc-panel-head{display:flex;align-items:center;gap:10px;padding:13px 16px;",
		    "background:color-mix(in srgb,var(--dsw-alias-bg-base,#fff) 92%,transparent);",
		    "border-bottom:1px solid var(--dsw-alias-border-l2,#e5e6eb);flex:none;backdrop-filter:blur(10px);}",
		    ".pcc-panel-title{font-size:14px;font-weight:650;margin:0;flex:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}",
		    ".pcc-panel-nav{display:inline-flex;align-items:center;gap:18px;flex:1;min-width:0;}",
		    ".pcc-panel-nav-btn{appearance:none;-webkit-appearance:none;border:0;background:transparent;color:var(--dsw-alias-label-secondary,#4e5969);",
		    "cursor:pointer;font:inherit;font-size:15px;line-height:1.2;padding:3px 0;white-space:nowrap;position:relative;}",
		    ".pcc-panel-nav-btn[data-active]{color:var(--dsw-alias-label-primary,#1f2329);font-weight:700;}",
		    '.pcc-panel-nav-btn[data-active]::after{content:"";position:absolute;left:0;right:0;bottom:-14px;height:2px;background:var(--dsw-alias-state-business-primary,#165dff);border-radius:2px;}',
		    ".pcc-panel-nav-btn:hover{color:var(--dsw-alias-label-primary,#1f2329);}",
		    ".pcc-panel-back,.pcc-panel-close{appearance:none;-webkit-appearance:none;width:30px;height:30px;border:0;background:transparent;cursor:pointer;",
		    "color:var(--dsw-alias-label-secondary,#4e5969);border-radius:6px;flex:none;display:inline-flex;align-items:center;justify-content:center;padding:0;}",
		    ".pcc-panel-back{width:28px;height:28px;}",
		    ".pcc-back-icon{display:inline-flex;align-items:center;justify-content:center;line-height:0;}",
		    ".pcc-panel-close{font-size:15px;}",
		    ".pcc-panel-back:hover,.pcc-panel-close:hover{background:var(--dsw-alias-interactive-bg-hover,#e8f3ff);color:var(--dsw-alias-label-primary,#1f2329);}",
		    ".pcc-panel-body{flex:1;min-height:0;overflow-y:auto;padding:16px 16px 26px;",
		    "display:flex;flex-direction:column;gap:14px;scrollbar-gutter:stable;}",
		    ".pcc-panel-body>div{display:flex;flex-direction:column;gap:10px;}",
		    ".pcc-section-title{font-size:12px;font-weight:650;margin:6px 0 4px;",
		    "color:var(--dsw-alias-label-secondary,#4e5969);letter-spacing:0;}",
		    ".pcc-desc{font-size:12px;color:var(--dsw-alias-label-tertiary,#86909c);margin:0;}",
		    ".pcc-hero{border:1px solid var(--dsw-alias-border-l2,#e5e6eb);background:var(--dsw-alias-bg-base,#fff);",
		    "border-radius:8px;padding:12px 13px;color:var(--dsw-alias-label-secondary,#4e5969);display:flex;flex-direction:column;gap:4px;}",
		    ".pcc-btn{appearance:none;-webkit-appearance:none;border:1px solid var(--dsw-alias-border-l2,#e5e6eb);border-radius:8px;",
		    "background:var(--dsw-alias-bg-base,#fff);color:inherit;font:inherit;",
		    "min-height:34px;padding:7px 13px;cursor:pointer;font-size:13px;transition:background .16s,border-color .16s,box-shadow .16s,transform .16s;}",
		    ".pcc-btn:hover{background:var(--dsw-alias-interactive-bg-hover,#e8f3ff);border-color:rgba(22,93,255,.25);}",
		    ".pcc-btn:active{transform:translateY(1px);}",
		    ".pcc-btn:focus-visible,.pcc-drive:focus-visible,.pcc-tab:focus-visible,.pcc-history-btn:focus-visible,.pcc-panel-nav-btn:focus-visible,.pcc-panel-back:focus-visible,.pcc-panel-close:focus-visible,.pcc-sidebar-btn:focus-visible{outline:2px solid rgba(22,93,255,.45);outline-offset:2px;}",
		    ".pcc-btn:disabled{opacity:.55;cursor:not-allowed;transform:none;box-shadow:none;}",
		    ".pcc-btn-primary{background:var(--dsw-alias-state-business-primary,#165dff);",
		    "border-color:var(--dsw-alias-state-business-primary,#165dff);color:#fff;",
		    "font-weight:650;box-shadow:0 8px 18px rgba(22,93,255,.18);}",
		    ".pcc-btn-primary:hover{background:var(--dsw-alias-state-business-primary,#165dff);box-shadow:0 10px 22px rgba(22,93,255,.24);}",
		    ".pcc-btn-danger{color:#e5484d;border-color:rgba(229,72,77,.35);background:rgba(229,72,77,.04);}",
		    ".pcc-btn-danger:hover{background:rgba(229,72,77,.08);border-color:rgba(229,72,77,.5);}",
		    ".pcc-drive{display:grid;grid-template-columns:minmax(86px,max-content) minmax(80px,1fr) minmax(120px,1.4fr);",
		    "align-items:center;gap:10px;padding:10px 12px;border-radius:8px;border:1px solid var(--dsw-alias-border-l2,#e5e6eb);",
		    "cursor:pointer;margin:0;background:var(--dsw-alias-bg-base,#fff);transition:background .16s,border-color .16s,box-shadow .16s;}",
		    ".pcc-drive:hover{border-color:rgba(22,93,255,.22);background:var(--dsw-alias-interactive-bg-hover,#e8f3ff);}",
		    ".pcc-drive[data-selected]{border-color:var(--dsw-alias-state-business-primary,#165dff);",
		    "background:rgba(22,93,255,.07);box-shadow:0 0 0 1px rgba(22,93,255,.08) inset;}",
		    ".pcc-drive-label{font-weight:650;min-width:0;white-space:nowrap;}",
		    ".pcc-drive-meta{font-size:11px;color:var(--dsw-alias-label-tertiary,#86909c);min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}",
		    ".pcc-capbar{height:8px;border-radius:999px;overflow:hidden;flex:1;",
		    "background:var(--dsw-alias-border-l1,#f2f3f5);display:flex;min-width:64px;}",
		    ".pcc-capbar-used{background:linear-gradient(90deg,var(--dsw-alias-state-business-primary,#165dff),#22a7f0);height:100%;}",
		    ".pcc-capbar-free{background:var(--dsw-alias-state-success-primary,#00b42a);height:100%;}",
		    ".pcc-statrow{display:grid;grid-template-columns:repeat(auto-fit,minmax(110px,1fr));gap:8px;}",
		    ".pcc-stat{min-width:0;border:1px solid var(--dsw-alias-border-l2,#e5e6eb);",
		    "border-radius:8px;padding:10px 11px;background:var(--dsw-alias-bg-base,#fff);}",
		    ".pcc-stat-value{font-size:17px;font-weight:700;line-height:1.25;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}",
		    ".pcc-stat-label{font-size:11px;color:var(--dsw-alias-label-tertiary,#86909c);margin-top:2px;}",
		    ".pcc-drive-stat{border:1px solid var(--dsw-alias-border-l2,#e5e6eb);background:var(--dsw-alias-bg-base,#fff);",
		    "border-radius:8px;padding:10px 11px;}",
		    ".pcc-row{display:grid;grid-template-columns:minmax(0,1fr) max-content;align-items:center;gap:10px;",
		    "padding:7px 9px;border-radius:6px;font-size:12px;position:relative;overflow:hidden;margin:0;",
		    "border:1px solid transparent;}",
		    ".pcc-row:hover{background:var(--dsw-alias-interactive-bg-hover,#e8f3ff);border-color:rgba(22,93,255,.12);}",
		    ".pcc-row-bar{position:absolute;left:0;top:0;bottom:0;",
		    "background:var(--dsw-alias-state-business-primary,#165dff);opacity:.075;}",
		    ".pcc-row-path{min-width:0;overflow:hidden;text-overflow:ellipsis;",
		    "white-space:nowrap;position:relative;}",
		    ".pcc-row-size{font-weight:650;white-space:nowrap;position:relative;}",
		    ".pcc-progress-card{border:1px solid var(--dsw-alias-border-l2,#e5e6eb);background:var(--dsw-alias-bg-base,#fff);",
		    "border-radius:8px;padding:18px 14px;text-align:center;}",
		    ".pcc-progress-num{font-size:30px;font-weight:750;text-align:center;margin:4px 0 2px;line-height:1.2;}",
		    ".pcc-progress-path{font-size:11px;color:var(--dsw-alias-label-tertiary,#86909c);",
		    "overflow:hidden;text-overflow:ellipsis;white-space:nowrap;text-align:center;",
		    "margin:6px 0 0;direction:rtl;}",
		    ".pcc-pulse{display:inline-block;width:8px;height:8px;border-radius:50%;",
		    "background:var(--dsw-alias-state-business-primary,#165dff);margin-right:8px;",
		    "animation:pccPulse 1.2s ease-in-out infinite;}",
		    "@keyframes pccPulse{0%,100%{opacity:1}50%{opacity:.25}}",
		    ".pcc-error{color:#e5484d;font-size:12px;padding:8px 10px;border-radius:8px;",
		    "background:rgba(229,72,77,.08);border:1px solid rgba(229,72,77,.3);margin:0;}",
		    ".pcc-sidebar-anchor{display:none!important;}",
		    ".pcc-sidebar-top-slot{display:inline-flex;align-items:center;justify-content:center;flex:none;margin:0 0 0 auto;}",
		    ".pcc-sidebar-top-slot+[class*='_searchSlot']{flex:none;margin-left:0;}",
		    ".pcc-sidebar-top-slot[data-rail]{width:36px;height:36px;margin:0 0 12px;}",
		    ".pcc-sidebar-btn{appearance:none;-webkit-appearance:none;border:1px solid var(--dsw-alias-border-l1,#f2f3f5);",
		    "background:var(--dsw-alias-bg-layer-1,#f7f8fa);",
		    "color:var(--dsw-alias-label-primary,#1f2329);border-radius:8px;padding:6px 10px;",
		    "font-size:12px;cursor:pointer;white-space:nowrap;display:inline-flex;",
		    "align-items:center;justify-content:center;gap:6px;max-width:100%;overflow:hidden;}",
		    ".pcc-sidebar-btn[data-collapsed]{width:34px;height:34px;padding:0;}",
		    ".pcc-sidebar-btn[data-top]{width:28px;height:28px;border-color:transparent;background:transparent;border-radius:50%;padding:0;color:var(--dsw-alias-label-secondary,#4e5969);}",
		    ".pcc-sidebar-btn[data-top][data-collapsed]{width:28px;height:28px;color:var(--dsw-alias-label-secondary,#4e5969);}",
		    ".pcc-sidebar-top-slot[data-rail] .pcc-sidebar-btn[data-top][data-collapsed]{width:36px;height:36px;color:var(--dsw-alias-label-primary,#1f2329);}",
		    ".pcc-sidebar-icon{width:18px;height:18px;display:inline-flex;align-items:center;justify-content:center;line-height:0;flex:none;}",
		    ".pcc-sidebar-icon svg{width:18px;height:18px;display:block;}",
		    ".pcc-sidebar-label{min-width:0;overflow:hidden;text-overflow:ellipsis;}",
		    ".pcc-sidebar-caret{flex:none;color:var(--dsw-alias-label-tertiary,#86909c);}",
		    ".pcc-sidebar-btn[data-active]{border-color:transparent;background:var(--dsw-alias-interactive-bg-hover,#f2f3f5);",
		    "color:var(--dsw-alias-label-primary,#1f2329);}",
		    ".pcc-sidebar-btn[data-top][data-active]{border-color:transparent;background:var(--dsw-alias-interactive-bg-hover,#f2f3f5);}",
		    ".pcc-sidebar-btn:hover{background:rgba(22,93,255,.08);}",
		    ".pcc-history-item{display:flex;align-items:center;gap:6px;padding:8px 9px;border-radius:8px;",
		    "border:1px solid var(--dsw-alias-border-l2,#e5e6eb);margin:0;background:var(--dsw-alias-bg-base,#fff);font-size:12px;}",
		    ".pcc-history-item+.pcc-history-item{margin-top:2px;}",
		    ".pcc-history-meta{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:var(--dsw-alias-label-secondary,#4e5969);}",
		    ".pcc-history-btn{border:none;background:transparent;cursor:pointer;font-size:12px;padding:4px 7px;",
		    "border-radius:6px;color:var(--dsw-alias-state-business-primary,#165dff);white-space:nowrap;}",
		    ".pcc-history-btn:hover{background:var(--dsw-alias-interactive-bg-hover,#e8f3ff);}",
		    ".pcc-history-btn[data-danger]{color:#e5484d;}",
		    ".pcc-plan-content{word-break:break-word;font-size:13px;line-height:1.72;",
		    "background:var(--dsw-alias-bg-base,#fff);border:1px solid var(--dsw-alias-border-l2,#e5e6eb);",
		    "border-radius:8px;padding:12px;margin:0 0 10px;}",
		    ".pcc-markdown>*:first-child{margin-top:0!important;}.pcc-markdown>*:last-child{margin-bottom:0!important;}",
		    ".pcc-markdown h1,.pcc-markdown h2,.pcc-markdown h3,.pcc-markdown h4,.pcc-markdown h5,.pcc-markdown h6{",
		    "color:var(--dsw-alias-label-primary,#1f2329);font-weight:700;line-height:1.35;margin:1.25em 0 .55em;}",
		    ".pcc-markdown h1{font-size:20px;padding-bottom:.35em;border-bottom:1px solid var(--dsw-alias-border-l2,#e5e6eb);}",
		    ".pcc-markdown h2{font-size:17px;padding-bottom:.3em;border-bottom:1px solid var(--dsw-alias-border-l1,#f2f3f5);}",
		    ".pcc-markdown h3{font-size:15px;}.pcc-markdown h4,.pcc-markdown h5,.pcc-markdown h6{font-size:13px;}",
		    ".pcc-markdown p{margin:.65em 0;}.pcc-markdown strong{font-weight:700;color:var(--dsw-alias-label-primary,#1f2329);}",
		    ".pcc-markdown ul,.pcc-markdown ol{margin:.65em 0;padding-left:1.7em;}.pcc-markdown li{margin:.28em 0;}",
		    ".pcc-markdown li>p{margin:.25em 0;}.pcc-markdown input[type=checkbox]{margin:0 .45em 0 0;vertical-align:middle;}",
		    ".pcc-markdown blockquote{margin:.8em 0;padding:.15em 0 .15em 11px;border-left:3px solid var(--dsw-alias-state-business-primary,#165dff);",
		    "color:var(--dsw-alias-label-secondary,#4e5969);background:rgba(22,93,255,.045);}",
		    ".pcc-markdown blockquote>p{margin:.45em .75em;}",
		    ".pcc-markdown code{font-family:ui-monospace,SFMono-Regular,Consolas,'Liberation Mono',monospace;font-size:.92em;",
		    "padding:.15em .35em;border-radius:5px;background:var(--dsw-alias-bg-layer-1,#f7f8fa);}",
		    ".pcc-markdown pre{max-width:100%;overflow:auto;margin:.8em 0;padding:10px 11px;border-radius:7px;",
		    "background:var(--dsw-alias-bg-layer-1,#f7f8fa);border:1px solid var(--dsw-alias-border-l1,#f2f3f5);}",
		    ".pcc-markdown pre code{padding:0;background:transparent;white-space:pre;word-break:normal;}",
		    ".pcc-markdown table{display:block;width:100%;max-width:100%;overflow:auto;border-spacing:0;border-collapse:collapse;margin:.8em 0;}",
		    ".pcc-markdown th,.pcc-markdown td{padding:6px 8px;border:1px solid var(--dsw-alias-border-l2,#e5e6eb);text-align:left;vertical-align:top;}",
		    ".pcc-markdown th{font-weight:700;background:var(--dsw-alias-bg-layer-1,#f7f8fa);}.pcc-markdown tr:nth-child(even) td{background:rgba(134,144,156,.035);}",
		    ".pcc-markdown hr{height:1px;border:0;background:var(--dsw-alias-border-l2,#e5e6eb);margin:1.15em 0;}",
		    ".pcc-markdown a{color:var(--dsw-alias-state-business-primary,#165dff);text-decoration:none;}.pcc-markdown a:hover{text-decoration:underline;}",
		    ".pcc-markdown img{max-width:100%;height:auto;border-radius:6px;}",
		    ".pcc-env-item,.pcc-devdir-item{border:1px solid var(--dsw-alias-border-l2,#e5e6eb);background:var(--dsw-alias-bg-base,#fff);",
		    "border-radius:8px;padding:9px 10px;display:flex;flex-direction:column;gap:5px;min-width:0;}",
		    ".pcc-env-main,.pcc-devdir-row,.pcc-devdir-foot{display:flex;align-items:center;justify-content:space-between;gap:8px;min-width:0;}",
		    ".pcc-devdir-foot>span:first-child{flex:1;min-width:0;}",
		    ".pcc-env-name,.pcc-devdir-name{font-weight:650;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}",
		    ".pcc-env-label,.pcc-devdir-foot{font-size:11px;color:var(--dsw-alias-label-tertiary,#86909c);}",
		    ".pcc-env-path,.pcc-devdir-path{font-size:12px;color:var(--dsw-alias-label-secondary,#4e5969);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}",
		    ".pcc-devdir-size{font-weight:700;white-space:nowrap;}",
		    ".pcc-devdir-item[data-missing]{opacity:.62;}",
		    ".pcc-env-drive{display:flex;flex-direction:column;gap:6px;border:1px solid var(--dsw-alias-border-l2,#e5e6eb);",
		    "background:var(--dsw-alias-bg-base,#fff);border-radius:8px;padding:9px 10px;}",
		    ".pcc-env-drive-head,.pcc-env-path-top{display:flex;align-items:center;justify-content:space-between;gap:8px;min-width:0;}",
		    ".pcc-env-drive-title{font-size:13px;font-weight:750;}",
		    ".pcc-env-drive-meta{font-size:11px;color:var(--dsw-alias-label-tertiary,#86909c);white-space:nowrap;}",
		    ".pcc-env-path-item{display:flex;flex-direction:column;gap:4px;padding:7px 0;border-top:1px solid var(--dsw-alias-border-l1,#f2f3f5);min-width:0;}",
		    ".pcc-env-path-item[data-missing]{opacity:.6;}",
		    ".pcc-dev-section-divider{display:flex;align-items:center;gap:10px;margin:20px 0 10px;padding-top:16px;",
		    "border-top:2px solid var(--dsw-alias-border-l2,#d8dadd);font-size:13px;font-weight:750;color:var(--dsw-alias-label-primary,#1f2329);}",
		    ".pcc-dev-actions{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:8px;}",
		    ".pcc-dev-target-input{width:100%;min-height:36px;border:1px solid var(--dsw-alias-border-l2,#e5e6eb);border-radius:8px;",
		    "background:var(--dsw-alias-bg-base,#fff);color:inherit;font:inherit;font-size:13px;padding:7px 10px;outline:none;}",
		    ".pcc-dev-target-input:focus{border-color:var(--dsw-alias-state-business-primary,#165dff);box-shadow:0 0 0 2px rgba(22,93,255,.1);}",
		    ".pcc-dev-target-row{display:grid;grid-template-columns:minmax(0,1fr) auto;align-items:stretch;gap:8px;min-width:0;}",
		    ".pcc-dev-preview-btn{min-width:64px;padding:7px 11px;}",
		    ".pcc-dev-preview-path{margin:0;padding:8px 10px;border:1px solid var(--dsw-alias-border-l1,#f2f3f5);border-radius:6px;",
		    "background:var(--dsw-alias-bg-layer-1,#f7f8fa);color:var(--dsw-alias-label-secondary,#4e5969);font-size:12px;word-break:break-all;}",
		    ".pcc-devdir-actions{display:inline-flex;align-items:center;justify-content:flex-end;gap:7px;flex:none;}",
		    ".pcc-dev-plan-btn{flex:none;min-height:30px;padding:5px 9px;font-size:12px;}",
		    ".pcc-dev-dialog-backdrop{position:fixed;inset:0;z-index:2147483000;display:flex;align-items:center;justify-content:center;",
		    "padding:20px;background:rgba(0,0,0,.32);}",
		    ".pcc-dev-dialog{width:min(440px,100%);display:flex;flex-direction:column;gap:10px;padding:16px;",
		    "border:1px solid var(--dsw-alias-border-l2,#e5e6eb);border-radius:8px;background:var(--dsw-alias-bg-base,#fff);",
		    "color:var(--dsw-alias-label-primary,#1f2329);box-shadow:0 12px 36px rgba(0,0,0,.18);}",
		    ".pcc-dev-dialog .pcc-section-title,.pcc-dev-dialog .pcc-desc{margin:0;}",
		    ".pcc-dev-dialog-actions{display:flex;align-items:center;justify-content:flex-end;gap:8px;margin-top:2px;}",
		    ".pcc-dev-success{font-size:12px;padding:8px 10px;border-radius:8px;color:#00a870;background:rgba(0,168,112,.08);",
		    "border:1px solid rgba(0,168,112,.25);margin:0;word-break:break-word;}",
		    ".pcc-badge{display:inline-flex;align-items:center;justify-content:center;min-height:20px;padding:0 7px;border-radius:999px;",
		    "font-size:11px;white-space:nowrap;color:var(--dsw-alias-state-business-primary,#165dff);background:rgba(22,93,255,.08);}",
		    ".pcc-badge[data-warn]{color:#b7791f;background:rgba(183,121,31,.1);}",
		    ".pcc-history-item[data-diff-base]{border-color:var(--dsw-alias-state-business-primary,#165dff);",
		    "background:rgba(22,93,255,.06);}",
		    ".pcc-delta-up{color:#e5484d;}",
		    ".pcc-delta-down{color:#00a870;}",
		    ".pcc-row-bar[data-up]{background:#e5484d;opacity:.12;}",
		    ".pcc-row-bar[data-down]{background:#00a870;opacity:.12;}",
		    ".pcc-more-btn{border:1px solid transparent;background:transparent;cursor:pointer;font-size:12px;",
		    "color:var(--dsw-alias-state-business-primary,#165dff);padding:6px 8px;border-radius:8px;}",
		    ".pcc-more-btn:hover{background:var(--dsw-alias-interactive-bg-hover,#e8f3ff);}",
		    ".pcc-tabs{display:flex;gap:4px;margin:4px 0;padding:3px;border:1px solid var(--dsw-alias-border-l2,#e5e6eb);",
		    "background:var(--dsw-alias-bg-base,#fff);border-radius:8px;}",
		    ".pcc-tab{flex:1;border:1px solid transparent;background:transparent;",
		    "border-radius:6px;padding:6px 0;font-size:12px;cursor:pointer;",
		    "color:var(--dsw-alias-label-primary,#1f2329);}",
		    ".pcc-tab[data-active]{border-color:rgba(22,93,255,.12);",
		    "color:var(--dsw-alias-state-business-primary,#165dff);background:rgba(22,93,255,.08);font-weight:650;}",
		    ".pcc-app-item{position:relative;overflow:hidden;display:flex;flex-direction:column;gap:7px;padding:10px;",
		    "border:1px solid var(--dsw-alias-border-l2,#e5e6eb);border-radius:8px;background:var(--dsw-alias-bg-base,#fff);margin-bottom:6px;}",
		    ".pcc-app-head{position:relative;display:flex;align-items:center;gap:8px;min-width:0;}",
		    ".pcc-app-rank{flex:none;width:24px;color:var(--dsw-alias-label-tertiary,#86909c);font-size:11px;font-weight:700;}",
		    ".pcc-app-name{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:13px;font-weight:700;}",
		    ".pcc-app-size{flex:none;font-size:13px;font-weight:750;white-space:nowrap;}",
		    ".pcc-app-drives{position:relative;display:flex;flex-wrap:wrap;gap:5px;padding-left:32px;}",
		    ".pcc-app-drive{font-size:11px;padding:2px 7px;border-radius:999px;color:var(--dsw-alias-state-business-primary,#165dff);background:rgba(22,93,255,.09);}",
		    ".pcc-app-locations{position:relative;display:flex;flex-direction:column;gap:3px;padding-left:32px;}",
		    ".pcc-app-location{display:flex;align-items:center;justify-content:space-between;gap:8px;color:var(--dsw-alias-label-tertiary,#86909c);font-size:11px;min-width:0;}",
		    ".pcc-app-location>span:first-child{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}",
		    ".pcc-app-location>span:last-child{flex:none;white-space:nowrap;}",
		    ".pcc-pick{width:18px;height:18px;border-radius:50%;flex:none;cursor:pointer;padding:0;",
		    "border:1.5px solid var(--dsw-alias-border-l2,#c9cdd4);background:transparent;",
		    "color:#fff;font-size:10px;line-height:1;display:inline-flex;align-items:center;justify-content:center;}",
		    ".pcc-pick[data-on]{border-color:var(--dsw-alias-state-business-primary,#165dff);",
		    "background:var(--dsw-alias-state-business-primary,#165dff);}",
		    ".pcc-tree-row{display:flex;align-items:center;gap:5px;padding:5px 7px 5px 0;border-radius:6px;",
		    "font-size:12px;position:relative;overflow:hidden;margin-bottom:1px;cursor:pointer;}",
		    ".pcc-tree-row[data-leaf]{cursor:default;}",
		    ".pcc-tree-row:hover{background:var(--dsw-alias-interactive-bg-hover,#e8f3ff);}",
		    ".pcc-tree-toggle{appearance:none;-webkit-appearance:none;width:18px;height:20px;border:0;border-radius:5px;padding:0;background:transparent;",
		    "color:var(--dsw-alias-label-tertiary,#86909c);flex:none;display:inline-flex;align-items:center;justify-content:center;",
		    "line-height:0;cursor:pointer;transition:background .16s,color .16s,transform .16s;position:relative;}",
		    ".pcc-tree-toggle:hover{background:rgba(22,93,255,.05);color:var(--dsw-alias-state-business-primary,#165dff);}",
		    ".pcc-tree-toggle:focus-visible{outline:2px solid rgba(22,93,255,.4);outline-offset:1px;}",
		    ".pcc-tree-toggle svg{display:block;transition:transform .16s ease;}",
		    ".pcc-tree-toggle[data-open]{background:transparent;color:var(--dsw-alias-state-business-primary,#165dff);}",
		    ".pcc-tree-toggle[data-open] svg{transform:rotate(90deg);}",
		    ".pcc-tree-toggle-spacer{cursor:default;pointer-events:none;}",
		    ".pcc-tree-name{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;",
		    "position:relative;}",
		    ".pcc-tree-meta{flex:none;color:var(--dsw-alias-label-tertiary,#86909c);position:relative;",
		    "white-space:nowrap;font-size:11px;}",
		    ".pcc-tree-size{flex:none;font-weight:600;white-space:nowrap;position:relative;}",
		    ".pcc-tree-more{padding:3px 6px 3px 34px;font-size:11px;color:var(--dsw-alias-label-tertiary,#86909c);}",
		    "@media(max-width:640px){.pcc-panel-head{gap:8px;}.pcc-panel-nav{gap:12px;}.pcc-panel-nav-btn{font-size:14px;}}",
		    "@media(max-width:520px){.pcc-panel{min-width:320px;max-width:100vw;}.pcc-panel-body{padding:12px;}",
		    ".pcc-drive{grid-template-columns:minmax(72px,max-content) 1fr;}.pcc-drive-meta{grid-column:1/-1;}",
		    ".pcc-statrow{grid-template-columns:1fr;}}"
		  ].join("");
		  document.head.appendChild(style);
		}

		// src/client/layout.js
		var React = __toESM(require("react"), 1);
		var panelOpen = false;
		var openListeners = /* @__PURE__ */ new Set();
		var layoutObserver = null;
		function findFrame() {
		  var overlay = document.querySelector("[data-shell-overlay]");
		  return overlay ? overlay.parentElement : null;
		}
		function findCenterCol() {
		  var frame = findFrame();
		  if (!frame) return null;
		  var overlay = frame.querySelector(":scope > [data-shell-overlay]");
		  if (!overlay) return null;
		  var details = overlay.previousElementSibling;
		  var center = details ? details.previousElementSibling : null;
		  return center;
		}
		function computePanelLayout() {
		  var sidebarCol = findFrame()?.firstElementChild ?? null;
		  var sidebarW = sidebarCol ? sidebarCol.getBoundingClientRect().width : 280;
		  var viewport = window.innerWidth;
		  var remaining = Math.max(0, viewport - sidebarW);
		  var width = Math.max(300, Math.floor(remaining / 2));
		  width = Math.min(width, Math.floor(viewport * 0.92));
		  return { width, squeeze: remaining - width >= 400 };
		}
		function applyPanelLayout() {
		  var layout = computePanelLayout();
		  document.documentElement.style.setProperty("--pcc-panel-w", layout.width + "px");
		  var centerCol = findCenterCol();
		  if (centerCol) {
		    centerCol.style.marginRight = layout.squeeze ? layout.width + "px" : "";
		  }
		}
		function resetPanelLayout() {
		  document.documentElement.style.removeProperty("--pcc-panel-w");
		  var centerCol = findCenterCol();
		  if (centerCol) centerCol.style.marginRight = "";
		}
		function startLayoutWatch() {
		  stopLayoutWatch();
		  applyPanelLayout();
		  layoutObserver = new MutationObserver(function() {
		    var frame2 = findFrame();
		    if (panelOpen && frame2 && !frame2.hasAttribute("data-rightbar-collapsed")) {
		      setPanelOpen(false);
		      return;
		    }
		    applyPanelLayout();
		  });
		  var frame = findFrame();
		  if (frame) {
		    layoutObserver.observe(frame, {
		      attributes: true,
		      attributeFilter: ["style", "data-rightbar-collapsed"]
		    });
		  } else {
		    setTimeout(function() {
		      if (panelOpen && layoutObserver) {
		        var late = findFrame();
		        if (late) {
		          applyPanelLayout();
		          layoutObserver.observe(late, {
		            attributes: true,
		            attributeFilter: ["style", "data-rightbar-collapsed"]
		          });
		        }
		      }
		    }, 300);
		  }
		  window.addEventListener("resize", applyPanelLayout);
		}
		function stopLayoutWatch() {
		  if (layoutObserver) {
		    layoutObserver.disconnect();
		    layoutObserver = null;
		  }
		  window.removeEventListener("resize", applyPanelLayout);
		  resetPanelLayout();
		}
		function setPanelOpen(next) {
		  next = !!next;
		  if (panelOpen === next) return;
		  panelOpen = next;
		  if (next) {
		    startLayoutWatch();
		  } else {
		    stopLayoutWatch();
		  }
		  openListeners.forEach(function(fn) {
		    fn();
		  });
		}
		function subscribePanelOpen(listener) {
		  openListeners.add(listener);
		  return function() {
		    openListeners.delete(listener);
		  };
		}
		function usePanelOpen() {
		  return React.useSyncExternalStore(
		    subscribePanelOpen,
		    function() {
		      return panelOpen;
		    },
		    function() {
		      return panelOpen;
		    }
		  );
		}

		// src/client/panel.js
		var React10 = __toESM(require("react"), 1);

		// src/client/rpc.js
		var CHANNEL = "/disk-sentinel";
		async function rpcCall(connection, endpoint, payload) {
		  var result = await connection.rpc.call(CHANNEL, endpoint, payload ?? {});
		  if (result && result.ok) return result.value;
		  var message = result && result.error ? result.error.message : "unknown error";
		  throw new Error(message);
		}

		// src/client/workspace-navigation.js
		function normalizeWorkspacePath(path) {
		  return String(path ?? "").replace(/\//g, "\\").replace(/\\+$/, "").toLowerCase();
		}
		function findLatestWorkspaceSession(workspace, sessions, archivedSessionIds) {
		  var archived = new Set(archivedSessionIds ?? []);
		  var latest = null;
		  var latestUpdatedAt = Number.NEGATIVE_INFINITY;
		  (workspace?.sessionIds ?? []).forEach(function(sessionId) {
		    if (archived.has(sessionId)) return;
		    var session = sessions?.byId?.[sessionId];
		    if (!session) return;
		    var updatedAt = Number(session.updatedAt);
		    if (!Number.isFinite(updatedAt)) updatedAt = Number.NEGATIVE_INFINITY;
		    if (latest === null || updatedAt > latestUpdatedAt) {
		      latest = sessionId;
		      latestUpdatedAt = updatedAt;
		    }
		  });
		  return latest;
		}
		function sessionBelongsToWorkspace(workspace, sessions, sessionId) {
		  if (!workspace || !sessionId) return false;
		  if ((workspace.sessionIds ?? []).includes(sessionId)) return true;
		  var session = sessions?.byId?.[sessionId];
		  if (!session?.cwd || !workspace.path) return false;
		  return normalizeWorkspacePath(session.cwd) === normalizeWorkspacePath(workspace.path);
		}
		async function openLatestWorkspaceSession(ctx, workspace) {
		  var workspaces = ctx?.workspaces;
		  var sessions = ctx?.sessions;
		  if (!workspaces || !sessions?.list || typeof sessions.open !== "function") {
		    throw new Error("\u5F53\u524D DSH \u5BA2\u6237\u7AEF\u4E0D\u652F\u6301\u5DE5\u4F5C\u533A\u4F1A\u8BDD\u5BFC\u822A");
		  }
		  var sessionState = sessions.list.getSnapshot();
		  var workspaceState = workspaces.list?.getSnapshot?.();
		  var latest = findLatestWorkspaceSession(
		    workspace,
		    sessionState,
		    workspaceState?.archivedSessionIds
		  );
		  if (latest) {
		    sessions.open(latest);
		    return latest;
		  }
		  var sessionId = await workspaces.connectWorkspace(workspace.workspaceId);
		  sessions.open(sessionId);
		  return sessionId;
		}

		// src/client/views/select-view.js
		var React2 = __toESM(require("react"), 1);

		// src/client/format.js
		function formatBytes(bytes) {
		  if (!Number.isFinite(bytes) || bytes < 0) return "-";
		  if (bytes < 1024) return bytes + " B";
		  var units = ["KB", "MB", "GB", "TB", "PB"];
		  var value = bytes / 1024;
		  var i = 0;
		  while (value >= 1024 && i < units.length - 1) {
		    value /= 1024;
		    i++;
		  }
		  return value.toFixed(value >= 100 ? 0 : value >= 10 ? 1 : 2) + " " + units[i];
		}
		function formatDate(ts) {
		  if (!ts) return "-";
		  try {
		    return new Date(ts).toLocaleDateString();
		  } catch {
		    return "-";
		  }
		}
		function formatDuration(ms) {
		  var s = Math.round(ms / 1e3);
		  if (s < 60) return s + " \u79D2";
		  return Math.floor(s / 60) + " \u5206 " + s % 60 + " \u79D2";
		}
		function isRootPath(p) {
		  return /^[A-Za-z]:\\?$/.test(p);
		}
		function baseName(p) {
		  if (isRootPath(p)) return p;
		  var cut = p.lastIndexOf("\\");
		  return cut >= 0 ? p.slice(cut + 1) : p;
		}

		// src/client/views/select-view.js
		var useState2 = React2.useState;
		var useEffect2 = React2.useEffect;
		var createElement2 = React2.createElement;
		function SelectView(props) {
		  var connection = props.connection;
		  var onStart = props.onStart;
		  var onViewReport = props.onViewReport;
		  var onViewPlan = props.onViewPlan;
		  var onViewDiff = props.onViewDiff;
		  var onDiff = props.onDiff;
		  var driveState = useState2(null);
		  var drives = driveState[0];
		  var setDrives = driveState[1];
		  var errorState = useState2(null);
		  var error = errorState[0];
		  var setError = errorState[1];
		  var selectedState = useState2(null);
		  var selected = selectedState[0];
		  var setSelected = selectedState[1];
		  var historyState = useState2(null);
		  var history = historyState[0];
		  var setHistory = historyState[1];
		  var plansState = useState2(null);
		  var plans = plansState[0];
		  var setPlans = plansState[1];
		  var diffsState = useState2(null);
		  var diffs = diffsState[0];
		  var setDiffs = diffsState[1];
		  var diffPickedState = useState2([]);
		  var diffPicked = diffPickedState[0];
		  var setDiffPicked = diffPickedState[1];
		  useEffect2(function() {
		    var cancelled = false;
		    rpcCall(connection, "drives").then(function(value) {
		      if (!cancelled) setDrives(value.drives ?? []);
		    }).catch(function(err) {
		      if (!cancelled) setError(err.message ?? String(err));
		    });
		    rpcCall(connection, "report/list").then(function(value) {
		      if (!cancelled) setHistory(value.reports ?? []);
		    }).catch(function() {
		      if (!cancelled) setHistory([]);
		    });
		    rpcCall(connection, "plan/list").then(function(value) {
		      if (!cancelled) setPlans(value.plans ?? []);
		    }).catch(function(err) {
		      if (!cancelled) {
		        setPlans([]);
		        setError("\u6E05\u7406\u65B9\u6848\u5217\u8868\u52A0\u8F7D\u5931\u8D25\uFF08\u5BBF\u4E3B\u53EF\u80FD\u4ECD\u5728\u8FD0\u884C\u65E7\u7248\u63D2\u4EF6\uFF0C\u8BF7\u91CD\u542F DSH \u52A0\u8F7D plan \u7AEF\u70B9\uFF09: " + (err.message ?? String(err)));
		      }
		    });
		    rpcCall(connection, "diff/list").then(function(value) {
		      if (!cancelled) setDiffs(value.diffs ?? []);
		    }).catch(function(err) {
		      if (!cancelled) {
		        setDiffs([]);
		        setError("\u5386\u53F2\u5DEE\u91CF\u5217\u8868\u52A0\u8F7D\u5931\u8D25\uFF08\u5BBF\u4E3B\u53EF\u80FD\u4ECD\u5728\u8FD0\u884C\u65E7\u7248\u63D2\u4EF6\uFF0C\u8BF7\u91CD\u542F DSH \u52A0\u8F7D diff \u7AEF\u70B9\uFF09: " + (err.message ?? String(err)));
		      }
		    });
		    return function() {
		      cancelled = true;
		    };
		  }, [connection]);
		  function handleDeleteReport(file) {
		    rpcCall(connection, "report/delete", { file }).then(function() {
		      setHistory(function(list) {
		        return (list ?? []).filter(function(r) {
		          return r.file !== file;
		        });
		      });
		    }).catch(function(err) {
		      setError(err.message ?? String(err));
		    });
		  }
		  function handleDeletePlan(file) {
		    rpcCall(connection, "plan/delete", { file }).then(function() {
		      setPlans(function(list) {
		        return (list ?? []).filter(function(p) {
		          return p.file !== file;
		        });
		      });
		    }).catch(function(err) {
		      setError(err.message ?? String(err));
		    });
		  }
		  function handleOpenPlan(file) {
		    rpcCall(connection, "plan/open", { file }).catch(function(err) {
		      setError(err.message ?? String(err));
		    });
		  }
		  function handleDeleteDiff(file) {
		    rpcCall(connection, "diff/delete", { file }).then(function() {
		      setDiffs(function(list) {
		        return (list ?? []).filter(function(d2) {
		          return d2.file !== file;
		        });
		      });
		    }).catch(function(err) {
		      setError(err.message ?? String(err));
		    });
		  }
		  function handleTogglePick(file) {
		    setDiffPicked(function(prev) {
		      var list = prev ?? [];
		      if (list.indexOf(file) >= 0) {
		        return list.filter(function(f2) {
		          return f2 !== file;
		        });
		      }
		      if (list.length >= 2) list = list.slice(1);
		      return list.concat([file]);
		    });
		  }
		  function handleDiffGo() {
		    if ((diffPicked ?? []).length === 2 && onDiff) {
		      onDiff(diffPicked[0], diffPicked[1]);
		      setDiffPicked([]);
		    }
		  }
		  var children = [];
		  children.push(
		    createElement2(
		      "div",
		      { className: "pcc-hero", key: "hero" },
		      createElement2("p", { className: "pcc-section-title" }, "\u78C1\u76D8\u7A7A\u95F4\u8BCA\u65AD"),
		      createElement2(
		        "p",
		        { className: "pcc-desc" },
		        "\u9009\u62E9\u626B\u63CF\u8303\u56F4\u540E\uFF0C\u63D2\u4EF6\u4F1A\u5728\u540E\u53F0\u5B8C\u6210 WinDirStat \u5F0F\u7EDF\u8BA1\uFF1B\u62A5\u544A\u4F1A\u4FDD\u5B58\u5230\u5DE5\u4F5C\u533A\uFF0C\u968F\u540E\u53EF\u76F4\u63A5\u4EA4\u7ED9 AI \u751F\u6210\u6E05\u7406\u65B9\u6848\u3002"
		      )
		    )
		  );
		  if (error) {
		    children.push(createElement2("p", { className: "pcc-error", key: "err" }, "\u26A0 " + error));
		  }
		  if (drives === null && !error) {
		    children.push(createElement2("p", { key: "loading", className: "pcc-desc" }, "\u6B63\u5728\u8BFB\u53D6\u76D8\u7B26\u5217\u8868\u2026"));
		  }
		  if (drives !== null) {
		    var totalBytes = drives.reduce(function(sum, d2) {
		      return sum + (d2.totalBytes ?? 0);
		    }, 0);
		    var freeBytes = drives.reduce(function(sum, d2) {
		      return sum + (d2.freeBytes ?? 0);
		    }, 0);
		    var usedPctAll = totalBytes > 0 ? Math.round((totalBytes - freeBytes) / totalBytes * 100) : 0;
		    children.push(createElement2(
		      "div",
		      { key: "drive-summary", className: "pcc-statrow" },
		      createElement2(
		        "div",
		        { className: "pcc-stat" },
		        createElement2("div", { className: "pcc-stat-value" }, drives.length),
		        createElement2("div", { className: "pcc-stat-label" }, "\u53EF\u626B\u63CF\u76D8\u7B26")
		      ),
		      createElement2(
		        "div",
		        { className: "pcc-stat" },
		        createElement2("div", { className: "pcc-stat-value" }, formatBytes(freeBytes)),
		        createElement2("div", { className: "pcc-stat-label" }, "\u5F53\u524D\u5269\u4F59\u7A7A\u95F4")
		      )
		    ));
		    children.push(createElement2("p", { key: "target-title", className: "pcc-section-title" }, "\u626B\u63CF\u76EE\u6807"));
		    children.push(
		      createElement2(
		        "div",
		        {
		          key: "all",
		          className: "pcc-drive",
		          "data-selected": selected === "all" || void 0,
		          onClick: function() {
		            setSelected("all");
		          }
		        },
		        createElement2("span", { className: "pcc-drive-label" }, "\u{1F4BD} \u6574\u4E2A\u786C\u76D8"),
		        createElement2(
		          "div",
		          { className: "pcc-capbar" },
		          createElement2("div", { className: "pcc-capbar-used", style: { width: usedPctAll + "%" } })
		        ),
		        createElement2(
		          "span",
		          { className: "pcc-drive-meta" },
		          "\u5DF2\u7528 " + usedPctAll + "% \xB7 \u5171 " + formatBytes(totalBytes) + " \xB7 \u5269\u4F59 " + formatBytes(freeBytes)
		        )
		      )
		    );
		    drives.forEach(function(d2) {
		      var usedPct = d2.totalBytes > 0 ? Math.round((d2.totalBytes - d2.freeBytes) / d2.totalBytes * 100) : 0;
		      children.push(
		        createElement2(
		          "div",
		          {
		            key: d2.drive,
		            className: "pcc-drive",
		            "data-selected": selected === d2.drive || void 0,
		            onClick: function() {
		              setSelected(d2.drive);
		            }
		          },
		          createElement2("span", { className: "pcc-drive-label" }, "\u{1F5B4} " + d2.drive + "\\"),
		          createElement2(
		            "div",
		            { className: "pcc-capbar" },
		            createElement2("div", { className: "pcc-capbar-used", style: { width: usedPct + "%" } })
		          ),
		          createElement2(
		            "span",
		            { className: "pcc-drive-meta" },
		            "\u5DF2\u7528 " + formatBytes(d2.totalBytes - d2.freeBytes) + " / " + formatBytes(d2.totalBytes) + "\uFF08\u5269\u4F59 " + formatBytes(d2.freeBytes) + "\uFF09"
		          )
		        )
		      );
		    });
		  }
		  children.push(
		    createElement2("button", {
		      key: "start",
		      className: "pcc-btn pcc-btn-primary",
		      style: { width: "100%", padding: "10px 0", marginTop: "6px" },
		      disabled: selected === null,
		      onClick: function() {
		        if (selected !== null) onStart(selected);
		      }
		    }, selected === null ? "\u8BF7\u5148\u9009\u62E9\u5206\u6790\u76EE\u6807" : "\u{1F680} \u5F00\u59CB\u5206\u6790" + (selected === "all" ? "\u6574\u4E2A\u786C\u76D8" : " " + selected + " \u76D8"))
		  );
		  if (history !== null && history.length > 0) {
		    children.push(createElement2(
		      "p",
		      { key: "hist-title", className: "pcc-section-title", style: { marginTop: "14px" } },
		      "\u{1F558} \u5386\u53F2\u5206\u6790\uFF08" + history.length + " \u4EFD\uFF09"
		    ));
		    var pickedCount = (diffPicked ?? []).length;
		    var diffable = (history ?? []).filter(function(r) {
		      return !r.legacy && r.hasDirs;
		    }).length;
		    if (diffable >= 2) {
		      children.push(createElement2(
		        "p",
		        { key: "diff-hint", className: "pcc-desc" },
		        pickedCount > 0 ? "\u2696 \u5DF2\u9009 " + pickedCount + "/2 \u4EFD\uFF0C\u9009\u6EE1\u4E24\u4EFD\u5373\u53EF\u751F\u6210\u5DEE\u91CF\u62A5\u544A\uFF08\u70B9\u5DF2\u9009\u4E2D\u7684\u5706\u5708\u53EF\u53D6\u6D88\uFF09" : "\u2696 \u52FE\u9009\u4E24\u4EFD\u62A5\u544A\u53EF\u751F\u6210\u5DEE\u91CF\u62A5\u544A\uFF0C\u67E5\u770B\u4E24\u6B21\u626B\u63CF\u4E4B\u95F4\u662F\u4EC0\u4E48\u5360\u7528\u4E86\u7A7A\u95F4\uFF08\u65E0\u9700\u91CD\u65B0\u626B\u63CF\uFF09"
		      ));
		    } else if (diffable === 1 && (history ?? []).length > 1) {
		      children.push(createElement2(
		        "p",
		        { key: "diff-hint", className: "pcc-desc" },
		        "\u26A0 \u4EC5 1 \u4EFD\u62A5\u544A\u6709\u5168\u91CF\u76EE\u5F55\u660E\u7EC6\uFF08\u65B0\u7248\u626B\u63CF\u751F\u6210\uFF09\uFF0C\u518D\u505A\u4E00\u6B21\u626B\u63CF\u540E\u5373\u53EF\u4F7F\u7528\u5DEE\u91CF\u5BF9\u6BD4"
		      ));
		    }
		    history.forEach(function(r) {
		      var scanned = (r.driveStats ?? []).reduce(function(sum, d2) {
		        return sum + (d2.scannedBytes ?? 0);
		      }, 0);
		      var target = (r.target ?? []).join("\u3001") || "-";
		      var when = r.createdAt ? new Date(r.createdAt).toLocaleString() : r.name ?? r.file;
		      var meta = r.legacy ? when + " \xB7 \u65E7\u683C\u5F0F\u62A5\u544A\uFF08\u5347\u7EA7\u524D\u751F\u6210\uFF0C\u65E0\u7ED3\u6784\u5316\u6570\u636E\uFF0C\u4EC5\u652F\u6301\u5220\u9664\uFF09" : when + " \xB7 " + target + " \xB7 " + formatBytes(scanned) + " \xB7 " + formatDuration(r.durationMs ?? 0);
		      var isPicked = (diffPicked ?? []).indexOf(r.file) >= 0;
		      children.push(
		        createElement2(
		          "div",
		          {
		            key: "hist-" + r.file,
		            className: "pcc-history-item",
		            "data-diff-base": isPicked || void 0
		          },
		          !r.legacy && r.hasDirs ? createElement2("button", {
		            className: "pcc-pick",
		            "data-on": isPicked || void 0,
		            title: isPicked ? "\u53D6\u6D88\u52FE\u9009" : "\u52FE\u9009\u53C2\u4E0E\u5DEE\u91CF\u5BF9\u6BD4",
		            onClick: function() {
		              handleTogglePick(r.file);
		            }
		          }, isPicked ? "\u2713" : "") : null,
		          createElement2("span", { className: "pcc-history-meta", title: meta }, meta),
		          r.legacy ? null : createElement2("button", {
		            className: "pcc-history-btn",
		            onClick: function() {
		              if (onViewReport) onViewReport(r.file);
		            }
		          }, "\u67E5\u770B"),
		          createElement2("button", {
		            className: "pcc-history-btn",
		            "data-danger": true,
		            onClick: function() {
		              handleDeleteReport(r.file);
		            }
		          }, "\u5220\u9664")
		        )
		      );
		    });
		    if (pickedCount === 2) {
		      children.push(createElement2("button", {
		        key: "diff-go",
		        className: "pcc-btn pcc-btn-primary",
		        style: { width: "100%", marginTop: "6px" },
		        onClick: handleDiffGo
		      }, "\u2696 \u751F\u6210\u5DEE\u91CF\u62A5\u544A\uFF08\u5BF9\u6BD4\u4E24\u6B21\u626B\u63CF\u7684\u53D8\u5316\uFF09"));
		    }
		  }
		  if (diffs !== null && diffs.length > 0) {
		    children.push(createElement2(
		      "p",
		      { key: "diffs-title", className: "pcc-section-title", style: { marginTop: "14px" } },
		      "\u2696 \u5386\u53F2\u5DEE\u91CF\uFF08" + diffs.length + " \u4EFD\uFF09"
		    ));
		    diffs.forEach(function(d2) {
		      var when = d2.createdAt ? new Date(d2.createdAt).toLocaleString() : d2.name ?? d2.file;
		      var pair = (d2.base?.name ?? "?") + " \u2192 " + (d2.target?.name ?? "?");
		      var meta = when + " \xB7 " + pair + " \xB7 " + (d2.changesCount ?? 0).toLocaleString() + " \u4E2A\u53D8\u5316\u76EE\u5F55";
		      children.push(
		        createElement2(
		          "div",
		          { key: "diff-" + d2.file, className: "pcc-history-item" },
		          createElement2("span", { className: "pcc-history-meta", title: meta }, meta),
		          createElement2("button", {
		            className: "pcc-history-btn",
		            onClick: function() {
		              if (onViewDiff) onViewDiff(d2.file);
		            }
		          }, "\u67E5\u770B"),
		          createElement2("button", {
		            className: "pcc-history-btn",
		            "data-danger": true,
		            onClick: function() {
		              handleDeleteDiff(d2.file);
		            }
		          }, "\u5220\u9664")
		        )
		      );
		    });
		  }
		  if (plans !== null && plans.length > 0) {
		    children.push(createElement2(
		      "p",
		      { key: "plan-title", className: "pcc-section-title", style: { marginTop: "14px" } },
		      "\u{1F4CB} \u6E05\u7406\u65B9\u6848\uFF08" + plans.length + " \u4EFD\uFF09"
		    ));
		    plans.forEach(function(p) {
		      var when = p.createdAt ? new Date(p.createdAt).toLocaleString() : p.name ?? p.file;
		      children.push(
		        createElement2(
		          "div",
		          { key: "plan-" + p.file, className: "pcc-history-item" },
		          createElement2("span", { className: "pcc-history-meta", title: when }, when),
		          createElement2("button", {
		            className: "pcc-history-btn",
		            onClick: function() {
		              if (onViewPlan) onViewPlan(p.file);
		            }
		          }, "\u67E5\u770B"),
		          createElement2("button", {
		            className: "pcc-history-btn",
		            onClick: function() {
		              handleOpenPlan(p.file);
		            }
		          }, "\u6253\u5F00"),
		          createElement2("button", {
		            className: "pcc-history-btn",
		            "data-danger": true,
		            onClick: function() {
		              handleDeletePlan(p.file);
		            }
		          }, "\u5220\u9664")
		        )
		      );
		    });
		  }
		  return createElement2("div", null, children);
		}

		// src/client/views/scanning-view.js
		var React4 = __toESM(require("react"), 1);

		// src/client/hooks/use-animated-number.js
		var React3 = __toESM(require("react"), 1);
		var useEffect4 = React3.useEffect;
		var useRef2 = React3.useRef;
		var useState4 = React3.useState;
		function useAnimatedNumber(target, resetKey) {
		  var initial = resetKey === void 0 && Number.isFinite(target) ? target : 0;
		  var valueState = useState4(initial);
		  var value = valueState[0];
		  var setValue = valueState[1];
		  var valueRef = useRef2(value);
		  var frameRef = useRef2(null);
		  var resetKeyRef = useRef2(resetKey);
		  useEffect4(function() {
		    var shouldReset = resetKey !== void 0 && resetKey !== resetKeyRef.current;
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
		    return function() {
		      if (frameRef.current) {
		        cancelAnimationFrame(frameRef.current);
		        frameRef.current = null;
		      }
		    };
		  }, [target, resetKey]);
		  return value;
		}

		// src/client/views/scanning-view.js
		var useEffect6 = React4.useEffect;
		var createElement4 = React4.createElement;
		function ScanningView(props) {
		  var status = props.status ?? {};
		  var elapsed = status.elapsedMs ?? 0;
		  var targetDirs = status.dirsScanned ?? 0;
		  var dirsScanned = useAnimatedNumber(targetDirs);
		  var cancelled = status.state === "cancelled";
		  var cancelling = status.state === "cancelling";
		  var driveLabel = cancelled ? "\u626B\u63CF\u5DF2\u53D6\u6D88" : cancelling ? "\u6B63\u5728\u53D6\u6D88\u626B\u63CF\u2026" : status.driveCount > 1 && status.currentDrive ? "\u6B63\u5728\u626B\u63CF " + status.currentDrive + "\uFF08\u7B2C " + status.driveIndex + "/" + status.driveCount + " \u4E2A\u76D8\u7B26\uFF09" : status.state === "done" ? "\u626B\u63CF\u5B8C\u6210" : "\u6B63\u5728\u626B\u63CF\u2026";
		  useEffect6(function() {
		    if (status.state === "done" && dirsScanned >= targetDirs) {
		      var timer = setTimeout(function() {
		        props.onReadyToShowResult?.();
		      }, 180);
		      return function() {
		        clearTimeout(timer);
		      };
		    }
		  }, [status.state, dirsScanned, targetDirs, props.onReadyToShowResult]);
		  return createElement4(
		    "div",
		    null,
		    createElement4(
		      "div",
		      { className: "pcc-progress-card" },
		      createElement4(
		        "p",
		        { className: "pcc-desc" },
		        cancelled ? null : createElement4("span", { className: "pcc-pulse" }),
		        driveLabel
		      ),
		      createElement4(
		        "div",
		        { className: "pcc-progress-num" },
		        dirsScanned.toLocaleString()
		      ),
		      createElement4(
		        "p",
		        { className: "pcc-section-title", style: { textAlign: "center" } },
		        "\u5DF2\u626B\u63CF\u76EE\u5F55\u6570"
		      ),
		      createElement4(
		        "p",
		        { className: "pcc-progress-path", title: status.currentPath ?? "" },
		        status.currentPath ?? "\u6B63\u5728\u5EFA\u7ACB\u76EE\u5F55\u7D22\u5F15\u2026"
		      )
		    ),
		    createElement4(
		      "div",
		      { className: "pcc-statrow" },
		      createElement4(
		        "div",
		        { className: "pcc-stat" },
		        createElement4("div", { className: "pcc-stat-value" }, formatDuration(elapsed)),
		        createElement4("div", { className: "pcc-stat-label" }, "\u5DF2\u7528\u65F6")
		      ),
		      createElement4(
		        "div",
		        { className: "pcc-stat" },
		        createElement4("div", { className: "pcc-stat-value" }, status.driveCount ?? "-"),
		        createElement4("div", { className: "pcc-stat-label" }, "\u76D8\u7B26\u603B\u6570")
		      )
		    ),
		    createElement4("button", {
		      className: cancelled ? "pcc-btn pcc-btn-primary" : "pcc-btn pcc-btn-danger",
		      style: { width: "100%", marginTop: "14px" },
		      disabled: cancelling,
		      onClick: cancelled ? props.onRestart : props.onCancel
		    }, cancelled ? "\u91CD\u65B0\u5F00\u59CB" : cancelling ? "\u6B63\u5728\u53D6\u6D88\u2026" : "\u2715 \u53D6\u6D88\u626B\u63CF")
		  );
		}

		// src/client/views/result-view.js
		var React6 = __toESM(require("react"), 1);

		// src/client/chat.js
		function setChatInputValue(input, message) {
		  if (input.getAttribute && input.getAttribute("contenteditable") === "true") {
		    input.textContent = message;
		    input.dispatchEvent(new InputEvent("input", { bubbles: true, inputType: "insertText", data: message }));
		    return;
		  }
		  var proto = input.tagName === "TEXTAREA" ? window.HTMLTextAreaElement.prototype : window.HTMLInputElement.prototype;
		  var setter = Object.getOwnPropertyDescriptor(proto, "value")?.set;
		  if (setter) {
		    setter.call(input, message);
		  } else {
		    input.value = message;
		  }
		  input.dispatchEvent(new Event("input", { bubbles: true }));
		}
		function isVisibleElement(element) {
		  if (!element || element.disabled || element.readOnly) return false;
		  if (element.closest && element.closest(".pcc-panel")) return false;
		  if (typeof element.getClientRects === "function" && element.getClientRects().length === 0) return false;
		  return true;
		}
		function findChatInput(root) {
		  var scope = root ?? document;
		  var selectors = [
		    'textarea[placeholder*="\u63CF\u8FF0"]',
		    'textarea[placeholder*="\u8F93\u5165"]',
		    'textarea[placeholder*="message"]',
		    'textarea[placeholder*="Message"]',
		    'textarea[aria-label*="\u6D88\u606F"]',
		    'textarea[aria-label*="message"]',
		    '[contenteditable="true"][role="textbox"]',
		    // 兼容旧版/当前 DSH 未提供 placeholder、aria-label 或 role 的输入框。
		    // 通用选择器必须放最后，并继续经过可见性与面板范围过滤。
		    "textarea",
		    '[contenteditable="true"]'
		  ];
		  for (var i = 0; i < selectors.length; i++) {
		    var matches = scope.querySelectorAll(selectors[i]);
		    for (var j = 0; j < matches.length; j++) {
		      if (isVisibleElement(matches[j])) return matches[j];
		    }
		  }
		  return null;
		}
		function isUsableSubmitButton(button) {
		  if (!button || button.disabled) return false;
		  var aria = (button.getAttribute("aria-label") ?? "") + " " + (button.getAttribute("title") ?? "");
		  var text2 = button.textContent ?? "";
		  var label = (aria + " " + text2).toLowerCase();
		  if (/发送|send|submit|arrow|enter/.test(label)) return true;
		  return button.type === "submit";
		}
		function findSubmitButton(input) {
		  var scopes = [];
		  var form = input.closest ? input.closest("form") : null;
		  if (form) scopes.push(form);
		  var parent = input.parentElement;
		  for (var i = 0; parent && i < 3; i++) {
		    scopes.push(parent);
		    parent = parent.parentElement;
		  }
		  for (var s = 0; s < scopes.length; s++) {
		    var buttons = scopes[s].querySelectorAll(
		      'button[type="submit"],button[aria-label*="\u53D1\u9001"],button[title*="\u53D1\u9001"],button[aria-label*="Send"],button[title*="Send"],button[aria-label*="send"],button[title*="send"]'
		    );
		    for (var b2 = 0; b2 < buttons.length; b2++) {
		      if (isUsableSubmitButton(buttons[b2])) return buttons[b2];
		    }
		  }
		  return null;
		}
		async function submitChatInput(message) {
		  var input = findChatInput();
		  if (!input) throw new Error("\u627E\u4E0D\u5230\u5F53\u524D\u4F1A\u8BDD\u7684\u804A\u5929\u8F93\u5165\u6846\uFF0C\u65E0\u6CD5\u81EA\u52A8\u53D1\u9001");
		  setChatInputValue(input, message);
		  input.focus();
		  await new Promise(function(resolve) {
		    if (typeof requestAnimationFrame === "function") requestAnimationFrame(resolve);
		    else setTimeout(resolve, 0);
		  });
		  var form = input.closest ? input.closest("form") : null;
		  if (form && typeof form.requestSubmit === "function") {
		    form.requestSubmit();
		    return { channel: "dom.form", accepted: true };
		  }
		  var button = findSubmitButton(input);
		  if (button) {
		    button.click();
		    return { channel: "dom.button", accepted: true };
		  }
		  input.dispatchEvent(new KeyboardEvent("keydown", {
		    key: "Enter",
		    code: "Enter",
		    keyCode: 13,
		    which: 13,
		    bubbles: true,
		    cancelable: true
		  }));
		  input.dispatchEvent(new KeyboardEvent("keyup", {
		    key: "Enter",
		    code: "Enter",
		    keyCode: 13,
		    which: 13,
		    bubbles: true,
		    cancelable: true
		  }));
		  return { channel: "dom.keyboard", accepted: true };
		}
		function optionalService(ctx, name) {
		  try {
		    if (ctx && typeof ctx.get === "function") {
		      var viaGet = ctx.get(name, false);
		      if (viaGet) return viaGet;
		    }
		  } catch {
		  }
		  try {
		    return ctx ? ctx[name] : null;
		  } catch {
		    return null;
		  }
		}
		async function sendViaClientApi(ctx, message) {
		  var chat = optionalService(ctx, "chat");
		  if (!chat || typeof chat.sendMessage !== "function") return null;
		  await chat.sendMessage(message);
		  return { channel: "chat.sendMessage", accepted: true };
		}
		async function sendChatMessage(ctx, message) {
		  if (typeof message !== "string" || message.trim().length === 0) {
		    throw new Error("\u53D1\u9001\u5185\u5BB9\u4E0D\u80FD\u4E3A\u7A7A");
		  }
		  var apiResult = await sendViaClientApi(ctx, message);
		  if (apiResult) return apiResult;
		  return submitChatInput(message);
		}
		function buildFileReference(filePath) {
		  var path = typeof filePath === "string" ? filePath.trim() : "";
		  if (!path) throw new Error("\u7F3A\u5C11\u53EF\u4F9B AI \u8BFB\u53D6\u7684\u6587\u4EF6\u8DEF\u5F84");
		  if (/[\r\n\0"]/.test(path)) throw new Error("\u6587\u4EF6\u8DEF\u5F84\u5305\u542B\u4E0D\u652F\u6301\u7684\u5B57\u7B26");
		  var fileName = path.split(/[\\/]/).pop();
		  if (!fileName || fileName === "." || fileName === "..") {
		    throw new Error("\u65E0\u6CD5\u4ECE\u8DEF\u5F84\u4E2D\u8BC6\u522B\u6587\u4EF6\u540D");
		  }
		  return "@" + fileName;
		}
		function buildPlanFollowUpPrompt(filePath) {
		  return buildFileReference(filePath) + " \u8BF7\u6309\u6B64\u6E05\u7406\u65B9\u6848\u8DDF\u8FDB\uFF1A\u5148\u7528 clean_disk \u7684 estimate \u6A21\u5F0F\u6838\u5B9E\u5404\u9879\u53EF\u56DE\u6536\u7A7A\u95F4\uFF0C\u5217\u51FA\u6838\u5B9E\u7ED3\u679C\u5E76\u4E0E\u6211\u786E\u8BA4\u540E\uFF0C\u518D\u6267\u884C\u5B9E\u9645\u6E05\u7406\u3002";
		}
		function buildAnalysisPrompt(result) {
		  var lines = [];
		  if (result.resultFile) {
		    return buildFileReference(result.resultFile);
		  }
		  lines.push("\u6211\u7528\u300C\u78C1\u76D8\u54E8\u5175\u300D\u5B8C\u6210\u4E86\u78C1\u76D8\u7A7A\u95F4\u626B\u63CF\uFF08\u6570\u636E\u5DF2\u83B7\u53D6\uFF0C\u65E0\u9700\u518D\u8C03\u7528\u4EFB\u4F55\u626B\u63CF\u5DE5\u5177\uFF0C\u7981\u6B62\u91CD\u65B0\u5168\u76D8\u626B\u63CF\uFF09\uFF0C\u6458\u8981\u5982\u4E0B\uFF1A");
		  lines.push("");
		  lines.push("## \u5404\u76D8\u7B26\u6982\u51B5");
		  lines.push("| \u76D8\u7B26 | \u603B\u5BB9\u91CF | \u5269\u4F59 | \u626B\u63CF\u7EDF\u8BA1\u5230\u7684\u6570\u636E\u91CF | \u6587\u4EF6\u6570 | \u76EE\u5F55\u6570 | \u626B\u63CF\u8017\u65F6 |");
		  lines.push("|------|--------|------|--------------------|--------|--------|----------|");
		  (result.driveStats ?? []).forEach(function(d2) {
		    lines.push(
		      "| " + d2.drive + " | " + formatBytes(d2.totalBytes) + " | " + formatBytes(d2.freeBytes) + " | " + formatBytes(d2.scannedBytes) + " | " + d2.fileCount + " | " + d2.dirCount + " | " + formatDuration(result.durationMs ?? 0) + " |"
		    );
		  });
		  lines.push("");
		  var dirs = result.topDirectories ?? [];
		  lines.push("## Top " + Math.min(30, dirs.length) + " \u5927\u76EE\u5F55");
		  lines.push("| \u8DEF\u5F84 | \u5927\u5C0F | \u6587\u4EF6\u6570 |");
		  lines.push("|------|------|--------|");
		  dirs.slice(0, 30).forEach(function(d2) {
		    lines.push("| " + d2.path + " | " + formatBytes(d2.size) + " | " + (d2.fileCount ?? "-") + " |");
		  });
		  lines.push("");
		  var files = result.topFiles ?? [];
		  lines.push("## Top " + Math.min(30, files.length) + " \u5927\u6587\u4EF6");
		  lines.push("| \u8DEF\u5F84 | \u5927\u5C0F | \u4FEE\u6539\u65E5\u671F |");
		  lines.push("|------|------|----------|");
		  files.slice(0, 30).forEach(function(f2) {
		    lines.push("| " + f2.path + " | " + formatBytes(f2.size) + " | " + formatDate(f2.lastModified) + " |");
		  });
		  lines.push("");
		  lines.push("\u8BF7\u57FA\u4E8E\u4EE5\u4E0A\u626B\u63CF\u6570\u636E\uFF0C\u7ED9\u51FA\u78C1\u76D8\u6E05\u7406\u5206\u6790\u62A5\u544A\uFF1A");
		  lines.push("1. **\u53EF\u4EE5\u5B89\u5168\u5220\u9664\u7684**\uFF1A\u660E\u786E\u5217\u51FA\u8DEF\u5F84\u3001\u7406\u7531\u548C\u9884\u4F30\u53EF\u56DE\u6536\u7A7A\u95F4\uFF08\u5982\u4E34\u65F6\u6587\u4EF6\u3001\u7F13\u5B58\u3001\u4F11\u7720\u6587\u4EF6\u7B49\uFF09\uFF1B");
		  lines.push("2. **\u7EDD\u5BF9\u4E0D\u80FD\u52A8\u7684**\uFF1A\u7CFB\u7EDF\u5173\u952E\u6587\u4EF6/\u76EE\u5F55\uFF08\u5982 pagefile.sys\u3001\u7CFB\u7EDF\u7EC4\u4EF6\uFF09\uFF0C\u8BF4\u660E\u4E3A\u4EC0\u4E48\uFF1B");
		  lines.push("3. **\u9002\u5408\u79FB\u52A8\u5230\u5176\u4ED6\u76D8\u7684**\uFF1A\u5982\u5927\u4F53\u79EF\u53EF\u8FC1\u79FB\u7684\u5F00\u53D1\u7F13\u5B58\u3001\u865A\u62DF\u673A\u955C\u50CF\u3001\u4E0B\u8F7D\u76EE\u5F55\u7B49\uFF0C\u7ED9\u51FA\u8FC1\u79FB\u5EFA\u8BAE\uFF1B");
		  lines.push("4. **\u5EFA\u8BAE\u7684\u6E05\u7406\u987A\u5E8F**\uFF1A\u6309\u300C\u6536\u76CA\u5927\u3001\u98CE\u9669\u4F4E\u4F18\u5148\u300D\u6392\u5E8F\u3002");
		  lines.push("\u76F4\u63A5\u57FA\u4E8E\u4E0A\u8FF0\u6570\u636E\u5206\u6790\u5373\u53EF\uFF1B\u82E5\u786E\u6709\u9700\u8981\u53EF\u4EE5\u7528 clean_disk \u7684 estimate \u6A21\u5F0F\u6838\u5B9E\u67D0\u4E2A\u7C7B\u522B\uFF0C\u4F46\u4E0D\u8981\u91CD\u65B0\u5168\u76D8\u626B\u63CF\u3002");
		  lines.push("\u6CE8\u610F\uFF1A\u6267\u884C\u6E05\u7406\u65F6\u4E0D\u8981\u5220\u9664\u300C\u78C1\u76D8\u54E8\u5175\u300D\u5DE5\u4F5C\u533A\u76EE\u5F55\uFF08\u542B\u626B\u63CF\u62A5\u544A\uFF09\u4EE5\u53CA\u5176\u4ED6 DSH \u81EA\u8EAB\u7684\u4E34\u65F6\u6587\u4EF6\u3002");
		  return lines.join("\n");
		}
		function buildDiffAnalysisPrompt(result) {
		  if (result.resultFile) {
		    return buildFileReference(result.resultFile);
		  }
		  var base = result.base ?? {};
		  var target = result.target ?? {};
		  var lines = [];
		  lines.push("\u6211\u7528\u300C\u78C1\u76D8\u54E8\u5175\u300D\u5BF9\u6BD4\u4E86\u4E24\u6B21\u78C1\u76D8\u626B\u63CF\u7684\u5DEE\u91CF\uFF08\u6570\u636E\u5DF2\u83B7\u53D6\uFF0C\u65E0\u9700\u518D\u8C03\u7528\u4EFB\u4F55\u626B\u63CF\u5DE5\u5177\uFF0C\u7981\u6B62\u91CD\u65B0\u5168\u76D8\u626B\u63CF\uFF09\uFF0C\u5DEE\u91CF\u6458\u8981\u5982\u4E0B\uFF1A");
		  lines.push("");
		  lines.push("- **\u57FA\u51C6\u626B\u63CF**: " + (base.name ?? "?") + "\uFF08" + (base.createdAt ? new Date(base.createdAt).toLocaleString() : "-") + "\uFF09");
		  lines.push("- **\u76EE\u6807\u626B\u63CF**: " + (target.name ?? "?") + "\uFF08" + (target.createdAt ? new Date(target.createdAt).toLocaleString() : "-") + "\uFF09");
		  lines.push("");
		  if ((result.driveDeltas ?? []).length > 0) {
		    lines.push("## \u5404\u76D8\u7B26\u53D8\u5316");
		    lines.push("| \u76D8\u7B26 | \u5269\u4F59\u7A7A\u95F4\u53D8\u5316 | \u626B\u63CF\u91CF\u53D8\u5316 |");
		    lines.push("|------|--------------|-------------|");
		    (result.driveDeltas ?? []).forEach(function(d2) {
		      lines.push("| " + d2.drive + " | " + (d2.freeDelta > 0 ? "+" : "") + formatBytes(d2.freeDelta) + " | " + (d2.scannedDelta > 0 ? "+" : "") + formatBytes(d2.scannedDelta) + " |");
		    });
		    lines.push("");
		  }
		  var pushList = function(title, list, cols) {
		    if (!list || list.length === 0) return;
		    lines.push("## " + title);
		    lines.push("| " + cols.map(function(c) {
		      return c[0];
		    }).join(" | ") + " |");
		    lines.push("|" + cols.map(function() {
		      return "------";
		    }).join("|") + "|");
		    list.slice(0, 10).forEach(function(item) {
		      lines.push("| " + cols.map(function(c) {
		        return c[1](item);
		      }).join(" | ") + " |");
		    });
		    lines.push("");
		  };
		  pushList("Top \u589E\u957F\u76EE\u5F55", result.growth, [
		    ["\u8DEF\u5F84", function(g) {
		      return g.path;
		    }],
		    ["\u53D8\u5316", function(g) {
		      return "+" + formatBytes(g.delta);
		    }]
		  ]);
		  pushList("Top \u7F29\u5C0F\u76EE\u5F55", result.shrink, [
		    ["\u8DEF\u5F84", function(s) {
		      return s.path;
		    }],
		    ["\u53D8\u5316", function(s) {
		      return formatBytes(s.delta);
		    }]
		  ]);
		  pushList("\u65B0\u589E\u76EE\u5F55", result.added, [
		    ["\u8DEF\u5F84", function(a) {
		      return a.path;
		    }],
		    ["\u5927\u5C0F", function(a) {
		      return formatBytes(a.size);
		    }]
		  ]);
		  pushList("\u6D88\u5931\u76EE\u5F55", result.removed, [
		    ["\u8DEF\u5F84", function(r) {
		      return r.path;
		    }],
		    ["\u539F\u5927\u5C0F", function(r) {
		      return formatBytes(r.size);
		    }]
		  ]);
		  lines.push("\u8BF7\u57FA\u4E8E\u4EE5\u4E0A\u5DEE\u91CF\u6570\u636E\u7ED9\u51FA\u7A7A\u95F4\u53D8\u5316\u5206\u6790\uFF1A");
		  lines.push("1. **\u7A7A\u95F4\u589E\u957F\u4E3B\u56E0**\uFF1A\u6307\u51FA\u54EA\u4E9B\u76EE\u5F55\u56E0\u4F55\u589E\u957F\uFF08\u7F13\u5B58\u5806\u79EF\u3001\u65E5\u5FD7\u81A8\u80C0\u3001\u65B0\u88C5\u8F6F\u4EF6\u7B49\uFF09\uFF1B");
		  lines.push("2. **\u53EF\u4EE5\u5B89\u5168\u56DE\u6536\u7684**\uFF1A\u660E\u786E\u5217\u51FA\u8DEF\u5F84\u3001\u7406\u7531\u548C\u9884\u4F30\u53EF\u56DE\u6536\u7A7A\u95F4\uFF1B");
		  lines.push("3. **\u7EDD\u5BF9\u4E0D\u80FD\u52A8\u7684**\uFF1A\u7CFB\u7EDF\u5173\u952E\u6587\u4EF6/\u76EE\u5F55\uFF0C\u8BF4\u660E\u4E3A\u4EC0\u4E48\uFF1B");
		  lines.push("4. **\u5EFA\u8BAE\u7684\u5904\u7406\u987A\u5E8F**\uFF1A\u6309\u300C\u6536\u76CA\u5927\u3001\u98CE\u9669\u4F4E\u4F18\u5148\u300D\u6392\u5E8F\u3002");
		  lines.push("\u76F4\u63A5\u57FA\u4E8E\u4E0A\u8FF0\u6570\u636E\u5206\u6790\u5373\u53EF\uFF1B\u82E5\u786E\u6709\u9700\u8981\u53EF\u4EE5\u7528 clean_disk \u7684 estimate \u6A21\u5F0F\u6838\u5B9E\u67D0\u4E2A\u7C7B\u522B\uFF0C\u4F46\u4E0D\u8981\u91CD\u65B0\u5168\u76D8\u626B\u63CF\u3002");
		  lines.push("\u6CE8\u610F\uFF1A\u6267\u884C\u6E05\u7406\u65F6\u4E0D\u8981\u5220\u9664\u300C\u78C1\u76D8\u54E8\u5175\u300D\u5DE5\u4F5C\u533A\u76EE\u5F55\uFF08\u542B\u672C\u62A5\u544A\uFF09\u4EE5\u53CA\u5176\u4ED6 DSH \u81EA\u8EAB\u7684\u4E34\u65F6\u6587\u4EF6\u3002");
		  return lines.join("\n");
		}

		// src/client/views/tree-toggle.js
		var React5 = __toESM(require("react"), 1);
		var createElement6 = React5.createElement;
		function TreeToggle(props) {
		  var hasChildren = !!props.hasChildren;
		  if (!hasChildren) {
		    return createElement6("span", {
		      className: "pcc-tree-toggle pcc-tree-toggle-spacer",
		      "aria-hidden": true
		    });
		  }
		  return createElement6(
		    "button",
		    {
		      type: "button",
		      className: "pcc-tree-toggle",
		      "data-open": props.isOpen || void 0,
		      "aria-label": props.label || (props.isOpen ? "\u6536\u8D77\u76EE\u5F55" : "\u5C55\u5F00\u76EE\u5F55"),
		      "aria-expanded": !!props.isOpen,
		      onClick: function(event) {
		        event.stopPropagation();
		        if (props.onToggle) props.onToggle();
		      }
		    },
		    createElement6(
		      "svg",
		      {
		        viewBox: "0 0 16 16",
		        width: "14",
		        height: "14",
		        "aria-hidden": true
		      },
		      createElement6("path", {
		        d: "M6 4l4 4-4 4",
		        fill: "none",
		        stroke: "currentColor",
		        strokeWidth: "1.8",
		        strokeLinecap: "round",
		        strokeLinejoin: "round"
		      })
		    )
		  );
		}

		// src/client/views/result-view.js
		var useState6 = React6.useState;
		var useEffect8 = React6.useEffect;
		var createElement8 = React6.createElement;
		function DirTreeView(props) {
		  var connection = props.connection;
		  var file = props.file;
		  var loadState = useState6("loading");
		  var load = loadState[0];
		  var setLoad = loadState[1];
		  var errMsgState = useState6(null);
		  var errMsg = errMsgState[0];
		  var setErrMsg = errMsgState[1];
		  var modelState = useState6(null);
		  var model = modelState[0];
		  var setModel = modelState[1];
		  var expandedState = useState6(null);
		  var expanded = expandedState[0];
		  var setExpanded = expandedState[1];
		  useEffect8(function() {
		    var cancelled = false;
		    setLoad("loading");
		    setErrMsg(null);
		    rpcCall(connection, "report/tree", { file }).then(function(value) {
		      if (cancelled) return;
		      var dirs = value.dirs ?? [];
		      var childrenOf = /* @__PURE__ */ new Map();
		      var metaOf = /* @__PURE__ */ new Map();
		      var roots = [];
		      for (var i2 = 0; i2 < dirs.length; i2++) {
		        metaOf.set(dirs[i2].p, { s: dirs[i2].s, f: dirs[i2].f });
		      }
		      for (var i2 = 0; i2 < dirs.length; i2++) {
		        var p = dirs[i2].p;
		        if (isRootPath(p)) {
		          roots.push(p);
		          continue;
		        }
		        var cut = p.lastIndexOf("\\");
		        var parent = cut === 2 && p.charAt(1) === ":" ? p.slice(0, 3) : p.slice(0, cut);
		        if (!metaOf.has(parent)) {
		          roots.push(p);
		        } else {
		          var list = childrenOf.get(parent);
		          if (!list) childrenOf.set(parent, list = []);
		          list.push(p);
		        }
		      }
		      childrenOf.forEach(function(list2) {
		        list2.sort(function(a, b2) {
		          return (metaOf.get(b2)?.s ?? 0) - (metaOf.get(a)?.s ?? 0);
		        });
		      });
		      roots.sort(function(a, b2) {
		        return (metaOf.get(b2)?.s ?? 0) - (metaOf.get(a)?.s ?? 0);
		      });
		      var totalSize = roots.reduce(function(sum, r) {
		        return sum + (metaOf.get(r)?.s ?? 0);
		      }, 0) || 1;
		      var init = new Set(roots);
		      setModel({ childrenOf, metaOf, roots, totalSize });
		      setExpanded(init);
		      setLoad("ready");
		    }).catch(function(err) {
		      if (cancelled) return;
		      setErrMsg(err.message ?? String(err));
		      setLoad("error");
		    });
		    return function() {
		      cancelled = true;
		    };
		  }, [connection, file]);
		  function toggle(path) {
		    setExpanded(function(prev) {
		      var next = new Set(prev ?? []);
		      if (next.has(path)) next.delete(path);
		      else next.add(path);
		      return next;
		    });
		  }
		  var children = [];
		  children.push(createElement8("p", { key: "title", className: "pcc-section-title" }, "\u{1F333} \u76EE\u5F55\u6811\uFF08\u70B9\u51FB\u5C55\u5F00/\u6536\u8D77\uFF0C\u6309\u5927\u5C0F\u964D\u5E8F\uFF09"));
		  if (load === "loading") {
		    children.push(createElement8(
		      "p",
		      { key: "loading", className: "pcc-desc" },
		      "\u6B63\u5728\u52A0\u8F7D\u5168\u91CF\u76EE\u5F55\u660E\u7EC6\u2026\uFF08\u6570\u636E\u8F83\u5927\uFF0C\u7EA6\u6570\u79D2\uFF09"
		    ));
		  } else if (load === "error") {
		    children.push(createElement8("p", { key: "err", className: "pcc-error" }, "\u26A0 " + errMsg));
		    return createElement8("div", null, children);
		  } else if (!model || (model.roots ?? []).length === 0) {
		    children.push(createElement8("p", { key: "empty", className: "pcc-desc" }, "\u65E0\u76EE\u5F55\u6570\u636E"));
		  } else {
		    let renderNode = function(path, depth) {
		      var meta = model.metaOf.get(path) ?? { s: 0, f: 0 };
		      var kids = model.childrenOf.get(path);
		      var hasKids = !!(kids && kids.length > 0);
		      var isOpen = expanded ? expanded.has(path) : false;
		      var width = Math.max(1, Math.round(meta.s / model.totalSize * 100));
		      var rows2 = [];
		      rows2.push(
		        createElement8(
		          "div",
		          {
		            key: path,
		            className: "pcc-tree-row",
		            "data-leaf": !hasKids || void 0,
		            style: { paddingLeft: depth * 14 + "px" },
		            title: path + "\n\u5927\u5C0F " + formatBytes(meta.s) + " \xB7 " + (meta.f ?? 0).toLocaleString() + " \u4E2A\u6587\u4EF6",
		            onClick: function() {
		              if (hasKids) toggle(path);
		            }
		          },
		          createElement8("div", { className: "pcc-row-bar", style: { width: width + "%" } }),
		          createElement8(TreeToggle, {
		            hasChildren: hasKids,
		            isOpen,
		            label: (isOpen ? "\u6536\u8D77 " : "\u5C55\u5F00 ") + baseName(path),
		            onToggle: function() {
		              toggle(path);
		            }
		          }),
		          createElement8("span", { className: "pcc-tree-name" }, "\u{1F4C1} " + baseName(path)),
		          createElement8("span", { className: "pcc-tree-meta" }, (meta.f ?? 0).toLocaleString() + " \u6587\u4EF6"),
		          createElement8("span", { className: "pcc-tree-size" }, formatBytes(meta.s))
		        )
		      );
		      if (isOpen && hasKids) {
		        var shown = Math.min(kids.length, 100);
		        for (var i2 = 0; i2 < shown; i2++) {
		          rows2.push(renderNode(kids[i2], depth + 1));
		        }
		        if (kids.length > shown) {
		          rows2.push(createElement8("div", {
		            key: path + "-more",
		            className: "pcc-tree-more",
		            style: { paddingLeft: (depth + 1) * 14 + "px" }
		          }, "\u2026\u5DF2\u6309\u5927\u5C0F\u5C55\u793A\u524D " + shown + " \u4E2A\u5B50\u76EE\u5F55\uFF0C\u5171 " + kids.length.toLocaleString() + " \u4E2A"));
		        }
		      }
		      return rows2;
		    };
		    for (var i = 0; i < model.roots.length; i++) {
		      var rows = renderNode(model.roots[i], 0);
		      for (var j = 0; j < rows.length; j++) children.push(rows[j]);
		    }
		    children.push(createElement8(
		      "p",
		      { key: "tree-hint", className: "pcc-desc", style: { marginTop: "6px" } },
		      "\u63D0\u793A\uFF1A\u76EE\u5F55\u6309\u5927\u5C0F\u964D\u5E8F\u6392\u5217\uFF0C\u80CC\u666F\u6761\u5BBD\u5EA6\u4E3A\u76F8\u5BF9\u5168\u90E8\u626B\u63CF\u91CF\u7684\u5360\u6BD4\uFF1B\u53F6\u5B50\u76EE\u5F55\u7684\u6587\u4EF6\u6570\u4E3A\u5176\u76F4\u63A5\u5B50\u6587\u4EF6\u6570\u3002"
		    ));
		  }
		  return createElement8("div", null, children);
		}
		function ResultView(props) {
		  var result = props.result;
		  var onRescan = props.onRescan;
		  var aiState = useState6(null);
		  var aiPrompt = aiState[0];
		  var setAiPrompt = aiState[1];
		  var sendState = useState6("idle");
		  var sendStatus = sendState[0];
		  var setSendStatus = sendState[1];
		  var sendErrorState = useState6(null);
		  var sendError = sendErrorState[0];
		  var setSendError = sendErrorState[1];
		  var dirsAllState = useState6(false);
		  var dirsAll = dirsAllState[0];
		  var setDirsAll = dirsAllState[1];
		  var filesAllState = useState6(false);
		  var filesAll = filesAllState[0];
		  var setFilesAll = filesAllState[1];
		  var tabState = useState6("list");
		  var tab = tabState[0];
		  var setTab = tabState[1];
		  var reportFile = props.reportFile || null;
		  if (!reportFile && result.resultFile) {
		    var mdName = String(result.resultFile).split(/[\\/]/).pop();
		    if (/\.md$/.test(mdName)) reportFile = mdName.replace(/\.md$/, ".json");
		  }
		  useEffect8(function() {
		    try {
		      setAiPrompt(buildAnalysisPrompt(result));
		      setSendStatus("idle");
		      setSendError(null);
		    } catch (err) {
		      setAiPrompt(null);
		      setSendStatus("error");
		      setSendError(err.message ?? String(err));
		    }
		  }, [result]);
		  var maxSize = Math.max(
		    1,
		    (result.topDirectories ?? []).reduce(function(m2, d2) {
		      return Math.max(m2, d2.size);
		    }, 0)
		  );
		  var scannedTotal = (result.driveStats ?? []).reduce(function(sum, d2) {
		    return sum + (d2.scannedBytes ?? 0);
		  }, 0);
		  var children = [];
		  children.push(createElement8(
		    "div",
		    { key: "summary", className: "pcc-statrow" },
		    createElement8(
		      "div",
		      { className: "pcc-stat" },
		      createElement8("div", { className: "pcc-stat-value" }, formatBytes(scannedTotal)),
		      createElement8("div", { className: "pcc-stat-label" }, "\u626B\u63CF\u7EDF\u8BA1\u5230")
		    ),
		    createElement8(
		      "div",
		      { className: "pcc-stat" },
		      createElement8("div", { className: "pcc-stat-value" }, (result.totalDirsScanned ?? 0).toLocaleString()),
		      createElement8("div", { className: "pcc-stat-label" }, "\u5DF2\u626B\u63CF\u76EE\u5F55")
		    ),
		    createElement8(
		      "div",
		      { className: "pcc-stat" },
		      createElement8("div", { className: "pcc-stat-value" }, formatDuration(result.durationMs ?? 0)),
		      createElement8("div", { className: "pcc-stat-label" }, "\u626B\u63CF\u8017\u65F6")
		    )
		  ));
		  (result.driveStats ?? []).forEach(function(d2) {
		    var usedPct = d2.totalBytes > 0 ? Math.round((d2.totalBytes - d2.freeBytes) / d2.totalBytes * 100) : 0;
		    children.push(
		      createElement8(
		        "div",
		        { key: "stat-" + d2.drive, className: "pcc-drive-stat" },
		        createElement8(
		          "p",
		          { className: "pcc-section-title" },
		          "\u{1F5B4} " + d2.drive + " \xB7 \u5DF2\u7528 " + usedPct + "%"
		        ),
		        createElement8(
		          "div",
		          { className: "pcc-capbar", style: { marginBottom: "6px" } },
		          createElement8("div", { className: "pcc-capbar-used", style: { width: usedPct + "%" } })
		        ),
		        createElement8(
		          "p",
		          { className: "pcc-desc" },
		          "\u5BB9\u91CF " + formatBytes(d2.totalBytes) + " \xB7 \u5269\u4F59 " + formatBytes(d2.freeBytes) + " \xB7 \u626B\u63CF\u5230 " + formatBytes(d2.scannedBytes) + " \xB7 " + (d2.fileCount ?? 0).toLocaleString() + " \u4E2A\u6587\u4EF6 / " + (d2.dirCount ?? 0).toLocaleString() + " \u4E2A\u76EE\u5F55"
		        )
		      )
		    );
		  });
		  children.push(
		    createElement8(
		      "p",
		      { key: "dur", className: "pcc-desc" },
		      "\u626B\u63CF\u5B8C\u6210\u3002\u62A5\u544A\u5DF2\u4FDD\u5B58\uFF0C\u53EF\u7EE7\u7EED\u67E5\u770B\u76EE\u5F55\u6811\uFF0C\u6216\u8BA9 AI \u57FA\u4E8E\u62A5\u544A\u7ED9\u51FA\u6E05\u7406\u65B9\u6848\u3002"
		    )
		  );
		  var aiChildren = [];
		  aiChildren.push(
		    createElement8("button", {
		      key: "ai",
		      className: "pcc-btn pcc-btn-primary",
		      style: { width: "100%", padding: "10px 0" },
		      disabled: sendStatus === "sending" || sendStatus === "sent",
		      onClick: async function() {
		        if (!aiPrompt || sendStatus === "sending" || sendStatus === "sent") return;
		        setSendStatus("sending");
		        setSendError(null);
		        try {
		          await sendChatMessage(props.ctx, aiPrompt);
		          setSendStatus("sent");
		        } catch (err) {
		          setSendStatus("error");
		          setSendError(err.message ?? String(err));
		        }
		      }
		    }, sendStatus === "sending" ? "AI \u5206\u6790\u8BF7\u6C42\u53D1\u9001\u4E2D\u2026" : sendStatus === "sent" ? "\u2713 \u5DF2\u63D0\u4EA4\u5230\u5F53\u524D\u4F1A\u8BDD" : sendStatus === "error" ? "\u21BB \u91CD\u65B0\u53D1\u9001 AI \u5206\u6790\u8BF7\u6C42" : "\u{1F916} \u8BA9 AI \u5206\u6790\uFF08\u53EF\u5220/\u4E0D\u80FD\u52A8/\u53EF\u79FB\u52A8\uFF09")
		  );
		  if (sendStatus === "sent") {
		    aiChildren.push(createElement8(
		      "p",
		      { key: "ai-hint", className: "pcc-desc" },
		      "\u626B\u63CF\u62A5\u544A\u5DF2\u4F5C\u4E3A @\u6587\u4EF6 \u5F15\u7528\u63D0\u4EA4\u5230\u5F53\u524D\u4F1A\u8BDD\uFF0C\u8BF7\u5728\u5BF9\u8BDD\u533A\u67E5\u770B AI \u7684\u5206\u6790\u8FDB\u5EA6\u3002"
		    ));
		  } else if (sendStatus === "error") {
		    aiChildren.push(createElement8(
		      "p",
		      { key: "ai-error", className: "pcc-error" },
		      "\u53D1\u9001\u5931\u8D25\uFF0C\u53EF\u91CD\u8BD5: " + (sendError ?? "\u672A\u77E5\u9519\u8BEF")
		    ));
		  }
		  for (var a = 0; a < aiChildren.length; a++) children.push(aiChildren[a]);
		  children.push(createElement8(
		    "div",
		    { key: "tabs", className: "pcc-tabs" },
		    createElement8("button", {
		      className: "pcc-tab",
		      "data-active": tab === "list" || void 0,
		      onClick: function() {
		        setTab("list");
		      }
		    }, "\u{1F4CA} \u6392\u884C\u699C"),
		    createElement8("button", {
		      className: "pcc-tab",
		      "data-active": tab === "apps" || void 0,
		      onClick: function() {
		        setTab("apps");
		      }
		    }, "\u{1F9E9} \u8F6F\u4EF6\u5360\u7528"),
		    reportFile ? createElement8("button", {
		      className: "pcc-tab",
		      "data-active": tab === "tree" || void 0,
		      onClick: function() {
		        setTab("tree");
		      }
		    }, "\u{1F333} \u76EE\u5F55\u6811") : null
		  ));
		  if (tab === "tree" && reportFile) {
		    children.push(createElement8(DirTreeView, {
		      connection: props.connection,
		      file: reportFile,
		      onBack: function() {
		        setTab("list");
		      }
		    }));
		  } else if (tab === "apps") {
		    var apps = result.applications ?? [];
		    children.push(createElement8(
		      "p",
		      { key: "apps-title", className: "pcc-section-title", style: { marginTop: "6px" } },
		      "\u{1F9E9} \u8F6F\u4EF6\u5360\u7528 Top " + apps.length + "\uFF08\u8DE8\u76D8\u805A\u5408\u4F30\u7B97\uFF09"
		    ));
		    children.push(createElement8(
		      "p",
		      { key: "apps-hint", className: "pcc-desc" },
		      "\u6309\u5E38\u89C1\u5B89\u88C5\u76EE\u5F55\u3001\u7528\u6237\u6570\u636E\u76EE\u5F55\u548C\u6E38\u620F\u5E93\u805A\u5408\uFF1B\u5171\u4EAB\u7EC4\u4EF6\u6216\u81EA\u5B9A\u4E49\u76EE\u5F55\u53EF\u80FD\u65E0\u6CD5\u51C6\u786E\u5F52\u5C5E\u3002\u626B\u63CF\u5168\u90E8\u78C1\u76D8\u65F6\u624D\u80FD\u5F97\u5230\u5B8C\u6574\u7684\u8DE8\u76D8\u5408\u8BA1\u3002"
		    ));
		    if (apps.length === 0) {
		      children.push(createElement8(
		        "p",
		        { key: "apps-empty", className: "pcc-desc" },
		        "\u5F53\u524D\u62A5\u544A\u6CA1\u6709\u8F6F\u4EF6\u5360\u7528\u6570\u636E\u3002\u82E5\u8FD9\u662F\u65E7\u62A5\u544A\uFF0C\u8BF7\u91CD\u65B0\u626B\u63CF\uFF1B\u82E5\u53EA\u626B\u63CF\u4E86\u5355\u4E2A\u76D8\u7B26\uFF0C\u53EF\u9009\u62E9\u201C\u5168\u90E8\u78C1\u76D8\u201D\u91CD\u8BD5\u3002"
		      ));
		    } else {
		      var maxAppSize = Math.max(1, apps.reduce(function(max, app) {
		        return Math.max(max, app.size ?? 0);
		      }, 0));
		      apps.forEach(function(app, index) {
		        var locations = app.locations ?? [];
		        children.push(createElement8(
		          "div",
		          {
		            key: "app-" + app.name + "-" + index,
		            className: "pcc-app-item",
		            title: locations.map(function(item) {
		              return item.path;
		            }).join("\n")
		          },
		          createElement8("div", {
		            className: "pcc-row-bar",
		            style: { width: Math.max(2, Math.round((app.size ?? 0) / maxAppSize * 100)) + "%" }
		          }),
		          createElement8(
		            "div",
		            { className: "pcc-app-head" },
		            createElement8("span", { className: "pcc-app-rank" }, "#" + (index + 1)),
		            createElement8("span", { className: "pcc-app-name" }, app.name),
		            createElement8("span", { className: "pcc-app-size" }, formatBytes(app.size ?? 0))
		          ),
		          createElement8(
		            "div",
		            { className: "pcc-app-drives" },
		            (app.drives ?? []).map(function(drive) {
		              return createElement8(
		                "span",
		                { key: drive.drive, className: "pcc-app-drive" },
		                drive.drive + " " + formatBytes(drive.size ?? 0)
		              );
		            })
		          ),
		          createElement8(
		            "div",
		            { className: "pcc-app-locations" },
		            locations.slice(0, 5).map(function(location) {
		              return createElement8(
		                "div",
		                { key: location.path, className: "pcc-app-location" },
		                createElement8("span", null, location.path),
		                createElement8("span", null, formatBytes(location.size ?? 0))
		              );
		            }),
		            locations.length > 5 ? createElement8(
		              "div",
		              { className: "pcc-app-location" },
		              "\u53E6\u6709 " + (locations.length - 5) + " \u4E2A\u4F4D\u7F6E"
		            ) : null
		          )
		        ));
		      });
		    }
		  } else {
		    var dirList = result.topDirectories ?? [];
		    var dirLimit = dirsAll ? dirList.length : 20;
		    children.push(createElement8(
		      "p",
		      { key: "t-dirs", className: "pcc-section-title", style: { marginTop: "6px" } },
		      "\u{1F4C1} Top " + Math.min(dirLimit, dirList.length) + " \u5927\u76EE\u5F55"
		    ));
		    dirList.slice(0, dirLimit).forEach(function(d2, i) {
		      children.push(
		        createElement8(
		          "div",
		          { key: "d" + i, className: "pcc-row", title: d2.path },
		          createElement8("div", {
		            className: "pcc-row-bar",
		            style: { width: Math.max(2, Math.round(d2.size / maxSize * 100)) + "%" }
		          }),
		          createElement8("span", { className: "pcc-row-path" }, d2.path),
		          createElement8("span", { className: "pcc-row-size" }, formatBytes(d2.size))
		        )
		      );
		    });
		    if (dirList.length > 20) {
		      children.push(createElement8("button", {
		        key: "t-dirs-more",
		        className: "pcc-more-btn",
		        style: { width: "100%" },
		        onClick: function() {
		          setDirsAll(!dirsAll);
		        }
		      }, dirsAll ? "\u25B2 \u6536\u8D77\u76EE\u5F55\u699C\u5355" : "\u25BC \u663E\u793A\u5168\u90E8 " + dirList.length + " \u4E2A\u76EE\u5F55"));
		    }
		    var maxFileSize = Math.max(1, (result.topFiles ?? []).reduce(function(m2, f2) {
		      return Math.max(m2, f2.size);
		    }, 0));
		    var fileList = result.topFiles ?? [];
		    var fileLimit = filesAll ? fileList.length : 20;
		    children.push(createElement8(
		      "p",
		      { key: "t-files", className: "pcc-section-title", style: { marginTop: "10px" } },
		      "\u{1F4C4} Top " + Math.min(fileLimit, fileList.length) + " \u5927\u6587\u4EF6"
		    ));
		    fileList.slice(0, fileLimit).forEach(function(f2, i) {
		      children.push(
		        createElement8(
		          "div",
		          { key: "f" + i, className: "pcc-row", title: f2.path },
		          createElement8("div", {
		            className: "pcc-row-bar",
		            style: { width: Math.max(2, Math.round(f2.size / maxFileSize * 100)) + "%" }
		          }),
		          createElement8("span", { className: "pcc-row-path" }, f2.path),
		          createElement8("span", { className: "pcc-row-size" }, formatBytes(f2.size))
		        )
		      );
		    });
		    if (fileList.length > 20) {
		      children.push(createElement8("button", {
		        key: "t-files-more",
		        className: "pcc-more-btn",
		        style: { width: "100%" },
		        onClick: function() {
		          setFilesAll(!filesAll);
		        }
		      }, filesAll ? "\u25B2 \u6536\u8D77\u6587\u4EF6\u699C\u5355" : "\u25BC \u663E\u793A\u5168\u90E8 " + fileList.length + " \u4E2A\u6587\u4EF6"));
		    }
		  }
		  return createElement8("div", null, children);
		}

		// src/client/views/plan-view.js
		var React7 = __toESM(require("react"), 1);

		// node_modules/.pnpm/dompurify@3.4.15/node_modules/dompurify/dist/purify.es.mjs
		function _arrayLikeToArray(r, a) {
		  (null == a || a > r.length) && (a = r.length);
		  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
		  return n;
		}
		function _arrayWithHoles(r) {
		  if (Array.isArray(r)) return r;
		}
		function _iterableToArrayLimit(r, l3) {
		  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
		  if (null != t) {
		    var e, n, i, u, a = [], f2 = true, o = false;
		    try {
		      if (i = (t = t.call(r)).next, 0 === l3) ;
		      else for (; !(f2 = (e = i.call(t)).done) && (a.push(e.value), a.length !== l3); f2 = true) ;
		    } catch (r2) {
		      o = true, n = r2;
		    } finally {
		      try {
		        if (!f2 && null != t.return && (u = t.return(), Object(u) !== u)) return;
		      } finally {
		        if (o) throw n;
		      }
		    }
		    return a;
		  }
		}
		function _nonIterableRest() {
		  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
		}
		function _slicedToArray(r, e) {
		  return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
		}
		function _unsupportedIterableToArray(r, a) {
		  if (r) {
		    if ("string" == typeof r) return _arrayLikeToArray(r, a);
		    var t = {}.toString.call(r).slice(8, -1);
		    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
		  }
		}
		var entries = Object.entries;
		var setPrototypeOf = Object.setPrototypeOf;
		var isFrozen = Object.isFrozen;
		var getPrototypeOf = Object.getPrototypeOf;
		var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
		var freeze = Object.freeze;
		var seal = Object.seal;
		var create = Object.create;
		var _ref = typeof Reflect !== "undefined" && Reflect;
		var apply = _ref.apply;
		var construct = _ref.construct;
		if (!freeze) {
		  freeze = function freeze2(x2) {
		    return x2;
		  };
		}
		if (!seal) {
		  seal = function seal2(x2) {
		    return x2;
		  };
		}
		if (!apply) {
		  apply = function apply3(func, thisArg) {
		    for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
		      args[_key - 2] = arguments[_key];
		    }
		    return func.apply(thisArg, args);
		  };
		}
		if (!construct) {
		  construct = function construct2(Func) {
		    for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
		      args[_key2 - 1] = arguments[_key2];
		    }
		    return new Func(...args);
		  };
		}
		var arrayForEach = unapply(Array.prototype.forEach);
		var arrayLastIndexOf = unapply(Array.prototype.lastIndexOf);
		var arrayPop = unapply(Array.prototype.pop);
		var arrayPush = unapply(Array.prototype.push);
		var arraySplice = unapply(Array.prototype.splice);
		var arrayIsArray = Array.isArray;
		var stringToLowerCase = unapply(String.prototype.toLowerCase);
		var stringToString = unapply(String.prototype.toString);
		var stringMatch = unapply(String.prototype.match);
		var stringReplace = unapply(String.prototype.replace);
		var stringIndexOf = unapply(String.prototype.indexOf);
		var stringTrim = unapply(String.prototype.trim);
		var numberToString = unapply(Number.prototype.toString);
		var booleanToString = unapply(Boolean.prototype.toString);
		var bigintToString = typeof BigInt === "undefined" ? null : unapply(BigInt.prototype.toString);
		var symbolToString = typeof Symbol === "undefined" ? null : unapply(Symbol.prototype.toString);
		var objectHasOwnProperty = unapply(Object.prototype.hasOwnProperty);
		var objectToString = unapply(Object.prototype.toString);
		var regExpTest = unapply(RegExp.prototype.test);
		var typeErrorCreate = unconstruct(TypeError);
		function unapply(func) {
		  return function(thisArg) {
		    if (thisArg instanceof RegExp) {
		      thisArg.lastIndex = 0;
		    }
		    for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
		      args[_key3 - 1] = arguments[_key3];
		    }
		    return apply(func, thisArg, args);
		  };
		}
		function unconstruct(Func) {
		  return function() {
		    for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
		      args[_key4] = arguments[_key4];
		    }
		    return construct(Func, args);
		  };
		}
		function addToSet(set, array) {
		  let transformCaseFunc = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : stringToLowerCase;
		  if (setPrototypeOf) {
		    setPrototypeOf(set, null);
		  }
		  if (!arrayIsArray(array)) {
		    return set;
		  }
		  let l3 = array.length;
		  while (l3--) {
		    let element = array[l3];
		    if (typeof element === "string") {
		      const lcElement = transformCaseFunc(element);
		      if (lcElement !== element) {
		        if (!isFrozen(array)) {
		          array[l3] = lcElement;
		        }
		        element = lcElement;
		      }
		    }
		    set[element] = true;
		  }
		  return set;
		}
		function cleanArray(array) {
		  for (let index = 0; index < array.length; index++) {
		    const isPropertyExist = objectHasOwnProperty(array, index);
		    if (!isPropertyExist) {
		      array[index] = null;
		    }
		  }
		  return array;
		}
		function clone(object) {
		  const newObject = create(null);
		  for (const _ref2 of entries(object)) {
		    var _ref3 = _slicedToArray(_ref2, 2);
		    const property = _ref3[0];
		    const value = _ref3[1];
		    const isPropertyExist = objectHasOwnProperty(object, property);
		    if (isPropertyExist) {
		      if (arrayIsArray(value)) {
		        newObject[property] = cleanArray(value);
		      } else if (value && typeof value === "object" && value.constructor === Object) {
		        newObject[property] = clone(value);
		      } else {
		        newObject[property] = value;
		      }
		    }
		  }
		  return newObject;
		}
		function stringifyValue(value) {
		  switch (typeof value) {
		    case "string": {
		      return value;
		    }
		    case "number": {
		      return numberToString(value);
		    }
		    case "boolean": {
		      return booleanToString(value);
		    }
		    case "bigint": {
		      return bigintToString ? bigintToString(value) : "0";
		    }
		    case "symbol": {
		      return symbolToString ? symbolToString(value) : "Symbol()";
		    }
		    case "undefined": {
		      return objectToString(value);
		    }
		    case "function":
		    case "object": {
		      if (value === null) {
		        return objectToString(value);
		      }
		      const valueAsRecord = value;
		      const valueToString = lookupGetter(valueAsRecord, "toString");
		      if (typeof valueToString === "function") {
		        const stringified = valueToString(valueAsRecord);
		        return typeof stringified === "string" ? stringified : objectToString(stringified);
		      }
		      return objectToString(value);
		    }
		    default: {
		      return objectToString(value);
		    }
		  }
		}
		function lookupGetter(object, prop) {
		  while (object !== null) {
		    const desc = getOwnPropertyDescriptor(object, prop);
		    if (desc) {
		      if (desc.get) {
		        return unapply(desc.get);
		      }
		      if (typeof desc.value === "function") {
		        return unapply(desc.value);
		      }
		    }
		    object = getPrototypeOf(object);
		  }
		  function fallbackValue() {
		    return null;
		  }
		  return fallbackValue;
		}
		function isRegex(value) {
		  try {
		    regExpTest(value, "");
		    return true;
		  } catch (_unused) {
		    return false;
		  }
		}
		var html$1 = freeze(["a", "abbr", "acronym", "address", "area", "article", "aside", "audio", "b", "bdi", "bdo", "big", "blink", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "content", "data", "datalist", "dd", "decorator", "del", "details", "dfn", "dialog", "dir", "div", "dl", "dt", "element", "em", "fieldset", "figcaption", "figure", "font", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "map", "mark", "marquee", "menu", "menuitem", "meter", "nav", "nobr", "ol", "optgroup", "option", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "search", "section", "select", "shadow", "slot", "small", "source", "spacer", "span", "strike", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "tr", "track", "tt", "u", "ul", "var", "video", "wbr"]);
		var svg$1 = freeze(["svg", "a", "altglyph", "altglyphdef", "altglyphitem", "animatecolor", "animatemotion", "animatetransform", "circle", "clippath", "defs", "desc", "ellipse", "enterkeyhint", "exportparts", "filter", "font", "g", "glyph", "glyphref", "hkern", "image", "inputmode", "line", "lineargradient", "marker", "mask", "metadata", "mpath", "part", "path", "pattern", "polygon", "polyline", "radialgradient", "rect", "stop", "style", "switch", "symbol", "text", "textpath", "title", "tref", "tspan", "view", "vkern"]);
		var svgFilters = freeze(["feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence"]);
		var svgDisallowed = freeze(["animate", "color-profile", "cursor", "discard", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "foreignobject", "hatch", "hatchpath", "mesh", "meshgradient", "meshpatch", "meshrow", "missing-glyph", "script", "set", "solidcolor", "unknown", "use"]);
		var mathMl$1 = freeze(["math", "menclose", "merror", "mfenced", "mfrac", "mglyph", "mi", "mlabeledtr", "mmultiscripts", "mn", "mo", "mover", "mpadded", "mphantom", "mroot", "mrow", "ms", "mspace", "msqrt", "mstyle", "msub", "msup", "msubsup", "mtable", "mtd", "mtext", "mtr", "munder", "munderover", "mprescripts"]);
		var mathMlDisallowed = freeze(["maction", "maligngroup", "malignmark", "mlongdiv", "mscarries", "mscarry", "msgroup", "mstack", "msline", "msrow", "semantics", "annotation", "annotation-xml", "mprescripts", "none"]);
		var text = freeze(["#text"]);
		var html = freeze(["accept", "action", "align", "alt", "autocapitalize", "autocomplete", "autopictureinpicture", "autoplay", "background", "bgcolor", "border", "capture", "cellpadding", "cellspacing", "checked", "cite", "class", "clear", "color", "cols", "colspan", "command", "commandfor", "controls", "controlslist", "coords", "crossorigin", "datetime", "decoding", "default", "dir", "disabled", "disablepictureinpicture", "disableremoteplayback", "download", "draggable", "enctype", "enterkeyhint", "exportparts", "face", "for", "headers", "height", "hidden", "high", "href", "hreflang", "id", "inert", "inputmode", "integrity", "ismap", "kind", "label", "lang", "list", "loading", "loop", "low", "max", "maxlength", "media", "method", "min", "minlength", "multiple", "muted", "name", "nonce", "noshade", "novalidate", "nowrap", "open", "optimum", "part", "pattern", "placeholder", "playsinline", "popover", "popovertarget", "popovertargetaction", "poster", "preload", "pubdate", "radiogroup", "readonly", "rel", "required", "rev", "reversed", "role", "rows", "rowspan", "spellcheck", "scope", "selected", "shape", "size", "sizes", "slot", "span", "srclang", "start", "src", "srcset", "step", "style", "summary", "tabindex", "title", "translate", "type", "usemap", "valign", "value", "width", "wrap", "xmlns"]);
		var svg = freeze(["accent-height", "accumulate", "additive", "alignment-baseline", "amplitude", "ascent", "attributename", "attributetype", "azimuth", "basefrequency", "baseline-shift", "begin", "bias", "by", "class", "clip", "clippathunits", "clip-path", "clip-rule", "color", "color-interpolation", "color-interpolation-filters", "color-profile", "color-rendering", "cx", "cy", "d", "dx", "dy", "diffuseconstant", "direction", "display", "divisor", "dominant-baseline", "dur", "edgemode", "elevation", "end", "exponent", "fill", "fill-opacity", "fill-rule", "filter", "filterunits", "flood-color", "flood-opacity", "font-family", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-variant", "font-weight", "fx", "fy", "g1", "g2", "glyph-name", "glyphref", "gradientunits", "gradienttransform", "height", "href", "id", "image-rendering", "in", "in2", "intercept", "k", "k1", "k2", "k3", "k4", "kerning", "keypoints", "keysplines", "keytimes", "lang", "lengthadjust", "letter-spacing", "kernelmatrix", "kernelunitlength", "lighting-color", "local", "marker-end", "marker-mid", "marker-start", "markerheight", "markerunits", "markerwidth", "maskcontentunits", "maskunits", "max", "mask", "mask-type", "media", "method", "mode", "min", "name", "numoctaves", "offset", "operator", "opacity", "order", "orient", "orientation", "origin", "overflow", "paint-order", "path", "pathlength", "patterncontentunits", "patterntransform", "patternunits", "pointer-events", "points", "preservealpha", "preserveaspectratio", "primitiveunits", "r", "rx", "ry", "radius", "refx", "refy", "repeatcount", "repeatdur", "restart", "result", "rotate", "scale", "seed", "shape-rendering", "slope", "specularconstant", "specularexponent", "spreadmethod", "startoffset", "stddeviation", "stitchtiles", "stop-color", "stop-opacity", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke", "stroke-width", "style", "surfacescale", "systemlanguage", "tabindex", "tablevalues", "targetx", "targety", "transform", "transform-origin", "text-anchor", "text-decoration", "text-orientation", "text-rendering", "textlength", "type", "u1", "u2", "unicode", "values", "vector-effect", "viewbox", "visibility", "version", "vert-adv-y", "vert-origin-x", "vert-origin-y", "width", "word-spacing", "wrap", "writing-mode", "xchannelselector", "ychannelselector", "x", "x1", "x2", "xmlns", "y", "y1", "y2", "z", "zoomandpan"]);
		var mathMl = freeze(["accent", "accentunder", "align", "bevelled", "close", "columnalign", "columnlines", "columnspacing", "columnspan", "denomalign", "depth", "dir", "display", "displaystyle", "encoding", "fence", "frame", "height", "href", "id", "largeop", "length", "linethickness", "lquote", "lspace", "mathbackground", "mathcolor", "mathsize", "mathvariant", "maxsize", "minsize", "movablelimits", "notation", "numalign", "open", "rowalign", "rowlines", "rowspacing", "rowspan", "rspace", "rquote", "scriptlevel", "scriptminsize", "scriptsizemultiplier", "selection", "separator", "separators", "stretchy", "subscriptshift", "supscriptshift", "symmetric", "voffset", "width", "xmlns"]);
		var xml = freeze(["xlink:href", "xml:id", "xlink:title", "xml:space", "xmlns:xlink"]);
		var MUSTACHE_EXPR = seal(/{{[\w\W]*|^[\w\W]*}}/g);
		var ERB_EXPR = seal(/<%[\w\W]*|^[\w\W]*%>/g);
		var TMPLIT_EXPR = seal(/\${[\w\W]*/g);
		var DATA_ATTR = seal(/^data-[\-\w.\u00B7-\uFFFF]+$/);
		var ARIA_ATTR = seal(/^aria-[\-\w]+$/);
		var IS_ALLOWED_URI = seal(
		  /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i
		  // eslint-disable-line no-useless-escape
		);
		var IS_SCRIPT_OR_DATA = seal(/^(?:\w+script|data):/i);
		var ATTR_WHITESPACE = seal(
		  /[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g
		  // eslint-disable-line no-control-regex
		);
		var DOCTYPE_NAME = seal(/^html$/i);
		var CUSTOM_ELEMENT = seal(/^[a-z][.\w]*(-[.\w]+)+$/i);
		var ELEMENT_MARKUP_PROBE = seal(/<[/\w!]/g);
		var COMMENT_MARKUP_PROBE = seal(/<[/\w]/g);
		var FALLBACK_TAG_CLOSE = seal(/<\/no(script|embed|frames)/i);
		var SELF_CLOSING_TAG = seal(/\/>/i);
		var NODE_TYPE = {
		  element: 1,
		  attribute: 2,
		  text: 3,
		  cdataSection: 4,
		  entityReference: 5,
		  // Deprecated
		  entityNode: 6,
		  // Deprecated
		  processingInstruction: 7,
		  comment: 8,
		  document: 9,
		  documentType: 10,
		  documentFragment: 11,
		  notation: 12
		  // Deprecated
		};
		var LITERAL_TEXT_ELEMENT_NAMES = ["style", "script", "xmp", "iframe", "noembed", "noframes", "plaintext", "noscript"];
		var LITERAL_TEXT_ELEMENTS = freeze(addToSet({}, LITERAL_TEXT_ELEMENT_NAMES));
		var LITERAL_TEXT_CLOSE = (function() {
		  const map = {};
		  arrayForEach(LITERAL_TEXT_ELEMENT_NAMES, (name) => {
		    map[name] = seal(new RegExp("</" + name + "(?=[\\t\\n\\f\\r />])", "i"));
		  });
		  return freeze(map);
		})();
		var getGlobal = function getGlobal2() {
		  return typeof window === "undefined" ? null : window;
		};
		var _createTrustedTypesPolicy = function _createTrustedTypesPolicy2(trustedTypes, purifyHostElement) {
		  if (typeof trustedTypes !== "object" || typeof trustedTypes.createPolicy !== "function") {
		    return null;
		  }
		  let suffix = null;
		  const ATTR_NAME = "data-tt-policy-suffix";
		  if (purifyHostElement && purifyHostElement.hasAttribute(ATTR_NAME)) {
		    suffix = purifyHostElement.getAttribute(ATTR_NAME);
		  }
		  const policyName = "dompurify" + (suffix ? "#" + suffix : "");
		  try {
		    return trustedTypes.createPolicy(policyName, {
		      createHTML(html2) {
		        return html2;
		      },
		      createScriptURL(scriptUrl) {
		        return scriptUrl;
		      }
		    });
		  } catch (_2) {
		    console.warn("TrustedTypes policy " + policyName + " could not be created.");
		    return null;
		  }
		};
		var _createHooksMap = function _createHooksMap2() {
		  return {
		    afterSanitizeAttributes: [],
		    afterSanitizeElements: [],
		    afterSanitizeShadowDOM: [],
		    beforeSanitizeAttributes: [],
		    beforeSanitizeElements: [],
		    beforeSanitizeShadowDOM: [],
		    uponSanitizeAttribute: [],
		    uponSanitizeElement: [],
		    uponSanitizeShadowNode: []
		  };
		};
		var _resolveSetOption = function _resolveSetOption2(cfg, key, fallback, options) {
		  return objectHasOwnProperty(cfg, key) && arrayIsArray(cfg[key]) ? addToSet(options.base ? clone(options.base) : {}, cfg[key], options.transform) : fallback;
		};
		var _resolveObjectOption = function _resolveObjectOption2(cfg, key, makeFallback) {
		  const value = objectHasOwnProperty(cfg, key) ? cfg[key] : void 0;
		  return value && typeof value === "object" ? clone(value) : makeFallback();
		};
		function createDOMPurify() {
		  let window2 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : getGlobal();
		  const DOMPurify = (root) => createDOMPurify(root);
		  DOMPurify.version = "3.4.15";
		  DOMPurify.removed = [];
		  if (!window2 || !window2.document || window2.document.nodeType !== NODE_TYPE.document || !window2.Element) {
		    DOMPurify.isSupported = false;
		    return DOMPurify;
		  }
		  let document2 = window2.document;
		  const originalDocument = document2;
		  const currentScript = originalDocument.currentScript;
		  window2.DocumentFragment;
		  const HTMLTemplateElement = window2.HTMLTemplateElement, Node = window2.Node, Element = window2.Element, NodeFilter = window2.NodeFilter, _window$NamedNodeMap = window2.NamedNodeMap;
		  _window$NamedNodeMap === void 0 ? window2.NamedNodeMap || window2.MozNamedAttrMap : _window$NamedNodeMap;
		  window2.HTMLFormElement;
		  const DOMParser = window2.DOMParser, trustedTypes = window2.trustedTypes;
		  const ElementPrototype = Element.prototype;
		  const cloneNode = lookupGetter(ElementPrototype, "cloneNode");
		  const remove = lookupGetter(ElementPrototype, "remove");
		  const removeAttributeNode = lookupGetter(ElementPrototype, "removeAttributeNode");
		  const getNextSibling = lookupGetter(ElementPrototype, "nextSibling");
		  const getChildNodes = lookupGetter(ElementPrototype, "childNodes");
		  const getParentNode = lookupGetter(ElementPrototype, "parentNode");
		  const getShadowRoot = lookupGetter(ElementPrototype, "shadowRoot");
		  const getAttributes = lookupGetter(ElementPrototype, "attributes");
		  const getNodeType = Node && Node.prototype ? lookupGetter(Node.prototype, "nodeType") : null;
		  const getNodeName = Node && Node.prototype ? lookupGetter(Node.prototype, "nodeName") : null;
		  const getOwnerDocument = Node && Node.prototype ? lookupGetter(Node.prototype, "ownerDocument") : null;
		  const _readNodeType = function _readNodeType2(node) {
		    return getNodeType ? getNodeType(node) : node.nodeType;
		  };
		  const _readNodeName = function _readNodeName2(node) {
		    return getNodeName ? getNodeName(node) : node.nodeName;
		  };
		  if (typeof HTMLTemplateElement === "function") {
		    const template = document2.createElement("template");
		    if (template.content && template.content.ownerDocument) {
		      document2 = template.content.ownerDocument;
		    }
		  }
		  let trustedTypesPolicy;
		  let emptyHTML = "";
		  let defaultTrustedTypesPolicy;
		  let defaultTrustedTypesPolicyResolved = false;
		  let IN_TRUSTED_TYPES_POLICY = 0;
		  const _assertNotInTrustedTypesPolicy = function _assertNotInTrustedTypesPolicy2() {
		    if (IN_TRUSTED_TYPES_POLICY > 0) {
		      throw typeErrorCreate('A configured TRUSTED_TYPES_POLICY callback (createHTML or createScriptURL) must not call DOMPurify.sanitize, as that causes infinite recursion. Do not pass a policy whose callbacks wrap DOMPurify as TRUSTED_TYPES_POLICY; see the "DOMPurify and Trusted Types" section of the README.');
		    }
		  };
		  const _createTrustedHTML = function _createTrustedHTML2(html2) {
		    _assertNotInTrustedTypesPolicy();
		    IN_TRUSTED_TYPES_POLICY++;
		    try {
		      return trustedTypesPolicy.createHTML(html2);
		    } finally {
		      IN_TRUSTED_TYPES_POLICY--;
		    }
		  };
		  const _createTrustedScriptURL = function _createTrustedScriptURL2(scriptUrl) {
		    _assertNotInTrustedTypesPolicy();
		    IN_TRUSTED_TYPES_POLICY++;
		    try {
		      return trustedTypesPolicy.createScriptURL(scriptUrl);
		    } finally {
		      IN_TRUSTED_TYPES_POLICY--;
		    }
		  };
		  const _getDefaultTrustedTypesPolicy = function _getDefaultTrustedTypesPolicy2() {
		    if (!defaultTrustedTypesPolicyResolved) {
		      defaultTrustedTypesPolicy = _createTrustedTypesPolicy(trustedTypes, currentScript);
		      defaultTrustedTypesPolicyResolved = true;
		    }
		    return defaultTrustedTypesPolicy;
		  };
		  const _document = document2, implementation = _document.implementation, createNodeIterator = _document.createNodeIterator, createDocumentFragment = _document.createDocumentFragment, getElementsByTagName = _document.getElementsByTagName;
		  const importNode = originalDocument.importNode;
		  let hooks = _createHooksMap();
		  DOMPurify.isSupported = typeof entries === "function" && typeof getParentNode === "function" && implementation && implementation.createHTMLDocument !== void 0;
		  const MUSTACHE_EXPR$1 = MUSTACHE_EXPR, ERB_EXPR$1 = ERB_EXPR, TMPLIT_EXPR$1 = TMPLIT_EXPR, DATA_ATTR$1 = DATA_ATTR, ARIA_ATTR$1 = ARIA_ATTR, IS_SCRIPT_OR_DATA$1 = IS_SCRIPT_OR_DATA, ATTR_WHITESPACE$1 = ATTR_WHITESPACE, CUSTOM_ELEMENT$1 = CUSTOM_ELEMENT;
		  let IS_ALLOWED_URI$1 = IS_ALLOWED_URI;
		  let ALLOWED_TAGS = null;
		  const DEFAULT_ALLOWED_TAGS = addToSet({}, [...html$1, ...svg$1, ...svgFilters, ...mathMl$1, ...text]);
		  let ALLOWED_ATTR = null;
		  const DEFAULT_ALLOWED_ATTR = addToSet({}, [...html, ...svg, ...mathMl, ...xml]);
		  let CUSTOM_ELEMENT_HANDLING = Object.seal(create(null, {
		    tagNameCheck: {
		      writable: true,
		      configurable: false,
		      enumerable: true,
		      value: null
		    },
		    attributeNameCheck: {
		      writable: true,
		      configurable: false,
		      enumerable: true,
		      value: null
		    },
		    allowCustomizedBuiltInElements: {
		      writable: true,
		      configurable: false,
		      enumerable: true,
		      value: false
		    }
		  }));
		  let FORBID_TAGS = null;
		  let FORBID_ATTR = null;
		  const EXTRA_ELEMENT_HANDLING = Object.seal(create(null, {
		    tagCheck: {
		      writable: true,
		      configurable: false,
		      enumerable: true,
		      value: null
		    },
		    attributeCheck: {
		      writable: true,
		      configurable: false,
		      enumerable: true,
		      value: null
		    }
		  }));
		  let ALLOW_ARIA_ATTR = true;
		  let ALLOW_DATA_ATTR = true;
		  let ALLOW_UNKNOWN_PROTOCOLS = false;
		  let ALLOW_SELF_CLOSE_IN_ATTR = true;
		  let SAFE_FOR_TEMPLATES = false;
		  let SAFE_FOR_XML = true;
		  let WHOLE_DOCUMENT = false;
		  let SET_CONFIG = false;
		  let SET_CONFIG_ALLOWED_TAGS = null;
		  let SET_CONFIG_ALLOWED_ATTR = null;
		  let FORCE_BODY = false;
		  let RETURN_DOM = false;
		  let RETURN_DOM_FRAGMENT = false;
		  let RETURN_TRUSTED_TYPE = false;
		  let SANITIZE_DOM = true;
		  let SANITIZE_NAMED_PROPS = false;
		  const SANITIZE_NAMED_PROPS_PREFIX = "user-content-";
		  let KEEP_CONTENT = true;
		  let IN_PLACE = false;
		  let USE_PROFILES = {};
		  let FORBID_CONTENTS = null;
		  const DEFAULT_FORBID_CONTENTS = addToSet({}, [
		    "annotation-xml",
		    "audio",
		    "colgroup",
		    "desc",
		    "foreignobject",
		    "head",
		    "iframe",
		    "math",
		    "mi",
		    "mn",
		    "mo",
		    "ms",
		    "mtext",
		    "noembed",
		    "noframes",
		    "noscript",
		    "plaintext",
		    "script",
		    // <selectedcontent> mirrors the selected <option>'s subtree, cloned by
		    // the UA (customizable <select>) — including any on* handlers — and the
		    // engine re-mirrors synchronously whenever a removal changes which
		    // option/selectedcontent is current, even inside DOMPurify's inert
		    // DOMParser document. Hoisting its children on removal re-inserts a fresh
		    // mirror target ahead of the walk, which the engine refills, looping
		    // forever (DoS) and amplifying output. Dropping its content on removal
		    // (rather than hoisting) breaks that cascade; the content is a duplicate
		    // of the option, which is sanitized on its own. See campaign-3 F1/F6.
		    "selectedcontent",
		    "style",
		    "svg",
		    "template",
		    "thead",
		    "title",
		    "video",
		    "xmp"
		  ]);
		  let DATA_URI_TAGS = null;
		  const DEFAULT_DATA_URI_TAGS = addToSet({}, ["audio", "video", "img", "source", "image", "track"]);
		  let URI_SAFE_ATTRIBUTES = null;
		  const DEFAULT_URI_SAFE_ATTRIBUTES = addToSet({}, ["alt", "class", "for", "id", "label", "name", "pattern", "placeholder", "role", "summary", "title", "value", "style", "xmlns"]);
		  const MATHML_NAMESPACE = "http://www.w3.org/1998/Math/MathML";
		  const SVG_NAMESPACE = "http://www.w3.org/2000/svg";
		  const HTML_NAMESPACE = "http://www.w3.org/1999/xhtml";
		  let NAMESPACE = HTML_NAMESPACE;
		  let IS_EMPTY_INPUT = false;
		  let ALLOWED_NAMESPACES = null;
		  const DEFAULT_ALLOWED_NAMESPACES = addToSet({}, [MATHML_NAMESPACE, SVG_NAMESPACE, HTML_NAMESPACE], stringToString);
		  const DEFAULT_MATHML_TEXT_INTEGRATION_POINTS = freeze(["mi", "mo", "mn", "ms", "mtext"]);
		  let MATHML_TEXT_INTEGRATION_POINTS = addToSet({}, DEFAULT_MATHML_TEXT_INTEGRATION_POINTS);
		  const DEFAULT_HTML_INTEGRATION_POINTS = freeze(["annotation-xml"]);
		  let HTML_INTEGRATION_POINTS = addToSet({}, DEFAULT_HTML_INTEGRATION_POINTS);
		  const COMMON_SVG_AND_HTML_ELEMENTS = addToSet({}, ["title", "style", "font", "a", "script"]);
		  let PARSER_MEDIA_TYPE = null;
		  const SUPPORTED_PARSER_MEDIA_TYPES = ["application/xhtml+xml", "text/html"];
		  const DEFAULT_PARSER_MEDIA_TYPE = "text/html";
		  let transformCaseFunc = null;
		  let CONFIG = null;
		  const formElement = document2.createElement("form");
		  const isRegexOrFunction = function isRegexOrFunction2(testValue) {
		    return testValue instanceof RegExp || testValue instanceof Function;
		  };
		  const _parseConfig = function _parseConfig2() {
		    let cfg = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
		    if (CONFIG && CONFIG === cfg) {
		      return;
		    }
		    if (!cfg || typeof cfg !== "object") {
		      cfg = {};
		    }
		    cfg = clone(cfg);
		    PARSER_MEDIA_TYPE = // eslint-disable-next-line unicorn/prefer-includes
		    SUPPORTED_PARSER_MEDIA_TYPES.indexOf(cfg.PARSER_MEDIA_TYPE) === -1 ? DEFAULT_PARSER_MEDIA_TYPE : cfg.PARSER_MEDIA_TYPE;
		    transformCaseFunc = PARSER_MEDIA_TYPE === "application/xhtml+xml" ? stringToString : stringToLowerCase;
		    ALLOWED_TAGS = _resolveSetOption(cfg, "ALLOWED_TAGS", DEFAULT_ALLOWED_TAGS, {
		      transform: transformCaseFunc
		    });
		    ALLOWED_ATTR = _resolveSetOption(cfg, "ALLOWED_ATTR", DEFAULT_ALLOWED_ATTR, {
		      transform: transformCaseFunc
		    });
		    ALLOWED_NAMESPACES = _resolveSetOption(cfg, "ALLOWED_NAMESPACES", DEFAULT_ALLOWED_NAMESPACES, {
		      transform: stringToString
		    });
		    URI_SAFE_ATTRIBUTES = _resolveSetOption(cfg, "ADD_URI_SAFE_ATTR", DEFAULT_URI_SAFE_ATTRIBUTES, {
		      transform: transformCaseFunc,
		      base: DEFAULT_URI_SAFE_ATTRIBUTES
		    });
		    DATA_URI_TAGS = _resolveSetOption(cfg, "ADD_DATA_URI_TAGS", DEFAULT_DATA_URI_TAGS, {
		      transform: transformCaseFunc,
		      base: DEFAULT_DATA_URI_TAGS
		    });
		    FORBID_CONTENTS = _resolveSetOption(cfg, "FORBID_CONTENTS", DEFAULT_FORBID_CONTENTS, {
		      transform: transformCaseFunc
		    });
		    FORBID_TAGS = _resolveSetOption(cfg, "FORBID_TAGS", clone({}), {
		      transform: transformCaseFunc
		    });
		    FORBID_ATTR = _resolveSetOption(cfg, "FORBID_ATTR", clone({}), {
		      transform: transformCaseFunc
		    });
		    USE_PROFILES = objectHasOwnProperty(cfg, "USE_PROFILES") ? cfg.USE_PROFILES && typeof cfg.USE_PROFILES === "object" ? clone(cfg.USE_PROFILES) : cfg.USE_PROFILES : false;
		    ALLOW_ARIA_ATTR = cfg.ALLOW_ARIA_ATTR !== false;
		    ALLOW_DATA_ATTR = cfg.ALLOW_DATA_ATTR !== false;
		    ALLOW_UNKNOWN_PROTOCOLS = cfg.ALLOW_UNKNOWN_PROTOCOLS || false;
		    ALLOW_SELF_CLOSE_IN_ATTR = cfg.ALLOW_SELF_CLOSE_IN_ATTR !== false;
		    SAFE_FOR_TEMPLATES = cfg.SAFE_FOR_TEMPLATES || false;
		    SAFE_FOR_XML = cfg.SAFE_FOR_XML !== false;
		    WHOLE_DOCUMENT = cfg.WHOLE_DOCUMENT || false;
		    RETURN_DOM = cfg.RETURN_DOM || false;
		    RETURN_DOM_FRAGMENT = cfg.RETURN_DOM_FRAGMENT || false;
		    RETURN_TRUSTED_TYPE = cfg.RETURN_TRUSTED_TYPE || false;
		    FORCE_BODY = cfg.FORCE_BODY || false;
		    SANITIZE_DOM = cfg.SANITIZE_DOM !== false;
		    SANITIZE_NAMED_PROPS = cfg.SANITIZE_NAMED_PROPS || false;
		    KEEP_CONTENT = cfg.KEEP_CONTENT !== false;
		    IN_PLACE = cfg.IN_PLACE || false;
		    IS_ALLOWED_URI$1 = isRegex(cfg.ALLOWED_URI_REGEXP) ? cfg.ALLOWED_URI_REGEXP : IS_ALLOWED_URI;
		    NAMESPACE = typeof cfg.NAMESPACE === "string" ? cfg.NAMESPACE : HTML_NAMESPACE;
		    MATHML_TEXT_INTEGRATION_POINTS = _resolveObjectOption(
		      cfg,
		      "MATHML_TEXT_INTEGRATION_POINTS",
		      () => addToSet({}, DEFAULT_MATHML_TEXT_INTEGRATION_POINTS)
		      // Default built-in map
		    );
		    HTML_INTEGRATION_POINTS = _resolveObjectOption(
		      cfg,
		      "HTML_INTEGRATION_POINTS",
		      () => addToSet({}, DEFAULT_HTML_INTEGRATION_POINTS)
		      // Default built-in map
		    );
		    const customElementHandling = _resolveObjectOption(cfg, "CUSTOM_ELEMENT_HANDLING", () => create(null));
		    CUSTOM_ELEMENT_HANDLING = create(null);
		    if (objectHasOwnProperty(customElementHandling, "tagNameCheck") && isRegexOrFunction(customElementHandling.tagNameCheck)) {
		      CUSTOM_ELEMENT_HANDLING.tagNameCheck = customElementHandling.tagNameCheck;
		    }
		    if (objectHasOwnProperty(customElementHandling, "attributeNameCheck") && isRegexOrFunction(customElementHandling.attributeNameCheck)) {
		      CUSTOM_ELEMENT_HANDLING.attributeNameCheck = customElementHandling.attributeNameCheck;
		    }
		    if (objectHasOwnProperty(customElementHandling, "allowCustomizedBuiltInElements") && typeof customElementHandling.allowCustomizedBuiltInElements === "boolean") {
		      CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements = customElementHandling.allowCustomizedBuiltInElements;
		    }
		    seal(CUSTOM_ELEMENT_HANDLING);
		    if (SAFE_FOR_TEMPLATES) {
		      ALLOW_DATA_ATTR = false;
		    }
		    if (RETURN_DOM_FRAGMENT) {
		      RETURN_DOM = true;
		    }
		    if (USE_PROFILES) {
		      ALLOWED_TAGS = addToSet({}, text);
		      ALLOWED_ATTR = create(null);
		      if (USE_PROFILES.html === true) {
		        addToSet(ALLOWED_TAGS, html$1);
		        addToSet(ALLOWED_ATTR, html);
		      }
		      if (USE_PROFILES.svg === true) {
		        addToSet(ALLOWED_TAGS, svg$1);
		        addToSet(ALLOWED_ATTR, svg);
		        addToSet(ALLOWED_ATTR, xml);
		      }
		      if (USE_PROFILES.svgFilters === true) {
		        addToSet(ALLOWED_TAGS, svgFilters);
		        addToSet(ALLOWED_ATTR, svg);
		        addToSet(ALLOWED_ATTR, xml);
		      }
		      if (USE_PROFILES.mathMl === true) {
		        addToSet(ALLOWED_TAGS, mathMl$1);
		        addToSet(ALLOWED_ATTR, mathMl);
		        addToSet(ALLOWED_ATTR, xml);
		      }
		    }
		    EXTRA_ELEMENT_HANDLING.tagCheck = null;
		    EXTRA_ELEMENT_HANDLING.attributeCheck = null;
		    if (objectHasOwnProperty(cfg, "ADD_TAGS")) {
		      if (typeof cfg.ADD_TAGS === "function") {
		        EXTRA_ELEMENT_HANDLING.tagCheck = cfg.ADD_TAGS;
		      } else if (arrayIsArray(cfg.ADD_TAGS)) {
		        if (ALLOWED_TAGS === DEFAULT_ALLOWED_TAGS) {
		          ALLOWED_TAGS = clone(ALLOWED_TAGS);
		        }
		        addToSet(ALLOWED_TAGS, cfg.ADD_TAGS, transformCaseFunc);
		      }
		    }
		    if (objectHasOwnProperty(cfg, "ADD_ATTR")) {
		      if (typeof cfg.ADD_ATTR === "function") {
		        EXTRA_ELEMENT_HANDLING.attributeCheck = cfg.ADD_ATTR;
		      } else if (arrayIsArray(cfg.ADD_ATTR)) {
		        if (ALLOWED_ATTR === DEFAULT_ALLOWED_ATTR) {
		          ALLOWED_ATTR = clone(ALLOWED_ATTR);
		        }
		        addToSet(ALLOWED_ATTR, cfg.ADD_ATTR, transformCaseFunc);
		      }
		    }
		    if (objectHasOwnProperty(cfg, "ADD_FORBID_CONTENTS") && arrayIsArray(cfg.ADD_FORBID_CONTENTS)) {
		      if (FORBID_CONTENTS === DEFAULT_FORBID_CONTENTS) {
		        FORBID_CONTENTS = clone(FORBID_CONTENTS);
		      }
		      addToSet(FORBID_CONTENTS, cfg.ADD_FORBID_CONTENTS, transformCaseFunc);
		    }
		    if (KEEP_CONTENT) {
		      ALLOWED_TAGS["#text"] = true;
		    }
		    if (WHOLE_DOCUMENT) {
		      addToSet(ALLOWED_TAGS, ["html", "head", "body"]);
		    }
		    if (ALLOWED_TAGS.table) {
		      addToSet(ALLOWED_TAGS, ["tbody"]);
		      delete FORBID_TAGS.tbody;
		    }
		    if (cfg.TRUSTED_TYPES_POLICY) {
		      if (typeof cfg.TRUSTED_TYPES_POLICY.createHTML !== "function") {
		        throw typeErrorCreate('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');
		      }
		      if (typeof cfg.TRUSTED_TYPES_POLICY.createScriptURL !== "function") {
		        throw typeErrorCreate('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');
		      }
		      const previousTrustedTypesPolicy = trustedTypesPolicy;
		      trustedTypesPolicy = cfg.TRUSTED_TYPES_POLICY;
		      try {
		        emptyHTML = _createTrustedHTML("");
		      } catch (error) {
		        trustedTypesPolicy = previousTrustedTypesPolicy;
		        throw error;
		      }
		    } else if (cfg.TRUSTED_TYPES_POLICY === null) {
		      trustedTypesPolicy = void 0;
		      emptyHTML = "";
		    } else {
		      if (trustedTypesPolicy === void 0) {
		        trustedTypesPolicy = _getDefaultTrustedTypesPolicy();
		      }
		      if (trustedTypesPolicy && typeof emptyHTML === "string") {
		        emptyHTML = _createTrustedHTML("");
		      }
		    }
		    if (freeze) {
		      freeze(cfg);
		    }
		    CONFIG = cfg;
		  };
		  const ALL_SVG_TAGS = addToSet({}, [...svg$1, ...svgFilters, ...svgDisallowed]);
		  const ALL_MATHML_TAGS = addToSet({}, [...mathMl$1, ...mathMlDisallowed]);
		  const _checkSvgNamespace = function _checkSvgNamespace2(tagName, parent, parentTagName) {
		    if (parent.namespaceURI === HTML_NAMESPACE) {
		      return tagName === "svg";
		    }
		    if (parent.namespaceURI === MATHML_NAMESPACE) {
		      return tagName === "svg" && (parentTagName === "annotation-xml" || MATHML_TEXT_INTEGRATION_POINTS[parentTagName]);
		    }
		    return Boolean(ALL_SVG_TAGS[tagName]);
		  };
		  const _checkMathMlNamespace = function _checkMathMlNamespace2(tagName, parent, parentTagName) {
		    if (parent.namespaceURI === HTML_NAMESPACE) {
		      return tagName === "math";
		    }
		    if (parent.namespaceURI === SVG_NAMESPACE) {
		      return tagName === "math" && HTML_INTEGRATION_POINTS[parentTagName];
		    }
		    return Boolean(ALL_MATHML_TAGS[tagName]);
		  };
		  const _checkHtmlNamespace = function _checkHtmlNamespace2(tagName, parent, parentTagName) {
		    if (parent.namespaceURI === SVG_NAMESPACE && !HTML_INTEGRATION_POINTS[parentTagName]) {
		      return false;
		    }
		    if (parent.namespaceURI === MATHML_NAMESPACE && !MATHML_TEXT_INTEGRATION_POINTS[parentTagName]) {
		      return false;
		    }
		    return !ALL_MATHML_TAGS[tagName] && (COMMON_SVG_AND_HTML_ELEMENTS[tagName] || !ALL_SVG_TAGS[tagName]);
		  };
		  const _checkValidNamespace = function _checkValidNamespace2(element) {
		    let parent = getParentNode(element);
		    if (!parent || !parent.tagName) {
		      parent = {
		        namespaceURI: NAMESPACE,
		        tagName: "template"
		      };
		    }
		    const tagName = stringToLowerCase(element.tagName);
		    const parentTagName = stringToLowerCase(parent.tagName);
		    if (!ALLOWED_NAMESPACES[element.namespaceURI]) {
		      return false;
		    }
		    if (element.namespaceURI === SVG_NAMESPACE) {
		      return _checkSvgNamespace(tagName, parent, parentTagName);
		    }
		    if (element.namespaceURI === MATHML_NAMESPACE) {
		      return _checkMathMlNamespace(tagName, parent, parentTagName);
		    }
		    if (element.namespaceURI === HTML_NAMESPACE) {
		      return _checkHtmlNamespace(tagName, parent, parentTagName);
		    }
		    if (PARSER_MEDIA_TYPE === "application/xhtml+xml" && ALLOWED_NAMESPACES[element.namespaceURI]) {
		      return true;
		    }
		    return false;
		  };
		  const _forceRemove = function _forceRemove2(node) {
		    arrayPush(DOMPurify.removed, {
		      element: node
		    });
		    try {
		      getParentNode(node).removeChild(node);
		    } catch (_2) {
		      remove(node);
		      if (!getParentNode(node)) {
		        throw typeErrorCreate("a node selected for removal could not be detached from its tree and cannot be safely returned; refusing to sanitize in place");
		      }
		    }
		  };
		  const _stripAttributeNode = function _stripAttributeNode2(element, attribute, name) {
		    try {
		      removeAttributeNode(element, attribute);
		    } catch (_2) {
		      try {
		        element.removeAttribute(name);
		      } catch (_3) {
		      }
		    }
		  };
		  const _neutralizeRoot = function _neutralizeRoot2(root) {
		    _neutralizeSubtree(root);
		    const childNodes = getChildNodes(root);
		    if (childNodes) {
		      const snapshot = [];
		      arrayForEach(childNodes, (child) => {
		        arrayPush(snapshot, child);
		      });
		      arrayForEach(snapshot, (child) => {
		        try {
		          remove(child);
		        } catch (_2) {
		        }
		      });
		    }
		    const attributes = getAttributes(root);
		    if (attributes) {
		      for (let i = attributes.length - 1; i >= 0; --i) {
		        const attribute = attributes[i];
		        const name = attribute && attribute.name;
		        if (typeof name === "string") {
		          _stripAttributeNode(root, attribute, name);
		        }
		      }
		    }
		  };
		  const _removeAttribute = function _removeAttribute2(name, element, attr) {
		    if (!attr) {
		      try {
		        attr = element.getAttributeNode(name);
		      } catch (_2) {
		        attr = null;
		      }
		    }
		    arrayPush(DOMPurify.removed, {
		      attribute: attr || null,
		      from: element
		    });
		    try {
		      if (attr) {
		        removeAttributeNode(element, attr);
		      } else {
		        element.removeAttribute(name);
		      }
		    } catch (_2) {
		      try {
		        element.removeAttribute(name);
		      } catch (_3) {
		      }
		    }
		    if (name === "is") {
		      if (RETURN_DOM || RETURN_DOM_FRAGMENT) {
		        try {
		          _forceRemove(element);
		        } catch (_2) {
		        }
		      } else {
		        try {
		          element.setAttribute(name, "");
		        } catch (_2) {
		        }
		      }
		    }
		  };
		  const _stripDisallowedAttributes = function _stripDisallowedAttributes2(element) {
		    const attributes = getAttributes(element);
		    if (!attributes) {
		      return;
		    }
		    for (let i = attributes.length - 1; i >= 0; --i) {
		      const attribute = attributes[i];
		      const name = attribute && attribute.name;
		      if (typeof name !== "string" || ALLOWED_ATTR[transformCaseFunc(name)]) {
		        continue;
		      }
		      _stripAttributeNode(element, attribute, name);
		    }
		  };
		  const _neutralizeSubtree = function _neutralizeSubtree2(root) {
		    const stack = [root];
		    while (stack.length > 0) {
		      const node = stack.pop();
		      const nodeType = _readNodeType(node);
		      if (nodeType === NODE_TYPE.element) {
		        _stripDisallowedAttributes(node);
		      }
		      const childNodes = getChildNodes(node);
		      if (childNodes) {
		        for (let i = childNodes.length - 1; i >= 0; --i) {
		          stack.push(childNodes[i]);
		        }
		      }
		    }
		  };
		  const _isPatchLinkageAttribute = function _isPatchLinkageAttribute2(lcName, lcTag) {
		    if (!SAFE_FOR_XML) {
		      return false;
		    }
		    if (lcName === "patchsrc") {
		      return true;
		    }
		    return lcName === "for" && lcTag !== "label" && lcTag !== "output";
		  };
		  const _neutralizePatchLinkage = function _neutralizePatchLinkage2(root) {
		    if (!SAFE_FOR_XML) {
		      return;
		    }
		    const stack = [root];
		    while (stack.length > 0) {
		      const node = stack.pop();
		      const nodeType = _readNodeType(node);
		      if (nodeType === NODE_TYPE.processingInstruction || nodeType === NODE_TYPE.comment && regExpTest(COMMENT_MARKUP_PROBE, node.data)) {
		        try {
		          remove(node);
		        } catch (_2) {
		        }
		        continue;
		      }
		      if (nodeType === NODE_TYPE.element) {
		        const element = node;
		        const lcTag = transformCaseFunc(_readNodeName(node));
		        try {
		          if (element.hasAttribute && element.hasAttribute("patchsrc")) {
		            element.removeAttribute("patchsrc");
		          }
		          if (element.hasAttribute && element.hasAttribute("for") && _isPatchLinkageAttribute("for", lcTag)) {
		            element.removeAttribute("for");
		          }
		        } catch (_2) {
		        }
		      }
		      const childNodes = getChildNodes(node);
		      if (childNodes) {
		        for (let i = childNodes.length - 1; i >= 0; --i) {
		          stack.push(childNodes[i]);
		        }
		      }
		    }
		  };
		  const _initDocument = function _initDocument2(dirty) {
		    let doc = null;
		    let leadingWhitespace = null;
		    if (FORCE_BODY) {
		      dirty = "<remove></remove>" + dirty;
		    } else {
		      const matches = stringMatch(dirty, /^[\r\n\t ]+/);
		      leadingWhitespace = matches && matches[0];
		    }
		    if (PARSER_MEDIA_TYPE === "application/xhtml+xml" && NAMESPACE === HTML_NAMESPACE) {
		      dirty = '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' + dirty + "</body></html>";
		    }
		    const dirtyPayload = trustedTypesPolicy ? _createTrustedHTML(dirty) : dirty;
		    if (NAMESPACE === HTML_NAMESPACE) {
		      try {
		        doc = new DOMParser().parseFromString(dirtyPayload, PARSER_MEDIA_TYPE);
		      } catch (_2) {
		      }
		    }
		    if (!doc || !doc.documentElement) {
		      doc = implementation.createDocument(NAMESPACE, "template", null);
		      try {
		        doc.documentElement.innerHTML = IS_EMPTY_INPUT ? emptyHTML : dirtyPayload;
		      } catch (_2) {
		      }
		    }
		    const body = doc.body || doc.documentElement;
		    if (dirty && leadingWhitespace) {
		      body.insertBefore(document2.createTextNode(leadingWhitespace), body.childNodes[0] || null);
		    }
		    if (NAMESPACE === HTML_NAMESPACE) {
		      return getElementsByTagName.call(doc, WHOLE_DOCUMENT ? "html" : "body")[0];
		    }
		    return WHOLE_DOCUMENT ? doc.documentElement : body;
		  };
		  const _createNodeIterator = function _createNodeIterator2(root) {
		    const doc = getOwnerDocument ? getOwnerDocument(root) : root.ownerDocument;
		    return createNodeIterator.call(
		      doc || root,
		      root,
		      // eslint-disable-next-line no-bitwise
		      NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_COMMENT | NodeFilter.SHOW_TEXT | NodeFilter.SHOW_PROCESSING_INSTRUCTION | NodeFilter.SHOW_CDATA_SECTION,
		      null
		    );
		  };
		  const _stripTemplateExpressions = function _stripTemplateExpressions2(value) {
		    value = stringReplace(value, MUSTACHE_EXPR$1, " ");
		    value = stringReplace(value, ERB_EXPR$1, " ");
		    value = stringReplace(value, TMPLIT_EXPR$1, " ");
		    return value;
		  };
		  const _scrubTemplateExpressions2 = function _scrubTemplateExpressions(node) {
		    var _node$querySelectorAl;
		    node.normalize();
		    const doc = getOwnerDocument ? getOwnerDocument(node) : node.ownerDocument;
		    const walker = createNodeIterator.call(
		      doc || node,
		      node,
		      // eslint-disable-next-line no-bitwise
		      NodeFilter.SHOW_TEXT | NodeFilter.SHOW_COMMENT | NodeFilter.SHOW_CDATA_SECTION | NodeFilter.SHOW_PROCESSING_INSTRUCTION,
		      null
		    );
		    let currentNode = walker.nextNode();
		    while (currentNode) {
		      currentNode.data = _stripTemplateExpressions(currentNode.data);
		      currentNode = walker.nextNode();
		    }
		    const templates = (_node$querySelectorAl = node.querySelectorAll) === null || _node$querySelectorAl === void 0 ? void 0 : _node$querySelectorAl.call(node, "template");
		    if (templates) {
		      arrayForEach(templates, (tmpl) => {
		        if (_isDocumentFragment(tmpl.content)) {
		          _scrubTemplateExpressions2(tmpl.content);
		        }
		      });
		    }
		  };
		  const _isClobbered = function _isClobbered2(element) {
		    const realTagName = getNodeName ? getNodeName(element) : null;
		    if (typeof realTagName !== "string") {
		      return false;
		    }
		    if (transformCaseFunc(realTagName) !== "form") {
		      return false;
		    }
		    return typeof element.nodeName !== "string" || typeof element.textContent !== "string" || typeof element.removeChild !== "function" || // Realm-safe NamedNodeMap detection: equality against the cached
		    // prototype getter. Clobbered .attributes (e.g. <input name="attributes">)
		    // makes the direct read diverge from the cached read; a clean form
		    // (same-realm OR foreign-realm) has both reads pointing at the same
		    // canonical NamedNodeMap.
		    element.attributes !== getAttributes(element) || typeof element.removeAttribute !== "function" || // A form descendant named "removeAttributeNode" or "getAttributeNode"
		    // shadows these Attr-node methods via [LegacyOverrideBuiltIns].
		    // _removeAttribute() / _stripAttributeNode() reach for
		    // element.removeAttributeNode(attr) first; when it is shadowed the call
		    // throws and the name-based fallback element.removeAttribute(name)
		    // ASCII-lowercases its lookup key in an HTML document, silently missing
		    // a case-preserved event-handler attribute (e.g. an ONANIMATIONSTART
		    // that reached the sanitizer through an XML/XHTML parse). Flag the form
		    // so it is removed wholesale, exactly as for the other shadowed methods.
		    typeof element.removeAttributeNode !== "function" || typeof element.getAttributeNode !== "function" || typeof element.setAttribute !== "function" || typeof element.namespaceURI !== "string" || typeof element.insertBefore !== "function" || typeof element.hasChildNodes !== "function" || // NodeType clobbering probe. Cached Node.prototype.nodeType getter
		    // returns the integer 1 for any Element regardless of realm; direct
		    // read on a clobbered form (e.g. <input name="nodeType">) returns
		    // the named child element. Cheap addition — nodeType is read from
		    // an internal slot, no serialization cost — and removes a residual
		    // clobbering surface used by several mXSS / PI / comment branches
		    // in _sanitizeElements that compare currentNode.nodeType directly.
		    element.nodeType !== getNodeType(element) || // HTMLFormElement has [LegacyOverrideBuiltIns]: a descendant named
		    // "childNodes" shadows the prototype getter. Direct reads of
		    // form.childNodes from a clobbered form return the named child
		    // instead of the real NodeList, so any walk that reads it directly
		    // skips the form's real children. Compare the direct read to the
		    // cached Node.prototype getter — when the form's named-property
		    // getter intercepts the read, the two values differ and we flag
		    // the form. This catches every clobbering child type (input,
		    // select, etc.) regardless of whether the named child happens to
		    // carry a numeric .length, which a typeof-based probe would miss
		    // (e.g. HTMLSelectElement.length is a defined unsigned-long).
		    element.childNodes !== getChildNodes(element);
		  };
		  const _isDocumentFragment = function _isDocumentFragment2(value) {
		    if (!getNodeType || typeof value !== "object" || value === null) {
		      return false;
		    }
		    try {
		      return getNodeType(value) === NODE_TYPE.documentFragment;
		    } catch (_2) {
		      return false;
		    }
		  };
		  const _isNode = function _isNode2(value) {
		    if (!getNodeType || typeof value !== "object" || value === null) {
		      return false;
		    }
		    try {
		      return typeof getNodeType(value) === "number";
		    } catch (_2) {
		      return false;
		    }
		  };
		  function _executeHooks(hooks2, currentNode, data) {
		    if (hooks2.length === 0) {
		      return;
		    }
		    arrayForEach(hooks2, (hook) => {
		      hook.call(DOMPurify, currentNode, data, CONFIG);
		    });
		  }
		  const _isUnsafeNode = function _isUnsafeNode2(currentNode, tagName) {
		    if (SAFE_FOR_XML && currentNode.hasChildNodes() && !_isNode(currentNode.firstElementChild) && regExpTest(ELEMENT_MARKUP_PROBE, currentNode.textContent) && regExpTest(ELEMENT_MARKUP_PROBE, currentNode.innerHTML)) {
		      return true;
		    }
		    if (SAFE_FOR_XML && currentNode.namespaceURI === HTML_NAMESPACE && LITERAL_TEXT_ELEMENTS[tagName] && (_isNode(currentNode.firstElementChild) || typeof currentNode.textContent === "string" && regExpTest(LITERAL_TEXT_CLOSE[tagName], currentNode.textContent))) {
		      return true;
		    }
		    if (currentNode.nodeType === NODE_TYPE.processingInstruction) {
		      return true;
		    }
		    if (SAFE_FOR_XML && currentNode.nodeType === NODE_TYPE.comment && regExpTest(COMMENT_MARKUP_PROBE, currentNode.data)) {
		      return true;
		    }
		    return false;
		  };
		  const _matchesNameCheck = function _matchesNameCheck2(check, name) {
		    if (check instanceof RegExp) {
		      return regExpTest(check, name);
		    }
		    if (check instanceof Function) {
		      for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
		        args[_key - 2] = arguments[_key];
		      }
		      return Boolean(check(name, ...args));
		    }
		    return false;
		  };
		  const _sanitizeDisallowedNode = function _sanitizeDisallowedNode2(currentNode, tagName, root) {
		    if (!FORBID_TAGS[tagName] && _isBasicCustomElement(tagName) && _matchesNameCheck(CUSTOM_ELEMENT_HANDLING.tagNameCheck, tagName)) {
		      return false;
		    }
		    if (KEEP_CONTENT && !FORBID_CONTENTS[tagName]) {
		      const parentNode = getParentNode(currentNode);
		      const childNodes = getChildNodes(currentNode);
		      if (childNodes && parentNode) {
		        const childCount = childNodes.length;
		        for (let i = childCount - 1; i >= 0; --i) {
		          const hoisted = currentNode === root ? cloneNode(childNodes[i], true) : childNodes[i];
		          parentNode.insertBefore(hoisted, getNextSibling(currentNode));
		        }
		      }
		    }
		    _forceRemove(currentNode);
		    return true;
		  };
		  const _forkSharedAllowlist = function _forkSharedAllowlist2(hookList, set, defaultSet, setConfigSet) {
		    if (hookList.length === 0) {
		      return set;
		    }
		    return set === defaultSet || set === setConfigSet ? clone(set) : set;
		  };
		  const _handleHookDetachedNode = function _handleHookDetachedNode2(currentNode, root) {
		    if (currentNode === root || getParentNode(currentNode) !== null) {
		      return false;
		    }
		    if (IN_PLACE) {
		      _neutralizeSubtree(currentNode);
		    }
		    return true;
		  };
		  const _sanitizeElements = function _sanitizeElements2(currentNode, root) {
		    _executeHooks(hooks.beforeSanitizeElements, currentNode, null);
		    if (_handleHookDetachedNode(currentNode, root)) {
		      return true;
		    }
		    if (_isClobbered(currentNode)) {
		      _forceRemove(currentNode);
		      return true;
		    }
		    const tagName = transformCaseFunc(_readNodeName(currentNode));
		    ALLOWED_TAGS = _forkSharedAllowlist(hooks.uponSanitizeElement, ALLOWED_TAGS, DEFAULT_ALLOWED_TAGS, SET_CONFIG_ALLOWED_TAGS);
		    _executeHooks(hooks.uponSanitizeElement, currentNode, {
		      tagName,
		      allowedTags: ALLOWED_TAGS
		    });
		    if (_handleHookDetachedNode(currentNode, root)) {
		      return true;
		    }
		    if (_isUnsafeNode(currentNode, tagName)) {
		      _forceRemove(currentNode);
		      return true;
		    }
		    if (FORBID_TAGS[tagName] || !(EXTRA_ELEMENT_HANDLING.tagCheck instanceof Function && EXTRA_ELEMENT_HANDLING.tagCheck(tagName)) && !ALLOWED_TAGS[tagName]) {
		      const removed = _sanitizeDisallowedNode(currentNode, tagName, root);
		      if (removed === false) {
		        _executeHooks(hooks.afterSanitizeElements, currentNode, null);
		      }
		      return removed;
		    }
		    const nt2 = _readNodeType(currentNode);
		    if (nt2 === NODE_TYPE.element && !_checkValidNamespace(currentNode)) {
		      _forceRemove(currentNode);
		      return true;
		    }
		    if ((tagName === "noscript" || tagName === "noembed" || tagName === "noframes") && regExpTest(FALLBACK_TAG_CLOSE, currentNode.innerHTML)) {
		      _forceRemove(currentNode);
		      return true;
		    }
		    if (SAFE_FOR_TEMPLATES && currentNode.nodeType === NODE_TYPE.text) {
		      const content = _stripTemplateExpressions(currentNode.textContent);
		      if (currentNode.textContent !== content) {
		        arrayPush(DOMPurify.removed, {
		          element: currentNode.cloneNode()
		        });
		        currentNode.textContent = content;
		      }
		    }
		    _executeHooks(hooks.afterSanitizeElements, currentNode, null);
		    return false;
		  };
		  const _isValidAttribute = function _isValidAttribute2(lcTag, lcName, value) {
		    if (FORBID_ATTR[lcName]) {
		      return false;
		    }
		    if (_isPatchLinkageAttribute(lcName, lcTag)) {
		      return false;
		    }
		    if (SANITIZE_DOM && (lcName === "id" || lcName === "name") && (value in document2 || value in formElement)) {
		      return false;
		    }
		    const nameIsPermitted = ALLOWED_ATTR[lcName] || EXTRA_ELEMENT_HANDLING.attributeCheck instanceof Function && EXTRA_ELEMENT_HANDLING.attributeCheck(lcName, lcTag);
		    if (ALLOW_DATA_ATTR && regExpTest(DATA_ATTR$1, lcName)) {
		      return true;
		    }
		    if (ALLOW_ARIA_ATTR && regExpTest(ARIA_ATTR$1, lcName)) {
		      return true;
		    }
		    if (!nameIsPermitted) {
		      return (
		        // Condition a) covers a basically valid custom element tag name whose
		        // tag passes the configured tagNameCheck and whose attribute name
		        // passes the configured attributeNameCheck ...
		        _isBasicCustomElement(lcTag) && _matchesNameCheck(CUSTOM_ELEMENT_HANDLING.tagNameCheck, lcTag) && _matchesNameCheck(CUSTOM_ELEMENT_HANDLING.attributeNameCheck, lcName, lcTag) || // Condition b) covers an `is` attribute whose value passes the
		        // configured tagNameCheck while customized built-in elements are
		        // allowed.
		        lcName === "is" && CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements && _matchesNameCheck(CUSTOM_ELEMENT_HANDLING.tagNameCheck, value)
		      );
		    }
		    if (URI_SAFE_ATTRIBUTES[lcName]) {
		      return true;
		    }
		    if (regExpTest(IS_ALLOWED_URI$1, stringReplace(value, ATTR_WHITESPACE$1, ""))) {
		      return true;
		    }
		    if ((lcName === "src" || lcName === "xlink:href" || lcName === "href") && lcTag !== "script" && stringIndexOf(value, "data:") === 0 && DATA_URI_TAGS[lcTag]) {
		      return true;
		    }
		    if (ALLOW_UNKNOWN_PROTOCOLS && !regExpTest(IS_SCRIPT_OR_DATA$1, stringReplace(value, ATTR_WHITESPACE$1, ""))) {
		      return true;
		    }
		    return !value;
		  };
		  const RESERVED_CUSTOM_ELEMENT_NAMES = addToSet({}, ["annotation-xml", "color-profile", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "missing-glyph"]);
		  const _isBasicCustomElement = function _isBasicCustomElement2(tagName) {
		    return !RESERVED_CUSTOM_ELEMENT_NAMES[stringToLowerCase(tagName)] && regExpTest(CUSTOM_ELEMENT$1, tagName);
		  };
		  const _applyTrustedTypesToAttribute = function _applyTrustedTypesToAttribute2(lcTag, lcName, namespaceURI, value) {
		    if (trustedTypesPolicy && typeof trustedTypes === "object" && typeof trustedTypes.getAttributeType === "function" && !namespaceURI) {
		      switch (trustedTypes.getAttributeType(lcTag, lcName)) {
		        case "TrustedHTML": {
		          return _createTrustedHTML(value);
		        }
		        case "TrustedScriptURL": {
		          return _createTrustedScriptURL(value);
		        }
		      }
		    }
		    return value;
		  };
		  const _setAttributeValue = function _setAttributeValue2(currentNode, name, namespaceURI, value) {
		    try {
		      if (namespaceURI) {
		        currentNode.setAttributeNS(namespaceURI, name, value);
		      } else {
		        currentNode.setAttribute(name, value);
		      }
		      if (_isClobbered(currentNode)) {
		        _forceRemove(currentNode);
		        return false;
		      }
		      return true;
		    } catch (_2) {
		      _removeAttribute(name, currentNode);
		      return false;
		    }
		  };
		  const _sanitizeAttributes = function _sanitizeAttributes2(currentNode) {
		    _executeHooks(hooks.beforeSanitizeAttributes, currentNode, null);
		    const attributes = currentNode.attributes;
		    if (!attributes || _isClobbered(currentNode)) {
		      return;
		    }
		    ALLOWED_ATTR = _forkSharedAllowlist(hooks.uponSanitizeAttribute, ALLOWED_ATTR, DEFAULT_ALLOWED_ATTR, SET_CONFIG_ALLOWED_ATTR);
		    const hookEvent = {
		      attrName: "",
		      attrValue: "",
		      keepAttr: true,
		      allowedAttributes: ALLOWED_ATTR,
		      forceKeepAttr: void 0
		    };
		    let l3 = attributes.length;
		    const lcTag = transformCaseFunc(currentNode.nodeName);
		    while (l3--) {
		      const attr = attributes[l3];
		      const name = attr.name, namespaceURI = attr.namespaceURI, attrValue = attr.value;
		      const lcName = transformCaseFunc(name);
		      const initValue = attrValue;
		      let value = name === "value" ? initValue : stringTrim(initValue);
		      let recreatedNamedProp = false;
		      hookEvent.attrName = lcName;
		      hookEvent.attrValue = value;
		      hookEvent.keepAttr = true;
		      hookEvent.forceKeepAttr = void 0;
		      _executeHooks(hooks.uponSanitizeAttribute, currentNode, hookEvent);
		      value = hookEvent.attrValue;
		      if (SANITIZE_NAMED_PROPS && (lcName === "id" || lcName === "name") && stringIndexOf(value, SANITIZE_NAMED_PROPS_PREFIX) !== 0) {
		        _removeAttribute(name, currentNode, attr);
		        value = SANITIZE_NAMED_PROPS_PREFIX + value;
		        recreatedNamedProp = true;
		      }
		      if (SAFE_FOR_XML && regExpTest(/((--!?|])>)|<\/(style|script|title|xmp|textarea|noscript|iframe|noembed|noframes)/i, value)) {
		        _removeAttribute(name, currentNode, attr);
		        continue;
		      }
		      if (lcName === "attributename" && stringMatch(value, "href")) {
		        _removeAttribute(name, currentNode, attr);
		        continue;
		      }
		      if (hookEvent.forceKeepAttr) {
		        continue;
		      }
		      if (!hookEvent.keepAttr) {
		        _removeAttribute(name, currentNode, attr);
		        continue;
		      }
		      if (!ALLOW_SELF_CLOSE_IN_ATTR && regExpTest(SELF_CLOSING_TAG, value)) {
		        _removeAttribute(name, currentNode, attr);
		        continue;
		      }
		      if (SAFE_FOR_TEMPLATES) {
		        value = _stripTemplateExpressions(value);
		      }
		      if (!_isValidAttribute(lcTag, lcName, value)) {
		        _removeAttribute(name, currentNode, attr);
		        continue;
		      }
		      value = _applyTrustedTypesToAttribute(lcTag, lcName, namespaceURI, value);
		      if (value !== initValue) {
		        const cleanWrite = _setAttributeValue(currentNode, name, namespaceURI, value);
		        if (cleanWrite && recreatedNamedProp) {
		          arrayPop(DOMPurify.removed);
		        }
		      }
		    }
		    _executeHooks(hooks.afterSanitizeAttributes, currentNode, null);
		  };
		  const _sanitizeShadowDOM2 = function _sanitizeShadowDOM(fragment) {
		    let shadowNode = null;
		    const shadowIterator = _createNodeIterator(fragment);
		    _executeHooks(hooks.beforeSanitizeShadowDOM, fragment, null);
		    while (shadowNode = shadowIterator.nextNode()) {
		      _executeHooks(hooks.uponSanitizeShadowNode, shadowNode, null);
		      _sanitizeElements(shadowNode, fragment);
		      _sanitizeAttributes(shadowNode);
		      if (_isDocumentFragment(shadowNode.content)) {
		        _sanitizeShadowDOM2(shadowNode.content);
		      }
		      if (_readNodeType(shadowNode) === NODE_TYPE.element) {
		        const innerSr = getShadowRoot(shadowNode);
		        if (_isDocumentFragment(innerSr)) {
		          _sanitizeAttachedShadowRoots(innerSr);
		          _sanitizeShadowDOM2(innerSr);
		        }
		      }
		    }
		    _executeHooks(hooks.afterSanitizeShadowDOM, fragment, null);
		  };
		  const _sanitizeAttachedShadowRoots = function _sanitizeAttachedShadowRoots2(root) {
		    const stack = [{
		      node: root,
		      shadow: null
		    }];
		    while (stack.length > 0) {
		      const item = stack.pop();
		      if (item.shadow) {
		        _sanitizeShadowDOM2(item.shadow);
		        continue;
		      }
		      const node = item.node;
		      const nodeType = _readNodeType(node);
		      const isElement = nodeType === NODE_TYPE.element;
		      const childNodes = getChildNodes(node);
		      if (childNodes) {
		        for (let i = childNodes.length - 1; i >= 0; --i) {
		          stack.push({
		            node: childNodes[i],
		            shadow: null
		          });
		        }
		      }
		      if (isElement) {
		        const rootName = getNodeName ? getNodeName(node) : null;
		        if (typeof rootName === "string" && transformCaseFunc(rootName) === "template") {
		          const content = node.content;
		          if (_isDocumentFragment(content)) {
		            stack.push({
		              node: content,
		              shadow: null
		            });
		          }
		        }
		      }
		      if (isElement) {
		        const sr = getShadowRoot(node);
		        if (_isDocumentFragment(sr)) {
		          stack.push({
		            node: null,
		            shadow: sr
		          }, {
		            node: sr,
		            shadow: null
		          });
		        }
		      }
		    }
		  };
		  DOMPurify.sanitize = function(dirty) {
		    let cfg = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
		    let body = null;
		    let importedNode = null;
		    let currentNode = null;
		    let returnNode = null;
		    IS_EMPTY_INPUT = !dirty;
		    if (IS_EMPTY_INPUT) {
		      dirty = "<!-->";
		    }
		    if (typeof dirty !== "string" && !_isNode(dirty)) {
		      dirty = stringifyValue(dirty);
		      if (typeof dirty !== "string") {
		        throw typeErrorCreate("dirty is not a string, aborting");
		      }
		    }
		    if (!DOMPurify.isSupported) {
		      return dirty;
		    }
		    if (SET_CONFIG) {
		      ALLOWED_TAGS = SET_CONFIG_ALLOWED_TAGS;
		      ALLOWED_ATTR = SET_CONFIG_ALLOWED_ATTR;
		    } else {
		      _parseConfig(cfg);
		    }
		    if (hooks.uponSanitizeElement.length > 0 || hooks.uponSanitizeAttribute.length > 0) {
		      ALLOWED_TAGS = clone(ALLOWED_TAGS);
		    }
		    if (hooks.uponSanitizeAttribute.length > 0) {
		      ALLOWED_ATTR = clone(ALLOWED_ATTR);
		    }
		    DOMPurify.removed = [];
		    const inPlace = IN_PLACE && typeof dirty !== "string" && _isNode(dirty);
		    if (inPlace) {
		      _neutralizePatchLinkage(dirty);
		      const nn = _readNodeName(dirty);
		      if (typeof nn === "string") {
		        const tagName = transformCaseFunc(nn);
		        if (!ALLOWED_TAGS[tagName] || FORBID_TAGS[tagName]) {
		          _neutralizeRoot(dirty);
		          throw typeErrorCreate("root node is forbidden and cannot be sanitized in-place");
		        }
		      }
		      if (_isClobbered(dirty)) {
		        _neutralizeRoot(dirty);
		        throw typeErrorCreate("root node is clobbered and cannot be sanitized in-place");
		      }
		      try {
		        _sanitizeAttachedShadowRoots(dirty);
		      } catch (error) {
		        _neutralizeRoot(dirty);
		        throw error;
		      }
		    } else if (_isNode(dirty)) {
		      body = _initDocument("<!---->");
		      importedNode = body.ownerDocument.importNode(dirty, true);
		      if (importedNode.nodeType === NODE_TYPE.element && importedNode.nodeName === "BODY") {
		        body = importedNode;
		      } else if (importedNode.nodeName === "HTML") {
		        body = importedNode;
		      } else {
		        body.appendChild(importedNode);
		      }
		      _sanitizeAttachedShadowRoots(body);
		    } else {
		      if (!RETURN_DOM && !SAFE_FOR_TEMPLATES && !WHOLE_DOCUMENT && // eslint-disable-next-line unicorn/prefer-includes
		      dirty.indexOf("<") === -1) {
		        return trustedTypesPolicy && RETURN_TRUSTED_TYPE ? _createTrustedHTML(dirty) : dirty;
		      }
		      body = _initDocument(dirty);
		      if (!body) {
		        return RETURN_DOM ? null : RETURN_TRUSTED_TYPE ? emptyHTML : "";
		      }
		    }
		    if (body && FORCE_BODY) {
		      _forceRemove(body.firstChild);
		    }
		    const walkRoot = inPlace ? dirty : body;
		    try {
		      const nodeIterator = _createNodeIterator(walkRoot);
		      while (currentNode = nodeIterator.nextNode()) {
		        _sanitizeElements(currentNode, walkRoot);
		        _sanitizeAttributes(currentNode);
		        if (_isDocumentFragment(currentNode.content)) {
		          _sanitizeShadowDOM2(currentNode.content);
		        }
		      }
		    } catch (error) {
		      if (inPlace) {
		        _neutralizeRoot(dirty);
		        arrayForEach(DOMPurify.removed, (entry) => {
		          if (entry.element) {
		            _neutralizeSubtree(entry.element);
		          }
		        });
		      }
		      throw error;
		    }
		    if (inPlace) {
		      arrayForEach(DOMPurify.removed, (entry) => {
		        if (entry.element) {
		          _neutralizeSubtree(entry.element);
		        }
		      });
		      if (SAFE_FOR_TEMPLATES) {
		        _scrubTemplateExpressions2(dirty);
		      }
		      return dirty;
		    }
		    if (RETURN_DOM) {
		      if (SAFE_FOR_TEMPLATES) {
		        _scrubTemplateExpressions2(body);
		      }
		      if (RETURN_DOM_FRAGMENT) {
		        returnNode = createDocumentFragment.call(body.ownerDocument);
		        while (body.firstChild) {
		          returnNode.appendChild(body.firstChild);
		        }
		      } else {
		        returnNode = body;
		      }
		      if (ALLOWED_ATTR.shadowroot || ALLOWED_ATTR.shadowrootmode) {
		        returnNode = importNode.call(originalDocument, returnNode, true);
		      }
		      return returnNode;
		    }
		    let serializedHTML = WHOLE_DOCUMENT ? body.outerHTML : body.innerHTML;
		    if (WHOLE_DOCUMENT && ALLOWED_TAGS["!doctype"] && body.ownerDocument && body.ownerDocument.doctype && body.ownerDocument.doctype.name && regExpTest(DOCTYPE_NAME, body.ownerDocument.doctype.name)) {
		      serializedHTML = "<!DOCTYPE " + body.ownerDocument.doctype.name + ">\n" + serializedHTML;
		    }
		    if (SAFE_FOR_TEMPLATES) {
		      serializedHTML = _stripTemplateExpressions(serializedHTML);
		    }
		    return trustedTypesPolicy && RETURN_TRUSTED_TYPE ? _createTrustedHTML(serializedHTML) : serializedHTML;
		  };
		  DOMPurify.setConfig = function() {
		    let cfg = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
		    _parseConfig(cfg);
		    SET_CONFIG = true;
		    SET_CONFIG_ALLOWED_TAGS = ALLOWED_TAGS;
		    SET_CONFIG_ALLOWED_ATTR = ALLOWED_ATTR;
		  };
		  DOMPurify.clearConfig = function() {
		    CONFIG = null;
		    SET_CONFIG = false;
		    SET_CONFIG_ALLOWED_TAGS = null;
		    SET_CONFIG_ALLOWED_ATTR = null;
		    trustedTypesPolicy = defaultTrustedTypesPolicy;
		    emptyHTML = "";
		  };
		  DOMPurify.isValidAttribute = function(tag, attr, value) {
		    if (!CONFIG) {
		      _parseConfig({});
		    }
		    const lcTag = transformCaseFunc(tag);
		    const lcName = transformCaseFunc(attr);
		    return _isValidAttribute(lcTag, lcName, value);
		  };
		  DOMPurify.addHook = function(entryPoint, hookFunction) {
		    if (typeof hookFunction !== "function") {
		      return;
		    }
		    if (!objectHasOwnProperty(hooks, entryPoint)) {
		      return;
		    }
		    arrayPush(hooks[entryPoint], hookFunction);
		  };
		  DOMPurify.removeHook = function(entryPoint, hookFunction) {
		    if (!objectHasOwnProperty(hooks, entryPoint)) {
		      return void 0;
		    }
		    if (hookFunction !== void 0) {
		      const index = arrayLastIndexOf(hooks[entryPoint], hookFunction);
		      return index === -1 ? void 0 : arraySplice(hooks[entryPoint], index, 1)[0];
		    }
		    return arrayPop(hooks[entryPoint]);
		  };
		  DOMPurify.removeHooks = function(entryPoint) {
		    if (!objectHasOwnProperty(hooks, entryPoint)) {
		      return;
		    }
		    hooks[entryPoint] = [];
		  };
		  DOMPurify.removeAllHooks = function() {
		    hooks = _createHooksMap();
		  };
		  return DOMPurify;
		}
		var purify = createDOMPurify();

		// node_modules/.pnpm/marked@18.0.13/node_modules/marked/lib/marked.esm.js
		function A() {
		  return { async: false, breaks: false, extensions: null, gfm: true, hooks: null, pedantic: false, renderer: null, silent: false, tokenizer: null, walkTokens: null };
		}
		var T = A();
		function U(l3) {
		  T = l3;
		}
		var E = { exec: () => null };
		function I(l3) {
		  let e = [];
		  return (t) => {
		    let n = Math.max(0, Math.min(3, t - 1)), i = e[n];
		    return i || (i = l3(n), e[n] = i), i;
		  };
		}
		function d(l3, e = "") {
		  let t = typeof l3 == "string" ? l3 : l3.source, n = { replace: (i, r) => {
		    let o = typeof r == "string" ? r : r.source;
		    return o = o.replace(m.caret, "$1"), t = t.replace(i, o), n;
		  }, getRegex: () => new RegExp(t, e) };
		  return n;
		}
		var we = ((l3 = "") => {
		  try {
		    return !!new RegExp("(?<=1)(?<!1)" + l3);
		  } catch {
		    return false;
		  }
		})();
		var m = { codeRemoveIndent: /^(?: {0,3}\t| {1,4})/gm, outputLinkReplace: /\\([\[\]])/g, indentCodeCompensation: /^(\s+)(?:```)/, beginningSpace: /^\s+/, endingHash: /#$/, startingSpaceChar: /^ /, endingSpaceChar: / $/, endingSpaceTabChar: /[ \t]$/, nonSpaceChar: /[^ ]/, newLineCharGlobal: /\n/g, tabCharGlobal: /\t/g, multipleSpaceGlobal: /\s+/g, blankLine: /^[ \t]*$/, doubleBlankLine: /\n[ \t]*\n[ \t]*$/, blockquoteStart: /^ {0,3}>/, blockquoteSetextReplace: /\n {0,3}((?:=+|-+) *)(?=\n|$)/g, blockquoteSetextReplace2: /^ {0,3}>[ \t]?/gm, listReplaceNesting: /^ {1,4}(?=( {4})*[^ ])/g, listIsTask: /^\[[ xX]\] +\S/, listReplaceTask: /^\[[ xX]\] +/, listTaskCheckbox: /\[[ xX]\]/, anyLine: /\n.*\n/, hrefBrackets: /^<(.*)>$/, tableDelimiter: /[:|]/, tableAlignChars: /^\||\| *$/g, tableRowBlankLine: /\n[ \t]*$/, tableAlignRight: /^ *-+: *$/, tableAlignCenter: /^ *:-+: *$/, tableAlignLeft: /^ *:-+ *$/, startATag: /^<a /i, endATag: /^<\/a>/i, startPreScriptTag: /^<(pre|code|kbd|script)(\s|>)/i, endPreScriptTag: /^<\/(pre|code|kbd|script)(\s|>)/i, startAngleBracket: /^</, endAngleBracket: />$/, pedanticHrefTitle: /^([^'"]*[^\s])\s+(['"])(.*)\2/, unicodeAlphaNumeric: /[\p{L}\p{N}]/u, escapeTest: /[&<>"']/, escapeReplace: /[&<>"']/g, escapeTestNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/, escapeReplaceNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g, caret: /(^|[^\[])\^/g, percentDecode: /%25/g, findPipe: /\|/g, splitPipe: / \|/, slashPipe: /\\\|/g, carriageReturn: /\r\n|\r/g, spaceLine: /^ +$/gm, notSpaceStart: /^\S*/, endingNewline: /\n$/, listItemRegex: (l3) => new RegExp(`^( {0,3}${l3})((?:[	 ][^\\n]*)?(?:\\n|$))`), nextBulletRegex: I((l3) => new RegExp(`^ {0,${l3}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`)), hrRegex: I((l3) => new RegExp(`^ {0,${l3}}((?:-[ 	]*){3,}|(?:_[ 	]*){3,}|(?:\\*[ 	]*){3,})(?:\\n+|$)`)), fencesBeginRegex: I((l3) => new RegExp(`^ {0,${l3}}(?:\`\`\`|~~~)`)), headingBeginRegex: I((l3) => new RegExp(`^ {0,${l3}}#`)), htmlBeginRegex: I((l3) => new RegExp(`^ {0,${l3}}(?:</?(?:${H})(?: +|$|/?>)|<(?:script|pre|style|textarea|!--))`, "i")), blockquoteBeginRegex: I((l3) => new RegExp(`^ {0,${l3}}>`)) };
		var ye = /^(?:[ \t]*(?:\n|$))+/;
		var Pe = /^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/;
		var Se = /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/;
		var v = /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/;
		var _e = /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/;
		var K = / {0,3}(?:[*+-]|\d{1,9}[.)])/;
		var le = /^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/;
		var ue = d(le).replace(/bull/g, K).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}(?:\s|$)/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/\|table/g, "").getRegex();
		var $e = d(le).replace(/bull/g, K).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}(?:\s|$)/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/table/g, / {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex();
		var W = /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table|[ \t]+\n)[^\n]+)*)/;
		var Le = /^[^\n]+/;
		var X = /(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/;
		var ze = d(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label", X).replace("title", /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex();
		var Ee = d(/^(bull)([ \t][^\n]*?)?(?:\n|$)/).replace(/bull/g, K).getRegex();
		var H = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul";
		var J = /<!--(?:-?>|[\s\S]*?(?:-->|$))/;
		var Me = d("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n*|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>[^\\n]*\\n*|$)|<![A-Z][\\s\\S]*?(?:>[^\\n]*\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>[^\\n]*\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][a-z0-9-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][a-z0-9-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))", "i").replace("comment", J).replace("tag", H).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex();
		var pe = (l3) => d(W).replace("hr", v).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*(?:\\n|$))|~~~)[^\\n]*(?:\\n|$)").replace("list", l3).replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", H).getRegex();
		var Ae = pe(/ {0,3}(?:[*+-]|1[.)])[ \t]+[^ \t\n]/);
		var Ie = pe(/ {0,3}(?:[*+-]|\d{1,9}[.)])(?:[ \t]|\n|$)/);
		var Ce = d(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph", Ie).getRegex();
		var V = { blockquote: Ce, code: Pe, def: ze, fences: Se, heading: _e, hr: v, html: Me, lheading: ue, list: Ee, newline: ye, paragraph: Ae, table: E, text: Le };
		var ie = d("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr", v).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("blockquote", " {0,3}>").replace("code", "(?: {4}| {0,3}	)[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*(?:\\n|$))|~~~)[^\\n]*(?:\\n|$)").replace("list", " {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", H).getRegex();
		var Be = { ...V, lheading: $e, table: ie, paragraph: d(W).replace("hr", v).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("table", ie).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*(?:\\n|$))|~~~)[^\\n]*(?:\\n|$)").replace("list", " {0,3}(?:[*+-]|1[.)])[ \\t]+[^ \\t\\n]").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", H).getRegex() };
		var De = { ...V, html: d(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment", J).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(), def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/, heading: /^(#{1,6})(.*)(?:\n+|$)/, fences: E, lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/, paragraph: d(W).replace("hr", v).replace("heading", ` *#{1,6} *[^
		]`).replace("lheading", ue).replace("|table", "").replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").replace("|tag", "").getRegex() };
		var qe = /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/;
		var ve = /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/;
		var ce = /^( {2,}|\\)\n(?!\s*$)[ \t]*/;
		var He = /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/;
		var _ = /[\p{P}\p{S}]/u;
		var C = /[\s\p{P}\p{S}]/u;
		var Z = /[^\s\p{P}\p{S}]/u;
		var Ze = d(/^((?![*_])punctSpace)/, "u").replace(/punctSpace/g, C).getRegex();
		var Ge = /[\p{Pi}\p{Ps}"']/u;
		var he = /(?!~)[\p{P}\p{S}]/u;
		var Qe = /(?!~)[\s\p{P}\p{S}]/u;
		var Ne = /(?:[^\s\p{P}\p{S}]|~)/u;
		var je = d(/link|precode-code|html/, "g").replace("link", /\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-", we ? "(?<!`)()" : "(^^|[^`])").replace("code", /(?<b>`+)[^`]+\k<b>(?!`)/).replace("html", /<(?! )[^<>]*?>/).getRegex();
		var de = /^(?:\*+(?:((?!\*)punct)|([^\s*]))?)|^_+(?:((?!_)punct)|([^\s_]))?/;
		var Ue = d(de, "u").replace(/punct/g, _).getRegex();
		var Fe = d(de, "u").replace(/punct/g, he).getRegex();
		var Ke = /^(?:\*+(?:((?!\*)(?!openQuote)punct)|([^\s*]))?)|^_+(?:((?!_)(?!openQuote)punct)|([^\s_]))?/;
		var We = d(Ke, "u").replace(/openQuote/g, Ge).replace(/punct/g, _).getRegex();
		var ke = "^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)";
		var Xe = d(ke, "gu").replace(/notPunctSpace/g, Z).replace(/punctSpace/g, C).replace(/punct/g, _).getRegex();
		var Je = d(ke, "gu").replace(/notPunctSpace/g, Ne).replace(/punctSpace/g, Qe).replace(/punct/g, he).getRegex();
		var Ve = "^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)[\\s](\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|(?:(?!\\*)punct|notPunctSpace)(\\*+)(?!\\*)(?=notPunctSpace)";
		var Ye = d(Ve, "gu").replace(/notPunctSpace/g, Z).replace(/punctSpace/g, C).replace(/punct/g, _).getRegex();
		var et = d("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)", "gu").replace(/notPunctSpace/g, Z).replace(/punctSpace/g, C).replace(/punct/g, _).getRegex();
		var tt = "^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)[\\s](_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)|(?:(?!_)punct|notPunctSpace)(_+)(?!_)(?=notPunctSpace)";
		var nt = d(tt, "gu").replace(/notPunctSpace/g, Z).replace(/punctSpace/g, C).replace(/punct/g, _).getRegex();
		var rt = d(/^~~?(?:((?!~)punct)|[^\s~])/, "u").replace(/punct/g, _).getRegex();
		var st = "^[^~]+(?=[^~])|(?!~)punct(~~?)(?=[\\s]|$)|notPunctSpace(~~?)(?!~)(?=punctSpace|$)|(?!~)punctSpace(~~?)(?=notPunctSpace)|[\\s](~~?)(?!~)(?=punct)|(?!~)punct(~~?)(?!~)(?=punct)|notPunctSpace(~~?)(?=notPunctSpace)";
		var it = d(st, "gu").replace(/notPunctSpace/g, Z).replace(/punctSpace/g, C).replace(/punct/g, _).getRegex();
		var ot = d(/\\(punct)/, "gu").replace(/punct/g, _).getRegex();
		var at = d(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme", /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email", /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex();
		var lt = d(J).replace("(?:-->|$)", "-->").getRegex();
		var ut = d("^comment|^</[a-zA-Z][a-zA-Z0-9-]*\\s*>|^<[a-zA-Z][a-zA-Z0-9-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment", lt).replace("attribute", /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex();
		var ge = /\[(?:\\[\s\S]|[^\[\]\\])*\]/;
		var N = d(/(?:\[(?:brackets|\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+(?!`)[^`]*?`+(?!`)|``+(?=\])|[^\[\]\\`])*?/).replace("brackets", ge).getRegex();
		var pt = d(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]+(?:\n[ \t]*)?|\n[ \t]*)(title))?\s*\)/).replace("label", N).replace("href", /<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]+|(?=\))/).replace("title", /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex();
		var ct = d(/^!?\[(label)\]\[(ref)\]/).replace("label", N).replace("ref", X).getRegex();
		var ht = d(/^!?\[(ref)\](?:\[\])?/).replace("ref", X).getRegex();
		var oe = /(?!\s*\])(?:\\[\s\S]|[^\[\]\\]){1,999}/;
		var dt = d(/(?:[^\[\]\\`]*(?:\[(?:brackets|\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+(?!`)[^`]*?`+(?!`)|``+(?=\]))){0,999}?[^\[\]\\`]*?/).replace("brackets", ge).getRegex();
		var kt = d("reflink|nolink(?!\\()", "g").replace("reflink", d(/^!?\[(label)\]\[(ref)\]/).replace("label", dt).replace("ref", oe).getRegex()).replace("nolink", d(/^!?\[(ref)\](?:\[\])?/).replace("ref", oe).getRegex()).getRegex();
		var ae = /[hH][tT][tT][pP][sS]?|[fF][tT][pP]/;
		var Y = { _backpedal: E, anyPunctuation: ot, autolink: at, blockSkip: je, br: ce, code: ve, del: E, delLDelim: E, delRDelim: E, emStrongLDelim: Ue, emStrongRDelimAst: Xe, emStrongRDelimUnd: et, escape: qe, link: pt, nolink: ht, punctuation: Ze, reflink: ct, reflinkSearch: kt, tag: ut, text: He, url: E };
		var gt = { ...Y, emStrongLDelim: We, emStrongRDelimAst: Ye, emStrongRDelimUnd: nt, link: d(/^!?\[(label)\]\((.*?)\)/).replace("label", N).getRegex(), reflink: d(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", N).getRegex() };
		var F = { ...Y, emStrongRDelimAst: Je, emStrongLDelim: Fe, delLDelim: rt, delRDelim: it, url: d(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol", ae).replace("email", /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![\w-])/).getRegex(), _backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/, del: /^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/, text: d(/^(`+|~+|[^`~])(?:(?=[`~])|(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol", ae).getRegex() };
		var ft = { ...F, br: d(ce).replace("{2,}", "*").getRegex(), text: d(F.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex() };
		var G = { normal: V, gfm: Be, pedantic: De };
		var B = { normal: Y, gfm: F, breaks: ft, pedantic: gt };
		var mt = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
		var fe = (l3) => mt[l3];
		function R(l3, e) {
		  if (e) {
		    if (m.escapeTest.test(l3)) return l3.replace(m.escapeReplace, fe);
		  } else if (m.escapeTestNoEncode.test(l3)) return l3.replace(m.escapeReplaceNoEncode, fe);
		  return l3;
		}
		function ee(l3) {
		  try {
		    l3 = encodeURI(l3).replace(m.percentDecode, "%");
		  } catch {
		    return null;
		  }
		  return l3;
		}
		function te(l3, e) {
		  let t = l3.replace(m.findPipe, (r, o, s) => {
		    let u = false, a = o;
		    for (; --a >= 0 && s[a] === "\\"; ) u = !u;
		    return u ? "|" : " |";
		  }), n = t.split(m.splitPipe), i = 0;
		  if (n[0].trim() || n.shift(), n.length > 0 && !n.at(-1)?.trim() && n.pop(), e) if (n.length > e) n.splice(e);
		  else for (; n.length < e; ) n.push("");
		  for (; i < n.length; i++) n[i] = n[i].trim().replace(m.slashPipe, "|");
		  return n;
		}
		function $(l3, e, t) {
		  let n = l3.length;
		  if (n === 0) return "";
		  let i = 0;
		  for (; i < n; ) {
		    let r = l3.charAt(n - i - 1);
		    if (r === e && !t) i++;
		    else if (r !== e && t) i++;
		    else break;
		  }
		  return l3.slice(0, n - i);
		}
		function ne(l3) {
		  let e = l3.split(`
		`), t = e.length - 1;
		  for (; t >= 0 && m.blankLine.test(e[t]); ) t--;
		  return e.length - t <= 2 ? l3 : e.slice(0, t + 1).join(`
		`);
		}
		function D(l3) {
		  return l3.toLowerCase().toUpperCase().toLowerCase();
		}
		function me(l3, e) {
		  if (l3.indexOf(e[1]) === -1) return -1;
		  let t = 0;
		  for (let n = 0; n < l3.length; n++) if (l3[n] === "\\") n++;
		  else if (l3[n] === e[0]) t++;
		  else if (l3[n] === e[1] && (t--, t < 0)) return n;
		  return t > 0 ? -2 : -1;
		}
		function xe(l3, e = 0) {
		  let t = e, n = "";
		  for (let i of l3) if (i === "	") {
		    let r = 4 - t % 4;
		    n += " ".repeat(r), t += r;
		  } else n += i, t++;
		  return n;
		}
		function be(l3, e, t, n, i) {
		  let r = e.href, o = e.title || null, s = l3[1].replace(i.other.outputLinkReplace, "$1"), u = l3[0].charAt(0) === "!";
		  n.state.inLink = true;
		  let a = n.state.linkEmitted, p = n.state.inRawBlock;
		  n.state.linkEmitted = false;
		  let c = n.inlineTokens(s), h = n.state.linkEmitted;
		  if (n.state.linkEmitted = a, n.state.inLink = false, !u) {
		    if (h) {
		      n.state.inRawBlock = p;
		      return;
		    }
		    n.state.linkEmitted = true;
		  }
		  return { type: u ? "image" : "link", raw: t, href: r, title: o, text: s, tokens: c };
		}
		function xt(l3, e, t) {
		  let n = l3.match(t.other.indentCodeCompensation);
		  if (n === null) return e;
		  let i = n[1];
		  return e.split(`
		`).map((r) => {
		    let o = r.match(t.other.beginningSpace);
		    if (o === null) return r;
		    let [s] = o;
		    return r.slice(Math.min(s.length, i.length));
		  }).join(`
		`);
		}
		function Re(l3, e, t, n) {
		  if (!e.includes("<")) return false;
		  for (let i = 0; i < e.length; i++) {
		    if (e[i] === "\\") {
		      i++;
		      continue;
		    }
		    if (e[i] === "`") {
		      let s = n.inline.code.exec(e.slice(i));
		      if (s) {
		        i += s[0].length - 1;
		        continue;
		      }
		    }
		    if (e[i] !== "<") continue;
		    let r = l3.slice(t + i), o = n.inline.tag.exec(r) || n.inline.autolink.exec(r);
		    if (o) {
		      if (o[0].length > e.length - i) return true;
		      i += o[0].length - 1;
		    }
		  }
		  return false;
		}
		var y = class {
		  constructor(e) {
		    __publicField(this, "options");
		    __publicField(this, "rules");
		    __publicField(this, "lexer");
		    this.options = e || T;
		  }
		  space(e) {
		    let t = this.rules.block.newline.exec(e);
		    if (t && t[0].length > 0) return { type: "space", raw: t[0] };
		  }
		  code(e) {
		    let t = this.rules.block.code.exec(e);
		    if (t) {
		      let n = this.options.pedantic ? t[0] : ne(t[0]), i = n.replace(this.rules.other.codeRemoveIndent, "");
		      return { type: "code", raw: n, codeBlockStyle: "indented", text: i };
		    }
		  }
		  fences(e) {
		    let t = this.rules.block.fences.exec(e);
		    if (t) {
		      let n = t[0], i = xt(n, t[3] || "", this.rules);
		      return { type: "code", raw: n, lang: t[2] ? t[2].trim().replace(this.rules.inline.anyPunctuation, "$1") : t[2], text: i };
		    }
		  }
		  heading(e) {
		    let t = this.rules.block.heading.exec(e);
		    if (t) {
		      let n = t[2].trim();
		      if (this.rules.other.endingHash.test(n)) {
		        let i = $(n, "#");
		        (this.options.pedantic || !i || this.rules.other.endingSpaceTabChar.test(i)) && (n = i.trim());
		      }
		      return { type: "heading", raw: $(t[0], `
		`), depth: t[1].length, text: n, tokens: this.lexer.inline(n) };
		    }
		  }
		  hr(e) {
		    let t = this.rules.block.hr.exec(e);
		    if (t) return { type: "hr", raw: $(t[0], `
		`) };
		  }
		  blockquote(e) {
		    let t = this.rules.block.blockquote.exec(e);
		    if (t) {
		      let n = $(t[0], `
		`).split(`
		`), i = "", r = "", o = [];
		      for (; n.length > 0; ) {
		        let s = false, u = [], a;
		        for (a = 0; a < n.length; a++) if (this.rules.other.blockquoteStart.test(n[a])) u.push(n[a]), s = true;
		        else if (!s) u.push(n[a]);
		        else break;
		        n = n.slice(a);
		        let p = u.join(`
		`), c = p.replace(this.rules.other.blockquoteSetextReplace, `
		    $1`).replace(this.rules.other.blockquoteSetextReplace2, "");
		        i = i ? `${i}
		${p}` : p, r = r ? `${r}
		${c}` : c;
		        let h = this.lexer.state.top;
		        if (this.lexer.state.top = true, this.lexer.blockTokens(c, o, true), this.lexer.state.top = h, n.length === 0) break;
		        let k = o.at(-1);
		        if (k?.type === "code") break;
		        if (k?.type === "blockquote") {
		          let O = k, g = n.join(`
		`), w = O.raw + `
		` + g.replace(this.rules.other.blockquoteSetextReplace2, ""), z = this.blockquote(w);
		          o[o.length - 1] = z, i = `${i}
		${g}`, r = r.substring(0, r.length - O.text.length) + z.text;
		          break;
		        } else if (k?.type === "list") {
		          let O = k, g = O.raw + `
		` + n.join(`
		`), w = this.list(g);
		          o[o.length - 1] = w, i = i.substring(0, i.length - k.raw.length) + w.raw, r = r.substring(0, r.length - O.raw.length) + w.raw, n = g.substring(o.at(-1).raw.length).split(`
		`);
		          continue;
		        }
		      }
		      return { type: "blockquote", raw: i, tokens: o, text: r };
		    }
		  }
		  list(e) {
		    let t = this.rules.block.list.exec(e);
		    if (t) {
		      let n = t[1].trim(), i = n.length > 1, r = { type: "list", raw: "", ordered: i, start: i ? +n.slice(0, -1) : "", loose: false, items: [] };
		      n = i ? `\\d{1,9}\\${n.slice(-1)}` : `\\${n}`, this.options.pedantic && (n = i ? n : "[*+-]");
		      let o = this.rules.other.listItemRegex(n), s = false;
		      for (; e; ) {
		        let a = false, p = "", c = "";
		        if (!(t = o.exec(e)) || this.rules.block.hr.test(e)) break;
		        p = t[0], e = e.substring(p.length);
		        let h = xe(t[2].split(`
		`, 1)[0], t[1].length), k = e.split(`
		`, 1)[0], O = !h.trim(), g = 0;
		        if (this.options.pedantic ? (g = 2, c = h.trimStart()) : O ? g = t[1].length + 1 : (g = h.search(this.rules.other.nonSpaceChar), g = g > 4 ? 1 : g, c = h.slice(g), g += t[1].length), O && this.rules.other.blankLine.test(k) && (p += k + `
		`, e = e.substring(k.length + 1), a = true), !a) {
		          let w = this.rules.other.nextBulletRegex(g), z = this.rules.other.hrRegex(g), re = this.rules.other.fencesBeginRegex(g), se = this.rules.other.headingBeginRegex(g), Te = this.rules.other.htmlBeginRegex(g), Oe = this.rules.other.blockquoteBeginRegex(g);
		          for (; e; ) {
		            let j = e.split(`
		`, 1)[0], q;
		            if (k = j, this.options.pedantic ? (k = k.replace(this.rules.other.listReplaceNesting, "  "), q = k) : q = k.replace(this.rules.other.tabCharGlobal, "    "), re.test(k) || se.test(k) || Te.test(k) || Oe.test(k) || w.test(k) || z.test(k)) break;
		            if (q.search(this.rules.other.nonSpaceChar) >= g || !k.trim()) c += `
		` + q.slice(g);
		            else {
		              if (O || h.replace(this.rules.other.tabCharGlobal, "    ").search(this.rules.other.nonSpaceChar) >= 4 || re.test(h) || se.test(h) || z.test(h)) break;
		              c += `
		` + k;
		            }
		            O = !k.trim(), p += j + `
		`, e = e.substring(j.length + 1), h = q.slice(g);
		          }
		        }
		        r.loose || (s ? r.loose = true : this.rules.other.doubleBlankLine.test(p) && (s = true)), r.items.push({ type: "list_item", raw: p, task: !!this.options.gfm && this.rules.other.listIsTask.test(c), loose: false, text: c, tokens: [] }), r.raw += p;
		      }
		      let u = r.items.at(-1);
		      if (u) u.raw = u.raw.trimEnd(), u.text = u.text.trimEnd();
		      else return;
		      r.raw = r.raw.trimEnd();
		      for (let a of r.items) if (this.lexer.state.top = false, a.tokens = this.lexer.blockTokens(a.text, []), !r.loose) {
		        let p = a.tokens.filter((h) => h.type === "space"), c = p.length > 0 && p.some((h) => this.rules.other.anyLine.test(h.raw));
		        r.loose = c;
		      }
		      for (let a of r.items) {
		        let p = a.tokens[0];
		        if (a.task && (p?.type === "text" || p?.type === "paragraph")) {
		          a.text = a.text.replace(this.rules.other.listReplaceTask, ""), p.raw = p.raw.replace(this.rules.other.listReplaceTask, ""), p.text = p.text.replace(this.rules.other.listReplaceTask, "");
		          for (let h = this.lexer.inlineQueue.length - 1; h >= 0; h--) if (this.rules.other.listIsTask.test(this.lexer.inlineQueue[h].src)) {
		            this.lexer.inlineQueue[h].src = this.lexer.inlineQueue[h].src.replace(this.rules.other.listReplaceTask, "");
		            break;
		          }
		          let c = this.rules.other.listTaskCheckbox.exec(a.raw);
		          if (c) {
		            let h = { type: "checkbox", raw: c[0] + " ", checked: c[0] !== "[ ]" };
		            a.checked = h.checked, r.loose ? a.tokens[0] && ["paragraph", "text"].includes(a.tokens[0].type) && "tokens" in a.tokens[0] && a.tokens[0].tokens ? (a.tokens[0].raw = h.raw + a.tokens[0].raw, a.tokens[0].text = h.raw + a.tokens[0].text, a.tokens[0].tokens.unshift(h)) : a.tokens.unshift({ type: "paragraph", raw: h.raw, text: h.raw, tokens: [h] }) : a.tokens.unshift(h);
		          }
		        } else a.task && (a.task = false);
		      }
		      if (r.loose) for (let a of r.items) {
		        a.loose = true;
		        for (let p of a.tokens) p.type === "text" && (p.type = "paragraph");
		      }
		      return r;
		    }
		  }
		  html(e) {
		    let t = this.rules.block.html.exec(e);
		    if (t) {
		      let n = ne(t[0]);
		      return { type: "html", block: true, raw: n, pre: t[1] === "pre" || t[1] === "script" || t[1] === "style", text: n };
		    }
		  }
		  def(e) {
		    let t = this.rules.block.def.exec(e);
		    if (t) {
		      let n = D(t[1]).replace(this.rules.other.multipleSpaceGlobal, " "), i = t[2] ? t[2].replace(this.rules.other.hrefBrackets, "$1").replace(this.rules.inline.anyPunctuation, "$1") : "", r = t[3] ? t[3].substring(1, t[3].length - 1).replace(this.rules.inline.anyPunctuation, "$1") : t[3];
		      return { type: "def", tag: n, raw: $(t[0], `
		`), href: i, title: r };
		    }
		  }
		  table(e) {
		    let t = this.rules.block.table.exec(e);
		    if (!t || !this.rules.other.tableDelimiter.test(t[2])) return;
		    let n = te(t[1]), i = t[2].replace(this.rules.other.tableAlignChars, "").split("|"), r = t[3]?.trim() ? t[3].replace(this.rules.other.tableRowBlankLine, "").split(`
		`) : [], o = { type: "table", raw: $(t[0], `
		`), header: [], align: [], rows: [] };
		    if (n.length === i.length) {
		      for (let s of i) this.rules.other.tableAlignRight.test(s) ? o.align.push("right") : this.rules.other.tableAlignCenter.test(s) ? o.align.push("center") : this.rules.other.tableAlignLeft.test(s) ? o.align.push("left") : o.align.push(null);
		      for (let s = 0; s < n.length; s++) o.header.push({ text: n[s], tokens: this.lexer.inline(n[s]), header: true, align: o.align[s] });
		      for (let s of r) o.rows.push(te(s, o.header.length).map((u, a) => ({ text: u, tokens: this.lexer.inline(u), header: false, align: o.align[a] })));
		      return o;
		    }
		  }
		  lheading(e) {
		    let t = this.rules.block.lheading.exec(e);
		    if (t) {
		      let n = t[1].trim();
		      return { type: "heading", raw: $(t[0], `
		`), depth: t[2].charAt(0) === "=" ? 1 : 2, text: n, tokens: this.lexer.inline(n) };
		    }
		  }
		  paragraph(e) {
		    let t = this.rules.block.paragraph.exec(e);
		    if (t) {
		      let n = t[1].charAt(t[1].length - 1) === `
		` ? t[1].slice(0, -1) : t[1];
		      return { type: "paragraph", raw: t[0], text: n, tokens: this.lexer.inline(n) };
		    }
		  }
		  text(e) {
		    let t = this.rules.block.text.exec(e);
		    if (t) return { type: "text", raw: t[0], text: t[0], tokens: this.lexer.inline(t[0]) };
		  }
		  escape(e) {
		    let t = this.rules.inline.escape.exec(e);
		    if (t) return { type: "escape", raw: t[0], text: t[1] };
		  }
		  tag(e) {
		    let t = this.rules.inline.tag.exec(e);
		    if (t) return !this.lexer.state.inLink && this.rules.other.startATag.test(t[0]) ? this.lexer.state.inLink = true : this.lexer.state.inLink && this.rules.other.endATag.test(t[0]) && (this.lexer.state.inLink = false), !this.lexer.state.inRawBlock && this.rules.other.startPreScriptTag.test(t[0]) ? this.lexer.state.inRawBlock = true : this.lexer.state.inRawBlock && this.rules.other.endPreScriptTag.test(t[0]) && (this.lexer.state.inRawBlock = false), { type: "html", raw: t[0], inLink: this.lexer.state.inLink, inRawBlock: this.lexer.state.inRawBlock, block: false, text: t[0] };
		  }
		  link(e) {
		    let t = this.rules.inline.link.exec(e);
		    if (t) {
		      let n = t[0].charAt(0) === "!" ? 2 : 1;
		      if (!this.options.pedantic && Re(e, t[1], n, this.rules)) return;
		      let i = t[2].trim();
		      if (!this.options.pedantic && this.rules.other.startAngleBracket.test(i)) {
		        if (!this.rules.other.endAngleBracket.test(i)) return;
		        let s = $(i.slice(0, -1), "\\");
		        if ((i.length - s.length) % 2 === 0) return;
		      } else {
		        let s = me(t[2], "()");
		        if (s === -2) return;
		        if (s > -1) {
		          let a = (t[0].indexOf("!") === 0 ? 5 : 4) + t[1].length + s;
		          t[2] = t[2].substring(0, s), t[0] = t[0].substring(0, a).trim(), t[3] = "";
		        }
		      }
		      let r = t[2], o = "";
		      if (this.options.pedantic) {
		        let s = this.rules.other.pedanticHrefTitle.exec(r);
		        s && (r = s[1], o = s[3]);
		      } else o = t[3] ? t[3].slice(1, -1) : "";
		      return r = r.trim(), this.rules.other.startAngleBracket.test(r) && (this.options.pedantic && !this.rules.other.endAngleBracket.test(i) ? r = r.slice(1) : r = r.slice(1, -1)), be(t, { href: r && r.replace(this.rules.inline.anyPunctuation, "$1"), title: o && o.replace(this.rules.inline.anyPunctuation, "$1") }, t[0], this.lexer, this.rules);
		    }
		  }
		  reflink(e, t) {
		    let n;
		    if ((n = this.rules.inline.reflink.exec(e)) || (n = this.rules.inline.nolink.exec(e))) {
		      let i = n[0].charAt(0) === "!" ? 2 : 1;
		      if (!this.options.pedantic && Re(e, n[1], i, this.rules)) return;
		      let r = (n[2] || n[1]).replace(this.rules.other.multipleSpaceGlobal, " "), o = t[D(r)];
		      if (!o) {
		        let s = n[0].charAt(0);
		        return { type: "text", raw: s, text: s };
		      }
		      return be(n, o, n[0], this.lexer, this.rules);
		    }
		  }
		  emStrong(e, t, n = "") {
		    let i = this.rules.inline.emStrongLDelim.exec(e);
		    if (!i || !i[1] && !i[2] && !i[3] && !i[4] || i[4] && n.match(this.rules.other.unicodeAlphaNumeric)) return;
		    if (!(i[1] || i[3] || "") || !n || this.rules.inline.punctuation.exec(n)) {
		      let o = [...i[0]].length - 1, s, u, a = o, p = 0, c = i[0][0], h = n === c, k = c === "*" ? this.rules.inline.emStrongRDelimAst : this.rules.inline.emStrongRDelimUnd;
		      for (k.lastIndex = 0, t = t.slice(-1 * e.length + o); (i = k.exec(t)) !== null; ) {
		        if (s = i[1] || i[2] || i[3] || i[4] || i[5] || i[6], !s) continue;
		        if (u = [...s].length, i[3] || i[4]) {
		          a += u;
		          continue;
		        } else if (i[5] || i[6]) {
		          if (o % 3 && !((o + u) % 3)) {
		            p += u;
		            continue;
		          }
		          if (h) break;
		        }
		        if (a -= u, a > 0) continue;
		        u = Math.min(u, u + a + p);
		        let O = [...i[0]][0].length, g = e.slice(0, o + i.index + O + u);
		        if (Math.min(o, u) % 2) {
		          let z = g.slice(1, -1);
		          return { type: "em", raw: g, text: z, tokens: this.lexer.inlineTokens(z) };
		        }
		        let w = g.slice(2, -2);
		        return { type: "strong", raw: g, text: w, tokens: this.lexer.inlineTokens(w) };
		      }
		    }
		  }
		  codespan(e) {
		    let t = this.rules.inline.code.exec(e);
		    if (t) {
		      let n = t[2].replace(this.rules.other.newLineCharGlobal, " "), i = this.rules.other.nonSpaceChar.test(n), r = this.rules.other.startingSpaceChar.test(n) && this.rules.other.endingSpaceChar.test(n);
		      return i && r && (n = n.substring(1, n.length - 1)), { type: "codespan", raw: t[0], text: n };
		    }
		  }
		  br(e) {
		    let t = this.rules.inline.br.exec(e);
		    if (t) return { type: "br", raw: t[0] };
		  }
		  del(e, t, n = "") {
		    let i = this.rules.inline.delLDelim.exec(e);
		    if (!i) return;
		    if (!(i[1] || "") || !n || this.rules.inline.punctuation.exec(n)) {
		      let o = [...i[0]].length - 1, s, u, a = o, p = this.rules.inline.delRDelim;
		      for (p.lastIndex = 0, t = t.slice(-1 * e.length + o); (i = p.exec(t)) !== null; ) {
		        if (s = i[1] || i[2] || i[3] || i[4] || i[5] || i[6], !s || (u = [...s].length, u !== o)) continue;
		        if (i[3] || i[4]) {
		          a += u;
		          continue;
		        }
		        if (a -= u, a > 0) continue;
		        u = Math.min(u, u + a);
		        let c = [...i[0]][0].length, h = e.slice(0, o + i.index + c + u), k = h.slice(o, -o);
		        return { type: "del", raw: h, text: k, tokens: this.lexer.inlineTokens(k) };
		      }
		    }
		  }
		  autolink(e) {
		    let t = this.rules.inline.autolink.exec(e);
		    if (t) {
		      let n, i;
		      return t[2] === "@" ? (n = t[1], i = "mailto:" + n) : (n = t[1], i = n), { type: "link", raw: t[0], text: n, href: i, autolink: true, tokens: [{ type: "text", raw: n, text: n }] };
		    }
		  }
		  url(e) {
		    let t;
		    if (t = this.rules.inline.url.exec(e)) {
		      let n, i;
		      if (t[2] === "@") n = t[0], i = "mailto:" + n;
		      else {
		        let r;
		        do
		          r = t[0], t[0] = this.rules.inline._backpedal.exec(t[0])?.[0] ?? "";
		        while (r !== t[0]);
		        n = t[0], t[1] === "www." ? i = "http://" + t[0] : i = t[0];
		      }
		      return { type: "link", raw: t[0], text: n, href: i, autolink: true, tokens: [{ type: "text", raw: n, text: n }] };
		    }
		  }
		  inlineText(e) {
		    let t = this.rules.inline.text.exec(e);
		    if (t) {
		      let n = this.lexer.state.inRawBlock;
		      return { type: "text", raw: t[0], text: t[0], escaped: n };
		    }
		  }
		};
		var x = class l {
		  constructor(e) {
		    __publicField(this, "tokens");
		    __publicField(this, "options");
		    __publicField(this, "state");
		    __publicField(this, "inlineQueue");
		    __publicField(this, "tokenizer");
		    this.tokens = [], this.tokens.links = /* @__PURE__ */ Object.create(null), this.options = e || T, this.options.tokenizer = this.options.tokenizer || new y(), this.tokenizer = this.options.tokenizer, this.tokenizer.options = this.options, this.tokenizer.lexer = this, this.inlineQueue = [], this.state = { inLink: false, inRawBlock: false, linkEmitted: false, top: true };
		    let t = { other: m, block: G.normal, inline: B.normal };
		    this.options.pedantic ? (t.block = G.pedantic, t.inline = B.pedantic) : this.options.gfm && (t.block = G.gfm, this.options.breaks ? t.inline = B.breaks : t.inline = B.gfm), this.tokenizer.rules = t;
		  }
		  static get rules() {
		    return { block: G, inline: B };
		  }
		  static lex(e, t) {
		    return new l(t).lex(e);
		  }
		  static lexInline(e, t) {
		    return new l(t).inlineTokens(e);
		  }
		  lex(e) {
		    e = e.replace(m.carriageReturn, `
		`), this.blockTokens(e, this.tokens);
		    for (let t = 0; t < this.inlineQueue.length; t++) {
		      let n = this.inlineQueue[t];
		      this.inlineTokens(n.src, n.tokens);
		    }
		    return this.inlineQueue = [], this.tokens;
		  }
		  blockTokens(e, t = [], n = false) {
		    this.tokenizer.lexer = this, this.options.pedantic && (e = e.replace(m.tabCharGlobal, "    ").replace(m.spaceLine, ""));
		    let i = 1 / 0;
		    for (; e; ) {
		      if (e.length < i) i = e.length;
		      else {
		        this.infiniteLoopError(e.charCodeAt(0));
		        break;
		      }
		      let r;
		      if (this.options.extensions?.block?.some((s) => (r = s.call({ lexer: this }, e, t)) ? (e = e.substring(r.raw.length), t.push(r), true) : false)) continue;
		      if (r = this.tokenizer.space(e)) {
		        e = e.substring(r.raw.length);
		        let s = t.at(-1);
		        r.raw.length === 1 && s !== void 0 ? s.raw += `
		` : t.push(r);
		        continue;
		      }
		      if (r = this.tokenizer.code(e)) {
		        e = e.substring(r.raw.length);
		        let s = t.at(-1);
		        s?.type === "paragraph" || s?.type === "text" ? (s.raw += (s.raw.endsWith(`
		`) ? "" : `
		`) + r.raw, s.text += `
		` + r.text, this.inlineQueue.at(-1).src = s.text) : t.push(r);
		        continue;
		      }
		      if (r = this.tokenizer.fences(e)) {
		        e = e.substring(r.raw.length), t.push(r);
		        continue;
		      }
		      if (r = this.tokenizer.heading(e)) {
		        e = e.substring(r.raw.length), t.push(r);
		        continue;
		      }
		      if (r = this.tokenizer.hr(e)) {
		        e = e.substring(r.raw.length), t.push(r);
		        continue;
		      }
		      if (r = this.tokenizer.blockquote(e)) {
		        e = e.substring(r.raw.length), t.push(r);
		        continue;
		      }
		      if (r = this.tokenizer.list(e)) {
		        e = e.substring(r.raw.length), t.push(r);
		        continue;
		      }
		      if (r = this.tokenizer.html(e)) {
		        e = e.substring(r.raw.length), t.push(r);
		        continue;
		      }
		      if (r = this.tokenizer.def(e)) {
		        e = e.substring(r.raw.length);
		        let s = t.at(-1);
		        s?.type === "paragraph" || s?.type === "text" ? (s.raw += (s.raw.endsWith(`
		`) ? "" : `
		`) + r.raw, s.text += `
		` + r.raw, this.inlineQueue.at(-1).src = s.text) : this.tokens.links[r.tag] || (this.tokens.links[r.tag] = { href: r.href, title: r.title }, t.push(r));
		        continue;
		      }
		      if (r = this.tokenizer.table(e)) {
		        e = e.substring(r.raw.length), t.push(r);
		        continue;
		      }
		      if (r = this.tokenizer.lheading(e)) {
		        e = e.substring(r.raw.length), t.push(r);
		        continue;
		      }
		      let o = e;
		      if (this.options.extensions?.startBlock) {
		        let s = 1 / 0, u = e.slice(1), a;
		        this.options.extensions.startBlock.forEach((p) => {
		          a = p.call({ lexer: this }, u), typeof a == "number" && a >= 0 && (s = Math.min(s, a));
		        }), s < 1 / 0 && s >= 0 && (o = e.substring(0, s + 1));
		      }
		      if (this.state.top && (r = this.tokenizer.paragraph(o))) {
		        let s = t.at(-1);
		        n && s?.type === "paragraph" ? (s.raw += (s.raw.endsWith(`
		`) ? "" : `
		`) + r.raw, s.text += `
		` + r.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = s.text) : t.push(r), n = o.length !== e.length, e = e.substring(r.raw.length);
		        continue;
		      }
		      if (r = this.tokenizer.text(e)) {
		        e = e.substring(r.raw.length);
		        let s = t.at(-1);
		        s?.type === "text" ? (s.raw += (s.raw.endsWith(`
		`) ? "" : `
		`) + r.raw, s.text += `
		` + r.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = s.text) : t.push(r);
		        continue;
		      }
		      if (e) {
		        this.infiniteLoopError(e.charCodeAt(0));
		        break;
		      }
		    }
		    return this.state.top = true, t;
		  }
		  inline(e, t = []) {
		    return this.inlineQueue.push({ src: e, tokens: t }), t;
		  }
		  linkInText(e) {
		    if (!e.includes("[")) return false;
		    let t = this.tokenizer.rules.inline.link;
		    for (let n of e.matchAll(this.tokenizer.rules.inline.blockSkip)) if (t.test(n[0]) && e.charAt(n.index - 1) !== "!") return true;
		    for (let n of e.matchAll(this.tokenizer.rules.inline.reflinkSearch)) {
		      let i = n[0], r = i.lastIndexOf("[");
		      if (!(i.charAt(0) === "!" || !Object.hasOwn(this.tokens.links, D(i.slice(r + 1, -1)))) && !(r > 1 && this.linkInText(i.slice(1, r - 1)))) return true;
		    }
		    return false;
		  }
		  inlineTokens(e, t = []) {
		    this.tokenizer.lexer = this;
		    let n = e;
		    if (this.tokens.links && e.includes("[")) {
		      let s = this.tokenizer.rules.inline.reflinkSearch, u = (a) => {
		        let p = a.lastIndexOf("[");
		        if (!Object.hasOwn(this.tokens.links, D(a.slice(p + 1, -1)))) return a;
		        if (p > 1 && a.charAt(0) !== "!") {
		          let c = a.slice(1, p - 1);
		          if (this.linkInText(c)) return "[" + c.replace(s, u) + "][" + "a".repeat(a.length - p - 2) + "]";
		        }
		        return "[" + "a".repeat(a.length - 2) + "]";
		      };
		      n = n.replace(s, u);
		    }
		    n = n.replace(this.tokenizer.rules.inline.anyPunctuation, (s) => "+".repeat(s.length)), n = n.replace(this.tokenizer.rules.inline.blockSkip, (s, u, a) => {
		      let p = a ? a.length : 0;
		      return s.slice(0, p) + "[" + "a".repeat(s.length - p - 2) + "]";
		    }), n = this.options.hooks?.emStrongMask?.call({ lexer: this }, n) ?? n;
		    let i = false, r = "", o = 1 / 0;
		    for (; e; ) {
		      if (e.length < o) o = e.length;
		      else {
		        this.infiniteLoopError(e.charCodeAt(0));
		        break;
		      }
		      i || (r = ""), i = false;
		      let s;
		      if (this.options.extensions?.inline?.some((a) => (s = a.call({ lexer: this }, e, t)) ? (e = e.substring(s.raw.length), t.push(s), true) : false)) continue;
		      if (s = this.tokenizer.escape(e)) {
		        e = e.substring(s.raw.length), t.push(s);
		        continue;
		      }
		      if (s = this.tokenizer.tag(e)) {
		        e = e.substring(s.raw.length), t.push(s);
		        continue;
		      }
		      if (s = this.tokenizer.link(e)) {
		        e = e.substring(s.raw.length), t.push(s);
		        continue;
		      }
		      if (s = this.tokenizer.reflink(e, this.tokens.links)) {
		        e = e.substring(s.raw.length);
		        let a = t.at(-1);
		        s.type === "text" && a?.type === "text" ? (a.raw += s.raw, a.text += s.text) : t.push(s);
		        continue;
		      }
		      if (s = this.tokenizer.emStrong(e, n, r)) {
		        e = e.substring(s.raw.length), t.push(s);
		        continue;
		      }
		      if (s = this.tokenizer.codespan(e)) {
		        e = e.substring(s.raw.length), t.push(s);
		        continue;
		      }
		      if (s = this.tokenizer.br(e)) {
		        e = e.substring(s.raw.length), t.push(s);
		        continue;
		      }
		      if (s = this.tokenizer.del(e, n, r)) {
		        e = e.substring(s.raw.length), t.push(s);
		        continue;
		      }
		      if (s = this.tokenizer.autolink(e)) {
		        e = e.substring(s.raw.length), t.push(s);
		        continue;
		      }
		      if (!this.state.inLink && (s = this.tokenizer.url(e))) {
		        e = e.substring(s.raw.length), t.push(s);
		        continue;
		      }
		      let u = e;
		      if (this.options.extensions?.startInline) {
		        let a = 1 / 0, p = e.slice(1), c;
		        this.options.extensions.startInline.forEach((h) => {
		          c = h.call({ lexer: this }, p), typeof c == "number" && c >= 0 && (a = Math.min(a, c));
		        }), a < 1 / 0 && a >= 0 && (u = e.substring(0, a + 1));
		      }
		      if (s = this.tokenizer.inlineText(u)) {
		        e = e.substring(s.raw.length), s.raw.slice(-1) !== "_" && (r = s.raw.slice(-1)), i = true;
		        let a = t.at(-1);
		        a?.type === "text" ? (a.raw += s.raw, a.text += s.text) : t.push(s);
		        continue;
		      }
		      if (e) {
		        this.infiniteLoopError(e.charCodeAt(0));
		        break;
		      }
		    }
		    return t;
		  }
		  infiniteLoopError(e) {
		    let t = "Infinite loop on byte: " + e;
		    if (this.options.silent) console.error(t);
		    else throw new Error(t);
		  }
		};
		var P = class {
		  constructor(e) {
		    __publicField(this, "options");
		    __publicField(this, "parser");
		    this.options = e || T;
		  }
		  space(e) {
		    return "";
		  }
		  code({ text: e, lang: t, escaped: n }) {
		    let i = (t || "").match(m.notSpaceStart)?.[0], r = e ? e.replace(m.endingNewline, "") + `
		` : "";
		    return i ? '<pre><code class="language-' + R(i) + '">' + (n ? r : R(r, true)) + `</code></pre>
		` : "<pre><code>" + (n ? r : R(r, true)) + `</code></pre>
		`;
		  }
		  blockquote({ tokens: e }) {
		    return `<blockquote>
		${this.parser.parse(e)}</blockquote>
		`;
		  }
		  html({ text: e }) {
		    return e;
		  }
		  def(e) {
		    return "";
		  }
		  heading({ tokens: e, depth: t }) {
		    return `<h${t}>${this.parser.parseInline(e)}</h${t}>
		`;
		  }
		  hr(e) {
		    return `<hr>
		`;
		  }
		  list(e) {
		    let t = e.ordered, n = e.start, i = "";
		    for (let s = 0; s < e.items.length; s++) {
		      let u = e.items[s];
		      i += this.listitem(u);
		    }
		    let r = t ? "ol" : "ul", o = t && n !== 1 ? ' start="' + n + '"' : "";
		    return "<" + r + o + `>
		` + i + "</" + r + `>
		`;
		  }
		  listitem(e) {
		    return `<li>${this.parser.parse(e.tokens)}</li>
		`;
		  }
		  checkbox({ checked: e }) {
		    return "<input " + (e ? 'checked="" ' : "") + 'disabled="" type="checkbox"> ';
		  }
		  paragraph({ tokens: e }) {
		    return `<p>${this.parser.parseInline(e)}</p>
		`;
		  }
		  table(e) {
		    let t = "", n = "";
		    for (let r = 0; r < e.header.length; r++) n += this.tablecell(e.header[r]);
		    t += this.tablerow({ text: n });
		    let i = "";
		    for (let r = 0; r < e.rows.length; r++) {
		      let o = e.rows[r];
		      n = "";
		      for (let s = 0; s < o.length; s++) n += this.tablecell(o[s]);
		      i += this.tablerow({ text: n });
		    }
		    return i && (i = `<tbody>${i}</tbody>`), `<table>
		<thead>
		` + t + `</thead>
		` + i + `</table>
		`;
		  }
		  tablerow({ text: e }) {
		    return `<tr>
		${e}</tr>
		`;
		  }
		  tablecell(e) {
		    let t = this.parser.parseInline(e.tokens), n = e.header ? "th" : "td";
		    return (e.align ? `<${n} align="${e.align}">` : `<${n}>`) + t + `</${n}>
		`;
		  }
		  strong({ tokens: e }) {
		    return `<strong>${this.parser.parseInline(e)}</strong>`;
		  }
		  em({ tokens: e }) {
		    return `<em>${this.parser.parseInline(e)}</em>`;
		  }
		  codespan({ text: e }) {
		    return `<code>${R(e, true)}</code>`;
		  }
		  br(e) {
		    return "<br>";
		  }
		  del({ tokens: e }) {
		    return `<del>${this.parser.parseInline(e)}</del>`;
		  }
		  link({ href: e, title: t, text: n, tokens: i, autolink: r }) {
		    let o = r ? R(n, true) : this.parser.parseInline(i), s = ee(e);
		    if (s === null) return o;
		    e = R(s, r);
		    let u = '<a href="' + e + '"';
		    return t && (u += ' title="' + R(t) + '"'), u += ">" + o + "</a>", u;
		  }
		  image({ href: e, title: t, text: n, tokens: i }) {
		    i && (n = this.parser.parseInline(i, this.parser.textRenderer));
		    let r = ee(e);
		    if (r === null) return R(n);
		    e = r;
		    let o = `<img src="${R(e)}" alt="${R(n)}"`;
		    return t && (o += ` title="${R(t)}"`), o += ">", o;
		  }
		  text(e) {
		    return "tokens" in e && e.tokens ? this.parser.parseInline(e.tokens) : "escaped" in e && e.escaped ? e.text : R(e.text);
		  }
		};
		var L = class {
		  strong({ text: e }) {
		    return e;
		  }
		  em({ text: e }) {
		    return e;
		  }
		  codespan({ text: e }) {
		    return e;
		  }
		  del({ text: e }) {
		    return e;
		  }
		  html({ text: e }) {
		    return e;
		  }
		  text({ text: e }) {
		    return e;
		  }
		  link({ text: e }) {
		    return "" + e;
		  }
		  image({ text: e }) {
		    return "" + e;
		  }
		  br() {
		    return "";
		  }
		  checkbox({ raw: e }) {
		    return e;
		  }
		};
		var b = class l2 {
		  constructor(e) {
		    __publicField(this, "options");
		    __publicField(this, "renderer");
		    __publicField(this, "textRenderer");
		    this.options = e || T, this.options.renderer = this.options.renderer || new P(), this.renderer = this.options.renderer, this.renderer.options = this.options, this.renderer.parser = this, this.textRenderer = new L();
		  }
		  static parse(e, t) {
		    return new l2(t).parse(e);
		  }
		  static parseInline(e, t) {
		    return new l2(t).parseInline(e);
		  }
		  parse(e) {
		    this.renderer.parser = this;
		    let t = "";
		    for (let n = 0; n < e.length; n++) {
		      let i = e[n];
		      if (this.options.extensions?.renderers?.[i.type]) {
		        let o = i, s = this.options.extensions.renderers[o.type].call({ parser: this }, o);
		        if (s !== false || !["space", "hr", "heading", "code", "table", "blockquote", "list", "checkbox", "html", "def", "paragraph", "text"].includes(o.type)) {
		          t += s || "";
		          continue;
		        }
		      }
		      let r = i;
		      switch (r.type) {
		        case "space": {
		          t += this.renderer.space(r);
		          break;
		        }
		        case "hr": {
		          t += this.renderer.hr(r);
		          break;
		        }
		        case "heading": {
		          t += this.renderer.heading(r);
		          break;
		        }
		        case "code": {
		          t += this.renderer.code(r);
		          break;
		        }
		        case "table": {
		          t += this.renderer.table(r);
		          break;
		        }
		        case "blockquote": {
		          t += this.renderer.blockquote(r);
		          break;
		        }
		        case "list": {
		          t += this.renderer.list(r);
		          break;
		        }
		        case "checkbox": {
		          t += this.renderer.checkbox(r);
		          break;
		        }
		        case "html": {
		          t += this.renderer.html(r);
		          break;
		        }
		        case "def": {
		          t += this.renderer.def(r);
		          break;
		        }
		        case "paragraph": {
		          t += this.renderer.paragraph(r);
		          break;
		        }
		        case "text": {
		          t += this.renderer.text(r);
		          break;
		        }
		        default: {
		          let o = 'Token with "' + r.type + '" type was not found.';
		          if (this.options.silent) return console.error(o), "";
		          throw new Error(o);
		        }
		      }
		    }
		    return t;
		  }
		  parseInline(e, t = this.renderer) {
		    this.renderer.parser = this;
		    let n = "";
		    for (let i = 0; i < e.length; i++) {
		      let r = e[i];
		      if (this.options.extensions?.renderers?.[r.type]) {
		        let s = this.options.extensions.renderers[r.type].call({ parser: this }, r);
		        if (s !== false || !["escape", "html", "link", "image", "checkbox", "strong", "em", "codespan", "br", "del", "text"].includes(r.type)) {
		          n += s || "";
		          continue;
		        }
		      }
		      let o = r;
		      switch (o.type) {
		        case "escape": {
		          n += t.text(o);
		          break;
		        }
		        case "html": {
		          n += t.html(o);
		          break;
		        }
		        case "link": {
		          n += t.link(o);
		          break;
		        }
		        case "image": {
		          n += t.image(o);
		          break;
		        }
		        case "checkbox": {
		          n += t.checkbox(o);
		          break;
		        }
		        case "strong": {
		          n += t.strong(o);
		          break;
		        }
		        case "em": {
		          n += t.em(o);
		          break;
		        }
		        case "codespan": {
		          n += t.codespan(o);
		          break;
		        }
		        case "br": {
		          n += t.br(o);
		          break;
		        }
		        case "del": {
		          n += t.del(o);
		          break;
		        }
		        case "text": {
		          n += t.text(o);
		          break;
		        }
		        default: {
		          let s = 'Token with "' + o.type + '" type was not found.';
		          if (this.options.silent) return console.error(s), "";
		          throw new Error(s);
		        }
		      }
		    }
		    return n;
		  }
		};
		var _a;
		var S = (_a = class {
		  constructor(e) {
		    __publicField(this, "options");
		    __publicField(this, "block");
		    this.options = e || T;
		  }
		  preprocess(e) {
		    return e;
		  }
		  postprocess(e) {
		    return e;
		  }
		  processAllTokens(e) {
		    return e;
		  }
		  emStrongMask(e) {
		    return e;
		  }
		  provideLexer(e = this.block) {
		    return e ? x.lex : x.lexInline;
		  }
		  provideParser(e = this.block) {
		    return e ? b.parse : b.parseInline;
		  }
		}, __publicField(_a, "passThroughHooks", /* @__PURE__ */ new Set(["preprocess", "postprocess", "processAllTokens", "emStrongMask"])), __publicField(_a, "passThroughHooksRespectAsync", /* @__PURE__ */ new Set(["preprocess", "postprocess", "processAllTokens"])), _a);
		var Q = class {
		  constructor(...e) {
		    __publicField(this, "defaults", A());
		    __publicField(this, "options", this.setOptions);
		    __publicField(this, "parse", this.parseMarkdown(true));
		    __publicField(this, "parseInline", this.parseMarkdown(false));
		    __publicField(this, "Parser", b);
		    __publicField(this, "Renderer", P);
		    __publicField(this, "TextRenderer", L);
		    __publicField(this, "Lexer", x);
		    __publicField(this, "Tokenizer", y);
		    __publicField(this, "Hooks", S);
		    this.use(...e);
		  }
		  walkTokens(e, t) {
		    let n = [];
		    for (let i of e) switch (n = n.concat(t.call(this, i)), i.type) {
		      case "table": {
		        let r = i;
		        for (let o of r.header) n = n.concat(this.walkTokens(o.tokens, t));
		        for (let o of r.rows) for (let s of o) n = n.concat(this.walkTokens(s.tokens, t));
		        break;
		      }
		      case "list": {
		        let r = i;
		        n = n.concat(this.walkTokens(r.items, t));
		        break;
		      }
		      default: {
		        let r = i;
		        this.defaults.extensions?.childTokens?.[r.type] ? this.defaults.extensions.childTokens[r.type].forEach((o) => {
		          let s = r[o].flat(1 / 0);
		          n = n.concat(this.walkTokens(s, t));
		        }) : r.tokens && (n = n.concat(this.walkTokens(r.tokens, t)));
		      }
		    }
		    return n;
		  }
		  use(...e) {
		    let t = this.defaults.extensions || { renderers: {}, childTokens: {} };
		    return e.forEach((n) => {
		      let i = { ...n };
		      if (i.async = this.defaults.async || i.async || false, n.extensions && (n.extensions.forEach((r) => {
		        if (!r.name) throw new Error("extension name required");
		        if ("renderer" in r) {
		          let o = t.renderers[r.name];
		          o ? t.renderers[r.name] = function(...s) {
		            let u = r.renderer.apply(this, s);
		            return u === false && (u = o.apply(this, s)), u;
		          } : t.renderers[r.name] = r.renderer;
		        }
		        if ("tokenizer" in r) {
		          if (!r.level || r.level !== "block" && r.level !== "inline") throw new Error("extension level must be 'block' or 'inline'");
		          let o = t[r.level];
		          o ? o.unshift(r.tokenizer) : t[r.level] = [r.tokenizer], r.start && (r.level === "block" ? t.startBlock ? t.startBlock.push(r.start) : t.startBlock = [r.start] : r.level === "inline" && (t.startInline ? t.startInline.push(r.start) : t.startInline = [r.start]));
		        }
		        "childTokens" in r && r.childTokens && (t.childTokens[r.name] = r.childTokens);
		      }), i.extensions = t), n.renderer) {
		        let r = this.defaults.renderer || new P(this.defaults);
		        for (let o in n.renderer) {
		          if (!(o in r)) throw new Error(`renderer '${o}' does not exist`);
		          if (["options", "parser"].includes(o)) continue;
		          let s = o, u = n.renderer[s], a = r[s];
		          r[s] = (...p) => {
		            let c = u.apply(r, p);
		            return c === false && (c = a.apply(r, p)), c || "";
		          };
		        }
		        i.renderer = r;
		      }
		      if (n.tokenizer) {
		        let r = this.defaults.tokenizer || new y(this.defaults);
		        for (let o in n.tokenizer) {
		          if (!(o in r)) throw new Error(`tokenizer '${o}' does not exist`);
		          if (["options", "rules", "lexer"].includes(o)) continue;
		          let s = o, u = n.tokenizer[s], a = r[s];
		          r[s] = (...p) => {
		            let c = u.apply(r, p);
		            return c === false && (c = a.apply(r, p)), c;
		          };
		        }
		        i.tokenizer = r;
		      }
		      if (n.hooks) {
		        let r = this.defaults.hooks || new S();
		        for (let o in n.hooks) {
		          if (!(o in r)) throw new Error(`hook '${o}' does not exist`);
		          if (["options", "block"].includes(o)) continue;
		          let s = o, u = n.hooks[s], a = r[s];
		          S.passThroughHooks.has(o) ? r[s] = (p) => {
		            if (this.defaults.async && S.passThroughHooksRespectAsync.has(o)) return (async () => {
		              let h = await u.call(r, p);
		              return a.call(r, h);
		            })();
		            let c = u.call(r, p);
		            return a.call(r, c);
		          } : r[s] = (...p) => {
		            if (this.defaults.async) return (async () => {
		              let h = await u.apply(r, p);
		              return h === false && (h = await a.apply(r, p)), h;
		            })();
		            let c = u.apply(r, p);
		            return c === false && (c = a.apply(r, p)), c;
		          };
		        }
		        i.hooks = r;
		      }
		      if (n.walkTokens) {
		        let r = this.defaults.walkTokens, o = n.walkTokens;
		        i.walkTokens = function(s) {
		          let u = [];
		          return u.push(o.call(this, s)), r && (u = u.concat(r.call(this, s))), u;
		        };
		      }
		      this.defaults = { ...this.defaults, ...i };
		    }), this;
		  }
		  setOptions(e) {
		    return this.defaults = { ...this.defaults, ...e }, this;
		  }
		  lexer(e, t) {
		    return x.lex(e, t ?? this.defaults);
		  }
		  parser(e, t) {
		    return b.parse(e, t ?? this.defaults);
		  }
		  parseMarkdown(e) {
		    return (n, i) => {
		      let r = { ...i }, o = { ...this.defaults, ...r }, s = this.onError(!!o.silent, !!o.async);
		      if (this.defaults.async === true && r.async === false) return s(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));
		      if (typeof n > "u" || n === null) return s(new Error("marked(): input parameter is undefined or null"));
		      if (typeof n != "string") return s(new Error("marked(): input parameter is of type " + Object.prototype.toString.call(n) + ", string expected"));
		      if (o.hooks && (o.hooks.options = o, o.hooks.block = e), o.async) return (async () => {
		        let u = o.hooks ? await o.hooks.preprocess(n) : n, p = await (o.hooks ? await o.hooks.provideLexer(e) : e ? x.lex : x.lexInline)(u, o), c = o.hooks ? await o.hooks.processAllTokens(p) : p;
		        o.walkTokens && await Promise.all(this.walkTokens(c, o.walkTokens));
		        let k = await (o.hooks ? await o.hooks.provideParser(e) : e ? b.parse : b.parseInline)(c, o);
		        return o.hooks ? await o.hooks.postprocess(k) : k;
		      })().catch(s);
		      try {
		        o.hooks && (n = o.hooks.preprocess(n));
		        let a = (o.hooks ? o.hooks.provideLexer(e) : e ? x.lex : x.lexInline)(n, o);
		        o.hooks && (a = o.hooks.processAllTokens(a)), o.walkTokens && this.walkTokens(a, o.walkTokens);
		        let c = (o.hooks ? o.hooks.provideParser(e) : e ? b.parse : b.parseInline)(a, o);
		        return o.hooks && (c = o.hooks.postprocess(c)), c;
		      } catch (u) {
		        return s(u);
		      }
		    };
		  }
		  onError(e, t) {
		    return (n) => {
		      if (n.message += `
		Please report this to https://github.com/markedjs/marked.`, e) {
		        let i = "<p>An error occurred:</p><pre>" + R(n.message + "", true) + "</pre>";
		        return t ? Promise.resolve(i) : i;
		      }
		      if (t) return Promise.reject(n);
		      throw n;
		    };
		  }
		};
		var M = new Q();
		function f(l3, e) {
		  return M.parse(l3, e);
		}
		f.options = f.setOptions = function(l3) {
		  return M.setOptions(l3), f.defaults = M.defaults, U(f.defaults), f;
		};
		f.getDefaults = A;
		f.defaults = T;
		function bt(...l3) {
		  return M.use(...l3), f.defaults = M.defaults, U(f.defaults), f;
		}
		f.use = bt;
		f.walkTokens = function(l3, e) {
		  return M.walkTokens(l3, e);
		};
		f.parseInline = M.parseInline;
		f.Parser = b;
		f.parser = b.parse;
		f.Renderer = P;
		f.TextRenderer = L;
		f.Lexer = x;
		f.lexer = x.lex;
		f.Tokenizer = y;
		f.Hooks = S;
		f.parse = f;
		var un = f.options;
		var pn = f.setOptions;
		var cn = f.walkTokens;
		var hn = f.parseInline;
		var kn = b.parse;
		var gn = x.lex;

		// src/client/views/plan-view.js
		var useState8 = React7.useState;
		var useEffect10 = React7.useEffect;
		var useMemo2 = React7.useMemo;
		var createElement10 = React7.createElement;
		function renderMarkdown(source) {
		  var html2 = f.parse(source ?? "", {
		    gfm: true,
		    breaks: true
		  });
		  return purify.sanitize(html2, {
		    USE_PROFILES: { html: true }
		  });
		}
		function PlanView(props) {
		  var connection = props.connection;
		  var file = props.file;
		  var loadState = useState8(null);
		  var plan = loadState[0];
		  var setPlan = loadState[1];
		  var planErrorState = useState8(null);
		  var planError = planErrorState[0];
		  var setPlanError = planErrorState[1];
		  var sendState = useState8("idle");
		  var sendStatus = sendState[0];
		  var setSendStatus = sendState[1];
		  var sendErrorState = useState8(null);
		  var sendError = sendErrorState[0];
		  var setSendError = sendErrorState[1];
		  var renderedMarkdown = useMemo2(function() {
		    return renderMarkdown(plan?.content ?? "");
		  }, [plan?.content]);
		  useEffect10(function() {
		    var cancelled = false;
		    setPlan(null);
		    setPlanError(null);
		    setSendStatus("idle");
		    setSendError(null);
		    rpcCall(connection, "plan/get", { file }).then(function(value) {
		      if (!cancelled) setPlan(value);
		    }).catch(function(err) {
		      if (!cancelled) setPlanError(err.message ?? String(err));
		    });
		    return function() {
		      cancelled = true;
		    };
		  }, [connection, file]);
		  var children = [];
		  children.push(createElement10(
		    "p",
		    { key: "title", className: "pcc-section-title" },
		    "\u{1F4CB} " + (plan && plan.name || (file ?? "").replace(/\.md$/, ""))
		  ));
		  if (planError) {
		    children.push(createElement10("p", { key: "err", className: "pcc-error" }, "\u8BFB\u53D6\u5931\u8D25: " + planError));
		  } else if (!plan) {
		    children.push(createElement10("p", { key: "loading", className: "pcc-desc" }, "\u6B63\u5728\u8BFB\u53D6\u6E05\u7406\u65B9\u6848\u2026"));
		  } else {
		    if (plan.createdAt) {
		      children.push(createElement10(
		        "p",
		        { key: "meta", className: "pcc-desc" },
		        "\u751F\u6210\u4E8E " + new Date(plan.createdAt).toLocaleString()
		      ));
		    }
		    children.push(createElement10("div", {
		      key: "content",
		      className: "pcc-plan-content pcc-markdown",
		      dangerouslySetInnerHTML: { __html: renderedMarkdown }
		    }));
		    var actionChildren = [];
		    actionChildren.push(createElement10("button", {
		      key: "ai",
		      className: "pcc-btn pcc-btn-primary",
		      style: { width: "100%", marginTop: "6px" },
		      disabled: sendStatus === "sending" || sendStatus === "sent",
		      onClick: async function() {
		        if (sendStatus === "sending" || sendStatus === "sent") return;
		        if (!plan.path) {
		          setSendStatus("error");
		          setSendError("\u5BBF\u4E3B\u672A\u8FD4\u56DE\u65B9\u6848\u8DEF\u5F84\uFF08\u53EF\u80FD\u4ECD\u5728\u8FD0\u884C\u65E7\u7248\u63D2\u4EF6\uFF0C\u8BF7\u91CD\u542F DSH \u540E\u91CD\u8BD5\uFF09");
		          return;
		        }
		        setSendStatus("sending");
		        setSendError(null);
		        try {
		          await sendChatMessage(props.ctx, buildPlanFollowUpPrompt(plan.path));
		          setSendStatus("sent");
		        } catch (err) {
		          setSendStatus("error");
		          setSendError(err.message ?? String(err));
		        }
		      }
		    }, sendStatus === "sending" ? "\u6267\u884C\u8BF7\u6C42\u53D1\u9001\u4E2D\u2026" : sendStatus === "sent" ? "\u2713 \u5DF2\u63D0\u4EA4\u5230\u5F53\u524D\u4F1A\u8BDD" : sendStatus === "error" ? "\u21BB \u91CD\u65B0\u53D1\u9001\u65B9\u6848\u8DDF\u8FDB\u8BF7\u6C42" : "\u{1F916} \u8BA9 AI \u6309\u6B64\u65B9\u6848\u6267\u884C"));
		    if (sendStatus === "sent") {
		      actionChildren.push(createElement10(
		        "p",
		        { key: "ai-hint", className: "pcc-desc" },
		        "\u6E05\u7406\u65B9\u6848\u5DF2\u63D0\u4EA4\u5230\u5F53\u524D\u4F1A\u8BDD\uFF1BAI \u5E94\u5148\u4F30\u7B97\u6838\u5B9E\uFF0C\u5B9E\u9645\u6E05\u7406\u4ECD\u9700\u4F60\u7684\u786E\u8BA4\u3002"
		      ));
		    } else if (sendStatus === "error") {
		      actionChildren.push(createElement10(
		        "p",
		        { key: "ai-error", className: "pcc-error" },
		        "\u53D1\u9001\u5931\u8D25\uFF0C\u53EF\u91CD\u8BD5: " + (sendError ?? "\u672A\u77E5\u9519\u8BEF")
		      ));
		    }
		    for (var a = 0; a < actionChildren.length; a++) children.push(actionChildren[a]);
		    children.push(createElement10("button", {
		      key: "open",
		      className: "pcc-btn",
		      style: { width: "100%", marginTop: "6px" },
		      onClick: function() {
		        rpcCall(connection, "plan/open", { file }).catch(function(err) {
		          setPlanError(err.message ?? String(err));
		        });
		      }
		    }, "\u270F \u7528\u672C\u5730\u7F16\u8F91\u5668\u6253\u5F00"));
		  }
		  return createElement10("div", null, children);
		}

		// src/client/views/diff-view.js
		var React8 = __toESM(require("react"), 1);
		var useState10 = React8.useState;
		var useEffect12 = React8.useEffect;
		var createElement12 = React8.createElement;
		function DiffView(props) {
		  var result = props.result;
		  var base = result.base ?? {};
		  var target = result.target ?? {};
		  var gapMs = (target.createdAt ?? 0) - (base.createdAt ?? 0);
		  var modelState = useState10(function() {
		    return buildChangeTree(result.changes ?? []);
		  });
		  var model = modelState[0];
		  var expandedState = useState10(null);
		  var expanded = expandedState[0];
		  var setExpanded = expandedState[1];
		  var aiPromptState = useState10(null);
		  var aiPrompt = aiPromptState[0];
		  var setAiPrompt = aiPromptState[1];
		  var sendState = useState10("idle");
		  var sendStatus = sendState[0];
		  var setSendStatus = sendState[1];
		  var sendErrorState = useState10(null);
		  var sendError = sendErrorState[0];
		  var setSendError = sendErrorState[1];
		  useEffect12(function() {
		    try {
		      setAiPrompt(buildDiffAnalysisPrompt(result));
		      setSendStatus("idle");
		      setSendError(null);
		    } catch (err) {
		      setAiPrompt(null);
		      setSendStatus("error");
		      setSendError(err.message ?? String(err));
		    }
		  }, [result]);
		  function toggle(path) {
		    setExpanded(function(prev) {
		      var next = new Set(prev ?? []);
		      if (next.has(path)) next.delete(path);
		      else next.add(path);
		      return next;
		    });
		  }
		  function renderNode(path, depth) {
		    var meta = model.metaOf.get(path) ?? { d: 0, f: 0, n: 0 };
		    var kids = model.childrenOf.get(path);
		    var hasKids = !!(kids && kids.length > 0);
		    var isOpen = expanded ? expanded.has(path) : false;
		    var width = Math.max(2, Math.round(Math.abs(meta.d) / model.maxAbs * 100));
		    var isUp = meta.d >= 0;
		    var rows2 = [];
		    rows2.push(
		      createElement12(
		        "div",
		        {
		          key: path,
		          className: "pcc-tree-row",
		          "data-leaf": !hasKids || void 0,
		          style: { paddingLeft: depth * 14 + "px" },
		          title: path + "\n\u53D8\u5316 " + (meta.d > 0 ? "+" : "") + formatBytes(meta.d) + (meta.f ? " \xB7 " + (meta.f > 0 ? "+" : "") + meta.f + " \u6587\u4EF6" : ""),
		          onClick: function() {
		            if (hasKids) toggle(path);
		          }
		        },
		        createElement12("div", {
		          className: "pcc-row-bar",
		          ["data-" + (isUp ? "up" : "down")]: true,
		          style: { width: width + "%" }
		        }),
		        createElement12(TreeToggle, {
		          hasChildren: hasKids,
		          isOpen,
		          label: (isOpen ? "\u6536\u8D77 " : "\u5C55\u5F00 ") + baseName(path),
		          onToggle: function() {
		            toggle(path);
		          }
		        }),
		        createElement12(
		          "span",
		          { className: "pcc-tree-name" },
		          "\u{1F4C1} " + baseName(path) + (meta.n === 1 ? "\uFF08\u65B0\u589E\uFF09" : meta.n === -1 ? "\uFF08\u6D88\u5931\uFF09" : "")
		        ),
		        meta.f ? createElement12(
		          "span",
		          { className: "pcc-tree-meta" },
		          (meta.f > 0 ? "+" : "") + meta.f.toLocaleString() + " \u6587\u4EF6"
		        ) : null,
		        createElement12("span", {
		          className: "pcc-tree-size " + (isUp ? "pcc-delta-up" : "pcc-delta-down")
		        }, (meta.d > 0 ? "+" : "") + formatBytes(meta.d))
		      )
		    );
		    if (isOpen && hasKids) {
		      var shown = Math.min(kids.length, 100);
		      for (var i2 = 0; i2 < shown; i2++) {
		        rows2.push(renderNode(kids[i2], depth + 1));
		      }
		      if (kids.length > shown) {
		        rows2.push(createElement12("div", {
		          key: path + "-more",
		          className: "pcc-tree-more",
		          style: { paddingLeft: (depth + 1) * 14 + "px" }
		        }, "\u2026\u5DF2\u6309\u53D8\u5316\u91CF\u5C55\u793A\u524D " + shown + " \u4E2A\uFF0C\u5171 " + kids.length.toLocaleString() + " \u4E2A"));
		      }
		    }
		    return rows2;
		  }
		  var children = [];
		  children.push(createElement12(
		    "p",
		    { key: "title", className: "pcc-section-title" },
		    "\u2696 \u5DEE\u91CF\u62A5\u544A\uFF08" + (base.name ?? "") + " \u2192 " + (target.name ?? "") + "\uFF09"
		  ));
		  children.push(createElement12(
		    "p",
		    { key: "meta", className: "pcc-desc" },
		    (base.createdAt ? new Date(base.createdAt).toLocaleString() : "-") + " \u2192 " + (target.createdAt ? new Date(target.createdAt).toLocaleString() : "-") + (gapMs > 0 ? "\uFF08\u95F4\u9694 " + formatDuration(gapMs) + "\uFF09" : "")
		  ));
		  children.push(createElement12(
		    "div",
		    { key: "summary", className: "pcc-statrow" },
		    createElement12(
		      "div",
		      { className: "pcc-stat" },
		      createElement12("div", { className: "pcc-stat-value" }, gapMs > 0 ? formatDuration(gapMs) : "-"),
		      createElement12("div", { className: "pcc-stat-label" }, "\u626B\u63CF\u95F4\u9694")
		    ),
		    createElement12(
		      "div",
		      { className: "pcc-stat" },
		      createElement12("div", { className: "pcc-stat-value" }, (result.changes ?? []).length.toLocaleString()),
		      createElement12("div", { className: "pcc-stat-label" }, "\u53D8\u5316\u76EE\u5F55")
		    ),
		    createElement12(
		      "div",
		      { className: "pcc-stat" },
		      createElement12("div", { className: "pcc-stat-value" }, (result.driveDeltas ?? []).length),
		      createElement12("div", { className: "pcc-stat-label" }, "\u5F71\u54CD\u76D8\u7B26")
		    )
		  ));
		  var aiChildren = [];
		  aiChildren.push(createElement12("button", {
		    key: "ai",
		    className: "pcc-btn pcc-btn-primary",
		    style: { width: "100%", padding: "10px 0" },
		    disabled: sendStatus === "sending" || sendStatus === "sent",
		    onClick: async function() {
		      if (!aiPrompt || sendStatus === "sending" || sendStatus === "sent") return;
		      setSendStatus("sending");
		      setSendError(null);
		      try {
		        await sendChatMessage(props.ctx, aiPrompt);
		        setSendStatus("sent");
		      } catch (err) {
		        setSendStatus("error");
		        setSendError(err.message ?? String(err));
		      }
		    }
		  }, sendStatus === "sending" ? "AI \u5DEE\u91CF\u5206\u6790\u8BF7\u6C42\u53D1\u9001\u4E2D\u2026" : sendStatus === "sent" ? "\u2713 \u5DF2\u63D0\u4EA4\u5230\u5F53\u524D\u4F1A\u8BDD" : sendStatus === "error" ? "\u21BB \u91CD\u65B0\u53D1\u9001\u5DEE\u91CF\u5206\u6790\u8BF7\u6C42" : "\u{1F916} \u8BA9 AI \u5206\u6790\u5DEE\u91CF\uFF08\u589E\u957F\u539F\u56E0/\u53EF\u56DE\u6536\uFF09"));
		  if (sendStatus === "sent") {
		    aiChildren.push(createElement12(
		      "p",
		      { key: "ai-hint", className: "pcc-desc" },
		      "\u5DEE\u91CF\u62A5\u544A\u5DF2\u4F5C\u4E3A @\u6587\u4EF6 \u5F15\u7528\u63D0\u4EA4\u5230\u5F53\u524D\u4F1A\u8BDD\uFF0C\u8BF7\u5728\u5BF9\u8BDD\u533A\u67E5\u770B AI \u7684\u5206\u6790\u8FDB\u5EA6\u3002"
		    ));
		  } else if (sendStatus === "error") {
		    aiChildren.push(createElement12(
		      "p",
		      { key: "ai-error", className: "pcc-error" },
		      "\u53D1\u9001\u5931\u8D25\uFF0C\u53EF\u91CD\u8BD5: " + (sendError ?? "\u672A\u77E5\u9519\u8BEF")
		    ));
		  }
		  for (var a = 0; a < aiChildren.length; a++) children.push(aiChildren[a]);
		  (result.driveDeltas ?? []).forEach(function(d2) {
		    var cls = d2.freeDelta < 0 ? "pcc-delta-up" : "pcc-delta-down";
		    children.push(createElement12(
		      "p",
		      { key: "drv-" + d2.drive, className: "pcc-desc" },
		      "\u25A4 " + d2.drive + " \u5269\u4F59\u53D8\u5316 ",
		      createElement12(
		        "span",
		        { className: cls },
		        (d2.freeDelta > 0 ? "+" : "") + formatBytes(d2.freeDelta)
		      ),
		      " \xB7 \u626B\u63CF\u91CF\u53D8\u5316 " + createElement12(
		        "span",
		        { className: d2.scannedDelta < 0 ? "pcc-delta-down" : "pcc-delta-up" },
		        (d2.scannedDelta > 0 ? "+" : "") + formatBytes(d2.scannedDelta)
		      )
		    ));
		  });
		  if (!model || (model.roots ?? []).length === 0) {
		    children.push(createElement12("p", { key: "t-none", className: "pcc-desc" }, "\u2705 \u4E24\u6B21\u626B\u63CF\u4E4B\u95F4\u76EE\u5F55\u65E0\u4EFB\u4F55\u53D8\u5316"));
		  } else {
		    children.push(createElement12(
		      "p",
		      { key: "t-tree", className: "pcc-section-title", style: { marginTop: "8px" } },
		      "\u{1F50D} \u53D8\u5316\u76EE\u5F55\uFF08" + model.total.toLocaleString() + " \u4E2A\uFF0C\u70B9\u51FB\u9010\u5C42\u4E0B\u94BB\u7CBE\u786E\u5B9A\u4F4D\uFF09"
		    ));
		    for (var i = 0; i < model.roots.length; i++) {
		      var rows = renderNode(model.roots[i], 0);
		      for (var j = 0; j < rows.length; j++) children.push(rows[j]);
		    }
		    children.push(createElement12(
		      "p",
		      { key: "tree-hint", className: "pcc-desc", style: { marginTop: "6px" } },
		      "\u8BF4\u660E\uFF1A\u9996\u5C42\u4E3A\u53D8\u5316\u7684\u9876\u5C42\u76EE\u5F55\uFF0C\u70B9\u51FB\u5C55\u5F00\u53EF\u770B\u5176\u5185\u90E8\u54EA\u4E2A\u5B50\u76EE\u5F55\u53D8\u5316\uFF1B\u7EA2\u8272\u4E3A\u589E\u957F\u3001\u7EFF\u8272\u4E3A\u7F29\u5C0F\uFF1B\u201C\uFF08\u65B0\u589E\uFF09/\uFF08\u6D88\u5931\uFF09\u201D\u4E3A\u4E24\u6B21\u626B\u63CF\u95F4\u51FA\u73B0/\u5220\u9664\u7684\u76EE\u5F55\uFF1B\u201C\xB7\u201D\u8868\u793A\u53D8\u5316\u53D1\u751F\u5728\u6B64\u76EE\u5F55\u7684\u76F4\u63A5\u5185\u5BB9\uFF08\u5DF2\u5230\u7CBE\u786E\u4F4D\u7F6E\uFF09\u3002"
		    ));
		  }
		  return createElement12("div", null, children);
		}
		function buildChangeTree(changes) {
		  var metaOf = /* @__PURE__ */ new Map();
		  var childrenOf = /* @__PURE__ */ new Map();
		  var roots = [];
		  var maxAbs = 1;
		  for (var i = 0; i < changes.length; i++) {
		    var c = changes[i];
		    metaOf.set(c.p, { d: c.d ?? 0, f: c.f ?? 0, n: c.n ?? 0 });
		    var abs = Math.abs(c.d ?? 0);
		    if (abs > maxAbs) maxAbs = abs;
		  }
		  var paths = Array.from(metaOf.keys());
		  for (var i = 0; i < paths.length; i++) {
		    var p = paths[i];
		    if (isRootPath(p)) {
		      roots.push(p);
		      continue;
		    }
		    var cut = p.lastIndexOf("\\");
		    var parent = cut === 2 && p.charAt(1) === ":" ? p.slice(0, 3) : p.slice(0, cut);
		    if (metaOf.has(parent)) {
		      var list = childrenOf.get(parent);
		      if (!list) childrenOf.set(parent, list = []);
		      list.push(p);
		    } else {
		      roots.push(p);
		    }
		  }
		  var byAbs = function(a, b2) {
		    return Math.abs(metaOf.get(b2)?.d ?? 0) - Math.abs(metaOf.get(a)?.d ?? 0);
		  };
		  childrenOf.forEach(function(list2) {
		    list2.sort(byAbs);
		  });
		  roots.sort(byAbs);
		  return { metaOf, childrenOf, roots, maxAbs, total: changes.length };
		}

		// src/client/views/dev-env-view.js
		var React9 = __toESM(require("react"), 1);
		var useState12 = React9.useState;
		var useEffect14 = React9.useEffect;
		var useRef4 = React9.useRef;
		var createElement14 = React9.createElement;
		function isOnCDrive(path) {
		  return /^c:[\\/]/i.test(path ?? "");
		}
		function migrationPreviewPath(root, subdir) {
		  const base = String(root ?? "").trim().replace(/^"+|"+$/g, "").replace(/[\\/]+$/, "");
		  const child = String(subdir ?? "").replace(/^[\\/]+/, "");
		  return base && child ? base + "\\" + child : base;
		}
		function DevEnvView(props) {
		  var ctx = props.ctx;
		  var connection = props.connection;
		  var scanState = useState12(null);
		  var scan = scanState[0];
		  var setScan = scanState[1];
		  var scanStatusState = useState12(null);
		  var scanStatus = scanStatusState[0];
		  var setScanStatus = scanStatusState[1];
		  var loadingState = useState12(false);
		  var loading = loadingState[0];
		  var setLoading = loadingState[1];
		  var errorState = useState12(null);
		  var error = errorState[0];
		  var setError = errorState[1];
		  var expandedState = useState12({});
		  var expanded = expandedState[0];
		  var setExpanded = expandedState[1];
		  var targetRootState = useState12("");
		  var targetRoot = targetRootState[0];
		  var setTargetRoot = targetRootState[1];
		  var migrationTargetState = useState12(null);
		  var migrationTarget = migrationTargetState[0];
		  var setMigrationTarget = migrationTargetState[1];
		  var previewPathState = useState12("");
		  var previewPath = previewPathState[0];
		  var setPreviewPath = previewPathState[1];
		  var browsingState = useState12(false);
		  var browsing = browsingState[0];
		  var setBrowsing = browsingState[1];
		  var planningState = useState12(null);
		  var planningId = planningState[0];
		  var setPlanningId = planningState[1];
		  var executingState = useState12(false);
		  var executing = executingState[0];
		  var setExecuting = executingState[1];
		  var aiSendingState = useState12(false);
		  var aiSending = aiSendingState[0];
		  var setAiSending = aiSendingState[1];
		  var actionMessageState = useState12(null);
		  var actionMessage = actionMessageState[0];
		  var setActionMessage = actionMessageState[1];
		  var pollTimerRef = useRef4(null);
		  function stopPolling() {
		    if (pollTimerRef.current) {
		      clearInterval(pollTimerRef.current);
		      pollTimerRef.current = null;
		    }
		  }
		  function pollScanStatus() {
		    rpcCall(connection, "dev-env/scan/status").then(function(snapshot) {
		      setScanStatus(snapshot);
		      if (snapshot.state === "running") return;
		      stopPolling();
		      if (snapshot.state === "error") {
		        setError(snapshot.error ?? "\u5F00\u53D1\u73AF\u5883\u626B\u63CF\u5931\u8D25");
		        setLoading(false);
		      }
		    }).catch(function(err) {
		      setError(err.message ?? String(err));
		    });
		  }
		  function load(force) {
		    stopPolling();
		    setLoading(true);
		    setScan(null);
		    setScanStatus({ state: "starting", filesScanned: 0, dirsScanned: 0, pathsScanned: 0 });
		    setError(null);
		    rpcCall(connection, "dev-env/scan/start", { force: force === true }).then(function() {
		      pollScanStatus();
		      pollTimerRef.current = setInterval(pollScanStatus, 300);
		    }).catch(function(err) {
		      setError(err.message ?? String(err));
		      setLoading(false);
		    });
		  }
		  async function sendToAi() {
		    setAiSending(true);
		    setError(null);
		    setActionMessage(null);
		    try {
		      var report = await rpcCall(connection, "dev-env/report");
		      await sendChatMessage(ctx, buildFileReference(report.resultFile));
		      setActionMessage("\u8FC1\u79FB\u5206\u6790\u62A5\u544A\u5DF2\u53D1\u9001\u7ED9 AI\u3002\u767D\u540D\u5355\u5916\u76EE\u5F55\u53EA\u4F1A\u901A\u8FC7 AI \u8FC1\u79FB\u6D41\u7A0B\u5904\u7406\u3002");
		    } catch (err) {
		      setError(err.message ?? String(err));
		    } finally {
		      setAiSending(false);
		    }
		  }
		  async function createManualPlan(item) {
		    if (!targetRoot.trim()) return;
		    setPlanningId(item.id);
		    setError(null);
		    setActionMessage(null);
		    try {
		      var value = await rpcCall(connection, "dev-env/migration/plan-manual", {
		        recipeId: item.id,
		        targetRoot: targetRoot.trim()
		      });
		      setMigrationTarget(null);
		      var destinationWarning = value.destinationHasContent ? "\n\n\u26A0 \u76EE\u6807\u76EE\u5F55\u5DF2\u6709 " + (value.destinationFileCount ?? 0).toLocaleString() + " \u4E2A\u6587\u4EF6\u3002\u7EE7\u7EED\u540E\u5C06\u7528\u8FC1\u79FB\u5185\u5BB9\u66FF\u6362\u8BE5\u76EE\u5F55\uFF1B\u539F\u5185\u5BB9\u4F1A\u5148\u5907\u4EFD\u5230\uFF1A\n" + value.destinationBackupPath : "";
		      var confirmed = window.confirm(
		        "\u786E\u5B9A\u8981\u8FC1\u79FB\u5230 " + value.destinationPath + " \u76EE\u5F55\u5417\uFF1F\n\n\u6E90\u76EE\u5F55: " + value.sourcePath + "\n\u6301\u4E45\u914D\u7F6E: " + (value.configChange?.path ?? value.envChanges.map(function(change) {
		          return change.key;
		        }).join(", ")) + "\n\n\u786E\u8BA4\u540E\u5C06\u8FC1\u79FB\u6587\u4EF6\u5E76\u4FEE\u6539\u6301\u4E45\u914D\u7F6E\uFF0C\u539F\u76EE\u5F55\u4F1A\u4FDD\u7559\u4E3A\u5907\u4EFD\u3002" + destinationWarning
		      );
		      if (!confirmed) return;
		      setExecuting(true);
		      var result = await rpcCall(connection, "dev-env/migration/execute", { planId: value.planId });
		      setScan(function(current) {
		        if (!current) return current;
		        return {
		          ...current,
		          knownDirs: (current.knownDirs ?? []).map(function(entry) {
		            if (entry.id !== item.id) return entry;
		            return {
		              ...entry,
		              effectivePath: result.destinationPath,
		              exists: true,
		              isDirectory: true,
		              isMigrated: true,
		              migrationSource: result.configChange ? "\u914D\u7F6E\u6587\u4EF6 " + result.configChange.path : result.envChanges.length > 0 ? "\u7528\u6237\u73AF\u5883\u53D8\u91CF " + result.envChanges.map(function(change) {
		                return change.key;
		              }).join(", ") : "\u76EE\u5F55\u94FE\u63A5",
		              manualMigration: null,
		              sizeBytes: result.sizeBytes,
		              fileCount: result.fileCount,
		              dirCount: result.dirCount
		            };
		          })
		        };
		      });
		      setActionMessage("\u8FC1\u79FB\u5B8C\u6210\uFF0C\u5DE5\u5177\u914D\u7F6E\u5DF2\u66F4\u65B0\uFF0C\u6E90\u76EE\u5F55\u5907\u4EFD\u4FDD\u7559\u5728 " + result.backupPath + (result.destinationBackupPath ? "\uFF0C\u76EE\u6807\u539F\u5185\u5BB9\u5907\u4EFD\u4FDD\u7559\u5728 " + result.destinationBackupPath : "") + "\u3002\u8BF7\u91CD\u542F\u7EC8\u7AEF\u548C IDE \u540E\u9A8C\u8BC1\u3002");
		    } catch (err) {
		      setError(err.message ?? String(err));
		    } finally {
		      setExecuting(false);
		      setPlanningId(null);
		    }
		  }
		  async function browseTargetDirectory(item) {
		    setBrowsing(true);
		    setError(null);
		    try {
		      var result = await rpcCall(connection, "dev-env/migration/pick-directory", {
		        initialPath: targetRoot.trim()
		      });
		      if (result.cancelled) return;
		      setTargetRoot(result.path);
		      setPreviewPath(migrationPreviewPath(result.path, item.manualMigration.targetSubdir));
		    } catch (err) {
		      setError(err.message ?? String(err));
		    } finally {
		      setBrowsing(false);
		    }
		  }
		  useEffect14(function() {
		    load(false);
		    return function() {
		      stopPolling();
		    };
		  }, [connection]);
		  var envVars = scan?.envVars ?? [];
		  var envPathGroups = scan?.envPathGroups ?? [];
		  var knownDirs = scan?.knownDirs ?? [];
		  var targetFilesScanned = scanStatus?.filesScanned ?? 0;
		  var targetDirsScanned = scanStatus?.dirsScanned ?? 0;
		  var animatedFilesScanned = useAnimatedNumber(targetFilesScanned);
		  var animatedDirsScanned = useAnimatedNumber(targetDirsScanned);
		  useEffect14(function() {
		    if (scanStatus?.state !== "done" || !scanStatus.result) return;
		    if (animatedFilesScanned < targetFilesScanned || animatedDirsScanned < targetDirsScanned) return;
		    var timer = setTimeout(function() {
		      setScan(scanStatus.result);
		      setScanStatus(null);
		      setLoading(false);
		    }, 180);
		    return function() {
		      clearTimeout(timer);
		    };
		  }, [scanStatus, animatedFilesScanned, animatedDirsScanned, targetFilesScanned, targetDirsScanned]);
		  var children = [];
		  children.push(createElement14(
		    "div",
		    { className: "pcc-hero", key: "hero" },
		    createElement14("p", { className: "pcc-section-title" }, "\u5F00\u53D1\u73AF\u5883\u5206\u6790"),
		    createElement14(
		      "p",
		      { className: "pcc-desc" },
		      "\u626B\u63CF\u5E38\u89C1\u5F00\u53D1\u73AF\u5883\u53D8\u91CF\u548C\u7528\u6237\u76EE\u5F55\u4E0B\u7684\u5F00\u53D1\u7F13\u5B58\u4F4D\u7F6E\uFF0C\u5148\u627E\u51FA\u54EA\u4E9B\u5DE5\u5177\u94FE\u3001\u4ED3\u5E93\u548C\u7F13\u5B58\u6B63\u5728\u5360\u7528 C \u76D8\u3002"
		    )
		  ));
		  children.push(createElement14(
		    "div",
		    { key: "actions", className: "pcc-dev-actions" },
		    createElement14("button", {
		      className: "pcc-btn pcc-btn-primary",
		      disabled: loading,
		      onClick: function() {
		        load(true);
		      }
		    }, loading ? "\u6B63\u5728\u626B\u63CF\u5F00\u53D1\u73AF\u5883\u2026" : scan ? "\u91CD\u65B0\u626B\u63CF\u5F00\u53D1\u73AF\u5883" : "\u626B\u63CF\u5F00\u53D1\u73AF\u5883"),
		    createElement14("button", {
		      className: "pcc-btn",
		      disabled: !scan || aiSending,
		      onClick: sendToAi
		    }, aiSending ? "\u6B63\u5728\u53D1\u9001\u2026" : "\u4EA4\u7ED9 AI \u5206\u6790\u8FC1\u79FB")
		  ));
		  if (error) {
		    children.push(createElement14("p", { className: "pcc-error", key: "err" }, "\u26A0 " + error));
		  }
		  if (actionMessage) {
		    children.push(createElement14("p", { className: "pcc-dev-success", key: "action-message" }, actionMessage));
		  }
		  if (loading && !scan && !error) {
		    var scanningDone = scanStatus?.state === "done";
		    children.push(createElement14(
		      "div",
		      { key: "loading", className: "pcc-dev-scan-progress" },
		      createElement14(
		        "div",
		        { className: "pcc-progress-card" },
		        createElement14(
		          "p",
		          { className: "pcc-desc" },
		          scanningDone ? null : createElement14("span", { className: "pcc-pulse" }),
		          scanningDone ? "\u626B\u63CF\u5B8C\u6210\uFF0C\u6B63\u5728\u6574\u7406\u7ED3\u679C\u2026" : "\u6B63\u5728\u626B\u63CF\u5F00\u53D1\u73AF\u5883\u2026"
		        ),
		        createElement14("div", { className: "pcc-progress-num" }, animatedFilesScanned.toLocaleString()),
		        createElement14(
		          "p",
		          { className: "pcc-section-title", style: { textAlign: "center" } },
		          "\u5DF2\u626B\u63CF\u6587\u4EF6\u6570"
		        ),
		        createElement14("p", {
		          className: "pcc-progress-path",
		          title: scanStatus?.currentPath ?? ""
		        }, scanStatus?.currentPath ?? "\u6B63\u5728\u8BFB\u53D6\u73AF\u5883\u53D8\u91CF\u2026")
		      ),
		      createElement14(
		        "div",
		        { className: "pcc-statrow" },
		        createElement14(
		          "div",
		          { className: "pcc-stat" },
		          createElement14("div", { className: "pcc-stat-value" }, animatedDirsScanned.toLocaleString()),
		          createElement14("div", { className: "pcc-stat-label" }, "\u5DF2\u626B\u63CF\u76EE\u5F55")
		        ),
		        createElement14(
		          "div",
		          { className: "pcc-stat" },
		          createElement14("div", { className: "pcc-stat-value" }, (scanStatus?.pathsScanned ?? 0).toLocaleString()),
		          createElement14("div", { className: "pcc-stat-label" }, "\u5DF2\u7EDF\u8BA1\u8DEF\u5F84")
		        ),
		        createElement14(
		          "div",
		          { className: "pcc-stat" },
		          createElement14("div", { className: "pcc-stat-value" }, formatDuration(scanStatus?.elapsedMs ?? 0)),
		          createElement14("div", { className: "pcc-stat-label" }, "\u5DF2\u7528\u65F6")
		        )
		      )
		    ));
		  }
		  if (scan) {
		    children.push(createElement14(
		      "div",
		      { key: "summary", className: "pcc-statrow" },
		      createElement14(
		        "div",
		        { className: "pcc-stat" },
		        createElement14("div", { className: "pcc-stat-value" }, envVars.length.toLocaleString()),
		        createElement14("div", { className: "pcc-stat-label" }, "\u8DEF\u5F84\u578B\u73AF\u5883\u53D8\u91CF")
		      ),
		      createElement14(
		        "div",
		        { className: "pcc-stat" },
		        createElement14("div", { className: "pcc-stat-value" }, formatBytes(scan.totalEnvPathBytes ?? 0)),
		        createElement14("div", { className: "pcc-stat-label" }, "\u73AF\u5883\u53D8\u91CF\u8DEF\u5F84\u4F53\u79EF")
		      ),
		      createElement14(
		        "div",
		        { className: "pcc-stat" },
		        createElement14("div", { className: "pcc-stat-value" }, formatBytes(scan.totalKnownBytes ?? 0)),
		        createElement14("div", { className: "pcc-stat-label" }, "\u5E38\u89C1\u5F00\u53D1\u76EE\u5F55\u4F53\u79EF")
		      )
		    ));
		    var scannedAt = scan.createdAt ? new Date(scan.createdAt).toLocaleString() : "-";
		    children.push(createElement14(
		      "p",
		      { key: "meta", className: "pcc-desc" },
		      "\u626B\u63CF\u65F6\u95F4: " + scannedAt + " \xB7 " + (scan.fromCache ? "\u8BFB\u53D6\u7F13\u5B58" : "\u521A\u521A\u626B\u63CF") + " \xB7 \u626B\u63CF\u8017\u65F6 " + formatDuration(scan.durationMs ?? 0)
		    ));
		    children.push(createElement14(
		      "p",
		      { key: "path-meta", className: "pcc-desc" },
		      "\u7528\u6237\u76EE\u5F55: " + (scan.userProfile || "-")
		    ));
		    children.push(createElement14(
		      "p",
		      { key: "dirs-title", className: "pcc-section-title", style: { marginTop: "10px" } },
		      "\u7528\u6237\u76EE\u5F55 / AppData \u5F00\u53D1\u7F13\u5B58"
		    ));
		    if (knownDirs.length === 0) {
		      children.push(createElement14(
		        "p",
		        { key: "dirs-empty", className: "pcc-desc" },
		        "\u672A\u53D1\u73B0\u5E38\u89C1\u5F00\u53D1\u7F13\u5B58\u76EE\u5F55\u3002"
		      ));
		    } else {
		      knownDirs.forEach(function(d2) {
		        var migratedPath = d2.isMigrated ? d2.effectivePath : null;
		        var displayPath = migratedPath ? d2.path + " \u2192 " + migratedPath : d2.path;
		        var cDrive = isOnCDrive(d2.effectivePath ?? d2.path);
		        var meta = migratedPath ? d2.tool + " \xB7 \u5DF2\u8FC1\u79FB\u5230 " + migratedPath : d2.exists ? d2.tool + " \xB7 " + (d2.fileCount ?? 0).toLocaleString() + " \u6587\u4EF6 \xB7 " + (d2.dirCount ?? 0).toLocaleString() + " \u76EE\u5F55" : d2.tool + " \xB7 \u672A\u53D1\u73B0";
		        children.push(createElement14(
		          "div",
		          {
		            key: "dir-" + d2.id,
		            className: "pcc-devdir-item",
		            "data-missing": !d2.exists || void 0
		          },
		          createElement14(
		            "div",
		            { className: "pcc-devdir-row" },
		            createElement14("span", { className: "pcc-devdir-name" }, d2.label),
		            createElement14("span", { className: "pcc-devdir-size" }, d2.exists ? formatBytes(d2.sizeBytes ?? 0) : "-")
		          ),
		          createElement14("div", { className: "pcc-devdir-path", title: displayPath }, displayPath),
		          createElement14(
		            "div",
		            { className: "pcc-devdir-foot" },
		            createElement14("span", null, meta),
		            createElement14(
		              "span",
		              { className: "pcc-devdir-actions" },
		              d2.isMigrated ? createElement14("span", {
		                className: "pcc-badge",
		                title: d2.migrationSource ? "\u8BC6\u522B\u6765\u6E90: " + d2.migrationSource : void 0
		              }, "\u5DF2\u8FC1\u79FB") : null,
		              !d2.isMigrated && cDrive && d2.exists ? createElement14("span", { className: "pcc-badge" }, "C \u76D8") : null,
		              !d2.isMigrated && d2.exists && d2.manualMigration ? createElement14("button", {
		                className: "pcc-btn pcc-dev-plan-btn",
		                disabled: Boolean(planningId) || executing,
		                onClick: function() {
		                  setTargetRoot("");
		                  setPreviewPath("");
		                  setMigrationTarget(d2);
		                  setError(null);
		                },
		                title: d2.manualMigration.note
		              }, planningId === d2.id || executing ? "\u5904\u7406\u4E2D\u2026" : "\u8FC1\u79FB") : null
		            )
		          )
		        ));
		      });
		    }
		    children.push(createElement14(
		      "div",
		      { key: "env-divider", className: "pcc-dev-section-divider" },
		      createElement14("span", null, "\u73AF\u5883\u53D8\u91CF")
		    ));
		    children.push(createElement14(
		      "p",
		      { key: "env-title", className: "pcc-section-title" },
		      "\u8DEF\u5F84\u578B\u73AF\u5883\u53D8\u91CF\uFF08\u6309\u76D8\u7B26\uFF09"
		    ));
		    if (envPathGroups.length === 0) {
		      children.push(createElement14(
		        "p",
		        { key: "env-empty", className: "pcc-desc" },
		        "\u672A\u53D1\u73B0\u53D8\u91CF\u503C\u4E3A\u8DEF\u5F84\u7684\u5F00\u53D1\u73AF\u5883\u53D8\u91CF\u3002"
		      ));
		    } else {
		      envPathGroups.forEach(function(group) {
		        var open = expanded[group.drive] === true;
		        var paths = group.paths ?? [];
		        var visible = open ? paths : paths.slice(0, 5);
		        children.push(createElement14(
		          "div",
		          { key: "env-drive-" + group.drive, className: "pcc-env-drive" },
		          createElement14(
		            "div",
		            { className: "pcc-env-drive-head" },
		            createElement14("span", { className: "pcc-env-drive-title" }, group.drive),
		            createElement14(
		              "span",
		              { className: "pcc-env-drive-meta" },
		              formatBytes(group.totalBytes ?? 0) + " \xB7 " + (group.pathCount ?? 0) + " \u4E2A\u8DEF\u5F84"
		            )
		          ),
		          visible.map(function(item) {
		            var meta = item.exists ? (item.isDirectory ? "\u76EE\u5F55" : item.isFile ? "\u6587\u4EF6" : "\u8DEF\u5F84") + " \xB7 " + (item.fileCount ?? 0).toLocaleString() + " \u6587\u4EF6 \xB7 " + (item.dirCount ?? 0).toLocaleString() + " \u76EE\u5F55" : "\u8DEF\u5F84\u672A\u627E\u5230";
		            return createElement14(
		              "div",
		              {
		                key: group.drive + "-" + item.path,
		                className: "pcc-env-path-item",
		                "data-missing": !item.exists || void 0
		              },
		              createElement14(
		                "div",
		                { className: "pcc-env-path-top" },
		                createElement14(
		                  "span",
		                  { className: "pcc-env-name", title: item.envKeys.join(", ") },
		                  item.envKeys.join(", ")
		                ),
		                createElement14(
		                  "span",
		                  { className: "pcc-devdir-size" },
		                  item.exists ? formatBytes(item.sizeBytes ?? 0) : "-"
		                )
		              ),
		              createElement14("div", { className: "pcc-env-path", title: item.path }, item.path),
		              createElement14(
		                "div",
		                { className: "pcc-devdir-foot" },
		                createElement14("span", null, meta),
		                item.labels.length > 0 ? createElement14("span", { className: "pcc-badge" }, item.labels[0]) : null
		              )
		            );
		          }),
		          paths.length > 5 ? createElement14("button", {
		            className: "pcc-more-btn",
		            onClick: function() {
		              setExpanded(function(prev) {
		                return {
		                  ...prev ?? {},
		                  [group.drive]: !open
		                };
		              });
		            }
		          }, open ? "\u6536\u8D77" : "\u5C55\u5F00\u5176\u4F59 " + (paths.length - 5) + " \u4E2A\u8DEF\u5F84") : null
		        ));
		      });
		    }
		  }
		  if (migrationTarget) {
		    children.push(createElement14(
		      "div",
		      { key: "migration-dialog", className: "pcc-dev-dialog-backdrop" },
		      createElement14(
		        "form",
		        {
		          className: "pcc-dev-dialog",
		          role: "dialog",
		          "aria-modal": "true",
		          "aria-label": "\u9009\u62E9\u8FC1\u79FB\u76EE\u6807\u76EE\u5F55",
		          onSubmit: function(event) {
		            event.preventDefault();
		            createManualPlan(migrationTarget);
		          }
		        },
		        createElement14("p", { className: "pcc-section-title" }, "\u8FC1\u79FB " + migrationTarget.label),
		        createElement14(
		          "p",
		          { className: "pcc-desc" },
		          "\u8BF7\u8F93\u5165\u6216\u6D4F\u89C8\u9009\u62E9\u5176\u4ED6\u78C1\u76D8\u4E0A\u7684\u76EE\u6807\u6839\u76EE\u5F55\uFF1B\u76EE\u5F55\u4E0D\u5B58\u5728\u65F6\u5C06\u5728\u4E0B\u4E00\u6B65\u81EA\u52A8\u521B\u5EFA\u3002\u786E\u8BA4\u8FC1\u79FB\u540E\uFF0C\u63D2\u4EF6\u4F1A\u540C\u6B65\u4FEE\u6539 " + migrationTarget.manualMigration.settingLabel + "\uFF08" + migrationTarget.manualMigration.configSource + "\uFF09\u3002"
		        ),
		        error ? createElement14("p", { className: "pcc-error" }, error) : null,
		        createElement14(
		          "div",
		          { className: "pcc-dev-target-row" },
		          createElement14("input", {
		            className: "pcc-dev-target-input",
		            type: "text",
		            autoFocus: true,
		            value: targetRoot,
		            placeholder: "\u4F8B\u5982 D:\\DevCache",
		            onChange: function(event) {
		              setTargetRoot(event.target.value);
		              setPreviewPath("");
		            }
		          }),
		          createElement14("button", {
		            type: "button",
		            className: "pcc-btn pcc-dev-preview-btn",
		            disabled: browsing || Boolean(planningId),
		            onClick: function() {
		              browseTargetDirectory(migrationTarget);
		            }
		          }, browsing ? "\u6B63\u5728\u6253\u5F00\u2026" : "\u6D4F\u89C8")
		        ),
		        previewPath ? createElement14("p", {
		          className: "pcc-dev-preview-path",
		          title: previewPath
		        }, "\u8FC1\u79FB\u540E\u76EE\u5F55: " + previewPath) : null,
		        createElement14(
		          "div",
		          { className: "pcc-dev-dialog-actions" },
		          createElement14("button", {
		            type: "button",
		            className: "pcc-btn",
		            disabled: Boolean(planningId) || browsing,
		            onClick: function() {
		              setMigrationTarget(null);
		              setPreviewPath("");
		            }
		          }, "\u53D6\u6D88"),
		          createElement14("button", {
		            type: "submit",
		            className: "pcc-btn pcc-btn-primary",
		            disabled: !targetRoot.trim() || Boolean(planningId) || browsing
		          }, planningId ? "\u6B63\u5728\u6821\u9A8C\u2026" : "\u4E0B\u4E00\u6B65")
		        )
		      )
		    ));
		  }
		  return createElement14("div", null, children);
		}

		// src/client/assets/disk-sentinel.svg
		var disk_sentinel_default = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" role="img" aria-label="\u78C1\u76D8\u54E8\u5175">\n  <path fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" d="M5.5 10.8h13"/>\n  <path fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" d="M7.2 10.8l1 8h7.6l1-8"/>\n  <path fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" d="M9.5 10.8V8.7c0-1.2 1-2.2 2.2-2.2h.6c1.2 0 2.2 1 2.2 2.2v2.1"/>\n  <path fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" d="M9.9 14.2v2.1M14.1 14.2v2.1"/>\n  <path fill="currentColor" d="M18.2 4.1l.42 1.18 1.18.42-1.18.42-.42 1.18-.42-1.18-1.18-.42 1.18-.42.42-1.18ZM5.6 5.9l.32.9.9.32-.9.32-.32.9-.32-.9-.9-.32.9-.32.32-.9Z"/>\n</svg>\n';

		// src/client/panel.js
		var useState14 = React10.useState;
		var useEffect16 = React10.useEffect;
		var useLayoutEffect2 = React10.useLayoutEffect;
		var useRef6 = React10.useRef;
		var createElement16 = React10.createElement;
		var Fragment2 = React10.Fragment;
		var cleanerWorkspaceId = null;
		var cleanerWorkspaceFallback = null;
		var cleanerNavigationPending = false;
		function displayFileName(value, fallback) {
		  var name = String(value ?? "").split(/[\\/]/).pop();
		  return name ? name.replace(/\.(json|md)$/i, "") : fallback;
		}
		function CleanerPanelBody(props) {
		  var ctx = props.ctx;
		  var connection = ctx.connection;
		  var viewState = useState14("select");
		  var view = viewState[0];
		  var setView = viewState[1];
		  var mainPageState = useState14("disk");
		  var mainPage = mainPageState[0];
		  var setMainPage = mainPageState[1];
		  var statusState = useState14(null);
		  var status = statusState[0];
		  var setStatus = statusState[1];
		  var errorState = useState14(null);
		  var error = errorState[0];
		  var setError = errorState[1];
		  var timerRef = useRef6(null);
		  var historyResultState = useState14(null);
		  var historyResult = historyResultState[0];
		  var setHistoryResult = historyResultState[1];
		  var historyFileState = useState14(null);
		  var historyFile = historyFileState[0];
		  var setHistoryFile = historyFileState[1];
		  var planFileState = useState14(null);
		  var planFile = planFileState[0];
		  var setPlanFile = planFileState[1];
		  var diffResultState = useState14(null);
		  var diffResult = diffResultState[0];
		  var setDiffResult = diffResultState[1];
		  useEffect16(function() {
		    return function() {
		      if (timerRef.current) {
		        clearInterval(timerRef.current);
		        timerRef.current = null;
		      }
		    };
		  }, []);
		  function handleStart(target) {
		    setError(null);
		    setStatus(null);
		    rpcCall(connection, "scan/start", { target }).then(function() {
		      setView("scanning");
		      pollStatus();
		      timerRef.current = setInterval(pollStatus, 900);
		    }).catch(function(err) {
		      setError(err.message ?? String(err));
		    });
		  }
		  function pollStatus() {
		    rpcCall(connection, "scan/status").then(function(snapshot) {
		      setStatus(snapshot);
		      if (snapshot.state === "running") return;
		      if (timerRef.current) {
		        clearInterval(timerRef.current);
		        timerRef.current = null;
		      }
		      if (snapshot.state === "done") {
		        setView("scanning");
		      } else if (snapshot.state === "error") {
		        setError(snapshot.error ?? "\u626B\u63CF\u5931\u8D25");
		        setView("select");
		      } else if (snapshot.state === "cancelled") {
		        setView("select");
		      }
		    }).catch(function(err) {
		      setError(err.message ?? String(err));
		    });
		  }
		  function handleCancel() {
		    if (timerRef.current) {
		      clearInterval(timerRef.current);
		      timerRef.current = null;
		    }
		    setStatus(function(prev) {
		      return {
		        ...prev ?? {},
		        state: "cancelling",
		        currentPath: "\u6B63\u5728\u53D6\u6D88\u626B\u63CF\u2026"
		      };
		    });
		    rpcCall(connection, "scan/cancel").then(function() {
		      setStatus(function(prev) {
		        return {
		          ...prev ?? {},
		          state: "cancelled",
		          currentPath: "\u626B\u63CF\u5DF2\u53D6\u6D88\uFF0C\u53EF\u91CD\u65B0\u5F00\u59CB\u3002"
		        };
		      });
		    }).catch(function(err) {
		      setStatus(function(prev) {
		        return {
		          ...prev ?? {},
		          state: "cancelled",
		          currentPath: "\u53D6\u6D88\u8BF7\u6C42\u5DF2\u53D1\u9001\uFF0C\u53EF\u91CD\u65B0\u5F00\u59CB\u3002"
		        };
		      });
		      setError(err.message ?? String(err));
		    });
		  }
		  function handleScanAnimationDone() {
		    setView("result");
		  }
		  function handleRescan() {
		    setView("select");
		    setStatus(null);
		    setError(null);
		  }
		  function handleViewReport(file) {
		    setError(null);
		    rpcCall(connection, "report/get", { file }).then(function(value) {
		      setHistoryResult(value.report);
		      setHistoryFile(file);
		      setView("history");
		    }).catch(function(err) {
		      setError(err.message ?? String(err));
		    });
		  }
		  function handleViewPlan(file) {
		    setError(null);
		    setPlanFile(file);
		    setView("plan");
		  }
		  function handleDiff(baseFile, targetFile) {
		    setError(null);
		    rpcCall(connection, "report/diff", { baseFile, targetFile }).then(function(value) {
		      setDiffResult(value);
		      setView("diff");
		    }).catch(function(err) {
		      setError(err.message ?? String(err));
		    });
		  }
		  function handleViewDiff(file) {
		    setError(null);
		    rpcCall(connection, "diff/get", { file }).then(function(value) {
		      setDiffResult(value);
		      setView("diff");
		    }).catch(function(err) {
		      setError(err.message ?? String(err));
		    });
		  }
		  var body;
		  if (mainPage === "dev-env") {
		    body = createElement16(DevEnvView, {
		      ctx,
		      connection
		    });
		  } else if (view === "scanning") {
		    body = createElement16(ScanningView, {
		      connection,
		      status,
		      onCancel: handleCancel,
		      onRestart: handleRescan,
		      onReadyToShowResult: handleScanAnimationDone
		    });
		  } else if (view === "result" && status && status.result) {
		    body = createElement16(ResultView, {
		      ctx,
		      connection,
		      result: status.result,
		      onRescan: handleRescan
		    });
		  } else if (view === "history" && historyResult) {
		    body = createElement16(ResultView, {
		      ctx,
		      connection,
		      result: historyResult,
		      reportFile: historyFile,
		      onRescan: function() {
		        setView("select");
		      },
		      backLabel: "\u2190 \u8FD4\u56DE"
		    });
		  } else if (view === "plan" && planFile) {
		    body = createElement16(PlanView, {
		      ctx,
		      connection,
		      file: planFile,
		      onBack: function() {
		        setView("select");
		      }
		    });
		  } else if (view === "diff" && diffResult) {
		    body = createElement16(DiffView, {
		      key: (diffResult.base?.file ?? "") + "|" + (diffResult.target?.file ?? ""),
		      ctx,
		      result: diffResult,
		      onBack: function() {
		        setView("select");
		      }
		    });
		  } else {
		    body = createElement16(SelectView, {
		      connection,
		      onStart: handleStart,
		      onViewReport: handleViewReport,
		      onViewPlan: handleViewPlan,
		      onViewDiff: handleViewDiff,
		      onDiff: handleDiff
		    });
		  }
		  var canBack = mainPage === "disk" && view !== "select" && view !== "scanning";
		  var pageNames = {
		    scanning: "\u626B\u63CF\u4E2D",
		    result: "\u626B\u63CF\u7ED3\u679C",
		    history: "\u5386\u53F2\u5206\u6790",
		    diff: "\u5DEE\u91CF\u62A5\u544A",
		    plan: "\u6E05\u7406\u65B9\u6848"
		  };
		  var detailTitle = pageNames[view] ?? "\u78C1\u76D8\u5206\u6790";
		  if (view === "history") detailTitle = displayFileName(historyFile, detailTitle);
		  else if (view === "result") detailTitle = displayFileName(status?.result?.resultFile, detailTitle);
		  else if (view === "plan") detailTitle = displayFileName(planFile, detailTitle);
		  else if (view === "diff") detailTitle = displayFileName(diffResult?.resultFile, detailTitle);
		  return createElement16(
		    Fragment2,
		    null,
		    createElement16(
		      "div",
		      { className: "pcc-panel-head" },
		      canBack ? createElement16("button", {
		        className: "pcc-panel-back",
		        title: "\u8FD4\u56DE",
		        "aria-label": "\u8FD4\u56DE",
		        onClick: function() {
		          setView("select");
		        }
		      }, createElement16(
		        "span",
		        { className: "pcc-back-icon", "aria-hidden": true },
		        createElement16(
		          "svg",
		          { viewBox: "0 0 24 24", width: "18", height: "18" },
		          createElement16("path", {
		            d: "M15 6l-6 6 6 6",
		            fill: "none",
		            stroke: "currentColor",
		            strokeWidth: "2",
		            strokeLinecap: "round",
		            strokeLinejoin: "round"
		          })
		        )
		      )) : null,
		      canBack ? createElement16("h2", {
		        className: "pcc-panel-title",
		        title: detailTitle
		      }, detailTitle) : createElement16(
		        "nav",
		        { className: "pcc-panel-nav", role: "tablist", "aria-label": "\u9875\u9762\u5BFC\u822A" },
		        createElement16("button", {
		          className: "pcc-panel-nav-btn",
		          "data-active": mainPage === "disk" || void 0,
		          role: "tab",
		          "aria-selected": mainPage === "disk",
		          onClick: function() {
		            setMainPage("disk");
		          }
		        }, "\u78C1\u76D8\u5206\u6790"),
		        createElement16("button", {
		          className: "pcc-panel-nav-btn",
		          "data-active": mainPage === "dev-env" || void 0,
		          role: "tab",
		          "aria-selected": mainPage === "dev-env",
		          onClick: function() {
		            setMainPage("dev-env");
		            setError(null);
		          }
		        }, "\u5F00\u53D1\u73AF\u5883\u5206\u6790")
		      ),
		      createElement16("button", {
		        className: "pcc-panel-close",
		        title: "\u5173\u95ED",
		        onClick: function() {
		          setPanelOpen(false);
		        }
		      }, "\u2715")
		    ),
		    createElement16(
		      "div",
		      { className: "pcc-panel-body" },
		      error ? createElement16("p", { className: "pcc-error" }, "\u26A0 " + error) : null,
		      body
		    )
		  );
		}
		function PCCleanerPanel(props) {
		  var open = usePanelOpen();
		  var ctx = props.ctx ?? {};
		  useEffect16(function() {
		    if (!open) return;
		    var sessions = ctx.sessions;
		    var workspaces = ctx.workspaces;
		    if (!sessions?.list || typeof sessions.list.subscribe !== "function") return;
		    function reconcileWorkspace() {
		      if (cleanerNavigationPending || !cleanerWorkspaceId) return;
		      var sessionState = sessions.list.getSnapshot();
		      var workspaceState = workspaces?.list?.getSnapshot?.();
		      var workspace = workspaceState?.items?.find(function(item) {
		        return item.workspaceId === cleanerWorkspaceId;
		      }) ?? cleanerWorkspaceFallback;
		      if (!sessionBelongsToWorkspace(workspace, sessionState, sessionState.current)) {
		        setPanelOpen(false);
		      }
		    }
		    var unsubscribeSessions = sessions.list.subscribe(reconcileWorkspace);
		    var unsubscribeWorkspaces = typeof workspaces?.list?.subscribe === "function" ? workspaces.list.subscribe(reconcileWorkspace) : null;
		    reconcileWorkspace();
		    return function() {
		      unsubscribeSessions();
		      if (unsubscribeWorkspaces) unsubscribeWorkspaces();
		    };
		  }, [ctx, open]);
		  if (!open) return null;
		  return createElement16(
		    "div",
		    { className: "pcc-panel" },
		    createElement16(CleanerPanelBody, { ctx })
		  );
		}
		function openCleaner(ctx) {
		  cleanerNavigationPending = true;
		  try {
		    if (ctx.sidebarRight?.isExpanded?.()) ctx.sidebarRight.toggleExpanded();
		    if (typeof ctx.layout?.closeRightbar === "function") ctx.layout.closeRightbar();
		    else ctx.layout?.closeDetails?.();
		  } catch {
		  }
		  setPanelOpen(true);
		  var workspaces = ctx.workspaces;
		  if (!workspaces) {
		    cleanerNavigationPending = false;
		    return;
		  }
		  rpcCall(ctx.connection, "workspace/dir").then(function(value) {
		    return workspaces.create({ path: value.path });
		  }).then(function(workspace) {
		    cleanerWorkspaceId = workspace.workspaceId;
		    cleanerWorkspaceFallback = workspace;
		    return openLatestWorkspaceSession(ctx, workspace);
		  }).then(function() {
		    cleanerNavigationPending = false;
		  }).catch(function(err) {
		    cleanerNavigationPending = false;
		    console.warn("[disk-sentinel] \u5DE5\u4F5C\u533A\u8DF3\u8F6C\u5931\u8D25\uFF0C\u4EC5\u6253\u5F00\u9762\u677F:", err);
		  });
		}
		function findSidebarRoot(anchor) {
		  var node = anchor?.parentElement ?? null;
		  while (node && node !== document.body) {
		    var hasRegion = Boolean(node.querySelector(":scope > [class*='_regionArea']"));
		    var hasFoot = Boolean(node.querySelector(":scope > [class*='_footArea']"));
		    if (hasRegion && hasFoot) return node;
		    node = node.parentElement;
		  }
		  return null;
		}
		function ensureSidebarTopMount(anchor, wide) {
		  var root = findSidebarRoot(anchor);
		  if (!root) return null;
		  var mount = root.querySelector(":scope > .pcc-sidebar-top-slot");
		  if (!mount) {
		    mount = document.createElement("div");
		    mount.className = "pcc-sidebar-top-slot";
		    mount.setAttribute("data-pcc-sidebar-top-slot", "");
		  }
		  if (wide) {
		    mount.removeAttribute("data-rail");
		    var sectionHeader = root.querySelector('[class*="_sectionHeader"]');
		    var searchSlot = sectionHeader?.querySelector('[class*="_searchSlot"]');
		    if (sectionHeader && searchSlot) {
		      sectionHeader.insertBefore(mount, searchSlot);
		      return mount;
		    }
		    var headerActions = sectionHeader?.querySelector('[class*="_headerActions"]');
		    if (sectionHeader && headerActions) {
		      sectionHeader.insertBefore(mount, headerActions);
		      return mount;
		    }
		    if (sectionHeader) {
		      sectionHeader.appendChild(mount);
		      return mount;
		    }
		  } else {
		    mount.setAttribute("data-rail", "");
		    var region = root.querySelector('[class*="_regionArea"]');
		    var railSearch = region?.querySelector('[class*="_search"]');
		    if (railSearch?.parentElement) {
		      railSearch.parentElement.insertBefore(mount, railSearch.nextSibling);
		      return mount;
		    }
		    var railHeader = region?.querySelector('[class*="_sectionHeader"]');
		    if (railHeader?.parentElement) {
		      railHeader.parentElement.insertBefore(mount, railHeader.nextSibling);
		      return mount;
		    }
		  }
		  return null;
		}
		function PCCleanerSidebarAction(props) {
		  var wide = props.wide !== false;
		  var ctx = props.ctx;
		  var open = usePanelOpen();
		  var btnRef = useRef6(null);
		  var anchorRef = useRef6(null);
		  var mountState = useState14(null);
		  var mount = mountState[0];
		  var setMount = mountState[1];
		  useLayoutEffect2(function() {
		    var anchor = anchorRef.current;
		    var button = btnRef.current;
		    if (!anchor || !button) return;
		    var originalParent = button.parentElement;
		    var originalNext = button.nextSibling;
		    function relocate() {
		      var next = ensureSidebarTopMount(anchor, wide);
		      if (next && button.parentElement !== next) next.appendChild(button);
		      setMount(function(current) {
		        return current === next ? current : next;
		      });
		    }
		    relocate();
		    var sidebarRoot = findSidebarRoot(anchor);
		    return function() {
		      if (originalParent && button.isConnected) {
		        originalParent.insertBefore(button, originalNext);
		      }
		      var current = sidebarRoot?.querySelector(".pcc-sidebar-top-slot") ?? anchor.ownerDocument?.querySelector(".pcc-sidebar-top-slot");
		      if (current && current.childElementCount === 0) current.remove();
		    };
		  }, [wide]);
		  var iconOnly = Boolean(mount) || !wide;
		  return createElement16(
		    Fragment2,
		    null,
		    createElement16("span", { ref: anchorRef, className: "pcc-sidebar-anchor", "aria-hidden": true }),
		    createElement16(
		      "button",
		      {
		        ref: btnRef,
		        className: "pcc-sidebar-btn",
		        "data-active": open || void 0,
		        "data-top": mount ? true : void 0,
		        "data-collapsed": iconOnly || void 0,
		        "aria-label": open ? "\u5173\u95ED\u78C1\u76D8\u54E8\u5175" : "\u6253\u5F00\u78C1\u76D8\u54E8\u5175",
		        title: open ? "\u5173\u95ED\u78C1\u76D8\u54E8\u5175" : "\u6253\u5F00\u78C1\u76D8\u54E8\u5175\uFF08\u81EA\u52A8\u8FDB\u5165\u300C\u78C1\u76D8\u54E8\u5175\u300D\u5DE5\u4F5C\u533A\u5BF9\u8BDD\uFF09",
		        onClick: function() {
		          if (open) {
		            setPanelOpen(false);
		          } else {
		            openCleaner(ctx);
		          }
		        }
		      },
		      createElement16("span", {
		        className: "pcc-sidebar-icon",
		        "aria-hidden": true,
		        dangerouslySetInnerHTML: { __html: disk_sentinel_default }
		      }),
		      iconOnly ? null : createElement16("span", { className: "pcc-sidebar-label" }, "\u78C1\u76D8\u54E8\u5175"),
		      open && !iconOnly ? createElement16("span", { className: "pcc-sidebar-caret", "aria-hidden": true }, "\u25C2") : null
		    )
		  );
		}

		// src/client/index.js
		var createElement18 = React11.createElement;
		var inject = ["slots", "connection", "workspaces", "sessions", "layout", "sidebarRight"];
		function apply2(ctx) {
		  injectCss();
		  ctx.effect(
		    function() {
		      return function() {
		        stopLayoutWatch();
		      };
		    },
		    "disk-sentinel: layout cleanup"
		  );
		  ctx.effect(
		    function() {
		      return ctx.slots.inject(
		        "sidebar.footer.action",
		        function() {
		          return ctx.slots.register(
		            {
		              name: "sidebar.footer.action",
		              id: "disk-sentinel-entry",
		              order: 5,
		              label: function() {
		                return "\u78C1\u76D8\u54E8\u5175";
		              }
		            },
		            function(props) {
		              return createElement18(PCCleanerSidebarAction, {
		                ctx,
		                wide: (props ?? {}).wide
		              });
		            }
		          );
		        }
		      );
		    },
		    "disk-sentinel: sidebar top action"
		  );
		  ctx.effect(
		    function() {
		      return ctx.slots.inject(
		        "shell.overlay",
		        function() {
		          return ctx.slots.register(
		            {
		              name: "shell.overlay",
		              id: "disk-sentinel-panel",
		              order: 50,
		              label: function() {
		                return "\u78C1\u76D8\u54E8\u5175";
		              }
		            },
		            function(props) {
		              return createElement18(PCCleanerPanel, { ctx });
		            }
		          );
		        }
		      );
		    },
		    "disk-sentinel: cleaner panel"
		  );
		}

		return module.exports;
	},
});
