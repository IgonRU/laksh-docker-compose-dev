#!/bin/bash

# Быстрый бекап только базы данных

set -e

BACKUP_DIR="/backup/db-only"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

mkdir -p "$BACKUP_DIR"

echo "🗄️ Создание бекапа базы данных PostgreSQL..."

# SQL дамп
docker exec laksh-postgres-container pg_dump -U habrpguser -d habrdb --clean --if-exists > "$BACKUP_DIR/db-$TIMESTAMP.sql"

# Бинарный дамп (для быстрого восстановления)
docker exec laksh-postgres-container pg_dump -U habrpguser -d habrdb -Fc > "$BACKUP_DIR/db-$TIMESTAMP.dump"

echo "✅ Бекап базы данных создан:"
echo "- SQL: $BACKUP_DIR/db-$TIMESTAMP.sql"
echo "- Binary: $BACKUP_DIR/db-$TIMESTAMP.dump"

# Показать размеры
ls -lh "$BACKUP_DIR"/db-$TIMESTAMP.*
