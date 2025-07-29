import requests

# Teste do POST /verificacao
url_post = "http://127.0.0.1:5000/verificacao"
data = {"telefone": "5581985150005"}
res = requests.post(url_post, json=data)
print("POST /verificacao:", res.status_code)
print(res.json())

# Teste do GET /codigo
url_get = "http://127.0.0.1:5000/codigo"
params = {"telefone": "5581985150005"}
res = requests.get(url_get, params=params)
print("GET /codigo:", res.status_code)
print(res.json())

# Testando envio de mensagem
url = "http://127.0.0.1:5000/mensagem"
data = {
    "telefone": "5581985150005",
    "mensagem": "📢 Olá! Esta é uma mensagem de teste personalizada."
}

res = requests.post(url, json=data)
print(res.status_code)
print(res.json())