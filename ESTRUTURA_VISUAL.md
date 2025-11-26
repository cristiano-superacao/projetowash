# SISTEMA ESTOQUE CERTO LTDA v2.0
## Arquitetura Completa e Fluxo de Dados

```
================================================================================
                         ARQUITETURA DO SISTEMA v2.0
================================================================================

                                USUARIO
                                   |
                                   v
                    +-----------------------------+
                    |      NETLIFY CDN GLOBAL    |
                    |   (HTML, CSS, JavaScript)  |
                    +-----------------------------+
                                   |
                +------------------+------------------+
                |                                     |
                v                                     v
    +----------------------+            +------------------------+
    |  FIREBASE AUTH       |            |   CLOUD FIRESTORE DB   |
    |  - Login/Cadastro    |            |   - Usuarios           |
    |  - Recuperar Senha   |            |   - Estoque            |
    |  - Tokens JWT        |            |   - Movimentacoes      |
    |  - Sessoes           |            |   - Financeiro         |
    +----------------------+            |   - Folha Pagamento    |
                                        |   - Backups            |
                                        +------------------------+
                                                   |
                                                   v
                                        +------------------------+
                                        |   FIRESTORE RULES      |
                                        |   - Admin: Full Access |
                                        |   - User: Limited      |
                                        +------------------------+

================================================================================
                            FLUXO DE AUTENTICACAO
================================================================================

1. Usuario acessa site (Netlify)
   |
   v
2. Tela de Login aparece
   |
   v
3. Usuario digita email/senha
   |
   v
4. Firebase Authentication verifica
   |
   +-- Invalido --> Erro mostrado
   |
   +-- Valido --> Token JWT gerado
                   |
                   v
5. Sistema busca dados do usuario no Firestore
   |
   v
6. Verifica se role = "admin" ou "user"
   |
   v
7. Dashboard carregado com permissoes corretas
   |
   v
8. Todos os dados salvos vao para Firestore
   |
   v
9. Em tempo real sincronizado entre dispositivos

================================================================================
                          ESTRUTURA DE DIRETORIOS
================================================================================

projetowash/
│
├── web/                                    # Frontend (Netlify Deploy)
│   ├── index.html                         # Pagina principal
│   │   ├── [Container Autenticacao]
│   │   │   ├── Login Form
│   │   │   ├── Register Form
│   │   │   └── Forgot Password Form
│   │   └── [Container Aplicativo]
│   │       ├── Header (Logo + User Menu)
│   │       ├── Dashboard Section
│   │       │   ├── Stats Cards (4)
│   │       │   ├── Charts (2)
│   │       │   └── Recent History
│   │       ├── Modules Section
│   │       │   ├── Operacional
│   │       │   ├── Estoque Entrada
│   │       │   ├── Estoque Saida
│   │       │   ├── Financeiro
│   │       │   ├── RH
│   │       │   ├── Visualizar
│   │       │   ├── Historico (Admin)
│   │       │   └── Backup (Admin)
│   │       ├── Modal Container
│   │       └── Footer
│   │
│   └── static/
│       ├── css/
│       │   ├── style.css              # Estilos base
│       │   ├── auth.css               # Estilos autenticacao
│       │   └── dashboard.css          # Estilos dashboard
│       │
│       ├── js/
│       │   ├── firebase-config.js     # Config Firebase
│       │   │   └── [firebaseConfig object]
│       │   │
│       │   ├── firestore-service.js   # Servicos Firestore
│       │   │   ├── listarProdutos()
│       │   │   ├── cadastrarProdutoFirestore()
│       │   │   ├── registrarSaidaProduto()
│       │   │   ├── salvarCalculoFinanceiro()
│       │   │   ├── salvarFolhaPagamento()
│       │   │   ├── buscarEstatisticas()
│       │   │   └── realizarBackup()
│       │   │
│       │   ├── auth.js                # Autenticacao UI
│       │   │   ├── showLogin()
│       │   │   ├── showRegister()
│       │   │   ├── handleLogin()
│       │   │   ├── handleRegister()
│       │   │   ├── handleForgotPassword()
│       │   │   └── logout()
│       │   │
│       │   ├── app.js                 # Core functions
│       │   │   ├── showModule()
│       │   │   ├── closeModule()
│       │   │   ├── showToast()
│       │   │   ├── showLoading()
│       │   │   ├── formatCurrency()
│       │   │   └── validateRequired()
│       │   │
│       │   ├── modules.js             # Modulos logica
│       │   │   ├── loadOperacionalModule()
│       │   │   ├── loadEstoqueEntradaModule()
│       │   │   ├── loadEstoqueSaidaModule()
│       │   │   ├── loadFinanceiroModule()
│       │   │   ├── loadRHModule()
│       │   │   └── loadVisualizarModule()
│       │   │
│       │   ├── dashboard.js           # Dashboard
│       │   │   ├── loadDashboard()
│       │   │   ├── loadHistoricoRecente()
│       │   │   ├── loadCharts()
│       │   │   ├── loadChartMovimentacoes()
│       │   │   └── loadChartTopProdutos()
│       │   │
│       │   └── pwa.js                 # Progressive Web App
│       │       ├── Service Worker registration
│       │       └── Install prompt
│       │
│       ├── manifest.json              # PWA Manifest
│       └── service-worker.js          # SW para offline
│
├── netlify.toml                       # Config Netlify
│   ├── [build]
│   │   └── publish = "web"
│   └── [redirects]
│       └── /* -> /index.html
│
├── firebase.json                      # Config Firebase
│   ├── [firestore]
│   │   └── rules, indexes
│   └── [hosting]
│       └── rewrites
│
├── firestore.rules                    # Security Rules
│   ├── match /usuarios/{userId}
│   ├── match /estoque/{produtoId}
│   ├── match /movimentacoes/{movId}
│   ├── match /financeiro/{docId}
│   ├── match /folha_pagamento/{docId}
│   └── match /configuracoes/{docId}
│
├── firestore.indexes.json             # DB Indexes
│   └── [indexes array]
│
├── .firebaserc                        # Firebase project
│   └── { "projects": { "default": "..." } }
│
├── package.json                       # NPM config
│   └── [scripts, dependencies]
│
├── .gitignore                         # Git ignore
│
├── DOCUMENTACAO/
│   ├── PRIMEIRO_ACESSO.md            # Setup Firebase
│   ├── INICIO_RAPIDO_V2.md           # Quick start
│   ├── GUIA_CONFIGURACAO_COMPLETO.md # Full guide
│   ├── README_V2.md                  # Overview
│   ├── MIGRACAO_FLASK_FIREBASE.md    # Migration guide
│   ├── PROJETO_COMPLETO_V2.md        # Full summary
│   └── ESTRUTURA_VISUAL.md           # This file
│
├── src/                               # Python (Legado - Opcional)
│   ├── main.py                       # Console menu
│   ├── operacional.py
│   ├── estoque_entrada.py
│   ├── estoque_saida.py
│   ├── financeiro.py
│   └── rh.py
│
└── iniciar_v2.ps1                    # PowerShell script

================================================================================
                        FLUXO DE DADOS - EXEMPLO
================================================================================

CADASTRAR PRODUTO:

1. Usuario clica "Entrada de Estoque"
   |
   v
2. Modal abre com formulario (modules.js)
   |
   v
3. Usuario preenche: codigo, nome, quantidade, etc.
   |
   v
4. Clica "Cadastrar"
   |
   v
5. JavaScript valida campos (app.js)
   |
   v
6. Chama cadastrarProdutoFirestore() (firestore-service.js)
   |
   v
7. Verifica se produto ja existe (Firestore query)
   |
   +-- Existe --> Atualiza quantidade
   |              |
   |              v
   +-- Nao existe --> Cria novo documento
                      |
                      v
8. Registra movimentacao na colecao "movimentacoes"
   |
   v
9. Toast de sucesso aparece (app.js)
   |
   v
10. Modal fecha
    |
    v
11. Dashboard atualiza automaticamente (tempo real)

================================================================================
                     COLLECTIONS DO FIRESTORE
================================================================================

usuarios/
  {userId}/
    - nome: string
    - email: string
    - contato: string
    - loginUsuario: string
    - role: "admin" | "user"
    - ativo: boolean
    - dataCadastro: timestamp

estoque/
  {produtoId}/
    - codigo: number
    - nome: string
    - quantidade: number
    - data: string
    - fornecedor: string
    - local: string
    - valor: number
    - dataCriacao: timestamp
    - ultimaAtualizacao: timestamp
    - criadoPor: userId

movimentacoes/
  {movId}/
    - tipo: "entrada" | "saida"
    - subtipo: "completa" | "parcial" | null
    - produtoId: string
    - produtoNome: string
    - quantidade: number
    - quantidadeSolicitada: number (saida)
    - quantidadeVendida: number (saida)
    - valorVenda: number (saida)
    - usuarioId: string
    - usuarioNome: string
    - timestamp: timestamp

financeiro/
  {docId}/
    - custos: object
      - agua: number
      - luz: number
      - impostos: number
      - salarios: number
      - total: number
    - precificacao: object
    - mensal: object
    - anual: object
    - indicadores: object
    - timestamp: timestamp
    - usuarioId: string
    - usuarioNome: string

folha_pagamento/
  {docId}/
    - funcionarios: array
    - totais: object
    - timestamp: timestamp
    - usuarioId: string
    - usuarioNome: string

backups/
  {backupId}/
    - data: string
    - produtos: array
    - movimentacoes: array
    - financeiro: array
    - folha: array
    - timestamp: timestamp

configuracoes/
  system/
    - versao: string
    - ultimoBackup: timestamp
    - configuracoes: object

================================================================================
                          PERMISSOES POR ROLE
================================================================================

ADMIN:
  - Ver/Editar/Deletar tudo
  - Gerenciar usuarios
  - Acessar historico completo
  - Fazer backups
  - Configuracoes do sistema
  - Ver dashboard completo

USER:
  - Ver apenas proprios dados
  - Cadastrar produtos
  - Registrar vendas
  - Calculos operacionais
  - Calculos financeiros
  - Folha de pagamento
  - Visualizar estoque
  - Ver dashboard resumido

================================================================================
                            TECNOLOGIAS
================================================================================

Frontend:
  - HTML5 (Estrutura semantica)
  - CSS3 (Grid, Flexbox, Animations, Variables)
  - JavaScript ES6+ (Async/Await, Modules, Arrow Functions)
  - Chart.js 4.4.0 (Graficos)
  - Font Awesome 6.4.0 (Icones)

Backend/Database:
  - Firebase Authentication 9.22.0 (Autenticacao)
  - Cloud Firestore 9.22.0 (Banco de dados)
  - Firebase Hosting (Alternativa ao Netlify)

Deploy/DevOps:
  - Netlify (Hospedagem, CDN, Deploy)
  - GitHub (Controle de versao)
  - Git (Versionamento)
  - PowerShell (Scripts)

PWA:
  - Service Worker (Offline capability)
  - Web App Manifest (Instalavel)
  - Cache API (Performance)

================================================================================
                       FLUXO DE DEPLOY
================================================================================

1. Desenvolvedor faz alteracoes no codigo
   |
   v
2. git add .
   git commit -m "Descricao"
   git push origin main
   |
   v
3. GitHub recebe o push
   |
   v
4. Netlify detecta mudanca (webhook)
   |
   v
5. Netlify clona repositorio
   |
   v
6. Le configuracao (netlify.toml)
   |
   v
7. Publica pasta "web" para CDN
   |
   v
8. Deploy concluido (30s - 1min)
   |
   v
9. Usuario acessa site com nova versao

Automatico. Zero intervencao. Deploy continuo.

================================================================================
                          CUSTO E LIMITES
================================================================================

NETLIFY (Gratuito):
  - 100 GB banda/mes
  - 300 build minutos/mes
  - Deploy ilimitados
  - HTTPS automatico
  - CDN global

FIREBASE (Spark Plan - Gratuito):
  - 50,000 leituras/dia
  - 20,000 escritas/dia
  - 20,000 deletes/dia
  - 1 GB armazenamento
  - 10 GB transferencia/mes
  - 1 GB hosting

Para 90% dos casos: COMPLETAMENTE GRATUITO

Quando crescer muito:
  - Firebase Blaze: Pay-as-you-go
  - Netlify Pro: $19/mes

================================================================================
                            RESUMO VISUAL
================================================================================

                    USUARIO
                      |
                      | HTTPS
                      v
                 [NETLIFY CDN]
                      |
           +----------+----------+
           |                     |
           v                     v
    [FIREBASE AUTH]      [CLOUD FIRESTORE]
           |                     |
           +----------+----------+
                      |
                      v
              [Sistema Rodando]
                      |
              +-------+-------+
              |               |
              v               v
          [Admin]         [User]
         Full Access    Limited Access

================================================================================

Sistema Estoque Certo LTDA v2.0
Arquitetura Serverless - Cloud Native - JAMstack
Desenvolvido em 2025
```
