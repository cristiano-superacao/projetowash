#  DOCUMENTAÇÃO COMPLETA - QUATRO CANTOS

##  Índice

1. [Visão Geral](#visão-geral)
2. [Arquitetura do Sistema](#arquitetura)
3. [Guia de Instalação](#instalação)
4. [Funcionalidades Detalhadas](#funcionalidades)
5. [Integração Firebase](#firebase)
6. [Deploy Automático](#deploy)
7. [Manual do Usuário](#manual)
8. [Troubleshooting](#troubleshooting)

---

##  VISÃO GERAL

Sistema completo de gestão empresarial com:
-  Interface web responsiva
-  PWA instalável
-  Modo Local/Demo funcional
-  Integração Firebase (cloud)
-  Deploy automático Netlify
-  Layout profissional

---

##  ARQUITETURA DO SISTEMA

### Estrutura de Arquivos Necessários

```
projetowash/
 app.py                    #  Servidor Flask (backend)
 requirements.txt          #  Dependências Python
 runtime.txt              #  Versão do Python
 Procfile                 #  Config Heroku/Render
 netlify.toml             #  Config Netlify
 package.json             #  Scripts NPM

 firebase.json            #  Config Firebase
 firestore.rules          #  Regras Firestore
 firestore.indexes.json   #  Índices Firestore
 .firebaserc              #  Projeto Firebase

 .gitignore              #  Arquivos ignorados
 .env.example            #  Template variáveis

 src/                    #  Módulos Python
    main.py            # Console principal
    database.py        # Banco de dados local
    operacional.py     # Cálculos operacionais
    financeiro.py      # Cálculos financeiros
    rh.py              # Folha de pagamento
    estoque_entrada.py # Entrada produtos
    estoque_saida.py   # Saída produtos

 web/                    #  Aplicação Web
     index.html         # Página principal
    
     static/
         manifest.json     # PWA manifest
         service-worker.js # Service worker
        
         css/
            style.css        # Estilos principais
            dashboard.css    # Estilos dashboard
        
         js/
            app.js               # Core da aplicação
            auth.js              # Autenticação UI
            dashboard.js         # Dashboard
            pwa.js               # PWA features
           
            firebase-config.js   # Config Firebase
            firestore-service.js # Serviços Firestore
            local-auth.js        # Auth local
            local-firestore.js   # DB local
           
            modules/
                operacional.js
                financeiro.js
                rh.js
                estoque_entrada.js
                estoque_saida.js
                visualizar_estoque.js
                historico.js
        
         icons/
             icon.svg    # Ícone SVG
             README.md   # Guia ícones
```

---

##  GUIA DE INSTALAÇÃO

### Pré-requisitos

- Python 3.8+ instalado
- Git instalado
- Navegador moderno (Chrome/Edge/Firefox)
- Conta Firebase (opcional, para modo cloud)
- Conta Netlify (para deploy automático)

### Passo 1: Clonar o Repositório

```powershell
git clone https://github.com/cristiano-superacao/projetowash.git
cd projetowash
```

### Passo 2: Criar Ambiente Virtual (Recomendado)

```powershell
python -m venv .venv
.venv\Scripts\Activate.ps1
```

### Passo 3: Instalar Dependências

```powershell
pip install -r requirements.txt
```

### Passo 4: Executar o Sistema

#### Modo Console

```powershell
cd src
python main.py
```

#### Modo Web

```powershell
python app.py
```

Acesse: **http://localhost:5000**

### Passo 5: Instalar como PWA

1. Abra o sistema no navegador
2. Clique em **"Instalar App"** no topo
3. Confirme a instalação
4. Pronto! App instalado na sua máquina

---

##  FUNCIONALIDADES DETALHADAS

### 1⃣ MÓDULO OPERACIONAL

**Objetivo:** Calcular capacidade de produção da fábrica

**Como Usar:**
1. Acesse o módulo "Operacional"
2. Informe o número de turnos (1, 2 ou 3)
3. Clique em "Calcular"
4. Visualize os resultados detalhados

**Cálculos Realizados:**
- Capacidade por turno: 440 pallets
- Capacidade diária: turnos × 440
- Capacidade mensal: diária × 22 dias
- Capacidade anual: mensal × 12
- Percentual de utilização
- Capacidade ociosa disponível

**Exemplo de Uso:**
```
Entrada: 2 turnos
Saída:
- Por turno: 440 pallets
- Diário: 880 pallets
- Mensal: 19.360 pallets
- Anual: 232.320 pallets
- Utilização: 66,67%
- Ociosidade: 440 pallets/dia
```

---

### 2⃣ MÓDULO ESTOQUE - ENTRADA

**Objetivo:** Cadastrar novos produtos no estoque

**Como Usar:**
1. Acesse "Entrada de Estoque"
2. Preencha os campos:
   - **Código:** Identificador único
   - **Nome:** Descrição do produto
   - **Quantidade:** Unidades a adicionar
   - **Data de Fabricação:** DD/MM/AAAA
   - **Fornecedor:** Nome do fornecedor
   - **Local:** Posição no armazém
   - **Valor Unitário:** Preço em R$
3. Clique em "Adicionar Produto"
4. Continue adicionando ou finalize com "Salvar Estoque"

**Validações:**
-  Código único (não permite duplicados)
-  Quantidade > 0
-  Data válida
-  Valor unitário > 0

**Comportamento Especial:**
- Se o código já existe, **atualiza a quantidade**
- Mantém histórico de entradas
- Notifica duplicidades

**Exemplo:**
```
Código: P001
Nome: Pallet Tipo A
Quantidade: 100
Data: 28/11/2025
Fornecedor: Fornecedor X
Local: A1
Valor: R$ 50,00

Resultado:  Produto cadastrado com sucesso!
```

---

### 3⃣ MÓDULO ESTOQUE - SAÍDA

**Objetivo:** Registrar vendas e movimentações

**Como Usar:**
1. Acesse "Saída de Estoque"
2. Digite o **nome do produto**
3. Informe a **quantidade a vender**
4. Clique em "Vender/Registrar Saída"
5. O sistema valida e processa automaticamente

**Tipos de Resultado:**

** Pedido Completo** (estoque suficiente)
```
Produto: Pallet Tipo A
Solicitado: 50
Disponível: 100
Resultado:  Venda completa!
Valor: R$ 2.500,00
Estoque restante: 50
```

** Pedido Parcial** (estoque insuficiente)
```
Produto: Pallet Tipo A
Solicitado: 120
Disponível: 100
Resultado:  Venda parcial!
Fornecido: 100 (máximo disponível)
Valor: R$ 5.000,00
Estoque restante: 0
```

** Produto Esgotado**
```
Produto: Pallet Tipo A
Disponível: 0
Resultado:  Produto esgotado!
```

---

### 4⃣ MÓDULO FINANCEIRO

**Objetivo:** Calcular custos operacionais e precificação

**Como Usar:**
1. Acesse "Financeiro"
2. Preencha os custos mensais:
   - Água (R$)
   - Luz (R$)
   - Impostos (R$)
   - Salários (R$)
3. Informe o volume de produção (pallets/mês)
4. Clique em "Calcular"

**Cálculos Realizados:**

**1. Custo Operacional Total**
```
Custo Total = Água + Luz + Impostos + Salários
```

**2. Custo por Pallet**
```
Custo/Pallet = Custo Total ÷ Produção Mensal
```

**3. Preço de Venda (Margem 50%)**
```
Preço Venda = Custo/Pallet × 1.50
```

**4. Receita e Lucro**
```
Receita = Preço Venda × Produção
Lucro = Receita - Custo Total
```

**5. Projeções**
```
Receita Anual = Receita Mensal × 12
Lucro Anual = Lucro Mensal × 12
```

**6. Ponto de Equilíbrio**
```
Break-even = Custo Total ÷ (Preço Venda - Custo/Pallet)
```

**7. ROI (Return on Investment)**
```
ROI = (Lucro Anual ÷ Custo Total Anual) × 100
```

**Exemplo Completo:**
```
ENTRADA:
- Água: R$ 5.000,00
- Luz: R$ 8.000,00
- Impostos: R$ 12.000,00
- Salários: R$ 75.000,00
- Produção: 10.000 pallets/mês

RESULTADO:
- Custo Total: R$ 100.000,00
- Custo/Pallet: R$ 10,00
- Preço Venda: R$ 15,00 (margem 50%)
- Receita Mensal: R$ 150.000,00
- Lucro Mensal: R$ 50.000,00
- Receita Anual: R$ 1.800.000,00
- Lucro Anual: R$ 600.000,00
- Ponto Equilíbrio: 6.667 pallets
- ROI: 50% ao ano
```

---

### 5⃣ MÓDULO RH (RECURSOS HUMANOS)

**Objetivo:** Calcular folha de pagamento completa

**Como Usar:**
1. Acesse "Recursos Humanos"
2. Clique em "Adicionar Funcionário"
3. Preencha:
   - **Nome:** Nome completo
   - **Cargo:** Operário/Supervisor/Gerente/Diretor
   - **Horas Extras:** Quantidade (se aplicável)
4. Continue adicionando funcionários
5. Clique em "Calcular Folha"

**Cargos e Regras:**

| Cargo       | Valor/Hora | Horas/Mês | Recebe HE? |
|-------------|------------|-----------|------------|
| Operário    | R$ 15,00   | 220       |  Sim     |
| Supervisor  | R$ 40,00   | 220       |  Sim     |
| Gerente     | R$ 60,00   | 220       |  Não     |
| Diretor     | R$ 80,00   | 220       |  Não     |

**Cálculos por Funcionário:**

**1. Salário Base**
```
Salário Base = Valor/Hora × 220 horas
```

**2. Horas Extras (quando aplicável)**
```
HE = Valor/Hora × 1.5 × Quantidade HE
```

**3. Salário Bruto**
```
Salário Bruto = Salário Base + HE
```

**4. Desconto INSS (Progressivo)**
```
Até R$ 1.320,00:     7,5%
R$ 1.320,01 a R$ 2.571,29: 9%
R$ 2.571,30 a R$ 3.856,94: 12%
R$ 3.856,95 a R$ 7.507,49: 14%
Acima de R$ 7.507,50: Teto R$ 876,97
```

**5. Desconto IR (Progressivo)**
```
Até R$ 2.112,00:      Isento
R$ 2.112,01 a R$ 2.826,65:  7,5%
R$ 2.826,66 a R$ 3.751,05:  15%
R$ 3.751,06 a R$ 4.664,68:  22,5%
Acima de R$ 4.664,68:     27,5%
```

**6. Salário Líquido**
```
Líquido = Bruto - INSS - IR
```

**7. Encargos Patronais (para a empresa)**
```
INSS Patronal: 20% do Salário Bruto
FGTS: 8% do Salário Bruto
Total Encargos = INSS + FGTS
```

**8. Custo Total para Empresa**
```
Custo = Salário Bruto + Encargos
```

**Exemplo Completo:**

```
FUNCIONÁRIO: João Silva
Cargo: Operário
Horas Extras: 20h

CÁLCULOS:
1. Salário Base: R$ 15 × 220 = R$ 3.300,00
2. Horas Extras: R$ 15 × 1,5 × 20 = R$ 450,00
3. Salário Bruto: R$ 3.750,00
4. INSS (12%): R$ 450,00
5. IR (15%): R$ 245,48
6. Salário Líquido: R$ 3.054,52
7. INSS Patronal (20%): R$ 750,00
8. FGTS (8%): R$ 300,00
9. Custo Total: R$ 4.800,00
```

**Relatório Final:**
- Lista todos os funcionários em ordem alfabética
- Totaliza salários brutos e líquidos
- Soma encargos totais
- Mostra custo total da folha para a empresa

---

##  INTEGRAÇÃO FIREBASE (CLOUD)

### Configuração do Firebase

**Passo 1: Criar Projeto Firebase**
1. Acesse https://console.firebase.google.com
2. Clique em "Adicionar Projeto"
3. Nomeie: "estoque-certo-ltda"
4. Desabilite Google Analytics (opcional)
5. Crie o projeto

**Passo 2: Ativar Firestore**
1. No menu lateral, clique em "Firestore Database"
2. Clique em "Criar banco de dados"
3. Escolha modo "Produção"
4. Selecione localização: "southamerica-east1" (São Paulo)

**Passo 3: Ativar Authentication**
1. No menu lateral, clique em "Authentication"
2. Clique em "Começar"
3. Ative "Email/Senha"
4. Crie o primeiro usuário admin

**Passo 4: Obter Credenciais**
1. Clique no ícone de engrenagem > "Configurações do projeto"
2. Vá até "Seus aplicativos"
3. Clique no ícone "</>" (Web)
4. Registre o app: "estoque-certo-web"
5. **COPIE** as configurações do Firebase

**Passo 5: Configurar no Projeto**

Edite `web/static/js/firebase-config.js`:

```javascript
const firebaseConfig = {
    apiKey: "SUA_API_KEY_AQUI",
    authDomain: "estoque-certo-ltda.firebaseapp.com",
    projectId: "estoque-certo-ltda",
    storageBucket: "estoque-certo-ltda.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abcdef123456"
};
```

**Passo 6: Configurar Regras Firestore**

O arquivo `firestore.rules` já está configurado:

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
  }
}
```

**Passo 7: Deploy Regras**

```powershell
firebase deploy --only firestore:rules
```

### Funcionalidades Cloud

 **Autenticação Real**
- Login/Cadastro com email e senha
- Recuperação de senha
- Controle de sessão

 **Banco de Dados Real-Time**
- Sincronização automática
- Dados persistem na nuvem
- Acesso de qualquer dispositivo

 **Multi-usuário**
- Cada usuário vê seus dados
- Compartilhamento configurável
- Controle de permissões

---

##  DEPLOY AUTOMÁTICO

### Deploy no Netlify

O projeto já está configurado com `netlify.toml`.

**Passo 1: Conectar GitHub**
1. Acesse https://app.netlify.com
2. Faça login
3. Clique em "Import from Git"
4. Escolha GitHub
5. Selecione o repositório "projetowash"

**Passo 2: Configurar Build**

As configurações já estão no `netlify.toml`:

```toml
[build]
  publish = "web"
  command = "echo 'Static site - no build required'"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

**Passo 3: Deploy**
1. Clique em "Deploy site"
2. Aguarde 30-60 segundos
3. Seu site estará no ar!

**Passo 4: Deploy Automático**

 Toda vez que você fizer `git push`:
1. GitHub recebe o código
2. Netlify detecta a mudança
3. Inicia build automaticamente
4. Atualiza o site em produção

**URL do Site:**
- https://projetowash.netlify.app
- Ou domínio personalizado (config nas settings)

### Fluxo de Trabalho

```
Desenvolvimento Local
   ↓
git add .
git commit -m "mensagem"
git push
   ↓
GitHub recebe código
   ↓
Netlify detecta push
   ↓
Build automático
   ↓
Deploy em produção
   ↓
 Site atualizado!
```

---

##  MANUAL DO USUÁRIO

### Primeiro Acesso

1. **Acesse o sistema:** https://projetowash.netlify.app
2. **Tela de Login aparecerá**

### Login (Modo Demo)

**Credenciais padrão:**
- Email: `admin@local.com`
- Senha: `admin123`

Clique em **"Entrar"**

### Cadastro de Nova Empresa

1. Clique em **"Criar conta"**
2. Selecione aba **"Nova Empresa"**
3. Preencha:
   - Nome completo
   - Email
   - Contato
   - Nome da empresa
   - Login de usuário
   - Senha (mínimo 6 caracteres)
4. Clique em **"Cadastrar Empresa"**

### Cadastro de Funcionário

1. Clique em **"Criar conta"**
2. Selecione aba **"Funcionário"**
3. Preencha dados pessoais
4. Selecione cargo/departamento
5. **Autorização do Gestor:**
   - Login do administrador
   - Senha do administrador
   - Módulos permitidos (checkboxes)
6. Crie login e senha
7. Clique em **"Cadastrar Funcionário"**

### Recuperar Senha

1. Na tela de login, clique em **"Esqueceu a senha?"**
2. Digite seu email
3. Clique em **"Enviar Email"**
4. Verifique sua caixa de entrada

### Navegação no Dashboard

Após login, você verá:

**Topo (Header):**
- Logo "Quatro Cantos"
- Botão "Instalar App"
- Menu do usuário (email, sair)

**Lateral Esquerda (Sidebar):**
-  Dashboard (início)
-  Operacional
-  Entrada Estoque
-  Saída Estoque
-  Visualizar Estoque
-  Financeiro
-  RH
-  Histórico

**Centro (Conteúdo):**
- Cards de estatísticas
- Gráficos
- Formulários (quando módulo ativo)

### Usando os Módulos

**1. Dashboard**
- Visualize resumo geral
- Veja estatísticas rápidas
- Acompanhe movimentações recentes

**2. Operacional**
- Digite número de turnos (1-3)
- Clique "Calcular"
- Veja resultado detalhado

**3. Entrada Estoque**
- Clique "Adicionar Produto"
- Preencha formulário
- Repita para mais produtos
- Clique "Salvar Estoque"

**4. Saída Estoque**
- Digite nome do produto
- Informe quantidade
- Clique "Vender/Registrar Saída"

**5. Visualizar Estoque**
- Veja lista completa de produtos
- Use busca para filtrar
- Clique em produto para detalhes
- Botão "Excluir" para remover

**6. Financeiro**
- Preencha custos mensais
- Informe volume produção
- Clique "Calcular"
- Analise resultados

**7. RH**
- Clique "Adicionar Funcionário"
- Preencha dados
- Repita para mais funcionários
- Clique "Calcular Folha"
- Veja relatório completo

**8. Histórico**
- Visualize todas movimentações
- Filtre por tipo
- Ordene por data

### Instalar como App

**Desktop (Windows/Mac/Linux):**
1. Clique em **"Instalar App"** no topo
2. Confirme instalação
3. App aparece no menu iniciar
4. Use como programa normal

**Mobile (Android/iOS):**
1. Abra no navegador
2. Menu navegador > "Adicionar à tela inicial"
3. Confirme
4. Ícone aparece na tela inicial

### Sair do Sistema

1. Clique no seu email no topo direito
2. Selecione **"Sair"**
3. Voltar à tela de login

---

##  TROUBLESHOOTING

### Servidor não inicia

**Problema:** Erro ao executar `python app.py`

**Soluções:**
```powershell
# Verificar se Python está instalado
python --version

# Verificar se Flask está instalado
pip list | findstr Flask

# Reinstalar dependências
pip install -r requirements.txt

# Usar outra porta
python app.py --port 8000
```

### Página em branco no navegador

**Problema:** Acesso http://localhost:5000 mostra página vazia

**Soluções:**
1. Verifique se o servidor está rodando
2. Limpe cache do navegador (Ctrl + Shift + Del)
3. Tente navegação anônima
4. Verifique console do navegador (F12)

### Dados não salvam

**Problema:** Informações somem ao recarregar

**Soluções:**
1. Verifique se localStorage está ativado
2. Não use modo privado/anônimo
3. Limpe cookies e tente novamente
4. Verifique permissões do navegador

### PWA não instala

**Problema:** Botão "Instalar App" não aparece

**Soluções:**
1. Use HTTPS em produção (localhost funciona sem)
2. Verifique se manifest.json carrega (F12 > Application)
3. Use navegador moderno (Chrome/Edge/Firefox)
4. Verifique se service worker registrou

### Firebase não conecta

**Problema:** "Firebase não configurado. Usando modo local."

**Soluções:**
1. Verifique `firebase-config.js`
2. Confirme API Key correta
3. Verifique regras do Firestore
4. Confira se Authentication está ativo

### Erro ao fazer deploy

**Problema:** Deploy no Netlify falha

**Soluções:**
1. Verifique `netlify.toml` está correto
2. Confirme branch correta (main)
3. Veja logs de build no Netlify
4. Verifique se todos arquivos web/ existem

### Módulo não carrega

**Problema:** Erro ao clicar em módulo

**Soluções:**
1. Abra console (F12)
2. Veja erros JavaScript
3. Verifique se arquivo .js do módulo existe
4. Limpe cache e recarregue

### Layout quebrado no mobile

**Problema:** Tela não se adapta ao celular

**Soluções:**
1. Recarregue a página
2. Limpe cache
3. Verifique viewport no HTML
4. Teste em outro navegador

---

##  SUPORTE E CONTATO

### Documentação Adicional

- **README.md** - Visão geral do projeto
- **QUICK_START.md** - Início rápido
- **README_DEPLOY.md** - Guia de deploy
- **Este arquivo** - Documentação completa

### Reportar Problemas

1. Abra issue no GitHub
2. Descreva o problema detalhadamente
3. Inclua prints se possível
4. Mencione navegador e versão

### Sugestões e Melhorias

- Abra issue com tag "enhancement"
- Descreva a funcionalidade desejada
- Explique o benefício

---

##  CHECKLIST DE PRODUÇÃO

Antes de colocar em produção:

- [ ] Firebase configurado com credenciais reais
- [ ] Regras Firestore revisadas e deploy feito
- [ ] Usuários de teste criados
- [ ] Deploy Netlify funcionando
- [ ] HTTPS ativo (certificado SSL)
- [ ] PWA testado em mobile
- [ ] Todos módulos testados
- [ ] Performance verificada
- [ ] Responsividade testada
- [ ] Documentação atualizada
- [ ] Backup configurado
- [ ] Monitoramento ativo

---

##  PRÓXIMOS PASSOS

### Melhorias Futuras

1. **Relatórios em PDF**
   - Exportar folha de pagamento
   - Relatório de estoque
   - Análise financeira

2. **Gráficos Avançados**
   - Chart.js para visualizações
   - Dashboard com KPIs
   - Comparativos mensais

3. **Notificações**
   - Estoque baixo
   - Vendas realizadas
   - Push notifications

4. **Integração**
   - API externa para NF-e
   - Importação/Exportação Excel
   - Backup automático cloud

5. **Mobile App Nativo**
   - React Native
   - Flutter
   - Aplicativo nas lojas

---

##  LICENÇA

MIT License - Livre para uso, modificação e distribuição

---

## ‍ CRÉDITOS

**Desenvolvido por:** Quatro Cantos  
**Versão:** 2.0  
**Ano:** 2025  
**Tecnologias:** Python, Flask, JavaScript, Firebase, PWA

---

##  EQUIPE DE DESENVOLVIMENTO

###  Informações Acadêmicas

**Instituição:** SENAI - Serviço Nacional de Aprendizagem Industrial  
**Disciplina:** Lógica de Programação  
**Professor:** Washington Luis Souza Anunciação  
**Data de Início:** 22 de novembro de 2025  
**Data de Conclusão:** 28 de novembro de 2025

###  Integrantes da Equipe

| # | Nome Completo | Email | Função |
|---|---------------|-------|--------|
| 1 | **Gabriela M. N. Silva** | gabriela.m.silva@ba.estudante.senai.br | Desenvolvedora Principal / Gestora GitHub |
| 2 | **Cristiano Silva Santos** | Cristiano.s.santos@ba.estudante.senai.br | Desenvolvedor / Contribuidor |
| 3 | **Joel Macena Costa** | joel.c@ba.estudante.senai.br | Desenvolvedor / Contribuidor |
| 4 | **Josilton José Almeida Santos** | josilton.santos@aluno.senai.br | Desenvolvedor / Contribuidor |

###  Responsabilidades Detalhadas

#### Gabriela M. N. Silva
-  **Desenvolvedora Principal**
-  **Gestora do Repositório GitHub**
-  **Integração com Repositório Remoto**
-  **Deploy e Configuração Netlify**
-  **Documentação Principal**

#### Cristiano Silva Santos
-  **Desenvolvimento de Funcionalidades**
-  **Testes de Backend (Python/Flask)**
-  **Módulos Operacional e Financeiro**

#### Joel Macena Costa
-  **Desenvolvimento Frontend**
-  **Implementação PWA**
-  **Design Responsivo**

#### Josilton José Almeida Santos
-  **Desenvolvimento de Módulos**
-  **Validação e Testes**
-  **Revisão de Código**

###  Contribuições da Equipe

Todos os integrantes contribuem colaborativamente para:

 **Implementação de Funcionalidades**
- Desenvolvimento dos módulos principais
- Integração entre frontend e backend
- Criação de componentes reutilizáveis

 **Testes e Validação**
- Testes unitários e de integração
- Validação de inputs e outputs
- Testes de responsividade mobile

 **Documentação**
- Comentários no código
- Documentação técnica
- Guias de usuário

 **Revisão de Código**
- Code review em pares
- Padronização de código
- Boas práticas de programação

---

** Sistema desenvolvido com  pela equipe SENAI para facilitar a gestão empresarial!**

**Versão da Documentação:** 1.1 - 28/11/2025
