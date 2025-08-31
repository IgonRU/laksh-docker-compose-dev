import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { LakshHeaderMenuItem } from '../header-menu/header-menu-item.class';
import { LakshHeaderLangSwitchComponent } from "../header-lang-switch/header-lang-switch.component";
import { ViewportHeightDirective } from '../../../_directives/viewport-height.directive';

@Component({
  selector: 'laksh-mobile-menu',
  standalone: true,
  imports: [CommonModule, MatIcon, LakshHeaderLangSwitchComponent, ViewportHeightDirective],
  templateUrl: './mobile-menu.component.html',
  styleUrls: ['./mobile-menu.component.scss']
})
export class LakshMobileMenuComponent {
  menu = input<LakshHeaderMenuItem[]>([]);
  centerMenu = input<LakshHeaderMenuItem[]>([]);
  isOpen = input<boolean>(false);
  closeMenu = output<void>();

  getLeftColumn(): LakshHeaderMenuItem[] {
    return this.menu().slice(0, Math.ceil(this.menu().length / 2));
  }

  getRightColumn(): LakshHeaderMenuItem[] {
    return this.menu().slice(Math.ceil(this.menu().length / 2));
  }
}
