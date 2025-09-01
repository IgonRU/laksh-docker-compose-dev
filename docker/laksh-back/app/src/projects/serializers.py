from rest_framework import serializers
from .models import Project, Plant, ProjectPlant, ProjectFeature, ProjectBlock


class PlantSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()
    
    class Meta:
        model = Plant
        fields = ['name', 'image', 'description']
    
    def get_image(self, obj):
        if obj.image:
            return obj.image.file.url
        return None


class ProjectPlantSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source='plant.name')
    image = serializers.SerializerMethodField()
    description = serializers.CharField(source='plant.description')
    
    class Meta:
        model = ProjectPlant
        fields = ['name', 'image', 'description']
    
    def get_image(self, obj):
        if obj.plant.image:
            return obj.plant.image.file.url
        return None


class ProjectFeatureSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectFeature
        fields = ['name', 'description']


class ProjectBlockSerializer(serializers.ModelSerializer):
    data = serializers.SerializerMethodField()
    
    class Meta:
        model = ProjectBlock
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
            data['images'] = obj.images
            
        return data


class ProjectSerializer(serializers.Serializer):
    """Простой сериализатор для детальной информации о проекте"""
    id = serializers.IntegerField()
    title = serializers.CharField()
    titleLead = serializers.SerializerMethodField()
    slogan = serializers.CharField()
    image = serializers.SerializerMethodField()
    description = serializers.CharField()
    url = serializers.CharField()
    info = serializers.SerializerMethodField()
    blocks = serializers.SerializerMethodField()
    
    def get_titleLead(self, obj):
        return obj.title_lead
    
    def get_image(self, obj):
        if obj.image:
            return obj.image.file.url
        return None
    
    def get_info(self, obj):
        """Формируем объект info"""
        plants_data = []
        features_data = []
        
        for plant in obj.plants.all():
            plants_data.append({
                'name': plant.plant.name,
                'image': plant.plant.image.file.url if plant.plant.image else None,
                'description': plant.plant.description
            })
        
        for feature in obj.features.all():
            features_data.append({
                'name': feature.name,
                'description': feature.description
            })
        
        return {
            'type': obj.project_type,
            'region': obj.region,
            'style': obj.style,
            'area': obj.area,
            'startYear': obj.start_year,
            'endYear': obj.end_year,
            'plantsTotal': obj.plants_total,
            'plantsList': plants_data,
            'features': features_data,
        }
    
    def get_blocks(self, obj):
        """Получаем блоки проекта"""
        return ProjectBlockSerializer(obj.blocks.all(), many=True).data


class ProjectListSerializer(serializers.ModelSerializer):
    """Сериализатор для списка проектов (краткая информация)"""
    titleLead = serializers.CharField(source='title_lead')
    image = serializers.SerializerMethodField()
    
    class Meta:
        model = Project
        fields = ['id', 'title', 'titleLead', 'slogan', 'image', 'url']
    
    def get_image(self, obj):
        if obj.image:
            return obj.image.file.url
        return None
