import { Button } from "./xul/button.mjs";
import { HBox } from "./xul/hbox.mjs";
import { Header } from "./xul/header.mjs";
import { Img } from "./xul/img.mjs";
import { Input } from "./xul/input.mjs";
import { Panel } from "./xul/panel.mjs";
import { PanelMultiView } from "./xul/panel_multi_view.mjs";
import { SidebarController } from "./sidebar_controller.mjs";
import { ToolbarButton } from "./xul/toolbar_button.mjs";
import { ToolbarSeparator } from "./xul/toolbar_separator.mjs";
import { WebPanelButton } from "./web_panel_button.mjs";
import { fetchIconURL } from "./utils.mjs";

export class WebPanelPopupEdit extends Panel {
  constructor() {
    super({
      id: "sidebar-2-web-panel-popup-edit",
      classList: ["sidebar-2-panel"],
    });
    this.setType("arrow").setRole("group");

    this.panelHeader = new HBox({ classList: ["panel-header"] });
    this.header = new Header(1).setText("Edit Web Panel");
    this.separator = new ToolbarSeparator();

    this.urlInputHeader = new Header(1).setText("URL");
    this.urlInput = this.#createURLInput();

    this.faviconURLInputHeader = new Header(1).setText("Favicon URL");
    this.faviconURLInput = this.#createFaviconURLInput();
    this.faviconResetButton = this.#createFaviconResetButton();
    this.faviconRow = this.#createFaviconRow();

    this.moveDownButton = this.#createMoveDownButton();
    this.moveUpButton = this.#createMoveUpButton();
    this.moveButtons = new HBox({
      id: "sidebar-2-web-panel-popup-edit-move-buttons",
    });

    this.saveButton = this.#createSaveButton();
    this.deleteButton = this.#createDeleteButton();
    this.storageButtons = new HBox({
      id: "sidebar-2-web-panel-popup-edit-storage-buttons",
    });

    this.buttonsRow = this.#createButtonsRow();

    this.multiView = this.#createMultiView();
  }

  #createFaviconResetButton() {
    const button = new ToolbarButton().setIcon(
      "chrome://global/skin/icons/undo.svg"
    );

    button.addEventListener("mousedown", async (event) => {
      if (event.button !== 0) {
        return;
      }

      const faviconURL = await fetchIconURL(this.webPanel.url);
      this.faviconURLInput.setValue(faviconURL).setBackgroundImage(faviconURL);
    });

    return button;
  }

  #createFaviconRow() {
    const row = new HBox({
      id: "sidebar-2-web-panel-popup-edit-favicon-row",
    });
    row.appendChild(this.faviconURLInput).appendChild(this.faviconResetButton);
    return row;
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
      .appendChild(
        this.moveButtons
          .appendChild(this.moveUpButton)
          .appendChild(this.moveDownButton)
      )
      .appendChild(
        this.storageButtons
          .appendChild(this.deleteButton)
          .appendChild(this.saveButton)
      );
    return row;
  }

  /**
   *
   * @returns {PanelMultiView}
   */
  #createMultiView() {
    this.panelHeader.appendChild(this.header);
    const multiView = new PanelMultiView({
      id: "sidebar-2-web-panel-popup-edit-multiview",
    })
      .appendChild(this.panelHeader)
      .appendChild(this.separator)
      .appendChild(this.urlInputHeader)
      .appendChild(this.urlInput)
      .appendChild(this.faviconURLInputHeader)
      .appendChild(this.faviconRow)
      .appendChild(this.buttonsRow);

    this.appendChild(multiView);
    return multiView;
  }

  #createURLInput() {
    const input = new Input().setType("text");
    return input;
  }

  #createFaviconURLInput() {
    const input = new Input({
      id: "sidebar-2-web-panel-favicon-input",
    }).setType("text");

    input.addEventListener("input", () => {
      input.setBackgroundImage(input.getValue());
    });

    return input;
  }

  /**
   *
   * @returns {ToolbarButton}
   */
  #createMoveDownButton() {
    const button = new ToolbarButton().setIcon(
      "chrome://global/skin/icons/arrow-down.svg"
    );

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
   * @returns {ToolbarButton}
   */
  #createMoveUpButton() {
    const button = new ToolbarButton().setIcon(
      "chrome://global/skin/icons/arrow-up.svg"
    );

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
    const button = new Button({
      id: "sidebar-2-web-panel-popup-edit-save-button",
      classList: ["footer-button"],
    }).setText("Save");

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
    const button = new Button({ classList: ["footer-button"] }).setText(
      "Delete"
    );

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
    this.faviconURLInput
      .setValue(this.webPanel.faviconURL)
      .setBackgroundImage(this.webPanel.faviconURL);
    Panel.prototype.openPopup.call(this, target);
  }
}
