# Quick Reference Card 📋

## One-Page Deployment Guide

### 3 Essential Commands

```bash
# 1. Generate production secret
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

# 2. Push to GitHub
git add . && git commit -m "Ready for deployment" && git push origin main

# 3. Test build locally (optional)
npm run build && npm run start
```

### 3 Required Environment Variables

| Variable             | Source               | Example                        |
| -------------------- | -------------------- | ------------------------------ |
| `DATABASE_URL`       | Neon dashboard       | `postgresql://user:pass@...`   |
| `BETTER_AUTH_SECRET` | Generate (see above) | Long base64 string             |
| `BETTER_AUTH_URL`    | Your Vercel domain   | `https://trade-365.vercel.app` |

### 4 Deployment Steps

1. **Go to vercel.com** → "New Project" → Import your GitHub repo
2. **Add Environment Variables** (in Vercel Settings)
3. **Click Deploy** → Wait 5-10 minutes
4. **Update BETTER_AUTH_URL** if needed → Redeploy

### 5 Quick Tests After Deploy

- [ ] Homepage loads (`/`)
- [ ] Products show (`/products`)
- [ ] Product detail works (`/products/[id]`)
- [ ] Favorites work (click heart button)
- [ ] Reviews work (submit review)

## Common Commands

```bash
npm run dev          # Start development server (port 3000)
npm run build        # Production build
npm run start        # Run production build locally
npm run lint         # Check for errors
npm run db:push      # Apply database migrations
npm run db:seed      # Add test data to database
```

## Key Files

| File             | Purpose             | Action                     |
| ---------------- | ------------------- | -------------------------- |
| `.env.example`   | Variable template   | Reference for setup        |
| `.env.local`     | Local secrets       | Keep private, never commit |
| `next.config.ts` | Build configuration | Auto-optimized ✅          |
| `DEPLOYMENT.md`  | Full guide          | Read if stuck              |
| `ENV_GUIDE.md`   | Variable docs       | Reference for variables    |

## Secrets Management

### Local Development

```bash
# Create .env.local (never commit this!)
DATABASE_URL=postgresql://...
BETTER_AUTH_SECRET=your_secret_here
BETTER_AUTH_URL=http://localhost:3000
```

### Production (Vercel)

Add same variables in:
Vercel Dashboard → Settings → Environment Variables

## Performance Checklist

✅ **Already Optimized**

- Image formats (AVIF, WebP)
- Security headers
- Code minification
- Caching strategy
- Database connection pooling ready

✅ **What to Monitor**

- First Contentful Paint (should be < 1s)
- Time to Interactive (should be < 2.5s)
- Database query time (should be < 100ms)

## Security Checklist

✅ **Already Configured**

- SSL/HTTPS via Vercel
- Security headers
- Database SSL required
- Environment secrets protected
- No hardcoded secrets

❌ **Never Do**

- Commit `.env.local` to Git
- Share BETTER_AUTH_SECRET
- Expose database URL in client code
- Use same secret in dev and production

## Troubleshooting Quick Fixes

| Issue               | Solution                                            |
| ------------------- | --------------------------------------------------- |
| Build fails         | Check `.env.local` exists with DATABASE_URL         |
| Site blank          | Verify BETTER_AUTH_URL in Vercel matches domain     |
| Products don't load | Check DATABASE_URL is correct in Vercel             |
| Auth doesn't work   | Clear cookies, check BETTER_AUTH_URL, redeploy      |
| Images broken       | Check image paths, verify Vercel image optimization |

## Timeline

| Step                      | Time        |
| ------------------------- | ----------- |
| Generate secret           | 1 min       |
| Prepare code (git push)   | 2 min       |
| Create Vercel project     | 3 min       |
| Add environment variables | 5 min       |
| Deploy                    | 5-10 min    |
| Test                      | 5 min       |
| **Total**                 | **~20 min** |

## After Deployment

### Immediate (Do These Now)

- Test homepage
- Test product pages
- Check no errors
- Verify database connection

### Within 24 Hours

- Monitor Vercel Analytics
- Check for error spikes
- Test all features
- Verify performance

### Within 1 Week

- Set up custom domain (optional)
- Configure OAuth (optional)
- Monitor database growth
- Plan backups

## Reference Links

- **Vercel**: https://vercel.com/dashboard
- **Neon Database**: https://console.neon.tech
- **GitHub**: https://github.com
- **Next.js Docs**: https://nextjs.org/docs
- **Better Auth**: https://www.better-auth.com/docs

## File Locations

```
project-root/
├── .env.example           ← Copy to .env.local
├── .env.local            ← NEVER COMMIT (in .gitignore)
├── next.config.ts        ← Production optimized ✅
├── DEPLOYMENT.md         ← Full guide
├── ENV_GUIDE.md          ← Variable reference
├── DEPLOYMENT_CHECKLIST.md ← Step by step
└── src/
    └── lib/actions/product.ts ← UUID validated ✅
```

## Database Info

- **Type**: PostgreSQL (Neon)
- **Location**: EU-West-2
- **SSL**: Required (auto in connection string)
- **Connection Pool**: Ready for production
- **Backup**: Automatic via Neon

## Production Checklist

```
CODE READY
✅ No TypeScript errors
✅ UUID validation added
✅ Security headers configured
✅ Image optimization enabled
✅ .gitignore proper

ENVIRONMENT READY
✅ DATABASE_URL ready
✅ BETTER_AUTH_SECRET generated
✅ BETTER_AUTH_URL prepared

DEPLOYMENT READY
✅ Code pushed to GitHub
✅ Vercel project created
✅ Environment variables added
✅ Ready to deploy!
```

## Success Indicators ✅

You'll know it worked when:

- ✅ Site loads in < 2 seconds
- ✅ All pages work
- ✅ Database connected
- ✅ No errors in console
- ✅ Images load
- ✅ Features work
- ✅ Mobile responsive
- ✅ SSL active (https://)

---

## TL;DR - Deploy in 20 Minutes

1. Run: `node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"`
2. Copy output to clipboard (your secret)
3. Go to vercel.com → New Project → Import GitHub repo
4. Add 3 environment variables (DATABASE_URL, BETTER_AUTH_SECRET, BETTER_AUTH_URL)
5. Click Deploy
6. Get your URL when done
7. Test the site
8. Done! 🎉

---

**Questions?** See `DEPLOYMENT.md` for detailed answers.
