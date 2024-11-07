export class HTMLElement {
  /**
   *
   * @param {HTMLElement} element
   */
  constructor(element) {
    this.element = element;
  }

  /**
   *
   * @returns {HTMLElement}
   */
  getHTML() {
    return this.element;
  }

  /**
   *
   * @param {XULElement} child
   * @returns {HTMLElement}
   */
  appendChild(child) {
    this.element.appendChild(child.getXUL());
    return this;
  }

  /**
   *
   * @param {Array<XULElement>} children
   * @returns {HTMLElement}
   */
  appendChildren(...children) {
    children.forEach((child) => this.appendChild(child));
    return this;
  }
}
