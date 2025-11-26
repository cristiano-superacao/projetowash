// Configuracao do Firebase
// IMPORTANTE: Substitua estas credenciais pelas suas do Firebase Console
const firebaseConfig = {
    apiKey: "SUA_API_KEY_AQUI",
    authDomain: "estoque-certo-ltda.firebaseapp.com",
    projectId: "estoque-certo-ltda",
    storageBucket: "estoque-certo-ltda.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abcdef123456",
    measurementId: "G-XXXXXXXXXX"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);

// Inicializar servicos
const auth = firebase.auth();
const db = firebase.firestore();

// Configurar persistencia
auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);

// Estado de autenticacao
let currentUser = null;
let isAdmin = false;

// Observador de autenticacao
auth.onAuthStateChanged(async (user) => {
    if (user) {
        currentUser = user;
        
        // Verificar se eh admin
        const userDoc = await db.collection('usuarios').doc(user.uid).get();
        if (userDoc.exists) {
            const userData = userDoc.data();
            isAdmin = userData.role === 'admin';
        }
        
        // Mostrar sistema
        showApp();
        loadDashboard();
    } else {
        currentUser = null;
        isAdmin = false;
        showAuth();
    }
});

// Funcao para mostrar tela de autenticacao
function showAuth() {
    document.getElementById('authContainer').classList.remove('hidden');
    document.getElementById('appContainer').classList.add('hidden');
}

// Funcao para mostrar aplicacao
function showApp() {
    document.getElementById('authContainer').classList.add('hidden');
    document.getElementById('appContainer').classList.remove('hidden');
    
    // Atualizar informacoes do usuario
    if (currentUser) {
        document.getElementById('userEmail').textContent = currentUser.email;
        
        // Mostrar menu admin se for admin
        if (isAdmin) {
            document.querySelectorAll('.admin-only').forEach(el => {
                el.classList.remove('hidden');
            });
        }
    }
}

// Funcao de login
async function login(email, password) {
    try {
        showLoading('Entrando no sistema...');
        const result = await auth.signInWithEmailAndPassword(email, password);
        hideLoading();
        showToast('Login realizado com sucesso!', 'success');
        return result.user;
    } catch (error) {
        hideLoading();
        let message = 'Erro ao fazer login';
        
        if (error.code === 'auth/user-not-found') {
            message = 'Usuario nao encontrado';
        } else if (error.code === 'auth/wrong-password') {
            message = 'Senha incorreta';
        } else if (error.code === 'auth/invalid-email') {
            message = 'Email invalido';
        }
        
        showToast(message, 'error');
        throw error;
    }
}

// Funcao de cadastro
async function cadastrarUsuario(nome, email, contato, loginUsuario, senha) {
    try {
        showLoading('Criando conta...');
        
        // Criar usuario no Authentication
        const result = await auth.createUserWithEmailAndPassword(email, senha);
        const user = result.user;
        
        // Atualizar display name
        await user.updateProfile({
            displayName: nome
        });
        
        // Salvar dados adicionais no Firestore
        await db.collection('usuarios').doc(user.uid).set({
            nome: nome,
            email: email,
            contato: contato,
            loginUsuario: loginUsuario,
            role: 'user',
            dataCadastro: firebase.firestore.FieldValue.serverTimestamp(),
            ativo: true
        });
        
        hideLoading();
        showToast('Cadastro realizado com sucesso!', 'success');
        return user;
    } catch (error) {
        hideLoading();
        let message = 'Erro ao criar conta';
        
        if (error.code === 'auth/email-already-in-use') {
            message = 'Este email ja esta cadastrado';
        } else if (error.code === 'auth/weak-password') {
            message = 'A senha deve ter no minimo 6 caracteres';
        } else if (error.code === 'auth/invalid-email') {
            message = 'Email invalido';
        }
        
        showToast(message, 'error');
        throw error;
    }
}

// Funcao de logout
async function logout() {
    try {
        showLoading('Saindo...');
        await auth.signOut();
        hideLoading();
        showToast('Logout realizado com sucesso!', 'success');
    } catch (error) {
        hideLoading();
        showToast('Erro ao fazer logout', 'error');
        throw error;
    }
}

// Funcao para recuperar senha
async function recuperarSenha(email) {
    try {
        showLoading('Enviando email...');
        await auth.sendPasswordResetEmail(email);
        hideLoading();
        showToast('Email de recuperacao enviado!', 'success');
    } catch (error) {
        hideLoading();
        let message = 'Erro ao enviar email';
        
        if (error.code === 'auth/user-not-found') {
            message = 'Usuario nao encontrado';
        } else if (error.code === 'auth/invalid-email') {
            message = 'Email invalido';
        }
        
        showToast(message, 'error');
        throw error;
    }
}

// Verificar se usuario eh admin
function verificarAdmin() {
    if (!isAdmin) {
        showToast('Acesso negado. Apenas administradores.', 'error');
        return false;
    }
    return true;
}

// Obter dados do usuario atual
async function getUserData() {
    if (!currentUser) return null;
    
    const doc = await db.collection('usuarios').doc(currentUser.uid).get();
    if (doc.exists) {
        return { id: doc.id, ...doc.data() };
    }
    return null;
}
