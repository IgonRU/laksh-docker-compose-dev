#!/bin/sh
set -eu

# Инициализация Postgres с чтением переменных окружения:
# POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB

DB_USER="${POSTGRES_USER:-habrpguser}"
DB_PASS="${POSTGRES_PASSWORD:?POSTGRES_PASSWORD is required}"
DB_NAME="${POSTGRES_DB:-habrdb}"

# Создать роль при отсутствии и задать пароль (подключаемся суперпользователем $POSTGRES_USER)
psql -v ON_ERROR_STOP=1 -U "${POSTGRES_USER}" -d postgres -tAc "SELECT 1 FROM pg_roles WHERE rolname='${DB_USER}'" | grep -q 1 \
  || psql -v ON_ERROR_STOP=1 -U "${POSTGRES_USER}" -d postgres -c "CREATE ROLE \"${DB_USER}\" LOGIN"

psql -v ON_ERROR_STOP=1 -U "${POSTGRES_USER}" -d postgres -c "ALTER ROLE \"${DB_USER}\" WITH PASSWORD '${DB_PASS}'"

# Создать базу при отсутствии
psql -v ON_ERROR_STOP=1 -U "${POSTGRES_USER}" -d postgres -tAc "SELECT 1 FROM pg_database WHERE datname='${DB_NAME}'" | grep -q 1 \
  || psql -v ON_ERROR_STOP=1 -U "${POSTGRES_USER}" -d postgres -c "CREATE DATABASE \"${DB_NAME}\" OWNER \"${DB_USER}\""

# Назначить владельца (на случай существующей БД)
psql -v ON_ERROR_STOP=1 -U "${POSTGRES_USER}" -d "${DB_NAME}" -c "ALTER DATABASE \"${DB_NAME}\" OWNER TO \"${DB_USER}\";"

echo "init.sh: ensured role ${DB_USER} and database ${DB_NAME} exist"


