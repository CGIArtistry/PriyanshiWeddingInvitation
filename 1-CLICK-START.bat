@echo off
title Abhishek & Priyanshi — Wedding Website
echo ========================================================
echo   Abhishek & Priyanshi — Cinematic Wedding Invitation
echo   Starting local development server...
echo ========================================================

set "PATH=C:\Users\PantherBeast\nodejs\node-v20.18.0-win-x64;%PATH%"

start "" http://localhost:5173
npm run dev
