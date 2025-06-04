/**
 * @typedef {Object} URI
 * @property {string} scheme
 * @property {string} host
 * @property {string} spec
 * @property {string} specIgnoringRef
 */

export class FaviconsWrapper {
  /**
   *
   * @param {number} value
   */
  static setDefaultIconURIPreferredSize(value) {
    Favicons.setDefaultIconURIPreferredSize(value);
  }

  /**
   *
   * @param {URI} uri
   * @param {function(URI):void} callback
   */
  static getFaviconURLForPage(uri, callback) {
    if (Favicons.getFaviconURLForPage) {
      Favicons.getFaviconURLForPage(uri, callback);
    } else {
      callback(null);
    }
  }
}
