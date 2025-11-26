# Sistema Estoque Certo LTDA v2.0

## Script de Inicializacao Automatica

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  SISTEMA ESTOQUE CERTO LTDA v2.0" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

Write-Host "IMPORTANTE: Este sistema agora usa Firebase e Netlify!" -ForegroundColor Yellow
Write-Host ""

# Verificar se Firebase esta configurado
$firebaseConfig = "web\static\js\firebase-config.js"
if (Test-Path $firebaseConfig) {
    $content = Get-Content $firebaseConfig -Raw
    if ($content -match "SUA_API_KEY_AQUI") {
        Write-Host "ATENCAO: Firebase ainda nao configurado!" -ForegroundColor Red
        Write-Host ""
        Write-Host "Siga os passos:" -ForegroundColor Yellow
        Write-Host "1. Crie projeto no Firebase Console" -ForegroundColor White
        Write-Host "2. Ative Authentication e Firestore" -ForegroundColor White
        Write-Host "3. Copie as credenciais para: $firebaseConfig" -ForegroundColor White
        Write-Host ""
        Write-Host "Guia completo: GUIA_CONFIGURACAO_COMPLETO.md" -ForegroundColor Cyan
        Write-Host ""
        
        $continuar = Read-Host "Deseja abrir o guia agora? (S/N)"
        if ($continuar -eq "S" -or $continuar -eq "s") {
            Start-Process "GUIA_CONFIGURACAO_COMPLETO.md"
        }
        
        Write-Host ""
        Write-Host "Pressione qualquer tecla para sair..." -ForegroundColor Gray
        $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
        exit
    }
}

Write-Host "Escolha uma opcao:`n" -ForegroundColor Green

Write-Host "1. Desenvolvimento Local (Live Server)" -ForegroundColor White
Write-Host "2. Ver Status do Deploy" -ForegroundColor White
Write-Host "3. Fazer Deploy no Netlify" -ForegroundColor White
Write-Host "4. Inicializar Git" -ForegroundColor White
Write-Host "5. Ver Documentacao" -ForegroundColor White
Write-Host "6. Instalar Dependencias" -ForegroundColor White
Write-Host "0. Sair`n" -ForegroundColor White

$opcao = Read-Host "Digite a opcao"

switch ($opcao) {
    "1" {
        Write-Host "`nAbrindo modo desenvolvimento..." -ForegroundColor Green
        Write-Host ""
        Write-Host "Opcoes:" -ForegroundColor Yellow
        Write-Host "1. VS Code Live Server (Recomendado)" -ForegroundColor White
        Write-Host "   - Clique direito em web/index.html > Open with Live Server" -ForegroundColor Gray
        Write-Host ""
        Write-Host "2. Python HTTP Server" -ForegroundColor White
        Write-Host "   - Executando servidor na porta 8000..." -ForegroundColor Gray
        
        Set-Location web
        Write-Host ""
        Write-Host "Servidor iniciado em: http://localhost:8000" -ForegroundColor Cyan
        Write-Host "Pressione Ctrl+C para encerrar" -ForegroundColor Yellow
        Write-Host ""
        
        python -m http.server 8000
    }
    
    "2" {
        Write-Host "`nVerificando status do deploy..." -ForegroundColor Green
        
        if (Test-Path ".git") {
            Write-Host ""
            Write-Host "Status Git:" -ForegroundColor Cyan
            git status
            Write-Host ""
            Write-Host "Ultimo commit:" -ForegroundColor Cyan
            git log -1 --oneline
        } else {
            Write-Host ""
            Write-Host "Git ainda nao inicializado!" -ForegroundColor Red
            Write-Host "Use a opcao 4 para inicializar" -ForegroundColor Yellow
        }
    }
    
    "3" {
        Write-Host "`nPreparando deploy no Netlify..." -ForegroundColor Green
        
        if (-not (Test-Path ".git")) {
            Write-Host ""
            Write-Host "Inicializando Git..." -ForegroundColor Yellow
            git init
            git add .
            git commit -m "Deploy automatico - Sistema v2.0"
        }
        
        Write-Host ""
        Write-Host "Opcoes de Deploy:" -ForegroundColor Cyan
        Write-Host "1. Via GitHub (Recomendado)" -ForegroundColor White
        Write-Host "   - Faca push para GitHub" -ForegroundColor Gray
        Write-Host "   - Netlify detecta e faz deploy automatico" -ForegroundColor Gray
        Write-Host ""
        Write-Host "2. Deploy Manual com Netlify CLI" -ForegroundColor White
        Write-Host "   - Requer: npm install -g netlify-cli" -ForegroundColor Gray
        Write-Host "   - Comando: netlify deploy --prod" -ForegroundColor Gray
        Write-Host ""
        
        $deployChoice = Read-Host "Escolha (1/2)"
        
        if ($deployChoice -eq "1") {
            Write-Host ""
            Write-Host "Comandos para GitHub:" -ForegroundColor Cyan
            Write-Host "git remote add origin https://github.com/SEU_USUARIO/SEU_REPO.git" -ForegroundColor White
            Write-Host "git branch -M main" -ForegroundColor White
            Write-Host "git push -u origin main" -ForegroundColor White
        } elseif ($deployChoice -eq "2") {
            Write-Host ""
            Write-Host "Executando deploy via CLI..." -ForegroundColor Green
            netlify deploy --prod --dir=web
        }
    }
    
    "4" {
        Write-Host "`nInicializando Git..." -ForegroundColor Green
        
        if (Test-Path ".git") {
            Write-Host ""
            Write-Host "Git ja esta inicializado!" -ForegroundColor Yellow
        } else {
            git init
            git add .
            git commit -m "Inicial - Sistema Estoque Certo v2.0"
            
            Write-Host ""
            Write-Host "Git inicializado com sucesso!" -ForegroundColor Green
            Write-Host ""
            Write-Host "Proximo passo:" -ForegroundColor Cyan
            Write-Host "1. Crie repositorio no GitHub" -ForegroundColor White
            Write-Host "2. Execute:" -ForegroundColor White
            Write-Host "   git remote add origin https://github.com/SEU_USUARIO/SEU_REPO.git" -ForegroundColor Gray
            Write-Host "   git branch -M main" -ForegroundColor Gray
            Write-Host "   git push -u origin main" -ForegroundColor Gray
        }
    }
    
    "5" {
        Write-Host "`nAbrindo documentacao..." -ForegroundColor Green
        Write-Host ""
        Write-Host "Documentos disponiveis:" -ForegroundColor Cyan
        Write-Host "1. GUIA_CONFIGURACAO_COMPLETO.md - Guia detalhado" -ForegroundColor White
        Write-Host "2. README_V2.md - Visao geral do sistema" -ForegroundColor White
        Write-Host "3. INICIO_RAPIDO_V2.md - Setup em 5 minutos" -ForegroundColor White
        Write-Host ""
        
        $docChoice = Read-Host "Qual deseja abrir? (1/2/3)"
        
        switch ($docChoice) {
            "1" { Start-Process "GUIA_CONFIGURACAO_COMPLETO.md" }
            "2" { Start-Process "README_V2.md" }
            "3" { Start-Process "INICIO_RAPIDO_V2.md" }
        }
    }
    
    "6" {
        Write-Host "`nInstalando dependencias..." -ForegroundColor Green
        
        if (Get-Command npm -ErrorAction SilentlyContinue) {
            npm install
            Write-Host ""
            Write-Host "Dependencias instaladas com sucesso!" -ForegroundColor Green
        } else {
            Write-Host ""
            Write-Host "Node.js nao encontrado!" -ForegroundColor Red
            Write-Host "Baixe em: https://nodejs.org/" -ForegroundColor Yellow
        }
    }
    
    "0" {
        Write-Host "`nEncerrando..." -ForegroundColor Gray
        exit
    }
    
    default {
        Write-Host "`nOpcao invalida!" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "Pressione qualquer tecla para continuar..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
