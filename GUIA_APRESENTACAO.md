# 🎤 GUIA DE APRESENTAÇÃO DO PROJETO

## 📋 Roteiro Sugerido (12-15 minutos)

### 1. INTRODUÇÃO (2 minutos)

**O que dizer:**
- "Bom dia/tarde! Vou apresentar um Sistema de Gestão Empresarial completo"
- "O projeto foi desenvolvido em Python, é totalmente modulado e possui interface web instalável"
- "Demonstra diversos conceitos de programação: listas, dicionários, funções, validações, API REST e PWA"

**O que mostrar:**
- Abra o VS Code mostrando a estrutura de pastas
- Destaque a organização: `src/` (Python) e `web/` (Frontend)

---

### 2. CONCEITOS DE PROGRAMAÇÃO (3 minutos)

**O que dizer:**
- "Cada módulo demonstra conceitos importantes de programação"

**O que mostrar:**
Abra o arquivo `operacional.py` e explique:

```python
# DEMONSTRAR:
- Comentários detalhados (explicar que facilitam o entendimento)
- Função calcular_capacidade() (modularização)
- Variáveis descritivas (capacidade_por_turno)
- Validação com if/else
- Operações matemáticas (multiplicação para cálculos)
- Try/except (tratamento de erros)
```

Abra o arquivo `estoque_entrada.py` e explique:

```python
# DEMONSTRAR:
- Lista (estoque_geral) para múltiplos itens
- Dicionário (produto) para estruturar dados
- Loop for para processar múltiplos cadastros
- Busca em lista (verificar duplicidade)
- .append() para adicionar à lista
```

---

### 3. DEMONSTRAÇÃO PRÁTICA - MODO WEB (5 minutos)

**Preparação:**
```powershell
# Execute antes da apresentação:
python app.py
```

**Passo a Passo:**

1. **Abra o navegador em http://localhost:5000**
   - "Aqui temos a interface web profissional e responsiva"
   - "Cada módulo tem sua cor e ícone para facilitar identificação"

2. **Demonstre o Módulo Operacional**
   - Clique em "Operacional"
   - Selecione "2 turnos"
   - Clique em "Calcular"
   - "Veja como o sistema calcula capacidade diária, mensal e anual"
   - "Também mostra o percentual de uso e diferença para capacidade máxima"

3. **Demonstre Entrada de Estoque**
   - Clique em "Entrada de Estoque"
   - Cadastre um produto:
     ```
     Código: 1
     Nome: Palete PBR
     Quantidade: 100
     Data: (data atual)
     Fornecedor: Madeiras XYZ
     Local: Corredor A1
     Valor: 25.50
     ```
   - "Note que o sistema valida todos os campos"

4. **Demonstre Visualizar Estoque**
   - Clique em "Visualizar Estoque"
   - "Aqui vemos todos os produtos cadastrados"
   - "Com totalizadores automáticos"

5. **Demonstre Saída de Estoque**
   - Clique em "Saída de Estoque"
   - Registre uma venda:
     ```
     Nome: Palete PBR
     Quantidade: 30
     ```
   - "O sistema dá baixa automática e calcula o valor da venda"

6. **Demonstre o Financeiro**
   - Clique em "Financeiro"
   - Preencha os valores:
     ```
     Água: 1000
     Luz: 2500
     Impostos: 3000
     Salários: 20000
     Pallets: 1000
     ```
   - "Veja o relatório completo com custos, precificação, projeções e indicadores"

7. **Demonstre o RH**
   - Clique em "RH"
   - Adicione 2 funcionários:
     ```
     Funcionário 1:
     - Nome: João Silva
     - Cargo: Operário
     - HE: 10

     Funcionário 2:
     - Nome: Maria Santos
     - Cargo: Supervisor
     - HE: 5
     ```
   - "O sistema calcula automaticamente INSS e IR progressivos"

---

### 4. FUNCIONALIDADE PWA (2 minutos)

**O que dizer:**
- "Este sistema é um PWA - Progressive Web App"
- "Isso significa que pode ser instalado como um aplicativo"

**O que mostrar:**
1. Clique no botão "Instalar App" no topo
2. Confirme a instalação
3. Mostre o ícone criado na área de trabalho/menu iniciar
4. Abra o app instalado
5. "Agora funciona como um aplicativo nativo, inclusive offline (parcialmente)"

**Demonstre Responsividade:**
- Redimensione a janela do navegador
- Ou use F12 > Device Toolbar
- "Veja como se adapta a celular, tablet e desktop"

---

### 5. CÓDIGO FONTE - EXPLICAÇÃO TÉCNICA (3 minutos)

**Estrutura de um Módulo:**

Abra `financeiro.py` e explique a estrutura:

```python
# 1. Comentários de cabeçalho
"""
Explica o propósito do módulo
"""

# 2. Função principal
def calcular_lucros():
    """Docstring explicativa"""
    
# 3. Coleta de dados com validação
try:
    valor = float(input("..."))
except ValueError:
    print("Erro!")

# 4. Cálculos
custo_total = agua + luz + impostos + salarios

# 5. Exibição de resultados formatados
print(f"Total: R$ {custo_total:,.2f}")
```

**API REST:**

Abra `app.py` e mostre um endpoint:

```python
@app.route('/api/estoque/entrada', methods=['POST'])
def cadastrar_produto_api():
    """
    Explique:
    - Recebe JSON
    - Processa os dados
    - Retorna resposta
    """
```

**Frontend:**

Abra `modules.js` e mostre uma função:

```javascript
async function cadastrarProduto(event) {
    // Explique:
    // - Previne reload da página
    // - Coleta dados do formulário
    // - Faz requisição à API
    // - Exibe mensagem de sucesso
}
```

---

### 6. ARQUITETURA DO SISTEMA (1 minuto)

**Desenhe ou mostre diagrama:**

```
┌─────────────────────────────────────┐
│     NAVEGADOR / PWA INSTALADO       │
│  (HTML + CSS + JavaScript)          │
└──────────────┬──────────────────────┘
               │ HTTP Requests
               ↓
┌─────────────────────────────────────┐
│        SERVIDOR FLASK (app.py)      │
│        API REST Endpoints           │
└──────────────┬──────────────────────┘
               │ Importa
               ↓
┌─────────────────────────────────────┐
│     MÓDULOS PYTHON (src/)           │
│  - operacional.py                   │
│  - estoque_entrada.py               │
│  - estoque_saida.py                 │
│  - financeiro.py                    │
│  - rh.py                            │
└─────────────────────────────────────┘
```

---

### 7. CONCLUSÃO (1 minuto)

**Recapitulação:**
- "Este projeto demonstra:"
  - ✅ Programação modular e organizada
  - ✅ Estruturas de dados (listas e dicionários)
  - ✅ Validações e tratamento de erros
  - ✅ API REST com Flask
  - ✅ Interface web moderna e responsiva
  - ✅ PWA instalável
  - ✅ Boas práticas de documentação

**Possíveis Melhorias:**
- "O sistema pode ser expandido com:"
  - Banco de dados persistente
  - Sistema de login
  - Gráficos e dashboards
  - Exportação de relatórios
  - Deploy em nuvem

**Encerramento:**
- "Obrigado pela atenção!"
- "Estou à disposição para perguntas"

---

## 🎯 DICAS IMPORTANTES

### Antes da Apresentação

✅ **Teste tudo:**
```powershell
# Teste o servidor web
python app.py
# Acesse http://localhost:5000
# Teste todos os módulos

# Teste o modo console
cd src
python main.py
```

✅ **Prepare o ambiente:**
- Feche abas desnecessárias do navegador
- Aumente o zoom do VS Code (Ctrl + para ler melhor)
- Tenha o PowerShell e navegador lado a lado
- Prepare dados de exemplo para preencher rapidamente

✅ **Tenha backup:**
- Se o servidor travar, saiba como reiniciar rapidamente
- Tenha prints das telas principais
- Grave um vídeo de demonstração como backup

### Durante a Apresentação

✅ **Fale com clareza:**
- Explique o QUE está fazendo
- Explique POR QUE está fazendo
- Explique COMO funciona

✅ **Destaque os conceitos:**
- Aponte no código as estruturas importantes
- Use termos técnicos corretos
- Faça conexão com a teoria aprendida

✅ **Interaja com a audiência:**
- "Alguma dúvida até aqui?"
- "Vou demonstrar agora..."
- Mantenha contato visual

### Possíveis Perguntas

**P: "Por que não usou banco de dados?"**
R: "Para simplicidade e foco nos conceitos fundamentais. Em produção, usaríamos SQLite ou PostgreSQL."

**P: "Funciona em várias máquinas ao mesmo tempo?"**
R: "Sim! Qualquer dispositivo na mesma rede pode acessar usando o IP do servidor."

**P: "É seguro?"**
R: "Para produção, precisaríamos adicionar autenticação, HTTPS e validações de segurança."

**P: "Como fazer deploy?"**
R: "Podemos usar Heroku, PythonAnywhere, AWS, ou qualquer servidor que suporte Flask."

---

## 📸 CHECKLIST FINAL

Antes de apresentar, confirme:

- [ ] Servidor Flask iniciando corretamente
- [ ] Todos os módulos web funcionando
- [ ] Modo console funcionando
- [ ] Botão de instalação PWA aparecendo
- [ ] Responsividade funcionando
- [ ] Validações funcionando
- [ ] Comentários no código legíveis
- [ ] VS Code configurado (zoom, tema)
- [ ] Dados de exemplo preparados

---

**BOA APRESENTAÇÃO! 🚀**

Você tem um projeto completo, bem estruturado e com conceitos importantes.
Apresente com confiança! 💪
