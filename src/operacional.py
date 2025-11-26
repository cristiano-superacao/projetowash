# operacional.py
# ============================================================================
# MÓDULO 1: OPERACIONAL - CÁLCULO DE CAPACIDADE DE PRODUÇÃO
# ============================================================================
# Este módulo é responsável por calcular a capacidade de produção da fábrica
# com base no número de turnos ativos (Manhã, Tarde e/ou Noite).
# 
# CONCEITOS DEMONSTRADOS:
# - Entrada e validação de dados
# - Operações matemáticas básicas (multiplicação)
# - Estruturas condicionais (if/else)
# - Formatação de saída de dados
# ============================================================================

def calcular_capacidade():
    """
    Calcula a capacidade de produção da fábrica baseada nos turnos ativos.
    
    A função realiza os seguintes cálculos:
    1. Capacidade diária (turnos × capacidade por turno)
    2. Capacidade mensal (capacidade diária × 30 dias)
    3. Capacidade anual (capacidade mensal × 12 meses)
    4. Diferença para a capacidade máxima (3 turnos)
    """
    
    print("\n" + "="*50)
    print("   MÓDULO 1: OPERACIONAL - CAPACIDADE DE PRODUÇÃO")
    print("="*50)
    
    # ========================================================================
    # PASSO 1: DEFINIR A CAPACIDADE FIXA POR TURNO
    # ========================================================================
    # Este valor é fixo e representa quantas unidades cada turno pode produzir
    capacidade_por_turno = 1666  # unidades por turno
    
    print(f"\n📊 Capacidade por turno: {capacidade_por_turno} unidades")
    
    # ========================================================================
    # PASSO 2: PERGUNTAR QUANTOS TURNOS ESTARÃO ATIVOS
    # ========================================================================
    print("\n🕐 Turnos disponíveis: Manhã, Tarde, Noite")
    
    try:
        turnos = int(input("Quantos turnos estarão ativos (1, 2 ou 3)? "))
        
        # Validação: Verificar se o número está entre 1 e 3
        if turnos < 1 or turnos > 3:
            print("\n❌ Erro: Por favor, escolha entre 1, 2 ou 3 turnos.")
            return  # Sai da função se o valor for inválido
            
    except ValueError:
        # Tratamento de erro caso o usuário digite algo que não seja número
        print("\n❌ Erro: Digite apenas números inteiros!")
        return
        
    # ========================================================================
    # PASSO 3: REALIZAR OS CÁLCULOS DE CAPACIDADE
    # ========================================================================
    
    # Capacidade Diária = Turnos Ativos × Capacidade por Turno
    capacidade_diaria = capacidade_por_turno * turnos
    
    # Capacidade Mensal = Capacidade Diária × 30 dias
    capacidade_mensal = capacidade_diaria * 30
    
    # Capacidade Anual = Capacidade Mensal × 12 meses
    capacidade_anual = capacidade_mensal * 12
    
    # ========================================================================
    # PASSO 4: CALCULAR A DIFERENÇA PARA A CAPACIDADE MÁXIMA
    # ========================================================================
    # A capacidade máxima seria com 3 turnos funcionando
    capacidade_maxima_diaria = capacidade_por_turno * 3
    diferenca = capacidade_maxima_diaria - capacidade_diaria
    
    # Calcular a porcentagem de uso da capacidade
    percentual_uso = (capacidade_diaria / capacidade_maxima_diaria) * 100
    
    # ========================================================================
    # PASSO 5: EXIBIR RELATÓRIO COMPLETO
    # ========================================================================
    print("\n" + "="*50)
    print(f"   RESULTADOS PARA {turnos} TURNO(S)")
    print("="*50)
    
    print(f"\n📈 Capacidade Diária:  {capacidade_diaria:,} unidades".replace(',', '.'))
    print(f"📅 Capacidade Mensal:  {capacidade_mensal:,} unidades".replace(',', '.'))
    print(f"🗓️  Capacidade Anual:   {capacidade_anual:,} unidades".replace(',', '.'))
    
    print(f"\n💹 Percentual de Uso:  {percentual_uso:.1f}% da capacidade máxima")
    
    # Análise da capacidade
    if diferenca > 0:
        print(f"\n⚠️  A fábrica está operando ABAIXO da capacidade máxima.")
        print(f"   Diferença: {diferenca:,} unidades/dia não produzidas".replace(',', '.'))
        print(f"   Isso representa {capacidade_maxima_diaria - capacidade_diaria:,} unidades/dia de capacidade ociosa.".replace(',', '.'))
    else:
        print("\n✅ A fábrica está operando em capacidade TOTAL (100%)!")
        print("   Todos os turnos estão ativos e produzindo no máximo.")
    
    print("="*50)


# ============================================================================
# FUNÇÃO AUXILIAR PARA TESTES (OPCIONAL)
# ============================================================================
# Esta função pode ser usada para testar o módulo isoladamente
# ============================================================================
if __name__ == "__main__":
    print("🧪 Testando o Módulo Operacional...\n")
    calcular_capacidade()
