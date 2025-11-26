# CONFIGURACAO INICIAL - Primeiro Acesso

## PASSO A PASSO PARA CONFIGURAR O ADMINISTRADOR

### 1. Criar Projeto Firebase

1. Acesse: https://console.firebase.google.com/
2. Clique em "Adicionar projeto" ou "Create a project"
3. Nome do projeto: `estoque-certo-ltda` (ou seu nome)
4. Desative Google Analytics (opcional)
5. Clique em "Criar projeto"

### 2. Ativar Authentication

1. No menu lateral esquerdo, clique em "Authentication"
2. Clique no botao "Comecar" ou "Get Started"
3. Na aba "Sign-in method":
   - Clique em "Email/Password"
   - Ative a opcao "Email/Password"
   - Clique em "Salvar"

### 3. Criar Usuario Administrador

**Opcao A: Via Firebase Console (Recomendado)**

1. Va para "Authentication" > "Users"
2. Clique em "Add user"
3. Preencha:
   - Email: `admin@estoquecerto.com`
   - Password: `Admin@123456` (ou sua escolha - minimo 6 caracteres)
4. Clique em "Add user"
5. **IMPORTANTE:** Copie o "User UID" que aparece (parece com: `xK3mP9qL...`)

**Opcao B: Via Cadastro no Sistema**

1. Acesse seu site
2. Clique em "Criar conta"
3. Preencha o formulario com seus dados
4. Depois, va ao Firebase Console > Authentication > Users
5. Copie o UID do usuario criado

### 4. Configurar Firestore Database

1. No menu lateral, clique em "Firestore Database"
2. Clique em "Criar banco de dados" ou "Create database"
3. Selecione "Iniciar no modo de producao" ou "Start in production mode"
4. Escolha a localizacao:
   - Recomendado: `southamerica-east1` (Sao Paulo, Brasil)
   - Alternativa: `us-central1` (EUA)
5. Clique em "Ativar" ou "Enable"

### 5. Criar Colecao de Usuarios

**Metodo Manual (Console):**

1. No Firestore, clique em "Iniciar colecao" ou "Start collection"
2. ID da colecao: `usuarios` (exatamente assim, minusculo)
3. Clique em "Proximo"
4. ID do documento: Cole o UID copiado do passo 3
5. Adicione os seguintes campos:

```
Campo           | Tipo      | Valor
----------------|-----------|---------------------------
nome            | string    | Administrador do Sistema
email           | string    | admin@estoquecerto.com
contato         | string    | (11) 99999-9999
loginUsuario    | string    | admin
role            | string    | admin
ativo           | boolean   | true
dataCadastro    | timestamp | (Use o botao "Timestamp")
```

6. Clique em "Salvar"

**IMPORTANTE:** O campo `role` deve ser exatamente `admin` (minusculo)

### 6. Aplicar Regras de Seguranca

1. No Firestore, clique na aba "Regras" ou "Rules"
2. Copie e cole o conteudo do arquivo `firestore.rules` do projeto
3. Clique em "Publicar" ou "Publish"

Se nao tiver o arquivo, use estas regras basicas:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /usuarios/{userId} {
      allow read: if request.auth != null && 
                     (request.auth.uid == userId || 
                      get(/databases/$(database)/documents/usuarios/$(request.auth.uid)).data.role == 'admin');
      allow create: if request.auth != null && request.auth.uid == userId;
      allow update: if request.auth != null && 
                       (request.auth.uid == userId || 
                        get(/databases/$(database)/documents/usuarios/$(request.auth.uid)).data.role == 'admin');
      allow delete: if request.auth != null && 
                       get(/databases/$(database)/documents/usuarios/$(request.auth.uid)).data.role == 'admin';
    }
    
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

### 7. Obter Credenciais do Firebase

1. Clique no icone de engrenagem (Settings) > "Configuracoes do projeto"
2. Role para baixo ate "Seus aplicativos" ou "Your apps"
3. Se nao houver app, clique no icone `</>` (Web)
4. Nome do app: `Estoque Certo Web`
5. Nao marque "Firebase Hosting" (ja usamos Netlify)
6. Clique em "Registrar app"
7. **COPIE TODO O OBJETO firebaseConfig**

Exemplo do que copiar:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyB1a2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q",
  authDomain: "estoque-certo-ltda.firebaseapp.com",
  projectId: "estoque-certo-ltda",
  storageBucket: "estoque-certo-ltda.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:a1b2c3d4e5f6g7h8i9j0k1",
  measurementId: "G-ABCDE12345"
};
```

### 8. Atualizar o Codigo

1. Abra o arquivo: `web/static/js/firebase-config.js`
2. Encontre a linha com `const firebaseConfig = {`
3. **SUBSTITUA TODO O OBJETO** pelas suas credenciais
4. Salve o arquivo

**ANTES:**
```javascript
const firebaseConfig = {
    apiKey: "SUA_API_KEY_AQUI",
    authDomain: "estoque-certo-ltda.firebaseapp.com",
    // ...
};
```

**DEPOIS:**
```javascript
const firebaseConfig = {
    apiKey: "AIzaSyB1a2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q",
    authDomain: "estoque-certo-ltda.firebaseapp.com",
    projectId: "estoque-certo-ltda",
    storageBucket: "estoque-certo-ltda.appspot.com",
    messagingSenderId: "123456789012",
    appId: "1:123456789012:web:a1b2c3d4e5f6g7h8i9j0k1",
    measurementId: "G-ABCDE12345"
};
```

### 9. Testar Localmente

**Opcao A: Live Server (VS Code)**

1. Instale a extensao "Live Server" no VS Code
2. Clique direito em `web/index.html`
3. Selecione "Open with Live Server"
4. Acesse: http://localhost:5500

**Opcao B: Python HTTP Server**

```powershell
cd web
python -m http.server 8000
```

Acesse: http://localhost:8000

### 10. Fazer Login

1. Na tela de login, use:
   - Email: `admin@estoquecerto.com`
   - Senha: `Admin@123456` (a senha que voce definiu)

2. Se tudo estiver correto, voce sera redirecionado para o dashboard

3. Verifique se aparece:
   - Seu email no canto superior direito
   - Os cards de "Historico" e "Backup" (exclusivos para admin)

### 11. Deploy no Netlify

Agora que esta funcionando localmente:

```powershell
# Inicializar Git
git init
git add .
git commit -m "Configuracao inicial completa"

# Criar repositorio no GitHub
# Va para: https://github.com/new
# Copie a URL do repositorio

# Conectar e fazer push
git remote add origin https://github.com/SEU_USUARIO/SEU_REPO.git
git branch -M main
git push -u origin main

# No Netlify
# 1. Login em https://netlify.com
# 2. "Add new site" > "Import from Git"
# 3. Conecte ao GitHub
# 4. Selecione seu repositorio
# 5. Publish directory: web
# 6. Deploy!
```

## VERIFICACAO FINAL

Use este checklist para garantir que tudo esta funcionando:

- [ ] Projeto Firebase criado
- [ ] Authentication ativado (Email/Password)
- [ ] Usuario admin criado no Authentication
- [ ] UID do admin copiado
- [ ] Firestore Database criado
- [ ] Colecao `usuarios` criada
- [ ] Documento do admin criado com UID correto
- [ ] Campo `role` = `admin` (minusculo)
- [ ] Regras de seguranca aplicadas
- [ ] Credenciais copiadas
- [ ] Arquivo `firebase-config.js` atualizado
- [ ] Testado localmente
- [ ] Login admin funcionando
- [ ] Cards admin visiveis
- [ ] Deploy no Netlify concluido
- [ ] Testado em producao

## SOLUCAO DE PROBLEMAS

### "Firebase is not defined"
- Verifique se as tags `<script>` do Firebase estao no HTML
- Limpe o cache do navegador (Ctrl+Shift+Del)

### "User not found" ou "Wrong password"
- Verifique se o usuario foi criado no Authentication
- Confirme o email e senha usados

### "Permission denied"
- Verifique se o documento do usuario existe em `usuarios/{UID}`
- Confirme se o UID do documento corresponde ao UID do Authentication
- Verifique se as regras do Firestore foram publicadas

### Menu admin nao aparece
- Verifique se o campo `role` esta exatamente como `admin` (minusculo)
- Faca logout e login novamente
- Abra o console do navegador (F12) e procure por erros

### Deploy no Netlify falhou
- Verifique se o arquivo `netlify.toml` existe
- Confirme se a pasta `web` existe e tem o `index.html`
- Veja os logs de build no Netlify Dashboard

## PROXIMO PASSO

Apos configurar o admin, voce pode:

1. Criar outros usuarios via formulario de cadastro
2. Promover usuarios a admin (editando `role` no Firestore)
3. Configurar dominio personalizado no Netlify
4. Personalizar cores e layout
5. Adicionar mais funcionalidades

## SUPORTE

Se tiver problemas:

1. Verifique o console do navegador (F12 > Console)
2. Verifique o Firestore Console > Debug do Firebase
3. Leia a documentacao completa: GUIA_CONFIGURACAO_COMPLETO.md
4. Consulte a documentacao oficial do Firebase

---

**Boa sorte com seu sistema!**

Sistema Estoque Certo LTDA - 2025
