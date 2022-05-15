from django.urls import path
from . import views

urlpatterns = [
    path('get/all-persons', views.getAllPersons, name='getAllPersons'),
    path('get/person', views.getPerson, name='getPerson'),
    path('get/stats', views.getStatistics, name='getStats'),
    path('add/person', views.addPerson, name='addPerson'),
    path('add/track-history', views.addTrackHistory, name='addTrackhistory')
]

