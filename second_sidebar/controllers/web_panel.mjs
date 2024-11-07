import { SidebarController } from "./sidebar.mjs";
import { WebPanel } from "../xul/web_panel.mjs";
import { WebPanelButton } from "../xul/web_panel_button.mjs";
import { WebPanelEditController } from "./web_panel_edit.mjs";
import { WebPanelsController } from "./web_panels.mjs";

export class WebPanelController {
  /**
   *
   * @param {WebPanel} webPanel
   * @param {WebPanelButton} webPanelButton
   * @param {WebPanelsController} webPanelsController
   * @param {SidebarController} sidebarController
   * @param {WebPanelEditController} webPanelEditController
   */
  constructor(
    webPanel,
    webPanelButton,
    webPanelsController,
    sidebarController,
    webPanelEditController
  ) {
    this.webPanel = webPanel;
    this.webPanelButton = webPanelButton;

    this.webPanelsController = webPanelsController;
    this.sidebarController = sidebarController;
    this.webPanelEditController = webPanelEditController;
  }

  /**
   *
   * @returns {string}
   */
  getUUID() {
    return this.webPanel.uuid;
  }

  initWebPanel() {
    this.webPanel.listenPlaybackStateChange((isPlaying) =>
      this.webPanelButton.setPlaying(isPlaying)
    );

    this.webPanel.listenBrowserProgressListener(() => {
      this.sidebarController.setToolbarBackButtonDisabled(
        !this.webPanel.canGoBack()
      );
      this.sidebarController.setToolbarForwardButtonDisabled(
        !this.webPanel.canGoForward()
      );
      if (this.webPanel.isActive()) {
        this.sidebarController.setToolbarTitle(this.webPanel.getTitle());
      }
    });

    this.webPanel.goHome();
  }

  initWebPanelButton() {
    const switchWebPanel = () => {
      if (this.webPanel.isActive()) {
        this.sidebarController.close();
        this.hide();
      } else {
        this.webPanelsController.hideActive();
        if (this.webPanelsController.injectWebPanel(this.webPanel)) {
          this.initWebPanel();
        }
        this.sidebarController.open(
          this.webPanel.pinned,
          this.webPanel.width,
          this.webPanel.canGoBack(),
          this.webPanel.canGoForward(),
          this.webPanel.getTitle()
        );
        this.show();
      }
    };

    const unloadWebPanel = () => {
      this.sidebarController.close();
      this.webPanel.remove();
      this.webPanelButton.setUnloaded(true);
    };

    const openWebPanelEditPopup = () => {
      this.webPanelEditController.openPopup(this);
    };

    this.webPanelButton.listenClick((event) => {
      if (event.button === 0) {
        switchWebPanel();
      } else if (event.button === 1) {
        unloadWebPanel();
      } else if (event.button === 2) {
        openWebPanelEditPopup();
      }
    });
  }

  show() {
    this.webPanel.show();
    this.webPanelButton.setOpen(true);
    this.webPanelButton.setUnloaded(false);
  }

  unload() {
    this.webPanel.remove();
    this.webPanelButton.setUnloaded(true);
    this.webPanelButton.hidePlayingIcon();
  }

  hide() {
    this.webPanel.hide();
    if (this.webPanel.unloadOnClose) {
      this.unload();
    }
    this.webPanelButton.setOpen(false);
  }

  /**
   *
   * @returns {boolean}
   */
  isFirst() {
    return this.webPanelsController.isFirst(this.getUUID());
  }

  /**
   *
   * @returns {boolean}
   */
  isLast() {
    return this.webPanelsController.isLast(this.getUUID());
  }

  /**
   *
   * @param {number} width
   */
  setWidth(width) {
    this.webPanel.width = width;
  }

  /**
   *
   * @returns {boolean}
   */
  pinned() {
    return this.webPanel.pinned;
  }

  pin() {
    this.webPanel.pinned = true;
  }

  unpin() {
    this.webPanel.pinned = false;
  }

  /**
   *
   * @param {string} url
   * @param {string} faviconURL
   * @param {boolean} loadOnStartup
   * @param {boolean} unloadOnClose
   */
  set(url, faviconURL, loadOnStartup, unloadOnClose) {
    this.webPanel.url = url;
    this.webPanel.faviconURL = faviconURL;
    this.webPanel.loadOnStartup = loadOnStartup;
    this.webPanel.unloadOnClose = unloadOnClose;
    this.webPanelButton.setIcon(faviconURL);
  }

  /**
   *
   * @returns {boolean}
   */
  isActive() {
    return this.webPanel.isActive();
  }

  remove() {
    this.webPanel.remove();
    this.webPanelButton.remove();
  }
}
