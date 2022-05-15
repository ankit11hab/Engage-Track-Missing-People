# Generated by Django 4.0.4 on 2022-05-15 13:33

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('missing_people', '0008_remove_missingperson_latitude_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='missingperson',
            name='image',
            field=models.ImageField(default='default.jpg', upload_to='images'),
        ),
        migrations.AlterField(
            model_name='trackhistory',
            name='time_of_tracking',
            field=models.DateTimeField(default=datetime.datetime(2022, 5, 15, 19, 3, 57, 902146)),
        ),
    ]
