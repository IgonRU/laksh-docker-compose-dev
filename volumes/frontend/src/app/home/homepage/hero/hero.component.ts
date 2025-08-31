import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LakshFixedBackgroundBlockComponent } from "../../../_components/fixed-background-block/fixed-background-block.component";

@Component({
  selector: 'laksh-hero',
  standalone: true,
  imports: [CommonModule, LakshFixedBackgroundBlockComponent],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent {
  backgroundImage = "url('https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=2000&q=60')";
}