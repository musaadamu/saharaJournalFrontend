const fs = require('fs');
const path = require('path');

// Define source and destination directories
const sourceDir = path.join(__dirname, 'public', 'images');
const destDir = path.join(__dirname, 'build', 'images');

// Create destination directory if it doesn't exist
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
  console.log(`Created directory: ${destDir}`);
}

// Check if source directory exists
if (!fs.existsSync(sourceDir)) {
  console.error(`Source directory does not exist: ${sourceDir}`);
  process.exit(1);
}

// Copy all image files from source to destination
try {
  const files = fs.readdirSync(sourceDir);
  
  let copiedCount = 0;
  
  files.forEach(file => {
    // Only copy image files
    if (/\.(jpg|jpeg|png|gif|svg|webp)$/i.test(file)) {
      const sourcePath = path.join(sourceDir, file);
      const destPath = path.join(destDir, file);
      
      // Copy the file
      fs.copyFileSync(sourcePath, destPath);
      
      // Also create a lowercase version for case-sensitive servers
      const lowercaseFile = file.toLowerCase();
      if (lowercaseFile !== file) {
        const lowercasePath = path.join(destDir, lowercaseFile);
        fs.copyFileSync(sourcePath, lowercasePath);
        console.log(`Created lowercase version: ${lowercaseFile}`);
      }
      
      copiedCount++;
      console.log(`Copied: ${file}`);
    }
  });
  
  console.log(`Successfully copied ${copiedCount} image files.`);
} catch (error) {
  console.error('Error copying files:', error);
}
