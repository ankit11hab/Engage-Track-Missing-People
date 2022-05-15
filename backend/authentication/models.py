from dataclasses import is_dataclass
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin


class AccountManager(BaseUserManager):
    def create_user(self, police_station_uid, phone, email, latitude, longitude, password=None):
        if not police_station_uid:
            raise ValueError("User must have a unique police station ID")
        if not phone:
            raise ValueError("User must have a phone number")
        if not email:
            raise ValueError("User must have an email ID")
        if not latitude:
            raise ValueError("User must have a latitude")
        if not longitude:
            raise ValueError("User must have a longitude")
        user = self.model(
            police_station_uid = police_station_uid,
            phone = phone,
            email = self.normalize_email(email),
            latitude = latitude,
            longitude = longitude,
        )
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, police_station_uid, phone, email, latitude, longitude, password):
        user = self.create_user(
            police_station_uid = police_station_uid,
            phone = phone,
            email = email,
            latitude = latitude,
            longitude = longitude,
            password=password
        )
        user.is_admin = True
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)

        return user


class CustomUser(AbstractBaseUser, PermissionsMixin):
    police_station_uid = models.CharField(verbose_name="police_station_uid",max_length=8, unique=True)
    latitude = models.CharField(verbose_name="latitude",max_length=100, default="")
    longitude = models.CharField(verbose_name="longitude",max_length=100, default="")
    phone = models.CharField(verbose_name="phone", max_length = 10, default="")
    email = models.EmailField(verbose_name="email",max_length=60, default="")
    date_joined = models.DateTimeField(verbose_name = "date joined", auto_now_add=True)
    last_login = models.DateTimeField(verbose_name = "last login", auto_now=True)
    is_admin = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    objects = AccountManager()

    USERNAME_FIELD = 'police_station_uid'
    REQUIRED_FIELDS = ['latitude', 'longitude', 'phone','email']

    def __str__(self):
        return self.police_station_uid

    def has_perm(self, perm, obj = None):
        return self.is_admin

    def has_module_perms(self, app_label):
        return True

