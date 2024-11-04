import { Button } from "./xul/button.mjs";
import { HBox } from "./xul/hbox.mjs";
import { Input } from "./xul/input.mjs";
import { Panel } from "./xul/panel.mjs";
import { PanelMultiView } from "./xul/panel_multi_view.mjs";
import { SidebarController } from "./sidebar_controller.mjs";
import { WebPanelButton } from "./web_panel_button.mjs";
import { fetchIconURL } from "./utils.mjs";

export class WebPanelPopupEdit extends Panel {
  constructor() {
    super({ id: "sidebar-2-web-panel-popup-edit" });
    this.setType("arrow").setRole("group");
    this.urlInput = this.#createURLInput();
    this.faviconURLInput = this.#createFaviconURLInput();

    this.resetIconButton = this.#createResetIconButton();
    this.moveDownButton = this.#createMoveDownButton();
    this.moveUpButton = this.#createMoveUpButton();
    this.saveButton = this.#createSaveButton();
    this.deleteButton = this.#createDeleteButton();

    this.buttonsRow = this.#createButtonsRow();

    this.multiView = this.#createMultiView();
  }

  /**
   *
   * @returns {HBox}
   */
  #createButtonsRow() {
    const row = new HBox({
      id: "sidebar-2-web-panel-popup-edit-multiview-buttons-row",
    });
    row
      .appendChild(this.resetIconButton)
      .appendChild(this.moveDownButton)
      .appendChild(this.moveUpButton)
      .appendChild(this.saveButton)
      .appendChild(this.deleteButton);
    return row;
  }

  /**
   *
   * @returns {PanelMultiView}
   */
  #createMultiView() {
    const multiView = new PanelMultiView({
      id: "sidebar-2-web-panel-popup-edit-multiview",
    })
      .appendChild(this.urlInput)
      .appendChild(this.faviconURLInput)
      .appendChild(this.buttonsRow);

    this.appendChild(multiView);
    return multiView;
  }

  #createURLInput() {
    const input = new Input().setType("text");
    return input;
  }

  #createFaviconURLInput() {
    const input = new Input().setType("text");
    return input;
  }

  /**
   *
   * @returns {Button}
   */
  #createResetIconButton() {
    const button = new Button().setText("Reset Icon");

    button.addEventListener("mousedown", async (event) => {
      if (event.button !== 0) {
        return;
      }

      const faviconURL = await fetchIconURL(this.webPanel.url);
      this.faviconURLInput.setValue(faviconURL);
    });

    return button;
  }

  /**
   *
   * @returns {Button}
   */
  #createMoveDownButton() {
    const button = new Button().setText("Move Down");

    button.addEventListener("mousedown", (event) => {
      if (event.button !== 0) {
        return;
      }

      if (SidebarController.webPanels.isLast(this.webPanel)) {
        return;
      }

      SidebarController.webPanels.moveDown(this.webPanel);
      SidebarController.webPanelButtons.moveDown(this.webPanelButton);

      this.hidePopup();
      this.openPopup(this.webPanelButton);

      SidebarController.webPanels.save();
    });

    return button;
  }

  /**
   *
   * @returns {Button}
   */
  #createMoveUpButton() {
    const button = new Button().setText("Move Up");

    button.addEventListener("mousedown", (event) => {
      if (event.button !== 0) {
        return;
      }

      if (SidebarController.webPanels.isFirst(this.webPanel)) {
        return;
      }

      SidebarController.webPanels.moveUp(this.webPanel);
      SidebarController.webPanelButtons.moveUp(this.webPanelButton);

      this.hidePopup();
      this.openPopup(this.webPanelButton);

      SidebarController.webPanels.save();
    });

    return button;
  }

  /**
   *
   * @returns {Button}
   */
  #createSaveButton() {
    const button = new Button().setText("Save");

    button.addEventListener("mousedown", (event) => {
      if (event.button !== 0) {
        return;
      }

      const url = this.urlInput.getValue();
      if (this.webPanel.url !== url) {
        this.webPanel.changeURL(url);
        const faviconURL = fetchIconURL(url);
        this.webPanelButton.setIcon(faviconURL);
        if (SidebarController.webPanels.contains(this.webPanel)) {
          this.webPanel.goHome();
        }
      }

      const faviconURL = this.faviconURLInput.getValue();
      if (this.webPanel.faviconURL !== faviconURL) {
        this.webPanel.faviconURL = faviconURL;
        this.webPanelButton.setIcon(faviconURL);
      }

      SidebarController.webPanelPopupEdit.hidePopup();
      SidebarController.webPanels.save();
    });

    return button;
  }

  /**
   *
   * @returns {Button}
   */
  #createDeleteButton() {
    const button = new Button().setText("Delete");

    button.addEventListener("mousedown", (event) => {
      if (event.button !== 0) {
        return;
      }
      const activeWebPanel = SidebarController.webPanels.getActive();
      if (this.webPanel === activeWebPanel) {
        SidebarController.close();
      }

      this.webPanel.remove();
      this.webPanelButton.remove();
      SidebarController.webPanelPopupEdit.hidePopup();
      SidebarController.webPanels.save();
    });

    return button;
  }

  /**
   *
   * @param {WebPanelButton} target
   */
  openPopup(target) {
    this.webPanelButton = target;
    this.webPanel = this.webPanelButton.webPanel;
    this.urlInput.setValue(this.webPanel.url);
    this.faviconURLInput.setValue(this.webPanel.faviconURL);
    Panel.prototype.openPopup.call(this, target);
  }
}
