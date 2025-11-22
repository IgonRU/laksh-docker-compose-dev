from django.urls import reverse
from rest_framework.test import APITestCase
from .models import Service


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