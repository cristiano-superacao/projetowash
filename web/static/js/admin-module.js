// ============================================================================
// MÓDULO DE ADMINISTRAÇÁO - SUPER ADMIN
// ============================================================================
// Este módulo permite ao super administrador visualizar todas as empresas
// cadastradas no sistema, seus dados e estatísticas gerais.

// ============================================================================
// FUNÇÁO PRINCIPAL - CARREGAR PAINEL ADMINISTRATIVO
// ============================================================================

function loadAdminModule() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    
    // Verificar se é super admin
    if (!user || user.role !== 'superadmin') {
        showNotification('Acesso negado! Apenas super administradores podem acessar.', 'error');
        return;
    }

    const contentArea = document.getElementById('content-area');
    
    contentArea.innerHTML = `
        <div class="admin-panel">
            <!-- Cabeçalho do Painel -->
            <div class="admin-header">
                <div class="admin-title">
                    <i class="fas fa-shield-alt"></i>
                    <h2>Painel do Super Administrador</h2>
                </div>
                <p class="admin-subtitle">Visão geral de todas as empresas cadastradas no sistema</p>
            </div>

            <!-- Estatísticas Gerais -->
            <div class="admin-stats">
                <div class="stat-card">
                    <div class="stat-icon blue">
                        <i class="fas fa-building"></i>
                    </div>
                    <div class="stat-info">
                        <h3 id="totalEmpresas">0</h3>
                        <p>Empresas Cadastradas</p>
                    </div>
                </div>

                <div class="stat-card">
                    <div class="stat-icon green">
                        <i class="fas fa-chart-line"></i>
                    </div>
                    <div class="stat-info">
                        <h3 id="empresasAtivas">0</h3>
                        <p>Empresas Ativas</p>
                    </div>
                </div>

                <div class="stat-card">
                    <div class="stat-icon orange">
                        <i class="fas fa-industry"></i>
                    </div>
                    <div class="stat-info">
                        <h3 id="segmentosMaisUsados">-</h3>
                        <p>Segmento Mais Popular</p>
                    </div>
                </div>

                <div class="stat-card">
                    <div class="stat-icon purple">
                        <i class="fas fa-calendar-alt"></i>
                    </div>
                    <div class="stat-info">
                        <h3 id="cadastrosRecentes">0</h3>
                        <p>Cadastros Hoje</p>
                    </div>
                </div>
            </div>

            <!-- Filtros e Busca -->
            <div class="admin-filters">
                <div class="filter-group">
                    <label>
                        <i class="fas fa-search"></i>
                        <input type="text" id="searchEmpresa" placeholder="Buscar por nome ou email..." class="search-input">
                    </label>
                </div>
                <div class="filter-group">
                    <label>
                        <i class="fas fa-filter"></i>
                        <select id="filterSegmento" class="filter-select">
                            <option value="">Todos os Segmentos</option>
                        </select>
                    </label>
                </div>
                <div class="filter-group">
                    <button onclick="exportarEmpresas()" class="btn-export">
                        <i class="fas fa-download"></i> Exportar CSV
                    </button>
                </div>
            </div>

            <!-- Tabela de Empresas -->
            <div class="admin-table-container">
                <table class="admin-table">
                    <thead>
                        <tr>
                            <th><i class="fas fa-building"></i> Empresa</th>
                            <th><i class="fas fa-envelope"></i> Email</th>
                            <th><i class="fas fa-industry"></i> Segmento</th>
                            <th><i class="fas fa-calendar"></i> Data Cadastro</th>
                            <th><i class="fas fa-signal"></i> Status</th>
                            <th><i class="fas fa-cog"></i> Ações</th>
                        </tr>
                    </thead>
                    <tbody id="empresasTableBody">
                        <tr>
                            <td colspan="6" class="loading-cell">
                                <i class="fas fa-spinner fa-spin"></i> Carregando dados...
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `;

    // Popular filtro de segmentos
    popularFiltroSegmentos();

    // Carregar dados das empresas
    carregarEmpresas();

    // Adicionar event listeners para filtros
    document.getElementById('searchEmpresa').addEventListener('input', filtrarEmpresas);
    document.getElementById('filterSegmento').addEventListener('change', filtrarEmpresas);
}

// ============================================================================
// POPULAR FILTRO DE SEGMENTOS
// ============================================================================

function popularFiltroSegmentos() {
    const select = document.getElementById('filterSegmento');
    
    if (typeof SEGMENTOS_EMPRESARIAIS !== 'undefined') {
        for (const [key, segmento] of Object.entries(SEGMENTOS_EMPRESARIAIS)) {
            const option = document.createElement('option');
            option.value = key;
            option.textContent = segmento.nome;
            select.appendChild(option);
        }
    }
}

// ============================================================================
// CARREGAR EMPRESAS DO LOCALSTORAGE
// ============================================================================

function carregarEmpresas() {
    const localUsers = JSON.parse(localStorage.getItem('localUsers') || '[]');
    
    // Filtrar apenas empresas (role = 'admin'), excluindo super admin
    const empresas = localUsers.filter(u => u.role === 'admin' && u.email !== 'admin@local.com');
    
    // Atualizar estatísticas
    atualizarEstatisticas(empresas);
    
    // Renderizar tabela
    renderizarTabelaEmpresas(empresas);
}

// ============================================================================
// ATUALIZAR ESTATÍSTICAS
// ============================================================================

function atualizarEstatisticas(empresas) {
    // Total de empresas
    document.getElementById('totalEmpresas').textContent = empresas.length;
    
    // Empresas ativas (todas estão ativas por padrão)
    const ativas = empresas.filter(e => e.ativo !== false).length;
    document.getElementById('empresasAtivas').textContent = ativas;
    
    // Segmento mais popular
    if (empresas.length > 0) {
        const segmentos = {};
        empresas.forEach(e => {
            if (e.segmento) {
                segmentos[e.segmento] = (segmentos[e.segmento] || 0) + 1;
            }
        });
        
        const maisPopular = Object.entries(segmentos).sort((a, b) => b[1] - a[1])[0];
        if (maisPopular && typeof SEGMENTOS_EMPRESARIAIS !== 'undefined') {
            const segmentoInfo = SEGMENTOS_EMPRESARIAIS[maisPopular[0]];
            document.getElementById('segmentosMaisUsados').textContent = segmentoInfo ? segmentoInfo.nome : '-';
        }
    }
    
    // Cadastros hoje
    const hoje = new Date().toISOString().split('T')[0];
    const cadastrosHoje = empresas.filter(e => {
        if (!e.dataCadastro) return false;
        const dataCadastro = new Date(e.dataCadastro).toISOString().split('T')[0];
        return dataCadastro === hoje;
    }).length;
    document.getElementById('cadastrosRecentes').textContent = cadastrosHoje;
}

// ============================================================================
// RENDERIZAR TABELA DE EMPRESAS
// ============================================================================

function renderizarTabelaEmpresas(empresas) {
    const tbody = document.getElementById('empresasTableBody');
    
    if (empresas.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="6" class="empty-cell">
                    <i class="fas fa-inbox"></i>
                    <p>Nenhuma empresa cadastrada ainda</p>
                </td>
            </tr>
        `;
        return;
    }
    
    tbody.innerHTML = empresas.map(empresa => {
        const segmentoInfo = typeof SEGMENTOS_EMPRESARIAIS !== 'undefined' && empresa.segmento 
            ? SEGMENTOS_EMPRESARIAIS[empresa.segmento] 
            : null;
        
        const dataCadastro = empresa.dataCadastro 
            ? new Date(empresa.dataCadastro).toLocaleDateString('pt-BR')
            : 'Não informada';
        
        const status = empresa.ativo !== false ? 'Ativa' : 'Inativa';
        const statusClass = empresa.ativo !== false ? 'status-active' : 'status-inactive';
        
        return `
            <tr data-empresa-id="${empresa.uid}">
                <td class="empresa-cell">
                    <div class="empresa-info">
                        <i class="fas fa-building" style="color: ${segmentoInfo ? segmentoInfo.cor : '#2563eb'}"></i>
                        <div>
                            <strong>${empresa.nomeEmpresa || 'Sem nome'}</strong>
                            <small>${empresa.nome || 'Administrador'}</small>
                        </div>
                    </div>
                </td>
                <td>${empresa.email}</td>
                <td>
                    ${segmentoInfo ? `
                        <span class="segmento-badge" style="background-color: ${segmentoInfo.cor}20; color: ${segmentoInfo.cor}">
                            <i class="fas ${segmentoInfo.icon}"></i>
                            ${segmentoInfo.nome}
                        </span>
                    ` : '<span class="text-muted">Não definido</span>'}
                </td>
                <td>${dataCadastro}</td>
                <td><span class="status-badge ${statusClass}">${status}</span></td>
                <td class="actions-cell">
                    <button onclick="verDetalhesEmpresa('${empresa.uid}')" class="btn-action btn-view" title="Ver Detalhes">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button onclick="toggleStatusEmpresa('${empresa.uid}')" class="btn-action btn-toggle" title="Ativar/Desativar">
                        <i class="fas fa-power-off"></i>
                    </button>
                </td>
            </tr>
        `;
    }).join('');
}

// ============================================================================
// FILTRAR EMPRESAS
// ============================================================================

function filtrarEmpresas() {
    const searchTerm = document.getElementById('searchEmpresa').value.toLowerCase();
    const segmentoFilter = document.getElementById('filterSegmento').value;
    
    const localUsers = JSON.parse(localStorage.getItem('localUsers') || '[]');
    let empresas = localUsers.filter(u => u.role === 'admin' && u.email !== 'admin@local.com');
    
    // Filtrar por busca
    if (searchTerm) {
        empresas = empresas.filter(e => 
            (e.nomeEmpresa || '').toLowerCase().includes(searchTerm) ||
            (e.email || '').toLowerCase().includes(searchTerm) ||
            (e.nome || '').toLowerCase().includes(searchTerm)
        );
    }
    
    // Filtrar por segmento
    if (segmentoFilter) {
        empresas = empresas.filter(e => e.segmento === segmentoFilter);
    }
    
    renderizarTabelaEmpresas(empresas);
}

// ============================================================================
// VER DETALHES DA EMPRESA
// ============================================================================

function verDetalhesEmpresa(uid) {
    const localUsers = JSON.parse(localStorage.getItem('localUsers') || '[]');
    const empresa = localUsers.find(u => u.uid === uid);
    
    if (!empresa) {
        showNotification('Empresa não encontrada!', 'error');
        return;
    }
    
    const segmentoInfo = typeof SEGMENTOS_EMPRESARIAIS !== 'undefined' && empresa.segmento 
        ? SEGMENTOS_EMPRESARIAIS[empresa.segmento] 
        : null;
    
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content empresa-modal">
            <div class="modal-header" style="background: linear-gradient(135deg, ${segmentoInfo ? segmentoInfo.cor : '#2563eb'} 0%, ${segmentoInfo ? segmentoInfo.cor + 'dd' : '#1e40af'} 100%)">
                <h3><i class="fas fa-building"></i> Detalhes da Empresa</h3>
                <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <div class="empresa-details">
                    <div class="detail-row">
                        <label><i class="fas fa-building"></i> Nome da Empresa:</label>
                        <span>${empresa.nomeEmpresa || 'Não informado'}</span>
                    </div>
                    <div class="detail-row">
                        <label><i class="fas fa-user"></i> Responsável:</label>
                        <span>${empresa.nome || 'Não informado'}</span>
                    </div>
                    <div class="detail-row">
                        <label><i class="fas fa-envelope"></i> Email:</label>
                        <span>${empresa.email}</span>
                    </div>
                    <div class="detail-row">
                        <label><i class="fas fa-industry"></i> Segmento:</label>
                        <span>${segmentoInfo ? segmentoInfo.nome : 'Não definido'}</span>
                    </div>
                    <div class="detail-row">
                        <label><i class="fas fa-calendar-plus"></i> Data de Cadastro:</label>
                        <span>${empresa.dataCadastro ? new Date(empresa.dataCadastro).toLocaleString('pt-BR') : 'Não informada'}</span>
                    </div>
                    <div class="detail-row">
                        <label><i class="fas fa-fingerprint"></i> ID da Empresa:</label>
                        <span class="company-id">${empresa.companyId || empresa.uid}</span>
                    </div>
                    <div class="detail-row">
                        <label><i class="fas fa-signal"></i> Status:</label>
                        <span class="status-badge ${empresa.ativo !== false ? 'status-active' : 'status-inactive'}">
                            ${empresa.ativo !== false ? 'Ativa' : 'Inativa'}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

// ============================================================================
// TOGGLE STATUS DA EMPRESA
// ============================================================================

function toggleStatusEmpresa(uid) {
    const localUsers = JSON.parse(localStorage.getItem('localUsers') || '[]');
    const empresaIndex = localUsers.findIndex(u => u.uid === uid);
    
    if (empresaIndex === -1) {
        showNotification('Empresa não encontrada!', 'error');
        return;
    }
    
    const empresa = localUsers[empresaIndex];
    empresa.ativo = !(empresa.ativo !== false);
    
    localUsers[empresaIndex] = empresa;
    localStorage.setItem('localUsers', JSON.stringify(localUsers));
    
    showNotification(
        `Empresa ${empresa.ativo ? 'ativada' : 'desativada'} com sucesso!`,
        'success'
    );
    
    carregarEmpresas();
}

// ============================================================================
// EXPORTAR EMPRESAS PARA CSV
// ============================================================================

function exportarEmpresas() {
    const localUsers = JSON.parse(localStorage.getItem('localUsers') || '[]');
    const empresas = localUsers.filter(u => u.role === 'admin' && u.email !== 'admin@local.com');
    
    if (empresas.length === 0) {
        showNotification('Nenhuma empresa para exportar!', 'warning');
        return;
    }
    
    // Cabeçalho do CSV
    let csv = 'Nome da Empresa,Email,Responsável,Segmento,Data de Cadastro,Status\n';
    
    // Dados
    empresas.forEach(empresa => {
        const segmentoInfo = typeof SEGMENTOS_EMPRESARIAIS !== 'undefined' && empresa.segmento 
            ? SEGMENTOS_EMPRESARIAIS[empresa.segmento] 
            : null;
        
        const row = [
            empresa.nomeEmpresa || 'Não informado',
            empresa.email,
            empresa.nome || 'Não informado',
            segmentoInfo ? segmentoInfo.nome : 'Não definido',
            empresa.dataCadastro ? new Date(empresa.dataCadastro).toLocaleString('pt-BR') : 'Não informada',
            empresa.ativo !== false ? 'Ativa' : 'Inativa'
        ];
        
        csv += row.map(field => `"${field}"`).join(',') + '\n';
    });
    
    // Download do arquivo
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `empresas_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    showNotification('Arquivo CSV exportado com sucesso!', 'success');
}
