"""
Модели для приложения услуг.
Использует двухуровневую структуру: ServiceGroup (группы услуг) и Service (конкретные услуги).
Блоки контента наследуются от BaseContentBlock.
"""

from django.db import models
from wagtail.admin.panels import FieldPanel, InlinePanel, MultiFieldPanel
from wagtail.snippets.models import register_snippet
from wagtail.fields import RichTextField
from wagtail.images.models import Image
from modelcluster.models import ClusterableModel
from modelcluster.fields import ParentalKey
from content_blocks.models import BaseContentBlock, BaseGalleryImage


@register_snippet
class ServiceGroup(ClusterableModel):
    """Группа услуг (например, "Проектирование", "Реализация")"""
    title = models.CharField(max_length=200, verbose_name="Название группы")
    description = models.TextField(verbose_name="Описание группы")
    image = models.ForeignKey(
        Image,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        verbose_name="Изображение группы"
    )
    sort_order = models.IntegerField(default=0, verbose_name="Порядок отображения")
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    panels = [
        FieldPanel('title'),
        FieldPanel('description'),
        FieldPanel('image'),
        FieldPanel('sort_order'),
    ]

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "Группа услуг"
        verbose_name_plural = "Группы услуг"
        ordering = ['sort_order', 'title']


@register_snippet
class Service(ClusterableModel):
    """Конкретная услуга"""
    # Основная информация
    title = models.CharField(max_length=200, verbose_name="Название")
    title_lead = models.CharField(max_length=300, verbose_name="Подзаголовок", blank=True)
    slogan = models.CharField(max_length=300, verbose_name="Слоган", blank=True)
    alias = models.SlugField(max_length=200, unique=True, verbose_name="Алиас")
    group = models.ForeignKey(
        'ServiceGroup',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='services',
        verbose_name="Группа"
    )
    sort_order = models.IntegerField(default=0, verbose_name="Порядок в группе")
    
    # Изображение
    image = models.ForeignKey(
        Image,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        verbose_name="Главное изображение"
    )
    
    # Описания
    description_short = models.TextField(verbose_name="Краткое описание", help_text="Для карточки в списке")
    description = RichTextField(verbose_name="Полное описание", blank=True, help_text="Для детальной страницы")
    
    # Ссылка (для списка)
    link_label = models.CharField(
        max_length=100,
        verbose_name="Текст ссылки",
        default="Подробнее",
        help_text="Например: 'Подробнее про разработку концепции'"
    )
    
    # Дополнительная информация
    service_type = models.CharField(max_length=100, verbose_name="Тип услуги", blank=True)
    mainpage = models.BooleanField(default=False, verbose_name="Отображать на главной")
    active = models.BooleanField(default=True, verbose_name="Активна")
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    panels = [
        MultiFieldPanel([
            FieldPanel('title'),
            FieldPanel('title_lead'),
            FieldPanel('slogan'),
            FieldPanel('alias'),
            FieldPanel('image'),
            FieldPanel('group'),
            FieldPanel('sort_order'),
        ], heading="Основная информация"),
        
        MultiFieldPanel([
            FieldPanel('description_short'),
            FieldPanel('description'),
            FieldPanel('link_label'),
        ], heading="Описания"),
        
        MultiFieldPanel([
            FieldPanel('service_type'),
            FieldPanel('mainpage'),
            FieldPanel('active'),
        ], heading="Настройки"),
        
        InlinePanel('blocks', label="Блоки контента"),
    ]

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "Услуга"
        verbose_name_plural = "Услуги"
        ordering = ['-created_at']


class ServiceGalleryImage(BaseGalleryImage):
    """Изображение для галереи услуги"""
    block = ParentalKey('ServiceBlock', on_delete=models.CASCADE, related_name='gallery_images')

    class Meta:
        verbose_name = "Изображение галереи"
        verbose_name_plural = "Изображения галереи"


class ServiceBlock(BaseContentBlock):
    """Блоки контента услуги"""
    service = ParentalKey(Service, on_delete=models.CASCADE, related_name='blocks')

    class Meta:
        verbose_name = "Блок контента"
        verbose_name_plural = "Блоки контента"

