import datetime
from django.test import TestCase

from trades.models import DerivativeTrade
from error_detection.error_detection import *
from error_detection.tests.test_data import populate_db, today, threshold, sample_fields
from error_detection.db_import import (
    company_codes, product_sellers
)


class ErrorDetectionTest(TestCase):
    def setUp(self):
        populate_db()

        self.products = {seller.product for seller in product_sellers}
        self.companies = {company.company_trade_id for company in company_codes}
        with open("currencies.txt", 'r') as file:
            self.currencies = {c[:-1] for c in file.readlines()}

    def do_name_test(self, field, value=None, expected=None, incorrect=True):
        """
        Assumes there will be exactly one error, on the specified field,
        unless either the field is None or incorrect is set to false.
        """
        # Start with a default trade and override the test value.
        fields = dict(sample_fields)
        if field is not None:
            fields[field] = value

        trade = DerivativeTrade(**fields)
        errors = detect_errors(trade, today, threshold)

        if field is None or not incorrect:
            self.assertEqual(errors, [], "No errors")
        else:
            self.assertEqual(len(errors), 1, "Exactly one error")
            self.assertEqual(errors[0].field, field, "Correct error field")

            correction = errors[0].correction
            self.assert_(correction == expected, "Corrected value valid")

    def test_product(self):
        self.do_name_test('product', "Socks", "Rocks")

    def test_buying_party(self):
        self.do_name_test('buying_party', "CMZ62", "CMZC67")

    def test_selling_party(self):
        self.do_name_test('selling_party', "hwjf 09", "HWJF09")

    def test_notional_currency(self):
        self.do_name_test('notional_currency', "Us", "USD")

    def test_underlying_currency(self):
        self.do_name_test('underlying_currency', "GBup", "GBP")

    def test_case_insensitive(self):
        self.do_name_test('product', "rocks", incorrect=False)

    def test_empty_currency(self):
        self.do_name_test('underlying_currency', "")

    def test_correct_names(self):
        self.do_name_test(None)
