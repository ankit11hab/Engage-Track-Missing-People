from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser


class AccountAdmin(UserAdmin):
    list_display = ('police_station_uid', 'date_joined', 'location', 'phone', 'email', 'last_login', 'is_admin', 'is_staff')
    search_fields = ('police_station_uid', 'location', 'phone', 'email')
    readonly_fields = ('id','date_joined', 'last_login')

    ordering = ('police_station_uid',)

    filter_horizontal = ()
    last_filter = ()
    fieldsets = ()

admin.site.register(CustomUser, AccountAdmin)