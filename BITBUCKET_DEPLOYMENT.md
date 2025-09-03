# Bitbucket Deployment Guide

## Overview

Unlike GitHub Pages, Bitbucket doesn't provide built-in static site hosting. Here are your deployment options:

## Hosting Options

### 1. **Netlify** (Recommended - Free tier available)
- Connect your Bitbucket repo directly to Netlify
- Automatic deployments on push
- Free SSL and custom domains

**Setup:**
1. Sign up at [netlify.com](https://netlify.com)
2. Click "New site from Git"
3. Choose Bitbucket and authorize
4. Select your repository
5. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Click "Deploy site"

### 2. **Vercel** (Free tier available)
- Similar to Netlify
- Great performance
- Easy setup

**Setup:**
1. Sign up at [vercel.com](https://vercel.com)
2. Import your Bitbucket repository
3. Configure build settings (auto-detected for Vite)
4. Deploy

### 3. **AWS S3 + CloudFront**
- More control but requires AWS knowledge
- Can be very cost-effective
- Use Bitbucket Pipelines for automated deployment

### 4. **Azure Static Web Apps**
- Good if already using Azure
- Free tier available
- Integrates with Bitbucket

## Manual Deployment Steps

If you prefer manual deployment:

```bash
# 1. Build the project
npm run build

# 2. The built files are in the 'dist' folder
# 3. Upload the contents of 'dist' to your hosting service
```

## Important Configuration Changes

### For Root Path Deployment
The `vite.config.ts` has been updated to use `base: '/'` which assumes deployment at the root of your domain.

### For Subdirectory Deployment
If deploying to a subdirectory (e.g., `https://example.com/app/`), update `vite.config.ts`:

```javascript
export default defineConfig({
  base: '/app/', // Your subdirectory path
  // ... rest of config
})
```

## Environment-Specific Base Path

For flexibility, you can make the base path configurable:

```javascript
export default defineConfig({
  base: process.env.VITE_BASE_PATH || '/',
  // ... rest of config
})
```

Then set the environment variable during build:
```bash
VITE_BASE_PATH=/my-app/ npm run build
```

## Bitbucket Pipelines

The `bitbucket-pipelines.yml` file has been created with a basic build configuration. To enable automated deployments:

1. Enable Pipelines in your Bitbucket repository settings
2. Add deployment steps for your chosen hosting service
3. Configure repository variables for API keys/tokens

## Next Steps

1. Choose a hosting provider
2. Update deployment configuration if needed
3. Set up continuous deployment (optional)
4. Update any hardcoded URLs in your application 