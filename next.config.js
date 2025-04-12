/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'sahara-journal-frontend.vercel.app'],
    unoptimized: true,
  },
  // Handle image paths correctly in production
  assetPrefix: process.env.NODE_ENV === 'production' ? '' : '',
  // Ensure public directory is accessible
  publicRuntimeConfig: {
    staticFolder: '/images',
  },
}

module.exports = nextConfig
