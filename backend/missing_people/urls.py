from django.urls import path
from . import views

urlpatterns = [
    path('get/all-persons', views.getAllPersons, name='getAllPersons'),
    path('get/all-criminals', views.getAllCriminals, name='getAllCriminals'),
    path('get/all-non-criminals', views.getAllNonCriminals, name='getAllNonCriminals'),
    path('get/all-applied-from-here', views.getAllAppliedFromHere, name='getAllAppliedFromHere'),
    path('get/my-tracked', views.getMyTracked, name='getMyTracked'),
    path('get/my-found', views.getMyFound, name='getMyFound'),
    path('get/all-tracked', views.getAllTracked, name='getAllTracked'),
    path('get/all-found', views.getAllFound, name='getAllFound'),
    path('get/person', views.getPerson, name='getPerson'),
    path('get/notifications', views.getNotifications, name='getNotifications'),
    path('get/stats', views.getStatistics, name='getStats'),
    path('add/person', views.addPerson, name='addPerson'),
    path('add/track-history', views.addTrackHistory, name='addTrackhistory'),
    path('add/track-history-manually', views.addTrackHistoryManually, name='addTrackhistoryManually'),
    path('delete/person', views.deletePerson, name='deletePerson'),
    path('edit/person', views.editPerson, name='editPerson'),
    path('edit/notification-status', views.editNotificationStatus, name='editNotificationStatus')
]

