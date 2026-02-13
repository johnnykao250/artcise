@echo off
echo Checking Node.js...
echo.

where node 2>nul
if errorlevel 1 (
  echo "node" not found in PATH.
) else (
  echo Node found above.
)

echo.
if exist "C:\Program Files\nodejs\node.exe" (
  echo "C:\Program Files\nodejs\node.exe" exists.
  "C:\Program Files\nodejs\node.exe" -v
) else (
  echo "C:\Program Files\nodejs\node.exe" NOT FOUND.
)

echo.
echo Press any key to close.
pause >nul
