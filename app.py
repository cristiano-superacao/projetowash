# app.py
# ============================================================================
# API WEB - FLASK REST API (VERSÃO CORRIGIDA)
# ============================================================================
# Este arquivo cria uma API REST usando Flask para conectar o sistema Python
# ao site/aplicativo web. Permite acesso via navegador e instalação como PWA.
# ============================================================================

from flask import Flask, render_template, request, jsonify, send_file
from flask_cors import CORS
import sys
import os
import json

# Adicionar o diretório src ao path para importar os módulos
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'src'))

# Criar a aplicação Flask
app = Flask(__name__, 
            template_folder='web/templates',
            static_folder='web/static')

# Habilitar CORS para permitir requisições de diferentes origens
CORS(app)

# Armazenamento em memória (simulação de banco de dados)
estoque_global = []
funcionarios_cache = []

# ============================================================================
# ROTAS WEB (PÁGINAS HTML)
# ============================================================================

@app.route('/')
def index():
    """Página principal do sistema"""
    return render_template('index.html')

@app.route('/manifest.json')
def manifest():
    """Manifest para PWA"""
    try:
        return send_file('web/static/manifest.json', mimetype='application/json')
    except Exception as e:
        return jsonify({'error': str(e)}), 404

@app.route('/service-worker.js')
def service_worker():
    """Service Worker para PWA"""
    try:
        response = send_file('web/static/service-worker.js', mimetype='application/javascript')
        response.headers['Service-Worker-Allowed'] = '/'
        return response
    except Exception as e:
        return jsonify({'error': str(e)}), 404

# ============================================================================
# API ENDPOINTS - MÓDULO OPERACIONAL
# ============================================================================

@app.route('/api/operacional/calcular', methods=['POST'])
def calcular_capacidade_api():
    """
    Calcula a capacidade de produção baseada nos turnos.
    
    Entrada JSON:
    {
        "turnos": 1-3
    }
    
    Retorno JSON:
    {
        "success": true,
        "data": {
            "capacidade_diaria": 1666,
            "capacidade_mensal": 49980,
            "capacidade_anual": 599760,
            "percentual_uso": 33.3,
            "diferenca_diaria": 3332
        }
    }
    """
    try:
        data = request.get_json()
        turnos = int(data.get('turnos', 1))
        
        if turnos < 1 or turnos > 3:
            return jsonify({
                'success': False,
                'error': 'Turnos deve estar entre 1 e 3'
            }), 400
        
        capacidade_por_turno = 1666
        capacidade_diaria = capacidade_por_turno * turnos
        capacidade_mensal = capacidade_diaria * 30
        capacidade_anual = capacidade_mensal * 12
        
        capacidade_maxima = capacidade_por_turno * 3
        diferenca = capacidade_maxima - capacidade_diaria
        percentual_uso = (capacidade_diaria / capacidade_maxima) * 100
        
        return jsonify({
            'success': True,
            'data': {
                'turnos': turnos,
                'capacidade_por_turno': capacidade_por_turno,
                'capacidade_diaria': capacidade_diaria,
                'capacidade_mensal': capacidade_mensal,
                'capacidade_anual': capacidade_anual,
                'capacidade_maxima': capacidade_maxima,
                'diferenca_diaria': diferenca,
                'percentual_uso': round(percentual_uso, 2)
            }
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

# ============================================================================
# API ENDPOINTS - MÓDULO ESTOQUE
# ============================================================================

@app.route('/api/estoque/produtos', methods=['GET'])
def listar_produtos():
    """Retorna todos os produtos do estoque"""
    try:
        total_itens = sum(p['quantidade'] for p in estoque_global)
        valor_total = sum(p['quantidade'] * p['valor'] for p in estoque_global)
        
        return jsonify({
            'success': True,
            'data': {
                'produtos': estoque_global,
                'total_produtos': len(estoque_global),
                'total_itens': total_itens,
                'valor_total': round(valor_total, 2)
            }
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/api/estoque/entrada', methods=['POST'])
def cadastrar_produto_api():
    """
    Cadastra um novo produto ou atualiza quantidade existente.
    
    Entrada JSON:
    {
        "codigo": 123,
        "nome": "Produto X",
        "quantidade": 100,
        "data": "26/11/2025",
        "fornecedor": "Fornecedor Y",
        "local": "A1",
        "valor": 25.50
    }
    """
    try:
        data = request.get_json()
        
        codigo = int(data.get('codigo'))
        nome = data.get('nome', '').strip()
        quantidade = int(data.get('quantidade'))
        data_fab = data.get('data', '')
        fornecedor = data.get('fornecedor', '')
        local = data.get('local', '')
        valor = float(data.get('valor', 0))
        
        # Validações
        if not nome:
            return jsonify({
                'success': False,
                'error': 'Nome do produto é obrigatório'
            }), 400
            
        if quantidade <= 0:
            return jsonify({
                'success': False,
                'error': 'Quantidade deve ser maior que zero'
            }), 400
        
        # Verificar se produto já existe
        produto_encontrado = None
        for produto in estoque_global:
            if produto['codigo'] == codigo:
                produto_encontrado = produto
                break
        
        if produto_encontrado:
            # Atualizar quantidade
            produto_encontrado['quantidade'] += quantidade
            return jsonify({
                'success': True,
                'message': 'Produto atualizado com sucesso',
                'data': produto_encontrado
            })
        else:
            # Criar novo produto
            novo_produto = {
                'codigo': codigo,
                'nome': nome,
                'quantidade': quantidade,
                'data': data_fab,
                'fornecedor': fornecedor,
                'local': local,
                'valor': valor
            }
            estoque_global.append(novo_produto)
            
            return jsonify({
                'success': True,
                'message': 'Produto cadastrado com sucesso',
                'data': novo_produto
            }), 201
            
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/api/estoque/saida', methods=['POST'])
def vender_produto_api():
    """
    Registra uma venda/saída de produto.
    
    Entrada JSON:
    {
        "nome": "Produto X",
        "quantidade": 10
    }
    """
    try:
        data = request.get_json()
        
        nome = data.get('nome', '').strip()
        quantidade = int(data.get('quantidade'))
        
        if not nome:
            return jsonify({
                'success': False,
                'error': 'Nome do produto é obrigatório'
            }), 400
            
        if quantidade <= 0:
            return jsonify({
                'success': False,
                'error': 'Quantidade deve ser maior que zero'
            }), 400
        
        # Buscar produto
        produto_encontrado = None
        for produto in estoque_global:
            if produto['nome'].lower() == nome.lower():
                produto_encontrado = produto
                break
        
        if not produto_encontrado:
            return jsonify({
                'success': False,
                'error': f'Produto "{nome}" não encontrado'
            }), 404
        
        saldo_atual = produto_encontrado['quantidade']
        
        if saldo_atual >= quantidade:
            # Pedido completo
            produto_encontrado['quantidade'] -= quantidade
            valor_venda = quantidade * produto_encontrado['valor']
            
            return jsonify({
                'success': True,
                'message': 'Pedido atendido completamente',
                'data': {
                    'tipo': 'completo',
                    'quantidade_vendida': quantidade,
                    'valor_venda': round(valor_venda, 2),
                    'estoque_restante': produto_encontrado['quantidade']
                }
            })
            
        elif saldo_atual > 0:
            # Pedido parcial
            valor_venda = saldo_atual * produto_encontrado['valor']
            produto_encontrado['quantidade'] = 0
            
            return jsonify({
                'success': True,
                'message': 'Pedido atendido parcialmente',
                'data': {
                    'tipo': 'parcial',
                    'quantidade_solicitada': quantidade,
                    'quantidade_vendida': saldo_atual,
                    'valor_venda': round(valor_venda, 2),
                    'estoque_restante': 0
                }
            })
        else:
            # Produto esgotado
            return jsonify({
                'success': False,
                'error': f'Produto "{nome}" está esgotado'
            }), 400
            
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

# ============================================================================
# API ENDPOINTS - MÓDULO FINANCEIRO
# ============================================================================

@app.route('/api/financeiro/calcular', methods=['POST'])
def calcular_financeiro_api():
    """
    Calcula custos e lucros.
    
    Entrada JSON:
    {
        "agua": 1000.00,
        "luz": 2500.00,
        "impostos": 3000.00,
        "salarios": 20000.00,
        "total_pallets": 1000
    }
    """
    try:
        data = request.get_json()
        
        agua = float(data.get('agua', 0))
        luz = float(data.get('luz', 0))
        impostos = float(data.get('impostos', 0))
        salarios = float(data.get('salarios', 0))
        total_pallets = int(data.get('total_pallets', 1000))
        
        # Validações
        if agua < 0 or luz < 0 or impostos < 0 or salarios < 0:
            return jsonify({
                'success': False,
                'error': 'Valores não podem ser negativos'
            }), 400
        
        # Cálculos
        custo_total = agua + luz + impostos + salarios
        custo_por_pallet = custo_total / total_pallets if total_pallets > 0 else 0
        
        margem_lucro = 0.50  # 50%
        preco_venda = custo_por_pallet * (1 + margem_lucro)
        lucro_por_unidade = preco_venda - custo_por_pallet
        
        receita_mensal = preco_venda * total_pallets
        lucro_mensal = lucro_por_unidade * total_pallets
        
        receita_anual = receita_mensal * 12
        lucro_anual = lucro_mensal * 12
        
        margem_lucro_real = (lucro_mensal / receita_mensal * 100) if receita_mensal > 0 else 0
        ponto_equilibrio = custo_total / lucro_por_unidade if lucro_por_unidade > 0 else 0
        roi = (lucro_mensal / custo_total * 100) if custo_total > 0 else 0
        
        return jsonify({
            'success': True,
            'data': {
                'custos': {
                    'agua': round(agua, 2),
                    'luz': round(luz, 2),
                    'impostos': round(impostos, 2),
                    'salarios': round(salarios, 2),
                    'total': round(custo_total, 2)
                },
                'precificacao': {
                    'custo_por_pallet': round(custo_por_pallet, 2),
                    'preco_venda': round(preco_venda, 2),
                    'lucro_por_unidade': round(lucro_por_unidade, 2),
                    'margem_lucro': 50
                },
                'mensal': {
                    'receita': round(receita_mensal, 2),
                    'lucro': round(lucro_mensal, 2),
                    'margem_real': round(margem_lucro_real, 2)
                },
                'anual': {
                    'receita': round(receita_anual, 2),
                    'lucro': round(lucro_anual, 2)
                },
                'indicadores': {
                    'ponto_equilibrio': round(ponto_equilibrio, 0),
                    'roi': round(roi, 2)
                }
            }
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

# ============================================================================
# API ENDPOINTS - MÓDULO RH
# ============================================================================

@app.route('/api/rh/calcular', methods=['POST'])
def calcular_rh_api():
    """
    Calcula folha de pagamento.
    
    Entrada JSON:
    {
        "funcionarios": [
            {
                "nome": "João Silva",
                "cargo": "Operário",
                "horas_extras": 10
            }
        ]
    }
    """
    try:
        data = request.get_json()
        funcionarios = data.get('funcionarios', [])
        
        if not funcionarios:
            return jsonify({
                'success': False,
                'error': 'Nenhum funcionário informado'
            }), 400
        
        resultado = []
        total_bruto = 0
        total_inss = 0
        total_ir = 0
        total_liquido = 0
        
        # Tabela de valores por cargo
        tabela_cargos = {
            'Operário': {'valor_hora': 15.00, 'paga_he': True},
            'Supervisor': {'valor_hora': 40.00, 'paga_he': True},
            'Gerente': {'valor_hora': 60.00, 'paga_he': False},
            'Diretor': {'valor_hora': 80.00, 'paga_he': False}
        }
        
        for func in funcionarios:
            nome = func.get('nome', '').strip()
            cargo = func.get('cargo', 'Operário')
            horas_extras = float(func.get('horas_extras', 0))
            
            if not nome:
                continue
            
            # Obter dados do cargo
            dados_cargo = tabela_cargos.get(cargo, tabela_cargos['Operário'])
            valor_hora = dados_cargo['valor_hora']
            paga_he = dados_cargo['paga_he']
            
            # Calcular salário bruto
            salario_bruto = 160 * valor_hora
            valor_extras = 0
            
            if paga_he and horas_extras > 0:
                valor_extras = horas_extras * (valor_hora * 2)
                salario_bruto += valor_extras
            
            # Calcular INSS
            if salario_bruto <= 1412.00:
                desconto_inss = salario_bruto * 0.075
            elif salario_bruto <= 2666.68:
                desconto_inss = salario_bruto * 0.09
            elif salario_bruto <= 4000.03:
                desconto_inss = salario_bruto * 0.12
            else:
                desconto_inss = min(salario_bruto * 0.14, 908.85)
            
            # Calcular IR
            base_ir = salario_bruto - desconto_inss
            
            if base_ir <= 2259.20:
                desconto_ir = 0
            elif base_ir <= 2826.65:
                desconto_ir = (base_ir * 0.075) - 169.44
            elif base_ir <= 3751.05:
                desconto_ir = (base_ir * 0.15) - 381.44
            elif base_ir <= 4664.68:
                desconto_ir = (base_ir * 0.225) - 662.77
            else:
                desconto_ir = (base_ir * 0.275) - 896.00
            
            desconto_ir = max(desconto_ir, 0)
            
            # Salário líquido
            salario_liquido = salario_bruto - desconto_inss - desconto_ir
            
            # Adicionar ao resultado
            resultado.append({
                'nome': nome,
                'cargo': cargo,
                'valor_hora': valor_hora,
                'horas_extras': horas_extras,
                'valor_extras': round(valor_extras, 2),
                'salario_bruto': round(salario_bruto, 2),
                'desconto_inss': round(desconto_inss, 2),
                'desconto_ir': round(desconto_ir, 2),
                'salario_liquido': round(salario_liquido, 2)
            })
            
            # Totalizar
            total_bruto += salario_bruto
            total_inss += desconto_inss
            total_ir += desconto_ir
            total_liquido += salario_liquido
        
        # Ordenar por nome
        resultado.sort(key=lambda x: x['nome'])
        
        # Calcular encargos patronais
        encargos = total_bruto * 0.2765
        custo_total_empresa = total_liquido + total_inss + total_ir + encargos
        
        return jsonify({
            'success': True,
            'data': {
                'funcionarios': resultado,
                'totais': {
                    'total_funcionarios': len(resultado),
                    'total_bruto': round(total_bruto, 2),
                    'total_inss': round(total_inss, 2),
                    'total_ir': round(total_ir, 2),
                    'total_liquido': round(total_liquido, 2),
                    'encargos_patronais': round(encargos, 2),
                    'custo_total_empresa': round(custo_total_empresa, 2)
                }
            }
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

# ============================================================================
# INICIALIZAÇÃO DO SERVIDOR
# ============================================================================

if __name__ == '__main__':
    print("\n" + "="*50)
    print("   SISTEMA ESTOQUE CERTO LTDA - SERVIDOR WEB")
    print("="*50)
    print("\n🌐 Servidor iniciando...")
    print("📱 Acesse: http://localhost:5000")
    print("💡 Pressione Ctrl+C para encerrar\n")
    print("="*50 + "\n")
    
    # Iniciar servidor Flask
    app.run(debug=True, host='0.0.0.0', port=5000)
