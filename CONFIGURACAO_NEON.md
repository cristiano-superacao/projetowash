# Guia de Configuração do Banco de Dados Neon (PostgreSQL) com Netlify

Este guia explica como configurar o banco de dados Neon e conectá-lo ao Netlify para que o sistema funcione com múltiplos usuários e segurança profissional.

## Passo 1: Criar Conta e Banco de Dados no Neon

1. Acesse [neon.tech](https://neon.tech) e crie uma conta.
2. Crie um novo projeto (ex: `EstoqueCerto`).
3. O Neon irá gerar uma **Connection String** (algo como `postgres://user:password@ep-xyz.aws.neon.tech/neondb?sslmode=require`).
4. **Copie essa string** e guarde em um local seguro.

## Passo 2: Criar as Tabelas no Banco de Dados

1. No painel do Neon, vá para a aba **"SQL Editor"**.
2. Copie o conteúdo do arquivo `database/schema.sql` deste projeto.
3. Cole no editor SQL do Neon e clique em **"Run"**.
   - Isso criará as tabelas de usuários, produtos e movimentações.

## Passo 3: Configurar o Netlify

1. Acesse o painel do seu site no [Netlify](https://app.netlify.com).
2. Vá em **"Site configuration"** > **"Environment variables"**.
3. Clique em **"Add a variable"**.
4. Crie uma variável com a chave `DATABASE_URL` e cole a Connection String do Neon que você copiou no Passo 1.
5. Clique em **"Create variable"**.

## Passo 4: Atualizar o Projeto

1. Certifique-se de que o arquivo `netlify.toml` está configurado para redirecionar `/api/*` para `/.netlify/functions/:splat` (já fiz isso para você).
2. Certifique-se de que as funções em `netlify/functions/` estão criadas (já fiz isso para você).
3. Faça o deploy das alterações:
   ```bash
   git add .
   git commit -m "Configuração Neon + Netlify Functions"
   git push
   ```

## Passo 5: Testar

1. Acesse seu site no Netlify.
2. Tente fazer login ou criar uma conta.
   - O sistema agora irá se comunicar com o Netlify Functions, que por sua vez fala com o Neon.
   - **Nota:** O primeiro usuário criado não será Admin automaticamente. Você pode precisar editar o banco de dados no Neon (tabela `users`, coluna `role`) para mudar de 'user' para 'admin' manualmente na primeira vez.

---

**Segurança:**
- As credenciais do banco de dados ficam seguras no servidor do Netlify (Environment Variables) e nunca são expostas no navegador do usuário.
- O sistema usa SQL parametrizado para evitar injeção de SQL.
