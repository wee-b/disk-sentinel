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

		// src/client/index.js
		var index_exports = {};
		__export(index_exports, {
		  apply: () => apply,
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
		    ".pcc-plan-content{white-space:pre-wrap;word-break:break-word;font-size:12px;line-height:1.7;",
		    "background:var(--dsw-alias-bg-base,#fff);border:1px solid var(--dsw-alias-border-l2,#e5e6eb);",
		    "border-radius:8px;padding:12px;margin:0 0 10px;}",
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
		    applyPanelLayout();
		  });
		  var frame = findFrame();
		  if (frame) {
		    layoutObserver.observe(frame, { attributes: true, attributeFilter: ["style"] });
		  } else {
		    setTimeout(function() {
		      if (panelOpen && layoutObserver) {
		        var late = findFrame();
		        if (late) {
		          applyPanelLayout();
		          layoutObserver.observe(late, { attributes: true, attributeFilter: ["style"] });
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
		        return (list ?? []).filter(function(d) {
		          return d.file !== file;
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
		        return list.filter(function(f) {
		          return f !== file;
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
		    var totalBytes = drives.reduce(function(sum, d) {
		      return sum + (d.totalBytes ?? 0);
		    }, 0);
		    var freeBytes = drives.reduce(function(sum, d) {
		      return sum + (d.freeBytes ?? 0);
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
		    drives.forEach(function(d) {
		      var usedPct = d.totalBytes > 0 ? Math.round((d.totalBytes - d.freeBytes) / d.totalBytes * 100) : 0;
		      children.push(
		        createElement2(
		          "div",
		          {
		            key: d.drive,
		            className: "pcc-drive",
		            "data-selected": selected === d.drive || void 0,
		            onClick: function() {
		              setSelected(d.drive);
		            }
		          },
		          createElement2("span", { className: "pcc-drive-label" }, "\u{1F5B4} " + d.drive + "\\"),
		          createElement2(
		            "div",
		            { className: "pcc-capbar" },
		            createElement2("div", { className: "pcc-capbar-used", style: { width: usedPct + "%" } })
		          ),
		          createElement2(
		            "span",
		            { className: "pcc-drive-meta" },
		            "\u5DF2\u7528 " + formatBytes(d.totalBytes - d.freeBytes) + " / " + formatBytes(d.totalBytes) + "\uFF08\u5269\u4F59 " + formatBytes(d.freeBytes) + "\uFF09"
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
		      var scanned = (r.driveStats ?? []).reduce(function(sum, d) {
		        return sum + (d.scannedBytes ?? 0);
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
		    diffs.forEach(function(d) {
		      var when = d.createdAt ? new Date(d.createdAt).toLocaleString() : d.name ?? d.file;
		      var pair = (d.base?.name ?? "?") + " \u2192 " + (d.target?.name ?? "?");
		      var meta = when + " \xB7 " + pair + " \xB7 " + (d.changesCount ?? 0).toLocaleString() + " \u4E2A\u53D8\u5316\u76EE\u5F55";
		      children.push(
		        createElement2(
		          "div",
		          { key: "diff-" + d.file, className: "pcc-history-item" },
		          createElement2("span", { className: "pcc-history-meta", title: meta }, meta),
		          createElement2("button", {
		            className: "pcc-history-btn",
		            onClick: function() {
		              if (onViewDiff) onViewDiff(d.file);
		            }
		          }, "\u67E5\u770B"),
		          createElement2("button", {
		            className: "pcc-history-btn",
		            "data-danger": true,
		            onClick: function() {
		              handleDeleteDiff(d.file);
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
		  var text = button.textContent ?? "";
		  var label = (aria + " " + text).toLowerCase();
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
		    for (var b = 0; b < buttons.length; b++) {
		      if (isUsableSubmitButton(buttons[b])) return buttons[b];
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
		  (result.driveStats ?? []).forEach(function(d) {
		    lines.push(
		      "| " + d.drive + " | " + formatBytes(d.totalBytes) + " | " + formatBytes(d.freeBytes) + " | " + formatBytes(d.scannedBytes) + " | " + d.fileCount + " | " + d.dirCount + " | " + formatDuration(result.durationMs ?? 0) + " |"
		    );
		  });
		  lines.push("");
		  var dirs = result.topDirectories ?? [];
		  lines.push("## Top " + Math.min(30, dirs.length) + " \u5927\u76EE\u5F55");
		  lines.push("| \u8DEF\u5F84 | \u5927\u5C0F | \u6587\u4EF6\u6570 |");
		  lines.push("|------|------|--------|");
		  dirs.slice(0, 30).forEach(function(d) {
		    lines.push("| " + d.path + " | " + formatBytes(d.size) + " | " + (d.fileCount ?? "-") + " |");
		  });
		  lines.push("");
		  var files = result.topFiles ?? [];
		  lines.push("## Top " + Math.min(30, files.length) + " \u5927\u6587\u4EF6");
		  lines.push("| \u8DEF\u5F84 | \u5927\u5C0F | \u4FEE\u6539\u65E5\u671F |");
		  lines.push("|------|------|----------|");
		  files.slice(0, 30).forEach(function(f) {
		    lines.push("| " + f.path + " | " + formatBytes(f.size) + " | " + formatDate(f.lastModified) + " |");
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
		    (result.driveDeltas ?? []).forEach(function(d) {
		      lines.push("| " + d.drive + " | " + (d.freeDelta > 0 ? "+" : "") + formatBytes(d.freeDelta) + " | " + (d.scannedDelta > 0 ? "+" : "") + formatBytes(d.scannedDelta) + " |");
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
		        list2.sort(function(a, b) {
		          return (metaOf.get(b)?.s ?? 0) - (metaOf.get(a)?.s ?? 0);
		        });
		      });
		      roots.sort(function(a, b) {
		        return (metaOf.get(b)?.s ?? 0) - (metaOf.get(a)?.s ?? 0);
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
		    (result.topDirectories ?? []).reduce(function(m, d) {
		      return Math.max(m, d.size);
		    }, 0)
		  );
		  var scannedTotal = (result.driveStats ?? []).reduce(function(sum, d) {
		    return sum + (d.scannedBytes ?? 0);
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
		  (result.driveStats ?? []).forEach(function(d) {
		    var usedPct = d.totalBytes > 0 ? Math.round((d.totalBytes - d.freeBytes) / d.totalBytes * 100) : 0;
		    children.push(
		      createElement8(
		        "div",
		        { key: "stat-" + d.drive, className: "pcc-drive-stat" },
		        createElement8(
		          "p",
		          { className: "pcc-section-title" },
		          "\u{1F5B4} " + d.drive + " \xB7 \u5DF2\u7528 " + usedPct + "%"
		        ),
		        createElement8(
		          "div",
		          { className: "pcc-capbar", style: { marginBottom: "6px" } },
		          createElement8("div", { className: "pcc-capbar-used", style: { width: usedPct + "%" } })
		        ),
		        createElement8(
		          "p",
		          { className: "pcc-desc" },
		          "\u5BB9\u91CF " + formatBytes(d.totalBytes) + " \xB7 \u5269\u4F59 " + formatBytes(d.freeBytes) + " \xB7 \u626B\u63CF\u5230 " + formatBytes(d.scannedBytes) + " \xB7 " + (d.fileCount ?? 0).toLocaleString() + " \u4E2A\u6587\u4EF6 / " + (d.dirCount ?? 0).toLocaleString() + " \u4E2A\u76EE\u5F55"
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
		    dirList.slice(0, dirLimit).forEach(function(d, i) {
		      children.push(
		        createElement8(
		          "div",
		          { key: "d" + i, className: "pcc-row", title: d.path },
		          createElement8("div", {
		            className: "pcc-row-bar",
		            style: { width: Math.max(2, Math.round(d.size / maxSize * 100)) + "%" }
		          }),
		          createElement8("span", { className: "pcc-row-path" }, d.path),
		          createElement8("span", { className: "pcc-row-size" }, formatBytes(d.size))
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
		    var maxFileSize = Math.max(1, (result.topFiles ?? []).reduce(function(m, f) {
		      return Math.max(m, f.size);
		    }, 0));
		    var fileList = result.topFiles ?? [];
		    var fileLimit = filesAll ? fileList.length : 20;
		    children.push(createElement8(
		      "p",
		      { key: "t-files", className: "pcc-section-title", style: { marginTop: "10px" } },
		      "\u{1F4C4} Top " + Math.min(fileLimit, fileList.length) + " \u5927\u6587\u4EF6"
		    ));
		    fileList.slice(0, fileLimit).forEach(function(f, i) {
		      children.push(
		        createElement8(
		          "div",
		          { key: "f" + i, className: "pcc-row", title: f.path },
		          createElement8("div", {
		            className: "pcc-row-bar",
		            style: { width: Math.max(2, Math.round(f.size / maxFileSize * 100)) + "%" }
		          }),
		          createElement8("span", { className: "pcc-row-path" }, f.path),
		          createElement8("span", { className: "pcc-row-size" }, formatBytes(f.size))
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
		var useState8 = React7.useState;
		var useEffect10 = React7.useEffect;
		var createElement10 = React7.createElement;
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
		    children.push(createElement10("div", { key: "content", className: "pcc-plan-content" }, plan.content ?? ""));
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
		  (result.driveDeltas ?? []).forEach(function(d) {
		    var cls = d.freeDelta < 0 ? "pcc-delta-up" : "pcc-delta-down";
		    children.push(createElement12(
		      "p",
		      { key: "drv-" + d.drive, className: "pcc-desc" },
		      "\u25A4 " + d.drive + " \u5269\u4F59\u53D8\u5316 ",
		      createElement12(
		        "span",
		        { className: cls },
		        (d.freeDelta > 0 ? "+" : "") + formatBytes(d.freeDelta)
		      ),
		      " \xB7 \u626B\u63CF\u91CF\u53D8\u5316 " + createElement12(
		        "span",
		        { className: d.scannedDelta < 0 ? "pcc-delta-down" : "pcc-delta-up" },
		        (d.scannedDelta > 0 ? "+" : "") + formatBytes(d.scannedDelta)
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
		  var byAbs = function(a, b) {
		    return Math.abs(metaOf.get(b)?.d ?? 0) - Math.abs(metaOf.get(a)?.d ?? 0);
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
		      knownDirs.forEach(function(d) {
		        var migratedPath = d.isMigrated ? d.effectivePath : null;
		        var displayPath = migratedPath ? d.path + " \u2192 " + migratedPath : d.path;
		        var cDrive = isOnCDrive(d.effectivePath ?? d.path);
		        var meta = migratedPath ? d.tool + " \xB7 \u5DF2\u8FC1\u79FB\u5230 " + migratedPath : d.exists ? d.tool + " \xB7 " + (d.fileCount ?? 0).toLocaleString() + " \u6587\u4EF6 \xB7 " + (d.dirCount ?? 0).toLocaleString() + " \u76EE\u5F55" : d.tool + " \xB7 \u672A\u53D1\u73B0";
		        children.push(createElement14(
		          "div",
		          {
		            key: "dir-" + d.id,
		            className: "pcc-devdir-item",
		            "data-missing": !d.exists || void 0
		          },
		          createElement14(
		            "div",
		            { className: "pcc-devdir-row" },
		            createElement14("span", { className: "pcc-devdir-name" }, d.label),
		            createElement14("span", { className: "pcc-devdir-size" }, d.exists ? formatBytes(d.sizeBytes ?? 0) : "-")
		          ),
		          createElement14("div", { className: "pcc-devdir-path", title: displayPath }, displayPath),
		          createElement14(
		            "div",
		            { className: "pcc-devdir-foot" },
		            createElement14("span", null, meta),
		            createElement14(
		              "span",
		              { className: "pcc-devdir-actions" },
		              d.isMigrated ? createElement14("span", {
		                className: "pcc-badge",
		                title: d.migrationSource ? "\u8BC6\u522B\u6765\u6E90: " + d.migrationSource : void 0
		              }, "\u5DF2\u8FC1\u79FB") : null,
		              !d.isMigrated && cDrive && d.exists ? createElement14("span", { className: "pcc-badge" }, "C \u76D8") : null,
		              !d.isMigrated && d.exists && d.manualMigration ? createElement14("button", {
		                className: "pcc-btn pcc-dev-plan-btn",
		                disabled: Boolean(planningId) || executing,
		                onClick: function() {
		                  setTargetRoot("");
		                  setPreviewPath("");
		                  setMigrationTarget(d);
		                  setError(null);
		                },
		                title: d.manualMigration.note
		              }, planningId === d.id || executing ? "\u5904\u7406\u4E2D\u2026" : "\u8FC1\u79FB") : null
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
		  setPanelOpen(true);
		  try {
		    ctx.layout?.closeDetails();
		  } catch {
		  }
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
		var inject = ["slots", "connection", "workspaces", "sessions", "layout"];
		function apply(ctx) {
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
