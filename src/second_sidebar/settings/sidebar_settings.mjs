import { Settings } from "./settings.mjs";

const PREF = "zen-extra-sidebar.settings";

export class SidebarSettings {
  /**@type {string} */
  #position;
  /**@type {string} */
  #newWebPanelPosition;
  /**@type {boolean} */
  #hideInPopupWindows;
  /**@type {boolean} */
  #autoHideBackButton;
  /**@type {boolean} */
  #autoHideForwardButton;
  /**@type {string} */
  #containerBorder;
  /**@type {boolean} */
  #autoHideSidebar;
  /**@type {boolean} */
  #hideSidebarAnimated;

  /**
   *
   * @param {string} position
   * @param {string} newWebPanelPosition
   * @param {boolean} hideInPopupWindows
   * @param {boolean} autoHideBackButton
   * @param {boolean} autoHideForwardButton
   * @param {string} containerBorder
   * @param {boolean} autoHideSidebar
   * @param {boolean} hideSidebarAnimated
   */
  constructor(
    position,
    newWebPanelPosition,
    hideInPopupWindows,
    autoHideBackButton,
    autoHideForwardButton,
    containerBorder,
    autoHideSidebar,
    hideSidebarAnimated,
  ) {
    this.#position = position;
    this.#newWebPanelPosition = newWebPanelPosition;
    this.#hideInPopupWindows = hideInPopupWindows;
    this.#autoHideBackButton = autoHideBackButton;
    this.#autoHideForwardButton = autoHideForwardButton;
    this.#containerBorder = containerBorder;
    this.#autoHideSidebar = autoHideSidebar;
    this.#hideSidebarAnimated = hideSidebarAnimated;
  }

  get position() {
    return this.#position;
  }

  get newWebPanelPosition() {
    return this.#newWebPanelPosition;
  }

  get hideInPopupWindows() {
    return this.#hideInPopupWindows;
  }

  get autoHideBackButton() {
    return this.#autoHideBackButton;
  }

  get autoHideForwardButton() {
    return this.#autoHideForwardButton;
  }

  get containerBorder() {
    return this.#containerBorder;
  }

  get autoHideSidebar() {
    return this.#autoHideSidebar;
  }

  get hideSidebarAnimated() {
    return this.#hideSidebarAnimated;
  }

  /**
   *
   * @returns {SidebarSettings}
   */
  static load() {
    const pref = Settings.load(PREF) ?? {};
    return new SidebarSettings(
      "right", // position
      pref.newWebPanelPosition ?? "after",
      pref.hideInPopupWindows ?? false,
      pref.autoHideBackButton ?? false,
      pref.autoHideForwardButton ?? false,
      pref.containerBorder ?? "left",
      pref.autoHideSidebar ?? false,
      pref.hideSidebarAnimated ?? false,
    );
  }

  save() {
    Settings.save(PREF, {
      position: this.#position,
      newWebPanelPosition: this.#newWebPanelPosition,
      hideInPopupWindows: this.#hideInPopupWindows,
      autoHideBackButton: this.#autoHideBackButton,
      autoHideForwardButton: this.#autoHideForwardButton,
      containerBorder: this.#containerBorder,
      autoHideSidebar: this.#autoHideSidebar,
      hideSidebarAnimated: this.#hideSidebarAnimated,
    });
  }
}
