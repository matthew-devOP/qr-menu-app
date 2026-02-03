# QR Menu App - Missing Features & Gaps Analysis

> **Last Updated:** January 31, 2026
> **Version:** 1.0
> **Purpose:** Comprehensive list of incomplete features and recommended enhancements

## Table of Contents

1. [Critical Gaps](#critical-gaps)
2. [Important Missing Features](#important-missing-features)
3. [Nice-to-Have Enhancements](#nice-to-have-enhancements)
4. [Technical Debt](#technical-debt)
5. [Security Vulnerabilities](#security-vulnerabilities)
6. [Performance Optimizations](#performance-optimizations)
7. [Effort Estimates](#effort-estimates)

---

## Critical Gaps

### 1. Subcategory Management System

**Status:** ❌ Schema exists, no implementation

**Impact:** HIGH - Core hierarchical navigation feature missing

#### What's Missing

1. **API Endpoints:**
   ```
   ❌ GET    /api/subcategories          - List all subcategories
   ❌ POST   /api/subcategories          - Create subcategory
   ❌ GET    /api/subcategories/[id]     - Get single subcategory
   ❌ PUT    /api/subcategories/[id]     - Update subcategory
   ❌ DELETE /api/subcategories/[id]     - Delete subcategory
   ```

2. **Admin UI:**
   - ❌ Subcategory CRUD page (`/admin/subcategories` doesn't exist)
   - ❌ Create subcategory modal
   - ❌ Edit subcategory modal
   - ❌ Delete subcategory dialog
   - ❌ Subcategory list view (grid or table)
   - ❌ Parent category selection dropdown

3. **Database Seeding:**
   - ❌ No seed data for subcategories
   - ✅ Schema is fully defined

4. **Product Assignment:**
   - ❌ Product form has subcategory dropdown, but it's always empty
   - ❌ Cannot filter products by subcategory in admin
   - ❌ Subcategory page shows no products (no data exists)

#### Recommended Implementation

**Database Schema** (Already Complete):
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
  categoryId    String
  category      Category  @relation(...)
  products      Product[]

  @@unique([categoryId, slug])
  @@index([categoryId, isActive])
}
```

**API Routes to Create:**

1. **`src/app/api/subcategories/route.ts`:**
```typescript
// GET - List subcategories (optionally filtered by categoryId)
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const categoryId = searchParams.get('categoryId')

  const subcategories = await prisma.subcategory.findMany({
    where: categoryId ? { categoryId } : {},
    include: {
      category: true,
      _count: {
        select: { products: true }
      }
    },
    orderBy: { order: 'asc' }
  })

  return NextResponse.json(subcategories)
}

// POST - Create subcategory (auth required)
export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()
  const { name, nameRo, nameEn, description, image, categoryId } = body

  // Generate slug
  const slug = slugify(nameRo || name)

  // Check unique constraint
  const existing = await prisma.subcategory.findUnique({
    where: {
      categoryId_slug: {
        categoryId,
        slug
      }
    }
  })

  if (existing) {
    return NextResponse.json(
      { error: 'Subcategory with this slug already exists in this category' },
      { status: 409 }
    )
  }

  // Get max order
  const maxOrder = await prisma.subcategory.aggregate({
    where: { categoryId },
    _max: { order: true }
  })

  const subcategory = await prisma.subcategory.create({
    data: {
      name,
      nameRo,
      nameEn,
      description,
      image,
      slug,
      categoryId,
      order: (maxOrder._max.order || 0) + 1
    }
  })

  return NextResponse.json(subcategory)
}
```

2. **`src/app/api/subcategories/[id]/route.ts`:**
```typescript
// Similar pattern to categories/[id]/route.ts
// GET, PUT, DELETE methods
```

**Admin UI to Create:**

1. **`src/app/admin/subcategories/page.tsx`:**
```typescript
'use client'

export default function SubcategoriesPage() {
  const [subcategories, setSubcategories] = useState<Subcategory[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  // Fetch logic similar to categories page
  // Grid display with parent category shown
  // Create/Edit/Delete modals
}
```

2. **Components:**
   - `CreateSubcategoryModal.tsx`
   - `EditSubcategoryModal.tsx`
   - `DeleteSubcategoryDialog.tsx`

**Database Seeding:**

```typescript
// Add to prisma/seed.ts
const subcategories = [
  {
    nameRo: 'Băuturi Calde',
    nameEn: 'Hot Drinks',
    categoryId: coffeeCategory.id,
    image: 'https://...',
  },
  {
    nameRo: 'Băuturi Reci',
    nameEn: 'Cold Drinks',
    categoryId: coffeeCategory.id,
    image: 'https://...',
  },
]

for (const sub of subcategories) {
  await prisma.subcategory.create({ data: sub })
}
```

**Effort Estimate:** 2-3 days (Medium complexity)

**Priority:** 🔴 CRITICAL - Must have before launch

---

### 2. Image Upload System

**Status:** ⚠️ URL-based only, no file upload

**Impact:** HIGH - Admin UX severely limited

#### What's Missing

1. **File Upload Component:**
   - ❌ No drag-and-drop upload
   - ❌ No file selection dialog
   - ❌ No image preview before upload
   - ✅ URL input field works (current workaround)

2. **Storage Integration:**
   - ❌ No Cloudinary integration (configured but not used)
   - ❌ No Vercel Blob integration
   - ❌ No S3 integration
   - ❌ No local file storage

3. **Image Processing:**
   - ❌ No compression before upload
   - ❌ No automatic resizing
   - ❌ No format conversion (WebP/AVIF)
   - ❌ No image validation (type, size, dimensions)

4. **Multiple Image Gallery:**
   - ✅ Schema supports `Product.images[]`
   - ❌ No UI for uploading multiple images
   - ❌ No gallery viewer in product modal

#### Recommended Implementation

**Option A: Cloudinary (Recommended)**

**Setup:**
```bash
npm install cloudinary-react
```

**Environment Variables:**
```env
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
CLOUDINARY_FOLDER="qr-menu-app"
```

**API Route for Signed Upload:**

```typescript
// src/app/api/upload/route.ts
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const formData = await request.formData()
  const file = formData.get('file') as File

  if (!file) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 })
  }

  // Validate file type
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp']
  if (!allowedTypes.includes(file.type)) {
    return NextResponse.json(
      { error: 'Invalid file type. Only JPEG, PNG, and WebP allowed.' },
      { status: 400 }
    )
  }

  // Validate file size (5MB max)
  if (file.size > 5 * 1024 * 1024) {
    return NextResponse.json(
      { error: 'File too large. Max size: 5MB' },
      { status: 400 }
    )
  }

  // Convert to buffer
  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)

  // Upload to Cloudinary
  const result = await new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      {
        folder: process.env.CLOUDINARY_FOLDER,
        transformation: [
          { width: 1200, height: 1200, crop: 'limit' },
          { quality: 'auto:good' },
          { fetch_format: 'auto' }
        ]
      },
      (error, result) => {
        if (error) reject(error)
        else resolve(result)
      }
    ).end(buffer)
  })

  return NextResponse.json({
    url: result.secure_url,
    publicId: result.public_id
  })
}
```

**Upload Component:**

```typescript
// src/components/admin/ImageUpload.tsx
'use client'

interface ImageUploadProps {
  value?: string
  onChange: (url: string) => void
  label?: string
}

export function ImageUpload({ value, onChange, label }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState<string | null>(value || null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error)
      }

      const { url } = await response.json()
      setPreview(url)
      onChange(url)
      toast.success('Image uploaded successfully!')

    } catch (error) {
      toast.error(error.message || 'Upload failed')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="space-y-2">
      {label && <Label>{label}</Label>}

      {/* Preview */}
      {preview && (
        <div className="relative aspect-video w-full overflow-hidden rounded-lg border">
          <Image
            src={preview}
            alt="Preview"
            fill
            className="object-cover"
          />
          <button
            type="button"
            onClick={() => {
              setPreview(null)
              onChange('')
            }}
            className="absolute top-2 right-2 p-1 bg-black/50 rounded-full hover:bg-black/70"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>
      )}

      {/* Upload button */}
      <label
        className={cn(
          'flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer',
          'hover:bg-background-secondary transition-colors',
          uploading && 'opacity-50 cursor-not-allowed'
        )}
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          {uploading ? (
            <>
              <Loader2 className="w-8 h-8 animate-spin mb-2" />
              <p className="text-sm text-text-muted">Uploading...</p>
            </>
          ) : (
            <>
              <Upload className="w-8 h-8 mb-2 text-text-muted" />
              <p className="text-sm text-text-secondary">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-text-muted">PNG, JPG, WEBP (max 5MB)</p>
            </>
          )}
        </div>
        <input
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
          disabled={uploading}
        />
      </label>

      {/* Fallback: URL input */}
      <div className="text-sm text-text-muted text-center">
        Or enter image URL:
        <Input
          type="url"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://example.com/image.jpg"
          className="mt-2"
        />
      </div>
    </div>
  )
}
```

**Usage in Forms:**

```typescript
// In CreateProductModal.tsx
<ImageUpload
  value={formData.image}
  onChange={(url) => setFormData({ ...formData, image: url })}
  label="Product Image"
/>
```

**Option B: Vercel Blob (Alternative)**

```bash
npm install @vercel/blob
```

```typescript
// src/app/api/upload/route.ts
import { put } from '@vercel/blob'

export async function POST(request: NextRequest) {
  const formData = await request.formData()
  const file = formData.get('file') as File

  const blob = await put(file.name, file, {
    access: 'public',
  })

  return NextResponse.json({ url: blob.url })
}
```

**Effort Estimate:** 3-5 days (High complexity with Cloudinary integration)

**Priority:** 🔴 CRITICAL - Severely impacts admin UX

---

### 3. Real Dashboard Statistics

**Status:** ⚠️ Mock data only, not connected to database

**Impact:** MEDIUM - Misleading for admin users

#### What's Missing

1. **Database Queries:**
   - ❌ No real category count
   - ❌ No real product count
   - ❌ No QR scan count aggregation
   - ❌ No featured products count

2. **Current State:**
   ```typescript
   // Mock data in /admin/dashboard/page.tsx
   const stats = {
     categories: 12,        // ❌ Hardcoded
     products: 48,          // ❌ Hardcoded
     views: 1234,           // ❌ Hardcoded (no tracking)
     popularItems: 8,       // ❌ Hardcoded
   }
   ```

3. **Missing Analytics:**
   - ❌ No QR scan tracking
   - ❌ No view/click analytics
   - ❌ No popular products (based on real data)
   - ❌ No charts or visualizations

#### Recommended Implementation

**API Route for Dashboard Stats:**

```typescript
// src/app/api/dashboard/stats/route.ts
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function GET() {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    // Get default venue
    const venue = await prisma.venue.findFirst({
      where: { isActive: true }
    })

    if (!venue) {
      return NextResponse.json({ error: 'No active venue' }, { status: 404 })
    }

    // Parallel queries for performance
    const [
      categoriesCount,
      productsCount,
      qrScansSum,
      featuredProductsCount,
      activeQRCodes,
      recentProducts
    ] = await Promise.all([
      // Total categories
      prisma.category.count({
        where: {
          venueId: venue.id,
          isActive: true
        }
      }),

      // Total products
      prisma.product.count({
        where: {
          category: {
            venueId: venue.id
          },
          isAvailable: true
        }
      }),

      // Total QR scans
      prisma.qRCode.aggregate({
        where: { venueId: venue.id },
        _sum: { scans: true }
      }),

      // Featured products
      prisma.product.count({
        where: {
          category: {
            venueId: venue.id
          },
          isFeatured: true
        }
      }),

      // Active QR codes
      prisma.qRCode.count({
        where: {
          venueId: venue.id,
          isActive: true
        }
      }),

      // Recent products (last 7 days)
      prisma.product.findMany({
        where: {
          category: {
            venueId: venue.id
          },
          createdAt: {
            gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
          }
        },
        orderBy: { createdAt: 'desc' },
        take: 5,
        include: {
          category: {
            select: { name: true }
          }
        }
      })
    ])

    return NextResponse.json({
      categories: categoriesCount,
      products: productsCount,
      totalScans: qrScansSum._sum.scans || 0,
      featuredProducts: featuredProductsCount,
      activeQRCodes: activeQRCodes,
      recentProducts: recentProducts
    })

  } catch (error) {
    console.error('Dashboard stats error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    )
  }
}
```

**Update Dashboard Page:**

```typescript
// src/app/admin/dashboard/page.tsx
'use client'

export default function DashboardPage() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/dashboard/stats')
        const data = await response.json()
        setStats(data)
      } catch (error) {
        toast.error('Failed to load dashboard stats')
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (loading) {
    return <DashboardSkeleton />
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader>
          <CardTitle>Total Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{stats.categories}</div>
        </CardContent>
      </Card>

      {/* ... other stats cards */}
    </div>
  )
}
```

**Add Charts (Optional):**

```bash
npm install recharts
```

```typescript
// Weekly scans chart
<ResponsiveContainer width="100%" height={300}>
  <LineChart data={scanData}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="date" />
    <YAxis />
    <Tooltip />
    <Line type="monotone" dataKey="scans" stroke="#fbbf24" />
  </LineChart>
</ResponsiveContainer>
```

**Effort Estimate:** 1-2 days (Low-Medium complexity)

**Priority:** 🟡 IMPORTANT - Improves admin experience

---

## Important Missing Features

### 4. QR Analytics Tracking

**Status:** ⚠️ Route exists, not implemented on frontend

**Impact:** MEDIUM - Missing business insights

#### What's Missing

1. **Scan Event Tracking:**
   - ✅ API route exists: `POST /api/qr-codes/[id]/scan`
   - ❌ Not called from frontend when QR is scanned
   - ❌ No scan count increment
   - ❌ No last scanned timestamp update

2. **Analytics Dashboard:**
   - ❌ No charts for scan trends
   - ❌ No popular table insights
   - ❌ No time-based analysis

3. **Deep Linking:**
   - ❌ No category-specific QR codes
   - ❌ No table-specific experiences

#### Recommended Implementation

**QR Scan Tracking (Frontend):**

```typescript
// src/app/page.tsx or category pages
'use client'

export default function HomePage({ searchParams }: { searchParams: { qr?: string } }) {
  useEffect(() => {
    const qrId = searchParams.qr

    if (qrId) {
      // Track QR scan
      fetch(`/api/qr-codes/${qrId}/scan`, {
        method: 'POST'
      }).catch(console.error)
    }
  }, [searchParams])

  return (/* ... */)
}
```

**QR URL Format:**

```
https://yourdomain.com/?qr=qr_code_id_here
https://yourdomain.com/[categorySlug]?qr=qr_code_id_here&table=1
```

**Analytics API:**

```typescript
// src/app/api/qr-codes/analytics/route.ts
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const days = parseInt(searchParams.get('days') || '7')

  const scans = await prisma.qRCode.findMany({
    where: {
      venueId: venue.id,
      scans: { gt: 0 }
    },
    orderBy: { scans: 'desc' },
    take: 10
  })

  return NextResponse.json({ topQRCodes: scans })
}
```

**Effort Estimate:** 2-3 days (Medium complexity)

**Priority:** 🟡 IMPORTANT - Valuable business feature

---

### 5. Multi-language Support (i18n)

**Status:** ⚠️ Schema ready, UI not functional

**Impact:** MEDIUM - International customers can't switch language

#### What's Missing

1. **Language Switching:**
   - ✅ Database has `nameEn`, `descriptionEn` fields
   - ⚠️ Language switcher button exists in header
   - ❌ Button doesn't actually switch language
   - ❌ No locale detection/persistence

2. **Content Translation:**
   - ❌ No admin UI for translating content
   - ❌ No fallback logic (EN → RO if missing)
   - ❌ Hardcoded Romanian strings in UI

#### Recommended Implementation

**Option A: next-intl (Recommended)**

```bash
npm install next-intl
```

**Configuration:**

```typescript
// src/i18n.ts
import { getRequestConfig } from 'next-intl/server'

export default getRequestConfig(async ({ locale }) => ({
  messages: (await import(`./messages/${locale}.json`)).default
}))
```

**Messages:**

```json
// src/messages/ro.json
{
  "menu": {
    "categories": "Categorii",
    "products": "Produse",
    "featured": "Popular",
    "unavailable": "Indisponibil"
  }
}

// src/messages/en.json
{
  "menu": {
    "categories": "Categories",
    "products": "Products",
    "featured": "Featured",
    "unavailable": "Unavailable"
  }
}
```

**Usage:**

```typescript
'use client'
import { useTranslations } from 'next-intl'

export function ProductCard({ product }) {
  const t = useTranslations('menu')

  return (
    <div>
      {product.isFeatured && (
        <Badge>{t('featured')}</Badge>
      )}
    </div>
  )
}
```

**Language Switcher:**

```typescript
'use client'
import { useRouter, usePathname } from 'next/navigation'

export function LanguageSwitcher() {
  const router = useRouter()
  const pathname = usePathname()
  const [locale, setLocale] = useState('ro')

  const switchLanguage = (newLocale: string) => {
    setLocale(newLocale)
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000`
    router.refresh()
  }

  return (
    <button onClick={() => switchLanguage(locale === 'ro' ? 'en' : 'ro')}>
      {locale === 'ro' ? 'EN' : 'RO'}
    </button>
  )
}
```

**Effort Estimate:** 3-4 days (Medium complexity)

**Priority:** 🟡 IMPORTANT - Better customer experience

---

### 6. Settings Page Functionality

**Status:** ❌ Placeholder page only

**Impact:** LOW - Admin workaround is manual DB editing

#### What's Missing

Everything - the page is a placeholder:
- ❌ Venue info editing (name, address, phone, email)
- ❌ Profile management (admin name, email)
- ❌ Password change functionality
- ❌ Theme customization (colors, logo)
- ❌ Currency selection
- ❌ Timezone settings

#### Recommended Implementation

**Settings API:**

```typescript
// src/app/api/settings/venue/route.ts
export async function GET() {
  const venue = await prisma.venue.findFirst({
    where: { isActive: true }
  })
  return NextResponse.json(venue)
}

export async function PUT(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return unauthorized()

  const body = await request.json()
  const { name, address, phone, email, logo } = body

  const venue = await prisma.venue.update({
    where: { id: venueId },
    data: { name, address, phone, email, logo }
  })

  return NextResponse.json(venue)
}
```

**Settings UI:**

```typescript
// src/app/admin/settings/page.tsx
'use client'

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      {/* Venue Information Section */}
      <Card>
        <CardHeader>
          <CardTitle>Venue Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Input label="Venue Name" value={name} onChange={...} />
            <Input label="Address" value={address} onChange={...} />
            <Input label="Phone" value={phone} onChange={...} />
            <Input label="Email" value={email} onChange={...} />
            <Button type="submit">Save Changes</Button>
          </form>
        </CardContent>
      </Card>

      {/* Profile Section */}
      <Card>
        <CardHeader>
          <CardTitle>Your Profile</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Admin name, email, password change */}
        </CardContent>
      </Card>

      {/* Theme Customization */}
      <Card>
        <CardHeader>
          <CardTitle>Theme</CardTitle>
        </CardHeader>
        <CardContent>
          <ColorPicker label="Primary Color" value={theme.primary} />
          <ColorPicker label="Secondary Color" value={theme.secondary} />
        </CardContent>
      </Card>
    </div>
  )
}
```

**Effort Estimate:** 2-3 days (Medium complexity)

**Priority:** 🟡 IMPORTANT - Better admin UX

---

## Nice-to-Have Enhancements

### 7. Advanced Admin Features

**Bulk Operations:**
- ❌ Multi-select checkboxes on products/categories
- ❌ Bulk delete
- ❌ Bulk activate/deactivate
- ❌ Bulk category assignment

**Drag-and-Drop Ordering:**
- ❌ Reorder categories visually
- ❌ Reorder products within category
- ❌ `react-beautiful-dnd` or `@dnd-kit/core`

**Product Duplication:**
- ❌ "Duplicate" button on products
- ❌ Copy all fields, increment name
- ❌ Useful for similar items

**CSV Import/Export:**
- ❌ Export products to CSV
- ❌ Import products from CSV (bulk creation)
- ❌ Template download

**Effort Estimate:** 1-2 weeks

**Priority:** 🟢 NICE-TO-HAVE - UX improvements

---

### 8. Customer Experience Enhancements

**Global Search:**
- ❌ Search bar in header
- ❌ Search across all products
- ❌ Autocomplete suggestions
- ❌ Search by name, description, allergens

**Allergen Filtering:**
- ❌ Filter products by allergens
- ❌ "Allergen-free" badges
- ❌ Dietary preferences (vegan, gluten-free)

**Favorites/Bookmarks:**
- ❌ Heart icon on products
- ❌ LocalStorage persistence
- ❌ "My Favorites" page

**Social Sharing:**
- ❌ Share product button
- ❌ Share menu category
- ❌ Open Graph meta tags

**PWA Features:**
- ❌ Offline mode
- ❌ Add to home screen
- ❌ Service worker
- ❌ App manifest

**Effort Estimate:** 1-2 weeks

**Priority:** 🟢 NICE-TO-HAVE - Enhanced UX

---

## Technical Debt

### 9. Testing Coverage

**Current State:**
- ✅ 4 unit tests (utilities + UI components)
- ✅ 2 E2E tests (smoke + basic API)
- ❌ ~15% overall coverage

**Missing Tests:**

1. **API Route Tests:**
   - ❌ Category CRUD endpoints
   - ❌ Product CRUD endpoints
   - ❌ QR code endpoints
   - ❌ Authentication flow
   - ❌ Validation error cases

2. **Component Tests:**
   - ❌ Admin modals (create, edit, delete)
   - ❌ Product form validation
   - ❌ QR code display

3. **E2E Tests:**
   - ❌ Admin login flow
   - ❌ Category CRUD flow
   - ❌ Product CRUD flow
   - ❌ Customer journey (browse → view product)
   - ❌ QR scan flow

**Recommended Approach:**

```typescript
// tests/api/categories.test.ts
describe('Categories API', () => {
  it('GET /api/categories returns all categories', async () => {
    const response = await fetch('/api/categories')
    expect(response.status).toBe(200)
    const data = await response.json()
    expect(Array.isArray(data)).toBe(true)
  })

  it('POST /api/categories without auth returns 401', async () => {
    const response = await fetch('/api/categories', {
      method: 'POST',
      body: JSON.stringify({ name: 'Test' })
    })
    expect(response.status).toBe(401)
  })

  // ... more tests
})
```

**Effort Estimate:** 1-2 weeks for comprehensive coverage

**Priority:** 🟡 IMPORTANT - Quality assurance

---

### 10. Code Quality Improvements

**Linting & Formatting:**
- ✅ ESLint configured
- ❌ No Prettier (inconsistent formatting)
- ❌ No pre-commit hooks (Husky)
- ❌ No lint-staged

**Code Organization:**
- ✅ Good folder structure
- ⚠️ Some large files (admin pages 300+ lines)
- ❌ Should extract sub-components

**Type Safety:**
- ✅ TypeScript strict mode
- ⚠️ Some `any` types (Decimal, JSON fields)
- ❌ Could improve with branded types

**Recommendations:**

```bash
# Install Prettier
npm install -D prettier eslint-config-prettier

# Install Husky + lint-staged
npm install -D husky lint-staged
npx husky init

# .husky/pre-commit
npm run lint-staged

# package.json
{
  "lint-staged": {
    "*.{ts,tsx}": ["eslint --fix", "prettier --write"],
    "*.{json,md}": ["prettier --write"]
  }
}
```

**Effort Estimate:** 1-2 days

**Priority:** 🟢 NICE-TO-HAVE - Developer experience

---

## Security Vulnerabilities

### 11. API Rate Limiting

**Status:** ❌ Not implemented

**Impact:** HIGH - API vulnerable to abuse

**Vulnerability:**
- Unlimited requests to public endpoints
- No protection against brute-force login attempts
- No protection against API scraping

**Recommended Implementation:**

```bash
npm install @upstash/ratelimit @upstash/redis
```

```typescript
// src/lib/ratelimit.ts
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

export const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '10 s'), // 10 requests per 10 seconds
  analytics: true,
})
```

```typescript
// src/middleware.ts
import { ratelimit } from '@/lib/ratelimit'

export async function middleware(request: NextRequest) {
  const ip = request.ip ?? '127.0.0.1'
  const { success } = await ratelimit.limit(ip)

  if (!success) {
    return NextResponse.json(
      { error: 'Too many requests' },
      { status: 429 }
    )
  }

  return NextResponse.next()
}
```

**Effort Estimate:** 1-2 days

**Priority:** 🔴 CRITICAL - Security issue

---

### 12. CSRF Protection

**Status:** ❌ Not implemented

**Impact:** MEDIUM-HIGH - Mutation endpoints vulnerable

**Vulnerability:**
- No CSRF tokens on POST/PUT/DELETE
- Cross-site request forgery possible

**Recommended Implementation:**

```bash
npm install @edge-runtime/csrf
```

```typescript
// Add CSRF token generation and validation
import { createCsrfProtect } from '@edge-runtime/csrf'

const csrfProtect = createCsrfProtect({
  secret: process.env.CSRF_SECRET,
})
```

**Effort Estimate:** 1 day

**Priority:** 🟡 IMPORTANT - Security enhancement

---

### 13. Password Reset Flow

**Status:** ❌ Not implemented

**Impact:** HIGH - Users locked out permanently

**Missing:**
- ❌ "Forgot Password" link on login
- ❌ Password reset email sending
- ❌ Reset token generation/validation
- ❌ Password reset form

**Recommended Implementation:**

```typescript
// src/app/api/auth/forgot-password/route.ts
export async function POST(request: NextRequest) {
  const { email } = await request.json()

  const admin = await prisma.admin.findUnique({
    where: { email }
  })

  if (!admin) {
    // Return success anyway (don't leak user existence)
    return NextResponse.json({ message: 'Email sent if account exists' })
  }

  // Generate reset token
  const resetToken = crypto.randomBytes(32).toString('hex')
  const resetExpiry = new Date(Date.now() + 3600000) // 1 hour

  await prisma.admin.update({
    where: { id: admin.id },
    data: { resetToken, resetExpiry }
  })

  // Send email (using Resend, SendGrid, etc.)
  await sendPasswordResetEmail(email, resetToken)

  return NextResponse.json({ message: 'Email sent if account exists' })
}
```

**Effort Estimate:** 2-3 days (with email integration)

**Priority:** 🟡 IMPORTANT - Critical user flow

---

## Performance Optimizations

### 14. Caching Strategy

**Status:** ❌ No caching implemented (except QR images)

**Impact:** MEDIUM - Unnecessary DB queries

**Missing:**
- ❌ Redis for API response caching
- ❌ ISR for public pages
- ❌ SWR/React Query for client caching

**Recommended Implementation:**

**ISR for Public Pages:**

```typescript
// src/app/[categorySlug]/page.tsx
export const revalidate = 60 // Revalidate every 60 seconds

export default async function CategoryPage({ params }) {
  const category = await fetchCategory(params.categorySlug)
  return <CategoryView category={category} />
}
```

**Redis Caching:**

```typescript
// src/lib/cache.ts
import { Redis } from '@upstash/redis'

const redis = Redis.fromEnv()

export async function getCachedData<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttl: number = 60
): Promise<T> {
  const cached = await redis.get(key)
  if (cached) return cached as T

  const data = await fetcher()
  await redis.setex(key, ttl, JSON.stringify(data))
  return data
}
```

**Effort Estimate:** 3-5 days

**Priority:** 🟢 NICE-TO-HAVE - Performance boost

---

## Effort Estimates Summary

| Feature | Priority | Effort | Complexity |
|---------|----------|--------|------------|
| **Subcategory CRUD** | 🔴 Critical | 2-3 days | Medium |
| **Image Upload System** | 🔴 Critical | 3-5 days | High |
| **Real Dashboard Stats** | 🟡 Important | 1-2 days | Low-Medium |
| **QR Analytics** | 🟡 Important | 2-3 days | Medium |
| **Multi-language (i18n)** | 🟡 Important | 3-4 days | Medium |
| **Settings Page** | 🟡 Important | 2-3 days | Medium |
| **Rate Limiting** | 🔴 Critical | 1-2 days | Low-Medium |
| **Password Reset** | 🟡 Important | 2-3 days | Medium |
| **Testing Coverage** | 🟡 Important | 1-2 weeks | High |
| **Advanced Admin UX** | 🟢 Nice-to-Have | 1-2 weeks | High |
| **Customer Enhancements** | 🟢 Nice-to-Have | 1-2 weeks | High |
| **Caching Strategy** | 🟢 Nice-to-Have | 3-5 days | Medium-High |

**Total Critical Features:** 2-3 weeks
**Total Important Features:** 2-3 weeks
**Total Nice-to-Have:** 4-6 weeks

---

## Recommended Prioritization

### Phase 1: Critical (Before Production Launch)
**Timeline: 2-3 weeks**

1. ✅ Subcategory CRUD implementation
2. ✅ Image upload system (Cloudinary)
3. ✅ Real dashboard stats
4. ✅ API rate limiting
5. ✅ Basic E2E tests for critical flows

### Phase 2: Important (Post-Launch v1.1)
**Timeline: 2-3 weeks**

6. ✅ QR analytics tracking
7. ✅ Multi-language support
8. ✅ Settings page functionality
9. ✅ Password reset flow
10. ✅ Comprehensive testing

### Phase 3: Enhancements (v1.2+)
**Timeline: 4-6 weeks**

11. ✅ Advanced admin features (bulk ops, drag-drop)
12. ✅ Customer experience enhancements (search, filters)
13. ✅ Caching and performance optimizations
14. ✅ PWA features

---

**Next Steps:**
- Review [PRODUCTION_READINESS.md](./PRODUCTION_READINESS.md) for deployment checklist
- See [DEVELOPMENT_ROADMAP.md](./DEVELOPMENT_ROADMAP.md) for phased implementation plan
