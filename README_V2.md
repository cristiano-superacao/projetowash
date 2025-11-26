# Sistema Estoque Certo LTDA v2.0

Sistema de Gestao Empresarial completo com autenticacao, banco de dados na nuvem e deploy automatico.

## CARACTERISTICAS PRINCIPAIS

- Autenticacao Firebase (Login/Cadastro)
- Banco de dados Firestore (Nuvem)
- Deploy automatico no Netlify
- Interface responsiva e profissional
- PWA instalavel
- Dashboard com graficos em tempo real
- Sistema de backup automatico
- Historico de movimentacoes
- Sem emojis no codigo

## TECNOLOGIAS

### Backend/Database
- Firebase Authentication
- Cloud Firestore
- Firebase Hosting (alternativa)

### Frontend
- HTML5, CSS3, JavaScript ES6+
- Chart.js (graficos)
- Font Awesome (icones)
- Service Worker (PWA)

### Deploy
- Netlify (deploy automatico)
- GitHub (controle de versao)
- CI/CD automatizado

## INICIO RAPIDO

### 1. Configure o Firebase

```bash
1. Crie projeto no Firebase Console
2. Ative Authentication (Email/Senha)
3. Crie Firestore Database
4. Copie as credenciais para firebase-config.js
```

### 2. Configure o Projeto

```powershell
# Clone ou baixe o repositorio
cd projetowash

# Edite web/static/js/firebase-config.js
# Cole suas credenciais do Firebase

# Inicialize Git
git init
git add .
git commit -m "Inicial"
```

### 3. Deploy no Netlify

```bash
1. Crie conta no Netlify
2. Conecte ao GitHub
3. Importe o repositorio
4. Configure:
   - Build command: echo 'Build concluido'
   - Publish directory: web
5. Deploy!
```

### 4. Acesse o Sistema

```
URL: https://seu-site.netlify.app
Login Admin: admin@estoquecerto.com
Senha Admin: (Configure no Firebase)
```

## ESTRUTURA DO PROJETO

```
projetowash/
├── web/                          # Frontend (Publish directory)
│   ├── index.html               # Pagina principal
│   └── static/
│       ├── css/                 # Estilos
│       │   ├── style.css
│       │   ├── auth.css
│       │   └── dashboard.css
│       ├── js/                  # JavaScript
│       │   ├── firebase-config.js    # Configuracao Firebase
│       │   ├── firestore-service.js  # Servicos Firestore
│       │   ├── auth.js              # Autenticacao
│       │   ├── app.js               # Core
│       │   ├── modules.js           # Modulos
│       │   ├── dashboard.js         # Dashboard
│       │   └── pwa.js               # PWA
│       ├── manifest.json        # PWA Manifest
│       └── service-worker.js    # Service Worker
├── netlify.toml                 # Config Netlify
├── firebase.json                # Config Firebase
├── firestore.rules              # Regras de seguranca
├── firestore.indexes.json       # Indices Firestore
└── GUIA_CONFIGURACAO_COMPLETO.md  # Guia completo
```

## MODULOS DO SISTEMA

### 1. Operacional
- Calculo de capacidade de producao
- Simulacao de turnos (1, 2 ou 3 turnos)
- Projecoes mensais e anuais

### 2. Estoque - Entrada
- Cadastro de produtos
- Validacao de duplicidade
- Atualizacao automatica de quantidades

### 3. Estoque - Saida
- Registro de vendas
- Controle de estoque
- Pedidos parciais/completos

### 4. Financeiro
- Calculo de custos operacionais
- Precificacao com margem de lucro
- Projecoes mensais e anuais
- ROI e ponto de equilibrio

### 5. Recursos Humanos
- Folha de pagamento
- Calculo de INSS e IR (progressivo)
- Horas extras
- 4 tipos de cargo

### 6. Dashboard (Novo!)
- Cards de estatisticas em tempo real
- Graficos de movimentacoes
- Top 5 produtos
- Historico recente

### 7. Historico (Admin)
- Todas as movimentacoes
- Filtros por tipo
- Exportacao de dados

### 8. Backup (Admin)
- Backup manual sob demanda
- Armazenamento no Firestore
- Historico de backups

## USUARIOS E PERMISSOES

### Admin
- Acesso total
- Gerenciar usuarios
- Fazer backups
- Ver historico completo
- Configuracoes do sistema

### Usuario Regular
- Cadastrar produtos
- Registrar vendas
- Usar calculadoras
- Ver dashboard
- Visualizar estoque

## SEGURANCA

- Autenticacao obrigatoria
- Regras Firestore Security Rules
- HTTPS automatico (Netlify)
- Tokens JWT (Firebase)
- Validacao de dados client e server-side

## DEPLOY AUTOMATICO

Toda vez que voce fizer push para GitHub:

```powershell
git add .
git commit -m "Atualizacao"
git push origin main
```

O Netlify automaticamente:
1. Detecta o push
2. Faz build do projeto
3. Deploy em producao
4. Notifica por email

## PWA - INSTALACAO

### Desktop
1. Acesse o site
2. Clique no icone de instalacao (barra de endereco)
3. Confirme a instalacao

### Mobile
1. Acesse o site
2. Menu > "Adicionar a tela inicial"
3. Confirme

O app funciona offline com cache!

## FUNCIONALIDADES FUTURAS

- [ ] Exportacao PDF/Excel
- [ ] Graficos avancados
- [ ] Notificacoes push
- [ ] API REST publica
- [ ] App mobile nativo (React Native)
- [ ] Integracao com ERP
- [ ] Relatorios customizaveis
- [ ] Multi-empresas
- [ ] Dark mode

## DOCUMENTACAO

- **Guia Completo:** [GUIA_CONFIGURACAO_COMPLETO.md](GUIA_CONFIGURACAO_COMPLETO.md)
- **Firebase Docs:** https://firebase.google.com/docs
- **Netlify Docs:** https://docs.netlify.com

## SUPORTE

### Problemas Comuns

**Firebase not defined:**
- Verifique as tags de script no HTML

**Permission denied:**
- Verifique firestore.rules
- Usuario esta autenticado?

**Deploy falhou:**
- Verifique netlify.toml
- Pasta 'web' existe?

### Contato

- Email: suporte@estoquecerto.com
- GitHub Issues: [Abra um issue]

## LICENCA

Sistema desenvolvido para fins educacionais e comerciais.
Todos os direitos reservados - Estoque Certo LTDA 2025.

---

## CHANGELOG

### v2.0 (Novembro 2025)
- Autenticacao Firebase
- Banco de dados Firestore
- Deploy automatico Netlify
- Dashboard com graficos
- Sistema de backup
- Historico de movimentacoes
- PWA aprimorado
- Remocao de emojis do codigo
- Interface responsiva melhorada

### v1.0 (Inicial)
- Sistema basico Flask
- Estoque em memoria
- 5 modulos principais
- Interface web simples

---

**Desenvolvido com dedicacao para facilitar a gestao empresarial**

Sistema Estoque Certo LTDA - 2025
