# Plan Detaliat - Aplicație Meniu Digital Interactiv cu QR Code

## 1. OVERVIEW & ARHITECTURĂ

### Stack Tehnologic Recomandat

```
Frontend: Next.js 14+ (App Router)
Styling: Tailwind CSS + Shadcn/ui
Database: PostgreSQL / MongoDB
ORM: Prisma (PostgreSQL) / Mongoose (MongoDB)
Image Storage: Cloudinary / AWS S3
Authentication: NextAuth.js (pentru admin)
Deployment: Vercel / Railway
QR Generator: qrcode.react sau node-qrcode
```

### Structura de Foldere

```
/digital-menu
├── /app
│   ├── /api
│   │   ├── /menu
│   │   ├── /categories
│   │   ├── /products
│   │   └── /upload
│   ├── /admin
│   │   ├── dashboard
│   │   ├── categories
│   │   ├── products
│   │   └── settings
│   ├── /[locale]
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── /[categorySlug]
│   │       ├── page.tsx
│   │       └── /[subcategorySlug]
│   │           └── page.tsx
│   └── layout.tsx
├── /components
│   ├── /ui (shadcn components)
│   ├── /menu
│   │   ├── CategoryCard.tsx
│   │   ├── ProductCard.tsx
│   │   ├── Breadcrumb.tsx
│   │   └── Header.tsx
│   └── /admin
├── /lib
│   ├── db.ts
│   ├── utils.ts
│   └── constants.ts
├── /prisma
│   └── schema.prisma
└── /public
    └── /images
```

---

## 2. SCHEMA DATABASE

### Model Prisma (PostgreSQL)

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Venue {
  id          String     @id @default(cuid())
  name        String
  slug        String     @unique
  logo        String?
  address     String?
  phone       String?
  email       String?
  description String?
  theme       Json?      // Custom colors, fonts, etc.
  isActive    Boolean    @default(true)
  createdAt   DateTime   @default(now())
  updatedAt   DateTime   @updatedAt
  categories  Category[]
  qrCodes     QRCode[]
}

model Category {
  id            String        @id @default(cuid())
  name          String
  nameRo        String
  nameEn        String?
  slug          String
  description   String?
  image         String
  icon          String?
  order         Int           @default(0)
  isActive      Boolean       @default(true)
  venueId       String
  venue         Venue         @relation(fields: [venueId], references: [id], onDelete: Cascade)
  subcategories Subcategory[]
  products      Product[]
  createdAt     DateTime      @default(now())
  updatedAt     DateTime      @updatedAt

  @@unique([venueId, slug])
  @@index([venueId, isActive])
}

model Subcategory {
  id          String    @id @default(cuid())
  name        String
  nameRo      String
  nameEn      String?
  slug        String
  description String?
  image       String
  order       Int       @default(0)
  isActive    Boolean   @default(true)
  categoryId  String
  category    Category  @relation(fields: [categoryId], references: [id], onDelete: Cascade)
  products    Product[]
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt

  @@unique([categoryId, slug])
  @@index([categoryId, isActive])
}

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
  images         String[]     @default([])
  price          Decimal      @db.Decimal(10, 2)
  oldPrice       Decimal?     @db.Decimal(10, 2)
  quantity       String?      // "250ML", "500G", etc.
  allergens      String[]     @default([])
  ingredients    String?
  nutritionInfo  Json?
  isAvailable    Boolean      @default(true)
  isFeatured     Boolean      @default(false)
  order          Int          @default(0)
  categoryId     String
  category       Category     @relation(fields: [categoryId], references: [id], onDelete: Cascade)
  subcategoryId  String?
  subcategory    Subcategory? @relation(fields: [subcategoryId], references: [id], onDelete: SetNull)
  createdAt      DateTime     @default(now())
  updatedAt      DateTime     @updatedAt

  @@unique([categoryId, slug])
  @@index([categoryId, subcategoryId, isAvailable])
  @@index([isFeatured])
}

model QRCode {
  id          String    @id @default(cuid())
  venueId     String
  venue       Venue     @relation(fields: [venueId], references: [id], onDelete: Cascade)
  name        String    // "Table 1", "Bar Counter", etc.
  tableNumber String?
  url         String    // Full URL to menu
  qrImageUrl  String?   // Stored QR code image
  isActive    Boolean   @default(true)
  scans       Int       @default(0)
  lastScanned DateTime?
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt

  @@index([venueId, isActive])
}

model Admin {
  id        String   @id @default(cuid())
  email     String   @unique
  password  String
  name      String
  role      String   @default("admin")
  venueId   String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

---

## 3. DESIGN SYSTEM & UI COMPONENTS

### Theme Configuration (Tailwind)

```typescript
// tailwind.config.ts
export default {
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#1a1a1a',
          secondary: '#fbbf24', // Gold accent
          dark: '#0a0a0a',
          light: '#f5f5f5',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Playfair Display', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.4s ease-out',
      }
    }
  }
}
```

### Component Specs

#### 1. Header Component

```typescript
// components/menu/Header.tsx
interface HeaderProps {
  venueName: string;
  logo?: string;
  showBack?: boolean;
  transparent?: boolean;
}

Features:
- Logo venue (left)
- Sticky positioning
- Glassmorphism effect on scroll
- Language switcher (RO/EN)
- Optional back button
- Dark/Light theme toggle
```

#### 2. CategoryCard Component

```typescript
// components/menu/CategoryCard.tsx
interface CategoryCardProps {
  id: string;
  name: string;
  image: string;
  slug: string;
  order: number;
}

Design:
- Aspect ratio 16:9 sau 4:3
- Overlay gradient (bottom)
- Title overlay (bottom-left)
- Hover effect: scale(1.05) + brightness
- Lazy loading pentru imagini
- Progressive image loading (blur-up)
```

#### 3. ProductCard Component

```typescript
// components/menu/ProductCard.tsx
interface ProductCardProps {
  product: {
    id: string;
    name: string;
    image: string;
    price: number;
    oldPrice?: number;
    quantity?: string;
    description?: string;
    allergens?: string[];
    isAvailable: boolean;
  };
  onClick?: () => void;
}

Design:
- Image square (1:1) or portrait (3:4)
- Price badge (top-right or bottom)
- Discount percentage if oldPrice exists
- Unavailable overlay (grayscale + "Indisponibil")
- Expandable description accordion
- Allergen icons
```

#### 4. Breadcrumb Component

```typescript
// components/menu/Breadcrumb.tsx
interface BreadcrumbProps {
  items: Array<{
    label: string;
    href: string;
  }>;
}

Design:
- Home icon + text links
- Separator: ">" sau "/"
- Active item: bold
- Mobile: collapse middle items
```

---

## 4. API ENDPOINTS

### Public API

```typescript
GET  /api/venues                        // List all venues
GET  /api/venues/[slug]                 // Get venue details
GET  /api/venues/[slug]/categories      // Get categories
GET  /api/categories/[slug]             // Get category + subcategories
GET  /api/categories/[slug]/products    // Get products in category
GET  /api/products/[slug]               // Get product details
GET  /api/subcategories/[slug]/products // Get products in subcategory
POST /api/qr/track                      // Track QR scan
```

### Admin API (Protected)

```typescript
// Categories
GET    /api/admin/categories
POST   /api/admin/categories
PUT    /api/admin/categories/[id]
DELETE /api/admin/categories/[id]
PATCH  /api/admin/categories/reorder

// Products
GET    /api/admin/products
POST   /api/admin/products
PUT    /api/admin/products/[id]
DELETE /api/admin/products/[id]
POST   /api/admin/products/bulk-import

// Images
POST   /api/admin/upload                // Upload to Cloudinary/S3

// QR Codes
GET    /api/admin/qr-codes
POST   /api/admin/qr-codes/generate
GET    /api/admin/qr-codes/[id]/analytics
```

---

## 5. WORKFLOW DEZVOLTARE

### Faza 1: Setup & Infrastructure (Zi 1-2)

```bash
1. Initialize Next.js project
   npx create-next-app@latest digital-menu --typescript --tailwind --app

2. Install dependencies
   npm install prisma @prisma/client
   npm install next-auth bcryptjs
   npm install @tanstack/react-query
   npm install zod react-hook-form
   npm install lucide-react class-variance-authority
   npm install qrcode canvas

3. Setup Prisma
   npx prisma init
   # Configure schema.prisma
   npx prisma migrate dev --name init

4. Setup Shadcn/ui
   npx shadcn-ui@latest init
   npx shadcn-ui@latest add button card dialog dropdown-menu

5. Configure image upload (Cloudinary)
   npm install cloudinary next-cloudinary
```

### Faza 2: Database & Models (Zi 2-3)
### Faza 3: Frontend Components (Zi 3-5)
### Faza 4: Pages & Routing (Zi 5-7)
### Faza 5: Admin Panel (Zi 7-10)
### Faza 6: API Development (Zi 10-12)
### Faza 7: Testing & Optimization (Zi 12-14)
### Faza 8: Deployment (Zi 14-15)

---

## 6. DEPLOYMENT CHECKLIST

### Pre-Deployment
- [ ] All environment variables configured
- [ ] Database migrations applied
- [ ] Seed data imported
- [ ] Error tracking setup (Sentry)
- [ ] Analytics setup
- [ ] Performance monitoring
- [ ] SSL certificate configured
- [ ] CDN configured for images
- [ ] Backup strategy implemented

### Post-Deployment
- [ ] Test all user flows
- [ ] Verify QR codes work
- [ ] Check mobile responsiveness
- [ ] Validate SEO metadata
- [ ] Monitor error logs
- [ ] Setup uptime monitoring

---

**Versiune:** 1.0
**Ultima actualizare:** Ianuarie 2026
