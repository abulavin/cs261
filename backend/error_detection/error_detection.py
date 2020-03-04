from error_detection.dates import detect_date_errors
from error_detection.names import detect_name_errors
from error_detection.common import currencies


def detect_errors(trade, today):
    """
    Return a list of all detectable errors in the trade entry, with corrections where possible.
    """
    # TODO: Move to some one-off initialization area
    global currencies
    with open("currencies.txt", 'r') as file:
        currencies = {c.lower(): c for c in file.readlines()}

    errors = []
    detect_date_errors(trade, today, errors)
    detect_name_errors(trade, errors)
    return errors
