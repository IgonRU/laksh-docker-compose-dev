from django.db import models
from wagtail.models import Page, Orderable
from wagtail.contrib.settings.models import BaseGenericSetting, register_setting
from wagtail.admin.panels import FieldPanel, InlinePanel
from wagtail.fields import RichTextField
from wagtail.admin.panels import FieldPanel
from modelcluster.models import ClusterableModel
from modelcluster.fields import ParentalKey


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
