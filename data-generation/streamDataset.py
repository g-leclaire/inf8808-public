#!/usr/bin/python
import praw
import pdb
import re
import os
from nltk.sentiment.vader import SentimentIntensityAnalyzer as SIA

sia = SIA()

reddit = praw.Reddit('CoinShillMeter')

# Get subreddits
subreddits = reddit.subreddit('cryptocurrency+cryptomarkets+altcoin+best_of_crypto+blockchain+cryptotrade+doitforthecoin+gpumining+jobs4crypto')

# Get recent comments
for comment in subreddits.stream.comments():
	print (comment.body)
	res = sia.polarity_scores(comment.body)
	print (res)
	print ('')