@echo off
cd /d "C:\Users\user\artcise"
echo Test server - port 8765. Open:  http://127.0.0.1:8765
echo.

if exist "C:\Program Files\nodejs\node.exe" (
  "C:\Program Files\nodejs\node.exe" test-server.js
) else (
  echo Node not found at "C:\Program Files\nodejs\node.exe"
  echo Trying "node" from PATH...
  node test-server.js
)

echo.
echo If the window closed before this, Node may have crashed. Press any key to close.
pause
