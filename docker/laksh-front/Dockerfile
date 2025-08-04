FROM node:20 AS build
WORKDIR /app
RUN apt update; \
    apt install -y git; \
    apt autoremove; \
    apt clean
RUN npm install -g npm@10.8

FROM node:20
RUN apt update; \
    apt install -y git nginx; \
    apt autoremove; \
    apt clean
COPY default.conf /etc/nginx/conf.d
COPY start-front.sh /start-front.sh
RUN chmod +x /start-front.sh
EXPOSE 80
CMD ["/start-front.sh"]
