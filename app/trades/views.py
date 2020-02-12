from rest_framework.generics import (
    ListCreateAPIView, RetrieveUpdateDestroyAPIView
)

from .serializers import DerivataveTradeSerializer
from .models import DerivataveTrade


class ListCreateDerivataveTrade(ListCreateAPIView):
    serializer_class = DerivataveTradeSerializer
    queryset = DerivataveTrade.objects.all()

class RetrieveUpdateDestroyDerivataveTrade(RetrieveUpdateDestroyAPIView):
    serializer_class = DerivataveTradeSerializer
    queryset = DerivataveTrade.objects.all()
    lookup_field = 'trade_id'