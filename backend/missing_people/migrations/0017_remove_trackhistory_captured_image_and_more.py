# Generated by Django 4.0.4 on 2022-05-25 10:29

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('missing_people', '0016_alter_missingperson_time_of_addition_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='trackhistory',
            name='captured_image',
        ),
        migrations.AddField(
            model_name='trackhistory',
            name='image',
            field=models.ImageField(blank=True, default='default.jpg', null=True, upload_to='captured_images'),
        ),
        migrations.AlterField(
            model_name='missingperson',
            name='time_of_addition',
            field=models.DateTimeField(default=datetime.datetime(2022, 5, 25, 15, 59, 0, 538700)),
        ),
        migrations.AlterField(
            model_name='notifications',
            name='time',
            field=models.DateTimeField(default=datetime.datetime(2022, 5, 25, 15, 59, 0, 539702)),
        ),
        migrations.AlterField(
            model_name='trackhistory',
            name='time_of_tracking',
            field=models.DateTimeField(default=datetime.datetime(2022, 5, 25, 15, 59, 0, 539702)),
        ),
    ]