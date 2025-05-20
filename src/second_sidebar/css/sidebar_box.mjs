const notCustomizing = /* css */ `:not([customizing])`;
const compactMode = /* css */ `[zen-compact-mode="true"]${notCustomizing}`;
const sidebarLeft = /* css */ `[zen-right-side="true"]`;
const sidebarRight = /* css */ `:not([zen-right-side="true"])`;
const singleToolbar = /* css */ `[zen-single-toolbar="true"]`;

export const SIDEBAR_BOX_CSS = /*css*/ `
  #sb2-box {
    background-color: transparent;
    margin-left: 0;
    padding: 0;
    min-width: 200px;
    pointer-events: none;
    box-sizing: content-box;

    #sb2-toolbar {
      #sb2-toolbar-title-wrapper {
        -moz-window-dragging: no-drag;
      }
    }
  }

  #browser:has(#sb2-box[hidden="true"]) {
    #sb2-floating-splitter,
    #sb2-split-splitter {
      display: none !important;
    }
  }

  #browser:has(#sb2[type="split"]) {
    #sb2-box-filler {
      display: none;
    }

    #sb2-floating-splitter {
      display: none;
    }

    #sb2-split-splitter {
      display: flex !important;
      width: var(--zen-element-separation);
      border: unset;
    }
  }

  #browser:has(#sb2[type="floating"]) {
    #sb2-box {
      position: absolute;
      background-color: transparent;
      padding-block-start: var(--space-xsmall);
      height: calc(100% - var(--space-xsmall) - var(--space-xsmall));
      width: 100% !important;
      z-index: 3;

      #sb2-box-filler {
        display: block;
        flex: 1;
        pointer-events: none;
      }

      #sb2-floating-splitter {
        display: flex !important;
        pointer-events: auto;
        border: unset;
      }
    }
  }

  :root${sidebarRight} #browser:has(#sb2[type="split"]) {
    #sb2-box {
      order: 16 !important;
      padding-inline-start: var(--space-small);
      padding-inline-end: 1px;
    }

    #sb2-split-splitter {
      order: 15 !important;
      margin-inline-start: 2px;
      margin-inline-end: calc(-1 * var(--zen-element-separation) + 1px);
    }
  }

  :root${sidebarLeft} #browser:has(#sb2[type="split"]) {
    #sb2-box {
      order: -2 !important;
      padding-inline-start: 1px;
      padding-inline-end: var(--space-small);
    }

    #sb2-split-splitter {
      order: -1 !important;
      margin-inline-start: calc(-1 * var(--zen-element-separation) + 1px);
      margin-inline-end: 2px;
    }
  }

  :root${sidebarRight} #browser:has(#sb2[type="floating"]) {
    #sb2-box-filler {
      order: 0;
    }

    #sb2-floating-splitter {
      order: 1;
      margin-inline-start: calc(-1 * var(--splitter-width));
      margin-inline-end: unset;
    }

    #sb2 {
      order: 2;
    }

    #sb2-box {
      padding-inline-end: var(--space-xsmall);
      right: 50px !important;
    }
  }

  :root${sidebarLeft} #browser:has(#sb2[type="floating"]) {
    #sb2-box-filler {
      order: 2;
    }

    #sb2-floating-splitter {
      order: 1;
      margin-inline-start: unset;
      margin-inline-end: calc(-1 * var(--splitter-width));
    }

    #sb2 {
      order: 0;
    }

    #sb2-box {
      padding-inline-start: var(--space-xsmall);
      left: 50px !important;
    }
  }
`;
