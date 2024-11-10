import { SidebarController } from "./sidebar.mjs";
import { WebPanel } from "../xul/web_panel.mjs";
import { WebPanelButton } from "../xul/web_panel_button.mjs";
import { WebPanelButtons } from "../xul/web_panel_buttons.mjs";
import { WebPanelController } from "./web_panel.mjs";
import { WebPanelEditController } from "./web_panel_edit.mjs";
import { WebPanels } from "../xul/web_panels.mjs";

const PREF = "second-sidebar.web-panels";

export class WebPanelsController {
  /**
   *
   * @param {WebPanels} webPanels
   * @param {WebPanelButtons} webPanelButtons
   */
  constructor(webPanels, webPanelButtons) {
    this.webPanels = webPanels;
    this.webPanelButtons = webPanelButtons;

    /**@type {Array<WebPanelController>} */
    this.webPanelControllers = [];

    /**@type {Object<string, WebPanelController>} */
    this.webPanelControllersMap = {};
  }

  /**
   *
   * @param {SidebarController} sidebarController
   * @param {WebPanelEditController} webPanelEditController
   */
  setupDependencies(sidebarController, webPanelEditController) {
    this.sidebarController = sidebarController;
    this.webPanelEditController = webPanelEditController;
  }

  /**
   *
   * @param {WebPanelController} webPanelController
   */
  add(webPanelController) {
    this.webPanelControllers.push(webPanelController);
    this.webPanelControllersMap[webPanelController.getUUID()] =
      webPanelController;
  }

  /**
   *
   * @param {string} uuid
   * @returns {WebPanelController?}
   */
  get(uuid) {
    return this.webPanelControllersMap[uuid] ?? null;
  }

  /**
   *
   * @returns {WebPanelController?}
   */
  getActive() {
    return (
      Object.values(this.webPanelControllers).find((webPanelController) =>
        webPanelController.webPanel.isActive()
      ) ?? null
    );
  }

  /**
   *
   * @param {WebPanel} webPanel
   * @returns {boolean}
   */
  isWebPanelInjected(webPanel) {
    return this.webPanels.contains(webPanel);
  }

  /**
   *
   * @param {WebPanel} webPanel
   * @returns {boolean}
   */
  injectWebPanel(webPanel) {
    if (this.isWebPanelInjected(webPanel)) {
      return false;
    }
    this.webPanels.appendChild(webPanel);
    return true;
  }

  /**
   *
   * @param {WebPanelButton} webPanelButton
   * @returns {boolean}
   */
  isWebPanelButtonInjected(webPanelButton) {
    return this.webPanelButtons.contains(webPanelButton);
  }

  /**
   *
   * @param {WebPanelButton} webPanelButton
   */
  injectWebPanelButton(webPanelButton) {
    if (this.isWebPanelButtonInjected(webPanelButton)) {
      return false;
    }
    this.webPanelButtons.appendChild(webPanelButton);
    return true;
  }

  hideActive() {
    const webPanelController = this.getActive();
    if (webPanelController !== null) {
      webPanelController.hide();
    }
  }

  /**
   *
   * @param {string} uuid
   * @returns {boolean}
   */
  getIndex(uuid) {
    return this.webPanelControllers.findIndex(
      (webPanelController) => webPanelController.getUUID() === uuid
    );
  }

  /**
   *
   * @param {string} uuid
   */
  delete(uuid) {
    const index = this.getIndex(uuid);
    if (index !== -1) {
      this.webPanelControllers.splice(index, 1);
      delete this.webPanelControllersMap[uuid];
    }
  }

  /**
   *
   * @param {string} uuid
   * @returns {boolean}
   */
  isFirst(uuid) {
    return this.getIndex(uuid) === 0;
  }

  /**
   *
   * @param {string} uuid
   * @returns {boolean}
   */
  isLast(uuid) {
    return this.getIndex(uuid) === this.webPanelControllers.length - 1;
  }

  /**
   *
   * @param {string} uuid
   */
  moveUp(uuid) {
    const index = this.getIndex(uuid);
    if (index !== -1) {
      const [webPanelController] = this.webPanelControllers.splice(index, 1);
      this.webPanelControllers.splice(index - 1, 0, webPanelController);

      this.webPanelButtons.element.insertBefore(
        webPanelController.webPanelButton.element,
        webPanelController.webPanelButton.element.previousSibling
      );
    }
  }

  /**
   *
   * @param {string} uuid
   */
  moveDown(uuid) {
    const index = this.getIndex(uuid);
    if (index !== -1) {
      const [webPanelController] = this.webPanelControllers.splice(index, 1);
      this.webPanelControllers.splice(index + 1, 0, webPanelController);

      this.webPanelButtons.element.insertBefore(
        webPanelController.webPanelButton.element.nextSibling,
        webPanelController.webPanelButton.element
      );
    }

    return this;
  }

  /**
   *
   * @param {object} webPanelPref
   * @returns {WebPanel}
   */
  #makeWebPanel(webPanelPref) {
    return new WebPanel(
      webPanelPref.uuid ?? crypto.randomUUID(),
      webPanelPref.url,
      webPanelPref.faviconURL,
      webPanelPref.pinned ?? true,
      webPanelPref.width ?? "400",
      webPanelPref.loadOnStartup ?? false,
      webPanelPref.unloadOnClose ?? false
    ).hide();
  }

  /**
   *
   * @param {WebPanel} webPanel
   * @returns {WebPanelButton}
   */
  #makeWebPanelButton(webPanel) {
    return new WebPanelButton(webPanel.uuid)
      .setIcon(webPanel.faviconURL)
      .setUnloaded(!webPanel.loadOnStartup);
  }

  /**
   *
   * @param {WebPanel} webPanel
   * @param {WebPanelButton} webPanelButton
   * @returns {WebPanelController}
   */
  #makeWebPanelController(webPanel, webPanelButton) {
    return new WebPanelController(
      webPanel,
      webPanelButton,
      this,
      this.sidebarController,
      this.webPanelEditController
    );
  }

  load() {
    const prefs = Services.prefs.prefHasUserValue(PREF)
      ? JSON.parse(Services.prefs.getStringPref(PREF))
      : [];
    for (const webPanelPref of prefs) {
      const webPanel = this.#makeWebPanel(webPanelPref);
      const webPanelButton = this.#makeWebPanelButton(webPanel);
      const webPanelController = this.#makeWebPanelController(
        webPanel,
        webPanelButton
      );

      if (webPanel.loadOnStartup) {
        this.injectWebPanel(webPanel);
        webPanelController.initWebPanel();
      }

      this.injectWebPanelButton(webPanelButton);
      webPanelController.initWebPanelButton();

      this.add(webPanelController);
    }
  }

  save() {
    const prefs = [];
    for (const webPanelController of this.webPanelControllers) {
      const webPanel = webPanelController.webPanel;
      prefs.push({
        uuid: webPanel.uuid,
        url: webPanel.url,
        faviconURL: webPanel.faviconURL,
        pinned: webPanel.pinned,
        width: webPanel.width,
        loadOnStartup: webPanel.loadOnStartup,
        unloadOnClose: webPanel.unloadOnClose,
      });
    }
    console.log("Saving prefs: ", prefs);
    Services.prefs.setStringPref(PREF, JSON.stringify(prefs));
  }
}
