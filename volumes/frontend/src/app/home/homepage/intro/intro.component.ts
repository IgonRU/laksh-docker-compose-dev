import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LakshPageTitleComponent } from "../../../_components/page-title/page-title.component";

@Component({
  selector: 'laksh-intro',
  standalone: true,
  imports: [CommonModule, LakshPageTitleComponent],
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss']
})
export class IntroComponent {
}