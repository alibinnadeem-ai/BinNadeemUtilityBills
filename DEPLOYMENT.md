# Grand City Dashboard - Deployment Guide

## Deployment Status: Ready

This document provides step-by-step instructions for deploying the Grand City Dashboard to Vercel.

---

## Pre-Deployment Checklist

- [x] Database schema created in Neon
- [x] Database seeded with initial data (4 owners, 37 bills, 14 reference records)
- [x] All API endpoints configured
- [x] Build test successful
- [x] Environment variables documented

---

## Step 1: Vercel Account Setup

1. Sign up/log in to [Vercel](https://vercel.com)
2. Install Vercel CLI (if not already installed):
   ```bash
   npm install -g vercel
   ```
3. Login to Vercel:
   ```bash
   vercel login
   ```

---

## Step 2: Configure Environment Variables (Critical!)

### Via Vercel Dashboard (Recommended)

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Go to your project Settings → Environment Variables
3. Add the following variables:

| Variable | Value | Environment |
|----------|-------|-------------|
| `DATABASE_URL` | Your Neon connection string | Production, Preview, Development |
| `NODE_ENV` | `production` | Production, Preview, Development |

### How to get DATABASE_URL from Neon:

1. Go to [Neon Console](https://console.neon.tech)
2. Select your project
3. Go to "Connection Details"
4. Copy the connection string (Node.js/Postgres)
5. Paste it in Vercel as `DATABASE_URL`

**Important:** Make sure `DATABASE_URL` includes `sslmode=require` for production.

---

## Step 3: Deploy to Vercel

### Option A: Deploy from CLI (Local)

Run the following command in your project root:

```bash
vercel --prod
```

Follow the prompts:
- `? Set up and deploy "~/path/to/project"?` → `Y`
- `? Which scope do you want to deploy to?` → Select your account
- `? Link to existing project?` → `N` (first time) or `Y` (updating)
- `? What's your project's name?` → `grand-city-dashboard`
- `? In which directory is your code located?` → `./`
- `? Want to override the settings?` → `N` (use defaults)

### Option B: Deploy from Vercel Dashboard

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New Project"
3. Import your repository (GitHub, GitLab, or Bitbucket)
4. Configure build settings:
   - Framework Preset: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. Add environment variables (see Step 2)
6. Click "Deploy"

---

## Step 4: Verify Deployment

After deployment is complete:

1. Visit your deployed URL (e.g., `https://grand-city-dashboard.vercel.app`)
2. Check the following:
   - [ ] Dashboard loads without errors
   - [ ] Bills are displayed (should see ~37 bills)
   - [ ] Owners are displayed (should see 4 owners)
   - [ ] Create/Edit/Delete functionality works
   - [ ] Health check endpoint returns OK

### Test the API Health Check

```bash
curl https://your-deployment-url.vercel.app/api/health
```

Expected response:
```json
{
  "status": "ok",
  "timestamp": "2025-03-12T..."
}
```

---

## Database Management

### Check Database Status (Local)

```bash
npm run seed:status
```

### Seed New Data (Local)

```bash
npm run seed
```

### Clear and Reseed (Advanced)

Run this in Neon Console SQL Editor:

```sql
TRUNCATE TABLE bills CASCADE;
TRUNCATE TABLE owners CASCADE;
TRUNCATE TABLE reference_data CASCADE;
```

Then run:
```bash
npm run seed
```

---

## Troubleshooting

### Issue: Database Connection Failed

**Error:** `The server does not support SSL connections`

**Solution:** The API files already handle this with `ssl: { rejectUnauthorized: false }`. If you still see errors, check your `DATABASE_URL` format.

### Issue: 404 Errors on API Routes

**Error:** API endpoints return 404

**Solution:** Ensure `vercel.json` is in the project root and contains the correct rewrites:

```json
{
  "rewrites": [
    { "source": "/api/:path*", "destination": "/api/:path*" },
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

### Issue: Build Failed

**Error:** Build failed during deployment

**Solution:**
1. Run `npm run build` locally to reproduce the error
2. Check `package.json` has all required dependencies
3. Ensure `pg` is in dependencies (not devDependencies)

### Issue: Environment Variables Not Working

**Error:** `DATABASE_URL is undefined`

**Solution:**
1. Go to Vercel Dashboard → Project → Settings → Environment Variables
2. Ensure variables are added for all environments
3. Redeploy after adding variables

---

## Updating Existing Deployment

After making changes to your code:

```bash
# Push changes to git
git add .
git commit -m "Update dashboard"
git push

# Deploy to production
vercel --prod
```

Or via Vercel Dashboard:
1. Go to Deployments
2. Click on the latest deployment
3. Click "Redeploy"

---

## Current Project Status

| Component | Status | Details |
|-----------|--------|---------|
| Database | ✅ Seeded | 4 owners, 37 bills, 14 reference records |
| Build | ✅ Passing | Latest build completed successfully |
| API | ✅ Configured | All endpoints ready |
| Ready to Deploy | ✅ Yes | Follow steps above |

---

## Deployment Quick Reference

| Command | Description |
|---------|-------------|
| `npm run dev` | Start local development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run seed` | Seed database (local only) |
| `npm run seed:status` | Check database status (local only) |
| `vercel` | Deploy to preview environment |
| `vercel --prod` | Deploy to production |

---

**Last Updated:** March 2025
