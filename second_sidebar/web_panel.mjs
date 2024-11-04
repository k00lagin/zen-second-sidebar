import { Browser } from "./xul/browser.mjs";
import { SidebarController } from "./sidebar_controller.mjs";
import { WebPanelButton } from "./web_panel_button.mjs";

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
    this.button = null;

    this.listener = null;
  }

  /**
   *
   * @param {WebPanelButton} button
   * @returns {WebPanel}
   */
  setButton(button) {
    this.button = button;
    return this;
  }

  startListening() {
    const update = () => {
      this.updateButtons();

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
      onLocationChange: update,
      onStateChange: update,
      onProgressChange: update,
      onStatusChange: update,
    };
    this.element.addProgressListener(this.listener, null);

    const mediaController = this.element.browsingContext.mediaController;
    mediaController.addEventListener("playbackstatechange", () => {
      if (mediaController.isPlaying) {
        this.button.showPlayingIcon();
      } else {
        this.button.hidePlayingIcon();
      }
    });
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

  /**
   *
   * @returns {WebPanel}
   */
  updateButtons() {
    SidebarController.sidebarToolbar.backButton.setDisabled(
      !this.element.canGoBack
    );
    SidebarController.sidebarToolbar.forwardButton.setDisabled(
      !this.element.canGoForward
    );
    return this;
  }
}
