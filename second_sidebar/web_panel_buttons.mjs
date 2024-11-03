import { VBox } from "./xul/vbox.mjs";
import { WebPanelButton } from "./web_panel_button.mjs";

export class WebPanelButtons extends VBox {
  constructor() {
    super({ id: "sidebar-2-main-web-panel-buttons" });
  }

  /**
   * 
   * @param {WebPanelButton} webPanelButton 
   * @returns {WebPanelButtons}
   */
  moveDown(webPanelButton) {
    const next = webPanelButton.element.nextSibling;
    this.element.insertBefore(next, webPanelButton.element);
    return this;
  }

  /**
   * 
   * @param {WebPanelButton} webPanelButton 
   * @returns {WebPanelButtons}
   */
  moveUp(webPanelButton) {
    const prev = webPanelButton.element.previousSibling;
    this.element.insertBefore(webPanelButton.element, prev);
    return this;
  }
}
