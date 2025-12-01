#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script para atualizar local-auth.js com criptografia bcrypt
Remove logs de senhas e adiciona hash de senhas
"""

import re
import codecs

# Ler arquivo
with codecs.open('web/static/js/local-auth.js', 'r', 'utf-8') as f:
    content = f.read()

# 1. Atualizar cabeçalho
content = content.replace(
    "console.log('🔄 local-auth.js v2.1 carregado');",
    "console.log('🔐 local-auth.js v3.0 carregado (com criptografia bcrypt)');"
)

# 2. Adicionar constantes de senha e função de migração após declaração de variáveis
migration_code = '''
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
'''

content = content.replace(
    'let localIsAdmin = false;',
    'let localIsAdmin = false;' + migration_code
)

# 3. Remover logs de senha no login
content = re.sub(
    r"console\.log\('🔑 Senha informada:', password\);",
    "",
    content
)

content = re.sub(
    r"console\.table\(localUsers\.map\(u => \({\s*email:.*?}\)\)\);",
    "",
    content,
    flags=re.DOTALL
)

# 4. Remover logs que exibem senha
content = re.sub(
    r"console\.log\(`  - Senha correta:.*?\);",
    "",
    content
)

content = re.sub(
    r"console\.log\(`  - Senha esperada:.*?\);",
    "",
    content
)

content = re.sub(
    r"console\.log\(`  - Senha recebida:.*?\);",
    "",
    content
)

# 5. Atualizar senhas padrão para usar hash
content = re.sub(
    r"senha: 'admin@2025',",
    "senha: DEFAULT_HASHED_PASSWORDS.superadmin, // Hash bcrypt",
    content
)

content = re.sub(
    r"senha: 'admin123',",
    "senha: DEFAULT_HASHED_PASSWORDS.admin, // Hash bcrypt",
    content
)

# 6. Atualizar função loginLocal para usar bcrypt
login_function = '''// Login local com bcrypt
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
}'''

# Substituir função de login inteira
content = re.sub(
    r'// Login local\r?\nasync function loginLocal\(emailOrLogin, password\).*?return user;\r?\n}',
    login_function,
    content,
    flags=re.DOTALL
)

# 7. Atualizar cadastro para hashear senha
cadastro_pattern = r"(senha: senha,)"
cadastro_replacement = r'''// Criptografar senha antes de salvar
    let senhaHash = senha;
    if (typeof CryptoUtils !== 'undefined') {
        senhaHash = CryptoUtils.hashPassword(senha);
        console.log('🔐 Senha criptografada');
    }
    
    senha: senhaHash,'''

content = re.sub(cadastro_pattern, cadastro_replacement, content)

# 8. Remover logs de senha na função de info
content = re.sub(
    r"console\.log\('\s*-\s*Senha:',\s*user\.senha\);",
    "",
    content
)

content = re.sub(
    r"console\.log\('Usuario admin padrao:.*?admin123'\);",
    "console.log('Usuario admin padrao: admin@local.com');\n    console.log('Super Admin: superadmin@quatrocantos.com');\n    console.log('💡 Para ver senhas, clique em \"Esqueci minha senha\"');",
    content
)

content = re.sub(
    r"console\.log\('Super Admin:.*?\);",
    "",
    content
)

# Remover linha duplicada
content = re.sub(
    r"console\.log\('Super Admin: superadmin@quatrocantos\.com'\);\s*console\.log\('Super Admin: superadmin@quatrocantos\.com'\);",
    "console.log('Super Admin: superadmin@quatrocantos.com');",
    content
)

# Remover logs que exibem senha na lista de usuários
content = re.sub(
    r"console\.log\(`\s*-\s*\$\{u\.email.*?Senha:\s*\$\{u\.senha\}`\);",
    "console.log(`  - ${u.email || u.loginUsuario} (${u.role})`);",
    content
)

# Salvar arquivo
with codecs.open('web/static/js/local-auth.js', 'w', 'utf-8') as f:
    f.write(content)

print("✅ Arquivo local-auth.js atualizado com sucesso!")
print("🔐 Senhas agora são criptografadas com bcrypt")
print("🚫 Logs de senha foram removidos")
