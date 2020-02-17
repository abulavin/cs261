import os

from django.db import models


class CompanyCode(models.Model):
    """
    Model to store a Company Code.
    """
    company_name = models.CharField(max_length=200)
    company_trade_id = models.CharField(max_length=200)

class ProductSeller(models.Model):
    """
    Model to store a Product Sellers.
    """
    product = models.CharField(max_length=200)
    company_id = models.CharField(max_length=100)

class StockPrice(models.Model):
    """
    Model to store a Stock Price.
    """
    date = models.DateField()
    company_id = models.CharField(max_length=200)
    stock_price = models.FloatField()

class ProductPrice(models.Model):
    """
    Model to store a Product Price.
    """ 
    date = models.DateField()
    product = models.CharField(max_length=200)
    market_price = models.FloatField()

class CurrencyValue(models.Model):
    """
    Model to store a Currency Value.
    """
    date = models.DateField()
    currency = models.CharField(max_length=200)
    value_in_usd = models.FloatField()

class DerivativeTrade(models.Model):
    """
    Model to store a Derivative Trade.
    """
    date_of_trade = models.DateField()
    trade_id = models.CharField(max_length=200)
    product = models.CharField(max_length=200)
    buying_party = models.CharField(max_length=200) 
    selling_party = models.CharField(max_length=200)
    notational_amount = models.FloatField()
    quantity = models.FloatField()
    notational_currency = models.CharField(max_length=200)
    maturity_date = models.DateField()
    underlying_price = models.FloatField()
    underlying_currency = models.CharField(max_length=200)
    strike_price = models.FloatField()

    class Meta:
        ordering = ['-date_of_trade']

class DerivativeTradeHistory(models.Model):
    """
    This model tracks the history of a DerivativeTrade model if it has been 
    edited or deleted. A DerivativeTrade model may have no DerivativeTradeHistory's
    or it may have serveral depending on how many changes have been made.

    Edit: the history stores the FK to the up-to-date version of the DerivativeTrade
    as well as the previous data.
    Delete: the history has a null FK but stores the data of the DerivativeTrade
    before it was deleted.
    """
    HISTORY_TYPE = (
        ('E', 'Edit'),
        ('D', 'Delete'),
    )

    history_type = models.CharField(max_length=1, choices=HISTORY_TYPE)
    up_to_date_trade = models.ForeignKey(DerivativeTrade, on_delete=models.SET_NULL, related_name='history', null=True)
    date_modified = models.DateTimeField(auto_now_add=True)
    added_to_report = models.BooleanField(default=False)
    # store fields from DerivativeTrade
    date_of_trade = models.DateField()
    trade_id = models.CharField(max_length=200)
    product = models.CharField(max_length=200)
    buying_party = models.CharField(max_length=200) 
    selling_party = models.CharField(max_length=200)
    notational_amount = models.FloatField()
    quantity = models.FloatField()
    notational_currency = models.CharField(max_length=200)
    maturity_date = models.DateField()
    underlying_price = models.FloatField()
    underlying_currency = models.CharField(max_length=200)
    strike_price = models.FloatField()
    
    class Meta:
        ordering = ['-date_modified', '-id']
