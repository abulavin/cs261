import datetime
from trades.models import CompanyCode, ProductSeller, DerivativeTrade

today = datetime.datetime(2020, 3, 3)

sample_fields = {
    'date_of_trade': datetime.datetime(2020, 2, 27),
    'product': "Trees",
    'buying_party': "CMZC67",
    'selling_party': "HWJF09",
    'notional_amount': 3302.76,
    'quantity': 51,
    'notional_currency': "USD",
    'maturity_date': datetime.datetime(2050, 9, 3),
    'underlying_price': 64.76,
    'underlying_currency': "USD",
    'strike_price': 63
}

def populate_db():
    CompanyCode.objects.create(
        company_name="Pear",
        company_trade_id="HWJF09"
    )
    CompanyCode.objects.create(
        company_name="Large Corporation",
        company_trade_id="CMZC67"
    )
    CompanyCode.objects.create(
        company_name="SoftEng INC.",
        company_trade_id="JEOX97"
    )

    ProductSeller.objects.create(
        product="Rocks",
        company_id="CMZC67"
    )
    ProductSeller.objects.create(
        product="Trees",
        company_id="JEOX97"
    )
    ProductSeller.objects.create(
        product="Xylophones",
        company_id="HWJF09"
    )

    DerivativeTrade.objects.create(
        date_of_trade=datetime.datetime(2020, 2, 27),
        product="Trees",
        buying_party="CMZC67",
        selling_party="HWJF09",
        notional_amount=3870.02,
        quantity=77,
        notional_currency="USD",
        maturity_date=datetime.datetime(2050, 9, 3),
        underlying_price=50.26,
        underlying_currency="USD",
        strike_price=60
    )
    DerivativeTrade.objects.create(
        date_of_trade=datetime.datetime(2020, 2, 27),
        product="Trees",
        buying_party="CMZC67",
        selling_party="HWJF09",
        notional_amount=1480,
        quantity=20,
        notional_currency="USD",
        maturity_date=datetime.datetime(2050, 9, 3),
        underlying_price=74,
        underlying_currency="USD",
        strike_price=60.88
    )
    DerivativeTrade.objects.create(
        date_of_trade=datetime.datetime(2020, 2, 27),
        product="Trees",
        buying_party="CMZC67",
        selling_party="HWJF09",
        notional_amount=2879.36,
        quantity=64,
        notional_currency="USD",
        maturity_date=datetime.datetime(2050, 9, 3),
        underlying_price=44.99,
        underlying_currency="USD",
        strike_price=50
    )
    DerivativeTrade.objects.create(
        date_of_trade=datetime.datetime(2020, 2, 27),
        product="Rocks",
        buying_party="CMZC67",
        selling_party="HWJF09",
        notional_amount=5608800000,
        quantity=45600,
        notional_currency="USD",
        maturity_date=datetime.datetime(2050, 9, 3),
        underlying_price=123000,
        underlying_currency="USD",
        strike_price=105000
    )