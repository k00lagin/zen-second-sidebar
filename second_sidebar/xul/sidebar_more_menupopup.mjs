import { MenuItem } from "./base/menuitem.mjs";
import { MenuPopup } from "./base/menupopup.mjs";

export class SidebarMoreMenuPopup extends MenuPopup {
  constructor() {
    super({
      id: "sidebar-2-more-menupopup",
      classList: ["sidebar-2-menupopup"],
    });

    this.openInNewTabItem = new MenuItem().setLabel("Open In New Tab");
    this.copyPageUrlItem = new MenuItem().setLabel("Copy Page URL");

    this.appendChild(this.openInNewTabItem);
    this.appendChild(this.copyPageUrlItem);
  }

  /**
   *
   * @param {function(MouseEvent):void} callback
   */
  listenOpenInNewTabItemClick(callback) {
    this.openInNewTabItem.addEventListener("click", (event) => {
      callback(event);
    });
  }

  /**
   *
   * @param {function(MouseEvent):void} callback
   */
  listenCopyPageUrlItemClick(callback) {
    this.copyPageUrlItem.addEventListener("click", (event) => {
      callback(event);
    });
  }
}
