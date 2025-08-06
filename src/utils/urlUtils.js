/**
 * URL utility functions for generating consistent URLs across the application
 */

// Get base URL based on environment
export const getBaseUrl = () => {
  // In production, use the actual domain
  if (process.env.NODE_ENV === 'production') {
    return process.env.REACT_APP_BASE_URL || 'https://www.sijtejournal.com.ng';
  }
  // In development, use localhost or configured dev URL
  return process.env.REACT_APP_DEV_URL || 'http://localhost:3000';
};

// Generate canonical URL for journal detail pages
export const getJournalCanonicalUrl = (journalId) => {
  const baseUrl = getBaseUrl();
  return `${baseUrl}/journals/${journalId}`;
};

// Generate canonical URL for homepage
export const getHomeCanonicalUrl = () => {
  return getBaseUrl();
};

// Generate full URL for any path
export const getFullUrl = (path = '') => {
  const baseUrl = getBaseUrl();
  return path ? `${baseUrl}${path}` : baseUrl;
};

// Ensure URL has consistent format (no trailing slash for base, proper path joining)
export const normalizeUrl = (url) => {
  return url.replace(/\/+$/, ''); // Remove trailing slashes
};
