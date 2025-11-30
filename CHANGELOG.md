# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

## [2.0.0] - 2025-11-30

### Adicionado

- **Interface de Autenticação Modernizada**: Formulário de cadastro completamente redesenhado seguindo design profissional com:
  - Ícones FontAwesome posicionados à esquerda dentro dos campos de input
  - Paleta de cores profissional (azul #3b82f6 para labels, cinza #f9fafb para inputs)
  - Botão "Criar Conta" com gradiente dinâmico (azul→vermelho→laranja)
  - Placeholders informativos (ex: "cris arroba gmail.com", "••••••••")
  - Ícone briefcase para campo de segmento

### Modificado

- **Refatoração Backend**: Separação da lógica de negócio da interface CLI
  - `src/estoque_entrada.py`: Função `registrar_entrada_produto()` agora retorna tupla `(produto, is_novo)` sem dependências de I/O
  - `src/estoque_saida.py`: Função `registrar_saida_produto()` retorna dicionário com status e valores
  - `app.py`: Atualizado para usar funções refatoradas
- **Service Worker**: Atualizado para versão 7 com cache otimizado
- **CSS**: Eliminação de duplicatas e consolidação de estilos
  - Removidas definições duplicadas em `.input-group`, `.form-select`, `.btn-block`
  - Reorganização de classes de autenticação (linhas 1550-1687 do style.css)

### Corrigido

- **JavaScript**: Erro `ReferenceError: login is not defined` corrigido em `auth.js`
  - Implementada detecção correta de modo Firebase vs Local
  - Roteamento para `loginLocal()` quando Firebase não está disponível
- **Encoding**: Todos os arquivos Python convertidos para UTF-8 com BOM
  - Corrigidos erros de `UnicodeDecodeError` em `estoque_entrada.py` e `estoque_saida.py`
- **Cache**: Arquivos estáticos agora carregam versão atualizada (`?v=7`)
- **Syntax Error**: Resolvido erro de token inesperado em `local-auth.js` (era problema de cache)

### Dependências

- Flask: ~2.3.0
- SQLAlchemy: ~2.0.0
- FontAwesome: 6.4.0 (CDN)

### Design System

- **Cores Primárias**:
  - Azul: #3b82f6 (labels, links)
  - Vermelho: #ef4444 (gradiente, erros)
  - Laranja: #f97316 (gradiente, avisos)
  - Cinza Claro: #f9fafb (fundo inputs)
  - Cinza Médio: #9ca3af (ícones)
  - Cinza Borda: #e5e7eb (bordas inputs)
- **Tipografia**: System fonts stack com fallback para sans-serif
- **Espaçamento**: Baseado em múltiplos de 0.25rem (4px)
- **Bordas**: Border-radius padrão de 8px para inputs e botões

### Melhorias de Performance

- Cache de service worker otimizado
- Carregamento assíncrono de módulos JavaScript
- Compressão de assets estáticos

---

## [1.0.0] - 2025-11-01

### Lançamento Inicial

- Sistema ERP completo com módulos: Dashboard, Operacional, Estoque, Financeiro, RH
- Suporte para modo Local (LocalStorage), Firebase e Backend Python/Flask
- PWA instalável com service worker
- Interface responsiva para desktop, tablet e mobile
- Autenticação local e Firebase
