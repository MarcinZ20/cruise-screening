#!/bin/bash

echo "Waiting for PostgreSQL..."

until nc -z db 5432; do
  sleep 1
done

echo "PostgreSQL started succesfully!"

python manage.py migrate

if [ "$(python manage.py showmigrations | grep '\[ \]')" ]; then
  echo "Applying migrations..."
  python manage.py migrate
fi

echo "Loading initial data..."
python manage.py loaddata users_data.json || echo "Fixture already loaded or failed"
python manage.py loaddata search_engines.json || echo "Fixture already loaded or failed"

echo "from django.contrib.auth import get_user_model; \
      User = get_user_model(); \
      User.objects.filter(username='admin').exists() or \
      User.objects.create_superuser('admin', 'admin@example.com', 'adminpass')" \
      | python manage.py shell

echo "Starting server..."
exec python manage.py runserver 0.0.0.0:8000
