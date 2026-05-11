from django.apps import AppConfig

class BaseConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'base'

    def ready(self):
        # Import the signal function when app is ready
        from .signals import protect_models_from_overquota
        protect_models_from_overquota()
