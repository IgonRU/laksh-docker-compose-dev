#!/bin/bash

# Переходим в директорию проекта
cd /app

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

echo "Сборка проекта..."

# Проверяем, есть ли package.json
if [ ! -f "package.json" ]; then
    echo "Ошибка: package.json не найден. Проверьте, что код примонтирован в /app"
    exit 1
fi

# Устанавливаем зависимости
echo "Установка зависимостей..."
npm install

# Собираем проект
echo "Сборка проекта командой: npm run $BUILD_CMD"
npm run "$BUILD_CMD"

# Копируем собранные файлы в nginx
echo "Копирование файлов в nginx..."
rm -rf /usr/share/nginx/html/browser
mkdir -p /usr/share/nginx/html/browser
cp -r /app/dist/laksh-front/browser/* /usr/share/nginx/html/browser/

# Копируем файлы в общий volume для кеширования
echo "Копирование файлов в общий volume..."
cp -r /app/dist/laksh-front/browser/* /shared-frontend/

# Запускаем nginx
echo "Запуск nginx..."
nginx -g "daemon off;" &
echo "Nginx запущен в фоновом режиме"

# Ждем бесконечно
while true; do
  sleep 1
done 