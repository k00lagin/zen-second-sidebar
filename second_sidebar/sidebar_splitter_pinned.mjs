import { SidebarController } from './sidebar_controller.mjs';
import { Splitter } from './xul/splitter.mjs';

export class SidebarSplitterPinned extends Splitter {
  constructor() {
    super({ id: 'sidebar-2-splitter-pinned', classList: ['sidebar-splitter'] });
    this.setResizeBefore('none').setResizeAfter('sibling').hide();

    this.addEventListener('mouseup', () => {
      const width = SidebarController.sidebarBox.getWidth();
      SidebarController.sidebar.setWidth(width);
      const activeWebPanel = SidebarController.webPanels.getActive();
      activeWebPanel.width = width;
      SidebarController.webPanels.save();
    });
  }
}
