#!/bin/bash

# Переходим в директорию проекта
cd /app

echo "=== Запуск SSR сервера ==="
echo "Определение окружения сборки..."

# Выбор окружения: dev (по умолчанию), staging, prod
FRONT_ENV=${FRONT_ENV:-dev}
echo "Выбрано окружение FRONT_ENV=$FRONT_ENV"

case "$FRONT_ENV" in
  prod)
    BUILD_CMD="build:prod"
    ;;
  staging)
    BUILD_CMD="build:staging"
    ;;
  dev)
    BUILD_CMD="build:dev"
    ;;
  *)
    echo "Unknown FRONT_ENV=$FRONT_ENV. Use one of: dev | staging | prod"
    exit 1
    ;;
esac

echo "=== Установка зависимостей ==="
# Проверяем, есть ли package.json
if [ ! -f "package.json" ]; then
    echo "Ошибка: package.json не найден. Проверьте, что код примонтирован в /app"
    exit 1
fi

# Устанавливаем зависимости
npm install

echo "=== Сборка SSR проекта ==="
echo "Выполняем команду: npm run $BUILD_CMD"
npm run "$BUILD_CMD"

# Проверяем, что SSR сервер собрался
if [ ! -f "dist/laksh-front/server/server.mjs" ]; then
    echo "Ошибка: SSR сервер не собрался. Файл server.mjs не найден."
    exit 1
fi

echo "=== SSR сервер собран успешно ==="
echo "Файлы в dist/laksh-front/:"
ls -la dist/laksh-front/

echo "Файлы в dist/laksh-front/server/:"
ls -la dist/laksh-front/server/

echo "=== Запуск SSR сервера на порту 4000 ==="
node dist/laksh-front/server/server.mjs
