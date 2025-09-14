from wagtail.snippets.models import register_snippet
from wagtail.snippets.views.snippets import SnippetViewSet
from .models import FeedbackMessage


class FeedbackMessageSnippet(FeedbackMessage):
    class Meta:
        proxy = True
        verbose_name = 'Сообщение обратной связи'
        verbose_name_plural = 'Сообщения обратной связи'


class FeedbackMessageSnippetViewSet(SnippetViewSet):
    model = FeedbackMessageSnippet
    icon = 'mail'
    list_display = ('created_at', 'name', 'phone', 'request', 'source_page', 'ip_address')
    search_fields = ('name', 'phone', 'request', 'source_page', 'ip_address', 'user_agent')


register_snippet(FeedbackMessageSnippetViewSet)



