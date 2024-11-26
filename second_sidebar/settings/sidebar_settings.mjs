import { Settings } from "./settings.mjs";

const PREF = "second-sidebar.settings";

export class SidebarSettings {
  /**@type {string} */
  #position;
  /**@type {boolean} */
  #hideInPopupWindows;
  /**@type {boolean} */
  #autoHideBackButton;
  /**@type {boolean} */
  #autoHideForwardButton;

  /**
   *
   * @param {string} position
   * @param {boolean} hideInPopupWindows
   * @param {boolean} autoHideBackButton
   * @param {boolean} autoHideForwardButton
   */
  constructor(
    position,
    hideInPopupWindows,
    autoHideBackButton,
    autoHideForwardButton
  ) {
    this.#position = position;
    this.#hideInPopupWindows = hideInPopupWindows;
    this.#autoHideBackButton = autoHideBackButton;
    this.#autoHideForwardButton = autoHideForwardButton;
  }

  get position() {
    return this.#position;
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

  /**
   *
   * @returns {SidebarSettings}
   */
  static load() {
    const pref = Settings.load(PREF) ?? {};
    return new SidebarSettings(
      pref.position ?? "right",
      pref.hideInPopupWindows ?? false,
      pref.autoHideBackButton ?? false,
      pref.autoHideForwardButton ?? false
    );
  }

  save() {
    Settings.save(PREF, {
      position: this.#position,
      hideInPopupWindows: this.#hideInPopupWindows,
      autoHideBackButton: this.#autoHideBackButton,
      autoHideForwardButton: this.#autoHideForwardButton,
    });
  }
}
