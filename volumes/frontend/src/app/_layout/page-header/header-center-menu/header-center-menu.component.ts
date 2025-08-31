import { Component, input } from '@angular/core';
import { LakshHeaderMenuItem } from '../header-menu/header-menu-item.class';

@Component({
  selector: 'laksh-header-center-menu',
  standalone: true,
  imports: [],
  templateUrl: './header-center-menu.component.html',
  styleUrls: ['./header-center-menu.scss']
})
export class LakshHeaderCenterMenuComponent {
  menu = input<LakshHeaderMenuItem[]>([]);
}
