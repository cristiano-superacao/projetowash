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
    print("   MODULO 2: ENTRADA DE ESTOQUE")
    print("="*50)
    
    # ========================================================================
    # PASSO 1: DEFINIR QUANTOS PRODUTOS SERÃO CADASTRADOS
    # ========================================================================
    # Este módulo permite cadastrar vários produtos de uma vez
    try:
        qtd_cadastro = int(input("\n Quantos produtos deseja cadastrar agora? "))
        
        # Validação: não aceita valores zero ou negativos
        if qtd_cadastro <= 0:
            print("\n Quantidade deve ser maior que zero!")
            return
            
    except ValueError:
        # Tratamento de erro para entradas não numéricas
        print("\n Erro: Digite apenas numeros inteiros!")
        return
    
    # ========================================================================
    # PASSO 2: LOOP PARA CADASTRAR CADA PRODUTO
    # ========================================================================
    # ========================================================================
    # PASSO 2: LOOP PARA CADASTRAR CADA PRODUTO
    # ========================================================================
    # range(qtd_cadastro) gera números de 0 até qtd_cadastro-1
    # Exemplo: se qtd_cadastro=3, range gera [0, 1, 2]
    for i in range(qtd_cadastro):
        print("\n" + "-"*50)
        # i+1 mostra "Produto 1, 2, 3..." em vez de "0, 1, 2..."
        print(f" CADASTRANDO PRODUTO {i+1} DE {qtd_cadastro}")
        print("-"*50)
        
        # ====================================================================
        # PASSO 2.1: COLETAR DADOS BÁSICOS (CÓDIGO, NOME, QUANTIDADE)
        # ====================================================================
        # Coleta os dados essenciais que todo produto precisa ter
        try:
            codigo = int(input(" Codigo do produto: "))
            # .strip() remove espaços em branco no início e fim
            nome = input(" Nome do produto: ").strip()
            
            # Validação: nome não pode ser vazio
            if not nome:
                print(" Nome nao pode estar vazio! Pulando este produto.")
                continue  # Pula para próxima iteração do loop
                
            quantidade_nova = int(input(" Quantidade: "))
            
            # Validação: quantidade deve ser positiva
            if quantidade_nova <= 0:
                print(" Quantidade deve ser maior que zero! Pulando este produto.")
                continue
                
        except ValueError:
            # Erro ao converter texto para número
            print(" Erro: Dados invalidos! Pulando este produto.")
            continue
        
        # ====================================================================
        # PASSO 2.2: VERIFICAR SE O PRODUTO JÁ EXISTE (EVITAR DUPLICIDADE)
        # ====================================================================
        # Consulta SQL: SELECT * FROM produto WHERE codigo = <codigo> LIMIT 1
        # .first() retorna o primeiro resultado ou None se não encontrar
        produto_existente = db_session.query(Produto).filter_by(codigo=codigo).first()
        
        if produto_existente:
            # ================================================================
            # CENÁRIO 1: PRODUTO JÁ CADASTRADO
            # ================================================================
            # Em vez de criar duplicata, apenas soma a quantidade (atualização)
            produto_existente.quantidade += quantidade_nova
            db_session.commit()  # Salva a alteração no banco de dados
            
            print(f"\n Produto '{produto_existente.nome}' ja existe no estoque!")
            print(f"   Quantidade atualizada: {produto_existente.quantidade} unidades")
        
        # ====================================================================
        # PASSO 2.3: PRODUTO NOVO - COLETAR DADOS COMPLETOS
        # ====================================================================
        else:
            # Produto não encontrado no banco, precisamos cadastrar do zero
            print("\n Produto novo! Coletando informacoes adicionais...")
            
            # Solicita dados adicionais necessários para cadastro completo
            data = input(" Data de fabricacao (ex: 26/11/2025): ").strip()
            fornecedor = input(" Fornecedor: ").strip()
            local = input(" Local no armazem (ex: Corredor A, Prateleira 3): ").strip()
            
            try:
                # float() converte para número decimal (aceita centavos)
                valor = float(input(" Valor unitario (R$): "))
                
                # Validação: preço não pode ser negativo
                if valor < 0:
                    print(" Valor nao pode ser negativo! Usando R$ 0,00")
                    valor = 0.0
                    
            except ValueError:
                # Se digitar texto em vez de número
                print(" Valor invalido! Usando R$ 0,00")
                valor = 0.0
            
            # ================================================================
            # CRIAR O OBJETO DO PRODUTO E SALVAR NO BANCO
            # ================================================================
            # Produto() cria uma instância do modelo definido em database.py
            # Este objeto representa uma linha da tabela 'produtos' no banco
            novo_produto = Produto(
                codigo=codigo,
                nome=nome,
                quantidade=quantidade_nova,
                data=data,
                fornecedor=fornecedor,
                local=local,
                valor=valor
            )
            
            # db_session.add() prepara o objeto para inserção
            db_session.add(novo_produto)
            # db_session.commit() efetiva a transação (grava no banco)
            db_session.commit()
            
            print("\n Produto cadastrado com sucesso!")
            print(f"   Codigo: {codigo}")
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
    
    Esta função demonstra:
    - Consulta de todos os registros de uma tabela (.all())
    - Funções agregadoras (sum, len)
    - List comprehension para somatorias
    - Formatação monetária brasileira
    
    Parâmetros:
    -----------
    db_session : Session
        Sessão do banco de dados SQLAlchemy
    """
    # Busca TODOS os produtos do banco
    # SQL equivalente: SELECT * FROM produtos
    produtos = db_session.query(Produto).all()
    
    # Verifica se a consulta retornou algum resultado
    if not produtos:
        print("\n Estoque vazio! Nenhum produto cadastrado.")
        return
    
    print("\n" + "="*50)
    print("   LISTA COMPLETA DE PRODUTOS")
    print("="*50)
    
    # len() retorna o número de elementos na lista
    print(f" Total de produtos diferentes: {len(produtos)}")
    
    # sum() com generator expression: soma quantidade de todos os produtos
    # for p in produtos itera por cada produto, .quantidade acessa o atributo
    total_itens = sum(p.quantidade for p in produtos)
    print(f" Total de itens em estoque: {total_itens} unidades")
    
    # Cálculo do valor total: quantidade * preço unitário de cada produto
    valor_total = sum(p.quantidade * p.valor for p in produtos)
    print(f" Valor total do estoque: R$ {valor_total:,.2f}".replace(',', 'X').replace('.', ',').replace('X', '.'))
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
