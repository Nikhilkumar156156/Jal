@echo off
title JAL - Presentation Launcher
echo ===================================================
echo     JAL: Water Conservation & Revival
echo     4-Week Environmental Leadership Program
echo ===================================================
echo.
echo Synchronizing photos and preparing presentation...

REM Kill any stale node server process running on port 3000
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :3000 ^| findstr LISTENING') do (
    taskkill /F /PID %%a >nul 2>&1
)

REM Sync and normalize all photo extensions
node fix_images.js >nul 2>&1

echo.
echo Starting interactive animated presentation...
echo Press F11 or Esc in browser to toggle fullscreen.
echo Use Arrow Keys or Spacebar to navigate slides.
echo.

start "" /B cmd /c "npx next dev -p 3000"
timeout /t 4 /nobreak >nul

start "" "http://localhost:3000"

echo.
echo Presentation is running at http://localhost:3000
echo Press any key to stop presentation and close server.
pause >nul

for /f "tokens=5" %%a in ('netstat -aon ^| findstr :3000 ^| findstr LISTENING') do (
    taskkill /F /PID %%a >nul 2>&1
)
exit
