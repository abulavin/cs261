import datetime, pytz
from weasyprint import HTML, CSS


def format_row(*vals, header=False):
    row = "<tr>"
    for v in vals:
        row += "<th>" if header else "<td>"
        row += str(v)
        row += "</th>" if header else "</td>"
    row += "</tr>"
    return row


headings = ("Name", "Date", "Price", "Quantity")
data = [("John Dean", "20/08/2002", "£2.78", "7,000")] * 100

rows = format_row(*headings, header=True)
rows += "".join(format_row(*r) for r in data)

time = datetime.datetime.now(pytz.timezone("Europe/London"))
t_str = "%02d-%02d-%04d %02d:%02d:%02d" % (time.day, time.month, time.year, time.hour, time.minute, time.second)

with open("template.html", "r") as file:
    template = file.read()
html = template % (t_str, rows)

css = CSS("report.css")
HTML(string=html).write_pdf("report.pdf", stylesheets=[css])