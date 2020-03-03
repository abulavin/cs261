import datetime
from django.test import TestCase

from trades.models import DerivativeTrade
from error_detection.error_detection import *


class ErrorDetectionTest(TestCase):
    def setUp(self):
        self.today = datetime.datetime(2020, 3, 3)

    def do_trade_date_test(self, field, date_of_trade, maturity_date):
        trade = DerivativeTrade.objects.create(
            date_of_trade = date_of_trade,
            product = "ASDF",
            buying_party = "ASDF",
            selling_party = "ASDF",
            notional_amount = 1000,
            quantity = 1000,
            notional_currency = "USD",
            maturity_date = maturity_date,
            underlying_price = 123,
            underlying_currency = "USD",
            strike_price = 50
        )

        errors = detect_errors(trade, self.today)
        self.assertEqual(len(errors), 1, "Exactly one error")
        self.assertEqual(errors[0].field, field, "Correct error field")

        correction = errors[0].correction
        week_ago = self.today - datetime.timedelta(weeks=1)
        century_ahead = self.today + datetime.timedelta(weeks=5200)

        if field == 'date_of_trade':
            self.assert_(correction is None or week_ago <= correction <= self.today, "Corrected date valid")
        elif field == 'maturity_date':
            self.assert_(correction is None or trade.date_of_trade <= correction <= century_ahead, "Corrected date valid")
        else:
            self.fail("Unknown field")

    def test_old_trade(self):
        self.do_trade_date_test('date_of_trade', datetime.datetime(2020, 2, 20), datetime.datetime(2000, 9, 3))

    def test_future_trade(self):
        self.do_trade_date_test('date_of_trade', datetime.datetime(2020, 7, 20), datetime.datetime(2000, 9, 3))

    def test_old_maturity(self):
        self.do_trade_date_test('maturity_date', datetime.datetime(2020, 2, 28), datetime.datetime(2020, 2, 27))

    def test_future_maturity(self):
        self.do_trade_date_test('maturity_date', datetime.datetime(2020, 3, 1), datetime.datetime(2120, 3, 3))
