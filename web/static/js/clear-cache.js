// Script para limpar cache e service workers antigos
// Execute este script no console do navegador se tiver problemas de cache

console.log('🧹 Iniciando limpeza de cache...');

// 1. Desregistrar todos os Service Workers
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then(function(registrations) {
        console.log('📋 Service Workers encontrados:', registrations.length);
        for(let registration of registrations) {
            registration.unregister().then(function(success) {
                if (success) {
                    console.log('✅ Service Worker desregistrado');
                } else {
                    console.log('❌ Falha ao desregistrar Service Worker');
                }
            });
        }
    });
}

// 2. Limpar todos os caches
if ('caches' in window) {
    caches.keys().then(function(cacheNames) {
        console.log('📋 Caches encontrados:', cacheNames);
        return Promise.all(
            cacheNames.map(function(cacheName) {
                console.log('🗑️ Removendo cache:', cacheName);
                return caches.delete(cacheName);
            })
        );
    }).then(function() {
        console.log('✅ Todos os caches foram limpos!');
        console.log('🔄 Recarregue a página (Ctrl+Shift+R) para aplicar as mudanças');
    });
}

// 3. Limpar localStorage (CUIDADO: isso apaga dados salvos)
// Descomente a linha abaixo apenas se necessário
// localStorage.clear();
// console.log('✅ localStorage limpo!');

console.log('');
console.log('✅ Limpeza concluída!');
console.log('🔄 Agora pressione Ctrl+Shift+R para recarregar a página');
