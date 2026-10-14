@echo off
title Abhishek & Priyanshi — Deploy to GitHub Pages
echo ========================================================
echo   Abhishek & Priyanshi — Cinematic Wedding Invitation
echo   Building and Deploying to GitHub Pages (gh-pages)...
echo ========================================================

set "PATH=C:\Users\PantherBeast\nodejs\node-v20.18.0-win-x64;%PATH%"

call npm run build

if %ERRORLEVEL% NEQ 0 (
  echo [ERROR] Build failed! Please fix errors and try again.
  pause
  exit /b %ERRORLEVEL%
)

for /f "tokens=*" %%i in ('git config --get remote.origin.url') do set "REMOTE_URL=%%i"

if "%REMOTE_URL%"=="" (
  echo [ERROR] Could not determine git remote origin URL.
  pause
  exit /b 1
)

echo.
echo Deploying dist folder to gh-pages branch...
pushd dist
git init
git checkout -B gh-pages
git add -A
git -c user.name="Abhishek Pal" -c user.email="328424364+CGIArtistry@users.noreply.github.com" commit -m "Update live website deployment"
git push "%REMOTE_URL%" gh-pages --force
rmdir /s /q .git
popd

echo.
echo ========================================================
echo   Deployment successful!
echo   Website will update in 1-2 minutes at:
echo   https://cgiartistry.github.io/WeddingInvitation/
echo ========================================================
pause
