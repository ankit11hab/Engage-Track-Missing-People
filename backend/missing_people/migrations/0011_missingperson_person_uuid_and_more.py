# Generated by Django 4.0.4 on 2022-05-17 13:23

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('missing_people', '0010_remove_trackhistory_latitude_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='missingperson',
            name='person_uuid',
            field=models.CharField(default='', max_length=20),
        ),
        migrations.AlterField(
            model_name='trackhistory',
            name='time_of_tracking',
            field=models.DateTimeField(default=datetime.datetime(2022, 5, 17, 18, 53, 34, 304334)),
        ),
    ]
