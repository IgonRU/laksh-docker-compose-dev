FROM node:20

# Устанавливаем git для клонирования репозитория
RUN apt update && \
    apt install -y git && \
    apt autoremove && \
    apt clean

# Обновляем npm
RUN npm install -g npm@10.8

# Клонируем репозиторий фронтенда
RUN git clone https://github.com/IgonRU/laksh-front.git /app

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем скрипт запуска SSR
COPY start-front-ssr.sh /start-front-ssr.sh
RUN chmod +x /start-front-ssr.sh

# Открываем порт 4000 для SSR сервера
EXPOSE 4000

# Запускаем SSR сервер
CMD ["/start-front-ssr.sh"]
