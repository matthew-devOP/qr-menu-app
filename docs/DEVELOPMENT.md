# Development Guide - QR Smart Menu App

**Version:** 1.0
**Last Updated:** January 6, 2026

Complete guide for developers contributing to the QR Smart Menu application.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [Development Setup](#development-setup)
5. [Code Standards](#code-standards)
6. [Development Workflow](#development-workflow)
7. [Common Patterns](#common-patterns)
8. [Testing Strategy](#testing-strategy)
9. [Debugging Tips](#debugging-tips)
10. [Contributing](#contributing)

---

## Project Overview

### Purpose

QR Smart Menu is a modern web application for restaurants and lounges to provide digital menus accessible via QR codes. Customers scan a QR code at their table to view an interactive, mobile-friendly menu.

### Key Features

- **Digital Menu:** Multi-level navigation (Categories → Subcategories → Products)
- **Admin Panel:** Complete CRUD operations for menu management
- **QR Code System:** Generate, track, and download QR codes
- **Responsive Design:** Mobile-first, works on all devices
- **Authentication:** Secure admin access with NextAuth.js
- **Multi-language Ready:** Database structure supports RO/EN (UI currently RO)

### Project Goals

- **Performance:** Lighthouse score > 90
- **Accessibility:** WCAG 2.1 AA compliance
- **SEO:** Optimized meta tags and structure
- **Maintainability:** Clean, documented code
- **Scalability:** Support for multiple venues (planned)

---

## Tech Stack

### Frontend

- **Framework:** Next.js 16.1.1 (App Router)
- **UI Library:** React 19.2.3
- **Language:** TypeScript 5.9.3
- **Styling:** Tailwind CSS 4.1.18
- **Components:** Shadcn/ui
- **Icons:** Lucide React
- **Notifications:** Sonner

### Backend

- **Runtime:** Node.js 18+
- **ORM:** Prisma 7.2.0
- **Database:** PostgreSQL 14+
- **Authentication:** NextAuth.js 4.24.13
- **Session:** JWT strategy

### Additional Libraries

- **QR Generation:** qrcode
- **Password Hashing:** bcryptjs
- **Class Utilities:** clsx, tailwind-merge
- **Validation:** Zod (planned)

### Development Tools

- **Package Manager:** npm
- **Linting:** ESLint
- **Type Checking:** TypeScript compiler
- **Database GUI:** Prisma Studio

---

## Project Structure

```
qr-menu-app/
├── .next/                  # Next.js build output
├── docs/                   # Documentation
│   ├── API_DOCUMENTATION.md
│   ├── COMPONENTS.md
│   ├── DEPLOYMENT.md
│   ├── ADMIN_GUIDE.md
│   ├── DEVELOPMENT.md
│   └── DATABASE_SCHEMA.md
├── node_modules/           # Dependencies
├── prisma/                 # Database
│   ├── schema.prisma      # Database schema
│   └── seed.ts            # Seed data
├── public/                # Static assets
│   └── images/            # Images (if local)
├── src/                   # Source code
│   ├── app/               # Next.js App Router
│   │   ├── (auth)/        # Auth routes group
│   │   │   └── admin/     # Admin panel
│   │   ├── api/           # API routes
│   │   │   ├── auth/      # NextAuth endpoints
│   │   │   ├── categories/
│   │   │   ├── products/
│   │   │   └── qr-codes/
│   │   ├── [categorySlug]/ # Dynamic category pages
│   │   ├── layout.tsx     # Root layout
│   │   ├── page.tsx       # Homepage
│   │   └── globals.css    # Global styles
│   ├── components/        # React components
│   │   ├── admin/         # Admin components
│   │   ├── menu/          # Menu components
│   │   ├── qr/            # QR components
│   │   ├── ui/            # Shadcn/ui primitives
│   │   └── providers/     # Context providers
│   ├── lib/               # Utilities
│   │   ├── constants.ts   # App constants
│   │   ├── prisma.ts      # Prisma client
│   │   ├── utils.ts       # Utility functions
│   │   └── auth.ts        # Auth config
│   └── types/             # TypeScript types
│       └── index.ts       # Type definitions
├── .env                   # Environment variables (local)
├── .env.example           # Environment template
├── .gitignore             # Git ignore rules
├── next.config.js         # Next.js configuration
├── package.json           # Dependencies
├── tsconfig.json          # TypeScript config
├── tailwind.config.ts     # Tailwind config
├── postcss.config.js      # PostCSS config
└── README.md              # Project readme
```

### Key Directories

**`src/app/`** - Next.js App Router
- File-based routing
- Server and client components
- API routes
- Layouts and templates

**`src/components/`** - React Components
- Reusable UI components
- Organized by feature/domain
- Each with TypeScript props interface

**`src/lib/`** - Utilities
- Helper functions
- Shared logic
- Prisma client instance
- Constants and config

**`prisma/`** - Database
- Schema definition
- Migrations
- Seed scripts

---

## Development Setup

### Prerequisites

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed setup instructions.

**Quick start:**

```bash
# Clone repository
git clone <repository-url>
cd qr-menu-app

# Install dependencies
npm install

# Setup environment
cp .env.example .env
# Edit .env with your values

# Generate Prisma client
npm run prisma:generate

# Run migrations
npm run prisma:migrate

# Seed database
npm run prisma:seed

# Start dev server
npm run dev
```

### Available Scripts

```json
{
  "dev": "next dev",                    // Start development server
  "build": "next build",                // Production build
  "start": "next start",                // Start production server
  "lint": "next lint",                  // Run ESLint
  "type-check": "tsc --noEmit",         // Check TypeScript
  "prisma:generate": "prisma generate", // Generate Prisma client
  "prisma:migrate": "prisma migrate dev", // Run migrations
  "prisma:seed": "tsx prisma/seed.ts",  // Seed database
  "prisma:studio": "prisma studio"      // Open Prisma Studio GUI
}
```

### Environment Variables

Required for development (see `.env.example`):

```env
DATABASE_URL="postgresql://..."
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_APP_NAME="INFINITY LOUNGE"
```

---

## Code Standards

### TypeScript

**Strict mode enabled:**
```json
{
  "compilerOptions": {
    "strict": true
  }
}
```

**Always define types:**

```typescript
// ✅ Good
interface ProductCardProps {
  product: MenuProduct
  onClick?: () => void
}

export function ProductCard({ product, onClick }: ProductCardProps) {
  // ...
}

// ❌ Bad
export function ProductCard(props: any) {
  // ...
}
```

**Use type inference where appropriate:**

```typescript
// ✅ Good
const [isLoading, setIsLoading] = useState(false) // boolean inferred

// ❌ Unnecessary
const [isLoading, setIsLoading] = useState<boolean>(false)
```

### React Components

**Use functional components:**

```typescript
// ✅ Good
export function MyComponent() {
  return <div>...</div>
}

// ❌ Bad (outdated)
class MyComponent extends React.Component {
  render() {
    return <div>...</div>
  }
}
```

**Client vs Server components:**

```typescript
// Server component (default)
export default async function CategoryPage() {
  const categories = await prisma.category.findMany()
  return <CategoryGrid categories={categories} />
}

// Client component (with 'use client')
'use client'

import { useState } from 'react'

export function ProductCard() {
  const [isOpen, setIsOpen] = useState(false)
  return <div onClick={() => setIsOpen(true)}>...</div>
}
```

### Naming Conventions

**Files:**
- Components: `PascalCase.tsx` (e.g., `ProductCard.tsx`)
- Utilities: `camelCase.ts` (e.g., `utils.ts`)
- Types: `index.ts` or `types.ts`

**Variables:**
- Constants: `UPPER_SNAKE_CASE` (e.g., `APP_NAME`)
- Variables: `camelCase` (e.g., `isLoading`)
- Components: `PascalCase` (e.g., `ProductCard`)
- Functions: `camelCase` (e.g., `formatPrice`)

**Functions:**
- Event handlers: `handle` prefix (e.g., `handleClick`)
- Boolean getters: `is`/`has` prefix (e.g., `isAvailable`)
- Async functions: `fetch`/`get`/`create` (e.g., `fetchProducts`)

### Styling with Tailwind

**Use utility classes:**

```tsx
<div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md">
  {/* Content */}
</div>
```

**Use `cn()` for conditional classes:**

```tsx
import { cn } from '@/lib/utils'

<div className={cn(
  'base-classes',
  isActive && 'active-classes',
  className // Allow props override
)}>
```

**Use design tokens:**

```tsx
// ✅ Good - Use custom colors
<div className="bg-brand-primary text-white">

// ❌ Bad - Hardcoded colors
<div className="bg-[#1a1a1a] text-white">
```

**Design tokens available:**

```typescript
colors: {
  brand: {
    primary: '#1a1a1a',      // Black
    secondary: '#fbbf24',     // Gold
  },
  text: {
    primary: '#1a1a1a',
    secondary: '#6b7280',     // Gray
    muted: '#9ca3af',         // Light gray
  },
  state: {
    success: '#10b981',       // Green
    error: '#ef4444',         // Red
    warning: '#f59e0b',       // Orange
    info: '#3b82f6',          // Blue
  }
}
```

### API Routes

**Standard structure:**

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const data = await prisma.model.findMany()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const created = await prisma.model.create({ data: body })
    return NextResponse.json(created, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    )
  }
}
```

**Authentication:**

```typescript
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  // Proceed with authenticated logic
}
```

---

## Development Workflow

### Git Workflow

**Branching strategy:**

```bash
main                 # Production branch
├── develop          # Development branch
└── feature/xyz      # Feature branches
```

**Creating a feature:**

```bash
# Create feature branch
git checkout -b feature/add-search

# Make changes, commit often
git add .
git commit -m "feat: add search functionality"

# Push to remote
git push -u origin feature/add-search

# Create pull request on GitHub
```

**Commit message format:**

```
type(scope): subject

Examples:
feat(products): add search filter
fix(qr): resolve QR generation bug
docs(api): update endpoint documentation
style(ui): improve button spacing
refactor(auth): simplify session logic
test(products): add unit tests
chore(deps): update dependencies
```

**Types:**
- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation
- `style` - Code style (formatting)
- `refactor` - Code refactoring
- `test` - Adding tests
- `chore` - Maintenance tasks

### Code Review Checklist

**Before submitting PR:**

- [ ] Code follows style guide
- [ ] TypeScript types defined
- [ ] No console.log statements (except error logging)
- [ ] Responsive design tested (mobile, tablet, desktop)
- [ ] Accessibility checked (keyboard nav, ARIA labels)
- [ ] No hardcoded values (use constants)
- [ ] Error handling implemented
- [ ] Loading states included
- [ ] Documentation updated if needed
- [ ] Git commit messages follow convention

### Testing Locally

**Manual testing:**

```bash
# Start dev server
npm run dev

# Test in multiple browsers
- Chrome
- Firefox
- Safari
- Mobile browsers (Chrome DevTools device mode)

# Test functionality
- Create/edit/delete operations
- Form validation
- Image loading
- QR code generation
- Authentication flow
```

**Type checking:**

```bash
npm run type-check
```

**Linting:**

```bash
npm run lint
```

**Database testing:**

```bash
# Reset database
npx prisma migrate reset

# Re-seed
npm run prisma:seed

# Inspect data
npm run prisma:studio
```

---

## Common Patterns

### Data Fetching (Server Components)

```typescript
// app/products/page.tsx
import { prisma } from '@/lib/prisma'

export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    include: {
      category: true,
    },
  })

  return <ProductGrid products={products} />
}
```

### State Management (Client Components)

```typescript
'use client'

import { useState, useEffect } from 'react'

export function ProductList() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products')
      const data = await response.json()
      setProducts(data)
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) return <Skeleton />

  return (
    <div>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
```

### Form Handling

```typescript
'use client'

import { useState } from 'react'
import { toast } from 'sonner'

export function CreateProductModal({ onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    name: '',
    price: 0,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message)
      }

      toast.success('Product created!')
      onSuccess()
      onClose()
    } catch (error) {
      toast.error(error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
      />
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Creating...' : 'Create'}
      </button>
    </form>
  )
}
```

### Modal Pattern

```typescript
'use client'

import { useEffect } from 'react'

export function Modal({ isOpen, onClose, children }) {
  // Close on ESC key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg p-6 max-w-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  )
}
```

### Prisma Queries

```typescript
// Find with relations
const categories = await prisma.category.findMany({
  include: {
    subcategories: true,
    products: {
      where: { isAvailable: true },
    },
    _count: {
      select: {
        products: true,
      },
    },
  },
})

// Create with relations
const product = await prisma.product.create({
  data: {
    name: 'Espresso',
    price: 8.50,
    category: {
      connect: { id: categoryId },
    },
  },
})

// Update
const updated = await prisma.product.update({
  where: { id: productId },
  data: { price: 10.00 },
})

// Delete
await prisma.product.delete({
  where: { id: productId },
})
```

---

## Testing Strategy

### Current State

Version 1.0 has no automated tests. Manual testing only.

### Planned Testing

**Unit Tests (Jest + React Testing Library):**

```typescript
// Example: __tests__/components/ProductCard.test.tsx
import { render, screen } from '@testing-library/react'
import { ProductCard } from '@/components/menu/ProductCard'

describe('ProductCard', () => {
  it('renders product name', () => {
    const product = { id: '1', name: 'Espresso', price: 8.50 }
    render(<ProductCard product={product} />)
    expect(screen.getByText('Espresso')).toBeInTheDocument()
  })

  it('shows discount badge when oldPrice exists', () => {
    const product = {
      id: '1',
      name: 'Espresso',
      price: 8.50,
      oldPrice: 10.00,
    }
    render(<ProductCard product={product} />)
    expect(screen.getByText('-15%')).toBeInTheDocument()
  })
})
```

**Integration Tests (Playwright):**

```typescript
// Example: e2e/admin-crud.spec.ts
import { test, expect } from '@playwright/test'

test('admin can create category', async ({ page }) => {
  await page.goto('/admin/login')
  await page.fill('[name="email"]', 'admin@test.com')
  await page.fill('[name="password"]', 'password')
  await page.click('button[type="submit"]')

  await page.goto('/admin/categories')
  await page.click('text=Add Category')
  await page.fill('[name="name"]', 'Test Category')
  await page.click('text=Create Category')

  await expect(page.locator('text=Test Category')).toBeVisible()
})
```

**API Tests (Jest + Supertest):**

```typescript
// Example: __tests__/api/products.test.ts
import { GET } from '@/app/api/products/route'

describe('GET /api/products', () => {
  it('returns array of products', async () => {
    const request = new Request('http://localhost:3000/api/products')
    const response = await GET(request)
    const data = await response.json()

    expect(Array.isArray(data)).toBe(true)
    expect(data[0]).toHaveProperty('id')
    expect(data[0]).toHaveProperty('name')
  })
})
```

---

## Debugging Tips

### React DevTools

Install React DevTools browser extension:
- Inspect component hierarchy
- View props and state
- Profile performance

### Next.js Debug Mode

```json
// package.json
{
  "scripts": {
    "dev:debug": "NODE_OPTIONS='--inspect' next dev"
  }
}
```

Then open `chrome://inspect` in Chrome.

### Prisma Query Logging

```env
# .env
DEBUG="prisma:query"
```

Shows all SQL queries in console.

### API Route Debugging

```typescript
export async function GET(request: NextRequest) {
  console.log('Request URL:', request.url)
  console.log('Headers:', request.headers)

  const data = await fetchData()
  console.log('Response data:', data)

  return NextResponse.json(data)
}
```

### Common Issues

**Issue: "Module not found"**
- Check import path
- Ensure `@/` alias in tsconfig.json
- Restart dev server

**Issue: "Prisma Client not generated"**
```bash
npm run prisma:generate
```

**Issue: "Type errors in build"**
```bash
npm run type-check
```

**Issue: "Styles not applying"**
- Check Tailwind content paths in `tailwind.config.ts`
- Restart dev server
- Clear `.next` folder

**Issue: "Database connection failed"**
- Check DATABASE_URL in .env
- Verify database is running
- Test with `psql $DATABASE_URL`

---

## Contributing

### Getting Started

1. **Fork the repository**
2. **Clone your fork:**
   ```bash
   git clone https://github.com/your-username/qr-menu-app.git
   ```
3. **Create feature branch:**
   ```bash
   git checkout -b feature/your-feature
   ```
4. **Make changes and commit:**
   ```bash
   git commit -m "feat: your feature description"
   ```
5. **Push to your fork:**
   ```bash
   git push origin feature/your-feature
   ```
6. **Create Pull Request**

### Pull Request Guidelines

**PR Title Format:**
```
feat(scope): description
```

**PR Description Template:**
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Tested locally
- [ ] Responsive design verified
- [ ] Type checking passed
- [ ] Linting passed

## Screenshots (if applicable)
[Add screenshots]

## Related Issues
Closes #123
```

### Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on the code, not the person
- Help others learn and grow

---

## Resources

### Documentation

- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [Prisma Docs](https://www.prisma.io/docs)
- [Tailwind Docs](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)

### Internal Docs

- [API Documentation](./API_DOCUMENTATION.md)
- [Components Guide](./COMPONENTS.md)
- [Deployment Guide](./DEPLOYMENT.md)
- [Database Schema](./DATABASE_SCHEMA.md)
- [Admin Guide](./ADMIN_GUIDE.md)

### Learning Resources

- [Next.js Tutorial](https://nextjs.org/learn)
- [TypeScript for Beginners](https://www.typescriptlang.org/docs/handbook/typescript-from-scratch.html)
- [Prisma Quickstart](https://www.prisma.io/docs/getting-started/quickstart)

---

## Contact

**For development questions:**
- GitHub Issues
- Email: dev@your-domain.com

**For contribution help:**
- Review [Contributing](#contributing) section
- Check existing issues and PRs
- Ask in discussions

---

**Happy coding! 🚀**

**Version 1.0 - Development Guide for QR Smart Menu App**
