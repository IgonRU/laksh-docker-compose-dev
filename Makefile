SHELL := /usr/bin/bash

.PHONY: up staging prod down logs ps rebuild

# Dev по умолчанию
up:
	FRONT_ENV=dev docker compose up -d --build

staging:
	FRONT_ENV=staging docker compose up -d --build

prod:
	FRONT_ENV=prod docker compose up -d --build

down:
	docker compose down

logs:
	docker compose logs -f

ps:
	docker compose ps

rebuild-prod:
	FRONT_ENV=prod docker compose build --no-cache --pull laksh-front
	FRONT_ENV=prod docker compose up -d --no-deps --force-recreate laksh-front

rebuild-staging:
	FRONT_ENV=staging docker compose build --no-cache --pull laksh-front
	FRONT_ENV=staging docker compose up -d --no-deps --force-recreate laksh-front

rebuild-dev:
	FRONT_ENV=dev docker compose build --no-cache --pull laksh-front
	FRONT_ENV=dev docker compose up -d --no-deps --force-recreate laksh-front

