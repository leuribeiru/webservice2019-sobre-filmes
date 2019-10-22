#coding: utf-8

from apiclient.discovery import build
import requests
import json

API_KEY=""
TAG_TRAILLER=" movie trailer"

def pesquisarVideo(nomeFilme):
    youtube = build('youtube', 'v3', developerKey=API_KEY)
    req = youtube.search().list(q=nomeFilme + TAG_TRAILLER, part='snippet', type='video', maxResults=1)
    resp = req.execute()
    if(len(resp['items'])) > 0:
        return resp['items'][0]['id']
    else:
        return ''
