#!/bin/bash

# Exit on error
set -e

# Set environment variables for production
export NODE_ENV=production
export PUBLIC_URL=https://sahara-journal-frontend.vercel.app
export REACT_APP_API_URL=https://saharabackend-v190.onrender.com/api
export CI=false

# Install dependencies
echo "Installing dependencies..."
npm install --legacy-peer-deps

# Build the app
echo "Building the app..."
npm run build

echo "Build completed successfully!"
echo "The build files are in the 'build' directory."
echo "You can now deploy these files to Vercel."
