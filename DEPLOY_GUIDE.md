# 🚀 Configuração de Deploy Automático - Netlify

## 📋 Pré-requisitos Configurados

✅ GitHub Actions workflow criado (`.github/workflows/netlify-deploy.yml`)  
✅ Netlify.toml configurado  
✅ Diretório de publicação: `web/`

## 🔑 Configuração de Secrets no GitHub

Para o deploy automático funcionar, você precisa configurar os seguintes **secrets** no seu repositório GitHub:

### Passo 1: Obter Site ID do Netlify

1. Acesse: https://app.netlify.com/sites/projetowash/settings/general
2. Em **Site information**, copie o **Site ID** (formato: `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`)

### Passo 2: Obter Auth Token do Netlify

1. Acesse: https://app.netlify.com/user/applications#personal-access-tokens
2. Clique em **New access token**
3. Dê um nome: `GitHub Actions Deploy`
4. Copie o token gerado (começa com `nfp_...`)

### Passo 3: Configurar Secrets no GitHub

1. Acesse seu repositório: https://github.com/cristiano-superacao/projetowash
2. Vá em **Settings** > **Secrets and variables** > **Actions**
3. Clique em **New repository secret**
4. Adicione os seguintes secrets:

   **Secret 1:**
   - Name: `NETLIFY_SITE_ID`
   - Value: [Cole o Site ID copiado]

   **Secret 2:**
   - Name: `NETLIFY_AUTH_TOKEN`
   - Value: [Cole o Auth Token copiado]

## ✅ Como Funciona

Após configurar os secrets:

1. **Push automático**: Sempre que você fizer `git push` para a branch `main`, o deploy será executado automaticamente
2. **Pull Requests**: PRs também acionam preview deploys
3. **Notificações**: Você receberá notificações de sucesso/falha no GitHub Actions

## 🌐 URLs

- **Produção**: https://projetowash.netlify.app
- **Painel Netlify**: https://app.netlify.com/sites/projetowash
- **GitHub Actions**: https://github.com/cristiano-superacao/projetowash/actions

## 📝 Comandos Manuais (Opcional)

Se preferir fazer deploy manual:

```bash
# Instalar Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod --dir=web
```

## 🔧 Troubleshooting

Se o deploy falhar:

1. Verifique se os secrets estão configurados corretamente
2. Confira os logs em: https://github.com/cristiano-superacao/projetowash/actions
3. Valide se o Site ID está correto no Netlify
4. Confirme se o Auth Token tem permissões de deploy

## 📊 Status do Deploy

Você pode ver o status do último deploy em:
- Badge no README (adicionar): `[![Netlify Status](https://api.netlify.com/api/v1/badges/SEU-SITE-ID/deploy-status)](https://app.netlify.com/sites/projetowash/deploys)`
