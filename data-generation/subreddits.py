import praw
import json

def lowerList(myList):
	for i, subreddit in enumerate(myList):
		myList[i] = subreddit.lower()

generalSubreddits = ['cryptocurrency', 'cryptomarkets', 'altcoin', 'best_of_crypto', 'blockchain', 'cryptotrade', 'doitforthecoin', 'gpumining', 'jobs4crypto', 'cryptohumor', 'cryptotechnology', 'cryptomoonshots', 'cryptosobstories']
are_you_real = ['altcoin', 'ArkEcosystem', 'Best_of_Crypto', 'Bitcoin', 'BitcoinCA', 'Bitcoincash', 'BitcoinMarkets', 'BlockChain', 'btc', 'cardano', 'CryptoCurrency', 'CryptoMarkets', 'dashpay', 'dogecoin', 'ethereum', 'ethtrader', 'garlicoin', 'Iota', 'litecoin', 'LitecoinMarkets', 'Monero', 'nem', 'NEO', 'omise_go', 'RaiBlocks', 'RequestNetwork', 'Ripple', 'shapeshiftio', 'Stellar', 'vergecurrency', 'vertcoin']
mtg1222 = ['Ardor', 'Augur', 'Bitcoin', 'bitcoin_unlimited', 'BitcoinAll', 'BitcoinMarkets', 'BitcoinMining', 'BitcoinSerious', 'BitMarket', 'BitShares', 'btc', 'CryptoCurrencies', 'CryptoCurrency', 'CryptoMarkets', 'DashCoin', 'dashmarket', 'dashous', 'dashpay', 'DashTrader', 'decred', 'digix', 'dogecoin', 'DRKCoin', 'EmerCoin', 'ethdapps', 'ethdev', 'ethereum', 'EthereumClassic', 'EtherMining', 'ethtrader', 'factom', 'GolemProject', 'ICONOMI', 'komodoplatform', 'lbry', 'Lisk', 'litecoin', 'LitecoinMarkets', 'litecoinmining', 'LivingOnBitcoin', 'safenetwork', 'melonproject', 'Monero', 'Namecoin', 'nem', 'NiceHash', 'NuBits', 'NXT', 'peercoin', 'pivx', 'poloniex', 'reptrader', 'Ripple', 'SafeMarket', 'Shadowcash', 'shapeshiftio', 'siacoin', 'Stealthcoin', 'steemit', 'storj', 'stratisplatform', 'supernet', 'vertcoin', 'ZcashMiners']
steemit = ['Aeon', 'Ardor', 'Augur', 'Best_of_Crypto', 'BitMarket', 'BitShares', 'Bitcoin', 'BitcoinAll', 'BitcoinBeginners', 'BitcoinMarkets', 'BitcoinMining', 'BitcoinSerious', 'BlockChain', 'CryptoCurrencies', 'CryptoCurrency', 'CryptoMarkets', 'DRKCoin', 'DashCoin', 'DashTrader', 'Digibyte', 'DoItForTheCoin', 'EmerCoin', 'EtherMining', 'EthereumClassic', 'GolemProject', 'ICONOMI', 'Jobs4Crypto', 'Liberland', 'Lisk', 'LitecoinMarkets', 'LivingOnBitcoin', 'MintCoin', 'Monero', 'NXT', 'Namecoin', 'NiceHash', 'NobleCoin', 'NuBits', 'QuarkCoin', 'Ripple', 'SafeMarket', 'Shadowcash', 'Stealthcoin', 'TaCoCoin', 'Terracoin', 'ZcashMiners', 'altcoin', 'bitcoin_devlist', 'bitcoin_uncensored', 'bitcoin_unlimited', 'bitcoinxt', 'blackcoin', 'btc', 'burstcoin', 'crypto', 'dashmarket', 'dashous', 'dashpay', 'decred', 'digix', 'dogecoin', 'ethdapps', 'ethdev', 'ethereum', 'ethinvestor', 'ethtrader', 'factom', 'gridcoin', 'komodoplatform', 'lbry', 'litecoin', 'litecoinmining', 'maidsafe', 'mastercoin', 'mazacoin', 'melonproject', 'myriadcoin', 'nem', 'nyancoins', 'peercoin', 'pivx', 'primecoin', 'reddCoin', 'reptrader', 'ripplers', 'shapeshiftio', 'siacoin', 'steemit', 'storj', 'stratisplatform', 'supernet', 'vertcoin', 'xmrtrader', 'zec']
reecheer = ['Bitcoincash', 'cardano', 'civicplatform', 'DashCoin', 'decred', 'eos', 'ethereum', 'EthereumClassic', 'Iota', 'Lisk', 'litecoin', 'monacoin', 'Monero', 'Namecoin', 'NavCoin', 'nem', 'NEO_Coin', 'omise_go', 'peercoin', 'pivx', 'Qtum', 'Quantstamp', 'RequestNetwork', 'Ripple', 'Stellar', 'Stratis', 'Tether', 'Tronix', 'vertcoin', 'XtraBYtes', 'z_cash', 'binance', 'bitfinex', 'Bitstamp', 'BlockChain_info', 'CeX', 'Changelly', 'CoinBase', 'Cryptopia', 'EtherDelta', 'Etoro', 'GDAX', 'Kraken', 'localbitcoins', 'paxful', 'UnofficialBittrex', 'Bitcoin', 'Bitcoin_Classic', 'Bitcoin_News', 'bitcoin_uncensored', 'bitcoin_unlimited', 'BitcoinAUS', 'BitcoinBeginners', 'BitcoinCA', 'BitcoinMarkets', 'BitcoinUK', 'btc', 'BTCNews', 'NZBitcoin']
cryptojunky = ['BitMarket', 'Bitcoin', 'BitcoinMagazine', 'BitcoinMining', 'Jobs4Bitcoins', 'MtGox', 'MutualistsForBitcoin', 'Namecoin', 'Terracoin', 'bitcointip', 'crypto', 'games4bitcoins', 'litecoin', 'mtred', 'ripplers']
bedroni = ['0xProject', 'Aeternity', 'Ardor', 'ArkEcosystem', 'Augur', 'binance', 'Bitcoin', 'BitShares', 'BytecoinBCN', 'cardano', 'dashpay', 'decred', 'dogecoin', 'eos', 'ethereum', 'EthereumClassic', 'hcash', 'helloicon', 'Iota', 'komodoplatform', 'kucoin', 'Lisk', 'litecoin', 'loopringorg', 'MakerDAO', 'Monero', 'nem', 'NEO', 'omise_go', 'Qtum', 'RaiBlocks', 'RChain', 'Ripple', 'siacoin', 'statusim', 'steemit', 'Stellar', 'stratisplatform', 'Tronix', 'Vechain', 'Veritasium', 'waltonchain', 'Wavesplatform', 'zec']
deuce2high = ['altcoin', 'ambrosus', 'Ardor', 'ArkEcosystem', 'Augur', 'Bancor', 'BATProject', 'BetKingIo', 'binance', 'Bitcoin', 'BitMEX', 'BitShares', 'BlackMoonCrypto', 'btc', 'BulwarkCoin', 'cardano', 'civicplatform', 'cofoundit', 'counterparty_xcp', 'crypto', 'CryptoCurrencies', 'CryptoCurrency', 'CryptoMarkets', 'DashCoin', 'dashpay', 'decred', 'Digibyte', 'digix', 'Edgeless', 'EmerCoin', 'enigmacatalyst', 'EtherDelta', 'ethereum', 'EtherMining', 'etheroll', 'ethfinex', 'ethtrader', 'factom', 'GameCreditsCrypto', 'gnosisPM', 'GolemProject', 'GolemTrader', 'icocrypto', 'ICONOMI', 'Iota', 'KinFoundation', 'komodoplatform', 'lbry', 'Lisk', 'litecoin', 'LitecoinMarkets', 'lykke', 'maidsafe', 'MakerDAO', 'melonproject', 'Monero', 'Monetha', 'monkeycapital', 'Neblio', 'nem', 'NEO', 'NXT', 'omise_go', 'omni', 'OpenLedgerDEX', 'pivx', 'PoloniexForum', 'RaiBlocks', 'reptrader', 'RequestNetwork', 'REXMLS', 'RiseVision', 'shapeshiftio', 'siacoin', 'SingularDTV', 'SkycoinProject', 'smartcash', 'SONM', 'statusim', 'steemit', 'Stellar', 'storj', 'stratisplatform', 'SwarmCity', 'Synereo', 'SysCoin', 'taasfund', 'TenX', 'TheAgoraMarketplace', 'tierion', 'Ubiq', 'vertcoin', 'viacoin', 'Wagerr', 'wanchain', 'Wavesplatform', 'WeTrustPlatform', 'WingsDAO', 'XEL', 'zec']
pgds = ['altcoin', 'Bitcoin', 'Bitcoin_Classic', 'Bitcoin_Core', 'Bitcoin_News', 'bitcoin_qi', 'bitcoin_uncensored', 'bitcoin_unlimited', 'BitcoinAll', 'BitcoinBeginners', 'BitcoinMarkets', 'BitcoinMining', 'bitcoins', 'BitcoinStocks', 'blackcoin', 'BlockChain', 'btc', 'BTCNews', 'CoinBase', 'CoinTelegraph', 'crypto', 'CryptoCurrency', 'CryptoDerivatives', 'CryptoMarkets', 'CryptoTrade', 'dashpay', 'dogecoin', 'ethereum', 'ethereumnoobies', 'ethtrader', 'EXSCUDO', 'florincoin', 'FreeBits', 'gridcoin', 'icocrypto', 'Iota', 'litecoin', 'Monero', 'pivx', 'poloniex', 'shapeshiftio']
nodice23 = ['Antshares', 'ArkEcosystem', 'Bitcoin', 'BitcoinMagazine', 'BitcoinMarkets', 'btc', 'cofoundit', 'CryptoCurrencies', 'CryptoCurrency', 'CryptoMarkets', 'CryptoReviews', 'dashpay', 'decred', 'dogecoin', 'EthAnalysis', 'ethereum', 'ethtrader', 'ico', 'ICOAnalysis', 'ICONOMI', 'Iota', 'Lisk', 'litecoin', 'lomocoin', 'MonacoCard', 'Monero', 'nem', 'NEO', 'Neotrader', 'omise_go', 'Ripple', 'shapeshiftio', 'siacoin', 'Vechain', 'VeChainTrader']
p3rplex = ['0xProject', 'AdEx', 'altcoin', 'altcoin_news', 'Antshares', 'Ardor', 'ArkEcosystem', 'Augur', 'BCCTalk', 'Best_of_Crypto', 'binance', 'Bitcoin', 'Bitcoin_Classic', 'bitcoin_nodes', 'bitcoin_uncensored', 'bitcoin_unlimited', 'BitcoinABC', 'BitcoinAll', 'Bitcoincash', 'BitcoinDerivatives', 'BitcoinMarkets', 'BitcoinMining', 'BitcoinStocks', 'BitcoinTV', 'BitcoinUSA', 'bitcoinxt', 'BitMarket', 'BitShares', 'BlockChain', 'btc', 'ByteBall', 'BytomBlockchain', 'Chainlink', 'civicplatform', 'counterparty_xcp', 'Crown', 'crypto', 'CryptoCurrencies', 'CryptoCurrency', 'cryptotrader', 'DarkNetMarkets', 'dashpay', 'decred', 'district0x', 'Electrum', 'ethereum', 'EthereumClassic', 'ethtrader', 'factom', 'filecoin', 'GolemProject', 'icocrypto', 'ICONOMI', 'Iota', 'IOTAmarkets', 'ledgerwallet', 'letstalkbitcoin', 'LINKTrader', 'Lisk', 'litecoin', 'LitecoinMarkets', 'litecoinmining', 'ltcmarket', 'lykke', 'maidsafe', 'Monero', 'moneromarket', 'Namecoin', 'NavCoin', 'nem', 'NEO', 'Neotrader', 'numerai', 'numeraire', 'NXT', 'omise_go', 'OpenBazaar', 'peercoin', 'PillarProject', 'primecoin', 'Prism_Exchange', 'protoshare', 'Ripple', 'SALTLending', 'SaltTrader', 'shapeshiftio', 'siacoin', 'steem', 'storj', 'STOX', 'stratisplatform', 'TenX', 'Tether', 'tokentrade', 'vctoken', 'vertcoin', 'waltonchain', 'WaltonTrader', 'xmrtrader', 'zec']
coinclerk = ['Aeon', 'altcoin', 'Ardor', 'Augur', 'Best_of_Crypto', 'Bitcoin', 'BitcoinBeginners', 'BitcoinMarkets', 'BitcoinMining', 'BitcoinSerious', 'BlockChain', 'BlockchainBeginners', 'btc', 'crypto', 'CryptoCurrency', 'CryptoKitties', 'CryptoMarkets', 'DashCoin', 'dashpay', 'decred', 'Digibyte', 'dogecoin', 'DoItForTheCoin', 'ethdapps', 'ethereum', 'ethinvestor', 'ethtrader', 'factom', 'GolemProject', 'gridcoin', 'icocrypto', 'ICONOMI', 'Jobs4Crypto', 'Lisk', 'litecoin', 'LitecoinMarkets', 'Livecoinwatch', 'LivingOnBitcoin', 'maidsafe', 'melonproject', 'Monero', 'MoneroMining', 'nem', 'Neotrader', 'NiceHash', 'OpenBazaar', 'peercoin', 'pivx', 'Ripple', 'shapeshiftio', 'siacoin', 'steemit', 'storj', 'stratisplatform', 'xmrtrader', 'zec']
others = ['betking']

allSubreddits = []
allSubreddits.extend(generalSubreddits)
allSubreddits.extend(are_you_real)
allSubreddits.extend(mtg1222)
allSubreddits.extend(steemit)
allSubreddits.extend(reecheer)
allSubreddits.extend(cryptojunky)
allSubreddits.extend(bedroni)
allSubreddits.extend(deuce2high)
allSubreddits.extend(pgds)
allSubreddits.extend(nodice23)
allSubreddits.extend(p3rplex)
allSubreddits.extend(coinclerk)
allSubreddits.extend(others)

lowerList(allSubreddits)
allSubreddits = list(set(allSubreddits))
allSubreddits = sorted(allSubreddits)

reddit = praw.Reddit('CryptocurrencySentimentAnalyser')
subredditsInfo = []

for subredditName in allSubreddits:
	if subredditName != 'darknetmarkets' and subredditName != 'cryptography':
		try:
			subreddit = reddit.subreddit(subredditName)
			subscribers = subreddit.subscribers
		except:
			subscribers = 0
		print(subredditName + ': ' + str(subscribers))

		if subscribers > 0:
			subredditObject = {}
			subredditObject['name'] = subredditName
			subredditObject['subscribers'] = subscribers
			subredditsInfo.append(subredditObject)

subredditsInfo.sort(key=lambda s: s['subscribers'], reverse=True)

subredditsToWrite = []

i = 0
while i < 100:
	subredditsToWrite.append(subredditsInfo[i])
	i += 1

subredditsToWrite.sort(key=lambda s: s['name'])

with open('subreddits.json', 'w') as outfile:
	json.dump(subredditsToWrite, outfile)