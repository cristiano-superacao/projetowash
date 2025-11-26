// Funcoes de autenticacao UI

// Mostrar formulario de login
function showLogin() {
    document.getElementById('loginForm').classList.remove('hidden');
    document.getElementById('registerForm').classList.add('hidden');
    document.getElementById('forgotPasswordForm').classList.add('hidden');
}

// Mostrar formulario de cadastro
function showRegister() {
    document.getElementById('loginForm').classList.add('hidden');
    document.getElementById('registerForm').classList.remove('hidden');
    document.getElementById('forgotPasswordForm').classList.add('hidden');
}

// Mostrar formulario de recuperacao de senha
function showForgotPassword() {
    document.getElementById('loginForm').classList.add('hidden');
    document.getElementById('registerForm').classList.add('hidden');
    document.getElementById('forgotPasswordForm').classList.remove('hidden');
}

// Handler de login
async function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;
    
    if (!email || !password) {
        showToast('Preencha todos os campos', 'error');
        return;
    }
    
    showLoading('Entrando...');
    
    try {
        // Tentar modo local primeiro
        if (typeof loginLocal !== 'undefined') {
            await loginLocal(email, password);
            showToast('Login realizado com sucesso!', 'success');
            showApp();
            loadDashboard();
        } else {
            // Modo Firebase
            await login(email, password);
        }
    } catch (error) {
        console.error('Erro no login:', error);
        showToast(error.message || 'Erro ao fazer login', 'error');
    } finally {
        hideLoading();
    }
}

// Handler de cadastro
async function handleRegister(event) {
    event.preventDefault();
    
    const nome = document.getElementById('regNome').value.trim();
    const email = document.getElementById('regEmail').value.trim();
    const contato = document.getElementById('regContato').value.trim();
    const loginUsuario = document.getElementById('regLogin').value.trim();
    const password = document.getElementById('regPassword').value;
    const passwordConfirm = document.getElementById('regPasswordConfirm').value;
    
    // Validacoes
    if (!nome || !email || !contato || !loginUsuario || !password || !passwordConfirm) {
        showToast('Preencha todos os campos', 'error');
        return;
    }
    
    if (password !== passwordConfirm) {
        showToast('As senhas nao coincidem', 'error');
        return;
    }
    
    if (password.length < 6) {
        showToast('A senha deve ter no minimo 6 caracteres', 'error');
        return;
    }
    
    showLoading('Criando conta...');
    
    try {
        // Tentar modo local primeiro
        if (typeof cadastrarUsuarioLocal !== 'undefined') {
            await cadastrarUsuarioLocal(nome, email, contato, loginUsuario, password);
            showToast('Conta criada com sucesso! Faca login.', 'success');
        } else {
            // Modo Firebase
            await cadastrarUsuario(nome, email, contato, loginUsuario, password);
        }
        
        // Limpar formulario
        document.getElementById('regNome').value = '';
        document.getElementById('regEmail').value = '';
        document.getElementById('regContato').value = '';
        document.getElementById('regLogin').value = '';
        document.getElementById('regPassword').value = '';
        document.getElementById('regPasswordConfirm').value = '';
        
        // Voltar para login
        setTimeout(() => {
            showLogin();
        }, 2000);
        
    } catch (error) {
        console.error('Erro no cadastro:', error);
        showToast(error.message || 'Erro ao criar conta', 'error');
    } finally {
        hideLoading();
    }
}

// Handler de recuperacao de senha
async function handleForgotPassword(event) {
    event.preventDefault();
    
    const email = document.getElementById('forgotEmail').value.trim();
    
    if (!email) {
        showToast('Digite seu email', 'error');
        return;
    }
    
    showLoading('Recuperando senha...');
    
    try {
        // Tentar modo local primeiro
        if (typeof recuperarSenhaLocal !== 'undefined') {
            await recuperarSenhaLocal(email);
        } else {
            // Modo Firebase
            await recuperarSenha(email);
        }
        
        // Limpar campo
        document.getElementById('forgotEmail').value = '';
        
        // Voltar para login
        setTimeout(() => {
            showLogin();
        }, 3000);
        
    } catch (error) {
        console.error('Erro ao recuperar senha:', error);
        showToast(error.message || 'Erro ao recuperar senha', 'error');
    } finally {
        hideLoading();
    }
}

// Toggle user menu
function toggleUserMenu() {
    const dropdown = document.getElementById('userMenuDropdown');
    dropdown.classList.toggle('hidden');
}

// Fechar dropdown ao clicar fora
document.addEventListener('click', (event) => {
    const userMenu = document.querySelector('.user-menu');
    const dropdown = document.getElementById('userMenuDropdown');
    
    if (userMenu && !userMenu.contains(event.target)) {
        dropdown?.classList.add('hidden');
    }
});

// Mostrar perfil do usuario
async function showProfile() {
    try {
        // Tentar modo local primeiro
        let userData;
        if (typeof getUserDataLocal !== 'undefined') {
            userData = getUserDataLocal();
        } else {
            // Modo Firebase (não implementado)
            userData = null;
        }
        
        if (!userData) {
            showToast('Erro ao carregar perfil', 'error');
            return;
        }
        
        const dataCadastro = userData.dataCadastro ? formatDate(userData.dataCadastro) : 'N/A';
        
        const html = `
            <div class="profile-container">
                <div class="profile-header">
                    <div class="profile-avatar">
                        <i class="fas fa-user-circle"></i>
                    </div>
                    <h3>${userData.nome}</h3>
                    <p class="profile-role">${userData.role === 'admin' ? 'Administrador' : 'Usuário'}</p>
                </div>
                
                <div class="profile-info">
                    <div class="info-item">
                        <i class="fas fa-envelope"></i>
                        <span>${userData.email}</span>
                    </div>
                    <div class="info-item">
                        <i class="fas fa-phone"></i>
                        <span>${userData.contato || 'N/A'}</span>
                    </div>
                    <div class="info-item">
                        <i class="fas fa-id-card"></i>
                        <span>${userData.loginUsuario}</span>
                    </div>
                    <div class="info-item">
                        <i class="fas fa-calendar"></i>
                        <span>Cadastrado em: ${dataCadastro}</span>
                    </div>
                </div>
            </div>
        `;
        
        document.getElementById('modalTitle').textContent = 'Meu Perfil';
        document.getElementById('modalBody').innerHTML = html;
        document.getElementById('modalContainer').classList.remove('hidden');
        
    } catch (error) {
        console.error('Erro ao carregar perfil:', error);
        showToast('Erro ao carregar perfil', 'error');
    }
}

// Mostrar configuracoes (admin only)
function showConfig() {
    // Verificar modo local ou Firebase
    const isAdminLocal = typeof verificarAdminLocal !== 'undefined' ? verificarAdminLocal() : verificarAdmin();
    if (!isAdminLocal) return;
    
    const html = `
        <div class="config-container">
            <h3>Configuracoes do Sistema</h3>
            
            <div class="config-section">
                <h4>Usuarios</h4>
                <button class="btn btn-primary" onclick="listarUsuarios()">
                    <i class="fas fa-users"></i> Gerenciar Usuarios
                </button>
            </div>
            
            <div class="config-section">
                <h4>Backup</h4>
                <button class="btn btn-success" onclick="realizarBackup()">
                    <i class="fas fa-database"></i> Realizar Backup Agora
                </button>
            </div>
            
            <div class="config-section">
                <h4>Sistema</h4>
                <p>Versao: 2.0</p>
                <p>${typeof localCurrentUser !== 'undefined' ? 'Modo Local/Demo' : 'Firebase Conectado'}</p>
                <p>Netlify Deploy: Automatico</p>
            </div>
        </div>
    `;
    
    document.getElementById('modalTitle').textContent = 'Configuracoes';
    document.getElementById('modalBody').innerHTML = html;
    document.getElementById('modalContainer').classList.remove('hidden');
}

// Formatar data
function formatDate(timestamp) {
    if (!timestamp) return 'N/A';
    
    let date;
    if (timestamp.toDate) {
        date = timestamp.toDate();
    } else {
        date = new Date(timestamp);
    }
    
    return date.toLocaleDateString('pt-BR');
}
