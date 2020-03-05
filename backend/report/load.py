import datetime

from .report import generate_report
from .models import Report

def create_reports():
    """
    Create dummy reports.
    """
    for i in range(0, 7):
        date = datetime.datetime.now().date() + datetime.timedelta(days=i)
        filename = generate_report(date=date, return_filename=True)
        Report.objects.create(date=date, report=filename)