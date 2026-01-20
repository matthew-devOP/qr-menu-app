# Core Features Documentation - QR Menu App

## Table of Contents

1.  [Public Menu Interface](#public-menu-interface)
2.  [Dashboard & Analytics](#dashboard--analytics)
3.  [Menu Management System](#menu-management-system)
4.  [QR Code Management](#qr-code-management)
5.  [Authentication & Security](#authentication--security)
6.  [Theme & Configuration](#theme--configuration)

## Public Menu Interface

### Description

The primary customer-facing interface allowing diners to browse the menu, view product details, and filter by category without any app installation.

### User Workflow

1.  **Entry**: User scans a physical QR code at the table.
2.  **Landing**: Redirected to the Venue's branded landing page (e.g., `infinity-lounge`).
3.  **Language Selection**: User toggles between RO/EN.
4.  **Navigation**: User selects a Category (e.g., "Food") -> Subcategory (e.g., "Starters").
5.  **Product View**: User taps a product card to see full details (Ingredients, Allergens).

### Technical Implementation

-   **Path**: `src/app/[categorySlug]/page.tsx`
-   **Rendering**: Server-Side Rendered (SSR) for optimal SEO and standardized performance.
-   **Components**:
    -   `CategoryCard`: Visual entry point with background images.
    -   `ProductGrid`: Responsive layout for items.

```typescript
// Example: Category structure used in view
interface MenuCategory {
  id: string;
  name: string;
  slug: string;
  image: string;
  subcategoriesCount: number;
}
```

### Business Rules

-   **Availability**: Only products marked `isAvailable: true` are shown.
-   **Localization**: Content falls back to default language if translation is missing.
-   **Visuals**: Categories must have an image to be displayed prominently.

## Dashboard & Analytics

### Description

The command center for venue administrators to monitor activity and manage the system.

### User Workflow

1.  **Login**: Admin logs in via `/admin/login`.
2.  **Overview**: specific metrics on the Dashboard:
    -   Total Active Products
    -   Total Categories
    -   QR Code Scans (Total & Recent)
3.  **Quick Actions**: Shortcuts to add products or generate codes.

### Technical Implementation

-   **Path**: `src/app/admin/dashboard/page.tsx`
-   **Data Fetching**: Parallel data fetching for metrics to ensure fast load times.
-   **Stats Cards**: Reusable UI components displaying numeric key performance indicators (KPIs).

```typescript
// Dashboard metrics aggregation pattern
const [productsCount, categoriesCount, scanStats] = await Promise.all([
  prisma.product.count({ where: { isAvailable: true } }),
  prisma.category.count(),
  prisma.qRCode.aggregate({ _sum: { scans: true } })
]);
```

## Menu Management System

### Description

A CRUD (Create, Read, Update, Delete) engine for the core menu data structure: Categories, Subcategories, and Products.

### User Workflow

1.  **Category Creation**: Admin defines "Drinks", uploads a cover image, and sets display order.
2.  **Subcategory Organization**: Nested grouping (e.g., Drinks -> "Cocktails", "Wines").
3.  **Product Entry**:
    -   Input Name (RO/EN) and Description.
    -   Set Price and Old Price (for discounts).
    -   **Compliance**: Select Allergens from a predefined list.
    -   **Nutrition**: Input Kcal, Fats, Proteins.
    -   Toggle "Featured" or "Available".

### Technical Implementation

-   **Paths**:
    -   `src/app/admin/categories/*`
    -   `src/app/admin/products/*`
-   **Forms**: React Hook Form (implied pattern) or controlled inputs with Zod validation.
-   **Image Upload**: Handling of image URLs (external storage or local).

**Key Product Interface**:
```typescript
interface ProductForm {
  nameRo: string;
  nameEn?: string;
  price: number;
  allergens: string[]; // e.g., ["Gluten", "Dairy"]
  nutritionInfo: {
    calories: number;
    weight: string; // e.g., "250g"
  };
}
```

### Business Rules

-   **Validation**: Price must be positive. Name is required.
-   **Referential Integrity**: Cannot delete a Category that contains active Products (Cascade rules apply, typically warning user).
-   **Uniqueness**: Slugs must be unique within the venue scope.

## QR Code Management

### Description

A tool to generate, customize, and track physical QR codes for the venue.

### User Workflow

1.  **Generation**: Admin clicks "New QR Code".
2.  **Configuration**:
    -   Target URL (specific category or home).
    -   Label (e.g., "Table 15").
3.  **Management**: View list of active codes and their scan counts.
4.  **Export**: Download the generated QR image for printing.

### Technical Implementation

-   **Path**: `src/app/admin/qr-codes/page.tsx`
-   **Library**: `qrcode` (Node.js/Browser library).
-   **API**: `/api/qr-codes/generate` endpoint streams the image.

```typescript
// QR Model snippet
model QRCode {
  id: string;
  name: string; // "Table 1"
  url: string;
  scans: Int;   // Track engagement
  venueId: string;
}
```

### Business Rules

-   **Tracking**: Every scan increments the `scans` counter for analytics.
-   **Persistence**: Generated codes remain valid indefinitely until set to `isActive: false`.

## Authentication & Security

### Description

Secure access control ensuring only authorized personnel can modify menu data.

### User Workflow

1.  **Access**: Attempting to access `/admin/*` redirects to Login.
2.  **Credentials**: Email/Password authentication.
3.  **Session**: Persistent session via secure HTTP-only cookies.

### Technical Implementation

-   **Framework**: **NextAuth.js**
-   **Provider**: Credentials Provider.
-   **Hashing**: `bcryptjs` for password security.
-   **Middleware**: Next.js Middleware protects all `/admin` routes.

```typescript
// Auth configuration pattern
providers: [
  CredentialsProvider({
    authorize: async (credentials) => {
      const user = await prisma.admin.findUnique({
        where: { email: credentials.email }
      });
      // Verification logic...
      return user;
    }
  })
]
```

## Theme & Configuration

### Description

System-wide settings to control the look and feel and global behavior of the application.

### features

-   **Bilingual Content**: Database schema supports `nameRo` and `nameEn`.
-   **Theme Engine**: `Venue.theme` JSON field allows customization of:
    -   Primary/Secondary Colors (Brand Colors).
    -   Fonts (Display vs. Body).
-   **Dark Mode**: Native support via Tailwind CSS `dark:` modifiers.

## Additional Features

### Digital Order/Sort
-   **Feature**: Drag-and-drop reordering of categories (implied by `order` field in schema).
-   **Business Value**: Allows venues to prioritize high-margin categories (e.g., "Specials" at the top).

### Search & Filtering
-   **Feature**: Filter products by allergens or category.
-   **Business Value**: Helps customers with dietary restrictions find safe options quickly.

### Toast Notifications
-   **Feature**: Usage of `sonner` for non-blocking feedback (e.g., "Product Saved Successfully").
-   **Business Value**: Enhances user confidence and system perceived speed.
