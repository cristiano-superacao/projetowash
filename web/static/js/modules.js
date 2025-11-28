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
                <i class="fas fa-box-open"></i> Cadastrar Componente/Veículo
            </div>
            
            <form id="formEstoqueEntrada" onsubmit="cadastrarProduto(event)">
                <div class="form-row">
                    <div class="form-group">
                        <label for="codigo"><i class="fas fa-barcode"></i> Código SKU</label>
                        <input type="number" id="codigo" name="codigo" required min="1" placeholder="Ex: 1001">
                    </div>
                    
                    <div class="form-group">
                        <label for="nome"><i class="fas fa-tag"></i> Nome do Componente</label>
                        <input type="text" id="nome" name="nome" required placeholder="Ex: Bateria LFP 60kWh">
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="lote"><i class="fas fa-layer-group"></i> Lote de Produção</label>
                        <input type="text" id="lote" name="lote" required placeholder="Ex: BAT-2023-X99">
                    </div>
                    
                    <div class="form-group">
                        <label for="serial"><i class="fas fa-fingerprint"></i> Número de Série</label>
                        <input type="text" id="serial" name="serial" required placeholder="Ex: SN-99887766">
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
                        <label for="fornecedor"><i class="fas fa-truck"></i> Fornecedor/Origem</label>
                        <input type="text" id="fornecedor" name="fornecedor" required placeholder="Ex: Gigafactory 1">
                    </div>
                    
                    <div class="form-group">
                        <label for="local"><i class="fas fa-map-marker-alt"></i> Local no Armazém</label>
                        <input type="text" id="local" name="local" required placeholder="Ex: Setor B, Rua 4">
                    </div>
                </div>
                
                <div class="form-group">
                    <label for="valor"><i class="fas fa-dollar-sign"></i> Custo Unitário (R$)</label>
                    <input type="number" id="valor" name="valor" required min="0" step="0.01" placeholder="Ex: 15000.00">
                </div>
                
                <button type="submit" class="btn btn-success btn-block">
                    <i class="fas fa-save"></i> Registrar Entrada
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
    const lote = document.getElementById('lote').value.trim();
    const serial = document.getElementById('serial').value.trim();
    const quantidade = document.getElementById('quantidade').value.trim();
    const data = document.getElementById('data').value.trim();
    const fornecedor = document.getElementById('fornecedor').value.trim();
    const local = document.getElementById('local').value.trim();
    const valor = document.getElementById('valor').value.trim();
    
    if (!codigo || !nome || !lote || !serial || !quantidade || !data || !fornecedor || !local || !valor) {
        showToast('Por favor, preencha todos os campos', 'error');
        return;
    }
    
    showLoading('Cadastrando componente...');
    
    try {
        const formData = {
            codigo: parseInt(codigo),
            nome: nome,
            lote: lote,
            serial: serial,
            quantidade: parseInt(quantidade),
            data: data,
            fornecedor: fornecedor,
            local: local,
            valor: parseFloat(valor)
        };
        
        await salvarProdutoEstoque(formData);
        
        showToast('✅ Componente registrado com sucesso!', 'success');
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
        const produtos = await obterDadosEstoque();
        
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
        await registrarSaidaEstoque(produto.nome, quantidadeVenda, produto.id, valorVenda);
        
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
                <div class="financeiro-form-grid">
                    <div class="form-group">
                        <label for="agua"><i class="fas fa-water"></i> Conta de Água (R$)</label>
                        <input type="number" id="agua" name="agua" required min="0" step="0.01" placeholder="Ex: 1000.00">
                    </div>
                    
                    <div class="form-group">
                        <label for="luz"><i class="fas fa-lightbulb"></i> Conta de Luz (R$)</label>
                        <input type="number" id="luz" name="luz" required min="0" step="0.01" placeholder="Ex: 2500.00">
                    </div>

                    <div class="form-group">
                        <label for="impostos"><i class="fas fa-file-invoice-dollar"></i> Impostos (R$)</label>
                        <input type="number" id="impostos" name="impostos" required min="0" step="0.01" placeholder="Ex: 3000.00">
                    </div>
                    
                    <div class="form-group">
                        <label for="salarios"><i class="fas fa-money-bill-wave"></i> Salários (R$)</label>
                        <input type="number" id="salarios" name="salarios" required min="0" step="0.01" placeholder="Ex: 20000.00">
                    </div>
                    
                    <div class="form-group full-width">
                        <label for="totalPallets"><i class="fas fa-boxes"></i> Total de Pallets/Mês</label>
                        <input type="number" id="totalPallets" name="totalPallets" required min="1" placeholder="Ex: 1000">
                    </div>
                </div>
                
                <button type="submit" class="btn btn-calcular">
                    <i class="fas fa-calculator"></i> Calcular Custos e Lucros
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
// MÓDULO RH (COM PERSISTÊNCIA E PESQUISA)
// ============================================================================

let funcionariosCache = []; // Cache local para pesquisa e cálculo
let lastCalculatedFolha = null; // Cache para exportação PDF

function loadRHModule(container) {
    const html = `
        <div class="card">
            <div class="card-header">
                <i class="fas fa-users"></i> Gestão de RH e Folha de Pagamento
            </div>
            
            <!-- Formulário de Cadastro -->
            <div class="card mb-3" style="background: #f8f9fa; border: 1px solid #e9ecef;">
                <h5 class="mb-3"><i class="fas fa-user-plus"></i> Novo Funcionário</h5>
                <form id="formCadastroFuncionario" onsubmit="cadastrarFuncionarioAPI(event)">
                    <div class="form-row">
                        <div class="form-group">
                            <label>Nome Completo</label>
                            <input type="text" id="novoNome" required placeholder="Ex: João da Silva">
                        </div>
                        <div class="form-group">
                            <label>Cargo</label>
                            <select id="novoCargo" required>
                                <option value="">Selecione...</option>
                                <option value="Operário">Operário (R$ 15/h)</option>
                                <option value="Supervisor">Supervisor (R$ 40/h)</option>
                                <option value="Gerente">Gerente (R$ 60/h)</option>
                                <option value="Diretor">Diretor (R$ 80/h)</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Admissão</label>
                            <input type="date" id="novoAdmissao">
                        </div>
                    </div>
                    <button type="submit" class="btn btn-success btn-sm">
                        <i class="fas fa-save"></i> Salvar Funcionário
                    </button>
                </form>
            </div>

            <!-- Barra de Pesquisa -->
            <div class="form-group">
                <label><i class="fas fa-search"></i> Pesquisar Funcionário</label>
                <input type="text" id="searchFuncionario" onkeyup="filtrarFuncionarios()" placeholder="Digite o nome para buscar...">
            </div>
            
            <!-- Lista de Funcionários -->
            <div id="listaFuncionariosContainer" class="mb-3">
                <p class="text-center text-muted">Carregando funcionários...</p>
            </div>
            
            <div class="button-group">
                <button class="btn btn-primary" onclick="calcularFolhaPagamentoAPI()">
                    <i class="fas fa-calculator"></i> Calcular Folha (Mês Atual)
                </button>
            </div>
            
            <div id="resultadoRH" class="mt-3 hidden"></div>
        </div>
    `;
    
    container.innerHTML = html;
    listarFuncionariosAPI();
}

async function cadastrarFuncionarioAPI(event) {
    event.preventDefault();
    
    const nome = document.getElementById('novoNome').value.trim();
    const cargo = document.getElementById('novoCargo').value;
    const admissao = document.getElementById('novoAdmissao').value;
    
    if (!nome || !cargo) {
        showToast('Nome e Cargo são obrigatórios', 'warning');
        return;
    }
    
    showLoading('Salvando funcionário...');
    
    try {
        await apiRequest('/rh/funcionarios', {
            method: 'POST',
            body: JSON.stringify({ nome, cargo, admissao })
        });
        
        showToast('Funcionário cadastrado com sucesso!', 'success');
        document.getElementById('formCadastroFuncionario').reset();
        listarFuncionariosAPI(); // Recarrega a lista
        
    } catch (error) {
        console.error('Erro ao cadastrar:', error);
        showToast('Erro ao cadastrar funcionário', 'error');
    } finally {
        hideLoading();
    }
}

async function listarFuncionariosAPI() {
    const container = document.getElementById('listaFuncionariosContainer');
    
    try {
        const response = await apiRequest('/rh/funcionarios', { method: 'GET' });
        funcionariosCache = response.data || [];
        
        renderizarListaFuncionarios(funcionariosCache);
        
    } catch (error) {
        console.error('Erro ao listar:', error);
        container.innerHTML = '<p class="text-danger">Erro ao carregar funcionários.</p>';
    }
}

function renderizarListaFuncionarios(lista) {
    const container = document.getElementById('listaFuncionariosContainer');
    
    if (lista.length === 0) {
        container.innerHTML = '<p class="text-muted text-center">Nenhum funcionário cadastrado.</p>';
        return;
    }
    
    let html = '';
    lista.forEach(func => {
        html += `
            <div class="card mb-2 func-card" data-id="${func.id}" style="background: #fff; border-left: 4px solid #007bff;">
                <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap;">
                    <div style="flex: 1; min-width: 200px;">
                        <strong>${func.nome}</strong><br>
                        <small class="text-muted">${func.cargo} | Adm: ${func.admissao || 'N/A'}</small>
                    </div>
                    
                    <div style="display: flex; align-items: center; gap: 10px; margin-top: 10px;">
                        <div class="form-group mb-0" style="width: 120px;">
                            <label style="font-size: 0.8rem; margin-bottom: 0;">Horas Extras</label>
                            <input type="number" class="func-he-input" data-id="${func.id}" min="0" value="0" step="0.5" style="padding: 4px;">
                        </div>
                        
                        <button class="btn btn-danger btn-sm" onclick="removerFuncionarioAPI(${func.id})" title="Excluir (Admin)">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

function filtrarFuncionarios() {
    const termo = document.getElementById('searchFuncionario').value.toLowerCase();
    const filtrados = funcionariosCache.filter(f => f.nome.toLowerCase().includes(termo));
    renderizarListaFuncionarios(filtrados);
}

async function removerFuncionarioAPI(id) {
    // Solicitar senha de admin
    const senha = prompt("🔒 Área Restrita\nDigite a senha de administrador para excluir:");
    
    if (!senha) return; // Cancelado
    
    showLoading('Excluindo...');
    
    try {
        // Headers personalizados precisam ser passados de forma específica
        // Adicionamos X-User-Role: admin para permitir a exclusão no backend
        // (Simulando elevação de privilégio via senha)
        
        const token = localStorage.getItem('api_key');
        const headers = {
            'Content-Type': 'application/json',
            'X-API-KEY': token,
            'X-Admin-Pass': senha,
            'X-User-Role': 'admin' // Necessário para passar no middleware @require_role('admin')
        };

        const response = await fetch(`${API_BASE_URL}/rh/funcionarios/${id}`, {
            method: 'DELETE',
            headers: headers
        });
        
        const data = await response.json();
        
        if (response.ok && data.success) {
            showToast('Funcionário excluído com sucesso!', 'success');
            listarFuncionariosAPI();
        } else {
            showToast(data.error || 'Erro ao excluir (Senha incorreta?)', 'error');
        }
        
    } catch (error) {
        console.error('Erro ao excluir:', error);
        showToast('Erro de conexão ao excluir', 'error');
    } finally {
        hideLoading();
    }
}

async function calcularFolhaPagamentoAPI() {
    // Coletar horas extras dos inputs
    const inputsHE = document.querySelectorAll('.func-he-input');
    const mapHE = {};
    inputsHE.forEach(input => {
        mapHE[input.dataset.id] = parseFloat(input.value) || 0;
    });
    
    // Preparar dados para envio
    // Usamos o cache para pegar nome e cargo, e o input para HE
    const funcionariosParaCalculo = funcionariosCache.map(f => ({
        nome: f.nome,
        cargo: f.cargo,
        horas_extras: mapHE[f.id] || 0
    }));
    
    if (funcionariosParaCalculo.length === 0) {
        showToast('Nenhum funcionário para calcular', 'warning');
        return;
    }
    
    showLoading('Calculando folha...');
    
    try {
        const response = await apiRequest('/rh/calcular', {
            method: 'POST',
            body: JSON.stringify({ funcionarios: funcionariosParaCalculo })
        });
        
        exibirResultadoRH(response.data);
        showToast('Folha calculada com sucesso!', 'success');
        
    } catch (error) {
        console.error('Erro ao calcular:', error);
        showToast('Erro ao calcular folha', 'error');
    } finally {
        hideLoading();
    }
}

function exibirResultadoRH(data) {
    lastCalculatedFolha = data; // Salvar para exportação
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
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                <h4 style="margin: 0;"><i class="fas fa-file-invoice"></i> Folha de Pagamento</h4>
                <button class="btn btn-danger btn-sm" onclick="exportarFolhaPDF()">
                    <i class="fas fa-file-pdf"></i> Exportar PDF
                </button>
            </div>
            
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
                        <td>${formatCurrency(data.totais.encargos_patronais)}</td>
                    </tr>
                    <tr style="font-weight: bold; background: #fff3e0;">
                        <td>Custo Total para Empresa:</td>
                        <td>${formatCurrency(data.totais.custo_total_empresa)}</td>
                    </tr>
                </table>
            </div>
        </div>
    `;
    
    resultado.innerHTML = html;
    resultado.classList.remove('hidden');
    
    // Scroll para o resultado
    resultado.scrollIntoView({ behavior: 'smooth' });
}

async function exportarFolhaPDF() {
    if (!lastCalculatedFolha) {
        showToast('Nenhuma folha calculada para exportar', 'warning');
        return;
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    // Cabeçalho
    doc.setFontSize(18);
    doc.text('Estoque Certo LTDA', 14, 22);
    doc.setFontSize(14);
    doc.text('Relatório de Folha de Pagamento', 14, 32);
    doc.setFontSize(10);
    doc.text(`Data de Emissão: ${new Date().toLocaleDateString('pt-BR')} ${new Date().toLocaleTimeString('pt-BR')}`, 14, 40);
    
    // Tabela de Funcionários
    const tableColumn = ["Nome", "Cargo", "Valor/h", "HE", "Bruto", "INSS", "IR", "Líquido"];
    const tableRows = [];

    lastCalculatedFolha.funcionarios.forEach(func => {
        const row = [
            func.nome,
            func.cargo,
            formatCurrency(func.valorHora),
            func.horasExtras || '-',
            formatCurrency(func.salarioBruto),
            formatCurrency(func.descINSS),
            formatCurrency(func.descIR),
            formatCurrency(func.salarioLiquido)
        ];
        tableRows.push(row);
    });

    doc.autoTable({
        head: [tableColumn],
        body: tableRows,
        startY: 50,
        theme: 'grid',
        styles: { fontSize: 8 },
        headStyles: { fillColor: [41, 128, 185] }
    });
    
    // Totais
    const finalY = doc.lastAutoTable.finalY + 10;
    doc.setFontSize(12);
    doc.text('Resumo Financeiro:', 14, finalY);
    
    const totais = lastCalculatedFolha.totais;
    doc.setFontSize(10);
    doc.text(`Total Bruto: ${formatCurrency(totais.total_bruto)}`, 14, finalY + 10);
    doc.text(`Total Líquido: ${formatCurrency(totais.total_liquido)}`, 14, finalY + 16);
    doc.text(`Encargos Patronais: ${formatCurrency(totais.encargos_patronais)}`, 14, finalY + 22);
    doc.text(`Custo Total Empresa: ${formatCurrency(totais.custo_total_empresa)}`, 14, finalY + 28);
    
    doc.save('folha_pagamento.pdf');
    showToast('PDF gerado com sucesso!', 'success');
}

// ============================================================================
// MÓDULO VISUALIZAR ESTOQUE
// ============================================================================

async function loadVisualizarModule(container) {
    showLoading('Carregando estoque...');
    
    try {
        const produtos = await obterDadosEstoque();
        
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
                        <td>${produto.lote || '-'}</td>
                        <td>${produto.serial || '-'}</td>
                        <td>${formatNumber(produto.quantidade)}</td>
                        <td>${formatCurrency(produto.valor)}</td>
                        <td>${formatCurrency(valorTotal)}</td>
                        <td>${produto.local}</td>
                    </tr>
                `;
            });
            
            const html = `
                <div class="card">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                        <h4 style="margin: 0;"><i class="fas fa-warehouse"></i> Estoque Completo</h4>
                        <button class="btn btn-danger btn-sm" onclick="exportarEstoquePDF()">
                            <i class="fas fa-file-pdf"></i> Exportar PDF
                        </button>
                    </div>
                    
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
                                    <th>Lote</th>
                                    <th>Serial</th>
                                    <th>Qtd</th>
                                    <th>Valor Unit.</th>
                                    <th>Valor Total</th>
                                    <th>Local</th>
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

async function exportarEstoquePDF() {
    showLoading('Gerando PDF...');
    
    try {
        const produtos = await obterDadosEstoque();
        
        if (produtos.length === 0) {
            showToast('Estoque vazio', 'warning');
            return;
        }

        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        // Cabeçalho
        doc.setFontSize(18);
        doc.text('Estoque Certo EV - Relatório de Rastreabilidade', 14, 22);
        doc.setFontSize(14);
        doc.text('Inventário de Componentes e Veículos', 14, 32);
        doc.setFontSize(10);
        doc.text(`Data de Emissão: ${new Date().toLocaleDateString('pt-BR')} ${new Date().toLocaleTimeString('pt-BR')}`, 14, 40);
        
        // Tabela
        const tableColumn = ["Cód", "Produto", "Lote", "Serial", "Qtd", "Valor Unit.", "Total", "Local"];
        const tableRows = [];
        
        let valorTotalEstoque = 0;
        let totalItens = 0;

        produtos.forEach(prod => {
            const total = prod.quantidade * prod.valor;
            valorTotalEstoque += total;
            totalItens += prod.quantidade;
            
            const row = [
                prod.codigo,
                prod.nome,
                prod.lote || '-',
                prod.serial || '-',
                prod.quantidade,
                formatCurrency(prod.valor),
                formatCurrency(total),
                prod.local
            ];
            tableRows.push(row);
        });

        doc.autoTable({
            head: [tableColumn],
            body: tableRows,
            startY: 50,
            theme: 'striped',
            styles: { fontSize: 8 },
            headStyles: { fillColor: [37, 99, 235] } // Electric Blue
        });
        
        // Totais
        const finalY = doc.lastAutoTable.finalY + 10;
        doc.setFontSize(10);
        doc.text(`Total de Itens: ${totalItens}`, 14, finalY);
        doc.text(`Valor Total em Estoque: ${formatCurrency(valorTotalEstoque)}`, 14, finalY + 6);
        
        doc.save('relatorio_estoque_ev.pdf');
        showToast('PDF gerado com sucesso!', 'success');
        
    } catch (error) {
        console.error('Erro ao gerar PDF:', error);
        showToast('Erro ao gerar PDF', 'error');
    } finally {
        hideLoading();
    }
}

// ============================================================================
// MÓDULO HISTÓRICO
// ============================================================================

async function loadHistoricoModule(container) {
    showLoading('Carregando histórico...');
    
    try {
        const movimentacoes = await obterHistoricoMovimentacoes();
        
        if (movimentacoes && movimentacoes.length > 0) {
            // Ordenar por data (mais recente primeiro)
            movimentacoes.sort((a, b) => {
                const dateA = a.timestamp.toDate ? a.timestamp.toDate() : new Date(a.timestamp);
                const dateB = b.timestamp.toDate ? b.timestamp.toDate() : new Date(b.timestamp);
                return dateB - dateA;
            });
            
            let tabelaHTML = '';
            
            movimentacoes.forEach((mov, idx) => {
                const dataFormatada = formatDateTime(mov.timestamp);
                const tipoBadge = mov.tipo === 'entrada' 
                    ? '<span class="status-badge active">Entrada</span>' 
                    : '<span class="status-badge inactive">Saída</span>';
                
                const quantidade = mov.quantidade || mov.quantidadeVendida || 0;
                const valor = mov.valorVenda ? formatCurrency(mov.valorVenda) : '-';
                
                tabelaHTML += `
                    <tr>
                        <td>${dataFormatada}</td>
                        <td>${tipoBadge}</td>
                        <td>${mov.produtoNome}</td>
                        <td>${quantidade}</td>
                        <td>${valor}</td>
                        <td>${mov.usuario || 'Sistema'}</td>
                    </tr>
                `;
            });
            
            const html = `
                <div class="card">
                    <div class="card-header">
                        <i class="fas fa-history"></i> Histórico de Movimentações
                    </div>
                    
                    <div class="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Data/Hora</th>
                                    <th>Tipo</th>
                                    <th>Produto</th>
                                    <th>Qtd</th>
                                    <th>Valor Venda</th>
                                    <th>Usuário</th>
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
                    <i class="fas fa-history" style="font-size: 4rem; color: #ccc; margin-bottom: 1rem;"></i>
                    <h3>Sem Histórico</h3>
                    <p>Nenhuma movimentação registrada ainda.</p>
                </div>
            `;
        }
    } catch (error) {
        console.error('Erro ao carregar histórico:', error);
        showToast('Erro ao carregar histórico', 'error');
        container.innerHTML = `<div class="card alert alert-error"><p>Erro ao carregar histórico</p></div>`;
    } finally {
        hideLoading();
    }
}
