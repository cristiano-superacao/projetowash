# ============================================================================
# SCRIPT DE INICIALIZAÇÃO - Windows PowerShell
# ============================================================================
# Este script automatiza a instalação e inicialização do sistema
# ============================================================================

Write-Host ""
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "   SISTEMA ESTOQUE CERTO LTDA" -ForegroundColor Cyan
Write-Host "   Script de Inicialização" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

# Verificar se Python está instalado
Write-Host "Verificando Python..." -ForegroundColor Yellow
try {
    $pythonVersion = python --version 2>&1
    Write-Host "✓ Python encontrado: $pythonVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ Python não encontrado!" -ForegroundColor Red
    Write-Host "  Por favor, instale Python 3.8+ de: https://www.python.org/downloads/" -ForegroundColor Red
    exit
}

Write-Host ""
Write-Host "Instalando dependências..." -ForegroundColor Yellow
pip install flask flask-cors

if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Dependências instaladas com sucesso!" -ForegroundColor Green
} else {
    Write-Host "✗ Erro ao instalar dependências!" -ForegroundColor Red
    exit
}

Write-Host ""
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "   Escolha o modo de execução:" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "1 - Modo Web/PWA (Navegador + Instalável)" -ForegroundColor White
Write-Host "2 - Modo Console (Terminal)" -ForegroundColor White
Write-Host ""

$escolha = Read-Host "Digite sua escolha (1 ou 2)"

Write-Host ""

if ($escolha -eq "1") {
    Write-Host "Iniciando servidor web..." -ForegroundColor Yellow
    Write-Host ""
    Write-Host "🌐 Acesse: http://localhost:5000" -ForegroundColor Green
    Write-Host "💡 Pressione Ctrl+C para encerrar" -ForegroundColor Yellow
    Write-Host ""
    python app.py
} elseif ($escolha -eq "2") {
    Write-Host "Iniciando modo console..." -ForegroundColor Yellow
    Write-Host ""
    Set-Location -Path "src"
    python main.py
    Set-Location -Path ".."
} else {
    Write-Host "Opção inválida!" -ForegroundColor Red
}

Write-Host ""
Write-Host "Sistema encerrado." -ForegroundColor Cyan
