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
    } else {
        // Usuario admin padrao
        localUsers = [
            {
                uid: 'admin-local-001',
                nome: 'Administrador',
                email: 'admin@local.com',
                contato: '(00) 00000-0000',
                loginUsuario: 'admin',
                senha: 'admin123',
                role: 'admin',
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
        localIsAdmin = localCurrentUser.role === 'admin';
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
    const user = localUsers.find(u => (u.email === emailOrLogin || u.loginUsuario === emailOrLogin) && u.senha === password);
    
    if (!user) {
        throw new Error('Usuario ou senha incorretos');
    }
    
    if (!user.ativo) {
        throw new Error('Usuario inativo');
    }
    
    localCurrentUser = user;
    localIsAdmin = user.role === 'admin';
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
    } else {
        // Cadastro de Funcionário
        // Validar credenciais do gestor
        const manager = localUsers.find(u => u.loginUsuario === extraData.managerLogin && u.senha === extraData.managerPass);
        
        if (!manager) {
            throw new Error('Credenciais do gestor inválidas. Verifique o login e senha do administrador.');
        }
        
        if (manager.role !== 'admin') {
            throw new Error('O usuário informado não tem permissão de administrador.');
        }

        newUser.role = 'user';
        newUser.cargo = extraData.cargo;
        newUser.companyId = manager.companyId || 'comp-default'; // Vincular à empresa do gestor
        newUser.allowedModules = extraData.allowedModules || [];
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

// Inicializar modo local
document.addEventListener('DOMContentLoaded', () => {
    loadLocalUsers();
    loadLocalCurrentUser();
    
    console.log('Modo Local/Demo ativado!');
    console.log('Usuario admin padrao: admin@local.com / admin123');
});
