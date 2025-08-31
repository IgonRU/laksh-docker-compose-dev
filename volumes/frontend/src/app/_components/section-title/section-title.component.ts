import { Component, input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'laksh-section-title',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './section-title.component.html',
  styleUrls: ['./section-title.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LakshSectionTitleComponent {
  title = input<string>('');
  subtitle = input<string>('');
  route = input<string>('');
}
