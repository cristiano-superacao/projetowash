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

# ============================================================================
# FUNÇÕES DE CÁLCULO (LÓGICA PURA)
# ============================================================================

def calcular_metricas_capacidade(turnos):
    """Calcula as métricas de capacidade baseada nos turnos"""
    capacidade_por_turno = 1666
    capacidade_diaria = capacidade_por_turno * turnos
    capacidade_mensal = capacidade_diaria * 30
    capacidade_anual = capacidade_mensal * 12
    
    capacidade_maxima_diaria = capacidade_por_turno * 3
    diferenca = capacidade_maxima_diaria - capacidade_diaria
    percentual_uso = (capacidade_diaria / capacidade_maxima_diaria) * 100
    
    return {
        "turnos": turnos,
        "capacidade_por_turno": capacidade_por_turno,
        "capacidade_diaria": capacidade_diaria,
        "capacidade_mensal": capacidade_mensal,
        "capacidade_anual": capacidade_anual,
        "capacidade_maxima_diaria": capacidade_maxima_diaria,
        "diferenca": diferenca,
        "percentual_uso": percentual_uso
    }

def calcular_capacidade():
    """
    Calcula a capacidade de produção da fábrica baseada nos turnos ativos.
    Modo interativo para console.
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
    # PASSO 3: REALIZAR OS CÁLCULOS DE CAPACIDADE (USANDO FUNÇÃO PURA)
    # ========================================================================
    
    dados = calcular_metricas_capacidade(turnos)
    
    capacidade_diaria = dados['capacidade_diaria']
    capacidade_mensal = dados['capacidade_mensal']
    capacidade_anual = dados['capacidade_anual']
    percentual_uso = dados['percentual_uso']
    diferenca = dados['diferenca']
    capacidade_maxima_diaria = dados['capacidade_maxima_diaria']
    
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
