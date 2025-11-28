# estoque_entrada.py
# ============================================================================
# MÓDULO 2: ESTOQUE - ENTRADA DE PRODUTOS
# ============================================================================
# Este módulo é responsável por cadastrar novos produtos no estoque.
# Utiliza BANCO DE DADOS (SQLAlchemy) para armazenar os dados.
# 
# CONCEITOS DEMONSTRADOS:
# - Interação com Banco de Dados
# - Laços de repetição (for)
# - Estruturas condicionais (if/else)
# - Validação e tratamento de duplicidade
# ============================================================================

from src.database import Produto

def cadastrar_produto(db_session):
    """
    Cadastra novos produtos no banco de dados.
    
    Parâmetros:
    -----------
    db_session : Session
        Sessão do banco de dados SQLAlchemy
    
    Funcionalidades:
    ----------------
    1. Permite cadastrar múltiplos produtos em sequência
    2. Verifica duplicidade pelo código do produto no banco
    3. Se o produto já existe, apenas atualiza a quantidade (soma)
    4. Se é novo, solicita todas as informações e adiciona ao banco
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
        # Busca no banco de dados pelo código
        produto_existente = db_session.query(Produto).filter_by(codigo=codigo).first()
        
        if produto_existente:
            # PRODUTO JÁ EXISTE: Apenas soma a quantidade (fusão/atualização)
            produto_existente.quantidade += quantidade_nova
            db_session.commit() # Salva a alteração
            
            print(f"\n✅ Produto '{produto_existente.nome}' já existe no estoque!")
            print(f"   Quantidade atualizada: {produto_existente.quantidade} unidades")
        
        # ====================================================================
        # PASSO 2.3: SE NÃO ACHOU, CADASTRAR NOVO PRODUTO
        # ====================================================================
        else:
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
            # CRIAR O OBJETO DO PRODUTO
            # ================================================================
            novo_produto = Produto(
                codigo=codigo,
                nome=nome,
                quantidade=quantidade_nova,
                data=data,
                fornecedor=fornecedor,
                local=local,
                valor=valor
            )
            
            # Adiciona ao banco de dados
            db_session.add(novo_produto)
            db_session.commit()
            
            print("\n✅ Produto cadastrado com sucesso!")
            print(f"   Código: {codigo}")
            print(f"   Nome: {nome}")
            print(f"   Quantidade: {quantidade_nova} unidades")
            print(f"   Valor: R$ {valor:.2f}")
    
    # ========================================================================
    # PASSO 3: EXIBIR RESUMO DO ESTOQUE
    # ========================================================================
    listar_estoque(db_session)


def listar_estoque(db_session):
    """
    Função auxiliar para listar todos os produtos em estoque.
    
    Parâmetros:
    -----------
    db_session : Session
        Sessão do banco de dados
    """
    produtos = db_session.query(Produto).all()
    
    if not produtos:
        print("\n⚠️  Estoque vazio! Nenhum produto cadastrado.")
        return
    
    print("\n" + "="*50)
    print("   LISTA COMPLETA DE PRODUTOS")
    print("="*50)
    print(f"📦 Total de produtos diferentes: {len(produtos)}")
    
    total_itens = sum(p.quantidade for p in produtos)
    print(f"📊 Total de itens em estoque: {total_itens} unidades")
    
    valor_total = sum(p.quantidade * p.valor for p in produtos)
    print(f"💰 Valor total do estoque: R$ {valor_total:,.2f}".replace(',', 'X').replace('.', ',').replace('X', '.'))
    print("="*50)
    
    for i, produto in enumerate(produtos, 1):
        print(f"\n{i}. {produto.nome}")
        print(f"   Código: {produto.codigo}")
        print(f"   Quantidade: {produto.quantidade} unidades")
        print(f"   Valor: R$ {produto.valor:.2f}")
        print(f"   Local: {produto.local}")
        print(f"   Fornecedor: {produto.fornecedor}")
        print(f"   Data: {produto.data}")
    
    print("="*50)


# ============================================================================
# FUNÇÃO AUXILIAR PARA TESTES (OPCIONAL)
# ============================================================================
if __name__ == "__main__":
    print("🧪 Testando o Módulo de Entrada de Estoque...\n")
    estoque_teste = []
    cadastrar_produto(estoque_teste)
    listar_estoque(estoque_teste)
