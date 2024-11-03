export class XULElement {
  /**
   *
   * @param {string} tag
   * @param {object} params
   * @param {string?} params.id
   * @param {Array<string>} params.classList
   * @param {function(string):any} params.create
   */
  constructor(
    tag,
    {
      id = null,
      classList = [],
      create = (tag) => document.createXULElement(tag),
    } = {}
  ) {
    this.element = create(tag);
    if (id !== null) {
      this.element.id = id;
    }
    if (classList.length > 0) {
      this.element.classList.add(...classList);
    }
  }

  getXUL() {
    return this.element;
  }

  /**
   *
   * @returns {XULElement}
   */
  show() {
    this.element.hidden = false;
    return this;
  }

  /**
   *
   * @returns {XULElement}
   */
  hide() {
    this.element.hidden = true;
    return this;
  }

  /**
   *
   * @returns {boolean}
   */
  hidden() {
    return this.element.hidden;
  }

  /**
   *
   * @param {XULElement} child
   * @returns {XULElement}
   */
  appendChild(child) {
    this.element.appendChild(child.getXUL());
    return this;
  }

  /**
   *
   * @param {string} name
   * @param {string|number} value
   * @returns {XULElement}
   */
  setAttribute(name, value) {
    this.element.setAttribute(name, value);
    return this;
  }

  /**
   *
   * @param {string} name
   * @returns {string|number}
   */
  getAttribute(name) {
    return this.element.getAttribute(name);
  }

  /**
   *
   * @returns {string}
   */
  getWidth() {
    return this.getAttribute("width");
  }

  /**
   *
   * @param {string} width
   * @returns {XULElement}
   */
  setWidth(width) {
    this.setAttribute("width", width);
    this.element.style.width = width + "px";
    return this;
  }

  /**
   *
   * @param {string} event
   * @param {function(MouseEvent):void} callback
   * @returns {XULElement}
   */
  addEventListener(event, callback) {
    this.element.addEventListener(event, callback);
    return this;
  }

  /**
   *
   * @param {XULElement} element
   * @returns {boolean}
   */
  contains(element) {
    return this.element.contains(element.getXUL());
  }

  /**
   * @returns {XULElement}
   */
  remove() {
    this.element.remove();
    return this;
  }
}
