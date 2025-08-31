import { Component, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LakshProjectBlockData } from '../../_classes/project-block.class';
import { LakshSectionTitleComponent } from "../../../../_components/section-title/section-title.component";

@Component({
  selector: 'laksh-gallery-block',
  standalone: true,
  imports: [CommonModule, LakshSectionTitleComponent],
  templateUrl: './gallery-block.component.html',
  styleUrls: ['./gallery-block.component.scss']
})
export class LakshGalleryBlockComponent {
  data = input.required<LakshProjectBlockData>();
  
  isLightboxOpen = signal(false);
  currentImageIndex = signal(0);

  openLightbox(index: number): void {
    this.currentImageIndex.set(index);
    this.isLightboxOpen.set(true);
    document.body.style.overflow = 'hidden';
  }

  closeLightbox(): void {
    this.isLightboxOpen.set(false);
    document.body.style.overflow = 'auto';
  }

  nextImage(): void {
    const images = this.data().images;
    if (images && images.length > 0) {
      const nextIndex = (this.currentImageIndex() + 1) % images.length;
      this.currentImageIndex.set(nextIndex);
    }
  }

  prevImage(): void {
    const images = this.data().images;
    if (images && images.length > 0) {
      const prevIndex = this.currentImageIndex() === 0 
        ? images.length - 1 
        : this.currentImageIndex() - 1;
      this.currentImageIndex.set(prevIndex);
    }
  }

  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.closeLightbox();
    } else if (event.key === 'ArrowRight') {
      this.nextImage();
    } else if (event.key === 'ArrowLeft') {
      this.prevImage();
    }
  }
}
