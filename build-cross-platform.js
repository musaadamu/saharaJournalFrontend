// Cross-platform build script
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Set environment variables
process.env.CI = 'false';
process.env.NODE_ENV = 'production';
process.env.REACT_APP_API_URL = 'https://saharabackend-v190.onrender.com/api';
process.env.PUBLIC_URL = 'https://sahara-journal-frontend.vercel.app';

console.log('Building React app with the following environment:');
console.log(`CI: ${process.env.CI}`);
console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`REACT_APP_API_URL: ${process.env.REACT_APP_API_URL}`);
console.log(`PUBLIC_URL: ${process.env.PUBLIC_URL}`);

// Ensure the assets directory exists
const assetsDir = path.join(__dirname, 'src', 'assets');
if (!fs.existsSync(assetsDir)) {
  console.log('Creating assets directory...');
  fs.mkdirSync(assetsDir, { recursive: true });
}

// Check if required images exist in assets directory
const requiredImages = ['image3.JPG', 'image4.JPG', 'image5.JPG'];
const missingImages = requiredImages.filter(img => !fs.existsSync(path.join(assetsDir, img)));

if (missingImages.length > 0) {
  console.log(`Missing images in assets directory: ${missingImages.join(', ')}`);
  console.log('Running copy-images script...');
  try {
    require('./copy-images');
  } catch (error) {
    console.error('Error running copy-images script:', error);
  }
}

try {
  // Run the build command
  execSync('react-scripts build', { stdio: 'inherit' });
  console.log('Build completed successfully!');
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
}
