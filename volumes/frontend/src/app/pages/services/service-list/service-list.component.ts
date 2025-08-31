import { Component, OnInit } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { LakshServiceItemComponent } from "../service-item/service-item.component";
import { LakshServiceItem } from '../_classes/service-item.class';

@Component({
  selector: 'laksh-service-list',
  standalone: true,
  imports: [CommonModule,LakshServiceItemComponent, JsonPipe],
  templateUrl: './service-list.component.html',
  styleUrl: './service-list.component.scss'
})
export class LakshServiceListComponent implements OnInit {

  serviceItems: LakshServiceItem[] = [];
  
  // Индекс открытого шага для каждого сервиса (по умолчанию первый шаг в каждом сервисе)
  openStepIndexes: number[] = [];

  constructor() {
    this.initializeServiceItems();
  }

  serviceItemsJSON: any[] = [
    {
      title: 'Проектирование',
      description: 'Мы создаем проект, который будет соответствовать вашим потребностям и ожиданиям.',
      image: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=2400&q=70',
      serviceSteps: [
        {
          title: 'Разработка концепции',
          description: 'Мы создаем концепцию, которая будет соответствовать вашим потребностям и ожиданиям.',
          image: 'https://via.placeholder.com/1'
        },
        {
          title: 'Создание дендропроекта',
          description: 'Мы создаем дендропроект, который будет соответствовать вашим потребностям и ожиданиям.',
          image: 'https://via.placeholder.com/2'
        }
      ]
    },
    {
      title: 'Реализация',
      description: 'В нашей компании работают специально подготовленные специалисты, которые смогут реализовать проект любой сложности.',
      image: 'https://images.unsplash.com/photo-1597262975002-c5c3b14bbd62?auto=format&fit=crop&w=2400&q=70',
      serviceSteps: [
        {
          title: 'Подготовка документации',
          description: 'Мы подготавливаем все необходимые документы для реализации проекта',
          image: 'https://via.placeholder.com/1'
        },
        {
          title: 'План работ и согласование',
          description: 'При необходимости согласуем порядок и объем работы с смежными подрядчиками, работающими на объекте',
          image: 'https://via.placeholder.com/2'
        },
        {
          title: 'Реализация и гарантии',
          description: 'Мы реализуем проект и предоставляем гарантии на выполненные работы',
          image: 'https://via.placeholder.com/3'
        }
      ]
    }
  ];

  private initializeServiceItems(): void {
    this.serviceItems = this.serviceItemsJSON.map(item => new LakshServiceItem(item));
    // Инициализируем открытые шаги - по умолчанию первый шаг (индекс 0) в каждом сервисе
    this.openStepIndexes = this.serviceItems.map(() => 0);
  }

  /**
   * Переключает открытие/закрытие шага
   */
  toggleStep(serviceIndex: number, stepIndex: number): void {
    if (this.openStepIndexes[serviceIndex] === stepIndex) {
      // Если кликаем на уже открытый шаг - закрываем его
      this.openStepIndexes[serviceIndex] = -1;
    } else {
      // Иначе открываем новый шаг
      this.openStepIndexes[serviceIndex] = stepIndex;
    }
  }

  /**
   * Проверяет, открыт ли шаг
   */
  isStepOpen(serviceIndex: number, stepIndex: number): boolean {
    return this.openStepIndexes[serviceIndex] === stepIndex;
  }

  /**
   * Методы-обертки для передачи в дочерний компонент
   */
  getToggleStepFunction(): (serviceIndex: number, stepIndex: number) => void {
    return this.toggleStep.bind(this);
  }

  getIsStepOpenFunction(): (serviceIndex: number, stepIndex: number) => boolean {
    return this.isStepOpen.bind(this);
  }

  ngOnInit(): void {
    console.log('ngOnInit called');
    // Дополнительная инициализация если нужна
  }

}
