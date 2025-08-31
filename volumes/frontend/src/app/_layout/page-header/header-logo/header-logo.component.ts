import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'laksh-header-logo',
  templateUrl: './header-logo.component.html',
  styleUrls: ['./header-logo.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class LakshHeaderLogoComponent implements OnInit {
  isHomePage = true;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Проверяем текущий роут при инициализации
    this.checkCurrentRoute();
    
    // Подписываемся на изменения роута
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.checkCurrentRoute();
    });
  }

  private checkCurrentRoute(): void {
    this.isHomePage = this.router.url === '/' || this.router.url === '';
  }

  navigateToHome(): void {
    this.router.navigate(['/']);
  }
}
