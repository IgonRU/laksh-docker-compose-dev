#!/bin/bash

set -e

# Простая утилита бэкапа проекта:
# - Останавливает контейнеры docker compose
# - Создаёт в ~/backups/<project>-<timestamp>/ архив проекта
# - Кладёт скрипт восстановления рядом с архивом
# - Запускает контейнеры обратно даже при ошибке (trap)

PROJECT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
if [[ ! -f "$PROJECT_DIR/docker-compose.yml" ]]; then
  echo "[ERROR] Скрипт нужно запускать из корня проекта (нет docker-compose.yml)" >&2
  exit 1
fi

PROJECT_NAME="$(basename "$PROJECT_DIR")"
DEST_BASE="${BACKUP_DIR:-$HOME/backups/laksh}"
TIMESTAMP="$(date +%Y%m%d_%H%M%S)"
BACKUP_DIR_PATH="$DEST_BASE/${PROJECT_NAME}-${TIMESTAMP}"
ARCHIVE_NAME="${PROJECT_NAME}-${TIMESTAMP}.tar.gz"
RESTORE_SCRIPT_NAME="restore.sh"

echo "[$(date +'%Y-%m-%d %H:%M:%S')] Начинаем бэкап проекта"
echo "Проект: $PROJECT_DIR"
echo "Назначение: $BACKUP_DIR_PATH"
echo "Архив: $ARCHIVE_NAME"

mkdir -p "$BACKUP_DIR_PATH"

restore_containers() {
  echo "[$(date +'%Y-%m-%d %H:%M:%S')] Запускаем контейнеры обратно..."
  ( cd "$PROJECT_DIR" && docker compose up -d ) || true
}
trap restore_containers EXIT

echo "[$(date +'%Y-%m-%d %H:%M:%S')] Останавливаем контейнеры..."
( cd "$PROJECT_DIR" && docker compose down )

echo "[$(date +'%Y-%m-%d %H:%M:%S')] Создаём архив..."
tar --ignore-failed-read -czf "$BACKUP_DIR_PATH/$ARCHIVE_NAME" \
  --exclude='volumes/pgadmin/pgadmin4.db' \
  -C "$PROJECT_DIR" .

echo "[$(date +'%Y-%m-%d %H:%M:%S')] Создаём скрипт восстановления..."
cat > "$BACKUP_DIR_PATH/$RESTORE_SCRIPT_NAME" << 'EOS'
#!/bin/bash
set -e

# Скрипт восстановления архива проекта в исходную директорию (по умолчанию)
# Опция: -d/--destination DIR — восстановить в указанную папку

BLUE='\033[0;34m'; NC='\033[0m'
log() { echo -e "${BLUE}[$(date +'%Y-%m-%d %H:%M:%S')]${NC} $1"; }

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
ARCHIVE_FILE="$(ls "$SCRIPT_DIR"/*.tar.gz 2>/dev/null | head -1 | xargs basename)"
ARCHIVE_PATH="$SCRIPT_DIR/$ARCHIVE_FILE"

# Значение по умолчанию — директория, откуда делался бэкап (записана при архивации)
DEFAULT_RESTORE_DIR="__RESTORE_DEFAULT_DIR__"
RESTORE_DIR="$DEFAULT_RESTORE_DIR"

while [[ $# -gt 0 ]]; do
  case "$1" in
    -d|--destination)
      RESTORE_DIR="$2"; shift 2;;
    -h|--help)
      echo "Использование: $0 [-d DIR]"; exit 0;;
    *) echo "Неизвестная опция: $1"; exit 1;;
  esac
done

if [[ ! -f "$ARCHIVE_PATH" ]]; then
  echo "[ERROR] Архив не найден: $ARCHIVE_PATH" >&2
  exit 1
fi

log "Восстанавливаем в: $RESTORE_DIR"
mkdir -p "$RESTORE_DIR"
tar -xzf "$ARCHIVE_PATH" -C "$RESTORE_DIR"

log "Готово. Для запуска: cd $RESTORE_DIR && docker compose up -d"
EOS

# Подставим исходную директорию в restore-скрипт
sed -i "s|__RESTORE_DEFAULT_DIR__|$PROJECT_DIR|g" "$BACKUP_DIR_PATH/$RESTORE_SCRIPT_NAME"
chmod +x "$BACKUP_DIR_PATH/$RESTORE_SCRIPT_NAME"

SIZE_HUMAN=$(du -h "$BACKUP_DIR_PATH/$ARCHIVE_NAME" | cut -f1)
echo "[$(date +'%Y-%m-%d %H:%M:%S')] Готово"
echo "Папка бэкапа: $BACKUP_DIR_PATH"
echo "Архив: $BACKUP_DIR_PATH/$ARCHIVE_NAME ($SIZE_HUMAN)"
echo "Скрипт восстановления: $BACKUP_DIR_PATH/$RESTORE_SCRIPT_NAME"


