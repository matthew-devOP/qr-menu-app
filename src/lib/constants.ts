/**
 * Application Constants
 * Centralized configuration values used throughout the app
 */

/**
 * Application Metadata
 */
export const APP_NAME = 'INFINITY LOUNGE'
export const APP_DESCRIPTION = 'Meniu digital interactiv pentru restaurante și lounge-uri'
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

/**
 * Pagination Defaults
 */
export const DEFAULT_PAGE_SIZE = 20
export const MAX_PAGE_SIZE = 100
export const CATEGORIES_PER_PAGE = 12
export const PRODUCTS_PER_PAGE = 20

/**
 * Image Configuration
 */
export const IMAGE_QUALITY = 85
export const IMAGE_SIZES = {
  CATEGORY: { width: 1200, height: 675 }, // 16:9 aspect ratio
  SUBCATEGORY: { width: 800, height: 600 }, // 4:3 aspect ratio
  PRODUCT: { width: 800, height: 800 }, // 1:1 aspect ratio
  THUMBNAIL: { width: 300, height: 300 },
  QR_CODE: { width: 512, height: 512 },
}

export const MAX_IMAGE_SIZE = 5 * 1024 * 1024 // 5MB
export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp']

/**
 * Allergens List
 */
export const ALLERGENS = [
  'gluten',
  'lactose',
  'nuts',
  'peanuts',
  'soy',
  'eggs',
  'fish',
  'shellfish',
  'celery',
  'mustard',
  'sesame',
  'sulfites',
] as const

export type Allergen = typeof ALLERGENS[number]

/**
 * Allergen Labels (Romanian translations)
 */
export const ALLERGEN_LABELS: Record<string, string> = {
  gluten: 'Gluten',
  lactose: 'Lactoză',
  nuts: 'Nuci',
  peanuts: 'Arahide',
  soy: 'Soia',
  eggs: 'Ouă',
  fish: 'Pește',
  shellfish: 'Fructe de mare',
  celery: 'Țelină',
  mustard: 'Muștar',
  sesame: 'Susan',
  sulfites: 'Sulfiți',
}

/**
 * Product Categories (for filtering)
 */
export const PRODUCT_CATEGORIES = {
  BAR: 'bar',
  FOOD: 'mancare',
  DESSERT: 'desert',
  HOOKAH: 'narghilea',
  WINE: 'vinuri',
  CHAMPAGNE: 'champagne',
} as const

/**
 * Sort Options
 */
export const SORT_OPTIONS = [
  { label: 'Nume (A-Z)', value: 'name-asc' },
  { label: 'Nume (Z-A)', value: 'name-desc' },
  { label: 'Preț (crescător)', value: 'price-asc' },
  { label: 'Preț (descrescător)', value: 'price-desc' },
  { label: 'Cele mai noi', value: 'created-desc' },
  { label: 'Popularitate', value: 'order-asc' },
] as const

/**
 * Admin Roles
 */
export const ADMIN_ROLES = {
  SUPER_ADMIN: 'super_admin',
  ADMIN: 'admin',
  EDITOR: 'editor',
} as const

export type AdminRole = typeof ADMIN_ROLES[keyof typeof ADMIN_ROLES]

/**
 * API Rate Limits (requests per minute)
 */
export const RATE_LIMITS = {
  PUBLIC: 100,
  AUTHENTICATED: 200,
  ADMIN: 500,
}

/**
 * Cache TTL (in seconds)
 */
export const CACHE_TTL = {
  CATEGORIES: 300, // 5 minutes
  PRODUCTS: 300, // 5 minutes
  VENUE: 3600, // 1 hour
  QR_ANALYTICS: 60, // 1 minute
}

/**
 * Revalidation Times (ISR - in seconds)
 */
export const REVALIDATE = {
  HOMEPAGE: 300, // 5 minutes
  CATEGORY_PAGE: 300, // 5 minutes
  PRODUCT_PAGE: 600, // 10 minutes
  ADMIN_PAGES: 0, // No caching for admin
}

/**
 * Validation Limits
 */
export const VALIDATION = {
  MIN_NAME_LENGTH: 2,
  MAX_NAME_LENGTH: 100,
  MIN_DESCRIPTION_LENGTH: 10,
  MAX_DESCRIPTION_LENGTH: 1000,
  MIN_PRICE: 0.01,
  MAX_PRICE: 99999.99,
  MIN_QUANTITY_LENGTH: 1,
  MAX_QUANTITY_LENGTH: 50,
}

/**
 * Default Theme Colors (matching Tailwind config)
 */
export const THEME = {
  colors: {
    primary: '#1a1a1a',
    secondary: '#fbbf24',
    dark: '#0a0a0a',
    light: '#f5f5f5',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
  },
  fonts: {
    sans: 'Inter, system-ui, sans-serif',
    display: 'Playfair Display, serif',
    mono: 'JetBrains Mono, monospace',
  },
}

/**
 * Error Messages
 */
export const ERROR_MESSAGES = {
  GENERIC: 'A apărut o eroare. Vă rugăm încercați din nou.',
  NOT_FOUND: 'Resursa solicitată nu a fost găsită.',
  UNAUTHORIZED: 'Nu aveți permisiunea de a accesa această resursă.',
  VALIDATION_ERROR: 'Datele introduse nu sunt valide.',
  NETWORK_ERROR: 'Eroare de conexiune. Verificați conexiunea la internet.',
  SERVER_ERROR: 'Eroare de server. Vă rugăm încercați mai târziu.',
}

/**
 * Success Messages
 */
export const SUCCESS_MESSAGES = {
  CREATED: 'Creat cu succes!',
  UPDATED: 'Actualizat cu succes!',
  DELETED: 'Șters cu succes!',
  SAVED: 'Salvat cu succes!',
}

/**
 * Navigation Routes
 */
export const ROUTES = {
  HOME: '/',
  CATEGORY: (slug: string) => `/${slug}`,
  SUBCATEGORY: (categorySlug: string, subcategorySlug: string) =>
    `/${categorySlug}/${subcategorySlug}`,
  ADMIN: {
    DASHBOARD: '/admin/dashboard',
    CATEGORIES: '/admin/categories',
    PRODUCTS: '/admin/products',
    QR_CODES: '/admin/qr-codes',
    SETTINGS: '/admin/settings',
  },
} as const

/**
 * QR Code Configuration
 */
export const QR_CONFIG = {
  SIZE: 512,
  MARGIN: 4,
  ERROR_CORRECTION_LEVEL: 'M' as const,
  DEFAULT_FOREGROUND: '#000000',
  DEFAULT_BACKGROUND: '#FFFFFF',
}

/**
 * Feature Flags
 */
export const FEATURES = {
  MULTI_LANGUAGE: true,
  ONLINE_ORDERING: false, // Coming in Phase 2
  REVIEWS: false, // Coming in Phase 2
  ANALYTICS: true,
  PWA: false, // Coming in Phase 2
  DARK_MODE: false, // Coming in Phase 2
}

/**
 * Contact Information
 */
export const CONTACT = {
  EMAIL: 'contact@infinitylounge.ro',
  PHONE: '+40 123 456 789',
  ADDRESS: 'Str. Exemplu 123, București, România',
  SOCIAL: {
    FACEBOOK: '#',
    INSTAGRAM: '#',
    TWITTER: '#',
  },
}
