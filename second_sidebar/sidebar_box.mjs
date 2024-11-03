import { VBox } from "./xul/vbox.mjs";

export class SidebarBox extends VBox {
  constructor() {
    super({ id: "sidebar-2-box" });
    this.hide().pin();
  }

  /**
   *
   * @returns {string}
   */
  getWidth() {
    return this.getAttribute("width");
  }

  /**
   *
   * @param {string} width
   * @returns {SidebarBox}
   */
  setWidth(width) {
    this.setAttribute("width", width);
    this.element.style.width = width + "px";
    return this;
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

  /**
   *
   * @returns {boolean}
   */
  pinned() {
    return this.getAttribute("pinned") === "true";
  }
}
