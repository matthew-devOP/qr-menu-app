# QR Menu App - Technical Architecture Documentation

> **Last Updated:** January 31, 2026
> **Version:** 1.0
> **Status:** Production-Ready MVP

## Table of Contents

1. [Overview](#overview)
2. [Technology Stack](#technology-stack)
3. [Project Structure](#project-structure)
4. [Backend Architecture](#backend-architecture)
5. [Frontend Architecture](#frontend-architecture)
6. [Database Design](#database-design)
7. [API Design](#api-design)
8. [Authentication & Security](#authentication--security)
9. [DevOps & Deployment](#devops--deployment)

---

## Overview

The **QR Smart Menu App** is a modern, full-stack web application for digital restaurant menus accessible via QR codes. Built for INFINITY LOUNGE, it features a three-level hierarchy: **Categories → Subcategories → Products**.

### Key Characteristics

- **Framework:** Next.js 14+ with App Router
- **Language:** TypeScript (strict mode)
- **Database:** PostgreSQL 15+ with Prisma ORM
- **Styling:** Tailwind CSS + Shadcn/ui components
- **Authentication:** NextAuth.js with JWT sessions
- **Deployment:** Docker containers (dev + production)

---

## Technology Stack

### Frontend Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | 16.1.1 | React framework with App Router |
| **React** | 19.2.3 | UI library |
| **TypeScript** | 5.x | Type safety |
| **Tailwind CSS** | 3.4.1 | Utility-first CSS framework |
| **Radix UI** | Latest | Headless UI primitives |
| **Lucide React** | 0.562.0 | Icon library (2000+ icons) |
| **Sonner** | 2.0.7 | Toast notifications |
| **class-variance-authority** | 0.7.1 | Component variant management |
| **clsx** + **tailwind-merge** | Latest | Conditional classNames |

### Backend Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| **Prisma ORM** | 5.10.2 (dev: 7.2.0) | Database ORM and migrations |
| **PostgreSQL** | 15+ (Alpine) | Relational database |
| **NextAuth.js** | 4.24.13 | Authentication framework |
| **bcryptjs** | 3.0.3 | Password hashing (10 rounds) |
| **qrcode** | 1.5.4 | QR code generation (PNG/SVG) |
| **Zod** | 3.24.1 | Schema validation |

### Testing & Quality

| Technology | Version | Purpose |
|------------|---------|---------|
| **Jest** | 29.7.0 | Unit testing framework |
| **Playwright** | 1.58.1 | E2E testing |
| **@testing-library/react** | 16.3.2 | Component testing utilities |
| **@testing-library/jest-dom** | 6.6.3 | Custom Jest matchers |
| **ESLint** | 9.39.2 | Code linting |

### DevOps & Deployment

| Technology | Version | Purpose |
|------------|---------|---------|
| **Docker** | Latest | Containerization |
| **Docker Compose** | Latest | Multi-container orchestration |
| **Node.js** | 20-slim | Runtime environment |

---

## Project Structure

```
qr-menu-app/
├── src/
│   ├── app/                           # Next.js 14+ App Router
│   │   ├── api/                       # API Routes (9 endpoints)
│   │   │   ├── auth/[...nextauth]/    # NextAuth handler
│   │   │   ├── categories/            # Category CRUD
│   │   │   ├── products/              # Product CRUD
│   │   │   └── qr-codes/              # QR code management
│   │   ├── admin/                     # Admin panel (5 pages)
│   │   │   ├── dashboard/
│   │   │   ├── categories/
│   │   │   ├── products/
│   │   │   ├── qr-codes/
│   │   │   ├── settings/
│   │   │   └── login/
│   │   ├── [categorySlug]/            # Dynamic category pages
│   │   ├── layout.tsx                 # Root layout
│   │   └── page.tsx                   # Homepage
│   ├── components/
│   │   ├── admin/                     # Admin components (10 files)
│   │   ├── menu/                      # Public menu components (6 files)
│   │   ├── providers/                 # Context providers
│   │   ├── qr/                        # QR code components
│   │   └── ui/                        # Reusable UI components (9 files)
│   ├── lib/
│   │   ├── validations/               # Zod schemas
│   │   ├── auth.ts                    # NextAuth configuration
│   │   ├── db.ts                      # Prisma client singleton
│   │   ├── utils.ts                   # Utility functions
│   │   └── constants.ts               # App constants
│   └── types/
│       ├── index.ts                   # TypeScript types (354 lines)
│       └── next-auth.d.ts             # NextAuth type extensions
├── prisma/
│   ├── schema.prisma                  # Database schema (6 models)
│   ├── migrations/                    # Database migrations
│   └── seed.ts                        # Database seeding script
├── tests/
│   ├── e2e/                           # Playwright E2E tests
│   └── unit/                          # Jest unit tests
├── public/
│   └── images/                        # Static images
├── docs/                              # Project documentation
├── Dockerfile                         # Development container
├── Dockerfile.prod                    # Production container
├── docker-compose.yml                 # Development orchestration
├── docker-compose.prod.yml            # Production orchestration
├── next.config.ts                     # Next.js configuration
├── tailwind.config.ts                 # Tailwind CSS configuration
├── tsconfig.json                      # TypeScript configuration
├── jest.config.ts                     # Jest configuration
├── playwright.config.ts               # Playwright configuration
└── package.json                       # Dependencies and scripts
```

### Code Statistics

- **60 TypeScript/TSX files**
- **342 lines of API route code**
- **11 page/layout components**
- **10 admin components**
- **6 menu components**
- **9 reusable UI components**
- **354 lines in types/index.ts**

---

## Backend Architecture

### Database Schema (Prisma)

The application uses **6 Prisma models** with strategic relationships and constraints:

#### 1. Venue Model

```prisma
model Venue {
  id          String     @id @default(cuid())
  name        String
  slug        String     @unique
  logo        String?
  address     String?
  phone       String?
  email       String?
  description String?
  theme       Json?      // Custom colors, fonts
  isActive    Boolean    @default(true)
  createdAt   DateTime   @default(now())
  updatedAt   DateTime   @updatedAt

  categories  Category[]
  qrCodes     QRCode[]
}
```

**Key Features:**
- Multi-venue support (currently single venue: "INFINITY LOUNGE")
- Theme customization via JSON field
- Slug-based routing

---

#### 2. Category Model

```prisma
model Category {
  id            String        @id @default(cuid())
  name          String
  nameRo        String        // Romanian (primary)
  nameEn        String?       // English (optional)
  slug          String
  description   String?
  descriptionRo String?
  descriptionEn String?
  image         String
  icon          String?
  order         Int           @default(0)
  isActive      Boolean       @default(true)
  createdAt     DateTime      @default(now())
  updatedAt     DateTime      @updatedAt

  venueId       String
  venue         Venue         @relation(fields: [venueId], references: [id], onDelete: Cascade)

  subcategories Subcategory[]
  products      Product[]

  @@unique([venueId, slug])
  @@index([venueId, isActive])
}
```

**Key Features:**
- Multi-language support (Romanian + English)
- Composite unique constraint (venue + slug)
- Cascade delete to subcategories and products
- Manual ordering for display sequence

---

#### 3. Subcategory Model

```prisma
model Subcategory {
  id            String    @id @default(cuid())
  name          String
  nameRo        String
  nameEn        String?
  slug          String
  description   String?
  descriptionRo String?
  descriptionEn String?
  image         String
  order         Int       @default(0)
  isActive      Boolean   @default(true)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  categoryId    String
  category      Category  @relation(fields: [categoryId], references: [id], onDelete: Cascade)

  products      Product[]

  @@unique([categoryId, slug])
  @@index([categoryId, isActive])
}
```

**Key Features:**
- Scoped to parent category
- Cascade delete when category removed
- Same multi-language pattern as Category

---

#### 4. Product Model

```prisma
model Product {
  id             String       @id @default(cuid())
  name           String
  nameRo         String
  nameEn         String?
  slug           String
  description    String?
  descriptionRo  String?
  descriptionEn  String?
  image          String
  images         String[]     @default([])  // Multiple images support
  price          Decimal      @db.Decimal(10, 2)
  oldPrice       Decimal?     @db.Decimal(10, 2)
  quantity       String?      // "250ML", "500G"
  allergens      String[]     @default([])
  ingredients    String?
  nutritionInfo  Json?
  isAvailable    Boolean      @default(true)
  isFeatured     Boolean      @default(false)
  order          Int          @default(0)
  createdAt      DateTime     @default(now())
  updatedAt      DateTime     @updatedAt

  categoryId     String
  category       Category     @relation(fields: [categoryId], references: [id], onDelete: Cascade)

  subcategoryId  String?
  subcategory    Subcategory? @relation(fields: [subcategoryId], references: [id], onDelete: SetNull)

  @@unique([categoryId, slug])
  @@index([categoryId, subcategoryId, isAvailable])
  @@index([isFeatured])
}
```

**Key Features:**
- Decimal type for accurate price calculations
- Multiple images support (primary + gallery)
- Allergen and nutrition tracking
- Featured/popular flag for highlighting
- Availability toggle for inventory control
- Set null subcategory on subcategory deletion

---

#### 5. QRCode Model

```prisma
model QRCode {
  id          String    @id @default(cuid())
  venueId     String
  venue       Venue     @relation(fields: [venueId], references: [id], onDelete: Cascade)

  name        String    // "Table 1", "Bar Counter"
  location    String?
  tableNumber String?
  url         String
  qrImageUrl  String?
  isActive    Boolean   @default(true)
  scans       Int       @default(0)
  lastScanned DateTime?
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt

  @@index([venueId, isActive])
}
```

**Key Features:**
- Analytics tracking (scan count, last scanned)
- Location and table number for physical mapping
- Active/inactive status control

---

#### 6. Admin Model

```prisma
model Admin {
  id        String   @id @default(cuid())
  email     String   @unique
  password  String   // bcrypt hashed
  name      String
  role      String   @default("admin")
  venueId   String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

**Key Features:**
- bcrypt password hashing
- Role-based access control (future multi-role support)
- Optional venue association

---

### Database Design Decisions

**1. Composite Unique Constraints:**
```prisma
@@unique([venueId, slug])        // Categories unique per venue
@@unique([categoryId, slug])     // Subcategories unique per category
@@unique([categoryId, slug])     // Products unique per category
```

**2. Strategic Indexes:**
```prisma
@@index([venueId, isActive])           // Fast venue + active filtering
@@index([categoryId, isActive])        // Fast category + active filtering
@@index([categoryId, subcategoryId, isAvailable])  // Product filtering
@@index([isFeatured])                  // Featured products query
```

**3. Cascade Deletion Rules:**
- Delete Venue → Cascade to Categories, QR Codes
- Delete Category → Cascade to Subcategories, Products
- Delete Subcategory → Set NULL on Product.subcategoryId

**4. CUID vs UUID:**
- Using CUID for better database performance
- Shorter IDs than UUID
- Sortable by creation time

---

### API Routes Architecture

**RESTful Design Pattern:**

```
/api/auth/[...nextauth]/route.ts
├── POST   - Sign in with credentials
└── GET    - Session status

/api/categories/route.ts
├── GET    - List all categories (public)
└── POST   - Create category (auth required)

/api/categories/[id]/route.ts
├── GET    - Get single category (public)
├── PUT    - Update category (auth required)
└── DELETE - Delete category (auth required)

/api/products/route.ts
├── GET    - List products with filters (public)
└── POST   - Create product (auth required)

/api/products/[id]/route.ts
├── GET    - Get single product (public)
├── PUT    - Update product (auth required)
└── DELETE - Delete product (auth required)

/api/qr-codes/route.ts
├── GET    - List QR codes (auth required)
└── POST   - Create QR code (auth required)

/api/qr-codes/[id]/route.ts
├── GET    - Get QR code (auth required)
├── PUT    - Update QR code (auth required)
└── DELETE - Delete QR code (auth required)

/api/qr-codes/generate/route.ts
└── GET    - Generate QR image (public, cached)

/api/qr-codes/[id]/scan/route.ts
└── POST   - Track scan event (public)
```

---

### API Implementation Patterns

**1. Authentication Middleware:**

```typescript
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  // Proceed with operation
}
```

**2. Error Handling:**

```typescript
try {
  // Database operation
  const result = await prisma.product.create({ data })
  return NextResponse.json(result)

} catch (error) {
  console.error('Product creation error:', error)

  return NextResponse.json(
    { error: 'Failed to create product' },
    { status: 500 }
  )
}
```

**3. Validation (Zod):**

```typescript
import { productSchema } from '@/lib/validations/product'

try {
  const validatedData = productSchema.parse(body)

  // Use validatedData

} catch (error) {
  if (error instanceof z.ZodError) {
    return NextResponse.json(
      {
        error: 'Validation failed',
        details: error.issues
      },
      { status: 400 }
    )
  }
}
```

**4. Slug Uniqueness Verification:**

```typescript
// Check composite unique constraint
const existing = await prisma.category.findUnique({
  where: {
    venueId_slug: {
      venueId: venue.id,
      slug: generatedSlug
    }
  },
})

if (existing) {
  return NextResponse.json(
    { error: 'Slug already exists' },
    { status: 409 }
  )
}
```

---

## Frontend Architecture

### Next.js App Router Structure

**Routing Strategy:**

```
/                           → Homepage (categories overview)
/[categorySlug]             → Category page (subcategories + products)
/[categorySlug]/[subcategorySlug] → Subcategory page (filtered products)
/admin/login                → Admin login
/admin/dashboard            → Admin dashboard
/admin/categories           → Category management
/admin/products             → Product management
/admin/qr-codes             → QR code management
/admin/settings             → Settings (placeholder)
```

**Dynamic Route Handling (Next.js 14+):**

```typescript
// Category page with async params
interface CategoryPageProps {
  params: Promise<{
    categorySlug: string
  }>
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { categorySlug } = await params

  // Fetch category data
  const category = await fetchCategory(categorySlug)

  if (!category) {
    notFound() // Renders 404 page
  }

  return <CategoryView category={category} />
}
```

---

### State Management Approach

**No Global State Library** - Using React's built-in hooks:

- `useState` for local component state
- `useEffect` for data fetching and side effects
- Server Components for initial data loading
- Client-side fetch for dynamic updates

**Example (Admin Products Page):**

```typescript
'use client'

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  // Fetch products on mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products')
        const data = await response.json()
        setProducts(data)
        setFilteredProducts(data)
      } catch (error) {
        toast.error('Failed to load products')
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [])

  // Filter products when search changes
  useEffect(() => {
    let filtered = [...products]

    if (searchQuery) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    setFilteredProducts(filtered)
  }, [searchQuery, products])

  return (
    // UI rendering
  )
}
```

**Why No React Query/TanStack Query:**
- Simple CRUD operations don't require complex caching
- Server Components handle initial data loading efficiently
- Manual refetch after mutations is straightforward
- Reduces bundle size and complexity for MVP

---

### Component Architecture

#### UI Components (`src/components/ui/`)

**Design Pattern: Radix UI + Class Variance Authority**

```typescript
// Button component with variants
const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-brand-primary text-white hover:bg-brand-dark",
        destructive: "bg-state-error text-white hover:bg-state-error/90",
        outline: "border border-border-medium bg-transparent hover:bg-background-secondary",
        ghost: "hover:bg-background-secondary",
        link: "text-brand-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
```

**Available UI Components:**
- `Button` - Variant-based button with Radix Slot
- `Card` - Container with header/content/footer sections
- `Badge` - Status indicators with color variants
- `Input` - Form input with label integration
- `Label` - Form labels with accessibility
- `Skeleton` - Loading placeholders (shimmer animation)
- `Toaster` - Toast notification container (Sonner)

---

#### Menu Components (`src/components/menu/`)

**Product Card with Accessibility:**

```typescript
export function ProductCard({ product, onClick }: ProductCardProps) {
  const hasDiscount = product.oldPrice && product.oldPrice > product.price
  const discountPercent = hasDiscount
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0

  return (
    <div
      className={cn(
        'group cursor-pointer overflow-hidden rounded-xl',
        'transition-transform hover:scale-105',
        !product.isAvailable && 'opacity-60'
      )}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick()
        }
      }}
    >
      {/* Image container */}
      <div className="relative aspect-square">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 50vw, 33vw"
          className="object-cover transition-transform group-hover:scale-110"
        />

        {/* Discount badge */}
        {hasDiscount && (
          <Badge variant="error" className="absolute top-2 right-2">
            -{discountPercent}%
          </Badge>
        )}

        {/* Featured badge */}
        {product.isFeatured && (
          <Badge className="absolute top-2 left-2">Popular</Badge>
        )}

        {/* Unavailable overlay */}
        {!product.isAvailable && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <span className="text-white font-semibold">Indisponibil</span>
          </div>
        )}
      </div>

      {/* Product info */}
      <div className="p-4">
        <h3 className="font-semibold text-lg">{product.name}</h3>
        <div className="flex items-baseline gap-2 mt-2">
          <span className="text-xl font-bold text-brand-primary">
            {formatPrice(product.price)}
          </span>
          {hasDiscount && (
            <span className="text-sm text-text-muted line-through">
              {formatPrice(product.oldPrice)}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

// Skeleton loader for loading states
export function ProductCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl">
      <div className="aspect-square bg-background-secondary animate-pulse" />
      <div className="p-4 space-y-3">
        <div className="h-5 w-3/4 bg-background-secondary rounded animate-pulse" />
        <div className="h-4 w-full bg-background-secondary rounded animate-pulse" />
      </div>
    </div>
  )
}
```

---

### Image Handling & Optimization

**Next.js Image Component:**

```typescript
<Image
  src={product.image}
  alt={product.name}
  fill
  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
  className="object-cover"
  priority={false} // Lazy load by default
/>
```

**Features:**
- Automatic WebP/AVIF conversion
- Responsive images with `sizes` attribute
- Lazy loading by default
- Blur placeholder support
- Cloudinary integration for external images

**Image Configuration (`next.config.ts`):**

```typescript
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'res.cloudinary.com',
      pathname: '/**',
    },
    {
      protocol: 'https',
      hostname: 'images.unsplash.com',
      pathname: '/**',
    },
  ],
}
```

---

### Tailwind CSS Design System

**Configuration:**

```typescript
theme: {
  extend: {
    colors: {
      brand: {
        primary: '#1a1a1a',    // Dark charcoal
        secondary: '#fbbf24',   // Gold/amber
        dark: '#0a0a0a',        // Almost black
        light: '#f5f5f5',       // Light gray
      },
      text: {
        primary: '#1a1a1a',
        secondary: '#6b7280',
        muted: '#9ca3af',
        inverse: '#ffffff',
      },
      state: {
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444',
        info: '#3b82f6',
      },
    },
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
      display: ['Playfair Display', 'serif'],
      mono: ['JetBrains Mono', 'monospace'],
    },
    animation: {
      'fade-in': 'fadeIn 0.5s ease-in-out',
      'slide-up': 'slideUp 0.4s ease-out',
      'scale-in': 'scaleIn 0.3s ease-out',
    },
  },
}
```

**Typography:**
- **Sans-serif:** Inter (body text, UI elements)
- **Display:** Playfair Display (headings, hero text)
- **Monospace:** JetBrains Mono (code, technical content)

**Color Philosophy:**
- **Primary (Dark):** Professional, elegant, timeless
- **Secondary (Gold):** Premium feel, attention-grabbing accents
- **Semantic Colors:** Clear visual feedback for states

---

## Authentication & Security

### NextAuth.js Configuration

**Setup (`src/lib/auth.ts`):**

```typescript
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Invalid credentials')
        }

        // 1. Find admin user
        const admin = await prisma.admin.findUnique({
          where: { email: credentials.email }
        })

        if (!admin) {
          throw new Error('User not found')
        }

        // 2. Verify password with bcrypt
        const isValid = await bcrypt.compare(
          credentials.password,
          admin.password
        )

        if (!isValid) {
          throw new Error('Invalid password')
        }

        // 3. Return user object (without password)
        return {
          id: admin.id,
          email: admin.email,
          name: admin.name,
          role: admin.role,
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Add user info to JWT token on sign in
      if (user) {
        token.id = user.id
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      // Add JWT info to session
      if (session.user) {
        session.user.id = token.id as string
        session.user.role = token.role as string
      }
      return session
    }
  },
  pages: {
    signIn: '/admin/login',
    error: '/admin/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
}
```

**Security Features:**
- JWT-based sessions (no server-side storage)
- bcrypt password hashing (10 rounds, industry standard)
- Custom error pages (no information leakage)
- Protected admin routes via middleware
- 30-day session expiry

**Protected API Route Pattern:**

```typescript
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function POST(request: NextRequest) {
  // Check authentication
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  // User is authenticated - proceed
  const userId = session.user.id
  const userRole = session.user.role

  // ... operation logic
}
```

---

### Password Hashing

**User Registration/Password Change:**

```typescript
import bcrypt from 'bcryptjs'

// Hash password before storing
const hashedPassword = await bcrypt.hash(password, 10)

await prisma.admin.create({
  data: {
    email,
    password: hashedPassword,
    name,
    role: 'admin'
  }
})
```

**Password Verification:**

```typescript
// Compare plain password with hashed
const isValid = await bcrypt.compare(
  plainPassword,
  admin.password
)
```

---

### QR Code Generation

**API Route (`/api/qr-codes/generate`):**

```typescript
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const url = searchParams.get('url')
  const format = searchParams.get('format') || 'png'
  const size = parseInt(searchParams.get('size') || '512')

  if (!url) {
    return NextResponse.json(
      { error: 'URL parameter required' },
      { status: 400 }
    )
  }

  if (format === 'svg') {
    // Generate SVG QR code
    const svg = await QRCode.toString(url, {
      type: 'svg',
      width: size,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      }
    })

    return new NextResponse(svg, {
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=31536000, immutable'
      }
    })
  } else {
    // Generate PNG QR code
    const buffer = await QRCode.toBuffer(url, {
      type: 'png',
      width: size,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      }
    })

    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=31536000, immutable'
      }
    })
  }
}
```

**Features:**
- Dynamic generation (no pre-generated images)
- Multiple format support (PNG, SVG)
- Configurable size
- Aggressive caching (1 year for immutable QR codes)
- Customizable colors (future enhancement)

---

## DevOps & Deployment

### Docker Configuration

**Development Dockerfile:**

```dockerfile
FROM node:20-slim

WORKDIR /app

# Install OpenSSL for Prisma
RUN apt-get update && apt-get install -y openssl

# Copy package files
COPY package.json package-lock.json* .npmrc* ./

# Install dependencies
RUN \
  if [ -f package-lock.json ]; then npm ci; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Copy source code
COPY . .

EXPOSE 3009

CMD ["npm", "run", "dev", "--", "-p", "3009"]
```

**Production Dockerfile (Multi-stage):**

```dockerfile
# Base stage
FROM node:20-slim AS base
WORKDIR /app

# Dependencies stage
FROM base AS deps
RUN apt-get update && apt-get install -y openssl
COPY package.json package-lock.json ./
RUN npm ci

# Builder stage
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Build Next.js app
RUN npm run build

# Runner stage
FROM base AS runner
ENV NODE_ENV=production

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy built app
COPY --from=builder /app/public ./public
RUN mkdir .next
RUN chown nextjs:nodejs .next

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3009

ENV PORT=3009
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
```

**Production Optimizations:**
- Multi-stage build (smaller final image)
- Non-root user for security
- Next.js standalone output
- Layer caching optimization
- Security best practices

---

### Docker Compose

**Development (`docker-compose.yml`):**

```yaml
services:
  app:
    container_name: qr-menu-app
    build:
      context: .
      dockerfile: Dockerfile
    restart: always
    ports:
      - "3009:3009"
    environment:
      - DATABASE_URL=postgresql://postgres:postgres@db:5432/qr-menu-app?schema=public
      - NEXTAUTH_URL=http://localhost:3009
      - NEXTAUTH_SECRET=changeme_in_prod
    depends_on:
      - db
    volumes:
      - .:/app
      - /app/node_modules
    networks:
      - qr-menu-network

  db:
    container_name: qr-menu-db
    image: postgres:15-alpine
    restart: always
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: qr-menu-app
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - qr-menu-network

networks:
  qr-menu-network:
    driver: bridge

volumes:
  postgres_data:
```

---

### Environment Variables

**Required Variables:**

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/qr_menu_app"

# Application
NEXT_PUBLIC_APP_URL="http://localhost:3009"
NEXT_PUBLIC_APP_NAME="INFINITY LOUNGE"
NODE_ENV="development"

# NextAuth (CRITICAL - Must change in production)
NEXTAUTH_URL="http://localhost:3009"
NEXTAUTH_SECRET="your-secret-key-here-change-in-production"

# Cloudinary (Optional - Image Storage)
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
CLOUDINARY_FOLDER="qr-menu-app"
```

---

### Build & Deployment Process

**Next.js Configuration:**

```typescript
const nextConfig: NextConfig = {
  output: 'standalone',  // For Docker deployment
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
    ],
  },
}
```

**Deployment Steps:**

```bash
# 1. Build the application
npm run build

# 2. Generate Prisma Client
npx prisma generate

# 3. Run database migrations
npx prisma migrate deploy

# 4. Start production server
npm start

# OR with Docker:
docker-compose -f docker-compose.prod.yml up -d
```

---

## Conclusion

The QR Menu App demonstrates a **modern, well-architected full-stack application** with:

- **Type-safe implementation** (TypeScript + Prisma + Zod)
- **Clean separation of concerns** (API routes, components, utilities)
- **Production-ready deployment** (Docker, environment config)
- **Security best practices** (authentication, validation, hashing)
- **Performance optimizations** (Next.js Image, caching, indexes)

**Next Steps:** See [PRODUCTION_READINESS.md](./PRODUCTION_READINESS.md) for deployment checklist and [DEVELOPMENT_ROADMAP.md](./DEVELOPMENT_ROADMAP.md) for future enhancements.
