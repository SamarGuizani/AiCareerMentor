@echo off
echo Waiting for server to start...
timeout /t 5 /nobreak >nul
start http://localhost:3000
echo Browser opened!

