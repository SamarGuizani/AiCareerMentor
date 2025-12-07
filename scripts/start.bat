@echo off
echo ========================================
echo   AI Career Mentor - Demarrage
echo ========================================
echo.

REM Check if node_modules exists
if not exist "node_modules" (
    echo Installation des dependances...
    call npm install
    echo.
)

REM Check if .env.local exists
if not exist ".env.local" (
    echo ATTENTION: Le fichier .env.local n'existe pas!
    echo Veuillez le creer avec vos identifiants Supabase et Ollama
    echo.
    pause
)

echo Demarrage du serveur...
echo Le site sera disponible sur http://localhost:3000
echo.
echo Appuyez sur Ctrl+C pour arreter le serveur
echo.

call npm run dev



