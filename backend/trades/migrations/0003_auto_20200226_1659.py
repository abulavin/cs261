# Generated by Django 3.0.2 on 2020-02-26 16:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('trades', '0002_auto_20200223_2145'),
    ]

    operations = [
        migrations.AlterField(
            model_name='derivativetrade',
            name='date_of_trade',
            field=models.DateTimeField(),
        ),
    ]
