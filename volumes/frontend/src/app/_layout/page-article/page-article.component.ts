import { Component, input } from '@angular/core';
import { LakshPageTitleComponent } from "../../_components/page-title/page-title.component";

@Component({
  selector: 'laksh-page-article',
  standalone: true,
  imports: [LakshPageTitleComponent],
  templateUrl: './page-article.component.html',
  styleUrl: './page-article.component.scss'
})
export class LakshPageArticleComponent {
  title = input<string>('Заголовок H1');
  subtitle = input<string>('Тут кратко и креативно пишем подзаголовок. Пусто - не будет отображаться.');
}
