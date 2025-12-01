# Sistema Quatro Cantos - Gestão Empresarial Completa

[![Netlify Status](https://api.netlify.com/api/v1/badges/YOUR-SITE-ID/deploy-status)](https://app.netlify.com/sites/projetowash/deploys)
![GitHub last commit](https://img.shields.io/github/last-commit/cristiano-superacao/projetowash)
![GitHub repo size](https://img.shields.io/github/repo-size/cristiano-superacao/projetowash)
![Status](https://img.shields.io/badge/status-ativo-success)
![Versão](https://img.shields.io/badge/vers%C3%A3o-2.0-blue)

<div align="center">
  <img src="web/static/icons/icon-192x192.png" alt="Logo Quatro Cantos" width="120"/>
  
  **Sistema completo de gestão empresarial com interface moderna e responsiva**
  
  [📚 Documentação](#documentação) • [🚀 Instalação](#instalação-e-execução) • [💡 Funcionalidades](#funcionalidades) • [🛠️ Tecnologias](#tecnologias)
</div>

---

## 📋 Índice

- [Visão Geral](#visão-geral)
- [Funcionalidades](#funcionalidades)
- [Tecnologias](#tecnologias)
- [Arquitetura](#arquitetura)
- [Instalação e Execução](#instalação-e-execução)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Configuração](#configuração)
- [Modo de Operação](#modo-de-operação)
- [API e Endpoints](#api-e-endpoints)
- [Testes](#testes)
- [Deploy](#deploy)
- [Contribuindo](#contribuindo)
- [Licença](#licença)

---

## 🎯 Visão Geral

O **Quatro Cantos** é um sistema ERP (Enterprise Resource Planning) moderno e completo, desenvolvido para gestão empresarial eficiente. Combina uma interface responsiva e profissional com funcionalidades robustas de backend, oferecendo três modos de operação:

- **🏠 Modo Local**: Dados armazenados no navegador (LocalStorage) - ideal para demos e testes
- **☁️ Modo Firebase**: Integração com Firebase Firestore e Authentication - para produção em nuvem
- **🖥️ Modo Híbrido**: Backend Python + Flask + SQL Database - máximo controle e personalização

### ✨ Destaques

- ✅ **100% Responsivo**: Design adaptável para desktop, tablet e smartphone
- ✅ **PWA (Progressive Web App)**: Instalável em qualquer dispositivo
- ✅ **Modo Offline**: Funciona sem conexão com internet
- ✅ **Multi-segmento**: Suporte para diversos setores empresariais
- ✅ **Segurança**: Sistema de autenticação robusto e permissões por função
- ✅ **Modular**: Arquitetura desacoplada facilita manutenção e expansão

---

## 💡 Funcionalidades

### 📊 Dashboard Executivo
- **KPIs em Tempo Real**: Indicadores de desempenho atualizados automaticamente
- **Gráficos Interativos**: Visualização de dados com Chart.js
- **Alertas Inteligentes**: Notificações de estoque baixo, pedidos pendentes, etc.
- **Resumo Financeiro**: Receitas, despesas e margem de lucro

### 🏭 Módulo Operacional
- **Cálculo de Capacidade Produtiva**: Análise de eficiência por turno
- **Gestão de Turnos**: Configuração e controle de horários de trabalho
- **Relatórios de Produção**: Acompanhamento de metas e resultados
- **Análise de Eficiência**: Identificação de gargalos e oportunidades

### 📦 Módulo de Estoque
- **Controle de Entrada**: Registro detalhado de recebimentos
- **Controle de Saída**: Baixa automática com rastreabilidade
- **Rastreabilidade Total**: Sistema de lote e número de série
- **Inventário em Tempo Real**: Saldo atualizado automaticamente
- **Alertas de Estoque**: Notificação de níveis críticos
- **Relatórios Personalizados**: Movimentação, valuation, giro de estoque

### 💰 Módulo Financeiro
- **Gestão de Custos**: Controle detalhado de despesas
- **Precificação Inteligente**: Cálculo automático de preços de venda
- **Análise de ROI**: Retorno sobre investimento por produto/projeto
- **Fluxo de Caixa**: Projeções e controle de entrada/saída
- **Contas a Pagar/Receber**: Gestão completa de obrigações
- **Relatórios Financeiros**: DRE, Balanço Patrimonial, etc.

### 👥 Módulo de RH
- **Cadastro de Funcionários**: Informações completas e documentação
- **Folha de Pagamento**: Cálculo automático de salários e encargos
- **Gestão de Férias**: Controle de períodos e saldos
- **Banco de Horas**: Registro de horas extras e compensações
- **Avaliações de Desempenho**: Sistema de feedback estruturado
- **Relatórios de RH**: Análises de headcount, turnover, etc.

### 🔍 Módulo de Visualização
- **Relatórios Customizáveis**: Crie seus próprios relatórios
- **Exportação de Dados**: PDF, Excel, CSV
- **Dashboards Personalizados**: Configure visualizações específicas
- **Análises Avançadas**: Cruzamento de dados entre módulos

### 👨‍💼 Módulo Administrativo
- **Gestão de Usuários**: Criação, edição e desativação
- **Controle de Permissões**: Sistema granular de acessos
- **Gestão de Empresas**: Multi-empresa em uma única instalação
- **Configurações do Sistema**: Personalização e parametrização
- **Auditoria**: Log completo de ações dos usuários
- **Backup e Restore**: Proteção de dados integrada

---

## 🛠️ Tecnologias

### Frontend
- **HTML5**: Estrutura semântica e acessível
- **CSS3**: 
  - Design responsivo com Flexbox e Grid
  - Variáveis CSS para temas
  - Animações e transições suaves
- **JavaScript (ES6+)**:
  - Vanilla JS (sem frameworks pesados)
  - Async/Await para operações assíncronas
  - LocalStorage API para persistência local
- **Chart.js 4.4.0**: Gráficos interativos e responsivos
- **Font Awesome 6.4.0**: Biblioteca completa de ícones

### Backend
- **Python 3.8+**: Linguagem principal do backend
- **Flask 3.0+**: Framework web minimalista e eficiente
- **SQLAlchemy**: ORM para manipulação de banco de dados
- **Werkzeug**: Utilidades WSGI e segurança

### Banco de Dados
- **SQLite**: Desenvolvimento e testes
- **PostgreSQL**: Produção (recomendado)
- **Firebase Firestore**: Alternativa NoSQL em nuvem

### PWA & Offline
- **Service Worker**: Cache estratégico para funcionamento offline
- **Web App Manifest**: Instalação em dispositivos
- **Cache API**: Armazenamento local de assets

### Ferramentas de Desenvolvimento
- **Git**: Controle de versão
- **Netlify**: Deploy contínuo
- **VS Code**: Editor recomendado

---

## 🏗️ Arquitetura

```
┌─────────────────────────────────────────────────────────┐
│                    CAMADA DE APRESENTAÇÃO                │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌─────────┐ │
│  │   HTML   │  │   CSS    │  │    JS    │  │  Icons  │ │
│  └──────────┘  └──────────┘  └──────────┘  └─────────┘ │
└─────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│                   CAMADA DE APLICAÇÃO                    │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐ │
│  │   app.js    │  │   auth.js   │  │   modules.js    │ │
│  │ (Controller)│  │(Autenticação)│  │(Lógica Negócio)│ │
│  └─────────────┘  └─────────────┘  └─────────────────┘ │
└─────────────────────────────────────────────────────────┘
                           │
                ┌──────────┼──────────┐
                ▼          ▼          ▼
┌──────────────────┐  ┌─────────┐  ┌─────────────┐
│  LocalStorage    │  │Firebase │  │Flask Backend│
│  (Modo Local)    │  │(Nuvem)  │  │ (Híbrido)   │
└──────────────────┘  └─────────┘  └─────────────┘
```

### Padrões de Design
- **MVC (Model-View-Controller)**: Separação de responsabilidades
- **Module Pattern**: Encapsulamento de funcionalidades
- **Observer Pattern**: Sistema de eventos e notificações
- **Singleton**: Instância única de serviços críticos

---

## 📥 Instalação e Execução

### Pré-requisitos
- **Python 3.8+** (para modo híbrido/backend)
- **Git** (para clonar o repositório)
- **Navegador moderno** (Chrome, Firefox, Edge, Safari)

### Opção 1: Modo Local (Apenas Frontend)

```bash
# 1. Clone o repositório
git clone https://github.com/cristiano-superacao/projetowash.git
cd projetowash

# 2. Abra o arquivo web/index.html no navegador
# Ou use um servidor HTTP simples:
cd web
python -m http.server 8000

# 3. Acesse http://localhost:8000
```

### Opção 2: Modo Híbrido (Frontend + Backend Python)

```bash
# 1. Clone o repositório
git clone https://github.com/cristiano-superacao/projetowash.git
cd projetowash

# 2. Crie um ambiente virtual (recomendado)
python -m venv .venv

# 3. Ative o ambiente virtual
# Windows:
.venv\Scripts\activate
# Linux/Mac:
source .venv/bin/activate

# 4. Instale as dependências
pip install -r requirements.txt

# 5. Execute o servidor Flask
python app.py

# 6. Acesse http://localhost:5000
```

### Opção 3: Deploy em Produção (Netlify)

```bash
# 1. Conecte seu repositório ao Netlify
# 2. Configure:
#    - Build command: (deixe vazio)
#    - Publish directory: web
# 3. Deploy automático a cada push na branch main
```

---

## 📁 Estrutura do Projeto

```
projetowash/
├── 📄 app.py                      # Servidor Flask principal
├── 📄 requirements.txt            # Dependências Python
├── 📄 netlify.toml               # Configuração Netlify
├── 📄 README.md                  # Documentação principal
│
├── 📂 src/                       # Código-fonte backend
│   ├── 📄 operacional.py         # Módulo operacional
│   ├── 📄 estoque_entrada.py     # Controle de entrada
│   ├── 📄 estoque_saida.py       # Controle de saída
│   ├── 📄 financeiro.py          # Gestão financeira
│   ├── 📄 rh.py                  # Recursos humanos
│   └── 📄 main.py                # CLI principal
│
└── 📂 web/                       # Frontend da aplicação
    ├── 📄 index.html             # Página principal
    │
    ├── 📂 static/                # Assets estáticos
    │   │
    │   ├── 📂 css/               # Folhas de estilo
    │   │   ├── 📄 style.css      # Estilos principais (v13)
    │   │   ├── 📄 auth.css       # Autenticação
    │   │   ├── 📄 dashboard.css  # Dashboard
    │   │   ├── 📄 segments.css   # Segmentos
    │   │   └── 📄 admin.css      # Administração
    │   │
    │   ├── 📂 js/                # Scripts JavaScript
    │   │   ├── 📄 app.js         # Aplicação principal (v9)
    │   │   ├── 📄 auth.js        # Autenticação (v13)
    │   │   ├── 📄 local-auth.js  # Auth local (v5.0/v13)
    │   │   ├── 📄 local-firestore.js # Firestore local (v8)
    │   │   ├── 📄 modules.js     # Loader de módulos (v9)
    │   │   ├── 📄 dashboard.js   # Dashboard (v9)
    │   │   ├── 📄 admin-module.js # Admin (v9)
    │   │   ├── 📄 pwa.js         # PWA (v9)
    │   │   ├── 📄 segments-config.js # Segmentos (v6)
    │   │   │
    │   │   └── 📂 modules/       # Módulos individuais
    │   │       ├── 📄 operacional.js
    │   │       ├── 📄 estoque_entrada.js
    │   │       ├── 📄 estoque_saida.js
    │   │       ├── 📄 financeiro.js
    │   │       ├── 📄 rh.js
    │   │       └── 📄 visualizar.js
    │   │
    │   ├── 📂 icons/             # Ícones PWA
    │   │   ├── 🖼️ icon-72x72.png
    │   │   ├── 🖼️ icon-96x96.png
    │   │   ├── 🖼️ icon-128x128.png
    │   │   ├── 🖼️ icon-144x144.png
    │   │   ├── 🖼️ icon-152x152.png
    │   │   ├── 🖼️ icon-192x192.png
    │   │   ├── 🖼️ icon-384x384.png
    │   │   └── 🖼️ icon-512x512.png
    │   │
    │   ├── 📄 manifest.json      # Web App Manifest
    │   └── 📄 service-worker.js  # Service Worker (v16)
    │
    └── 📂 templates/             # Templates HTML (Flask)
        └── 📄 index.html         # Template principal
```

---

## ⚙️ Configuração

### Usuários Padrão (Modo Local)

O sistema vem pré-configurado com usuários para teste:

| Usuário | Email | Senha | Função |
|---------|-------|-------|--------|
| **Super Admin** | `superadmin@quatrocantos.com` | `admin@2025` | superadmin |
| **Admin** | `admin@local.com` | `admin123` | admin |
| **Alice** | `alice@gmail.com` | `alice123` | admin |
| **Superação** | `superacao@gmail.com` | `super123` | admin |

### Configuração Firebase (Opcional)

Para usar o modo Firebase, configure as credenciais em `web/static/js/firebase-config.js`:

```javascript
const firebaseConfig = {
    apiKey: "SUA_API_KEY",
    authDomain: "SEU_PROJECT.firebaseapp.com",
    projectId: "SEU_PROJECT_ID",
    storageBucket: "SEU_PROJECT.appspot.com",
    messagingSenderId: "SEU_SENDER_ID",
    appId: "SEU_APP_ID"
};
```

E descomente as linhas no `web/index.html`:

```html
<!-- <script src="/static/js/firebase-config.js?v=6"></script> -->
<!-- <script src="/static/js/firestore-service.js?v=6"></script> -->
```

### Variáveis de Ambiente (Backend)

Crie um arquivo `.env` na raiz do projeto:

```env
FLASK_ENV=development
FLASK_DEBUG=1
SECRET_KEY=sua_chave_secreta_aqui
DATABASE_URL=postgresql://user:pass@localhost/dbname
```

---

## 🔄 Modo de Operação

### 1. Modo Local (Navegador)
- ✅ **Vantagens**: Sem necessidade de servidor, funciona offline, ideal para demos
- ❌ **Limitações**: Dados apenas no dispositivo, não sincroniza entre usuários
- 📍 **Uso**: Testes, demonstrações, POCs

### 2. Modo Firebase (Nuvem)
- ✅ **Vantagens**: Sincronização em tempo real, escalável, sem gerenciar servidor
- ❌ **Limitações**: Custos por uso, dependência de serviço terceiro
- 📍 **Uso**: Pequenas empresas, startups, MVPs

### 3. Modo Híbrido (Flask + SQL)
- ✅ **Vantagens**: Controle total, personalização máxima, segurança robusta
- ❌ **Limitações**: Requer infraestrutura, manutenção de servidor
- 📍 **Uso**: Empresas médias/grandes, requisitos específicos

---

## 🌐 API e Endpoints

### Autenticação
```http
POST /api/auth/login
POST /api/auth/register
POST /api/auth/logout
```

### Estoque
```http
GET    /api/estoque/produtos
POST   /api/estoque/entrada
POST   /api/estoque/saida
GET    /api/estoque/movimentacao
```

### Financeiro
```http
GET    /api/financeiro/dashboard
POST   /api/financeiro/custos
GET    /api/financeiro/relatorio
```

### RH
```http
GET    /api/rh/funcionarios
POST   /api/rh/folha-pagamento
PUT    /api/rh/funcionarios/:id
```

*Documentação completa da API disponível em `/api/docs` quando o servidor Flask está rodando.*

---

## 🧪 Testes

### Executar Testes Unitários

```bash
# Instalar pytest
pip install pytest pytest-cov

# Executar todos os testes
pytest

# Executar com cobertura
pytest --cov=src --cov-report=html

# Executar testes específicos
pytest tests/test_estoque.py
```

### Estrutura de Testes

```
tests/
├── test_estoque_entrada.py
├── test_estoque_saida.py
├── test_financeiro.py
├── test_rh.py
└── test_operacional.py
```

---

## 🚀 Deploy

### Deploy Automático (Netlify)

O repositório está configurado para deploy automático:

1. **Conecte o repositório** ao Netlify
2. **Configuração automática** via `netlify.toml`
3. **Deploy na branch main** - automático a cada push
4. **URL**: https://projetowash.netlify.app

### Deploy Manual (Servidor Próprio)

```bash
# 1. Instale um servidor WSGI (Gunicorn)
pip install gunicorn

# 2. Execute em produção
gunicorn -w 4 -b 0.0.0.0:8000 app:app

# 3. Configure Nginx como proxy reverso
# (veja documentação completa em DEPLOY_GUIDE.md)
```

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. **Fork** o projeto
2. **Crie uma branch** para sua feature (`git checkout -b feature/MinhaFeature`)
3. **Commit suas mudanças** (`git commit -m 'Adiciona MinhaFeature'`)
4. **Push para a branch** (`git push origin feature/MinhaFeature`)
5. **Abra um Pull Request**

### Padrões de Código
- **Python**: Siga PEP 8
- **JavaScript**: Use ESLint com Airbnb Style Guide
- **CSS**: BEM naming convention
- **Commits**: Conventional Commits (feat, fix, docs, style, refactor, test, chore)

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

---

## 👥 Autores e Contato

**Cristiano Superação**
- GitHub: [@cristiano-superacao](https://github.com/cristiano-superacao)
- Email: cristiano@quatrocantos.com

**Quatro Cantos - Gestão Empresarial**
- Website: https://quatrocantos.com
- Suporte: suporte@quatrocantos.com

---

## 🙏 Agradecimentos

- Comunidade open-source
- Contribuidores do projeto
- Empresas parceiras que testaram o sistema

---

## 📊 Status do Projeto

- ✅ **Versão Atual**: 2.0
- ✅ **Status**: Ativo e em desenvolvimento
- ✅ **Última Atualização**: Dezembro 2025
- ✅ **Próximas Features**: 
  - Integração com APIs de pagamento
  - Módulo de CRM
  - Aplicativo mobile nativo
  - Inteligência artificial para previsões

---

<div align="center">
  
  **Desenvolvido com ❤️ pela equipe Quatro Cantos**
  
  © 2025 Quatro Cantos. Todos os direitos reservados.
  
  [⬆ Voltar ao topo](#sistema-quatro-cantos---gestão-empresarial-completa)
  
</div>

## Deploy Automático

**Deploy contínuo configurado!** Toda alteração na branch `main` é automaticamente publicada no Netlify.

- **URL Produção**: https://projetowash.netlify.app
- **Painel Netlify**: https://app.netlify.com/sites/projetowash
- **Configuração**: Veja [DEPLOY_GUIDE.md](./DEPLOY_GUIDE.md) para instruções detalhadas

## Visão Geral

O sistema foi projetado para ser flexível, funcionando tanto como uma aplicação completa com backend Python (Flask) quanto como uma aplicação web estática (PWA) que pode ser hospedada em serviços como Netlify ou Vercel.

### Atualizações Recentes (Novembro 2025)
- **Interface de Autenticação Modernizada**: Formulário de cadastro redesenhado com ícones posicionados internamente à esquerda, esquema de cores profissional (azul #3b82f6 para labels, cinza claro #f9fafb para inputs) e botão com gradiente dinâmico (azul→vermelho→laranja)
- **Refatoração Backend**: Lógica de negócio separada da interface CLI nos módulos `estoque_entrada.py` e `estoque_saida.py`
- **Otimização CSS**: Eliminação de duplicatas, consolidação de estilos e melhor organização do código
- **Service Worker v7**: Cache atualizado para garantir carregamento de arquivos mais recentes
- **Correções de Encoding**: Todos os arquivos Python convertidos para UTF-8 com BOM

### Módulos Principais
- **Dashboard**: Visão geral com gráficos e indicadores de desempenho (KPIs).
- **Operacional**: Cálculo de capacidade produtiva e eficiência de turnos.
- **Estoque**: Controle de entrada e saída com rastreabilidade (Lote/Serial).
- **Financeiro**: Gestão de custos, precificação e análise de ROI.
- **RH**: Gestão de funcionários e folha de pagamento automatizada.

## Tecnologias

- **Frontend**: HTML5, CSS3 (Design Responsivo), JavaScript (ES6+).
- **Backend (Opcional)**: Python 3.x, Flask, SQLAlchemy.
- **Persistência**:
  - **Modo Local**: LocalStorage (Navegador) - Ideal para demos e testes.
  - **Modo Nuvem**: Firebase (Firestore/Auth) - Para produção distribuída.
  - **Modo Híbrido**: Banco de Dados SQL (PostgreSQL/SQLite) via Flask.

## Instalação e Execução

### Opção 1: Rodar Localmente (Python)
Ideal para desenvolvimento e acesso a todas as funcionalidades de backend.

1. **Pré-requisitos**: Python 3.8+ instalado.
2. **Instalar dependências**:
   ```bash
   pip install -r requirements.txt
   ```
3. **Executar o servidor**:
   ```bash
   python app.py
   ```
4. **Acessar**: Abra `http://localhost:5000` no navegador.

### Opção 2: Hospedagem Estática (Netlify/Vercel)
O projeto já está configurado para deploy automático.

1. **Configuração**: O arquivo `netlify.toml` define a pasta `web` como diretório de publicação.
2. **Deploy**: Conecte este repositório ao Netlify. O sistema funcionará automaticamente em **Modo Local** (dados salvos no navegador do usuário).
3. **Produção**: Para persistência em nuvem sem backend Python, configure as credenciais do Firebase em `web/static/js/firebase-config.js` e descomente as linhas correspondentes em `web/index.html`.

## Acesso (Modo Local)

O sistema vem pré-configurado com um usuário administrador para testes locais:

- **Email**: `admin@local.com`
- **Senha**: `admin123`

## PWA (Progressive Web App)

Este sistema é instalável! Em dispositivos móveis ou desktop (Chrome/Edge), procure pelo ícone de instalação na barra de endereços para adicionar o **Quatro Cantos** à sua tela inicial.

## Interface e Design

### Formulário de Autenticação
- **Ícones FontAwesome 6.4.0**: Posicionados à esquerda dentro dos campos (user, envelope, lock, briefcase)
- **Paleta de Cores Profissional**:
  - Labels: Azul primário (#3b82f6)
  - Inputs: Fundo cinza claro (#f9fafb), borda #e5e7eb
  - Botão Criar Conta: Gradiente linear (azul→vermelho→laranja)
- **Layout Responsivo**: Breakpoints otimizados para mobile, tablet e desktop
- **Acessibilidade**: Placeholders informativos e labels claras

### Estrutura de Arquivos Frontend
```
web/
├── index.html              # Página principal
├── static/
│   ├── css/
│   │   ├── style.css       # Estilos principais (v7)
│   │   ├── auth.css        # Estilos de autenticação
│   │   └── dashboard.css   # Estilos do painel
│   ├── js/
│   │   ├── app.js          # Controlador principal
│   │   ├── auth.js         # Lógica de autenticação
│   │   ├── local-auth.js   # Autenticação local
│   │   └── modules.js      # Módulos do sistema
│   └── service-worker.js   # PWA Service Worker (v7)
```

## Estrutura Backend

### Módulos Python
- **app.py**: Servidor Flask principal com rotas e inicialização do banco de dados
- **src/estoque_entrada.py**: Lógica de registro de entrada de produtos (função `registrar_entrada_produto`)
- **src/estoque_saida.py**: Lógica de registro de saída de produtos (função `registrar_saida_produto`)
- **src/operacional.py**: Cálculos de capacidade produtiva
- **src/financeiro.py**: Gestão financeira e precificação
- **src/rh.py**: Gestão de recursos humanos

### Refatoração Recente
Os módulos de estoque foram refatorados para separar a lógica de negócio da interface CLI:
- Funções puras que retornam dados estruturados
- Independentes de `input()` e `print()`
- Prontas para integração com APIs REST ou interfaces gráficas
- Tratamento robusto de erros com dicionários de status

---
© 2025 Quatro Cantos. Todos os direitos reservados.
