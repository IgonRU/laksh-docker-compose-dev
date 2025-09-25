from django.db import models
from wagtail.snippets.models import register_snippet
from wagtail.admin.panels import FieldPanel


@register_snippet
class Person(models.Model):
    alias = models.SlugField(unique=True, verbose_name='Алиас')
    name = models.CharField(max_length=255, verbose_name='Имя')
    title = models.CharField(max_length=255, blank=True, verbose_name='Заголовок')
    role = models.CharField(max_length=255, blank=True, verbose_name='Роль')
    biography = models.TextField(blank=True, verbose_name='Биография')
    portrait = models.ForeignKey(
        'wagtailimages.Image',
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+',
        verbose_name='Портрет'
    )
    active = models.BooleanField(default=True, verbose_name='Активен')

    panels = [
        FieldPanel('alias'),
        FieldPanel('name'),
        FieldPanel('title'),
        FieldPanel('role'),
        FieldPanel('biography'),
        FieldPanel('portrait'),
        FieldPanel('active'),
    ]

    class Meta:
        db_table = 'people'
        verbose_name = 'Персона'
        verbose_name_plural = 'Персоны'

    def __str__(self):
        return self.name


