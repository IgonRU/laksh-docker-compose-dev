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

rebuild:
	docker compose build --no-cache laksh-front

