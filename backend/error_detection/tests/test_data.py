import datetime
from trades.models import CompanyCode, ProductSeller

today = datetime.datetime(2020, 3, 3)

sample_fields = {
    'date_of_trade': datetime.datetime(2020, 2, 27),
    'product': "Trees",
    'buying_party': "CMZC67",
    'selling_party': "HWJF09",
    'notional_amount': 1000,
    'quantity': 1000,
    'notional_currency': "USD",
    'maturity_date': datetime.datetime(2050, 9, 3),
    'underlying_price': 123,
    'underlying_currency': "USD",
    'strike_price': 50
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