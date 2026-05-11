import os
from django.conf import settings
from django.db import connection
from django.http import JsonResponse
from django.views.decorators.http import require_GET
from django.utils.decorators import method_decorator
from django.views import View

def get_database_size():
    engine = settings.DATABASES['default']['ENGINE']

    if 'sqlite' in engine:
        db_path = settings.DATABASES['default']['NAME']
        if os.path.exists(db_path):
            size = os.path.getsize(db_path)
            return size
        return 0

    elif 'postgresql' in engine:
        with connection.cursor() as cursor:
            cursor.execute("SELECT pg_database_size(current_database());")
            size = cursor.fetchone()[0]
            return size

    elif 'mysql' in engine:
        db_name = settings.DATABASES['default']['NAME']
        with connection.cursor() as cursor:
            cursor.execute(f"""
                SELECT SUM(data_length + index_length) 
                FROM information_schema.tables 
                WHERE table_schema = %s
            """, [db_name])
            result = cursor.fetchone()
            return result[0] if result and result[0] else 0

    return 0

def get_media_folder_size():
    total_size = 0
    media_root = settings.MEDIA_ROOT

    for dirpath, _, filenames in os.walk(media_root):
        for filename in filenames:
            fp = os.path.join(dirpath, filename)
            if os.path.isfile(fp):
                total_size += os.path.getsize(fp)

    return total_size


@require_GET
def storage_usage_view(request):
    db_size = get_database_size()
    media_size = get_media_folder_size()
    total_size = db_size + media_size

    def format_size(size_bytes):
        # Human readable size (KB, MB, GB)
        for unit in ['B', 'KB', 'MB', 'GB', 'TB']:
            if size_bytes < 1024:
                return f"{size_bytes:.2f} {unit}"
            size_bytes /= 1024
        return f"{size_bytes:.2f} PB"

    return JsonResponse({
        "database_size_bytes": db_size,
        "database_size_human": format_size(db_size),
        "media_size_bytes": media_size,
        "media_size_human": format_size(media_size),
        "total_size_bytes": total_size,
        "total_size_human": format_size(total_size),
    })
    
    

