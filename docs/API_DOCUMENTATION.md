# 📚 API Documentation - QR Smart Menu App v1.0

Complete REST API reference for all implemented endpoints.

**Base URL:**
- Development: `http://localhost:3000/api`
- Production: `https://your-domain.vercel.app/api`

**Last Updated:** January 6, 2026 (v1.0)

---

## 🔐 Authentication

Most admin endpoints require authentication using NextAuth.js with JWT strategy.

### Headers
```http
Cookie: next-auth.session-token=<session_token>
```

### Admin Credentials (Development)
```
Email: admin@infinitylounge.ro
Password: admin123
```

---

## 📋 Table of Contents

1. [Authentication](#authentication-endpoints)
2. [Categories](#categories-endpoints)
3. [Products](#products-endpoints)
4. [QR Codes](#qr-codes-endpoints)

---

## 🔑 Authentication Endpoints

### POST `/api/auth/callback/credentials`

**Description:** Authenticate admin user with credentials

**Method:** POST

**Request Body:**
```json
{
  "email": "admin@infinitylounge.ro",
  "password": "admin123",
  "callbackUrl": "/admin/dashboard"
}
```

**Response (Success):**
```json
{
  "url": "/admin/dashboard",
  "ok": true
}
```

**Response (Error):**
```json
{
  "error": "CredentialsSignin",
  "ok": false
}
```

**Status Codes:**
- `200` - Authentication successful
- `401` - Invalid credentials

---

### GET `/api/auth/session`

**Description:** Get current user session

**Method:** GET

**Authentication:** Not required (public)

**Response (Authenticated):**
```json
{
  "user": {
    "id": "clx1234567890",
    "email": "admin@infinitylounge.ro",
    "name": "Admin INFINITY LOUNGE",
    "role": "admin"
  },
  "expires": "2026-02-05T12:00:00.000Z"
}
```

**Response (Not authenticated):**
```json
{
  "user": null
}
```

**Status Codes:**
- `200` - Success (authenticated or not)

---

### POST `/api/auth/signout`

**Description:** Sign out current user

**Method:** POST

**Authentication:** Required

**Response:**
```json
{
  "url": "/admin/login"
}
```

**Status Codes:**
- `200` - Sign out successful
- `302` - Redirect to login page

---

## 📁 Categories Endpoints

### GET `/api/categories`

**Description:** Get all categories with subcategories and products count

**Method:** GET

**Authentication:** Not required

**Response:**
```json
[
  {
    "id": "clx1234567890",
    "name": "BAR",
    "nameEn": "BAR",
    "slug": "bar",
    "description": "Băuturi și cocktail-uri",
    "descriptionEn": "Drinks and cocktails",
    "image": "https://images.unsplash.com/...",
    "order": 1,
    "isActive": true,
    "venueId": "venue_id",
    "createdAt": "2026-01-06T10:00:00.000Z",
    "updatedAt": "2026-01-06T10:00:00.000Z",
    "subcategories": [
      {
        "id": "sub_id",
        "name": "Cocktail-uri",
        "slug": "cocktail-uri"
      }
    ],
    "products": [
      {
        "id": "prod_id",
        "name": "Mojito",
        "price": 28
      }
    ]
  }
]
```

**Status Codes:**
- `200` - Success
- `500` - Server error

---

### POST `/api/categories`

**Description:** Create new category

**Method:** POST

**Authentication:** Required (Admin)

**Request Body:**
```json
{
  "name": "DESERT",
  "nameEn": "DESSERT",
  "slug": "desert",
  "description": "Deserturi delicioase",
  "descriptionEn": "Delicious desserts",
  "image": "https://images.unsplash.com/...",
  "isActive": true
}
```

**Response (Success):**
```json
{
  "id": "clx9876543210",
  "name": "DESERT",
  "nameEn": "DESSERT",
  "slug": "desert",
  "description": "Deserturi delicioase",
  "descriptionEn": "Delicious desserts",
  "image": "https://images.unsplash.com/...",
  "order": 4,
  "isActive": true,
  "venueId": "venue_id",
  "createdAt": "2026-01-06T12:00:00.000Z",
  "updatedAt": "2026-01-06T12:00:00.000Z",
  "subcategories": [],
  "products": []
}
```

**Response (Error):**
```json
{
  "error": "Name and slug are required"
}
```

**Validation Rules:**
- `name` (required): String, min 1 char
- `slug` (required): String, unique, lowercase, no spaces
- `nameEn` (optional): String
- `description` (optional): String
- `descriptionEn` (optional): String
- `image` (optional): String (URL)
- `isActive` (optional): Boolean, default true

**Status Codes:**
- `201` - Created successfully
- `400` - Validation error or slug already exists
- `401` - Unauthorized
- `500` - Server error

---

### GET `/api/categories/[id]`

**Description:** Get single category by ID

**Method:** GET

**Authentication:** Not required

**URL Parameters:**
- `id` (required): Category ID

**Response:**
```json
{
  "id": "clx1234567890",
  "name": "BAR",
  "nameEn": "BAR",
  "slug": "bar",
  "description": "Băuturi și cocktail-uri",
  "descriptionEn": "Drinks and cocktails",
  "image": "https://images.unsplash.com/...",
  "order": 1,
  "isActive": true,
  "venueId": "venue_id",
  "subcategories": [...],
  "products": [...]
}
```

**Status Codes:**
- `200` - Success
- `404` - Category not found
- `500` - Server error

---

### PUT `/api/categories/[id]`

**Description:** Update existing category

**Method:** PUT

**Authentication:** Required (Admin)

**URL Parameters:**
- `id` (required): Category ID

**Request Body:**
```json
{
  "name": "BAR UPDATED",
  "nameEn": "BAR UPDATED",
  "slug": "bar-updated",
  "description": "New description",
  "descriptionEn": "New description",
  "image": "https://new-image.jpg",
  "isActive": false
}
```

**Response (Success):**
```json
{
  "id": "clx1234567890",
  "name": "BAR UPDATED",
  "slug": "bar-updated",
  ...
}
```

**Response (Error):**
```json
{
  "error": "Category not found"
}
```

**Validation Rules:**
- Same as POST endpoint
- Slug must be unique (excluding current category)
- All fields optional (only provided fields will be updated)

**Status Codes:**
- `200` - Updated successfully
- `400` - Validation error
- `401` - Unauthorized
- `404` - Category not found
- `500` - Server error

---

### DELETE `/api/categories/[id]`

**Description:** Delete category (only if no subcategories or products)

**Method:** DELETE

**Authentication:** Required (Admin)

**URL Parameters:**
- `id` (required): Category ID

**Response (Success):**
```json
{
  "success": true
}
```

**Response (Error - Has Dependencies):**
```json
{
  "error": "Cannot delete category with subcategories or products",
  "hasSubcategories": true,
  "hasProducts": false
}
```

**Business Rules:**
- Category must exist
- Category must have 0 subcategories
- Category must have 0 products

**Status Codes:**
- `200` - Deleted successfully
- `400` - Has subcategories or products
- `401` - Unauthorized
- `404` - Category not found
- `500` - Server error

---

## 🛍️ Products Endpoints

### GET `/api/products`

**Description:** Get all products with optional filters

**Method:** GET

**Authentication:** Not required

**Query Parameters:**
- `categoryId` (optional): Filter by category ID
- `subcategoryId` (optional): Filter by subcategory ID
- `isAvailable` (optional): Filter by availability (true/false)

**Examples:**
```
GET /api/products
GET /api/products?categoryId=cat_123
GET /api/products?subcategoryId=sub_456
GET /api/products?isAvailable=true
GET /api/products?categoryId=cat_123&isAvailable=true
```

**Response:**
```json
[
  {
    "id": "prod_123",
    "name": "Mojito",
    "nameEn": "Mojito",
    "description": "Cocktail răcoritor cu mentă",
    "descriptionEn": "Refreshing mint cocktail",
    "price": 28,
    "oldPrice": null,
    "image": "https://images.unsplash.com/...",
    "allergens": ["gluten", "lactose"],
    "nutrition": {
      "calories": 150,
      "protein": 2,
      "carbs": 25,
      "fat": 0
    },
    "categoryId": "cat_123",
    "subcategoryId": "sub_456",
    "isAvailable": true,
    "isFeatured": false,
    "createdAt": "2026-01-06T10:00:00.000Z",
    "updatedAt": "2026-01-06T10:00:00.000Z",
    "category": {
      "id": "cat_123",
      "name": "BAR"
    },
    "subcategory": {
      "id": "sub_456",
      "name": "Cocktail-uri"
    }
  }
]
```

**Status Codes:**
- `200` - Success
- `500` - Server error

---

### POST `/api/products`

**Description:** Create new product

**Method:** POST

**Authentication:** Required (Admin)

**Request Body:**
```json
{
  "name": "Piña Colada",
  "nameEn": "Piña Colada",
  "description": "Cocktail tropical cu ananas și nucă de cocos",
  "descriptionEn": "Tropical cocktail with pineapple and coconut",
  "price": 32,
  "oldPrice": 35,
  "image": "https://images.unsplash.com/...",
  "allergens": ["lactose", "nuts"],
  "nutrition": {
    "calories": 245,
    "protein": 1,
    "carbs": 32,
    "fat": 9
  },
  "categoryId": "cat_123",
  "subcategoryId": "sub_456",
  "isAvailable": true,
  "isFeatured": false
}
```

**Response (Success):**
```json
{
  "id": "prod_789",
  "name": "Piña Colada",
  "price": 32,
  "oldPrice": 35,
  ...
}
```

**Validation Rules:**
- `name` (required): String, min 1 char
- `price` (required): Number, > 0
- `categoryId` (required): Must exist in database
- `subcategoryId` (optional): Must exist if provided
- `oldPrice` (optional): Number, should be > price for discounts
- `allergens` (optional): Array of strings
- `nutrition` (optional): Object
- `isAvailable` (optional): Boolean, default true
- `isFeatured` (optional): Boolean, default false

**Status Codes:**
- `201` - Created successfully
- `400` - Validation error or category not found
- `401` - Unauthorized
- `500` - Server error

---

### GET `/api/products/[id]`

**Description:** Get single product by ID

**Method:** GET

**Authentication:** Not required

**URL Parameters:**
- `id` (required): Product ID

**Response:**
```json
{
  "id": "prod_123",
  "name": "Mojito",
  "price": 28,
  "category": {...},
  "subcategory": {...},
  ...
}
```

**Status Codes:**
- `200` - Success
- `404` - Product not found
- `500` - Server error

---

### PUT `/api/products/[id]`

**Description:** Update existing product

**Method:** PUT

**Authentication:** Required (Admin)

**URL Parameters:**
- `id` (required): Product ID

**Request Body:**
```json
{
  "name": "Mojito Premium",
  "price": 30,
  "oldPrice": 32,
  "isAvailable": false,
  ...
}
```

**Validation Rules:**
- Same as POST endpoint
- All fields optional
- Category/Subcategory must exist if changed

**Status Codes:**
- `200` - Updated successfully
- `400` - Validation error
- `401` - Unauthorized
- `404` - Product not found
- `500` - Server error

---

### DELETE `/api/products/[id]`

**Description:** Delete product

**Method:** DELETE

**Authentication:** Required (Admin)

**URL Parameters:**
- `id` (required): Product ID

**Response (Success):**
```json
{
  "success": true
}
```

**Status Codes:**
- `200` - Deleted successfully
- `401` - Unauthorized
- `404` - Product not found
- `500` - Server error

---

## 📱 QR Codes Endpoints

### GET `/api/qr-codes`

**Description:** Get all QR codes

**Method:** GET

**Authentication:** Not required

**Response:**
```json
[
  {
    "id": "qr_123",
    "name": "Masă 1",
    "location": "Sala principală",
    "url": "http://localhost:3000?qr=masa-1",
    "scans": 45,
    "isActive": true,
    "lastScannedAt": "2026-01-06T18:30:00.000Z",
    "venueId": "venue_id",
    "createdAt": "2026-01-05T10:00:00.000Z",
    "updatedAt": "2026-01-06T18:30:00.000Z"
  }
]
```

**Status Codes:**
- `200` - Success
- `500` - Server error

---

### POST `/api/qr-codes`

**Description:** Create new QR code

**Method:** POST

**Authentication:** Required (Admin)

**Request Body:**
```json
{
  "name": "Masă 5",
  "location": "Terasa",
  "url": "https://custom-url.com",
  "isActive": true
}
```

**Response (Success):**
```json
{
  "id": "qr_456",
  "name": "Masă 5",
  "location": "Terasa",
  "url": "http://localhost:3000?qr=terasa",
  "scans": 0,
  "isActive": true,
  "lastScannedAt": null,
  "venueId": "venue_id",
  "createdAt": "2026-01-06T12:00:00.000Z",
  "updatedAt": "2026-01-06T12:00:00.000Z"
}
```

**Validation Rules:**
- `name` (required): String, min 1 char
- `location` (required): String, min 1 char
- `url` (optional): String (URL) - auto-generated if not provided
- `isActive` (optional): Boolean, default true

**URL Auto-generation:**
If URL not provided, it's auto-generated as:
```
{BASE_URL}?qr={location-slugified}
```
Example: "Sala principală" → `?qr=sala-principala`

**Status Codes:**
- `201` - Created successfully
- `400` - Validation error
- `401` - Unauthorized
- `500` - Server error

---

### GET `/api/qr-codes/[id]`

**Description:** Get single QR code by ID

**Method:** GET

**Authentication:** Not required

**URL Parameters:**
- `id` (required): QR Code ID

**Response:**
```json
{
  "id": "qr_123",
  "name": "Masă 1",
  "location": "Sala principală",
  "url": "http://localhost:3000?qr=masa-1",
  "scans": 45,
  "isActive": true,
  "lastScannedAt": "2026-01-06T18:30:00.000Z"
}
```

**Status Codes:**
- `200` - Success
- `404` - QR code not found
- `500` - Server error

---

### PUT `/api/qr-codes/[id]`

**Description:** Update existing QR code

**Method:** PUT

**Authentication:** Required (Admin)

**URL Parameters:**
- `id` (required): QR Code ID

**Request Body:**
```json
{
  "name": "Masă 1 - VIP",
  "location": "Sala VIP",
  "url": "https://new-url.com",
  "isActive": false
}
```

**Validation Rules:**
- Same as POST endpoint
- All fields optional

**Status Codes:**
- `200` - Updated successfully
- `401` - Unauthorized
- `404` - QR code not found
- `500` - Server error

---

### DELETE `/api/qr-codes/[id]`

**Description:** Delete QR code

**Method:** DELETE

**Authentication:** Required (Admin)

**URL Parameters:**
- `id` (required): QR Code ID

**Response (Success):**
```json
{
  "success": true
}
```

**Status Codes:**
- `200` - Deleted successfully
- `401` - Unauthorized
- `404` - QR code not found
- `500` - Server error

---

### POST `/api/qr-codes/[id]/scan`

**Description:** Increment scan count and update last scanned timestamp

**Method:** POST

**Authentication:** Not required (Public)

**URL Parameters:**
- `id` (required): QR Code ID

**Response (Success):**
```json
{
  "success": true,
  "scans": 46
}
```

**Behavior:**
- Increments `scans` field by 1
- Updates `lastScannedAt` to current timestamp
- Returns updated scan count

**Status Codes:**
- `200` - Scan tracked successfully
- `404` - QR code not found
- `500` - Server error

---

### GET `/api/qr-codes/generate`

**Description:** Generate QR code image (PNG or SVG)

**Method:** GET

**Authentication:** Not required (Public)

**Query Parameters:**
- `url` (required): URL to encode in QR code
- `format` (optional): "png" or "svg", default "png"
- `size` (optional): Number (pixels), default 512

**Examples:**
```
GET /api/qr-codes/generate?url=https://example.com
GET /api/qr-codes/generate?url=https://example.com&format=svg
GET /api/qr-codes/generate?url=https://example.com&size=1024
GET /api/qr-codes/generate?url=https://example.com&format=svg&size=256
```

**Response (PNG):**
- Content-Type: `image/png`
- Binary PNG image data
- Default size: 512x512px
- Margin: 2 units

**Response (SVG):**
- Content-Type: `image/svg+xml`
- SVG XML string
- Scalable vector graphic

**QR Code Configuration:**
- Error correction: Medium (default)
- Colors: Black on white
- Margin: 2 units (quiet zone)

**Status Codes:**
- `200` - QR code generated successfully
- `400` - URL parameter missing
- `500` - Generation failed

---

## 📊 Response Format Standards

### Success Response
```json
{
  "data": {...},
  "message": "Operation successful"
}
```

### Error Response
```json
{
  "error": "Error message description",
  "details": {...}
}
```

### Pagination (Not yet implemented)
```json
{
  "data": [...],
  "meta": {
    "total": 100,
    "page": 1,
    "perPage": 20,
    "totalPages": 5
  }
}
```

---

## 🔒 Security Notes

1. **Authentication:**
   - Admin endpoints protected by NextAuth.js middleware
   - JWT tokens stored in HTTP-only cookies
   - Session expires after 30 days

2. **Authorization:**
   - Only authenticated admins can modify data
   - Public read access for menu data
   - QR scan tracking is public

3. **Validation:**
   - Server-side validation on all inputs
   - Slug uniqueness enforced at database level
   - Relationship integrity checked before deletion

4. **Rate Limiting:**
   - Not yet implemented (planned for production)

---

## 🚀 Future API Endpoints (Planned)

- `GET /api/subcategories` - List subcategories
- `POST /api/subcategories` - Create subcategory
- `PUT /api/subcategories/[id]` - Update subcategory
- `DELETE /api/subcategories/[id]` - Delete subcategory
- `GET /api/analytics` - Analytics data
- `GET /api/search` - Product search
- `GET /api/menu` - Complete menu structure

---

## 📝 Notes

- All timestamps are in ISO 8601 format (UTC)
- IDs are UUIDs (cuid format)
- Price values are decimal numbers (RON currency)
- Allergens are strings from predefined list
- Nutrition values are optional objects

---

**Version:** 1.0
**Last Updated:** January 6, 2026
**Status:** Production Ready
