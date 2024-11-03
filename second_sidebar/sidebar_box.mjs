import { HBox } from './xul/hbox.mjs';

export class SidebarBox extends HBox {
  constructor() {
    super({ id: 'sidebar-2-box' });
    this.hide();
  }
}
