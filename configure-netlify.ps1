# ============================================================================
# SCRIPT DE CONFIGURAÇÃO AUTOMÁTICA - NETLIFY DEPLOY
# ============================================================================

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "   CONFIGURAÇÃO NETLIFY DEPLOY" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

Write-Host "Este script irá ajudá-lo a configurar o deploy automático no Netlify.`n" -ForegroundColor White

# Verificar se gh CLI está instalado
$ghInstalled = Get-Command gh -ErrorAction SilentlyContinue

if (-not $ghInstalled) {
    Write-Host "❌ GitHub CLI (gh) não está instalado." -ForegroundColor Red
    Write-Host "📦 Instale com: winget install --id GitHub.cli" -ForegroundColor Yellow
    Write-Host "Ou baixe em: https://cli.github.com/`n" -ForegroundColor Yellow
    
    Write-Host "Continuando com instruções manuais...`n" -ForegroundColor Yellow
    
    Write-Host "═══════════════════════════════════════" -ForegroundColor Cyan
    Write-Host "   PASSO 1: OBTER SITE ID DO NETLIFY" -ForegroundColor Cyan
    Write-Host "═══════════════════════════════════════`n" -ForegroundColor Cyan
    
    Write-Host "1. Acesse: https://app.netlify.com/sites/projetowash/settings/general" -ForegroundColor White
    Write-Host "2. Role até 'Site information'" -ForegroundColor White
    Write-Host "3. Copie o 'Site ID' (formato: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx)`n" -ForegroundColor White
    
    Write-Host "═══════════════════════════════════════" -ForegroundColor Cyan
    Write-Host "   PASSO 2: GERAR AUTH TOKEN" -ForegroundColor Cyan
    Write-Host "═══════════════════════════════════════`n" -ForegroundColor Cyan
    
    Write-Host "1. Acesse: https://app.netlify.com/user/applications#personal-access-tokens" -ForegroundColor White
    Write-Host "2. Clique em 'New access token'" -ForegroundColor White
    Write-Host "3. Nome: 'GitHub Actions Deploy'" -ForegroundColor White
    Write-Host "4. Copie o token gerado (começa com 'nfp_...')`n" -ForegroundColor White
    
    Write-Host "═══════════════════════════════════════" -ForegroundColor Cyan
    Write-Host "   PASSO 3: CONFIGURAR SECRETS NO GITHUB" -ForegroundColor Cyan
    Write-Host "═══════════════════════════════════════`n" -ForegroundColor Cyan
    
    Write-Host "1. Acesse: https://github.com/cristiano-superacao/projetowash/settings/secrets/actions" -ForegroundColor White
    Write-Host "2. Clique em 'New repository secret'" -ForegroundColor White
    Write-Host "3. Adicione o primeiro secret:" -ForegroundColor White
    Write-Host "   - Name: NETLIFY_SITE_ID" -ForegroundColor Yellow
    Write-Host "   - Value: [Cole o Site ID]" -ForegroundColor Yellow
    Write-Host "4. Adicione o segundo secret:" -ForegroundColor White
    Write-Host "   - Name: NETLIFY_AUTH_TOKEN" -ForegroundColor Yellow
    Write-Host "   - Value: [Cole o Auth Token]`n" -ForegroundColor Yellow
    
    Write-Host "═══════════════════════════════════════" -ForegroundColor Cyan
    Write-Host "   PASSO 4: TESTAR O DEPLOY" -ForegroundColor Cyan
    Write-Host "═══════════════════════════════════════`n" -ForegroundColor Cyan
    
    Write-Host "Após configurar os secrets:" -ForegroundColor White
    Write-Host "1. Faça uma pequena alteração no código" -ForegroundColor White
    Write-Host "2. Commit e push:" -ForegroundColor White
    Write-Host "   git add ." -ForegroundColor Yellow
    Write-Host "   git commit -m 'test: Testar deploy automático'" -ForegroundColor Yellow
    Write-Host "   git push origin main" -ForegroundColor Yellow
    Write-Host "3. Acompanhe em: https://github.com/cristiano-superacao/projetowash/actions`n" -ForegroundColor White
    
    exit
}

# Se gh CLI estiver instalado, tentar configuração automática
Write-Host "✅ GitHub CLI detectado!`n" -ForegroundColor Green

# Login no GitHub
Write-Host "🔐 Fazendo login no GitHub..." -ForegroundColor Cyan
gh auth login

# Verificar se está logado
$authStatus = gh auth status 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erro ao fazer login no GitHub." -ForegroundColor Red
    exit 1
}

Write-Host "✅ Login realizado com sucesso!`n" -ForegroundColor Green

# Solicitar Site ID
Write-Host "═══════════════════════════════════════" -ForegroundColor Cyan
Write-Host "   CONFIGURAR NETLIFY_SITE_ID" -ForegroundColor Cyan
Write-Host "═══════════════════════════════════════`n" -ForegroundColor Cyan

Write-Host "Para obter o Site ID:" -ForegroundColor Yellow
Write-Host "1. Acesse: https://app.netlify.com/sites/projetowash/settings/general" -ForegroundColor White
Write-Host "2. Copie o 'Site ID' em 'Site information'`n" -ForegroundColor White

$siteId = Read-Host "Cole o NETLIFY_SITE_ID aqui"

if ([string]::IsNullOrWhiteSpace($siteId)) {
    Write-Host "❌ Site ID não pode estar vazio." -ForegroundColor Red
    exit 1
}

Write-Host "`n✅ Site ID recebido: $siteId" -ForegroundColor Green

# Solicitar Auth Token
Write-Host "`n═══════════════════════════════════════" -ForegroundColor Cyan
Write-Host "   CONFIGURAR NETLIFY_AUTH_TOKEN" -ForegroundColor Cyan
Write-Host "═══════════════════════════════════════`n" -ForegroundColor Cyan

Write-Host "Para gerar o Auth Token:" -ForegroundColor Yellow
Write-Host "1. Acesse: https://app.netlify.com/user/applications#personal-access-tokens" -ForegroundColor White
Write-Host "2. Clique em 'New access token'" -ForegroundColor White
Write-Host "3. Nome: 'GitHub Actions Deploy'" -ForegroundColor White
Write-Host "4. Copie o token gerado`n" -ForegroundColor White

$authToken = Read-Host "Cole o NETLIFY_AUTH_TOKEN aqui" -AsSecureString
$authTokenPlain = [Runtime.InteropServices.Marshal]::PtrToStringAuto([Runtime.InteropServices.Marshal]::SecureStringToBSTR($authToken))

if ([string]::IsNullOrWhiteSpace($authTokenPlain)) {
    Write-Host "❌ Auth Token não pode estar vazio." -ForegroundColor Red
    exit 1
}

Write-Host "`n✅ Auth Token recebido" -ForegroundColor Green

# Configurar secrets no GitHub
Write-Host "`n🔧 Configurando secrets no GitHub..." -ForegroundColor Cyan

try {
    # Configurar NETLIFY_SITE_ID
    Write-Host "Configurando NETLIFY_SITE_ID..." -ForegroundColor White
    echo $siteId | gh secret set NETLIFY_SITE_ID --repo cristiano-superacao/projetowash
    
    # Configurar NETLIFY_AUTH_TOKEN
    Write-Host "Configurando NETLIFY_AUTH_TOKEN..." -ForegroundColor White
    echo $authTokenPlain | gh secret set NETLIFY_AUTH_TOKEN --repo cristiano-superacao/projetowash
    
    Write-Host "`n✅ Secrets configurados com sucesso!" -ForegroundColor Green
    
} catch {
    Write-Host "`n❌ Erro ao configurar secrets: $_" -ForegroundColor Red
    exit 1
}

# Sucesso
Write-Host "`n========================================" -ForegroundColor Green
Write-Host "   CONFIGURAÇÃO CONCLUÍDA!" -ForegroundColor Green
Write-Host "========================================`n" -ForegroundColor Green

Write-Host "🎉 Deploy automático configurado com sucesso!" -ForegroundColor White
Write-Host "`nPróximos passos:" -ForegroundColor Cyan
Write-Host "1. Faça um commit e push para testar:" -ForegroundColor White
Write-Host "   git add ." -ForegroundColor Yellow
Write-Host "   git commit -m 'test: Testar deploy automático'" -ForegroundColor Yellow
Write-Host "   git push origin main" -ForegroundColor Yellow
Write-Host "`n2. Acompanhe o deploy em:" -ForegroundColor White
Write-Host "   https://github.com/cristiano-superacao/projetowash/actions" -ForegroundColor Cyan
Write-Host "`n3. Seu site estará disponível em:" -ForegroundColor White
Write-Host "   https://projetowash.netlify.app" -ForegroundColor Cyan
Write-Host ""
