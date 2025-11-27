import os
from sqlalchemy import create_engine, Column, Integer, String, Float
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv

# Carregar variáveis de ambiente
load_dotenv()

# Configuração do Banco de Dados
# Se não houver DATABASE_URL, usa SQLite local como fallback para desenvolvimento
DATABASE_URL = os.getenv('DATABASE_URL', 'sqlite:///dados.db')

# Ajuste para compatibilidade com URLs do Postgres no SQLAlchemy (postgres:// -> postgresql://)
if DATABASE_URL and DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql://", 1)

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

class Produto(Base):
    """Modelo de dados para Produtos no Estoque"""
    __tablename__ = "produtos"

    id = Column(Integer, primary_key=True, index=True)
    codigo = Column(Integer, unique=True, index=True)
    nome = Column(String, index=True)
    quantidade = Column(Integer, default=0)
    data_fabricacao = Column(String)
    fornecedor = Column(String)
    local_armazem = Column(String)
    valor_unitario = Column(Float, default=0.0)

    def to_dict(self):
        """Converte o objeto para dicionário"""
        return {
            "codigo": self.codigo,
            "nome": self.nome,
            "quantidade": self.quantidade,
            "data": self.data_fabricacao,
            "fornecedor": self.fornecedor,
            "local": self.local_armazem,
            "valor": self.valor_unitario
        }

def init_db():
    """Inicializa o banco de dados criando as tabelas"""
    Base.metadata.create_all(bind=engine)

def get_db():
    """Dependência para obter sessão do banco"""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
