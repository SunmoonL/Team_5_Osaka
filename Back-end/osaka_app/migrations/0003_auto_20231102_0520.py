# Generated by Django 2.1.12 on 2023-11-02 05:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('osaka_app', '0002_auto_20231031_0723'),
    ]

    operations = [
        migrations.AddField(
            model_name='questionlist',
            name='first_link',
            field=models.TextField(default='', null=True),
        ),
        migrations.AddField(
            model_name='questionlist',
            name='fourth_link',
            field=models.TextField(default='', null=True),
        ),
        migrations.AddField(
            model_name='questionlist',
            name='second_link',
            field=models.TextField(default='', null=True),
        ),
        migrations.AddField(
            model_name='questionlist',
            name='third_link',
            field=models.TextField(default='', null=True),
        ),
    ]