from django.contrib.auth.models import AbstractUser, BaseUserManager, UserManager
from django.db import models
from django.apps import apps
from django.contrib.auth.hashers import make_password
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token

from django.conf import settings


# Create your models here.


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)


class UserProfileManager(UserManager):
    """Manager for user profiles"""

    def _create_user(self, username, email, password, **extra_fields):
        """
        Create and save a user with the given username, email, and password.
        """
        if not username:
            raise ValueError('The given username must be set')
        email = self.normalize_email(email)
        # Lookup the real model class from the global app registry so this
        # manager method can be used in migrations. This is fine because
        # managers are by definition working on the real model.
        GlobalUserModel = apps.get_model(self.model._meta.app_label, self.model._meta.object_name)
        username = GlobalUserModel.normalize_username(username)
        user = self.model(username=username, email=email, **extra_fields)
        user.password = make_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, username, email=None, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(username, email, password, **extra_fields)

    def create_superuser(self, username, email=None, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self._create_user(username, email, password, **extra_fields)


class UserProfile(AbstractUser):
    email = models.EmailField(max_length=255, unique=True)
    is_teacher = models.BooleanField(default=False)
    is_student = models.BooleanField(default=False)
    otp = models.CharField(max_length=8, blank=True)
    is_verified = models.BooleanField(default=False)

    objects = UserProfileManager()

    def __str__(self):
        """Return string representation of user"""
        return self.username


class Student(models.Model):
    user_profile = models.OneToOneField(UserProfile, related_name='student_profile', on_delete=models.CASCADE,
                                        primary_key=True)
    roll = models.CharField(max_length=50)
    cgpa = models.CharField(max_length=50, blank=True, null=True)

    def __str__(self):
        """Return string representation of user"""
        return self.user_profile.username


class Teacher(models.Model):
    user_profile = models.OneToOneField(UserProfile, related_name='teacher_profile', on_delete=models.CASCADE,
                                        primary_key=True)
    designation = models.CharField(max_length=50)

    def __str__(self):
        """Return string representation of user"""
        return self.user_profile.username
