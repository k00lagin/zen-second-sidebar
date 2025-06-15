export class CommandListeners {
  static init() {
    document.addEventListener("command", (event) => {
        console.log('command', event)
        if (event.target.ownerDocument.children["main-window"].getAttribute("class") === "sb2-webpanels-window") {
          switch (event.target.id) {
            case "cmd_newNavigatorTabNoEvent": {
              BrowserCommands.openTab();
              break;
            }
            case "Tools:Search": {
              SearchUIUtils.webSearch(window);
              break;
            }
          }          
        }
      })
  }
}
