# API Documentation - QR Smart Menu App

## Base URL

```
Development: http://localhost:3000/api
Production:  https://your-domain.vercel.app/api
```

---

## Authentication

Admin API endpoints require authentication using NextAuth.js.

### Authentication Header
```http
Authorization: Bearer <session_token>
Cookie: next-auth.session-token=<token>
```

---

## Public API Endpoints

### 1. Get All Venues

**Endpoint:** `GET /api/venues`

**Description:** Retrieve list of all active venues

**Response:**
```json
{
  "venues": [
    {
      "id": "clx1234567890",
      "name": "INFINITY LOUNGE",
      "slug": "infinity-lounge",
      "logo": "https://cloudinary.com/...",
      "description": "Premium lounge & restaurant",
      "isActive": true
    }
  ]
}
```

**Status Codes:**
- `200` - Success
- `500` - Server error

---

### 2. Get Venue Details

**Endpoint:** `GET /api/venues/[slug]`

**Parameters:**
- `slug` (string) - Venue slug

**Example:** `GET /api/venues/infinity-lounge`

**Response:**
```json
{
  "id": "clx1234567890",
  "name": "INFINITY LOUNGE",
  "slug": "infinity-lounge",
  "logo": "https://cloudinary.com/...",
  "address": "Str. Exemplu 123, București",
  "phone": "+40 123 456 789",
  "email": "contact@infinitylounge.ro",
  "description": "Premium lounge & restaurant",
  "theme": {
    "primaryColor": "#1a1a1a",
    "secondaryColor": "#fbbf24"
  },
  "isActive": true
}
```

**Status Codes:**
- `200` - Success
- `404` - Venue not found
- `500` - Server error

---

### 3. Get Categories

**Endpoint:** `GET /api/venues/[slug]/categories`

**Parameters:**
- `slug` (string) - Venue slug
- `lang` (optional, query) - Language code (ro, en)

**Example:** `GET /api/venues/infinity-lounge/categories?lang=ro`

**Response:**
```json
{
  "categories": [
    {
      "id": "cat_001",
      "name": "BAR",
      "nameRo": "BAR",
      "nameEn": "BAR",
      "slug": "bar",
      "description": "Băuturi și cocktailuri",
      "image": "https://cloudinary.com/bar.jpg",
      "order": 1,
      "subcategoriesCount": 2
    },
    {
      "id": "cat_002",
      "name": "MANCARE",
      "nameRo": "MÂNCARE",
      "nameEn": "FOOD",
      "slug": "mancare",
      "image": "https://cloudinary.com/food.jpg",
      "order": 2,
      "subcategoriesCount": 5
    }
  ]
}
```

**Status Codes:**
- `200` - Success
- `404` - Venue not found
- `500` - Server error

---

### 4. Get Category Details

**Endpoint:** `GET /api/categories/[slug]`

**Parameters:**
- `slug` (string) - Category slug
- `includeSubcategories` (optional, query) - Include subcategories (default: true)

**Example:** `GET /api/categories/bar?includeSubcategories=true`

**Response:**
```json
{
  "id": "cat_001",
  "name": "BAR",
  "slug": "bar",
  "description": "Băuturi și cocktailuri premium",
  "image": "https://cloudinary.com/bar.jpg",
  "subcategories": [
    {
      "id": "subcat_001",
      "name": "BĂUTURI RĂCORITOARE",
      "slug": "bauturi-racoritoare",
      "image": "https://cloudinary.com/soft-drinks.jpg",
      "productsCount": 12
    },
    {
      "id": "subcat_002",
      "name": "BĂUTURI CALDE",
      "slug": "bauturi-calde",
      "image": "https://cloudinary.com/hot-drinks.jpg",
      "productsCount": 8
    }
  ]
}
```

**Status Codes:**
- `200` - Success
- `404` - Category not found
- `500` - Server error

---

### 5. Get Products by Category

**Endpoint:** `GET /api/categories/[slug]/products`

**Parameters:**
- `slug` (string) - Category slug
- `page` (optional, query) - Page number (default: 1)
- `limit` (optional, query) - Items per page (default: 20)
- `sortBy` (optional, query) - Sort field (price, name, order)
- `sortOrder` (optional, query) - asc or desc
- `available` (optional, query) - Filter by availability (true/false)

**Example:** `GET /api/categories/bar/products?page=1&limit=10&sortBy=price&sortOrder=asc`

**Response:**
```json
{
  "products": [
    {
      "id": "prod_001",
      "name": "PEPSI REGULAR",
      "slug": "pepsi-regular",
      "description": "Băutură răcoritoare carbogazoasă",
      "image": "https://cloudinary.com/pepsi.jpg",
      "price": 18.00,
      "oldPrice": null,
      "quantity": "250ML",
      "allergens": [],
      "isAvailable": true,
      "isFeatured": false,
      "category": {
        "id": "cat_001",
        "name": "BAR",
        "slug": "bar"
      },
      "subcategory": {
        "id": "subcat_001",
        "name": "BĂUTURI RĂCORITOARE",
        "slug": "bauturi-racoritoare"
      }
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 45,
    "totalPages": 5
  }
}
```

**Status Codes:**
- `200` - Success
- `404` - Category not found
- `400` - Invalid query parameters
- `500` - Server error

---

### 6. Get Products by Subcategory

**Endpoint:** `GET /api/subcategories/[slug]/products`

**Parameters:** Same as category products endpoint

**Example:** `GET /api/subcategories/bauturi-racoritoare/products`

**Response:** Same structure as category products

---

### 7. Get Product Details

**Endpoint:** `GET /api/products/[slug]`

**Parameters:**
- `slug` (string) - Product slug

**Example:** `GET /api/products/pepsi-regular`

**Response:**
```json
{
  "id": "prod_001",
  "name": "PEPSI REGULAR",
  "nameRo": "PEPSI REGULAR",
  "nameEn": "PEPSI REGULAR",
  "slug": "pepsi-regular",
  "description": "Băutură răcoritoare carbogazoasă cu gust de cola",
  "descriptionRo": "Băutură răcoritoare carbogazoasă cu gust de cola",
  "descriptionEn": "Carbonated soft drink with cola flavor",
  "image": "https://cloudinary.com/pepsi.jpg",
  "images": [
    "https://cloudinary.com/pepsi-1.jpg",
    "https://cloudinary.com/pepsi-2.jpg"
  ],
  "price": 18.00,
  "oldPrice": null,
  "quantity": "250ML",
  "allergens": [],
  "ingredients": "Apă, zahăr, dioxid de carbon, acid citric...",
  "nutritionInfo": {
    "calories": 100,
    "protein": 0,
    "carbohydrates": 25,
    "fat": 0,
    "sugar": 25
  },
  "isAvailable": true,
  "isFeatured": false,
  "category": {
    "id": "cat_001",
    "name": "BAR",
    "slug": "bar"
  },
  "subcategory": {
    "id": "subcat_001",
    "name": "BĂUTURI RĂCORITOARE",
    "slug": "bauturi-racoritoare"
  }
}
```

**Status Codes:**
- `200` - Success
- `404` - Product not found
- `500` - Server error

---

### 8. Track QR Code Scan

**Endpoint:** `POST /api/qr/track`

**Description:** Track when a QR code is scanned

**Request Body:**
```json
{
  "qrCodeId": "qr_001",
  "metadata": {
    "userAgent": "Mozilla/5.0...",
    "timestamp": "2026-01-05T10:30:00Z"
  }
}
```

**Response:**
```json
{
  "success": true,
  "scans": 42
}
```

**Status Codes:**
- `200` - Success
- `400` - Invalid request
- `404` - QR code not found
- `500` - Server error

---

## Admin API Endpoints (Protected)

### Categories Management

#### Get All Categories (Admin)

**Endpoint:** `GET /api/admin/categories`

**Query Parameters:**
- `page` (optional) - Page number
- `limit` (optional) - Items per page
- `venueId` (optional) - Filter by venue

**Response:**
```json
{
  "categories": [...],
  "pagination": {...}
}
```

#### Create Category

**Endpoint:** `POST /api/admin/categories`

**Request Body:**
```json
{
  "name": "DESERT",
  "nameRo": "DESERT",
  "nameEn": "DESSERT",
  "slug": "desert",
  "description": "Dulciuri și deserturi",
  "image": "https://cloudinary.com/dessert.jpg",
  "venueId": "venue_001",
  "order": 3
}
```

**Response:**
```json
{
  "id": "cat_003",
  "name": "DESERT",
  "slug": "desert",
  "createdAt": "2026-01-05T10:30:00Z"
}
```

**Status Codes:**
- `201` - Created
- `400` - Validation error
- `401` - Unauthorized
- `500` - Server error

#### Update Category

**Endpoint:** `PUT /api/admin/categories/[id]`

**Request Body:** Same as create (partial updates allowed)

**Response:** Updated category object

**Status Codes:**
- `200` - Updated
- `400` - Validation error
- `401` - Unauthorized
- `404` - Not found
- `500` - Server error

#### Delete Category

**Endpoint:** `DELETE /api/admin/categories/[id]`

**Response:**
```json
{
  "success": true,
  "message": "Category deleted successfully"
}
```

**Status Codes:**
- `200` - Deleted
- `401` - Unauthorized
- `404` - Not found
- `409` - Conflict (has subcategories/products)
- `500` - Server error

#### Reorder Categories

**Endpoint:** `PATCH /api/admin/categories/reorder`

**Request Body:**
```json
{
  "categories": [
    { "id": "cat_001", "order": 1 },
    { "id": "cat_002", "order": 2 },
    { "id": "cat_003", "order": 3 }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "updated": 3
}
```

---

### Products Management

#### Get All Products (Admin)

**Endpoint:** `GET /api/admin/products`

**Query Parameters:**
- `page`, `limit` - Pagination
- `categoryId` - Filter by category
- `subcategoryId` - Filter by subcategory
- `search` - Search by name
- `available` - Filter by availability

#### Create Product

**Endpoint:** `POST /api/admin/products`

**Request Body:**
```json
{
  "name": "PEPSI REGULAR",
  "nameRo": "PEPSI REGULAR",
  "nameEn": "PEPSI REGULAR",
  "slug": "pepsi-regular",
  "description": "Băutură răcoritoare",
  "image": "https://cloudinary.com/pepsi.jpg",
  "price": 18.00,
  "quantity": "250ML",
  "categoryId": "cat_001",
  "subcategoryId": "subcat_001",
  "allergens": [],
  "isAvailable": true
}
```

#### Update Product

**Endpoint:** `PUT /api/admin/products/[id]`

#### Delete Product

**Endpoint:** `DELETE /api/admin/products/[id]`

#### Bulk Import Products

**Endpoint:** `POST /api/admin/products/bulk-import`

**Request Body:**
```json
{
  "products": [
    {...},
    {...}
  ]
}
```

**Response:**
```json
{
  "success": true,
  "imported": 15,
  "failed": 2,
  "errors": [...]
}
```

---

### Image Upload

#### Upload Image

**Endpoint:** `POST /api/admin/upload`

**Request:** Multipart form data

```
Content-Type: multipart/form-data

file: [image file]
folder: "categories" | "products" | "qr-codes"
```

**Response:**
```json
{
  "url": "https://cloudinary.com/uploaded-image.jpg",
  "publicId": "categories/bar_xyz123",
  "width": 1200,
  "height": 675,
  "format": "jpg",
  "size": 245678
}
```

**Status Codes:**
- `200` - Uploaded
- `400` - Invalid file
- `401` - Unauthorized
- `413` - File too large
- `500` - Server error

---

### QR Codes Management

#### Generate QR Code

**Endpoint:** `POST /api/admin/qr-codes/generate`

**Request Body:**
```json
{
  "venueId": "venue_001",
  "name": "Table 1",
  "tableNumber": "1",
  "customization": {
    "logo": true,
    "color": "#1a1a1a",
    "backgroundColor": "#ffffff"
  }
}
```

**Response:**
```json
{
  "id": "qr_001",
  "url": "https://your-domain.com/infinity-lounge?table=1",
  "qrImageUrl": "https://cloudinary.com/qr-table-1.png",
  "downloadUrl": "https://cloudinary.com/qr-table-1.pdf"
}
```

#### Get QR Analytics

**Endpoint:** `GET /api/admin/qr-codes/[id]/analytics`

**Query Parameters:**
- `startDate` - Start date (ISO format)
- `endDate` - End date

**Response:**
```json
{
  "qrCode": {
    "id": "qr_001",
    "name": "Table 1",
    "totalScans": 342
  },
  "analytics": {
    "scansToday": 12,
    "scansThisWeek": 45,
    "scansThisMonth": 156,
    "scansByDay": [
      { "date": "2026-01-01", "scans": 15 },
      { "date": "2026-01-02", "scans": 23 }
    ]
  }
}
```

---

## Error Responses

All endpoints return errors in this format:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request data",
    "details": [
      {
        "field": "price",
        "message": "Price must be a positive number"
      }
    ]
  }
}
```

### Error Codes

- `VALIDATION_ERROR` - Invalid input data
- `NOT_FOUND` - Resource not found
- `UNAUTHORIZED` - Authentication required
- `FORBIDDEN` - Insufficient permissions
- `CONFLICT` - Resource conflict
- `INTERNAL_ERROR` - Server error

---

## Rate Limiting

- **Public API:** 100 requests/minute per IP
- **Admin API:** 200 requests/minute per user

**Headers:**
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1641024000
```

---

**API Version:** 1.0
**Last Updated:** Ianuarie 2026
