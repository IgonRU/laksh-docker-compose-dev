#!/bin/bash

# Быстрый бекап только базы данных PostgreSQL
# Использование: ./backup-db.sh [CONTAINER_NAME]

set -e

# Параметры по умолчанию
CONTAINER_NAME="${1:-laksh-postgres-container}"
BACKUP_BASE_DIR="$HOME/backups/laksh"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="$BACKUP_BASE_DIR/db-$TIMESTAMP"

# Проверка существования контейнера
if ! docker ps --format "table {{.Names}}" | grep -q "^${CONTAINER_NAME}$"; then
    echo "❌ Контейнер '$CONTAINER_NAME' не найден или не запущен"
    echo "Доступные контейнеры:"
    docker ps --format "table {{.Names}}\t{{.Status}}"
    exit 1
fi

mkdir -p "$BACKUP_DIR"

echo "🗄️ Создание бекапа базы данных PostgreSQL..."
echo "Контейнер: $CONTAINER_NAME"
echo "Папка бэкапа: $BACKUP_DIR"

# SQL дамп
echo "Создаём SQL дамп..."
docker exec "$CONTAINER_NAME" pg_dump -U habrpguser -d habrdb --clean --if-exists > "$BACKUP_DIR/db-$TIMESTAMP.sql"

# Бинарный дамп (для быстрого восстановления)
echo "Создаём бинарный дамп..."
docker exec "$CONTAINER_NAME" pg_dump -U habrpguser -d habrdb -Fc > "$BACKUP_DIR/db-$TIMESTAMP.dump"

# Создание скрипта восстановления
echo "Создаём скрипт восстановления..."
cat > "$BACKUP_DIR/restore-db.sh" << EOF
#!/bin/bash

# Скрипт восстановления базы данных PostgreSQL
# Использование: ./restore-db.sh [CONTAINER_NAME]

set -e

CONTAINER_NAME="\${1:-laksh-postgres-container}"
SCRIPT_DIR="\$(cd "\$(dirname "\$0")" && pwd)"
TIMESTAMP="$TIMESTAMP"

# Цвета для вывода
BLUE='\033[0;34m'; GREEN='\033[0;32m'; RED='\033[0;31m'; NC='\033[0m'
log() { echo -e "\${BLUE}[\$(date +'%Y-%m-%d %H:%M:%S')]\${NC} \$1"; }
success() { echo -e "\${GREEN}[SUCCESS]\${NC} \$1"; }
error() { echo -e "\${RED}[ERROR]\${NC} \$1"; }

log "Восстановление базы данных PostgreSQL"
log "Контейнер: \$CONTAINER_NAME"
log "Папка с дампами: \$SCRIPT_DIR"

# Проверка существования контейнера
if ! docker ps --format "table {{.Names}}" | grep -q "^\${CONTAINER_NAME}\$"; then
    error "Контейнер '\$CONTAINER_NAME' не найден или не запущен"
    echo "Доступные контейнеры:"
    docker ps --format "table {{.Names}}\t{{.Status}}"
    exit 1
fi

# Проверка существования файлов дампов
SQL_DUMP="\$SCRIPT_DIR/db-\$TIMESTAMP.sql"
BINARY_DUMP="\$SCRIPT_DIR/db-\$TIMESTAMP.dump"

if [[ ! -f "\$SQL_DUMP" ]]; then
    error "SQL дамп не найден: \$SQL_DUMP"
    exit 1
fi

if [[ ! -f "\$BINARY_DUMP" ]]; then
    error "Бинарный дамп не найден: \$BINARY_DUMP"
    exit 1
fi

log "Восстанавливаем из SQL дампа..."
docker exec -i "\$CONTAINER_NAME" psql -U habrpguser -d habrdb < "\$SQL_DUMP"

success "База данных успешно восстановлена!"
log "Для проверки подключитесь к базе: docker exec -it \$CONTAINER_NAME psql -U habrpguser -d habrdb"
EOF

chmod +x "$BACKUP_DIR/restore-db.sh"

echo "✅ Бекап базы данных создан:"
echo "- SQL: $BACKUP_DIR/db-$TIMESTAMP.sql"
echo "- Binary: $BACKUP_DIR/db-$TIMESTAMP.dump"
echo "- Скрипт восстановления: $BACKUP_DIR/restore-db.sh"

# Показать размеры файлов
echo ""
echo "📊 Размеры файлов:"
ls -lh "$BACKUP_DIR"/db-$TIMESTAMP.*
