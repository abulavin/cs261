import csv, difflib


with open("../cs261dummydata/derivativeTrades/2014/April/16042014.csv", "r") as file:
    reader = csv.reader(file)
    next(reader, None)
    corpus = set(x[2].lower() for x in reader)

query = "socks"
matches = difflib.get_close_matches(query, corpus, n=1)
if matches:
    print(matches[0])
else:
    print("No matches")