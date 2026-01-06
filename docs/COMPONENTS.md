# Components Documentation - QR Smart Menu App

**Version:** 1.0
**Last Updated:** January 6, 2026

This document provides comprehensive documentation for all React components in the QR Smart Menu application.

---

## Table of Contents

1. [Menu Components](#menu-components)
2. [Admin Components](#admin-components)
3. [QR Components](#qr-components)
4. [UI Components](#ui-components)
5. [Provider Components](#provider-components)
6. [Component Hierarchy](#component-hierarchy)
7. [Best Practices](#best-practices)

---

## Menu Components

Public-facing menu components for customers browsing the digital menu.

### Header

**Location:** `/src/components/menu/Header.tsx`

Main navigation header with glassmorphism effect and mobile menu.

#### Props

```typescript
interface HeaderProps {
  venueName?: string      // Venue name (default: APP_NAME)
  logo?: string          // Optional logo URL
  showBack?: boolean     // Show back button instead of logo
  transparent?: boolean  // Transparent background on page load
}
```

#### Features

- Glassmorphism effect on scroll (backdrop blur + transparency)
- Mobile-responsive hamburger menu
- Language switcher (RO/EN - EN currently disabled)
- Sticky positioning with smooth transitions
- Breadcrumb-style navigation support
- Auto-closes mobile menu on route change

#### Usage

```tsx
// Simple usage
<Header venueName="INFINITY LOUNGE" />

// With custom logo
<Header
  venueName="My Restaurant"
  logo="/logo.png"
  transparent={true}
/>

// With back button
<Header showBack={true} />
```

#### Key Features

- **Scroll Detection:** Changes background from transparent to blur after 10px scroll
- **Mobile Menu:** Hamburger icon toggles full menu on mobile devices
- **Home Icon:** Shown in breadcrumb navigation
- **Active Route Highlighting:** Current page highlighted in navigation

---

### CategoryCard

**Location:** `/src/components/menu/CategoryCard.tsx`

Card component for displaying menu categories with images and metadata.

#### Props

```typescript
interface CategoryCardProps {
  category: MenuCategory
  className?: string
}

interface MenuCategory {
  id: string
  name: string
  slug: string
  image: string
  description?: string
  subcategoriesCount: number
  productsCount: number
}
```

#### Features

- 16:9 aspect ratio for consistent layout
- Gradient overlay for text readability
- Hover effects (scale + shadow + icon)
- Next.js Image optimization
- Lazy loading with priority control
- Responsive typography

#### Usage

```tsx
import { CategoryCard } from '@/components/menu/CategoryCard'

<CategoryCard
  category={{
    id: '1',
    name: 'Băuturi',
    slug: 'bauturi',
    image: '/images/drinks.jpg',
    description: 'Băuturi răcoritoare și calde',
    subcategoriesCount: 3,
    productsCount: 25
  }}
/>
```

#### Skeleton Loader

```tsx
import { CategoryCardSkeleton } from '@/components/menu/CategoryCard'

<CategoryCardSkeleton /> // For loading states
```

---

### ProductCard

**Location:** `/src/components/menu/ProductCard.tsx`

Card component for displaying individual products with pricing, allergens, and availability.

#### Props

```typescript
interface ProductCardProps {
  product: MenuProduct
  onClick?: () => void
  className?: string
}

interface MenuProduct {
  id: string
  name: string
  description?: string
  price: number
  oldPrice?: number
  image: string
  quantity?: string
  allergens?: string[]
  isFeatured: boolean
  isAvailable: boolean
}
```

#### Features

- **Discount Calculation:** Automatic percentage badge for discounts
- **Featured Badge:** Star icon for recommended products
- **Availability State:** Grayscale filter + overlay for unavailable items
- **Allergen Display:** Shows up to 3 allergens, then "+N more"
- **Price Formatting:** Romanian Lei (RON) with strike-through for old price
- **Keyboard Navigation:** Enter/Space to trigger onClick

#### Usage

```tsx
import { ProductCard } from '@/components/menu/ProductCard'

<ProductCard
  product={{
    id: '1',
    name: 'Espresso',
    description: 'Cafea espresso intensă',
    price: 8.50,
    oldPrice: 10.00,
    image: '/images/espresso.jpg',
    quantity: '30ml',
    allergens: ['lactoza'],
    isFeatured: true,
    isAvailable: true
  }}
  onClick={() => setSelectedProduct(product)}
/>
```

#### Skeleton Loader

```tsx
import { ProductCardSkeleton } from '@/components/menu/ProductCard'

<ProductCardSkeleton /> // For loading states
```

---

### ProductModal

**Location:** `/src/components/menu/ProductModal.tsx`

Full-screen modal for detailed product view with large image and complete information.

#### Props

```typescript
interface ProductModalProps {
  product: MenuProduct
  isOpen: boolean
  onClose: () => void
}
```

#### Features

- **Full-screen modal** with backdrop blur
- **ESC key support** to close modal
- **Backdrop click** to close
- **Body scroll lock** when modal is open
- **Smooth animations:** fade-in + scale-in
- **Complete allergen labels** in Romanian
- **Responsive layout:** Different close button placement on mobile

#### Usage

```tsx
import { ProductModal } from '@/components/menu/ProductModal'

const [selectedProduct, setSelectedProduct] = useState<MenuProduct | null>(null)

<ProductModal
  product={selectedProduct}
  isOpen={!!selectedProduct}
  onClose={() => setSelectedProduct(null)}
/>
```

#### Key Features

- Displays discount percentage badge
- Shows "Temporar Indisponibil" overlay for unavailable products
- Uses `ALLERGEN_LABELS` constant for Romanian translations
- Mobile: Dedicated "Închide" button at bottom
- Desktop: Floating close button (top-right)

---

### ProductGrid

**Location:** `/src/components/menu/ProductGrid.tsx`

Grid container that displays products separated by availability status.

#### Props

```typescript
interface ProductGridProps {
  products: MenuProduct[]
  showUnavailable?: boolean  // Default: true
}
```

#### Features

- **Automatic separation:** Available products first, unavailable products in separate section
- **Responsive grid:** 1 column (mobile) → 2 (tablet) → 3 (desktop) → 4 (large screens)
- **Integrated modal:** Opens ProductModal on card click
- **Section headers:** "Temporar Indisponibile" for unavailable section

#### Usage

```tsx
import { ProductGrid } from '@/components/menu/ProductGrid'

<ProductGrid
  products={categoryProducts}
  showUnavailable={true}
/>
```

---

### Breadcrumb

**Location:** `/src/components/menu/Breadcrumb.tsx`

Navigation breadcrumb trail for category/subcategory hierarchy.

#### Props

```typescript
interface BreadcrumbProps {
  items: BreadcrumbItem[]
  className?: string
}

interface BreadcrumbItem {
  label: string
  href: string
}
```

#### Features

- **Home icon** for first item
- **ChevronRight separators** between items
- **Mobile optimization:** Truncate long labels on small screens
- **Active page styling:** Last item shown in brand color
- **Auto-hide:** Doesn't render if only one item

#### Usage

```tsx
import { Breadcrumb } from '@/components/menu/Breadcrumb'

<Breadcrumb
  items={[
    { label: 'Acasă', href: '/' },
    { label: 'Băuturi', href: '/bauturi' },
    { label: 'Cafea', href: '/bauturi/cafea' }
  ]}
/>
```

#### MobileBreadcrumb

Collapsed version showing only Home → Current Page.

```tsx
import { MobileBreadcrumb } from '@/components/menu/Breadcrumb'

<MobileBreadcrumb items={breadcrumbItems} />
```

---

## Admin Components

Admin panel components for managing menu content.

### AdminSidebar

**Location:** `/src/components/admin/AdminSidebar.tsx`

Fixed sidebar navigation for admin panel.

#### Features

- **Fixed positioning** on desktop (left side)
- **Mobile backdrop** for overlay menu
- **Navigation items:**
  - Dashboard (LayoutDashboard icon)
  - Categorii (FolderTree icon)
  - Produse (Package icon)
  - Coduri QR (QrCode icon)
  - Setări (Settings icon)
- **Active route highlighting**
- **Logout button** with NextAuth signOut

#### Usage

```tsx
import { AdminSidebar } from '@/components/admin/AdminSidebar'

// In admin layout
<AdminSidebar />
```

#### Navigation Structure

```typescript
const navigation = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Categorii', href: '/admin/categories', icon: FolderTree },
  { name: 'Produse', href: '/admin/products', icon: Package },
  { name: 'Coduri QR', href: '/admin/qr-codes', icon: QrCode },
  { name: 'Setări', href: '/admin/settings', icon: Settings },
]
```

---

### AdminHeader

**Location:** `/src/components/admin/AdminHeader.tsx`

Top header bar for admin panel with user info and mobile menu toggle.

#### Usage

```tsx
import { AdminHeader } from '@/components/admin/AdminHeader'

<AdminHeader />
```

---

### CRUD Modals - Categories

#### CreateCategoryModal

**Location:** `/src/components/admin/CreateCategoryModal.tsx`

Modal form for creating new categories.

**Props:**
```typescript
interface CreateCategoryModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}
```

**Features:**
- Auto-generate slug from Romanian name (handles diacritics)
- Image URL input (manual for now, Cloudinary pending)
- Description textarea
- Form validation
- Toast notifications (success/error)
- Loading states

**Usage:**
```tsx
import { CreateCategoryModal } from '@/components/admin/CreateCategoryModal'

<CreateCategoryModal
  isOpen={isCreateModalOpen}
  onClose={() => setIsCreateModalOpen(false)}
  onSuccess={fetchCategories}
/>
```

#### EditCategoryModal

**Location:** `/src/components/admin/EditCategoryModal.tsx`

Modal form for editing existing categories.

**Props:**
```typescript
interface EditCategoryModalProps {
  isOpen: boolean
  category: Category | null
  onClose: () => void
  onSuccess: () => void
}
```

**Features:**
- Pre-populate form with existing data
- Update slug automatically when name changes
- PUT request to API
- Toast notifications

#### DeleteCategoryDialog

**Location:** `/src/components/admin/DeleteCategoryDialog.tsx`

Confirmation dialog for category deletion with cascade validation.

**Props:**
```typescript
interface DeleteCategoryDialogProps {
  isOpen: boolean
  category: Category | null
  onClose: () => void
  onSuccess: () => void
}
```

**Features:**
- **Warning icon** (AlertTriangle)
- **Cascade validation:** Prevents deletion if category has subcategories or products
- **Error handling:** Special message for cascade validation failures
- **Loading state** while deleting

**Usage:**
```tsx
import { DeleteCategoryDialog } from '@/components/admin/DeleteCategoryDialog'

<DeleteCategoryDialog
  isOpen={isDeleteDialogOpen}
  category={categoryToDelete}
  onClose={() => setIsDeleteDialogOpen(false)}
  onSuccess={fetchCategories}
/>
```

---

### CRUD Modals - Products

#### CreateProductModal

**Location:** `/src/components/admin/CreateProductModal.tsx`

Modal form for creating new products.

**Props:**
```typescript
interface CreateProductModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}
```

**Form Fields:**
- Name (required)
- Description (textarea)
- Price (number, required)
- Old Price (number, optional - for discounts)
- Image URL (text)
- Quantity (e.g., "250ml", "100g")
- Category (dropdown, required)
- Subcategory (dropdown, filtered by category)
- Allergens (checkbox group - 8 common allergens)
- Featured (checkbox)
- Available (checkbox)

**Features:**
- **Dynamic subcategory filtering** based on selected category
- **Allergen selection:** Common allergens with Romanian labels
- **Price validation:** Old price must be greater than current price
- **Auto-reset form** after successful creation

#### EditProductModal

**Location:** `/src/components/admin/EditProductModal.tsx`

Modal form for editing existing products with pre-populated data.

#### DeleteProductDialog

**Location:** `/src/components/admin/DeleteProductDialog.tsx`

Confirmation dialog for product deletion.

---

### CRUD Modals - QR Codes

#### CreateQRCodeModal

**Location:** `/src/components/admin/CreateQRCodeModal.tsx`

Modal form for creating QR codes with live preview.

**Props:**
```typescript
interface CreateQRCodeModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}
```

**Form Fields:**
- Name (required) - e.g., "Masa 1", "Bar Counter"
- Location (required) - Used for tracking
- Custom URL (optional) - Defaults to auto-generated URL
- Active status (checkbox)

**Features:**
- **Live QR preview** while typing
- **Auto-generate URL:** `{baseUrl}?qr={location-slugified}`
- **Real-time preview** updates as location changes
- Uses QRCodeDisplay component for preview

**Usage:**
```tsx
import { CreateQRCodeModal } from '@/components/admin/CreateQRCodeModal'

<CreateQRCodeModal
  isOpen={isCreateModalOpen}
  onClose={() => setIsCreateModalOpen(false)}
  onSuccess={fetchQRCodes}
/>
```

#### EditQRCodeModal

**Location:** `/src/components/admin/EditQRCodeModal.tsx`

Modal form for editing existing QR codes.

**Props:**
```typescript
interface EditQRCodeModalProps {
  isOpen: boolean
  qrCode: QRCode | null
  onClose: () => void
  onSuccess: () => void
}

interface QRCode {
  id: string
  name: string
  location: string
  url: string
  isActive: boolean
}
```

**Features:**
- Pre-populate form with existing QR code data
- Live preview updates with changes
- PUT request to `/api/qr-codes/[id]`

#### DeleteQRCodeDialog

**Location:** `/src/components/admin/DeleteQRCodeDialog.tsx`

Confirmation dialog for QR code deletion.

**Features:**
- Warning about losing scan statistics
- Cannot be undone message
- DELETE request to API

---

## QR Components

### QRCodeDisplay

**Location:** `/src/components/qr/QRCodeDisplay.tsx`

Reusable component for displaying QR codes with download functionality.

#### Props

```typescript
interface QRCodeDisplayProps {
  url: string                    // URL to encode in QR
  size?: number                  // Display size (default: 256px)
  downloadFileName?: string      // Filename for downloads (default: 'qr-code')
}
```

#### Features

- **Server-side QR generation** via `/api/qr-codes/generate`
- **Download buttons** for PNG and SVG formats
- **High-resolution export:** 1024x1024px for printing
- **Loading state:** Animated pulse while generating
- **URL display** below QR code
- **Blob download:** Client-side file creation

#### Usage

```tsx
import { QRCodeDisplay } from '@/components/qr/QRCodeDisplay'

<QRCodeDisplay
  url="https://infinitylounge.ro?qr=masa-1"
  size={200}
  downloadFileName="masa-1-qr"
/>
```

#### Download Functionality

```typescript
const handleDownload = async (format: 'png' | 'svg') => {
  // Fetches 1024x1024 version for high quality
  const downloadUrl = `/api/qr-codes/generate?url=${encodeURIComponent(url)}&format=${format}&size=1024`
  const response = await fetch(downloadUrl)
  const blob = await response.blob()

  // Creates download link and triggers download
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = `${downloadFileName}.${format}`
  link.click()
}
```

---

## UI Components

Shadcn/ui components used throughout the application.

### Button

**Location:** `/src/components/ui/button.tsx`

Customizable button component with variants.

**Variants:**
- `default` - Primary brand color
- `outline` - Border with transparent background
- `ghost` - No border, transparent background
- `secondary` - Secondary brand color

**Sizes:**
- `sm` - Small (compact padding)
- `default` - Medium
- `lg` - Large

**Usage:**
```tsx
import { Button } from '@/components/ui/button'

<Button variant="default">Click Me</Button>
<Button variant="outline" size="sm">Small Outline</Button>
```

---

### Badge

**Location:** `/src/components/ui/badge.tsx`

Small label component for status, categories, or tags.

**Variants:**
- `default` - Brand primary
- `secondary` - Brand secondary (golden)
- `outline` - Border only
- `error` - Red (for discounts/warnings)

**Usage:**
```tsx
import { Badge } from '@/components/ui/badge'

<Badge variant="default">New</Badge>
<Badge variant="error">-20%</Badge>
<Badge variant="secondary">⭐ Popular</Badge>
```

---

### Card

**Location:** `/src/components/ui/card.tsx`

Container component with border and shadow.

**Sub-components:**
- `Card` - Main container
- `CardHeader` - Top section
- `CardTitle` - Title text
- `CardDescription` - Subtitle text
- `CardContent` - Main content area
- `CardFooter` - Bottom section

**Usage:**
```tsx
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

<Card>
  <CardHeader>
    <CardTitle>Dashboard</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Content here...</p>
  </CardContent>
</Card>
```

---

### Input

**Location:** `/src/components/ui/input.tsx`

Styled text input field.

**Usage:**
```tsx
import { Input } from '@/components/ui/input'

<Input
  type="text"
  placeholder="Enter name..."
  value={name}
  onChange={(e) => setName(e.target.value)}
/>
```

---

### Label

**Location:** `/src/components/ui/label.tsx`

Form label component.

**Usage:**
```tsx
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

<div>
  <Label htmlFor="email">Email</Label>
  <Input id="email" type="email" />
</div>
```

---

### Skeleton

**Location:** `/src/components/ui/skeleton.tsx`

Loading placeholder with pulse animation.

**Usage:**
```tsx
import { Skeleton } from '@/components/ui/skeleton'

<Skeleton className="h-4 w-full" />
<Skeleton className="h-8 w-32" />
```

---

### Toaster

**Location:** `/src/components/ui/toaster.tsx`

Toast notification container using Sonner library.

**Usage:**
```tsx
// In root layout
import { Toaster } from '@/components/ui/toaster'

<body>
  {children}
  <Toaster />
</body>
```

**Trigger toasts:**
```tsx
import { toast } from 'sonner'

toast.success('Category created successfully!')
toast.error('Failed to delete product')
toast.info('Processing...')
```

---

## Provider Components

### SessionProvider

**Location:** `/src/components/providers/SessionProvider.tsx`

NextAuth session provider wrapper.

**Usage:**
```tsx
import { SessionProvider } from '@/components/providers/SessionProvider'

<SessionProvider>
  {children}
</SessionProvider>
```

**Access session:**
```tsx
import { useSession } from 'next-auth/react'

const { data: session, status } = useSession()
```

---

## Component Hierarchy

### Public Menu Flow

```
App Root
└── Header
    ├── Home Page
    │   ├── Hero Section
    │   └── CategoryCard Grid
    │       └── Link to Category Page
    │
    ├── Category Page
    │   ├── Breadcrumb
    │   ├── CategoryCard Grid (Subcategories)
    │   └── ProductGrid
    │       ├── ProductCard
    │       └── ProductModal (on click)
    │
    └── Subcategory Page
        ├── Breadcrumb
        └── ProductGrid
            ├── ProductCard
            └── ProductModal
```

### Admin Panel Flow

```
Admin Layout
├── AdminSidebar
├── AdminHeader
└── Page Content
    ├── Dashboard
    │   ├── Stats Cards
    │   └── Quick Actions
    │
    ├── Categories Page
    │   ├── CategoryCard Grid
    │   ├── CreateCategoryModal
    │   ├── EditCategoryModal
    │   └── DeleteCategoryDialog
    │
    ├── Products Page
    │   ├── ProductTable
    │   ├── CreateProductModal
    │   ├── EditProductModal
    │   └── DeleteProductDialog
    │
    └── QR Codes Page
        ├── QR Grid
        │   └── QRCodeDisplay (preview)
        ├── CreateQRCodeModal
        │   └── QRCodeDisplay (live preview)
        ├── EditQRCodeModal
        │   └── QRCodeDisplay
        └── DeleteQRCodeDialog
```

---

## Best Practices

### 1. Component Organization

```
src/components/
├── menu/          # Public-facing menu components
├── admin/         # Admin panel components
├── qr/           # QR code-specific components
├── ui/           # Reusable UI primitives (Shadcn)
└── providers/    # Context providers
```

### 2. TypeScript Interfaces

Always define props interfaces:

```typescript
interface ComponentProps {
  requiredProp: string
  optionalProp?: number
  callback?: () => void
}

export function Component({ requiredProp, optionalProp, callback }: ComponentProps) {
  // ...
}
```

### 3. Client vs Server Components

- **Client Components (`'use client'`):**
  - Components with state (`useState`, `useEffect`)
  - Event handlers (`onClick`, `onChange`)
  - Browser APIs (`window`, `document`)
  - Examples: All modals, ProductModal, Header

- **Server Components (default):**
  - Static content rendering
  - Data fetching
  - No interactivity needed
  - Examples: CategoryCard, ProductCard, Breadcrumb

### 4. Loading States

Always provide skeleton loaders for async content:

```tsx
{isLoading ? (
  <CategoryCardSkeleton />
) : (
  <CategoryCard category={data} />
)}
```

### 5. Accessibility

- Use semantic HTML (`<nav>`, `<button>`, `<header>`)
- Add ARIA labels (`aria-label`, `aria-hidden`)
- Support keyboard navigation (Enter, Escape, Tab)
- Provide focus states

### 6. Image Optimization

Always use Next.js Image component:

```tsx
import Image from 'next/image'

<Image
  src={product.image}
  alt={product.name}
  fill
  sizes="(max-width: 768px) 100vw, 50vw"
  className="object-cover"
/>
```

### 7. Responsive Design

Use Tailwind responsive prefixes:

```tsx
className="
  text-sm md:text-base lg:text-lg
  grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
  p-4 md:p-6 lg:p-8
"
```

### 8. Modal Patterns

Standard modal structure:

```tsx
export function Modal({ isOpen, onClose }: ModalProps) {
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
    <div onClick={onClose}> {/* Backdrop */}
      <div onClick={(e) => e.stopPropagation()}> {/* Modal */}
        {/* Content */}
      </div>
    </div>
  )
}
```

### 9. Form Handling

Standard form pattern with validation:

```tsx
const [formData, setFormData] = useState({
  name: '',
  description: '',
})
const [isSubmitting, setIsSubmitting] = useState(false)

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  setIsSubmitting(true)

  try {
    const response = await fetch('/api/endpoint', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })

    if (!response.ok) throw new Error('Failed')

    toast.success('Success!')
    onSuccess()
    onClose()
  } catch (error) {
    toast.error(error.message)
  } finally {
    setIsSubmitting(false)
  }
}
```

### 10. Styling Conventions

- Use Tailwind utility classes
- Use `cn()` helper for conditional classes
- Use design tokens from `tailwind.config.ts`:
  - Colors: `brand-primary`, `brand-secondary`, `text-primary`, etc.
  - Spacing: Tailwind defaults
  - Fonts: `font-display` for headings, default for body

```tsx
import { cn } from '@/lib/utils'

<div className={cn(
  'base-classes',
  isActive && 'active-classes',
  className // Allow override via props
)}>
```

---

## Component Checklist

When creating a new component:

- [ ] Define TypeScript interface for props
- [ ] Add proper `'use client'` directive if needed
- [ ] Implement responsive design (mobile-first)
- [ ] Add loading states where applicable
- [ ] Include accessibility features (ARIA, keyboard nav)
- [ ] Optimize images with Next.js Image
- [ ] Add error handling for async operations
- [ ] Create skeleton loader variant if needed
- [ ] Document props and usage in this file
- [ ] Test on mobile, tablet, and desktop

---

## Related Documentation

- [API Documentation](./API_DOCUMENTATION.md) - REST API endpoints
- [Database Schema](./DATABASE_SCHEMA.md) - Prisma models
- [Development Guide](./DEVELOPMENT.md) - Setup and contribution
- [Deployment Guide](./DEPLOYMENT.md) - Production deployment

---

**Built with Next.js 16, React 19, TypeScript 5, and Tailwind CSS 4**
