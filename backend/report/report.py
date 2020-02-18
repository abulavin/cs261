"""
This file will handle the generating of reports.
"""
from django.template.loader import render_to_string
from django.utils import timezone

# from weasyprint import HTML

from trades.models import DerivativeTrade, DerivativeTradeHistory
from .models import Report


def generate_report():
    html = render_to_string('report_template.html', {
        'new_trades': DerivativeTrade.objects.filter(date_of_trade=timezone.now()),
        'modified_trades': DerivativeTradeHistory.objects.filter(added_to_report=False)
    })
    report = HTML(string=html).write_pdf()
    return Report.objects.create(report=report)


