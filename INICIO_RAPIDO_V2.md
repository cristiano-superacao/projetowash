# INICIO RAPIDO - 5 MINUTOS

## PASSO 1: FIREBASE (2 minutos)

1. Va para: https://console.firebase.google.com/
2. Crie projeto: `estoque-certo-ltda`
3. Ative "Authentication" > "Email/Senha"
4. Crie "Firestore Database" > Modo producao > southamerica-east1
5. Em "Project Settings" > Copie o `firebaseConfig`

## PASSO 2: CODIGO (1 minuto)

Abra: `web/static/js/firebase-config.js`

Cole suas credenciais:

```javascript
const firebaseConfig = {
    apiKey: "SUA_API_KEY",
    authDomain: "SEU_PROJETO.firebaseapp.com",
    projectId: "SEU_PROJETO",
    storageBucket: "SEU_PROJETO.appspot.com",
    messagingSenderId: "123456",
    appId: "1:123456:web:abc123"
};
```

## PASSO 3: ADMIN (1 minuto)

1. No Firebase Authentication, crie usuario:
   - Email: `admin@estoquecerto.com`
   - Senha: `Admin@123`
2. COPIE o UID do usuario
3. No Firestore, crie colecao `usuarios`
4. Documento com ID = UID copiado:

```json
{
  "nome": "Administrador",
  "email": "admin@estoquecerto.com",
  "role": "admin",
  "ativo": true
}
```

## PASSO 4: DEPLOY (1 minuto)

Terminal:

```powershell
git init
git add .
git commit -m "Deploy inicial"
```

1. Crie repositorio no GitHub
2. Push para o GitHub
3. No Netlify: "Import from GitHub"
4. Publish directory: `web`
5. Deploy!

## PRONTO!

Acesse: `https://seu-site.netlify.app`

Login: `admin@estoquecerto.com`
Senha: `Admin@123`

## PROXIMOS PASSOS

1. Crie usuarios regulares pelo formulario de cadastro
2. Configure dominio personalizado (opcional)
3. Teste todos os modulos
4. Ajuste as regras de seguranca se necessario

---

## TESTE LOCAL (Opcional)

Instale extensao "Live Server" no VS Code

Clique direito em `web/index.html` > "Open with Live Server"

Abra: `http://localhost:5500`

**NOTA:** Firebase funciona tanto local quanto em producao!

---

**Duvidas?** Veja: [GUIA_CONFIGURACAO_COMPLETO.md](GUIA_CONFIGURACAO_COMPLETO.md)
