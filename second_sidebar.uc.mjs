import { COMMON_CSS } from "./second_sidebar/css/common.mjs";
import { POPUP_CSS } from "./second_sidebar/css/popup.mjs";
import { SIDEBAR_BOX_CSS } from "./second_sidebar/css/sidebar_box.mjs";
import { SIDEBAR_CSS } from "./second_sidebar/css/sidebar.mjs";
import { SIDEBAR_MAIN_CSS } from "./second_sidebar/css/sidebar_main.mjs";
import { SidebarInjector } from "./second_sidebar/sidebar_injector.mjs";
import { WEB_PANEL_CSS } from "./second_sidebar/css/web_panel.mjs";
import { WEB_PANEL_POPUP_EDIT_CSS } from "./second_sidebar/css/web_panel_popup_edit.mjs";
import { WEB_PANEL_POPUP_NEW_CSS } from "./second_sidebar/css/web_panel_popup_new.mjs";

const TIMEOUT = 1000;

const STYLE =
  COMMON_CSS +
  SIDEBAR_MAIN_CSS +
  SIDEBAR_BOX_CSS +
  SIDEBAR_CSS +
  WEB_PANEL_CSS +
  POPUP_CSS +
  WEB_PANEL_POPUP_NEW_CSS +
  WEB_PANEL_POPUP_EDIT_CSS;

class SecondSidebar {
  constructor() {
    SidebarInjector.inject();
    this.decorate();
  }

  decorate() {
    const style = document.createElement("style");
    style.innerHTML = STYLE;
    document.querySelector("head").appendChild(style);
  }
}

var interval = setInterval(() => {
  if (document.querySelector("#browser")) {
    window.secondSidebar = new SecondSidebar();
    clearInterval(interval);
  }
}, TIMEOUT);
