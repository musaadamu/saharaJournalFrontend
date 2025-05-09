const fs = require('fs');
const path = require('path');

// Define source and destination directories
const sourceDir = path.join(__dirname, 'public', 'images');
const destDir = path.join(__dirname, 'src', 'assets');

// Create destination directory if it doesn't exist
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
  console.log(`Created directory: ${destDir}`);
}

// Check if source directory exists
if (!fs.existsSync(sourceDir)) {
  console.error(`Source directory does not exist: ${sourceDir}`);
  console.log('Creating example images in the destination directory...');

  // Create placeholder images in the destination directory
  const placeholderImages = [
    { name: 'image3.JPG', color: '#3b82f6' }, // Blue
    { name: 'image4.JPG', color: '#10b981' }, // Green
    { name: 'image5.JPG', color: '#f59e0b' }  // Amber
  ];

  placeholderImages.forEach(img => {
    const svgContent = `<svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="600" fill="${img.color}" />
      <text x="400" y="300" font-family="Arial" font-size="48" text-anchor="middle" fill="white">
        ${img.name}
      </text>
    </svg>`;

    fs.writeFileSync(path.join(destDir, img.name), svgContent);
    console.log(`Created placeholder image: ${img.name}`);
  });

  process.exit(0);
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
      copiedCount++;
      console.log(`Copied: ${file}`);
    }
  });

  console.log(`Successfully copied ${copiedCount} image files.`);

  // Check if we have the required images
  const requiredImages = ['image3.JPG', 'image4.JPG', 'image5.JPG'];
  const missingImages = requiredImages.filter(img => !fs.existsSync(path.join(destDir, img)));

  if (missingImages.length > 0) {
    console.warn(`Warning: The following required images are missing: ${missingImages.join(', ')}`);
    console.log('Creating placeholder images for missing files...');

    missingImages.forEach(img => {
      const color = img === 'image3.jpg' ? '#3b82f6' : img === 'image4.jpg' ? '#10b981' : '#f59e0b';

      const svgContent = `<svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
        <rect width="800" height="600" fill="${color}" />
        <text x="400" y="300" font-family="Arial" font-size="48" text-anchor="middle" fill="white">
          ${img}
        </text>
      </svg>`;

      fs.writeFileSync(path.join(destDir, img), svgContent);
      console.log(`Created placeholder image: ${img}`);
    });
  }
} catch (error) {
  console.error('Error copying files:', error);
}
