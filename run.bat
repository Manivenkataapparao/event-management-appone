@echo off
REM Start Backend Server with full path to Node.js

setlocal enabledelayedexpansion

cd /d C:\Users\srimv\Downloads\event-management-app\backend

echo.
echo ========================================
echo Starting Backend Server
echo ========================================
echo.
echo Server will run on: http://localhost:5000
echo.
echo Press Ctrl+C to stop
echo.

REM Set NODE_PATH
set PATH=C:\Program Files\nodejs;%PATH%

npm run dev

