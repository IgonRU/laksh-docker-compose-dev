# Документация по сборке и запуску

Набор инструкций для сборки и запуска проекта в окружениях dev (по умолчанию), staging и prod.

## Предварительные требования

- Docker и Docker Compose (plugin)
- Make (для коротких команд, опционально)
- Заполненный файл `.env` в корне проекта

Критичные переменные в `.env`:

- `ALLOWED_ADMIN_IPS` — список IP, которым разрешён доступ к административным локациям Nginx (`/pgadmin/`, `/mahant/`, `/django-mahant/`).

## Окружения фронтенда

Фронтенд собирается в контейнере на старте, конфигурация выбирается по переменной окружения `FRONT_ENV`:

- `dev` (по умолчанию)
- `staging`
- `prod`

Внутри контейнера выполняются команды Angular:

- dev → `npm run build:dev`
- staging → `npm run build:staging`
- prod → `npm run build:prod`

## Быстрый старт через Makefile

В корне проекта есть `Makefile` с короткими целями:

```bash
# Dev (по умолчанию)
make up

# Staging
make staging

# Prod
make prod

# Остановить контейнеры
make down

# Логи всех сервисов (follow)
make logs

# Состояние контейнеров
make ps

# Пересобрать образ фронта без кэша
make rebuild
```

## Альтернатива: запуск напрямую Docker Compose

Без Makefile можно управлять окружением одной переменной `FRONT_ENV`:

```bash
# Dev (дефолт)
docker compose up -d --build

# Staging
FRONT_ENV=staging docker compose up -d --build

# Prod
FRONT_ENV=prod docker compose up -d --build
```

Переменная `FRONT_ENV` также пробрасывается в сервис `laksh-front` внутри `docker-compose.yml` с дефолтом `dev`:

```yaml
services:
  laksh-front:
    environment:
      FRONT_ENV: ${FRONT_ENV:-dev}
```

## Сетевое и проксирование

- Nginx публикуется на порт 80 и проксирует:
  - `/api`, `/mahant/`, `/django-mahant/`, `/documents/` → backend (`web:5555`)
  - `/` и fallback → фронт (`laksh-front:80`)
  - `/pgadmin/` → pgAdmin (`pgadmin:80`)

- Прямой порт pgAdmin наружу не публикуется, доступ к нему только через Nginx по пути `/pgadmin/`.

## Ограничение доступа по IP (админские локации)

Список IP задаётся в `.env` через `ALLOWED_ADMIN_IPS` (через запятую). Применяется в локациях:

- `/pgadmin/`
- `/mahant/`
- `/django-mahant/`

Пример:

```env
ALLOWED_ADMIN_IPS=127.0.0.1,176.99.77.50
```

Для применения обновлённого списка IP достаточно перезапустить Nginx:

```bash
docker compose up -d nginx
```

## Типичные сценарии

1) Поднять проект для разработки (dev по умолчанию):

```bash
make up
```

2) Поднять staging:

```bash
make staging
```

3) Поднять prod:

```bash
make prod
```

4) Пересобрать фронт без кэша (например, при смене зависимостей):

```bash
make rebuild
make up
```

5) Проверить доступность ключевых маршрутов:

```bash
curl -I http://laksh.local/
curl -I http://laksh.local/api/
curl -I http://laksh.local/mahant/
curl -I http://laksh.local/django-mahant/
curl -I http://laksh.local/pgadmin/
```

## Примечания

- Во фронте рекомендуется использовать относительные пути к API (`/api/...`) — они уже проксируются Nginx на backend.
- Если для конкретного окружения нужен внешний API-домен, задайте это в соответствующей Angular-конфигурации (`environment.*`).

