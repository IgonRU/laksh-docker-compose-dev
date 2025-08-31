import {Component, input} from '@angular/core';
import {LakshHeaderMenuItem} from "./header-menu-item.class";

@Component({
  selector: 'laksh-header-menu',
  standalone: true,
  imports: [],
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.scss']
})
export class LakshHeaderMenuComponent {

  menu = input<LakshHeaderMenuItem[]>([]);

  getLeftColumn(): LakshHeaderMenuItem[] {
    return this.menu().slice(0, Math.ceil(this.menu().length / 2));
  }

  getRightColumn(): LakshHeaderMenuItem[] {
    return this.menu().slice(Math.ceil(this.menu().length / 2));
  }
}
