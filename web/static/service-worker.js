// ============================================================================
// SERVICE WORKER - PWA OFFLINE SUPPORT
// Arquivo: service-worker.js
// Descrição: Gerencia cache e funcionamento offline do aplicativo
// Versão: 10 (com estratégia de cleanup automático)
// ============================================================================

const CACHE_NAME = 'estoque-certo-v10';
const CACHE_MAX_AGE_DAYS = 30; // Cache expira após 30 dias
const CACHE_MAX_ITEMS = 50; // Máximo de itens no cache

const urlsToCache = [
    '/',
    '/static/css/style.css',
    '/static/css/admin.css',
    '/static/js/app.js',
    '/static/js/modules.js',
    '/static/js/dashboard.js',
    '/static/js/auth.js',
    '/static/js/local-auth.js',
    '/static/js/local-firestore.js',
    '/static/js/segments-config.js',
    '/static/js/admin-module.js',
    '/static/js/pwa.js',
    '/static/manifest.json',
    '/static/icons/icon.svg'
];

// ============================================================================
// FUNÇÕES AUXILIARES DE LIMPEZA DE CACHE
// ============================================================================

/**
 * Remove caches expirados baseado em timestamp
 */
async function cleanExpiredCache() {
    const cache = await caches.open(CACHE_NAME);
    const requests = await cache.keys();
    const now = Date.now();
    const maxAge = CACHE_MAX_AGE_DAYS * 24 * 60 * 60 * 1000; // Dias em ms
    
    for (const request of requests) {
        const response = await cache.match(request);
        if (response) {
            const dateHeader = response.headers.get('date');
            if (dateHeader) {
                const responseDate = new Date(dateHeader).getTime();
                if (now - responseDate > maxAge) {
                    console.log('Service Worker: Removendo cache expirado:', request.url);
                    await cache.delete(request);
                }
            }
        }
    }
}

/**
 * Limita o número de itens no cache (LRU - Least Recently Used)
 */
async function limitCacheSize() {
    const cache = await caches.open(CACHE_NAME);
    const requests = await cache.keys();
    
    if (requests.length > CACHE_MAX_ITEMS) {
        const itemsToDelete = requests.length - CACHE_MAX_ITEMS;
        console.log(`Service Worker: Removendo ${itemsToDelete} itens antigos do cache`);
        
        // Remove os primeiros N itens (mais antigos)
        for (let i = 0; i < itemsToDelete; i++) {
            await cache.delete(requests[i]);
        }
    }
}

// ============================================================================
// INSTALAÇÃO DO SERVICE WORKER
// ============================================================================
self.addEventListener('install', (event) => {
    console.log('Service Worker v10: Instalando...');
    
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
// ATIVAÇÃO DO SERVICE WORKER (COM LIMPEZA DE CACHES ANTIGOS)
// ============================================================================
self.addEventListener('activate', (event) => {
    console.log('Service Worker v10: Ativando...');
    
    event.waitUntil(
        Promise.all([
            // Remove todas as versões antigas de cache
            caches.keys().then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((cacheName) => {
                        if (cacheName !== CACHE_NAME) {
                            console.log('Service Worker: Removendo cache antigo:', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            }),
            // Executa limpeza de cache expirado
            cleanExpiredCache(),
            // Limita tamanho do cache
            limitCacheSize()
        ]).then(() => {
            console.log('Service Worker: Ativado e caches limpos');
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
        self.registration.showNotification('Quatro Cantos', options)
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
