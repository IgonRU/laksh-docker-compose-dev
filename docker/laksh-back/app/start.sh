cd /app/src

poetry run python /app/src/manage.py makemigrations
poetry run python /app/src/manage.py migrate
poetry run python /app/src/manage.py collectstatic --noinput

# Создание суперпользователя если его нет
poetry run python /app/src/manage.py shell -c "
from django.contrib.auth import get_user_model
import os
User = get_user_model()
username = os.getenv('DJANGO_SUPERUSER_USERNAME', 'admin')
email = os.getenv('DJANGO_SUPERUSER_EMAIL', 'admin@laksh.local')
password = os.getenv('DJANGO_SUPERUSER_PASSWORD', 'admin123')
if not User.objects.filter(username=username).exists():
    User.objects.create_superuser(username, email, password)
    print('Superuser created')
else:
    print('Superuser already exists')
"

while true
do
  cd /app/src && poetry run gunicorn config.wsgi --bind 0.0.0.0:5555 --reload
  sleep 2
done