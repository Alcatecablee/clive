# Deploying to Vercel with Custom Domain

This guide covers deploying the Fusion Starter application to Vercel with the custom domain `justc.live`.

## Prerequisites

- GitHub account (or GitLab/Bitbucket)
- Vercel account (sign up at [vercel.com](https://vercel.com))
- Domain `justc.live` with access to DNS settings
- All code pushed to a Git repository

## Project Configuration

The project is already configured for Vercel deployment with:

- **vercel.json**: Deployment configuration
- **api/[...path].ts**: Serverless API handler for Express routes
- **Build output**: Static SPA in `dist/spa/`

### Key Configuration Files

#### vercel.json
```json
{
  "version": 2,
  "buildCommand": "pnpm build:client",
  "outputDirectory": "dist/spa",
  "installCommand": "pnpm install",
  "functions": {
    "api/**/*.ts": {
      "runtime": "nodejs20.x"
    }
  },
  "rewrites": [
    {
      "source": "/:path((?!api).*)*",
      "destination": "/index.html"
    }
  ]
}
```

#### api/[...path].ts
- Serverless function that wraps Express app
- Handles all `/api/*` routes
- Compatible with Vercel's Node.js runtime

## Deployment Steps

### Option 1: Deploy via Git (Recommended)

1. **Push code to GitHub/GitLab/Bitbucket**
   ```bash
   git add .
   git commit -m "Configure for Vercel deployment"
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Select your Git repository
   - Vercel auto-detects the configuration
   - Click "Deploy"

3. **Wait for deployment**
   - Vercel will build and deploy automatically
   - You'll get a URL like `your-project.vercel.app`

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   # Development deployment
   vercel
   
   # Production deployment
   vercel --prod
   ```

## Custom Domain Setup (justc.live)

### Step 1: Add Domain to Vercel

1. Open your project on Vercel Dashboard
2. Go to **Settings** → **Domains**
3. Enter `justc.live` in the domain field
4. Click **Add**

### Step 2: Configure DNS

Vercel will provide DNS configuration options. Choose one:

#### Option A: Vercel Nameservers (Recommended - Easiest)

1. In Vercel, click **Use Vercel Nameservers**
2. Copy the nameserver addresses (e.g., `ns1.vercel-dns.com`, `ns2.vercel-dns.com`)
3. Go to your domain registrar (where you bought justc.live)
4. Find **Nameservers** or **DNS Management**
5. Change nameservers to Vercel's nameservers
6. Save changes

**Propagation time:** Usually 5-30 minutes, up to 48 hours

#### Option B: DNS Records (A/CNAME)

If you prefer to keep your current DNS provider:

**For root domain (justc.live):**
```
Type: A
Name: @
Value: 76.76.21.21
TTL: 3600
```

**For www subdomain (www.justc.live):**
```
Type: CNAME  
Name: www
Value: cname.vercel-dns.com
TTL: 3600
```

### Step 3: Configure Domain Redirect

1. Add both `justc.live` and `www.justc.live` as domains
2. Select one as primary (e.g., `justc.live`)
3. Click **Edit** on the other domain
4. Select **Redirect to** → Choose primary domain

This ensures visitors see your preferred domain.

## Environment Variables

If your API needs environment variables:

1. Go to **Settings** → **Environment Variables**
2. Add variables:
   - `PING_MESSAGE` (example)
   - Any API keys or secrets
3. Choose environment: Production, Preview, or Development
4. Click **Save**

Variables are accessible via `process.env.VARIABLE_NAME` in your code.

## Verify Deployment

After deployment, test these endpoints:

### Frontend (SPA)
- `https://justc.live/` - Home page
- `https://justc.live/#about` - About section
- `https://justc.live/#experience` - Experience section

### API Routes
- `https://justc.live/api/ping` - Should return JSON with ping message
- `https://justc.live/api/demo` - Should return demo data

## Development Workflow

1. **Make changes locally**
   ```bash
   pnpm dev  # Test on http://localhost:5000
   ```

2. **Commit and push**
   ```bash
   git add .
   git commit -m "Your changes"
   git push
   ```

3. **Auto-deployment**
   - Vercel automatically deploys on push
   - Preview deployments for branches
   - Production deployment for main branch

## Troubleshooting

### API Routes Return 404
- Ensure routes start with `/api/`
- Check `vercel.json` configuration
- Verify `api/[...path].ts` exists

### Custom Domain Not Working
- Wait for DNS propagation (up to 48 hours)
- Verify DNS records are correct
- Check Vercel domain status in dashboard
- Try accessing via `www.justc.live` if `justc.live` doesn't work (or vice versa)

### Build Fails
- Check build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`
- Verify `pnpm build:client` works locally

### Environment Variables Not Working
- Ensure variables are set in Vercel dashboard
- Redeploy after adding new variables
- Check variable names match your code

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Custom Domains Guide](https://vercel.com/docs/domains)
- [Serverless Functions](https://vercel.com/docs/functions)
- [Environment Variables](https://vercel.com/docs/environment-variables)

## Support

For issues specific to:
- **Vercel platform**: Contact Vercel support
- **Domain registration**: Contact your domain registrar
- **Application code**: Check project documentation
