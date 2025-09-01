from django.db import models
from wagtail.models import Orderable
from wagtail.admin.panels import FieldPanel, InlinePanel, MultiFieldPanel
from wagtail.snippets.models import register_snippet
from wagtail.fields import RichTextField
from wagtail.images.models import Image
from modelcluster.models import ClusterableModel
from modelcluster.fields import ParentalKey
import json


@register_snippet
class Plant(models.Model):
    """Растение для проектов"""
    name = models.CharField(max_length=200, verbose_name="Название")
    image = models.ForeignKey(
        Image,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        verbose_name="Изображение"
    )
    description = models.TextField(verbose_name="Описание")

    panels = [
        FieldPanel('name'),
        FieldPanel('image'),
        FieldPanel('description'),
    ]

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Растение"
        verbose_name_plural = "Растения"


@register_snippet
class Project(ClusterableModel):
    """Проект ландшафтного дизайна"""
    title = models.CharField(max_length=200, verbose_name="Название")
    title_lead = models.CharField(max_length=300, verbose_name="Подзаголовок")
    slogan = models.CharField(max_length=300, verbose_name="Слоган")
    image = models.ForeignKey(
        Image,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        verbose_name="Главное изображение"
    )
    description = RichTextField(verbose_name="Описание")
    url = models.SlugField(max_length=200, unique=True, verbose_name="URL")
    
    # Info fields
    project_type = models.CharField(max_length=100, verbose_name="Тип проекта")
    region = models.CharField(max_length=100, verbose_name="Регион")
    style = models.CharField(max_length=200, verbose_name="Стиль")
    area = models.IntegerField(verbose_name="Площадь (м²)")
    start_year = models.IntegerField(verbose_name="Год начала")
    end_year = models.IntegerField(verbose_name="Год окончания")
    plants_total = models.IntegerField(verbose_name="Всего растений")
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    panels = [
        MultiFieldPanel([
            FieldPanel('title'),
            FieldPanel('title_lead'),
            FieldPanel('slogan'),
            FieldPanel('image'),
            FieldPanel('description'),
            FieldPanel('url'),
        ], heading="Основная информация"),
        
        MultiFieldPanel([
            FieldPanel('project_type'),
            FieldPanel('region'),
            FieldPanel('style'),
            FieldPanel('area'),
            FieldPanel('start_year'),
            FieldPanel('end_year'),
            FieldPanel('plants_total'),
        ], heading="Информация о проекте"),
        
        InlinePanel('plants', label="Растения"),
        InlinePanel('features', label="Характеристики"),
        InlinePanel('blocks', label="Блоки контента"),
    ]

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "Проект"
        verbose_name_plural = "Проекты"
        ordering = ['-created_at']


class ProjectPlant(Orderable):
    """Растения в проекте"""
    project = ParentalKey(Project, on_delete=models.CASCADE, related_name='plants')
    plant = models.ForeignKey(Plant, on_delete=models.CASCADE, verbose_name="Растение")

    panels = [
        FieldPanel('plant'),
    ]

    class Meta:
        verbose_name = "Растение проекта"
        verbose_name_plural = "Растения проекта"


class ProjectFeature(Orderable):
    """Характеристики проекта"""
    project = ParentalKey(Project, on_delete=models.CASCADE, related_name='features')
    name = models.CharField(max_length=100, verbose_name="Название")
    description = models.CharField(max_length=200, verbose_name="Значение")

    panels = [
        FieldPanel('name'),
        FieldPanel('description'),
    ]

    class Meta:
        verbose_name = "Характеристика"
        verbose_name_plural = "Характеристики"


class ProjectBlock(Orderable):
    """Блоки контента проекта"""
    BLOCK_TYPES = [
        ('text', 'Текстовый блок'),
        ('image', 'Изображение'),
        ('fixed', 'Фиксированный блок'),
        ('gallery', 'Галерея'),
    ]
    
    project = ParentalKey(Project, on_delete=models.CASCADE, related_name='blocks')
    type = models.CharField(max_length=20, choices=BLOCK_TYPES, verbose_name="Тип блока")
    
    # Поля для всех типов блоков
    title = models.CharField(max_length=200, verbose_name="Заголовок")
    subtitle = models.CharField(max_length=300, blank=True, verbose_name="Подзаголовок")
    description = models.TextField(blank=True, verbose_name="Описание")
    
    # Поля для блоков с изображениями
    image = models.ForeignKey(
        Image,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        verbose_name="Изображение"
    )
    
    # Поля для текстовых блоков
    text = models.TextField(blank=True, verbose_name="Текст")
    
    # Поля для галереи (JSON массив URL)
    images_json = models.TextField(blank=True, verbose_name="Изображения (JSON)")

    panels = [
        FieldPanel('type'),
        FieldPanel('title'),
        FieldPanel('subtitle'),
        FieldPanel('description'),
        FieldPanel('image'),
        FieldPanel('text'),
        FieldPanel('images_json'),
    ]

    @property
    def images(self):
        """Возвращает список изображений для галереи"""
        if self.images_json:
            try:
                return json.loads(self.images_json)
            except json.JSONDecodeError:
                return []
        return []

    def __str__(self):
        return f"{self.get_type_display()}: {self.title}"

    class Meta:
        verbose_name = "Блок контента"
        verbose_name_plural = "Блоки контента"
