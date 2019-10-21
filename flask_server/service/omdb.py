#coding: utf-8

import requests
import json

API_KEY="a46a2899"
API_URL="http://www.omdbapi.com/?apikey={0}".format(API_KEY)
MOVIE="&type=movie"

def pesquisarFilme(nomeFilme, anoFilme=''):
    req = requests.get(API_URL + MOVIE + "&s={0}&y={1}".format(nomeFilme,anoFilme) )
    resp = json.loads(req.text)
    if(resp['Response'] == 'True'):
        return resp['Search']
    else:
        return [None]

def getFilmeById(idFilme):
    req = requests.get(API_URL + '&i={0}'.format(idFilme))
    resp = json.loads(req.text)
    return resp
