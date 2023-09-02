from datetime import date, timedelta
import datetime
from math import floor
from flask import Flask, jsonify, request, make_response
import requests

app = Flask(__name__)

# Consulta simulação
@app.route('/simulacao/<int:id>/<int:dias>', methods=['GET'])
def realizaSimulacao(id, dias):
    acessStocks = "http://localhost:8080/stocks/stocks/"+str(id)
    stock = requests.get(acessStocks)
    data = stock.json()

    meses = dias // 30
    dias = dias % 30

    preco = data["price"]
    
    variacao = data["variation"]
    for i in range(0, meses):
        preco = preco + (preco * (variacao/100))

    variacaoPorDia = round(variacao / 30, 2)
    for i in range(0, dias):
        preco = preco + (preco * (variacaoPorDia/100))

    response = {
        "simulacao": round(preco, 2),
        "sera": investirAcao(data, preco, meses)
    }
    
    return jsonify(response)

def investirAcao(acao, preco, meses): # Essa função retorna baseado na diferença da data atual e a data para simulação da acao e mostra para o cliente requisitante da simulação se há ação dele está valendo a pena atualmente
    dataHoje = date.today()
    diferenca = (dataHoje + timedelta(days=30 * meses)) - dataHoje
    
    if diferenca.days > 24 * 30 and preco >= (acao["price"] * 3): # Se passado 2 anos e ação maior ou igual ao o triplo
        return "Muito Boa"
    elif diferenca.days > 12 * 30 and preco >= (acao["price"] * 2): # Se passado entre 1 ano e 2 anos e ação maior ou igual ao o dobro
        return "Boa"
    elif diferenca.days < 12 * 30 and preco >= (acao["price"] * 1.3): # Se passado menos que 1 ano e ação maior ou igual a 1.3 o valor inicial dela
        return "Normal" 
    else: # Se passado menos que 1 ano e ação menor que 1.3 o valor inicial dela
        return "Ruim"


app.run(host='localhost', port=1111)