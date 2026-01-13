# Environment Variables Guide

## Required Variables (Must be set in production)

### `DATABASE_URL`

- **Type**: String (PostgreSQL connection URL)
- **Example**: `postgresql://user:password@ep-example.eu-west-2.aws.neon.tech/dbname?sslmode=require&channel_binding=require`
- **Source**: Neon PostgreSQL dashboard
- **Required**: YES - Application won't start without this
- **Note**: Must include `?sslmode=require` for security

### `BETTER_AUTH_SECRET`

- **Type**: String (cryptographic secret)
- **Generate**: `node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"`
- **Length**: Must be at least 32 characters
- **Required**: YES - Used for session encryption
- **Note**: NEVER share this secret. Rotate it securely if compromised.

### `BETTER_AUTH_URL`

- **Type**: String (URL)
- **Development**: `http://localhost:3000`
- **Production**: `https://your-domain.vercel.app`
- **Required**: YES - Must match your deployment domain
- **Important**: Incorrect URL will cause authentication failures
- **Update**: Must be updated AFTER Vercel deployment with your actual domain

## Optional Variables (For Enhanced Features)

### `GITHUB_CLIENT_ID` & `GITHUB_CLIENT_SECRET`

- **Type**: Strings (OAuth credentials)
- **Purpose**: Enable GitHub login
- **Setup**: Create OAuth App at https://github.com/settings/developers
- **Required**: NO - Authentication still works without it
- **Recommended**: YES - Improves user experience

### `GOOGLE_CLIENT_ID` & `GOOGLE_CLIENT_SECRET`

- **Type**: Strings (OAuth credentials)
- **Purpose**: Enable Google login
- **Setup**: Create OAuth credentials at https://console.cloud.google.com
- **Required**: NO - Authentication still works without it
- **Recommended**: YES - Popular login option

## Local Development Setup

### Step 1: Create `.env.local`

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

### Step 2: Fill in values

Edit `.env.local` with your actual values:

```bash
DATABASE_URL="your_neon_url_here"
BETTER_AUTH_SECRET="your_generated_secret"
BETTER_AUTH_URL="http://localhost:3000"
```

### Step 3: Verify connection

```bash
npm run db:push  # Test database connection
npm run dev      # Start development server
```

## Production Deployment Setup

### Before Deploying to Vercel

1. **Generate a new BETTER_AUTH_SECRET** (don't reuse development secret):

   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
   ```

2. **Verify DATABASE_URL** is using Neon pooler endpoint:
   - Should contain `-pooler.` in the hostname
   - Provides connection pooling for better performance

### In Vercel Dashboard

1. Go to Settings → Environment Variables
2. Add variables for production:

| Variable             | Value                            |
| -------------------- | -------------------------------- |
| DATABASE_URL         | Your Neon PostgreSQL URL         |
| BETTER_AUTH_SECRET   | New production secret            |
| BETTER_AUTH_URL      | `https://your-domain.vercel.app` |
| GITHUB_CLIENT_ID     | (optional)                       |
| GITHUB_CLIENT_SECRET | (optional)                       |

### After First Deployment

1. Get your actual Vercel URL
2. Update `BETTER_AUTH_URL` in Vercel Environment Variables to match your domain
3. Redeploy to apply the change

## Security Best Practices

### ✅ DO:

- Generate strong secrets using cryptographic methods
- Rotate secrets if they might be exposed
- Use Vercel's built-in secret management
- Keep `.env.local` in `.gitignore`
- Use different secrets for dev/staging/production
- Document which environment each secret belongs to

### ❌ DON'T:

- Commit `.env.local` to Git
- Share secrets in code reviews or messages
- Use the same secret across environments
- Use hardcoded values
- Log secret values to console
- Put secrets in client-side code

## Variable Usage in Code

### Accessing in Server Components/Actions

```typescript
const dbUrl = process.env.DATABASE_URL; // ✅ Works
```

### Accessing in Client Components

```typescript
// For public variables only (must start with NEXT_PUBLIC_):
const appName = process.env.NEXT_PUBLIC_APP_NAME; // ✅ Works

// For secrets (DON'T do this):
const secret = process.env.BETTER_AUTH_SECRET; // ❌ Never expose!
```

## Troubleshooting

### "DATABASE_URL is not defined"

- Verify `.env.local` exists in project root
- Check variable name is exactly `DATABASE_URL`
- Restart dev server: `npm run dev`

### "BETTER_AUTH_SECRET is invalid"

- Ensure secret is at least 32 characters
- Regenerate with: `node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"`
- Update in Vercel dashboard and redeploy

### "Authentication not working after deployment"

- Verify `BETTER_AUTH_URL` matches your Vercel domain exactly
- Check if HTTPS is forced (it should be)
- Clear browser cookies and retry

### "Cannot connect to database"

- Verify `DATABASE_URL` is correct
- Check if Neon database is active (not paused)
- Verify network access is allowed
- Check SSL mode is `require`

## Environment Variable Checklist

Before pushing to production:

- [ ] DATABASE_URL set and tested
- [ ] BETTER_AUTH_SECRET generated with crypto
- [ ] BETTER_AUTH_URL matches domain
- [ ] .env.local in .gitignore
- [ ] All secrets are strong/random
- [ ] No hardcoded secrets in code
- [ ] Production secrets different from development
- [ ] OAuth credentials configured (if using)
- [ ] All variables documented in .env.example
