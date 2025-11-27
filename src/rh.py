# rh.py
# ============================================================================
# MÓDULO 4: RECURSOS HUMANOS - FOLHA DE PAGAMENTO
# ============================================================================
# Este módulo calcula a folha de pagamento com salários, horas extras,
# INSS e Imposto de Renda de acordo com as tabelas de 2025.
# 
# CONCEITOS DEMONSTRADOS:
# - Estruturas condicionais complexas (if/elif/else)
# - Cálculo de impostos progressivos
# - Ordenação de listas (sort com lambda)
# - Manipulação de dicionários
# - Validação de dados
# - Formatação de relatórios
# ============================================================================

# ============================================================================
# FUNÇÕES DE CÁLCULO (LÓGICA PURA)
# ============================================================================

def calcular_inss(salario_bruto):
    """Calcula o desconto do INSS baseado na tabela progressiva de 2025"""
    if salario_bruto <= 1412.00:
        return salario_bruto * 0.075
    elif salario_bruto <= 2666.68:
        return salario_bruto * 0.09
    elif salario_bruto <= 4000.03:
        return salario_bruto * 0.12
    else:
        desconto = salario_bruto * 0.14
        return min(desconto, 908.85) # Teto do INSS

def calcular_ir(base_calculo):
    """Calcula o desconto do IR baseado na tabela progressiva de 2025"""
    if base_calculo <= 2259.20:
        return 0.0
    elif base_calculo <= 2826.65:
        return (base_calculo * 0.075) - 169.44
    elif base_calculo <= 3751.05:
        return (base_calculo * 0.15) - 381.44
    elif base_calculo <= 4664.68:
        return (base_calculo * 0.225) - 662.77
    else:
        return (base_calculo * 0.275) - 896.00

def processar_funcionario(nome, cargo, horas_extras):
    """Processa os cálculos completos para um funcionário"""
    tabela_cargos = {
        'Operário': {'valor_hora': 15.00, 'paga_he': True},
        'Supervisor': {'valor_hora': 40.00, 'paga_he': True},
        'Gerente': {'valor_hora': 60.00, 'paga_he': False},
        'Diretor': {'valor_hora': 80.00, 'paga_he': False}
    }
    
    dados_cargo = tabela_cargos.get(cargo, tabela_cargos['Operário'])
    valor_hora = dados_cargo['valor_hora']
    paga_he = dados_cargo['paga_he']
    
    salario_bruto = 160 * valor_hora
    valor_extras = 0.0
    
    if paga_he and horas_extras > 0:
        valor_extras = horas_extras * (valor_hora * 2)
        salario_bruto += valor_extras
        
    desconto_inss = calcular_inss(salario_bruto)
    base_ir = salario_bruto - desconto_inss
    desconto_ir = max(0, calcular_ir(base_ir))
    salario_liquido = salario_bruto - desconto_inss - desconto_ir
    
    return {
        "nome": nome,
        "cargo": cargo,
        "valor_hora": valor_hora,
        "horas_extras": horas_extras,
        "bruto": salario_bruto,
        "extras": valor_extras,
        "inss": desconto_inss,
        "ir": desconto_ir,
        "liquido": salario_liquido
    }

def calcular_folha_pagamento():
    """
    Calcula a folha de pagamento completa com descontos de INSS e IR.
    Modo interativo para console.
    """

    
    print("\n" + "="*50)
    print("   MÓDULO 4: RECURSOS HUMANOS - FOLHA DE PAGAMENTO")
    print("="*50)
    
    # Lista para armazenar os dados de todos os funcionários
    lista_funcionarios = []
    
    # ========================================================================
    # PASSO 1: DEFINIR QUANTOS FUNCIONÁRIOS SERÃO CALCULADOS
    # ========================================================================
    try:
        qtd = int(input("\n👥 Quantos funcionários vai calcular? "))
        
        if qtd <= 0:
            print("\n❌ Quantidade deve ser maior que zero!")
            return
            
    except ValueError:
        print("\n❌ Erro: Digite apenas números inteiros!")
        return
    
    # ========================================================================
    # PASSO 2: LOOP PARA CADASTRAR CADA FUNCIONÁRIO
    # ========================================================================
    for i in range(qtd):
        print("\n" + "-"*50)
        print(f"👤 FUNCIONÁRIO {i+1} DE {qtd}")
        print("-"*50)
        
        # ====================================================================
        # PASSO 2.1: COLETAR DADOS BÁSICOS
        # ====================================================================
        nome = input("📝 Nome completo: ").strip()
        
        if not nome:
            print("❌ Nome não pode estar vazio! Pulando este funcionário.")
            continue
        
        print("\n💼 Cargos disponíveis:")
        print("   1 - Operário")
        print("   2 - Supervisor")
        print("   3 - Gerente")
        print("   4 - Diretor")
        
        cargo_opcao = input("Escolha o cargo (1-4): ").strip()
        
        # ====================================================================
        # PASSO 2.2: DEFINIR SALÁRIO BASE E ELEGIBILIDADE PARA HORA EXTRA
        # ====================================================================
        valor_hora = 0
        paga_hora_extra = False
        cargo = ""
        
        # Estrutura condicional para definir valores conforme o cargo
        if cargo_opcao == "1":
            cargo = "Operário"
            valor_hora = 15.00
            paga_hora_extra = True  # Operário recebe hora extra
            
        elif cargo_opcao == "2":
            cargo = "Supervisor"
            valor_hora = 40.00
            paga_hora_extra = True  # Supervisor recebe hora extra
            
        elif cargo_opcao == "3":
            cargo = "Gerente"
            valor_hora = 60.00
            paga_hora_extra = False  # Gerente NÃO recebe hora extra
            
        elif cargo_opcao == "4":
            cargo = "Diretor"
            valor_hora = 80.00
            paga_hora_extra = False  # Diretor NÃO recebe hora extra
            
        else:
            print("❌ Cargo inválido! Usando Operário como padrão.")
            cargo = "Operário"
            valor_hora = 15.00
            paga_hora_extra = True
        
        # ====================================================================
        # PASSO 2.3: CALCULAR SALÁRIO BRUTO E DESCONTOS (USANDO FUNÇÕES PURAS)
        # ====================================================================
        
        # Processar dados usando a função refatorada
        resultado = processar_funcionario(nome, cargo, horas_extras)
        
        # Extrair valores para exibição
        salario_bruto = resultado['bruto']
        desconto_inss = resultado['inss']
        desconto_ir = resultado['ir']
        salario_liquido = resultado['liquido']
        valor_extras = resultado['extras']
        valor_hora = resultado['valor_hora']
        
        print(f"\n💰 Salário bruto (antes dos descontos): R$ {salario_bruto:.2f}")
        print(f"📊 INSS: R$ {desconto_inss:.2f}")
        print(f"📊 IR: R$ {desconto_ir:.2f}")
        print(f"\n✅ Salário líquido (a receber): R$ {salario_liquido:.2f}")
        
        # Adiciona o funcionário à lista
        lista_funcionarios.append(resultado)
        print("\n✅ Funcionário cadastrado com sucesso!")
    
    # ========================================================================
    # PASSO 3: ORDENAR A LISTA POR NOME (ORDEM ALFABÉTICA)
    # ========================================================================
    # A função lambda permite ordenar por uma chave específica do dicionário
    # key=lambda x: x['nome'] significa "ordenar pelo campo 'nome'"
    lista_funcionarios.sort(key=lambda x: x['nome'])
    
    # ========================================================================
    # PASSO 4: EXIBIR RELATÓRIO COMPLETO DA FOLHA DE PAGAMENTO
    # ========================================================================
    print("\n" + "="*50)
    print("   FOLHA DE PAGAMENTO (Ordenada Alfabeticamente)")
    print("="*50)
    
    # Variáveis para totalização
    total_bruto = 0
    total_inss = 0
    total_ir = 0
    total_liquido = 0
    
    # Exibir dados de cada funcionário
    for i, f in enumerate(lista_funcionarios, 1):
        print(f"\n{i}. {f['nome'].upper()}")
        print(f"   💼 Cargo: {f['cargo']}")
        print(f"   💵 Valor/hora: R$ {f['valor_hora']:.2f}")
        
        if f['horas_extras'] > 0:
            print(f"   ⏰ Horas extras: {f['horas_extras']:.1f}h (R$ {f['extras']:.2f})")
        
        print(f"   💰 Salário Bruto:   R$ {f['bruto']:>10.2f}")
        print(f"   📉 Desconto INSS:   R$ {f['inss']:>10.2f}")
        print(f"   📉 Desconto IR:     R$ {f['ir']:>10.2f}")
        print(f"   {'='*35}")
        print(f"   ✅ Salário Líquido: R$ {f['liquido']:>10.2f}")
        print("-"*50)
        
        # Acumular totais
        total_bruto += f['bruto']
        total_inss += f['inss']
        total_ir += f['ir']
        total_liquido += f['liquido']
    
    # ========================================================================
    # PASSO 5: EXIBIR TOTALIZADORES
    # ========================================================================
    print("\n" + "="*50)
    print("   RESUMO GERAL DA FOLHA")
    print("="*50)
    print(f"👥 Total de funcionários: {len(lista_funcionarios)}")
    print(f"\n💰 Total Bruto (antes descontos): R$ {total_bruto:,.2f}".replace(',', 'X').replace('.', ',').replace('X', '.'))
    print(f"📉 Total INSS:                    R$ {total_inss:,.2f}".replace(',', 'X').replace('.', ',').replace('X', '.'))
    print(f"📉 Total IR:                      R$ {total_ir:,.2f}".replace(',', 'X').replace('.', ',').replace('X', '.'))
    print(f"{'='*50}")
    print(f"✅ Total Líquido (a pagar):       R$ {total_liquido:,.2f}".replace(',', 'X').replace('.', ',').replace('X', '.'))
    print("="*50)
    
    # Cálculo de encargos patronais (estimativa)
    encargos = total_bruto * 0.2765  # Aproximadamente 27,65% (FGTS, PIS, etc)
    custo_total_empresa = total_liquido + total_inss + total_ir + encargos
    
    print(f"\n💼 CUSTO TOTAL PARA A EMPRESA:")
    print(f"   (Incluindo encargos patronais estimados em 27,65%)")
    print(f"   R$ {custo_total_empresa:,.2f}".replace(',', 'X').replace('.', ',').replace('X', '.'))
    print("="*50)


# ============================================================================
# FUNÇÃO AUXILIAR PARA TESTES (OPCIONAL)
# ============================================================================
if __name__ == "__main__":
    print("🧪 Testando o Módulo de RH...\n")
    calcular_folha_pagamento()
