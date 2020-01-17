import os, csv
import matplotlib.pyplot as plt


DATA_PATH = "cs261dummydata/derivativeTrades"

xs, ys = [], []
for year in os.listdir(DATA_PATH):
    print(year)
    path1 = DATA_PATH+"/"+year
    for month in os.listdir(path1):
        print(month)
        path2 = path1+"/"+month
        for file_name in os.listdir(path2):
            with open(path2+"/"+file_name, "r") as file:
                reader = csv.reader(file)
                next(reader, None)  # Skip headers
                for line in reader:
                    # Compare within same currency to keep scaling consistent
                    if line[2] == "Stocks" and line[6] == "USD" and line[10] == "USD":
                        xs.append(float(line[9]))
                        ys.append(float(line[11]))

print("Plotting...")
plt.scatter(x=xs, y=ys)
print("Showing...")
plt.show()