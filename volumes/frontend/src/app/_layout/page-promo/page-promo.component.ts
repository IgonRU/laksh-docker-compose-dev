import { Component, input } from '@angular/core';
import { LakshPageTitleComponent } from "../../_components/page-title/page-title.component";
import { LakshFixedBackgroundBlockComponent } from "../../_components/fixed-background-block/fixed-background-block.component";

@Component({
  selector: 'laksh-page-promo',
  standalone: true,
  imports: [LakshPageTitleComponent, LakshFixedBackgroundBlockComponent],
  templateUrl: './page-promo.component.html',
  styleUrl: './page-promo.component.scss'
})
export class LakshPagePromoComponent {
  title = input<string>('Заголовок H1');
  subtitle = input<string>('Тут кратко и креативно пишем подзаголовок. Пусто - не будет отображаться.');
  image = input<string>('https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=1200&q=80');
}
