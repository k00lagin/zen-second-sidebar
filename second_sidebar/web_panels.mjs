import { SidebarController } from './sidebar_controller.mjs';
import { VBox } from './xul/vbox.mjs';
import { WebPanel } from './web_panel.mjs';
import { WebPanelButton } from './web_panel_button.mjs';

const PREF = 'second-sidebar.web-panels';

export class WebPanels extends VBox {
  constructor() {
    super({ id: 'sidebar-2-web-panels' });

    /** @type {Map<string, WebPanel>} */
    this.webPanelsMap = {};

    /** @type {Array<WebPanels>} */
    this.webPanels = [];
  }

  /**
   *
   * @param {WebPanel} webPanel
   * @returns {WebPanels}
   */
  add(webPanel) {
    this.webPanels.push(webPanel);
    this.webPanelsMap[webPanel.url] = webPanel;
    return this;
  }

  /**
   *
   * @param {string} url
   * @returns {WebPanel?}
   */
  get(url) {
    return this.webPanels[url] ?? null;
  }

  /**
   *
   * @param {string} url
   * @returns {boolean}
   */
  has(url) {
    return url in this.webPanels;
  }

  /**
   *
   * @returns {WebPanel?}
   */
  getActive() {
    for (const webPanel of this.webPanels) {
      if (!webPanel.hidden()) {
        return webPanel;
      }
    }
    return null;
  }

  /**
   *
   * @param {string} url
   * @returns {WebPanels}
   */
  delete(url) {
    const index = this.webPanels.findIndex((webPanel) => webPanel.url);
    if (index !== -1) {
      this.webPanels.splice(index, 1);
      delete this.webPanelsMap[url];
    }
    return this;
  }

  /**
   *
   * @param {string} oldURL
   * @param {string} newURL
   * @param {WebPanel} webPanel
   * @returns {WebPanels}
   */
  move(oldURL, newURL, webPanel) {
    delete this.webPanelsMap[oldURL];
    this.webPanelsMap[newURL] = webPanel;
    return this;
  }

  /**
   *
   * @param {WebPanel} targetWebPanel
   * @returns {WebPanels}
   */
  switch(targetWebPanel) {
    for (const webPanel of this.webPanels) {
      if (webPanel === targetWebPanel) {
        webPanel.show();
        SidebarController.sidebarToolbar.setTitle(webPanel.getTitle());
        SidebarController.sidebarBox.setWidth(webPanel.width);
        SidebarController.sidebar.setWidth(webPanel.width);
      } else {
        webPanel.hide();
      }
    }
    return this;
  }

  load() {
    try {
      const prefs = JSON.parse(Services.prefs.getStringPref(PREF));
      for (const webPanelPref of prefs) {
        const webPanel = new WebPanel(
          webPanelPref.url,
          webPanelPref.pinned ?? true,
          webPanelPref.width ?? '400'
        );
        const webPanelButton = new WebPanelButton(webPanel);
        SidebarController.webPanelButtons.appendChild(webPanelButton);
        this.add(webPanel);
      }
    } catch (error) {
      console.log('No prefs');
    }
  }

  save() {
    const prefs = [];
    for (const webPanel of this.webPanels) {
      prefs.push({
        url: webPanel.url,
        pinned: webPanel.pinned,
        width: webPanel.width,
      });
    }
    console.log('Saving prefs: ', prefs);
    Services.prefs.setStringPref(PREF, JSON.stringify(prefs));
  }
}
