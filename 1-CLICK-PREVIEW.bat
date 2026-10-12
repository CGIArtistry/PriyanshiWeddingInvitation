@echo off
title Abhishek & Priyanshi — Wedding Website Preview
echo ========================================================
echo   Abhishek & Priyanshi — Cinematic Wedding Invitation
echo   Starting production preview server...
echo ========================================================

set "PATH=C:\Users\PantherBeast\nodejs\node-v20.18.0-win-x64;%PATH%"

start "" http://127.0.0.1:4173
npm run preview -- --port 4173 --host 127.0.0.1
