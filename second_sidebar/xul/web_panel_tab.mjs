import { Tab } from "./base/tab.mjs";

const makeTabXUL = (url) => {
  return gBrowser.addTab(url, {
    insertTab: false,
    triggeringPrincipal: Services.scriptSecurityManager.createNullPrincipal({}),
  });
};

export class WebPanelTab extends Tab {
  /**
   *
   * @param {string} url
   * @param {object} params
   * @param {string?} params.id
   * @param {Array<string>} params.classList
   */
  constructor(url, { id = null, classList = [] } = {}) {
    super({ id, classList, element: makeTabXUL(url) });

    // hack to deceive AsyncTabSwitcher
    const tabBrowser = this.getTabBrowser();
    tabBrowser._printPreviewBrowsers.add(browser);
  }

  /**
   *
   * @returns {WebPanelTab}
   */
  remove() {
    const tabBrowser = this.getTabBrowser();
    tabBrowser._printPreviewBrowsers.delete(browser);
    return Tab.prototype.remove.call(this);
  }

  getTabBrowser() {
    const browser = this.getBrowserXUL();
    return browser.getTabBrowser();
  }
}
