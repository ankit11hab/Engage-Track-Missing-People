# Generated by Django 4.0.4 on 2022-05-27 09:42

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('missing_people', '0019_notifications_link_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='missingperson',
            name='time_of_addition',
            field=models.DateTimeField(default=datetime.datetime(2022, 5, 27, 15, 12, 35, 607437)),
        ),
        migrations.AlterField(
            model_name='notifications',
            name='time',
            field=models.DateTimeField(default=datetime.datetime(2022, 5, 27, 15, 12, 35, 608437)),
        ),
        migrations.AlterField(
            model_name='trackhistory',
            name='time_of_tracking',
            field=models.DateTimeField(default=datetime.datetime(2022, 5, 27, 15, 12, 35, 607437)),
        ),
    ]
