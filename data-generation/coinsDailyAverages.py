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

def createDailyAveragesList():
	start = date(2017, 12, 1)
	end = date(2018, 2, 28)
	delta = end - start

	dailyAverages = []
	for i in range(delta.days + 1):
		dailyAverage = {}
		dailyAverage['date'] = str(start + timedelta(days=i))
		dailyAverage['sentimentAverage'] = 0
		dailyAverage['scoreAverage'] = 0
		dailyAverage['lengthAverage'] = 0
		dailyAverage['commentCount'] = 0
		dailyAverage['negativeCommentCount'] = 0
		dailyAverage['neutralCommentCount'] = 0
		dailyAverage['positiveCommentCount'] = 0
		dailyAverages.append(dailyAverage)

	return dailyAverages

def getDailyAverages(coinData, epochDatetime):
	convertedDate = time.strftime('%Y-%m-%d', time.localtime(epochDatetime))

	for dailyAverage in coinData['dailyAverages']:
		if dailyAverage['date'] == convertedDate:
			return dailyAverage
	return None

def getCoinData(coinsData, coinSymbol):
	for coinData in coinsData:
		if coinData['symbol'] == coinSymbol:
			return coinData
	newCoinData = {}
	newCoinData['symbol'] = coinSymbol
	newCoinData['dailyAverages'] = createDailyAveragesList()
	coinsData.append(newCoinData)
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

coinsData = []
totalParsedComments = 0
parsingStartTime = time.time()

# Convert data
for subreddit in subreddits:
	print('Loading', subreddit['name'])
	with open('data/' + subreddit['name'] + '.json', 'rb') as data:
		for comment in ijson.items(data, 'item'):
			for mentionedCoin in comment['coins']:
				coinData = getCoinData(coinsData, mentionedCoin)
				dailyAverages = getDailyAverages(coinData, comment['created'])
				if dailyAverages is not None:
					dailyAverages['sentimentAverage'] += comment['sentiment']['compound']
					dailyAverages['scoreAverage'] += comment['score']
					dailyAverages['lengthAverage'] += comment['textlen']
					dailyAverages['commentCount'] += 1
					if comment['sentiment']['compound'] <= -0.5:
						dailyAverages['negativeCommentCount'] += 1
					elif (comment['sentiment']['compound'] > -0.5 and comment['sentiment']['compound'] < 0.5):
						dailyAverages['neutralCommentCount'] += 1
					elif comment['sentiment']['compound'] >= 0.5:
						dailyAverages['positiveCommentCount'] += 1
					
			totalParsedComments += 1
			if (totalParsedComments % 10000 == 0):
				printProgress(subreddit, parsingStartTime, totalParsedComments, totalComments)

# Calculate averages
for coinData in coinsData:
	for dailyAverages in coinData['dailyAverages']:
		if dailyAverages['commentCount'] > 0:
			dailyAverages['sentimentAverage'] = float(dailyAverages['sentimentAverage'] / dailyAverages['commentCount'])
			dailyAverages['scoreAverage'] /= dailyAverages['commentCount']
			dailyAverages['lengthAverage'] /= dailyAverages['commentCount']

with open('transformed-data/coinsDailyAverages.json', 'w') as outfile:
	json.dump(coinsData, outfile)