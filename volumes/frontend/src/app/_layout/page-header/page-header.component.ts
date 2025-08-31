import {Component, input, OnInit, OnDestroy, signal} from '@angular/core';
import { Subscription } from 'rxjs';
import {LakshHeaderMenuComponent} from "./header-menu/header-menu.component";
import {LakshHeaderMenuItem} from "./header-menu/header-menu-item.class";
import {IgonResponsiveLayoutService} from "@igon/responsive-layout";
import {MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {NavStickyComponent} from "../nav-sticky/nav-sticky.component";
import { LakshHeaderCenterMenuComponent } from "./header-center-menu/header-center-menu.component";
import { LakshHeaderLangSwitchComponent } from "./header-lang-switch/header-lang-switch.component";
import { LakshHeaderLogoComponent } from "./header-logo/header-logo.component";
import { MobileMenuService } from './mobile-menu/mobile-menu.service';

@Component({
  selector: 'laksh-page-header',
  standalone: true,
  imports: [
    LakshHeaderMenuComponent,
    MatButton,
    MatIcon,
    NavStickyComponent,
    LakshHeaderCenterMenuComponent,
    LakshHeaderLangSwitchComponent,
    LakshHeaderLogoComponent
],
  templateUrl: './page-header.component.html'
})
export class LakshPageHeaderComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();

  topMenu = input<LakshHeaderMenuItem[]>([]);
  centerMenu = input<LakshHeaderMenuItem[]>([]);
  
  // Состояние мобильного меню для анимации кнопки
  isMobileMenuOpen = signal(false);

  constructor(
    private responsiveService: IgonResponsiveLayoutService,
    private mobileMenuService: MobileMenuService
  ) {}


  showMenu(): boolean {
    return this.responsiveService.isWeb();
  }

  showMenuToggler(): boolean {
    return !this.showMenu();
  }

  showContacts(): boolean {
    return this.responsiveService.isWeb() || this.responsiveService.isTablet();
  }
  
  // Методы управления мобильным меню
  toggleMobileMenu(): void {
    this.mobileMenuService.toggle();
  }
  
  closeMobileMenu(): void {
    this.mobileMenuService.close();
  }

  ngOnInit(): void {
    // Подписываемся на изменения состояния мобильного меню
    this.subscription.add(
      this.mobileMenuService.isOpen$.subscribe(isOpen => {
        this.isMobileMenuOpen.set(isOpen);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
