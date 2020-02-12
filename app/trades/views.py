from rest_framework.generics import (
    ListCreateAPIView, RetrieveUpdateDestroyAPIView, ListAPIView
)
from django.views.decorators.http import require_POST
from rest_framework.response import Response
from rest_framework import status

from .serializers import DerivataveTradeSerializer, ReportSerializer
from .models import DerivataveTrade, DerivataveTradeHistory


class ListCreateDerivataveTrade(ListCreateAPIView):
    """
    View to list all trades as well as handle the creating of the new trades.
    """
    serializer_class = DerivataveTradeSerializer
    queryset = DerivataveTrade.objects.all()

    def perform_create(self, serializer):
        """
        This method is called when the data provided is valid and before the new 
        DerivataveTrade is created in the database. The Error Detection Module
        will be called in this method.
        """
        # Error Detection Module Called Upon.
        super().perform_create(serializer)

class RetrieveUpdateDestroyDerivataveTrade(RetrieveUpdateDestroyAPIView):
    """
    View to handle the retrieving, updating and destroying of a Derivatave Trade.
    This View will also log any changes made to the model.
    """
    serializer_class = DerivataveTradeSerializer
    queryset = DerivataveTrade.objects.all()
    lookup_field = 'trade_id'

    def _log_change(self):
        """
        This method will create a DerivataveTradeHistory to log a change to the 
        given DerivataveTrade.
        """
        # DerivataveTradeHistory.objects.create()
        pass

    def update(self, request, *args, **kwargs):
        """
        PUT and UPDATE requests handled by this method. It will run the Error 
        Detection Module and then log any changes made to the DerivataveTrade.
        """
        # Error Detection Module Called Upon.
        self._log_change()
        return super().update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        """
        This methods handles the logging and deleteing of a DerivataveTrade.
        """
        self._log_change()
        return super().delete(request, *args, **kwargs)

class RetriveReports(ListAPIView):
    """
    Retrieve Reports from a given date or given date range.
    """
    serializer_class = ReportSerializer

    def get_queryset(self):
        """
        Get filter params and use to filter down the reports that match the 
        query. The reports can be filtered by a single day or a range of days.
        """
        reports = Report.objects.all()
        filtered_reports = None
        # If date param is passed, get reports from that exact date.
        exact_date = request.query_params.get('date')
        if exact_date is not None:
            filtered_reports = reports.filter(date_generated=exact_date)
        # If date_gt and date_lt passed then reports from range of dates to be returned.
        date_gt = request.query_params.get('date_gt')
        date_lt = request.query_params.get('date_lt')
        if date_gt is not None and date_lt is not None:
            filtered_reports =  reports.filter(
                date_generated__gte=date_gt,
                date_generated__lte=date_lt
            ) 

        return filtered_reports

@require_POST
def generate_report(request):
    """
    This view will generat a real time report and return it to the user. 
    """
    pass