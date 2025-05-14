import { SidebarEvents, listenEvent, sendEvents } from "./events.mjs";

import { SidebarControllers } from "../sidebar_controllers.mjs";
import { SidebarElements } from "../sidebar_elements.mjs";
import { WindowWrapper } from "../wrappers/window.mjs";
import { XULElement } from "../xul/base/xul_element.mjs";

const FULLSCREEN_ANIMATE_ATTRIBUTE = "fullscreenShouldAnimate";
const ANIMATE_ATTRIBUTE = "shouldAnimate";

export class CollapseController {
  constructor() {
    // elements
    this.sidebarMain = SidebarElements.sidebarMain;
    this.sidebarSettings = SidebarElements.sidebarMainPopupSettings;
    this.sidebarCollapseButton = SidebarElements.sidebarCollapseButton;
    // controllers
    this.sidebarMainController = SidebarControllers.sidebarMainController;
    this.sidebarController = SidebarControllers.sidebarController;

    this.#setupListeners();
  }

  rootHasHoverTimeout = null;

  #onRootEnter(e) {
    if (this.sidebarMain.hasAttribute("has-hover")) {
      clearTimeout(this.rootHasHoverTimeout);
      this.rootHasHoverTimeout = setTimeout(() => {
        this.sidebarMain.removeAttribute("has-hover");
        clearTimeout(this.rootHasHoverTimeout);
      }, 50);
    }
  }

  #onRootLeave(e, root) {
    const width = root.getBoundingClientRect().width;
    const isTabsOnTheRightSide = document.documentElement.matches('[zen-right-side="true"]');
    const mouseX = e.clientX;
    if ((isTabsOnTheRightSide && mouseX > 0) || (!isTabsOnTheRightSide && mouseX < width)) {
      return;
    }
    this.sidebarMain.setAttribute("has-hover", "true");
    if (this.rootHasHoverTimeout) {
      clearTimeout(this.rootHasHoverTimeout);
    }
    this.rootHasHoverTimeout = setTimeout(() => {
        this.sidebarMain.removeAttribute("has-hover");
        clearTimeout(this.rootHasHoverTimeout);
    }, 1000);
  }

  #setupListeners() {
    const window = new WindowWrapper();
    const root = new XULElement({ element: window.document.documentElement });

    root.addEventListener("mousemove", this);
    root.addEventListener("dragover", this);
    root.addEventListener("mouseenter", (e) => this.#onRootEnter(e));
    root.addEventListener("dragstart", (e) => this.#onRootEnter(e));
    root.addEventListener("mouseleave", (e) => this.#onRootLeave(e, root));
    root.addEventListener("dragleave", (e) => this.#onRootLeave(e, root));

    window.addEventListener("fullscreen", () => {
      if (window.fullScreen) {
        // Show sidebar and then immediately hide with fullscreen animation
        this.uncollapse();
        setTimeout(() => {
          this.collapse(false, true);
        }, 0);
      } else {
        if (this.sidebarController.autoHideSidebar) {
          // Show sidebar and then immediately hide with fullscreen animation
          this.uncollapse();
          setTimeout(() => {
            this.collapse(false, true);
          });
        } else {
          this.uncollapse(this.sidebarController.hideSidebarAnimated);
        }
      }
    });

    this.sidebarCollapseButton.listenClick(() => {
      sendEvents(SidebarEvents.COLLAPSE_SIDEBAR);
    });

    listenEvent(SidebarEvents.COLLAPSE_SIDEBAR, (event) => {
      const isActiveWindow = event.detail.isActiveWindow;

      if (!isActiveWindow) {
        return;
      }

      if (this.sidebarController.autoHideSidebar) {
        return;
      }
      if (this.collapsed()) {
        this.uncollapse(this.sidebarController.hideSidebarAnimated);
        this.sidebarCollapseButton.setOpen(true);
      } else {
        this.collapse(this.sidebarController.hideSidebarAnimated);
        this.sidebarCollapseButton.setOpen(false);
      }
    });
  }

  /**
   *
   * @param {boolean} animate
   */
  shouldAnimate(animate) {
    this.sidebarMain.toggleAttribute(ANIMATE_ATTRIBUTE, animate);
  }

  /**
   *
   * @param {boolean} animate
   */
  fullScreenShouldAnimate(animate) {
    this.sidebarMain.toggleAttribute(FULLSCREEN_ANIMATE_ATTRIBUTE, animate);
  }

  /**
   *
   * @param {MouseEvent} event
   */
  handleEvent(event) {
    const window = new WindowWrapper();
    if (!window.fullScreen && !this.sidebarController.autoHideSidebar) {
      return;
    }
    const position = this.sidebarController.getPosition();
    const root = new XULElement({ element: window.document.documentElement });
    const rootRect = root.getBoundingClientRect();
    const sidebarRect = this.sidebarMain.getBoundingClientRect();
    const leftEdge = window.mozInnerScreenX;
    const rightEdge = leftEdge + rootRect.width;
    if (
      this.collapsed() &&
      ((position === "right" &&
        event.screenX > rightEdge - sidebarRect.width) ||
        (position === "left" && event.screenX < leftEdge + sidebarRect.width))
    ) {
      this.uncollapse(this.sidebarController.hideSidebarAnimated);
    } else if (
      !this.collapsed() &&
      ((position === "right" &&
        event.screenX < rightEdge - 2 * sidebarRect.width) ||
        (position === "left" &&
          event.screenX > leftEdge + 2 * sidebarRect.width))
    ) {
      this.collapse(this.sidebarController.hideSidebarAnimated);
    }
  }

  /**
   *
   * @returns {boolean}
   */
  collapsed() {
    return this.sidebarMainController.collapsed();
  }

  /**
   *
   * @param {boolean} animate
   * @param {boolean} fullScreenAnimate
   */
  collapse(animate = false, fullScreenAnimate = false) {
    this.shouldAnimate(animate);
    this.fullScreenShouldAnimate(fullScreenAnimate);
    this.sidebarMainController.collapse();
  }

  /**
   *
   * @param {boolean} animate
   * @param {boolean} fullScreenAnimate
   */
  uncollapse(animate = false, fullScreenAnimate = false) {
    this.shouldAnimate(animate);
    this.fullScreenShouldAnimate(fullScreenAnimate);
    this.sidebarMainController.uncollapse();
  }
}
