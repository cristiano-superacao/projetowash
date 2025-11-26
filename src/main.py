# main.py
# ============================================================================
# SISTEMA DE GESTÃO - ESTOQUE CERTO LTDA
# ============================================================================
# Este é o arquivo principal que controla o menu do sistema.
# Ele importa todos os módulos e gerencia a navegação entre as funcionalidades.
# ============================================================================

# Importando os módulos (os outros arquivos que criamos)
import operacional
import estoque_entrada
import estoque_saida
import financeiro
import rh

def iniciar_sistema():
    """
    Função principal que inicializa o sistema.
    
    Esta função cria a lista de estoque e mantém o loop principal do menu,
    permitindo que o usuário navegue entre os diferentes módulos do sistema.
    """
    
    # Esta lista vai guardar os produtos enquanto o programa estiver rodando.
    # Ela começa vazia e vai sendo preenchida conforme cadastramos produtos.
    estoque_geral = []

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
            # Passamos a lista 'estoque_geral' para poder salvar os produtos nela
            # A lista é passada por referência, então as alterações são mantidas
            estoque_entrada.cadastrar_produto(estoque_geral)
            
        elif opcao == "3":
            # Passamos a lista para poder dar baixa nos produtos vendidos
            estoque_saida.vender_produto(estoque_geral)
            
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

# ============================================================================
# PONTO DE ENTRADA DO PROGRAMA
# ============================================================================
# Este bloco garante que o programa só execute quando for chamado diretamente
# (não quando for importado como módulo em outro arquivo)
# ============================================================================
if __name__ == "__main__":
    iniciar_sistema()
