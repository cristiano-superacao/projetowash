# GUIA COMPLETO DE CONFIGURACAO - Sistema Estoque Certo LTDA v2.0

## VISAO GERAL DO SISTEMA

Sistema de Gestao Empresarial completo com:
- Autenticacao Firebase (Login/Cadastro)
- Banco de dados Firestore (Nuvem)
- Deploy automatico no Netlify
- Interface responsiva e profissional
- PWA instalavel
- Dashboard com graficos
- Sistema de backup

---

## PARTE 1: CONFIGURACAO DO FIREBASE

### Passo 1: Criar Projeto Firebase

1. Acesse: https://console.firebase.google.com/
2. Clique em "Adicionar projeto"
3. Nome do projeto: `estoque-certo-ltda`
4. Desabilite o Google Analytics (opcional)
5. Clique em "Criar projeto"

### Passo 2: Ativar Authentication

1. No menu lateral, clique em "Authentication"
2. Clique em "Comecar"
3. Ative o provedor "E-mail/senha"
4. Clique em "Salvar"

### Passo 3: Criar Usuario Admin

1. Va para "Authentication" > "Users"
2. Clique em "Add user"
3. Email: `admin@estoquecerto.com`
4. Senha: `Admin@123` (ou sua escolha)
5. Clique em "Add user"

### Passo 4: Configurar Firestore Database

1. No menu lateral, clique em "Firestore Database"
2. Clique em "Criar banco de dados"
3. Selecione "Iniciar no modo de producao"
4. Escolha a localizacao: `southamerica-east1` (Sao Paulo)
5. Clique em "Ativar"

### Passo 5: Definir Usuario como Admin

1. No Firestore, clique em "Iniciar colecao"
2. ID da colecao: `usuarios`
3. ID do documento: [Cole o UID do usuario admin copiado do Authentication]
4. Adicione os campos:

```
nome: "Administrador"
email: "admin@estoquecerto.com"
contato: "(00) 00000-0000"
loginUsuario: "admin"
role: "admin"
ativo: true
dataCadastro: [Timestamp atual]
```

5. Clique em "Salvar"

### Passo 6: Obter Credenciais do Firebase

1. Clique no icone de engrenagem > "Configuracoes do projeto"
2. Role ate "Seus aplicativos"
3. Clique no icone `</>` (Web)
4. Registre o app com o nome: `Estoque Certo Web`
5. Copie o objeto `firebaseConfig`

### Passo 7: Atualizar o Arquivo de Configuracao

Abra o arquivo: `web/static/js/firebase-config.js`

Substitua as credenciais:

```javascript
const firebaseConfig = {
    apiKey: "SUA_API_KEY_AQUI",
    authDomain: "estoque-certo-ltda.firebaseapp.com",
    projectId: "estoque-certo-ltda",
    storageBucket: "estoque-certo-ltda.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abcdef123456",
    measurementId: "G-XXXXXXXXXX"
};
```

---

## PARTE 2: CONFIGURACAO DO NETLIFY

### Passo 1: Criar Conta no Netlify

1. Acesse: https://www.netlify.com/
2. Clique em "Sign up"
3. Faca login com GitHub, GitLab ou email

### Passo 2: Criar Repositorio Git

No terminal (PowerShell), dentro da pasta do projeto:

```powershell
git init
git add .
git commit -m "Sistema Estoque Certo LTDA v2.0 - Pronto para deploy"
```

### Passo 3: Conectar ao GitHub

1. Crie um repositorio no GitHub: https://github.com/new
2. Nome: `estoque-certo-ltda`
3. Deixe como publico ou privado (sua escolha)
4. NAO inicialize com README

No terminal:

```powershell
git remote add origin https://github.com/SEU_USUARIO/estoque-certo-ltda.git
git branch -M main
git push -u origin main
```

### Passo 4: Fazer Deploy no Netlify

1. No Netlify, clique em "Add new site" > "Import an existing project"
2. Escolha "Deploy with GitHub"
3. Autorize o Netlify a acessar seu GitHub
4. Selecione o repositorio `estoque-certo-ltda`
5. Configuracoes de build:
   - Build command: `echo 'Build concluido'`
   - Publish directory: `web`
6. Clique em "Deploy site"

### Passo 5: Configurar Dominio Personalizado (Opcional)

1. No Netlify, va para "Site settings" > "Domain management"
2. Clique em "Add custom domain"
3. Digite seu dominio (ex: `estoquecerto.com`)
4. Siga as instrucoes para configurar DNS

---

## PARTE 3: TESTE DO SISTEMA

### Teste 1: Login Admin

1. Acesse a URL do Netlify (ex: `https://seu-site.netlify.app`)
2. Faca login com:
   - Email: `admin@estoquecerto.com`
   - Senha: `Admin@123`
3. Verifique se o menu admin aparece

### Teste 2: Cadastro de Usuario

1. Clique em "Criar conta"
2. Preencha os dados:
   - Nome: Seu nome completo
   - Email: Seu email
   - Contato: Seu telefone
   - Login: Nome de usuario
   - Senha: Minimo 6 caracteres
3. Clique em "Cadastrar"
4. Faca login com as novas credenciais

### Teste 3: Funcionalidades

1. **Dashboard**: Verifique cards de estatisticas
2. **Operacional**: Calcule capacidade de producao
3. **Entrada de Estoque**: Cadastre um produto
4. **Saida de Estoque**: Registre uma venda
5. **Financeiro**: Calcule custos e lucros
6. **RH**: Calcule folha de pagamento
7. **Visualizar**: Veja os produtos cadastrados

---

## PARTE 4: ESTRUTURA DO PROJETO

```
projetowash/
├── web/
│   ├── index.html                 (Pagina principal)
│   └── static/
│       ├── css/
│       │   ├── style.css         (Estilos gerais)
│       │   ├── auth.css          (Estilos de autenticacao)
│       │   └── dashboard.css     (Estilos do dashboard)
│       ├── js/
│       │   ├── firebase-config.js    (Configuracao Firebase)
│       │   ├── firestore-service.js  (Servicos Firestore)
│       │   ├── auth.js              (Autenticacao UI)
│       │   ├── app.js               (Funcoes principais)
│       │   ├── modules.js           (Modulos do sistema)
│       │   ├── dashboard.js         (Dashboard e graficos)
│       │   └── pwa.js               (PWA)
│       ├── manifest.json        (PWA Manifest)
│       └── service-worker.js    (Service Worker)
├── netlify.toml                 (Configuracao Netlify)
├── firebase.json                (Configuracao Firebase)
├── firestore.rules              (Regras de seguranca)
└── firestore.indexes.json       (Indices do Firestore)
```

---

## PARTE 5: USUARIOS E PERMISSOES

### Usuario Admin

**Permissoes:**
- Acesso total ao sistema
- Gerenciar outros usuarios
- Realizar backups
- Ver historico completo
- Acessar configuracoes

**Como identificar:**
- Menu superior mostra opcoes admin
- Cards de "Historico" e "Backup" visiveis

### Usuario Regular

**Permissoes:**
- Cadastrar produtos
- Registrar vendas
- Calcular operacional/financeiro/RH
- Visualizar estoque
- Ver dashboard

**Restricoes:**
- Nao pode ver historico completo
- Nao pode fazer backup
- Nao pode gerenciar usuarios

---

## PARTE 6: MANUTENCAO

### Backup Manual

1. Faca login como admin
2. Clique no card "Backup"
3. Clique em "Realizar Backup Agora"
4. Os dados serao salvos na colecao `backups` do Firestore

### Adicionar Novo Admin

1. Cadastre o usuario normalmente
2. Acesse o Firestore Console
3. Va para `usuarios` > [ID do usuario]
4. Edite o campo `role` para `"admin"`
5. Salve as alteracoes

### Atualizar Sistema

Apos fazer alteracoes no codigo:

```powershell
git add .
git commit -m "Descricao das alteracoes"
git push origin main
```

O Netlify fara o deploy automaticamente!

---

## PARTE 7: SOLUCAO DE PROBLEMAS

### Erro: "Firebase not defined"

**Solucao:** Verifique se as tags de script do Firebase estao no `<head>` do HTML

### Erro: "Permission denied"

**Solucao:** Verifique as regras do Firestore (`firestore.rules`)

### Erro: "User not found"

**Solucao:** Verifique se o usuario existe no Authentication

### Deploy falhou no Netlify

**Solucao:** 
1. Verifique o log de build no Netlify
2. Certifique-se que o `netlify.toml` esta correto
3. Verifique se o diretorio `web` existe

---

## PARTE 8: PROXIMOS PASSOS

### Melhorias Sugeridas

1. **Graficos Avancados**
   - Implementar Chart.js nos modulos
   - Dashboard com mais visualizacoes

2. **Exportacao de Relatorios**
   - PDF: Usar jsPDF
   - Excel: Usar SheetJS

3. **Notificacoes Push**
   - Configurar Firebase Cloud Messaging
   - Alertas de estoque baixo

4. **API REST**
   - Criar Netlify Functions
   - Endpoints para integracao

5. **Testes Automatizados**
   - Jest para JavaScript
   - Cypress para E2E

---

## SUPORTE

### Documentacao Oficial

- Firebase: https://firebase.google.com/docs
- Netlify: https://docs.netlify.com
- Chart.js: https://www.chartjs.org/docs

### Contato

Para duvidas ou suporte:
- Email: suporte@estoquecerto.com
- GitHub Issues: [Seu repositorio]

---

## LICENCA

Sistema desenvolvido para fins educacionais e comerciais.
Todos os direitos reservados - Estoque Certo LTDA 2025.

---

**Versao:** 2.0
**Data:** Novembro 2025
**Autor:** Sistema Estoque Certo LTDA
