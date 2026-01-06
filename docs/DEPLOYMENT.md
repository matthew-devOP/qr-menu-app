# Deployment & Setup Guide - QR Smart Menu App

**Version:** 1.0
**Last Updated:** January 6, 2026

Complete guide for setting up the QR Smart Menu application in development and production environments.

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Local Development Setup](#local-development-setup)
3. [Environment Variables](#environment-variables)
4. [Database Setup](#database-setup)
5. [Production Deployment](#production-deployment)
6. [Post-Deployment](#post-deployment)
7. [Troubleshooting](#troubleshooting)
8. [Performance Optimization](#performance-optimization)

---

## Prerequisites

### Required Software

- **Node.js** 18.x or higher ([Download](https://nodejs.org/))
- **npm** 9.x or higher (included with Node.js)
- **PostgreSQL** 14.x or higher ([Download](https://www.postgresql.org/download/))
- **Git** ([Download](https://git-scm.com/downloads))

### Verify Installation

```bash
node --version  # Should be >= 18.0.0
npm --version   # Should be >= 9.0.0
psql --version  # Should be >= 14.0
git --version
```

### Recommended Tools

- **VS Code** with extensions:
  - ESLint
  - Prettier
  - Tailwind CSS IntelliSense
  - Prisma
- **Postman** or **Insomnia** for API testing
- **PostgreSQL GUI:** pgAdmin, DBeaver, or TablePlus

---

## Local Development Setup

### 1. Clone Repository

```bash
git clone <repository-url>
cd qr-menu-app
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required packages:
- Next.js 16.1.1
- React 19.2.3
- Prisma 7.2.0
- NextAuth.js 4.24.13
- Tailwind CSS 4.1.18
- And more (see `package.json`)

### 3. Create Environment File

```bash
cp .env.example .env
```

Edit `.env` and fill in your values (see [Environment Variables](#environment-variables) section).

### 4. Setup Database

See [Database Setup](#database-setup) section for detailed instructions.

### 5. Generate Prisma Client

```bash
npm run prisma:generate
```

### 6. Run Database Migrations

```bash
npm run prisma:migrate
```

When prompted, enter migration name (e.g., "init").

### 7. Seed Database (Optional)

```bash
npm run prisma:seed
```

This will create:
- Default venue (INFINITY LOUNGE)
- Admin user (admin@infinitylounge.ro)
- Sample categories and products

### 8. Start Development Server

```bash
npm run dev
```

Application will be available at `http://localhost:3000`

### 9. Verify Setup

- **Homepage:** http://localhost:3000
- **Admin Login:** http://localhost:3000/admin/login
  - Email: `admin@infinitylounge.ro`
  - Password: `admin123`

---

## Environment Variables

### Required Variables

#### 1. Database URL

```env
DATABASE_URL="postgresql://user:password@localhost:5432/qr_menu_app"
```

**Format:** `postgresql://USER:PASSWORD@HOST:PORT/DATABASE`

**Examples:**
- **Local:** `postgresql://postgres:postgres@localhost:5432/qr_menu_app`
- **Supabase:** `postgresql://postgres:[password]@db.[project-ref].supabase.co:5432/postgres`
- **Railway:** Provided in Railway dashboard
- **Neon:** Provided in Neon console

#### 2. Application URL

```env
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

**Production:** Use your actual domain (e.g., `https://infinitylounge.ro`)

#### 3. NextAuth Configuration

```env
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"
```

**Generate secret:**
```bash
openssl rand -base64 32
```

**Production:** Set `NEXTAUTH_URL` to your domain.

### Optional Variables

#### 4. Application Name

```env
NEXT_PUBLIC_APP_NAME="INFINITY LOUNGE"
```

Displayed in UI headers and meta tags.

#### 5. Cloudinary (Image Storage)

```env
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
CLOUDINARY_FOLDER="qr-menu-app"
```

**Sign up:** https://cloudinary.com (free tier available)

**Currently:** Not implemented, using manual image URLs.

#### 6. Node Environment

```env
NODE_ENV="development"  # or "production"
```

Automatically set by Next.js and hosting platforms.

### Full Example `.env`

```env
# Database
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/qr_menu_app"

# Application
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_APP_NAME="INFINITY LOUNGE"
NODE_ENV="development"

# Authentication
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="change-this-to-a-random-secret-in-production"

# Cloudinary (optional)
# CLOUDINARY_CLOUD_NAME="your-cloud-name"
# CLOUDINARY_API_KEY="your-api-key"
# CLOUDINARY_API_SECRET="your-api-secret"
```

---

## Database Setup

### Option 1: Local PostgreSQL

#### Install PostgreSQL

**macOS (Homebrew):**
```bash
brew install postgresql@14
brew services start postgresql@14
```

**Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
```

**Windows:**
Download installer from https://www.postgresql.org/download/windows/

#### Create Database

```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE qr_menu_app;

# Create user (optional)
CREATE USER qr_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE qr_menu_app TO qr_user;

# Exit
\q
```

#### Update `.env`

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/qr_menu_app"
```

### Option 2: Cloud Database (Recommended for Production)

#### Supabase (Free Tier)

1. Sign up at https://supabase.com
2. Create new project
3. Go to Settings → Database
4. Copy connection string (Pooling mode)
5. Update `.env`:

```env
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres"
```

#### Railway (Free Tier)

1. Sign up at https://railway.app
2. Create new project
3. Add PostgreSQL database
4. Copy `DATABASE_URL` from environment variables
5. Update `.env`

#### Neon (Free Tier)

1. Sign up at https://neon.tech
2. Create new project
3. Copy connection string
4. Update `.env`

### Run Migrations

After setting up database:

```bash
# Generate Prisma Client
npm run prisma:generate

# Run migrations
npm run prisma:migrate

# Verify with Prisma Studio
npm run prisma:studio
```

### Seed Database

```bash
npm run prisma:seed
```

**Creates:**
- 1 Venue (INFINITY LOUNGE)
- 1 Admin user (admin@infinitylounge.ro / admin123)
- 3 Categories (Băuturi, Mâncare, Deserturi)
- 2 Subcategories per category
- 10 Products per subcategory
- 5 QR Codes

---

## Production Deployment

### Option 1: Vercel (Recommended)

Vercel provides the best experience for Next.js applications.

#### Prerequisites

- GitHub, GitLab, or Bitbucket account
- Vercel account (https://vercel.com)

#### Steps

1. **Push code to Git repository**

```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

2. **Connect to Vercel**

- Go to https://vercel.com
- Click "New Project"
- Import your Git repository
- Vercel will auto-detect Next.js

3. **Configure Environment Variables**

In Vercel dashboard:
- Go to Project Settings → Environment Variables
- Add all required variables:
  - `DATABASE_URL`
  - `NEXTAUTH_URL` (your domain)
  - `NEXTAUTH_SECRET`
  - `NEXT_PUBLIC_APP_URL` (your domain)
  - `NEXT_PUBLIC_APP_NAME`

4. **Deploy**

- Click "Deploy"
- Vercel will build and deploy automatically
- Get your production URL (e.g., `qr-menu-app.vercel.app`)

5. **Custom Domain (Optional)**

- Go to Project Settings → Domains
- Add your custom domain
- Update DNS records as instructed
- Update `NEXTAUTH_URL` and `NEXT_PUBLIC_APP_URL`

#### Automatic Deployments

- **Production:** Push to `main` branch
- **Preview:** Push to any other branch

---

### Option 2: Railway

#### Steps

1. **Sign up at https://railway.app**

2. **Create New Project**

- Click "New Project"
- Select "Deploy from GitHub repo"
- Choose your repository

3. **Add PostgreSQL Database**

- Click "New" → "Database" → "PostgreSQL"
- Railway will create database and set `DATABASE_URL`

4. **Configure Environment Variables**

In Railway dashboard:
- Go to Variables tab
- Add:
  - `NEXTAUTH_SECRET`
  - `NEXT_PUBLIC_APP_NAME`

Railway auto-sets:
- `DATABASE_URL`
- `NEXTAUTH_URL` (from Railway domain)
- `NEXT_PUBLIC_APP_URL` (from Railway domain)

5. **Deploy**

Railway will automatically deploy on git push.

---

### Option 3: DigitalOcean App Platform

#### Steps

1. **Sign up at https://www.digitalocean.com**

2. **Create New App**

- Click "Create" → "Apps"
- Connect GitHub repository
- Choose branch (main)

3. **Add Database**

- Add PostgreSQL managed database
- Link to app

4. **Configure Environment Variables**

Add in App Platform settings:
- `NEXTAUTH_SECRET`
- `NEXT_PUBLIC_APP_NAME`
- `DATABASE_URL` (auto-linked)

5. **Deploy**

App Platform will build and deploy.

---

### Option 4: Docker Deployment

#### Create `Dockerfile`

```dockerfile
FROM node:18-alpine AS base

# Dependencies
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Builder
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npx prisma generate
RUN npm run build

# Runner
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]
```

#### Create `docker-compose.yml`

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=${DATABASE_URL}
      - NEXTAUTH_URL=${NEXTAUTH_URL}
      - NEXTAUTH_SECRET=${NEXTAUTH_SECRET}
    depends_on:
      - db

  db:
    image: postgres:14
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=postgres
      - POSTGRES_DB=qr_menu_app
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

#### Build and Run

```bash
docker-compose up -d
```

---

## Post-Deployment

### 1. Verify Deployment

- [ ] Homepage loads correctly
- [ ] Categories display with images
- [ ] Products load on category pages
- [ ] Product modal opens
- [ ] Admin login works
- [ ] Admin CRUD operations work
- [ ] QR codes generate and download

### 2. Create Admin User

If seed didn't run in production:

```bash
# Connect to production database
psql $DATABASE_URL

# Insert admin user (replace hashed password)
INSERT INTO "Admin" (id, email, password, name, role, "createdAt", "updatedAt")
VALUES (
  gen_random_uuid(),
  'admin@yourdomain.com',
  '$2a$10$hashed_password_here',
  'Admin Name',
  'admin',
  NOW(),
  NOW()
);
```

**Generate hashed password:**
```javascript
const bcrypt = require('bcryptjs')
console.log(bcrypt.hashSync('your-password', 10))
```

### 3. Configure Custom Domain

#### Vercel

1. Go to Project Settings → Domains
2. Add your domain (e.g., `infinitylounge.ro`)
3. Add DNS records:
   - Type: A, Name: @, Value: 76.76.21.21
   - Type: CNAME, Name: www, Value: cname.vercel-dns.com
4. Wait for DNS propagation (up to 48 hours)
5. Update environment variables:
   - `NEXTAUTH_URL=https://infinitylounge.ro`
   - `NEXT_PUBLIC_APP_URL=https://infinitylounge.ro`

#### Railway/DigitalOcean

Similar process, refer to platform documentation.

### 4. Setup SSL Certificate

- **Vercel:** Automatic (Let's Encrypt)
- **Railway:** Automatic
- **DigitalOcean:** Automatic
- **Custom:** Use Certbot for Let's Encrypt

### 5. Configure Analytics (Optional)

#### Google Analytics

1. Create GA4 property
2. Get Measurement ID (G-XXXXXXXXXX)
3. Add to environment variables:
```env
NEXT_PUBLIC_GA_ID="G-XXXXXXXXXX"
```

#### Vercel Analytics

Automatically enabled on Vercel, no configuration needed.

### 6. Setup Error Monitoring (Optional)

#### Sentry

1. Sign up at https://sentry.io
2. Create new project (Next.js)
3. Get DSN
4. Add to environment variables:
```env
SENTRY_DSN="https://xxxxx@xxxxx.ingest.sentry.io/xxxxx"
NEXT_PUBLIC_SENTRY_DSN="https://xxxxx@xxxxx.ingest.sentry.io/xxxxx"
```

### 7. Performance Optimization

See [Performance Optimization](#performance-optimization) section.

---

## Troubleshooting

### Database Connection Issues

**Error:** `Can't reach database server`

**Solutions:**
1. Check `DATABASE_URL` format
2. Verify database is running
3. Check firewall/network settings
4. For cloud databases, whitelist your IP

**Test connection:**
```bash
psql $DATABASE_URL
```

### Prisma Migration Errors

**Error:** `Migration failed`

**Solutions:**
1. Check database permissions
2. Reset database (CAREFUL in production):
```bash
npx prisma migrate reset
```
3. Push schema directly (skip migrations):
```bash
npx prisma db push
```

### NextAuth Errors

**Error:** `[next-auth][error][JWT_SESSION_ERROR]`

**Solutions:**
1. Verify `NEXTAUTH_SECRET` is set
2. Regenerate secret:
```bash
openssl rand -base64 32
```
3. Check `NEXTAUTH_URL` matches your domain

### Build Errors on Vercel

**Error:** `Type error: ...`

**Solutions:**
1. Run type-check locally:
```bash
npm run type-check
```
2. Fix TypeScript errors
3. Ensure Prisma client is generated:
```bash
npm run prisma:generate
```

### Image Loading Issues

**Error:** Images not displaying

**Solutions:**
1. Check image URLs are accessible
2. Add domains to `next.config.js`:
```javascript
module.exports = {
  images: {
    domains: ['your-image-domain.com'],
  },
}
```

### API Routes Returning 404

**Solutions:**
1. Check route file location (`src/app/api/...`)
2. Verify file export: `export async function GET()`
3. Check middleware isn't blocking routes

### QR Code Generation Fails

**Error:** QR codes not generating

**Solutions:**
1. Check `qrcode` package is installed
2. Verify API route at `/api/qr-codes/generate`
3. Check URL encoding in requests

---

## Performance Optimization

### 1. Image Optimization

**Use Next.js Image component:**
```tsx
import Image from 'next/image'

<Image
  src="/product.jpg"
  alt="Product"
  width={500}
  height={500}
  quality={85}
  loading="lazy"
/>
```

**Configure image sizes:**
```javascript
// next.config.js
module.exports = {
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
}
```

### 2. Database Query Optimization

**Use Prisma select/include:**
```typescript
// Good: Select only needed fields
const products = await prisma.product.findMany({
  select: {
    id: true,
    name: true,
    price: true,
    image: true,
  },
})

// Better: Use includes for relations
const categories = await prisma.category.findMany({
  include: {
    _count: {
      select: {
        products: true,
        subcategories: true,
      },
    },
  },
})
```

**Add database indexes:**
Already included in schema for frequently queried fields.

### 3. Caching

**API Response Caching (Vercel):**
```typescript
export async function GET(request: Request) {
  const data = await fetchData()

  return NextResponse.json(data, {
    headers: {
      'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
    },
  })
}
```

**React Server Components:**
```typescript
// Automatically cached by Next.js
async function CategoryPage() {
  const categories = await prisma.category.findMany()
  return <CategoryGrid categories={categories} />
}
```

### 4. Code Splitting

Next.js automatically code-splits by route.

**Dynamic imports for heavy components:**
```typescript
import dynamic from 'next/dynamic'

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <Skeleton />,
})
```

### 5. Lighthouse Score Target

Aim for:
- **Performance:** > 90
- **Accessibility:** > 95
- **Best Practices:** > 95
- **SEO:** > 90

**Run audit:**
```bash
# Install Lighthouse CLI
npm install -g lighthouse

# Run audit
lighthouse https://your-domain.com --view
```

---

## Security Checklist

- [ ] Environment variables not committed to Git
- [ ] `NEXTAUTH_SECRET` is strong and random
- [ ] Database has strong password
- [ ] Admin users have strong passwords
- [ ] HTTPS enabled (SSL certificate)
- [ ] CORS configured properly
- [ ] SQL injection prevention (Prisma ORM handles this)
- [ ] XSS prevention (React handles this)
- [ ] CSP headers configured
- [ ] Rate limiting on API routes (consider implementing)

---

## Backup Strategy

### Database Backups

**Automated (Cloud Providers):**
- **Supabase:** Automatic daily backups (paid plans)
- **Railway:** Automatic backups (paid plans)
- **DigitalOcean:** Managed database backups

**Manual Backup:**
```bash
# Export database
pg_dump $DATABASE_URL > backup.sql

# Restore database
psql $DATABASE_URL < backup.sql
```

**Backup Schedule:**
- Daily: Automated
- Weekly: Manual verification
- Before migrations: Always

---

## Monitoring

### Application Monitoring

**Tools:**
- **Vercel Analytics:** Built-in (automatic)
- **Sentry:** Error tracking (optional)
- **Google Analytics:** User analytics (optional)

### Database Monitoring

**Prisma Logs:**
```env
DEBUG="prisma:query"
```

**Supabase Dashboard:**
- Database size
- Connections
- Query performance

### Performance Monitoring

**Vercel Dashboard:**
- Build times
- Function invocations
- Bandwidth usage
- Response times

---

## Scaling Considerations

### Current Limits (Free Tiers)

- **Vercel:** 100 GB bandwidth/month, 100 function invocations/day
- **Supabase:** 500 MB database, 2 GB bandwidth
- **Railway:** $5/month credit

### When to Scale

- Database > 1 GB
- Traffic > 10,000 visitors/month
- Need for multi-region deployment

### Scaling Options

1. **Upgrade hosting plan** (Vercel Pro, Railway Pro)
2. **Add CDN** (Cloudflare)
3. **Implement caching** (Redis)
4. **Database read replicas** (for high read traffic)
5. **Load balancing** (multiple instances)

---

## Resources

### Official Documentation

- [Next.js Docs](https://nextjs.org/docs)
- [Prisma Docs](https://www.prisma.io/docs)
- [NextAuth.js Docs](https://next-auth.js.org/getting-started/introduction)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

### Platform Documentation

- [Vercel Deployment](https://vercel.com/docs/deployments/overview)
- [Railway Deployment](https://docs.railway.app/deploy/deployments)
- [DigitalOcean App Platform](https://docs.digitalocean.com/products/app-platform/)

### Related Docs

- [API Documentation](./API_DOCUMENTATION.md)
- [Component Documentation](./COMPONENTS.md)
- [Database Schema](./DATABASE_SCHEMA.md)
- [Development Guide](./DEVELOPMENT.md)

---

**For deployment support, contact the development team or open an issue on GitHub.**

**Version 1.0 - Ready for Production** 🚀
