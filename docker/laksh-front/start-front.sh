#!/bin/bash

# Переходим в директорию проекта
cd /app

# Устанавливаем зависимости
echo "Установка зависимостей..."
npm install

# Собираем проект
echo "Сборка проекта..."
npm run build

# Копируем собранные файлы в nginx
echo "Копирование файлов в nginx..."
mkdir -p /usr/share/nginx/html/browser
cp -r /app/dist/laksh-front/browser/* /usr/share/nginx/html/browser/

# Запускаем nginx
echo "Запуск nginx..."
nginx -g "daemon off;" 