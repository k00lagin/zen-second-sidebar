import { SidebarMainPopupSettings } from "../xul/sidebar_main_popup_settings.mjs";

export class SidebarMainSettingsController {
  /**
   *
   * @param {SidebarMainPopupSettings} sidebarMainPopupSettings
   */
  constructor(sidebarMainPopupSettings) {
    this.sidebarMainPopupSettings = sidebarMainPopupSettings;
  }

  openPopup(screenX, screenY) {
    this.sidebarMainPopupSettings.openPopupAtScreen(screenX, screenY);
  }
}
