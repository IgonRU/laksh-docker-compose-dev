# 🚀 Первый запуск проекта Laksh

## 📋 Быстрый старт

### 1. Клонирование проекта
```bash
git clone https://github.com/IgonRU/laksh-docker-compose-dev.git
cd laksh-docker-compose-dev
```

### 2. Настройка переменных окружения
```bash
# Скопируйте и отредактируйте файлы окружения
cp docker/postgres/.env.example docker/postgres/.env
cp docker/laksh-back/app/.env.example docker/laksh-back/app/.env
```

### 3. Запуск проекта
```bash
# Запуск всех сервисов
docker compose up -d

# Проверка статуса
docker compose ps
```

### 4. Доступ к сервисам
- **Фронтенд**: http://localhost
- **Backend API**: http://localhost/api/
- **Админка Wagtail**: http://localhost/admin/
- **pgAdmin**: http://localhost:5050
- **PostgreSQL**: localhost:5432

## 🔧 Учетные данные по умолчанию

### pgAdmin
- **Email**: habrpguser@habr.com
- **Пароль**: pgdev752113
- **Пользователь**: dev
- **Примечание**: Данные pgAdmin хранятся только внутри контейнера и сбрасываются при пересоздании

### PostgreSQL
- **База данных**: habrdb
- **Пользователь**: habrpguser
- **Пароль**: (см. docker/postgres/.env)

## ⚠️ Решение проблем

### Проблема с правами доступа pgAdmin
Если pgAdmin не запускается из-за ошибок прав доступа, выполните:
```bash
# Остановить контейнер
docker compose stop pgadmin

# Перезапустить (права создаются автоматически)
docker compose up -d pgadmin
```

### Сброс настроек pgAdmin
Если нужно сбросить настройки pgAdmin:
```bash
# Остановить и удалить контейнер
docker compose stop pgadmin
docker compose rm pgadmin

# Запустить заново (создастся с чистыми настройками)
docker compose up -d pgadmin
```

### Очистка проекта
```bash
# Остановить все контейнеры
docker compose down

# Удалить volumes (ВНИМАНИЕ: удалит все данные!)
docker compose down -v

# Пересобрать образы
docker compose build --no-cache
```

## 📝 Логи и отладка

### Просмотр логов
```bash
# Все сервисы
docker compose logs

# Конкретный сервис
docker compose logs pgadmin
docker compose logs laksh-front
docker compose logs web
```

### Вход в контейнер
```bash
# pgAdmin
docker compose exec pgadmin bash

# Backend
docker compose exec web bash

# Frontend
docker compose exec laksh-front bash
```

## 🔄 Обновление проекта

```bash
# Получить последние изменения
git pull

# Пересобрать измененные сервисы
docker compose build

# Перезапустить
docker compose up -d
```

## 📞 Поддержка

При возникновении проблем:
1. Проверьте логи: `docker compose logs`
2. Убедитесь что все порты свободны
3. Проверьте права доступа к директории volumes/
4. Создайте issue в репозитории проекта
