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
export function getContainerColor(userContextId) {
  const identity =
    ContextualIdentityService.getPublicIdentityFromId(userContextId);
  return identity ? identity.color : "transparent";
}

/**
 *
 * @param {string} userContextId
 * @param {HTMLElement} element
 */
export function applyContainerColor(userContextId, element) {
  element.classList.add("sb2-container");
  element.style.setProperty(
    "--sb2-container-color-part",
    getContainerColor(userContextId),
  );
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

    const lastMenuItem = containerMenuList.getLastMenuItemXUL();
    applyContainerColor(userContextId, lastMenuItem);
  }

  containerMenuList.addEventListener("command", () => {
    const userContextId = containerMenuList.getValue();
    applyContainerColor(userContextId, containerMenuList.getXUL());
  });
}

/**
 *
 * @param {string} containerBorder
 */
export function changeContainerBorder(containerBorder) {
  let bordersPart = "";
  let padding = "";

  if (containerBorder === "left") {
    bordersPart = "2px 0px 0px 0px";
    padding = "0 0 0 var(--toolbarbutton-inner-padding)";
  } else if (containerBorder === "right") {
    bordersPart = "-2px 0px 0px 0px";
    padding = "0 var(--toolbarbutton-inner-padding) 0 0";
  } else if (containerBorder === "top") {
    bordersPart = "0px 2px 0px 0px";
    padding = "var(--toolbarbutton-inner-padding) 0 0 0";
  } else if (containerBorder === "bottom") {
    bordersPart = "0px -2px 0px 0px";
    padding = "0 0 var(--toolbarbutton-inner-padding) 0";
  } else if (containerBorder === "around") {
    bordersPart = "0px 0px 0px 2px";
    padding = "var(--toolbarbutton-inner-padding)";
  }

  document.documentElement.style.setProperty(
    "--sb2-container-borders-part",
    bordersPart,
  );
  document.documentElement.style.setProperty(
    "--sb2-container-padding",
    padding,
  );
}
