import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LakshProjectBlockData } from '../../_classes/project-block.class';
import { LakshSectionTitleComponent } from "../../../../_components/section-title/section-title.component";

@Component({
  selector: 'laksh-image-block',
  standalone: true,
  imports: [CommonModule, LakshSectionTitleComponent],
  templateUrl: './image-block.component.html',
  styleUrls: ['./image-block.component.scss']
})
export class LakshImageBlockComponent {
  data = input.required<LakshProjectBlockData>();
}
