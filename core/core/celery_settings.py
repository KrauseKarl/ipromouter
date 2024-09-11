import os
import celery 
from django.conf import settings
from dotenv import load_dotenv

load_dotenv()

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "core.settings")

CELERY_BROKER=os.getenv("CELERY_BROKER", "redis://redis:6379/0")
CELERY_BACKEND=os.getenv("CELERY_BROKER", "redis://redis:6379/1")


task_app = celery.Celery("iprom", broker=CELERY_BROKER, backend=CELERY_BACKEND)
task_app.config_from_object("django.conf:settings", namespace="CELERY")
task_app.conf.broker_url = CELERY_BROKER
task_app.autodiscover_tasks()
