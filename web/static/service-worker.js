// ============================================================================
// SERVICE WORKER - PWA OFFLINE SUPPORT
// Arquivo: service-worker.js
// Descrição: Gerencia cache e funcionamento offline do aplicativo
// ============================================================================

const CACHE_NAME = 'estoque-certo-v4';
const urlsToCache = [
    '/',
    '/static/css/style.css',
    '/static/js/app.js',
    '/static/js/modules.js',
    '/static/js/dashboard.js',
    '/static/js/auth.js',
    '/static/js/pwa.js',
    '/static/manifest.json',
    '/static/icons/icon.svg'
];

// ============================================================================
// INSTALAÇÃO DO SERVICE WORKER
// ============================================================================
self.addEventListener('install', (event) => {
    console.log('Service Worker: Instalando...');
    
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Service Worker: Cache aberto');
                return cache.addAll(urlsToCache);
            })
            .then(() => {
                console.log('Service Worker: Todos os arquivos foram cacheados');
                return self.skipWaiting();
            })
            .catch((error) => {
                console.error('Service Worker: Erro ao cachear arquivos:', error);
            })
    );
});

// ============================================================================
// ATIVAÇÃO DO SERVICE WORKER
// ============================================================================
self.addEventListener('activate', (event) => {
    console.log('Service Worker: Ativando...');
    
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    // Remove caches antigos
                    if (cacheName !== CACHE_NAME) {
                        console.log('Service Worker: Removendo cache antigo:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => {
            console.log('Service Worker: Ativado');
            return self.clients.claim();
        })
    );
});

// ============================================================================
// INTERCEPTAR REQUISIÇÕES (ESTRATÉGIA: CACHE FIRST)
// ============================================================================
self.addEventListener('fetch', (event) => {
    // Ignora requisições da API (sempre busca da rede)
    if (event.request.url.includes('/api/')) {
        event.respondWith(
            fetch(event.request)
                .catch(() => {
                    return new Response(
                        JSON.stringify({ 
                            success: false, 
                            error: 'Sem conexão com a internet' 
                        }),
                        { 
                            headers: { 'Content-Type': 'application/json' } 
                        }
                    );
                })
        );
        return;
    }
    
    // Para outros recursos, usa estratégia Cache First
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // Retorna do cache se encontrar
                if (response) {
                    console.log('Service Worker: Servindo do cache:', event.request.url);
                    return response;
                }
                
                // Caso contrário, busca da rede
                console.log('Service Worker: Buscando da rede:', event.request.url);
                return fetch(event.request).then((response) => {
                    // Não cacheia se não for uma resposta válida
                    if (!response || response.status !== 200 || response.type !== 'basic') {
                        return response;
                    }
                    
                    // Clona a resposta
                    const responseToCache = response.clone();
                    
                    // Adiciona ao cache
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, responseToCache);
                    });
                    
                    return response;
                });
            })
            .catch((error) => {
                console.error('Service Worker: Erro ao buscar recurso:', error);
                
                // Página offline personalizada (opcional)
                if (event.request.mode === 'navigate') {
                    return caches.match('/');
                }
            })
    );
});

// ============================================================================
// SINCRONIZAÇÃO EM BACKGROUND (OPCIONAL)
// ============================================================================
self.addEventListener('sync', (event) => {
    console.log('Service Worker: Sincronização em background');
    
    if (event.tag === 'sync-data') {
        event.waitUntil(syncData());
    }
});

async function syncData() {
    try {
        console.log('Service Worker: Sincronizando dados...');
        // Implementar lógica de sincronização aqui
        return Promise.resolve();
    } catch (error) {
        console.error('Service Worker: Erro na sincronização:', error);
        return Promise.reject(error);
    }
}

// ============================================================================
// NOTIFICAÇÕES PUSH (OPCIONAL)
// ============================================================================
self.addEventListener('push', (event) => {
    console.log('Service Worker: Push recebido');
    
    const options = {
        body: event.data ? event.data.text() : 'Nova notificação',
        icon: '/static/icons/icon.svg',
        badge: '/static/icons/icon.svg',
        vibrate: [200, 100, 200],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };
    
    event.waitUntil(
        self.registration.showNotification('Estoque Certo LTDA', options)
    );
});

// ============================================================================
// CLIQUE EM NOTIFICAÇÃO
// ============================================================================
self.addEventListener('notificationclick', (event) => {
    console.log('Service Worker: Notificação clicada');
    
    event.notification.close();
    
    event.waitUntil(
        clients.openWindow('/')
    );
});
