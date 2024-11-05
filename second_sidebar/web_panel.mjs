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
   * @param {boolean} unloadOnClose
   */
  constructor(
    url,
    faviconURL,
    pinned = false,
    width = "400",
    unloadOnClose = false
  ) {
    super({ classList: ["web-panel"] });
    this.setDisableGlobalHistory("true").setType("content").setRemote("true");

    this.url = url;
    this.faviconURL = faviconURL;
    this.pinned = pinned;
    this.width = width;
    this.unloadOnClose = unloadOnClose;

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

  /**
   *
   * @returns {WebPanel}
   */
  show() {
    this.button.setOpen(true);
    return Browser.prototype.show.call(this);
  }

  /**
   *
   * @returns {WebPanel}
   */
  hide() {
    this.button.setOpen(false);
    if (this.unloadOnClose) {
      this.remove();
    }
    return Browser.prototype.hide.call(this);
  }
}
