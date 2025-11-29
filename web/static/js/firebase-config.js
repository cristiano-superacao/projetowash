// ===== CONFIGURAÇÃO DO FIREBASE =====
// IMPORTANTE: Estas são credenciais de DEMONSTRAÇÃO
// Para usar em produção, crie seu projeto em: https://console.firebase.google.com
// e substitua pelas suas credenciais reais
const firebaseConfig = {
    apiKey: "AIzaSyDemo_QuatroCantos_2025",
    authDomain: "quatro-cantos-demo.firebaseapp.com",
    projectId: "quatro-cantos-demo",
    storageBucket: "quatro-cantos-demo.appspot.com",
    messagingSenderId: "123456789012",
    appId: "1:123456789012:web:demo123456789",
    measurementId: "G-DEMO123456"
};

// Inicializar Firebase
let auth, db;
let firebaseInitialized = false;

try {
    if (firebaseConfig.apiKey.startsWith("AIza")) {
        firebase.initializeApp(firebaseConfig);
        auth = firebase.auth();
        db = firebase.firestore();
        auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
        firebaseInitialized = true;
        console.log("✅ Firebase inicializado! (Modo: " + (firebaseConfig.apiKey.includes("Demo") ? "DEMONSTRAÇÃO" : "PRODUÇÃO") + ")");
    } else {
        console.warn("⚠️ Firebase não configurado. Usando modo local offline.");
        console.info("Para ativar Firebase: Configure em firebase-config.js");
    }
} catch (e) {
    console.error("❌ Erro ao inicializar Firebase:", e);
    console.warn("Usando modo local como fallback");
}

// Estado de autenticacao
let currentUser = null;
let isAdmin = false;

// Observador de autenticacao (apenas se Firebase estiver ativo)
if (firebaseInitialized) {
    auth.onAuthStateChanged(async (user) => {
        if (user) {
            currentUser = user;
            
            // Verificar se eh admin
            try {
                const userDoc = await db.collection('usuarios').doc(user.uid).get();
                if (userDoc.exists) {
                    const userData = userDoc.data();
                    isAdmin = userData.role === 'admin';
                    // Attach companyId to currentUser for easy access
                    currentUser.companyId = userData.companyId;
                    currentUser.role = userData.role;
                    currentUser.cargo = userData.cargo;
                    currentUser.allowedModules = userData.allowedModules;
                }
            } catch (e) {
                console.error("Erro ao buscar dados do usuário", e);
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
}

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
    if (!firebaseInitialized) {
        throw new Error("Firebase não configurado. Use o modo local.");
    }
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
async function cadastrarUsuario(nome, email, contato, loginUsuario, senha, extraData = {}) {
    if (!firebaseInitialized) {
        throw new Error("Firebase não configurado. Use o modo local.");
    }
    try {
        showLoading('Criando conta...');
        
        // Sempre cadastro de empresa (admin)
        const role = 'admin';
        
        // Criar usuario no Authentication
        const result = await auth.createUserWithEmailAndPassword(email, senha);
        const user = result.user;
        
        // Se for admin (nova empresa), o ID da empresa é o próprio UID do usuário
        if (role === 'admin') {
            companyId = user.uid;
        }
        
        // Atualizar display name
        await user.updateProfile({
            displayName: nome
        });
        
        // Gerar ID da empresa (usar o UID do usuário como companyId)
        const companyId = user.uid;
        
        // Salvar dados adicionais no Firestore
        await db.collection('usuarios').doc(user.uid).set({
            nome: nome,
            email: email,
            contato: contato,
            loginUsuario: loginUsuario,
            role: 'admin',
            companyId: companyId,
            cargo: 'Administrador',
            nomeEmpresa: extraData.nomeEmpresa || '',
            segmento: extraData.segmento || '',
            allowedModules: ['operacional', 'estoque-entrada', 'estoque-saida', 'financeiro', 'rh', 'visualizar'],
            dataCadastro: firebase.firestore.FieldValue.serverTimestamp(),
            ativo: true
        });
        
        // Aplicar tema do segmento
        if (extraData.segmento) {
            aplicarTemaSegmento(extraData.segmento);
        }
        
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
        } else {
            message = error.message;
        }
        
        showToast(message, 'error');
        throw error;
    }
}

// Funcao de logout
async function logout() {
    if (!firebaseInitialized) return;
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
    if (!firebaseInitialized) {
        throw new Error("Firebase não configurado.");
    }
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
    if (!currentUser || !firebaseInitialized) return null;
    
    const doc = await db.collection('usuarios').doc(currentUser.uid).get();
    if (doc.exists) {
        return { id: doc.id, ...doc.data() };
    }
    return null;
}
