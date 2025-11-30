#  Checklist de Testes - Super Admin

##  Testes de Autenticação

- [ ] **Teste 1:** Login com super admin
  - Email: `superadmin@quatrocantos.com`
  - Senha: `admin@2025`
  -  Esperado: Login bem-sucedido, menu "Administração" visível

- [ ] **Teste 2:** Login com admin padrão
  - Email: `admin@local.com`
  - Senha: `admin123`
  -  Esperado: Login bem-sucedido, menu "Administração" NÁO visível

- [ ] **Teste 3:** Login com senha incorreta
  - Email: `superadmin@quatrocantos.com`
  - Senha: `senhaerrada`
  -  Esperado: Erro "Usuário ou senha incorretos"

- [ ] **Teste 4:** Resetar usuários demo
  - Clicar em "Resetar Usuários Demo"
  -  Esperado: Página recarrega, usuários restaurados

---

##  Testes do Painel Admin

### Acesso
- [ ] **Teste 5:** Acessar painel como super admin
  - Login como super admin
  - Clicar no botão "Administração" (vermelho)
  -  Esperado: Modal abre com painel de administração

### Estatísticas
- [ ] **Teste 6:** Verificar cards de estatísticas
  -  Esperado: 4 cards visíveis (Total, Ativas, Segmento, Cadastros Hoje)
  -  Valores devem ser números válidos

### Tabela de Empresas
- [ ] **Teste 7:** Visualizar lista de empresas
  -  Esperado: Tabela com colunas (Empresa, Email, Segmento, Data, Status, Ações)
  -  Empresas cadastradas aparecem na lista

---

##  Testes de Funcionalidades

### Busca
- [ ] **Teste 8:** Buscar empresa por nome
  - Digitar nome de empresa existente
  -  Esperado: Tabela filtra resultados

- [ ] **Teste 9:** Buscar empresa por email
  - Digitar email de empresa existente
  -  Esperado: Tabela filtra resultados

- [ ] **Teste 10:** Buscar texto inexistente
  - Digitar "xyzabc123"
  -  Esperado: Mensagem "Nenhuma empresa encontrada"

### Filtros
- [ ] **Teste 11:** Filtrar por segmento
  - Selecionar um segmento no dropdown
  -  Esperado: Apenas empresas daquele segmento aparecem

- [ ] **Teste 12:** Voltar para "Todos os Segmentos"
  - Selecionar "Todos os Segmentos"
  -  Esperado: Todas as empresas aparecem novamente

### Detalhes
- [ ] **Teste 13:** Ver detalhes de empresa
  - Clicar em botão "Ver" (olho)
  -  Esperado: Modal abre com informações completas da empresa

- [ ] **Teste 14:** Fechar modal de detalhes
  - Clicar no X ou fora do modal
  -  Esperado: Modal fecha

### Ativar/Desativar
- [ ] **Teste 15:** Desativar empresa ativa
  - Clicar em botão "Desativar" (empresa com status verde)
  -  Esperado: Status muda para vermelho "Inativa"

- [ ] **Teste 16:** Ativar empresa inativa
  - Clicar em botão "Ativar" (empresa com status vermelho)
  -  Esperado: Status muda para verde "Ativa"

### Exportação
- [ ] **Teste 17:** Exportar para CSV
  - Clicar em botão "Exportar CSV"
  -  Esperado: Download de arquivo `empresas_YYYYMMDD_HHMMSS.csv`

- [ ] **Teste 18:** Verificar conteúdo do CSV
  - Abrir arquivo CSV exportado
  -  Esperado: Colunas corretas, dados formatados

---

##  Testes de Responsividade

### Desktop
- [ ] **Teste 19:** Visualizar em tela grande (>1200px)
  -  Esperado: 4 cards lado a lado, tabela completa

### Tablet
- [ ] **Teste 20:** Visualizar em tablet (768px)
  - Redimensionar navegador ou usar DevTools
  -  Esperado: 2 cards por linha, tabela responsiva

### Mobile
- [ ] **Teste 21:** Visualizar em mobile (<480px)
  -  Esperado: 1 card por linha, tabela scrollável horizontal

---

##  Testes de Console (DevTools)

- [ ] **Teste 22:** Verificar logs de login
  - Abrir Console (F12)
  - Fazer login
  -  Esperado: Logs mostram usuários disponíveis e tentativa de login

- [ ] **Teste 23:** Verificar erros JavaScript
  - Abrir Console (F12)
  - Navegar pelo painel admin
  -  Esperado: Sem erros vermelhos no console

- [ ] **Teste 24:** Verificar localStorage
  - Console: `localStorage.getItem('localUsers')`
  -  Esperado: JSON com usuários cadastrados

---

##  Testes Visuais

- [ ] **Teste 25:** Badges de segmento
  -  Esperado: Cores diferentes para cada segmento
  -  Cores correspondem ao tema do segmento

- [ ] **Teste 26:** Badges de status
  -  Esperado: Verde para "Ativa", Vermelho para "Inativa"

- [ ] **Teste 27:** Botões hover
  - Passar mouse sobre botões
  -  Esperado: Efeitos de hover suaves

---

##  Testes de Performance

- [ ] **Teste 28:** Carregar 10+ empresas
  - Cadastrar várias empresas
  - Abrir painel admin
  -  Esperado: Carregamento rápido, sem travamentos

- [ ] **Teste 29:** Filtrar com muitas empresas
  - Ter 20+ empresas cadastradas
  - Usar busca e filtros
  -  Esperado: Filtros respondem instantaneamente

---

##  Testes de Segurança

- [ ] **Teste 30:** Tentar acessar admin como user comum
  - Criar usuário sem role admin
  - Tentar ver botão "Administração"
  -  Esperado: Botão não aparece

- [ ] **Teste 31:** Verificar isolamento de dados
  - Fazer login como admin de empresa A
  - Verificar acesso apenas aos dados da empresa A
  -  Esperado: Sem acesso a dados de outras empresas

---

##  Resultado Final

**Total de Testes:** 31  
**Testes Passados:** ___  
**Testes Falhados:** ___  
**Taxa de Sucesso:** ___%

### Status Geral
- [ ]  Sistema funcionando corretamente
- [ ]  Pequenos ajustes necessários
- [ ]  Problemas críticos encontrados

### Notas
```
[Adicione observações aqui]
```

---

**Data do Teste:** ___/___/______  
**Testador:** ________________  
**Ambiente:** [ ] Local [ ] Produção  
**Navegador:** ________________  
**Versão do Sistema:** 2.0.0
