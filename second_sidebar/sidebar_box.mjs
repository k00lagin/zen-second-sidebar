import { HBox } from "./xul/hbox.mjs";
import { SidebarController } from "./sidebar_controller.mjs";

export class SidebarBox extends HBox {
  constructor() {
    super({ id: "sidebar-2-box" });
    this.hide();

    this.onClickUnpinned = (event) => {
      if (!this.element.contains(event.target)) {
        this.close();
      }
    };
  }

  /**
   *
   * @param {boolean} pinned
   * @returns {SidebarBox}
   */
  open(pinned) {
    this.show();
    pinned ? this.pin() : this.unpin();
    SidebarController.sidebarSplitterPinned.show();
    return this;
  }

  /**
   *
   * @returns {SidebarBox}
   */
  close() {
    this.hide();
    this.unpin();
    SidebarController.sidebarSplitterPinned.hide();
    return this;
  }

  /**
   *
   * @returns {boolean}
   */
  closed() {
    return this.hidden();
  }

  /**
   *
   * @returns {boolean}
   */
  pin() {
    SidebarController.sidebar.pin();
    SidebarController.sidebarToolbar.pin();
    document.removeEventListener("mousedown", this.onClickUnpinned);
    return this;
  }

  /**
   *
   * @returns {boolean}
   */
  unpin() {
    SidebarController.sidebar.unpin();
    SidebarController.sidebarToolbar.unpin();
    document.addEventListener("mousedown", this.onClickUnpinned);
    return this;
  }
}
