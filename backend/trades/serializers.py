from rest_framework import serializers

from .models import DerivativeTrade, Report

class DerivativeTradeSerializer(serializers.ModelSerializer):
    class Meta:
        model = DerivativeTrade
        exclude = ['id']

class ReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = Report
        exclude = ['id']
