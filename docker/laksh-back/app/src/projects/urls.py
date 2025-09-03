from django.urls import path
from .views import ProjectListAPIView, ProjectDetailAPIView

app_name = 'projects'

urlpatterns = [
    path('', ProjectListAPIView.as_view(), name='project-list'),  # будет доступен без слэша через include('.../projects')
    path('<slug:project_url>', ProjectDetailAPIView.as_view(), name='project-detail'),
]
