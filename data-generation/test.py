#import praw
#import pdb
import re
import os
import json
#import ijson
#import ijson.backends.yajl2_cffi as ijson
#import csv
#import sqlite3
#from datetime import date, timedelta
#from nltk.sentiment.vader import SentimentIntensityAnalyzer as SIA

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

subreddits = json.load(open('subreddits.json'))

for subreddit in subreddits:
	subreddit['usersDict'] = {}

user = getUser(subreddits[0], 'testUser')
user['commentCount'] += 1
user['commentsSentiments'].extend([56, 9])

user2 = getUser(subreddits[0], '123')
user2['commentCount'] += 1

allUsers = []
for subreddit in subreddits:
	for key, value in subreddit['usersDict'].items():
		value['subreddit'] = subreddit['name']
		allUsers.append(value)
	subreddit.pop('usersDict', None)

print(allUsers)

