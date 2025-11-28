# 🏭 Sistema de Gestão Empresarial - Estoque Certo LTDA

> Sistema completo de gestão empresarial com interface web responsiva, PWA instalável e integração Firebase/Firestore na nuvem.

[![Deploy Status](https://api.netlify.com/api/v1/badges/YOUR-BADGE-ID/deploy-status)](https://projetowash.netlify.app)

---

## ✨ Principais Funcionalidades

| Módulo | Descrição |
|--------|-----------|
| 🏭 **Operacional** | Cálculo de capacidade produtiva, análise de turnos e ociosidade |
| 📦 **Estoque** | Entrada, saída e visualização completa com histórico |
| 💰 **Financeiro** | Custos, precificação, ROI e ponto de equilíbrio |
| 👥 **RH** | Folha de pagamento completa com INSS, IR e encargos |
| 📱 **PWA** | Instalável como app nativo no desktop e mobile |

---

## 🚀 Início Rápido

### Instalação

```powershell
# Clonar repositório
git clone https://github.com/cristiano-superacao/projetowash.git
cd projetowash

# Criar ambiente virtual
python -m venv .venv
.venv\Scripts\Activate.ps1

# Instalar dependências
pip install -r requirements.txt

# Executar servidor
python app.py
```

Acesse: **http://localhost:5000**

### Login Demo

```
Email: admin@local.com
Senha: admin123
```

---

## 🎯 Tecnologias

**Frontend:** HTML5, CSS3, JavaScript ES6+, PWA  
**Backend:** Python 3.8+, Flask 3.0+  
**Database:** Firebase/Firestore (cloud) + localStorage (local)  
**Deploy:** Netlify (auto-deploy via GitHub)

---

## 📚 Documentação

📖 **[DOCUMENTACAO_COMPLETA.md](DOCUMENTACAO_COMPLETA.md)** - Guia completo com:
- Instalação passo a passo
- Manual detalhado de cada módulo
- Configuração Firebase/Firestore
- Deploy automático Netlify
- Troubleshooting

---

## 📂 Estrutura Essencial

```
projetowash/
├── app.py                    # ⚙️ Servidor Flask
├── requirements.txt          # 📦 Dependências Python
├── netlify.toml             # 🌐 Config deploy
├── firebase.json            # 🔥 Config Firebase
├── firestore.rules          # 🔒 Regras Firestore
│
├── src/                     # 🐍 Módulos Python
│   ├── main.py             # Console principal
│   ├── operacional.py      # Cálculos operacionais
│   ├── financeiro.py       # Cálculos financeiros
│   ├── rh.py               # Folha pagamento
│   └── estoque_*.py        # Gestão estoque
│
└── web/                     # 🌐 Aplicação Web
    ├── index.html          # SPA principal
    └── static/
        ├── css/            # Estilos
        ├── js/             # Scripts e módulos
        └── icons/          # Ícones PWA
```

---

## 🔥 Firebase (Modo Cloud)

1. Crie projeto no [Firebase Console](https://console.firebase.google.com)
2. Ative **Firestore** e **Authentication**
3. Copie credenciais para `web/static/js/firebase-config.js`
4. Deploy regras: `firebase deploy --only firestore:rules`

---

## 🌐 Deploy Automático

**Netlify** já está configurado com `netlify.toml`:

```powershell
git add .
git commit -m "atualização"
git push
```

✅ Deploy automático em segundos!  
🌐 Acesse: https://projetowash.netlify.app

---

## 📱 Instalar como PWA

1. Abra o sistema no navegador
2. Clique em **"Instalar App"**
3. Use como aplicativo nativo!

---

## 📄 Licença

MIT License - Livre para uso e modificação.

---

## 👨‍💻 Créditos

**Desenvolvido por:** Estoque Certo LTDA  
**Versão:** 2.0 | **Ano:** 2025

---

**📖 Consulte [DOCUMENTACAO_COMPLETA.md](DOCUMENTACAO_COMPLETA.md) para guia detalhado!**
