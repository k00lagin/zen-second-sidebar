import { SidebarController } from "./sidebar_controller.mjs";
import { ToolbarButton } from "./xul/toolbar_button.mjs";

export class WebPanelNewButton extends ToolbarButton {
  constructor() {
    super({
      classList: ["sidebar-2-main-button"],
    });

    this.setIcon("chrome://global/skin/icons/plus.svg")
      .setBadged("false")
      .addEventListener("mousedown", (event) => {
        if (event.button !== 0) {
          return;
        }
        SidebarController.webPanelPopupNew.openPopup(this);
      });
  }
}
