import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'laksh-about-person',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './laksh-about-person.component.html',
  styleUrls: ['./laksh-about-person.component.scss']
})
export class LakshAboutPersonComponent {
  portrait = input<string>('');
  name = input<string>('');
  title = input<string>('');
  role = input<string>('');
  biography = input<string>('');
  rtl = input<boolean>(false);
}
