from rest_framework import serializers

from .models import DerivataveTrade

class DerivataveTradeSerializer(serializers.ModelSerializer):
    class Meta:
        model = DerivataveTrade
        excluded = []

