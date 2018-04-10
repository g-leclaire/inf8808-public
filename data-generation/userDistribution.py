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
import numpy as np
from nltk.sentiment.vader import SentimentIntensityAnalyzer as SIA

def getUser(subreddit, username):
	if username in subreddit['usersDict']:
		return subreddit['usersDict'][username]
	else:
		newUser = {}
		newUser['username'] = username
		newUser['commentsSentiments'] = []
		newUser['sentimentAverage'] = 0
		newUser['scoreAverage'] = 0
		newUser['lengthAverage'] = 0
		newUser['commentCount'] = 0
		newUser['negativeCommentCount'] = 0
		newUser['neutralCommentCount'] = 0
		newUser['positiveCommentCount'] = 0
		subreddit['usersDict'][username] = newUser
		return newUser

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

def userHasEnoughComments(user):
	return user['commentCount'] >= 5

totalComments = 5730430
subreddits = json.load(open('subreddits.json'))

# Keep 10 biggest subreddits
subreddits.sort(key=lambda s: s['subscribers'], reverse=True)
subreddits = subreddits[:20]

totalParsedComments = 0
parsingStartTime = time.time()

# Parsing
for subreddit in subreddits:
	subreddit['usersDict'] = {}
	print('Loading', subreddit['name'])
	with open('data/' + subreddit['name'] + '.json', 'rb') as data:
		for comment in ijson.items(data, 'item'):
			user = getUser(subreddit, comment['author'])
			user['commentsSentiments'].append(comment['sentiment']['compound'])
			user['sentimentAverage'] += comment['sentiment']['compound']
			user['scoreAverage'] += comment['score']
			user['lengthAverage'] += comment['textlen']
			user['commentCount'] += 1
			if comment['sentiment']['compound'] <= -0.5:
				user['negativeCommentCount'] += 1
			elif (comment['sentiment']['compound'] > -0.5 and comment['sentiment']['compound'] < 0.5):
				user['neutralCommentCount'] += 1
			elif comment['sentiment']['compound'] >= 0.5:
				user['positiveCommentCount'] += 1
			
			totalParsedComments += 1
			if (totalParsedComments % 10000 == 0):
				printProgress(subreddit, parsingStartTime, totalParsedComments, totalComments)

print('Removing inactive users and bots')

excludedUsernames = ['[DELETED]', 'garlicbot', 'garlictipsbot', 'RemindMeBot', 'mailmygovNNBot', 'sneakpeekbot', 'WikiTextBot', 'cryptoRemindMeBot']
inactiveUsernames = []
for subreddit in subreddits:
	# Excluded users
	for username in excludedUsernames:
		if username in subreddit['usersDict']:
			subreddit['usersDict'].pop(username, None)
	# Inactive users
	for key, value in subreddit['usersDict'].items():
		if not userHasEnoughComments(value):
			inactiveUsernames.append(key)
	for username in inactiveUsernames:
		subreddit['usersDict'].pop(username, None)

print('Calculating means and standard deviations')

# Calculate averages and standard deviation
for subreddit in subreddits:
	for key, value in subreddit['usersDict'].items():
		value['sentimentStandardDeviation'] = float(np.std(np.array(value['commentsSentiments'])))
		value['sentimentAverage'] = float(value['sentimentAverage'] / value['commentCount'])
		value['scoreAverage'] /= value['commentCount']
		value['lengthAverage'] /= value['commentCount']
		value.pop('commentsSentiments', None)

print('Converting dictionaries and sorting')

allUsers = []

for subreddit in subreddits:
	for key, value in subreddit['usersDict'].items():
		value['subreddit'] = subreddit['name']
		allUsers.append(value)
	subreddit.pop('usersDict', None)

allUsers.sort(key=lambda u: u['commentCount'], reverse=True)
mostActiveUsers = allUsers[:500]

allUsers.sort(key=lambda u: u['sentimentAverage'], reverse=True)
mostPositiveUsers = allUsers[:500]

allUsers.sort(key=lambda u: u['sentimentAverage'])
mostNegativeUsers = allUsers[:500]

allUsers.sort(key=lambda u: u['lengthAverage'], reverse=True)
mostLengthyUsers = allUsers[:500]

print('Writing files')

with open('transformed-data/mostActiveUsers.json', 'w') as outfile:
	json.dump(mostActiveUsers, outfile)

with open('transformed-data/mostPositiveUsers.json', 'w') as outfile:
	json.dump(mostPositiveUsers, outfile)

with open('transformed-data/mostNegativeUsers.json', 'w') as outfile:
	json.dump(mostNegativeUsers, outfile)

with open('transformed-data/mostLengthyUsers.json', 'w') as outfile:
	json.dump(mostLengthyUsers, outfile)

print('Done')