import { Component, OnInit, AfterViewInit, OnDestroy, Inject, PLATFORM_ID, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';
import { LakshSectionTitleComponent } from "../../../_components/section-title/section-title.component";

export interface Project {
  id: number;
  title: string;
  image: string;
  description: string;
  route: string;
}

@Component({
  selector: 'laksh-projects',
  standalone: true,
  imports: [CommonModule, LakshSectionTitleComponent],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit, AfterViewInit, OnDestroy {

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private elementRef: ElementRef
  ) {}

  projects: Project[] = [
    {
      id: 1,
      title: 'Проект 1 — Сосновый бор',
      description: 'Описание проекта 1',
      route: '/projects/1',
      image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=2400&q=70'
    },
    {
      id: 2,
      title: 'Проект 2 — Береговая линия',
      description: 'Описание проекта 2',
      route: '/projects/2',
      image: 'https://images.unsplash.com/photo-1459664018906-085c36f472af?auto=format&fit=crop&w=2400&q=70'
    },
    {
      id: 3,
      title: 'Проект 3 — Дача у озера',
      description: 'Описание проекта 3',
      route: '/projects/3',
      image: 'https://images.unsplash.com/photo-1493246318656-5bfd4cfb29b8?auto=format&fit=crop&w=2400&q=60'
    },
    {
      id: 4,
      title: 'Проект 4 — Каменный сад',
      description: 'Описание проекта 4',
      route: '/projects/4',
      image: 'https://images.unsplash.com/photo-1495954484750-af469f2f9be5?auto=format&fit=crop&w=2400&q=60'
    }
  ];

  currentIndex = 0;
  get lastIndex(): number { return this.projects.length - 1; }

  // Круговое пролистывание
  prev(): void { 
    if (this.currentIndex === 0) {
      this.currentIndex = this.lastIndex;
    } else {
      this.currentIndex--;
    }
  }
  
  next(): void { 
    if (this.currentIndex === this.lastIndex) {
      this.currentIndex = 0;
    } else {
      this.currentIndex++;
    }
  }
  
  goTo(index: number): void { 
    this.currentIndex = index; 
  }

  private intersectionObserver?: IntersectionObserver;
  
  // Переменные для drag & drop и touch
  private isDragging = false;
  private startX = 0;
  private startY = 0;
  private currentX = 0;
  private currentY = 0;
  private dragOffsetX = 0;
  private dragOffsetY = 0;
  private isHorizontalSwipe = false;
  private sliderTrack?: HTMLElement;

  ngOnInit(): void {
    // Инициализация
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.setupIntersectionObserver();
      this.setupDragAndTouch();
    }
  }

  ngOnDestroy(): void {
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
    }
    this.cleanupDragAndTouch();
  }

  private setupIntersectionObserver(): void {
    this.intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            // Компонент показан на 50% и более - прокручиваем к верху экрана
            this.elementRef.nativeElement.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }
        });
      },
      {
        threshold: 0.5, // Срабатывает при 50% видимости
        rootMargin: '0px'
      }
    );

    this.intersectionObserver.observe(this.elementRef.nativeElement);
  }

  private setupDragAndTouch(): void {
    this.sliderTrack = this.elementRef.nativeElement.querySelector('.slider-track');
    if (!this.sliderTrack) return;

    // Mouse events
    this.sliderTrack.addEventListener('mousedown', this.onMouseDown.bind(this));
    document.addEventListener('mousemove', this.onMouseMove.bind(this));
    document.addEventListener('mouseup', this.onMouseUp.bind(this));

    // Touch events
    this.sliderTrack.addEventListener('touchstart', this.onTouchStart.bind(this), { passive: false });
    this.sliderTrack.addEventListener('touchmove', this.onTouchMove.bind(this), { passive: false });
    this.sliderTrack.addEventListener('touchend', this.onTouchEnd.bind(this), { passive: false });

    // Prevent context menu
    this.sliderTrack.addEventListener('contextmenu', (e) => e.preventDefault());
  }

  private cleanupDragAndTouch(): void {
    if (this.sliderTrack) {
      this.sliderTrack.removeEventListener('mousedown', this.onMouseDown.bind(this));
      document.removeEventListener('mousemove', this.onMouseMove.bind(this));
      document.removeEventListener('mouseup', this.onMouseUp.bind(this));
      
      this.sliderTrack.removeEventListener('touchstart', this.onTouchStart.bind(this));
      this.sliderTrack.removeEventListener('touchmove', this.onTouchMove.bind(this));
      this.sliderTrack.removeEventListener('touchend', this.onTouchEnd.bind(this));
    }
  }

  // Mouse event handlers
  private onMouseDown(event: MouseEvent): void {
    this.isDragging = true;
    this.startX = event.clientX;
    this.startY = event.clientY;
    this.currentX = this.startX;
    this.currentY = this.startY;
    this.dragOffsetX = 0;
    this.dragOffsetY = 0;
    this.isHorizontalSwipe = false;
    this.sliderTrack?.classList.add('dragging');
  }

  private onMouseMove(event: MouseEvent): void {
    if (!this.isDragging) return;
    
    this.currentX = event.clientX;
    this.currentY = event.clientY;
    this.dragOffsetX = this.currentX - this.startX;
    this.dragOffsetY = this.currentY - this.startY;
    
    // Определяем направление свайпа только после минимального движения
    if (!this.isHorizontalSwipe && Math.abs(this.dragOffsetX) > 10 || Math.abs(this.dragOffsetY) > 10) {
      this.isHorizontalSwipe = Math.abs(this.dragOffsetX) > Math.abs(this.dragOffsetY);
    }
    
    // Если это горизонтальный свайп, обрабатываем слайдер
    if (this.isHorizontalSwipe && this.sliderTrack) {
      const translateX = -(this.currentIndex * 100) + (this.dragOffsetX / window.innerWidth * 100);
      this.sliderTrack.style.transform = `translateX(${translateX}vw)`;
      this.sliderTrack.style.transition = 'none';
    }
  }

  private onMouseUp(): void {
    if (!this.isDragging) return;
    
    this.isDragging = false;
    this.sliderTrack?.classList.remove('dragging');
    
    if (this.sliderTrack) {
      this.sliderTrack.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    }
    
    this.handleDragEnd();
  }

  // Touch event handlers
  private onTouchStart(event: TouchEvent): void {
    this.isDragging = true;
    this.startX = event.touches[0].clientX;
    this.startY = event.touches[0].clientY;
    this.currentX = this.startX;
    this.currentY = this.startY;
    this.dragOffsetX = 0;
    this.dragOffsetY = 0;
    this.isHorizontalSwipe = false;
    this.sliderTrack?.classList.add('dragging');
  }

  private onTouchMove(event: TouchEvent): void {
    if (!this.isDragging) return;
    
    this.currentX = event.touches[0].clientX;
    this.currentY = event.touches[0].clientY;
    this.dragOffsetX = this.currentX - this.startX;
    this.dragOffsetY = this.currentY - this.startY;
    
    // Определяем направление свайпа только после минимального движения
    if (!this.isHorizontalSwipe && Math.abs(this.dragOffsetX) > 10 || Math.abs(this.dragOffsetY) > 10) {
      this.isHorizontalSwipe = Math.abs(this.dragOffsetX) > Math.abs(this.dragOffsetY);
    }
    
    // Если это горизонтальный свайп, предотвращаем прокрутку страницы
    if (this.isHorizontalSwipe && event.cancelable) {
      event.preventDefault();
      
      if (this.sliderTrack) {
        const translateX = -(this.currentIndex * 100) + (this.dragOffsetX / window.innerWidth * 100);
        this.sliderTrack.style.transform = `translateX(${translateX}vw)`;
        this.sliderTrack.style.transition = 'none';
      }
    }
  }

  private onTouchEnd(): void {
    if (!this.isDragging) return;
    
    this.isDragging = false;
    this.sliderTrack?.classList.remove('dragging');
    
    if (this.sliderTrack) {
      this.sliderTrack.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    }
    
    this.handleDragEnd();
  }

  private handleDragEnd(): void {
    // Обрабатываем только горизонтальные свайпы
    if (this.isHorizontalSwipe) {
      const threshold = window.innerWidth * 0.2; // 20% от ширины экрана
      
      if (Math.abs(this.dragOffsetX) > threshold) {
        if (this.dragOffsetX > 0) {
          this.prev(); // Свайп вправо - предыдущий
        } else {
          this.next(); // Свайп влево - следующий
        }
      } else {
        // Возвращаемся к текущему слайду
        if (this.sliderTrack) {
          this.sliderTrack.style.transform = `translateX(-${this.currentIndex * 100}vw)`;
        }
      }
    }
    
    // Сбрасываем состояние
    this.dragOffsetX = 0;
    this.dragOffsetY = 0;
    this.isHorizontalSwipe = false;
  }
}