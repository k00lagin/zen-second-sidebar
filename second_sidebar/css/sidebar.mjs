export const SIDEBAR_CSS = `
  #sidebar-2 {
    box-shadow: var(--content-area-shadow);
    border-radius: var(--border-radius-medium);
    overflow: hidden;
    height: 100%;
    pointer-events: auto;
    min-width: 200px;
    outline: 0.01px solid var(--chrome-content-separator-color);

    #sidebar-2-toolbar {
      display: flex;
      flex-direction: row;
      gap: 4px;
      padding: 4px 0;
      background-color: var(--toolbar-bgcolor);
      color: var(--toolbar-color);

      #sidebar-2-toolbar-title {
        display: flex;
        align-items: center;
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
      }

      #sidebar-2-pin-button {
        transform: scale(-1, 1);
      }
    }

    #sidebar-2-web-panels {
      width: 100%;
      height: 100%;
    }
  }
  
  #sidebar-2[pinned="true"] {
    width: 100% !important;
  }
`;