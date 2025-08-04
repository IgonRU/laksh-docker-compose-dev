cd /app/src

poetry run python /app/src/manage.py makemigrations
poetry run python /app/src/manage.py migrate
while true
do
  cd /app/src && poetry run gunicorn config.wsgi --bind 0.0.0.0:5555 --reload
  sleep 2
done