import datetime
from collections import namedtuple
from .db_import import (
    company_codes, product_sellers, derivative_trades
)


# correction may be None if no correction could be found.
Error = namedtuple("Error", "field, correction, message")


def date_to_list(date: datetime):
    """
    Convert date to list of digits for individual manipulation.
    """
    return [int(x) for x in "%04d" % date.year] \
         + [int(x) for x in "%02d" % date.month] \
         + [int(x) for x in "%02d" % date.day]


def list_to_date(ls):
    """
    Convert a list returned by date_to_list() back to a date.
    """
    s = "".join([str(x) for x in ls])
    try:
        return datetime.datetime(int(s[:4]), int(s[4:6]), int(s[6:8]))
    except:
        # If the date is invalid e.g. day out of range
        return None


def correct_date(date, early, late):
    """
    Try to find a date that differs from the given date by exactly one digit
    that lies between early and late.
    """
    ls = date_to_list(date)
    # Try changing each digit in turn.
    for i in range(len(ls)):
        for j in range(1, 10):
            # Change the one digit.
            p = [(x + j) % 10 if k == i else x for k, x in enumerate(ls)]
            pd = list_to_date(p)
            if pd is not None and early <= pd <= late:
                return pd
    return None


def detect_date_errors(trade, today, errors):
    """
    Check that the date of trade is within the past week,
    and the maturity date is >= the trade date and less than
    a century into the future.
    """
    trade_date = trade.date_of_trade
    maturity_date = trade.maturity_date

    week_ago = today - datetime.timedelta(weeks=1)
    century_ahead = today + datetime.timedelta(weeks=5200)

    if not week_ago <= trade_date <= today:
        if trade_date < week_ago:
            message = "Suspiciously old trade date"
        elif trade_date > today:
            message = "Trade date in future"
        else:
            raise RuntimeError("Impossible date range")

        corrected_trade_date = correct_date(trade_date, week_ago, today)
        errors.append(Error('date_of_trade', corrected_trade_date, message))
    # Only try to correct maturity date if the date of trade was OK, as we depend
    # on the other date for this check.
    elif not trade_date <= maturity_date <= century_ahead:
        if maturity_date < trade_date:
            message = "Maturity date older than trade date"
        elif maturity_date > century_ahead:
            message = "Maturity date suspiciously far in future"
        else:
            raise RuntimeError("Impossible date range")

        corrected_maturity = correct_date(maturity_date, trade_date, century_ahead)
        errors.append(Error('maturity_date', corrected_maturity, message))


def detect_errors(trade, today):
    """
    Return a list of all detectable errors in the trade entry, with corrections where possible.
    """
    errors = []
    detect_date_errors(trade, today, errors)
    return errors
