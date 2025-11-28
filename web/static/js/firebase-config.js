// Configuracao do Firebase
// IMPORTANTE: Substitua estas credenciais pelas suas do Firebase Console
// Siga o guia CONFIGURACAO_NUVEM.md para obter estes dados

const firebaseConfig = {
    apiKey: "SUA_API_KEY_AQUI",
    authDomain: "SEU_PROJETO.firebaseapp.com",
    projectId: "SEU_PROJECT_ID",
    storageBucket: "SEU_PROJETO.appspot.com",
    messagingSenderId: "SEU_SENDER_ID",
    appId: "SEU_APP_ID",
    measurementId: "SEU_MEASUREMENT_ID"
};

// Inicializar Firebase apenas se a chave for válida
let auth, db;
let firebaseInitialized = false;

try {
    // Verifica se as chaves foram configuradas (não são mais os placeholders)
    if (firebaseConfig.apiKey !== "SUA_API_KEY_AQUI" && firebaseConfig.projectId !== "SEU_PROJECT_ID") {
        firebase.initializeApp(firebaseConfig);
        auth = firebase.auth();
        db = firebase.firestore();
        
        // Persistência local para manter o usuário logado mesmo após fechar o navegador
        auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
        
        firebaseInitialized = true;
        console.log("Firebase inicializado com sucesso!");
    } else {
        console.warn("Firebase não configurado. O sistema funcionará em MODO LOCAL (apenas neste navegador).");
        console.warn("Para ativar o modo nuvem multi-usuário, configure o arquivo web/static/js/firebase-config.js");
    }
} catch (e) {
    console.error("Erro crítico ao inicializar Firebase:", e);
    console.warn("Revertendo para modo local de segurança.");
}

// Estado de autenticacao global
let currentUser = null;
let isAdmin = false;

// Observador de autenticacao (apenas se Firebase estiver ativo)
if (firebaseInitialized) {
    auth.onAuthStateChanged(async (user) => {
        if (user) {
            // Usuário autenticado no Firebase
            try {
                const userDoc = await db.collection('usuarios').doc(user.uid).get();
                
                if (userDoc.exists) {
                    const userData = userDoc.data();
                    
                    // Mesclar dados do Auth com dados do Firestore
                    currentUser = {
                        uid: user.uid,
                        email: user.email,
                        displayName: userData.nome || user.displayName,
                        ...userData
                    };
                    
                    isAdmin = userData.role === 'admin';
                    
                    console.log(`Usuário logado: ${currentUser.email} (Empresa: ${currentUser.companyId})`);
                    
                    // Mostrar sistema
                    showApp();
                    loadDashboard(); // Carregar dados iniciais
                } else {
                    console.error("Usuário autenticado mas sem registro no Firestore.");
                    // Opcional: Criar registro básico ou forçar logout
                }
            } catch (e) {
                console.error("Erro ao buscar dados do usuário no Firestore", e);
                showToast("Erro ao carregar perfil do usuário", "error");
            }
        } else {
            // Usuário deslogado
            currentUser = null;
            isAdmin = false;
            showAuth();
        }
    });
} else {
    // Fallback para modo local se Firebase não estiver configurado
    // O controle de estado local é feito pelo local-auth.js
}
