from error_detection.dates import detect_date_errors
from .db_import import (
    company_codes, product_sellers, derivative_trades
)


def detect_errors(trade, today):
    """
    Return a list of all detectable errors in the trade entry, with corrections where possible.
    """
    errors = []
    detect_date_errors(trade, today, errors)
    return errors
