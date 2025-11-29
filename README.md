# Sistema Quatro Cantos

Bem-vindo ao repositório do **Quatro Cantos**, um sistema de gestão empresarial (ERP) moderno e versátil.

## 🚀 Visão Geral

O sistema foi projetado para ser flexível, funcionando tanto como uma aplicação completa com backend Python (Flask) quanto como uma aplicação web estática (PWA) que pode ser hospedada em serviços como Netlify ou Vercel.

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

---
© 2025 Quatro Cantos. Todos os direitos reservados.
