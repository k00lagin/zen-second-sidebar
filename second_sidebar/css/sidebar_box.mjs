export const SIDEBAR_BOX_CSS = `
  #sidebar-2-box {
    order: 6;
    background-color: var(--toolbar-bgcolor);
    min-width: 200px;
    pointer-events: none;
    box-sizing: content-box;
  }

  #browser:has(#sidebar-2[pinned="true"]) {
    #sidebar-2-box {
      padding-inline-start: var(--space-small);
      padding-inline-end: 1px;

      #sidebar-2-box-filler {
        display: none;
      }

      #sidebar-2-splitter-unpinned {
        display: none;
      }
    }

    #sidebar-2-splitter-pinned {
      display: flex;
      order: 5;
      margin-inline-start: unset;
      margin-inline-end: calc(-1 * var(--splitter-width));
    }
  }

  #browser:has(#sidebar-2[pinned="false"]) {
    #sidebar-2-box {
      position: absolute;
      background-color: transparent;
      height: calc(100% - 2 * var(--space-small));
      width: 100% !important;
      right: var(--sidebar-2-main-width);
      padding-block-start: var(--space-small);
      padding-inline-end: var(--space-small);
      z-index: 3;

      #sidebar-2-box-filler {
        display: block;
        flex: 1;
        pointer-events: none;
      }

      #sidebar-2-splitter-unpinned {
        display: flex;
        pointer-events: auto;
        border: unset;
      }
    }

    #sidebar-2-splitter-pinned {
      display: none;
    }
  }
`;