from rest_framework import serializers

from .models import DerivataveTrade, Report

class DerivataveTradeSerializer(serializers.ModelSerializer):
    class Meta:
        model = DerivataveTrade
        exclude = ['id']

class ReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = Report
        exclude = ['id']
