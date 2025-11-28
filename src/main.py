# main.py
# ============================================================================
# SISTEMA DE GESTÃO - ESTOQUE CERTO LTDA
# ============================================================================
# Este é o arquivo principal que controla o menu do sistema.
# Ele importa todos os módulos e gerencia a navegação entre as funcionalidades.
# ============================================================================

import sys
import os

# Adiciona o diretório pai ao path para permitir importações do pacote src
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

# Importando os módulos
from src import operacional
from src import estoque_entrada
from src import estoque_saida
from src import financeiro
from src import rh
from src.database import init_db, SessionLocal

def iniciar_sistema():
    """
    Função principal que inicializa o sistema.
    
    Esta função inicializa o banco de dados e mantém o loop principal do menu.
    """
    
    # Inicializa o banco de dados (cria tabelas se não existirem)
    print("🔄 Inicializando banco de dados...")
    init_db()
    print("✅ Banco de dados conectado!")
    
    # Cria uma sessão com o banco de dados
    db_session = SessionLocal()

    try:
        # Loop infinito que mantém o sistema rodando até o usuário escolher sair
        while True:
            # Mostra o menu de opções na tela
            print("\n" + "="*50)
            print("   SISTEMA DE GESTÃO - ESTOQUE CERTO LTDA")
            print("="*50)
            print("1 - Módulo Operacional (Simular Capacidade de Produção)")
            print("2 - Módulo Estoque (Cadastrar Entrada de Produtos)")
            print("3 - Módulo Estoque (Registrar Saída/Venda)")
            print("4 - Módulo Financeiro (Calcular Custos e Lucros)")
            print("5 - Módulo RH (Folha de Pagamento)")
            print("0 - Sair do Sistema")
            print("="*50)
            
            # Captura a opção digitada pelo usuário
            opcao = input("Digite a opção desejada: ")

            # Verifica qual opção o usuário escolheu e chama a função correta
            if opcao == "1":
                # Chama o módulo operacional para calcular capacidade de produção
                operacional.calcular_capacidade()
                
            elif opcao == "2":
                # Passamos a sessão do banco de dados
                estoque_entrada.cadastrar_produto(db_session)
                
            elif opcao == "3":
                # Passamos a sessão do banco de dados
                estoque_saida.vender_produto(db_session)
                
            elif opcao == "4":
                # Chama o módulo financeiro para calcular custos e lucros
                financeiro.calcular_lucros()
                
            elif opcao == "5":
                # Chama o módulo de RH para calcular a folha de pagamento
                rh.calcular_folha_pagamento()
                
            elif opcao == "0":
                # Encerra o sistema
                print("\n" + "="*50)
                print("   Encerrando o sistema... Até logo!")
                print("="*50 + "\n")
                break  # Encerra o loop e fecha o programa
                
            else:
                # Caso o usuário digite algo inválido
                print("\n❌ Opção inválida! Por favor, tente novamente.")
    
    finally:
        # Garante que a conexão com o banco seja fechada ao sair
        db_session.close()

# ============================================================================
# PONTO DE ENTRADA DO PROGRAMA
# ============================================================================
if __name__ == "__main__":
    iniciar_sistema()
