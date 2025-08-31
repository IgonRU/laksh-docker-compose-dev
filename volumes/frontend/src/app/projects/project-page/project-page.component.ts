import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { LakshPageArticleComponent } from "../../_layout/page-article/page-article.component";
import { Project } from "../project-card/project-card.component";
import { LakshPagePromoComponent } from "../../_layout/page-promo/page-promo.component";
import { LakshProject } from './_classes/project.class';
import { LeadContentComponent } from "../../_components/lead-content/lead-content.component";
import { LakshProjectPageBlockComponent } from './project-page-block/project-page-block.component';

@Component({
  selector: 'laksh-project-page',
  standalone: true,
  imports: [CommonModule, LakshPagePromoComponent, LakshPageArticleComponent, LeadContentComponent, LakshProjectPageBlockComponent],
  templateUrl: './project-page.component.html',
  styleUrl: './project-page.component.scss'
})
export class LakshProjectPageComponent implements OnInit {
  
  project: LakshProject | null = null;
  
  // Тестовые данные проектов (в реальном проекте это будет сервис)
  private projects = [
    {
      "id": 1,
      "title": "Парк \"Зеленый оазис\"",
      "titleLead": "Современный парк для отдыха и активного досуга",
      "slogan": "Здесь природа встречает город",
      "image": "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
      "description": "<p>Парк «Зеленый оазис» задуман как современное общественное пространство, где природа и город образуют гармоничный союз. Здесь жители могут отдохнуть в тени деревьев, насладиться цветочными клумбами и провести время с семьёй на благоустроенных площадках.</p><p>Особое внимание уделено созданию условий для активного досуга. Велосипедные дорожки, прогулочные маршруты и зоны для йоги позволяют сочетать отдых с физической активностью. Парк также стал местом проведения культурных мероприятий и городских праздников.</p><p>«Зеленый оазис» призван стать не только местом отдыха, но и пространством, формирующим экологическое мышление. Использование устойчивых растений и природных материалов подчеркивает бережное отношение к окружающей среде.</p>",
      "url": "/projects/green-oasis",
      "info": {
        "type": "Парк",
        "region": "Москва",
        "style": "Современный",
        "area": 25000,
        "startYear": 2019,
        "endYear": 2021,
        "plantsTotal": 320,
        "plantsList": [
          {
            "name": "Клен остролистный",
            "image": "https://images.unsplash.com/photo-1600628422019-90b518d4d2e3?auto=format&fit=crop&w=800&q=80",
            "description": "Декоративное дерево с яркой осенней листвой."
          },
          {
            "name": "Сирень обыкновенная",
            "image": "https://images.unsplash.com/photo-1622227926216-3bfb5a0d3278?auto=format&fit=crop&w=800&q=80",
            "description": "Кустарник с ароматными, медоносными соцветиями."
          },
          {
            "name": "Лаванда",
            "image": "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=800&q=80",
            "description": "Ароматный многолетник, формирует низкие бордюры."
          }
        ],
        "features": [
          { "name": "Деревья", "description": "101" },
          { "name": "Кустарники", "description": "860" },
          { "name": "Многолетники", "description": "2310" },
          { "name": "Газон (м²)", "description": "3520" }
        ]
      },
      "blocks": [
        {
          "type": "text",
          "data": {
            "title": "Идея и сценарии использования",
            "subtitle": "Парк для каждого дня",
            "text": "Планировочная структура парка выстроена вокруг петлевых маршрутов разной протяженности: короткой прогулки на 15 минут, семейного круга на 30 минут и веломаршрута на 45 минут. Так посетители выбирают темп и формат отдыха.\n\nВдоль маршрутов расположены тихие зоны чтения, места для утренней йоги и семейные пикник-поляны. Скамейки ориентированы на зеленые «картины» — миксбордеры и древесно-кустарниковые группы."
          }
        },
        {
          "type": "image",
          "data": {
            "title": "Игровые и спортивные ядра",
            "subtitle": "Безопасно и интересно",
            "description": "Площадки разделены по возрастам, покрытие — ударопоглощающее. Рядом — навесы и питьевые фонтаны.",
            "image": "https://images.unsplash.com/photo-1520975693413-1e6e1f64fd05?auto=format&fit=crop&w=800&q=80"
          }
        },
        {
          "type": "fixed",
          "data": {
            "title": "Зелёная инфраструктура",
            "subtitle": "Экосервисы и устойчивость",
            "description": "Ливневая вода собирается в понижения-рейн-гарденс, питающие древесно-кустарниковые посадки. Подбор растений ориентирован на низкий уход и круглогодичную декоративность.",
            "image": "https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf?auto=format&fit=crop&w=800&q=80"
          }
        },
        {
          "type": "gallery",
          "data": {
            "title": "Атмосфера «Зеленого оазиса»",
            "subtitle": "Маршруты, аллеи, события",
            "description": "Фрагменты велодорожек, вечерняя подсветка, пикниковые лужайки.",
            "images": [
              "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80",
              "https://images.unsplash.com/photo-1517959105821-eaf2591984b2?auto=format&fit=crop&w=800&q=80",
              "https://images.unsplash.com/photo-1520975867597-0f8d3f4a7e4c?auto=format&fit=crop&w=800&q=80"
            ]
          }
        }
      ]
    },
    {
      "id": 2,
      "title": "Ботанический сад \"Цветущий рай\"",
      "titleLead": "Сад с редкими растениями и оранжереями",
      "slogan": "Там, где каждый цветок вдохновляет",
      "image": "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=1200&q=80",
      "description": "<p>Ботанический сад «Цветущий рай» — это уникальное пространство, где собрана коллекция редких и экзотических растений со всего мира. Здесь каждый посетитель может прикоснуться к удивительному разнообразию природы и открыть для себя новые формы, цвета и ароматы.</p><p>Оранжереи с тропическими и субтропическими видами позволяют путешествовать по климатическим зонам, не покидая города. Пространство дополнено зонами для медитации и тихого созерцания, что делает сад местом восстановления внутреннего равновесия.</p><p>«Цветущий рай» выполняет и образовательную функцию: здесь проводятся экскурсии, лекции и мастер-классы, формируя у посетителей бережное отношение к биоразнообразию и природе в целом.</p>",
      "url": "/projects/flowering-paradise",
      "info": {
        "type": "Ботанический сад",
        "region": "Санкт-Петербург",
        "style": "Ботанический, коллекционный",
        "area": 18000,
        "startYear": 2018,
        "endYear": 2022,
        "plantsTotal": 1200,
        "plantsList": [
          {
            "name": "Магнолия Кобус",
            "image": "https://images.unsplash.com/photo-1523345863762-5b6b8f0f64b8?auto=format&fit=crop&w=800&q=80",
            "description": "Ранняя весенняя окраска, крупные белые цветки."
          },
          {
            "name": "Глициния китайская",
            "image": "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=800&q=80",
            "description": "Лиана с каскадами душистых кистей."
          },
          {
            "name": "Папоротник страусник",
            "image": "https://images.unsplash.com/photo-1493932484895-752d1471eab5?auto=format&fit=crop&w=800&q=80",
            "description": "Теневыносливый вид для влажных участков."
          }
        ],
        "features": [
          { "name": "Деревья", "description": "215" },
          { "name": "Кустарники", "description": "1576" },
          { "name": "Многолетники", "description": "3277" },
          { "name": "Газон (м²)", "description": "352" }
        ]
      },
      "blocks": [
        {
          "type": "text",
          "data": {
            "title": "Коллекции и маршруты",
            "subtitle": "Путешествие по климатическим зонам",
            "text": "Маршрут садовода ведет через четыре раздела: умеренная Евразия, Средиземноморье, субтропики и тропики. Для каждого раздела предусмотрены подписи, QR-метки и интерактивные карточки растений.\n\nКоллекционные посадки формируют «окна» в разные экосистемы — от грандиозных магнолий до миниатюрных эпифитов."
          }
        },
        {
          "type": "image",
          "data": {
            "title": "Тропическая оранжерея",
            "subtitle": "Микроклимат и уход",
            "description": "Система туманообразования поддерживает влажность, а приточно-вытяжная вентиляция — стабильную температуру.",
            "image": "https://images.unsplash.com/photo-1470246973918-29a93221c455?auto=format&fit=crop&w=800&q=80"
          }
        },
        {
          "type": "fixed",
          "data": {
            "title": "Образование и наука",
            "subtitle": "Экскурсии и гербарий",
            "description": "Еженедельные экскурсии, детские классы ботаники и фонд гербария на 5 000 образцов — база для учебных программ.",
            "image": "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80"
          }
        },
        {
          "type": "gallery",
          "data": {
            "title": "Атмосфера «Цветущего рая»",
            "subtitle": "Цветение круглый год",
            "description": "Фрагменты коллекций: лианы, орхидеи, тенелюбивые папоротники.",
            "images": [
              "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=80",
              "https://images.unsplash.com/photo-1516570161787-2fd917215a3d?auto=format&fit=crop&w=800&q=80",
              "https://images.unsplash.com/photo-1523978591478-c753949ff840?auto=format&fit=crop&w=800&q=80"
            ]
          }
        }
      ]
    },
    {
      "id": 3,
      "title": "Сквер \"Городская весна\"",
      "titleLead": "Уютный сквер в центре города",
      "slogan": "Место, где оживает настроение",
      "image": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1200&q=80",
      "description": "<p>Сквер «Городская весна» — это компактное, но живописное пространство в центре города, созданное для ежедневного отдыха горожан. Здесь можно спрятаться от суеты, присесть на лавочку у цветочной клумбы или насладиться прохладой фонтанов.</p><p>Особый шарм сквера создают декоративные кустарники и сезонные цветники, которые меняют облик пространства в течение года. Это место стало популярным среди офисных работников, студентов и жителей ближайших кварталов, которые приходят сюда за глотком свежего воздуха.</p><p>«Городская весна» — пример того, как даже небольшая территория способна превратиться в уютный уголок для общения, прогулок и тихих встреч с самим собой.</p>",
      "url": "/projects/urban-spring",
      "info": {
        "type": "Сквер",
        "region": "Казань",
        "style": "Городской, камерный",
        "area": 6500,
        "startYear": 2021,
        "endYear": 2022,
        "plantsTotal": 210,
        "plantsList": [
          {
            "name": "Сфера туи западной",
            "image": "https://images.unsplash.com/photo-1615485923070-4d4b1b4b2c12?auto=format&fit=crop&w=800&q=80",
            "description": "Компактная форма для акцентных посадок."
          },
          {
            "name": "Гортензия метельчатая",
            "image": "https://images.unsplash.com/photo-1600718374942-b3e6f0d5eafb?auto=format&fit=crop&w=800&q=80",
            "description": "Пышные соцветия, длительное цветение."
          },
          {
            "name": "Барбарис Тунберга",
            "image": "https://images.unsplash.com/photo-1615485923255-2c1a6d2e2e7e?auto=format&fit=crop&w=800&q=80",
            "description": "Яркая листва, хорошо держит форму бордюров."
          }
        ],
        "features": [
          { "name": "Деревья", "description": "58" },
          { "name": "Кустарники", "description": "432" },
          { "name": "Многолетники", "description": "1250" },
          { "name": "Газон (м²)", "description": "980" }
        ]
      },
      "blocks": [
        {
          "type": "text",
          "data": {
            "title": "Комфорт городской паузы",
            "subtitle": "Тишина в центре",
            "text": "Сквер ориентирован на короткие, но частые посещения: кофе-брейки, встречи, чтение. Места посадки с теневыми навесами чередуются с солнечными лужайками.\n\nПокрытия — износостойкие и антискользящие, бесбарьерная среда обеспечена на всех маршрутах."
          }
        },
        {
          "type": "image",
          "data": {
            "title": "Фонтан и вечерняя подсветка",
            "subtitle": "Точка притяжения",
            "description": "Фонтан работает в динамических сценариях, подсветка меняет сцену по времени суток.",
            "image": "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=800&q=80"
          }
        },
        {
          "type": "fixed",
          "data": {
            "title": "Малая архитектура",
            "subtitle": "Скамьи, перголы, урны",
            "description": "Все элементы выполнены в единой палитре материалов и устойчивы к вандализму. Размещение продумано для визуальных осей и удобства.",
            "image": "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80"
          }
        },
        {
          "type": "gallery",
          "data": {
            "title": "Настроения сквера",
            "subtitle": "Днем и вечером",
            "description": "Сезонные цветники, вечерний свет, места для встреч.",
            "images": [
              "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=800&q=80",
              "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=80",
              "https://images.unsplash.com/photo-1516570161787-2fd917215a3d?auto=format&fit=crop&w=800&q=80"
            ]
          }
        }
      ]
    },
    {
      "id": 4,
      "title": "Ландшафтный парк \"Времена года\"",
      "titleLead": "Парк с тематическими зонами для каждого сезона",
      "slogan": "Каждый сезон — новая история",
      "image": "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=80",
      "description": "<p>Ландшафтный парк «Времена года» создан по уникальной концепции: территория разделена на зоны, отражающие красоту каждого времени года. Весной здесь цветут аллеи сакуры, летом расстилаются яркие луга, осенью переливаются огненные клены, а зимой парк превращается в сказочный пейзаж с декоративными злаками.</p><p>Такая структура делает парк живым пространством, которое постоянно меняется и удивляет своих посетителей. Прогулка по парку превращается в маленькое путешествие через четыре времени года, где каждый сезон имеет свою атмосферу и настроение.</p><p>«Времена года» — это не только природная экспозиция, но и культурная площадка. Здесь проходят фестивали, выставки и семейные праздники, что делает парк центром притяжения для жителей и туристов.</p>",
      "url": "/projects/seasons",
      "info": {
        "type": "Ландшафтный парк",
        "region": "Подмосковье",
        "style": "Тематический, природный",
        "area": 42000,
        "startYear": 2017,
        "endYear": 2020,
        "plantsTotal": 980,
        "plantsList": [
          {
            "name": "Сакура (вишня мелкопильчатая)",
            "image": "https://images.unsplash.com/photo-1494783367193-149034c05e8f?auto=format&fit=crop&w=800&q=80",
            "description": "Весеннее цветение для зоны «Весна»."
          },
          {
            "name": "Рудбекия блестящая",
            "image": "https://images.unsplash.com/photo-1509043759401-136742328bb3?auto=format&fit=crop&w=800&q=80",
            "description": "Яркие летние акценты для зоны «Лето»."
          },
          {
            "name": "Злак мискантус",
            "image": "https://images.unsplash.com/photo-1560184897-43d2b9d1f2b8?auto=format&fit=crop&w=800&q=80",
            "description": "Эффектные метёлки и фактура для «Осени» и «Зимы»."
          }
        ],
        "features": [
          { "name": "Деревья", "description": "324" },
          { "name": "Кустарники", "description": "2180" },
          { "name": "Многолетники", "description": "4870" },
          { "name": "Газон (м²)", "description": "5120" }
        ]
      },
      "blocks": [
        {
          "type": "text",
          "data": {
            "title": "Четыре сезона в одном парке",
            "subtitle": "Иммерсивные маршруты",
            "text": "Каждая зона — самостоятельный сценарий с характерной палитрой, фактурами и ароматами. Переходы между зонами построены на мягких градиентах посадок, чтобы прогулка ощущалась как непрерывное путешествие.\n\nВ навигации используются пиктограммы сезонов, а также календарь фенологических событий — «когда куда идти»."
          }
        },
        {
          "type": "image",
          "data": {
            "title": "Весна и Лето",
            "subtitle": "Сакуры и луговые поляны",
            "description": "В «Весне» доминируют цветущие деревья, в «Лете» — злаково-луговые композиции и пикниковые площадки.",
            "image": "https://images.unsplash.com/photo-1458966480358-a0ac42de0a7a?auto=format&fit=crop&w=800&q=80"
          }
        },
        {
          "type": "fixed",
          "data": {
            "title": "Осень и Зима",
            "subtitle": "Огненные клены и графика злаков",
            "description": "В «Осени» — теплые тона листвы и поздние астры. «Зима» подчеркивает архитектуру побегов и сухих соцветий с вечерней подсветкой.",
            "image": "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80"
          }
        },
        {
          "type": "gallery",
          "data": {
            "title": "Моменты года",
            "subtitle": "Пульс сезона",
            "description": "Подборка видов из четырех сезонных локаций.",
            "images": [
              "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=800&q=80",
              "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=80",
              "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80"
            ]
          }
        }
      ]
    },
    {
      "id": 5,
      "title": "Эко-парк \"Природная гармония\"",
      "titleLead": "Экологический парк с дикими растениями и природными тропами",
      "slogan": "Дыхание природы в каждом шаге",
      "image": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80",
      "description": "<p>Эко-парк «Природная гармония» — это территория, где сохранена естественная экосистема и подчеркнута красота дикой природы. Здесь посетитель может почувствовать себя частью живого мира, исследуя тропы, ведущие через лесные массивы и луговые поля.</p><p>В парке сделан акцент на устойчивое развитие: растения подобраны так, чтобы поддерживать биологическое разнообразие и естественный баланс. Настилы и мостки позволяют пройтись по особо хрупким местам, не нарушая природную среду.</p><p>Эко-парк стал важным образовательным центром, где проводятся экскурсии, экологические занятия и мастер-классы для детей и взрослых. «Природная гармония» помогает формировать новое отношение к природе — уважительное, ответственное и вдохновляющее.</p>",
      "url": "/projects/natural-harmony",
      "info": {
        "type": "Эко-парк",
        "region": "ЮФО",
        "style": "Натуралистичный, устойчивый",
        "area": 36000,
        "startYear": 2020,
        "endYear": 2023,
        "plantsTotal": 1500,
        "plantsList": [
          {
            "name": "Куртина злаков (ковыль, овсяница)",
            "image": "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80",
            "description": "Малотребовательные степные виды для устойчивых сообществ."
          },
          {
            "name": "Ива белая",
            "image": "https://images.unsplash.com/photo-1516570161787-2fd917215a3d?auto=format&fit=crop&w=800&q=80",
            "description": "Влаголюбивая порода для прибрежных зон."
          },
          {
            "name": "Ракитник (сыпец)",
            "image": "https://images.unsplash.com/photo-1523292993219-6a3b0f2b9b33?auto=format&fit=crop&w=800&q=80",
            "description": "Фиксирует азот, улучшая почвы в биотопах парка."
          }
        ],
        "features": [
          { "name": "Деревья", "description": "187" },
          { "name": "Кустарники", "description": "1420" },
          { "name": "Многолетники", "description": "3950" },
          { "name": "Газон (м²)", "description": "2750" }
        ]
      },
      "blocks": [
        {
          "type": "text",
          "data": {
            "title": "Дикая природа — рядом",
            "subtitle": "Маршруты по биотопам",
            "text": "Маршруты спроектированы так, чтобы мягко вести посетителя через разные природные сообщества: опушки, влажные луга, прибрежные зоны. Информационные стенды рассказывают о видах и их роли в экосистеме.\n\nОсновные тропы — на настилах, чтобы защитить почву и микробиоту."
          }
        },
        {
          "type": "image",
          "data": {
            "title": "Настилы и мостки",
            "subtitle": "Берегите природу ногами",
            "description": "Деревянные настилы минимизируют вмешательство и сохраняют гидрологический режим почв.",
            "image": "https://images.unsplash.com/photo-1470770903676-69b98201ea1c?auto=format&fit=crop&w=800&q=80"
          }
        },
        {
          "type": "fixed",
          "data": {
            "title": "Водные экосистемы",
            "subtitle": "Пруды и канавы-аккумуляторы",
            "description": "Система малых прудов аккумулирует ливневые воды и создает местообитания для птиц и амфибий.",
            "image": "https://images.unsplash.com/photo-1516570161787-2fd917215a3d?auto=format&fit=crop&w=800&q=80"
          }
        },
        {
          "type": "gallery",
          "data": {
            "title": "Эко-детали",
            "subtitle": "Материалы и информирование",
            "description": "Указатели, стенды, места наблюдения за птицами.",
            "images": [
              "https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?auto=format&fit=crop&w=800&q=80",
              "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=800&q=80",
              "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80"
            ]
          }
        }
      ]
    }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const projectId = +params['id'];
      this.project = new LakshProject(this.projects.find(p => p.id === projectId)) || null;
      
      if (!this.project) {
        // Если проект не найден, перенаправляем на страницу проектов
        this.router.navigate(['/projects']);
      }
    });
  }
}
