import csv
import os
from BOTnotficacoes import gerar_codigo_auth
from mensagemGeral import enviar_mensagem

ARQUIVO_USUARIOS = "usuarios.csv"

# Atualiza o código de autenticação de um usuário pelo telefone
def receber_Codigo_Verificação(telefone):
    if not os.path.exists(ARQUIVO_USUARIOS):
        print("Arquivo de usuários não encontrado.")
        return False

    usuarios_atualizados = []
    codigo_novo = None
    chat_id_alvo = None

    with open(ARQUIVO_USUARIOS, "r", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for row in reader:
            if row["telefone"] == telefone:
                codigo_novo = gerar_codigo_auth()
                row["codigo_auth"] = codigo_novo
                chat_id_alvo = row["chat_id"]
            usuarios_atualizados.append(row)

    if codigo_novo is None:
        print(f"Telefone {telefone} não encontrado.")
        return False

    # Sobrescreve o arquivo CSV com os dados atualizados
    with open(ARQUIVO_USUARIOS, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=["nome", "telefone", "chat_id", "codigo_auth"])
        writer.writeheader()
        writer.writerows(usuarios_atualizados)

    # Envia o novo código
    enviar_codigo_verificacao(chat_id_alvo, codigo_novo)
    return True

# Envia mensagem com o novo código de autenticação
def enviar_codigo_verificacao(chat_id, codigo):
    mensagem = f"🔐 Seu código de verificação é: {codigo}"
    sucesso = enviar_mensagem(chat_id, mensagem)
    if sucesso:
        print(f"Código enviado com sucesso para chat_id {chat_id}")
    else:
        print(f"Falha ao enviar código para chat_id {chat_id}")

if __name__ == "__main__":
    telefone_alvo = "+5581985150005"
    receber_Codigo_Verificação(telefone_alvo)
