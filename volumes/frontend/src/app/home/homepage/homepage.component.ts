import { Component, OnInit, OnDestroy, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';
import { IntroComponent } from './intro/intro.component';
import { HeroComponent } from './hero/hero.component';
import { ProjectsComponent } from './projects/projects.component';
import { ServicesComponent } from './services/services.component';
import { AboutComponent } from './about/about.component';
import { LakshFixedBackgroundBlockComponent } from '../../_components/fixed-background-block/fixed-background-block.component';

@Component({
  selector: 'laksh-homepage',
  standalone: true,
  imports: [
    CommonModule,
    IntroComponent,
    HeroComponent,
    ProjectsComponent,
    ServicesComponent
],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class LakshHomepageComponent implements OnInit, AfterViewInit, OnDestroy {
  heroBackgroundImage = "url('https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=2000&q=60')";

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initGlobalStyles();
    }
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Инициализация скриптов после загрузки компонента
      this.initRevealEffect();
      this.initParallax();
      this.initStickyNav();
    }
  }

  ngOnDestroy(): void {
    // Очистка event listeners при уничтожении компонента
    this.cleanupEventListeners();
  }

  private initGlobalStyles(): void {
    // Добавляем глобальные CSS переменные
    document.documentElement.style.setProperty('--ink', '#111');
    document.documentElement.style.setProperty('--muted', '#666');
    document.documentElement.style.setProperty('--line', '#e5e5e5');
    
    // Устанавливаем smooth scroll
    document.documentElement.style.scrollBehavior = 'smooth';
  }

  private initRevealEffect(): void {
    const els = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
          }
        });
      }, { threshold: 0.15, rootMargin: '0px 0px -20% 0px' });
      
      els.forEach((el) => {
        io.observe(el);
      });
    } else {
      els.forEach((el) => {
        el.classList.add('in');
      });
    }
  }

  private initParallax(): void {
    const nodes = document.querySelectorAll('[data-parallax]');
    
    const onScroll = () => {
      nodes.forEach((el: any) => {
        const speed = parseFloat(el.getAttribute('data-parallax')) || 0;
        if (!speed) return;
        
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight || 1;
        const progress = Math.min(1, Math.max(0, 1 - (rect.top / vh)));
        const translate = ((progress * 2 - 1) * 30) * speed;
        
        el.style.transform = `translate3d(0,${translate.toFixed(2)}px,0)`;
        el.style.willChange = 'transform';
      });
    };
    
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();
  }

  private initStickyNav(): void {
    const sentinel = document.getElementById('masthead-sentinel');
    const sticky = document.getElementById('navSticky');
    const mast = document.getElementById('masthead');
    
    const fallback = () => {
      const mastH = mast ? mast.offsetHeight : 120;
      const onScroll2 = () => {
        if (window.scrollY > mastH) {
          sticky?.classList.add('show');
        } else {
          sticky?.classList.remove('show');
        }
      };
      
      window.addEventListener('scroll', onScroll2, { passive: true });
      window.addEventListener('resize', onScroll2);
      onScroll2();
    };
    
    if ('IntersectionObserver' in window && sentinel) {
      try {
        const o = new IntersectionObserver((entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              sticky?.classList.remove('show');
            } else {
              sticky?.classList.add('show');
            }
          });
        });
        o.observe(sentinel);
      } catch (e) {
        fallback();
      }
    } else {
      fallback();
    }
  }

  private cleanupEventListeners(): void {
    // Здесь можно добавить очистку event listeners если нужно
  }
}