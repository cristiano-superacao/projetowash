# 🛡️ Guia do Super Administrador

## 🔑 Credenciais de Acesso

### Super Admin
- **Email:** `superadmin@quatrocantos.com`
- **Senha:** `admin@2025`
- **Função:** Gerenciar todas as empresas do sistema

### Admin Padrão (para testes)
- **Email:** `admin@local.com`
- **Senha:** `admin123`
- **Função:** Acesso administrativo de empresa individual

---

## 🚀 Como Acessar o Painel de Administração

1. **Acesse o sistema:**
   - Local: `http://localhost:5000`
   - Produção: `https://projetowash.netlify.app`

2. **Faça login com as credenciais do Super Admin**

3. **No menu lateral, clique em "Administração"** (botão vermelho no final do menu)

---

## 📊 Funcionalidades do Painel Admin

### 1️⃣ Dashboard de Estatísticas
- **Total de Empresas:** Quantidade total de empresas cadastradas
- **Empresas Ativas:** Empresas com status ativo
- **Segmento Mais Popular:** Setor com mais empresas
- **Cadastros Hoje:** Novos registros do dia

### 2️⃣ Gestão de Empresas
- **Visualizar:** Lista completa de todas as empresas
- **Buscar:** Pesquisa por nome ou email
- **Filtrar:** Por segmento de negócio
- **Detalhes:** Ver informações completas da empresa
- **Ativar/Desativar:** Controlar acesso das empresas

### 3️⃣ Exportação de Dados
- **Exportar CSV:** Download de todas as empresas em formato CSV
- **Dados incluídos:** Nome, email, segmento, status, data de cadastro

---

## 🎨 Segmentos Disponíveis

O sistema suporta 10 segmentos diferentes:

| Segmento | Cor | Descrição |
|----------|-----|-----------|
| 🏗️ Construção | Verde | Construtoras e obras |
| 🏥 Saúde | Azul claro | Clínicas e hospitais |
| 🍽️ Alimentação | Laranja | Restaurantes e delivery |
| 🛒 Varejo | Rosa | Lojas e comércio |
| 🚗 Automotivo | Roxo | Oficinas e autopeças |
| 🎓 Educação | Azul escuro | Escolas e cursos |
| 🏭 Indústria | Cinza | Fábricas e produção |
| 🚚 Logística | Amarelo | Transportes e entregas |
| 💻 Tecnologia | Verde limão | TI e software |
| 💼 Serviços | Marrom | Consultoria e outros |

---

## 🔧 Troubleshooting

### ❌ "Usuário ou senha incorretos"

**Solução 1: Resetar Usuários Demo**
1. Na tela de login, clique em "🔄 Resetar Usuários Demo"
2. Confirme a operação
3. A página será recarregada com usuários padrão restaurados

**Solução 2: Verificar Console do Navegador**
1. Pressione `F12` para abrir o DevTools
2. Vá para a aba "Console"
3. Verifique os logs de login
4. Você verá os usuários disponíveis e suas senhas

**Solução 3: Limpar Cache**
```javascript
// Cole no Console do navegador:
localStorage.clear();
location.reload();
```

### 🔍 Verificar Usuários Carregados

Abra o Console do navegador (F12) e digite:
```javascript
JSON.parse(localStorage.getItem('localUsers')).forEach(u => {
    console.log(`${u.email} - Senha: ${u.senha} - Role: ${u.role}`);
});
```

---

## 📱 Responsividade

O painel de administração é totalmente responsivo:

- **Desktop (>1200px):** Layout completo com 4 colunas de estatísticas
- **Tablet (768px-1200px):** Layout de 2 colunas
- **Mobile (<768px):** Layout de 1 coluna, cards empilhados

---

## 🔒 Segurança

### Níveis de Acesso

1. **Super Admin (`superadmin`)**
   - ✅ Acesso ao painel de administração
   - ✅ Visualizar todas as empresas
   - ✅ Ativar/desativar empresas
   - ✅ Exportar dados
   - ✅ Acesso a todos os módulos

2. **Admin (`admin`)**
   - ✅ Acesso aos módulos da própria empresa
   - ✅ Gerenciar estoque próprio
   - ✅ Visualizar relatórios próprios
   - ❌ Sem acesso ao painel de administração

3. **Usuário (`user`)**
   - ✅ Acesso limitado aos módulos permitidos
   - ❌ Sem funções administrativas

---

## 🎯 Boas Práticas

1. **Não compartilhe as credenciais do Super Admin**
2. **Faça backups regulares** usando o botão "Exportar CSV"
3. **Desative empresas inativas** ao invés de deletá-las
4. **Monitore o painel de estatísticas** para insights de crescimento
5. **Use filtros** para encontrar empresas rapidamente

---

## 📞 Suporte

Em caso de dúvidas ou problemas:
1. Verifique o Console do navegador (F12)
2. Consulte este guia
3. Verifique os logs do servidor Flask

---

## 🔄 Atualizações

**Versão:** 2.0.0  
**Data:** 29/11/2025  
**Última Modificação:** Sistema de Super Admin implementado

### Novidades v2.0:
- ✨ Painel de Super Administrador
- 📊 Dashboard de estatísticas
- 🔍 Busca e filtros avançados
- 📥 Exportação de dados CSV
- 🎨 Layout responsivo profissional
- 🛡️ Sistema de roles (superadmin, admin, user)

---

**Sistema desenvolvido para Quatro Cantos**  
**Tecnologias:** Python Flask + JavaScript + Firebase + Netlify
