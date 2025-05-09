const fs = require('fs');
const path = require('path');

// Define the assets directory
const assetsDir = path.join(__dirname, 'src', 'assets');

// Create the assets directory if it doesn't exist
if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
  console.log(`Created directory: ${assetsDir}`);
}

// Define the placeholder images
const placeholderImages = [
  { name: 'image3.JPG', color: '#3b82f6', text: 'Sahara Journal Image 3' }, // Blue
  { name: 'image4.JPG', color: '#10b981', text: 'Sahara Journal Image 4' }, // Green
  { name: 'image5.JPG', color: '#f59e0b', text: 'Sahara Journal Image 5' }  // Amber
];

// Create SVG placeholder images
placeholderImages.forEach(img => {
  const svgContent = `<svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
    <rect width="800" height="600" fill="${img.color}" />
    <text x="400" y="300" font-family="Arial" font-size="48" text-anchor="middle" fill="white">
      ${img.text}
    </text>
  </svg>`;
  
  const filePath = path.join(assetsDir, img.name);
  fs.writeFileSync(filePath, svgContent);
  console.log(`Created placeholder image: ${img.name}`);
});

console.log('All placeholder images created successfully!');
