# AWS S3 Static Site Deployment Guide

This guide explains how to deploy your React app's `dist` folder to AWS S3 for static site hosting.

## Prerequisites

1. **AWS Account** - Create one at https://aws.amazon.com
2. **AWS CLI** - Install from https://aws.amazon.com/cli/
3. **AWS Credentials** - Configure your access keys

## Step 1: Build Your Project

First, build the production-ready files:

```bash
npm run build
```

This creates a `dist/` folder with optimized static files ready for deployment.

## Step 2: Create an S3 Bucket

### Option A: Using AWS Console (Web UI)

1. Go to https://console.aws.amazon.com/s3/
2. Click **"Create bucket"**
3. **Bucket name**: Enter a unique name (e.g., `ai-tools-app-prod`)
4. **Region**: Choose closest to your users
5. **Unblock public access**: 
   - Uncheck "Block all public access"
   - Check acknowledgment box
6. Click **"Create bucket"**

### Option B: Using AWS CLI

```bash
aws s3 mb s3://ai-tools-app-prod --region us-east-1
```

## Step 3: Configure S3 Bucket for Static Website Hosting

### Using AWS Console:

1. Go to your bucket → **Properties**
2. Scroll to **"Static website hosting"**
3. Click **"Edit"**
4. Enable **"Static website hosting"**
5. **Index document**: `index.html`
6. **Error document**: `index.html` (for React Router to work)
7. Click **"Save changes"**

### Using AWS CLI:

```bash
aws s3 website s3://ai-tools-app-prod/ \
  --index-document index.html \
  --error-document index.html
```

## Step 4: Set Bucket Permissions (Public Read Access)

### Using AWS Console:

1. Go to your bucket → **Permissions**
2. Click **"Bucket Policy"**
3. Paste this policy:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::ai-tools-app-prod/*"
    }
  ]
}
```

Replace `ai-tools-app-prod` with your bucket name.

4. Click **"Save"**

### Using AWS CLI:

```bash
aws s3api put-bucket-policy --bucket ai-tools-app-prod --policy '{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::ai-tools-app-prod/*"
    }
  ]
}'
```

## Step 5: Deploy to S3

### Option A: Using AWS CLI (Simple)

```bash
aws s3 sync dist/ s3://ai-tools-app-prod/ --delete
```

**Flags explained:**
- `dist/` - Source folder (your build output)
- `s3://ai-tools-app-prod/` - Destination bucket
- `--delete` - Removes files from S3 that aren't in dist/ (clean deployment)

### Option B: Upload Individual Files

```bash
aws s3 cp dist/ s3://ai-tools-app-prod/ --recursive
```

### Option C: Using S3 Console

1. Go to your bucket
2. Click **"Upload"**
3. Drag and drop all files from `dist/` folder
4. Click **"Upload"**

## Step 6: Access Your Site

After deployment, your site is available at:

```
http://ai-tools-app-prod.s3-website-us-east-1.amazonaws.com
```

(Replace bucket name and region accordingly)

## Optional: Cache Optimization

Add cache headers to improve performance:

```bash
# Cache static assets (JS, CSS, images) for 1 year
aws s3 sync dist/ s3://ai-tools-app-prod/ \
  --exclude "index.html" \
  --cache-control "max-age=31536000, public"

# Don't cache HTML (always fresh)
aws s3 cp dist/index.html s3://ai-tools-app-prod/index.html \
  --cache-control "max-age=0, must-revalidate"
```

## Optional: Use CloudFront for CDN (Recommended)

CloudFront improves performance by caching your content globally.

### Setup CloudFront:

1. Go to **CloudFront** in AWS Console
2. Click **"Create distribution"**
3. **Origin domain**: Select your S3 bucket
4. **Viewer protocol policy**: Redirect HTTP to HTTPS
5. **Default root object**: `index.html`
6. Click **"Create distribution"**
7. Note your CloudFront domain (e.g., `d123abc.cloudfront.net`)

Then access your site via CloudFront URL instead of S3.

## Automated Deployment Script

Create a file `deploy.sh`:

```bash
#!/bin/bash

# Build the app
echo "Building React app..."
npm run build

# Check if build was successful
if [ $? -ne 0 ]; then
  echo "Build failed!"
  exit 1
fi

# Deploy to S3
BUCKET_NAME="ai-tools-app-prod"
echo "Deploying to S3: $BUCKET_NAME"

# Sync files (delete old files not in dist)
aws s3 sync dist/ s3://$BUCKET_NAME/ --delete

# Set proper cache headers
aws s3 cp dist/index.html s3://$BUCKET_NAME/index.html \
  --cache-control "max-age=0, must-revalidate" \
  --metadata-directive REPLACE

echo "Deployment complete!"
echo "Visit: http://$BUCKET_NAME.s3-website-us-east-1.amazonaws.com"
```

Make it executable:
```bash
chmod +x deploy.sh
```

Run deployment:
```bash
./deploy.sh
```

## Using npm Script

Add to `package.json`:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "deploy": "npm run build && aws s3 sync dist/ s3://ai-tools-app-prod/ --delete"
  }
}
```

Then deploy with:
```bash
npm run deploy
```

## Troubleshooting

### 404 Errors on React Routes

Make sure **Error document** is set to `index.html` in bucket properties. This allows React Router to handle all routes.

### Can't Access Bucket

Check:
1. Bucket policy allows public read access
2. "Block all public access" is unchecked
3. Bucket name and region are correct

### Files Not Updating

Clear CloudFront cache if using CloudFront distribution, or ensure `--delete` flag is used with S3 sync.

### CORS Issues

Add CORS configuration:

```bash
aws s3api put-bucket-cors --bucket ai-tools-app-prod --cors-configuration '{
  "CORSRules": [
    {
      "AllowedMethods": ["GET", "HEAD"],
      "AllowedOrigins": ["*"],
      "AllowedHeaders": ["*"],
      "MaxAgeSeconds": 3000
    }
  ]
}'
```

## Cost Estimation

- **S3 Storage**: ~$0.023 per GB/month (very cheap for static sites)
- **Data transfer**: ~$0.09 per GB out (first 1GB free)
- **CloudFront** (optional): Varies by region, typically $0.085-$0.15 per GB

For most small/medium sites: **$1-10/month**

## Summary Commands

```bash
# 1. Build
npm run build

# 2. Create bucket (one-time)
aws s3 mb s3://ai-tools-app-prod

# 3. Configure static hosting (one-time)
aws s3 website s3://ai-tools-app-prod/ \
  --index-document index.html \
  --error-document index.html

# 4. Set bucket policy (one-time)
# Use the policy from Step 4 above

# 5. Deploy (repeat each time you update)
aws s3 sync dist/ s3://ai-tools-app-prod/ --delete

# 6. Access at:
# http://ai-tools-app-prod.s3-website-us-east-1.amazonaws.com
```

## Next Steps

1. Set up a custom domain using Route 53
2. Enable HTTPS with CloudFront
3. Set up CI/CD pipeline for automatic deployments
4. Monitor with CloudWatch
5. Enable versioning for rollback capability
