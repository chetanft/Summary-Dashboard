# TMS Dashboard Deployment Guide

This guide provides instructions for deploying the TMS Dashboard application to various environments.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Building for Production](#building-for-production)
- [Deployment Options](#deployment-options)
  - [Static Hosting](#static-hosting)
  - [Docker Deployment](#docker-deployment)
  - [CI/CD Pipeline](#cicd-pipeline)
- [Environment Variables](#environment-variables)
- [Post-Deployment Verification](#post-deployment-verification)
- [Troubleshooting](#troubleshooting)

## Prerequisites

Before deploying the TMS Dashboard, ensure you have the following:

- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher)
- Access to the deployment environment
- Required environment variables

## Building for Production

To build the application for production:

1. Install dependencies:
   ```bash
   npm install
   ```

2. Build the application:
   ```bash
   npm run build
   ```

This will create a `dist` directory with optimized production files.

## Deployment Options

### Static Hosting

The TMS Dashboard can be deployed to any static hosting service.

#### Netlify

1. Install the Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```

2. Login to Netlify:
   ```bash
   netlify login
   ```

3. Deploy the application:
   ```bash
   netlify deploy --prod
   ```

4. When prompted, specify the `dist` directory as the publish directory.

#### Vercel

1. Install the Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy the application:
   ```bash
   vercel --prod
   ```

#### GitHub Pages

1. Create a `deploy.sh` script:
   ```bash
   #!/usr/bin/env sh

   # abort on errors
   set -e

   # build
   npm run build

   # navigate into the build output directory
   cd dist

   # if you are deploying to a custom domain
   # echo 'www.example.com' > CNAME

   git init
   git add -A
   git commit -m 'deploy'

   # if you are deploying to https://<USERNAME>.github.io
   # git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git main

   # if you are deploying to https://<USERNAME>.github.io/<REPO>
   git push -f git@github.com:<USERNAME>/<REPO>.git main:gh-pages

   cd -
   ```

2. Make the script executable:
   ```bash
   chmod +x deploy.sh
   ```

3. Run the script:
   ```bash
   ./deploy.sh
   ```

#### AWS S3 + CloudFront

1. Build the application:
   ```bash
   npm run build
   ```

2. Create an S3 bucket:
   ```bash
   aws s3 mb s3://tms-dashboard
   ```

3. Configure the bucket for static website hosting:
   ```bash
   aws s3 website s3://tms-dashboard --index-document index.html --error-document index.html
   ```

4. Upload the build files:
   ```bash
   aws s3 sync dist/ s3://tms-dashboard
   ```

5. Create a CloudFront distribution pointing to the S3 bucket.

### Docker Deployment

The TMS Dashboard includes a Dockerfile for containerized deployment.

1. Build the Docker image:
   ```bash
   docker build -t tms-dashboard .
   ```

2. Run the container:
   ```bash
   docker run -p 8080:80 tms-dashboard
   ```

3. Access the application at `http://localhost:8080`

#### Docker Compose

For more complex deployments, you can use Docker Compose:

1. Create a `docker-compose.yml` file:
   ```yaml
   version: '3'
   services:
     tms-dashboard:
       build: .
       ports:
         - "8080:80"
       environment:
         - NODE_ENV=production
         - VITE_API_URL=https://api.example.com
   ```

2. Start the services:
   ```bash
   docker-compose up -d
   ```

### CI/CD Pipeline

The TMS Dashboard can be deployed using CI/CD pipelines.

#### GitHub Actions

1. Create a `.github/workflows/deploy.yml` file:
   ```yaml
   name: Deploy

   on:
     push:
       branches: [ main ]

   jobs:
     build-and-deploy:
       runs-on: ubuntu-latest
       steps:
         - name: Checkout
           uses: actions/checkout@v2

         - name: Setup Node.js
           uses: actions/setup-node@v2
           with:
             node-version: '16'

         - name: Install dependencies
           run: npm ci

         - name: Build
           run: npm run build
           env:
             VITE_API_URL: ${{ secrets.VITE_API_URL }}

         - name: Deploy to Netlify
           uses: netlify/actions/cli@master
           env:
             NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
             NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
           with:
             args: deploy --dir=dist --prod
   ```

2. Add the required secrets to your GitHub repository:
   - `VITE_API_URL`: The URL of your API
   - `NETLIFY_AUTH_TOKEN`: Your Netlify authentication token
   - `NETLIFY_SITE_ID`: Your Netlify site ID

#### GitLab CI/CD

1. Create a `.gitlab-ci.yml` file:
   ```yaml
   stages:
     - build
     - deploy

   build:
     stage: build
     image: node:16
     script:
       - npm ci
       - npm run build
     artifacts:
       paths:
         - dist/

   deploy:
     stage: deploy
     image: registry.gitlab.com/gitlab-org/cloud-deploy/aws-base:latest
     script:
       - aws s3 sync dist/ s3://tms-dashboard
       - aws cloudfront create-invalidation --distribution-id $AWS_CLOUDFRONT_DISTRIBUTION_ID --paths "/*"
     only:
       - main
   ```

2. Add the required environment variables to your GitLab CI/CD settings:
   - `AWS_ACCESS_KEY_ID`: Your AWS access key ID
   - `AWS_SECRET_ACCESS_KEY`: Your AWS secret access key
   - `AWS_DEFAULT_REGION`: Your AWS region
   - `AWS_CLOUDFRONT_DISTRIBUTION_ID`: Your CloudFront distribution ID

## Environment Variables

The TMS Dashboard uses environment variables for configuration. Create a `.env` file in the root directory with the following variables:

```
VITE_API_URL=https://api.example.com
VITE_APP_TITLE=TMS Dashboard
VITE_APP_VERSION=1.0.0
```

For production builds, create a `.env.production` file:

```
VITE_API_URL=https://api.example.com
VITE_APP_TITLE=TMS Dashboard
VITE_APP_VERSION=1.0.0
```

## Post-Deployment Verification

After deploying the TMS Dashboard, verify that it's working correctly:

1. Access the application URL
2. Log in with valid credentials
3. Verify that the dashboard loads correctly
4. Check that all features are working as expected
5. Test on different browsers and devices

## Troubleshooting

### Common Issues

#### Application Shows Blank Page

This is often caused by incorrect base URL configuration. Check the `vite.config.js` file and ensure the `base` option is set correctly:

```js
export default defineConfig({
  base: '/',
  // other configuration
});
```

If deploying to a subdirectory, set the base to the subdirectory path:

```js
export default defineConfig({
  base: '/tms-dashboard/',
  // other configuration
});
```

#### API Requests Failing

Check the API URL configuration in the environment variables. Ensure CORS is properly configured on the API server.

#### Authentication Issues

Clear browser cookies and local storage, then try logging in again. Verify that the authentication API endpoint is working correctly.

### Getting Help

If you encounter issues not covered in this guide, please:

1. Check the [GitHub Issues](https://github.com/your-username/tms-dashboard/issues) for similar problems
2. Create a new issue with detailed information about the problem
3. Contact the development team for assistance
