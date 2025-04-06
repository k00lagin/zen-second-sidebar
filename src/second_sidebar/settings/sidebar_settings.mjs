import { Settings } from "./settings.mjs";

const PREF = "second-sidebar.settings";

export class SidebarSettings {
  /**@type {string} */
  #position;
  /**@type {boolean} */
  #floating;
  /**@type {string} */
  #padding;
  /**@type {string} */
  #newWebPanelPosition;
  /**@type {string} */
  #unpinnedPadding;
  /**@type {boolean} */
  #hideInPopupWindows;
  /**@type {boolean} */
  #autoHideBackButton;
  /**@type {boolean} */
  #autoHideForwardButton;
  /**@type {string} */
  #containerBorder;

  /**
   *
   * @param {string} position
   * @param {boolean} floating
   * @param {string} padding
   * @param {string} newWebPanelPosition
   * @param {string} unpinnedPadding
   * @param {boolean} hideInPopupWindows
   * @param {boolean} autoHideBackButton
   * @param {boolean} autoHideForwardButton
   * @param {string} containerBorder
   */
  constructor(
    position,
    floating,
    padding,
    newWebPanelPosition,
    unpinnedPadding,
    hideInPopupWindows,
    autoHideBackButton,
    autoHideForwardButton,
    containerBorder,
  ) {
    this.#position = position;
    this.#floating = floating;
    this.#padding = padding;
    this.#newWebPanelPosition = newWebPanelPosition;
    this.#unpinnedPadding = unpinnedPadding;
    this.#hideInPopupWindows = hideInPopupWindows;
    this.#autoHideBackButton = autoHideBackButton;
    this.#autoHideForwardButton = autoHideForwardButton;
    this.#containerBorder = containerBorder;
  }

  get position() {
    return this.#position;
  }

  get floating() {
    return this.#floating;
  }

  get padding() {
    return this.#padding;
  }

  get newWebPanelPosition() {
    return this.#newWebPanelPosition;
  }

  get unpinnedPadding() {
    return this.#unpinnedPadding;
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

  /**
   *
   * @returns {SidebarSettings}
   */
  static load() {
    const pref = Settings.load(PREF) ?? {};
    return new SidebarSettings(
      pref.position ?? "right",
      pref.floating ?? false,
      pref.padding ?? "small",
      pref.newWebPanelPosition ?? "before",
      pref.unpinnedPadding ?? "small",
      pref.hideInPopupWindows ?? false,
      pref.autoHideBackButton ?? false,
      pref.autoHideForwardButton ?? false,
      pref.containerBorder ?? "left",
    );
  }

  save() {
    Settings.save(PREF, {
      position: this.#position,
      floating: this.#floating,
      padding: this.#padding,
      newWebPanelPosition: this.#newWebPanelPosition,
      unpinnedPadding: this.#unpinnedPadding,
      hideInPopupWindows: this.#hideInPopupWindows,
      autoHideBackButton: this.#autoHideBackButton,
      autoHideForwardButton: this.#autoHideForwardButton,
      containerBorder: this.#containerBorder,
    });
  }
}
