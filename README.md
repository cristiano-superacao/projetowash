# 📦 SISTEMA DE GESTÃO - ESTOQUE CERTO LTDA

![Python](https://img.shields.io/badge/Python-3.8+-blue.svg)
![Flask](https://img.shields.io/badge/Flask-3.0+-green.svg)
![PWA](https://img.shields.io/badge/PWA-Ready-orange.svg)
![License](https://img.shields.io/badge/License-MIT-yellow.svg)

Sistema completo de gestão empresarial desenvolvido em Python com interface web responsiva e Progressive Web App (PWA). Permite gerenciamento de estoque, cálculos operacionais, financeiros e folha de pagamento.

## 🎯 Características Principais

- ✅ **100% Modulado** - Código organizado em módulos independentes
- 📱 **PWA (Instalável)** - Pode ser instalado como aplicativo no celular/computador
- 🎨 **Design Moderno** - Interface responsiva e profissional
- 💾 **Persistência de Dados** - Mantém dados enquanto o servidor estiver ativo
- 📊 **Relatórios Detalhados** - Visualização completa de dados e cálculos
- 🔒 **Validações** - Sistema robusto de validação de dados

## 📁 Estrutura do Projeto

```
projetowash/
│
├── src/                          # Módulos Python do sistema
│   ├── main.py                   # Arquivo principal (menu console)
│   ├── operacional.py            # Módulo de capacidade de produção
│   ├── estoque_entrada.py        # Módulo de entrada de produtos
│   ├── estoque_saida.py          # Módulo de saída/vendas
│   ├── financeiro.py             # Módulo financeiro
│   └── rh.py                     # Módulo de RH/folha de pagamento
│
├── web/                          # Aplicação Web
│   ├── templates/
│   │   └── index.html            # Página principal
│   │
│   └── static/
│       ├── css/
│       │   └── style.css         # Estilos do site
│       │
│       ├── js/
│       │   ├── app.js            # Funções principais
│       │   ├── modules.js        # Lógica dos módulos
│       │   └── pwa.js            # Funcionalidades PWA
│       │
│       ├── icons/                # Ícones para PWA
│       ├── manifest.json         # Manifest PWA
│       └── service-worker.js     # Service Worker
│
├── app.py                        # API Flask (servidor web)
├── requirements.txt              # Dependências Python
└── README.md                     # Este arquivo

```

## 🚀 Como Executar o Projeto

### Pré-requisitos

- Python 3.8 ou superior
- pip (gerenciador de pacotes Python)

### Passo 1: Instalar Dependências

Abra o PowerShell na pasta do projeto e execute:

```powershell
pip install flask flask-cors
```

Ou use o arquivo requirements.txt:

```powershell
pip install -r requirements.txt
```

### Passo 2: Executar Versão Console

Para usar o sistema no modo console (terminal):

```powershell
cd src
python main.py
```

### Passo 3: Executar Versão Web/PWA

Para usar o sistema no navegador (com possibilidade de instalar):

```powershell
python app.py
```

O servidor iniciará em: **http://localhost:5000**

Abra seu navegador e acesse esse endereço.

### Passo 4: Instalar como Aplicativo (PWA)

1. Acesse **http://localhost:5000** no navegador
2. Clique no botão **"Instalar App"** no topo da página
3. Confirme a instalação
4. O app será adicionado à sua tela inicial/menu iniciar

## 📚 Módulos do Sistema

### 1️⃣ Módulo Operacional

**Objetivo:** Calcular a capacidade de produção da fábrica

**Funcionalidades:**
- Cálculo de capacidade diária, mensal e anual
- Análise de percentual de uso
- Comparação com capacidade máxima (3 turnos)

**Como usar:**
- Console: Opção 1 no menu
- Web: Card "Operacional"

### 2️⃣ Módulo Estoque - Entrada

**Objetivo:** Cadastrar produtos no estoque

**Funcionalidades:**
- Cadastro de múltiplos produtos
- Verificação de duplicidade por código
- Atualização automática de quantidade
- Validação de dados

**Campos:**
- Código, Nome, Quantidade, Data de fabricação
- Fornecedor, Local no armazém, Valor unitário

**Como usar:**
- Console: Opção 2 no menu
- Web: Card "Entrada de Estoque"

### 3️⃣ Módulo Estoque - Saída

**Objetivo:** Registrar vendas e movimentações

**Funcionalidades:**
- Busca por nome do produto
- Baixa automática no estoque
- Suporte a pedidos parciais
- Cálculo do valor da venda

**Lógica:**
- Pedido completo: Se há estoque suficiente
- Pedido parcial: Se há estoque, mas insuficiente
- Produto esgotado: Se quantidade = 0

**Como usar:**
- Console: Opção 3 no menu
- Web: Card "Saída de Estoque"

### 4️⃣ Módulo Financeiro

**Objetivo:** Calcular custos, lucros e projeções

**Funcionalidades:**
- Cálculo de custo operacional total
- Definição de preço com margem de lucro (50%)
- Projeções mensais e anuais
- Cálculo de ponto de equilíbrio e ROI

**Dados solicitados:**
- Conta de água, luz, impostos, salários
- Volume de movimentação (pallets/mês)

**Como usar:**
- Console: Opção 4 no menu
- Web: Card "Financeiro"

### 5️⃣ Módulo RH (Recursos Humanos)

**Objetivo:** Calcular folha de pagamento completa

**Funcionalidades:**
- Cadastro de múltiplos funcionários
- Cálculo de salários por cargo
- Cálculo de horas extras (quando aplicável)
- Desconto de INSS progressivo
- Desconto de IR progressivo
- Relatório ordenado alfabeticamente

**Cargos e Valores:**
- Operário: R$ 15/hora (recebe HE)
- Supervisor: R$ 40/hora (recebe HE)
- Gerente: R$ 60/hora (sem HE)
- Diretor: R$ 80/hora (sem HE)

**Como usar:**
- Console: Opção 5 no menu
- Web: Card "Recursos Humanos"

## 🎨 Interface Web

### Características

- **Responsiva:** Funciona perfeitamente em celular, tablet e desktop
- **Moderna:** Design com gradientes, sombras e animações
- **Intuitiva:** Navegação simples por cards
- **Profissional:** Cores e layout adequados para ambiente corporativo

### Cores do Sistema

- **Azul (#2563eb):** Operacional
- **Verde (#10b981):** Entrada de Estoque
- **Laranja (#f59e0b):** Saída de Estoque
- **Roxo (#8b5cf6):** Financeiro
- **Vermelho (#ef4444):** RH
- **Ciano (#14b8a6):** Visualização

## 💡 Conceitos de Programação Demonstrados

### Estruturas de Dados
- ✅ **Listas (list)** - Armazenamento de múltiplos produtos
- ✅ **Dicionários (dict)** - Estruturação de dados dos produtos
- ✅ **Tuplas** - Retorno de múltiplos valores

### Estruturas de Controle
- ✅ **if/elif/else** - Decisões e validações
- ✅ **for** - Iteração sobre listas
- ✅ **while** - Loop principal do menu

### Funções
- ✅ **Definição de funções** - Modularização do código
- ✅ **Parâmetros e retorno** - Passagem de dados
- ✅ **Escopo de variáveis** - Local vs Global

### Operações
- ✅ **Matemáticas** - Cálculos diversos
- ✅ **Strings** - Manipulação de texto
- ✅ **Comparação** - Operadores relacionais
- ✅ **Lógicas** - and, or, not

### Orientação a Objetos (Básico)
- ✅ **Dicionários como objetos** - Simulação de OOP

### Boas Práticas
- ✅ **Comentários detalhados** - Documentação inline
- ✅ **Nomes descritivos** - Legibilidade
- ✅ **Modularização** - Separação de responsabilidades
- ✅ **Validação de dados** - Robustez

## 🌐 API REST

### Endpoints Disponíveis

#### Operacional
```
POST /api/operacional/calcular
Body: { "turnos": 1-3 }
```

#### Estoque
```
GET  /api/estoque/produtos
POST /api/estoque/entrada
     Body: { "codigo", "nome", "quantidade", "data", "fornecedor", "local", "valor" }
POST /api/estoque/saida
     Body: { "nome", "quantidade" }
```

#### Financeiro
```
POST /api/financeiro/calcular
     Body: { "agua", "luz", "impostos", "salarios", "total_pallets" }
```

#### RH
```
POST /api/rh/calcular
     Body: { "funcionarios": [ { "nome", "cargo", "horas_extras" } ] }
```

## 📱 PWA (Progressive Web App)

### Funcionalidades PWA

1. **Instalável:** Adicionar à tela inicial
2. **Offline:** Funciona sem internet (parcialmente)
3. **Rápido:** Cache de recursos estáticos
4. **Responsivo:** Adapta-se a qualquer tela
5. **Seguro:** Requer HTTPS em produção

### Como Funciona

- **Manifest.json:** Define metadados do app
- **Service Worker:** Gerencia cache e offline
- **Icons:** Múltiplos tamanhos para diferentes dispositivos

## 🔧 Tecnologias Utilizadas

### Backend
- **Python 3.8+** - Linguagem principal
- **Flask 3.0+** - Framework web
- **Flask-CORS** - Suporte a requisições cross-origin

### Frontend
- **HTML5** - Estrutura
- **CSS3** - Estilização
- **JavaScript (ES6+)** - Interatividade
- **Font Awesome** - Ícones

### PWA
- **Service Worker** - Cache e offline
- **Web App Manifest** - Metadados
- **Cache API** - Armazenamento local

## 📖 Como Apresentar o Projeto

### 1. Introdução (2-3 minutos)
- Explique o objetivo do sistema
- Mostre a estrutura modular
- Destaque os conceitos de programação usados

### 2. Demonstração Console (3-4 minutos)
- Execute o `main.py`
- Mostre cada módulo funcionando
- Explique a lógica enquanto usa

### 3. Demonstração Web (3-4 minutos)
- Inicie o servidor Flask
- Navegue pelos módulos
- Demonstre a responsividade
- Mostre a instalação como PWA

### 4. Código Fonte (3-4 minutos)
- Abra os arquivos .py
- Explique os comentários
- Mostre estruturas importantes
- Destaque boas práticas

### 5. Conclusão (1-2 minutos)
- Recapitule os conceitos
- Mencione possíveis melhorias
- Agradeça e abra para perguntas

## 🎓 Conceitos Educacionais

Este projeto é ideal para demonstrar:

1. **Programação Estruturada** - Funções e módulos
2. **Estruturas de Dados** - Listas e dicionários
3. **Lógica de Programação** - If/else, loops
4. **Validação de Dados** - Try/except
5. **API REST** - Comunicação cliente-servidor
6. **Web Development** - HTML/CSS/JS
7. **PWA** - Apps web modernos

## 🚀 Possíveis Melhorias Futuras

- [ ] Banco de dados (SQLite ou PostgreSQL)
- [ ] Autenticação de usuários
- [ ] Exportação para PDF/Excel
- [ ] Gráficos e dashboards
- [ ] Notificações push
- [ ] Integração com APIs externas
- [ ] Testes automatizados
- [ ] Deploy em cloud (Heroku, AWS, etc)

## 📄 Licença

Este projeto está sob a licença MIT. Sinta-se livre para usar, modificar e distribuir.

## 👨‍💻 Autor

Desenvolvido para fins educacionais e demonstração de conceitos de programação.

## 🤝 Contribuições

Sugestões e melhorias são bem-vindas! Sinta-se à vontade para:
- Reportar bugs
- Sugerir novas funcionalidades
- Melhorar a documentação
- Otimizar o código

## 📞 Suporte

Para dúvidas ou problemas:
1. Verifique este README
2. Leia os comentários no código
3. Teste os exemplos fornecidos

---

**✨ Sistema desenvolvido com ❤️ para facilitar a gestão empresarial!**
