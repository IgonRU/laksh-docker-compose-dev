from django.contrib import admin
from .models import Ticket
from django.contrib import admin
from unfold.admin import ModelAdmin


@admin.register(Ticket)
class CustomAdminClass(ModelAdmin):
    pass

# admin.site.register(Ticket)
# admin.py
