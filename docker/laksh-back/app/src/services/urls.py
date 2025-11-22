from django.urls import path
from .views import ServiceGroupListAPIView, ServiceDetailAPIView

app_name = 'services'

urlpatterns = [
    path('', ServiceGroupListAPIView.as_view(), name='service-group-list'),
    path('<slug:alias>', ServiceDetailAPIView.as_view(), name='service-detail'),
]

