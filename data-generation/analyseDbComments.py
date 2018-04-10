import re
import time
import json
import sqlite3
from nltk.sentiment.vader import SentimentIntensityAnalyzer as SIA

separator = '[^a-zA-Z]'
bots = ['CryptoModBot', 'DuplicatesBot', 'imguralbumbot', 'ALTcointip', 'changetip',
	'iotaTipBot', 'tanglepayTipBot', 'neotip', 'sodogetip', 'tippr', 'TipJarBot',
	'RaiBlocks_tipbot', 'CashTipper']

# Db json factory
def dict_factory(cursor, row):
    d = {}
    for idx, col in enumerate(cursor.description):
        d[col[0]] = row[idx]
    return d

############### Functions ###############

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

def loadCoins():
	# Load coin list from json
	coins = json.load(open('coinmarketcap_100.json'))

	# Generate regexes
	for coin in coins:
		coin['regex'] = generateCoinRegex(coin)
	
	return coins

def loadSubredditComments(subreddit):
	# Load db file and execute select
	conn = sqlite3.connect('db/' + subreddit['name'] + '/' + subreddit['name'] + '.db')
	conn.row_factory = dict_factory
	cur = conn.cursor()
	cur.execute("SELECT * FROM comments")

	# Convert to list
	return cur.fetchall()

def countAllComments(subreddits):
	totalComments = 0
	for subreddit in subreddits:
		comments = loadSubredditComments(subreddit)
		totalComments += len(comments)
	
	return totalComments

def isCommentIgnored(comment):
	isCommentIgnored = (comment['distinguish'] == 'moderator' or
		comment['author'] in bots or
		re.search("((I am)|(I'm)) a bot", comment['body'], re.IGNORECASE))
	
	return isCommentIgnored

def parseComment(comment, subreddit, coins, sia):
	# Analyse polarity
	commentPolarityScores = sia.polarity_scores(comment['body'])

	# Search for coin symbols and names
	mentionedCoins = []
	for coin in coins:			
		if re.search(coin['regex'], comment['body'], re.IGNORECASE):
			mentionedCoins.append(coin['symbol'])
	
	# Add new data fields
	comment['subreddit'] = subreddit['name']
	comment['sentiment'] = commentPolarityScores
	comment['coins'] = mentionedCoins

def writeFile(commentsToSave, subreddit):
	print('Writing file')
	with open('data/' + subreddit['name'] + '.json', 'w') as outfile:
		json.dump(commentsToSave, outfile)

def main():
	# Initialise variables
	totalParsedComments = 0
	totalIgnoredComments = 0

	coins = loadCoins()
	sia = SIA()
	subreddits = json.load(open('subreddits.json'))
	totalComments = countAllComments(subreddits)

	print('Starting to parse', totalComments, 'comments')
	parsingStartTime = time.time()

	for subreddit in subreddits:
		subredditCommentsToSave = []
		subredditParsedComments = 0
		
		# Load comments
		print('Loading', subreddit['name'], 'db')
		comments = loadSubredditComments(subreddit)

		print('Starting to parse', len(comments), 'comments from', subreddit['name'])

		# Parse comments
		for comment in comments:
			if not isCommentIgnored(comment):
				parseComment(comment, subreddit, coins, sia)
				subredditCommentsToSave.append(comment)
			else:
				totalIgnoredComments += 1

			subredditParsedComments += 1
			totalParsedComments += 1

			# Show progress at regular intervals
			if subredditParsedComments % 10000 == 0:
				printProgress(subreddit, parsingStartTime, totalParsedComments, totalComments)
		
		print('Done parsing', subredditParsedComments, 'comments from', subreddit['name'])
		writeFile(subredditCommentsToSave, subreddit)

	print('Done parsing all', totalParsedComments - totalIgnoredComments,
		'comments (' + str(totalIgnoredComments) + ' ignored)')

#########################################

main()



