/* eslint-disable no-unused-vars */
import { MenuList } from "../xul/base/menulist.mjs";
/* eslint-enable no-unused-vars */

export const DEFAULT_USER_CONTEXT_ID =
  Services.scriptSecurityManager.DEFAULT_USER_CONTEXT_ID;
const CONTAINER_CLASS = "sb2-container";

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
  if (String(userContextId) === String(DEFAULT_USER_CONTEXT_ID)) {
    element.classList.remove(CONTAINER_CLASS);
  } else {
    element.classList.add(CONTAINER_CLASS);
  }
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
  let shadowParts = Array(4).fill("0px");
  let paddingParts = Array(4).fill("var(--toolbarbutton-inner-padding)");

  if (containerBorder === "left") {
    shadowParts[0] = "2px";
    paddingParts[1] = "0";
  } else if (containerBorder === "right") {
    shadowParts[0] = "-2px";
    paddingParts[3] = "0";
  } else if (containerBorder === "top") {
    shadowParts[1] = "2px";
    paddingParts[2] = "0";
  } else if (containerBorder === "bottom") {
    shadowParts[1] = "-2px";
    paddingParts[0] = "0";
  } else if (containerBorder === "around") {
    shadowParts[3] = "1px";
  }

  document.documentElement.style.setProperty(
    "--sb2-container-borders-part",
    shadowParts.join(" "),
  );
  document.documentElement.style.setProperty(
    "--sb2-container-padding",
    paddingParts.join(" "),
  );
}
