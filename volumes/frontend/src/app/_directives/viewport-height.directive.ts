import { Directive, ElementRef, OnInit, OnDestroy, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[viewportHeight]',
  standalone: true
})
export class ViewportHeightDirective implements OnInit, OnDestroy {
  private resizeObserver: ResizeObserver | null = null;
  private visualViewport: VisualViewport | null = null;

  constructor(
    private el: ElementRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.setupViewportHeight();
    }
  }

  ngOnDestroy(): void {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
    if (this.visualViewport) {
      this.visualViewport.removeEventListener('resize', this.updateHeight);
    }
  }

  private setupViewportHeight(): void {
    // Используем Visual Viewport API если доступен
    if ('visualViewport' in window) {
      this.visualViewport = (window as any).visualViewport;
      this.updateHeight();
      this.visualViewport.addEventListener('resize', this.updateHeight);
    } else {
      // Fallback для старых браузеров
      this.resizeObserver = new ResizeObserver(() => {
        this.updateHeight();
      });
      this.resizeObserver.observe(document.documentElement);
    }
  }

  private updateHeight = (): void => {
    const height = this.visualViewport?.height || window.innerHeight;
    this.el.nativeElement.style.setProperty('--vh', `${height * 0.01}px`);
  };
}
