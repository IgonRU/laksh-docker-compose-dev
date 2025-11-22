from projects.models import Plant, Project, ProjectPlant, ProjectFeature, ProjectBlock

# Создаем растения
plant1 = Plant.objects.create(
    name='Сфера туи западной',
    image='https://images.unsplash.com/photo-1615485923070-4d4b1b4b2c12?auto=format&fit=crop&w=800&q=80',
    description='Компактная форма для акцентных посадок.'
)

plant2 = Plant.objects.create(
    name='Гортензия метельчатая',
    image='https://images.unsplash.com/photo-1600718374942-b3e6f0d5eafb?auto=format&fit=crop&w=800&q=80',
    description='Пышные соцветия, длительное цветение.'
)

plant3 = Plant.objects.create(
    name='Барбарис Тунберга',
    image='https://images.unsplash.com/photo-1615485923255-2c1a6d2e2e7e?auto=format&fit=crop&w=800&q=80',
    description='Яркая листва, хорошо держит форму бордюров.'
)

# Создаем проект
project = Project.objects.create(
    title='Сквер "Городская весна"',
    title_lead='Уютный сквер в центре города',
    slogan='Место, где оживает настроение',
    image='https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1200&q=80',
    description='<p>Сквер «Городская весна» — это компактное, но живописное пространство в центре города, созданное для ежедневного отдыха горожан.</p>',
    url='urban-spring',
    project_type='Сквер',
    region='Казань',
    style='Городской, камерный',
    area=6500,
    start_year=2021,
    end_year=2022,
    plants_total=210
)

# Добавляем растения к проекту
ProjectPlant.objects.create(project=project, plant=plant1)
ProjectPlant.objects.create(project=project, plant=plant2)
ProjectPlant.objects.create(project=project, plant=plant3)

# Добавляем характеристики
ProjectFeature.objects.create(project=project, name='Деревья', description='58')
ProjectFeature.objects.create(project=project, name='Кустарники', description='432')
ProjectFeature.objects.create(project=project, name='Многолетники', description='1250')
ProjectFeature.objects.create(project=project, name='Газон (м²)', description='980')

# Добавляем блоки контента
ProjectBlock.objects.create(
    project=project,
    type='text',
    title='Комфорт городской паузы',
    subtitle='Тишина в центре',
    text='Сквер ориентирован на короткие, но частые посещения: кофе-брейки, встречи, чтение.'
)

ProjectBlock.objects.create(
    project=project,
    type='image',
    title='Фонтан и вечерняя подсветка',
    subtitle='Точка притяжения',
    description='Фонтан работает в динамических сценариях, подсветка меняет сцену по времени суток.',
    image='https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=800&q=80'
)

ProjectBlock.objects.create(
    project=project,
    type='gallery',
    title='Настроения сквера',
    subtitle='Днем и вечером',
    description='Сезонные цветники, вечерний свет, места для встреч.',
    images_json='["https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1516570161787-2fd917215a3d?auto=format&fit=crop&w=800&q=80"]'
)

print('Тестовые данные созданы успешно!')
