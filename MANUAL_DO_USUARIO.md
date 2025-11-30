# Manual do Usuário - Quatro Cantos

Este guia fornece instruções passo a passo sobre como utilizar os principais módulos do sistema **Quatro Cantos**.

## 1. Acesso ao Sistema

Ao abrir o sistema pela primeira vez, você verá a tela de login.

- **Usuário Padrão (Demo)**: `admin@local.com`
- **Senha**: `admin123`

> **Nota**: Em modo local, você pode criar novas contas clicando em "Criar conta". Os dados serão salvos apenas no seu navegador.

## 2. Navegação

O sistema possui uma interface responsiva:
- **Desktop**: Menu lateral fixo à esquerda.
- **Mobile**: Menu acessível pelo botão "Hambúrguer" () no topo esquerdo.

## 3. Módulos

###  Operacional
Utilize este módulo para calcular a capacidade produtiva da fábrica.
1. Selecione o número de turnos ativos (1, 2 ou 3).
2. Clique em "Calcular Capacidade".
3. O sistema exibirá a produção diária, mensal e anual estimada, além de alertar sobre ociosidade.

###  Estoque (Entrada)
Cadastre novos produtos ou materiais de construção.
1. Preencha o **Código SKU**, **Nome**, **Lote** e **Serial** (obrigatórios para rastreabilidade).
2. Informe a quantidade, data, fornecedor e local de armazenamento.
3. Clique em "Registrar Entrada".

###  Estoque (Saída)
Registre vendas ou baixas de material.
1. Digite o nome do produto (o sistema buscará no estoque).
2. Informe a quantidade a ser vendida.
3. O sistema calculará automaticamente o valor total com base na margem de lucro configurada.

###  Financeiro
Realize o planejamento financeiro mensal.
1. Insira os custos fixos (Água, Luz, Impostos, Salários).
2. Informe a meta de produção (Total de Pallets/Mês).
3. O sistema calculará:
   - Custo por unidade.
   - Preço de venda sugerido (Margem de 50%).
   - Ponto de Equilíbrio e ROI.

###  Recursos Humanos (RH)
Gerencie a equipe e calcule a folha de pagamento.
1. **Cadastrar**: Use o formulário no topo para adicionar funcionários.
2. **Calcular**: Na lista de funcionários, insira as Horas Extras (se houver) e clique em "Calcular Folha".
3. **Exportar**: Após o cálculo, você pode gerar um PDF com o holerite simplificado.

###  Visualizar Estoque
Consulte todos os itens armazenados.
- Veja a lista completa com valores totais.
- Use o botão "Exportar PDF" para gerar um relatório de inventário.

## 4. Funcionalidades Extras

- **Instalação (PWA)**: Clique no botão "Instalar App" (se disponível no navegador) para usar o sistema como um aplicativo nativo.
- **Modo Offline**: O sistema funciona mesmo sem internet (em Modo Local), salvando os dados no seu dispositivo.

---
**Suporte**: Para dúvidas técnicas, contate o administrador do sistema.
