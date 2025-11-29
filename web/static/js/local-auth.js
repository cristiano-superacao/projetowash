// Modo Local/Demo - Autenticacao Simulada
// Use este arquivo APENAS para testes locais sem Firebase

let localUsers = [];
let localCurrentUser = null;
let localIsAdmin = false;

// Carregar usuarios do localStorage
function loadLocalUsers() {
    const stored = localStorage.getItem('localUsers');
    if (stored) {
        localUsers = JSON.parse(stored);
        
        // Garantir que o super admin exista
        const superAdminIndex = localUsers.findIndex(u => u.email === 'superadmin@quatrocantos.com');
        const defaultSuperAdmin = {
            uid: 'superadmin-master-001',
            nome: 'Super Administrador',
            nomeEmpresa: 'Quatro Cantos - Administração',
            email: 'superadmin@quatrocantos.com',
            senha: 'admin@2025',
            role: 'superadmin',
            segmento: 'construcao',
            companyId: 'superadmin-master',
            ativo: true,
            dataCadastro: new Date().toISOString()
        };

        if (superAdminIndex === -1) {
            localUsers.push(defaultSuperAdmin);
            saveLocalUsers();
        }
        
        // Garantir que o admin padrao exista e tenha os campos novos
        const adminIndex = localUsers.findIndex(u => u.loginUsuario === 'admin');
        const defaultAdmin = {
            uid: 'admin-local-001',
            nome: 'Administrador',
            email: 'admin@local.com',
            contato: '(00) 00000-0000',
            loginUsuario: 'admin',
            senha: 'admin123',
            role: 'admin',
            companyId: 'comp-default',
            ativo: true,
            dataCadastro: new Date().toISOString()
        };

        if (adminIndex === -1) {
            localUsers.push(defaultAdmin);
            saveLocalUsers();
        } else {
            const admin = localUsers[adminIndex];
            if (!admin.companyId) {
                admin.companyId = 'comp-default';
                localUsers[adminIndex] = admin;
                saveLocalUsers();
            }
        }
    } else {
        // Usuarios padroes: super admin e admin
        localUsers = [
            {
                uid: 'superadmin-master-001',
                nome: 'Super Administrador',
                nomeEmpresa: 'Quatro Cantos - Administração',
                email: 'superadmin@quatrocantos.com',
                senha: 'admin@2025',
                role: 'superadmin',
                segmento: 'construcao',
                companyId: 'superadmin-master',
                ativo: true,
                dataCadastro: new Date().toISOString()
            },
            {
                uid: 'admin-local-001',
                nome: 'Administrador',
                email: 'admin@local.com',
                contato: '(00) 00000-0000',
                loginUsuario: 'admin',
                senha: 'admin123',
                role: 'admin',
                companyId: 'comp-default',
                ativo: true,
                dataCadastro: new Date().toISOString()
            },
            {
                uid: 'user-local-alice',
                nome: 'Alice',
                email: 'alice@gmail.com',
                contato: '(11) 99999-9999',
                loginUsuario: 'alice',
                senha: '123', // Senha padrão simples
                role: 'admin', // Dando permissão de admin para facilitar testes
                companyId: 'comp-default',
                cargo: 'Diretor',
                ativo: true,
                dataCadastro: new Date().toISOString()
            },
            {
                uid: 'user-local-superacao',
                nome: 'Cristiano Superacao',
                email: 'superacao@gmail.com',
                contato: '(00) 00000-0000',
                loginUsuario: 'superacao',
                senha: '123',
                role: 'admin',
                companyId: 'comp-superacao',
                cargo: 'CEO',
                ativo: true,
                dataCadastro: new Date().toISOString()
            }
        ];
        saveLocalUsers();
    }
}

// Salvar usuarios no localStorage
function saveLocalUsers() {
    localStorage.setItem('localUsers', JSON.stringify(localUsers));
}

// Carregar usuario atual
function loadLocalCurrentUser() {
    const stored = localStorage.getItem('localCurrentUser');
    if (stored) {
        localCurrentUser = JSON.parse(stored);
        localIsAdmin = localCurrentUser.role === 'admin' || localCurrentUser.role === 'superadmin';
        showApp();
        loadDashboard();
    } else {
        showAuth();
    }
}

// Salvar usuario atual
function saveLocalCurrentUser() {
    if (localCurrentUser) {
        localStorage.setItem('localCurrentUser', JSON.stringify(localCurrentUser));
    } else {
        localStorage.removeItem('localCurrentUser');
    }
}

// Login local
async function loginLocal(emailOrLogin, password) {
    console.log('🔍 Tentando login:', emailOrLogin);
    console.log('📋 Usuários disponíveis:', localUsers.length);
    
    // Debug: mostrar emails/logins disponíveis
    localUsers.forEach(u => {
        console.log(`  - ${u.email || u.loginUsuario} (role: ${u.role})`);
    });
    
    const user = localUsers.find(u => {
        const emailMatch = u.email === emailOrLogin;
        const loginMatch = u.loginUsuario === emailOrLogin;
        const senhaMatch = u.senha === password;
        
        console.log(`Verificando ${u.email || u.loginUsuario}:`, {
            emailMatch,
            loginMatch,
            senhaMatch,
            senhaEsperada: u.senha,
            senhaRecebida: password
        });
        
        return (emailMatch || loginMatch) && senhaMatch;
    });
    
    if (!user) {
        console.error('❌ Usuário não encontrado ou senha incorreta');
        throw new Error('Usuario ou senha incorretos');
    }
    
    if (!user.ativo) {
        console.error('❌ Usuário inativo');
        throw new Error('Usuario inativo');
    }
    
    console.log('✅ Login bem-sucedido:', user.email, '- Role:', user.role);
    localCurrentUser = user;
    localIsAdmin = user.role === 'admin' || user.role === 'superadmin';
    saveLocalCurrentUser();
    
    return user;
}

// Cadastro local
async function cadastrarUsuarioLocal(nome, email, contato, loginUsuario, senha, extraData) {
    // Verificar se email ja existe
    if (localUsers.find(u => u.email === email)) {
        throw new Error('Este email já está cadastrado');
    }
    
    // Verificar se login ja existe
    if (localUsers.find(u => u.loginUsuario === loginUsuario)) {
        throw new Error('Este login já está em uso');
    }
    
    let newUser = {
        uid: 'user-local-' + Date.now(),
        nome: nome,
        email: email,
        contato: contato,
        loginUsuario: loginUsuario,
        senha: senha,
        ativo: true,
        dataCadastro: new Date().toISOString()
    };

    if (extraData.role === 'admin') {
        // Cadastro de Empresa
        newUser.role = 'admin';
        newUser.cargo = 'Administrador';
        newUser.nomeEmpresa = extraData.nomeEmpresa;
        newUser.companyId = 'comp-' + Date.now(); // Gerar ID da empresa
        newUser.allowedModules = ['operacional', 'estoque-entrada', 'estoque-saida', 'financeiro', 'rh', 'visualizar'];
    }
    
    localUsers.push(newUser);
    saveLocalUsers();
    
    return newUser;
}

// Logout local
function logoutLocal() {
    localCurrentUser = null;
    localIsAdmin = false;
    saveLocalCurrentUser();
}

// Recuperar senha local
async function recuperarSenhaLocal(email) {
    const user = localUsers.find(u => u.email === email);
    
    if (!user) {
        throw new Error('Usuario nao encontrado');
    }
    
    // Em modo local, apenas mostra a senha
    alert('Sua senha e: ' + user.senha + '\n\n(Em producao com Firebase, seria enviado email)');
}

// Obter dados do usuario atual
function getUserDataLocal() {
    return localCurrentUser;
}

// Verificar se e admin
function verificarAdminLocal() {
    if (!localIsAdmin) {
        showToast('Acesso negado. Apenas administradores.', 'error');
        return false;
    }
    return true;
}

// Resetar localStorage (útil para debug)
function resetLocalStorage() {
    if (confirm('⚠️ Isso irá apagar todos os usuários e dados salvos. Deseja continuar?')) {
        localStorage.removeItem('localUsers');
        localStorage.removeItem('localCurrentUser');
        console.log('🔄 localStorage limpo! Recarregando página...');
        location.reload();
    }
}

// Inicializar modo local
document.addEventListener('DOMContentLoaded', () => {
    loadLocalUsers();
    loadLocalCurrentUser();
    
    console.log('Modo Local/Demo ativado!');
    console.log('Usuario admin padrao: admin@local.com / admin123');
    console.log('Super Admin: superadmin@quatrocantos.com / admin@2025');
    console.log('✅ Usuários carregados:', localUsers.length);
    console.log('📋 Lista de usuários:');
    localUsers.forEach(u => {
        console.log(`  - ${u.email || u.loginUsuario} (${u.role}) - Senha: ${u.senha}`);
    });
});
    console.log('Usuario admin padrao: admin@local.com / admin123');
});
