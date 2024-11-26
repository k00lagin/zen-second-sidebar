import { Sidebar } from "../xul/sidebar.mjs";
import { SidebarBox } from "../xul/sidebar_box.mjs";
import { SidebarMoreMenuPopup } from "../xul/sidebar_more_menupopup.mjs";
import { SidebarSettings } from "../settings/sidebar_settings.mjs";
import { SidebarSplitterUnpinned } from "../xul/sidebar_splitter_unpinned.mjs";
import { SidebarToolbar } from "../xul/sidebar_toolbar.mjs";
import { WebPanelsController } from "./web_panels.mjs";

export class SidebarController {
  /**
   *
   * @param {SidebarBox} sidebarBox
   * @param {Sidebar} sidebar
   * @param {SidebarToolbar} sidebarToolbar
   * @param {SidebarMoreMenuPopup} sidebarMoreMenuPopup
   * @param {SidebarSplitterUnpinned} sidebarSplitterUnpinned
   */
  constructor(
    sidebarBox,
    sidebar,
    sidebarToolbar,
    sidebarMoreMenuPopup,
    sidebarSplitterUnpinned
  ) {
    this.sidebarBox = sidebarBox;
    this.sidebar = sidebar;
    this.sidebarToolbar = sidebarToolbar;
    this.sidebarMoreMenuPopup = sidebarMoreMenuPopup;
    this.sidebarToolbar.setMoreButtonMenuPopup(sidebarMoreMenuPopup);
    this.sidebarSplitterUnpinned = sidebarSplitterUnpinned;
    this.#setupListeners();

    this.hideInPopupWindows = false;
    this.autoHideBackButton = false;
    this.autoHideForwardButton = false;
  }

  /**
   *
   * @param {WebPanelsController} webPanelsController
   */
  setupDepenedencies(webPanelsController) {
    this.webPanelsController = webPanelsController;
  }

  #setupListeners() {
    /** @param {MouseEvent} event */
    this.onClickOutsideWhileUnpinned = (event) => {
      if (
        !this.sidebar.getXUL().contains(event.target) &&
        !this.sidebarSplitterUnpinned.getXUL().contains(event.target) &&
        !["menuitem", "menupopup"].includes(event.target.tagName) &&
        (document.contains(event.target) ||
          event.target.baseURI ===
            "chrome://browser/content/webext-panels.xhtml")
      ) {
        this.close();
      }
    };

    const addWebPanelButtonListener = (event, callback) => {
      if (event.button !== 0) {
        return;
      }
      const webPanelController = this.webPanelsController.getActive();
      callback(webPanelController.webPanel);
    };

    this.sidebarToolbar.listenBackButtonClick((event) => {
      addWebPanelButtonListener(event, (webPanel) => webPanel.goBack());
    });
    this.sidebarToolbar.listenForwardButtonClick((event) => {
      addWebPanelButtonListener(event, (webPanel) => webPanel.goForward());
    });
    this.sidebarToolbar.listenReloadButtonClick((event) => {
      addWebPanelButtonListener(event, (webPanel) => webPanel.reload());
    });
    this.sidebarToolbar.listenHomeButtonClick((event) => {
      addWebPanelButtonListener(event, (webPanel) => webPanel.goHome());
    });

    this.sidebarMoreMenuPopup.listenOpenInNewTabItemClick((event) => {
      addWebPanelButtonListener(event, (webPanel) => {
        openTrustedLinkIn(
          webPanel.getCurrentUrl(),
          event.ctrlKey ? "tabshifted" : "tab"
        );
      });
    });

    this.sidebarMoreMenuPopup.listenCopyPageUrlItemClick((event) => {
      addWebPanelButtonListener(event, (webPanel) => {
        Cc["@mozilla.org/widget/clipboardhelper;1"]
          .getService(Ci.nsIClipboardHelper)
          .copyString(webPanel.getCurrentUrl());
      });
    });

    this.sidebarToolbar.listenPinButtonClick(() => {
      const webPanelController = this.webPanelsController.getActive();
      if (webPanelController.pinned()) {
        webPanelController.unpin();
        this.unpin();
      } else {
        webPanelController.pin();
        this.pin();
      }
      this.webPanelsController.save();
    });

    this.sidebarToolbar.listenCloseButtonClick(() => {
      const webPanelController = this.webPanelsController.getActive();
      webPanelController.unload();
      this.close();
    });
  }

  /**
   *
   * @param {boolean} pinned
   * @param {number} width
   * @param {boolean} canGoBack
   * @param {boolean} canGoForward
   * @param {string} title
   */
  open(pinned, width, canGoBack, canGoForward, title) {
    this.sidebarBox.show();
    this.setWidth(width);
    this.setToolbarBackButtonDisabled(!canGoBack);
    this.setToolbarForwardButtonDisabled(!canGoForward);
    this.setToolbarTitle(title);
    pinned ? this.pin() : this.unpin();
  }

  close() {
    this.sidebarBox.hide();
    this.unpin();
    this.webPanelsController.hideActive();
  }

  /**
   *
   * @returns {boolean}
   */
  closed() {
    return this.sidebarBox.hidden();
  }

  pin() {
    this.sidebar.pin();
    this.sidebarToolbar.changePinButton(true);
    document.removeEventListener("mousedown", this.onClickOutsideWhileUnpinned);
  }

  unpin() {
    this.sidebar.unpin();
    this.sidebarToolbar.changePinButton(false);
    document.addEventListener("mousedown", this.onClickOutsideWhileUnpinned);
  }

  /**
   *
   * @param {string} title
   */
  setToolbarTitle(title) {
    this.sidebarToolbar.setTitle(title);
  }

  /**
   *
   * @param {boolean} value
   */
  setToolbarBackButtonDisabled(value) {
    const button = this.sidebarToolbar.backButton;
    button.setDisabled(value);
    value && this.autoHideBackButton ? button.hide() : button.show();
  }

  /**
   *
   * @param {boolean} value
   */
  setToolbarForwardButtonDisabled(value) {
    const button = this.sidebarToolbar.forwardButton;
    button.setDisabled(value);
    value && this.autoHideForwardButton ? button.hide() : button.show();
  }

  /**
   *
   * @param {number} width
   */
  setWidth(width) {
    this.sidebarBox.setWidth(width);
    this.sidebar.setWidth(width);
  }

  /**
   *
   * @returns {number}
   */
  getSidebarWidth() {
    return this.sidebar.getWidth();
  }

  /**
   *
   * @returns {number}
   */
  getSidebarBoxWidth() {
    return this.sidebarBox.getWidth();
  }

  /**
   *
   * @param {string} position
   */
  setPosition(position) {
    this.sidebar.setPosition(position);
  }

  /**
   *
   * @returns {string}
   */
  getPosition() {
    return this.sidebar.getPosition();
  }

  /**
   *
   * @param {SidebarSettings} settings
   */
  loadSettings(settings) {
    this.setPosition(settings.position);
    this.hideInPopupWindows = settings.hideInPopupWindows;
    this.autoHideBackButton = settings.autoHideBackButton;
    this.autoHideForwardButton = settings.autoHideForwardButton;
  }

  saveSettings() {
    new SidebarSettings(
      this.getPosition(),
      this.hideInPopupWindows,
      this.autoHideBackButton,
      this.autoHideForwardButton
    ).save();
  }
}
