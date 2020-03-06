import datetime
from django.test import TestCase

from trades.models import DerivativeTrade
from error_detection.error_detection import *
from error_detection.tests.test_data import populate_db, today, threshold, sample_fields
from error_detection.db_import import (
    derivative_trades
)


class ErrorDetectionTest(TestCase):
    def setUp(self):
        populate_db()

    def do_number_test(self, field, value=None, expected=None, incorrect=True):
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

    def test_low_underlying(self):
        self.do_number_test('underlying_price', 6.03, 60.3)

    def test_high_underlying(self):
        self.do_number_test('underlying_price', 700.30, 70.03)

    def test_low_quantity(self):
        self.do_number_test('quantity', 13, None)

    def test_high_quantity(self):
        self.do_number_test('quantity', 707, 71)

    def test_low_strike(self):
        self.do_number_test('strike_price', 45, None)

    def test_high_strike(self):
        self.do_number_test('strike_price', 925.1, 92.51)

    def test_bad_notional(self):
        self.do_number_test('notional_amount', 3300, 3302.76)

    def test_correct_numbers(self):
        self.do_number_test('strike_price', 70.77, incorrect=False)
