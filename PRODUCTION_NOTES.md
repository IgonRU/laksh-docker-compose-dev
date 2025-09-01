# 🚀 Рекомендации для продакшен развертывания

## ⚠️ Изменения для продакшена

### 1. Безопасность
```yaml
# В docker-compose.prod.yml убрать порты БД:
postgres:
  # ports:
  #   - "5432:5432"  # Закрыть внешний доступ
  
pgadmin:
  # ports:
  #   - "5050:80"    # Закрыть или ограничить доступ
```

### 2. Переменные окружения
```bash
# Изменить в .env:
DEBUG=False
SECRET_KEY=your-production-secret-key-here
POSTGRES_PASSWORD=complex-production-password
PGADMIN_DEFAULT_PASSWORD=complex-admin-password

# Добавить:
ALLOWED_HOSTS=yourdomain.com,www.yourdomain.com
CSRF_TRUSTED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
```

### 3. SSL/HTTPS
- Настроить SSL сертификаты (Let's Encrypt)
- Обновить nginx.conf для HTTPS
- Настроить редирект HTTP → HTTPS

### 4. Ресурсы
```yaml
# Увеличить лимиты для продакшена:
postgres:
  deploy:
    resources:
      limits:
        cpus: '2'
        memory: 8G
        
web:
  deploy:
    resources:
      limits:
        cpus: '1'
        memory: 2G
```

### 5. Логирование
- Настроить ротацию логов
- Централизованное логирование (ELK stack)
- Мониторинг ошибок (Sentry)

### 6. Мониторинг
- Prometheus + Grafana
- Healthcheck endpoints
- Alerting при проблемах

## 📦 Рекомендуемая структура продакшена

```
/opt/laksh-production/
├── docker-compose.prod.yml
├── .env.production
├── nginx/
│   ├── nginx.conf
│   └── ssl/
├── backups/
├── logs/
└── monitoring/
```

## 🔄 Процедура обновления продакшена

1. **Создать бекап**: `./backup.sh`
2. **Тестирование на staging**: Развернуть на тестовом окружении
3. **Обновление кода**: `git pull`
4. **Пересборка**: `docker-compose build --no-cache`
5. **Применение миграций**: `docker-compose exec web python manage.py migrate`
6. **Перезапуск**: `docker-compose up -d`
7. **Проверка**: Тестирование основных функций
