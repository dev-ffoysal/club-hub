@echo off
echo Starting Club Management Hub...
echo.

echo Checking if node_modules exists...
if not exist node_modules (
    echo Installing dependencies...
    npm install
) else (
    echo Dependencies already installed.
)

echo.
echo Starting development server...
echo Open http://localhost:3000 in your browser
echo Test CSS at: http://localhost:3000/test-css
echo.
echo Press Ctrl+C to stop the server
echo.

npm run dev