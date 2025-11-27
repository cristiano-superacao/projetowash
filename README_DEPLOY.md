# 🚀 Guia de Deploy - Estoque Certo LTDA

Este projeto foi modernizado para funcionar na nuvem com banco de dados PostgreSQL (Neon) e servidor Python Flask.

## 🛠️ Tecnologias Utilizadas

- **Backend:** Python 3.10 + Flask
- **Banco de Dados:** PostgreSQL (Recomendado: Neon.tech)
- **ORM:** SQLAlchemy
- **Frontend:** HTML5, CSS3, JS (PWA)

## ☁️ Opção 1: Deploy no Render (Recomendado)

O Render é a plataforma mais fácil para hospedar aplicações Python Flask com banco de dados.

1. **Crie sua conta no [Render.com](https://render.com)**.
2. **Crie um novo "Web Service"**:
   - Conecte seu repositório GitHub/GitLab.
   - **Runtime:** Python 3
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `gunicorn app:app`
3. **Configure as Variáveis de Ambiente (Environment Variables)**:
   - `DATABASE_URL`: A URL de conexão do seu banco Neon (ex: `postgres://user:pass@ep-xyz.aws.neon.tech/neondb?sslmode=require`)
   - `API_KEY`: Crie uma senha forte para proteger sua API.
   - `PYTHON_VERSION`: `3.10.12`

## ☁️ Opção 2: Deploy no Netlify (Apenas Frontend ou Adaptado)

O Netlify é otimizado para sites estáticos. Para rodar este backend Python nele, seria necessário adaptar para *Netlify Functions*, o que altera a estrutura do projeto.

Se você deseja usar o Netlify apenas para o Frontend:
1. Configure o `API_BASE_URL` no `app.js` para apontar para seu backend no Render.
2. Faça o deploy da pasta `web` no Netlify.

## 🗄️ Configurando o Banco de Dados (Neon)

1. Crie uma conta em [Neon.tech](https://neon.tech).
2. Crie um novo projeto.
3. Copie a **Connection String** (postgres://...).
4. Cole no arquivo `.env` localmente para testar:
   ```
   DATABASE_URL=postgres://seu-usuario:senha@seu-host/neondb?sslmode=require
   ```
5. Adicione a mesma URL nas variáveis de ambiente do seu serviço de hospedagem (Render, Railway, etc).

## 🔒 Segurança

- O sistema agora exige uma **API Key** para todas as operações de escrita.
- A chave é configurada via variável de ambiente `API_KEY`.
- O frontend recebe essa chave automaticamente quando servido pelo Flask.

## 🏃‍♂️ Rodando Localmente

1. Instale as dependências:
   ```bash
   pip install -r requirements.txt
   ```
2. Configure o `.env` (use `.env.example` como base).
3. Execute o servidor:
   ```bash
   python app.py
   ```
4. Acesse `http://localhost:5000`.
