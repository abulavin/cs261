"""
This file contains methods to populate the database with the trades from the 
dummy data folder given.
"""
import os
import csv

from datetime import datetime

from .models import DerivativeTrade


def load_data(folder_path):
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
                            notational_amount=row[5],
                            notational_currency=row[6],
                            quantity=row[7],
                            maturity_date=datetime.strptime(row[8], "%d/%m/%Y").date(),
                            underlying_price=row[9],
                            underlying_currency=row[10],
                            strike_price=row[11]
                        )
                    except IndexError:
                        pass