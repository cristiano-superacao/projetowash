# estoque_entrada.py
# ============================================================================
# MÓDULO 2: ESTOQUE - ENTRADA DE PRODUTOS
# ============================================================================
# Este módulo é responsável por cadastrar novos produtos no estoque.
# Utiliza LISTAS e DICIONÁRIOS para armazenar os dados.
# 
# CONCEITOS DEMONSTRADOS:
# - Estrutura de dados: Lista (list)
# - Estrutura de dados: Dicionário (dict)
# - Laços de repetição (for)
# - Estruturas condicionais (if/else)
# - Busca em listas
# - Validação e tratamento de duplicidade
# ============================================================================

def cadastrar_produto(lista_produtos):
    """
    Cadastra novos produtos na lista de estoque.
    
    Parâmetros:
    -----------
    lista_produtos : list
        Lista que contém todos os produtos cadastrados (passada por referência)
    
    Funcionalidades:
    ----------------
    1. Permite cadastrar múltiplos produtos em sequência
    2. Verifica duplicidade pelo código do produto
    3. Se o produto já existe, apenas atualiza a quantidade (soma)
    4. Se é novo, solicita todas as informações e adiciona à lista
    """
    
    print("\n" + "="*50)
    print("   MÓDULO 2: ENTRADA DE ESTOQUE")
    print("="*50)
    
    # ========================================================================
    # PASSO 1: DEFINIR QUANTOS PRODUTOS SERÃO CADASTRADOS
    # ========================================================================
    try:
        qtd_cadastro = int(input("\n📦 Quantos produtos deseja cadastrar agora? "))
        
        if qtd_cadastro <= 0:
            print("\n❌ Quantidade deve ser maior que zero!")
            return
            
    except ValueError:
        print("\n❌ Erro: Digite apenas números inteiros!")
        return
    
    # ========================================================================
    # PASSO 2: LOOP PARA CADASTRAR CADA PRODUTO
    # ========================================================================
    for i in range(qtd_cadastro):
        print("\n" + "-"*50)
        print(f"📝 CADASTRANDO PRODUTO {i+1} DE {qtd_cadastro}")
        print("-"*50)
        
        # ====================================================================
        # PASSO 2.1: COLETAR DADOS BÁSICOS (CÓDIGO, NOME, QUANTIDADE)
        # ====================================================================
        try:
            codigo = int(input("🔢 Código do produto: "))
            nome = input("📌 Nome do produto: ").strip()
            
            if not nome:
                print("❌ Nome não pode estar vazio! Pulando este produto.")
                continue
                
            quantidade_nova = int(input("📊 Quantidade: "))
            
            if quantidade_nova <= 0:
                print("❌ Quantidade deve ser maior que zero! Pulando este produto.")
                continue
                
        except ValueError:
            print("❌ Erro: Dados inválidos! Pulando este produto.")
            continue
        
        # ====================================================================
        # PASSO 2.2: VERIFICAR SE O PRODUTO JÁ EXISTE (EVITAR DUPLICIDADE)
        # ====================================================================
        # Esta variável controla se encontramos o produto na lista
        produto_encontrado = False
        
        # Varre a lista inteira procurando se o código já existe
        for produto in lista_produtos:
            # Compara o código do produto atual com o código digitado
            if produto['codigo'] == codigo:
                # PRODUTO JÁ EXISTE: Apenas soma a quantidade (fusão/atualização)
                produto['quantidade'] += quantidade_nova
                print(f"\n✅ Produto '{produto['nome']}' já existe no estoque!")
                print(f"   Quantidade atualizada: {produto['quantidade']} unidades")
                produto_encontrado = True
                break  # Para de procurar pois já achou
        
        # ====================================================================
        # PASSO 2.3: SE NÃO ACHOU, CADASTRAR NOVO PRODUTO
        # ====================================================================
        if not produto_encontrado:
            # Solicita os dados completos do novo produto
            print("\n🆕 Produto novo! Coletando informações adicionais...")
            
            data = input("📅 Data de fabricação (ex: 26/11/2025): ").strip()
            fornecedor = input("🏭 Fornecedor: ").strip()
            local = input("📍 Local no armazém (ex: Corredor A, Prateleira 3): ").strip()
            
            try:
                valor = float(input("💰 Valor unitário (R$): "))
                
                if valor < 0:
                    print("❌ Valor não pode ser negativo! Usando R$ 0,00")
                    valor = 0.0
                    
            except ValueError:
                print("❌ Valor inválido! Usando R$ 0,00")
                valor = 0.0
            
            # ================================================================
            # CRIAR O DICIONÁRIO DO PRODUTO
            # ================================================================
            # Um dicionário armazena pares chave:valor
            # É como uma ficha com várias informações sobre o produto
            novo_produto = {
                "codigo": codigo,           # Código único do produto
                "nome": nome,               # Nome/descrição
                "quantidade": quantidade_nova,  # Quantidade em estoque
                "data": data,               # Data de fabricação
                "fornecedor": fornecedor,   # Quem forneceu
                "local": local,             # Onde está guardado
                "valor": valor              # Preço unitário
            }
            
            # Adiciona o dicionário na lista principal
            # O método .append() adiciona ao final da lista
            lista_produtos.append(novo_produto)
            
            print("\n✅ Produto cadastrado com sucesso!")
            print(f"   Código: {codigo}")
            print(f"   Nome: {nome}")
            print(f"   Quantidade: {quantidade_nova} unidades")
            print(f"   Valor: R$ {valor:.2f}")
    
    # ========================================================================
    # PASSO 3: EXIBIR RESUMO DO ESTOQUE
    # ========================================================================
    print("\n" + "="*50)
    print(f"   RESUMO DO ESTOQUE")
    print("="*50)
    print(f"📦 Total de produtos diferentes: {len(lista_produtos)}")
    
    # Calcular quantidade total de itens
    total_itens = sum(produto['quantidade'] for produto in lista_produtos)
    print(f"📊 Total de itens em estoque: {total_itens} unidades")
    
    # Calcular valor total do estoque
    valor_total = sum(produto['quantidade'] * produto['valor'] for produto in lista_produtos)
    print(f"💰 Valor total do estoque: R$ {valor_total:,.2f}".replace(',', 'X').replace('.', ',').replace('X', '.'))
    print("="*50)


def listar_estoque(lista_produtos):
    """
    Função auxiliar para listar todos os produtos em estoque.
    
    Parâmetros:
    -----------
    lista_produtos : list
        Lista contendo todos os produtos cadastrados
    """
    
    if len(lista_produtos) == 0:
        print("\n⚠️  Estoque vazio! Nenhum produto cadastrado.")
        return
    
    print("\n" + "="*50)
    print("   LISTA COMPLETA DE PRODUTOS")
    print("="*50)
    
    for i, produto in enumerate(lista_produtos, 1):
        print(f"\n{i}. {produto['nome']}")
        print(f"   Código: {produto['codigo']}")
        print(f"   Quantidade: {produto['quantidade']} unidades")
        print(f"   Valor: R$ {produto['valor']:.2f}")
        print(f"   Local: {produto['local']}")
        print(f"   Fornecedor: {produto['fornecedor']}")
        print(f"   Data: {produto['data']}")
    
    print("="*50)


# ============================================================================
# FUNÇÃO AUXILIAR PARA TESTES (OPCIONAL)
# ============================================================================
if __name__ == "__main__":
    print("🧪 Testando o Módulo de Entrada de Estoque...\n")
    estoque_teste = []
    cadastrar_produto(estoque_teste)
    listar_estoque(estoque_teste)
