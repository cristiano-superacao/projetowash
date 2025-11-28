// Dashboard Functions

let chartMovimentacoes = null;
let chartTopProdutos = null;

// Carregar dashboard
async function loadDashboard() {
    try {
        showLoading('Carregando dashboard...');
        
        const stats = await obterEstatisticas();
        
        // Atualizar cards de estatisticas
        document.getElementById('statTotalProdutos').textContent = stats.totalProdutos || 0;
        document.getElementById('statTotalItens').textContent = stats.totalItens || 0;
        document.getElementById('statValorTotal').textContent = formatCurrency(stats.valorTotal || 0);
        document.getElementById('statVendasMes').textContent = formatCurrency(stats.vendasMes || 0);
        
        // Carregar historico
        loadHistoricoRecente(stats.movimentacoes);
        
        // Carregar graficos e verificar estoque baixo
        await loadChartsAndAlerts();
        
        hideLoading();
        
    } catch (error) {
        hideLoading();
        console.error('Erro ao carregar dashboard:', error);
        showToast('Erro ao carregar dashboard', 'error');
    }
}

// Carregar historico recente
function loadHistoricoRecente(movimentacoes) {
    const container = document.getElementById('historicoRecente');
    
    if (!movimentacoes || movimentacoes.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-inbox"></i>
                <p>Nenhuma movimentacao recente</p>
            </div>
        `;
        return;
    }
    
    const html = movimentacoes.map(mov => {
        const tipo = mov.tipo;
        const icon = tipo === 'entrada' ? 'box-open' : 'truck-loading';
        const quantidade = mov.quantidade || mov.quantidadeVendida || 0;
        const valor = mov.valorVenda || 0;
        
        return `
            <div class="history-item ${tipo}">
                <div class="history-info">
                    <div class="history-icon">
                        <i class="fas fa-${icon}"></i>
                    </div>
                    <div class="history-details">
                        <h4>${mov.produtoNome}</h4>
                        <p>${tipo === 'entrada' ? 'Entrada' : 'Saida'} de ${quantidade} unidade(s)</p>
                    </div>
                </div>
                <div class="history-value">
                    ${tipo === 'saida' ? formatCurrency(valor) : `${quantidade}x`}
                </div>
            </div>
        `;
    }).join('');
    
    container.innerHTML = html;
}

// Carregar graficos e alertas
async function loadChartsAndAlerts() {
    try {
        const [produtos, movimentacoes] = await Promise.all([
            obterDadosEstoque(),
            obterHistoricoMovimentacoes()
        ]);
        
        // Verificar estoque baixo
        checkLowStock(produtos);

        // Grafico de Movimentacoes
        loadChartMovimentacoes(movimentacoes);
        
        // Grafico de Top Produtos
        loadChartTopProdutos(produtos);
        
    } catch (error) {
        console.error('Erro ao carregar graficos:', error);
    }
}

// Verificar estoque baixo
function checkLowStock(produtos) {
    const container = document.getElementById('stockAlerts');
    const threshold = 10; // Limite para alerta
    
    const lowStockItems = produtos.filter(p => p.quantidade <= threshold);
    
    if (lowStockItems.length > 0) {
        const itemsHtml = lowStockItems.map(p => `
            <li>
                <strong>${p.nome}</strong>: Restam apenas <span class="badge-danger">${p.quantidade}</span> unidades
            </li>
        `).join('');
        
        container.innerHTML = `
            <div class="alert alert-warning" style="display: block; margin-bottom: 20px;">
                <h4><i class="fas fa-exclamation-triangle"></i> Alerta de Estoque Baixo</h4>
                <ul style="margin-top: 10px; padding-left: 20px;">
                    ${itemsHtml}
                </ul>
            </div>
        `;
        container.classList.remove('hidden');
    } else {
        container.classList.add('hidden');
        container.innerHTML = '';
    }
}

// Grafico de Movimentacoes
function loadChartMovimentacoes(movimentacoes) {
    const ctx = document.getElementById('chartMovimentacoes');
    
    // Contar entradas e saidas dos ultimos 7 dias
    const hoje = new Date();
    const dias = [];
    const entradas = new Array(7).fill(0);
    const saidas = new Array(7).fill(0);
    
    for (let i = 6; i >= 0; i--) {
        const data = new Date(hoje);
        data.setDate(data.getDate() - i);
        dias.push(data.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }));
    }
    
    movimentacoes.forEach(mov => {
        if (!mov.timestamp) return;
        
        const movData = mov.timestamp.toDate ? mov.timestamp.toDate() : new Date(mov.timestamp);
        const diffDias = Math.floor((hoje - movData) / (1000 * 60 * 60 * 24));
        
        if (diffDias >= 0 && diffDias < 7) {
            const index = 6 - diffDias;
            if (mov.tipo === 'entrada') {
                entradas[index] += mov.quantidade || 0;
            } else if (mov.tipo === 'saida') {
                saidas[index] += mov.quantidade || mov.quantidadeVendida || 0;
            }
        }
    });
    
    // Destruir grafico anterior
    if (chartMovimentacoes) {
        chartMovimentacoes.destroy();
    }
    
    // Criar novo grafico
    chartMovimentacoes = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dias,
            datasets: [
                {
                    label: 'Entradas',
                    data: entradas,
                    borderColor: '#10b981',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    tension: 0.4
                },
                {
                    label: 'Saidas',
                    data: saidas,
                    borderColor: '#f59e0b',
                    backgroundColor: 'rgba(245, 158, 11, 0.1)',
                    tension: 0.4
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    }
                }
            }
        }
    });
}

// Grafico de Top Produtos
function loadChartTopProdutos(produtos) {
    const ctx = document.getElementById('chartTopProdutos');
    
    // Ordenar por quantidade e pegar top 5
    const top5 = produtos
        .sort((a, b) => b.quantidade - a.quantidade)
        .slice(0, 5);
    
    const labels = top5.map(p => p.nome);
    const data = top5.map(p => p.quantidade);
    const colors = [
        'rgba(37, 99, 235, 0.8)',
        'rgba(16, 185, 129, 0.8)',
        'rgba(245, 158, 11, 0.8)',
        'rgba(139, 92, 246, 0.8)',
        'rgba(239, 68, 68, 0.8)'
    ];
    
    // Destruir grafico anterior
    if (chartTopProdutos) {
        chartTopProdutos.destroy();
    }
    
    // Criar novo grafico
    chartTopProdutos = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Quantidade em Estoque',
                data: data,
                backgroundColor: colors
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    }
                }
            }
        }
    });
}

// Atualizar dashboard periodicamente
setInterval(() => {
    const user = typeof localCurrentUser !== 'undefined' ? localCurrentUser : (typeof currentUser !== 'undefined' ? currentUser : null);
    if (user && !document.getElementById('appContainer').classList.contains('hidden')) {
        loadDashboard();
    }
}, 60000); // Atualizar a cada 1 minuto

// Toggle Sidebar (Mobile)
function toggleSidebar() {
    const sidebar = document.getElementById('dashboardSidebar');
    const overlay = document.getElementById('sidebarOverlay');
    
    if (sidebar && overlay) {
        sidebar.classList.toggle('active');
        overlay.classList.toggle('active');
    }
}

