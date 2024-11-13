import { Button } from "./base/button.mjs";
import { HBox } from "./base/hbox.mjs";
import { Header } from "./base/header.mjs";
import { Panel } from "./base/panel.mjs";
import { PanelMultiView } from "./base/panel_multi_view.mjs";
import { ToolbarSeparator } from "./base/toolbar_separator.mjs";

export class SidebarMainPopupSettings extends Panel {
  constructor() {
    super({
      id: "sidebar-2-main-popup-settings",
      classList: ["sidebar-2-popup"],
    });
    this.setType("arrow").setRole("group");

    this.panelHeader = new HBox({ classList: ["panel-header"] });
    this.header = new Header(1).setText("Sidebar Settings");

    this.saveButton = this.#createSaveButton();
    this.cancelButton = this.#createCancelButton();
    this.buttons = new HBox({
      id: "sidebar-2-main-popup-settings-buttons",
    });

    this.multiView = this.#createMultiView();

    this.addEventListener("popupshown", () => {});
  }

  /**
   *
   * @returns {PanelMultiView}
   */
  #createMultiView() {
    this.panelHeader.appendChild(this.header);
    this.buttons.appendChild(this.cancelButton).appendChild(this.saveButton);
    const multiView = new PanelMultiView({
      id: "sidebar-2-main-popup-settings-multiview",
    })
      .appendChild(this.panelHeader)
      .appendChild(new ToolbarSeparator())
      .appendChild(this.buttons);

    this.appendChild(multiView);
    return multiView;
  }

  /**
   *
   * @returns {Button}
   */
  #createSaveButton() {
    return new Button({
      classList: ["footer-button", "primary"],
    }).setText("Save");
  }

  listenSaveButtonClick(callback) {
    this.saveButton.addEventListener("mousedown", (event) => {
      if (event.button !== 0) {
        return;
      }
    });
  }

  /**
   *
   * @returns {Button}
   */
  #createCancelButton() {
    return new Button({ classList: ["footer-button"] }).setText("Cancel");
  }

  listenCancelButtonClick(callback) {
    this.cancelButton.addEventListener("mousedown", async (event) => {
      if (event.button !== 0) {
        return;
      }
    });
  }
}
