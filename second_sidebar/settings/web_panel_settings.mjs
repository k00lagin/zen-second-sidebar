export class WebPanelSettings {
  /**@type {string} */
  #uuid;
  /**@type {string} */
  #url;
  /**@type {string} */
  #faviconURL;
  /**@type {boolean} */
  #pinned;
  /**@type {string} */
  #width;
  /**@type {boolean} */
  #mobile;
  /**@type {boolean} */
  #loadOnStartup;
  /**@type {boolean} */
  #unloadOnClose;

  /**
   *
   * @param {string} uuid
   * @param {string} url
   * @param {string} faviconURL
   * @param {boolean} pinned
   * @param {string} width
   * @param {boolean} mobile
   * @param {boolean} loadOnStartup
   * @param {boolean} unloadOnClose
   */
  constructor(
    uuid,
    url,
    faviconURL,
    pinned,
    width,
    mobile,
    loadOnStartup,
    unloadOnClose
  ) {
    this.#uuid = uuid ?? crypto.randomUUID();
    this.#url = url;
    this.#faviconURL = faviconURL;
    this.#pinned = pinned ?? true;
    this.#width = width ?? "400";
    this.#mobile = mobile ?? false;
    this.#loadOnStartup = loadOnStartup ?? false;
    this.#unloadOnClose = unloadOnClose ?? false;
  }

  get uuid() {
    return this.#uuid;
  }

  get url() {
    return this.#url;
  }

  get faviconURL() {
    return this.#faviconURL;
  }

  get pinned() {
    return this.#pinned;
  }

  get width() {
    return this.#width;
  }

  get mobile() {
    return this.#mobile;
  }

  get loadOnStartup() {
    return this.#loadOnStartup;
  }

  get unloadOnClose() {
    return this.#unloadOnClose;
  }

  /**
   *
   * @returns {object}
   */
  toObject() {
    return {
      uuid: this.#uuid,
      url: this.#url,
      faviconURL: this.#faviconURL,
      pinned: this.#pinned,
      width: this.#width,
      mobile: this.#mobile,
      loadOnStartup: this.#loadOnStartup,
      unloadOnClose: this.#unloadOnClose,
    };
  }
}
