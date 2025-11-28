# Sistema Estoque Certo EV

**Estoque Certo EV** é um sistema de gestão empresarial (ERP) moderno e responsivo, focado na indústria de veículos elétricos e componentes de alta tecnologia.

O sistema utiliza uma arquitetura **Serverless** moderna, garantindo baixo custo, alta escalabilidade e segurança profissional.

## 🏗️ Arquitetura do Sistema

- **Frontend**: HTML5, CSS3 e JavaScript (PWA). Hospedado no **Netlify**.
- **Backend**: Netlify Functions (Node.js). Gerencia autenticação e regras de negócio.
- **Banco de Dados**: **Neon** (PostgreSQL). Banco de dados relacional robusto na nuvem.

### Módulos Principais
- **📊 Dashboard**: Visão geral com gráficos e indicadores de desempenho (KPIs).
- **🏭 Operacional**: Cálculo de capacidade produtiva e eficiência de turnos.
- **📦 Estoque**: Controle de entrada e saída com rastreabilidade (Lote/Serial).
- **💰 Financeiro**: Gestão de custos, precificação e análise de ROI.
- **👥 RH**: Gestão de funcionários e folha de pagamento automatizada.

## 🚀 Como Configurar e Implantar

Este projeto já está configurado para deploy contínuo no Netlify. Para que o sistema funcione corretamente (login, banco de dados), você precisa configurar o banco de dados Neon.

### Passo 1: Configuração do Banco de Dados (Neon)
Siga o guia detalhado em:
👉 **[CONFIGURACAO_NEON.md](CONFIGURACAO_NEON.md)**

### Passo 2: Deploy no Netlify
1. Conecte este repositório ao seu Netlify.
2. Nas configurações do site no Netlify, vá em **Environment Variables**.
3. Adicione a variável `DATABASE_URL` com a string de conexão do seu banco Neon.
4. O Netlify fará o deploy automaticamente.

## 💻 Desenvolvimento Local

Para rodar o projeto localmente com acesso ao banco de dados, você precisa do [Netlify CLI](https://docs.netlify.com/cli/get-started/).

1. Instale dependências:
   ```bash
   npm install
   ```
2. Inicie o servidor de desenvolvimento:
   ```bash
   netlify dev
   ```
   Isso iniciará o frontend e as funções backend localmente.

## 🔐 Acesso e Segurança

- O sistema utiliza **RBAC (Role-Based Access Control)**.
- Cada usuário vê apenas os módulos permitidos pelo seu cargo.
- As senhas e dados sensíveis são gerenciados pelo backend seguro.

---
© 2025 Estoque Certo LTDA. Todos os direitos reservados.
