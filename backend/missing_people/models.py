from email.policy import default
from django.db import models
from django.contrib.auth  import get_user_model
import datetime

User = get_user_model()


GENDER_CHOICES = (
    ('M', 'M'),
    ('F', 'F'),
    ('O', 'O')
)

class MissingPerson(models.Model):
    person_uuid = models.CharField(max_length=20, default="")
    applicant_police_station = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    image = models.ImageField(default='default.jpg', upload_to = 'missing_people')
    age = models.IntegerField(default=0)
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES, default='M')
    isCriminal = models.BooleanField(default=False)
    isTracked = models.BooleanField(default=False)
    isFound = models.BooleanField(default=False)
    details = models.TextField(max_length=300, default="")
    applicant_email = models.EmailField(max_length=60,default="")


    def __str__(self):
        return self.name


class TrackHistory(models.Model):
    missing_person = models.ForeignKey(MissingPerson, on_delete=models.CASCADE, null=True)
    time_of_tracking = models.DateTimeField(default=datetime.datetime.now())
    location = models.CharField(max_length=300,default="")

    def __str__(self):
        return f"{self.missing_person.name} | {self.time_of_tracking}"