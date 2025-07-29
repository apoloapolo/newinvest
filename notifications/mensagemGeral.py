import csv
import requests

TOKEN = "8340065304:AAGoaZ-r0XifB-RQYzy3flszpZNK7p0iH6g"
BASE_URL = f"https://api.telegram.org/bot{TOKEN}/"
ARQUIVO_USUARIOS = "usuarios.csv"

def buscar_chat_id_por_telefone(telefone):
    try:
        with open(ARQUIVO_USUARIOS, "r", encoding="utf-8") as f:
            reader = csv.DictReader(f)
            for row in reader:
                if row["telefone"] == telefone:
                    return row["chat_id"]
    except FileNotFoundError:
        print("Arquivo de usuários não encontrado.")
    return None

def enviar_mensagem(chat_id, texto):
    url = f"{BASE_URL}sendMessage"
    payload = {"chat_id": chat_id, "text": texto}
    response = requests.post(url, json=payload)
    return response.ok

def notificar_usuario_por_telefone(telefone, mensagem):
    chat_id = buscar_chat_id_por_telefone(telefone)
    if chat_id:
        sucesso = enviar_mensagem(chat_id, mensagem)
        if sucesso:
            print(f"Mensagem enviada para {telefone} (chat_id: {chat_id})")
        else:
            print(f"Falha ao enviar mensagem para {telefone}")
    else:
        print(f"Telefone {telefone} não encontrado no arquivo.")

if __name__ == "__main__":
    numero = "+5581985150005"
    mensagem = "APOLO VC É UM MERDA IRMÃO"
    notificar_usuario_por_telefone(numero, mensagem)
