import { SidebarController } from './second_sidebar/sidebar_controller.mjs';

const TIMEOUT = 1000;

const STYLE = `
    #browser {
      position: relative;

      --sidebar-2-button-icon-size: 32px;
      --sidebar-2-main-padding: 4px;
      --sidebar-2-main-width: calc(var(--sidebar-2-button-icon-size) + 2 * var(--toolbarbutton-outer-padding) + 2 * var(--sidebar-2-main-padding));
      --sidebar-2-box-padding: 4px;
    }

    #tabbrowser-tabbox {
      z-index: 4;
    }

    #sidebar-2-main {
      display: flex;
      flex-direction: column;
      gap: 8px;
      order: 7;
      overflow: scroll;
      padding: 0 var(--sidebar-2-main-padding) 0 var(--sidebar-2-main-padding);
    }

    #sidebar-2-main-web-panel-buttons {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    #sidebar-2-main-web-panel-buttons:empty {
      display: none;
    }

    .sidebar-2-main-button {
      position: relative;
    }

    .sidebar-2-main-button > .toolbarbutton-icon {
      width: 32px !important;
      height: 32px !important;
    }

    .sidebar-2-main-button > .tab-icon-overlay {
      position: absolute !important;
      width: 12px !important;
      height: 12px !important;
      padding: 0px !important;
      margin: 0px !important;
      top: 0 !important;
      right: 0 !important;
    }

    .sidebar-2-main-button > .tab-icon-overlay[hidden="true"] {
      display: none !important;
    }

    #sidebar-2-box {
      order: 6;
      background-color: var(--toolbar-bgcolor);
      min-width: 200px;
      pointer-events: none;
    }

    #sidebar-2-box:has(#sidebar-2[pinned="true"]) {
      padding-inline-start: var(--space-small);
      z-index: 3;
    }

    #sidebar-2-box:has(#sidebar-2[pinned="false"]) {
      position: absolute;
      background-color: transparent;
      height: 100%;
      width: 100% !important;
      right: var(--sidebar-2-main-width);
      padding-block-start: var(--sidebar-2-box-padding);
      padding-block-end: var(--sidebar-2-box-padding);
      padding-inline-end: var(--sidebar-2-box-padding);
      z-index: 5;
    }

    #sidebar-2-box-filler {
      display: none;
      pointer-events: none;
    }

    #sidebar-2-box:has(#sidebar-2[pinned="false"]) #sidebar-2-box-filler {
      display: block;
      flex: 1;
    }

    #sidebar-2 {
      box-shadow: var(--content-area-shadow);
      border-radius: var(--border-radius-medium);
      overflow: hidden;
      height: 100%;
      pointer-events: auto;
      min-width: 200px;
      outline: 0.01px solid var(--chrome-content-separator-color);
    }
    
    #sidebar-2[pinned="true"] {
      width: 100% !important;
    }

    #sidebar-2-toolbar {
      display: flex;
      flex-direction: row;
      gap: 8px;
      padding: 4px;
      background-color: var(--toolbar-bgcolor);
      color: var(--toolbar-color);
    }

    #sidebar-2-toolbar-title {
      display: flex;
      align-items: center;
      width: 100%;
      overflow: hidden;
      white-space: nowrap;
    }

    #sidebar-2-pin-button {
      transform: scale(-1, 1);
    }

    #sidebar-2-web-panels {
      width: 100%;
      height: 100%;
    }

    .web-panel {
      width: 100%;
      height: 100%;
      background-color: var(--toolbar-bgcolor);
      clip-path: inset(-1px 0 round 0 0 var(--border-radius-medium) var(--border-radius-medium));
    }

    #sidebar-2-splitter-pinned {
      display: none;
    }

    #browser:has(#sidebar-2[pinned="true"]) #sidebar-2-splitter-pinned {
      display: block;
      order: 5;
      margin-inline-start: unset;
      margin-inline-end: calc(-1 * var(--splitter-width));
      z-index: 4;
    }

    .sidebar-2-panel-button.subviewbutton-iconic .toolbarbutton-text {
      display: none;
    }

    #sidebar-2-splitter-unpinned {
      pointer-events: auto;
      border: unset;
    }

    #sidebar-2-box:has(#sidebar-2[pinned="true"]) #sidebar-2-splitter-unpinned {
      display: none;
    }

    .sidebar-2-panel {
      width: 300px;
    }

    .sidebar-2-panel > panelmultiview {
      display: flex;
      flex-direction: column;
      width: 100%;
      padding: 0 var(--space-small) var(--space-small) var(--space-small);
    }
    
    .sidebar-2-panel > panelmultiview > .panel-header {
      align-self: center;
    }

    .sidebar-2-panel {
      toolbarseparator, input {
        width: -moz-available;
      }
    }

    #sidebar-2-web-panel-popup-new-buttons {
      justify-content: end;
      width: 100%;
      margin-top: var(--space-small);
    }

    #sidebar-2-web-panel-popup-new-save-button {
      background-color: var(--color-accent-primary);
      color: var(--button-text-color-primary);
    }

    #sidebar-2-web-panel-popup-edit {
      width: 400px;
    }

    #sidebar-2-web-panel-popup-edit-favicon-row {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: var(--space-xsmall);
      width: 100%;
    }

    #sidebar-2-web-panel-favicon-input {
      background-size: 22px;
      padding-right: 30px;
      background-position-x: calc(100% - var(--space-xsmall));
      background-position-y: center;
      background-repeat: no-repeat;
    }

    #sidebar-2-web-panel-popup-edit-multiview-buttons-row {
      justify-content: space-between;
      width: 100%;
      margin-top: var(--space-large);
    }

    #sidebar-2-web-panel-popup-edit-move-buttons .toolbarbutton-text {
      display: none;
    }

    #sidebar-2-web-panel-popup-edit-save-button {
      background-color: var(--color-accent-primary);
      color: var(--button-text-color-primary);
    }
  `;

class SecondSidebar {
  constructor() {
    SidebarController.inject();
    this.decorate();
  }

  decorate() {
    const style = document.createElement('style');
    style.innerHTML = STYLE;
    document.querySelector('head').appendChild(style);
  }
}

var interval = setInterval(() => {
  if (document.querySelector('#browser')) {
    window.second_sidebar = new SecondSidebar();
    window.SecondSidebarController = SidebarController;
    clearInterval(interval);
  }
}, TIMEOUT);
