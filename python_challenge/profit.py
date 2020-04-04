import os
import csv

path = os.path.join("PyBank","Resources","budget_data.csv")

nMonths = 0
netTotal = 0
avgDelta = 0
profInc = ("",0)
profDec = ("",0)


with open(path) as f:
	read = csv.reader(f,delimiter=",")
	next(read)
	for mon,chg in read:
		chg = int(chg)
	
		nMonths += 1
		netTotal += chg
		
		if profInc[1] < chg:
			profInc = (mon,chg)
			
		if profDec[1] > chg:
			profDec = (mon,chg)
		
		
        #print(nMonths,netTotal,profInc,profDec)

	avgDelta = netTotal / nMonths
	
	results = f"Financial Analysis\n---------------------\nTotal Months: {nMonths}\nTotal: ${netTotal}\nAverage Change: ${(round(avgDelta,2))}\nGreatest Increase in Profits: {profInc[0]} (${profInc[1]})\nGreatest Decrease in Profits: {profDec[0]} (${profDec[1]})"
	
	print(results)

with open("results_profit.txt", "w") as w:
	w.write(results)
