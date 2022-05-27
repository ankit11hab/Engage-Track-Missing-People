from django.contrib import admin
from .models import MissingPerson, TrackHistory, Notifications

admin.site.register(MissingPerson)
admin.site.register(TrackHistory)
admin.site.register(Notifications)