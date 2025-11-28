const { query } = require('./db');

exports.handler = async (event, context) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    try {
        const { name, email, password, role, companyId, allowedModules } = JSON.parse(event.body);

        // Validação básica
        if (!name || !email || !password || !companyId) {
            return { statusCode: 400, body: JSON.stringify({ error: 'Dados incompletos' }) };
        }

        // Verificar se já existe
        const check = await query('SELECT id FROM users WHERE email = $1', [email]);
        if (check.rows.length > 0) {
            return { statusCode: 409, body: JSON.stringify({ error: 'Email já cadastrado' }) };
        }

        // Gerar UID compatível
        const uid = 'user-' + Date.now();

        // Inserir
        // NOTA: Em produção, faça hash da senha antes de salvar!
        const result = await query(
            `INSERT INTO users (uid, name, email, password, role, company_id, allowed_modules) 
             VALUES ($1, $2, $3, $4, $5, $6, $7) 
             RETURNING id, uid, name, email, role, company_id, allowed_modules`,
            [uid, name, email, password, role || 'user', companyId, JSON.stringify(allowedModules || [])]
        );

        const user = result.rows[0];

        return {
            statusCode: 201,
            body: JSON.stringify({
                success: true,
                user: {
                    uid: user.uid,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    companyId: user.company_id,
                    allowedModules: user.allowed_modules
                }
            })
        };

    } catch (error) {
        console.error('Erro no registro:', error);
        return { statusCode: 500, body: JSON.stringify({ error: 'Erro ao criar usuário' }) };
    }
};
