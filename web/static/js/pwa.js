// ============================================================================
// PWA - PROGRESSIVE WEB APP
// Arquivo: pwa.js
// Descrição: Gerenciamento de instalação e funcionalidades PWA
// ============================================================================

let deferredPrompt;
const installButton = document.getElementById('installBtn');

// ============================================================================
// DETECTAR SE O APP PODE SER INSTALADO
// ============================================================================

window.addEventListener('beforeinstallprompt', (e) => {
    // Previne o prompt automático
    e.preventDefault();
    
    // Armazena o evento para ser usado depois
    deferredPrompt = e;
    
    // Mostra o botão de instalação
    installButton.classList.remove('hidden');
    
    console.log('PWA: App pode ser instalado');
});

// ============================================================================
// INSTALAÇÃO DO APP
// ============================================================================

installButton.addEventListener('click', async () => {
    if (!deferredPrompt) {
        return;
    }
    
    // Mostra o prompt de instalação
    deferredPrompt.prompt();
    
    // Aguarda a escolha do usuário
    const { outcome } = await deferredPrompt.userChoice;
    
    console.log(`PWA: Usuário ${outcome === 'accepted' ? 'aceitou' : 'recusou'} a instalação`);
    
    if (outcome === 'accepted') {
        showToast('App instalado com sucesso! 🎉', 'success');
    }
    
    // Limpa o prompt
    deferredPrompt = null;
    
    // Esconde o botão
    installButton.classList.add('hidden');
});

// ============================================================================
// DETECTAR QUANDO O APP FOI INSTALADO
// ============================================================================

window.addEventListener('appinstalled', (e) => {
    console.log('PWA: App instalado com sucesso');
    showToast('App instalado! Você pode acessá-lo pela tela inicial.', 'success');
    
    // Esconde o botão de instalação
    installButton.classList.add('hidden');
});

// ============================================================================
// REGISTRAR O SERVICE WORKER
// ============================================================================

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then((registration) => {
                console.log('PWA: Service Worker registrado com sucesso:', registration.scope);
            })
            .catch((error) => {
                console.error('PWA: Erro ao registrar Service Worker:', error);
            });
    });
}

// ============================================================================
// VERIFICAR SE JÁ ESTÁ INSTALADO
// ============================================================================

window.addEventListener('DOMContentLoaded', () => {
    // Verifica se está rodando como PWA instalado
    if (window.matchMedia('(display-mode: standalone)').matches || 
        window.navigator.standalone === true) {
        console.log('PWA: App está rodando como aplicativo instalado');
        installButton.classList.add('hidden');
    }
});

// ============================================================================
// VERIFICAR STATUS DA CONEXÃO
// ============================================================================

function updateOnlineStatus() {
    if (navigator.onLine) {
        console.log('PWA: Conexão online');
    } else {
        console.log('PWA: Conexão offline');
        showToast('Você está offline. Algumas funcionalidades podem não funcionar.', 'warning');
    }
}

window.addEventListener('online', updateOnlineStatus);
window.addEventListener('offline', updateOnlineStatus);

// Verificar status inicial
updateOnlineStatus();
