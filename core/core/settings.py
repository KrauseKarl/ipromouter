import os
from pathlib import Path
from os import environ
from dotenv import load_dotenv

load_dotenv()

BASE_DIR = Path(__file__).resolve().parent.parent
DEBUG = os.getenv("DEBUG", "False") == "True"
SECRET_KEY = os.getenv("SECRET_KEY", "insecure-key")

if DEBUG:
    ALLOWED_HOSTS = ['*']
else:
    ALLOWED_HOSTS = os.environ.get('ALLOWED_HOSTS').split(' ')

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.sitemaps',
    'django.contrib.sites',
    'app_site',
]
SITE_ID = 1

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'core.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'core.wsgi.application'

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

LANGUAGE_CODE = 'ru-ru'
TIME_ZONE = 'Asia/Omsk'
USE_I18N = True
USE_L10N = True
USE_TZ = True

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

STATIC_URL = '/assets/'
if DEBUG:
    STATIC_DIR = os.path.join(BASE_DIR, 'assets')
    STATICFILES_DIRS = [STATIC_DIR]
else:
    STATIC_ROOT = BASE_DIR / 'assets'

MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

#  DebugToolbar
# if DEBUG:
#     MIDDLEWARE += (
#         'debug_toolbar.middleware.DebugToolbarMiddleware',
#     )
#     INSTALLED_APPS += (
#         'debug_toolbar',
#     )
#     INTERNAL_IPS = [
#         "127.0.0.1",
#     ]
#     DEBUG_TOOLBAR_CONFIG = {
#         'INTERCEPT_REDIRECTS': False,
#     }

# Celery settings
if DEBUG:
    CELERY_BROKER_URL = os.getenv("CELERY_BROKER_1")
    CELERY_RESULT_BACKEND =  os.getenv("CELERY_BACKEND_1")
else:
    CELERY_BROKER_URL = os.getenv("CELERY_BROKER_0")
    CELERY_RESULT_BACKEND =  os.getenv("CELERY_BACKEND_0")


CELERY_TIMEZONE = os.getenv("CELERY_TIMEZONE")

# CELERY_BROKER_TRANSPORT_OPTIONS =  os.getenv("CELERY_BROKER_TRANSPORT_OPTIONS")
# CELERY_ACCEPT_CONTENT =  os.getenv("CELERY_ACCEPT_CONTENT")
# CELERY_TASK_SERIALIZER =  'json'
# CELERY_RESULT_SERIALIZER =  os.getenv("CELERY_RESULT_SERIALIZER ")
# CELERY_TASK_TRACK_STARTED = os.getenv("CELERY_TASK_TRACK_STARTED")
# CELERY_TASK_TIME_LIMIT = os.getenv("CELERY_TASK_TIME_LIMIT")

TOKEN_TG = os.getenv("TG_TOKEN")
CHAT_ID =  os.getenv("TG_CHAT_ID")