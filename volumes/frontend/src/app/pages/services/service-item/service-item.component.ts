import { Component, Input, ViewEncapsulation } from '@angular/core';
import { LakshServiceItem } from '../_classes/service-item.class';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'laksh-service-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './service-item.component.html',
  styleUrl: './service-item.component.scss',
  encapsulation: ViewEncapsulation.None,

})
export class LakshServiceItemComponent {
  @Input() serviceItem: LakshServiceItem;
  @Input() serviceIndex: number;
  @Input() toggleStep: (serviceIndex: number, stepIndex: number) => void;
  @Input() isStepOpen: (serviceIndex: number, stepIndex: number) => boolean;

  formatStepNumber(stepNumber: number): string {
    return stepNumber.toString().padStart(2, '0');
  }
}
