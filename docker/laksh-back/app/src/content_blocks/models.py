"""
Базовые абстрактные модели для блоков контента.
Используются как основа для создания блоков в разных приложениях (projects, services и т.д.).
"""

from django.db import models
from wagtail.models import Orderable
from wagtail.admin.panels import FieldPanel, InlinePanel
from wagtail.images.models import Image
from modelcluster.models import ClusterableModel


class BaseContentBlock(Orderable, ClusterableModel):
    """
    Базовый абстрактный блок контента.
    Наследуется конкретными блоками: ProjectBlock, ServiceBlock и т.д.
    """
    BLOCK_TYPES = [
        ('text', 'Текстовый блок'),
        ('image', 'Изображение'),
        ('fixed', 'Фиксированный блок'),
        ('gallery', 'Галерея'),
    ]
    
    type = models.CharField(
        max_length=20,
        choices=BLOCK_TYPES,
        verbose_name="Тип блока",
        blank=True,
        null=True
    )
    
    # Поля для всех типов блоков
    title = models.CharField(max_length=200, verbose_name="Заголовок", blank=True)
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

    panels = [
        FieldPanel('type'),
        FieldPanel('title'),
        FieldPanel('subtitle'),
        FieldPanel('description'),
        FieldPanel('image'),
        FieldPanel('text'),
        InlinePanel('gallery_images', label="Изображения галереи"),
    ]

    @property
    def images(self):
        """Возвращает список изображений для галереи (для обратной совместимости)"""
        gallery_images = self.gallery_images.all()
        if gallery_images.exists():
            return [img.image.file.url for img in gallery_images]
        return []

    def __str__(self):
        type_display = self.get_type_display() if self.type else "Блок"
        return f"{type_display}: {self.title}"

    class Meta:
        abstract = True
        verbose_name = "Блок контента"
        verbose_name_plural = "Блоки контента"


class BaseGalleryImage(Orderable):
    """
    Базовое абстрактное изображение для галереи.
    Наследуется конкретными классами: ProjectGalleryImage, ServiceGalleryImage и т.д.
    """
    image = models.ForeignKey(
        Image,
        on_delete=models.CASCADE,
        verbose_name="Изображение"
    )
    caption = models.CharField(max_length=200, blank=True, verbose_name="Подпись")

    panels = [
        FieldPanel('image'),
        FieldPanel('caption'),
    ]

    class Meta:
        abstract = True
        verbose_name = "Изображение галереи"
        verbose_name_plural = "Изображения галереи"

