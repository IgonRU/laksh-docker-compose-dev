"""
Сериализаторы для приложения услуг.
"""

from rest_framework import serializers
from .models import ServiceGroup, Service, ServiceBlock, ServiceGalleryImage


class ServiceGalleryImageSerializer(serializers.ModelSerializer):
    """Сериализатор для изображений галереи услуги"""
    image = serializers.SerializerMethodField()
    
    class Meta:
        model = ServiceGalleryImage
        fields = ['image', 'caption']
    
    def get_image(self, obj):
        if obj.image:
            return obj.image.file.url
        return None


class ServiceBlockSerializer(serializers.ModelSerializer):
    """Сериализатор для блоков контента услуги"""
    data = serializers.SerializerMethodField()
    
    class Meta:
        model = ServiceBlock
        fields = ['type', 'data']
    
    def get_data(self, obj):
        """Формируем data блока в зависимости от типа"""
        data = {
            'title': obj.title,
            'subtitle': obj.subtitle,
        }
        
        if obj.type == 'text':
            data['text'] = obj.text
        elif obj.type in ['image', 'fixed']:
            data['description'] = obj.description
            data['image'] = obj.image.file.url if obj.image else None
        elif obj.type == 'gallery':
            data['description'] = obj.description
            # Используем изображения галереи
            gallery_images = obj.gallery_images.all().order_by('sort_order', 'id')
            if gallery_images.exists():
                data['images'] = [img.image.file.url for img in gallery_images]
            else:
                # Fallback на свойство images
                data['images'] = obj.images
            
        return data


class ServiceListItemSerializer(serializers.ModelSerializer):
    """Сериализатор для карточки услуги в списке"""
    linkUrl = serializers.CharField(source='alias')
    linkLabel = serializers.CharField(source='link_label')
    descriptionShort = serializers.CharField(source='description_short')
    image = serializers.SerializerMethodField()
    
    class Meta:
        model = Service
        fields = ['title', 'descriptionShort', 'image', 'linkLabel', 'linkUrl']
    
    def get_image(self, obj):
        if obj.image:
            return obj.image.file.url
        return None


class ServiceGroupSerializer(serializers.ModelSerializer):
    """Сериализатор для группы услуг со списком услуг"""
    image = serializers.SerializerMethodField()
    services = serializers.SerializerMethodField()
    
    class Meta:
        model = ServiceGroup
        fields = ['title', 'description', 'image', 'services']
    
    def get_image(self, obj):
        if obj.image:
            return obj.image.file.url
        return None
    
    def get_services(self, obj):
        """Получаем услуги через промежуточную таблицу, сортированные"""
        items = obj.service_items.filter(service__active=True).order_by('sort_order')
        services = [item.service for item in items]
        return ServiceListItemSerializer(services, many=True).data


class ServiceDetailSerializer(serializers.Serializer):
    """Сериализатор для детальной страницы услуги"""
    id = serializers.IntegerField()
    title = serializers.CharField()
    titleLead = serializers.CharField(source='title_lead')
    slogan = serializers.CharField()
    image = serializers.SerializerMethodField()
    description = serializers.CharField()
    alias = serializers.CharField()
    mainPage = serializers.BooleanField(source='mainpage')
    serviceType = serializers.CharField(source='service_type')
    blocks = serializers.SerializerMethodField()
    
    def get_image(self, obj):
        if obj.image:
            return obj.image.file.url
        return None
    
    def get_blocks(self, obj):
        """Получаем блоки услуги"""
        return ServiceBlockSerializer(obj.blocks.all().order_by('sort_order', 'id'), many=True).data

