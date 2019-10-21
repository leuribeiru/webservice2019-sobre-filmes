"use strict";

var btn_buscar = document.getElementById('btnBuscar');
var campo_nome = document.getElementById('campoNome');

btn_buscar.onclick = function () {
  pesquisarFilme(campo_nome.value);
}

campo_nome.onkeypress = function(e){
  if(e.key == "Enter"){
    pesquisarFilme(campo_nome.value);
  }
}

const API_URL = "https://sobrefilmesapi.herokuapp.com/";
const OMDB = "omdb"
const YOUTUBE = "youtube"
const TWITTER = "twitter"


const YOUTUBE_EMBED_URL = "https://www.youtube.com/embed/"
var video = document.getElementById('youtube')

var lista_resultado = document.getElementById('listaResultado');
var resultado = document.getElementById('resultado');

var lista_twitter = document.getElementById('listaTwitter');

var omdb_poster = document.getElementById("omdbPoster");
var omdb_title = document.getElementById("omdbTitle")
var omdb_released = document.getElementById("omdbReleased")
var omdb_run_time = document.getElementById("omdbRunTime")
var omdb_genre = document.getElementById("omdbGenre")
var omdb_actors = document.getElementById("omdbActors");
var omdb_plot = document.getElementById("omdbPlot")


function pesquisarFilme(nomeFilme) {
  resultado.style.display = 'none'
  lista_twitter.style.display = 'none'
  video.src = ""
  var req = new XMLHttpRequest();
  req.onreadystatechange = function () {
    if (req.readyState === XMLHttpRequest.DONE && req.status === 200) {
      listarResultado(JSON.parse(req.responseText))
    }
  };
  var url_request = API_URL + OMDB + "?nome=" + nomeFilme;
  req.open('GET', url_request);
  req.send(null);
}

function listarResultado(result) {
  lista_resultado.style.display = "inline-table";
  lista_resultado.innerHTML = '';

  for (var i = 0; i < result.length && i < 8; i++) {

    var item = document.createElement("div")
    item.id = result[i]['imdbID']
    item.className = "card item-list";
    item.onclick = function () {
      buscarOMDB(this.id);
      buscarTwittes(campo_nome.value);
      lista_resultado.style.display = "none";
    }

    var item_poster = document.createElement("IMG")
    item_poster.src = result[i]['Poster'] != 'N/A' ? result[i]['Poster'] : 'img/no_image.jpg';
    item_poster.className = "card-img-top";

    var item_ano = document.createElement("P")
    item_ano.className = "card-text";
    item_ano.innerText = result[i]['Year'];

    item.appendChild(item_poster)
    item.appendChild(item_ano)

    lista_resultado.appendChild(item)
  }

  function buscarOMDB(idItem) {
    var req = new XMLHttpRequest();
    req.onreadystatechange = function () {
      if (req.readyState === XMLHttpRequest.DONE && req.status === 200) {
        var resp = JSON.parse(req.responseText)
        mostrarInformacoes(resp)
        buscarYoutube(resp['Title'])
      }
    };
    var url_request = API_URL + OMDB + "/" + idItem;
    req.open('GET', url_request);
    req.send(null);
  }

  function buscarYoutube(nome) {
    var req = new XMLHttpRequest();
    req.onreadystatechange = function () {
      if (req.readyState === XMLHttpRequest.DONE && req.status === 200) {
        var resp = JSON.parse(req.responseText)
        video.src = YOUTUBE_EMBED_URL + resp['videoId']
      }
    };
    var url_request = API_URL + YOUTUBE + "?nome=" + nome;
    req.open('GET', url_request);
    req.send(null);
  }

  function buscarTwittes(nome) {
    var req = new XMLHttpRequest();
    req.onreadystatechange = function () {
      if (req.readyState === XMLHttpRequest.DONE && req.status === 200) {
        var resp = JSON.parse(req.responseText)
        exibirTwittes(resp)
      }
    };
    var url_request = API_URL + TWITTER + "?nome=" + nome;
    req.open('GET', url_request);
    req.send(null);
  }

  function exibirTwittes(result) {
    lista_twitter.style.display = "block"
    lista_twitter.innerHTML = ''
    for (var i = 0; i < result.length && i < 4; i++) {

      var item = document.createElement("div")
      item.id = result[i]['imdbID']
      item.className = "media";

      var item_userimage = document.createElement("IMG")
      item_userimage.className = "img_media"
      item_userimage.src = result[i]['user']['profile_image_url']

      var item_username = document.createElement("H5")
      item_username.innerText = result[i]['user']['name']

      var item_texto = document.createElement("P")
      item_texto.innerText = result[i]['text'];

      var item_corpo = document.createElement('DIV')
      item_corpo.className = "media-body";
      item_corpo.appendChild(item_username)
      item_corpo.appendChild(item_texto)

      item.appendChild(item_userimage)
      item.appendChild(item_corpo)

      lista_twitter.appendChild(item)
    }
  }

    function mostrarInformacoes(result) {
      resultado.style.display = "flex";

      omdb_poster.src = result['Poster'] != 'N/A' ? result['Poster'] : 'img/no_image.jpg'
      omdb_title.innerText = result['Title']
      omdb_released.innerText = result['Released']
      omdb_run_time.innerText = result['Runtime']
      omdb_genre.innerText = result['Genre']
      omdb_actors.innerText = result['Actors']
      omdb_plot.innerText = result['Plot']
    }


  }