import praw
import pdb
import re
import os
import json
import csv
import sqlite3
from nltk.sentiment.vader import SentimentIntensityAnalyzer as SIA

subreddits = json.load(open('subreddits.json'))
allComments = []

for subreddit in subreddits:
	allComments.extend(json.load(open('data/' + subreddit['name'] + '.json')))
	print('Loaded', subreddit['name'])

with open('data/allComments.json', 'w') as outfile:
	json.dump(allComments, outfile)

print('Done')