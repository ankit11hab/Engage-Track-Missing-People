from django.urls import path
from . import views

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', views.RegisterView.as_view(), name='register'),
    path('register-bulk/', views.registerInBulk, name='registerInBulk'),
    path('change-password/', views.changePassword, name='changePassword'),
    path('get-details/', views.getPoliceStationDetails, name='getDetails'),
    path('get/all-police-stations', views.getAllPoliceStations, name='getAllPS'),
    path('edit-details/', views.editPoliceStationDetails, name='editDetails'),
]