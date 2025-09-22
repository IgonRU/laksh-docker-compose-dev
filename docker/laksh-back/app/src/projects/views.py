from rest_framework import generics
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.db.models import Prefetch
from .models import Project, ProjectPlant, ProjectFeature
from .serializers import ProjectSerializer, ProjectListSerializer


class ProjectListAPIView(generics.ListAPIView):
    """API для получения списка проектов"""
    queryset = Project.objects.all()
    serializer_class = ProjectListSerializer


class ProjectDetailAPIView(generics.RetrieveAPIView):
    """API для получения детальной информации о проекте"""
    queryset = Project.objects.prefetch_related(
        Prefetch('plants', queryset=ProjectPlant.objects.select_related('plant').order_by('sort_order', 'id')),
        Prefetch('features', queryset=ProjectFeature.objects.order_by('sort_order', 'id')),
    )
    serializer_class = ProjectSerializer
    lookup_field = 'alias'
    lookup_url_kwarg = 'alias'
