import datetime


def check_trade_editable(trade):
    """
    Check that a trade is not older than 7 days old. Returns False if the trade 
    is too old to be edited.
    """
    return (
        trade.date_of_trade.date() + datetime.timedelta(days=7) 
        >= datetime.datetime.today().date()
    )