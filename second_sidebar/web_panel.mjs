import { Browser } from "./xul/browser.mjs";
import { SidebarController } from "./sidebar_controller.mjs";

export class WebPanel extends Browser {
  /**
   *
   * @param {string} url
   * @param {string} faviconURL
   * @param {boolean} pinned
   * @param {string} width
   */
  constructor(url, faviconURL, pinned = true, width = "400") {
    super({ classList: ["web-panel"] });
    this.setDisableGlobalHistory("true").setType("content").setRemote("true");
    this.url = url;
    this.faviconURL = faviconURL;
    this.pinned = pinned;
    this.width = width;

    this.listener = null;
  }

  startListening() {
    const fetchTitle = () => {
      const activeWebPanel = SidebarController.webPanels.getActive();
      if (activeWebPanel === this) {
        SidebarController.sidebarToolbar.setTitle(this.getTitle());
      }
    };
    this.listener = {
      QueryInterface: ChromeUtils.generateQI([
        "nsIWebProgressListener",
        "nsISupportsWeakReference",
      ]),
      onLocationChange: fetchTitle,
      onStateChange: fetchTitle,
      onProgressChange: fetchTitle,
      onStatusChange: fetchTitle,
    };
    this.element.addProgressListener(this.listener, null);
  }

  /**
   *
   * @returns {WebPanel}
   */
  goHome() {
    return this.go(this.url);
  }

  /**
   *
   * @returns {WebPanel}
   */
  remove() {
    SidebarController.webPanels.delete(this);
    return Browser.prototype.remove.call(this);
  }

  /**
   *
   * @param {string} url
   * @returns {WebPanel}
   */
  changeURL(url) {
    const oldURL = this.url;
    this.url = url;
    SidebarController.webPanels.move(oldURL, url, this);
    return this;
  }
}
