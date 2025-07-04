import { SidebarControllers } from "../sidebar_controllers.mjs";
import { SidebarElements } from "../sidebar_elements.mjs";
import { XULElement } from "../xul/base/xul_element.mjs";
import { gCustomizeModeWrapper } from "../wrappers/g_customize_mode.mjs";
import { gNavToolboxWrapper } from "../wrappers/g_nav_toolbox.mjs";
import { isRightMouseButton } from "../utils/buttons.mjs";
import { ScriptSecurityManagerWrapper } from "../wrappers/script_security_manager.mjs";

export class SidebarMainController {
  constructor() {
    this.sidebarMain = SidebarElements.sidebarMain;
    this.sidebarCollapseButton = SidebarElements.sidebarCollapseButton;
    this.sidebarMainMenuPopup = SidebarElements.sidebarMainMenuPopup;
    this.root = new XULElement({ element: document.documentElement });
    this.#setupGlobalListeners();
    this.#setupListeners();
  }

  #setupGlobalListeners() {
    fetch("chrome://browser/content/navigator-toolbox.js").then((response) => {
      response.text().then(async (moduleSource) => {
        const matches = moduleSource.matchAll(/\s{4}function.*?^\s{4}}/gms);
        let moduleText = "";
        for (const match of matches) {
          const functionSource = match[0];
          const cleanedSource = functionSource.replace(/^ {4}/gm, "");
          moduleText += "export " + cleanedSource + "\n";
        }

        const tempPath = "second_sidebar/tmp/global-listeners.mjs";
        await UC_API.FileSystem.writeFile(tempPath, moduleText);
        const moduleURL = `chrome://userchrome/content/${tempPath}`;

        const eventModule = await import(moduleURL);

        for (const [name, func] of Object.entries(eventModule)) {
          const eventName = name.toLowerCase().replace(/^on/, "");
          this.sidebarMain.addEventListener(eventName, func);
        }
      });
    });
  }

  #setupListeners() {
    this.sidebarMain.addEventListener("mousedown", (event) => {
      if (isRightMouseButton(event)) {
        this.mouseX = event.screenX;
        this.mouseY = event.screenY;
      }
    });

    this.sidebarMainMenuPopup.listenSettingsItemClick(() => {
      SidebarControllers.sidebarMainSettingsController.openPopup(
        this.mouseX,
        this.mouseY,
      );
    });

    this.sidebarMainMenuPopup.listenCustomizeItemClick(() => {
      gCustomizeModeWrapper.enter();
    });

    const sidebarContainer = new XULElement({
      element: document.getElementById("zen-tabbox-wrapper"),
    });
    gNavToolboxWrapper.addEventListener("customizationready", () => {
      sidebarContainer.show();
    });
    gNavToolboxWrapper.addEventListener("aftercustomization", () => {
      const springs = document.querySelectorAll("#sb2-main toolbarspring");
      for (const spring of springs) {
        spring.removeAttribute("context");
      }
    });

    // TODO: provide visual feedback for all drag events
    this.sidebarMain.addEventListener("dragover", (e) => {
      e.preventDefault();
      if (this.sidebarMain.getAttribute("has-drag-over")) {
        return;
      }
      this.sidebarMain.setAttribute("has-drag-over", "true");
    });

    this.sidebarMain.addEventListener("dragleave", (e) => {
      e.preventDefault();
      if (this.sidebarMain.getAttribute("has-drag-over")) {
        this.sidebarMain.removeAttribute("has-drag-over");
      }
    });

    this.sidebarMain.addEventListener("drop", (e) => {
      e.preventDefault();
      const link = e.dataTransfer.getData("URL") || e.dataTransfer.getData("text/uri-list");

      if (link) {
        SidebarControllers.webPanelNewController.createWebPanel(
          link,
          ScriptSecurityManagerWrapper.DEFAULT_USER_CONTEXT_ID,
        );
      }
      if (this.sidebarMain.getAttribute("has-drag-over")) {
        this.sidebarMain.removeAttribute("has-drag-over");
      }
    });
  }

  /**
   *
   * @returns {string}
   */
  getWidth() {
    return Math.round(this.sidebarMain.getBoundingClientRect().width) + "px";
  }

  /**
   *
   * @returns {boolean}
   */
  collapsed() {
    const zeros = ["0px", ""];
    const marginRight = this.sidebarMain.getProperty("margin-right");
    const marginLeft = this.sidebarMain.getProperty("margin-left");
    return !zeros.includes(marginRight) || !zeros.includes(marginLeft);
  }

  collapse() {
    const position = SidebarControllers.sidebarController.getPosition();
    this.sidebarMain.setProperty(
      position === "right" ? "margin-right" : "margin-left",
      -this.sidebarMain.getBoundingClientRect().width + "px",
    );
    this.sidebarCollapseButton.setOpen(false);
  }

  uncollapse() {
    this.sidebarMain.setProperty("margin-right", "0px");
    this.sidebarMain.setProperty("margin-left", "0px");
    this.sidebarCollapseButton.setOpen(true);
  }
}
