import { Button } from "./xul/button.mjs";
import { HBox } from "./xul/hbox.mjs";
import { Header } from "./xul/header.mjs";
import { Input } from "./xul/input.mjs";
import { Panel } from "./xul/panel.mjs";
import { PanelMultiView } from "./xul/panel_multi_view.mjs";
import { SidebarController } from "./sidebar_controller.mjs";
import { ToolbarSeparator } from "./xul/toolbar_separator.mjs";
import { WebPanel } from "./web_panel.mjs";
import { WebPanelButton } from "./web_panel_button.mjs";
import { WebPanelNewButton } from "./web_panel_new_button.mjs";
import { fetchIconURL } from "./utils.mjs";

export class WebPanelPopupNew extends Panel {
  constructor() {
    super({
      id: "sidebar-2-web-panel-popup-new",
      classList: ["sidebar-2-panel"],
    });
    this.setType("arrow").setRole("group");

    this.panelHeader = new HBox({ classList: ["panel-header"] });
    this.header = new Header(1).setText("New Web Panel");
    this.separator = new ToolbarSeparator();

    this.input = this.#createInput();

    this.saveButton = this.#createSaveButton();
    this.cancelButton = this.#createCancelButton();
    this.buttons = new HBox({
      id: "sidebar-2-web-panel-popup-new-buttons",
    });

    this.multiView = this.#createMultiView();

    this.addEventListener("popupshown", () => {
      this.input.focus();
    });
  }

  /**
   *
   * @returns {PanelMultiView}
   */
  #createMultiView() {
    this.panelHeader.appendChild(this.header);
    this.buttons.appendChild(this.cancelButton).appendChild(this.saveButton);
    const multiView = new PanelMultiView()
      .appendChild(this.panelHeader)
      .appendChild(this.separator)
      .appendChild(this.input)
      .appendChild(this.buttons);

    this.appendChild(multiView);
    return multiView;
  }

  async #createWebPanel() {
    const url = this.input.getValue();

    try {
      NetUtil.newURI(url);
    } catch (error) {
      console.log("Invalid url");
      return;
    }

    this.hidePopup();

    const faviconURL = await fetchIconURL(url);
    const webPanel = new WebPanel(url, faviconURL);
    const webPanelButton = new WebPanelButton(webPanel);
    SidebarController.webPanelButtons.appendChild(webPanelButton);
    SidebarController.webPanels.add(webPanel);
    SidebarController.switch(webPanel);
    SidebarController.webPanels.save();
  }

  /**
   *
   * @returns {Input}
   */
  #createInput() {
    const input = new Input().setType("text");

    input.addEventListener("keyup", async (event) => {
      if (event.key === "Enter" || event.keyCode === 13) {
        await this.#createWebPanel();
      }
    });

    return input;
  }

  /**
   *
   * @returns {Button}
   */
  #createSaveButton() {
    const button = new Button({
      id: "sidebar-2-web-panel-popup-new-save-button",
      classList: ["footer-button"],
    }).setText("Save");

    button.addEventListener("mousedown", async (event) => {
      if (event.button === 0) {
        await this.#createWebPanel();
      }
    });

    return button;
  }

  /**
   *
   * @returns {Button}
   */
  #createCancelButton() {
    const button = new Button({ classList: ["footer-button"] }).setText(
      "Cancel"
    );

    button.addEventListener("mousedown", async (event) => {
      if (event.button === 0) {
        this.hidePopup();
      }
    });

    return button;
  }

  /**
   *
   * @param {WebPanelNewButton} target
   */
  openPopup(target) {
    this.input.setValue("https://");
    Panel.prototype.openPopup.call(this, target);
  }
}
