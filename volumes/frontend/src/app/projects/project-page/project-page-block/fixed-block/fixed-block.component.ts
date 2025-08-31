import { Component, input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LakshProjectBlockData } from '../../_classes/project-block.class';
import { LakshFixedBackgroundBlockComponent } from "../../../../_components/fixed-background-block/fixed-background-block.component";
import { LakshSectionTitleComponent } from "../../../../_components/section-title/section-title.component";

@Component({
  selector: 'laksh-fixed-block',
  standalone: true,
  imports: [CommonModule, LakshFixedBackgroundBlockComponent, LakshSectionTitleComponent],
  templateUrl: './fixed-block.component.html',
  styleUrls: ['./fixed-block.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LakshFixedBlockComponent {
  data = input.required<LakshProjectBlockData>();
}
