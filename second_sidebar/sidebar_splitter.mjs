import { SidebarController } from "./sidebar_controller.mjs";
import { Splitter } from "./xul/splitter.mjs";

export class SidebarSplitter extends Splitter {
  constructor() {
    super({ id: "sidebar-2-splitter", classList: ["sidebar-splitter"] });
    this.setResizeBefore("none").setResizeAfter("sibling").hide();

    this.addEventListener("mouseup", () => {
      const activeWebPanel = SidebarController.webPanels.getActive();
      activeWebPanel.width = SidebarController.sidebarBox.getWidth();
      SidebarController.webPanels.save();
    });
  }

  /**
   *
   * @returns {SidebarBox}
   */
  pin() {
    this.setAttribute("pinned", "true");
    return this;
  }

  /**
   *
   * @returns {SidebarBox}
   */
  unpin() {
    this.setAttribute("pinned", "false");
    return this;
  }
}
