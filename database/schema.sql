-- Tabela de Usuários
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    uid VARCHAR(255) UNIQUE NOT NULL, -- ID compatível com frontend existente
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL, -- Em produção, usar hash!
    role VARCHAR(50) DEFAULT 'user', -- 'admin', 'user', 'manager'
    company_id VARCHAR(255) NOT NULL,
    allowed_modules JSONB DEFAULT '[]', -- Lista de módulos permitidos: ['estoque', 'financeiro']
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Produtos (Estoque)
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    code VARCHAR(50) NOT NULL,
    name VARCHAR(255) NOT NULL,
    quantity INTEGER DEFAULT 0,
    batch VARCHAR(100),
    serial_number VARCHAR(100),
    supplier VARCHAR(255),
    location VARCHAR(100),
    price DECIMAL(10, 2) DEFAULT 0.00,
    company_id VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Movimentações
CREATE TABLE IF NOT EXISTS movements (
    id SERIAL PRIMARY KEY,
    type VARCHAR(20) NOT NULL, -- 'entrada', 'saida'
    product_id INTEGER REFERENCES products(id),
    product_name VARCHAR(255),
    quantity INTEGER NOT NULL,
    unit_price DECIMAL(10, 2),
    total_price DECIMAL(10, 2),
    user_id VARCHAR(255),
    user_name VARCHAR(255),
    company_id VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Índices para performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_products_company ON products(company_id);
CREATE INDEX IF NOT EXISTS idx_movements_company ON movements(company_id);
