#!/bin/bash

# Переходим в директорию проекта
cd /app

# Проверяем, есть ли уже собранные файлы
if [ -d "/shared-frontend" ] && [ "$(ls -A /shared-frontend)" ]; then
    echo "Найдены собранные файлы, копируем в nginx..."
    mkdir -p /usr/share/nginx/html/browser
    cp -r /shared-frontend/* /usr/share/nginx/html/browser/
    echo "Файлы скопированы"
else
    echo "Собранные файлы не найдены, собираем проект..."
    
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
    mkdir -p /usr/share/nginx/html/browser
    cp -r /app/dist/laksh-front/browser/* /usr/share/nginx/html/browser/
    
    # Копируем файлы в общий volume
    echo "Копирование файлов в общий volume..."
    cp -r /app/dist/laksh-front/browser/* /shared-frontend/
fi

# Запускаем nginx
echo "Запуск nginx..."
nginx -g "daemon off;" &
echo "Nginx запущен в фоновом режиме"

# Ждем бесконечно
while true; do
  sleep 1
done 