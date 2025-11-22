from django.urls import reverse
from rest_framework.test import APITestCase
from .models import Service, ServiceGroup


class ServiceDetailAPITestCase(APITestCase):
    """Проверяем, что детальная услуга доступна по URL без завершающего слэша."""

    def test_service_detail_returns_data(self):
        service = Service.objects.create(
            title='Проектирование',
            title_lead='Детальное планирование',
            slogan='Основа успеха',
            alias='planning',
            description_short='Составляем план проекта',
            description='Полное описание услуги',
            active=True,
        )

        url = reverse('services:service-detail', kwargs={'alias': service.alias})
        response = self.client.get(url)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['alias'], service.alias)


class ServiceGroupListAPITestCase(APITestCase):
    """Проверяем, что список услуг содержит alias для группы и услуг."""

    def test_service_list_contains_alias(self):
        group = ServiceGroup.objects.create(
            title='Проектирование',
            alias='design',
            description='Описание группы'
        )
        service = Service.objects.create(
            title='Дендропроект',
            title_lead='Лид',
            slogan='Слоган',
            alias='dendro',
            description_short='Краткое описание',
            description='Полное описание',
            group=group,
            active=True,
        )

        url = reverse('services:service-group-list')
        response = self.client.get(url)

        self.assertEqual(response.status_code, 200)
        groups = response.data if isinstance(response.data, list) else response.data.get('results', [])
        self.assertTrue(len(groups) > 0)

        first_group = groups[0]
        self.assertIn('alias', first_group)
        self.assertEqual(first_group['alias'], group.alias)

        first_service = first_group['services'][0]
        self.assertIn('alias', first_service)
        self.assertEqual(first_service['alias'], service.alias)
