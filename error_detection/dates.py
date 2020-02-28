import datetime


def date_to_list(date: datetime):
    return [int(x) for x in "%04d" % date.year] \
         + [int(x) for x in "%02d" % date.month] \
         + [int(x) for x in "%02d" % date.day]


def list_to_date(ls):
    s = "".join([str(x) for x in ls])
    try:
        return datetime.datetime(int(s[:4]), int(s[4:6]), int(s[6:8]))
    except:
        return None


def check_date(date, early, late):
    if early < date < late:
        return date

    ls = date_to_list(date)
    # Try changing each digit in turn.
    for i in range(len(ls)):
        for j in range(1, 10):
            # Change the one digit.
            p = [(x + j) % 10 if k == i else x for k, x in enumerate(ls)]
            pd = list_to_date(p)
            if pd is not None and early < pd < late:
                return pd
    return None


trade_date = datetime.datetime(2020, 12, 25)
maturity_date = datetime.datetime(2027, 3, 17)

today = datetime.datetime.today()
week_ago = today - datetime.timedelta(weeks=1)
century_ahead = today + datetime.timedelta(weeks=5200)

corrected_date = check_date(trade_date, week_ago, today)
if corrected_date is not None:
    corrected_maturity = check_date(maturity_date, corrected_date, century_ahead)

    print(corrected_date)
    print(corrected_maturity)
else:
    print("Could not correct date")