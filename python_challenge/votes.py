import os
import csv

path = os.path.join("PyPoll","Resources","election_data.csv")

tVotes = 0
summary = ""
wvotes = 0
winner = ""

vote_dict = dict()

with open(path) as f:
	read = csv.reader(f, delimiter = ",")
	next(read)
	for id,c,cand in read:
		tVotes += 1
		if cand in vote_dict:
			vote_dict[cand] += 1
		else:
			vote_dict[cand] = 1

for x in vote_dict:
	summary += f"{x}: {round(vote_dict[x]*100/tVotes,2)}% ({vote_dict[x]})\n"
	if vote_dict[x] > wvotes:
		wvotes = vote_dict[x]
		winner = x

results = f"Election Results\n-------------------------\nTotal Votes: {tVotes}\n-------------------------\n{summary}-------------------------\nWinner: {winner}\n-------------------------"

print(results)

with open("results_votes.txt", "w") as w:
	w.write(results)