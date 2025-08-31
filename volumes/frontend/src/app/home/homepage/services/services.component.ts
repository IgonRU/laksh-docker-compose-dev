import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LakshSectionTitleComponent } from "../../../_components/section-title/section-title.component";

export interface Service {
  id: number;
  title: string;
  description: string;
  bullets: string[];
  note: string;
  image: string;
  imageAlt: string;
  reverse?: boolean;
}

@Component({
  selector: 'laksh-services',
  standalone: true,
  imports: [CommonModule, LakshSectionTitleComponent],
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent {
  services: Service[] = [
    {
      id: 1,
      title: 'Проектирование',
      description: 'От анализа участка и концепции — до рабочей документации и ведомостей. Продумываем логику пространства, материалы, инженерные узлы и посадки.',
      bullets: [
        'Концепция, планировочные решения, 3D',
        'Рабочая документация: генплан, разбивка, ведомости',
        'Инженерия: дренаж, освещение, автополив',
        'Дендроплан, подбор растений, рекомендации по уходу'
      ],
      note: 'Результат — понятный пакет чертежей и спецификаций для точной реализации.',
      image: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=2400&q=70',
      imageAlt: 'Проектирование — работа с планами и 3D'
    },
    {
      id: 2,
      title: 'Реализация',
      description: 'Ведём работы под ключ: от подготовки основания и инженерных систем до озеленения и запуска объекта. Работаем по проекту и контролируем качество на каждом этапе.',
      bullets: [
        'Подготовка: земляные работы, основания, уклоны',
        'Благоустройство и МАФ, освещение, автополив',
        'Водоёмы, камень, покрытия, малые формы',
        'Озеленение, стабилизация газонов, мульчирование'
      ],
      note: 'Опытные бригады, проверенные материалы, авторский надзор.',
      image: 'https://images.unsplash.com/photo-1597262975002-c5c3b14bbd62?auto=format&fit=crop&w=2400&q=70',
      imageAlt: 'Реализация — благоустройство и озеленение на участке',
      reverse: true
    }
  ];
}