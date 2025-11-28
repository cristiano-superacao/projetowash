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
from functools import wraps

# Adicionar o diretório src ao path para importar os módulos
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'src'))

# Importar módulos refatorados e banco de dados
from database import init_db, Produto, Funcionario, SessionLocal
from operacional import calcular_metricas_capacidade
from financeiro import calcular_metricas_financeiras
from rh import processar_funcionario

# Criar a aplicação Flask
app = Flask(__name__,
            template_folder='web/templates',
            static_folder='web/static')

# Habilitar CORS para permitir requisições de diferentes origens
CORS(app)

# Inicializar banco de dados
init_db()

# Middleware de Segurança (API Key Simples)
def require_api_key(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        # Em produção, use variáveis de ambiente.
        # Para demo, aceita sem chave ou chave padrão.
        api_key = request.headers.get('X-API-KEY')
        env_key = os.getenv('API_KEY')

        # Se houver uma chave configurada no ambiente,
        # exige que ela seja enviada
        if env_key and api_key != env_key:
            return jsonify({'error': 'Acesso não autorizado'}), 401
        return f(*args, **kwargs)
    return decorated_function

# Middleware de Controle de Acesso Baseado em Função (RBAC)
def require_role(required_role):
    def decorator(f):
        @wraps(f)
        def decorated_function(*args, **kwargs):
            # Simulação: Em produção, isso viria de um token JWT
            # ou sessão segura. Aqui, confiamos no header X-User-Role
            # enviado pelo frontend (apenas para demonstração)
            user_role = request.headers.get('X-User-Role', 'user')
            
            # Hierarquia de roles simples
            roles_hierarchy = {
                'admin': 3,
                'manager': 2,
                'user': 1
            }
            
            user_level = roles_hierarchy.get(user_role, 0)
            required_level = roles_hierarchy.get(required_role, 1)
            
            if user_level < required_level:
                return jsonify({
                    'success': False,
                    'error': (
                        f'Acesso negado. Requer privilégios de '
                        f'{required_role} ou superior.'
                    )
                }), 403
                
            return f(*args, **kwargs)
        return decorated_function
    return decorator

# ============================================================================
# ROTAS WEB (PÁGINAS HTML)
# ============================================================================

@app.route('/')
def index():
    """Página principal do sistema"""
    # Injeta a API Key no template para uso no frontend
    api_key = os.getenv('API_KEY', '')
    return render_template('index.html', api_key=api_key)

@app.route('/manifest.json')
def manifest():
    """Manifest para PWA"""
    try:
        return send_file(
            'web/static/manifest.json',
            mimetype='application/json'
        )
    except Exception as e:
        return jsonify({'error': str(e)}), 404

@app.route('/service-worker.js')
def service_worker():
    """Service Worker para PWA"""
    try:
        response = send_file(
            'web/static/service-worker.js',
            mimetype='application/javascript'
        )
        response.headers['Service-Worker-Allowed'] = '/'
        return response
    except Exception as e:
        return jsonify({'error': str(e)}), 404

# ============================================================================
# API ENDPOINTS - MÓDULO OPERACIONAL
# ============================================================================

@app.route('/api/operacional/calcular', methods=['POST'])
@require_api_key
def calcular_capacidade_api():
    """
    Calcula a capacidade de produção baseada nos turnos.
    """
    try:
        data = request.get_json()
        turnos = int(data.get('turnos', 1))
        
        if turnos < 1 or turnos > 3:
            return jsonify({
                'success': False,
                'error': 'Turnos deve estar entre 1 e 3'
            }), 400
        
        # Usar função refatorada
        resultado = calcular_metricas_capacidade(turnos)
        
        return jsonify({
            'success': True,
            'data': resultado
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

# ============================================================================
# API ENDPOINTS - MÓDULO ESTOQUE (COM BANCO DE DADOS)
# ============================================================================

@app.route('/api/estoque/produtos', methods=['GET'])
def listar_produtos():
    """Retorna todos os produtos do estoque (Banco de Dados)"""
    db = SessionLocal()
    try:
        produtos = db.query(Produto).all()
        lista_produtos = [p.to_dict() for p in produtos]
        
        total_itens = sum(p.quantidade for p in produtos)
        valor_total = sum(p.quantidade * p.valor_unitario for p in produtos)
        
        return jsonify({
            'success': True,
            'data': {
                'produtos': lista_produtos,
                'total_produtos': len(lista_produtos),
                'total_itens': total_itens,
                'valor_total': round(valor_total, 2)
            }
        })
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500
    finally:
        db.close()

@app.route('/api/estoque/entrada', methods=['POST'])
@require_api_key
@require_role('manager')
def cadastrar_produto_api():
    """Cadastra ou atualiza produto no banco de dados"""
    db = SessionLocal()
    try:
        data = request.get_json()
        
        codigo = int(data.get('codigo'))
        nome = data.get('nome', '').strip()
        quantidade = int(data.get('quantidade'))
        valor = float(data.get('valor', 0))
        
        if not nome or quantidade <= 0:
            return jsonify({'success': False, 'error': 'Dados inválidos'}), 400
        
        # Verificar se existe
        produto = db.query(Produto).filter(Produto.codigo == codigo).first()
        
        if produto:
            produto.quantidade += quantidade
            msg = 'Produto atualizado com sucesso'
        else:
            produto = Produto(
                codigo=codigo,
                nome=nome,
                quantidade=quantidade,
                data_fabricacao=data.get('data', ''),
                fornecedor=data.get('fornecedor', ''),
                local_armazem=data.get('local', ''),
                valor_unitario=valor
            )
            db.add(produto)
            msg = 'Produto cadastrado com sucesso'
            
        db.commit()
        return jsonify({'success': True, 'message': msg, 'data': produto.to_dict()})
            
    except Exception as e:
        db.rollback()
        return jsonify({'success': False, 'error': str(e)}), 500
    finally:
        db.close()

@app.route('/api/estoque/saida', methods=['POST'])
@require_api_key
def vender_produto_api():
    """Registra venda e baixa no estoque (Banco de Dados)"""
    db = SessionLocal()
    try:
        data = request.get_json()
        nome = data.get('nome', '').strip()
        quantidade = int(data.get('quantidade'))
        
        if not nome or quantidade <= 0:
            return jsonify({'success': False, 'error': 'Dados inválidos'}), 400
            
        # Busca case-insensitive no banco (PostgreSQL ILIKE ou func.lower)
        # Para compatibilidade geral, vamos buscar todos e filtrar ou usar func.lower
        from sqlalchemy import func
        produto = db.query(Produto).filter(func.lower(Produto.nome) == nome.lower()).first()
        
        if not produto:
            return jsonify({'success': False, 'error': 'Produto não encontrado'}), 404
            
        if produto.quantidade >= quantidade:
            produto.quantidade -= quantidade
            valor_venda = quantidade * produto.valor_unitario
            tipo = 'completo'
            qtd_vendida = quantidade
        elif produto.quantidade > 0:
            valor_venda = produto.quantidade * produto.valor_unitario
            qtd_vendida = produto.quantidade
            produto.quantidade = 0
            tipo = 'parcial'
        else:
            return jsonify({'success': False, 'error': 'Produto esgotado'}), 400
            
        db.commit()
        
        return jsonify({
            'success': True,
            'message': f'Pedido atendido ({tipo})',
            'data': {
                'tipo': tipo,
                'quantidade_vendida': qtd_vendida,
                'valor_venda': round(valor_venda, 2),
                'estoque_restante': produto.quantidade
            }
        })
            
    except Exception as e:
        db.rollback()
        return jsonify({'success': False, 'error': str(e)}), 500
    finally:
        db.close()

# ============================================================================
# API ENDPOINTS - MÓDULO FINANCEIRO
# ============================================================================

@app.route('/api/financeiro/calcular', methods=['POST'])
@require_api_key
def calcular_financeiro_api():
    """Calcula custos e lucros usando lógica refatorada"""
    try:
        data = request.get_json()
        
        agua = float(data.get('agua', 0))
        luz = float(data.get('luz', 0))
        impostos = float(data.get('impostos', 0))
        salarios = float(data.get('salarios', 0))
        total_pallets = int(data.get('total_pallets', 1000))
        
        if agua < 0 or luz < 0 or impostos < 0 or salarios < 0:
            return jsonify({'success': False, 'error': 'Valores negativos não permitidos'}), 400
        
        # Usar função refatorada
        resultado = calcular_metricas_financeiras(agua, luz, impostos, salarios, total_pallets)
        
        # Adaptar resposta para o formato esperado pelo frontend
        return jsonify({
            'success': True,
            'data': {
                'custos': {
                    'agua': agua, 'luz': luz, 'impostos': impostos, 'salarios': salarios,
                    'total': resultado['custo_total']
                },
                'precificacao': {
                    'custo_por_pallet': resultado['custo_por_pallet'],
                    'preco_venda': resultado['preco_venda'],
                    'lucro_por_unidade': resultado['lucro_por_unidade'],
                    'margem_lucro': 50
                },
                'mensal': {
                    'receita': resultado['receita_mensal'],
                    'lucro': resultado['lucro_mensal'],
                    'margem_real': resultado['margem_lucro_real']
                },
                'anual': {
                    'receita': resultado['receita_anual'],
                    'lucro': resultado['lucro_anual']
                },
                'indicadores': {
                    'ponto_equilibrio': resultado['ponto_equilibrio'],
                    'roi': resultado['roi']
                }
            }
        })
        
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/api/rh/calcular', methods=['POST'])
@require_api_key
def calcular_rh_api():
    """Calcula folha de pagamento usando lógica refatorada"""
    try:
        data = request.get_json()
        funcionarios = data.get('funcionarios', [])
        
        if not funcionarios:
            return jsonify({'success': False, 'error': 'Nenhum funcionário informado'}), 400
        
        resultado = []
        total_bruto = 0
        total_inss = 0
        total_ir = 0
        total_liquido = 0
        
        for func in funcionarios:
            nome = func.get('nome', '').strip()
            cargo = func.get('cargo', 'Operário')
            horas_extras = float(func.get('horas_extras', 0))
            
            if not nome: continue
            
            # Usar função refatorada
            res_func = processar_funcionario(nome, cargo, horas_extras)
            
            # Adaptar chaves para o frontend (se necessário)
            res_func['salario_bruto'] = res_func.pop('bruto')
            res_func['desconto_inss'] = res_func.pop('inss')
            res_func['desconto_ir'] = res_func.pop('ir')
            res_func['salario_liquido'] = res_func.pop('liquido')
            res_func['valor_extras'] = res_func.pop('extras')
            
            resultado.append(res_func)
            
            total_bruto += res_func['salario_bruto']
            total_inss += res_func['desconto_inss']
            total_ir += res_func['desconto_ir']
            total_liquido += res_func['salario_liquido']
        
        resultado.sort(key=lambda x: x['nome'])
        encargos = total_bruto * 0.2765
        custo_total = total_liquido + total_inss + total_ir + encargos
        
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
                    'custo_total_empresa': round(custo_total, 2)
                }
            }
        })
        
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

# ============================================================================
# API ENDPOINTS - MÓDULO RH (CRUD)
# ============================================================================

@app.route('/api/rh/funcionarios', methods=['GET'])
def listar_funcionarios():
    """Retorna todos os funcionários cadastrados"""
    db = SessionLocal()
    try:
        funcionarios = db.query(Funcionario).all()
        lista_funcionarios = [f.to_dict() for f in funcionarios]
        return jsonify({'success': True, 'data': lista_funcionarios})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500
    finally:
        db.close()

@app.route('/api/rh/funcionarios', methods=['POST'])
@require_api_key
@require_role('manager')
def cadastrar_funcionario():
    """Cadastra um novo funcionário"""
    db = SessionLocal()
    try:
        data = request.get_json()
        nome = data.get('nome', '').strip()
        cargo = data.get('cargo', '').strip()
        admissao = data.get('admissao', '')

        if not nome or not cargo:
            return jsonify({'success': False, 'error': 'Nome e Cargo são obrigatórios'}), 400

        novo_func = Funcionario(nome=nome, cargo=cargo, admissao=admissao)
        db.add(novo_func)
        db.commit()
        
        return jsonify({'success': True, 'message': 'Funcionário cadastrado com sucesso', 'data': novo_func.to_dict()})
    except Exception as e:
        db.rollback()
        return jsonify({'success': False, 'error': str(e)}), 500
    finally:
        db.close()

@app.route('/api/rh/funcionarios/<int:id>', methods=['DELETE'])
@require_api_key
@require_role('admin')
def excluir_funcionario(id):
    """Exclui um funcionário (Requer admin)"""
    db = SessionLocal()
    try:
        func = db.query(Funcionario).filter(Funcionario.id == id).first()
        if not func:
            return jsonify({'success': False, 'error': 'Funcionário não encontrado'}), 404
            
        db.delete(func)
        db.commit()
        return jsonify({'success': True, 'message': 'Funcionário excluído com sucesso'})
    except Exception as e:
        db.rollback()
        return jsonify({'success': False, 'error': str(e)}), 500
    finally:
        db.close()

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
