# Документация по бэкапу проекта (`backup.sh`)

## Назначение
`backup.sh` создаёт архив всей папки проекта с остановкой контейнеров и последующим запуском. Исключается файл `volumes/pgadmin/pgadmin4.db`.

## Что делает скрипт
- Останавливает контейнеры: `docker compose down`
- Создаёт папку в `~/backups/<project>-<YYYYMMDD_HHMMSS>/`
- Создаёт архив проекта: `tar --ignore-failed-read -czf <project>-<ts>.tar.gz -C <project> .`
  - исключение: `--exclude='volumes/pgadmin/pgadmin4.db'`
- Создаёт скрипт восстановления рядом с архивом: `<project>-<ts>-restore.sh`
- Запускает контейнеры: `docker compose up -d`

## Требования
- Установлен Docker и Docker Compose Plugin
- Права пользователя на управление Docker (пользователь в группе `docker`)

## Использование
```bash
./backup.sh
```
Результат будет в: `~/backups/<project>-<timestamp>/`

## Скрипт восстановления
Располагается рядом с архивом, имя: `<project>-<timestamp>-restore.sh`.

По умолчанию восстанавливает в ту же директорию, откуда делался бэкап. Можно указать другую папку:
```bash
~/backups/<project>-<timestamp>/<project>-<timestamp>-restore.sh -d /path/to/restore
```

## Что попадает в архив
- Вся папка проекта целиком (исходники, конфигурации, скрипты, каталоги `docker`, `volumes`, и т.д.)

## Что исключено
- Только файл `volumes/pgadmin/pgadmin4.db`
- При недоступных для чтения файлах (например, в некоторых `volumes/*`) архив создаётся за счёт `--ignore-failed-read` (проблемные файлы пропускаются)

## Автоматизация (cron)
```bash
# Еженедельный бэкап в воскресенье в 03:00
0 3 * * 0 /home/landev/Projects/laksh/laksh-dc/backup.sh >> /var/log/laksh-backup.log 2>&1
```

## Советы
- Оставляйте достаточно места на диске для архива
- Храните несколько последних бэкапов
- Для offsite-хранения используйте rsync/scp/облако
