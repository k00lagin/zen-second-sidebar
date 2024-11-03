import { VBox } from './xul/vbox.mjs';

export class Sidebar extends VBox {
  constructor() {
    super({ id: 'sidebar-2' });
  }

  /**
   *
   * @returns {Sidebar}
   */
  pin() {
    this.setAttribute('pinned', 'true');
    return this;
  }

  /**
   *
   * @returns {Sidebar}
   */
  unpin() {
    this.setAttribute('pinned', 'false');
    return this;
  }

  /**
   *
   * @returns {boolean}
   */
  pinned() {
    return this.getAttribute('pinned') === 'true';
  }
}
