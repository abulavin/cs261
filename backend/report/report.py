"""
This file will handle the generating of reports.
"""
import os

from django.template.loader import render_to_string
from django.http import HttpResponse
from django.utils import timezone
from django.conf import settings

try:
    from weasyprint import HTML                   
except ImportError:
    print('Weasyprint not installed correctly')

from .models import Report
from trades.models import DerivativeTrade, DerivativeTradeHistory


def generate_report(date, is_daily_report=True, return_filename=False):
    html = render_to_string('report_template.html', {
        'new_trades': DerivativeTrade.objects.filter(date_of_trade__date=date)[:50],
        'modified_trades': DerivativeTradeHistory.objects.filter(added_to_report=False)
    })
    if return_filename is False:
        report = HTML(string=html).write_pdf()
        return HttpResponse(report, content_type='application/pdf')
    else:
        filename = os.path.join('report/reports/', str(date) + '.pdf')
        HTML(string=html).write_pdf(filename)
        return filename

