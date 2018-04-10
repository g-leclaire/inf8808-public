import json
import ijson.backends.yajl2_cffi as ijson

subreddits = json.load(open('subreddits.json'))

coins = []
totalComments = 0

for subreddit in subreddits:
	print('Loading', subreddit['name'])
	with open('data/' + subreddit['name'] + '.json', 'rb') as data:
		for comment in ijson.items(data, 'item'):
			totalComments += 1

print('Comment count:', totalComments)