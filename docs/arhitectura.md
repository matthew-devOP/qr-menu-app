# Arhitectură Tehnică - QR Smart Menu App

## 1. Prezentare Generală

Aplicația este construită folosind **Next.js 14** cu **App Router**, oferind o arhitectură modernă, scalabilă și performantă.

## 2. Diagrama Arhitecturală

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │   Mobile     │  │   Tablet     │  │   Desktop    │       │
│  │   Browser    │  │   Browser    │  │   Browser    │       │
│  └──────────────┘  └──────────────┘  └──────────────┘       │
│         │                 │                  │               │
│         └─────────────────┴──────────────────┘               │
│                           │                                  │
│                     QR Code Scan                             │
└───────────────────────────┼──────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    PRESENTATION LAYER                        │
│                      (Next.js App)                           │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Pages (App Router)                                  │   │
│  │  ├── / (Homepage - Categories)                       │   │
│  │  ├── /[categorySlug] (Subcategories)                 │   │
│  │  ├── /[categorySlug]/[subcategorySlug] (Products)    │   │
│  │  └── /admin/* (Admin Panel)                          │   │
│  └──────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Components                                          │   │
│  │  ├── Menu Components (CategoryCard, ProductCard)     │   │
│  │  ├── UI Components (Button, Card, Dialog)            │   │
│  │  └── Admin Components (Forms, Tables)                │   │
│  └──────────────────────────────────────────────────────┘   │
└───────────────────────────┼──────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                      API LAYER                               │
│                   (Next.js API Routes)                       │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Public API                                          │   │
│  │  ├── GET /api/categories                             │   │
│  │  ├── GET /api/products                               │   │
│  │  └── POST /api/qr/track                              │   │
│  └──────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Admin API (Protected)                               │   │
│  │  ├── CRUD /api/admin/categories                      │   │
│  │  ├── CRUD /api/admin/products                        │   │
│  │  └── POST /api/admin/upload                          │   │
│  └──────────────────────────────────────────────────────┘   │
└───────────────────────────┼──────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    BUSINESS LOGIC LAYER                      │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Services                                            │   │
│  │  ├── MenuService (business logic pentru meniu)       │   │
│  │  ├── QRService (generare & tracking QR codes)        │   │
│  │  └── ImageService (upload & optimization)            │   │
│  └──────────────────────────────────────────────────────┘   │
└───────────────────────────┼──────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                      DATA LAYER                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Prisma ORM                                          │   │
│  │  ├── Models (Venue, Category, Product, etc.)         │   │
│  │  ├── Migrations                                      │   │
│  │  └── Queries                                         │   │
│  └──────────────────────────────────────────────────────┘   │
└───────────────────────────┼──────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                   STORAGE LAYER                              │
│  ┌──────────────┐         ┌──────────────┐                  │
│  │  PostgreSQL  │         │  Cloudinary  │                  │
│  │  (Database)  │         │   (Images)   │                  │
│  └──────────────┘         └──────────────┘                  │
└─────────────────────────────────────────────────────────────┘
```

## 3. Structura Folder-elor

```
qr-menu-app/
├── app/                          # Next.js App Router
│   ├── (public)/                 # Public routes (meniu)
│   │   ├── layout.tsx
│   │   ├── page.tsx              # Homepage (categorii)
│   │   └── [categorySlug]/
│   │       ├── page.tsx          # Subcategorii
│   │       └── [subcategorySlug]/
│   │           └── page.tsx      # Produse
│   ├── admin/                    # Admin routes
│   │   ├── layout.tsx
│   │   ├── dashboard/
│   │   ├── categories/
│   │   ├── products/
│   │   └── qr-codes/
│   ├── api/                      # API routes
│   │   ├── auth/
│   │   ├── categories/
│   │   ├── products/
│   │   ├── qr/
│   │   └── admin/
│   └── layout.tsx                # Root layout
├── components/                   # React components
│   ├── menu/                     # Menu-specific
│   │   ├── CategoryCard.tsx
│   │   ├── ProductCard.tsx
│   │   ├── Breadcrumb.tsx
│   │   └── Header.tsx
│   ├── admin/                    # Admin-specific
│   │   ├── CategoryForm.tsx
│   │   ├── ProductForm.tsx
│   │   └── QRGenerator.tsx
│   └── ui/                       # Shadcn components
│       ├── button.tsx
│       ├── card.tsx
│       └── dialog.tsx
├── lib/                          # Utilities & helpers
│   ├── db.ts                     # Prisma client
│   ├── utils.ts                  # Helper functions
│   ├── validations.ts            # Zod schemas
│   └── constants.ts              # Constants
├── prisma/
│   ├── schema.prisma             # Database schema
│   ├── migrations/               # Migration files
│   └── seed.ts                   # Seed data
├── public/
│   ├── images/                   # Static images
│   └── fonts/                    # Custom fonts
├── styles/
│   └── globals.css               # Global styles
└── types/                        # TypeScript types
    ├── menu.ts
    ├── admin.ts
    └── api.ts
```

## 4. Tehnologii & Librării

### Core Framework
```json
{
  "next": "^14.1.0",
  "react": "^18.2.0",
  "typescript": "^5.3.0"
}
```

### Database & ORM
```json
{
  "prisma": "^5.8.0",
  "@prisma/client": "^5.8.0",
  "postgresql": "^14.0.0"
}
```

### UI & Styling
```json
{
  "tailwindcss": "^3.4.0",
  "@radix-ui/react-*": "^1.0.0",
  "lucide-react": "^0.300.0",
  "class-variance-authority": "^0.7.0",
  "clsx": "^2.1.0"
}
```

### Forms & Validation
```json
{
  "react-hook-form": "^7.49.0",
  "zod": "^3.22.0",
  "@hookform/resolvers": "^3.3.0"
}
```

### Authentication
```json
{
  "next-auth": "^5.0.0",
  "bcryptjs": "^2.4.0"
}
```

### Image Management
```json
{
  "cloudinary": "^1.41.0",
  "next-cloudinary": "^5.17.0"
}
```

### QR Code Generation
```json
{
  "qrcode": "^1.5.0",
  "canvas": "^2.11.0"
}
```

### State Management
```json
{
  "@tanstack/react-query": "^5.17.0"
}
```

## 5. Patterns & Best Practices

### 5.1 Component Patterns

#### Atomic Design
```
Atoms      → Button, Input, Label
Molecules  → ProductCard, CategoryCard
Organisms  → Header, ProductGrid, CategoryList
Templates  → MenuLayout, AdminLayout
Pages      → Homepage, CategoryPage, ProductPage
```

#### Component Structure
```typescript
// components/menu/ProductCard.tsx

import { ProductCardProps } from '@/types/menu'
import { cn } from '@/lib/utils'
import { Card, CardContent } from '@/components/ui/card'

export function ProductCard({ product, className }: ProductCardProps) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent>
        {/* Component content */}
      </CardContent>
    </Card>
  )
}
```

### 5.2 Data Fetching Patterns

#### Server Components (Default)
```typescript
// app/[categorySlug]/page.tsx
import { prisma } from '@/lib/db'

export default async function CategoryPage({ params }: { params: { categorySlug: string } }) {
  const category = await prisma.category.findUnique({
    where: { slug: params.categorySlug },
    include: { subcategories: true }
  })

  return <CategoryView category={category} />
}
```

#### Client Components (Interactive)
```typescript
'use client'

import { useQuery } from '@tanstack/react-query'

export function ProductList() {
  const { data, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: () => fetch('/api/products').then(res => res.json())
  })

  if (isLoading) return <Skeleton />
  return <ProductGrid products={data} />
}
```

### 5.3 API Route Patterns

```typescript
// app/api/products/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { productSchema } from '@/lib/validations'

export async function GET(request: Request) {
  try {
    const products = await prisma.product.findMany({
      where: { isAvailable: true },
      orderBy: { order: 'asc' }
    })

    return NextResponse.json(products)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const validated = productSchema.parse(body)

    const product = await prisma.product.create({
      data: validated
    })

    return NextResponse.json(product, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid data' },
      { status: 400 }
    )
  }
}
```

### 5.4 Error Handling

```typescript
// lib/error-handler.ts
export class AppError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public isOperational = true
  ) {
    super(message)
  }
}

export function handleError(error: unknown) {
  if (error instanceof AppError) {
    return {
      statusCode: error.statusCode,
      message: error.message
    }
  }

  // Log to error tracking service (Sentry)
  console.error('Unexpected error:', error)

  return {
    statusCode: 500,
    message: 'Internal server error'
  }
}
```

## 6. Security Considerations

### 6.1 Authentication
- NextAuth.js pentru session management
- Secure HTTP-only cookies
- CSRF protection built-in

### 6.2 API Protection
```typescript
// middleware.ts
import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'

export async function middleware(req: Request) {
  if (req.url.includes('/api/admin/')) {
    const token = await getToken({ req })

    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }
  }

  return NextResponse.next()
}
```

### 6.3 Input Validation
```typescript
import { z } from 'zod'

export const productSchema = z.object({
  name: z.string().min(1).max(100),
  price: z.number().positive(),
  categoryId: z.string().cuid(),
  image: z.string().url()
})
```

## 7. Performance Optimization

### 7.1 Image Optimization
- Next.js Image component cu automatic optimization
- Cloudinary pentru transformări on-the-fly
- Lazy loading pentru imagini below-the-fold

### 7.2 Caching Strategy
```typescript
// app/page.tsx
export const revalidate = 300 // 5 minutes

// app/api/products/route.ts
export const dynamic = 'force-dynamic'
```

### 7.3 Code Splitting
```typescript
// Dynamic imports pentru heavy components
import dynamic from 'next/dynamic'

const QRGenerator = dynamic(() => import('@/components/admin/QRGenerator'), {
  loading: () => <Skeleton />,
  ssr: false
})
```

## 8. Deployment Architecture

```
┌─────────────────────────────────────────┐
│           Vercel Edge Network           │
│  ┌──────────────────────────────────┐   │
│  │    CDN (Static Assets)           │   │
│  └──────────────────────────────────┘   │
│  ┌──────────────────────────────────┐   │
│  │    Edge Functions                │   │
│  │    (API Routes)                  │   │
│  └──────────────────────────────────┘   │
└─────────────────┬───────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────┐
│         External Services               │
│  ┌──────────────┐  ┌──────────────┐    │
│  │  PostgreSQL  │  │  Cloudinary  │    │
│  │  (Supabase)  │  │   (Images)   │    │
│  └──────────────┘  └──────────────┘    │
└─────────────────────────────────────────┘
```

## 9. Monitoring & Analytics

### Tools
- **Vercel Analytics** - Performance metrics
- **Sentry** - Error tracking
- **Google Analytics** - User analytics
- **Prisma Studio** - Database monitoring

---

**Versiune:** 1.0
**Autor:** matthew-devOP
**Ultima actualizare:** Ianuarie 2026
