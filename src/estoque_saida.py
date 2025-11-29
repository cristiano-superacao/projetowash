# estoque_saida.py
# ============================================================================
# MÓDULO 2: ESTOQUE - SAÍDA DE PRODUTOS (VENDAS)
# ============================================================================
# Este módulo é responsável por registrar vendas e dar baixa no estoque.
# Implementa lógica de busca e verificação de saldo disponível.
# 
# CONCEITOS DEMONSTRADOS:
# - Interação com Banco de Dados (SQLAlchemy)
# - Busca case-insensitive no banco
# - Estruturas condicionais complexas (if/elif/else)
# - Atualização de dados no banco
# - Validação de estoque
# - Tratamento de pedidos parciais
# ============================================================================

from src.database import Produto

def vender_produto(db_session):
    """
    Registra vendas e dá baixa no estoque.
    
    Parâmetros:
    -----------
    db_session : Session
        Sessão do banco de dados
    
    Funcionalidades:
    ----------------
    1. Busca produto pelo nome (case-insensitive)
    2. Verifica disponibilidade em estoque
    3. Atende pedido completo se houver estoque suficiente
    4. Atende pedido parcial se estoque for insuficiente
    5. Informa se produto está esgotado
    6. Limita a 10 pedidos por vez (conforme requisito)
    """
    
    print("\n" + "="*50)
    print("   MODULO 2: SAIDA DE ESTOQUE (VENDAS)")
    print("="*50)
    
    # ========================================================================
    # PASSO 1: VERIFICAR SE HÁ PRODUTOS CADASTRADOS
    # ========================================================================
    # .count() retorna o número de registros na tabela
    # Equivale a: SELECT COUNT(*) FROM produtos
    produtos_count = db_session.query(Produto).count()
    if produtos_count == 0:
        print("\n Erro: Nao ha produtos cadastrados no estoque!")
        print("   Por favor, cadastre produtos antes de registrar vendas.")
        return
    
    # Mostrar lista de produtos disponíveis para facilitar o pedido
    print("\n Produtos disponiveis no estoque:")
    print("-"*50)
    # .all() retorna todos os registros como lista de objetos
    produtos = db_session.query(Produto).all()
    # enumerate() adiciona um contador automático começando em 1
    for i, produto in enumerate(produtos, 1):
        print(f"{i}. {produto.nome} - Estoque: {produto.quantidade} unidades")
    print("-"*50)
    
    # ========================================================================
    # PASSO 2: DEFINIR QUANTOS PEDIDOS SERÃO PROCESSADOS
    # ========================================================================
    # Este módulo processa vários pedidos em sequência (batch)
    try:
        qtd_pedidos = int(input("\n Quantos pedidos vai processar? "))
        
        # Limitação conforme requisito do exercício (máximo 10 pedidos)
        if qtd_pedidos > 10:
            print(" Aviso: Limitado a 10 pedidos conforme regra do sistema.")
            qtd_pedidos = 10
        
        if qtd_pedidos <= 0:
            print(" Quantidade deve ser maior que zero!")
            return
            
    except ValueError:
        print(" Erro: Digite apenas numeros inteiros!")
        return
    
    # Variáveis para estatísticas
    pedidos_atendidos_completos = 0
    pedidos_atendidos_parciais = 0
    pedidos_nao_atendidos = 0
    valor_total_vendas = 0.0
    
    # ========================================================================
    # PASSO 3: PROCESSAR CADA PEDIDO
    # ========================================================================
    for i in range(qtd_pedidos):
        print("\n" + "="*50)
        print(f" PEDIDO {i+1} DE {qtd_pedidos}")
        print("="*50)
        
        # ====================================================================
        # PASSO 3.1: COLETAR DADOS DO PEDIDO
        # ====================================================================
        nome_buscado = input(" Digite o nome do produto desejado: ").strip()
        
        if not nome_buscado:
            print(" Nome nao pode estar vazio! Pulando este pedido.")
            pedidos_nao_atendidos += 1
            continue
        
        try:
            qtd_desejada = int(input(" Quantidade desejada: "))
            
            if qtd_desejada <= 0:
                print(" Quantidade deve ser maior que zero! Pulando este pedido.")
                pedidos_nao_atendidos += 1
                continue
                
        except ValueError:
            print(" Erro: Quantidade invalida! Pulando este pedido.")
            pedidos_nao_atendidos += 1
            continue
        
        # ====================================================================
        # PASSO 3.2: BUSCAR O PRODUTO NO BANCO PELO NOME
        # ====================================================================
        # ilike() faz busca case-insensitive (ignora maiúsculas/minúsculas)
        # Equivale a: WHERE LOWER(nome) = LOWER('nome_buscado')
        produto_achado = db_session.query(Produto).filter(Produto.nome.ilike(nome_buscado)).first()
        
        # ====================================================================
        # PASSO 3.3: PROCESSAR A VENDA (LÓGICA DE BAIXA NO ESTOQUE)
        # ====================================================================
        if produto_achado:
            # Produto foi encontrado! Agora verifica o estoque
            saldo_atual = produto_achado.quantidade
            valor_unitario = produto_achado.valor
            
            print(f"\n Produto encontrado: {produto_achado.nome}")
            print(f"   Estoque atual: {saldo_atual} unidades")
            print(f"   Valor unitario: R$ {valor_unitario:.2f}")
            
            # ================================================================
            # CENÁRIO 1: ESTOQUE SUFICIENTE (PEDIDO COMPLETO)
            # ================================================================
            # Compara: há estoque suficiente para atender tudo?
            if saldo_atual >= qtd_desejada:
                # Tem estoque suficiente para atender o pedido completo
                produto_achado.quantidade -= qtd_desejada  # Subtrai do estoque
                valor_venda = qtd_desejada * valor_unitario  # Calcula total
                valor_total_vendas += valor_venda  # Acumula no total geral
                
                print(f"\n PEDIDO ATENDIDO COMPLETAMENTE!")
                print(f"   Quantidade vendida: {qtd_desejada} unidades")
                print(f"   Valor da venda: R$ {valor_venda:.2f}")
                print(f"   Estoque restante: {produto_achado.quantidade} unidades")
                
                pedidos_atendidos_completos += 1
            
            # ================================================================
            # CENÁRIO 2: ESTOQUE INSUFICIENTE (PEDIDO PARCIAL)
            # ================================================================
            # Há algum estoque, mas não o suficiente para atender tudo
            elif saldo_atual > 0:
                # Tem algum estoque, mas não o suficiente
                print(f"\n ATENCAO: Estoque insuficiente para o pedido completo.")
                print(f"   Solicitado: {qtd_desejada} unidades")
                print(f"   Disponivel: {saldo_atual} unidades")
                print(f"\n Enviando as {saldo_atual} unidades disponiveis (Pedido Parcial).")
                
                # Vende tudo que tem disponível
                valor_venda = saldo_atual * valor_unitario
                valor_total_vendas += valor_venda
                
                print(f"   Valor da venda: R$ {valor_venda:.2f}")
                produto_achado.quantidade = 0  # Zera o estoque
                print(f"   Estoque restante: 0 unidades (ESGOTADO)")
                
                pedidos_atendidos_parciais += 1
            
            # ================================================================
            # CENÁRIO 3: PRODUTO ESGOTADO (SALDO ZERO)
            # ================================================================
            else:
                # Estoque zerado - Não é possível atender
                print(f"\n ERRO: Produto '{produto_achado.nome}' esta ESGOTADO!")
                print("   Nao ha unidades disponiveis no momento.")
                pedidos_nao_atendidos += 1
            
            # Salva as alterações no banco (COMMIT da transação)
            db_session.commit()
        
        else:
            # ================================================================
            # CENÁRIO 4: PRODUTO NÃO ENCONTRADO NO BANCO DE DADOS
            # ================================================================
            # A busca não retornou nenhum registro (.first() retornou None)
            print(f"\n ERRO: Produto '{nome_buscado}' nao encontrado no sistema.")
            print("   Verifique o nome e tente novamente.")
            pedidos_nao_atendidos += 1
    
    # ========================================================================
    # PASSO 4: EXIBIR RELATÓRIO FINAL DE VENDAS
    # ========================================================================
    # Após processar todos os pedidos, exibe um resumo estatístico
    print("\n" + "="*50)
    print("   RELATORIO DE VENDAS")
    print("="*50)
    print(f"\n Pedidos processados: {qtd_pedidos}")
    print(f" Atendidos completamente: {pedidos_atendidos_completos}")
    print(f" Atendidos parcialmente: {pedidos_atendidos_parciais}")
    print(f" Nao atendidos: {pedidos_nao_atendidos}")
    print(f"\n Valor total das vendas: R$ {valor_total_vendas:,.2f}".replace(',', 'X').replace('.', ',').replace('X', '.'))
    print("="*50)


def consultar_produto(db_session):
    """
    Função auxiliar para consultar um produto específico.
    
    Esta função demonstra:
    - Busca case-insensitive com ilike()
    - Exibição detalhada de um registro
    - Cálculo de valor total (quantidade * preço)
    
    Parâmetros:
    -----------
    db_session : Session
        Sessão do banco de dados
    """
    produtos_count = db_session.query(Produto).count()
    if produtos_count == 0:
        print("\n Estoque vazio! Nenhum produto cadastrado.")
        return
    
    nome = input("\n Digite o nome do produto a consultar: ").strip()
    
    # Busca case-insensitive
    produto = db_session.query(Produto).filter(Produto.nome.ilike(nome)).first()
    
    if produto:
        print("\n" + "="*50)
        print(f"   INFORMACOES DO PRODUTO")
        print("="*50)
        print(f" Nome: {produto.nome}")
        print(f" Codigo: {produto.codigo}")
        print(f" Quantidade em estoque: {produto.quantidade} unidades")
        print(f" Valor unitario: R$ {produto.valor:.2f}")
        print(f" Local: {produto.local}")
        print(f" Fornecedor: {produto.fornecedor}")
        print(f" Data de fabricacao: {produto.data}")
        
        # Cálculo do valor total deste produto no estoque
        valor_total_produto = produto.quantidade * produto.valor
        print(f" Valor total em estoque: R$ {valor_total_produto:.2f}")
        print("="*50)
    else:
        print(f"\n Produto '{nome}' nao encontrado no sistema.")


# ============================================================================
# FUNÇÃO AUXILIAR PARA TESTES (OPCIONAL)
# ============================================================================
if __name__ == "__main__":
    print("🧪 Testando o Módulo de Saída de Estoque...\n")
    
    # Criar estoque de teste
    estoque_teste = [
        {"codigo": 1, "nome": "Palete PBR", "quantidade": 100, "data": "26/11/2025", 
         "fornecedor": "Madeiras XYZ", "local": "A1", "valor": 25.00},
        {"codigo": 2, "nome": "Palete Chep", "quantidade": 50, "data": "26/11/2025", 
         "fornecedor": "Chep Brasil", "local": "A2", "valor": 35.00},
    ]
    
    vender_produto(estoque_teste)
