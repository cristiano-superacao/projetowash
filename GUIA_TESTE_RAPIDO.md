# 🚀 Guia Rápido de Teste - Layout Híbrido

## ⚡ Início Rápido (2 minutos)

### 1️⃣ Iniciar o Sistema
```powershell
cd t:\Sistemas_Desenvolvimento\projetowash
python app.py
```

### 2️⃣ Abrir no Navegador
```
http://localhost:5000
```

---

## 🎯 Roteiro de Testes

### ✅ TESTE 1: Mudança de Cor em Tempo Real (30 segundos)

1. Clique em **"Criar conta"**
2. No dropdown **"Segmento da Empresa"**, mude entre:
   - 🏗️ Construção Civil → Observe a cor LARANJA
   - 🚗 Automotivo → Observe a cor VERMELHA
   - 💊 Farmacêutico → Observe a cor AZUL
   - ⚡ Eletroeletrônico → Observe a cor ROXA

**Resultado esperado:** A cor do botão e elementos da interface mudam instantaneamente! ✨

---

### ✅ TESTE 2: Cadastro com Segmento (1 minuto)

1. Preencha o formulário:
   - Nome: `Construtora Teste`
   - Email: `teste@construcao.com`
   - Senha: `123456`
   - Segmento: **Construção Civil**
2. Clique **"Cadastrar"**

**Resultado esperado:** Conta criada com tema laranja! 🏗️

---

### ✅ TESTE 3: Categorias Específicas (1 minuto)

1. Faça login com a conta criada
2. Clique em **"Estoque Entrada"**
3. Clique em **"+ Novo Produto"**
4. Observe o campo **"Categoria"**

**Para Construção Civil, você verá:**
- ✅ Cimentos e Argamassas
- ✅ Tijolos e Blocos
- ✅ Areia e Pedra
- ✅ Ferro e Aço
- ✅ Madeiras
- ✅ Tintas e Vernizes
- E mais...

**Resultado esperado:** Categorias relevantes para construção! 🎯

---

### ✅ TESTE 4: Tipos de Material (1 minuto)

No mesmo formulário, observe o campo **"Tipo de Material"**:

- 📦 Matéria-Prima
- 🔧 Semi-Acabado
- ✅ Produto Acabado
- 🛠️ MRO (Manutenção, Reparo, Operação)
- 🔥 Consumível
- 📦 Embalagem
- 🔨 Ferramenta
- 🦺 EPI (Equipamento de Proteção Individual)
- 🔌 Componente
- 🔩 Acessório

**Resultado esperado:** 10 tipos de materiais disponíveis! 🏷️

---

### ✅ TESTE 5: Unidades de Medida (1 minuto)

No campo **"Unidade de Medida"**, você verá 23 opções:

**Unidades Comuns:**
- UN (Unidade)
- PC (Peça)
- CJ (Conjunto)

**Para Construção:**
- SC (Saco) - para cimento
- M³ (Metro cúbico) - para concreto
- M² (Metro quadrado) - para piso
- M (Metro) - para canos

**Resultado esperado:** Unidades relevantes para o segmento! 📏

---

### ✅ TESTE 6: Cadastro Completo de Produto (2 minutos)

Preencha todos os campos:

1. **Código/SKU:** `CIM001`
2. **Nome:** `Cimento Portland CP II`
3. **Tipo de Material:** `Matéria-Prima`
4. **Categoria:** `Cimentos e Argamassas`
5. **Lote:** `2025001`
6. **Número Serial:** `SER123456`
7. **Quantidade:** `100`
8. **Unidade de Medida:** `SC` (Saco)
9. **Data de Entrada:** `(Hoje)`
10. **Fornecedor:** `Cimentos Brasil LTDA`
11. **Local de Armazenamento:** `Galpão A - Setor 1`
12. **Valor Unitário:** `35.50`

Clique **"Cadastrar"**

**Resultado esperado:** Produto cadastrado com sucesso! ✅

---

### ✅ TESTE 7: Comparação de Segmentos (3 minutos)

#### Fase 1: Construção Civil
1. Faça logout
2. Crie conta: `Construtora XYZ` (Segmento: Construção Civil)
3. Entre em "Estoque Entrada"
4. Observe categorias: Cimentos, Tijolos, Areia...
5. **Cor do tema:** LARANJA 🟠

#### Fase 2: Farmacêutico
1. Faça logout
2. Crie conta: `Farmácia ABC` (Segmento: Farmacêutico)
3. Entre em "Estoque Entrada"
4. Observe categorias: Medicamentos, Vitaminas, Antibióticos...
5. **Cor do tema:** AZUL 🔵

#### Fase 3: Automotivo
1. Faça logout
2. Crie conta: `Auto Peças 123` (Segmento: Automotivo)
3. Entre em "Estoque Entrada"
4. Observe categorias: Peças de Motor, Suspensão, Freios...
5. **Cor do tema:** VERMELHO 🔴

**Resultado esperado:** Cada empresa tem categorias e cores diferentes! 🎨

---

## 📊 Checklist de Funcionalidades

### Durante os Testes, Verifique:

- [ ] 🎨 Cor muda ao selecionar segmento no cadastro
- [ ] 💾 Segmento é salvo após registro
- [ ] 🔄 Tema persiste após recarregar página (F5)
- [ ] 📦 Categorias mudam por segmento
- [ ] 🏷️ 10 tipos de materiais disponíveis
- [ ] 📏 23 unidades de medida disponíveis
- [ ] 📱 Interface responsiva em mobile
- [ ] ✅ Validação de todos os 12 campos
- [ ] 💼 Título "Cadastrar Material" (Construção) ou "Cadastrar Produto" (outros)
- [ ] 🔍 Dropdown de categorias preenchido automaticamente

---

## 🐛 Possíveis Problemas e Soluções

### Problema: Cor não muda
**Solução:** Limpe cache do navegador (Ctrl + Shift + Del)

### Problema: Categorias não aparecem
**Solução:** Verifique se `segments-config.js` está carregando no console (F12)

### Problema: Tema não persiste
**Solução:** Verifique localStorage no console: `localStorage.getItem('segmento_empresa')`

### Problema: Erro ao cadastrar produto
**Solução:** Verifique se todos os 12 campos estão preenchidos

---

## 🎯 Resultado Final Esperado

Após completar todos os testes, você terá:

1. ✅ **3+ empresas** cadastradas (diferentes segmentos)
2. ✅ **3+ produtos** cadastrados (diferentes tipos)
3. ✅ **Verificado** que cada segmento tem:
   - Cor exclusiva
   - Categorias específicas
   - Unidades relevantes
4. ✅ **Confirmado** que o layout é híbrido e adaptável

---

## 📸 Capturas de Tela Sugeridas

Durante os testes, tire prints de:

1. 📷 Dropdown de segmentos com todas as 10 opções
2. 📷 Interface com tema LARANJA (Construção)
3. 📷 Interface com tema AZUL (Farmacêutico)
4. 📷 Interface com tema VERMELHO (Automotivo)
5. 📷 Formulário completo com 12 campos
6. 📷 Dropdown de categorias para Construção
7. 📷 Dropdown de categorias para Farmacêutico
8. 📷 Lista de produtos cadastrados

---

## ⏱️ Tempo Total Estimado

- Teste Rápido: **5-7 minutos** (Testes 1-3)
- Teste Completo: **15-20 minutos** (Todos os testes)
- Teste Exaustivo: **30-40 minutos** (Com capturas e documentação)

---

## 🎓 Dicas para Apresentação em Sala de Aula

### Roteiro Sugerido:

1. **Introdução (2 min)**
   - Explicar o conceito de layout híbrido
   - Mostrar os 10 segmentos disponíveis

2. **Demonstração Rápida (3 min)**
   - Trocar segmentos no cadastro
   - Mostrar mudança de cor em tempo real

3. **Cadastro de Empresa (2 min)**
   - Criar conta com segmento Construção
   - Fazer login

4. **Cadastro de Produto (5 min)**
   - Mostrar formulário com 12 campos
   - Explicar cada tipo de material
   - Cadastrar produto completo

5. **Comparação de Segmentos (5 min)**
   - Criar conta Farmacêutica
   - Mostrar diferenças nas categorias
   - Comparar temas lado a lado

6. **Perguntas e Respostas (3 min)**

**Tempo total:** 20 minutos

---

## 🌟 Destaques para Mencionar

1. **Sistema Adaptável:** Muda conforme o tipo de empresa
2. **10 Segmentos:** Atende diversos mercados
3. **100+ Categorias:** Específicas por indústria
4. **23 Unidades:** Medidas apropriadas por setor
5. **10 Tipos de Material:** Classificação profissional
6. **Tema Dinâmico:** Cor muda automaticamente
7. **Responsivo:** Funciona em PC, tablet e celular
8. **Educacional:** Código comentado para aprendizado

---

## ✅ Conclusão

Este sistema demonstra conceitos avançados de:
- 🎨 **UX/UI:** Interface adaptável
- 💾 **Persistência:** localStorage e Firebase
- 🔄 **Dinâmico:** Mudanças em tempo real
- 🏗️ **Modular:** Código organizado e reutilizável
- 📱 **Responsivo:** Design mobile-first

**Pronto para apresentar!** 🚀

---

*Guia criado para fins educacionais - Quatro Cantos © 2025*
