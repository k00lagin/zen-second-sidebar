/* eslint-disable no-unused-vars */
import {
  createCancelButton,
  createPopupGroup,
  createSaveButton,
} from "../utils/xul.mjs";

import { MenuList } from "./base/menulist.mjs";
import { Panel } from "./base/panel.mjs";
import { PanelMultiView } from "./base/panel_multi_view.mjs";
import { PopupBody } from "./popup_body.mjs";
import { PopupFooter } from "./popup_footer.mjs";
import { PopupHeader } from "./popup_header.mjs";
import { SidebarSettings } from "../settings/sidebar_settings.mjs";
import { Toggle } from "./base/toggle.mjs";
import { ToolbarSeparator } from "./base/toolbar_separator.mjs";
import { isLeftMouseButton } from "../utils/buttons.mjs";

/* eslint-enable no-unused-vars */

export class SidebarMainPopupSettings extends Panel {
  constructor() {
    super({
      id: "sb2-main-popup-settings",
      classList: ["sb2-popup", "sb2-popup-with-header"],
    });
    this.setType("arrow").setRole("group");

    this.positionMenuList = this.#createPositionMenuList();
    this.newWebPanelPositionMenuList =
      this.#createNewWebPanelPositionMenuList();
    this.hideInPopupWindowsToggle = new Toggle();
    this.autoHideBackToggle = new Toggle();
    this.autoHideForwardToggle = new Toggle();
    this.containerBorderMenuList = this.#createContainerBorderMenuList();
    this.autoHideSidebarToggle = new Toggle();
    this.hideSidebarAnimatedToggle = new Toggle();
    this.saveButton = createSaveButton();
    this.cancelButton = createCancelButton();
    this.#compose();
  }

  /**
   *
   * @returns {MenuList}
   */
  #createPositionMenuList() {
    const menuList = new MenuList();
    menuList.appendItem("Left", "left");
    menuList.appendItem("Right", "right");
    return menuList;
  }

  /**
   *
   * @returns {MenuList}
   */
  #createNewWebPanelPositionMenuList() {
    const menuList = new MenuList();
    menuList.appendItem("Before Plus Button", "before");
    menuList.appendItem("After Plus Button", "after");
    return menuList;
  }

  /**
   *
   * @returns {MenuList}
   */
  #createContainerBorderMenuList() {
    const menuList = new MenuList();
    menuList.appendItem("Left", "left");
    menuList.appendItem("Right", "right");
    menuList.appendItem("Top", "top");
    menuList.appendItem("Bottom", "bottom");
    menuList.appendItem("Around", "around");
    return menuList;
  }

  #compose() {
    this.appendChild(
      new PanelMultiView().appendChildren(
        new PopupHeader("Sidebar Settings"),
        new PopupBody().appendChildren(
          // createPopupGroup("Sidebar position", this.positionMenuList),
          // createPopupGroup("Auto-hide sidebar", this.autoHideSidebarToggle),
          // createPopupGroup(
          //   "Animate sidebar hiding",
          //   this.hideSidebarAnimatedToggle,
          // ),
          // new ToolbarSeparator(),
          createPopupGroup(
            "New web panel position",
            this.newWebPanelPositionMenuList,
          ),
          createPopupGroup(
            "Container indicator position",
            this.containerBorderMenuList,
          ),
          new ToolbarSeparator(),
          createPopupGroup(
            "Hide sidebar in popup windows",
            this.hideInPopupWindowsToggle,
          ),
          createPopupGroup("Auto hide back button", this.autoHideBackToggle),
          createPopupGroup(
            "Auto hide forward button",
            this.autoHideForwardToggle,
          ),
        ),
        new PopupFooter().appendChildren(this.cancelButton, this.saveButton),
      ),
    );
  }

  /**
   *
   * @param {object} callbacks
   * @param {function(string):void} callbacks.position
   * @param {function(string):void} callbacks.newWebPanelPosition
   * @param {function(boolean):void} callbacks.hideInPopupWindows
   * @param {function(boolean):void} callbacks.autoHideBackButton
   * @param {function(boolean):void} callbacks.autoHideForwardButton
   * @param {function(boolean):void} callbacks.containerBorder
   * @param {function(boolean):void} callbacks.autoHideSidebar
   * @param {function(boolean):void} callbacks.hideSidebarAnimated
   */
  listenChanges({
    position,
    newWebPanelPosition,
    hideInPopupWindows,
    autoHideBackButton,
    autoHideForwardButton,
    containerBorder,
    autoHideSidebar,
    hideSidebarAnimated,
  }) {
    this.onPositionChange = position;
    this.onNewWebPanelPositionChange = newWebPanelPosition;
    this.onHideInPopupWindowsChange = hideInPopupWindows;
    this.onAutoHideBackButtonChange = autoHideBackButton;
    this.onAutoHideForwardButtonChange = autoHideForwardButton;
    this.onContainerBorderChange = containerBorder;
    this.onAutoHideSidebarChange = autoHideSidebar;
    this.onAutoHideSidebarAnimatedChange = hideSidebarAnimated;

    this.positionMenuList.addEventListener("command", () =>
      position(this.positionMenuList.getValue()),
    );
    this.newWebPanelPositionMenuList.addEventListener("command", () =>
      newWebPanelPosition(this.newWebPanelPositionMenuList.getValue()),
    );
    this.hideInPopupWindowsToggle.addEventListener("toggle", () =>
      hideInPopupWindows(this.hideInPopupWindowsToggle.getPressed()),
    );
    this.autoHideBackToggle.addEventListener("toggle", () =>
      autoHideBackButton(this.autoHideBackToggle.getPressed()),
    );
    this.autoHideForwardToggle.addEventListener("toggle", () =>
      autoHideForwardButton(this.autoHideForwardToggle.getPressed()),
    );
    this.containerBorderMenuList.addEventListener("command", () =>
      containerBorder(this.containerBorderMenuList.getValue()),
    );
    this.autoHideSidebarToggle.addEventListener("toggle", () =>
      autoHideSidebar(this.autoHideSidebarToggle.getPressed()),
    );
    this.hideSidebarAnimatedToggle.addEventListener("toggle", () =>
      hideSidebarAnimated(this.hideSidebarAnimatedToggle.getPressed()),
    );
  }

  /**
   *
   * @param {function():void} callback
   */
  listenCancelButtonClick(callback) {
    this.cancelButton.addEventListener("click", (event) => {
      if (isLeftMouseButton(event)) {
        callback();
      }
    });
  }

  /**
   *
   * @param {function():void} callback
   */
  listenSaveButtonClick(callback) {
    this.saveButton.addEventListener("click", (event) => {
      if (isLeftMouseButton(event)) {
        this.removeEventListener("popuphidden", this.onPopupHidden);
        callback();
      }
    });
  }

  /**
   *
   * @param {number} screenX
   * @param {number} screenY
   * @param {SidebarSettings} settings
   */
  openPopupAtScreen(screenX, screenY, settings) {
    this.positionMenuList.setValue(settings.position);
    this.newWebPanelPositionMenuList.setValue(settings.newWebPanelPosition);
    this.hideInPopupWindowsToggle.setPressed(settings.hideInPopupWindows);
    this.autoHideBackToggle.setPressed(settings.autoHideBackButton);
    this.autoHideForwardToggle.setPressed(settings.autoHideForwardButton);
    this.containerBorderMenuList.setValue(settings.containerBorder);
    this.autoHideSidebarToggle.setPressed(settings.autoHideSidebar);
    this.hideSidebarAnimatedToggle.setPressed(settings.hideSidebarAnimated);

    this.settings = settings;

    this.onPopupHidden = () => {
      if (this.getState() !== "closed") {
        return;
      }
      this.#cancelChanges();
      this.removeEventListener("popuphidden", this.onPopupHidden);
    };
    this.addEventListener("popuphidden", this.onPopupHidden);

    Panel.prototype.openPopupAtScreen.call(this, screenX, screenY);
  }

  #cancelChanges() {
    if (this.positionMenuList.getValue() !== this.settings.position) {
      this.onPositionChange(this.settings.position);
    }
    if (
      this.newWebPanelPositionMenuList.getValue() !==
      this.settings.newWebPanelPosition
    ) {
      this.onNewWebPanelPositionChange(this.settings.newWebPanelPosition);
    }
    if (
      this.hideInPopupWindowsToggle.getPressed() !==
      this.settings.hideInPopupWindows
    ) {
      this.onHideInPopupWindowsChange(this.settings.hideInPopupWindows);
    }
    if (
      this.autoHideBackToggle.getPressed() !== this.settings.autoHideBackButton
    ) {
      this.onAutoHideBackButtonChange(this.settings.autoHideBackButton);
    }
    if (
      this.autoHideForwardToggle.getPressed() !==
      this.settings.autoHideForwardButton
    ) {
      this.onAutoHideForwardButtonChange(this.settings.autoHideForwardButton);
    }
    if (
      this.containerBorderMenuList.getValue() !== this.settings.containerBorder
    ) {
      this.onContainerBorderChange(this.settings.containerBorder);
    }
    if (
      this.autoHideSidebarToggle.getPressed() !== this.settings.autoHideSidebar
    ) {
      this.onAutoHideSidebarChange(this.settings.autoHideSidebar);
    }
    if (
      this.hideSidebarAnimatedToggle.getPressed() !==
      this.settings.hideSidebarAnimated
    ) {
      this.onAutoHideSidebarAnimatedChange(this.settings.hideSidebarAnimated);
    }
  }
}
