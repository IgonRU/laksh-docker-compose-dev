from . import views
from django.urls import path, include


urlpatterns = [
    path('addTicket', views.add_ticket),
]
