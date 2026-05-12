#!/bin/bash

# Exit immediately if any command fails
set -e

# Run database migrations
python manage.py migrate --noinput

# Collect static files (nginx will serve them)
python manage.py collectstatic --noinput

# Start Gunicorn with proper container logging
exec gunicorn cronoospace.wsgi:application \
    --bind 0.0.0.0:8000 \
    --workers 3 \
    --timeout 120 \
    --access-logfile - \
    --error-logfile -
