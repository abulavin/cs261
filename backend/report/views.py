from rest_framework.generics import (
    ListCreateAPIView, RetrieveUpdateDestroyAPIView, ListAPIView
)
from django.views.decorators.http import require_POST
from rest_framework.response import Response
from rest_framework import status
from django_filters.rest_framework import DjangoFilterBackend

from .serializers import ReportSerializer
from .filters import ReportFilter
from .models import Report


class RetriveReports(ListAPIView):
    """
    Retrieve Reports from a given date or given date range.
    """
    serializer_class = ReportSerializer
    queryset = Report.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_class = ReportFilter

@require_POST
def generate_report(request):
    """
    This view will generat a real time report and return the url of it  to the
    user. 
    """
    pass
