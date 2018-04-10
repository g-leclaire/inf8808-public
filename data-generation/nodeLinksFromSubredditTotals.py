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

index = 0

def getCoin(coins, coinSymbol):
	for coin in coins:
		if coin['symbol'] == coinSymbol:
			return coin
	return None

def createNode(name, index):
	node = {}
	node['name'] = name
	node['index'] = index
	return node

def findCoinIndex(nodes, coinData):
	othersNodeIndex = {}
	for index, node in enumerate(nodes):
		if 'symbol' in node and node['symbol'] == coinData['symbol']:
			return index
		elif node['name'] == 'Autres':
			othersNodeIndex = index
	return othersNodeIndex

def findSubredditIndex(nodes, subreddit):
	for index, node in enumerate(nodes):
		if node['name'] == subreddit['name']:
			return index
	return None

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

def createLink(sourceIndex, targetIndex, value, sentiment):
	link = {}
	link['source'] = sourceIndex
	link['target'] = targetIndex
	link['value'] = coinData[sentiment + 'Count']
	link['sentiment'] = sentiment
	return link

nodes = []

# Open totals
subredditsTotals = json.load(open('transformed-data/subredditsTotals.json'))
# Sort
subredditsTotals.sort(key=lambda s: s['subscribers'], reverse=True)
# Keep top 10
subredditsTotals = subredditsTotals[:10]
# Create nodes
for subreddit in subredditsTotals:
	nodes.append(createNode(subreddit['name'], index))
	index += 1

# Open coins
coins = json.load(open('coinmarketcap_100.json'))
for coin in coins:
	coin['commentCount'] = 0
# Count comments
for subreddit in subredditsTotals:
	for coinData in subreddit['mentionedCoins']:
		coin = getCoin(coins, coinData['symbol'])
		coin['commentCount'] += (coinData['negativeCount'] + coinData['neutralCount'] + coinData['positiveCount'])
# Sort
coins.sort(key=lambda c: c['commentCount'], reverse=True)
# Keep top 10
coins = coins[:10]
# Create nodes
for coin in coins:
	newNode = createNode(coin['name'], index)
	newNode['symbol'] = coin['symbol']
	nodes.append(newNode)
	index += 1
# Add others
nodes.append(createNode('Autres', index))
index += 1

links = []
possibleSentiments = ['negative', 'neutral', 'positive']
totalParsedLinks = 0
parsingStartTime = time.time()

# Create links
for subreddit in subredditsTotals:
	sourceIndex = findSubredditIndex(nodes, subreddit)
	fakeCoinData = {}
	fakeCoinData['symbol'] = ''
	othersIndex = findCoinIndex(nodes, fakeCoinData)
	othersNegative = createLink(sourceIndex, othersIndex, 0, 'negative')
	othersNeutral = createLink(sourceIndex, othersIndex, 0, 'neutral')
	othersPositive = createLink(sourceIndex, othersIndex, 0, 'positive')
	
	for coinData in subreddit['mentionedCoins']:	
		targetIndex = findCoinIndex(nodes, coinData)
		if targetIndex == othersIndex:
			othersNegative['value'] += coinData['negativeCount']
			othersNeutral['value'] += coinData['neutralCount']
			othersPositive['value'] += coinData['positiveCount']
		else:
			for sentiment in possibleSentiments:
				link = createLink(sourceIndex, targetIndex, coinData[sentiment + 'Count'], sentiment)
				links.append(link)
	links.append(othersNegative)
	links.append(othersNeutral)
	links.append(othersPositive)	

finalDict = {}
finalDict['nodes'] = nodes
finalDict['links'] = links

with open('transformed-data/subredditsNodeLink.json', 'w') as outfile:
	json.dump(finalDict, outfile)