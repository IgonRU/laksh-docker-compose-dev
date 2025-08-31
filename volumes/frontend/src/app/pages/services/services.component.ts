import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LakshPageArticleComponent } from "../../_layout/page-article/page-article.component";
import { LeadContentComponent } from "../../_components/lead-content/lead-content.component";
import { LakshServiceListComponent } from "./service-list/service-list.component";

@Component({
  selector: 'laksh-services',
  standalone: true,
  imports: [CommonModule, LakshPageArticleComponent, LeadContentComponent, LakshServiceListComponent],
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class LakshServicesComponent {
  // Компонент для страницы с услугами компании
}
