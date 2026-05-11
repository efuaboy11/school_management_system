# yourapp/backends.py
from django.contrib.auth.backends import ModelBackend
from .models import Users


def authenticate(username=None, password=None, **kwargs):
    try:
        user = Users.objects.get(username=username)
        if user.check_password(password):
            return user
    except Users.DoesNotExist:
        return None
