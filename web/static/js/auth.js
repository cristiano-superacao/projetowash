// Funcoes de autenticacao UI

// Login rápido com credenciais pré-definidas
async function loginRapido(tipo) {
    const credenciais = {
        'superadmin': {
            email: 'superadmin@quatrocantos.com',
            senha: 'admin@2025'
        },
        'admin': {
            email: 'admin@local.com',
            senha: 'admin123'
        }
    };
    
    const cred = credenciais[tipo];
    if (!cred) return;
    
    // Preencher campos
    document.getElementById('loginEmail').value = cred.email;
    document.getElementById('loginPassword').value = cred.senha;
    
    // Fazer login
    showLoading(`Entrando como ${tipo === 'superadmin' ? 'Super Admin' : 'Admin'}...`);
    
    try {
        if (typeof loginLocal !== 'undefined') {
            await loginLocal(cred.email, cred.senha);
            window.location.reload();
        }
    } catch (error) {
        console.error('Erro no login rápido:', error);
        showToast(error.message || 'Erro ao entrar', 'error');
    } finally {
        hideLoading();
    }
}

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
    // Sempre cadastro de empresa - campos já estão visíveis por padrão
}

// Handler de login
async function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;
    
    if (!email || !password) {
        showToast('Preencha email e senha', 'error');
        return;
    }
    
    showLoading('Entrando...');
    
    try {
        // Tentar modo local primeiro
        if (typeof loginLocal !== 'undefined') {
            await loginLocal(email, password);
            // Recarregar a página para inicializar o app corretamente com o usuário logado
            window.location.reload();
            return;
        } else {
            // Modo Firebase
            await login(email, password);
        }
        
    } catch (error) {
        console.error('Erro no login:', error);
        showToast(error.message || 'Erro ao entrar', 'error');
    } finally {
        hideLoading();
    }
}

// Handler de cadastro
async function handleRegister(event) {
    event.preventDefault();
    
    const type = document.getElementById('regType').value;
    const nome = document.getElementById('regNome').value.trim();
    const email = document.getElementById('regEmail').value.trim();
    const contato = document.getElementById('regContato').value.trim();
    const loginUsuario = document.getElementById('regLogin').value.trim();
    const password = document.getElementById('regPassword').value;
    const passwordConfirm = document.getElementById('regPasswordConfirm').value;
    
    // Validacoes Comuns
    if (!nome || !email || !contato || !loginUsuario || !password || !passwordConfirm) {
        showToast('Preencha todos os campos obrigatórios', 'error');
        return;
    }
    
    if (password !== passwordConfirm) {
        showToast('As senhas não coincidem', 'error');
        return;
    }
    
    if (password.length < 6) {
        showToast('A senha deve ter no mínimo 6 caracteres', 'error');
        return;
    }

    // Dados específicos - sempre empresa
    const nomeEmpresa = document.getElementById('regNomeEmpresa').value.trim();
    const segmento = document.getElementById('regSegmento').value.trim();
    
    if (!nomeEmpresa) {
        showToast('Nome da empresa é obrigatório', 'error');
        return;
    }
    
    if (!segmento) {
        showToast('Selecione o segmento da empresa', 'error');
        return;
    }
    
    const extraData = { 
        nomeEmpresa,
        segmento,
        role: 'admin' 
    };
    
    showLoading('Criando empresa...');
    
    try {
        // Tentar modo local primeiro
        const isFirebaseActive = typeof firebaseInitialized !== 'undefined' && firebaseInitialized;
        
        if (typeof cadastrarUsuarioLocal !== 'undefined' && !isFirebaseActive) {
            await cadastrarUsuarioLocal(nome, email, contato, loginUsuario, password, extraData);
            showToast('Cadastro realizado com sucesso!', 'success');
        } else {
            // Modo Firebase
            await cadastrarUsuario(nome, email, contato, loginUsuario, password, extraData);
        }
        
        // Limpar formulario
        document.querySelector('.auth-form').reset();
        
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
                    <p class="profile-role">${userData.role === 'admin' ? 'Administrador' : (userData.cargo || 'Usuário')}</p>
                </div>
                
                <div class="profile-info">
                    <div class="info-item">
                        <i class="fas fa-envelope"></i>
                        <span>${userData.email}</span>
                    </div>
                    <div class="info-item">
                        <i class="fas fa-briefcase"></i>
                        <span>${userData.cargo || 'N/A'}</span>
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
            
            <div class="config-grid">
                <div class="config-card">
                    <div class="config-icon blue">
                        <i class="fas fa-users"></i>
                    </div>
                    <div class="config-info">
                        <h4>Gerenciar Usuários</h4>
                        <p>Adicionar, editar ou remover usuários do sistema.</p>
                        <button class="btn btn-primary btn-sm" onclick="listarUsuarios()">
                            Acessar
                        </button>
                    </div>
                </div>
                
                <div class="config-card">
                    <div class="config-icon green">
                        <i class="fas fa-database"></i>
                    </div>
                    <div class="config-info">
                        <h4>Backup de Dados</h4>
                        <p>Realizar backup completo dos dados.</p>
                        <button class="btn btn-success btn-sm" onclick="realizarBackup()">
                            Realizar Backup
                        </button>
                    </div>
                </div>
            </div>
            
            <div class="system-info mt-3">
                <h4>Informações do Sistema</h4>
                <div class="info-grid">
                    <div class="info-item">
                        <strong>Versão:</strong> 2.0
                    </div>
                    <div class="info-item">
                        <strong>Modo:</strong> ${typeof localCurrentUser !== 'undefined' ? 'Local/Demo' : 'Online (Firebase)'}
                    </div>
                    <div class="info-item">
                        <strong>Deploy:</strong> Netlify (Automático)
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.getElementById('modalTitle').textContent = 'Configurações';
    document.getElementById('modalBody').innerHTML = html;
    document.getElementById('modalContainer').classList.remove('hidden');
}

// Listar usuarios (Admin)
function listarUsuarios() {
    // Verificar permissao
    const isAdminLocal = typeof verificarAdminLocal !== 'undefined' ? verificarAdminLocal() : verificarAdmin();
    if (!isAdminLocal) return;

    let users = [];
    if (typeof localUsers !== 'undefined') {
        users = localUsers;
    } else {
        // TODO: Implementar busca do Firebase
        showToast('Funcionalidade disponível apenas no modo local por enquanto.', 'warning');
        return;
    }

    const html = `
        <div class="users-manager">
            <div class="manager-header">
                <h3>Gerenciar Usuários</h3>
                <button class="btn btn-success btn-sm" onclick="showAddUser()">
                    <i class="fas fa-plus"></i> Novo Usuário
                </button>
            </div>
            
            <div class="table-responsive">
                <table class="users-table">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Email/Login</th>
                            <th>Cargo</th>
                            <th>Status</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${users.map(user => `
                            <tr>
                                <td>
                                    <div class="user-cell">
                                        <div class="user-avatar-small">${user.nome.charAt(0).toUpperCase()}</div>
                                        <div>
                                            <div class="user-name">${user.nome}</div>
                                            <div class="user-role-badge ${user.role === 'admin' ? 'admin' : 'user'}">${user.role === 'admin' ? 'ADMIN' : 'USER'}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div>${user.email}</div>
                                    <small class="text-muted">${user.loginUsuario}</small>
                                </td>
                                <td>${user.cargo || '-'}</td>
                                <td>
                                    <span class="status-badge ${user.ativo ? 'active' : 'inactive'}">
                                        ${user.ativo ? 'Ativo' : 'Inativo'}
                                    </span>
                                </td>
                                <td>
                                    <div class="action-buttons">
                                        <button class="btn-icon edit" onclick="editarUsuario('${user.uid}')" title="Editar">
                                            <i class="fas fa-edit"></i>
                                        </button>
                                        ${user.uid !== localCurrentUser.uid ? `
                                        <button class="btn-icon delete" onclick="excluirUsuario('${user.uid}')" title="Excluir">
                                            <i class="fas fa-trash"></i>
                                        </button>
                                        <button class="btn-icon toggle" onclick="toggleStatusUsuario('${user.uid}')" title="${user.ativo ? 'Desativar' : 'Ativar'}">
                                            <i class="fas fa-${user.ativo ? 'ban' : 'check'}"></i>
                                        </button>
                                        ` : ''}
                                    </div>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
            
            <div class="manager-footer">
                <button class="btn btn-secondary" onclick="showConfig()">
                    <i class="fas fa-arrow-left"></i> Voltar
                </button>
            </div>
        </div>
    `;

    document.getElementById('modalTitle').textContent = 'Usuários';
    document.getElementById('modalBody').innerHTML = html;
}

// Mostrar formulario de adicionar usuario (Admin)
function showAddUser() {
    const html = `
        <div class="add-user-form">
            <div class="manager-header">
                <h3>Novo Usuário</h3>
            </div>
            
            <form onsubmit="handleAddUser(event)">
                <div class="form-group">
                    <label for="newNome">Nome Completo</label>
                    <input type="text" id="newNome" required placeholder="Nome do funcionário">
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="newEmail">Email</label>
                        <input type="email" id="newEmail" required placeholder="email@empresa.com">
                    </div>
                    <div class="form-group">
                        <label for="newContato">Contato</label>
                        <input type="tel" id="newContato" required placeholder="(00) 00000-0000">
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="newCargo">Cargo</label>
                        <select id="newCargo" class="form-select" required>
                            <option value="">Selecione...</option>
                            <option value="Financeiro">Financeiro</option>
                            <option value="Estoque">Estoque</option>
                            <option value="RH">Recursos Humanos</option>
                            <option value="Administrativo">Administrativo</option>
                            <option value="Operacional">Operacional</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="newLogin">Login</label>
                        <input type="text" id="newLogin" required placeholder="usuario.login">
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="newPassword">Senha</label>
                        <input type="password" id="newPassword" required placeholder="Mínimo 6 caracteres">
                    </div>
                    <div class="form-group">
                        <label for="newPasswordConfirm">Confirmar Senha</label>
                        <input type="password" id="newPasswordConfirm" required placeholder="Repita a senha">
                    </div>
                </div>
                
                <div class="form-group">
                    <label>Módulos Permitidos:</label>
                    <div class="modules-checkbox-grid">
                        <label><input type="checkbox" name="newModules" value="operacional" checked> Operacional</label>
                        <label><input type="checkbox" name="newModules" value="estoque-entrada"> Entrada</label>
                        <label><input type="checkbox" name="newModules" value="estoque-saida"> Saída</label>
                        <label><input type="checkbox" name="newModules" value="financeiro"> Financeiro</label>
                        <label><input type="checkbox" name="newModules" value="rh"> RH</label>
                        <label><input type="checkbox" name="newModules" value="visualizar" checked> Visualizar</label>
                    </div>
                </div>
                
                <div class="button-group" style="justify-content: flex-end;">
                    <button type="button" class="btn btn-secondary" onclick="listarUsuarios()">
                        Cancelar
                    </button>
                    <button type="submit" class="btn btn-success">
                        <i class="fas fa-save"></i> Salvar Usuário
                    </button>
                </div>
            </form>
        </div>
    `;
    
    document.getElementById('modalBody').innerHTML = html;
}

// Handler para adicionar usuario
async function handleAddUser(event) {
    event.preventDefault();
    
    const nome = document.getElementById('newNome').value.trim();
    const email = document.getElementById('newEmail').value.trim();
    const contato = document.getElementById('newContato').value.trim();
    const cargo = document.getElementById('newCargo').value;
    const loginUsuario = document.getElementById('newLogin').value.trim();
    const password = document.getElementById('newPassword').value;
    const passwordConfirm = document.getElementById('newPasswordConfirm').value;
    
    if (password !== passwordConfirm) {
        showToast('As senhas não coincidem', 'error');
        return;
    }
    
    if (password.length < 6) {
        showToast('A senha deve ter no mínimo 6 caracteres', 'error');
        return;
    }
    
    // Coletar módulos
    const modules = [];
    document.querySelectorAll('input[name="newModules"]:checked').forEach(cb => {
        modules.push(cb.value);
    });
    
    showLoading('Cadastrando...');
    
    try {
        // Usar credenciais do admin logado para autorizar
        const extraData = {
            cargo: cargo,
            role: 'user',
            managerLogin: localCurrentUser.loginUsuario,
            managerPass: localCurrentUser.senha,
            allowedModules: modules
        };
        
        await cadastrarUsuarioLocal(nome, email, contato, loginUsuario, password, extraData);
        
        showToast('Usuário cadastrado com sucesso!', 'success');
        listarUsuarios(); // Voltar para a lista
        
    } catch (error) {
        console.error('Erro ao cadastrar:', error);
        showToast(error.message || 'Erro ao cadastrar usuário', 'error');
    } finally {
        hideLoading();
    }
}

// Editar usuario (Mock)
function editarUsuario(uid) {
    showToast('Funcionalidade de edição em desenvolvimento.', 'info');
}

// Excluir usuario
function excluirUsuario(uid) {
    if (!confirm('Tem certeza que deseja excluir este usuário?')) return;
    
    if (typeof localUsers !== 'undefined') {
        const index = localUsers.findIndex(u => u.uid === uid);
        if (index !== -1) {
            localUsers.splice(index, 1);
            saveLocalUsers();
            listarUsuarios(); // Recarregar lista
            showToast('Usuário excluído com sucesso.', 'success');
        }
    }
}

// Alternar status usuario
function toggleStatusUsuario(uid) {
    if (typeof localUsers !== 'undefined') {
        const user = localUsers.find(u => u.uid === uid);
        if (user) {
            user.ativo = !user.ativo;
            saveLocalUsers();
            listarUsuarios(); // Recarregar lista
            showToast(`Usuário ${user.ativo ? 'ativado' : 'desativado'} com sucesso.`, 'success');
        }
    }
}


