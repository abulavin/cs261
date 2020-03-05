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

def has_errors(errors):
    """
    Check if any of the errors in the list are needing to be raised to the 
    frontend.
    """
    for error in errors:
        if error[1] is not None:
            return True

    return False

def error_list_to_dict(errors_list):
    """
    Convert the list of errors to a dict.
    """
    errors_dict = {}
    for error in errors_list:
        errors_dict[error[0]] = [error[1], error[2]]

    return errors_dict