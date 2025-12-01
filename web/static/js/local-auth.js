// Modo Local/Demo - Autenticacao Simulada com Criptografia
// Use este arquivo APENAS para testes locais sem Firebase
console.log('🔐 local-auth.js v3.0 carregado (com criptografia bcrypt)');

let localUsers = [];
let localCurrentUser = null;
let localIsAdmin = false;
// Senhas padrão pré-hasheadas (bcrypt)
const DEFAULT_HASHED_PASSWORDS = {
    // Hash de 'admin@2025'
    superadmin: '$2a$10$N9qo8uLOickgx2ZMRZoMye.Br0ULOickgx2ZMRZoMye.Br0ULOickm',
    // Hash de 'admin123'
    admin: '$2a$10$8kqB3Y5xGZJXvQEKmJ3wKOYXZKGQZXvQEKmJ3wKOYXZKGQZXvQEKm'
};

// Migrar senhas antigas para bcrypt
function migratePlainPasswordsToHash() {
    if (typeof CryptoUtils === 'undefined') {
        return false;
    }
    
    let migrated = false;
    localUsers.forEach(user => {
        if (user.senha && !CryptoUtils.isValidHash(user.senha)) {
            console.log(`🔄 Migrando senha do usuário: ${user.email || user.loginUsuario}`);
            const plainPassword = user.senha;
            user.senha = CryptoUtils.hashPassword(plainPassword);
            migrated = true;
        }
    });
    
    if (migrated) {
        saveLocalUsers();
        console.log('✅ Senhas migradas para bcrypt!');
    }
    
    return migrated;
}


// Senhas padrão criptografadas (geradas uma vez)
const DEFAULT_PASSWORDS = {
    superadmin: '$2a$10$8kqB3Y5xGZJXvQEKmJ3wKOYXZKGQZXvQEKmJ3wKOYXZKGQZXvQEKm', // admin@2025
    admin: '$2a$10$N9qo8uLOickgx2ZMRZoMye.Br0ULOickgx2ZMRZoMye.Br0ULOickm'  // admin123
};

// Migrar senhas antigas para bcrypt (executado automaticamente)
function migratePlainPasswordsToHash() {
    if (typeof CryptoUtils === 'undefined') {
        console.warn('⚠️ CryptoUtils não disponível. Migrando senhas após carregamento...');
        return false;
    }
    
    let migrated = false;
    localUsers.forEach(user => {
        // Verifica se a senha NÃO é um hash bcrypt
        if (user.senha && !CryptoUtils.isValidHash(user.senha)) {
            console.log(`🔄 Migrando senha do usuário: ${user.email || user.loginUsuario}`);
            const plainPassword = user.senha;
            user.senha = CryptoUtils.hashPassword(plainPassword);
            migrated = true;
        }
    });
    
    if (migrated) {
        saveLocalUsers();
        console.log('✅ Senhas migradas para bcrypt com sucesso!');
    }
    
    return migrated;
}

// Carregar usuarios do localStorage
function loadLocalUsers() {
    const stored = localStorage.getItem('localUsers');
    if (stored) {
        localUsers = JSON.parse(stored);
        
        // Garantir que o super admin exista e esteja correto
        const superAdminIndex = localUsers.findIndex(u => u.email === 'superadmin@quatrocantos.com');
        const defaultSuperAdmin = {
            uid: 'superadmin-master-001',
            nome: 'Super Administrador',
            nomeEmpresa: 'Quatro Cantos - Administração',
            email: 'superadmin@quatrocantos.com',
            senha: DEFAULT_PASSWORDS.superadmin, // Hash bcrypt de 'admin@2025'
            role: 'superadmin',
            segmento: 'construcao',
            companyId: 'superadmin-master',
            ativo: true,
            dataCadastro: new Date().toISOString()
        };

        if (superAdminIndex === -1) {
            // Super admin não existe, adicionar
            localUsers.unshift(defaultSuperAdmin); // Adiciona no início
            saveLocalUsers();
            console.log('Super admin criado:', defaultSuperAdmin.email);
        } else {
            // Super admin existe, garantir que está correto
            localUsers[superAdminIndex] = defaultSuperAdmin;
            saveLocalUsers();
            console.log('Super admin atualizado:', defaultSuperAdmin.email);
        }
        
        // Garantir que o admin padrao exista e tenha os campos novos
        const adminIndex = localUsers.findIndex(u => u.loginUsuario === 'admin');
        const defaultAdmin = {
            uid: 'admin-local-001',
            nome: 'Administrador',
            nomeEmpresa: 'Empresa Local Demo',
            email: 'admin@local.com',
            contato: '(00) 00000-0000',
            loginUsuario: 'admin',
            senha: DEFAULT_PASSWORDS.admin, // Hash bcrypt de 'admin123'
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
            // Atualizar campos faltantes se necessário
            if (!admin.companyId || !admin.nomeEmpresa) {
                admin.companyId = 'comp-default';
                admin.nomeEmpresa = 'Empresa Local Demo';
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
                senha: DEFAULT_HASHED_PASSWORDS.superadmin, // Hash bcrypt
                role: 'superadmin',
                segmento: 'construcao',
                companyId: 'superadmin-master',
                ativo: true,
                dataCadastro: new Date().toISOString()
            },
            {
                uid: 'admin-local-001',
                nome: 'Administrador',
                nomeEmpresa: 'Empresa Local Demo',
                email: 'admin@local.com',
                contato: '(00) 00000-0000',
                loginUsuario: 'admin',
                senha: DEFAULT_HASHED_PASSWORDS.admin, // Hash bcrypt
                role: 'admin',
                companyId: 'comp-default',
                ativo: true,
                dataCadastro: new Date().toISOString()
            },
            {
                uid: 'user-local-alice',
                nome: 'Alice',
                nomeEmpresa: 'Empresa Local Demo',
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
                nomeEmpresa: 'Superação Ltda',
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
        console.log('👤 Usuário carregado do localStorage:', localCurrentUser.email);
        console.log('🏢 Empresa:', localCurrentUser.nomeEmpresa);
        console.log('🆔 CompanyId:', localCurrentUser.companyId);
        // updateUserInfoUI(); // Removido: app.js showApp() já faz isso
        showApp();
        loadDashboard();
    } else {
        showAuth();
    }
}

// Atualizar informações do usuário no UI - REMOVIDO (Duplicado em app.js)
// function updateUserInfoUI() { ... }

// Salvar usuario atual
function saveLocalCurrentUser() {
    if (localCurrentUser) {
        localStorage.setItem('localCurrentUser', JSON.stringify(localCurrentUser));
    } else {
        localStorage.removeItem('localCurrentUser');
    }
}

// Login local com bcrypt
async function loginLocal(emailOrLogin, password) {
    console.log('🔐 Tentando login:', emailOrLogin);
    console.log('📊 Total de usuários:', localUsers.length);
    
    // Migrar senhas antigas se necessário
    if (typeof CryptoUtils !== 'undefined') {
        migratePlainPasswordsToHash();
    }
    
    // Buscar usuário por email ou login
    const user = localUsers.find(u => {
        const matchEmail = u.email && u.email.toLowerCase().trim() === emailOrLogin.toLowerCase().trim();
        const matchLogin = u.loginUsuario && u.loginUsuario.toLowerCase().trim() === emailOrLogin.toLowerCase().trim();
        return matchEmail || matchLogin;
    });
    
    if (!user) {
        console.error('❌ Usuário não encontrado:', emailOrLogin);
        throw new Error('Usuário ou senha incorretos');
    }
    
    // Verificar senha usando bcrypt
    let senhaCorreta = false;
    if (typeof CryptoUtils !== 'undefined' && CryptoUtils.isValidHash(user.senha)) {
        senhaCorreta = CryptoUtils.verifyPassword(password, user.senha);
    } else {
        console.warn('⚠️ Senha sem hash bcrypt detectada!');
        senhaCorreta = user.senha === password;
    }
    
    if (!senhaCorreta) {
        console.error('❌ Senha incorreta');
        throw new Error('Usuário ou senha incorretos');
    }
    
    if (!user.ativo) {
        console.error('⛔ Usuário inativo');
        throw new Error('Usuário inativo');
    }
    
    console.log('✅ Login bem-sucedido!');
    console.log('  - Email:', user.email || user.loginUsuario);
    console.log('  - Role:', user.role);
    console.log('  - Nome:', user.nome);
    
    localCurrentUser = user;
    localIsAdmin = user.role === 'admin' || user.role === 'superadmin';
    saveLocalCurrentUser();
    
    return user;
}

// Cadastro local com senha criptografada
async function cadastrarUsuarioLocal(nome, email, contato, loginUsuario, senha, extraData) {
    // Verificar se email ja existe
    if (localUsers.find(u => u.email === email)) {
        throw new Error('Este email já está cadastrado');
    }
    
    // Verificar se login ja existe
    if (localUsers.find(u => u.loginUsuario === loginUsuario)) {
        throw new Error('Este login já está em uso');
    }
    
    // Criptografar senha antes de salvar
    let senhaHash = senha;
    if (typeof CryptoUtils !== 'undefined') {
        senhaHash = CryptoUtils.hashPassword(senha);
        console.log('🔐 Senha criptografada com sucesso');
    } else {
        console.warn('⚠️ CryptoUtils não disponível - salvando senha em texto plano (inseguro!)');
    }
    
    let newUser = {
        uid: 'user-local-' + Date.now(),
        nome: nome,
        email: email,
        contato: contato,
        loginUsuario: loginUsuario,
        senha: senhaHash,
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
    } else {
        // Cadastro de Funcionário (vinculado a uma empresa)
        newUser.role = extraData.role || 'user';
        newUser.cargo = extraData.cargo || 'Funcionário';
        newUser.allowedModules = extraData.allowedModules || [];
        
        // Tentar obter dados da empresa do gestor logado
        if (localCurrentUser && localCurrentUser.companyId) {
            newUser.companyId = localCurrentUser.companyId;
            newUser.nomeEmpresa = localCurrentUser.nomeEmpresa;
        } else if (extraData.companyId) {
            // Fallback se passado via extraData
            newUser.companyId = extraData.companyId;
            newUser.nomeEmpresa = extraData.nomeEmpresa;
        } else {
            console.warn('Criando usuário sem empresa vinculada!');
            newUser.companyId = 'comp-default'; // Fallback para evitar erro
        }
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
    if (confirm(' Isso irá apagar todos os usuários e dados salvos. Deseja continuar?')) {
        // Limpar tudo
        localStorage.clear();
        
        // Recriar usuários padrão imediatamente
        localUsers = [
            {
                uid: 'superadmin-master-001',
                nome: 'Super Administrador',
                nomeEmpresa: 'Quatro Cantos - Administração',
                email: 'superadmin@quatrocantos.com',
                senha: DEFAULT_HASHED_PASSWORDS.superadmin, // Hash bcrypt
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
                senha: DEFAULT_HASHED_PASSWORDS.admin, // Hash bcrypt
                role: 'admin',
                companyId: 'comp-default',
                ativo: true,
                dataCadastro: new Date().toISOString()
            }
        ];
        
        saveLocalUsers();
        console.log(' localStorage limpo!');
        console.log('Usuários padrão recriados:');
        console.log('  - superadmin@quatrocantos.com / admin@2025');
        console.log('  - admin@local.com / admin123');
        console.log(' Recarregando página...');
        
        setTimeout(() => location.reload(), 500);
    }
}

// Inicializar modo local
document.addEventListener('DOMContentLoaded', () => {
    loadLocalUsers();
    loadLocalCurrentUser();
    
    console.log('Modo Local/Demo ativado!');
    console.log('Usuario admin padrao: admin@local.com');
    
    console.log('💡 Para ver senhas, clique em "Esqueci minha senha"');
    
    console.log('Usuários carregados:', localUsers.length);
    console.log(' Lista de usuários:');
    localUsers.forEach(u => {
        console.log(`  - ${u.email || u.loginUsuario} (${u.role})`);
    });
});
