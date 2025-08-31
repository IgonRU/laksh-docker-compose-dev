from django.contrib import admin
from .models import Ticket


@admin.register(Ticket)
class CustomAdminClass(admin.ModelAdmin):
    pass
