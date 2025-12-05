#!/bin/bash

# Директория с docker-compose.yml (папка laksh-dc)
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
COMPOSE_FILE="$ROOT_DIR/docker-compose.yml"

if [ ! -f "$COMPOSE_FILE" ]; then
  echo "docker-compose.yml not found at $COMPOSE_FILE"
  exit 1
fi

cd "$ROOT_DIR" || exit 1

docker compose -f "$COMPOSE_FILE" run --rm certbot renew --webroot -w /var/www/certbot

if [ $? -eq 0 ]; then
  echo "Certbot renew succeeded, reloading nginx..."
  docker exec laksh-nginx-container nginx -s reload
else
  echo "Certbot renew failed, skipping nginx reload"
fi
