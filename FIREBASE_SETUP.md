#  Guia de Configuração Firebase

##  Índice

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
3. **Nome do projeto:** Digite `quatro-cantos` (ou nome de sua preferência)
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
   - **Email:** admin@quatrocantos.com
   - **Senha:** Admin@2025
4. Clique em **"Add user"**

---

## 4. Obter Credenciais

1. Clique no ícone de **engrenagem**  no canto superior esquerdo
2. Selecione **"Configurações do projeto"** ou **"Project settings"**
3. Role para baixo até **"Seus aplicativos"** ou **"Your apps"**
4. Clique no ícone **"</>"** (Web)
5. **Apelido do app:** Digite `quatro-cantos-web`
6. **NÃO marque** "Configure Firebase Hosting"
7. Clique em **"Registrar app"**
8. **COPIE** todo o objeto `firebaseConfig`:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyAbc123...",
  authDomain: "quatro-cantos.firebaseapp.com",
  projectId: "quatro-cantos",
  storageBucket: "quatro-cantos.appspot.com",
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

console.log(" Firebase inicializado com sucesso!");
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
- Use existing project: `quatro-cantos`
- Firestore Rules: `firestore.rules` (padrão)
- Firestore Indexes: `firestore.indexes.json` (padrão)

### Deploy das Regras

```powershell
firebase deploy --only firestore:rules
```

Aguarde a mensagem:
```
 Deploy complete!
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
 Firebase inicializado com sucesso!
```

### Passo 4: Criar Conta

1. Clique em **"Criar conta"**
2. Preencha os dados
3. Clique em **"Cadastrar Empresa"**

Se tudo estiver correto, você verá:
```
 Cadastro realizado com sucesso!
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

##  Regras de Segurança Configuradas (Multi-Tenancy)

O arquivo `firestore.rules` já contém regras com **isolamento por empresa**:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Produtos - Isolamento por companyId
    // Cada empresa só acessa seus próprios produtos
    match /produtos/{produto} {
      allow read: if request.auth != null && 
                  resource.data.companyId == request.auth.uid;
      allow create: if request.auth != null && 
                    request.resource.data.companyId == request.auth.uid;
      allow update, delete: if request.auth != null && 
                            resource.data.companyId == request.auth.uid;
    }
    
    // Movimentações - Isolamento por companyId
    match /movimentacoes/{movimentacao} {
      allow read, write: if request.auth != null && 
                          resource.data.companyId == request.auth.uid;
      allow create: if request.auth != null && 
                    request.resource.data.companyId == request.auth.uid;
    }
    
    // Funcionários - Isolamento por companyId
    match /funcionarios/{funcionario} {
      allow read, write: if request.auth != null && 
                          resource.data.companyId == request.auth.uid;
      allow create: if request.auth != null && 
                    request.resource.data.companyId == request.auth.uid;
    }
    
    // Usuários - Apenas o próprio usuário
    match /usuarios/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

### Significado das Regras:

- ** Isolamento Total:** Cada empresa (companyId) só acessa seus próprios dados
- ** Multi-Tenancy Seguro:** Empresas não veem dados de outras empresas
- ** Acesso Multi-Computador:** Mesma conta acessa de qualquer lugar
- ** Autenticação Obrigatória:** Apenas usuários logados podem acessar
- ** Validação Automática:** Firebase valida companyId em toda operação

### Como Funciona:

1. **Usuário se cadastra** → Firebase cria `uid` único
2. **companyId = uid** → Cada empresa tem ID exclusivo
3. **Ao salvar dados** → `companyId` é incluído automaticamente
4. **Ao ler dados** → Firebase filtra por `companyId` do usuário logado
5. **Resultado:** Isolamento total entre empresas

---

##  Troubleshooting

### Erro: "Firebase não configurado. Usando modo local."

**Solução:**
1. Verifique se `firebase-config.js` tem suas credenciais
2. Confirme se API Key está correta (sem espaços)
3. Verifique se o arquivo está sendo carregado (F12 > Network)

### Erro: "Permission denied"

**Solução:**
1. Execute: `firebase deploy --only firestore:rules`
2. Aguarde 1-2 minutos para propagar
##  Estrutura de Dados no Firestore (Multi-Tenancy)

###  Campo Obrigatório: `companyId`

**IMPORTANTE:** Todos os documentos devem incluir `companyId` para isolamento.

### Coleção: `usuarios`

```json
{
  "uid": "abc123def456",
  "companyId": "abc123def456",
  "email": "usuario@exemplo.com",
  "nomeEmpresa": "Quatro Cantos Materiais",
  "cnpj": "12.345.678/0001-90",
  "telefone": "(11) 98765-4321",
  "criadoEm": "2025-11-28T10:30:00Z"
}
```

### Coleção: `produtos`

```json
{
  "id": "prod001",
  "companyId": "abc123def456",
  "codigo": 1001,
  "nome": "Cimento CP-II 50kg",
  "quantidade": 500,
  "unidade": "sc",
  "dataFabricacao": "28/11/2025",
  "fornecedor": "Fornecedor X",
  "localizacao": "Galpão A - Prateleira 1",
  "valorUnitario": 32.50,
  "criadoPor": "abc123def456",
  "criadoEm": "2025-11-28T11:00:00Z"
}
```

### Coleção: `funcionarios`

```json
{
  "id": "func001",
  "companyId": "abc123def456",
  "nome": "Maria Santos",
  "cargo": "Gerente de Estoque",
  "cpf": "123.456.789-00",
  "telefone": "(11) 91234-5678",
  "salario": 3500.00,
  "dataAdmissao": "15/01/2025",
  "criadoEm": "2025-11-28T09:00:00Z"
}
```

### Coleção: `movimentacoes`

```json
{
  "id": "mov001",
  "companyId": "abc123def456",
  "tipo": "saida",
  "produtoNome": "Cimento CP-II 50kg",
  "produtoCodigo": 1001,
  "quantidade": 50,
  "valorUnitario": 32.50,
  "valorTotal": 1625.00,
  "dataHora": "2025-11-28T14:30:00Z",
  "usuarioId": "abc123def456",
  "observacao": "Venda para Cliente Y - Nota Fiscal 12345"
}
```

###  Validação de companyId

O sistema **sempre** inclui `companyId` automaticamente:

```javascript
// Exemplo: Cadastrando produto
const produto = {
  codigo: 1001,
  nome: "Cimento",
  quantidade: 500,
  companyId: firebase.auth().currentUser.uid  // ← Automático
};

db.collection('produtos').add(produto);
```

###  Consultas com Filtro

Todas as consultas filtram por `companyId`:

```javascript
// Listar produtos da empresa
db.collection('produtos')
  .where('companyId', '==', firebase.auth().currentUser.uid)
  .get();
```fornecedor": "Fornecedor X",
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

##  Próximos Passos

Após configurar o Firebase:

1.  Teste todas as funcionalidades
2.  Cadastre produtos de exemplo
3.  Faça movimentações de teste
4.  Verifique persistência dos dados
5.  Teste em diferentes dispositivos
6.  Configure backup automático (opcional)

---

##  Recursos Adicionais

- **Documentação Firebase:** https://firebase.google.com/docs
- **Firestore Guides:** https://firebase.google.com/docs/firestore
- **Authentication Docs:** https://firebase.google.com/docs/auth
- **Console Firebase:** https://console.firebase.google.com

---

** Configuração completa! Seu sistema agora está 100% integrado à nuvem!**
