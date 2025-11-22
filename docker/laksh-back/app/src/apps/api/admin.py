from django.contrib import admin
from .models import FeedbackMessage


@admin.register(FeedbackMessage)
class FeedbackMessageAdmin(admin.ModelAdmin):
    list_display = ("created_at", "name", "phone", "source_page", "ip_address")
    list_filter = ("created_at",)
    search_fields = ("name", "phone", "request", "source_page", "ip_address", "user_agent")
    readonly_fields = ("created_at",)

from django.contrib import admin
from .models import Ticket


@admin.register(Ticket)
class CustomAdminClass(admin.ModelAdmin):
    pass
