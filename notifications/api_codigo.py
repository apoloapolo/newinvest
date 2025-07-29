from flask import Flask, request, jsonify
import csv
import os
from BOTnotficacoes import ARQUIVO_USUARIOS, gerar_codigo_auth, send_message

app = Flask(__name__)

# Obtém o código atual do telefone
def obter_codigo_por_telefone(telefone):
    if not os.path.exists(ARQUIVO_USUARIOS):
        return None

    with open(ARQUIVO_USUARIOS, "r", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for row in reader:
            if row["telefone"] == telefone:
                return row["codigo_auth"]
    return None

# Busca chat_id pelo telefone
def obter_chat_id_por_telefone(telefone):
    if not os.path.exists(ARQUIVO_USUARIOS):
        return None

    with open(ARQUIVO_USUARIOS, "r", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for row in reader:
            if row["telefone"] == telefone:
                return row["chat_id"]
    return None

# Atualiza o código do telefone e envia pelo Telegram
def receber_Codigo_Verificacao(telefone):
    if not os.path.exists(ARQUIVO_USUARIOS):
        return False

    linhas = []
    usuario_encontrado = False

    with open(ARQUIVO_USUARIOS, "r", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for row in reader:
            if row["telefone"] == telefone:
                usuario_encontrado = True
                novo_codigo = gerar_codigo_auth()
                row["codigo_auth"] = novo_codigo
                try:
                    send_message(row["chat_id"], f"🔐 Seu novo código de verificação é: *{novo_codigo}*")
                except Exception as e:
                    print("Erro ao enviar mensagem:", e)
            linhas.append(row)

    if not usuario_encontrado:
        return False

    with open(ARQUIVO_USUARIOS, "w", encoding="utf-8", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=["nome", "telefone", "chat_id", "codigo_auth"])
        writer.writeheader()
        writer.writerows(linhas)

    return True

# POST /verificacao: Gera novo código e envia
@app.route("/verificacao", methods=["POST"])
def gerar_codigo():
    dados = request.get_json()
    if not dados or "telefone" not in dados:
        return jsonify({"erro": "Telefone não fornecido"}), 400

    telefone = dados["telefone"]

    sucesso = receber_Codigo_Verificacao(telefone)
    if not sucesso:
        return jsonify({"erro": f"Telefone {telefone} não encontrado"}), 404

    codigo_atual = obter_codigo_por_telefone(telefone)
    if codigo_atual:
        return jsonify({
            "mensagem": "Código de verificação atualizado e enviado.",
            "telefone": telefone,
            "codigo_auth": codigo_atual
        }), 200
    else:
        return jsonify({"erro": "Erro ao recuperar código atualizado"}), 500

# GET /codigo?telefone=...
@app.route("/codigo", methods=["GET"])
def consultar_codigo():
    telefone = request.args.get("telefone")
    if not telefone:
        return jsonify({"erro": "Parâmetro 'telefone' é obrigatório"}), 400

    codigo = obter_codigo_por_telefone(telefone)
    if codigo:
        return jsonify({
            "telefone": telefone,
            "codigo_auth": codigo
        }), 200
    else:
        return jsonify({"erro": f"Telefone {telefone} não encontrado"}), 404

# ✅ NOVO: POST /mensagem: Envia uma mensagem para um número
@app.route("/mensagem", methods=["POST"])
def enviar_mensagem():
    dados = request.get_json()
    if not dados or "telefone" not in dados or "mensagem" not in dados:
        return jsonify({"erro": "Telefone e mensagem são obrigatórios"}), 400

    telefone = dados["telefone"]
    mensagem = dados["mensagem"]

    chat_id = obter_chat_id_por_telefone(telefone)
    if not chat_id:
        return jsonify({"erro": f"Telefone {telefone} não encontrado"}), 404

    try:
        send_message(chat_id, mensagem)
        return jsonify({
            "mensagem": f"Mensagem enviada para {telefone}.",
            "chat_id": chat_id
        }), 200
    except Exception as e:
        return jsonify({"erro": f"Erro ao enviar mensagem: {str(e)}"}), 500

if __name__ == "__main__":
    app.run(debug=True)
