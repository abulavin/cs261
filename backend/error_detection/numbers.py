from .common import Error
from .db_import import (
    derivative_trades
)


def correct_to_range(value, min_v, max_v, threshold):
    min_t = min_v * threshold
    max_t = max_v / threshold

    if min_t <= value <= max_t:
        return True, None

    correction = value * 10
    if min_t <= correction <= max_t:
        return False, correction

    correction = value / 10
    if min_t <= correction <= max_t:
        return False, correction
    else:
        return False, None


def correct_to_past(value, key, threshold):
    past_values = (key(t) for t in derivative_trades)
    return correct_to_range(value, min(past_values), max(past_values), threshold)


def detect_number_errors(trade, threshold, errors):
    if len(derivative_trades) > 0:
        notional_ok, correction = correct_to_past(trade.notional_amount, lambda t: t.notional_amount, threshold)
        if not notional_ok:
            errors.append(Error('notional_amount', correction, "Suspicious notional amount"))

        underlying_ok, correction = correct_to_past(trade.underlying_price, lambda t: t.underlying_price, threshold)
        if not underlying_ok:
            errors.append(Error('underlying_price', correction, "Suspicious underlying price"))
    else:
        notional_ok, underlying_ok = True

    if underlying_ok:
        ok, correction = correct_to_range(trade.strike_price, trade.underlying_price, trade.underlying_price, threshold)
        if not ok:
            errors.append(Error('strike_price', correction, "Suspicious strike price"))

        if notional_ok:
            expected_quantity = trade.notional_amount / trade.underlying_price
            if trade.quantity != expected_quantity:
                if expected_quantity.is_integer():
                    errors.append(Error('quantity', expected_quantity, "Quantity does not match price"))
                else:
                    errors.append(Error('notional_amount', trade.underlying_price * trade.quantity,
                                        "Notional amount does not match quantity"))
