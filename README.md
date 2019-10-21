# trabalho de webservice 2019

Projeto:
 - link de acesso: https://leuribeiru.github.io/webservice2019-sobre-filmes/
 - conteúdo do projeto
     - client_page -> aplicação html/javascript single page
     - flask_server -> aplicação flask (python)
 - back-end
   - url-deployed: https://sobrefilmesapi.herokuapp.com/
     - .../omdb?nome=[nome do filme que deseja buscar no omdb]
     - .../omdb/[omdbId (encontrado no retorno da url anterior)]
     - .../twitter?nome=[nome do filme para buscar por ocorrencias no twitter]
     - .../youtube?nome=[nome do filme para buscar pelo trailler no youtube]
   - A API desenvolvida em flask recebe a requisição do cliente nos end-points acima, faz o acesso as APIs do omdb, twitter e youtube entrega a uma resposta mais elegante em json para o cliente
    
 - front-end
   - url: https://leuribeiru.github.io/webservice2019-sobre-filmes/ (branch: gh-pages)
     - Busca por filmes
       - exibe as informações do filme e o Poster caso exista um.
       - exibe os últimos comentários sobre o filme no Twitter
       - exibe um vídeo do youtube sobre o filme (tenta buscar pelo trailer do filme)
   - Uma página HTML que faz requisições HTTP via javascript nos end-points da aplicação flask e mostra o resultado para o usuário da aplicação
   
 
