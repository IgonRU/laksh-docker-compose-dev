# 🔄 Система бекапов проекта Laksh

## 📋 Что сохраняется при пересборке

### ✅ **СОХРАНЯЕТСЯ автоматически:**
- **База данных PostgreSQL** - в Docker volume `habrdb-data`
- **Код проекта** - весь исходный код в директориях проекта
- **Media файлы** - изображения в `docker/laksh-back/app/src/media/`
- **Статические файлы** - в `docker/laksh-back/app/src/static/`
- **Конфигурации** - nginx.conf, docker-compose.yml и др.

### ❌ **НЕ СОХРАНЯЕТСЯ при пересборке:**
- Установленные пакеты в контейнерах (пересобираются автоматически)
- Временные файлы и кеши контейнеров

## 🛠️ Скрипты бекапов

### 1. Полный бекап проекта
```bash
./backup.sh
```
**Включает:**
- Весь код проекта
- Базу данных PostgreSQL 
- Все Docker volumes
- Media файлы
- Конфигурации

**Время выполнения:** ~2-5 минут  
**Размер:** ~100-500 MB в зависимости от данных

### 2. Быстрый бекап только БД
```bash
./quick-backup-db.sh
```
**Включает:**
- SQL дамп базы данных
- Бинарный дамп для быстрого восстановления

**Время выполнения:** ~30 сек  
**Размер:** ~1-50 MB в зависимости от данных

### 3. Восстановление из бекапа
```bash
./restore.sh /path/to/backup/directory
```

## 📁 Структура бекапа

```
/backup/laksh-20250901_190000/
├── backup-manifest.txt           # Описание бекапа
├── project-code.tar.gz          # Весь код проекта
├── database_backup.sql          # SQL дамп БД
├── habrdb-data-volume.tar.gz    # Volume PostgreSQL
├── pgadmin-volume.tar.gz        # Настройки pgAdmin
├── laksh-front-files-volume.tar.gz # Volume фронтенда
└── media-files.tar.gz           # Media файлы
```

## ⚡ Рекомендации по бекапам

### Периодичность:
- **Ежедневно:** Быстрый бекап БД (`quick-backup-db.sh`)
- **Еженедельно:** Полный бекап проекта (`backup.sh`)
- **Перед обновлениями:** Полный бекап

### Автоматизация через cron:
```bash
# Добавить в crontab -e:
# Ежедневный бекап БД в 2:00
0 2 * * * /path/to/project/quick-backup-db.sh

# Еженедельный полный бекап в воскресенье в 3:00
0 3 * * 0 /path/to/project/backup.sh
```

### Хранение бекапов:
- Локально: `~/backup/` 
- Облако: Google Drive, Yandex.Disk
- Удаленный сервер: rsync, scp
- Git LFS для версионирования

## 🚨 Восстановление в экстренных ситуациях

### Полная потеря проекта:
1. `git clone` проекта (если в Git)
2. `./restore.sh /path/to/latest/backup`

### Только проблемы с БД:
1. `docker-compose down`
2. `docker volume rm laksh-docker-compose-dev_habrdb-data`
3. `docker-compose up -d postgres`
4. Восстановить дамп: `docker exec -i laksh-postgres-container psql -U habrpguser -d habrdb < backup.sql`

### Проблемы с кодом:
1. Восстановить из `project-code.tar.gz`
2. `docker-compose build --no-cache`
3. `docker-compose up -d`

## 📊 Мониторинг дискового пространства

```bash
# Проверка размера volumes
docker system df -v

# Размер проекта
du -sh /home/landev/Projects/laksh/laksh-docker-compose-dev

# Размер бекапов
du -sh ~/backup/*
```
