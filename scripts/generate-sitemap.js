const fs = require('fs');
const path = require('path');
const axios = require('axios');

// Base URL for the journal website
const BASE_URL = 'https://www.sijtejournal.com.ng';
const API_BASE_URL = 'https://saharabackend-v190.onrender.com/api';

// Generate the sitemap XML
function generateSitemap(journals) {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">

  <!-- Main Pages -->
  <url>
    <loc>${BASE_URL}/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  
  <url>
    <loc>${BASE_URL}/about</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  
  <url>
    <loc>${BASE_URL}/contact</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  
  <url>
    <loc>${BASE_URL}/journal-archive</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  
  <url>
    <loc>${BASE_URL}/submit-journal</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  
  <url>
    <loc>${BASE_URL}/guide</loc>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <url>
    <loc>${BASE_URL}/login</loc>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
  
  <url>
    <loc>${BASE_URL}/register</loc>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>

  <!-- Individual Journal Pages -->
`;

  // Add each journal to the sitemap
  journals.forEach(journal => {
    // Format the date properly
    const lastModDate = journal.publishedDate 
      ? new Date(journal.publishedDate).toISOString().split('T')[0]
      : new Date().toISOString().split('T')[0];
      
    xml += `  <url>
    <loc>${BASE_URL}/journals/${journal._id}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
    <lastmod>${lastModDate}</lastmod>
  </url>
`;
  });

  xml += `</urlset>`;

  return xml;
}

// Fetch journals from the backend API
async function fetchJournals() {
  try {
    console.log('Fetching journals from:', `${API_BASE_URL}/journals`);
    const response = await axios.get(`${API_BASE_URL}/journals`);
    console.log('Successfully fetched', response.data.length, 'journals');
    return response.data;
  } catch (error) {
    console.error('Error fetching journals:', error.message);
    return [];
  }
}

// Main function to generate the sitemap
async function main() {
  try {
    // Fetch journals from the backend
    const journals = await fetchJournals();
    
    // Generate the sitemap XML
    const sitemapXML = generateSitemap(journals);
    
    // Write the sitemap to the public directory
    const outputPath = path.join(__dirname, '..', 'public', 'sitemap.xml');
    fs.writeFileSync(outputPath, sitemapXML);
    
    console.log(`Sitemap generated successfully at: ${outputPath}`);
    console.log(`Included ${journals.length} journal pages`);
  } catch (error) {
    console.error('Error generating sitemap:', error.message);
  }
}

// Run the script
main();
