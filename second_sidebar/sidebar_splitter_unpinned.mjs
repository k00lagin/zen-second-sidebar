import { SidebarController } from "./sidebar_controller.mjs";
import { Splitter } from "./xul/splitter.mjs";

export class SidebarSplitterUnpinned extends Splitter {
  constructor() {
    super({ id: "sidebar-2-splitter-unpinned", classList: ["sidebar-splitter"] });
    this.setResizeBefore("none").setResizeAfter("sibling");

    this.addEventListener("mouseup", () => {
      const width = SidebarController.sidebar.getWidth();
      SidebarController.sidebarBox.setWidth(width);
      const activeWebPanel = SidebarController.webPanels.getActive();
      activeWebPanel.width = width;
      SidebarController.webPanels.save();
    });
  }
}
