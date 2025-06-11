import { queryGetPropertyValue } from "../utils/css.mjs";

const notCustomizing = /* css */ `:not([customizing])`;
const compactMode = /* css */ `[zen-compact-mode="true"]${notCustomizing}`;
const sidebarLeft = /* css */ `[zen-right-side="true"]`;
const sidebarRight = /* css */ `:not([zen-right-side="true"])`;
const singleToolbar = /* css */ `[zen-single-toolbar="true"]`;

export const SIDEBAR_MAIN_CSS = /* css */ `
  #sb2-main {
    display: flex;
    flex-direction: column;
    justify-content: var(--sb2-main-web-panel-buttons-position);
    gap: var(--space-small);
    overflow-y: scroll;
    scrollbar-width: none;
    min-width: unset !important;
    padding: 0;
    --tab-selected-bgcolor: ${queryGetPropertyValue('#tabbrowser-tabs', '--tab-selected-bgcolor')};
    --tab-selected-shadow: ${queryGetPropertyValue('#tabbrowser-tabs', '--tab-selected-shadow')};

    toolbarpaletteitem[place="panel"][id^="wrapper-customizableui-special-spring"], toolbarspring {
      flex: 1;
      min-height: unset;
      max-height: unset;
      min-width: unset;
      max-width: unset;
      flex-grow: 1;
      flex-shrink: 1;
    }

    .toolbaritem-combined-buttons {
      justify-content: center;
      margin-inline: 0;
    }

    .toolbarbutton-1 {
      padding: 0 !important;
      border-radius: var(--border-radius-medium);
      width: var(--tab-min-height);
      height: var(--tab-min-height);
      outline: var(--tab-outline);
      outline-offset: var(--tab-outline-offset);
      margin-inline: auto;

      &:hover {
        background-color: var(--tab-hover-background-color);
        outline-color: var(--tab-hover-outline-color);
      }

      &[open] {
        background-color: var(--tab-selected-bgcolor);
        box-shadow: var(--tab-selected-shadow);
        outline-color: var(--tab-selected-outline-color);
      }

      stack {
        background-color: transparent !important;
      }
    }
  }

  :root:is([inDOMFullscreen="true"]) #sb2-main {
    visibility: collapse;
  }

  #sb2-main[shouldAnimate] {
    transition: 0.2s margin-right ease-out, 0.2s margin-left ease-out;
  }

  :root${sidebarRight} #sb2-main {
    order: 17 !important;
    margin-left: var(--zen-toolbox-padding);
    margin-right: calc(var(--zen-toolbox-padding) - var(--zen-element-separation));
  }

  :root${sidebarLeft} #sb2-main {
    order: -3 !important;
    margin-left: calc(var(--zen-toolbox-padding) - var(--zen-element-separation));
    margin-right: var(--zen-toolbox-padding);
  }

  :root${compactMode} #sb2-main {
    position: absolute;
    z-index: 99;
    top: 0;
    bottom: 0;
    -moz-window-dragging: no-drag;
    
    transition: transform 0.1s 0.15s ease-in-out;
    margin: 0;
    padding: var(--zen-toolbox-padding) var(--zen-element-separation);
    width: 66px;

    &::before {
      content: "";
      position: absolute;
      max-width: 48px;
      inset: 0;
      margin-inline: auto;
      background: var(--zen-dialog-background);
      border-radius: calc(var(--zen-native-inner-radius) + var(--zen-element-separation) / 4);
      z-index: -1;
      outline: 1px solid var(--zen-colors-border-contrast);
      outline-offset: -1px;
      box-shadow: var(--zen-big-shadow);
      @media -moz-pref('zen.view.compact.color-sidebar') {
        background-image: var(--zen-main-browser-background-toolbar) !important;
        background-attachment: fixed !important;
        background-size: 2000px !important;
      }
      @media -moz-pref('zen.theme.acrylic-elements') {
        backdrop-filter: blur(42px) saturate(110%) brightness(0.25) contrast(100%) !important;
      }
    }
  }

  :root${sidebarRight}${compactMode} #sb2-main {
    margin-right: -12px !important;
    right: 0;
    transform: translateX(calc(100% - var(--zen-element-separation)));

    &::after {
      right: calc(var(--zen-toolbox-padding) * 0.5);
    }
  }

  :root${sidebarLeft}${compactMode} #sb2-main {
    margin-left: -12px !important;
    left: 0;
    transform: translateX(calc(-100% + var(--zen-element-separation)));

    &::after {
      left: calc(var(--zen-toolbox-padding) * 0.5);
    }
  }

  :root${compactMode}${singleToolbar} #sb2-main {
    position: fixed;
    top: var(--zen-toolbox-padding);
    bottom: var(--zen-toolbox-padding);    
  }
  :root${compactMode}${singleToolbar}${sidebarLeft} #sb2-main {
    margin-left: calc(var(--zen-toolbox-padding) * -1) !important;
  }
  :root${compactMode}${singleToolbar}${sidebarRight} #sb2-main {
    margin-right: calc(var(--zen-toolbox-padding) * -1) !important;
  }

  #main-window:has(#sb2-main-menupopup[panelopen]) #sb2-main,
  #main-window:has(#sb2-main-popup-settings[panelopen]) #sb2-main,
  #main-window:has(#sb2-web-panel-new[panelopen]) #sb2-main,
  #main-window:has(#sb2-web-panel-edit[panelopen]) #sb2-main,
  #main-window:has(#sb2-web-panel-delete[panelopen]) #sb2-main,
  #main-window:has(#sb2-web-panel-button-menupopup[panelopen]) #sb2-main,  
  :root${compactMode}:not(:has(#sb2[type="split"])):has(#sb2-box:not([hidden="true"])) #sb2-main,
  :root${compactMode} #sb2-main:hover,
  :root${compactMode} #sb2-main[has-hover],
  :root${compactMode} #sb2-main[has-drag-over],
  :root${compactMode} #sb2-main:focus-within {
    transform: translateX(0) !important;
    transition: transform 0.1s ease-in-out;
  }

  .sb2-main-button {
    position: relative;
    padding: 0;

    .sb2-sound-icon {
      position: relative;
      display: none;
      height: 16px;
      width: 16px;
      top: calc(var(--toolbarbutton-inner-padding) + 2px);
      right: calc(-1 * var(--toolbarbutton-inner-padding) - 2px);
      padding: 2px;
      background-position: center;
      background-repeat: no-repeat;
      border-radius: var(--border-radius-circle);
      background-color: color-mix(in srgb, var(--toolbar-bgcolor) 50%, transparent);
      fill: var(--toolbar-color);

      &[soundplaying] {
        display: flex;
        background-image: url("chrome://browser/skin/tabbrowser/tab-audio-playing-small.svg");
      }

      &[muted] {
        display: flex;
        background-image: url("chrome://browser/skin/tabbrowser/tab-audio-muted-small.svg");
      }

      &[hidden] {
        display: none;
      }
    }

    .sb2-notification-badge {
      display: none;
      position: relative;
      justify-content: center;
      align-items: center;
      width: 16px;
      height: 16px;
      top: calc(-1 * var(--toolbarbutton-inner-padding) - 2px);
      right: calc(-1 * var(--toolbarbutton-inner-padding) - 2px);
      border-radius: var(--border-radius-circle);
      background-color: color-mix(in srgb, var(--toolbar-bgcolor) 50%, transparent);

      &[value] {
        display: flex;
      }

      &[hidden] {
        display: none;
      }

      span {
        color: var(--toolbar-color);
      }
    }
  }

  .sb2-main-button[unloaded="true"] {
    .toolbarbutton-icon {
      opacity: var(--toolbarbutton-disabled-opacity);
    }
  }

  #widget-overflow-fixed-list .sb2-main-button {
    padding: var(--arrowpanel-menuitem-padding);
  }

  :root${sidebarLeft} #sb2-collapse-button {
    list-style-image: url("chrome://userscripts/content/second_sidebar/icons/sidebar-left.svg");
  }

  :root${sidebarRight} #sb2-collapse-button {
    list-style-image: url("chrome://userscripts/content/second_sidebar/icons/sidebar-right.svg");
  }
`;
