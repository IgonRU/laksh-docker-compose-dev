#!/bin/bash

# Скрипт восстановления проекта Laksh из бекапа

set -e

if [ -z "$1" ]; then
    echo "❌ Использование: $0 <путь_к_директории_бекапа>"
    echo "Пример: $0 /backup/laksh-20250901_190000"
    exit 1
fi

BACKUP_DIR="$1"
PROJECT_DIR="$HOME/Projects/laksh/laksh-docker-compose-dev"

if [ ! -d "$BACKUP_DIR" ]; then
    echo "❌ Директория бекапа не найдена: $BACKUP_DIR"
    exit 1
fi

echo "🔄 Восстановление проекта Laksh из бекапа..."
echo "Источник: $BACKUP_DIR"
echo "Проект: $PROJECT_DIR"
echo ""

read -p "⚠️  ВНИМАНИЕ: Это перезапишет текущий проект. Продолжить? (y/N): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Отменено пользователем"
    exit 1
fi

echo "🛑 1. Остановка контейнеров..."
cd "$PROJECT_DIR"
docker-compose down

echo "🗑️ 2. Удаление существующих volumes..."
docker volume rm -f laksh-docker-compose-dev_habrdb-data || true
docker volume rm -f laksh-docker-compose-dev_pgadmin || true
docker volume rm -f laksh-docker-compose-dev_laksh-front-files || true

echo "📦 3. Восстановление кода проекта..."
cd /tmp
tar -xzf "$BACKUP_DIR/project-code.tar.gz"
rsync -av --delete /tmp/ "$PROJECT_DIR/"
cd "$PROJECT_DIR"

echo "💾 4. Восстановление Docker volumes..."
# Создаем volumes
docker volume create laksh-docker-compose-dev_habrdb-data
docker volume create laksh-docker-compose-dev_pgadmin
docker volume create laksh-docker-compose-dev_laksh-front-files

# Восстанавливаем данные в volumes
docker run --rm -v laksh-docker-compose-dev_habrdb-data:/target -v "$BACKUP_DIR":/backup alpine tar -xzf /backup/habrdb-data-volume.tar.gz -C /target
docker run --rm -v laksh-docker-compose-dev_pgadmin:/target -v "$BACKUP_DIR":/backup alpine tar -xzf /backup/pgadmin-volume.tar.gz -C /target
docker run --rm -v laksh-docker-compose-dev_laksh-front-files:/target -v "$BACKUP_DIR":/backup alpine tar -xzf /backup/laksh-front-files-volume.tar.gz -C /target

echo "🚀 5. Запуск контейнеров..."
docker-compose up -d postgres pgadmin

echo "⏳ 6. Ожидание запуска PostgreSQL..."
sleep 15

echo "🗄️ 7. Восстановление базы данных..."
# Восстанавливаем дамп базы данных
docker cp "$BACKUP_DIR/database_backup.sql" laksh-postgres-container:/tmp/
docker exec laksh-postgres-container psql -U habrpguser -d habrdb -f /tmp/database_backup.sql
docker exec laksh-postgres-container rm /tmp/database_backup.sql

echo "🔧 8. Запуск остальных сервисов..."
docker-compose up -d

echo "⏳ 9. Ожидание полного запуска..."
sleep 20

echo "✅ Восстановление завершено успешно!"
echo ""
echo "🌐 Сервисы доступны по адресам:"
echo "- Основной сайт: http://laksh.local"
echo "- Wagtail админка: http://laksh.local/admin/"
echo "- Django админка: http://laksh.local/django-admin/"
echo "- pgAdmin: http://laksh.local:5050"
echo ""
echo "🔐 Данные для входа в админку:"
echo "- Логин: admin"
echo "- Пароль: admin123"
echo ""
echo "📊 Проверка статуса контейнеров:"
docker-compose ps
