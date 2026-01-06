# Database Schema Documentation - QR Smart Menu App

**Version:** 1.0
**Last Updated:** January 6, 2026

Complete documentation of the PostgreSQL database schema using Prisma ORM.

---

## Table of Contents

1. [Overview](#overview)
2. [Entity Relationship Diagram](#entity-relationship-diagram)
3. [Models](#models)
4. [Relationships](#relationships)
5. [Indexes](#indexes)
6. [Migrations](#migrations)
7. [Seed Data](#seed-data)
8. [Best Practices](#best-practices)

---

## Overview

### Database Technology

- **Database:** PostgreSQL 14+
- **ORM:** Prisma 7.2.0
- **Schema Location:** `prisma/schema.prisma`

### Design Principles

- **Normalization:** 3NF (Third Normal Form)
- **Cascade Deletes:** Protect data integrity
- **Timestamps:** Track creation and updates
- **Soft Deletes:** Not implemented (use `isActive` flag instead)
- **Multi-language:** Support for Romanian and English

### Schema Statistics

- **Total Models:** 6
- **Total Relationships:** 8
- **Total Indexes:** 7
- **Unique Constraints:** 5

---

## Entity Relationship Diagram

```
┌─────────────┐
│   Venue     │
│   (Venue)   │
└─────┬───────┘
      │
      ├───────────────────────────────┐
      │                               │
      ▼                               ▼
┌─────────────┐                 ┌─────────────┐
│  Category   │                 │   QRCode    │
│ (Category)  │                 │  (QRCode)   │
└─────┬───────┘                 └─────────────┘
      │
      ├───────────────┐
      │               │
      ▼               ▼
┌──────────────┐ ┌──────────────┐
│ Subcategory  │ │   Product    │
│(Subcategory) │ │  (Product)   │
└──────┬───────┘ └──────────────┘
       │               ▲
       └───────────────┘

┌─────────────┐
│    Admin    │
│   (Admin)   │
└─────────────┘
```

---

## Models

### 1. Venue

Represents a restaurant, lounge, or venue.

**Purpose:** Support for multi-venue system (currently single venue).

#### Fields

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `id` | String | ✅ | cuid() | Unique identifier |
| `name` | String | ✅ | - | Venue name (e.g., "INFINITY LOUNGE") |
| `slug` | String | ✅ | - | URL-friendly identifier (unique) |
| `logo` | String | ❌ | null | Logo image URL |
| `address` | String | ❌ | null | Physical address |
| `phone` | String | ❌ | null | Contact phone number |
| `email` | String | ❌ | null | Contact email |
| `description` | String | ❌ | null | Venue description |
| `theme` | Json | ❌ | null | Custom styling (colors, fonts) |
| `isActive` | Boolean | ✅ | true | Active status |
| `createdAt` | DateTime | ✅ | now() | Creation timestamp |
| `updatedAt` | DateTime | ✅ | now() | Last update timestamp |

#### Relations

- **categories:** One-to-Many → Category
- **qrCodes:** One-to-Many → QRCode

#### Indexes

- Unique: `slug`

#### Example

```json
{
  "id": "clxyz123...",
  "name": "INFINITY LOUNGE",
  "slug": "infinity-lounge",
  "logo": "https://example.com/logo.png",
  "address": "Str. Exemplu, Nr. 1, București",
  "phone": "+40 123 456 789",
  "email": "contact@infinitylounge.ro",
  "isActive": true,
  "theme": {
    "primaryColor": "#1a1a1a",
    "secondaryColor": "#fbbf24"
  }
}
```

---

### 2. Category

Main menu categories (e.g., Drinks, Food, Desserts).

#### Fields

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `id` | String | ✅ | cuid() | Unique identifier |
| `name` | String | ✅ | - | Display name (current language) |
| `nameRo` | String | ✅ | - | Romanian name |
| `nameEn` | String | ❌ | null | English name (for future i18n) |
| `slug` | String | ✅ | - | URL slug (e.g., "bauturi") |
| `description` | String | ❌ | null | Category description |
| `image` | String | ✅ | - | Category image URL |
| `icon` | String | ❌ | null | Icon identifier (optional) |
| `order` | Int | ✅ | 0 | Display order (lower first) |
| `isActive` | Boolean | ✅ | true | Visibility status |
| `venueId` | String | ✅ | - | Parent venue ID |
| `createdAt` | DateTime | ✅ | now() | Creation timestamp |
| `updatedAt` | DateTime | ✅ | now() | Last update timestamp |

#### Relations

- **venue:** Many-to-One → Venue
- **subcategories:** One-to-Many → Subcategory
- **products:** One-to-Many → Product

#### Constraints

- Unique: `[venueId, slug]` - Slug unique per venue
- Cascade: Delete category → Delete subcategories and products

#### Indexes

- Index: `[venueId, isActive]` - Fast filtering

#### Example

```json
{
  "id": "clxyz456...",
  "name": "Băuturi",
  "nameRo": "Băuturi",
  "nameEn": "Drinks",
  "slug": "bauturi",
  "description": "Băuturi răcoritoare și calde",
  "image": "https://example.com/drinks.jpg",
  "order": 1,
  "isActive": true,
  "venueId": "clxyz123..."
}
```

---

### 3. Subcategory

Subcategories within main categories (e.g., Coffee, Tea under Drinks).

#### Fields

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `id` | String | ✅ | cuid() | Unique identifier |
| `name` | String | ✅ | - | Display name |
| `nameRo` | String | ✅ | - | Romanian name |
| `nameEn` | String | ❌ | null | English name |
| `slug` | String | ✅ | - | URL slug |
| `description` | String | ❌ | null | Subcategory description |
| `image` | String | ✅ | - | Subcategory image URL |
| `order` | Int | ✅ | 0 | Display order |
| `isActive` | Boolean | ✅ | true | Visibility status |
| `categoryId` | String | ✅ | - | Parent category ID |
| `createdAt` | DateTime | ✅ | now() | Creation timestamp |
| `updatedAt` | DateTime | ✅ | now() | Last update timestamp |

#### Relations

- **category:** Many-to-One → Category
- **products:** One-to-Many → Product

#### Constraints

- Unique: `[categoryId, slug]` - Slug unique per category
- Cascade: Delete subcategory → Delete products

#### Indexes

- Index: `[categoryId, isActive]`

#### Example

```json
{
  "id": "clxyz789...",
  "name": "Cafea",
  "nameRo": "Cafea",
  "nameEn": "Coffee",
  "slug": "cafea",
  "description": "Cafea proaspăt măcinată",
  "image": "https://example.com/coffee.jpg",
  "order": 1,
  "isActive": true,
  "categoryId": "clxyz456..."
}
```

---

### 4. Product

Individual menu items (dishes, drinks, etc.).

#### Fields

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `id` | String | ✅ | cuid() | Unique identifier |
| `name` | String | ✅ | - | Product name |
| `nameRo` | String | ✅ | - | Romanian name |
| `nameEn` | String | ❌ | null | English name |
| `slug` | String | ✅ | - | URL slug |
| `description` | String | ❌ | null | Product description |
| `descriptionRo` | String | ❌ | null | Romanian description |
| `descriptionEn` | String | ❌ | null | English description |
| `image` | String | ✅ | - | Main product image URL |
| `images` | String[] | ✅ | [] | Additional images array |
| `price` | Decimal | ✅ | - | Current price (RON) |
| `oldPrice` | Decimal | ❌ | null | Original price (for discounts) |
| `quantity` | String | ❌ | null | Serving size (e.g., "250ml") |
| `allergens` | String[] | ✅ | [] | Allergen identifiers |
| `ingredients` | String | ❌ | null | Ingredients list |
| `nutritionInfo` | Json | ❌ | null | Nutritional information |
| `isAvailable` | Boolean | ✅ | true | Stock availability |
| `isFeatured` | Boolean | ✅ | false | Featured/popular item |
| `order` | Int | ✅ | 0 | Display order |
| `categoryId` | String | ✅ | - | Parent category ID |
| `subcategoryId` | String | ❌ | null | Parent subcategory ID |
| `createdAt` | DateTime | ✅ | now() | Creation timestamp |
| `updatedAt` | DateTime | ✅ | now() | Last update timestamp |

#### Relations

- **category:** Many-to-One → Category
- **subcategory:** Many-to-One → Subcategory (optional)

#### Constraints

- Unique: `[categoryId, slug]`
- Cascade: Delete category → Delete product
- SetNull: Delete subcategory → Product.subcategoryId = null

#### Indexes

- Index: `[categoryId, subcategoryId, isAvailable]` - Fast filtering
- Index: `[isFeatured]` - Featured products query

#### Allergen Values

Common allergens:
- `gluten`
- `lactoza` (lactose)
- `oua` (eggs)
- `peste` (fish)
- `soia` (soy)
- `nuci` (nuts)
- `arahide` (peanuts)
- `crustacee` (shellfish)

#### Example

```json
{
  "id": "clxyz012...",
  "name": "Espresso",
  "nameRo": "Espresso",
  "nameEn": "Espresso",
  "slug": "espresso",
  "description": "Cafea espresso intensă, 100% Arabica",
  "image": "https://example.com/espresso.jpg",
  "images": [],
  "price": 8.50,
  "oldPrice": 10.00,
  "quantity": "30ml",
  "allergens": [],
  "isAvailable": true,
  "isFeatured": true,
  "order": 1,
  "categoryId": "clxyz456...",
  "subcategoryId": "clxyz789..."
}
```

---

### 5. QRCode

QR codes for table/location tracking.

#### Fields

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `id` | String | ✅ | cuid() | Unique identifier |
| `venueId` | String | ✅ | - | Parent venue ID |
| `name` | String | ✅ | - | QR code name (e.g., "Masa 1") |
| `tableNumber` | String | ❌ | null | Deprecated: Use `name` instead |
| `url` | String | ✅ | - | Full menu URL with tracking param |
| `qrImageUrl` | String | ❌ | null | Stored QR image (not used) |
| `isActive` | Boolean | ✅ | true | Tracking enabled |
| `scans` | Int | ✅ | 0 | Total scan count |
| `lastScanned` | DateTime | ❌ | null | Last scan timestamp |
| `createdAt` | DateTime | ✅ | now() | Creation timestamp |
| `updatedAt` | DateTime | ✅ | now() | Last update timestamp |

#### Relations

- **venue:** Many-to-One → Venue

#### Constraints

- Cascade: Delete venue → Delete QR codes

#### Indexes

- Index: `[venueId, isActive]`

#### URL Format

```
{baseUrl}?qr={location-slug}

Example:
https://infinitylounge.ro?qr=masa-1
https://infinitylounge.ro?qr=bar-counter
```

#### Example

```json
{
  "id": "clxyz345...",
  "venueId": "clxyz123...",
  "name": "Masa 1",
  "url": "https://infinitylounge.ro?qr=masa-1",
  "isActive": true,
  "scans": 127,
  "lastScanned": "2026-01-06T15:30:00Z"
}
```

---

### 6. Admin

Admin user accounts for authentication.

#### Fields

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `id` | String | ✅ | cuid() | Unique identifier |
| `email` | String | ✅ | - | Login email (unique) |
| `password` | String | ✅ | - | Bcrypt hashed password |
| `name` | String | ✅ | - | Admin display name |
| `role` | String | ✅ | "admin" | User role |
| `venueId` | String | ❌ | null | Associated venue (future) |
| `createdAt` | DateTime | ✅ | now() | Creation timestamp |
| `updatedAt` | DateTime | ✅ | now() | Last update timestamp |

#### Constraints

- Unique: `email`

#### Security

- **Passwords:** Hashed with bcrypt (10 rounds)
- **Sessions:** JWT tokens (NextAuth.js)
- **Never store:** Plain-text passwords

#### Example

```json
{
  "id": "clxyz678...",
  "email": "admin@infinitylounge.ro",
  "password": "$2a$10$hashed...",
  "name": "Admin User",
  "role": "admin",
  "venueId": null
}
```

---

## Relationships

### Visual Summary

```
Venue (1) ──< (M) Category
Category (1) ──< (M) Subcategory
Category (1) ──< (M) Product
Subcategory (1) ──< (M) Product (optional)
Venue (1) ──< (M) QRCode
Admin (standalone)
```

### Cascade Rules

| Parent | Child | On Delete |
|--------|-------|-----------|
| Venue | Category | CASCADE |
| Venue | QRCode | CASCADE |
| Category | Subcategory | CASCADE |
| Category | Product | CASCADE |
| Subcategory | Product | SET NULL |

**Implications:**
- Deleting venue → Deletes all categories, products, QR codes
- Deleting category → Deletes all subcategories and products
- Deleting subcategory → Products remain, `subcategoryId` set to null

---

## Indexes

### Performance Indexes

| Model | Fields | Purpose |
|-------|--------|---------|
| Category | `[venueId, isActive]` | Filter active categories |
| Subcategory | `[categoryId, isActive]` | Filter active subcategories |
| Product | `[categoryId, subcategoryId, isAvailable]` | Product listings |
| Product | `[isFeatured]` | Featured products query |
| QRCode | `[venueId, isActive]` | Active QR codes |

### Unique Indexes

| Model | Fields | Purpose |
|-------|--------|---------|
| Venue | `slug` | URL-friendly identifier |
| Category | `[venueId, slug]` | Unique slugs per venue |
| Subcategory | `[categoryId, slug]` | Unique slugs per category |
| Product | `[categoryId, slug]` | Unique slugs per category |
| Admin | `email` | Login identifier |

---

## Migrations

### Location

```
prisma/migrations/
```

### Running Migrations

**Development:**
```bash
npx prisma migrate dev --name migration_name
```

**Production:**
```bash
npx prisma migrate deploy
```

### Current Migrations

1. **init** - Initial schema creation
2. *Future migrations will be listed here*

### Migration Workflow

1. **Modify schema:** Edit `prisma/schema.prisma`
2. **Create migration:** `npx prisma migrate dev --name descriptive_name`
3. **Review SQL:** Check generated migration file
4. **Apply migration:** Automatically applied in dev mode
5. **Commit:** Add migration files to Git
6. **Deploy:** Run `migrate deploy` in production

### Rollback Strategy

Prisma doesn't support automatic rollbacks. Manual process:

1. Create reverse migration
2. Apply manually with SQL
3. Update schema.prisma
4. Mark migration as applied

**Better approach:** Test migrations thoroughly before production.

---

## Seed Data

### Location

```
prisma/seed.ts
```

### Running Seed

```bash
npm run prisma:seed
```

### What Gets Seeded

**Default Venue:**
- Name: "INFINITY LOUNGE"
- Slug: "infinity-lounge"
- Contact info (example data)

**Admin User:**
- Email: admin@infinitylounge.ro
- Password: admin123 (hashed)
- Role: admin

**Sample Data:**
- 3 Categories (Băuturi, Mâncare, Deserturi)
- 2 Subcategories per category
- 10 Products per subcategory
- 5 QR Codes (Masa 1-5)

### Seed Script Structure

```typescript
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // 1. Create Venue
  const venue = await prisma.venue.create({
    data: { /* ... */ }
  })

  // 2. Create Admin
  const admin = await prisma.admin.create({
    data: {
      email: 'admin@infinitylounge.ro',
      password: await bcrypt.hash('admin123', 10),
      name: 'Admin User',
    }
  })

  // 3. Create Categories
  // 4. Create Subcategories
  // 5. Create Products
  // 6. Create QR Codes
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect())
```

---

## Best Practices

### 1. Use Prisma Client

Always use Prisma for database operations:

```typescript
import { prisma } from '@/lib/prisma'

// ✅ Good
const products = await prisma.product.findMany()

// ❌ Bad - Don't use raw SQL unless necessary
const products = await prisma.$queryRaw`SELECT * FROM Product`
```

### 2. Include Relations Wisely

Only include what you need:

```typescript
// ✅ Good - Selective includes
const categories = await prisma.category.findMany({
  include: {
    _count: {
      select: { products: true }
    }
  }
})

// ❌ Bad - Over-fetching
const categories = await prisma.category.findMany({
  include: {
    subcategories: {
      include: {
        products: true
      }
    },
    products: true
  }
})
```

### 3. Handle Errors

```typescript
try {
  await prisma.product.create({ data })
} catch (error) {
  if (error.code === 'P2002') {
    // Unique constraint violation
    throw new Error('Product slug already exists')
  }
  throw error
}
```

**Common Prisma Error Codes:**
- `P2002` - Unique constraint failed
- `P2003` - Foreign key constraint failed
- `P2025` - Record not found

### 4. Use Transactions

For multi-step operations:

```typescript
await prisma.$transaction(async (tx) => {
  const category = await tx.category.create({ data: categoryData })
  await tx.product.createMany({
    data: products.map(p => ({ ...p, categoryId: category.id }))
  })
})
```

### 5. Optimize Queries

```typescript
// ✅ Good - Select only needed fields
const products = await prisma.product.findMany({
  select: {
    id: true,
    name: true,
    price: true,
    image: true,
  },
  where: { isAvailable: true }
})

// ❌ Bad - Fetching all fields
const products = await prisma.product.findMany({
  where: { isAvailable: true }
})
```

### 6. Pagination

For large datasets:

```typescript
const products = await prisma.product.findMany({
  take: 20,       // Limit
  skip: 0,        // Offset
  orderBy: { createdAt: 'desc' }
})
```

### 7. Soft Deletes

Use `isActive` flag instead of deleting:

```typescript
// ✅ Good - Soft delete
await prisma.category.update({
  where: { id },
  data: { isActive: false }
})

// ❌ Bad - Hard delete (loses data)
await prisma.category.delete({ where: { id } })
```

### 8. Validate Before Insert

```typescript
// Validate data
if (!data.name || data.price <= 0) {
  throw new Error('Invalid product data')
}

// Then insert
await prisma.product.create({ data })
```

---

## Future Enhancements

### Planned Schema Changes

1. **Multi-language Support:**
   - Currently: Romanian only
   - Future: Full RO/EN support in UI
   - Schema ready: `nameEn`, `descriptionEn` fields exist

2. **Multi-venue Support:**
   - Currently: Single venue
   - Future: Multiple venues per admin
   - Schema ready: `venueId` on Admin model

3. **Order System:**
   - New models: `Order`, `OrderItem`
   - Track customer orders
   - Payment integration

4. **Reviews & Ratings:**
   - New model: `Review`
   - Customer feedback on products
   - Average ratings

5. **Analytics:**
   - New model: `Analytics`
   - Track product views
   - Popular items by time period
   - Customer behavior

6. **Staff Management:**
   - New model: `Staff`
   - Multiple user roles (admin, manager, waiter)
   - Permission system

---

## SQL Schema Reference

### Generated SQL Tables

```sql
-- Venue table
CREATE TABLE "Venue" (
  "id" TEXT PRIMARY KEY,
  "name" TEXT NOT NULL,
  "slug" TEXT UNIQUE NOT NULL,
  "logo" TEXT,
  "address" TEXT,
  "phone" TEXT,
  "email" TEXT,
  "description" TEXT,
  "theme" JSONB,
  "isActive" BOOLEAN DEFAULT true,
  "createdAt" TIMESTAMP DEFAULT NOW(),
  "updatedAt" TIMESTAMP
);

-- Category table
CREATE TABLE "Category" (
  "id" TEXT PRIMARY KEY,
  "name" TEXT NOT NULL,
  "nameRo" TEXT NOT NULL,
  "nameEn" TEXT,
  "slug" TEXT NOT NULL,
  "description" TEXT,
  "image" TEXT NOT NULL,
  "icon" TEXT,
  "order" INTEGER DEFAULT 0,
  "isActive" BOOLEAN DEFAULT true,
  "venueId" TEXT REFERENCES "Venue"("id") ON DELETE CASCADE,
  "createdAt" TIMESTAMP DEFAULT NOW(),
  "updatedAt" TIMESTAMP,
  UNIQUE ("venueId", "slug")
);

CREATE INDEX "Category_venueId_isActive_idx" ON "Category"("venueId", "isActive");

-- (Similar for other tables...)
```

---

## Related Documentation

- [API Documentation](./API_DOCUMENTATION.md) - REST endpoints using this schema
- [Development Guide](./DEVELOPMENT.md) - Prisma usage patterns
- [Deployment Guide](./DEPLOYMENT.md) - Database setup and migrations

---

**Database schema designed for scalability, performance, and data integrity.**

**Version 1.0 - PostgreSQL + Prisma ORM** 🗄️
