#!/bin/bash

# Скрипт полного бекапа проекта Laksh
# Включает: базу данных, код, конфигурации, volumes

set -e

BACKUP_DIR="$HOME/backup/laksh-$(date +%Y%m%d_%H%M%S)"
PROJECT_DIR="$HOME/Projects/laksh/laksh-docker-compose-dev"

echo "🚀 Создание полного бекапа проекта Laksh..."
echo "Директория бекапа: $BACKUP_DIR"

# Создаем директорию для бекапа
mkdir -p "$BACKUP_DIR"
cd "$PROJECT_DIR"

echo "📦 1. Бекап кода проекта и конфигураций..."
# Архивируем весь проект (исключаем node_modules и другие ненужные файлы)
tar -czf "$BACKUP_DIR/project-code.tar.gz" \
    --exclude='volumes/frontend/node_modules' \
    --exclude='volumes/frontend/dist' \
    --exclude='docker/laksh-back/app/src/__pycache__' \
    --exclude='docker/laksh-back/app/src/*/__pycache__' \
    --exclude='docker/laksh-back/app/src/*/*/__pycache__' \
    --exclude='.git' \
    .

echo "🗄️ 2. Бекап базы данных PostgreSQL..."
# Дамп базы данных
docker exec laksh-postgres-container pg_dump -U habrpguser -d habrdb -v -f /tmp/database_backup.sql
docker cp laksh-postgres-container:/tmp/database_backup.sql "$BACKUP_DIR/"
docker exec laksh-postgres-container rm /tmp/database_backup.sql

echo "💾 3. Бекап Docker volumes..."
# Бекап volume с данными PostgreSQL
docker run --rm -v laksh-docker-compose-dev_habrdb-data:/source -v "$BACKUP_DIR":/backup alpine tar -czf /backup/habrdb-data-volume.tar.gz -C /source .

# Бекап volume pgAdmin
docker run --rm -v laksh-docker-compose-dev_pgadmin:/source -v "$BACKUP_DIR":/backup alpine tar -czf /backup/pgadmin-volume.tar.gz -C /source .

# Бекап volume фронтенда
docker run --rm -v laksh-docker-compose-dev_laksh-front-files:/source -v "$BACKUP_DIR":/backup alpine tar -czf /backup/laksh-front-files-volume.tar.gz -C /source .

echo "🖼️ 4. Бекап медиа файлов..."
# Отдельный архив медиа файлов для удобства
tar -czf "$BACKUP_DIR/media-files.tar.gz" docker/laksh-back/app/src/media/

echo "📝 5. Создание манифеста бекапа..."
cat > "$BACKUP_DIR/backup-manifest.txt" << EOF
Laksh Project Backup Manifest
============================
Дата создания: $(date)
Проект: Laksh Docker Compose Development Environment

Содержимое бекапа:
- project-code.tar.gz: Весь код проекта, конфигурации, Dockerfile'ы
- database_backup.sql: Дамп базы данных PostgreSQL
- habrdb-data-volume.tar.gz: Volume с данными PostgreSQL
- pgadmin-volume.tar.gz: Volume с настройками pgAdmin
- laksh-front-files-volume.tar.gz: Volume с файлами фронтенда
- media-files.tar.gz: Медиа файлы и изображения

Версии:
- PostgreSQL: 16.3-alpine
- Nginx: 1.27-alpine
- Python: 3.11.9-bookworm

Базы данных:
- База: habrdb
- Пользователь: habrpguser

Порты:
- Web: 80
- PostgreSQL: 5432
- pgAdmin: 5050
EOF

echo "📊 Размеры файлов бекапа:"
ls -lh "$BACKUP_DIR"

echo "✅ Бекап завершен успешно!"
echo "Местоположение: $BACKUP_DIR"
echo ""
echo "🔄 Для восстановления используйте: ./restore.sh $BACKUP_DIR"
