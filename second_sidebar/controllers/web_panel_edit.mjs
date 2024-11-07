import { SidebarController } from "./sidebar.mjs";
import { WebPanelController } from "./web_panel.mjs";
import { WebPanelPopupEdit } from "../xul/web_panel_popup_edit.mjs";
import { WebPanelsController } from "./web_panels.mjs";

export class WebPanelEditController {
  /**
   *
   * @param {WebPanelPopupEdit} webPanelPopupEdit
   */
  constructor(webPanelPopupEdit) {
    this.webPanelPopupEdit = webPanelPopupEdit;
    this.#setupListeners();
  }

  /**
   *
   * @param {WebPanelsController} webPanelsController
   * @param {SidebarController} sidebarController
   */
  setupDependencies(webPanelsController, sidebarController) {
    this.webPanelsController = webPanelsController;
    this.sidebarController = sidebarController;
  }

  #setupListeners() {
    this.webPanelPopupEdit.listenMoveUpButtonClick((uuid) => {
      const webPanelController = this.webPanelsController.get(uuid);
      this.webPanelsController.moveUp(uuid);
      this.hidePopup();
      this.openPopup(webPanelController);
      this.webPanelsController.save();
    });

    this.webPanelPopupEdit.listenMoveDownButtonClick((uuid) => {
      const webPanelController = this.webPanelsController.get(uuid);
      this.webPanelsController.moveDown(uuid);
      this.hidePopup();
      this.openPopup(webPanelController);
      this.webPanelsController.save();
    });

    this.webPanelPopupEdit.listenSaveButtonClick(
      (uuid, url, faviconURL, loadOnStartup, unloadOnClose) => {
        const webPanelController = this.webPanelsController.get(uuid);
        webPanelController.set(url, faviconURL, loadOnStartup, unloadOnClose);
        this.hidePopup();
        if (unloadOnClose && !webPanelController.isActive()) {
          webPanelController.unload();
        }
        this.webPanelsController.save();
      }
    );

    this.webPanelPopupEdit.listenDeleteButtonClick((uuid) => {
      const webPanelController = this.webPanelsController.get(uuid);
      if (webPanelController.isActive()) {
        this.sidebarController.close();
      }
      this.hidePopup();
      webPanelController.remove();
      this.webPanelsController.delete(uuid);
      this.webPanelsController.save();
    });
  }

  /**
   *
   * @param {WebPanelController} webPanelController
   */
  openPopup(webPanelController) {
    const webPanel = webPanelController.webPanel;
    const webPanelButton = webPanelController.webPanelButton;

    this.webPanelPopupEdit.setDefaults(
      webPanel.uuid,
      webPanel.url,
      webPanel.faviconURL,
      webPanel.loadOnStartup,
      webPanel.unloadOnClose,
      webPanelController.isFirst(),
      webPanelController.isLast()
    );
    this.webPanelPopupEdit.openPopup(webPanelButton);
  }

  hidePopup() {
    this.webPanelPopupEdit.hidePopup();
  }
}
