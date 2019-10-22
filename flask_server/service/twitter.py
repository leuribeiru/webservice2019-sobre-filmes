#coding: utf-8

import requests
import json
import oauth2


CONSUMER_KEY=""
CONSUMER_SECRET=""
TOKEN_KEY=""
TOKEN_SECRET=""
URL = "https://api.twitter.com/1.1/search/tweets.json"
KEY_WORD=" film"

consumer = oauth2.Consumer(CONSUMER_KEY, CONSUMER_SECRET)
token = oauth2.Token(TOKEN_KEY, TOKEN_SECRET)
cliente = oauth2.Client(consumer, token)

def pesquisarTwittes(nomeFilme):
    req = cliente.request(URL + "?q={0}".format(nomeFilme) + KEY_WORD)
    resp = json.loads(req[1].decode())
    return resp['statuses']

