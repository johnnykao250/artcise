@echo off
cd /d "C:\Users\user\artcise"
echo Starting Artcise on port 3001...
echo When you see "Ready", open:  http://127.0.0.1:3001
echo.

if exist "C:\Program Files\nodejs\npx.cmd" (
  "C:\Program Files\nodejs\npx.cmd" next dev -H 0.0.0.0 -p 3001
) else (
  echo npx not found. Trying "npm run dev"...
  "C:\Program Files\nodejs\npm.cmd" run dev
)

echo.
echo Press any key to close.
pause
