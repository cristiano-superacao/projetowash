// ============================================================================
// SISTEMA ESTOQUE CERTO LTDA - MÓDULOS (VERSÃO CORRIGIDA)
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
        const capacidade_por_turno = 1666; // unidades por turno (padrão da empresa)
        const dias_mes = 22; // dias úteis
        const horas_por_turno = 8;
        
        const capacidade_diaria = capacidade_por_turno * turnos;
        const capacidade_mensal = capacidade_diaria * dias_mes;
        const capacidade_anual = capacidade_mensal * 12;
        const capacidade_maxima = capacidade_por_turno * 3;
        const diferenca = capacidade_maxima - capacidade_diaria;
        const percentual_uso = (capacidade_diaria / capacidade_maxima) * 100;
        
        const data = {
            turnos: turnos,
            capacidade_por_turno: capacidade_por_turno,
            capacidade_diaria: capacidade_diaria,
            capacidade_mensal: capacidade_mensal,
            capacidade_anual: capacidade_anual,
            capacidade_maxima: capacidade_maxima,
            diferenca_diaria: diferenca,
            percentual_uso: parseFloat(percentual_uso.toFixed(2)),
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
            
            <div class="table-container">
                <table>
                    <tr>
                        <td><strong>Capacidade por Turno:</strong></td>
                        <td>${formatNumber(data.capacidade_por_turno)} unidades</td>
                    </tr>
                    <tr>
                        <td><strong>Horas por Turno:</strong></td>
                        <td>${data.horas_por_turno}h/dia</td>
                    </tr>
                    <tr>
                        <td><strong>Capacidade Diária:</strong></td>
                        <td>${formatNumber(data.capacidade_diaria)} unidades (${data.horas_dia}h/dia)</td>
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
                        <td><strong>Capacidade Máxima (3 turnos):</strong></td>
                        <td>${formatNumber(data.capacidade_maxima)} unidades</td>
                    </tr>
                    <tr>
                        <td><strong>Percentual de Uso:</strong></td>
                        <td>${data.percentual_uso}%</td>
                    </tr>
                    <tr>
                        <td><strong>Capacidade Ociosa (Diária):</strong></td>
                        <td>${formatNumber(data.diferenca_diaria)} unidades</td>
                    </tr>
                </table>
            </div>
            
            ${data.percentual_uso < 100 ? 
                `<div class="alert alert-warning mt-2">
                    <i class="fas fa-exclamation-triangle"></i>
                    A fábrica está operando abaixo da capacidade máxima. Há oportunidade de aumento produtivo.
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
                <div class="form-row">
                    <div class="form-group">
                        <label for="codigo"><i class="fas fa-barcode"></i> Código</label>
                        <input type="number" id="codigo" name="codigo" required min="1" placeholder="Ex: 001">
                    </div>
                    
                    <div class="form-group">
                        <label for="nome"><i class="fas fa-tag"></i> Nome do Produto</label>
                        <input type="text" id="nome" name="nome" required placeholder="Ex: Produto XYZ">
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="quantidade"><i class="fas fa-cubes"></i> Quantidade</label>
                        <input type="number" id="quantidade" name="quantidade" required min="1" placeholder="Ex: 100">
                    </div>
                    
                    <div class="form-group">
                        <label for="data"><i class="fas fa-calendar"></i> Data de Fabricação</label>
                        <input type="date" id="data" name="data" required>
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="fornecedor"><i class="fas fa-truck"></i> Fornecedor</label>
                        <input type="text" id="fornecedor" name="fornecedor" required placeholder="Nome do fornecedor">
                    </div>
                    
                    <div class="form-group">
                        <label for="local"><i class="fas fa-map-marker-alt"></i> Local no Armazém</label>
                        <input type="text" id="local" name="local" required placeholder="Ex: Corredor A, Prateleira 3">
                    </div>
                </div>
                
                <div class="form-group">
                    <label for="valor"><i class="fas fa-dollar-sign"></i> Valor Unitário (R$)</label>
                    <input type="number" id="valor" name="valor" required min="0" step="0.01" placeholder="Ex: 25.50">
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
    
    // Validação dos campos
    const codigo = document.getElementById('codigo').value.trim();
    const nome = document.getElementById('nome').value.trim();
    const quantidade = document.getElementById('quantidade').value.trim();
    const data = document.getElementById('data').value.trim();
    const fornecedor = document.getElementById('fornecedor').value.trim();
    const local = document.getElementById('local').value.trim();
    const valor = document.getElementById('valor').value.trim();
    
    if (!codigo || !nome || !quantidade || !data || !fornecedor || !local || !valor) {
        showToast('Por favor, preencha todos os campos', 'error');
        return;
    }
    
    showLoading('Cadastrando produto...');
    
    try {
        const formData = {
            codigo: parseInt(codigo),
            nome: nome,
            quantidade: parseInt(quantidade),
            data: data,
            fornecedor: fornecedor,
            local: local,
            valor: parseFloat(valor)
        };
        
        // Usar Local ou Firebase
        if (typeof cadastrarProdutoFirestoreLocal !== 'undefined') {
            await cadastrarProdutoFirestoreLocal(
                formData.codigo,
                formData.nome,
                formData.quantidade,
                formData.data,
                formData.fornecedor,
                formData.local,
                formData.valor
            );
        } else {
            await apiRequest('/estoque/entrada', {
                method: 'POST',
                body: JSON.stringify(formData)
            });
        }
        
        showToast('✅ Produto cadastrado com sucesso!', 'success');
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
                    <input type="text" id="nomeProduto" name="nomeProduto" required placeholder="Digite o nome do produto">
                </div>
                
                <div class="form-group">
                    <label for="quantidadeVenda"><i class="fas fa-cubes"></i> Quantidade a Vender</label>
                    <input type="number" id="quantidadeVenda" name="quantidadeVenda" required min="1" placeholder="Ex: 50">
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
    
    const nomeProduto = document.getElementById('nomeProduto').value.trim();
    const quantidadeVenda = parseInt(document.getElementById('quantidadeVenda').value);
    
    if (!nomeProduto || quantidadeVenda <= 0) {
        showToast('Preencha todos os campos corretamente', 'error');
        return;
    }
    
    showLoading('Registrando venda...');
    
    try {
        // Buscar o produto
        let produtos = [];
        if (typeof listarProdutosLocal !== 'undefined') {
            produtos = await listarProdutosLocal();
        } else {
            const response = await apiRequest('/estoque/produtos', { method: 'GET' });
            produtos = response.data.produtos || [];
        }
        
        const produto = produtos.find(p => p.nome.toLowerCase() === nomeProduto.toLowerCase());
        
        if (!produto) {
            showToast(`❌ Produto "${nomeProduto}" não encontrado`, 'error');
            hideLoading();
            return;
        }
        
        if (produto.quantidade < quantidadeVenda) {
            showToast(`❌ Estoque insuficiente. Disponível: ${produto.quantidade}`, 'warning');
            hideLoading();
            return;
        }
        
        // Registrar saída
        const valorVenda = produto.valor * 1.3; // Margem de 30%
        
        if (typeof registrarSaidaProdutoLocal !== 'undefined') {
            await registrarSaidaProdutoLocal(produto.id, quantidadeVenda, valorVenda);
        } else {
            await apiRequest('/estoque/saida', {
                method: 'POST',
                body: JSON.stringify({
                    nome: nomeProduto,
                    quantidade: quantidadeVenda
                })
            });
        }
        
        // Exibir resultado
        exibirResultadoVenda({
            produto: produto.nome,
            quantidade: quantidadeVenda,
            valorUnitario: valorVenda,
            valorTotal: quantidadeVenda * valorVenda,
            estoqueAnterior: produto.quantidade,
            estoqueAtual: produto.quantidade - quantidadeVenda
        });
        
        showToast('✅ Venda registrada com sucesso!', 'success');
        document.getElementById('formEstoqueSaida').reset();
        
    } catch (error) {
        console.error('Erro ao vender:', error);
        showToast(error.message || 'Erro ao registrar venda', 'error');
    } finally {
        hideLoading();
    }
}

function exibirResultadoVenda(data) {
    const resultado = document.getElementById('resultadoVenda');
    
    const html = `
        <div class="card alert alert-success">
            <h4><i class="fas fa-check-circle"></i> Venda Registrada com Sucesso!</h4>
            
            <div class="table-container">
                <table>
                    <tr>
                        <td><strong>Produto:</strong></td>
                        <td>${data.produto}</td>
                    </tr>
                    <tr>
                        <td><strong>Quantidade Vendida:</strong></td>
                        <td>${formatNumber(data.quantidade)} unidades</td>
                    </tr>
                    <tr>
                        <td><strong>Valor Unitário:</strong></td>
                        <td>${formatCurrency(data.valorUnitario)}</td>
                    </tr>
                    <tr>
                        <td><strong>Valor Total:</strong></td>
                        <td><strong>${formatCurrency(data.valorTotal)}</strong></td>
                    </tr>
                    <tr>
                        <td><strong>Estoque Anterior:</strong></td>
                        <td>${formatNumber(data.estoqueAnterior)}</td>
                    </tr>
                    <tr>
                        <td><strong>Estoque Atual:</strong></td>
                        <td>${formatNumber(data.estoqueAtual)}</td>
                    </tr>
                </table>
            </div>
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
                <i class="fas fa-chart-line"></i> Cálculo Financeiro
            </div>
            
            <form id="formFinanceiro" onsubmit="calcularFinanceiro(event)">
                <div class="form-row">
                    <div class="form-group">
                        <label for="agua"><i class="fas fa-water"></i> Conta de Água (R$)</label>
                        <input type="number" id="agua" name="agua" required min="0" step="0.01" placeholder="Ex: 1000.00">
                    </div>
                    
                    <div class="form-group">
                        <label for="luz"><i class="fas fa-lightbulb"></i> Conta de Luz (R$)</label>
                        <input type="number" id="luz" name="luz" required min="0" step="0.01" placeholder="Ex: 2500.00">
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="impostos"><i class="fas fa-file-invoice-dollar"></i> Impostos (R$)</label>
                        <input type="number" id="impostos" name="impostos" required min="0" step="0.01" placeholder="Ex: 3000.00">
                    </div>
                    
                    <div class="form-group">
                        <label for="salarios"><i class="fas fa-money-bill-wave"></i> Salários (R$)</label>
                        <input type="number" id="salarios" name="salarios" required min="0" step="0.01" placeholder="Ex: 20000.00">
                    </div>
                </div>
                
                <div class="form-group">
                    <label for="totalPallets"><i class="fas fa-boxes"></i> Total de Pallets/Mês</label>
                    <input type="number" id="totalPallets" name="totalPallets" required min="1" placeholder="Ex: 1000">
                </div>
                
                <button type="submit" class="btn btn-primary">
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
    
    const agua = parseFloat(document.getElementById('agua').value);
    const luz = parseFloat(document.getElementById('luz').value);
    const impostos = parseFloat(document.getElementById('impostos').value);
    const salarios = parseFloat(document.getElementById('salarios').value);
    const totalPallets = parseInt(document.getElementById('totalPallets').value);
    
    if (agua < 0 || luz < 0 || impostos < 0 || salarios < 0 || totalPallets <= 0) {
        showToast('Valores inválidos. Verifique os dados inseridos', 'error');
        return;
    }
    
    showLoading('Calculando...');
    
    try {
        const custoTotal = agua + luz + impostos + salarios;
        const custoPorPallet = custoTotal / totalPallets;
        const margemLucro = 0.50; // 50%
        const precoVenda = custoPorPallet * (1 + margemLucro);
        const lucroUnitario = precoVenda - custoPorPallet;
        
        const receitaMensal = precoVenda * totalPallets;
        const lucroMensal = lucroUnitario * totalPallets;
        const receitalAnual = receitaMensal * 12;
        const lucroAnual = lucroMensal * 12;
        
        const margemReal = (lucroMensal / receitaMensal * 100);
        const pontoEquilibrio = custoTotal / lucroUnitario;
        const roi = (lucroMensal / custoTotal * 100);
        
        const data = {
            custos: {
                agua: agua,
                luz: luz,
                impostos: impostos,
                salarios: salarios,
                total: custoTotal
            },
            precificacao: {
                custo_por_pallet: custoPorPallet,
                preco_venda: precoVenda,
                lucro_por_unidade: lucroUnitario,
                margem_lucro: 50
            },
            mensal: {
                receita: receitaMensal,
                lucro: lucroMensal,
                margem_real: margemReal
            },
            anual: {
                receita: receitalAnual,
                lucro: lucroAnual
            },
            indicadores: {
                ponto_equilibrio: Math.ceil(pontoEquilibrio),
                roi: roi
            }
        };
        
        exibirResultadoFinanceiro(data);
        showToast('✅ Cálculo realizado com sucesso!', 'success');
        
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
            <div class="table-container">
                <table>
                    <tr>
                        <td>Água:</td>
                        <td>${formatCurrency(data.custos.agua)}</td>
                    </tr>
                    <tr>
                        <td>Luz:</td>
                        <td>${formatCurrency(data.custos.luz)}</td>
                    </tr>
                    <tr>
                        <td>Impostos:</td>
                        <td>${formatCurrency(data.custos.impostos)}</td>
                    </tr>
                    <tr>
                        <td>Salários:</td>
                        <td>${formatCurrency(data.custos.salarios)}</td>
                    </tr>
                    <tr style="font-weight: bold; background: #f0f0f0;">
                        <td>TOTAL:</td>
                        <td>${formatCurrency(data.custos.total)}</td>
                    </tr>
                </table>
            </div>
            
            <h5 class="mt-3">💵 Precificação</h5>
            <div class="table-container">
                <table>
                    <tr>
                        <td>Custo por Pallet:</td>
                        <td>${formatCurrency(data.precificacao.custo_por_pallet)}</td>
                    </tr>
                    <tr>
                        <td>Preço de Venda:</td>
                        <td>${formatCurrency(data.precificacao.preco_venda)}</td>
                    </tr>
                    <tr>
                        <td>Lucro por Unidade:</td>
                        <td>${formatCurrency(data.precificacao.lucro_por_unidade)}</td>
                    </tr>
                    <tr>
                        <td>Margem de Lucro:</td>
                        <td>${data.precificacao.margem_lucro}%</td>
                    </tr>
                </table>
            </div>
            
            <h5 class="mt-3">📊 Projeções</h5>
            <div class="table-container">
                <table>
                    <tr>
                        <td><strong>Receita Mensal:</strong></td>
                        <td><strong>${formatCurrency(data.mensal.receita)}</strong></td>
                    </tr>
                    <tr>
                        <td><strong>Lucro Mensal:</strong></td>
                        <td><strong>${formatCurrency(data.mensal.lucro)}</strong></td>
                    </tr>
                    <tr>
                        <td><strong>Receita Anual:</strong></td>
                        <td><strong>${formatCurrency(data.anual.receita)}</strong></td>
                    </tr>
                    <tr>
                        <td><strong>Lucro Anual:</strong></td>
                        <td><strong>${formatCurrency(data.anual.lucro)}</strong></td>
                    </tr>
                </table>
            </div>
            
            <h5 class="mt-3">📈 Indicadores</h5>
            <div class="table-container">
                <table>
                    <tr>
                        <td>Ponto de Equilíbrio:</td>
                        <td>${formatNumber(data.indicadores.ponto_equilibrio)} pallets/mês</td>
                    </tr>
                    <tr>
                        <td>ROI (Retorno):</td>
                        <td>${data.indicadores.roi.toFixed(2)}%</td>
                    </tr>
                </table>
            </div>
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
            
            <div class="button-group">
                <button class="btn btn-primary" onclick="adicionarFuncionario()">
                    <i class="fas fa-plus"></i> Adicionar Funcionário
                </button>
                
                <button class="btn btn-success" onclick="calcularFolhaPagamento()">
                    <i class="fas fa-calculator"></i> Calcular Folha
                </button>
            </div>
            
            <div id="resultadoRH" class="mt-3 hidden"></div>
        </div>
    `;
    
    container.innerHTML = html;
}

let funcionariosCounter = 0;

function adicionarFuncionario() {
    funcionariosCounter++;
    const list = document.getElementById('funcionariosList');
    
    const funcionarioHTML = `
        <div class="card mb-3" id="func${funcionariosCounter}" style="background: #f9fafb;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                <h5>Funcionário ${funcionariosCounter}</h5>
                <button class="btn btn-danger btn-sm" onclick="removerFuncionario(${funcionariosCounter})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
            
            <div class="form-row">
                <div class="form-group">
                    <label>Nome Completo</label>
                    <input type="text" class="func-nome" required placeholder="Ex: João da Silva">
                </div>
                
                <div class="form-group">
                    <label>Cargo</label>
                    <select class="func-cargo" required>
                        <option value="">Selecione...</option>
                        <option value="Operário">Operário (R$ 15/h - com HE)</option>
                        <option value="Supervisor">Supervisor (R$ 40/h - com HE)</option>
                        <option value="Gerente">Gerente (R$ 60/h - sem HE)</option>
                        <option value="Diretor">Diretor (R$ 80/h - sem HE)</option>
                    </select>
                </div>
            </div>
            
            <div class="form-group">
                <label>Horas Extras</label>
                <input type="number" class="func-he" min="0" value="0" step="0.5" placeholder="Ex: 5">
            </div>
        </div>
    `;
    
    if (!list.innerHTML.trim()) {
        list.innerHTML = funcionarioHTML;
    } else {
        list.insertAdjacentHTML('beforeend', funcionarioHTML);
    }
}

function removerFuncionario(id) {
    const elemento = document.getElementById(`func${id}`);
    if (elemento) {
        elemento.remove();
    }
}

async function calcularFolhaPagamento() {
    const funcionarios = [];
    const cards = document.querySelectorAll('#funcionariosList > .card');
    
    cards.forEach(card => {
        const nome = card.querySelector('.func-nome').value.trim();
        const cargo = card.querySelector('.func-cargo').value;
        const horasExtras = parseFloat(card.querySelector('.func-he').value) || 0;
        
        if (nome && cargo) {
            funcionarios.push({ nome, cargo, horas_extras: horasExtras });
        }
    });
    
    if (funcionarios.length === 0) {
        showToast('Adicione pelo menos um funcionário com nome e cargo', 'warning');
        return;
    }
    
    showLoading('Calculando folha de pagamento...');
    
    try {
        // Tabela de cargos
        const cargos = {
            'Operário': { valor_hora: 15, paga_he: true },
            'Supervisor': { valor_hora: 40, paga_he: true },
            'Gerente': { valor_hora: 60, paga_he: false },
            'Diretor': { valor_hora: 80, paga_he: false }
        };
        
        let resultado = [];
        let totalBruto = 0, totalINSS = 0, totalIR = 0, totalLiquido = 0;
        
        funcionarios.forEach(func => {
            const info = cargos[func.cargo] || cargos['Operário'];
            const valorHora = info.valor_hora;
            const horasNormais = 160; // 20 dias × 8 horas
            
            let salarioBruto = horasNormais * valorHora;
            let valorExtras = 0;
            
            if (info.paga_he && func.horas_extras > 0) {
                valorExtras = func.horas_extras * (valorHora * 1.5);
                salarioBruto += valorExtras;
            }
            
            // INSS (progressivo)
            let descINSS = 0;
            if (salarioBruto <= 1412) descINSS = salarioBruto * 0.075;
            else if (salarioBruto <= 2666.68) descINSS = salarioBruto * 0.09;
            else if (salarioBruto <= 4000.03) descINSS = salarioBruto * 0.12;
            else descINSS = Math.min(salarioBruto * 0.14, 908.85);
            
            // IR (progressivo)
            const baseIR = salarioBruto - descINSS;
            let descIR = 0;
            if (baseIR > 2259.20) {
                if (baseIR <= 2826.65) descIR = (baseIR * 0.075) - 169.44;
                else if (baseIR <= 3751.05) descIR = (baseIR * 0.15) - 381.44;
                else if (baseIR <= 4664.68) descIR = (baseIR * 0.225) - 662.77;
                else descIR = (baseIR * 0.275) - 896;
            }
            descIR = Math.max(descIR, 0);
            
            const salarioLiquido = salarioBruto - descINSS - descIR;
            
            resultado.push({
                nome: func.nome,
                cargo: func.cargo,
                valorHora: valorHora,
                horasExtras: func.horas_extras,
                valorExtras: valorExtras,
                salarioBruto: salarioBruto,
                descINSS: descINSS,
                descIR: descIR,
                salarioLiquido: salarioLiquido
            });
            
            totalBruto += salarioBruto;
            totalINSS += descINSS;
            totalIR += descIR;
            totalLiquido += salarioLiquido;
        });
        
        resultado.sort((a, b) => a.nome.localeCompare(b.nome));
        
        exibirResultadoRH({
            funcionarios: resultado,
            totais: {
                total_funcionarios: resultado.length,
                total_bruto: totalBruto,
                total_inss: totalINSS,
                total_ir: totalIR,
                total_liquido: totalLiquido,
                encargos: totalBruto * 0.2765,
                custo_total: totalLiquido + totalINSS + totalIR + (totalBruto * 0.2765)
            }
        });
        
        showToast('✅ Folha calculada com sucesso!', 'success');
        
    } catch (error) {
        console.error('Erro ao calcular:', error);
        showToast('Erro ao calcular folha de pagamento', 'error');
    } finally {
        hideLoading();
    }
}

function exibirResultadoRH(data) {
    const resultado = document.getElementById('resultadoRH');
    
    let tabelaHTML = '';
    data.funcionarios.forEach((func, idx) => {
        tabelaHTML += `
            <tr>
                <td>${idx + 1}</td>
                <td>${func.nome}</td>
                <td>${func.cargo}</td>
                <td>${formatCurrency(func.valorHora)}/h</td>
                <td>${func.horasExtras > 0 ? func.horasExtras : '-'}</td>
                <td>${formatCurrency(func.salarioBruto)}</td>
                <td>${formatCurrency(func.descINSS)}</td>
                <td>${formatCurrency(func.descIR)}</td>
                <td><strong>${formatCurrency(func.salarioLiquido)}</strong></td>
            </tr>
        `;
    });
    
    const html = `
        <div class="card">
            <h4><i class="fas fa-file-invoice"></i> Folha de Pagamento</h4>
            
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nome</th>
                            <th>Cargo</th>
                            <th>Valor/h</th>
                            <th>HE</th>
                            <th>Salário Bruto</th>
                            <th>INSS</th>
                            <th>IR</th>
                            <th>Líquido</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${tabelaHTML}
                    </tbody>
                </table>
            </div>
            
            <h5 class="mt-3">📊 Resumo da Folha</h5>
            <div class="table-container">
                <table>
                    <tr>
                        <td>Total de Funcionários:</td>
                        <td>${data.totais.total_funcionarios}</td>
                    </tr>
                    <tr style="font-weight: bold;">
                        <td>Total Bruto:</td>
                        <td>${formatCurrency(data.totais.total_bruto)}</td>
                    </tr>
                    <tr>
                        <td>Total INSS:</td>
                        <td>${formatCurrency(data.totais.total_inss)}</td>
                    </tr>
                    <tr>
                        <td>Total IR:</td>
                        <td>${formatCurrency(data.totais.total_ir)}</td>
                    </tr>
                    <tr style="font-weight: bold; background: #e8f5e9;">
                        <td>Total Líquido:</td>
                        <td>${formatCurrency(data.totais.total_liquido)}</td>
                    </tr>
                    <tr>
                        <td>Encargos Patronais (27,65%):</td>
                        <td>${formatCurrency(data.totais.encargos)}</td>
                    </tr>
                    <tr style="font-weight: bold; background: #fff3e0;">
                        <td>Custo Total para Empresa:</td>
                        <td>${formatCurrency(data.totais.custo_total)}</td>
                    </tr>
                </table>
            </div>
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
        let produtos = [];
        if (typeof listarProdutosLocal !== 'undefined') {
            produtos = await listarProdutosLocal();
        } else {
            const response = await apiRequest('/estoque/produtos', { method: 'GET' });
            produtos = response.data.produtos || [];
        }
        
        if (produtos && produtos.length > 0) {
            let tabelaHTML = '';
            let totalItens = 0;
            let totalValor = 0;
            
            produtos.forEach((produto, idx) => {
                const valorTotal = produto.quantidade * produto.valor;
                totalItens += produto.quantidade;
                totalValor += valorTotal;
                
                tabelaHTML += `
                    <tr>
                        <td>${idx + 1}</td>
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
                    
                    <div class="stats-row">
                        <div class="stat-item">
                            <strong>Total de Produtos:</strong>
                            <span>${produtos.length}</span>
                        </div>
                        <div class="stat-item">
                            <strong>Total de Itens:</strong>
                            <span>${formatNumber(totalItens)}</span>
                        </div>
                        <div class="stat-item">
                            <strong>Valor Total:</strong>
                            <span>${formatCurrency(totalValor)}</span>
                        </div>
                    </div>
                    
                    <div class="table-container mt-3">
                        <table>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Código</th>
                                    <th>Nome</th>
                                    <th>Quantidade</th>
                                    <th>Valor Unit.</th>
                                    <th>Valor Total</th>
                                    <th>Local</th>
                                    <th>Fornecedor</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${tabelaHTML}
                            </tbody>
                        </table>
                    </div>
                </div>
            `;
            
            container.innerHTML = html;
        } else {
            container.innerHTML = `
                <div class="card text-center">
                    <i class="fas fa-box-open" style="font-size: 4rem; color: #ccc; margin-bottom: 1rem;"></i>
                    <h3>Estoque Vazio</h3>
                    <p>Nenhum produto cadastrado ainda. Use o módulo de Entrada de Estoque para começar.</p>
                </div>
            `;
        }
    } catch (error) {
        console.error('Erro ao carregar estoque:', error);
        showToast('Erro ao carregar estoque', 'error');
        container.innerHTML = `<div class="card alert alert-error"><p>Erro ao carregar estoque</p></div>`;
    } finally {
        hideLoading();
    }
}
