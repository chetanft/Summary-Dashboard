# Deployment Guide

This document explains how to deploy changes to the TMS Dashboard application.

## Deployment Process

The TMS Dashboard is deployed to Netlify. The deployment process is as follows:

1. Changes are made in feature branches
2. Feature branches are merged into the `main` branch
3. Netlify automatically deploys the `main` branch

## Working with Feature Branches

### Creating a Feature Branch

```bash
# Start from main
git checkout main
git pull origin main

# Create a new feature branch
git checkout -b feature/your-feature-name
```

### Making Changes

1. Make your changes in the feature branch
2. Commit your changes
3. Push your changes to GitHub

```bash
git add .
git commit -m "Description of your changes"
git push origin feature/your-feature-name
```

### Merging to Main

To merge your feature branch into main, you can use the provided script:

```bash
# Make sure you're on your feature branch
git checkout feature/your-feature-name

# Run the merge script
./scripts/merge-to-main.sh
```

Alternatively, you can do it manually:

```bash
# Make sure you have the latest changes
git fetch origin

# Checkout main
git checkout main
git pull origin main

# Merge your feature branch
git merge feature/your-feature-name

# Push to main
git push origin main
```

## Netlify Deployment

Netlify is configured to automatically deploy the `main` branch. When changes are pushed to `main`, Netlify will:

1. Detect the changes
2. Build the application using `npm run build`
3. Deploy the built files to the Netlify CDN

### Deployment Contexts

The `netlify.toml` file configures different deployment contexts:

- **Production**: The `main` branch
- **Branch Deploys**: Feature branches can be deployed for testing
- **Deploy Previews**: Pull requests get preview deployments

## Troubleshooting

### Changes Not Appearing in Production

If your changes are not appearing in the production site:

1. Make sure your changes have been merged to `main`
2. Check the Netlify deployment logs for errors
3. Verify that the build process completed successfully

### Build Failures

If the build fails:

1. Check the Netlify logs for error messages
2. Test the build locally with `npm run build`
3. Fix any issues and push the changes again
