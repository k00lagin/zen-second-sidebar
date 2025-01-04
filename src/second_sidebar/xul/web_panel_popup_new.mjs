import {
  DEFAULT_USER_CONTEXT_ID,
  fillContainerMenuList,
} from "../utils/containers.mjs";
import {
  createCancelButton,
  createCreateButton,
  createInput,
  createPopupHeader,
  createPopupRow,
} from "../utils/xul.mjs";

import { HBox } from "./base/hbox.mjs";
import { MenuList } from "./base/menulist.mjs";
import { Panel } from "./base/panel.mjs";
import { PanelMultiView } from "./base/panel_multi_view.mjs";
import { ToolbarSeparator } from "./base/toolbar_separator.mjs";
import { isLeftMouseButton } from "../utils/buttons.mjs";

export class WebPanelPopupNew extends Panel {
  constructor() {
    super({
      id: "sb2-web-panel-new",
      classList: ["sb2-popup", "sb2-popup-with-header"],
    });
    this.setType("arrow").setRole("group");

    this.input = createInput();
    this.containerMenuList = new MenuList();

    this.saveButton = createCreateButton();
    this.cancelButton = createCancelButton();
    this.#compose();

    this.addEventListener("popupshown", () => {
      this.input.focus();
    });
  }

  #compose() {
    this.appendChild(
      new PanelMultiView().appendChildren(
        createPopupHeader("New Web Panel"),
        new ToolbarSeparator(),
        createPopupRow(this.input, this.containerMenuList),
        new HBox({
          id: "sb2-web-panel-new-buttons",
        }).appendChildren(this.cancelButton, this.saveButton),
        new HBox({
          id: "sb2-web-panel-new-buttons",
        }).appendChildren(this.cancelButton, this.saveButton),
      ),
    );
  }

  /**
   *
   * @param {function(string):void} callback
   * @returns {WebPanelPopupNew}
   */
  listenInputChange(callback) {
    this.input.addEventListener("keyup", (event) => {
      if (event.key === "Enter" || event.keyCode === 13) {
        callback(this.input.getValue());
      }
    });
    return this;
  }

  /**
   *
   * @param {function(string):void} callback
   * @returns {WebPanelPopupNew}
   */
  listenSaveButtonClick(callback) {
    this.saveButton.addEventListener("click", (event) => {
      if (isLeftMouseButton(event)) {
        callback(this.input.getValue(), this.containerMenuList.getValue());
      }
    });
  }

  /**
   *
   * @param {function(string):void} callback
   * @returns {WebPanelPopupNew}
   */
  listenCancelButtonClick(callback) {
    this.cancelButton.addEventListener("click", (event) => {
      if (isLeftMouseButton(event)) {
        callback(this.input.getValue());
      }
    });
  }

  /**
   *
   * @param {XULElement | Widget} target
   * @param {string} suggest
   * @returns {WebPanelPopupNew}
   */
  openPopup(target, suggest) {
    this.input.setValue(suggest);
    fillContainerMenuList(this.containerMenuList);
    this.containerMenuList.setValue(DEFAULT_USER_CONTEXT_ID);

    return Panel.prototype.openPopup.call(this, target);
  }
}
