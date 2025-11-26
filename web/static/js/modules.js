// ============================================================================
// SISTEMA ESTOQUE CERTO LTDA - MÓDULOS
// Arquivo: modules.js
// Descrição: Funções específicas de cada módulo do sistema
// ============================================================================

// ============================================================================
// MÓDULO OPERACIONAL
// ============================================================================

function loadOperacionalModule(container) {
    const html = `
        <div class="card">
            <div class="card-header">
                <i class="fas fa-industry"></i> Cálculo de Capacidade de Produção
            </div>
            
            <form id="formOperacional" onsubmit="calcularOperacional(event)">
                <div class="form-group">
                    <label for="turnos">
                        <i class="fas fa-clock"></i> Número de Turnos Ativos
                    </label>
                    <select id="turnos" name="turnos" required>
                        <option value="">Selecione...</option>
                        <option value="1">1 Turno (Manhã ou Tarde ou Noite)</option>
                        <option value="2">2 Turnos (Manhã + Tarde ou Manhã + Noite, etc)</option>
                        <option value="3">3 Turnos (Manhã + Tarde + Noite - 24h)</option>
                    </select>
                </div>
                
                <button type="submit" class="btn btn-primary">
                    <i class="fas fa-calculator"></i> Calcular Capacidade
                </button>
            </form>
            
            <div id="resultadoOperacional" class="mt-3 hidden"></div>
        </div>
    `;
    
    container.innerHTML = html;
}

async function calcularOperacional(event) {
    event.preventDefault();
    
    const turnos = parseInt(document.getElementById('turnos').value);
    
    showLoading('Calculando capacidade...');
    
    try {
        // Cálculo local de capacidade
        const capacidade_por_turno = 1000; // unidades por turno
        const horas_por_turno = 8;
        const dias_mes = 22; // dias úteis
        
        const data = {
            turnos: turnos,
            capacidade_por_turno: capacidade_por_turno,
            capacidade_diaria: capacidade_por_turno * turnos,
            capacidade_mensal: capacidade_por_turno * turnos * dias_mes,
            horas_por_turno: horas_por_turno,
            horas_dia: horas_por_turno * turnos
        };
        
        exibirResultadoOperacional(data);
        showToast('Cálculo realizado com sucesso!', 'success');
        
    } catch (error) {
        console.error('Erro ao calcular:', error);
        showToast('Erro ao calcular capacidade', 'error');
    } finally {
        hideLoading();
    }
}

function exibirResultadoOperacional(data) {
    const resultado = document.getElementById('resultadoOperacional');
    
    const html = `
        <div class="card">
            <h4><i class="fas fa-chart-bar"></i> Resultados para ${data.turnos} Turno(s)</h4>
            
            <table class="table-container">
                <tr>
                    <td><strong>Capacidade por Turno:</strong></td>
                    <td>${formatNumber(data.capacidade_por_turno)} unidades</td>
                </tr>
                <tr>
                    <td><strong>Capacidade Diária:</strong></td>
                    <td>${formatNumber(data.capacidade_diaria)} unidades</td>
                </tr>
                <tr>
                    <td><strong>Capacidade Mensal:</strong></td>
                    <td>${formatNumber(data.capacidade_mensal)} unidades</td>
                </tr>
                <tr>
                    <td><strong>Capacidade Anual:</strong></td>
                    <td>${formatNumber(data.capacidade_anual)} unidades</td>
                </tr>
                <tr>
                    <td><strong>Percentual de Uso:</strong></td>
                    <td>${data.percentual_uso}%</td>
                </tr>
                <tr>
                    <td><strong>Diferença para Capacidade Máxima:</strong></td>
                    <td>${formatNumber(data.diferenca_diaria)} unidades/dia</td>
                </tr>
            </table>
            
            ${data.percentual_uso < 100 ? 
                `<div class="alert alert-warning mt-2">
                    <i class="fas fa-exclamation-triangle"></i>
                    A fábrica está operando abaixo da capacidade máxima.
                </div>` : 
                `<div class="alert alert-success mt-2">
                    <i class="fas fa-check-circle"></i>
                    A fábrica está operando em capacidade TOTAL!
                </div>`
            }
        </div>
    `;
    
    resultado.innerHTML = html;
    resultado.classList.remove('hidden');
}

// ============================================================================
// MÓDULO ESTOQUE ENTRADA
// ============================================================================

function loadEstoqueEntradaModule(container) {
    const html = `
        <div class="card">
            <div class="card-header">
                <i class="fas fa-box-open"></i> Cadastrar Produto no Estoque
            </div>
            
            <form id="formEstoqueEntrada" onsubmit="cadastrarProduto(event)">
                <div class="form-group">
                    <label for="codigo"><i class="fas fa-barcode"></i> Código do Produto</label>
                    <input type="number" id="codigo" name="codigo" required min="1">
                </div>
                
                <div class="form-group">
                    <label for="nome"><i class="fas fa-tag"></i> Nome do Produto</label>
                    <input type="text" id="nome" name="nome" required>
                </div>
                
                <div class="form-group">
                    <label for="quantidade"><i class="fas fa-cubes"></i> Quantidade</label>
                    <input type="number" id="quantidade" name="quantidade" required min="1">
                </div>
                
                <div class="form-group">
                    <label for="data"><i class="fas fa-calendar"></i> Data de Fabricação</label>
                    <input type="date" id="data" name="data" required>
                </div>
                
                <div class="form-group">
                    <label for="fornecedor"><i class="fas fa-truck"></i> Fornecedor</label>
                    <input type="text" id="fornecedor" name="fornecedor" required>
                </div>
                
                <div class="form-group">
                    <label for="local"><i class="fas fa-map-marker-alt"></i> Local no Armazém</label>
                    <input type="text" id="local" name="local" required placeholder="Ex: Corredor A, Prateleira 3">
                </div>
                
                <div class="form-group">
                    <label for="valor"><i class="fas fa-dollar-sign"></i> Valor Unitário (R$)</label>
                    <input type="number" id="valor" name="valor" required min="0" step="0.01">
                </div>
                
                <button type="submit" class="btn btn-success">
                    <i class="fas fa-save"></i> Cadastrar Produto
                </button>
            </form>
        </div>
    `;
    
    container.innerHTML = html;
}

async function cadastrarProduto(event) {
    event.preventDefault();
    
    const formData = {
        codigo: parseInt(document.getElementById('codigo').value),
        nome: document.getElementById('nome').value,
        quantidade: parseInt(document.getElementById('quantidade').value),
        data: document.getElementById('data').value,
        fornecedor: document.getElementById('fornecedor').value,
        local: document.getElementById('local').value,
        valor: parseFloat(document.getElementById('valor').value)
    };
    
    showLoading('Cadastrando produto...');
    
    try {
        // Usar Firestore (modo local ou Firebase)
        const cadastrarFunc = typeof cadastrarProdutoFirestoreLocal !== 'undefined' 
            ? cadastrarProdutoFirestoreLocal 
            : cadastrarProdutoFirestore;
            
        await cadastrarFunc(
            formData.codigo,
            formData.nome,
            formData.quantidade,
            formData.data,
            formData.fornecedor,
            formData.local,
            formData.valor
        );
        
        showToast('Produto cadastrado com sucesso!', 'success');
        document.getElementById('formEstoqueEntrada').reset();
        
    } catch (error) {
        console.error('Erro ao cadastrar:', error);
        showToast(error.message || 'Erro ao cadastrar produto', 'error');
    } finally {
        hideLoading();
    }
}

// ============================================================================
// MÓDULO ESTOQUE SAÍDA
// ============================================================================

function loadEstoqueSaidaModule(container) {
    const html = `
        <div class="card">
            <div class="card-header">
                <i class="fas fa-truck-loading"></i> Registrar Venda/Saída
            </div>
            
            <form id="formEstoqueSaida" onsubmit="venderProduto(event)">
                <div class="form-group">
                    <label for="nomeProduto"><i class="fas fa-search"></i> Nome do Produto</label>
                    <input type="text" id="nomeProduto" name="nomeProduto" required>
                </div>
                
                <div class="form-group">
                    <label for="quantidadeVenda"><i class="fas fa-cubes"></i> Quantidade</label>
                    <input type="number" id="quantidadeVenda" name="quantidadeVenda" required min="1">
                </div>
                
                <button type="submit" class="btn btn-warning">
                    <i class="fas fa-shopping-cart"></i> Registrar Venda
                </button>
            </form>
            
            <div id="resultadoVenda" class="mt-3 hidden"></div>
        </div>
    `;
    
    container.innerHTML = html;
}

async function venderProduto(event) {
    event.preventDefault();
    
    const nomeProduto = document.getElementById('nomeProduto').value;
    const quantidadeVenda = parseInt(document.getElementById('quantidadeVenda').value);
    
    showLoading('Registrando venda...');
    
    try {
        // Buscar o produto pelo nome
        const listarFunc = typeof listarProdutosLocal !== 'undefined' 
            ? listarProdutosLocal 
            : listarProdutos;
            
        const produtos = await listarFunc();
        const produto = produtos.find(p => p.nome.toLowerCase() === nomeProduto.toLowerCase());
        
        if (!produto) {
            throw new Error('Produto não encontrado');
        }
        
        // Valor de venda padrão (pode ser um campo no formulário)
        const valorVenda = produto.valor * 1.3; // 30% de margem
        
        // Registrar saída
        const registrarFunc = typeof registrarSaidaProdutoLocal !== 'undefined' 
            ? registrarSaidaProdutoLocal 
            : registrarSaidaProduto;
            
        await registrarFunc(produto.id, quantidadeVenda, valorVenda);
        
        // Exibir resultado
        const result = {
            data: {
                produto: produto.nome,
                quantidade: quantidadeVenda,
                valorUnitario: valorVenda,
                valorTotal: quantidadeVenda * valorVenda,
                estoqueAnterior: produto.quantidade + quantidadeVenda,
                estoqueAtual: produto.quantidade
            }
        };
        
        exibirResultadoVenda(result);
        showToast('Venda registrada com sucesso!', 'success');
        document.getElementById('formEstoqueSaida').reset();
        
    } catch (error) {
        console.error('Erro ao registrar venda:', error);
        showToast(error.message || 'Erro ao registrar venda', 'error');
    } finally {
        hideLoading();
    }
}

function exibirResultadoVenda(result) {
    const resultado = document.getElementById('resultadoVenda');
    const data = result.data;
    
    const html = `
        <div class="card">
            <h4><i class="fas fa-check-circle"></i> Venda Registrada</h4>
            
            <table>
                <tr>
                    <td><strong>Tipo:</strong></td>
                    <td>${data.tipo === 'completo' ? 'Pedido Completo' : 'Pedido Parcial'}</td>
                </tr>
                <tr>
                    <td><strong>Quantidade Vendida:</strong></td>
                    <td>${formatNumber(data.quantidade_vendida)} unidades</td>
                </tr>
                <tr>
                    <td><strong>Valor da Venda:</strong></td>
                    <td>${formatCurrency(data.valor_venda)}</td>
                </tr>
                <tr>
                    <td><strong>Estoque Restante:</strong></td>
                    <td>${formatNumber(data.estoque_restante)} unidades</td>
                </tr>
            </table>
        </div>
    `;
    
    resultado.innerHTML = html;
    resultado.classList.remove('hidden');
}

// ============================================================================
// MÓDULO FINANCEIRO
// ============================================================================

function loadFinanceiroModule(container) {
    const html = `
        <div class="card">
            <div class="card-header">
                <i class="fas fa-chart-line"></i> Cálculo de Custos e Lucros
            </div>
            
            <form id="formFinanceiro" onsubmit="calcularFinanceiro(event)">
                <div class="form-group">
                    <label for="agua"><i class="fas fa-tint"></i> Conta de Água (R$)</label>
                    <input type="number" id="agua" name="agua" required min="0" step="0.01">
                </div>
                
                <div class="form-group">
                    <label for="luz"><i class="fas fa-bolt"></i> Conta de Luz (R$)</label>
                    <input type="number" id="luz" name="luz" required min="0" step="0.01">
                </div>
                
                <div class="form-group">
                    <label for="impostos"><i class="fas fa-file-invoice-dollar"></i> Impostos (R$)</label>
                    <input type="number" id="impostos" name="impostos" required min="0" step="0.01">
                </div>
                
                <div class="form-group">
                    <label for="salarios"><i class="fas fa-users"></i> Folha de Pagamento (R$)</label>
                    <input type="number" id="salarios" name="salarios" required min="0" step="0.01">
                </div>
                
                <div class="form-group">
                    <label for="totalPallets"><i class="fas fa-cubes"></i> Total de Pallets/Mês</label>
                    <input type="number" id="totalPallets" name="totalPallets" value="1000" required min="1">
                </div>
                
                <button type="submit" class="btn btn-info">
                    <i class="fas fa-calculator"></i> Calcular
                </button>
            </form>
            
            <div id="resultadoFinanceiro" class="mt-3 hidden"></div>
        </div>
    `;
    
    container.innerHTML = html;
}

async function calcularFinanceiro(event) {
    event.preventDefault();
    
    const formData = {
        agua: parseFloat(document.getElementById('agua').value),
        luz: parseFloat(document.getElementById('luz').value),
        impostos: parseFloat(document.getElementById('impostos').value),
        salarios: parseFloat(document.getElementById('salarios').value),
        total_pallets: parseInt(document.getElementById('totalPallets').value)
    };
    
    showLoading('Calculando...');
    
    try {
        // Cálculos locais
        const custoMensal = formData.agua + formData.luz + formData.impostos + formData.salarios;
        const custoPorPallet = custoMensal / formData.total_pallets;
        const margemLucro = 0.30; // 30%
        const precoVendaSugerido = custoPorPallet * (1 + margemLucro);
        const receitaMensal = precoVendaSugerido * formData.total_pallets;
        const lucroMensal = receitaMensal - custoMensal;
        
        const data = {
            custo_mensal: custoMensal,
            custo_por_pallet: custoPorPallet,
            preco_venda_sugerido: precoVendaSugerido,
            margem_lucro: margemLucro * 100,
            receita_mensal: receitaMensal,
            lucro_mensal: lucroMensal
        };
        
        // Salvar no Firestore
        const salvarFunc = typeof salvarCalculoFinanceiroLocal !== 'undefined' 
            ? salvarCalculoFinanceiroLocal 
            : salvarCalculoFinanceiro;
            
        await salvarFunc(data);
        
        exibirResultadoFinanceiro(data);
        showToast('Cálculo realizado com sucesso!', 'success');
        
    } catch (error) {
        console.error('Erro ao calcular:', error);
        showToast('Erro ao calcular financeiro', 'error');
    } finally {
        hideLoading();
    }
}

function exibirResultadoFinanceiro(data) {
    const resultado = document.getElementById('resultadoFinanceiro');
    
    const html = `
        <div class="card">
            <h4><i class="fas fa-chart-pie"></i> Relatório Financeiro</h4>
            
            <h5 class="mt-3">💰 Custos Mensais</h5>
            <table>
                <tr><td>Água:</td><td>${formatCurrency(data.custos.agua)}</td></tr>
                <tr><td>Luz:</td><td>${formatCurrency(data.custos.luz)}</td></tr>
                <tr><td>Impostos:</td><td>${formatCurrency(data.custos.impostos)}</td></tr>
                <tr><td>Salários:</td><td>${formatCurrency(data.custos.salarios)}</td></tr>
                <tr><td><strong>TOTAL:</strong></td><td><strong>${formatCurrency(data.custos.total)}</strong></td></tr>
            </table>
            
            <h5 class="mt-3">💵 Precificação</h5>
            <table>
                <tr><td>Custo por Pallet:</td><td>${formatCurrency(data.precificacao.custo_por_pallet)}</td></tr>
                <tr><td>Preço de Venda:</td><td>${formatCurrency(data.precificacao.preco_venda)}</td></tr>
                <tr><td>Lucro por Unidade:</td><td>${formatCurrency(data.precificacao.lucro_por_unidade)}</td></tr>
                <tr><td>Margem de Lucro:</td><td>${data.precificacao.margem_lucro}%</td></tr>
            </table>
            
            <h5 class="mt-3">📊 Projeções</h5>
            <table>
                <tr><td><strong>Receita Mensal:</strong></td><td>${formatCurrency(data.mensal.receita)}</td></tr>
                <tr><td><strong>Lucro Mensal:</strong></td><td>${formatCurrency(data.mensal.lucro)}</td></tr>
                <tr><td><strong>Receita Anual:</strong></td><td>${formatCurrency(data.anual.receita)}</td></tr>
                <tr><td><strong>Lucro Anual:</strong></td><td>${formatCurrency(data.anual.lucro)}</td></tr>
            </table>
            
            <h5 class="mt-3">📈 Indicadores</h5>
            <table>
                <tr><td>Ponto de Equilíbrio:</td><td>${formatNumber(data.indicadores.ponto_equilibrio)} pallets/mês</td></tr>
                <tr><td>ROI (Retorno):</td><td>${data.indicadores.roi.toFixed(2)}%</td></tr>
            </table>
        </div>
    `;
    
    resultado.innerHTML = html;
    resultado.classList.remove('hidden');
}

// ============================================================================
// MÓDULO RH
// ============================================================================

function loadRHModule(container) {
    const html = `
        <div class="card">
            <div class="card-header">
                <i class="fas fa-users"></i> Folha de Pagamento
            </div>
            
            <div id="funcionariosList"></div>
            
            <button class="btn btn-primary mb-3" onclick="adicionarFuncionario()">
                <i class="fas fa-plus"></i> Adicionar Funcionário
            </button>
            
            <button class="btn btn-success" onclick="calcularFolhaPagamento()">
                <i class="fas fa-calculator"></i> Calcular Folha de Pagamento
            </button>
            
            <div id="resultadoRH" class="mt-3 hidden"></div>
        </div>
    `;
    
    container.innerHTML = html;
    adicionarFuncionario(); // Adiciona um funcionário inicial
}

let funcionariosCounter = 0;

function adicionarFuncionario() {
    funcionariosCounter++;
    const list = document.getElementById('funcionariosList');
    
    const funcionarioHTML = `
        <div class="card mb-3" id="func${funcionariosCounter}">
            <h5>Funcionário ${funcionariosCounter}</h5>
            
            <div class="form-group">
                <label>Nome Completo</label>
                <input type="text" class="func-nome" required>
            </div>
            
            <div class="form-group">
                <label>Cargo</label>
                <select class="func-cargo" required>
                    <option value="Operário">Operário (R$ 15/h - Recebe HE)</option>
                    <option value="Supervisor">Supervisor (R$ 40/h - Recebe HE)</option>
                    <option value="Gerente">Gerente (R$ 60/h - Sem HE)</option>
                    <option value="Diretor">Diretor (R$ 80/h - Sem HE)</option>
                </select>
            </div>
            
            <div class="form-group">
                <label>Horas Extras</label>
                <input type="number" class="func-he" min="0" value="0" step="0.5">
            </div>
            
            <button class="btn btn-danger btn-sm" onclick="removerFuncionario(${funcionariosCounter})">
                <i class="fas fa-trash"></i> Remover
            </button>
        </div>
    `;
    
    list.insertAdjacentHTML('beforeend', funcionarioHTML);
}

function removerFuncionario(id) {
    const elemento = document.getElementById(`func${id}`);
    if (elemento) {
        elemento.remove();
    }
}

async function calcularFolhaPagamento() {
    const funcionarios = [];
    const cards = document.querySelectorAll('#funcionariosList .card');
    
    cards.forEach(card => {
        const nome = card.querySelector('.func-nome').value;
        const cargo = card.querySelector('.func-cargo').value;
        const horas_extras = parseFloat(card.querySelector('.func-he').value);
        
        if (nome) {
            funcionarios.push({ nome, cargo, horas_extras });
        }
    });
    
    if (funcionarios.length === 0) {
        showToast('Adicione pelo menos um funcionário', 'warning');
        return;
    }
    
    showLoading('Calculando folha de pagamento...');
    
    try {
        // Tabela de salários
        const salarios = {
            'Operador': { valor_hora: 25, tem_he: true },
            'Supervisor': { valor_hora: 40, tem_he: true },
            'Coordenador': { valor_hora: 60, tem_he: false },
            'Diretor': { valor_hora: 80, tem_he: false }
        };
        
        const calculos = [];
        let totalFolha = 0;
        
        funcionarios.forEach(func => {
            const info = salarios[func.cargo];
            const horasNormais = 160; // Horas mensais padrão
            const salarioBase = info.valor_hora * horasNormais;
            
            let horasExtras = 0;
            let valorHorasExtras = 0;
            
            if (info.tem_he && func.horas_extras > 0) {
                horasExtras = func.horas_extras;
                valorHorasExtras = info.valor_hora * 1.5 * horasExtras; // 50% adicional
            }
            
            const salarioTotal = salarioBase + valorHorasExtras;
            totalFolha += salarioTotal;
            
            calculos.push({
                nome: func.nome,
                cargo: func.cargo,
                valor_hora: info.valor_hora,
                horas_normais: horasNormais,
                salario_base: salarioBase,
                horas_extras: horasExtras,
                valor_horas_extras: valorHorasExtras,
                salario_total: salarioTotal
            });
        });
        
        const data = {
            funcionarios: calculos,
            total_folha: totalFolha
        };
        
        // Salvar no Firestore
        const salvarFunc = typeof salvarFolhaPagamentoLocal !== 'undefined' 
            ? salvarFolhaPagamentoLocal 
            : salvarFolhaPagamento;
            
        await salvarFunc(data);
        
        exibirResultadoFolhaPagamento(data);
        showToast('Folha de pagamento calculada!', 'success');
        
    } catch (error) {
        console.error('Erro ao calcular folha:', error);
        showToast('Erro ao calcular folha de pagamento', 'error');
    } finally {
        hideLoading();
    }
}

function exibirResultadoRH(data) {
    const resultado = document.getElementById('resultadoRH');
    
    let funcionariosHTML = '';
    data.funcionarios.forEach((func, index) => {
        funcionariosHTML += `
            <div class="card mb-2">
                <h5>${index + 1}. ${func.nome}</h5>
                <table>
                    <tr><td>Cargo:</td><td>${func.cargo}</td></tr>
                    <tr><td>Valor/Hora:</td><td>${formatCurrency(func.valor_hora)}</td></tr>
                    ${func.horas_extras > 0 ? `<tr><td>Horas Extras:</td><td>${func.horas_extras}h (${formatCurrency(func.valor_extras)})</td></tr>` : ''}
                    <tr><td>Salário Bruto:</td><td>${formatCurrency(func.salario_bruto)}</td></tr>
                    <tr><td>Desconto INSS:</td><td>${formatCurrency(func.desconto_inss)}</td></tr>
                    <tr><td>Desconto IR:</td><td>${formatCurrency(func.desconto_ir)}</td></tr>
                    <tr><td><strong>Salário Líquido:</strong></td><td><strong>${formatCurrency(func.salario_liquido)}</strong></td></tr>
                </table>
            </div>
        `;
    });
    
    const html = `
        <div class="card">
            <h4><i class="fas fa-file-invoice-dollar"></i> Folha de Pagamento</h4>
            
            ${funcionariosHTML}
            
            <h5 class="mt-3">📊 Totais Gerais</h5>
            <table>
                <tr><td>Total de Funcionários:</td><td>${data.totais.total_funcionarios}</td></tr>
                <tr><td>Total Bruto:</td><td>${formatCurrency(data.totais.total_bruto)}</td></tr>
                <tr><td>Total INSS:</td><td>${formatCurrency(data.totais.total_inss)}</td></tr>
                <tr><td>Total IR:</td><td>${formatCurrency(data.totais.total_ir)}</td></tr>
                <tr><td><strong>Total Líquido:</strong></td><td><strong>${formatCurrency(data.totais.total_liquido)}</strong></td></tr>
                <tr><td>Encargos Patronais:</td><td>${formatCurrency(data.totais.encargos_patronais)}</td></tr>
                <tr><td><strong>Custo Total Empresa:</strong></td><td><strong>${formatCurrency(data.totais.custo_total_empresa)}</strong></td></tr>
            </table>
        </div>
    `;
    
    resultado.innerHTML = html;
    resultado.classList.remove('hidden');
}

// ============================================================================
// MÓDULO VISUALIZAR ESTOQUE
// ============================================================================

async function loadVisualizarModule(container) {
    showLoading('Carregando estoque...');
    
    try {
        // Usar Firestore (modo local ou Firebase)
        const listarFunc = typeof listarProdutosLocal !== 'undefined' 
            ? listarProdutosLocal 
            : listarProdutos;
            
        const produtos = await listarFunc();
        
        if (produtos && produtos.length > 0) {
            exibirEstoqueCompleto(container, { produtos });
        } else {
            container.innerHTML = `
                <div class="card text-center">
                    <i class="fas fa-box-open" style="font-size: 4rem; color: #cbd5e1; margin-bottom: 1rem;"></i>
                    <h3>Estoque Vazio</h3>
                    <p>Nenhum produto cadastrado ainda. Use o módulo de Entrada de Estoque para cadastrar produtos.</p>
                </div>
            `;
        }
    } catch (error) {
        console.error('Erro ao carregar estoque:', error);
        showToast('Erro ao carregar estoque', 'error');
    } finally {
        hideLoading();
    }
}

function exibirEstoqueCompleto(container, data) {
    let produtosHTML = '';
    
    data.produtos.forEach((produto, index) => {
        const valorTotal = produto.quantidade * produto.valor;
        produtosHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${produto.codigo}</td>
                <td>${produto.nome}</td>
                <td>${formatNumber(produto.quantidade)}</td>
                <td>${formatCurrency(produto.valor)}</td>
                <td>${formatCurrency(valorTotal)}</td>
                <td>${produto.local}</td>
                <td>${produto.fornecedor}</td>
            </tr>
        `;
    });
    
    const html = `
        <div class="card">
            <h4><i class="fas fa-warehouse"></i> Estoque Completo</h4>
            
            <div class="mb-3">
                <strong>Total de Produtos:</strong> ${data.total_produtos} | 
                <strong>Total de Itens:</strong> ${formatNumber(data.total_itens)} | 
                <strong>Valor Total:</strong> ${formatCurrency(data.valor_total)}
            </div>
            
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Código</th>
                            <th>Nome</th>
                            <th>Qtd</th>
                            <th>Valor Unit.</th>
                            <th>Valor Total</th>
                            <th>Local</th>
                            <th>Fornecedor</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${produtosHTML}
                    </tbody>
                </table>
            </div>
        </div>
    `;
    
    container.innerHTML = html;
}

// ============================================================================
// MÓDULO HISTÓRICO
// ============================================================================

async function loadHistoricoModule(container) {
    showLoading('Carregando histórico...');
    
    try {
        // Usar Firestore (modo local ou Firebase)
        const buscarFunc = typeof buscarEstatisticasLocal !== 'undefined' 
            ? buscarEstatisticasLocal 
            : buscarEstatisticas;
            
        const stats = await buscarFunc();
        const movimentacoes = stats.movimentacoes || [];
        
        if (movimentacoes.length > 0) {
            let historicoHTML = '';
            
            movimentacoes.forEach((mov, index) => {
                const tipo = mov.tipo || 'entrada';
                const icon = tipo === 'entrada' ? 'box-open' : 'truck-loading';
                const color = tipo === 'entrada' ? 'green' : 'orange';
                const quantidade = mov.quantidade || mov.quantidadeVendida || 0;
                const valor = mov.valorTotal || mov.valorVenda || 0;
                
                historicoHTML += `
                    <tr>
                        <td>${index + 1}</td>
                        <td><i class="fas fa-${icon}" style="color: ${color};"></i> ${tipo.toUpperCase()}</td>
                        <td>${mov.produtoNome || mov.nome || 'N/A'}</td>
                        <td>${formatNumber(quantidade)}</td>
                        <td>${formatCurrency(valor)}</td>
                        <td>${formatTimestamp(mov.timestamp)}</td>
                        <td>${mov.usuarioNome || 'Sistema'}</td>
                    </tr>
                `;
            });
            
            const html = `
                <div class="card">
                    <h4><i class="fas fa-history"></i> Histórico de Movimentações</h4>
                    
                    <div class="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Tipo</th>
                                    <th>Produto</th>
                                    <th>Quantidade</th>
                                    <th>Valor</th>
                                    <th>Data</th>
                                    <th>Usuário</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${historicoHTML}
                            </tbody>
                        </table>
                    </div>
                </div>
            `;
            
            container.innerHTML = html;
        } else {
            container.innerHTML = `
                <div class="card text-center">
                    <i class="fas fa-history" style="font-size: 4rem; color: #cbd5e1; margin-bottom: 1rem;"></i>
                    <h3>Sem Histórico</h3>
                    <p>Nenhuma movimentação registrada ainda.</p>
                </div>
            `;
        }
    } catch (error) {
        console.error('Erro ao carregar histórico:', error);
        showToast('Erro ao carregar histórico', 'error');
    } finally {
        hideLoading();
    }
}

// ============================================================================
// MÓDULO BACKUP
// ============================================================================

async function realizarBackup() {
    // Verificar se é admin
    const verificarFunc = typeof verificarAdminLocal !== 'undefined' 
        ? verificarAdminLocal 
        : verificarAdmin;
        
    if (!verificarFunc()) return;
    
    showLoading('Gerando backup...');
    
    try {
        // Usar Firestore (modo local ou Firebase)
        const backupFunc = typeof realizarBackupLocal !== 'undefined' 
            ? realizarBackupLocal 
            : realizarBackup;
            
        await backupFunc();
        
        showToast('Backup realizado com sucesso!', 'success');
        
    } catch (error) {
        console.error('Erro ao realizar backup:', error);
        showToast('Erro ao realizar backup', 'error');
    } finally {
        hideLoading();
    }
}

