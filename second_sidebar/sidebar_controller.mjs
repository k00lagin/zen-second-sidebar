import { Sidebar } from "./sidebar.mjs";
import { SidebarBox } from "./sidebar_box.mjs";
import { SidebarBoxFiller } from "./sidebar_box_filler.mjs";
import { SidebarMain } from "./sidebar_main.mjs";
import { SidebarSplitterPinned } from "./sidebar_splitter_pinned.mjs";
import { SidebarSplitterUnpinned } from "./sidebar_splitter_unpinned.mjs";
import { SidebarToolbar } from "./sidebar_toolbar.mjs";
import { WebPanel } from "./web_panel.mjs";
import { WebPanelButtons } from "./web_panel_buttons.mjs";
import { WebPanelNewButton } from "./web_panel_new_button.mjs";
import { WebPanelPopupEdit } from "./web_panel_popup_edit.mjs";
import { WebPanelPopupNew } from "./web_panel_popup_new.mjs";
import { WebPanels } from "./web_panels.mjs";

export class SidebarController {
  static sidebarMain = new SidebarMain();
  static webPanelButtons = new WebPanelButtons();
  static webPanelNewButton = new WebPanelNewButton();
  static webPanelPopupNew = new WebPanelPopupNew();
  static webPanelPopupEdit = new WebPanelPopupEdit();
  static sidebarBox = new SidebarBox();
  static sidebar = new Sidebar();
  static sidebarToolbar = new SidebarToolbar();
  static webPanels = new WebPanels();
  static sidebarSplitterPinned = new SidebarSplitterPinned();
  static sidebarSplitterUnpinned = new SidebarSplitterUnpinned();
  static sidebarBoxFiller = new SidebarBoxFiller();

  static onClickUnpinned = (event) => {
    if (!this.sidebarBox.element.contains(event.target)) {
      this.close();
    }
  };

  static inject() {
    this.sidebarMain
      .appendChild(this.webPanelButtons)
      .appendChild(this.webPanelNewButton);
    this.sidebar.appendChild(this.sidebarToolbar).appendChild(this.webPanels);
    this.sidebarBox
      .appendChild(this.sidebarBoxFiller)
      .appendChild(this.sidebarSplitterUnpinned)
      .appendChild(this.sidebar);

    const browser = document.querySelector("#browser");
    browser.appendChild(this.sidebarSplitterPinned.getXUL());
    browser.appendChild(this.sidebarBox.getXUL());
    browser.appendChild(this.sidebarMain.getXUL());

    document.body.appendChild(this.webPanelPopupNew.getXUL());
    document.body.appendChild(this.webPanelPopupEdit.getXUL());

    this.webPanels.load();
  }

  /**
   *
   * @param {boolean} pinned
   */
  static open(pinned) {
    this.sidebarBox.show();
    this.sidebarSplitterPinned.show();
    pinned ? this.pin() : this.unpin();
  }

  static close() {
    this.sidebarBox.hide();
    this.sidebarSplitterPinned.hide();
    this.webPanels.hideActive();
    document.removeEventListener("mousedown", this.onClickUnpinned);
  }

  /**
   *
   * @returns {boolean}
   */
  static closed() {
    return this.sidebarBox.hidden() && this.sidebarSplitterPinned.hidden();
  }

  static pin() {
    this.sidebarToolbar.setPinned(true);
    this.sidebar.pin();
    document.removeEventListener("mousedown", this.onClickUnpinned);
  }

  static unpin() {
    this.sidebar.unpin();
    this.sidebarToolbar.setPinned(false);
    document.addEventListener("mousedown", this.onClickUnpinned);
  }

  /**
   *
   * @param {WebPanel} targetWebPanel
   */
  static switch(targetWebPanel) {
    const activeWebPanel = this.webPanels.getActive();

    // hide sidebar and active web panel if got the same url and sidebar is open
    if (!this.closed() && activeWebPanel === targetWebPanel) {
      this.close();
      activeWebPanel.hide();
      return;
    }

    // show sidebar
    this.open(targetWebPanel.pinned);

    // add web panel if needed
    if (!this.webPanels.contains(targetWebPanel)) {
      this.webPanels.appendChild(targetWebPanel);
      targetWebPanel.startListening();
      targetWebPanel.goHome();
    }

    // show web panel with specified url and hide others
    this.webPanels.switch(targetWebPanel);
    return this;
  }
}
