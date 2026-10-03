@echo off
title JAL - Presentation Launcher
cd /d "%~dp0"
echo ===================================================
echo     JAL: Water Conservation & Revival
echo     4-Week Environmental Leadership Program
echo ===================================================
echo.
echo [1/3] Synchronizing photos...
node fix_images.js >nul 2>&1

echo [2/3] Checking and starting local server...
REM Stop any previous process on port 3000
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :3000 ^| findstr LISTENING') do (
    taskkill /F /PID %%a >nul 2>&1
)

start "JAL Dev Server" /B cmd /c "npm.cmd run dev"

echo [3/3] Waiting for presentation to be ready...
:WAIT_LOOP
timeout /t 2 /nobreak >nul
curl -s http://localhost:3000/Jal >nul 2>&1
if errorlevel 1 (
    goto WAIT_LOOP
)

echo.
echo ===================================================
echo  Presentation is LIVE at: http://localhost:3000/Jal
echo ===================================================
echo.
echo  * Press F11 in browser for Fullscreen mode
echo  * Use Left/Right Arrow Keys or Spacebar to navigate
echo.
echo Opening in your default browser...
start "" "http://localhost:3000/Jal"

echo.
echo (Keep this window open while presenting. Press any key to stop.)
pause >nul

echo Stopping server...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :3000 ^| findstr LISTENING') do (
    taskkill /F /PID %%a >nul 2>&1
)
exit
