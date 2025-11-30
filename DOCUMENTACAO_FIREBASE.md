# 📚 Documentação do Sistema ProjetoWash - Firebase Multi-Tenant

## 🎯 Visão Geral

O **ProjetoWash** é um sistema de gestão completo com arquitetura multi-tenant, onde cada empresa possui seu próprio espaço isolado de dados na nuvem. O sistema utiliza Firebase como backend, garantindo sincronização em tempo real, backup automático e acesso de qualquer dispositivo.

---

## 🏗️ Arquitetura Multi-Tenant

### O que é Multi-Tenant?

Multi-tenant (multi-inquilino) é uma arquitetura onde **múltiplas empresas compartilham a mesma aplicação**, mas cada uma tem **dados completamente isolados** e invisíveis para as outras.

### Como Funciona no ProjetoWash

```
🏢 Empresa A (companyId: "uid-empresa-a")
   └── Admin A vê apenas:
       ├── Usuários da Empresa A
       ├── Estoque da Empresa A
       ├── Financeiro da Empresa A
       └── RH da Empresa A

🏢 Empresa B (companyId: "uid-empresa-b")
   └── Admin B vê apenas:
       ├── Usuários da Empresa B
       ├── Estoque da Empresa B
       ├── Financeiro da Empresa B
       └── RH da Empresa B
```

**✅ Isolamento Garantido:** Empresa A NUNCA vê dados da Empresa B e vice-versa.

---

## 🔐 Sistema de Segurança (3 Camadas)

### 1️⃣ Firebase Authentication
- Login com email/senha
- Tokens JWT criptografados
- Sessão persistente entre dispositivos
- Recuperação de senha via email

### 2️⃣ Firestore Security Rules (Servidor)
```javascript
// Exemplo de regra no servidor Firebase
match /estoque/{produtoId} {
  allow read: if isAuthenticated() && 
                 resource.data.companyId == getUserCompanyId();
}
```
- **Validação no servidor** (impossível burlar pelo cliente)
- Bloqueia acesso entre empresas
- Valida companyId em todas operações

### 3️⃣ Filtros JavaScript (Cliente)
```javascript
// Exemplo de filtro no código
const usuarios = await db.collection('usuarios')
  .where('companyId', '==', currentUser.companyId)
  .get();
```
- Filtros adicionais no código
- Camada extra de segurança
- Validação de permissões por role (admin/user)

---

## 📊 Estrutura do Banco de Dados Firestore

### Coleções Principais

#### 1. **usuarios**
```json
{
  "uid-usuario-123": {
    "nome": "João Silva",
    "email": "joao@empresa.com",
    "companyId": "uid-empresa-a",
    "role": "admin",
    "cargo": "Administrador",
    "contato": "(71) 99999-9999",
    "allowedModules": ["operacional", "estoque", "financeiro", "rh"],
    "dataCadastro": "2025-11-30T10:00:00Z",
    "ativo": true
  }
}
```

#### 2. **estoque**
```json
{
  "produto-xyz": {
    "nome": "Produto X",
    "categoria": "Limpeza",
    "quantidade": 100,
    "companyId": "uid-empresa-a",
    "preco": 25.50,
    "fornecedor": "Fornecedor Y",
    "dataAtualizacao": "2025-11-30T14:30:00Z"
  }
}
```

#### 3. **movimentacoes**
```json
{
  "mov-abc": {
    "tipo": "entrada",
    "produtoId": "produto-xyz",
    "quantidade": 50,
    "companyId": "uid-empresa-a",
    "responsavel": "João Silva",
    "data": "2025-11-30T15:00:00Z",
    "observacao": "Compra fornecedor"
  }
}
```

#### 4. **financeiro**
```json
{
  "transacao-123": {
    "tipo": "receita",
    "valor": 1500.00,
    "companyId": "uid-empresa-a",
    "categoria": "Vendas",
    "descricao": "Venda produtos",
    "data": "2025-11-30T16:00:00Z",
    "status": "confirmado"
  }
}
```

#### 5. **folha_pagamento**
```json
{
  "folha-202511": {
    "funcionarioId": "uid-funcionario-456",
    "companyId": "uid-empresa-a",
    "salario": 3000.00,
    "descontos": 450.00,
    "liquido": 2550.00,
    "mesReferencia": "2025-11",
    "status": "pago"
  }
}
```

---

## 🚀 Fluxo de Cadastro de Empresa

### Passo a Passo:

1. **Usuário Acessa o Sistema**
   - URL: https://projetowash.netlify.app
   - Clica em "Cadastre-se"

2. **Preenche Dados da Empresa**
   ```
   Nome: João Silva
   Email: joao@minhaempresa.com
   Contato: (71) 99999-9999
   Login: joao.silva
   Senha: ******
   Nome Empresa: Minha Lavanderia Ltda
   Segmento: Lavanderia
   ```

3. **Sistema Cria Automaticamente**
   - ✅ Conta no Firebase Authentication
   - ✅ `companyId` único = UID do usuário
   - ✅ Documento na coleção `usuarios` com role "admin"
   - ✅ Tema personalizado baseado no segmento

4. **Resultado**
   - Admin pode fazer login
   - Vê dashboard vazio (nova empresa)
   - Pode cadastrar funcionários
   - Pode adicionar dados (estoque, financeiro, etc)

---

## 👥 Gerenciamento de Usuários

### Tipos de Usuário

#### 🔑 Administrador (role: "admin")
**Permissões:**
- ✅ Ver todos usuários da empresa
- ✅ Cadastrar novos funcionários
- ✅ Editar/excluir funcionários
- ✅ Acesso a todos módulos
- ✅ Gerenciar configurações
- ❌ NÃO vê usuários de outras empresas

#### 👤 Funcionário (role: "user")
**Permissões:**
- ✅ Ver apenas próprio perfil
- ✅ Acessar módulos permitidos
- ✅ Registrar movimentações
- ❌ NÃO cadastra outros usuários
- ❌ NÃO acessa módulos não autorizados
- ❌ NÃO vê dados de outras empresas

### Como Cadastrar Funcionário

**Admin logado executa:**

1. Clica em "Gerenciar Usuários"
2. Clica em "Novo Funcionário"
3. Preenche formulário:
   ```
   Nome: Maria Santos
   Email: maria@minhaempresa.com
   Cargo: Operadora
   Módulos: [Operacional, Estoque Entrada]
   Senha: ******
   ```
4. Sistema cria funcionário com:
   - `companyId` = mesmo do admin
   - `role` = "user"
   - `allowedModules` = selecionados pelo admin

**✅ Funcionário já pode fazer login e acessar apenas seus módulos permitidos.**

---

## 🌐 Acesso Multi-Dispositivo

### Dispositivos Suportados

#### 💻 Desktop
- Windows, Mac, Linux
- Navegadores: Chrome, Firefox, Edge, Safari
- Resolução: 1920x1080 (4 colunas) ou superior

#### 📱 Tablet
- iPad, Samsung Galaxy Tab, etc
- Resolução: 768px - 1024px
- Layout: 2 colunas

#### 📱 Smartphone
- iPhone, Android
- Resolução: < 768px
- Layout: 1 coluna (empilhado)

### Sincronização

**Cenário Real:**
1. Admin cadastra produto no **notebook** do escritório
2. Produto aparece **instantaneamente** no **celular** do gerente
3. Funcionário registra saída no **tablet** do estoque
4. Dashboard atualiza **em tempo real** no **desktop** do admin

**Como Funciona:**
- Firebase Realtime Sync
- WebSocket persistente
- Latência: < 500ms (Brasil)
- Funciona em qualquer rede (WiFi, 4G, 5G)

---

## 📲 Layout Responsivo

### Breakpoints CSS

```css
/* Desktop - 4 colunas */
@media (min-width: 1920px) {
  .dashboard-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

/* Laptop - 3 colunas */
@media (min-width: 1024px) and (max-width: 1919px) {
  .dashboard-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* Tablet - 2 colunas */
@media (min-width: 768px) and (max-width: 1023px) {
  .dashboard-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Mobile - 1 coluna */
@media (max-width: 767px) {
  .dashboard-grid {
    grid-template-columns: 1fr;
  }
}
```

### Elementos Adaptáveis

- ✅ Cards redimensionam automaticamente
- ✅ Tabelas com scroll horizontal em mobile
- ✅ Menus colapsam em hamburger menu
- ✅ Formulários empilham campos verticalmente
- ✅ Gráficos ajustam proporções
- ✅ Botões aumentam área de toque em mobile

---

## 🔧 Configuração Firebase (Detalhada)

### Passo 1: Criar Projeto

1. Acesse: https://console.firebase.google.com
2. Clique em "Adicionar projeto"
3. Nome: `projetowash-production`
4. Desabilite Google Analytics (opcional)
5. Clique em "Criar projeto"

### Passo 2: Ativar Authentication

1. Menu lateral: **Authentication**
2. Clique em "Começar"
3. Aba "Sign-in method"
4. Habilite: **Email/Password**
5. Salve

### Passo 3: Criar Firestore

1. Menu lateral: **Firestore Database**
2. Clique em "Criar banco de dados"
3. Localização: **southamerica-east1 (São Paulo)**
4. Modo: **Produção**
5. Clique em "Ativar"

### Passo 4: Configurar Regras

1. Aba **"Regras"** no Firestore
2. Cole o conteúdo de `firestore.rules` do projeto
3. Clique em "Publicar"

### Passo 5: Obter Credenciais

1. ⚙️ Configurações do Projeto
2. Seção "Seus aplicativos"
3. Clique no ícone `</>`
4. Nome: `ProjetoWash Web`
5. Copie o objeto `firebaseConfig`

### Passo 6: Atualizar Código

**Arquivo:** `web/static/js/firebase-config.js`

```javascript
const firebaseConfig = {
    apiKey: "SUA_API_KEY",
    authDomain: "seu-projeto.firebaseapp.com",
    projectId: "seu-projeto",
    storageBucket: "seu-projeto.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abc123"
};
```

### Passo 7: Deploy

```bash
# Commit
git add web/static/js/firebase-config.js
git commit -m "feat: Atualizar credenciais Firebase"
git push origin main

# Deploy automático no Netlify!
```

---

## 🧪 Testes Multi-Tenant

### Cenários de Teste

#### Teste 1: Isolamento de Empresas
```python
# Criar 2 empresas
empresa_a = cadastrar_empresa("Empresa A")
empresa_b = cadastrar_empresa("Empresa B")

# Admin A tenta ver usuários
usuarios = listar_usuarios_como(admin_a)

# ✅ Deve retornar apenas usuários da Empresa A
assert all(u["companyId"] == empresa_a.id for u in usuarios)
assert not any(u["companyId"] == empresa_b.id for u in usuarios)
```

#### Teste 2: Firestore Rules
```javascript
// Admin A tenta acessar produto da Empresa B
const produto_b = await db.collection('estoque')
  .doc('produto-empresa-b')
  .get();

// ❌ Deve ser bloqueado pelas regras
// Error: Missing or insufficient permissions
```

#### Teste 3: Cadastro de Funcionário
```javascript
// Admin A cadastra funcionário
const func = await cadastrarFuncionario({
  nome: "José",
  email: "jose@empresaa.com",
  cargo: "Operador"
});

// ✅ companyId deve ser igual ao do admin
assert(func.companyId === admin_a.companyId);
```

### Executar Testes

```bash
# Ativar ambiente virtual
.venv\Scripts\Activate.ps1

# Executar testes
pytest tests/ -v

# Saída esperada:
# ✅ 17 tests passed
```

---

## 💰 Custos Firebase (Plano Gratuito)

### Spark Plan (Grátis)

#### Firestore
- **Leituras:** 50.000/dia
- **Escritas:** 20.000/dia
- **Exclusões:** 20.000/dia
- **Armazenamento:** 1 GB

#### Authentication
- **Usuários:** Ilimitados
- **Logins:** Ilimitados

#### Estimativa de Uso

**Cenário: 10 empresas, 5 funcionários cada**
- Total: 50 usuários
- Uso médio: ~5.000 leituras/dia
- Uso médio: ~1.000 escritas/dia

**✅ Dentro do plano gratuito!**

### Quando Atualizar para Blaze (Paga Conforme Uso)

- Mais de 100 empresas
- Mais de 10.000 leituras/dia
- Precisa de Cloud Functions
- Precisa de Firebase Storage

**Custo estimado:** $1-5/mês para 200 usuários ativos

---

## 🔍 Troubleshooting

### Problema: "Firebase not initialized"

**Causa:** Credenciais incorretas ou Firebase desabilitado

**Solução:**
1. Verifique `firebase-config.js`
2. Confirme credenciais no Firebase Console
3. Verifique console do navegador (F12)

### Problema: "Permission denied"

**Causa:** Regras de segurança bloqueando acesso

**Solução:**
1. Verifique se usuário está logado
2. Confirme que `companyId` está presente no documento
3. Revise regras em Firestore > Regras

### Problema: "User not found"

**Causa:** Usuário não existe ou email incorreto

**Solução:**
1. Verifique no Firebase Console > Authentication
2. Confirme email digitado corretamente
3. Use "Recuperar senha" se necessário

### Problema: Deploy não atualiza

**Causa:** Cache do navegador ou deploy pendente

**Solução:**
```bash
# Verificar status do deploy
# Acesse: https://app.netlify.com/sites/projetowash/deploys

# Forçar novo deploy
git commit --allow-empty -m "chore: Trigger deploy"
git push origin main

# Limpar cache do navegador
Ctrl + Shift + R (Windows)
Cmd + Shift + R (Mac)
```

---

## 📞 Suporte e Contato

### Documentação Adicional

- **Firebase:** https://firebase.google.com/docs
- **Firestore:** https://firebase.google.com/docs/firestore
- **Authentication:** https://firebase.google.com/docs/auth
- **Netlify:** https://docs.netlify.com

### Logs e Monitoramento

**Firebase Console:**
- Authentication: Ver logins e usuários
- Firestore: Ver dados em tempo real
- Regras: Testar regras de segurança

**Netlify:**
- Deploy logs: Ver erros de build
- Function logs: Ver erros de runtime
- Analytics: Ver visitantes e tráfego

---

## 🎓 Boas Práticas

### Segurança

1. ✅ Nunca compartilhe credenciais publicamente
2. ✅ Use variáveis de ambiente em produção
3. ✅ Mantenha regras de segurança atualizadas
4. ✅ Revise permissões de usuários regularmente
5. ✅ Ative autenticação de dois fatores (admin)

### Performance

1. ✅ Use índices compostos para queries complexas
2. ✅ Limite resultados com `.limit(100)`
3. ✅ Use cache para dados estáticos
4. ✅ Otimize imagens (compressão)
5. ✅ Minimize requests desnecessários

### Manutenção

1. ✅ Faça backup regular (Firestore Export)
2. ✅ Monitore uso de quota (Firebase Console)
3. ✅ Teste antes de atualizar regras
4. ✅ Documente mudanças no código
5. ✅ Mantenha dependências atualizadas

---

## 🚀 Próximos Passos

### Funcionalidades Futuras

- [ ] Relatórios em PDF
- [ ] Notificações push
- [ ] Integração com WhatsApp
- [ ] Dashboard analytics avançado
- [ ] App mobile nativo (React Native)
- [ ] Backup automático agendado
- [ ] Importação/exportação Excel
- [ ] Multi-idioma (PT/EN/ES)

### Melhorias de Performance

- [ ] Service Worker para offline-first
- [ ] Lazy loading de módulos
- [ ] Compressão de imagens WebP
- [ ] CDN para assets estáticos
- [ ] Pré-carregamento de dados críticos

---

## 📊 Status do Projeto

**Versão:** 1.0.0  
**Data:** 30 de Novembro de 2025  
**Status:** ✅ Produção  

### Tecnologias

- **Frontend:** HTML5, CSS3, JavaScript (Vanilla)
- **Backend:** Firebase (Authentication + Firestore)
- **Deploy:** Netlify
- **Testes:** pytest
- **Versionamento:** Git + GitHub

### Métricas

- ✅ 17 testes automatizados (100% passing)
- ✅ Layout 100% responsivo
- ✅ Multi-tenant completo
- ✅ 3 camadas de segurança
- ✅ Sincronização tempo real
- ✅ Backup automático na nuvem

---

**🎉 Sistema ProjetoWash - Pronto para Produção!**

*Desenvolvido com ❤️ para gestão eficiente de lavanderias e empresas de serviços.*
