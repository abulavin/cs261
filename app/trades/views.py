from rest_framework.generics import (
    ListCreateAPIView, RetrieveUpdateDestroyAPIView
)

from .serializers import DerivataveTradeSerializer
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
        self._log_change()
        return super().delete(request, *args, **kwargs)