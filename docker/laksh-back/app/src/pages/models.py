from django.db import models
from wagtail.models import Page, Orderable
from wagtail.contrib.settings.models import BaseGenericSetting, register_setting
from wagtail.admin.panels import FieldPanel, InlinePanel, MultiFieldPanel
from wagtail.fields import RichTextField
from wagtail.admin.panels import FieldPanel
from modelcluster.models import ClusterableModel
from modelcluster.fields import ParentalKey
from wagtail.images.models import Image


class HomePage(Page):
    """Главная страница сайта"""
    body = RichTextField(blank=True, verbose_name="Содержание")

    content_panels = Page.content_panels + [
        FieldPanel('body'),
    ]

    class Meta:
        verbose_name = "Главная страница"
        verbose_name_plural = "Главные страницы"


class StandardPage(Page):
    """Обычная страница"""
    body = RichTextField(blank=True, verbose_name="Содержание")
    
    content_panels = Page.content_panels + [
        FieldPanel('body'),
    ]

    class Meta:
        verbose_name = "Обычная страница"
        verbose_name_plural = "Обычные страницы"


@register_setting
class MainPageSettings(BaseGenericSetting, ClusterableModel):
    """Настройки главной страницы (через Wagtail Settings)"""
    title = models.CharField(max_length=200, verbose_name="Заголовок")
    lead = models.CharField(max_length=500, blank=True, verbose_name="Пояснение")

    # Только проекты, отмеченные как mainpage=True, доступны для выбора
    portfolio_projects = models.ManyToManyField(
        'projects.Project',
        blank=True,
        related_name='in_homepage_portfolio',
        limit_choices_to={'mainpage': True},
        verbose_name="Проекты для портфолио"
    )

    panels = [
        FieldPanel('title'),
        FieldPanel('lead'),
        FieldPanel('portfolio_projects'),
        InlinePanel('hero_images', label='HERO Изображения'),
    ]

    class Meta:
        verbose_name = "Настройки главной страницы"
        verbose_name_plural = "Настройки главной страницы"


class MainPageHeroImage(Orderable):
    """Элемент списка HERO изображений для главной страницы"""
    parent = ParentalKey(
        MainPageSettings,
        on_delete=models.CASCADE,
        related_name='hero_images',
        verbose_name='Настройки главной страницы',
    )
    image = models.ForeignKey(
        'wagtailimages.Image',
        on_delete=models.CASCADE,
        related_name='+',
        verbose_name='Изображение',
    )

    panels = [
        FieldPanel('image'),
    ]

    class Meta:
        verbose_name = 'HERO изображение'
        verbose_name_plural = 'HERO изображения'


@register_setting
class AboutPageSettings(BaseGenericSetting, ClusterableModel):
    """Настройки страницы About (через Wagtail Settings)"""
    title = models.CharField(max_length=200, verbose_name="Заголовок")
    title_lead = models.CharField(max_length=500, blank=True, verbose_name="Подзаголовок")

    panels = [
        FieldPanel('title'),
        FieldPanel('title_lead'),
        InlinePanel('blocks', label='Блоки'),
    ]

    class Meta:
        verbose_name = "Настройки страницы About"
        verbose_name_plural = "Настройки страницы About"


class AboutPageBlock(Orderable, ClusterableModel):
    """Блоки контента для страницы About"""
    BLOCK_TYPES = [
        ('text', 'Текстовый блок'),
        ('image', 'Изображение'),
        ('fixed', 'Фиксированный блок'),
        ('gallery', 'Галерея'),
        ('persons', 'Персоны'),
    ]

    parent = ParentalKey(AboutPageSettings, on_delete=models.CASCADE, related_name='blocks', verbose_name='Настройки About')
    type = models.CharField(max_length=20, choices=BLOCK_TYPES, verbose_name="Тип блока", blank=True, null=True)

    # Общие поля
    title = models.CharField(max_length=200, verbose_name="Заголовок", blank=True)
    subtitle = models.CharField(max_length=300, blank=True, verbose_name="Подзаголовок")
    description = models.TextField(blank=True, verbose_name="Описание")
    image = models.ForeignKey(
        Image,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        verbose_name="Изображение"
    )
    text = RichTextField(blank=True, features=['h2', 'h3', 'bold', 'italic', 'ol', 'ul', 'link'], verbose_name="Текст")

    panels = [
        MultiFieldPanel([
            FieldPanel('type'),
            FieldPanel('title'),
            FieldPanel('subtitle'),
            FieldPanel('description'),
            FieldPanel('image'),
            FieldPanel('text'),
        ], heading="Настройки блока"),
        InlinePanel('gallery_images', label="Изображения галереи"),
        InlinePanel('persons', label="Персоны"),
    ]

    def __str__(self):
        return f"{self.get_type_display()}: {self.title}"

    class Meta:
        verbose_name = "Блок About"
        verbose_name_plural = "Блоки About"


class AboutGalleryImage(Orderable):
    """Изображение для галереи блока About"""
    block = ParentalKey(AboutPageBlock, on_delete=models.CASCADE, related_name='gallery_images')
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
        verbose_name = "Изображение галереи About"
        verbose_name_plural = "Изображения галереи About"


class AboutBlockPerson(Orderable):
    """Выбор персон для блока About"""
    block = ParentalKey(AboutPageBlock, on_delete=models.CASCADE, related_name='persons')
    person = models.ForeignKey(
        'people.Person',
        on_delete=models.CASCADE,
        verbose_name="Персона",
        limit_choices_to={'active': True},
    )

    panels = [
        FieldPanel('person'),
    ]

    class Meta:
        verbose_name = "Персона блока"
        verbose_name_plural = "Персоны блока"
