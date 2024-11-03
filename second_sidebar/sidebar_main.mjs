import { Toolbar } from "./xul/toolbar.mjs";
import { VBox } from "./xul/vbox.mjs";

export class SidebarMain extends Toolbar {
  constructor() {
    super({ id: "sidebar-2-main", classList: ["browser-toolbar"] });
    this.setMode("icons");
  }
}
