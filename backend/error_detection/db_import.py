from trades.models import (
    CompanyCode, ProductSeller, DerivativeTrade
)

company_codes = CompanyCode.objects.all()

product_sellers = ProductSeller.objects.all()

derivative_trades = DerivativeTrade.objects.all()