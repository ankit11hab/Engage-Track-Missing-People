from email.policy import default
from typing_extensions import Required
from django.db import models
from django.contrib.auth  import get_user_model
import datetime

from authentication.models import CustomUser

User = get_user_model()


GENDER_CHOICES = (
    ('M', 'M'),
    ('F', 'F'),
    ('O', 'O')
)

class MissingPerson(models.Model):
    person_uuid = models.CharField(max_length=100, default="")
    applicant_police_station = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    image = models.ImageField(default='default.jpg', upload_to = 'missing_people')
    age = models.IntegerField(default=0)
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES, default='M')
    isCriminal = models.BooleanField(default=False)
    isTracked = models.BooleanField(default=False)
    isFound = models.BooleanField(default=False)
    details = models.TextField(max_length=1000, default="")
    applicant_email = models.EmailField(max_length=60,default="")
    time_of_addition = models.DateTimeField(default=datetime.datetime.now())
    time_of_first_tracking = models.DateTimeField(default=None, null=True, blank=True)
    time_of_found = models.DateTimeField(default=None, null=True, blank=True)


    def __str__(self):
        return self.name


class TrackHistory(models.Model):
    missing_person = models.ForeignKey(MissingPerson, on_delete=models.CASCADE, null=True)
    time_of_tracking = models.DateTimeField(default=datetime.datetime.now())
    location = models.CharField(max_length=300,default="")
    image = models.ImageField(upload_to = 'captured_images', null=True, blank=True)





class Notifications(models.Model):
    police_station = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    message = models.CharField(max_length=200, default="")
    link = models.CharField(max_length=200, null=True, blank=True)
    time = models.DateTimeField(default=datetime.datetime.now())
    seen = models.BooleanField(default=False)

    def __str__(self):
        return self.message