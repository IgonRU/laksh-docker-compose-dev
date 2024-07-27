FROM node:20 AS build
WORKDIR /app
RUN apt update; \
    apt install -y git; \
    apt autoremove; \
    apt clean
RUN git clone https://github.com/IgonRU/laksh-front /app
RUN npm install -g npm@10.8
RUN npm install
RUN npm run build

FROM nginx:stable
COPY default.conf /etc/nginx/conf.d
COPY --from=build /app/dist/laksh-front/ /usr/share/nginx/html
EXPOSE 80
