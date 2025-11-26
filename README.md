# 📦 Sistema de Gestão - Estoque Certo LTDA# 📦 SISTEMA DE GESTÃO - ESTOQUE CERTO LTDA



![Python](https://img.shields.io/badge/Python-3.8+-blue.svg)![Python](https://img.shields.io/badge/Python-3.8+-blue.svg)

![Flask](https://img.shields.io/badge/Flask-3.0+-green.svg)![Flask](https://img.shields.io/badge/Flask-3.0+-green.svg)

![PWA](https://img.shields.io/badge/PWA-Ready-orange.svg)![PWA](https://img.shields.io/badge/PWA-Ready-orange.svg)

![License](https://img.shields.io/badge/License-MIT-yellow.svg)![License](https://img.shields.io/badge/License-MIT-yellow.svg)



Sistema completo de gestão empresarial desenvolvido em Python com interface web responsiva e Progressive Web App (PWA). Gerencia estoque, cálculos operacionais, financeiros e folha de pagamento.Sistema completo de gestão empresarial desenvolvido em Python com interface web responsiva e Progressive Web App (PWA). Permite gerenciamento de estoque, cálculos operacionais, financeiros e folha de pagamento.



## 🎯 Características Principais## 🎯 Características Principais



- ✅ **Interface Responsiva** - Funciona perfeitamente em celular, tablet e desktop- ✅ **100% Modulado** - Código organizado em módulos independentes

- ✅ **100% Modular** - Código bem organizado em módulos independentes- 📱 **PWA (Instalável)** - Pode ser instalado como aplicativo no celular/computador

- ✅ **PWA (Instalável)** - Pode ser instalado como aplicativo nativo- 🎨 **Design Moderno** - Interface responsiva e profissional

- ✅ **Design Profissional** - Layout moderno com gradientes e animações- 💾 **Persistência de Dados** - Mantém dados enquanto o servidor estiver ativo

- ✅ **Persistência Local** - localStorage para dados em modo demo- 📊 **Relatórios Detalhados** - Visualização completa de dados e cálculos

- ✅ **Cálculos Avançados** - Operacional, Financeiro e RH- 🔒 **Validações** - Sistema robusto de validação de dados

- ✅ **Validações Robustas** - Sistema de validação de dados completo

## 📁 Estrutura do Projeto

## 📁 Estrutura do Projeto

```

```projetowash/

projetowash/│

├── app.py                        # Servidor Flask principal├── src/                          # Módulos Python do sistema

├── requirements.txt              # Dependências Python│   ├── main.py                   # Arquivo principal (menu console)

├── package.json                  # Dependências Node/scripts│   ├── operacional.py            # Módulo de capacidade de produção

││   ├── estoque_entrada.py        # Módulo de entrada de produtos

├── src/                          # Módulos Python do sistema│   ├── estoque_saida.py          # Módulo de saída/vendas

│   ├── main.py                   # Menu console│   ├── financeiro.py             # Módulo financeiro

│   ├── operacional.py            # Módulo operacional│   └── rh.py                     # Módulo de RH/folha de pagamento

│   ├── estoque_entrada.py        # Entrada de estoque│

│   ├── estoque_saida.py          # Saída/vendas├── web/                          # Aplicação Web

│   ├── financeiro.py             # Cálculos financeiros│   ├── templates/

│   └── rh.py                     # Folha de pagamento│   │   └── index.html            # Página principal

││   │

└── web/                          # Aplicação web│   └── static/

    ├── templates/│       ├── css/

    │   └── index.html            # Página principal│       │   └── style.css         # Estilos do site

    ││       │

    └── static/│       ├── js/

        ├── css/│       │   ├── app.js            # Funções principais

        │   └── style.css         # Estilos responsivos│       │   ├── modules.js        # Lógica dos módulos

        ││       │   └── pwa.js            # Funcionalidades PWA

        ├── js/│       │

        │   ├── app.js            # Funções principais│       ├── icons/                # Ícones para PWA

        │   ├── auth.js           # Autenticação UI│       ├── manifest.json         # Manifest PWA

        │   ├── modules.js        # Lógica dos módulos│       └── service-worker.js     # Service Worker

        │   ├── local-auth.js     # Autenticação local│

        │   ├── local-firestore.js # Banco local├── app.py                        # API Flask (servidor web)

        │   ├── dashboard.js      # Dashboard├── requirements.txt              # Dependências Python

        │   └── pwa.js            # Funcionalidades PWA└── README.md                     # Este arquivo

        │

        ├── manifest.json         # Manifest PWA```

        └── service-worker.js     # Service Worker

```## 🚀 Como Executar o Projeto



## 🚀 Guia de Instalação e Uso### Pré-requisitos



### Pré-requisitos- Python 3.8 ou superior

- pip (gerenciador de pacotes Python)

- Python 3.8 ou superior

- pip (gerenciador de pacotes Python)### Passo 1: Instalar Dependências



### 1️⃣ Instalação das DependênciasAbra o PowerShell na pasta do projeto e execute:



```bash```powershell

# Clonar o repositóriopip install flask flask-cors

git clone https://github.com/seu-usuario/projetowash.git```

cd projetowash

Ou use o arquivo requirements.txt:

# Instalar dependências Python

pip install -r requirements.txt```powershell

```pip install -r requirements.txt

```

### 2️⃣ Executar o Servidor Web

### Passo 2: Executar Versão Console

```bash

# Iniciar o servidor FlaskPara usar o sistema no modo console (terminal):

python app.py

``````powershell

cd src

O servidor iniciará em: **http://localhost:5000**python main.py

```

### 3️⃣ Acessar no Navegador

### Passo 3: Executar Versão Web/PWA

1. Abra seu navegador

2. Acesse: `http://localhost:5000`Para usar o sistema no navegador (com possibilidade de instalar):

3. O sistema está pronto para uso!

```powershell

### 4️⃣ Instalar como PWA (Aplicativo)python app.py

```

1. Acesse o sistema no navegador

2. Clique no botão **"Instalar App"** no topoO servidor iniciará em: **http://localhost:5000**

3. Confirme a instalação

4. O app será adicionado à sua tela inicial/menu iniciarAbra seu navegador e acesse esse endereço.



## 📊 Módulos do Sistema### Passo 4: Instalar como Aplicativo (PWA)



### 1. Módulo Operacional1. Acesse **http://localhost:5000** no navegador

2. Clique no botão **"Instalar App"** no topo da página

**Objetivo:** Calcular a capacidade de produção da fábrica3. Confirme a instalação

4. O app será adicionado à sua tela inicial/menu iniciar

**Cálculos Realizados:**

- Capacidade por turno## 📚 Módulos do Sistema

- Capacidade diária, mensal e anual

- Percentual de uso### 1️⃣ Módulo Operacional

- Capacidade ociosa

**Objetivo:** Calcular a capacidade de produção da fábrica

**Inputs:**

- Número de turnos (1-3)**Funcionalidades:**

- Cálculo de capacidade diária, mensal e anual

**Outputs:**- Análise de percentual de uso

- Capacidades em diferentes períodos- Comparação com capacidade máxima (3 turnos)

- Análise de utilização

**Como usar:**

### 2. Módulo Estoque - Entrada- Console: Opção 1 no menu

- Web: Card "Operacional"

**Objetivo:** Cadastrar produtos no estoque

### 2️⃣ Módulo Estoque - Entrada

**Funcionalidades:**

- Cadastro de múltiplos produtos**Objetivo:** Cadastrar produtos no estoque

- Verificação de duplicidade

- Atualização automática de quantidades**Funcionalidades:**

- Rastreamento de fornecedores- Cadastro de múltiplos produtos

- Verificação de duplicidade por código

**Campos:**- Atualização automática de quantidade

- Código, Nome, Quantidade- Validação de dados

- Data de fabricação, Fornecedor

- Local no armazém, Valor unitário**Campos:**

- Código, Nome, Quantidade, Data de fabricação

### 3. Módulo Estoque - Saída- Fornecedor, Local no armazém, Valor unitário



**Objetivo:** Registrar vendas e movimentações**Como usar:**

- Console: Opção 2 no menu

**Funcionalidades:**- Web: Card "Entrada de Estoque"

- Busca de produtos

- Baixa automática no estoque### 3️⃣ Módulo Estoque - Saída

- Suporte a pedidos parciais

- Cálculo de valor da venda**Objetivo:** Registrar vendas e movimentações



**Lógica:****Funcionalidades:**

- ✅ Pedido completo (estoque suficiente)- Busca por nome do produto

- ⚠️ Pedido parcial (estoque insuficiente)- Baixa automática no estoque

- ❌ Produto esgotado- Suporte a pedidos parciais

- Cálculo do valor da venda

### 4. Módulo Financeiro

**Lógica:**

**Objetivo:** Calcular custos, lucros e projeções- Pedido completo: Se há estoque suficiente

- Pedido parcial: Se há estoque, mas insuficiente

**Cálculos:**- Produto esgotado: Se quantidade = 0

- Custos operacionais

- Precificação com margem de lucro**Como usar:**

- Projeções mensais e anuais- Console: Opção 3 no menu

- Ponto de equilíbrio- Web: Card "Saída de Estoque"

- ROI (Retorno sobre Investimento)

### 4️⃣ Módulo Financeiro

**Inputs:**

- Conta de água, luz, impostos, salários**Objetivo:** Calcular custos, lucros e projeções

- Volume de produção (pallets/mês)

**Funcionalidades:**

### 5. Módulo RH- Cálculo de custo operacional total

- Definição de preço com margem de lucro (50%)

**Objetivo:** Calcular folha de pagamento completa- Projeções mensais e anuais

- Cálculo de ponto de equilíbrio e ROI

**Cálculos:**

- Salários por cargo**Dados solicitados:**

- Horas extras (quando aplicável)- Conta de água, luz, impostos, salários

- INSS progressivo- Volume de movimentação (pallets/mês)

- IR progressivo

- Encargos patronais**Como usar:**

- Console: Opção 4 no menu

**Cargos e Valores:**- Web: Card "Financeiro"

- Operário: R$ 15/hora (com HE)

- Supervisor: R$ 40/hora (com HE)### 5️⃣ Módulo RH (Recursos Humanos)

- Gerente: R$ 60/hora (sem HE)

- Diretor: R$ 80/hora (sem HE)**Objetivo:** Calcular folha de pagamento completa



**Relatório:****Funcionalidades:**

- Folha individual por funcionário- Cadastro de múltiplos funcionários

- Totalizações e encargos- Cálculo de salários por cargo

- Custo total para empresa- Cálculo de horas extras (quando aplicável)

- Desconto de INSS progressivo

## 🎨 Design e Responsividade- Desconto de IR progressivo

- Relatório ordenado alfabeticamente

### Cores e Temas

**Cargos e Valores:**

- **Azul (#2563eb)** - Operacional- Operário: R$ 15/hora (recebe HE)

- **Verde (#10b981)** - Entrada de Estoque- Supervisor: R$ 40/hora (recebe HE)

- **Laranja (#f59e0b)** - Saída de Estoque- Gerente: R$ 60/hora (sem HE)

- **Roxo (#8b5cf6)** - Financeiro- Diretor: R$ 80/hora (sem HE)

- **Vermelho (#ef4444)** - RH

- **Teal (#14b8a6)** - Visualização**Como usar:**

- Console: Opção 5 no menu

### Breakpoints Responsivos- Web: Card "Recursos Humanos"



- **Desktop:** 1200px+ - Layout completo## 🎨 Interface Web

- **Tablet:** 768px - 1199px - Grid ajustado

- **Mobile:** até 767px - Stack único### Características



### Recursos UI- **Responsiva:** Funciona perfeitamente em celular, tablet e desktop

- **Moderna:** Design com gradientes, sombras e animações

- ✅ Animações suaves- **Intuitiva:** Navegação simples por cards

- ✅ Ícones Font Awesome- **Profissional:** Cores e layout adequados para ambiente corporativo

- ✅ Modais funcionais

- ✅ Notificações toast### Cores do Sistema

- ✅ Loading overlay

- ✅ Tabelas scrolláveis- **Azul (#2563eb):** Operacional

- ✅ Formulários intuitivos- **Verde (#10b981):** Entrada de Estoque

- **Laranja (#f59e0b):** Saída de Estoque

## 💡 Modo Demo/Local- **Roxo (#8b5cf6):** Financeiro

- **Vermelho (#ef4444):** RH

O sistema funciona 100% localmente sem necessidade de backend. Todos os dados são armazenados em:- **Ciano (#14b8a6):** Visualização



- **localStorage** - Persistência no navegador## 💡 Conceitos de Programação Demonstrados

- **Memory** - Cache em memória

### Estruturas de Dados

### Usuário Padrão Demo- ✅ **Listas (list)** - Armazenamento de múltiplos produtos

- ✅ **Dicionários (dict)** - Estruturação de dados dos produtos

- **Email:** admin@local.com- ✅ **Tuplas** - Retorno de múltiplos valores

- **Senha:** admin123

- **Permissões:** Administrador### Estruturas de Controle

- ✅ **if/elif/else** - Decisões e validações

## 🌐 API REST- ✅ **for** - Iteração sobre listas

- ✅ **while** - Loop principal do menu

Os endpoints abaixo estão disponíveis para integração:

### Funções

### Operacional- ✅ **Definição de funções** - Modularização do código

```- ✅ **Parâmetros e retorno** - Passagem de dados

POST /api/operacional/calcular- ✅ **Escopo de variáveis** - Local vs Global

Body: { "turnos": 1-3 }

```### Operações

- ✅ **Matemáticas** - Cálculos diversos

### Estoque- ✅ **Strings** - Manipulação de texto

```- ✅ **Comparação** - Operadores relacionais

GET  /api/estoque/produtos- ✅ **Lógicas** - and, or, not

POST /api/estoque/entrada

POST /api/estoque/saida### Orientação a Objetos (Básico)

```- ✅ **Dicionários como objetos** - Simulação de OOP



### Financeiro### Boas Práticas

```- ✅ **Comentários detalhados** - Documentação inline

POST /api/financeiro/calcular- ✅ **Nomes descritivos** - Legibilidade

```- ✅ **Modularização** - Separação de responsabilidades

- ✅ **Validação de dados** - Robustez

### RH

```## 🌐 API REST

POST /api/rh/calcular

```### Endpoints Disponíveis



## 🔧 Tecnologias Utilizadas#### Operacional

```

### BackendPOST /api/operacional/calcular

- Python 3.8+Body: { "turnos": 1-3 }

- Flask 3.0+```

- Flask-CORS

#### Estoque

### Frontend```

- HTML5GET  /api/estoque/produtos

- CSS3POST /api/estoque/entrada

- JavaScript (ES6+)     Body: { "codigo", "nome", "quantidade", "data", "fornecedor", "local", "valor" }

- Font Awesome IconsPOST /api/estoque/saida

     Body: { "nome", "quantidade" }

### PWA```

- Service Worker

- Web App Manifest#### Financeiro

- Cache API```

POST /api/financeiro/calcular

## 📱 PWA - Progressive Web App     Body: { "agua", "luz", "impostos", "salarios", "total_pallets" }

```

### Funcionalidades

#### RH

1. **Instalável** - Adicione à tela inicial```

2. **Offline** - Funciona sem internet (parcialmente)POST /api/rh/calcular

3. **Rápido** - Cache inteligente de recursos     Body: { "funcionarios": [ { "nome", "cargo", "horas_extras" } ] }

4. **Responsivo** - Adapta-se a qualquer tela```

5. **Seguro** - Requer HTTPS em produção

## 📱 PWA (Progressive Web App)

### Como Instalar

### Funcionalidades PWA

1. Acesse o sistema

2. Clique em "Instalar App"1. **Instalável:** Adicionar à tela inicial

3. Confirme a instalação2. **Offline:** Funciona sem internet (parcialmente)

4. Acesse desde o menu do seu dispositivo3. **Rápido:** Cache de recursos estáticos

4. **Responsivo:** Adapta-se a qualquer tela

## 🎓 Conceitos Educacionais Demonstrados5. **Seguro:** Requer HTTPS em produção



Este projeto exemplifica:### Como Funciona



1. **Programação Estruturada** - Funções e módulos- **Manifest.json:** Define metadados do app

2. **Estruturas de Dados** - Listas e dicionários- **Service Worker:** Gerencia cache e offline

3. **Lógica de Programação** - Controle de fluxo- **Icons:** Múltiplos tamanhos para diferentes dispositivos

4. **APIs REST** - Comunicação cliente-servidor

5. **Web Development** - HTML/CSS/JS moderno## 🔧 Tecnologias Utilizadas

6. **Progressive Web Apps** - Aplicativos web modernos

7. **Responsividade** - Mobile-first design### Backend

8. **Boas Práticas** - Código limpo e documentado- **Python 3.8+** - Linguagem principal

- **Flask 3.0+** - Framework web

## 🚀 Próximas Melhorias- **Flask-CORS** - Suporte a requisições cross-origin



- [ ] Integração com Firebase### Frontend

- [ ] Autenticação real- **HTML5** - Estrutura

- [ ] Banco de dados (SQLite/PostgreSQL)- **CSS3** - Estilização

- [ ] Exportação para PDF/Excel- **JavaScript (ES6+)** - Interatividade

- [ ] Gráficos e dashboards- **Font Awesome** - Ícones

- [ ] Notificações push

- [ ] Sincronização em cloud### PWA

- [ ] Testes automatizados- **Service Worker** - Cache e offline

- **Web App Manifest** - Metadados

## 📝 Notas Importantes- **Cache API** - Armazenamento local



### Modo Local/Demo## 📖 Como Apresentar o Projeto



- ✅ Todos os dados em localStorage### 1. Introdução (2-3 minutos)

- ✅ Funciona 100% offline- Explique o objetivo do sistema

- ✅ Ideal para demonstrações- Mostre a estrutura modular

- ✅ Sem necessidade de backend- Destaque os conceitos de programação usados



### Modo Firebase (Futuro)### 2. Demonstração Console (3-4 minutos)

- Execute o `main.py`

- 🔄 Autenticação real- Mostre cada módulo funcionando

- 🔄 Banco de dados em nuvem- Explique a lógica enquanto usa

- 🔄 Sincronização real-time

- 🔄 Deploy automático### 3. Demonstração Web (3-4 minutos)

- Inicie o servidor Flask

## 🐛 Troubleshooting- Navegue pelos módulos

- Demonstre a responsividade

### Servidor não inicia- Mostre a instalação como PWA

```bash

# Verificar porta ocupada### 4. Código Fonte (3-4 minutos)

netstat -ano | findstr :5000- Abra os arquivos .py

- Explique os comentários

# Usar outra porta- Mostre estruturas importantes

python app.py --port 8000- Destaque boas práticas

```

### 5. Conclusão (1-2 minutos)

### Dados não salvam- Recapitule os conceitos

- Verifique se localStorage está ativado- Mencione possíveis melhorias

- Não tente usar em modo privado/incógnito- Agradeça e abra para perguntas

- Limpe o cache se tiver problemas

## 🎓 Conceitos Educacionais

### PWA não instala

- Requer HTTPS em produçãoEste projeto é ideal para demonstrar:

- Verifique manifest.json

- Teste em navegadores modernos1. **Programação Estruturada** - Funções e módulos

2. **Estruturas de Dados** - Listas e dicionários

## 📞 Suporte3. **Lógica de Programação** - If/else, loops

4. **Validação de Dados** - Try/except

Para dúvidas:5. **API REST** - Comunicação cliente-servidor

1. Consulte este README6. **Web Development** - HTML/CSS/JS

2. Verifique os comentários no código7. **PWA** - Apps web modernos

3. Execute os exemplos fornecidos

## 🚀 Possíveis Melhorias Futuras

## 📄 Licença

- [ ] Banco de dados (SQLite ou PostgreSQL)

MIT License - Sinta-se livre para usar, modificar e distribuir- [ ] Autenticação de usuários

- [ ] Exportação para PDF/Excel

## 👨‍💻 Autor- [ ] Gráficos e dashboards

- [ ] Notificações push

Desenvolvido para fins educacionais e demonstração de conceitos modernos de desenvolvimento web.- [ ] Integração com APIs externas

- [ ] Testes automatizados

---- [ ] Deploy em cloud (Heroku, AWS, etc)



**✨ Desenvolvido com ❤️ para facilitar a gestão empresarial!**## 📄 Licença



**v2.0** - 2025 © Estoque Certo LTDAEste projeto está sob a licença MIT. Sinta-se livre para usar, modificar e distribuir.


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
