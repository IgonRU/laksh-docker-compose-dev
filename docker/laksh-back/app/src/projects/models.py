from django.db import models
from wagtail.models import Orderable
from wagtail.admin.panels import FieldPanel, InlinePanel, MultiFieldPanel
from wagtail.snippets.models import register_snippet
from wagtail.fields import RichTextField
from wagtail.images.models import Image
from modelcluster.models import ClusterableModel
from modelcluster.fields import ParentalKey
from content_blocks.models import BaseContentBlock, BaseGalleryImage


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
    description = RichTextField(verbose_name="Описание", blank=True)
    alias = models.SlugField(max_length=200, unique=True, verbose_name="Алиас")
    
    # Отображение на главной
    mainpage = models.BooleanField(default=False, verbose_name="Отображать на главной")
    
    # Info fields
    project_type = models.CharField(max_length=100, verbose_name="Тип проекта", blank=True)
    region = models.CharField(max_length=100, verbose_name="Регион", blank=True)
    style = models.CharField(max_length=200, verbose_name="Стиль", blank=True)
    area = models.IntegerField(verbose_name="Площадь (м²)", null=True, blank=True)
    start_year = models.IntegerField(verbose_name="Год начала", null=True, blank=True)
    end_year = models.IntegerField(verbose_name="Год окончания", null=True, blank=True)
    plants_total = models.IntegerField(verbose_name="Всего растений", null=True, blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    panels = [
        MultiFieldPanel([
            FieldPanel('title'),
            FieldPanel('title_lead'),
            FieldPanel('slogan'),
            FieldPanel('image'),
            FieldPanel('description'),
            FieldPanel('alias'),
            FieldPanel('mainpage'),
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


class ProjectGalleryImage(BaseGalleryImage):
    """Изображение для галереи проекта"""
    block = ParentalKey('ProjectBlock', on_delete=models.CASCADE, related_name='gallery_images')

    class Meta:
        verbose_name = "Изображение галереи"
        verbose_name_plural = "Изображения галереи"


class ProjectBlock(BaseContentBlock):
    """Блоки контента проекта"""
    project = ParentalKey(Project, on_delete=models.CASCADE, related_name='blocks')

    class Meta:
        verbose_name = "Блок контента"
        verbose_name_plural = "Блоки контента"
