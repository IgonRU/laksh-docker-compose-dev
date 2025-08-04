#!/bin/bash

# Переходим в директорию проекта
cd /app

# Очищаем папку перед клонированием
echo "Очистка папки..."
rm -rf /app/* /app/.[^.]*

# Клонируем репозиторий фронтенда
echo "Клонирование репозитория фронтенда..."
git clone https://github.com/IgonRU/laksh-front.git .

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

# Запускаем nginx
echo "Запуск nginx..."
nginx -g "daemon off;" &
echo "Nginx запущен в фоновом режиме"

# Ждем бесконечно
while true; do
  sleep 1
done 