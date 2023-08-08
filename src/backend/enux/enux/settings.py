import os
from datetime import timedelta
from pathlib import Path
from .utils import is_env_true

VERSION = "0.1"

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.environ.get('DJANGO_SECRET_KEY')

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = is_env_true("DEBUG")

ALLOWED_HOSTS = os.environ.get('ALLOWED_HOSTS', '*').split()


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    # own
    'apps.users',
    'apps.products',
    'apps.coupons',
    'apps.reviews',
    'apps.shipping',
    'apps.store',
    'apps.payments',
]

MIDDLEWARE = [
    'social_django.middleware.SocialAuthExceptionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'enux.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / "templates"],
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

WSGI_APPLICATION = 'enux.wsgi.application'


# Database
# https://docs.djangoproject.com/en/4.2/ref/settings/#databases
DB_ENGINE = os.environ.get('DB_ENGINE', 'django.db.backends.sqlite3')
DATABASES = {
    'default': {
        'ENGINE': DB_ENGINE,
        'NAME': os.environ.get('DB_NAME', BASE_DIR / 'db.sqlite3'),
    }
}
if DB_ENGINE != 'django.db.backends.sqlite3':
    DATABASES["default"]["USER"] = os.environ.get('DB_USER')
    DATABASES["default"]["PASSWORD"] = os.environ.get('DB_PASSWORD')
    DATABASES["default"]["HOST"] = os.environ.get('DB_HOST')
    DATABASES["default"]["PORT"] = os.environ.get('DB_PORT')


    if not is_env_true("DB_IGNORE_SSL"):
        DATABASES["default"]["OPTIONS"] = {
            "sslmode": "require"
        }


# Password validation
# https://docs.djangoproject.com/en/4.2/ref/settings/#auth-password-validators

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


# Internationalization
# https://docs.djangoproject.com/en/4.2/topics/i18n/

LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

# Default primary key field type
# https://docs.djangoproject.com/en/4.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# for admin sortable
CSRF_COOKIE_HTTPONLY = False

# default to checks
DF_EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'

# email configs
EMAIL_BACKEND = os.environ.get('EMAIL_BACKEND', DF_EMAIL_BACKEND)
if EMAIL_BACKEND != DF_EMAIL_BACKEND:
    EMAIL_HOST = os.environ.get('EMAIL_HOST', None)
    EMAIL_PORT = os.environ.get('EMAIL_PORT', None)
    EMAIL_HOST_USER = os.environ.get('EMAIL_HOST_USER', None)
    EMAIL_HOST_PASSWORD = os.environ.get('EMAIL_HOST_PASSWORD', None)
    EMAIL_USE_TLS = is_env_true("EMAIL_USE_TLS")
    EMAIL_USE_SSL = is_env_true("EMAIL_USE_SSL")
    EMAIL_TIMEOUT = os.environ.get('EMAIL_TIMEOUT', None)
    DEFAULT_FROM_EMAIL = os.environ.get('DEFAULT_FROM_EMAIL', None)


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.2/howto/static-files/

STATICFILES_DIRS = [
    BASE_DIR / "staticfiles",
    #'/var/www/static/',
]
STATIC_ROOT = BASE_DIR / "staticfiles-cdn"
MEDIA_ROOT = BASE_DIR / "mediafiles-cdn"
STATIC_URL = '/static/'
MEDIA_URL = '/media/'


# DRF
REST_FRAMEWORK = {
    'DEFAULT_SCHEMA_CLASS': os.environ.get(
        'DRF_DEFAULT_SCHEMA_CLASS',
        'rest_framework.schemas.coreapi.AutoSchema'
    ),
    'DEFAULT_PARSER_CLASSES': [
        'rest_framework.parsers.JSONParser',
        'rest_framework.parsers.FormParser',
        'rest_framework.parsers.MultiPartParser'
    ],
    'DEFAULT_FILTER_BACKENDS': [
        'django_filters.rest_framework.DjangoFilterBackend'
    ],
    'DEFAULT_AUTHENTICATION_CLASSES': tuple(os.environ.get(
        'DRF_DEFAULT_AUTHENTICATION_CLASSES',
        '{} {}'.format(
            "rest_framework_simplejwt.authentication.JWTAuthentication",
            "rest_framework.authentication.SessionAuthentication"
        )
    ).split(' ')),
    # Use Django's standard `django.contrib.auth` permissions,
    # or allow read-only access for unauthenticated users.
    'DEFAULT_PERMISSION_CLASSES': os.environ.get(
        'DRF_DEFAULT_PERMISSION_CLASSES',
        # 'rest_framework.permissions.AllowAny'
        'rest_framework.permissions.IsAuthenticated',
    ).split(' '),
    'DEFAULT_PAGINATION_CLASS': os.environ.get(
        'DRF_DEFAULT_PAGINATION_CLASS',
        'rest_framework.pagination.PageNumberPagination',
    ),
    'PAGE_SIZE': int(os.environ.get('DRF_PAGE_SIZE', 10))
}

AUTHENTICATION_BACKENDS = (
    'social_core.backends.google.GoogleOAuth2',
    'social_core.backends.facebook.FacebookOAuth2',
    'django.contrib.auth.backends.ModelBackend',
)

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=60),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=10),
    'ROTATE_REFRESH_TOKENS': True,
    'BLACKLIST_AFTER_ROTATION': True,
    'ALGORITHM': 'HS256',
    'SIGNING_KEY': SECRET_KEY,
    'VERIFYING_KEY': None,
    'AUTH_HEADER_TYPES': ('Bearer', 'JWT',),
    'USER_ID_FIELD': 'id',
    'USER_ID_CLAIM': 'user_id',
    'AUTH_TOKEN_CLASSES': ('rest_framework_simplejwt.tokens.AccessToken',),
    'TOKEN_TYPE_CLAIM': 'token_type',
}