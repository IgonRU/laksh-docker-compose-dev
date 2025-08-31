import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LakshPageArticleComponent } from "../../_layout/page-article/page-article.component";
import { LakshSectionTitleComponent } from "../../_components/section-title/section-title.component";
import { LakshAboutPersonComponent } from "./laksh-about-person/laksh-about-person.component";

@Component({
  selector: 'laksh-about-page',
  standalone: true,
  imports: [CommonModule, LakshPageArticleComponent, LakshSectionTitleComponent, LakshAboutPersonComponent],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class LakshAboutComponent {
  // Компонент для страницы "О ландшафтной студии"
}
