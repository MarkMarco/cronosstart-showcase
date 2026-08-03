@echo off
setlocal EnableExtensions
chcp 65001 >nul
title CronosStart - Deploy de Producao

REM ============================================================
REM CronosStart - Commit, push e deploy manual na Vercel
REM Coloque este arquivo na raiz do projeto e execute com duplo clique
REM ou pelo CMD:
REM   deploy-cronosstart.bat "feat: minha mensagem de commit"
REM ============================================================

cd /d "%~dp0"
if errorlevel 1 goto :erro

echo.
echo ============================================================
echo   CRONOSSTART - DEPLOY DE PRODUCAO
echo ============================================================
echo Pasta: %CD%
echo.

REM Confirma se estamos dentro de um repositorio Git
git rev-parse --is-inside-work-tree >nul 2>&1
if errorlevel 1 (
    echo ERRO: esta pasta nao e um repositorio Git.
    goto :erro
)

REM Descobre a branch atual
set "BRANCH="
for /f "delims=" %%B in ('git branch --show-current 2^>nul') do set "BRANCH=%%B"

if not defined BRANCH (
    echo ERRO: nao foi possivel identificar a branch atual.
    goto :erro
)

echo Branch atual: %BRANCH%
echo.
echo Alteracoes encontradas:
git status --short
echo.

choice /C SN /N /M "Deseja validar, commitar, enviar e publicar? [S/N]: "
if errorlevel 2 (
    echo Operacao cancelada.
    goto :fim
)

echo.
echo [1/6] Executando verificacao do Astro...
call npm run check
if errorlevel 1 goto :erro

echo.
echo [2/6] Gerando build de producao...
call npm run build
if errorlevel 1 goto :erro

echo.
echo [3/6] Preparando alteracoes para commit...
git add -A
if errorlevel 1 goto :erro

REM Verifica se existem alteracoes para commitar
git diff --cached --quiet
if errorlevel 1 (
    echo.
    echo Arquivos que entrarao no commit:
    git diff --cached --stat
    echo.

    set "COMMIT_MSG=%~1"
    if not defined COMMIT_MSG (
        set /p "COMMIT_MSG=Mensagem do commit: "
    )
    if not defined COMMIT_MSG (
        set "COMMIT_MSG=chore: deploy manual CronosStart"
    )

    echo.
    echo Criando commit: %COMMIT_MSG%
    git commit -m "%COMMIT_MSG%"
    if errorlevel 1 goto :erro
) else (
    echo Nenhuma alteracao nova para commitar. O deploy continuara.
)

echo.
echo [4/6] Enviando branch para o GitHub...
git push
if errorlevel 1 (
    echo Push comum falhou. Tentando configurar upstream...
    git push -u origin "%BRANCH%"
    if errorlevel 1 goto :erro
)

echo.
echo [5/6] Verificando autenticacao da Vercel...
call npx vercel whoami >nul 2>&1
if errorlevel 1 (
    echo Login da Vercel ausente ou expirado.
    echo Limpando eventual token invalido desta sessao...
    set "VERCEL_TOKEN="
    call npx vercel login
    if errorlevel 1 goto :erro
)

REM Associa a pasta ao projeto existente somente se ainda nao estiver ligada
if not exist ".vercel\project.json" (
    echo.
    echo Esta pasta ainda nao esta vinculada a um projeto da Vercel.
    echo Escolha o projeto EXISTENTE da CronosStart.
    call npx vercel link
    if errorlevel 1 goto :erro
)

echo.
echo [6/6] Publicando em producao na Vercel...
call npx vercel --prod
if errorlevel 1 goto :erro

echo.
echo ============================================================
echo   DEPLOY CONCLUIDO COM SUCESSO
echo ============================================================
echo Branch: %BRANCH%
echo Site: https://cronosstart.com.br
echo.
goto :fim

:erro
echo.
echo ============================================================
echo   O PROCESSO FOI INTERROMPIDO POR UM ERRO
echo ============================================================
echo Revise a mensagem acima. Nenhuma etapa posterior foi executada.
echo.
pause
exit /b 1

:fim
echo.
pause
exit /b 0
