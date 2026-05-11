import os
from django.db.models.signals import pre_save
from django.core.exceptions import ValidationError
from django.dispatch import receiver
from django.conf import settings
from django.db import connection
from .models import StorageQuota
from django.apps import apps
from django.db.models.signals import pre_save

def get_current_total_usage_bytes():
    # DB size
    engine = settings.DATABASES['default']['ENGINE']
    db_size = 0

    if 'sqlite' in engine:
        db_path = settings.DATABASES['default']['NAME']
        if os.path.exists(db_path):
            db_size = os.path.getsize(db_path)

    elif 'postgresql' in engine:
        with connection.cursor() as cursor:
            cursor.execute("SELECT pg_database_size(current_database());")
            db_size = cursor.fetchone()[0]

    elif 'mysql' in engine:
        db_name = settings.DATABASES['default']['NAME']
        with connection.cursor() as cursor:
            cursor.execute("""
                SELECT SUM(data_length + index_length) 
                FROM information_schema.tables 
                WHERE table_schema = %s
            """, [db_name])
            result = cursor.fetchone()
            db_size = result[0] if result and result[0] else 0

    # Media folder size
    media_size = 0
    for dirpath, _, filenames in os.walk(settings.MEDIA_ROOT):
        for filename in filenames:
            fp = os.path.join(dirpath, filename)
            if os.path.isfile(fp):
                media_size += os.path.getsize(fp)

    return db_size + media_size


def check_storage_quota():
    quota = StorageQuota.objects.first()
    if quota:
        current_usage = get_current_total_usage_bytes()
        limit_bytes = quota.limit_gb * 1024 ** 3  # convert GB to bytes
        if current_usage >= limit_bytes:
            raise ValidationError("Storage quota exceeded. You cannot save more data.")


def protect_models_from_overquota():
    models = apps.get_models()
    for model in models:
        if model == StorageQuota:
            continue

        try:
            @receiver(pre_save, sender=model)
            def block_save_if_overquota(sender, instance, **kwargs):
                check_storage_quota()
        except:
            pass