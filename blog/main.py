from flask import Flask, jsonify, request, make_response
from bd import noticias

app = Flask(__name__)

# Consulta todas as notícias
@app.route('/noticias', methods=['GET'])
def obterNoticias():
    return jsonify(noticias)

# Deleta notícia por ID
@app.route('/noticias/<int:id>', methods=['DELETE'])
def excluirNoticia(id):
    for i, noticia in enumerate(noticias):
        if noticia.get('id') == id:
            del noticias[i]
            return jsonify(noticia)

# Atualiza notícia por ID
@app.route('/noticias/<int:id>', methods=['PUT'])
def editarNoticia(id):
    noticiaEditada = request.get_json()
    for i, noticia in enumerate(noticias):
        print(i, noticia.get('id'))
        if noticia.get('id') == id:
            noticias[i].update(noticiaEditada)
            return jsonify(noticiaEditada)

# Cria notícia por ID
@app.route('/noticias', methods=['POST'])
def criarNoticia():
    pegaJson = request.get_json()
    id = autoIncrementarId()
    pegaJson["id"] = id
    noticias.append(pegaJson)
    return pegaJson

def autoIncrementarId():
    i = 1
    if noticias:
        for noticia in noticias:
            if noticia.get('id') != i: 
                return i
            else:
                i += 1
    return i
    
app.run(host='localhost', port=9090)

