// Servicos de dados do Firestore

// ESTOQUE - CRUD Operations

// Listar todos os produtos
async function listarProdutos() {
    try {
        const snapshot = await db.collection('estoque')
            .orderBy('nome')
            .get();
        
        const produtos = [];
        snapshot.forEach(doc => {
            produtos.push({ id: doc.id, ...doc.data() });
        });
        
        return produtos;
    } catch (error) {
        console.error('Erro ao listar produtos:', error);
        showToast('Erro ao carregar produtos', 'error');
        return [];
    }
}

// Cadastrar produto
async function cadastrarProdutoFirestore(produto) {
    try {
        // Verificar se ja existe
        const query = await db.collection('estoque')
            .where('codigo', '==', produto.codigo)
            .get();
        
        if (!query.empty) {
            // Atualizar quantidade
            const doc = query.docs[0];
            const produtoExistente = doc.data();
            await doc.ref.update({
                quantidade: produtoExistente.quantidade + produto.quantidade,
                ultimaAtualizacao: firebase.firestore.FieldValue.serverTimestamp()
            });
            
            // Registrar movimentacao
            await registrarMovimentacao({
                tipo: 'entrada',
                produtoId: doc.id,
                produtoNome: produtoExistente.nome,
                quantidade: produto.quantidade,
                usuarioId: currentUser.uid,
                usuarioNome: currentUser.displayName || currentUser.email
            });
            
            return { id: doc.id, updated: true };
        } else {
            // Criar novo
            const docRef = await db.collection('estoque').add({
                ...produto,
                dataCriacao: firebase.firestore.FieldValue.serverTimestamp(),
                ultimaAtualizacao: firebase.firestore.FieldValue.serverTimestamp(),
                criadoPor: currentUser.uid
            });
            
            // Registrar movimentacao
            await registrarMovimentacao({
                tipo: 'entrada',
                produtoId: docRef.id,
                produtoNome: produto.nome,
                quantidade: produto.quantidade,
                usuarioId: currentUser.uid,
                usuarioNome: currentUser.displayName || currentUser.email
            });
            
            return { id: docRef.id, updated: false };
        }
    } catch (error) {
        console.error('Erro ao cadastrar produto:', error);
        showToast('Erro ao cadastrar produto', 'error');
        throw error;
    }
}

// Registrar saida de produto
async function registrarSaidaProduto(nomeProduto, quantidade) {
    try {
        // Buscar produto
        const query = await db.collection('estoque')
            .where('nome', '==', nomeProduto)
            .limit(1)
            .get();
        
        if (query.empty) {
            throw new Error('Produto nao encontrado');
        }
        
        const doc = query.docs[0];
        const produto = doc.data();
        
        if (produto.quantidade < quantidade) {
            if (produto.quantidade === 0) {
                throw new Error('Produto esgotado');
            }
            
            // Saida parcial
            const quantidadeVendida = produto.quantidade;
            const valorVenda = quantidadeVendida * produto.valor;
            
            await doc.ref.update({
                quantidade: 0,
                ultimaAtualizacao: firebase.firestore.FieldValue.serverTimestamp()
            });
            
            await registrarMovimentacao({
                tipo: 'saida',
                subtipo: 'parcial',
                produtoId: doc.id,
                produtoNome: produto.nome,
                quantidadeSolicitada: quantidade,
                quantidadeVendida: quantidadeVendida,
                valorVenda: valorVenda,
                usuarioId: currentUser.uid,
                usuarioNome: currentUser.displayName || currentUser.email
            });
            
            return {
                tipo: 'parcial',
                quantidadeSolicitada: quantidade,
                quantidadeVendida: quantidadeVendida,
                valorVenda: valorVenda
            };
        } else {
            // Saida completa
            const valorVenda = quantidade * produto.valor;
            
            await doc.ref.update({
                quantidade: produto.quantidade - quantidade,
                ultimaAtualizacao: firebase.firestore.FieldValue.serverTimestamp()
            });
            
            await registrarMovimentacao({
                tipo: 'saida',
                subtipo: 'completa',
                produtoId: doc.id,
                produtoNome: produto.nome,
                quantidade: quantidade,
                valorVenda: valorVenda,
                usuarioId: currentUser.uid,
                usuarioNome: currentUser.displayName || currentUser.email
            });
            
            return {
                tipo: 'completa',
                quantidade: quantidade,
                valorVenda: valorVenda,
                estoqueRestante: produto.quantidade - quantidade
            };
        }
    } catch (error) {
        console.error('Erro ao registrar saida:', error);
        showToast(error.message || 'Erro ao registrar saida', 'error');
        throw error;
    }
}

// Registrar movimentacao (historico)
async function registrarMovimentacao(dados) {
    try {
        await db.collection('movimentacoes').add({
            ...dados,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
    } catch (error) {
        console.error('Erro ao registrar movimentacao:', error);
    }
}

// Buscar historico de movimentacoes
async function buscarHistorico(filtros = {}) {
    try {
        let query = db.collection('movimentacoes')
            .orderBy('timestamp', 'desc')
            .limit(100);
        
        if (filtros.tipo) {
            query = query.where('tipo', '==', filtros.tipo);
        }
        
        const snapshot = await query.get();
        const movimentacoes = [];
        
        snapshot.forEach(doc => {
            movimentacoes.push({ id: doc.id, ...doc.data() });
        });
        
        return movimentacoes;
    } catch (error) {
        console.error('Erro ao buscar historico:', error);
        return [];
    }
}

// FINANCEIRO

// Salvar calculo financeiro
async function salvarCalculoFinanceiro(dados) {
    try {
        const docRef = await db.collection('financeiro').add({
            ...dados,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            usuarioId: currentUser.uid,
            usuarioNome: currentUser.displayName || currentUser.email
        });
        
        return docRef.id;
    } catch (error) {
        console.error('Erro ao salvar dados financeiros:', error);
        showToast('Erro ao salvar dados financeiros', 'error');
        throw error;
    }
}

// Buscar historico financeiro
async function buscarHistoricoFinanceiro(limite = 10) {
    try {
        const snapshot = await db.collection('financeiro')
            .orderBy('timestamp', 'desc')
            .limit(limite)
            .get();
        
        const historico = [];
        snapshot.forEach(doc => {
            historico.push({ id: doc.id, ...doc.data() });
        });
        
        return historico;
    } catch (error) {
        console.error('Erro ao buscar historico financeiro:', error);
        return [];
    }
}

// RH - FOLHA DE PAGAMENTO

// Salvar folha de pagamento
async function salvarFolhaPagamento(dados) {
    try {
        const docRef = await db.collection('folha_pagamento').add({
            ...dados,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            usuarioId: currentUser.uid,
            usuarioNome: currentUser.displayName || currentUser.email
        });
        
        return docRef.id;
    } catch (error) {
        console.error('Erro ao salvar folha de pagamento:', error);
        showToast('Erro ao salvar folha de pagamento', 'error');
        throw error;
    }
}

// Buscar historico de folhas de pagamento
async function buscarHistoricoFolha(limite = 10) {
    try {
        const snapshot = await db.collection('folha_pagamento')
            .orderBy('timestamp', 'desc')
            .limit(limite)
            .get();
        
        const historico = [];
        snapshot.forEach(doc => {
            historico.push({ id: doc.id, ...doc.data() });
        });
        
        return historico;
    } catch (error) {
        console.error('Erro ao buscar historico de folha:', error);
        return [];
    }
}

// DASHBOARD - Estatisticas

// Buscar estatisticas gerais
async function buscarEstatisticas() {
    try {
        const [produtos, movimentacoes] = await Promise.all([
            listarProdutos(),
            buscarHistorico()
        ]);
        
        const totalProdutos = produtos.length;
        const totalItens = produtos.reduce((sum, p) => sum + (p.quantidade || 0), 0);
        const valorTotal = produtos.reduce((sum, p) => sum + (p.quantidade * p.valor || 0), 0);
        
        const vendasMes = movimentacoes
            .filter(m => m.tipo === 'saida')
            .slice(0, 30)
            .reduce((sum, m) => sum + (m.valorVenda || 0), 0);
        
        return {
            totalProdutos,
            totalItens,
            valorTotal,
            vendasMes,
            movimentacoes: movimentacoes.slice(0, 10)
        };
    } catch (error) {
        console.error('Erro ao buscar estatisticas:', error);
        return {
            totalProdutos: 0,
            totalItens: 0,
            valorTotal: 0,
            vendasMes: 0,
            movimentacoes: []
        };
    }
}

// Backup automatico
async function realizarBackup() {
    try {
        if (!verificarAdmin()) return;
        
        showLoading('Realizando backup...');
        
        const [produtos, movimentacoes, financeiro, folha] = await Promise.all([
            listarProdutos(),
            buscarHistorico(),
            buscarHistoricoFinanceiro(100),
            buscarHistoricoFolha(100)
        ]);
        
        const backup = {
            data: new Date().toISOString(),
            produtos,
            movimentacoes,
            financeiro,
            folha
        };
        
        await db.collection('backups').add({
            ...backup,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        
        hideLoading();
        showToast('Backup realizado com sucesso!', 'success');
        
        return backup;
    } catch (error) {
        hideLoading();
        console.error('Erro ao realizar backup:', error);
        showToast('Erro ao realizar backup', 'error');
        throw error;
    }
}
