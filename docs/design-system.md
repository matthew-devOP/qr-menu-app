# Design System - QR Smart Menu App

## 1. Principii de Design

### 1.1 Mobile-First
Toate componentele sunt proiectate mai întâi pentru mobile, apoi adaptate pentru desktop.

### 1.2 Accesibilitate
- WCAG 2.1 Level AA compliance
- Keyboard navigation
- Screen reader support
- Color contrast minimum 4.5:1

### 1.3 Performance
- Lazy loading pentru imagini
- Progressive image loading
- Optimizare pentru 3G networks

## 2. Design Tokens

### 2.1 Colors

```typescript
// tailwind.config.ts
const colors = {
  brand: {
    primary: '#1a1a1a',      // Dark black
    secondary: '#fbbf24',    // Gold accent
    dark: '#0a0a0a',         // Deeper black
    light: '#f5f5f5',        // Light gray
  },
  text: {
    primary: '#1a1a1a',      // Main text
    secondary: '#6b7280',    // Secondary text
    muted: '#9ca3af',        // Muted text
    inverse: '#ffffff',      // White text
  },
  background: {
    primary: '#ffffff',      // White background
    secondary: '#f5f5f5',    // Light gray
    tertiary: '#e5e7eb',     // Medium gray
    dark: '#1a1a1a',         // Dark background
  },
  border: {
    light: '#e5e7eb',
    medium: '#d1d5db',
    dark: '#9ca3af',
  },
  state: {
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
  }
}
```

### 2.2 Typography

```typescript
const typography = {
  fontFamily: {
    sans: ['Inter', 'system-ui', 'sans-serif'],
    display: ['Playfair Display', 'serif'],
    mono: ['JetBrains Mono', 'monospace'],
  },
  fontSize: {
    xs: '0.75rem',      // 12px
    sm: '0.875rem',     // 14px
    base: '1rem',       // 16px
    lg: '1.125rem',     // 18px
    xl: '1.25rem',      // 20px
    '2xl': '1.5rem',    // 24px
    '3xl': '1.875rem',  // 30px
    '4xl': '2.25rem',   // 36px
    '5xl': '3rem',      // 48px
  },
  fontWeight: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  lineHeight: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75,
  }
}
```

### 2.3 Spacing

```typescript
const spacing = {
  0: '0px',
  1: '0.25rem',   // 4px
  2: '0.5rem',    // 8px
  3: '0.75rem',   // 12px
  4: '1rem',      // 16px
  5: '1.25rem',   // 20px
  6: '1.5rem',    // 24px
  8: '2rem',      // 32px
  10: '2.5rem',   // 40px
  12: '3rem',     // 48px
  16: '4rem',     // 64px
  20: '5rem',     // 80px
}
```

### 2.4 Border Radius

```typescript
const borderRadius = {
  none: '0',
  sm: '0.125rem',   // 2px
  DEFAULT: '0.25rem', // 4px
  md: '0.375rem',   // 6px
  lg: '0.5rem',     // 8px
  xl: '0.75rem',    // 12px
  '2xl': '1rem',    // 16px
  full: '9999px',
}
```

### 2.5 Shadows

```typescript
const boxShadow = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
}
```

## 3. Component Library

### 3.1 CategoryCard

**Componenta pentru afișarea categoriilor principale**

#### Props
```typescript
interface CategoryCardProps {
  id: string
  name: string
  image: string
  slug: string
  description?: string
  className?: string
}
```

#### Design Specs
- **Aspect Ratio:** 16:9 (landscape) sau 4:3 (standard)
- **Image:** Cover mode cu overlay gradient
- **Text:** Bottom-left positioning, white color
- **Hover State:** Scale(1.05) + brightness increase
- **Transition:** 0.3s ease-in-out

#### Visual Example
```
┌─────────────────────────────────────┐
│                                     │
│         [Category Image]            │
│                                     │
│     ┌─────────────────────┐         │
│     │ Gradient Overlay    │         │
│     │                     │         │
│     │  BAR               │         │
│     │  Băuturi & Cocktail │         │
│     └─────────────────────┘         │
└─────────────────────────────────────┘
```

#### Code Example
```tsx
<CategoryCard
  id="bar"
  name="BAR"
  slug="bar"
  image="/images/categories/bar.jpg"
  description="Băuturi & Cocktailuri"
/>
```

### 3.2 ProductCard

**Componenta pentru afișarea produselor**

#### Props
```typescript
interface ProductCardProps {
  product: {
    id: string
    name: string
    nameRo: string
    image: string
    price: number
    oldPrice?: number
    quantity?: string
    description?: string
    allergens?: string[]
    isAvailable: boolean
  }
  onClick?: () => void
  className?: string
}
```

#### Design Specs
- **Aspect Ratio:** 1:1 (square) sau 3:4 (portrait)
- **Price Badge:** Top-right corner, gold background
- **Discount:** Show percentage if oldPrice exists
- **Unavailable:** Grayscale filter + overlay
- **Border:** 1px light gray, rounded corners

#### Visual Example
```
┌──────────────────────────────┐
│ [Product Image]      ┌────┐ │
│                      │18  │ │
│                      │lei │ │
│                      └────┘ │
├──────────────────────────────┤
│ PEPSI REGULAR                │
│ Cantitate: 250ML             │
│                              │
│ [Allergen Icons]             │
└──────────────────────────────┘
```

#### States
- **Default:** Normal appearance
- **Hover:** Slight shadow increase
- **Unavailable:** Grayscale + "Indisponibil" overlay
- **Featured:** Gold border

### 3.3 Breadcrumb

**Componenta pentru navigare ierarhică**

#### Props
```typescript
interface BreadcrumbProps {
  items: Array<{
    label: string
    href: string
  }>
  separator?: string
  className?: string
}
```

#### Design Specs
- **Separator:** ">" sau "/"
- **Active Item:** Bold weight
- **Links:** Hover underline
- **Mobile:** Collapse middle items if > 3

#### Visual Example
```
Desktop: ACASA > BAR > BAUTURI RACORITOARE
Mobile:  ACASA > ... > BAUTURI RACORITOARE
```

### 3.4 Header

**Componenta pentru header-ul aplicației**

#### Props
```typescript
interface HeaderProps {
  venueName: string
  logo?: string
  showBack?: boolean
  transparent?: boolean
  onLanguageChange?: (lang: string) => void
}
```

#### Design Specs
- **Height:** 64px (mobile), 80px (desktop)
- **Position:** Sticky top
- **Background:** White with blur (glassmorphism)
- **Shadow:** Subtle shadow on scroll
- **Logo:** Left side, max height 40px

#### Features
- Sticky positioning
- Language switcher (RO/EN)
- Optional back button
- Glassmorphism effect on scroll

### 3.5 ProductModal

**Modal pentru detalii produse**

#### Props
```typescript
interface ProductModalProps {
  product: Product
  isOpen: boolean
  onClose: () => void
}
```

#### Design Specs
- **Mobile:** Full-screen modal
- **Desktop:** Centered modal (max-width 800px)
- **Image:** Carousel pentru multiple images
- **Sections:** Image, Description, Ingredients, Allergens, Nutrition

#### Visual Example (Mobile)
```
┌─────────────────────────────┐
│ [X]                         │
├─────────────────────────────┤
│                             │
│   [Product Image Gallery]   │
│                             │
├─────────────────────────────┤
│ PEPSI REGULAR        18 lei │
│ Cantitate: 250ML            │
│                             │
│ Descriere                   │
│ Lorem ipsum dolor sit...    │
│                             │
│ Ingrediente                 │
│ Apă, zahăr, CO2...          │
│                             │
│ Alergeni                    │
│ [Icon] [Icon] [Icon]        │
│                             │
│ Informații nutriționale     │
│ Calorii: 100 kcal           │
│ Proteine: 0g                │
│ Carbohidrați: 25g           │
└─────────────────────────────┘
```

## 4. Layout Patterns

### 4.1 Grid Layouts

#### Category Grid
```css
/* Mobile: 1 column */
@media (max-width: 640px) {
  .category-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}

/* Tablet: 2 columns */
@media (min-width: 641px) and (max-width: 1024px) {
  .category-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
}

/* Desktop: 3 columns */
@media (min-width: 1025px) {
  .category-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
  }
}
```

#### Product Grid
```css
/* Mobile: 2 columns */
@media (max-width: 640px) {
  .product-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
  }
}

/* Tablet: 3 columns */
@media (min-width: 641px) and (max-width: 1024px) {
  .product-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
  }
}

/* Desktop: 4 columns */
@media (min-width: 1025px) {
  .product-grid {
    grid-template-columns: repeat(4, 1fr);
    gap: 1.5rem;
  }
}
```

### 4.2 Container Sizes
```css
.container {
  width: 100%;
  margin: 0 auto;
  padding: 0 1rem;
}

@media (min-width: 640px) {
  .container { max-width: 640px; }
}

@media (min-width: 768px) {
  .container { max-width: 768px; }
}

@media (min-width: 1024px) {
  .container { max-width: 1024px; }
}

@media (min-width: 1280px) {
  .container { max-width: 1280px; }
}
```

## 5. Animation Guidelines

### 5.1 Transitions
```css
/* Standard transition */
transition: all 0.3s ease-in-out;

/* Fast transition (hover, focus) */
transition: all 0.15s ease-in-out;

/* Slow transition (page transitions) */
transition: all 0.5s ease-in-out;
```

### 5.2 Keyframe Animations
```css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
```

## 6. Responsive Breakpoints

```typescript
const breakpoints = {
  sm: '640px',   // Small devices (phones)
  md: '768px',   // Medium devices (tablets)
  lg: '1024px',  // Large devices (laptops)
  xl: '1280px',  // Extra large devices (desktops)
  '2xl': '1536px' // 2X large devices (large desktops)
}
```

## 7. Icon System

### 7.1 Icon Library
Folosim **Lucide React** pentru iconițe.

### 7.2 Common Icons
```tsx
import {
  Home,           // Homepage
  ChevronRight,   // Breadcrumb separator
  ShoppingCart,   // Cart/Order
  Search,         // Search
  Menu,           // Mobile menu
  X,              // Close
  Plus,           // Add
  Edit,           // Edit
  Trash,          // Delete
  Eye,            // View
  Upload,         // Upload image
} from 'lucide-react'
```

### 7.3 Allergen Icons
- Gluten
- Lactose
- Nuts
- Soy
- Eggs
- Fish
- Shellfish

## 8. Image Guidelines

### 8.1 Image Sizes

#### Category Images
- **Recommended:** 1200x675px (16:9)
- **Format:** WebP with JPEG fallback
- **Quality:** 85%
- **Max file size:** 500KB

#### Product Images
- **Recommended:** 800x800px (1:1)
- **Format:** WebP with JPEG fallback
- **Quality:** 85%
- **Max file size:** 300KB

### 8.2 Image Optimization
```tsx
import Image from 'next/image'

<Image
  src="/images/products/pepsi.jpg"
  alt="Pepsi Regular"
  width={800}
  height={800}
  quality={85}
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>
```

## 9. Accessibility

### 9.1 Color Contrast
- **Normal text (< 18px):** Minimum 4.5:1
- **Large text (≥ 18px):** Minimum 3:1
- **UI components:** Minimum 3:1

### 9.2 Focus States
```css
.interactive-element:focus {
  outline: 2px solid #fbbf24;
  outline-offset: 2px;
}
```

### 9.3 Screen Reader Support
```tsx
<button aria-label="Adaugă în coș">
  <ShoppingCart />
</button>

<img src="..." alt="Pepsi Regular 250ML" />

<nav aria-label="Breadcrumb">
  {/* Breadcrumb items */}
</nav>
```

---

**Versiune:** 1.0
**Ultima actualizare:** Ianuarie 2026
