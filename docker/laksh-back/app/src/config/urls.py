"""
URL configuration for config project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path
from wagtail.admin import urls as wagtailadmin_urls
from wagtail import urls as wagtail_urls
from wagtail.documents import urls as wagtaildocs_urls
from django.conf import settings
from django.conf.urls.static import static
from projects.views import ProjectDetailAPIView
from services.views import ServiceGroupListAPIView

urlpatterns = [
    path('django-mahant/', admin.site.urls),
    path('mahant/', include(wagtailadmin_urls)),
    path('documents/', include(wagtaildocs_urls)),
    # Услуги и проекты без завершающего слэша должны обрабатываться до общего API-поддерева
    path('api/services', ServiceGroupListAPIView.as_view(), name='service-group-root'),
    re_path(r'^api/services/', include('services.urls')),
    path('api/projects', include('projects.urls')),
    path('api/projects/<slug:alias>', ProjectDetailAPIView.as_view(), name='project-detail-root'),
    # API корень: подключаем поддерево /api/... (без требуемого завершающего слэша у конечных URL)
    re_path(r'^api/', include('apps.api.urls')),
    # Дубли с завершающим слэшем
    # path('api/', include('apps.api.urls')),
    # path('api/projects/', include('projects.urls')),
    path('', include(wagtail_urls)),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
