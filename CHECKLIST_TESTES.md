# ✅ CHECKLIST DE TESTES

Use este checklist para garantir que tudo está funcionando antes de apresentar.

---

## 🔧 CONFIGURAÇÃO INICIAL

- [ ] Python 3.8+ instalado
- [ ] pip funcionando
- [ ] VS Code aberto no diretório do projeto
- [ ] PowerShell aberto no diretório do projeto

---

## 📦 INSTALAÇÃO DE DEPENDÊNCIAS

### Método 1: Script Automático
- [ ] Executar: `.\iniciar.ps1`
- [ ] Script iniciou sem erros
- [ ] Dependências instaladas

### Método 2: Manual
- [ ] Executar: `pip install flask flask-cors`
- [ ] Flask instalado com sucesso
- [ ] Flask-CORS instalado com sucesso
- [ ] Verificar: `pip list | Select-String "flask"`

---

## 🖥️ TESTE MODO CONSOLE

- [ ] Navegar para pasta src: `cd src`
- [ ] Executar: `python main.py`
- [ ] Menu apareceu corretamente
- [ ] Todas as 5 opções aparecem

### Módulo 1 - Operacional
- [ ] Opção 1 funciona
- [ ] Aceita entrada de 1-3 turnos
- [ ] Mostra cálculos corretos
- [ ] Valida entrada inválida

### Módulo 2 - Estoque Entrada
- [ ] Opção 2 funciona
- [ ] Cadastra produto com sucesso
- [ ] Valida campos obrigatórios
- [ ] Atualiza quantidade de produto existente

### Módulo 3 - Estoque Saída
- [ ] Opção 3 funciona
- [ ] Busca produto por nome
- [ ] Dá baixa no estoque
- [ ] Trata produto não encontrado
- [ ] Trata estoque insuficiente

### Módulo 4 - Financeiro
- [ ] Opção 4 funciona
- [ ] Aceita valores decimais
- [ ] Calcula custos corretamente
- [ ] Mostra projeções
- [ ] Calcula ROI e ponto equilíbrio

### Módulo 5 - RH
- [ ] Opção 5 funciona
- [ ] Cadastra múltiplos funcionários
- [ ] Calcula diferentes cargos
- [ ] Calcula horas extras
- [ ] Aplica INSS corretamente
- [ ] Aplica IR corretamente
- [ ] Ordena alfabeticamente

### Menu Geral
- [ ] Opção 0 (Sair) funciona
- [ ] Validação de opções inválidas
- [ ] Loop funciona corretamente

---

## 🌐 TESTE MODO WEB

- [ ] Voltar ao diretório raiz: `cd ..`
- [ ] Executar: `python app.py`
- [ ] Servidor iniciou na porta 5000
- [ ] Mensagem de sucesso apareceu
- [ ] Sem erros no console

### Acesso ao Site
- [ ] Abrir navegador
- [ ] Acessar: http://localhost:5000
- [ ] Página carregou corretamente
- [ ] Todos os 6 cards aparecem
- [ ] Design está correto
- [ ] Ícones aparecem (Font Awesome)

### Interface
- [ ] Header com logo aparece
- [ ] Botão "Instalar App" aparece (ou está oculto se já instalado)
- [ ] Footer aparece
- [ ] Cores estão corretas
- [ ] Responsividade funciona (redimensione a janela)

---

## 🔍 TESTE DE MÓDULOS WEB

### Módulo Operacional
- [ ] Card "Operacional" clica
- [ ] Modal abre
- [ ] Formulário aparece
- [ ] Select de turnos funciona
- [ ] Botão "Calcular" funciona
- [ ] Resultados aparecem
- [ ] Valores estão corretos
- [ ] Botão fechar (X) funciona

### Módulo Estoque Entrada
- [ ] Card "Entrada de Estoque" clica
- [ ] Formulário completo aparece
- [ ] Todos os campos funcionam
- [ ] Validação funciona (campos obrigatórios)
- [ ] Cadastro salva com sucesso
- [ ] Toast de sucesso aparece
- [ ] Formulário limpa após cadastro

### Módulo Visualizar Estoque
- [ ] Card "Visualizar Estoque" clica
- [ ] Produtos cadastrados aparecem
- [ ] Tabela está formatada
- [ ] Totalizadores corretos
- [ ] Valores formatados (moeda brasileira)

### Módulo Estoque Saída
- [ ] Card "Saída de Estoque" clica
- [ ] Formulário aparece
- [ ] Busca produto funciona
- [ ] Venda registra com sucesso
- [ ] Resultado aparece
- [ ] Estoque atualiza
- [ ] Toast de sucesso aparece

### Módulo Financeiro
- [ ] Card "Financeiro" clica
- [ ] Formulário completo aparece
- [ ] Todos os campos numéricos funcionam
- [ ] Aceita valores decimais
- [ ] Cálculo funciona
- [ ] Relatório completo aparece
- [ ] Todas as seções preenchidas
- [ ] Valores formatados corretamente

### Módulo RH
- [ ] Card "RH" clica
- [ ] Botão "Adicionar Funcionário" funciona
- [ ] Card de funcionário aparece
- [ ] Todos os campos funcionam
- [ ] Select de cargo funciona
- [ ] Adiciona múltiplos funcionários
- [ ] Botão "Remover" funciona
- [ ] Cálculo gera relatório
- [ ] Valores estão corretos
- [ ] Ordenação alfabética funciona

---

## 📱 TESTE PWA

### Instalação
- [ ] Botão "Instalar App" está visível
- [ ] Clique funciona
- [ ] Popup de instalação aparece
- [ ] Confirmar instalação
- [ ] Ícone criado na área de trabalho/menu
- [ ] Ícone criado na tela inicial (mobile)

### App Instalado
- [ ] Abre como aplicativo separado
- [ ] Sem barra de endereço
- [ ] Funciona normalmente
- [ ] Todos os módulos funcionam
- [ ] Estilo mantém

### Offline (Parcial)
- [ ] Desconectar internet
- [ ] App abre (cache)
- [ ] Interface carrega
- [ ] API não funciona (esperado)
- [ ] Reconectar internet
- [ ] API volta a funcionar

---

## 🎨 TESTE RESPONSIVIDADE

### Desktop (1920x1080)
- [ ] Layout correto
- [ ] 3 colunas de cards
- [ ] Espaçamentos adequados
- [ ] Fonte legível

### Tablet (768x1024)
- [ ] Layout adapta
- [ ] 2 colunas de cards
- [ ] Menu funciona
- [ ] Modais adaptam

### Mobile (375x667)
- [ ] Layout adapta
- [ ] 1 coluna de cards
- [ ] Botões clicáveis
- [ ] Formulários usáveis
- [ ] Scroll funciona
- [ ] Modais ocupam tela inteira

### Teste com F12
- [ ] Abrir DevTools (F12)
- [ ] Ativar "Device Toolbar"
- [ ] Testar iPhone
- [ ] Testar iPad
- [ ] Testar Android

---

## ⚡ TESTE DE PERFORMANCE

- [ ] Carregamento rápido (<3s)
- [ ] Sem erros no console (F12)
- [ ] Sem warnings importantes
- [ ] Transições suaves
- [ ] Animações funcionam
- [ ] Loading aparece em requisições

---

## 🔒 TESTE DE VALIDAÇÕES

### Validações Funcionando
- [ ] Campos obrigatórios bloqueiam
- [ ] Números não aceitam texto
- [ ] Valores negativos bloqueados
- [ ] Formato de data funciona
- [ ] Select requer seleção
- [ ] Mensagens de erro claras

### Mensagens (Toasts)
- [ ] Toast de sucesso (verde)
- [ ] Toast de erro (vermelho)
- [ ] Toast de aviso (amarelo)
- [ ] Duração adequada (~3s)
- [ ] Posição correta (canto inferior direito)

---

## 🐛 TESTE DE ERROS CONHECIDOS

### Situações que DEVEM dar erro controlado:
- [ ] Vender produto inexistente
- [ ] Quantidade maior que estoque
- [ ] Campos vazios
- [ ] Turnos inválidos (<1 ou >3)
- [ ] Valores negativos

### Situações que DEVEM funcionar:
- [ ] Cadastrar produto duplicado (atualiza)
- [ ] Pedido parcial (estoque insuficiente)
- [ ] Múltiplos cadastros seguidos
- [ ] Valores decimais (0.50, 10.99)

---

## 📊 TESTE DE DADOS

### Dados de Teste Sugeridos

#### Produto 1
```
Código: 1
Nome: Palete PBR
Quantidade: 100
Data: 26/11/2025
Fornecedor: Madeiras XYZ
Local: Corredor A1
Valor: 25.50
```

#### Produto 2
```
Código: 2
Nome: Palete Chep
Quantidade: 50
Data: 26/11/2025
Fornecedor: Chep Brasil
Local: Corredor B2
Valor: 35.00
```

#### Financeiro
```
Água: 1000
Luz: 2500
Impostos: 3000
Salários: 20000
Pallets: 1000
```

#### Funcionário 1
```
Nome: Ana Silva
Cargo: Operário
HE: 10
```

#### Funcionário 2
```
Nome: Carlos Souza
Cargo: Supervisor
HE: 5
```

---

## 📸 TESTE VISUAL

- [ ] Cores consistentes
- [ ] Ícones aparecem
- [ ] Gradientes funcionam
- [ ] Sombras aparecem
- [ ] Bordas arredondadas
- [ ] Hover effects funcionam
- [ ] Animações suaves

---

## 🎤 TESTE DE APRESENTAÇÃO

### Preparação
- [ ] Dados de exemplo prontos
- [ ] Navegador aberto
- [ ] VS Code aberto com código importante
- [ ] Zoom adequado (Ctrl + se necessário)
- [ ] Roteiro em mãos (GUIA_APRESENTACAO.md)

### Fluxo de Demonstração
- [ ] Explicação inicial (2 min)
- [ ] Demonstração web (5 min)
- [ ] Instalação PWA (2 min)
- [ ] Código fonte (3 min)
- [ ] Conclusão (1 min)
- [ ] Tempo total: ~13 minutos

---

## ✅ RESULTADO FINAL

### Tudo Funcionando?

Se todos os itens acima estão marcados:

✅ **PROJETO 100% PRONTO PARA APRESENTAÇÃO!**

### Problemas Encontrados?

Se algum item falhou:

1. Consulte NOTA_ERROS.md
2. Consulte README.md (seção de problemas)
3. Verifique o console para erros
4. Teste novamente após corrigir

---

## 📝 NOTAS IMPORTANTES

### Antes da Apresentação
- [ ] Fechar outras abas do navegador
- [ ] Desativar notificações
- [ ] Carregar celular (se for demonstrar PWA em mobile)
- [ ] Testar conexão de internet
- [ ] Ter backup (prints ou vídeo)

### Durante a Apresentação
- [ ] Falar claramente
- [ ] Apontar para o código
- [ ] Explicar conceitos
- [ ] Manter ritmo
- [ ] Interagir com audiência

### Depois da Apresentação
- [ ] Agradecer
- [ ] Disponibilizar repositório
- [ ] Responder perguntas
- [ ] Aceitar sugestões

---

## 🎯 CHECKLIST MÍNIMO (RÁPIDO)

Se tiver pouco tempo, teste pelo menos:

- [ ] `python app.py` inicia sem erros
- [ ] http://localhost:5000 carrega
- [ ] Cada módulo abre
- [ ] Um cadastro funciona
- [ ] Uma consulta funciona
- [ ] PWA oferece instalação

---

**✨ Boa sorte com os testes e apresentação! 🚀**

*Checklist criado: 26/11/2025*
*Sistema Estoque Certo LTDA*
