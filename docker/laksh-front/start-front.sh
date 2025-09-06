#!/bin/bash

# Переходим в директорию проекта
cd /app

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
echo "Сборка проекта..."
npm run build

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