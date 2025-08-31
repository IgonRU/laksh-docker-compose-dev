import { Component, input } from '@angular/core';
import {LakshPhoneNumberComponent} from "../../_components/phone-number/phone-number.component";
import {LakshEmailAddressComponent} from "../../_components/email-address/email-address.component";
import { LakshFixedBackgroundBlockComponent } from "../../_components/fixed-background-block/fixed-background-block.component";
import { LakshContactWhatsappComponent } from "../../_components/contact-whatsapp/contact-whatsapp.component";
import { LakshContactYoutubeComponent } from "../../_components/contact-youtube/contact-youtube.component";
import { LakshContactVkComponent } from "../../_components/contact-vk/contact-vk.component";
import { LakshContactTelegramComponent } from "../../_components/contact-telegram/contact-telegram.component";
import { FeedbackFormComponent } from "../../_components/feedback-form/feedback-form.component";
import { LakshContactTelegramElenaComponent } from "../../_components/contact-telegram-elena/contact-telegram-elena.component";
import { BuildInfoComponent } from "../../_components/build-info/build-info.component";

@Component({
  selector: 'laksh-page-footer',
  standalone: true,
  imports: [
    LakshPhoneNumberComponent,
    LakshEmailAddressComponent,
    LakshFixedBackgroundBlockComponent,
    LakshContactWhatsappComponent,
    LakshContactYoutubeComponent,
    LakshContactVkComponent,
    LakshContactTelegramComponent,
    FeedbackFormComponent,
    LakshContactTelegramElenaComponent,
    BuildInfoComponent
],
  templateUrl: './page-footer.component.html',
  styleUrls: ['./page-footer.component.scss']
})
export class LakshPageFooterComponent {
  backgroundImage = input<string>('url(https://images.unsplash.com/photo-1495954484750-af469f2f9be5?auto=format&fit=crop&w=2000&q=60)');

  currentYear = new Date().getFullYear();
}
