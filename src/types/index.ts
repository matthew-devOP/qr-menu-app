// TypeScript Type Definitions for QR Menu App
// Based on Prisma schema models

import { Decimal } from '@prisma/client/runtime/library'

/**
 * Venue (Restaurant/Lounge)
 */
export interface Venue {
  id: string
  name: string
  slug: string
  logo?: string | null
  address?: string | null
  phone?: string | null
  email?: string | null
  description?: string | null
  theme?: VenueTheme | null
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export interface VenueTheme {
  primaryColor?: string
  secondaryColor?: string
  font?: string
  [key: string]: any
}

/**
 * Category (Main menu categories: BAR, MANCARE, etc.)
 */
export interface Category {
  id: string
  name: string
  nameRo: string
  nameEn?: string | null
  slug: string
  description?: string | null
  image: string
  icon?: string | null
  order: number
  isActive: boolean
  venueId: string
  createdAt: Date
  updatedAt: Date
}

export interface CategoryWithRelations extends Category {
  subcategories?: Subcategory[]
  products?: Product[]
  _count?: {
    subcategories: number
    products: number
  }
}

/**
 * Subcategory (Băuturi Răcoritoare, Băuturi Calde, etc.)
 */
export interface Subcategory {
  id: string
  name: string
  nameRo: string
  nameEn?: string | null
  slug: string
  description?: string | null
  image: string
  order: number
  isActive: boolean
  categoryId: string
  createdAt: Date
  updatedAt: Date
}

export interface SubcategoryWithRelations extends Subcategory {
  category?: Category
  products?: Product[]
  _count?: {
    products: number
  }
}

/**
 * Product (Individual menu items)
 */
export interface Product {
  id: string
  name: string
  nameRo: string
  nameEn?: string | null
  slug: string
  description?: string | null
  descriptionRo?: string | null
  descriptionEn?: string | null
  image: string
  images: string[]
  price: Decimal | number
  oldPrice?: Decimal | number | null
  quantity?: string | null
  allergens: string[]
  ingredients?: string | null
  nutritionInfo?: NutritionInfo | null
  isAvailable: boolean
  isFeatured: boolean
  order: number
  categoryId: string
  subcategoryId?: string | null
  createdAt: Date
  updatedAt: Date
}

export interface ProductWithRelations extends Product {
  category?: Category
  subcategory?: Subcategory | null
}

export interface NutritionInfo {
  calories?: number
  protein?: number
  carbohydrates?: number
  fat?: number
  sugar?: number
  fiber?: number
  sodium?: number
  [key: string]: any
}

/**
 * QR Code
 */
export interface QRCode {
  id: string
  venueId: string
  name: string
  tableNumber?: string | null
  url: string
  qrImageUrl?: string | null
  isActive: boolean
  scans: number
  lastScanned?: Date | null
  createdAt: Date
  updatedAt: Date
}

export interface QRCodeWithVenue extends QRCode {
  venue?: Venue
}

/**
 * Admin User
 */
export interface Admin {
  id: string
  email: string
  password: string // Hashed
  name: string
  role: string
  venueId?: string | null
  createdAt: Date
  updatedAt: Date
}

export interface AdminSafe extends Omit<Admin, 'password'> {
  // Admin without password (for frontend use)
}

/**
 * API Response Types
 */
export interface ApiResponse<T = any> {
  data?: T
  error?: ApiError
  success: boolean
  message?: string
}

export interface ApiError {
  code: string
  message: string
  details?: any
}

export interface PaginationParams {
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasMore: boolean
  }
}

/**
 * Menu Display Types (for frontend)
 */
export interface MenuCategory {
  id: string
  name: string
  slug: string
  image: string
  description?: string
  subcategoriesCount: number
  productsCount: number
}

export interface MenuSubcategory {
  id: string
  name: string
  slug: string
  image: string
  description?: string
  productsCount: number
}

export interface MenuProduct {
  id: string
  name: string
  slug: string
  image: string
  price: number
  oldPrice?: number
  quantity?: string
  description?: string
  allergens?: string[]
  isAvailable: boolean
  isFeatured: boolean
  discount?: number // Calculated from oldPrice
}

/**
 * Breadcrumb Navigation
 */
export interface BreadcrumbItem {
  label: string
  href: string
  isActive?: boolean
}

/**
 * Filter & Sort Types
 */
export interface ProductFilters {
  categoryId?: string
  subcategoryId?: string
  search?: string
  minPrice?: number
  maxPrice?: number
  allergens?: string[]
  available?: boolean
  featured?: boolean
}

export interface ProductSort {
  field: 'name' | 'price' | 'order' | 'createdAt'
  order: 'asc' | 'desc'
}

/**
 * Form Input Types
 */
export interface CategoryFormData {
  name: string
  nameRo: string
  nameEn?: string
  slug: string
  description?: string
  image: string
  icon?: string
  order: number
  isActive: boolean
  venueId: string
}

export interface SubcategoryFormData {
  name: string
  nameRo: string
  nameEn?: string
  slug: string
  description?: string
  image: string
  order: number
  isActive: boolean
  categoryId: string
}

export interface ProductFormData {
  name: string
  nameRo: string
  nameEn?: string
  slug: string
  description?: string
  descriptionRo?: string
  descriptionEn?: string
  image: string
  images?: string[]
  price: number
  oldPrice?: number
  quantity?: string
  allergens?: string[]
  ingredients?: string
  nutritionInfo?: NutritionInfo
  isAvailable: boolean
  isFeatured: boolean
  order: number
  categoryId: string
  subcategoryId?: string
}

/**
 * Language Types
 */
export type Locale = 'ro' | 'en'

export interface TranslatedContent {
  ro: string
  en?: string
}

/**
 * Analytics Types
 */
export interface QRAnalytics {
  qrCodeId: string
  totalScans: number
  scansToday: number
  scansThisWeek: number
  scansThisMonth: number
  scansByDay: Array<{
    date: string
    scans: number
  }>
}

export interface DashboardStats {
  totalCategories: number
  totalProducts: number
  totalQRCodes: number
  totalScans: number
  activeProducts: number
  featuredProducts: number
}
