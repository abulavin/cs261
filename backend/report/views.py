from rest_framework.generics import ListAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django_filters.rest_framework import DjangoFilterBackend

from .serializers import ReportSerializer
from .filters import ReportFilter
from .models import Report
from .report import generate_report


class RetriveReports(ListAPIView):
    """
    Retrieve Reports from a given date or given date range.
    """
    serializer_class = ReportSerializer
    queryset = Report.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_class = ReportFilter

class GenerateReport(APIView):
    """
    This view will generate a real time report and return the url of it to the
    user.
    """
    serializer_class = ReportSerializer

    def post(self, request, format=None):
        return generate_report(is_daily_report=False)
        
