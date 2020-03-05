import datetime
from trades.models import CompanyCode, ProductSeller

today = datetime.datetime(2020, 3, 3)

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