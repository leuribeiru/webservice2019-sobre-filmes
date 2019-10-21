#coding: utf-8

import os
from flask import Flask, jsonify, request
from flask_cors import CORS
import requests
import json
from service import omdb
from service import twitter
from service import youtube

app = Flask(__name__)
CORS(app)

@app.route('/', methods=['GET'])
def aboutAPI():
    return jsonify({"description": "API Films Details"})

@app.route('/omdb')
def pesquisarFilmes():
    nomeFilme = request.args.get('nome')
    anoFilme = request.args.get('ano')
    return jsonify(omdb.pesquisarFilme(nomeFilme, anoFilme))

@app.route('/omdb/<idFilme>')
def filmePorId(idFilme):
    return jsonify(omdb.getFilmeById(idFilme))

@app.route('/twitter')
def pesquisarTwitters():
    nomeFilme = request.args.get('nome')
    return jsonify(twitter.pesquisarTwittes(nomeFilme))

@app.route('/youtube')
def pesquisarVideo():
    nomeFilme = request.args.get('nome')
    return jsonify(youtube.pesquisarVideo(nomeFilme))
    

if __name__ == '__main__':
    porta = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=porta,debug=True)