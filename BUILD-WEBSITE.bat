@echo off
title Abhishek & Priyanshi — Build Website
echo ========================================================
echo   Abhishek & Priyanshi — Cinematic Wedding Invitation
echo   Building production and offline bundle...
echo ========================================================

set "PATH=C:\Users\PantherBeast\nodejs\node-v20.18.0-win-x64;%PATH%"

npm run build

echo.
echo ========================================================
echo   Build complete! 
echo   You can open dist\index.html directly or run 1-CLICK-PREVIEW.bat
echo ========================================================
pause
