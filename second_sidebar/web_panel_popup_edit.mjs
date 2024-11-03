import { Button } from "./xul/button.mjs";
import { HBox } from "./xul/hbox.mjs";
import { Input } from "./xul/input.mjs";
import { Panel } from "./xul/panel.mjs";
import { PanelMultiView } from "./xul/panel_multi_view.mjs";
import { SidebarController } from "./sidebar_controller.mjs";
import { WebPanelButton } from "./web_panel_button.mjs";

export class WebPanelPopupEdit extends Panel {
  constructor() {
    super({ id: "sidebar-2-web-panel-popup-edit" });
    this.setType("default").setRole("group");
    this.urlInput = this.#createURLInput();
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
    row.appendChild(this.saveButton).appendChild(this.deleteButton);
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
      .appendChild(this.buttonsRow);

    this.appendChild(multiView);
    return multiView;
  }

  #createURLInput() {
    const input = new Input().setType("text");
    return input;
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
        this.webPanelButton.updateIcon();
        if (SidebarController.webPanels.contains(this.webPanel)) {
          this.webPanel.goHome();
        }
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
    Panel.prototype.openPopup.call(this, target);
  }
}
