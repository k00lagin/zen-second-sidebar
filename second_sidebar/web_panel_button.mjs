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

    this.#fetchIconURL((iconURL) => this.setIcon(iconURL));

    this.addEventListener("mousedown", (event) => {
      event.stopPropagation();
      if (event.button === 0) {
        SidebarController.switch(this.webPanel);
      } else {
        SidebarController.webPanelPopupEdit.openPopup(this);
      }
    });
  }

  /**
   *
   * @param {function(string):void} callback
   */
  async #fetchIconURL(callback) {
    const url = this.webPanel.url;
    const uri = NetUtil.newURI(url);
    Favicons.setDefaultIconURIPreferredSize(32);
    Favicons.getFaviconURLForPage(uri, (faviconURI) => {
      let faviconURL = faviconURI?.spec;
      let provider = null;
      if (typeof faviconURL !== "undefined" && faviconURL !== null) {
        provider = "browser";
      } else {
        provider = "google";
        faviconURL = `https://www.google.com/s2/favicons?domain=${uri.host}&sz=32`;
      }
      console.log(`Got favicon for ${url} from ${provider}`);
      callback(faviconURL);
    });
  }

  /**
   *
   * @returns {WebPanelButton}
   */
  updateIcon() {
    this.#fetchIconURL((iconURL) => this.setIcon(iconURL));
    return this;
  }
}
