from wagtail import hooks
from wagtail.snippets.models import register_snippet
from .models import FeedbackMessage


@register_snippet
class FeedbackMessageSnippet(FeedbackMessage):
    class Meta:
        proxy = True
        verbose_name = 'Сообщение обратной связи'
        verbose_name_plural = 'Сообщения обратной связи'



