import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { Subscription } from 'rxjs';
import { RouterOutlet } from '@angular/router';
import {IgonResponsiveLayoutComponent} from "@igon/responsive-layout";
import {LakshPageFooterComponent} from "./_layout/page-footer/page-footer.component";
import {LakshPageHeaderComponent} from "./_layout/page-header/page-header.component";
import {LakshHeaderMenuItem} from "./_layout/page-header/header-menu/header-menu-item.class";
import {LakshMobileMenuComponent} from "./_layout/page-header/mobile-menu/mobile-menu.component";
import {MobileMenuService} from "./_layout/page-header/mobile-menu/mobile-menu.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    IgonResponsiveLayoutComponent,
    LakshPageFooterComponent,
    LakshPageHeaderComponent,
    LakshMobileMenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  isMobileMenuOpen = signal(false);
  
  constructor(private mobileMenuService: MobileMenuService) {}

  menu: LakshHeaderMenuItem[] = [
    new LakshHeaderMenuItem({
      name: 'about-us',
      title: 'О нас',
      route: '/about'
    }),
    new LakshHeaderMenuItem({
      name: 'projects',
      title: 'Проекты',
      route: '/projects'
    }),
    new LakshHeaderMenuItem({
      name: 'services',
      title: 'Услуги',
      route: '/services'
    }),
    new LakshHeaderMenuItem({
      name: 'contacts',
      title: 'Контакты',
      route: '/#contacts'
    }),
  ];

  menuCenter: LakshHeaderMenuItem[] = [
    new LakshHeaderMenuItem({
      name: 'portfolio',
      title: 'ПОРТФОЛИО',
      route: '/projects'
    }),
    new LakshHeaderMenuItem({
      name: 'plant',
      title: 'ПИТОМНИК',
      route: '/#plant'
    })
  ];

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

  // Методы управления мобильным меню
  toggleMobileMenu(): void {
    this.mobileMenuService.toggle();
  }

  closeMobileMenu(): void {
    this.mobileMenuService.close();
  }

}
