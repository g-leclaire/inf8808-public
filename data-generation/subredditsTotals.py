import praw
import pdb
import re
import os
import json
#import ijson
import ijson.backends.yajl2_cffi as ijson
import csv
import sqlite3
from datetime import date, timedelta
import time
from nltk.sentiment.vader import SentimentIntensityAnalyzer as SIA

def getCoinData(subreddit, coinSymbol):
	for coinData in subreddit['mentionedCoins']:
		if coinData['symbol'] == coinSymbol:
			return coinData
	newCoinData = {}
	newCoinData['symbol'] = coinSymbol
	newCoinData['negativeCount'] = 0
	newCoinData['neutralCount'] = 0
	newCoinData['positiveCount'] = 0
	subreddit['mentionedCoins'].append(newCoinData)
	return newCoinData

def printProgress(subreddit, parsingStartTime, totalParsedComments, totalComments):
	progressPercent = totalParsedComments / totalComments * 100
	elapsedTime = time.time() - parsingStartTime
	elapsedTimeMins = elapsedTime / 60
	totalEstimatedTime = elapsedTime * totalComments / totalParsedComments
	totalEstimatedTimeMins = totalEstimatedTime / 60
	print('Parsing', subreddit['name'] + ',', totalParsedComments, 'comments parsed',
		'(' + str(round(progressPercent, 1)) + '%),',
		'Elapsed time:', int(round(elapsedTimeMins)), 'mins,',
		'Estimated:', int(round(totalEstimatedTimeMins)), 'mins')

totalComments = 5730430
subreddits = json.load(open('subreddits.json'))

totalParsedComments = 0
parsingStartTime = time.time()

for subreddit in subreddits:
	subreddit['mentionedCoins'] = []

# Convert data
for subreddit in subreddits:
	print('Loading', subreddit['name'])
	with open('data/' + subreddit['name'] + '.json', 'rb') as data:
		for comment in ijson.items(data, 'item'):
			for coin in comment['coins']:
				coinData = getCoinData(subreddit, coin)
				if comment['sentiment']['compound'] <= -0.5:
					coinData['negativeCount'] += 1
				elif (comment['sentiment']['compound'] > -0.5 and comment['sentiment']['compound'] < 0.5):
					coinData['neutralCount'] += 1
				elif comment['sentiment']['compound'] >= 0.5:
					coinData['positiveCount'] += 1
			
			totalParsedComments += 1
			if (totalParsedComments % 10000 == 0):
				printProgress(subreddit, parsingStartTime, totalParsedComments, totalComments)

with open('transformed-data/subredditsTotals.json', 'w') as outfile:
	json.dump(subreddits, outfile)