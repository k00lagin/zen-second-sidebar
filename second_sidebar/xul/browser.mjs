import { SidebarController } from "../sidebar_controller.mjs";
import { XULElement } from "./xul_element.mjs";

export class Browser extends XULElement {
  /**
   *
   * @param {object} params
   * @param {string?} params.id
   * @param {Array<string>} params.classList
   */
  constructor({ id = null, classList = [] } = {}) {
    super("browser", { id, classList });
  }

  /**
   *
   * @param {string} value
   * @returns {Browser}
   */
  setDisableGlobalHistory(value) {
    return this.setAttribute("disableglobalhistory", value);
  }

  /**
   *
   * @param {string} value
   * @returns {Browser}
   */
  setType(value) {
    return this.setAttribute("type", value);
  }

  /**
   *
   * @param {string} value
   * @returns {Browser}
   */
  setRemote(value) {
    return this.setAttribute("remote", value);
  }

  /**
   *
   * @returns {Browser}
   */
  goBack() {
    this.element.goBack();
    return this;
  }

  /**
   *
   * @returns {Browser}
   */
  goForward() {
    this.element.goForward();
    return this;
  }

  /**
   *
   * @returns {Browser}
   */
  reload() {
    this.element.reload();
    return this;
  }

  /**
   *
   * @param {string} url
   * @returns {Browser}
   */
  go(url) {
    this.element.fixupAndLoadURIString(url, {
      triggeringPrincipal: Services.scriptSecurityManager.createNullPrincipal(
        {}
      ),
    });

    return this;
  }

  /**
   *
   * @returns {string}
   */
  getTitle() {
    return this.element.contentTitle;
  }
}
