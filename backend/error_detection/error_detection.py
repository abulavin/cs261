from error_detection.dates import detect_date_errors
from error_detection.names import detect_name_errors


def detect_errors(trade, today):
    """
    Return a list of all detectable errors in the trade entry, with corrections where possible.
    """
    # TODO: Move to some one-off initialization area
    with open("currencies.txt", 'r') as file:
        currencies = {c[:-1].lower(): c for c in file.readlines()}

    errors = []
    detect_date_errors(trade, today, errors)
    detect_name_errors(trade, errors, currencies)
    return errors
