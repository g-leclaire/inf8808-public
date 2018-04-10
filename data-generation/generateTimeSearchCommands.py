import json

decemberStart = '1512086400'
februaryEnd = '1519862399'

startDate = decemberStart
endDate = februaryEnd
commands = []

subreddits = json.load(open('subreddits.json'))

for subreddit in subreddits:
	commands.append('py timesearch.py timesearch -r ' +
		subreddit['name'] + ' -l ' + startDate + ' -up ' + endDate)
	commands.append('py timesearch.py commentaugment -r ' + subreddit['name'])

combinedCommand = ' && '.join(commands)

file = open('timesearchCommand.bat', 'w') 
file.write(combinedCommand)
file.close()

