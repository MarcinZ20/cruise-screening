FROM python:3.8.12-buster

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /app

COPY cruise_literature/requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY cruise-literature/ .

CMD ["gunicorn", "cruise_screening.wsgi:application", "--bind", "0.0.0.0:8080"]
