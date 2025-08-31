from django.db import models
from wagtail.models import Page
from wagtail.fields import RichTextField
from wagtail.admin.panels import FieldPanel


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
