import os

from django.db import models


class Report(models.Model):
    """
    Model to store a report along with the date it was generated.
    """
    date = models.DateField()
    report = models.CharField(max_length=1000)

    class Meta:
        ordering = ['-date']