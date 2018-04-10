import praw
import pdb
import re
import os
import json
import csv
import sqlite3
from nltk.sentiment.vader import SentimentIntensityAnalyzer as SIA

separator = '[^a-zA-Z]'

##### Functions #####
def generateCoinRegex(coin):
	possibleNames = [coin['symbol'], coin['name']]
	mustNotPrecede = []

	# Special cases
	if coin['symbol'] == 'BTC':
		mustNotPrecede = ['cash', 'gold']
	elif coin['symbol'] == 'ETH':
		mustNotPrecede = ['classic']
	elif coin['symbol'] == 'BCH':
		possibleNames.extend(['btc cash', 'b cash'])
	elif coin['symbol'] == 'ETC':
		possibleNames.extend(['eth classic'])
	elif coin['symbol'] == 'XRB':
		possibleNames.extend(['rai blocks?', 'nano'])
	elif coin['symbol'] == 'BAT':
		possibleNames.extend(['basic attention'])
	elif coin['symbol'] == 'KCS':
		possibleNames.extend(['kucoin'])
	elif coin['symbol'] == 'RDD':
		possibleNames.extend(['redd'])
	elif coin['symbol'] == 'REQ':
		possibleNames.extend(['request'])
	elif coin['symbol'] == 'VTC':
		possibleNames.extend(['vert'])
	elif coin['symbol'] == 'FUN':
		possibleNames = ['fun fair']
	elif coin['symbol'] == 'GBYTE':
		possibleNames.extend(['byteball'])
	elif coin['symbol'] == 'PART':
		possibleNames = [coin['name']]
	elif coin['symbol'] == 'R':
		possibleNames = [coin['name']]
	elif coin['symbol'] == 'DENT':
		possibleNames = ['dent coin', 'dent token']
	elif coin['symbol'] == 'GXS':
		possibleNames.extend(['gx'])
	elif coin['symbol'] == 'SALT':
		possibleNames = ['salt coin', 'salt token']
	elif coin['symbol'] == 'BLOCK':
		possibleNames = [coin['name']]
	elif coin['symbol'] == 'LINK':
		possibleNames = [coin['name']]
	elif coin['symbol'] == 'PAY':
		possibleNames = [coin['name']]
	elif coin['symbol'] == 'SMART':
		possibleNames = [coin['name']]
	elif coin['symbol'] == 'MAID':
		possibleNames.extend(['maid safe'])
	elif coin['symbol'] == 'PLR':
		possibleNames = [coin['symbol']]

	for i, name in enumerate(possibleNames):
		words = name.split()
		if len(words) > 1:
			possibleNames[i] = '.?'.join(words)

	regex = separator + '(' + '|'.join(possibleNames) + ')'
	if len(mustNotPrecede) > 0:
		regex += '(?!' + separator + '?(' + '|'.join(mustNotPrecede) +'))'
	regex += separator

	return regex


sia = SIA()

allCoins = json.load(open('coinmarketcap_100.json'))

text = "sdfsdf bitcoin fd gold sdasd dfsfdf"

# Search for coin symbols and names
#bcash/ btc cash/ b cash
mentionedCoins = []
for coin in allCoins:
	print(generateCoinRegex(coin))
	#if re.search(generateCoinRegex(coin), text, re.IGNORECASE):
		#mentionedCoins.append(coin['symbol'])

#print(mentionedCoins)

