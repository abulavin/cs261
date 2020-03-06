from .common import Error
from .db_import import (
    derivative_trades
)


def correct_to_range(value, min_v, max_v, threshold, need_int=False):
    """
    Check if the value is in the range min_v * threshold to max_v / threshold.
    If not, the value is corrected by seeing if value*10 or value/10 are in the required range.
    Corrections are rounded to 2 d.p., or 0 d.p. if need_int=True.
    threhold should be > 0 and <= 1.

    :returns whether or not the original value was in the range,
    and the correction, if any.
    """
    min_t = min_v * threshold
    max_t = max_v / threshold

    if min_t <= value <= max_t:
        return True, None

    correction = round(value * 10, 0 if need_int else 2)
    if min_t <= correction <= max_t:
        return False, correction

    correction = round(value / 10, 0 if need_int else 2)
    if min_t <= correction <= max_t:
        return False, correction
    else:
        return False, None


def correct_to_past(value, trades, key, threshold, need_int=False):
    """
    Correct a value such that it lies in the range of values from previous trades,
    with a threshold applied.

    :param key: maps trades to the desired field of the trade.
    """
    past_values = [key(t) for t in trades]
    return correct_to_range(value, min(past_values), max(past_values), threshold, need_int)


def detect_number_errors(trade, threshold, errors):
    """
    Detect erroneous quantities and underlying prices by ensuring that they lie within the range
    of values from previous trades, with a multiplicative threshold applied.
    Correction of erroneous values is attempted by multiplying and dividing the value by 10 to see
    if it ends up in the range.

    Strike prices are corrected in a similar manner, and must be within the threshold of the underlying price.

    The notional amount must equal quantity * underlying price, with no threshold.
    The notional amount is corrected by simply returning quantity * underlying price.

    :param threshold: a multiplicative testing threshold between 0 and 1.
    """

    # Only compare with trades for the same product.
    product_trades = derivative_trades.filter(product=trade.product)
    # Only attempt checks that depend on past values if said values are available,
    # otherwise assume both values are correct.
    if len(product_trades) > 0:
        quantity_ok, correction = correct_to_past(trade.quantity, product_trades, lambda t: t.quantity, threshold, need_int=True)
        if not quantity_ok:
            errors.append(Error('quantity', correction, "Suspicious quantity"))

        underlying_ok, correction = correct_to_past(trade.underlying_price, product_trades, lambda t: t.underlying_price, threshold)
        if not underlying_ok:
            errors.append(Error('underlying_price', correction, "Suspicious underlying price"))
    else:
        quantity_ok, underlying_ok = True

    # If the underlying price is correct we can use it to check the strike price and notional amount.
    if underlying_ok:
        ok, correction = correct_to_range(trade.strike_price, trade.underlying_price, trade.underlying_price, threshold)
        if not ok:
            errors.append(Error('strike_price', correction, "Suspicious strike price"))

        # If the underlying price and quantity are correct we can use them to check the notional amount.
        if quantity_ok:
            expected_notional = trade.quantity * trade.underlying_price
            if trade.notional_amount != expected_notional:
                errors.append(Error('notional_amount', expected_notional,
                                    "Notional amount does not match quantity and underlying price"))
