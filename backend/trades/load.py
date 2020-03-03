"""
This file contains methods to populate the database with the trades from the 
dummy data folder given.
"""
import os
import csv

from datetime import datetime

from .models import DerivativeTrade, CompanyCode, ProductSeller


def load_data(folder_path):
    """
    This method will take the folder path of the dummy data and populate the db 
    with the data from the dummy data folder.
    """
    company_codes_path = os.path.join(folder_path, 'companyCodes.csv')
    product_sellers_path = os.path.join(folder_path, 'productSellers.csv')
    trades_path = os.path.join(folder_path, 'derivativeTrades', '2019')

    print(company_codes_path)
    print(product_sellers_path)
    print(trades_path)

    load_company_codes(company_codes_path)
    load_product_sellers(product_sellers_path)
    load_trades(trades_path)

def load_company_codes(file_path):
    with open(file_path) as csv_file:
        csv_reader = csv.reader(csv_file, delimiter=',')
        for row in csv_reader:
            if row[0] == 'companyName':
                continue

            if CompanyCode.objects.filter(company_trade_id=row[1]).exists():
                continue
            
            try:
                CompanyCode.objects.create(
                    company_name=row[0],
                    company_trade_id=row[1]
                )
            except IndexError:
                pass

def load_product_sellers(file_path):
    with open(file_path) as csv_file:
        csv_reader = csv.reader(csv_file, delimiter=',')
        for row in csv_reader:
            if row[0] == 'product':
                continue
            
            try:
                ProductSeller.objects.create(
                    product=row[0],
                    company_id=row[1]
                )
            except IndexError:
                pass

def load_trades(folder_path):
    """
    This method needs to be passed the path to the folder 'derivativeTrades' in
    the dummy data folder.
    """
    for subdir, dirs, files in os.walk(folder_path):
        for file in files:
            with open(os.path.join(subdir, file)) as csv_file:
                csv_reader = csv.reader(csv_file, delimiter=',')
                for row in csv_reader:
                    if row[0] == 'dateOfTrade':
                        continue

                    if DerivativeTrade.objects.filter(trade_id=row[1]).exists():
                        continue
                    
                    try:
                        DerivativeTrade.objects.create(
                            date_of_trade=datetime.strptime(row[0], "%d/%m/%Y %H:%M").date(),
                            trade_id=row[1],
                            product=row[2],
                            buying_party=row[3],
                            selling_party=row[4],
                            notional_amount=row[5],
                            notional_currency=row[6],
                            quantity=row[7],
                            maturity_date=datetime.strptime(row[8], "%d/%m/%Y").date(),
                            underlying_price=row[9],
                            underlying_currency=row[10],
                            strike_price=row[11]
                        )
                    except IndexError:
                        pass