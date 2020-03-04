import difflib
from error_detection.common import Error, currencies
from .db_import import (
    company_codes, product_sellers, derivative_trades
)


def detect_similar(query, corpus):
    if query.lower() in corpus:
        return True, None

    matches = difflib.get_close_matches(query.lower(), corpus, n=1)
    if matches:
        return False, corpus[matches[0]]
    else:
        return False, None


def detect_name_errors(trade, errors):
    products = {seller.product.lower(): seller.product for seller in product_sellers}
    ok, correction = detect_similar(trade.product, products)
    if not ok:
        errors.append(Error('product', correction, "Unknown product"))

    companies = {company.company_name.lower(): company.company_name for company in company_codes}
    ok, correction = detect_similar(trade.buying_party, companies)
    if not ok:
        errors.append(Error('buying_party', correction, "Unknown buying party"))

    ok, correction = detect_similar(trade.selling_party, companies)
    if not ok:
        errors.append(Error('selling_party', correction, "Unknown selling party"))

    ok, correction = detect_similar(trade.notional_currency, currencies)
    if not ok:
        errors.append(Error('notional_currency', correction, "Unknown notional currency"))

    ok, correction = detect_similar(trade.underlying_currency, currencies)
    if not ok:
        errors.append(Error('underlying_currency', correction, "Unknown underlying currency"))
