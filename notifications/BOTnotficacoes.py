import requests
from time import sleep
import os
import csv
import random

TOKEN = "8340065304:AAGoaZ-r0XifB-RQYzy3flszpZNK7p0iH6g"
BASE_URL = f"https://api.telegram.org/bot{TOKEN}/"
ARQUIVO_USUARIOS = "usuarios.csv"
DIGITOS_CODIGO = 6

# Envia mensagem para o usuário
def send_message(chat_id, text, reply_markup=None):
    url = f"{BASE_URL}sendMessage"
    payload = {"chat_id": chat_id, "text": text, "parse_mode": "Markdown"}
    if reply_markup:
        payload["reply_markup"] = reply_markup
    requests.post(url, json=payload)

# Busca atualizações (mensagens) do Telegram
def get_updates(offset=None):
    url = f"{BASE_URL}getUpdates"
    params = {"timeout": 10, "offset": offset}
    response = requests.get(url, params=params)
    return response.json().get("result", [])

# Gera código aleatório com número de dígitos definido
def gerar_codigo_auth(digitos=DIGITOS_CODIGO):
    minimo = 10 ** (digitos - 1)
    maximo = (10 ** digitos) - 1
    return str(random.randint(minimo, maximo))

# Salva usuário no arquivo CSV, se ainda não existir
def salvar_usuario(nome, telefone, chat_id):
    if not os.path.exists(ARQUIVO_USUARIOS):
        with open(ARQUIVO_USUARIOS, "w", newline="", encoding="utf-8") as f:
            writer = csv.writer(f)
            writer.writerow(["nome", "telefone", "chat_id", "codigo_auth"])

    encontrado = False
    with open(ARQUIVO_USUARIOS, "r", newline="", encoding="utf-8") as f:
        reader = csv.reader(f)
        next(reader, None)
        for row in reader:
            if row and row[1] == telefone:
                encontrado = True
                break

    if not encontrado:
        codigo_auth = gerar_codigo_auth()
        with open(ARQUIVO_USUARIOS, "a", newline="", encoding="utf-8") as f:
            writer = csv.writer(f)
            writer.writerow([nome, telefone, chat_id, codigo_auth])
        print(f"Novo usuário salvo: {nome}, {telefone}, {chat_id}, {codigo_auth}")

# Verifica se um usuário já está cadastrado
def usuario_cadastrado(chat_id):
    if not os.path.exists(ARQUIVO_USUARIOS):
        return False
    with open(ARQUIVO_USUARIOS, "r", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for row in reader:
            if row["chat_id"] == str(chat_id):
                return True
    return False

# Mostra o menu do bot
def exibir_menu(chat_id):
    teclado = {
        "keyboard": [
            [{"text": "📱 Modificar contato", "request_contact": True}],
            [{"text": "❓ Ajuda"}],
            [{"text": "❗informação"}]
        ],
        "resize_keyboard": True,
        "one_time_keyboard": False
    }
    send_message(chat_id, "*📊 NewInvest*\nEscolha uma opção abaixo:", reply_markup=teclado)

# Lógica principal do bot
def main():
    print("Bot iniciado...")
    last_update_id = 0

    while True:
        updates = get_updates(last_update_id + 1)
        for update in updates:
            last_update_id = update["update_id"]
            message = update.get("message", {})
            chat_id = message.get("chat", {}).get("id")

            if "contact" in message:
                contato = message["contact"]
                telefone = contato.get("phone_number", "")
                nome = contato.get("first_name", "")
                sobrenome = contato.get("last_name", "")
                nome_completo = f"{nome} {sobrenome}".strip()
                salvar_usuario(nome_completo, telefone, chat_id)
                send_message(chat_id, f"✅ Obrigado, {nome_completo}! Número *{telefone}* salvo com sucesso.")
                exibir_menu(chat_id)
                continue

            text = message.get("text", "")

            if text in ["/start", "/help", "❓ Ajuda"]:
                if usuario_cadastrado(chat_id):
                    exibir_menu(chat_id)
                else:
                    teclado = {
                        "keyboard": [[{
                            "text": "📱 Enviar número",
                            "request_contact": True
                        }]],
                        "one_time_keyboard": True,
                        "resize_keyboard": True
                    }
                    send_message(chat_id, "👋 Olá! Clique no botão abaixo para compartilhar seu número:", reply_markup=teclado)

            elif text == "❗informação":
                send_message(chat_id, 
                    """🧠 *New Invest* é uma plataforma de monitoramento de ações em tempo real que envia alertas personalizados via e Telegram."""
                )
                exibir_menu(chat_id)

            else:
                exibir_menu(chat_id)

        sleep(1)

if __name__ == "__main__":
    main()
