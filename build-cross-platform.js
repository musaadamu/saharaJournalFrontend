// Cross-platform build script
const { execSync } = require('child_process');

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

try {
  // Run the build command
  execSync('react-scripts build', { stdio: 'inherit' });
  console.log('Build completed successfully!');
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
}
