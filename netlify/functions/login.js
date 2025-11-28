const { query } = require('./db');

exports.handler = async (event, context) => {
    // Apenas POST
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    try {
        const { email, password } = JSON.parse(event.body);

        if (!email || !password) {
            return { statusCode: 400, body: JSON.stringify({ error: 'Email e senha são obrigatórios' }) };
        }

        // Buscar usuário no banco
        // NOTA: Em produção, use bcrypt para comparar hash de senha!
        const result = await query(
            'SELECT id, uid, name, email, role, company_id, allowed_modules FROM users WHERE email = $1 AND password = $2',
            [email, password]
        );

        if (result.rows.length === 0) {
            return { statusCode: 401, body: JSON.stringify({ error: 'Credenciais inválidas' }) };
        }

        const user = result.rows[0];

        return {
            statusCode: 200,
            body: JSON.stringify({
                success: true,
                user: {
                    uid: user.uid,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    companyId: user.company_id,
                    allowedModules: user.allowed_modules // Aqui está a mágica do RBAC
                }
            })
        };

    } catch (error) {
        console.error('Erro no login:', error);
        return { statusCode: 500, body: JSON.stringify({ error: 'Erro interno do servidor' }) };
    }
};
