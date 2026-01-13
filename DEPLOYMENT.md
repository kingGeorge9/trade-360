# Deployment Checklist & Guide

## Pre-Deployment Checklist

### 1. Environment Variables ✅

- [ ] Create a `.env.example` file (done)
- [ ] Ensure all required env vars are documented
- [ ] Never commit `.env.local` to Git (check `.gitignore`)
- [ ] In Vercel dashboard, add all environment variables from `.env.local`

### 2. Database Preparation ✅

- [ ] Your Neon PostgreSQL database is already set up and working
- [ ] Database migrations are applied (`db:push` was used)
- [ ] Seed data is in place (run `npm run db:seed` before deployment if needed)

### 3. Build & Performance ✅

- [ ] Updated `next.config.ts` with optimization settings
- [ ] Image optimization enabled
- [ ] Security headers configured
- [ ] Source maps disabled in production
- [ ] SWC minification enabled

### 4. Code Quality ✅

- [ ] No TypeScript errors (`npm run lint`)
- [ ] No console errors in development
- [ ] All dynamic imports are properly handled
- [ ] Client components properly marked with "use client"

### 5. Database Connection ⚠️

- [ ] DATABASE_URL includes `?sslmode=require` for SSL (required for Neon)
- [ ] CONNECTION POOLING: Currently using direct Neon connection
  - For production with high traffic, consider Neon's built-in pooler endpoint
  - Check your `.env.local` - if using `-pooler.` endpoint, you're good!

### 6. Authentication ✅

- [ ] BETTER_AUTH_SECRET is set (production-grade random value)
- [ ] BETTER_AUTH_URL will need to be updated to your Vercel domain:
  - Example: `https://trade-365.vercel.app`
- [ ] OAuth providers configured (GitHub/Google - optional but recommended)

### 7. Files to Check Before Deployment

```
✅ package.json - scripts and dependencies
✅ next.config.ts - optimized configuration
✅ tsconfig.json - correct compiler options
✅ .gitignore - excludes .env.local and node_modules
✅ drizzle.config.ts - database configuration
```

## Deployment Steps (Vercel)

### Step 1: Prepare Your Repository

```bash
# Ensure everything is committed
git add .
git commit -m "Prepare for deployment"
git push origin main
```

### Step 2: Setup on Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Select the project root (should be auto-detected)
5. Click "Continue"

### Step 3: Configure Environment Variables

In Vercel Dashboard, go to Settings → Environment Variables and add:

```
DATABASE_URL = your_neon_postgresql_url
BETTER_AUTH_SECRET = your_secret_key
BETTER_AUTH_URL = https://your-vercel-domain.vercel.app
GITHUB_CLIENT_ID = (optional)
GITHUB_CLIENT_SECRET = (optional)
GOOGLE_CLIENT_ID = (optional)
GOOGLE_CLIENT_SECRET = (optional)
```

### Step 4: Deploy

Click "Deploy" - Vercel will:

1. Install dependencies
2. Run the build: `npm run build`
3. Deploy to their CDN
4. Provide you with a live URL

### Step 5: Post-Deployment

1. Visit your deployed site
2. Check the console for any errors
3. Test key functionality:
   - [ ] Hero section loads
   - [ ] Products display correctly
   - [ ] Product detail pages work
   - [ ] Favorites/reviews functionality
   - [ ] Loading animations work
   - [ ] Navigation works

## Monitoring & Maintenance

### Vercel Analytics

- Vercel automatically provides performance metrics
- Monitor in Vercel Dashboard → Analytics

### Common Issues & Solutions

#### Issue: "Invalid UUID" errors

**Solution**: Already fixed with UUID validation in `getProduct()`

#### Issue: BETTER_AUTH_URL mismatch

**Solution**: Update environment variable to your Vercel domain after deployment

#### Issue: Database connection timeout

**Solution**:

- Check DATABASE_URL is correct
- Ensure Neon pooler endpoint is used for connection pooling
- Check Neon dashboard for connection limits

#### Issue: Images not loading

**Solution**:

- Images are optimized in next.config.ts
- Ensure image URLs are accessible
- Check image formats (AVIF, WebP support)

## Performance Optimizations Already Applied

✅ **Image Optimization**

- Automatic format conversion (AVIF, WebP)
- Responsive image serving
- 1-year cache for static images

✅ **Security Headers**

- X-Content-Type-Options: nosniff
- X-Frame-Options: SAMEORIGIN
- X-XSS-Protection enabled
- Referrer-Policy configured

✅ **Caching**

- Static assets: 1 hour + 24 hour stale-while-revalidate
- API routes: no-cache (always fresh)

✅ **Code Optimization**

- SWC minification enabled
- Production source maps disabled
- Automatic code splitting

## Post-Deployment Customization

### Update Domain

If you have a custom domain:

1. In Vercel Dashboard → Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed
4. Update BETTER_AUTH_URL to your custom domain

### Environment-Specific Secrets

For maximum security:

1. Use Vercel's built-in secrets management
2. Never expose credentials in commits
3. Rotate secrets periodically

## Database Backups

Since you're using Neon:

- Neon provides automatic backups
- Check Neon dashboard for backup retention policy
- Consider enabling branch deployments for staging

## CI/CD Pipeline

Vercel automatically provides:

- ✅ Preview deployments for PRs
- ✅ Automatic deployments on push to main
- ✅ Rollback capability
- ✅ Automatic SSL certificates

## Quick Reference

**Build Command**: `next build`
**Start Command**: `next start`
**Development**: `npm run dev`
**Lint**: `npm run lint`

**Key Dependencies**:

- Next.js 15.5.9
- React 19
- Drizzle ORM
- Zustand (state management)
- Better Auth
- TailwindCSS

## Support & Resources

- [Next.js Deployment Docs](https://nextjs.org/docs/deployment)
- [Vercel Deployment Docs](https://vercel.com/docs)
- [Neon PostgreSQL Docs](https://neon.tech/docs)
- [Better Auth Docs](https://www.better-auth.com)
