from .common import Error
from .db_import import (
    derivative_trades
)


def correct_to_range(value, min_v, max_v, threshold, need_int=False):
    min_t = min_v * threshold
    max_t = max_v / threshold
    print(value, min_t, max_t)

    if min_t <= value <= max_t:
        return True, None

    correction = round(value * 10, 2)
    if min_t <= correction <= max_t:
        return False, correction

    correction = round(value / 10, 2)
    if min_t <= correction <= max_t:
        if need_int and not correction.is_integer():
            return False, None
        return False, correction
    else:
        return False, None


def correct_to_past(value, trades, key, threshold, need_int=False):
    past_values = [key(t) for t in trades]
    return correct_to_range(value, min(past_values), max(past_values), threshold, need_int)


def detect_number_errors(trade, threshold, errors):
    product_trades = derivative_trades.filter(product=trade.product)
    if len(product_trades) > 0:
        quantity_ok, correction = correct_to_past(trade.quantity, product_trades, lambda t: t.quantity, threshold, need_int=True)
        if not quantity_ok:
            errors.append(Error('quantity', correction, "Suspicious quantity"))

        underlying_ok, correction = correct_to_past(trade.underlying_price, product_trades, lambda t: t.underlying_price, threshold)
        if not underlying_ok:
            errors.append(Error('underlying_price', correction, "Suspicious underlying price"))
    else:
        quantity_ok, underlying_ok = True

    if underlying_ok:
        ok, correction = correct_to_range(trade.strike_price, trade.underlying_price, trade.underlying_price, threshold)
        if not ok:
            errors.append(Error('strike_price', correction, "Suspicious strike price"))

        if quantity_ok:
            expected_notional = trade.quantity * trade.underlying_price
            if trade.notional_amount != expected_notional:
                errors.append(Error('notional_amount', trade.underlying_price * trade.quantity,
                                    "Notional amount does not match quantity"))
