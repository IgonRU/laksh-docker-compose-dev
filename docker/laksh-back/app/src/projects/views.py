from rest_framework import generics
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import Project
from .serializers import ProjectSerializer, ProjectListSerializer


class ProjectListAPIView(generics.ListAPIView):
    """API для получения списка проектов"""
    queryset = Project.objects.all()
    serializer_class = ProjectListSerializer


class ProjectDetailAPIView(generics.RetrieveAPIView):
    """API для получения детальной информации о проекте"""
    queryset = Project.objects.prefetch_related('plants__plant', 'features', 'blocks')
    serializer_class = ProjectSerializer
    lookup_field = 'url'
    lookup_url_kwarg = 'project_url'
