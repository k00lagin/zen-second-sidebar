import { Tab } from "./base/tab.mjs";

export class WebPanelTab extends Tab {
  /**
   *
   * @param {string} uuid
   * @param {string} userContextId
   * @param {object} params
   * @param {string?} params.id
   * @param {Array<string>} params.classList
   */
  constructor(uuid, userContextId, { id = null, classList = [] } = {}) {
    super(userContextId, { id, classList });
    this.setUUID(uuid);
  }

  /**
   *
   * @param {string} uuid
   * @returns {WebPanelTab}
   */
  setUUID(uuid) {
    return this.setAttribute("uuid", uuid);
  }
}
