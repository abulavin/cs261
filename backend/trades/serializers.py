from rest_framework import serializers

from .models import DerivativeTrade


class DerivativeTradeSerializer(serializers.ModelSerializer):
    class Meta:
        model = DerivativeTrade
        exclude = ['id']