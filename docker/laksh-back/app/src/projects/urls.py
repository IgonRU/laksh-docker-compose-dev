from django.urls import path
from .views import ProjectListAPIView, ProjectDetailAPIView

app_name = 'projects'

urlpatterns = [
    path('', ProjectListAPIView.as_view(), name='project-list'),
    path('<slug:project_url>/', ProjectDetailAPIView.as_view(), name='project-detail'),
]
