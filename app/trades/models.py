from django.db import models


class ProductSeller(models.Model):
    """
    Model to store a Product Sellers.
    """
    product = models.CharField(max_length=200)
    company_id = models.CharField(max_length=100)

class CompanyCode(models.Model):
    """
    Model to store Company Codes.
    """
    company_name = models.CharField(max_length=200)
    company_trade_id = models.CharField(max_length=200)