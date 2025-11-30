# Configuração Firebase - Sistema Multi-Tenant

## Visão Geral

Este sistema implementa **multi-tenancy completo**, onde:
- ✅ Cada empresa tem seu próprio `companyId` único
- ✅ Dados totalmente isolados entre empresas (estoque, financeiro, RH, usuários)
- ✅ Admin só vê e gerencia usuários da própria empresa
- ✅ Acesso de qualquer dispositivo/rede (dados na nuvem)
- ✅ Layout responsivo mantido (mobile, tablet, desktop)

---

## 📋 Passo a Passo - Ativação do Firebase

### 1. Criar Projeto Firebase

1. Acesse: https://console.firebase.google.com
2. Clique em **"Adicionar projeto"**
3. Nome do projeto: `sua-empresa-wash` (ou nome desejado)
4. Desabilite Google Analytics (opcional)
5. Clique em **"Criar projeto"**
6. Aguarde a criação (30-60 segundos)

### 2. Ativar Authentication

1. No menu lateral, clique em **"Authentication"**
2. Clique em **"Começar"**
3. Aba **"Sign-in method"**
4. Clique em **"Email/Password"**
5. **Habilite** a primeira opção
6. Clique em **"Salvar"**

### 3. Criar Firestore Database

1. No menu lateral, clique em **"Firestore Database"**
2. Clique em **"Criar banco de dados"**
3. Localização: **`southamerica-east1`** (São Paulo)
4. Modo: **"Produção"**
5. Clique em **"Ativar"**

### 4. Configurar Regras de Segurança

1. No Firestore, clique na aba **"Regras"**
2. **Apague** todo o conteúdo
3. **Copie** o conteúdo de `firestore.rules`
4. **Cole** no editor
5. Clique em **"Publicar"**

### 5. Obter Credenciais

1. Clique no ícone ⚙️ → **"Configurações do projeto"**
2. Seção **"Seus aplicativos"**
3. Clique em **</> Web**
4. Nome: `Quatro Cantos Web`
5. **Copie** o `firebaseConfig`

### 6. Atualizar Código

Abra `web/static/js/firebase-config.js` e substitua:

```javascript
const firebaseConfig = {
    apiKey: "SUA_API_KEY_AQUI",
    authDomain: "seu-projeto.firebaseapp.com",
    projectId: "seu-projeto",
    storageBucket: "seu-projeto.appspot.com",
    messagingSenderId: "123456789012",
    appId: "1:123456789012:web:abc123",
    measurementId: "G-ABC123"
};
```

### 7. Deploy

```powershell
git add .
git commit -m "feat: Ativar Firebase produção"
git push origin main
```

---

## 🏢 Como Funciona o Multi-Tenant

### Cada Empresa é Isolada

```javascript
// Documento no Firestore
{
  codigo: "P001",
  nome: "Produto X",
  quantidade: 100,
  companyId: "abc123", // ← ISOLAMENTO
  dataCriacao: "2025-11-30"
}
```

### Filtros Automáticos

```javascript
// Buscar produtos - SEMPRE filtra
db.collection('estoque')
  .where('companyId', '==', currentUser.companyId)
  .get();
```

### Admin vs Funcionário

**Admin:**
- `companyId`: Próprio (gerado no cadastro)
- `role`: `'admin'`
- Cadastra funcionários
- Vê todos os dados da empresa

**Funcionário:**
- `companyId`: **Mesmo do admin**
- `role`: `'user'`
- Acesso limitado por módulos
- Vê apenas dados da própria empresa

---

## 👥 Gerenciar Usuários

### Cadastrar Funcionário

1. Login como Admin
2. Menu → **"Configurações"**
3. **"Gerenciar Usuários"**
4. **"Novo Usuário"**
5. Preencha dados e módulos permitidos
6. **"Salvar"**

### Listar Usuários

Admin vê **apenas** usuários da própria empresa:

```javascript
// Automaticamente filtrado
const usuarios = await db.collection('usuarios')
    .where('companyId', '==', currentUser.companyId)
    .get();
```

---

## 📱 Acesso Multi-Dispositivo

### ✅ Funciona Em

- Qualquer computador
- Qualquer celular
- Qualquer rede Wi-Fi
- Dados móveis (4G/5G)
- Diferentes cidades/países

### ✅ Navegadores

- Chrome (recomendado)
- Edge
- Firefox
- Safari

### ✅ Dispositivos

- Desktop
- Notebook
- Tablet
- Smartphone

**Layout responsivo se adapta automaticamente!**

---

## 🔒 Segurança

### 3 Camadas de Proteção

1. **Firestore Rules:** Bloqueia no servidor
2. **JavaScript:** Filtros automáticos
3. **Authentication:** Email/senha

### Impossível

- ❌ Empresa A ver dados da Empresa B
- ❌ Funcionário ver outras empresas
- ❌ Criar dados sem `companyId`
- ❌ Modificar `companyId` existente

---

## 🧪 Testar Isolamento

1. **Criar Empresa A:**
   - Email: `empresaA@test.com`
   - Adicionar 3 produtos

2. **Logout**

3. **Criar Empresa B:**
   - Email: `empresaB@test.com`
   - Adicionar 2 produtos

4. **Login Empresa A:**
   - Vê apenas 3 produtos
   - Não vê admin da Empresa B

5. **Login Empresa B:**
   - Vê apenas 2 produtos
   - Não vê admin da Empresa A

✅ **Dados completamente isolados!**

---

## 📊 Monitoramento

Acesse: https://console.firebase.google.com

**Ver:**
- Total de usuários
- Operações no banco
- Tentativas de acesso negadas

**Plano Gratuito:**
- 10.000 autenticações/mês
- 50.000 leituras/dia
- 20.000 gravações/dia
- 1 GB armazenamento

---

## ❓ Problemas Comuns

### "Firebase não configurado"

**Solução:** Atualizar credenciais em `firebase-config.js`

### "Missing permissions"

**Solução:** Publicar `firestore.rules` no console

### "Email already in use"

**Solução:** Usar outro email ou deletar usuário no console

---

## ✅ Checklist

- [ ] Projeto Firebase criado
- [ ] Authentication habilitado
- [ ] Firestore criado
- [ ] Regras publicadas
- [ ] Credenciais atualizadas
- [ ] Deploy no Netlify
- [ ] Empresa cadastrada
- [ ] Testado em outro dispositivo

**Sistema pronto para produção!** 🎉

---

## 📞 Documentação

- Firebase: https://firebase.google.com/docs
- Firestore Rules: https://firebase.google.com/docs/firestore/security
- Authentication: https://firebase.google.com/docs/auth/web/start
