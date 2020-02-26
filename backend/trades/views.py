from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.response import Response
from rest_framework import status
from django_filters.rest_framework import DjangoFilterBackend

from .serializers import DerivativeTradeSerializer
from .models import DerivativeTrade, DerivativeTradeHistory
from .helper import check_trade_editable


class ListCreateDerivativeTrade(ListCreateAPIView):
    """
    View to list all trades as well as handle the creating of the new trades.
    """
    serializer_class = DerivativeTradeSerializer
    queryset = DerivativeTrade.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = '__all__'

    def create(self, request, *args, **kwargs):
        """
        This method is called when the data provided is valid and before the new 
        DerivativeTrade is created in the database. The Error Detection Module
        will be called in this method.
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        # Call the Error Detection Module

        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

class RetrieveUpdateDestroyDerivativeTrade(RetrieveUpdateDestroyAPIView):
    """
    View to handle the retrieving, updating and destroying of a Derivative Trade.
    This View will also log any changes made to the model.
    """
    serializer_class = DerivativeTradeSerializer
    queryset = DerivativeTrade.objects.all()
    lookup_field = 'trade_id'

    def _log_change(self, history_type, trade):
        """
        This method will create a DerivativeTradeHistory to log a change to the 
        given DerivativeTrade.
        """
        DerivativeTradeHistory.objects.create(
            history_type=history_type,
            up_to_date_trade=trade if history_type == 'E' else None,
            date_of_trade=trade.date_of_trade,
            trade_id=trade.trade_id,
            product=trade.product,
            buying_party=trade.buying_party,
            selling_party=trade.selling_party,
            notional_amount=trade.notional_amount,
            quantity=trade.quantity,
            notional_currency=trade.notional_currency,
            maturity_date=trade.maturity_date,
            underlying_price=trade.underlying_price,
            underlying_currency=trade.underlying_currency,
            strike_price=trade.strike_price
        )

    def update(self, request, *args, **kwargs):
        """
        PUT and UPDATE requests handled by this method. It will run the Error 
        Detection Module and then log any changes made to the DerivativeTrade.
        """
        # Check the trade is not more than 7 days old.
        if not check_trade_editable(self.get_object()):
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        # Error Detection Module Called Upon.
        
        self._log_change('E', self.get_object())
        return super().update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        """
        This methods handles the logging and deleteing of a DerivativeTrade.
        """
        self._log_change('D', self.get_object())
        return super().delete(request, *args, **kwargs)