#!/bin/bash

# Exit on error
set -e

# Install dependencies
echo "Installing dependencies..."
npm install --legacy-peer-deps

# Build the app
echo "Building the app..."
npm run build

echo "Build completed successfully!"
