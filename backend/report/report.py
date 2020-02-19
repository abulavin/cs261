"""
This file will handle the generating of reports.
"""
from django.template.loader import render_to_string
from django.http import HttpResponse
from django.utils import timezone
from django.conf import settings

from weasyprint import HTML

from .models import Report
from trades.models import DerivativeTrade, DerivativeTradeHistory


def generate_report(date='2013-12-04', is_daily_report=True):
    html = render_to_string('report_template.html', {
        'new_trades': DerivativeTrade.objects.filter(date_of_trade=date)[:5],
        'modified_trades': DerivativeTradeHistory.objects.filter(added_to_report=False)
    })
    if is_daily_report:
        save_path = settings.BASE_DIR + f'\\report\\reports\\demand\\{date}.pdf'
    else:
        save_path = settings.BASE_DIR + f'\\report\\reports\\auto\\{date}.pdf'
        
    HTML(string=html).write_pdf(save_path)
    return Report.objects.create(report=save_path)
    # return HttpResponse(report, content_type='application/pdf')


