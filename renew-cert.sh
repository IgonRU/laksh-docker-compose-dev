#!/bin/bash

# Динамическое определение пути к проекту
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
cd "$PROJECT_DIR" || exit 1

docker compose run --rm certbot renew --webroot -w /var/www/certbot

if [ $? -eq 0 ]; then
  echo "Certbot renew succeeded, reloading nginx..."
  docker exec laksh-nginx-container nginx -s reload
else
  echo "Certbot renew failed, skipping nginx reload"
fi
