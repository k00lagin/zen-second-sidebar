import { Img } from "./xul/img.mjs";
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
    this.webPanel.setButton(this);
    this.playingIcon = null;

    this.setIcon(webPanel.faviconURL);

    this.addEventListener("mousedown", (event) => {
      event.stopPropagation();
      if (event.button === 0) {
        SidebarController.switch(this.webPanel);
      } else if (event.button === 2) {
        SidebarController.webPanelPopupEdit.openPopup(this);
      }
    });
  }

  /**
   *
   * @returns {WebPanelButton}
   */
  showPlayingIcon() {
    if (this.playingIcon === null) {
      this.playingIcon = new Img({ classList: ["tab-icon-overlay"] })
        .setAttribute("role", "presentation")
        .setAttribute("soundplaying", "")
        .setAttribute("pinned", "");
      this.appendChild(this.playingIcon);
    }
    this.playingIcon.removeAttribute("hidden");
    return this;
  }

  /**
   *
   * @returns {WebPanelButton}
   */
  hidePlayingIcon() {
    if (this.playingIcon !== null) {
      this.playingIcon.setAttribute("hidden", "true");
    }
    return this;
  }

  /**
   *
   * @param {boolean} value
   * @returns {WebPanelButton}
   */
  setOpen(value) {
    this.element.open = value;
    return this;
  }
}
