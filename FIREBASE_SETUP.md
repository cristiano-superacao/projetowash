# 🔥 Guia de Configuração Firebase

## 📋 Índice

1. [Criar Projeto Firebase](#1-criar-projeto-firebase)
2. [Ativar Firestore Database](#2-ativar-firestore-database)
3. [Ativar Authentication](#3-ativar-authentication)
4. [Obter Credenciais](#4-obter-credenciais)
5. [Configurar no Projeto](#5-configurar-no-projeto)
6. [Deploy das Regras](#6-deploy-das-regras)
7. [Testar Integração](#7-testar-integração)

---

## 1. Criar Projeto Firebase

1. Acesse: https://console.firebase.google.com
2. Clique em **"Adicionar projeto"** ou **"Create a project"**
3. **Nome do projeto:** Digite `estoque-certo-ltda` (ou nome de sua preferência)
4. **Google Analytics:** Desabilite (opcional para este projeto)
5. Clique em **"Criar projeto"**
6. Aguarde 30-60 segundos
7. Clique em **"Continuar"** quando concluído

---

## 2. Ativar Firestore Database

1. No painel lateral esquerdo, clique em **"Firestore Database"**
2. Clique em **"Criar banco de dados"**
3. **Modo de segurança:**
   - Selecione **"Iniciar em modo de produção"**
   - (As regras serão configuradas depois via arquivo)
4. **Local do Firestore:**
   - Escolha **"southamerica-east1 (São Paulo)"**
   - Isso garante menor latência para Brasil
5. Clique em **"Ativar"**
6. Aguarde a criação do banco de dados

---

## 3. Ativar Authentication

1. No painel lateral, clique em **"Authentication"**
2. Clique em **"Começar"** ou **"Get started"**
3. Vá até a aba **"Sign-in method"**
4. Clique em **"Email/Password"**
5. **Ative a primeira opção:** "Email/Password" (toggle para ON)
6. **Deixe desativado:** "Email link (passwordless sign-in)"
7. Clique em **"Salvar"**

### Criar Primeiro Usuário Admin (Opcional)

1. Vá para a aba **"Users"**
2. Clique em **"Add user"**
3. Preencha:
   - **Email:** admin@estoquecerto.com
   - **Senha:** Admin@2025
4. Clique em **"Add user"**

---

## 4. Obter Credenciais

1. Clique no ícone de **engrenagem** ⚙️ no canto superior esquerdo
2. Selecione **"Configurações do projeto"** ou **"Project settings"**
3. Role para baixo até **"Seus aplicativos"** ou **"Your apps"**
4. Clique no ícone **"</>"** (Web)
5. **Apelido do app:** Digite `estoque-certo-web`
6. **NÃO marque** "Configure Firebase Hosting"
7. Clique em **"Registrar app"**
8. **COPIE** todo o objeto `firebaseConfig`:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyAbc123...",
  authDomain: "estoque-certo-ltda.firebaseapp.com",
  projectId: "estoque-certo-ltda",
  storageBucket: "estoque-certo-ltda.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abc123def456"
};
```

9. Clique em **"Continuar no console"**

---

## 5. Configurar no Projeto

### Passo 1: Editar firebase-config.js

Abra o arquivo:
```
t:\Sistemas_Desenvolvimento\projetowash\web\static\js\firebase-config.js
```

Substitua as credenciais:

```javascript
// ===== CONFIGURAÇÃO DO FIREBASE =====
// Obtenha suas credenciais em: https://console.firebase.google.com
// Configurações do projeto > Aplicativo web

const firebaseConfig = {
    apiKey: "COLE_SUA_API_KEY_AQUI",
    authDomain: "seu-projeto.firebaseapp.com",
    projectId: "seu-projeto-id",
    storageBucket: "seu-projeto.appspot.com",
    messagingSenderId: "123456789012",
    appId: "1:123456789012:web:abc123def456"
};

// Inicializa Firebase
firebase.initializeApp(firebaseConfig);

// Exporta instâncias para uso nos módulos
const auth = firebase.auth();
const db = firebase.firestore();

console.log("✅ Firebase inicializado com sucesso!");
```

### Passo 2: Salvar o arquivo

Certifique-se de salvar após colar suas credenciais.

---

## 6. Deploy das Regras

### Instalar Firebase CLI (se não tiver)

```powershell
npm install -g firebase-tools
```

### Login no Firebase

```powershell
firebase login
```

### Inicializar Projeto (apenas primeira vez)

```powershell
cd t:\Sistemas_Desenvolvimento\projetowash
firebase init
```

Selecione:
- [x] Firestore
- Use existing project: `estoque-certo-ltda`
- Firestore Rules: `firestore.rules` (padrão)
- Firestore Indexes: `firestore.indexes.json` (padrão)

### Deploy das Regras

```powershell
firebase deploy --only firestore:rules
```

Aguarde a mensagem:
```
✔ Deploy complete!
```

---

## 7. Testar Integração

### Passo 1: Iniciar o Servidor

```powershell
python app.py
```

### Passo 2: Abrir no Navegador

Acesse: http://localhost:5000

### Passo 3: Verificar Console

Abra o console do navegador (F12) e procure por:
```
✅ Firebase inicializado com sucesso!
```

### Passo 4: Criar Conta

1. Clique em **"Criar conta"**
2. Preencha os dados
3. Clique em **"Cadastrar Empresa"**

Se tudo estiver correto, você verá:
```
✅ Cadastro realizado com sucesso!
```

### Passo 5: Verificar no Firebase

1. Volte ao Firebase Console
2. Vá em **"Authentication"** > **"Users"**
3. Seu usuário deve aparecer na lista

4. Vá em **"Firestore Database"**
5. Verifique se as coleções foram criadas:
   - `usuarios`
   - `produtos` (após cadastrar um produto)

---

## 🔒 Regras de Segurança Configuradas

O arquivo `firestore.rules` já contém:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Produtos - Leitura pública, escrita autenticada
    match /produtos/{produto} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Movimentações - Apenas autenticados
    match /movimentacoes/{movimentacao} {
      allow read, write: if request.auth != null;
    }
    
    // Usuários - Apenas o próprio usuário
    match /usuarios/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Empresas - Apenas autenticados
    match /empresas/{empresa} {
      allow read, write: if request.auth != null;
    }
  }
}
```

### Significado:

- **Produtos:** Qualquer um pode ver, apenas autenticados podem adicionar/editar
- **Movimentações:** Apenas usuários logados podem acessar
- **Usuários:** Cada usuário só acessa seus próprios dados
- **Empresas:** Apenas autenticados podem gerenciar

---

## 🐛 Troubleshooting

### Erro: "Firebase não configurado. Usando modo local."

**Solução:**
1. Verifique se `firebase-config.js` tem suas credenciais
2. Confirme se API Key está correta (sem espaços)
3. Verifique se o arquivo está sendo carregado (F12 > Network)

### Erro: "Permission denied"

**Solução:**
1. Execute: `firebase deploy --only firestore:rules`
2. Aguarde 1-2 minutos para propagar
3. Tente novamente

### Erro: "User creation failed"

**Solução:**
1. Verifique se Authentication está ativo
2. Confirme se Email/Password está habilitado
3. Verifique console do navegador para detalhes

### Firebase CLI não reconhecido

**Solução:**
```powershell
npm install -g firebase-tools
```

Se persistir, reinicie o PowerShell.

---

## 📊 Estrutura de Dados no Firestore

### Coleção: `usuarios`

```json
{
  "uid": "abc123def456",
  "email": "usuario@exemplo.com",
  "nome": "João Silva",
  "empresa": "Empresa ABC",
  "cargo": "Gerente",
  "permissoes": ["operacional", "estoque", "financeiro"],
  "criadoEm": "2025-11-28T10:30:00Z"
}
```

### Coleção: `produtos`

```json
{
  "codigo": "P001",
  "nome": "Pallet Tipo A",
  "quantidade": 100,
  "dataFabricacao": "28/11/2025",
  "fornecedor": "Fornecedor X",
  "local": "A1",
  "valorUnitario": 50.00,
  "criadoPor": "abc123def456",
  "criadoEm": "2025-11-28T11:00:00Z"
}
```

### Coleção: `movimentacoes`

```json
{
  "tipo": "saida",
  "produto": "Pallet Tipo A",
  "quantidade": 50,
  "valor": 2500.00,
  "dataHora": "2025-11-28T14:30:00Z",
  "usuario": "abc123def456",
  "observacao": "Venda para Cliente Y"
}
```

---

## 🎯 Próximos Passos

Após configurar o Firebase:

1. ✅ Teste todas as funcionalidades
2. ✅ Cadastre produtos de exemplo
3. ✅ Faça movimentações de teste
4. ✅ Verifique persistência dos dados
5. ✅ Teste em diferentes dispositivos
6. ✅ Configure backup automático (opcional)

---

## 📞 Recursos Adicionais

- **Documentação Firebase:** https://firebase.google.com/docs
- **Firestore Guides:** https://firebase.google.com/docs/firestore
- **Authentication Docs:** https://firebase.google.com/docs/auth
- **Console Firebase:** https://console.firebase.google.com

---

**✨ Configuração completa! Seu sistema agora está 100% integrado à nuvem!**
