from django.contrib.auth.models import AbstractUser
from django.db import models


from django.contrib.auth.models import AbstractUser, Group, Permission
from django.db import models


class User(AbstractUser):
    email = models.EmailField(unique=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    groups = models.ManyToManyField(
        Group,
        related_name="custom_user_set",  # Unique related_name for groups
        related_query_name="custom_user_group",  # Unique query_name
        blank=True,
    )
    user_permissions = models.ManyToManyField(
        Permission,
        # Unique related_name for user_permissions
        related_name="custom_user_permissions_set",
        related_query_name="custom_user_permission",  # Unique query_name
        blank=True,
    )

    class Meta:
        swappable = 'AUTH_USER_MODEL'


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    currency = models.CharField(max_length=3, default='RWF')
    timezone = models.CharField(max_length=50, default='UTC')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
