#!/bin/bash

cd /home/igon/www/laksh.ru/laksh-docker-compose-dev || exit 1

docker compose run --rm certbot renew --webroot -w /var/www/certbot

if [ $? -eq 0 ]; then
  echo "Certbot renew succeeded, reloading nginx..."
  docker exec laksh-nginx-container nginx -s reload
else
  echo "Certbot renew failed, skipping nginx reload"
fi
