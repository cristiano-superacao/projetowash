# TESTE LOCAL - Passo a Passo

## IMPORTANTE: Firebase Precisa Estar Configurado

Mesmo para teste local, o Firebase precisa estar configurado porque:
- Sistema usa autenticacao Firebase
- Dados salvos no Firestore (nuvem)
- Sem Firebase = sistema nao funciona

## OPCAO 1: Configurar Firebase Primeiro (Recomendado)

### Passo 1: Criar Projeto Firebase (5 minutos)

1. Acesse: https://console.firebase.google.com/
2. Clique em "Adicionar projeto"
3. Nome: `estoque-certo-ltda` (ou qualquer nome)
4. Desabilite Analytics (opcional)
5. Clique em "Criar projeto"

### Passo 2: Ativar Authentication (2 minutos)

1. No menu lateral: "Authentication"
2. Clique em "Comecar"
3. Ative "Email/Senha"
4. Salvar

### Passo 3: Criar Firestore (2 minutos)

1. No menu lateral: "Firestore Database"
2. Clique em "Criar banco de dados"
3. Modo: "Producao"
4. Localizacao: "southamerica-east1"
5. Ativar

### Passo 4: Obter Credenciais (2 minutos)

1. Engrenagem > "Configuracoes do projeto"
2. Role ate "Seus aplicativos"
3. Clique no icone `</>`
4. Nome: "Estoque Certo Web"
5. Copie TODO o objeto `firebaseConfig`

### Passo 5: Colar Credenciais

1. Abra: `web/static/js/firebase-config.js`
2. Substitua as linhas 3-11 pelas suas credenciais
3. Salve o arquivo

Exemplo:
```javascript
const firebaseConfig = {
    apiKey: "AIzaSyB1a2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q",
    authDomain: "seu-projeto.firebaseapp.com",
    projectId: "seu-projeto",
    storageBucket: "seu-projeto.appspot.com",
    messagingSenderId: "123456789012",
    appId: "1:123456789012:web:abc123",
    measurementId: "G-ABC123"
};
```

### Passo 6: Criar Usuario Admin (3 minutos)

1. Firebase Console > Authentication > Users
2. "Add user"
3. Email: `admin@teste.com`
4. Senha: `Admin123`
5. Copie o UID do usuario

6. Firestore > "Iniciar colecao"
7. ID: `usuarios`
8. Documento ID: [Cole o UID]
9. Campos:
   - nome: "Admin"
   - email: "admin@teste.com"
   - role: "admin"
   - ativo: true
10. Salvar

### Passo 7: Testar Localmente

Agora sim pode testar!

**Opcao A: VS Code Live Server (Recomendado)**
1. Instale extensao "Live Server"
2. Clique direito em `web/index.html`
3. "Open with Live Server"
4. Abre em: http://localhost:5500

**Opcao B: Python HTTP Server**
```powershell
cd web
python -m http.server 8000
```
Acesse: http://localhost:8000

**Opcao C: Node.js HTTP Server**
```powershell
cd web
npx http-server -p 8000
```

### Passo 8: Fazer Login

Email: `admin@teste.com`
Senha: `Admin123`

---

## OPCAO 2: Testar Interface SEM Firebase (Limitado)

Se quiser apenas ver a interface (sem funcionalidades):

```powershell
cd web
python -m http.server 8000
```

Acesse: http://localhost:8000

**O que funciona:**
- Ver o design
- Ver layout responsivo
- Animacoes CSS

**O que NAO funciona:**
- Login (precisa Firebase)
- Cadastro (precisa Firebase)
- Qualquer funcionalidade (precisa Firebase)

---

## SOLUCAO DE PROBLEMAS

### "Firebase is not defined"
- Scripts do Firebase no HTML estao corretos
- Limpe cache: Ctrl+Shift+Del

### "User not found"
- Verifique se criou usuario no Authentication
- Confirme email e senha

### "Permission denied"
- Crie documento do usuario no Firestore
- Campo `role` deve ser "admin"

### Pagina em branco
- Abra Console (F12)
- Veja mensagens de erro
- Provavelmente Firebase nao configurado

---

## PROXIMO PASSO

Depois de testar localmente e tudo funcionando:

1. git init
2. git add .
3. git commit -m "Sistema funcionando"
4. Push para GitHub
5. Deploy no Netlify

---

**Tempo total de setup:** ~15-20 minutos

**Vale a pena?** SIM! Depois funciona para sempre, de qualquer lugar, sem custo.
