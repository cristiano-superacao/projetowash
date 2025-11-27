// ============================================================================
// SISTEMA ESTOQUE CERTO LTDA - JAVASCRIPT PRINCIPAL
// Arquivo: app.js
// Descricao: Funcoes principais do sistema integrado com Firebase
// ============================================================================

// Constantes e Configuracoes
// Detecta se está rodando localmente ou em produção
const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
const API_BASE_URL = isLocalhost 
    ? 'http://localhost:5000/api' 
    : 'https://projetowash.onrender.com/api'; // URL de produção (Render)

// ============================================================================
// FUNCOES DE MODAL
// ============================================================================

/**
 * Exibe o modal com o modulo selecionado
 * @param {string} moduleName - Nome do modulo a ser exibido
 */
function showModule(moduleName) {
    const modal = document.getElementById('modalContainer');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    
    // Definir titulo baseado no modulo
    const titles = {
        'operacional': 'Modulo Operacional - Capacidade de Producao',
        'estoque-entrada': 'Modulo Estoque - Entrada de Produtos',
        'estoque-saida': 'Modulo Estoque - Saida de Produtos',
        'financeiro': 'Modulo Financeiro - Custos e Lucros',
        'rh': 'Modulo RH - Folha de Pagamento',
        'visualizar': 'Visualizar Estoque Completo',
        'historico': 'Historico de Movimentacoes'
    };
    
    modalTitle.textContent = titles[moduleName] || 'Modulo';
    
    // Carregar conteudo do modulo
    switch(moduleName) {
        case 'operacional':
            loadOperacionalModule(modalBody);
            break;
        case 'estoque-entrada':
            loadEstoqueEntradaModule(modalBody);
            break;
        case 'estoque-saida':
            loadEstoqueSaidaModule(modalBody);
            break;
        case 'financeiro':
            loadFinanceiroModule(modalBody);
            break;
        case 'rh':
            loadRHModule(modalBody);
            break;
        case 'visualizar':
            loadVisualizarModule(modalBody);
            break;
        case 'historico':
            loadHistoricoModule(modalBody);
            break;
    }
    
    // Mostrar modal
    modal.classList.remove('hidden');
}

/**
 * Fecha o modal
 */
function closeModule() {
    const modal = document.getElementById('modalContainer');
    modal.classList.add('hidden');
}

// Fechar modal ao clicar fora
document.addEventListener('DOMContentLoaded', () => {
    const modalContainer = document.getElementById('modalContainer');
    
    modalContainer.addEventListener('click', (e) => {
        if (e.target === modalContainer) {
            closeModule();
        }
    });
});

// ============================================================================
// FUNCOES DE NOTIFICACAO
// ============================================================================

/**
 * Exibe uma notificacao toast
 * @param {string} message - Mensagem a ser exibida
 * @param {string} type - Tipo da notificacao (success, error, warning)
 */
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    
    toastMessage.textContent = message;
    toast.className = `toast ${type}`;
    toast.classList.remove('hidden');
    
    setTimeout(() => {
        toast.classList.add('hidden');
    }, 3000);
}

// ============================================================================
// FUNCOES DE LOADING
// ============================================================================

/**
 * Exibe o overlay de loading
 * @param {string} message - Mensagem opcional
 */
function showLoading(message = 'Processando...') {
    const overlay = document.getElementById('loadingOverlay');
    const p = overlay.querySelector('p');
    if (p) p.textContent = message;
    overlay.classList.remove('hidden');
}

/**
 * Oculta o overlay de loading
 */
function hideLoading() {
    document.getElementById('loadingOverlay').classList.add('hidden');
}

// ============================================================================
// FUNCOES DE API (Legado - mantido para compatibilidade)
// ============================================================================

/**
 * Faz uma requisicao a API (Legado)
 * @param {string} endpoint - Endpoint da API
 * @param {object} options - Opcoes da requisicao (method, body, etc)
 * @returns {Promise} Resposta da API
 */
async function apiRequest(endpoint, options = {}) {
    try {
        // Adiciona o header de API Key se estiver definido
        const headers = {
            'Content-Type': 'application/json',
            ...options.headers
        };

        if (typeof SERVER_API_KEY !== 'undefined' && SERVER_API_KEY) {
            headers['X-API-KEY'] = SERVER_API_KEY;
        }

        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            headers: headers,
            ...options
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error || 'Erro na requisicao');
        }
        
        return data;
    } catch (error) {
        console.error('Erro na requisição:', error);
        throw error;
    }
}

// ============================================================================
// FUNCOES AUXILIARES
// ============================================================================

/**
 * Formata numero como moeda brasileira
 * @param {number} value - Valor a ser formatado
 * @returns {string} Valor formatado
 */
function formatCurrency(value) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value || 0);
}

/**
 * Formata numero com separadores de milhares
 * @param {number} value - Valor a ser formatado
 * @returns {string} Valor formatado
 */
function formatNumber(value) {
    return new Intl.NumberFormat('pt-BR').format(value || 0);
}

/**
 * Valida se um campo esta vazio
 * @param {string} value - Valor a ser validado
 * @returns {boolean} True se valido, false caso contrario
 */
function validateRequired(value) {
    return value !== null && value !== undefined && value.toString().trim() !== '';
}

/**
 * Valida se um numero e positivo
 * @param {number} value - Valor a ser validado
 * @returns {boolean} True se valido, false caso contrario
 */
function validatePositive(value) {
    return !isNaN(value) && parseFloat(value) > 0;
}

/**
 * Cria elemento HTML a partir de uma string
 * @param {string} html - HTML string
 * @returns {HTMLElement} Elemento HTML
 */
function createElementFromHTML(html) {
    const template = document.createElement('template');
    template.innerHTML = html.trim();
    return template.content.firstChild;
}

/**
 * Formata timestamp do Firestore
 * @param {object} timestamp - Timestamp do Firestore
 * @returns {string} Data formatada
 */
function formatTimestamp(timestamp) {
    if (!timestamp) return 'N/A';
    
    let date;
    if (timestamp.toDate) {
        date = timestamp.toDate();
    } else {
        date = new Date(timestamp);
    }
    
    return date.toLocaleString('pt-BR');
}

// ============================================================================
// FUNCOES DE AUTENTICACAO
// ============================================================================

/**
 * Exibir container de autenticacao
 */
function showAuth() {
    document.getElementById('authContainer').classList.remove('hidden');
    document.getElementById('appContainer').classList.add('hidden');
}

/**
 * Exibir container da aplicacao
 */
function showApp() {
    document.getElementById('authContainer').classList.add('hidden');
    document.getElementById('appContainer').classList.remove('hidden');
    
    // Obter usuario atual
    const user = typeof localCurrentUser !== 'undefined' 
        ? localCurrentUser 
        : (typeof currentUser !== 'undefined' ? currentUser : null);
        
    const userName = user ? (user.nome || user.displayName || 'Usuario') : 'Usuario';
    
    const userDisplayElement = document.getElementById('userEmail');
    if (userDisplayElement) {
        userDisplayElement.textContent = userName;
    }
    
    // Mostrar/ocultar botoes admin
    const isUserAdmin = typeof localIsAdmin !== 'undefined' ? localIsAdmin : (typeof isAdmin !== 'undefined' ? isAdmin : false);
    const adminButtons = document.querySelectorAll('.admin-only');
    adminButtons.forEach(btn => {
        if (isUserAdmin) {
            btn.classList.remove('hidden');
        } else {
            btn.classList.add('hidden');
        }
    });

    // Filtrar modulos por cargo
    filterModulesByRole(user, isUserAdmin);
}

/**
 * Filtrar modulos baseado no cargo do usuario
 */
function filterModulesByRole(user, isAdmin) {
    const modules = document.querySelectorAll('.module-card');
    
    // Se for admin, mostra tudo (exceto o que ja foi tratado pela classe admin-only)
    if (isAdmin) {
        modules.forEach(module => {
            if (!module.classList.contains('admin-only')) {
                module.classList.remove('hidden');
            }
        });
        return;
    }
    
    const cargo = user && user.cargo ? user.cargo : '';
    
    modules.forEach(module => {
        // Pular modulos admin-only (ja tratados)
        if (module.classList.contains('admin-only')) return;
        
        const moduleName = module.getAttribute('data-module');
        let shouldShow = false;
        
        switch(cargo) {
            case 'Financeiro':
                if (moduleName === 'financeiro') shouldShow = true;
                break;
            case 'Estoque':
                if (['estoque-entrada', 'estoque-saida', 'visualizar'].includes(moduleName)) shouldShow = true;
                break;
            case 'RH':
                if (moduleName === 'rh') shouldShow = true;
                break;
            case 'Administrativo':
                if (moduleName === 'operacional') shouldShow = true;
                break;
            default:
                // Se nao tiver cargo definido, talvez mostrar apenas visualizar ou nada?
                // Por seguranca, vamos ocultar tudo se nao tiver cargo definido
                shouldShow = false;
        }
        
        if (shouldShow) {
            module.classList.remove('hidden');
        } else {
            module.classList.add('hidden');
        }
    });
}

/**
 * Fazer logout do sistema
 */
async function handleLogout() {
    try {
        showLoading('Saindo...');
        
        // Tentar modo local primeiro
        if (typeof logoutLocal !== 'undefined') {
            logoutLocal();
            showAuth();
            showToast('Logout realizado com sucesso', 'success');
        } else {
            // Modo Firebase
            await logout();
        }
    } catch (error) {
        console.error('Erro ao fazer logout:', error);
        showToast('Erro ao fazer logout', 'error');
    } finally {
        hideLoading();
    }
}

// ============================================================================
// INICIALIZACAO
// ============================================================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('Sistema Estoque Certo LTDA v2.0 iniciado');
    
    // Verificar modo de operacao
    if (typeof localCurrentUser !== 'undefined') {
        console.log('Modo Local/Demo ativado');
        console.log('Usuario admin padrao: admin@local.com / admin123');
    } else {
        console.log('Modo Firebase ativado');
        console.log('Aguardando autenticacao...');
    }
});
