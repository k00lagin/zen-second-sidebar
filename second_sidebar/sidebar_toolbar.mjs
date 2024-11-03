import { HBox } from "./xul/hbox.mjs";
import { Label } from "./xul/label.mjs";
import { SidebarController } from "./sidebar_controller.mjs";
import { Toolbar } from "./xul/toolbar.mjs";
import { ToolbarButton } from "./xul/toolbar_button.mjs";

export class SidebarToolbar extends Toolbar {
  constructor() {
    super({ id: "sidebar-2-toolbar" });
    this.setMode("icons");
    this.toolbarButtons = this.#createToolbarButtons();
    this.toolbarTitle = this.#createToolbarTitle();
    this.pinButton = this.#createPinButton();
  }

  /**
   *
   * @returns {HBox}
   */
  #createToolbarButtons() {
    const toolbarButtons = new HBox({ id: "sidebar-2-toolbar-buttons" });
    this.appendChild(toolbarButtons);
    return toolbarButtons;
  }

  /**
   *
   * @returns {Label}
   */
  #createToolbarTitle() {
    const toolbarTitle = new Label({ id: "sidebar-2-toolbar-title" });
    this.appendChild(toolbarTitle);
    return toolbarTitle;
  }

  #createPinButton() {
    const pinButton = new ToolbarButton({
      id: "sidebar-2-toolbar-pin-button",
    });

    pinButton.addEventListener("mousedown", (event) => {
      if (event.button !== 0) {
        return;
      }

      const activeWebPanel = SidebarController.webPanels.getActive();

      this.setPinned(!activeWebPanel.pinned);

      if (activeWebPanel.pinned) {
        activeWebPanel.pinned = false;
        SidebarController.unpin();
      } else {
        activeWebPanel.pinned = true;
        SidebarController.pin();
      }

      SidebarController.webPanels.save();
    });

    this.appendChild(pinButton);
    return pinButton;
  }

  /**
   *
   * @param {string} title
   * @returns {SidebarToolbar}
   */
  setTitle(title) {
    this.toolbarTitle.setText(title);
    return this;
  }

  /**
   *
   * @param {boolean} pinned
   * @returns {SidebarToolbar}
   */
  setPinned(pinned) {
    const iconPinned =
      "chrome://activity-stream/content/data/content/assets/glyph-unpin-16.svg";
    const iconUnpinned =
      "chrome://activity-stream/content/data/content/assets/glyph-pin-16.svg";
    this.pinButton.setIcon(pinned ? iconPinned : iconUnpinned);
    return this;
  }

  /**
   *
   * @param {string} iconUrl
   * @param {function(WebPanel):void} action
   * @returns {SidebarToolbar}
   */
  addButton(iconUrl, action) {
    const toolbarButton = new ToolbarButton({
      classList: ["sidebar-2-toolbar-button"],
    })
      .setIcon(iconUrl)
      .addEventListener("mousedown", (event) => {
        if (event.button !== 0) {
          return;
        }
        const webPanel = SidebarController.webPanels.getActive();
        action(webPanel);
      });
    this.toolbarButtons.appendChild(toolbarButton);
    return this;
  }
}
