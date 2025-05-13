export const CUSTOMIZATION_CSS = /*css*/ `
  #customization-container {
    border-radius: var(--zen-native-inner-radius);
    box-shadow: var(--zen-big-shadow);

    toolbarpaletteitem::after {
      overflow-x: scroll;
      text-overflow: ellipsis;
    }
  }

  #tabbrowser-tabbox:has(~ #customization-container:not([hidden])) {
    display: none !important;
  }
`;
