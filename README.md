# 🏢 Sistema Quatro Cantos - Gestão Empresarial Completa

<div align="center">

![Status](https://img.shields.io/badge/status-ativo-success)
![Versão](https://img.shields.io/badge/versão-2.0.1-blue)
![Python](https://img.shields.io/badge/Python-3.8+-blue?logo=python)
![Flask](https://img.shields.io/badge/Flask-3.0+-black?logo=flask)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow?logo=javascript)
![License](https://img.shields.io/badge/license-MIT-green)

**Sistema ERP moderno, versátil e com interface profissional responsiva**

[📚 Documentação](#documentação) • [🚀 Instalação](#instalação) • [💡 Funcionalidades](#funcionalidades) • [🛠️ Tecnologias](#tecnologias)

</div>

---

## 📋 Índice

- [Visão Geral](#-visão-geral)
- [Funcionalidades](#-funcionalidades)
- [Tecnologias](#-tecnologias)
- [Arquitetura](#-arquitetura)
- [Instalação](#-instalação)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Configuração](#-configuração)
- [Uso](#-uso)
- [API Endpoints](#-api-endpoints)
- [Deploy](#-deploy)
- [Testes](#-testes)
- [Contribuindo](#-contribuindo)
- [Licença](#-licença)

---

## 🎯 Visão Geral

O **Quatro Cantos** é um sistema ERP (Enterprise Resource Planning) completo e moderno, desenvolvido para gestão empresarial eficiente. Combina uma interface web responsiva com um backend robusto em Python/Flask e banco de dados SQL.

### ✨ Destaques

- ✅ **Interface Responsiva**: Design adaptável para desktop, tablet e smartphone
- ✅ **PWA**: Progressive Web App instalável em qualquer dispositivo
- ✅ **Modo Offline**: Service Worker para funcionamento sem internet
- ✅ **API REST**: Endpoints bem documentados e seguros
- ✅ **Autenticação Simples**: Sistema de login local para demos e testes
- ✅ **Múltiplos Módulos**: Operacional, Estoque, Financeiro, RH e Visualização

---

## 💡 Funcionalidades

### 📊 Dashboard Executivo
- KPIs em tempo real
- Gráficos interativos (Chart.js)
- Alertas inteligentes de estoque
- Resumo financeiro consolidado

### 🏭 Módulo Operacional
- Cálculo de capacidade produtiva por turno
- Gestão de turnos de trabalho
- Relatórios de produção
- Análise de eficiência operacional

### 📦 Módulo de Estoque
- **Controle de Entrada**: Cadastro e atualização de produtos
- **Controle de Saída**: Registro de vendas com baixa automática
- **Rastreabilidade**: Sistema de lotes e números de série
- **Inventário**: Saldo atualizado em tempo real
- **Relatórios**: Movimentação, valuation e giro de estoque

### 💰 Módulo Financeiro
- Gestão de custos (água, luz, impostos, salários)
- Cálculo automático de precificação
- Análise de ROI e margem de lucro
- Projeções de receita mensal e anual
- Indicadores de ponto de equilíbrio

### 👥 Módulo de RH
- Cadastro completo de funcionários
- Cálculo de folha de pagamento
- INSS, IR e encargos patronais automáticos
- Gestão de horas extras
- CRUD completo (Create, Read, Update, Delete)

### 🔍 Módulo de Visualização
- Relatórios customizáveis
- Exportação de dados (PDF, Excel, CSV)
- Dashboards personalizados
- Análises comparativas

---

## 🛠️ Tecnologias

### Frontend
- **HTML5** - Estrutura semântica
- **CSS3** - Design responsivo, Flexbox, Grid
- **JavaScript (ES6+)** - Vanilla JS, Async/Await
- **Chart.js 4.4.0** - Gráficos interativos
- **Font Awesome 6.4.0** - Ícones

### Backend
- **Python 3.8+** - Linguagem principal
- **Flask 3.0+** - Framework web
- **SQLAlchemy 2.0+** - ORM
- **Flask-CORS** - Cross-Origin Resource Sharing
- **Gunicorn** - WSGI HTTP Server (produção)

### Banco de Dados
- **SQLite** - Desenvolvimento e testes
- **PostgreSQL** - Produção (recomendado)

### PWA & Offline
- **Service Worker** - Cache offline (v16)
- **Web App Manifest** - Instalação nativa
- **Cache API** - Armazenamento de assets

### Segurança
- **API Key Authentication** - Proteção de endpoints
- **RBAC** - Role-Based Access Control (admin, manager, user)
- **CORS** - Configuração segura de origens

---

## 🏗️ Arquitetura

```
┌─────────────────────────────────────────────────────────┐
│                 CAMADA DE APRESENTAÇÃO                   │
│  ┌────────┐  ┌────────┐  ┌─────────┐  ┌────────────┐  │
│  │  HTML  │  │  CSS   │  │   JS    │  │  Chart.js  │  │
│  └────────┘  └────────┘  └─────────┘  └────────────┘  │
└─────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│                  CAMADA DE APLICAÇÃO                     │
│  ┌──────────────┐  ┌──────────────┐  ┌─────────────┐  │
│  │   app.js     │  │   auth.js    │  │  modules.js │  │
│  │ (Controller) │  │(Autenticação)│  │  (Lógica)   │  │
│  └──────────────┘  └──────────────┘  └─────────────┘  │
└─────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│                   CAMADA DE API REST                     │
│  ┌──────────────────────────────────────────────────┐  │
│  │              Flask (app.py)                       │  │
│  │  Endpoints: /api/operacional, /api/estoque, etc │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│                  CAMADA DE NEGÓCIO                       │
│  ┌────────────┐  ┌────────────┐  ┌────────────────┐   │
│  │operacional │  │ financeiro │  │ estoque_*.py   │   │
│  │    .py     │  │    .py     │  │     rh.py      │   │
│  └────────────┘  └────────────┘  └────────────────┘   │
└─────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│                CAMADA DE PERSISTÊNCIA                    │
│  ┌──────────────────────────────────────────────────┐  │
│  │  SQLAlchemy ORM + SQLite/PostgreSQL              │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

### Padrões de Design
- **MVC** - Model-View-Controller
- **Module Pattern** - Encapsulamento de funcionalidades
- **Observer Pattern** - Sistema de eventos
- **Singleton** - Instância única de serviços

---

## 📥 Instalação

### Pré-requisitos
- **Python 3.8+**
- **Git**
- **Navegador moderno** (Chrome, Firefox, Edge, Safari)

### Instalação Local

```bash
# 1. Clone o repositório
git clone https://github.com/cristiano-superacao/projetowash.git
cd projetowash

# 2. Crie um ambiente virtual
python -m venv .venv

# 3. Ative o ambiente virtual
# Windows:
.venv\Scripts\activate
# Linux/Mac:
source .venv/bin/activate

# 4. Instale as dependências
pip install -r requirements.txt

# 5. Execute o servidor
python app.py

# 6. Acesse no navegador
# http://localhost:5000
```

---

## 📁 Estrutura do Projeto

```
projetowash/
├── 📄 app.py                      # Servidor Flask principal
├── 📄 requirements.txt            # Dependências Python
├── 📄 package.json                # Metadados do projeto
├── 📄 pytest.ini                  # Configuração de testes
├── 📄 .env.example                # Exemplo de variáveis de ambiente
├── 📄 .gitignore                  # Arquivos ignorados pelo Git
│
├── 📂 config/                     # Arquivos de configuração
│   ├── 📄 .env.example            # Template de variáveis de ambiente
│   ├── 📄 firebase.json           # Configuração Firebase
│   ├── 📄 firestore.indexes.json # Índices Firestore
│   ├── 📄 firestore.rules         # Regras de segurança Firestore
│   └── 📄 netlify.toml            # Configuração Netlify
│
├── 📂 scripts/                    # Scripts utilitários
│   ├── 📄 analyze_code.py         # Análise de código
│   ├── 📄 configure-netlify.ps1   # Setup Netlify
│   └── 📄 generate_hashes.html    # Gerador de hashes
│
├── 📂 src/                        # Código-fonte backend
│   ├── 📄 database.py             # Models e ORM
│   ├── 📄 auth_utils.py           # Utilitários de autenticação
│   ├── 📄 operacional.py          # Lógica operacional
│   ├── 📄 estoque_entrada.py      # Controle de entrada
│   ├── 📄 estoque_saida.py        # Controle de saída
│   ├── 📄 financeiro.py           # Gestão financeira
│   ├── 📄 rh.py                   # Recursos humanos
│   └── 📄 main.py                 # CLI principal
│
├── 📂 tests/                      # Testes automatizados
│   ├── 📄 test_estoque_entrada.py
│   ├── 📄 test_estoque_saida.py
│   ├── 📄 test_financeiro.py
│   └── 📄 test_rh.py
│
├── 📂 docs/                       # Documentação adicional
│
└── 📂 web/                        # Frontend da aplicação
    ├── 📄 index.html              # Página principal
    │
    └── 📂 static/                 # Assets estáticos
        │
        ├── 📂 css/                # Folhas de estilo
        │   ├── 📄 style.css       # Estilos principais (v13)
        │   ├── 📄 auth.css        # Autenticação
        │   ├── 📄 dashboard.css   # Dashboard
        │   └── 📄 admin.css       # Administração
        │
        ├── 📂 js/                 # Scripts JavaScript
        │   ├── 📄 app.js          # Aplicação principal (v9)
        │   ├── 📄 auth.js         # Autenticação (v13)
        │   ├── 📄 local-auth.js   # Auth local (v5.0)
        │   ├── 📄 local-firestore.js # Firestore local (v8)
        │   ├── 📄 modules.js      # Loader de módulos (v9)
        │   ├── 📄 dashboard.js    # Dashboard (v9)
        │   ├── 📄 pwa.js          # PWA (v9)
        │   │
        │   └── 📂 modules/        # Módulos individuais
        │       ├── 📄 operacional.js
        │       ├── 📄 estoque_entrada.js
        │       ├── 📄 estoque_saida.js
        │       ├── 📄 financeiro.js
        │       ├── 📄 rh.js
        │       └── 📄 visualizar.js
        │
        ├── 📂 icons/              # Ícones PWA
        │   ├── 🖼️ icon-72x72.png
        │   ├── 🖼️ icon-96x96.png
        │   ├── 🖼️ icon-128x128.png
        │   ├── 🖼️ icon-144x144.png
        │   ├── 🖼️ icon-192x192.png
        │   ├── 🖼️ icon-384x384.png
        │   └── 🖼️ icon-512x512.png
        │
        ├── 📄 manifest.json       # Web App Manifest
        └── 📄 service-worker.js   # Service Worker (v16)
```

---

## ⚙️ Configuração

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
# Servidor Flask
FLASK_ENV=development
FLASK_DEBUG=1
SECRET_KEY=sua_chave_secreta_muito_forte_aqui

# Banco de Dados
DATABASE_URL=sqlite:///estoque.db
# Para PostgreSQL: postgresql://user:pass@localhost/dbname

# Segurança da API
API_KEY=sua_api_key_aqui

# Opcional: Firebase
FIREBASE_PROJECT_ID=seu_projeto_firebase
```

### Usuários Padrão (Modo Local)

O sistema vem pré-configurado com usuários para teste em modo local:

| Usuário | Email | Senha | Função |
|---------|-------|-------|--------|
| **Super Admin** | superadmin@quatrocantos.com | admin@2025 | superadmin |
| **Admin** | admin@local.com | admin123 | admin |
| **Alice** | alice@gmail.com | alice123 | admin |
| **Superação** | superacao@gmail.com | super123 | admin |

> ⚠️ **IMPORTANTE**: Senhas em texto simples são **APENAS** para ambiente de desenvolvimento/demo local. Em produção, use Firebase Authentication ou implemente hashing seguro (bcrypt).

---

## 🚀 Uso

### Iniciar o Servidor

```bash
# Modo desenvolvimento (com hot reload)
python app.py

# Modo produção (com Gunicorn)
gunicorn -w 4 -b 0.0.0.0:8000 app:app
```

### Acessar a Aplicação

1. Abra o navegador em `http://localhost:5000`
2. Faça login com um dos usuários padrão
3. Explore os módulos disponíveis no dashboard

### Instalar como PWA

1. No navegador, clique no ícone de instalação (barra de endereço)
2. Confirme a instalação
3. O app aparecerá como aplicativo nativo no seu dispositivo

---

## 📡 API Endpoints

### Autenticação

```http
# Nota: Autenticação local usa LocalStorage (frontend)
# Para produção, implemente JWT ou use Firebase Auth
```

### Módulo Operacional

```http
POST /api/operacional/calcular
Content-Type: application/json
X-API-KEY: sua_api_key

{
  "turnos": 2
}

Response:
{
  "success": true,
  "data": {
    "horas_dia": 16,
    "dias_mes": 22,
    "horas_mes": 352,
    "producao_hora": 125,
    "producao_dia": 2000,
    "producao_mes": 44000
  }
}
```

### Módulo Estoque

```http
# Listar produtos
GET /api/estoque/produtos

# Cadastrar produto (Requer manager+)
POST /api/estoque/entrada
X-API-KEY: sua_api_key
X-User-Role: manager

{
  "codigo": 101,
  "nome": "Produto A",
  "quantidade": 100,
  "valor": 50.00,
  "fornecedor": "Fornecedor X"
}

# Registrar saída
POST /api/estoque/saida
X-API-KEY: sua_api_key

{
  "nome": "Produto A",
  "quantidade": 10
}
```

### Módulo Financeiro

```http
POST /api/financeiro/calcular
X-API-KEY: sua_api_key

{
  "agua": 2000,
  "luz": 5000,
  "impostos": 3000,
  "salarios": 15000,
  "total_pallets": 1000
}
```

### Módulo RH

```http
# Listar funcionários
GET /api/rh/funcionarios

# Cadastrar funcionário (Requer manager+)
POST /api/rh/funcionarios
X-API-KEY: sua_api_key
X-User-Role: manager

{
  "nome": "João Silva",
  "cargo": "Operador de Empilhadeira",
  "admissao": "2025-01-01"
}

# Calcular folha de pagamento
POST /api/rh/calcular
X-API-KEY: sua_api_key

{
  "funcionarios": [
    {
      "nome": "João Silva",
      "cargo": "Operador de Empilhadeira",
      "horas_extras": 10
    }
  ]
}

# Excluir funcionário (Requer admin)
DELETE /api/rh/funcionarios/:id
X-API-KEY: sua_api_key
X-User-Role: admin
```

---

## 🌐 Deploy

### Netlify (Frontend Estático)

O repositório está configurado para deploy automático no Netlify:

```bash
# 1. Conecte seu repositório ao Netlify
# 2. Configure (já está no netlify.toml):
#    - Build command: echo 'Build concluido'
#    - Publish directory: web
# 3. Deploy automático a cada push na branch main
```

### Heroku (Backend Flask)

```bash
# 1. Instale Heroku CLI
# 2. Crie o app
heroku create seu-app-name

# 3. Configure variáveis de ambiente
heroku config:set FLASK_ENV=production
heroku config:set SECRET_KEY=sua_chave_secreta
heroku config:set API_KEY=sua_api_key

# 4. Deploy
git push heroku main
```

### Docker

```dockerfile
# Dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 5000

CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:5000", "app:app"]
```

```bash
# Build e run
docker build -t quatro-cantos .
docker run -p 5000:5000 --env-file .env quatro-cantos
```

---

## 🧪 Testes

### Executar Testes

```bash
# Instalar pytest
pip install pytest pytest-cov

# Executar todos os testes
pytest

# Executar com cobertura
pytest --cov=src --cov-report=html

# Executar testes específicos
pytest tests/test_estoque_entrada.py -v
```

### Estrutura de Testes

```
tests/
├── test_estoque_entrada.py   # Testes de cadastro de produtos
├── test_estoque_saida.py     # Testes de vendas/saídas
├── test_financeiro.py         # Testes de cálculos financeiros
└── test_rh.py                 # Testes de RH e folha
```

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. **Fork** o projeto
2. **Crie uma branch** para sua feature (`git checkout -b feature/MinhaFeature`)
3. **Commit** suas mudanças (`git commit -m 'feat: Adiciona MinhaFeature'`)
4. **Push** para a branch (`git push origin feature/MinhaFeature`)
5. **Abra um Pull Request**

### Padrões de Código
- **Python**: PEP 8
- **JavaScript**: ESLint (Airbnb Style Guide)
- **CSS**: BEM naming convention
- **Commits**: Conventional Commits (feat, fix, docs, style, refactor, test, chore)

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

```
MIT License

Copyright (c) 2025 Quatro Cantos

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 👥 Autores e Contato

**Cristiano Superação**
- GitHub: [@cristiano-superacao](https://github.com/cristiano-superacao)
- Email: cristiano.s.santos@ba.estudante.senai.br

**Quatro Cantos - Gestão Empresarial**
- Website: [Em construção]
- Suporte: suporte@quatrocantos.com

---

## 🙏 Agradecimentos

- Comunidade open-source
- Contribuidores do projeto
- Empresas parceiras que testaram o sistema
- SENAI - Formação técnica

---

## 📊 Status do Projeto

- ✅ **Versão Atual**: 2.0.1
- ✅ **Status**: Ativo e em desenvolvimento
- ✅ **Última Atualização**: Dezembro 2025
- ✅ **Próximas Features**: 
  - Integração com APIs de pagamento
  - Módulo de CRM
  - Aplicativo mobile nativo (React Native)
  - Dashboard com IA e machine learning
  - Integração com ERPs de terceiros

---

## 🔒 Segurança

### Reporte de Vulnerabilidades

Se você descobrir uma vulnerabilidade de segurança, por favor **NÃO** abra uma issue pública. Envie um email para:

📧 **security@quatrocantos.com**

Responderemos em até 48 horas.

### Boas Práticas Implementadas

- ✅ API Key Authentication
- ✅ RBAC (Role-Based Access Control)
- ✅ CORS configurado adequadamente
- ✅ Headers de segurança (X-Frame-Options, CSP, etc.)
- ✅ Validação de inputs
- ✅ Proteção contra SQL Injection (SQLAlchemy ORM)
- ⚠️ **TODO**: Implementar hashing de senhas (bcrypt) para produção

---

## 📚 Documentação Adicional

- [CHANGELOG.md](./CHANGELOG.md) - Histórico de versões
- [CONTRIBUTING.md](./CONTRIBUTING.md) - Guia de contribuição
- [API_DOCS.md](./docs/API_DOCS.md) - Documentação completa da API
- [DEPLOY_GUIDE.md](./docs/DEPLOY_GUIDE.md) - Guia detalhado de deploy

---

<div align="center">

**Desenvolvido com ❤️ pela equipe Quatro Cantos**

© 2025 Quatro Cantos. Todos os direitos reservados.

[⬆ Voltar ao topo](#-sistema-quatro-cantos---gestão-empresarial-completa)

</div>
