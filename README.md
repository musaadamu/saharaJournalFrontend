# Sahara Journal Frontend

This is the frontend for the Sahara International Journal of Teacher Education.

## Deployment Instructions

### Local Development

1. Install dependencies:
   ```
   npm install
   ```

2. Start the development server:
   ```
   npm start
   ```

### Vercel Deployment

This project is configured for deployment on Vercel. The deployment should be automatic when pushing to the main branch.

#### Manual Deployment

1. Install the Vercel CLI:
   ```
   npm install -g vercel
   ```

2. Deploy to Vercel:
   ```
   vercel
   ```

## Troubleshooting Deployment Issues

If you encounter deployment issues:

1. Check the deployment logs in the Vercel dashboard
2. Verify that the deployment test page is accessible: `/deployment-test.html`
3. Ensure all environment variables are properly set in the Vercel dashboard

## Environment Variables

The following environment variables are required:

- `REACT_APP_API_URL`: The URL of the backend API
- `CI`: Set to `false` to prevent builds from failing on warnings

## Image Loading

The application uses reliable image URLs from Unsplash to ensure images load correctly in all environments.
