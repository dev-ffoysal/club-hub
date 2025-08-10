#!/bin/bash

echo "Installing Club Management Hub..."
echo

echo "Step 1: Installing Node.js dependencies..."
npm install

echo
echo "Step 2: Creating environment file..."
if [ ! -f .env.local ]; then
    cp .env.example .env.local
    echo "Environment file created. Please edit .env.local with your configuration."
else
    echo "Environment file already exists."
fi

echo
echo "Step 3: Building the application..."
npm run build

echo
echo "Installation complete!"
echo
echo "To start the development server, run:"
echo "npm run dev"
echo
echo "To start the production server, run:"
echo "npm start"
echo