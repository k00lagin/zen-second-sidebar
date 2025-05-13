export const SIDEBAR_CSS = /*css*/ `
  #sb2 {
    border-radius: var(--zen-native-inner-radius);
    box-shadow: var(--zen-big-shadow);
    overflow: hidden;
    height: 100%;
    pointer-events: auto;
    min-width: 200px;
    position: relative;

    &:hover {
      #sb2-toolbar {
        opacity: 1;
      }
    }

    #sb2-toolbar {
      flex-direction: row;
      min-height: unset;
      color: var(--toolbar-color);
      opacity: 0;
      transition: opacity 0.2s 0.2s ease-in-out;
      display: flex;
      align-items: center;

      position: absolute;
      left: 50%;
      transform: translateX(-50%);

      padding: 0 0.6rem 0.2rem 0.6rem;
      border-bottom-left-radius: 8px;
      border-bottom-right-radius: 8px;
      background-color: light-dark(rgba(255, 255, 255, 1), rgba(0, 0, 0, 1));
      box-shadow: 0 0 0 1px var(--button-primary-border-color);
      gap: 0.8rem;
      box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.1);
      z-index: 10;

      &[hidden="true"] {
        display: none;
      }

      #sb2-toolbar-nav-buttons,
      #sb2-toolbar-sidebar-buttons {
        display: contents;
      }

      .sb2-toolbar-button {
        cursor: pointer;
        padding: 2px;
      }

      .toolbarbutton-icon {
        width: 12px;
        height: 12px;
        padding: 0;
        background-color: transparent;
      }

      #sb2-toolbar-title-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        flex: 1;
        overflow: hidden;

        display: none;
      }

      #sb2-toolbar-title {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin: 0;
      }
    }

    #sb2-web-panels {
      width: 100%;
      height: 100%;
      order: 0;
    }
  }
  
  #sb2[type="split"] {
    width: 100% !important;
  }
`;
