#coding: utf-8

import requests
import json
import oauth2

CONSUMER_KEY="du9ILQXrHyHClo9sbnYg4PPCO"
CONSUMER_SECRET="b7dY7May2jGRsI065IqxGI6LcTRzO2rwPcKHnb590dQe5dl58W"
TOKEN_KEY="818802200-WQdFSQRLKnv7wGmEvRLMDHJfDMOKRfyK6D6JPBCR"
TOKEN_SECRET="HgjWkuTieiPHKb7uPWo10vxUx8C7IdMrinUQh4YHb76wr"
URL = "https://api.twitter.com/1.1/search/tweets.json"
KEY_WORD=" film"

consumer = oauth2.Consumer(CONSUMER_KEY, CONSUMER_SECRET)
token = oauth2.Token(TOKEN_KEY, TOKEN_SECRET)
cliente = oauth2.Client(consumer, token)

def pesquisarTwittes(nomeFilme):
    req = cliente.request(URL + "?q={0}".format(nomeFilme) + KEY_WORD)
    resp = json.loads(req[1].decode())
    return resp['statuses']

