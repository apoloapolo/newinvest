import requests
import smtplib
import time
import email.message

# Configurações da API de Usuários
usuarios_api_url = "http://127.0.0.1:8000/usuarioList/"

# Configurações da API de Investimentos (substitua pelo URL correto)
investimentos_api_url = "http://localhost:8080/stocks/stocks/"

# Configurações de e-mail
email_sender = 'seu_email@gmail.com'
email_password = 'sua_senha'
smtp_server = 'smtp.gmail.com'
smtp_port = 587

def pega_usuarios():
    response = requests.get(usuarios_api_url)
    if response.status_code == 200:
        data = response.json()
        return [(user['nome'], user['email']) for user in data]
    return []

def pega_investimentos():
    response = requests.get(investimentos_api_url)
    if response.status_code == 200:
        data = response.json()
        return [(user['name']) for user in data]
    return []

def manda_emails(numero_investimentos_anteriores):
    users = pega_usuarios()
    investimentos_count = pega_investimentos()
    
    if len(investimentos_api_url) > numero_investimentos_anteriores:
        aux_num = len(investimentos_api_url) - numero_investimentos_anteriores
        resultado = investimentos_count[-1:-(aux_num+1):-1]
        lista_invest = []
        
        for i in resultado:
            lista_invest.append(str(f"<p>\nInvestimento {i} foi adicionado</p>"))
            
        numero_investimentos_anteriores = len(investimentos_api_url)
        
        for c in users:
            message = (f"<p>Olá {c[0]},\n\nNovos investimentos estão disponíveis. Confira agora!</p>")
            
            finalizacao = ("<p>\n\nAtenciosamente,\nSua NewInvest</p>")
            
            for c in lista_invest:
                message = message + c
            
            message = message + finalizacao
            
            enviar_email(message, c[1])
        
    elif numero_investimentos_anteriores > len(investimentos_api_url):
        numero_investimentos_anteriores = len(investimentos_api_url)
    
    return numero_investimentos_anteriores
        

def enviar_email(manda, ema):  
    corpo_email = """
    
    """ + manda

    msg = email.message.Message()
    msg['Subject'] = "Novos investimentos disponíveis! em NewInvest"
    msg['From'] = 'vinicius.bpessoa@ufrpe.br'
    msg['To'] = ema
    password = '' 
    msg.add_header('Content-Type', 'text/html')
    msg.set_payload(corpo_email )

    s = smtplib.SMTP('smtp.gmail.com: 587')
    s.starttls()
    # Login Credentials for sending the mail
    s.login(msg['From'], password)
    s.sendmail(msg['From'], [msg['To']], msg.as_string().encode('utf-8'))
    print('Email enviado')

vamanho_nuinvest = 0
while True:
    time.sleep(5)
    vamanho_nuinvest = manda_emails(vamanho_nuinvest)
