from error_detection.dates import detect_date_errors
from error_detection.names import detect_name_errors
from error_detection.numbers import detect_number_errors


def detect_errors(trade, today, threshold):
    """
    Return a list of all detectable errors in the trade entry, with corrections where possible.
    """
    with open("currencies.txt", 'r') as file:
        currencies = {c[:-1].lower(): c[:-1] for c in file.readlines()}

    errors = []
    detect_date_errors(trade, today, errors)
    detect_name_errors(trade, errors, currencies)
    detect_number_errors(trade, threshold, errors)
    return errors
