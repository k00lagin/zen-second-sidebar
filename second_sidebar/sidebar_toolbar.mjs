import { HBox } from "./xul/hbox.mjs";
import { Label } from "./xul/label.mjs";
import { SidebarController } from "./sidebar_controller.mjs";
import { Toolbar } from "./xul/toolbar.mjs";
import { ToolbarButton } from "./xul/toolbar_button.mjs";

const ICON_PINNED =
  "chrome://activity-stream/content/data/content/assets/glyph-unpin-16.svg";
const ICON_UNPINNED =
  "chrome://activity-stream/content/data/content/assets/glyph-pin-16.svg";

export class SidebarToolbar extends Toolbar {
  constructor() {
    super({ id: "sidebar-2-toolbar" });
    this.setMode("icons");

    this.backButton = this.#createButton(
      "chrome://browser/skin/back.svg",
      (panel) => panel.goBack()
    );
    this.forwardButton = this.#createButton(
      "chrome://browser/skin/forward.svg",
      (panel) => panel.goForward()
    );
    this.reloadButton = this.#createButton(
      "chrome://global/skin/icons/reload.svg",
      (panel) => panel.reload()
    );
    this.homeButton = this.#createButton(
      "chrome://browser/skin/home.svg",
      (panel) => panel.goHome()
    );

    this.pinButton = this.#createPinButton();
    this.closeButton = this.#createCloseButton();

    this.toolbarNavButtons = this.#createNavButtons();
    this.toolbarTitle = this.#createToolbarTitle();
    this.toolbarSidebarButtons = this.#createSidebarButtons();
  }

  /**
   *
   * @returns {HBox}
   */
  #createNavButtons() {
    const toolbarButtons = new HBox({ id: "sidebar-2-toolbar-nav-buttons" })
      .appendChild(this.backButton)
      .appendChild(this.forwardButton)
      .appendChild(this.reloadButton)
      .appendChild(this.homeButton);

    this.appendChild(toolbarButtons);
    return toolbarButtons;
  }

  /**
   *
   * @returns {HBox}
   */
  #createSidebarButtons() {
    const toolbarButtons = new HBox({ id: "sidebar-2-toolbar-sidebar-buttons" })
      .appendChild(this.pinButton)
      .appendChild(this.closeButton);

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

  /**
   *
   * @returns {ToolbarButton}
   */
  #createPinButton() {
    const pinButton = new ToolbarButton({
      id: "sidebar-2-pin-button",
    });

    pinButton.addEventListener("mousedown", (event) => {
      if (event.button !== 0) {
        return;
      }

      const activeWebPanel = SidebarController.webPanels.getActive();

      if (activeWebPanel.pinned) {
        activeWebPanel.pinned = false;
        SidebarController.sidebarBox.unpin();
      } else {
        activeWebPanel.pinned = true;
        SidebarController.sidebarBox.pin();
      }

      SidebarController.webPanels.savePrefs();
    });

    this.appendChild(pinButton);
    return pinButton;
  }

  /**
   *
   * @returns {ToolbarButton}
   */
  #createCloseButton() {
    const closeButton = new ToolbarButton({
      id: "sidebar-2-close-button",
    }).setIcon("chrome://global/skin/icons/close.svg");

    closeButton.addEventListener("mousedown", (event) => {
      if (event.button !== 0) {
        return;
      }

      const activeWebPanel = SidebarController.webPanels.getActive();
      SidebarController.sidebarBox.close();
      activeWebPanel.remove();
    });

    this.appendChild(closeButton);
    return closeButton;
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
   * @returns {SidebarToolbar}
   */
  pin() {
    this.pinButton.setIcon(ICON_PINNED);
    return this;
  }

  /**
   *
   * @returns {SidebarToolbar}
   */
  unpin() {
    this.pinButton.setIcon(ICON_UNPINNED);
    return this;
  }

  /**
   *
   * @param {string} iconUrl
   * @param {function(WebPanel):void} action
   * @returns {ToolbarButton}
   */
  #createButton(iconUrl, action) {
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
    return toolbarButton;
  }
}
