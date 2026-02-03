# Production Readiness Plan — QR Menu App

## Obiectiv
Aduce aplicația de la stadiul actual (MVP cu bug-uri și features incomplete) la un standard de industrie, fully production-ready. Fără shortcuts, fără date mock în producție, fără bug-uri known.

---

## Rezumat executiv

Explorata la nivel de cod sursă complet (60 fișiere). Au fost identificate **18 bug-uri concrete, verificate line-by-line**, plus ~15 features lipsă sau broken. Planul este structurat în **10 faze ordonate** cu dependențe explicite. Fiecare fază poate fi completată independent.

---

## BUG INVENTORY — 18 bug-uri verificate în sursă

| # | Bug | Fișier | Impact |
|---|-----|--------|--------|
| 1 | Public menu = 100% mock data hardcodat | `src/app/page.tsx`, `[categorySlug]/page.tsx`, `[categorySlug]/[subcategorySlug]/page.tsx` | CRITICAL — clienți nu văd nimic real |
| 2 | `/api/subcategories` nu există | Nicio rută | CRITICAL — subcategory dropdown always empty |
| 3 | Dashboard = numere hardcodate | `src/app/admin/dashboard/page.tsx` | HIGH — admin mislead |
| 4 | AdminSidebar backdrop permanent pe mobile | `AdminSidebar.tsx` line 30 | HIGH — admin panel blocat pe telefon |
| 5 | Settings page = mockup inert | `src/app/admin/settings/page.tsx` | HIGH — 4 butons dead |
| 6 | Products page: categoryFilter unused | `src/app/admin/products/page.tsx` | MEDIUM — filter lipsă |
| 7 | SessionProvider = dead code | `providers/SessionProvider.tsx` | LOW — code bloat |
| 8 | package.json: prisma în deps + devDeps | `package.json` | HIGH — version conflict build |
| 9 | Dockerfile.prod: `ENV KEY_NAME=value` stray | `Dockerfile.prod` line 3 | LOW — placeholder leak |
| 10 | docker-compose.prod: secret hardcodat | `docker-compose.prod.yml` line 14 | CRITICAL — securitate |
| 11 | Toast messages in English | Toate 9 admin modals | MEDIUM — UX inconsistency |
| 12 | Allergen list mismatch (8 vs 12) | `CreateProductModal`, `EditProductModal` | MEDIUM — date incomplete |
| 13 | Slug generation duplicat | `CreateCategoryModal`, `EditCategoryModal` | LOW — maintenance |
| 14 | CategoryCard: no image fallback | `CategoryCard.tsx` line 26 | HIGH — crash potențial |
| 15 | MobileBreadcrumb exported, unused | `menu/index.ts` | LOW — dead export |
| 16 | Language switcher stubbed/disabled | `Header.tsx` | MEDIUM — feature broken |
| 17 | prisma/migrations/ missing | `.gitignore` excludes them | MEDIUM — no migration trail |
| 18 | Seed: MANCARE + DESERT empty | `prisma/seed.ts` | HIGH — categorii goale |

---

## FASE DE IMPLEMENTARE

### Dependențe între faze:
```
Phase 1 (Package/Docker)     ──> fără dep, do first
Phase 2 (Utils)              ──> fără dep, parallelize cu 1
Phase 3 (API Endpoints)      ──> dep: Phase 2 (schemas)
Phase 4 (Admin UI)           ──> dep: Phase 3 (subcategory API)
Phase 5 (Public Menu)        ──> dep: Phase 3
Phase 6 (Dashboard/Settings) ──> dep: Phase 3
Phase 7 (QR Tracking)        ──> dep: Phase 3
Phase 8 (Seed Data)          ──> dep: Phase 7 (QR URL format)
Phase 9 (Security)           ──> fără dep, parallelize cu 4+
Phase 10 (Cleanup)           ──> fără dep, oricând
```

---

## FASE 1: Package & Docker (bug #8, #9, #10)

**Risc: ZERO. Modificări mecanice.**

### 1.1 — `package.json`
- Elimina `"prisma": "^7.2.0"` din `dependencies`
- Menține `"prisma": "5.10.2"` în `devDependencies` — aliniat cu `@prisma/client: 5.10.2`
- Adaugă `"cloudinary": "^2.x"` în `dependencies` (needed for Phase 3.4)
- `npm install` se rulează **intern în container** la `docker build` via `npm ci` din Dockerfile

### 1.2 — `Dockerfile.prod`
- Elimina line 3: `ENV KEY_NAME=value`

### 1.3 — `docker-compose.prod.yml`
- Elimina `NEXTAUTH_SECRET=changeme_in_prod` din blocul `environment:`
- Menține `DATABASE_URL` și `NEXTAUTH_URL` (sunt valori container-network-relative)
- `env_file: .env` deja e configurat și va furniza secret-ul

---

## FASE 2: Shared Utilities Consolidation (bug #12, #13)

**Prerequisit pentru Phase 3+ (modals vor importa din aceleași surse)**

### 2.1 — `src/components/admin/CreateCategoryModal.tsx`
- Add: `import { slugify } from '@/lib/utils'`
- Delete: inline `generateSlug` function
- Replace: `generateSlug(value)` → `slugify(value)`

### 2.2 — `src/components/admin/EditCategoryModal.tsx`
- Same 3 changes as 2.1

### 2.3 — `src/components/admin/CreateProductModal.tsx`
- Add: `import { ALLERGENS } from '@/lib/constants'`
- Delete: hardcoded `allergenOptions` array (8 items)
- Replace: all refs to `allergenOptions` → `ALLERGENS` (now 12 items)

### 2.4 — `src/components/admin/EditProductModal.tsx`
- Same changes as 2.3

---

## FASE 3: Missing API Endpoints

### 3.1 — Create validation schemas

**`src/lib/validations/category.ts`** (new file)
```typescript
import { z } from 'zod'

export const categorySchema = z.object({
  name: z.string().min(1, 'Name is required'),
  nameEn: z.string().optional(),
  slug: z.string().min(1, 'Slug is required'),
  description: z.string().optional(),
  descriptionEn: z.string().optional(),
  image: z.string().optional().or(z.literal('')),
  isActive: z.boolean().default(true),
})

export type CategoryInput = z.infer<typeof categorySchema>
```

**`src/lib/validations/subcategory.ts`** (new file)
```typescript
import { z } from 'zod'

export const subcategorySchema = z.object({
  name: z.string().min(1, 'Name is required'),
  nameEn: z.string().optional(),
  categoryId: z.string().min(1, 'Category is required'),
  slug: z.string().optional(),
  description: z.string().optional(),
  image: z.string().optional().or(z.literal('')),
  isActive: z.boolean().default(true),
})

export type SubcategoryInput = z.infer<typeof subcategorySchema>
```

**`src/lib/validations/qrCode.ts`** (new file)
```typescript
import { z } from 'zod'

export const qrCodeSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  location: z.string().min(1, 'Location is required'),
  url: z.string().optional(),
  isActive: z.boolean().default(true),
})

export type QRCodeInput = z.infer<typeof qrCodeSchema>
```

### 3.2 — `src/app/api/subcategories/route.ts` (new file)

Pattern: identic cu `src/app/api/categories/route.ts`

- **GET**: `prisma.subcategory.findMany()` — accept optional `?categoryId=` query param. Include `category` relation. OrderBy `order asc`.
- **POST**: Auth guard → `subcategorySchema.parse(body)` → venue lookup via `findFirst()` → slug generation (dacă nu furnizat, `slugify(name)`) → uniqueness check `prisma.subcategory.findUnique({ where: { categoryId_slug } })` → verify categoryId exists → create cu `nameRo: name` default → return 201.

### 3.3 — `src/app/api/subcategories/[id]/route.ts` (new file)

- **GET**: findUnique by id, include `category` + `products`. 404 dacă nu.
- **PUT**: Auth guard → find existing → if slug changed, check uniqueness → update cu fallback pattern (identic cu categories PUT).
- **DELETE**: Auth guard → check `_count: { select: { products: true } }` → dacă has products: return 400 `{ error: 'Cannot delete subcategory with products', productCount }` → altfel delete.

### 3.4 — `src/app/api/upload/route.ts` (new file)

- **POST**: Auth guard → parse FormData → validate `file.type` vs `ALLOWED_IMAGE_TYPES` din constants → validate `file.size` vs `MAX_IMAGE_SIZE` (5MB) → upload via cloudinary SDK: `cloudinary.uploader.upload(dataUrl, { folder: 'qr-menu', quality: 85 })` → return `{ url: result.secure_url, publicId: result.public_id }`.

### 3.5 — `src/app/api/dashboard/stats/route.ts` (new file)

- **GET**: No auth guard (admin layout already enforces session).
- `Promise.all` queries:
  - `prisma.category.count()`
  - `prisma.product.count()`
  - `prisma.product.count({ where: { isAvailable: true } })`
  - `prisma.product.count({ where: { isFeatured: true } })`
  - `prisma.qRCode.count()`
  - `prisma.qRCode.aggregate({ _sum: { scans: true } })`
- Return JSON matching `DashboardStats` interface din `src/types/index.ts`.

### 3.6 — `src/app/api/settings/venue/route.ts` (new file)

- **GET**: `prisma.venue.findFirst()` → return venue.
- **PUT**: Auth guard → update venue fields (name, address, phone, email, description, logo, theme) → return updated.

### 3.7 — `src/app/api/settings/profile/route.ts` (new file)

- **GET**: Use `session.user.id` → fetch admin excluding password → return.
- **PUT**: Auth guard. Dual operation:
  - Profile update: if `name`/`email` → update Admin.
  - Password change: if `currentPassword` + `newPassword` + `confirmPassword` → bcrypt.compare vs stored hash → if fail 400 → if `newPassword !== confirmPassword` 400 → hash new → update → return `{ success: true }`.

### 3.8 — Apply Zod to existing routes (consistency)

**`src/app/api/categories/route.ts`** — Replace bare `if (!name || !slug)` cu:
```typescript
import { categorySchema } from '@/lib/validations/category'
import { z } from 'zod'

let validatedData;
try {
  validatedData = categorySchema.parse(body);
} catch (error) {
  if (error instanceof z.ZodError) {
    return NextResponse.json(
      { error: 'Validation failed', details: error.issues },
      { status: 400 }
    )
  }
  throw error;
}
```

**`src/app/api/qr-codes/route.ts`** — Same pattern cu `qrCodeSchema`.

---

## FASE 4: Admin UI Fixes + Subcategory Management (bug #4, #6, #11)

### 4.1 — Fix `src/components/admin/AdminSidebar.tsx` (bug #4)

Problema: backdrop `<div className="lg:hidden fixed inset-0 bg-black/50 z-40">` e always rendered, fără toggle state.

Fix:
- Add `const [isMobileOpen, setIsMobileOpen] = useState(false)`
- Backdrop: `{isMobileOpen && <div className="lg:hidden ..." onClick={() => setIsMobileOpen(false)} />}`
- Sidebar wrapper: `className={cn('fixed inset-y-0 left-0 z-50 w-64 bg-white border-r', 'hidden lg:block', isMobileOpen && 'block')}`
- Add hamburger trigger (fixed, mobile-only): `<button className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow" onClick={() => setIsMobileOpen(true)}><Menu className="w-5 h-5" /></button>`

### 4.2 — Fix `src/app/admin/products/page.tsx` (bug #6)

- Add `const [categories, setCategories] = useState<Category[]>([])`
- Add fetch: `fetch('/api/categories').then(r => r.json()).then(setCategories)` în useEffect (alturi de products fetch)
- Add category `<select>` în filter bar, între search input și status filter:
```tsx
<select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}
  className="rounded-lg border border-border-light px-3 py-2 text-sm">
  <option value="">Toate categoriile</option>
  {categories.map((cat) => (
    <option key={cat.id} value={cat.id}>{cat.name}</option>
  ))}
</select>
```

### 4.3 — Localize toast messages (bug #11)

**Todas las 9 modal/dialog files:** Import `SUCCESS_MESSAGES` și `ERROR_MESSAGES` din `@/lib/constants`.

Pattern uniform:
- Create success → `toast.success(SUCCESS_MESSAGES.CREATED)`
- Update success → `toast.success(SUCCESS_MESSAGES.UPDATED)`
- Delete success → `toast.success(SUCCESS_MESSAGES.DELETED)`
- Any error → `toast.error(ERROR_MESSAGES.GENERIC)`

Fișiere de modificat:
- `CreateCategoryModal.tsx`
- `EditCategoryModal.tsx`
- `DeleteCategoryDialog.tsx`
- `CreateProductModal.tsx`
- `EditProductModal.tsx`
- `DeleteProductDialog.tsx`
- `CreateQRCodeModal.tsx`
- `EditQRCodeModal.tsx`
- `DeleteQRCodeDialog.tsx`

### 4.4 — Create subcategory admin page

**`src/app/admin/subcategories/page.tsx`** (new file)
- Pattern: identic cu `src/app/admin/categories/page.tsx`
- Fetch subcategories din `/api/subcategories`
- Fetch categories (pentru filter dropdown)
- Grid display: name, parent category, slug, product count, action buttons
- Wire: CreateSubcategoryModal, EditSubcategoryModal, DeleteSubcategoryDialog

**`src/components/admin/CreateSubcategoryModal.tsx`** (new file)
- Pattern: identic cu `CreateCategoryModal.tsx`
- Fields: name (RO), name (EN), categoryId (select, fetched from `/api/categories`), description, image, isActive
- Slug auto-generated via `slugify` import
- POST to `/api/subcategories`
- Romanian toasts via constants

**`src/components/admin/EditSubcategoryModal.tsx`** (new file)
- Pattern: identic cu `EditCategoryModal.tsx`
- Accepts `subcategory` prop, pre-fills via useEffect
- PUT to `/api/subcategories/[id]`

**`src/components/admin/DeleteSubcategoryDialog.tsx`** (new file)
- Pattern: identic cu `DeleteCategoryDialog.tsx`
- DELETE to `/api/subcategories/[id]`
- Error handling: "has products" message

### 4.5 — Update AdminSidebar nav

**`src/components/admin/AdminSidebar.tsx`** — Add to navigation array:
```typescript
{ name: 'Subcategorii', href: '/admin/subcategories', icon: ListTree }
```
Import `ListTree` from `lucide-react`.

---

## FASE 5: Public Menu Pages — Mock → Real Data (bug #1)

**CRITICAL: Cel mai mare impact customer-facing.**

Toate 3 pagini sunt server components async. Nu trebe client fetch — direct Prisma queries.

### 5.1 — `src/app/page.tsx` (Homepage)

- Delete: `mockCategories` array (hardcoded)
- Add: `import { prisma } from '@/lib/db'`
- Query:
```typescript
const categories = await prisma.category.findMany({
  where: { isActive: true },
  include: {
    subcategories: { where: { isActive: true } },
    products: { where: { isAvailable: true } },
  },
  orderBy: { order: 'asc' },
})
```
- Map to `MenuCategory[]`:
```typescript
const menuCategories = categories.map(cat => ({
  id: cat.id,
  name: cat.name,
  slug: cat.slug,
  image: cat.image || '/images/placeholder-category.jpg',
  description: cat.description || undefined,
  subcategoriesCount: cat.subcategories.length,
  productsCount: cat.products.length,
}))
```
- Replace `mockCategories.map(...)` → `menuCategories.map(...)`
- Delete "Sprint Progress Indicator" section (development scaffolding)

### 5.2 — `src/app/[categorySlug]/page.tsx`

- Delete: `mockCategories` object
- Add: `import { prisma } from '@/lib/db'`
- Query (în page component și în `generateMetadata`):
```typescript
const category = await prisma.category.findFirst({
  where: { slug: categorySlug, isActive: true },
  include: {
    subcategories: { where: { isActive: true }, orderBy: { order: 'asc' } },
    products: { where: { isAvailable: true }, orderBy: { order: 'asc' } },
  },
})
if (!category) notFound()
```
- Map subcategories → `MenuCategory[]` (reutilizând CategoryCard cu slug override: `${categorySlug}/${sub.slug}`)
- Map products → `MenuProduct[]` cu discount calculated
- JSX template rămâne identic — solo data source se schimbă

### 5.3 — `src/app/[categorySlug]/[subcategorySlug]/page.tsx`

- Delete: `mockData` object
- Add: `import { prisma } from '@/lib/db'`
- Query:
```typescript
const subcategory = await prisma.subcategory.findFirst({
  where: {
    slug: subcategorySlug,
    category: { slug: categorySlug, isActive: true },
    isActive: true,
  },
  include: {
    category: true,
    products: { orderBy: { order: 'asc' } },
  },
})
if (!subcategory) notFound()
```
- Replace `data.categoryName` → `subcategory.category.name`
- Replace `data.subcategoryName` → `subcategory.name`
- Map `subcategory.products` → `MenuProduct[]`

---

## FASE 6: Dashboard & Settings Live Data (bug #3, #5)

### 6.1 — `src/app/admin/dashboard/page.tsx` (bug #3)

- Add `'use client'` directive
- Add `useState` + `useEffect` → fetch din `/api/dashboard/stats`
- Replace static `stats` array cu dynamic state
- Map `DashboardStats` → card-uri existente:
  - `totalCategories` → "Categorii Total"
  - `totalProducts` → "Produse Total"
  - `totalScans` → "Vizualizări"
  - `featuredProducts` → "Produse Populare"
- Replace "change" text cu neutral "actualizat" (nu avem historical data încă)
- Add loading skeleton state

### 6.2 — `src/app/admin/settings/page.tsx` (bug #5)

- Add `'use client'`
- Convert in 4 independent sections cu proprietary state + handlers:

**Venue section:**
- `useEffect` → fetch `GET /api/settings/venue` → populate state
- Form cu `value` (nu `defaultValue`)
- Save → `PUT /api/settings/venue`

**Profile section:**
- `useEffect` → fetch `GET /api/settings/profile`
- Save → `PUT /api/settings/profile` cu `{ name, email }`

**Password section:**
- No fetch needed
- Client-side pre-check: `newPassword !== confirmPassword` → show error
- Save → `PUT /api/settings/profile` cu `{ currentPassword, newPassword, confirmPassword }`

**Appearance section:**
- Theme colors din `venue.theme` JSON (fetched alongside venue)
- Save → `PUT /api/settings/venue` cu `{ theme: { primaryColor, secondaryColor }, logo }`

Todas sections: Romanian toasts via constants.

---

## FASE 7: QR Scan Tracking + CategoryCard Fix (bug #14)

### 7.1 — Fix QR URL generation

**`src/app/api/qr-codes/route.ts`** — POST handler:

Problema actuală: URL generat ca `?qr=${location-slug}` dar scan endpoint nevoie de `id`.

Fix: Create QR code first cu URL temporar, then update cu real URL containing `id`:
```typescript
const qrCode = await prisma.qRCode.create({ data: { ...dataCurenta, url: '' } })
const qrUrl = url || `${baseUrl}?qr=${qrCode.id}`
await prisma.qRCode.update({ where: { id: qrCode.id }, data: { url: qrUrl } })
```

### 7.2 — Create QR scan tracker component

**`src/components/menu/QRScanTracker.tsx`** (new file)
```typescript
'use client'
import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

export function QRScanTracker() {
  const searchParams = useSearchParams()
  const qrId = searchParams.get('qr')

  useEffect(() => {
    if (!qrId) return
    fetch(`/api/qr-codes/${qrId}/scan`, { method: 'POST' }).catch(console.error)
  }, [qrId])

  return null
}
```

### 7.3 — Mount tracker în root layout

**`src/app/layout.tsx`** — Import și add `<QRScanTracker />` în body (client component în server layout = OK in Next.js). Needs to be wrapped in `<Suspense>` because `useSearchParams` requires it:
```tsx
import { Suspense } from 'react'
import { QRScanTracker } from '@/components/menu/QRScanTracker'

// în JSX:
<Suspense fallback={null}>
  <QRScanTracker />
</Suspense>
```

### 7.4 — Fix CategoryCard image fallback (bug #14)

**`src/components/menu/CategoryCard.tsx`** line 26:
```tsx
// Before:
src={category.image}
// After:
src={category.image || '/images/placeholder-category.jpg'}
```

---

## FASE 8: Expanded Seed Data (bug #18)

### 8.1 — `prisma/seed.ts`

Adaugă subcategories și products pentru MANCARE și DESERT.

**MANCARE subcategories:**
- "Aperitive" (slug: `aperitive`, order: 1)
- "Fel Principal" (slug: `fel-principal`, order: 2)
- "Salate" (slug: `salate`, order: 3)

**MANCARE products (3-4 per subcategory):**
- Aperitive: Bruschetta (allergens: gluten), Supă de Ceapă, Carpaccio
- Fel Principal: Steak de Vită (allergens: []), Somon Grill (fish), Risotto (lactose)
- Salate: Salată Cesar (lactose, eggs), Salată Greçă, Salată Spinach

**DESERT subcategories:**
- "Prăjituri" (slug: `prajituri`, order: 1)
- "Înghețată" (slug: `inghetata`, order: 2)

**DESERT products:**
- Prăjituri: Cheesecake (lactose, eggs, gluten), Tiramisu (lactose, eggs), Tort Ciocolată (lactose, eggs, gluten)
- Înghețată: Gelato Vanilie (lactose, eggs), Gelato Fructe, Parfait (lactose, eggs)

**QR codes additional:**
- Create "Table 2", "Bar Counter", "Terrace" — each update URL cu `?qr=${id}` pattern
- Fix existing "Table 1" URL to use same pattern

**Idempotency:** Wrap category creation in `upsert` (already done pentru Venue/Admin). Products: check count first, create only if zero.

---

## FASE 9: Security Hardening

### 9.1 — Rate limiting — `src/middleware.ts`

Adaugă in-memory rate limiter BEFORE `withAuth` block:

```typescript
const rateLimitMap = new Map<string, { count: number; windowStart: number }>()
const WINDOW_MS = 60 * 1000 // 60 seconds
const PUBLIC_LIMIT = 100 // din constants

function checkRateLimit(ip: string, limit: number): boolean {
  const now = Date.now()
  const record = rateLimitMap.get(ip)
  if (!record || now - record.windowStart > WINDOW_MS) {
    rateLimitMap.set(ip, { count: 1, windowStart: now })
    return true
  }
  record.count++
  if (record.count > limit) return false
  return true
}
```

- Extract IP din `req.headers.get('x-forwarded-for')?.split(',')[0] || req.ip`
- Dacă not admin route: check rate limit cu PUBLIC_LIMIT (100). If exceeded: return 429 cu `Retry-After: 60`.
- Note: in-memory = suficient pentru single-container deployment (docker-compose.prod.yml).

### 9.2 — Security headers — `next.config.ts`

Add `headers()` function:
```typescript
async headers() {
  return [
    {
      source: '/(.*)',
      headers: [
        { key: 'X-DNS-Prefetch-Control', value: 'on' },
        { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains' },
      ],
    },
  ]
},
```

### 9.3 — NEXTAUTH_SECRET enforcement — `src/lib/auth.ts`

Add at top (before export):
```typescript
if (!process.env.NEXTAUTH_SECRET) {
  throw new Error('NEXTAUTH_SECRET environment variable is required')
}
```
Fail-fast la startup dacă secret lipsește.

---

## FASE 10: Cleanup Dead Code (bug #7, #15, #16)

### 10.1 — Delete `src/components/providers/SessionProvider.tsx`
- Imported nowhere. Admin layout uses server-side `getServerSession`. Șters.

### 10.2 — Remove MobileBreadcrumb din barrel export
- `src/components/menu/index.ts` — remove `MobileBreadcrumb` din export line
- Keep implementation în `Breadcrumb.tsx` (risc zero, disponibil dacă nevoie)

### 10.3 — Hide language switcher via feature flag
- `src/lib/constants.ts` — change `MULTI_LANGUAGE: true` → `MULTI_LANGUAGE: false`
- `src/components/menu/Header.tsx` — wrap language switcher sections (desktop + mobile) în:
  ```tsx
  {FEATURES.MULTI_LANGUAGE && ( /* language switcher JSX */ )}
  ```
- Import `FEATURES` din constants
- Result: switcher disappears cleanly. Reactivare: set flag back to `true`.

---

## CRITICAL FILES SUMMARY

| File | Action | Phase |
|------|--------|-------|
| `package.json` | Fix prisma conflict, add cloudinary | 1.1 |
| `Dockerfile.prod` | Remove stray ENV | 1.2 |
| `docker-compose.prod.yml` | Remove hardcoded secret | 1.3 |
| `src/app/api/subcategories/route.ts` | CREATE — the missing endpoint | 3.2 |
| `src/app/api/subcategories/[id]/route.ts` | CREATE | 3.3 |
| `src/app/api/dashboard/stats/route.ts` | CREATE | 3.5 |
| `src/app/api/upload/route.ts` | CREATE | 3.4 |
| `src/app/api/settings/venue/route.ts` | CREATE | 3.6 |
| `src/app/api/settings/profile/route.ts` | CREATE | 3.7 |
| `src/lib/validations/category.ts` | CREATE | 3.1 |
| `src/lib/validations/subcategory.ts` | CREATE | 3.1 |
| `src/lib/validations/qrCode.ts` | CREATE | 3.1 |
| `src/app/page.tsx` | Mock → Prisma | 5.1 |
| `src/app/[categorySlug]/page.tsx` | Mock → Prisma | 5.2 |
| `src/app/[categorySlug]/[subcategorySlug]/page.tsx` | Mock → Prisma | 5.3 |
| `src/app/admin/dashboard/page.tsx` | Static → Live fetch | 6.1 |
| `src/app/admin/settings/page.tsx` | Mockup → Functional | 6.2 |
| `src/components/admin/AdminSidebar.tsx` | Fix mobile + add Subcategorii nav | 4.1, 4.5 |
| `src/app/admin/products/page.tsx` | Add category filter | 4.2 |
| `src/components/admin/CreateCategoryModal.tsx` | Import slugify + toast constants | 2.1, 4.3 |
| `src/components/admin/EditCategoryModal.tsx` | Import slugify + toast constants | 2.2, 4.3 |
| `src/components/admin/CreateProductModal.tsx` | Import ALLERGENS + toast constants | 2.3, 4.3 |
| `src/components/admin/EditProductModal.tsx` | Import ALLERGENS + toast constants | 2.4, 4.3 |
| `src/components/admin/DeleteCategoryDialog.tsx` | Toast constants | 4.3 |
| `src/components/admin/DeleteProductDialog.tsx` | Toast constants | 4.3 |
| `src/components/admin/DeleteQRCodeDialog.tsx` | Toast constants | 4.3 |
| `src/components/admin/CreateQRCodeModal.tsx` | Toast constants | 4.3 |
| `src/components/admin/EditQRCodeModal.tsx` | Toast constants | 4.3 |
| `src/app/admin/subcategories/page.tsx` | CREATE | 4.4 |
| `src/components/admin/CreateSubcategoryModal.tsx` | CREATE | 4.4 |
| `src/components/admin/EditSubcategoryModal.tsx` | CREATE | 4.4 |
| `src/components/admin/DeleteSubcategoryDialog.tsx` | CREATE | 4.4 |
| `src/components/menu/CategoryCard.tsx` | Image fallback | 7.4 |
| `src/components/menu/QRScanTracker.tsx` | CREATE | 7.2 |
| `src/app/layout.tsx` | Mount QRScanTracker | 7.3 |
| `src/app/api/qr-codes/route.ts` | Fix URL generation + Zod | 7.1, 3.8 |
| `src/app/api/categories/route.ts` | Zod validation | 3.8 |
| `src/middleware.ts` | Rate limiting | 9.1 |
| `next.config.ts` | Security headers | 9.2 |
| `src/lib/auth.ts` | Secret enforcement | 9.3 |
| `src/lib/constants.ts` | MULTI_LANGUAGE → false | 10.3 |
| `src/components/menu/Header.tsx` | Feature flag guard | 10.3 |
| `prisma/seed.ts` | Expand MANCARE + DESERT | 8.1 |
| `src/components/providers/SessionProvider.tsx` | DELETE | 10.1 |
| `src/components/menu/index.ts` | Remove dead export | 10.2 |

---

## VERIFICATION — Totul rulează în Docker

Aplicația rulează exclusiv în containere. `npm install` se execută **inside** container-ul la `docker build` (via `npm ci` în Dockerfile). Nu se rulează nicio comandă npm local.

### Step 1 — Build + Start containers
```bash
# Build image (include npm ci + prisma generate intern)
docker-compose build

# Start frontend (port 3009) + PostgreSQL
docker-compose up -d

# Verify both containers running
docker ps
```

### Step 2 — Migrations + Seed (inside container)
```bash
# Run Prisma migrations
docker exec qr-menu-app npx prisma migrate dev --name "production-ready"

# Seed database cu data reală
docker exec qr-menu-app tsx prisma/seed.ts
```

### Step 3 — Lint + Type check (inside container)
```bash
docker exec qr-menu-app npm run lint
docker exec qr-menu-app npm run type-check
```
Expected: zero errors, zero warnings.

### Step 4 — Manual verification via browser + curl
```bash
# 1. Homepage — categorii reale
curl -s http://localhost:3009 | grep -i "BAR\|MANCARE\|DESERT"

# 2. API responds with real data
curl -s http://localhost:3009/api/categories | python3 -m json.tool | head -30

# 3. Subcategories endpoint exists
curl -s http://localhost:3009/api/subcategories | python3 -m json.tool | head -20

# 4. Dashboard stats (auth required — test via browser)
# → Naviga la http://localhost:3009/admin/login
# → Login: admin@infinitylounge.ro / admin123
# → Dashboard numbers = reale (matching DB)

# 5. Rate limiting verification
# Fire 105 requests rapid — ultimele vor returna 429:
for i in $(seq 1 105); do
  code=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3009/api/categories)
  echo "Request $i: $code"
done
# Expected: primele 100 = 200, după aceea = 429
```

### Step 5 — Full manual checklist (browser)
```
□ Homepage → categorii BAR, MANCARE, DESERT cu imagini + produse
□ Click "BAR" → subcategories (Băuturi Răcoritoare, Băuturi Calde, Cocktailuri) + produse
□ Click subcategory → produse filtrate
□ Click product → modal cu preț, descriere, allergens
□ Admin login → redirect la dashboard
□ Dashboard → numere reale (non-zero)
□ Categories → CRUD funcțional, toast în RO
□ Subcategories → pagina OK, create/edit/delete
□ Products → category filter dropdown funcțional, subcategory dropdown populated
□ QR Codes → create, preview live, URL conține ID
□ Settings → Salveaza venue info → succes toast
□ Settings → Change password → funcțional
□ Mobile (DevTools → responsive): admin sidebar cu hamburger, no black overlay
□ QR scan: deschide URL cu ?qr=ID → scan counter incrementat în admin QR codes
```

### Step 6 — Production build verification
```bash
# Build production image
docker-compose -f docker-compose.prod.yml build

# Start production
docker-compose -f docker-compose.prod.yml up -d

# Verify production container runs
docker ps

# Smoke test
curl -s http://localhost:3009 | head -50
```
