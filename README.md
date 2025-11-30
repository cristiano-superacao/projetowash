# Sistema Quatro Cantos 🏢

[![Netlify Status](https://api.netlify.com/api/v1/badges/YOUR-SITE-ID/deploy-status)](https://app.netlify.com/sites/projetowash/deploys)
![GitHub last commit](https://img.shields.io/github/last-commit/cristiano-superacao/projetowash)
![GitHub repo size](https://img.shields.io/github/repo-size/cristiano-superacao/projetowash)

Bem-vindo ao repositório do **Quatro Cantos**, um sistema de gestão empresarial (ERP) moderno, versátil e com interface profissional responsiva.

## 🌐 Deploy Automático

🚀 **Deploy contínuo configurado!** Toda alteração na branch `main` é automaticamente publicada no Netlify.

- **URL Produção**: https://projetowash.netlify.app
- **Painel Netlify**: https://app.netlify.com/sites/projetowash
- **Configuração**: Veja [DEPLOY_GUIDE.md](./DEPLOY_GUIDE.md) para instruções detalhadas

## 🚀 Visão Geral

O sistema foi projetado para ser flexível, funcionando tanto como uma aplicação completa com backend Python (Flask) quanto como uma aplicação web estática (PWA) que pode ser hospedada em serviços como Netlify ou Vercel.

### ✨ Atualizações Recentes (Novembro 2025)
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

## 🛠️ Tecnologias

- **Frontend**: HTML5, CSS3 (Design Responsivo), JavaScript (ES6+).
- **Backend (Opcional)**: Python 3.x, Flask, SQLAlchemy.
- **Persistência**:
  - **Modo Local**: LocalStorage (Navegador) - Ideal para demos e testes.
  - **Modo Nuvem**: Firebase (Firestore/Auth) - Para produção distribuída.
  - **Modo Híbrido**: Banco de Dados SQL (PostgreSQL/SQLite) via Flask.

## 📦 Instalação e Execução

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

## 🔐 Acesso (Modo Local)

O sistema vem pré-configurado com um usuário administrador para testes locais:

- **Email**: `admin@local.com`
- **Senha**: `admin123`

## 📱 PWA (Progressive Web App)

Este sistema é instalável! Em dispositivos móveis ou desktop (Chrome/Edge), procure pelo ícone de instalação na barra de endereços para adicionar o **Quatro Cantos** à sua tela inicial.

## 🎨 Interface e Design

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

## 🔧 Estrutura Backend

### Módulos Python
- **app.py**: Servidor Flask principal com rotas e inicialização do banco de dados
- **src/estoque_entrada.py**: Lógica de registro de entrada de produtos (função `registrar_entrada_produto`)
- **src/estoque_saida.py**: Lógica de registro de saída de produtos (função `registrar_saida_produto`)
- **src/operacional.py**: Cálculos de capacidade produtiva
- **src/financeiro.py**: Gestão financeira e precificação
- **src/rh.py**: Gestão de recursos humanos

### Refatoração Recente
Os módulos de estoque foram refatorados para separar a lógica de negócio da interface CLI:
- ✅ Funções puras que retornam dados estruturados
- ✅ Independentes de `input()` e `print()`
- ✅ Prontas para integração com APIs REST ou interfaces gráficas
- ✅ Tratamento robusto de erros com dicionários de status

---
© 2025 Quatro Cantos. Todos os direitos reservados.
