/* eslint-disable no-unused-vars */
import { MenuList } from "../xul/base/menulist.mjs";
/* eslint-enable no-unused-vars */

export const DEFAULT_USER_CONTEXT_ID =
  Services.scriptSecurityManager.DEFAULT_USER_CONTEXT_ID;

/**
 *
 * @param {string} userContextId
 * @returns {object}
 */
export function makeContainerStyles(userContextId) {
  const identity =
    ContextualIdentityService.getPublicIdentityFromId(userContextId);
  const styles = {
    "box-shadow": "unset",
    padding: "unset",
  };
  if (identity) {
    styles["box-shadow"] = `2px 0px 0px 0px ${identity.color} inset`;
    styles["padding"] = "0 0 0 var(--toolbarbutton-inner-padding)";
  }
  return styles;
}

/**
 *
 * @param {MenuList} containerMenuList
 */
export function fillContainerMenuList(containerMenuList) {
  containerMenuList.removeAllItems();
  containerMenuList.appendItem("No Container", DEFAULT_USER_CONTEXT_ID);

  const userContextIds = ContextualIdentityService.getPublicUserContextIds();
  for (const userContextId of userContextIds) {
    const label = ContextualIdentityService.getUserContextLabel(userContextId);
    containerMenuList.appendItem(label, userContextId);

    const styles = makeContainerStyles(userContextId);
    const lastMenuItem = containerMenuList.getLastMenuItemXUL();
    lastMenuItem.style.boxShadow = styles["box-shadow"];
  }

  containerMenuList.addEventListener("command", () => {
    const userContextId = containerMenuList.getValue();
    const styles = makeContainerStyles(userContextId);
    containerMenuList.setProperty("box-shadow", styles["box-shadow"]);
  });
}
