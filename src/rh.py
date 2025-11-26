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

def calcular_folha_pagamento():
    """
    Calcula a folha de pagamento completa com descontos de INSS e IR.
    
    Funcionalidades:
    ----------------
    1. Cadastra funcionários com cargo e horas trabalhadas
    2. Calcula salário base conforme cargo
    3. Calcula horas extras (quando aplicável)
    4. Aplica desconto de INSS (progressivo)
    5. Aplica desconto de IR (progressivo)
    6. Gera relatório ordenado por nome
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
        # PASSO 2.3: CALCULAR SALÁRIO BRUTO (BASE: 160 HORAS MENSAIS)
        # ====================================================================
        # Salário base = 160 horas × Valor por hora
        salario_bruto = 160 * valor_hora
        valor_extras = 0.0
        horas_extras = 0.0
        
        # Verificar se o cargo tem direito a hora extra
        if paga_hora_extra:
            try:
                horas_extras = float(input(f"⏰ Quantas horas extras {nome} fez este mês? "))
                
                if horas_extras < 0:
                    print("⚠️  Horas extras não podem ser negativas! Usando 0.")
                    horas_extras = 0
                
                # Hora extra vale o DOBRO (100% a mais)
                valor_extras = horas_extras * (valor_hora * 2)
                salario_bruto += valor_extras
                
            except ValueError:
                print("⚠️  Valor inválido! Assumindo 0 horas extras.")
                horas_extras = 0
        else:
            print(f"ℹ️  {cargo} não recebe horas extras conforme política da empresa.")
        
        print(f"\n💰 Salário bruto (antes dos descontos): R$ {salario_bruto:.2f}")
        
        # ====================================================================
        # PASSO 2.4: CALCULAR DESCONTO DO INSS (PROGRESSIVO)
        # ====================================================================
        # Tabela INSS 2025 (simplificada):
        # Até R$ 1.412,00        → 7,5%
        # De R$ 1.412,01 a R$ 2.666,68  → 9%
        # De R$ 2.666,69 a R$ 4.000,03  → 12%
        # Acima de R$ 4.000,04   → 14% (limitado ao teto)
        
        desconto_inss = 0
        
        if salario_bruto <= 1412.00:
            desconto_inss = salario_bruto * 0.075
            aliquota_inss = "7,5%"
            
        elif salario_bruto <= 2666.68:
            desconto_inss = salario_bruto * 0.09
            aliquota_inss = "9%"
            
        elif salario_bruto <= 4000.03:
            desconto_inss = salario_bruto * 0.12
            aliquota_inss = "12%"
            
        else:
            desconto_inss = salario_bruto * 0.14
            aliquota_inss = "14%"
            
            # Limitando ao teto do INSS (valor máximo de desconto)
            teto_inss = 908.85
            if desconto_inss > teto_inss:
                desconto_inss = teto_inss
                aliquota_inss = "14% (teto)"
        
        print(f"📊 INSS ({aliquota_inss}): R$ {desconto_inss:.2f}")
        
        # ====================================================================
        # PASSO 2.5: CALCULAR DESCONTO DO IMPOSTO DE RENDA (IRPF)
        # ====================================================================
        # Base de cálculo = Salário Bruto - INSS
        base_ir = salario_bruto - desconto_inss
        
        # Tabela IR 2025 (simplificada):
        # Até R$ 2.259,20        → Isento (0%)
        # De R$ 2.259,21 a R$ 2.826,65  → 7,5% (- R$ 169,44)
        # De R$ 2.826,66 a R$ 3.751,05  → 15% (- R$ 381,44)
        # De R$ 3.751,06 a R$ 4.664,68  → 22,5% (- R$ 662,77)
        # Acima de R$ 4.664,68   → 27,5% (- R$ 896,00)
        
        desconto_ir = 0
        aliquota_ir = "Isento"
        
        if base_ir <= 2259.20:
            desconto_ir = 0
            aliquota_ir = "Isento"
            
        elif base_ir <= 2826.65:
            desconto_ir = (base_ir * 0.075) - 169.44
            aliquota_ir = "7,5%"
            
        elif base_ir <= 3751.05:
            desconto_ir = (base_ir * 0.15) - 381.44
            aliquota_ir = "15%"
            
        elif base_ir <= 4664.68:
            desconto_ir = (base_ir * 0.225) - 662.77
            aliquota_ir = "22,5%"
            
        else:
            desconto_ir = (base_ir * 0.275) - 896.00
            aliquota_ir = "27,5%"
        
        # Garantir que o IR não seja negativo
        if desconto_ir < 0:
            desconto_ir = 0
        
        print(f"📊 IR ({aliquota_ir}): R$ {desconto_ir:.2f}")
        
        # ====================================================================
        # PASSO 2.6: CALCULAR SALÁRIO LÍQUIDO
        # ====================================================================
        # Salário Líquido = Salário Bruto - INSS - IR
        salario_liquido = salario_bruto - desconto_inss - desconto_ir
        
        print(f"\n✅ Salário líquido (a receber): R$ {salario_liquido:.2f}")
        
        # ====================================================================
        # PASSO 2.7: SALVAR OS DADOS NO DICIONÁRIO
        # ====================================================================
        funcionario = {
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
        
        # Adiciona o funcionário à lista
        lista_funcionarios.append(funcionario)
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
