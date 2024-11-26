import globals from "globals";
import pluginJs from "@eslint/js";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        UC_API: "readonly",
        delayedStartupPromise: "readonly",
        Services: "readonly",
        Cc: "readonly",
        Ci: "readonly",
        gBrowser: "readonly",
        gContextMenu: "readonly",
        openTrustedLinkIn: "readonly",
        ChromeUtils: "readonly",
        NetUtil: "readonly",
        Favicons: "readonly",
        FullZoom: "readonly",
        ZoomManager: "readonly",
      },
    },
  },
  pluginJs.configs.recommended,
];
