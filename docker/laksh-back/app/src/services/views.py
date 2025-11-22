"""
Views для API услуг.
"""

from rest_framework import generics
from django.db.models import Prefetch
from .models import ServiceGroup, Service
from .serializers import ServiceGroupSerializer, ServiceDetailSerializer


class ServiceGroupListAPIView(generics.ListAPIView):
    """API для получения списка групп услуг с услугами"""
    serializer_class = ServiceGroupSerializer
    
    def get_queryset(self):
        """Получаем только группы, у которых есть активные услуги"""
        return ServiceGroup.objects.prefetch_related(
            Prefetch(
                'services',
                queryset=Service.objects.filter(
                    active=True
                ).order_by('sort_order', 'id')
            )
        ).filter(
            services__active=True
        ).distinct().order_by('sort_order')


class ServiceDetailAPIView(generics.RetrieveAPIView):
    """API для получения детальной информации об услуге"""
    queryset = Service.objects.filter(active=True).prefetch_related('blocks')
    serializer_class = ServiceDetailSerializer
    lookup_field = 'alias'
    lookup_url_kwarg = 'alias'

