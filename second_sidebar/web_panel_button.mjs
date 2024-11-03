import { SidebarController } from "./sidebar_controller.mjs";
import { ToolbarButton } from "./xul/toolbar_button.mjs";
import { WebPanel } from "./web_panel.mjs";

export class WebPanelButton extends ToolbarButton {
  /**
   *
   * @param {WebPanel} webPanel
   */
  constructor(webPanel) {
    super({ classList: ["sidebar-2-main-button"] });
    this.webPanel = webPanel;
    this.setIcon(webPanel.faviconURL);

    this.addEventListener("mousedown", (event) => {
      event.stopPropagation();
      if (event.button === 0) {
        SidebarController.switch(this.webPanel);
      } else {
        SidebarController.webPanelPopupEdit.openPopup(this);
      }
    });
  }
}
