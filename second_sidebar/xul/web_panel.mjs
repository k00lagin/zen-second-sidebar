import { Browser } from "./base/browser.mjs";
import { WebPanelTab } from "./web_panel_tab.mjs";

/**
 *
 * @param {WebPanelTab} webPanelTab
 * @returns {HTMLElement}
 */
const createBrowserForTab = (webPanelTab) => {
  const result = gBrowser._createBrowserForTab(webPanelTab.getXUL(), {});
  return result.browser;
};

export class WebPanel extends Browser {
  /**
   *
   * @param {WebPanelTab} webPanelTab
   * @param {string} uuid
   * @param {string} url
   * @param {string} faviconURL
   * @param {boolean} pinned
   * @param {string} width
   * @param {boolean} loadOnStartup
   * @param {boolean} unloadOnClose
   * @param {object} params
   *
   */
  constructor(
    webPanelTab,
    uuid,
    url,
    faviconURL,
    pinned,
    width,
    loadOnStartup,
    unloadOnClose
  ) {
    super({
      classList: ["web-panel"],
      element: createBrowserForTab(webPanelTab),
    });
    this.setUUID(uuid)
      .setDisableGlobalHistory("true")
      .setType("content")
      .setRemote("true");

    this.uuid = uuid;
    this.url = url;
    this.faviconURL = faviconURL;
    this.pinned = pinned;
    this.width = width;
    this.loadOnStartup = loadOnStartup;
    this.unloadOnClose = unloadOnClose;

    this.listener = null;
  }

  /**
   *
   * @param {string} uuid
   * @returns {WebPanel}
   */
  setUUID(uuid) {
    return this.setAttribute("uuid", uuid);
  }

  /**
   *
   * @returns {boolean}
   */
  isActive() {
    return !this.hidden();
  }

  /**
   *
   * @param {function(boolean):void} callback
   * @returns {WebPanel}
   */
  listenPlaybackStateChange(callback) {
    const mediaController = this.element.browsingContext.mediaController;
    mediaController.onplaybackstatechange = () => {
      callback(mediaController.isPlaying);
    };
    return this;
  }

  /**
   *
   * @param {function():void} callback
   * @returns {WebPanel}
   */
  listenBrowserProgressListener(callback) {
    this.listener = {
      QueryInterface: ChromeUtils.generateQI([
        "nsIWebProgressListener",
        "nsISupportsWeakReference",
      ]),
      onLocationChange: callback,
      onStateChange: callback,
      onProgressChange: callback,
      onStatusChange: callback,
    };
    this.addProgressListener(this.listener);
    return this;
  }

  /**
   *
   * @returns {WebPanel}
   */
  goHome() {
    return this.go(this.url);
  }
}
