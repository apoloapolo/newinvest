---

# 📈 NewInvest

**NewInvest** é uma plataforma completa e distribuída para monitoramento de ações, projeções de investimentos e educação financeira por meio de um blog informativo.

---

## ⚙️ Módulos do Sistema

O sistema é dividido em **6 módulos** principais, organizados por pastas:

| Módulo          | Descrição                                                                     |
| --------------- | ----------------------------------------------------------------------------- |
| `blog`          | API Flask com sistema de CRUD para posts do blog (banco de dados em memória). |
| `notifications` | Envio de mensagens via Telegram, incluindo autenticação 2FA com bot oficial.  |
| `simulations`   | Simulador de investimentos em ações, permitindo projeções e análises.         |
| `stocks`        | Módulo de back-end para dados de ações em tempo real ou histórico.            |
| `user`          | Módulo Django para gestão de usuários (cadastro, autenticação, login, etc).   |
| `web`           | Front-end da aplicação em React (ou outro framework web escolhido).           |

---

## 📁 Documentação por Módulo

### 📚 `blog`

Sistema simples de gerenciamento de postagens com Flask e armazenamento em memória.

**Estrutura:**

```
blog/
├── bd.py         # Banco de dados em memória (lista de postagens)
├── main.py       # API Flask com endpoints de CRUD
```

**Execução:**

```bash
python main.py
```

---

### ✉️ `notifications`

Envio de mensagens e autenticação de dois fatores (2FA) via Telegram.

**Estrutura:**

```
notifications/
├── api_codigo.py       # API Flask para envio de códigos e verificação
├── BOTnotificacoes.py  # Bot de Telegram para envio de mensagens aos usuários
```

**Execução:**
Execute os dois scripts em paralelo:

```bash
python api_codigo.py
python BOTnotificacoes.py
```

---

### 📊 `simulations`

Simulador de investimentos com base em ações selecionadas pelo usuário.
Permite prever retornos com base em cenários históricos e projeções customizáveis.

**Estrutura:**

```
simulations/
├── main.py           # API principal com regras de simulação
├── calculadora.py    # Lógica de simulação de investimentos
├── utils.py          # Funções auxiliares
```

**Execução:**

```bash
python main.py
```

---

### 📈 `stocks`

Serviço responsável por fornecer dados de ações em tempo real ou históricos, usado por outros módulos como `simulations` e `web`.

**Execução:**

```bash
dale esse comando num terminal (pode ser o cmd ou o powershell), pode não funcionar se o docker desktop não tiver aberto: 
 
docker run --name <insira aqui qualquer nome para o container> -e POSTGRES_PASSWORD=123456 -d -p 5432:5432 postgres 
 
em "<insira aqui qualquer nome para o container>" substituir por um nome pra container pode ser qualquer um só tenta não ser escroto. 
 
vai no vscode e busca nas extensões "postgres" e baixa essa da imagem abaixo. verifica também se a extensão "Docker" já não tá instalada. 
 
vai no icone de database no vscode (debaixo do icone do docker nos botões laterais esquerdos), clica no +, seleciona a tab de postgreSQL, deixa o host o que tá lá msm, a porta é a 5432, o username (se já não tiver) é "postgres" e a senha é 123456, clica em connect e pronto vai aparecer na lista. 
 
expande a conexão, expande postgres, e em public tu clica na folha com a ponta dobrada e coloca isso: 
 
CREATE TABLE public.tb_stock ( 
    id NUMERIC(9) NOT NULL, 
    "date" DATE NOT NULL, 
    "name" VARCHAR(100) NOT NULL, 
    price NUMERIC(8,2) NOT NULL, 
    variation NUMERIC(5,2) NOT NULL, 
    CONSTRAINT tb_stock_pkey PRIMARY KEY (id) 
); 
 
CREATE SEQUENCE hibernate_sequence START 1; 
 
vai aparecer o botão de executar em cima de cada código, executa primeiro o create table e depois o create sequence. 
 
agora sim, finalmente pode rodar o stocks no intellij, é só abrir a pasta do módulo e clicar no botão de rodar, caso não rode (der erro de execução): no intellij dale um f12, e nessa parte ai do print vê se essa opção tá marcada.
```

---

### 👤 `user`

Módulo desenvolvido com Django para controle de autenticação, permissões e dados dos usuários.

**Estrutura:**

```
user/
├── manage.py
├── user/             # Aplicativo principal
│   ├── models.py     # Modelos de usuário
│   ├── views.py      # Endpoints de API
│   ├── urls.py       # Rotas
│   └── ...
├── requirements.txt
```

**Execução (Windows):**

```bash
python -m venv venv
.\venv\Scripts\activate
pip install -r requirements.txt
python manage.py makemigrations usuario
python manage.py migrate
python manage.py runserver
```

*(Adapte o comando de ativação da venv para seu sistema operacional, se necessário.)*

---

### 🌐 `web`

Interface gráfica para interação com o sistema. Permite ao usuário navegar pelas simulações, consultar ações, visualizar o blog e gerenciar sua conta.

**Estrutura:**

```
    Estrutura padrão do angular
```

**Execução (exemplo com React):**

```bash
npm install
ng serve
```

---

## 🧩 Tecnologias Utilizadas

* **Back-end:** Python (Flask, Django)
* **Front-end:** Angular 15
* **Banco de dados:** In-memory (para protótipos), SQLite (Django), CSV (notificações)
* **Mensageria:** Bot do Telegram via API
* **Outros:** Docker (opcional), Git, RESTful APIs
