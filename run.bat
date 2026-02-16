@echo off
REM Start Frontend Server with full path to Node.js

setlocal enabledelayedexpansion

cd /d C:\Users\srimv\Downloads\event-management-app\frontend

echo.
echo ========================================
echo Starting Frontend Server
echo ========================================
echo.
echo App will run on: http://localhost:3000
echo.
echo Press Ctrl+C to stop
echo.

REM Set NODE_PATH
set PATH=C:\Program Files\nodejs;%PATH%

npm start
