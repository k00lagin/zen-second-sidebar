export const SIDEBAR_MAIN_CSS = `
  #sb2-main {
    display: flex;
    flex-direction: column;
    justify-content: var(--sb2-main-web-panel-buttons-position);
    gap: var(--space-small);
    padding: 0 var(--sb2-main-padding) var(--space-small) var(--sb2-main-padding);
    overflow-y: scroll;
    scrollbar-width: none;
    background-color: transparent;

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
    }

    .toolbarbutton-1 {
      padding: 0 !important;
    }
  }

  :root[customizing] {
    #sb2-main {
      min-width: unset !important;
    }
  }

  #browser:has(#sb2[position="right"]) #sb2-main {
    order: 7 !important;
    margin-left: calc(0.5 * var(--zen-element-separation));
    margin-right: calc(-0.5 * var(--zen-element-separation));
  }

  #browser:has(#sb2[position="left"]) #sb2-main {
    order: -3 !important;
    margin-left: calc(-0.5 * var(--zen-element-separation));
    margin-right: calc(0.5 * var(--zen-element-separation));
  }

  #zen-main-app-wrapper:has(+ #customization-container[hidden="true"]):has(#sb2[floating="true"]) #sb2-main {
    position: fixed;
    top: 32px;
    bottom: 32px;
    z-index: 99;
    background-color: var(--sidebar-background-color);
    box-shadow: var(--zen-big-shadow);
    outline: 1px solid var(--zen-colors-border-contrast);
    outline-offset: -1px;
    
    transition: transform 0.2s ease-in-out, opacity 0.1s linear;
    opacity: 0;
    margin: 0;
    padding-bottom: 0;
  }

  #zen-main-app-wrapper:has(+ #customization-container[hidden="true"]):has(#sb2[position="right"]):has(#sb2[floating="true"]) #sb2-main {
    right: -1px;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;

    transform: translateX(calc(100% - 4px));
  }

  #zen-main-app-wrapper:has(+ #customization-container[hidden="true"]):has(#sb2[position="left"]):has(#sb2[floating="true"]) #sb2-main {
    left: -1px;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;

    transform: translateX(calc(-100% + 4px));
  }

  #zen-main-app-wrapper:has(+ #customization-container[hidden="true"]):has(#sb2[floating="true"]:not([pinned="true"])):has(#sb2-box:not([hidden="true"])) #sb2-main,
  #zen-main-app-wrapper:has(+ #customization-container[hidden="true"]):has(#sb2[floating="true"]) #sb2-main:hover,
  #zen-main-app-wrapper:has(+ #customization-container[hidden="true"]):has(#sb2[floating="true"]) #sb2-main:focus-within {
    transform: translateX(0) !important;
    opacity: 1;
  }

  .sb2-main-button {
    position: relative;
    padding: 0;

    .tab-icon-overlay {
      position: absolute !important;
      width: var(--sb2-main-button-icon-overlay-size) !important;
      height: var(--sb2-main-button-icon-overlay-size) !important;
      padding: 0px !important;
      margin: 0px !important;
      top: 0 !important;
      right: 0 !important;
    }

    .tab-icon-overlay[hidden="true"] {
      display: none !important;
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
`;
