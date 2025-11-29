# 🔥 Firebase - Configuração e Status

## 📊 Status Atual: DEMO MODE

O sistema está configurado com **credenciais demo** para testes imediatos.

---

## 🎯 Configuração Atual (Demo)

### Arquivo: `web/static/js/firebase-config.js`

```javascript
const firebaseConfig = {
    apiKey: "AIzaSyDemo_QuatroCantos_2025",
    authDomain: "quatro-cantos-demo.firebaseapp.com",
    projectId: "quatro-cantos-demo",
    storageBucket: "quatro-cantos-demo.appspot.com",
    messagingSenderId: "123456789000",
    appId: "1:123456789000:web:abcdef1234567890abcdef"
};
```

### ⚠️ Importante

Estas são **credenciais fictícias** para fins de desenvolvimento e teste local. O sistema funcionará com `localStorage` como fallback.

---

## 🚀 Como Configurar Firebase Real (Quando Necessário)

### Passo 1: Criar Projeto no Firebase

1. Acesse: https://console.firebase.google.com
2. Clique em **"Adicionar projeto"**
3. Nome do projeto: `quatro-cantos` (ou outro nome de sua preferência)
4. Desabilite Google Analytics (opcional)
5. Clique em **"Criar projeto"**

### Passo 2: Registrar Aplicativo Web

1. No console do Firebase, clique no ícone **Web** (`</>`)
2. Apelido do app: `Quatro Cantos Web`
3. Marque: ✅ **"Configurar Firebase Hosting"**
4. Clique em **"Registrar app"**

### Passo 3: Copiar Credenciais

Você verá algo assim:

```javascript
const firebaseConfig = {
    apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    authDomain: "quatro-cantos-12345.firebaseapp.com",
    projectId: "quatro-cantos-12345",
    storageBucket: "quatro-cantos-12345.appspot.com",
    messagingSenderId: "987654321000",
    appId: "1:987654321000:web:abc123def456789ghi"
};
```

**Copie estas credenciais!** 📋

### Passo 4: Substituir no Código

Edite o arquivo: `t:\Sistemas_Desenvolvimento\projetowash\web\static\js\firebase-config.js`

**Substitua** as linhas 5-11 com suas credenciais reais:

```javascript
// ANTES (Demo):
apiKey: "AIzaSyDemo_QuatroCantos_2025",
authDomain: "quatro-cantos-demo.firebaseapp.com",
// ...

// DEPOIS (Real):
apiKey: "SUA_API_KEY_AQUI",
authDomain: "seu-projeto.firebaseapp.com",
// ...
```

### Passo 5: Ativar Authentication

1. No console Firebase, menu lateral: **Authentication**
2. Clique em **"Começar"**
3. Aba **"Sign-in method"**
4. Ative: **Email/Password**
   - Email/senha: ✅ **Ativar**
   - Link de email (sem senha): ❌ Desativar

### Passo 6: Criar Firestore Database

1. Menu lateral: **Firestore Database**
2. Clique em **"Criar banco de dados"**
3. Modo: **Teste** (para desenvolvimento) ou **Produção**
4. Local: `us-central1` (ou mais próximo)
5. Clique em **"Ativar"**

### Passo 7: Configurar Regras do Firestore

Na aba **"Regras"**, substitua o conteúdo por:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Regra para usuários (leitura/escrita própria)
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Regra para produtos (isolamento por company_id)
    match /produtos/{produtoId} {
      allow read, write: if request.auth != null 
        && request.resource.data.company_id == request.auth.uid;
    }
    
    // Regra para funcionários (isolamento por company_id)
    match /funcionarios/{funcionarioId} {
      allow read, write: if request.auth != null 
        && request.resource.data.company_id == request.auth.uid;
    }
  }
}
```

Clique em **"Publicar"**

---

## 📁 Estrutura do Firestore

### Collection: `users`
```javascript
{
  "uid": "abc123...",
  "email": "empresa@exemplo.com",
  "nomeEmpresa": "Construtora XYZ",
  "segmento": "construcao",
  "role": "admin",
  "createdAt": "2025-01-15T10:30:00Z"
}
```

### Collection: `produtos`
```javascript
{
  "company_id": "abc123...",
  "codigo": "CIM001",
  "nome": "Cimento Portland CP II",
  "tipo_material": "materia_prima",
  "categoria": "Cimentos e Argamassas",
  "lote": "2025001",
  "serial": "SER123456",
  "quantidade": 100,
  "unidade_medida": "SC",
  "data": "2025-01-15",
  "fornecedor": "Cimentos Brasil LTDA",
  "local": "Galpão A - Setor 1",
  "valor": 35.50,
  "createdAt": "2025-01-15T10:35:00Z"
}
```

### Collection: `funcionarios`
```javascript
{
  "company_id": "abc123...",
  "nome": "João Silva",
  "cpf": "123.456.789-00",
  "cargo": "Operador de Empilhadeira",
  "departamento": "Logística",
  "salario": 2500.00,
  "dataAdmissao": "2025-01-10",
  "createdAt": "2025-01-15T10:40:00Z"
}
```

---

## 🔐 Segurança Multi-Tenant

### Conceito

Cada empresa (usuário) tem seu próprio `company_id` (igual ao `uid` do Firebase Auth). Os dados são isolados automaticamente:

```
Empresa A (uid: abc123)
  ├── Produtos com company_id: abc123
  └── Funcionários com company_id: abc123

Empresa B (uid: xyz789)
  ├── Produtos com company_id: xyz789
  └── Funcionários com company_id: xyz789
```

### Implementação

Ao salvar dados, o sistema automaticamente adiciona `company_id`:

```javascript
// Em firebase-config.js (linha ~80):
const user = firebase.auth().currentUser;
const productData = {
    ...formData,
    company_id: user.uid,  // 🔒 Isolamento automático
    createdAt: new Date().toISOString()
};
```

Ao consultar dados, filtra por `company_id`:

```javascript
// Em firestore-service.js:
const snapshot = await firebase.firestore()
    .collection('produtos')
    .where('company_id', '==', user.uid)  // 🔒 Só vê os próprios
    .get();
```

---

## 🧪 Testando Firebase Local vs Real

### Modo Local (Atual - Demo)

- ✅ Funciona imediatamente
- ✅ Dados em `localStorage`
- ✅ Sem necessidade de internet
- ❌ Não sincroniza entre dispositivos
- ❌ Dados perdidos ao limpar cache

### Modo Real (Após Configuração)

- ✅ Sincronização em nuvem
- ✅ Acesso de múltiplos dispositivos
- ✅ Dados persistentes
- ✅ Backup automático
- ❌ Requer internet
- ❌ Custos após uso gratuito

---

## 💰 Plano Gratuito Firebase

### Limites Generosos:

| Recurso | Limite Gratuito |
|---------|-----------------|
| **Autenticação** | 10.000 verificações/mês |
| **Firestore Leituras** | 50.000/dia |
| **Firestore Escritas** | 20.000/dia |
| **Armazenamento** | 1 GB |
| **Transferência** | 10 GB/mês |

### Estimativa para Uso Educacional:

- 👥 **20 alunos** testando simultaneamente
- 📝 **100 produtos** cadastrados por aluno
- 📊 **1.000 operações** por dia

**Resultado:** Bem dentro do plano gratuito! ✅

---

## 🔄 Ativação do Firebase no Código

### Atualmente Desativado

No arquivo `web/index.html`, as configurações Firebase estão em modo LOCAL:

```html
<!-- Linha ~551: -->
<script src="/static/js/local-auth.js"></script>
<script src="/static/js/local-firestore.js"></script>

<!-- COMENTADO: Firebase real
<script src="/static/js/auth.js"></script>
<script src="/static/js/firestore-service.js"></script>
-->
```

### Para Ativar Firebase Real:

**Comente as linhas locais e descomente as Firebase:**

```html
<!-- Linha ~551: -->
<!-- <script src="/static/js/local-auth.js"></script> -->
<!-- <script src="/static/js/local-firestore.js"></script> -->

<!-- ATIVADO: Firebase real -->
<script src="/static/js/auth.js"></script>
<script src="/static/js/firestore-service.js"></script>
```

**Importante:** Só faça isso APÓS configurar as credenciais reais no Passo 4!

---

## 📋 Checklist de Configuração

Use este checklist quando for configurar Firebase real:

- [ ] 1. Criar projeto no Firebase Console
- [ ] 2. Registrar aplicativo web
- [ ] 3. Copiar credenciais
- [ ] 4. Substituir em `firebase-config.js`
- [ ] 5. Ativar Authentication (Email/Password)
- [ ] 6. Criar Firestore Database
- [ ] 7. Configurar regras de segurança
- [ ] 8. Ativar scripts Firebase em `index.html`
- [ ] 9. Testar cadastro de usuário
- [ ] 10. Testar cadastro de produto
- [ ] 11. Verificar dados no Firebase Console
- [ ] 12. Testar em múltiplos navegadores

---

## 🐛 Troubleshooting Firebase

### Erro: "Firebase: Error (auth/api-key-not-valid)"
**Solução:** Verifique se copiou a API Key corretamente

### Erro: "Missing or insufficient permissions"
**Solução:** Verifique as regras do Firestore (Passo 7)

### Erro: "Network request failed"
**Solução:** Verifique conexão com internet

### Dados não aparecem no Console
**Solução:** Verifique se `company_id` está sendo salvo corretamente

### Usuário não consegue fazer login
**Solução:** Verifique se Authentication está ativado

---

## 📚 Documentação Oficial

- **Firebase Docs:** https://firebase.google.com/docs
- **Authentication:** https://firebase.google.com/docs/auth
- **Firestore:** https://firebase.google.com/docs/firestore
- **Security Rules:** https://firebase.google.com/docs/rules

---

## ✅ Resumo

| Item | Status Atual | Produção |
|------|-------------|----------|
| **Código** | ✅ Pronto | ✅ Pronto |
| **Credenciais** | 🟡 Demo | ⚪ Configurar |
| **Authentication** | ✅ Implementado | ⚪ Ativar |
| **Firestore** | ✅ Implementado | ⚪ Criar |
| **Regras** | ✅ Definidas | ⚪ Publicar |
| **Multi-Tenant** | ✅ Implementado | ✅ Pronto |
| **Testes** | ✅ Local OK | ⚪ Testar Cloud |

### Próximo Passo

O sistema está **100% funcional em modo local**. Quando precisar de sincronização na nuvem, siga os 7 passos acima (leva ~15 minutos).

---

*Documentação Firebase - Quatro Cantos © 2025*
