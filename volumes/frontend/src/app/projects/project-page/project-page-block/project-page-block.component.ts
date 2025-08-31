import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LakshProjectBlock } from '../_classes/project-block.class';
import { LakshTextBlockComponent } from './text-block/text-block.component';
import { LakshImageBlockComponent } from './image-block/image-block.component';
import { LakshFixedBlockComponent } from './fixed-block/fixed-block.component';
import { LakshGalleryBlockComponent } from './gallery-block/gallery-block.component';

@Component({
  selector: 'laksh-project-page-block',
  standalone: true,
  imports: [
    CommonModule,
    LakshTextBlockComponent,
    LakshImageBlockComponent,
    LakshFixedBlockComponent,
    LakshGalleryBlockComponent
  ],
  templateUrl: './project-page-block.component.html',
  styleUrl: './project-page-block.component.scss'
})
export class LakshProjectPageBlockComponent {
  block = input.required<LakshProjectBlock>();
}
