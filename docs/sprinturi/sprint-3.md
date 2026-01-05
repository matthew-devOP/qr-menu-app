# Sprint 3: Admin Panel

**Durata:** 2 săptămâni (Săptămâna 5-6)
**Obiectiv:** Sistem complet de administrare meniu cu autentificare

---

## Obiective Principale

1. Implementare NextAuth.js pentru autentificare
2. Admin dashboard cu statistici
3. CRUD complet pentru categorii
4. CRUD complet pentru subcategorii
5. CRUD complet pentru produse
6. Image upload integration cu Cloudinary

---

## Week 5: Authentication & Dashboard

### Day 1-2: NextAuth.js Setup
- [ ] Install next-auth
- [ ] Configure NextAuth.js în app/api/auth/[...nextauth]/route.ts
- [ ] Setup credentials provider
- [ ] Create login page
- [ ] Session management
- [ ] Protected routes middleware

### Day 3: Admin Layout
- [ ] Create app/admin/layout.tsx
- [ ] Sidebar navigation
- [ ] Header with logout
- [ ] Breadcrumbs
- [ ] Responsive sidebar (mobile drawer)

### Day 4-5: Dashboard
- [ ] Create app/admin/dashboard/page.tsx
- [ ] Statistics cards:
  - [ ] Total categories
  - [ ] Total products
  - [ ] QR scans (placeholder)
  - [ ] Most viewed products
- [ ] Recent activity feed
- [ ] Quick actions buttons
- [ ] Charts (optional)

---

## Week 6: CRUD Operations

### Day 6-7: Categories Management
- [ ] Categories list page (table view)
- [ ] Create category form
- [ ] Edit category modal
- [ ] Delete confirmation
- [ ] Drag-and-drop reordering
- [ ] Bulk actions (activate/deactivate)
- [ ] Image upload

### Day 8: Subcategories Management
- [ ] Subcategories list (grouped by category)
- [ ] Create/Edit forms
- [ ] Delete with cascade warning
- [ ] Reordering
- [ ] Image upload

### Day 9: Products Management
- [ ] Products list with filters
- [ ] Create product form (multi-step)
- [ ] Edit product
- [ ] Delete confirmation
- [ ] Category/Subcategory assignment
- [ ] Multiple images upload
- [ ] Allergen tags selection

### Day 10: Image Upload Integration
- [ ] Cloudinary upload component
- [ ] Image cropping tool
- [ ] Drag-and-drop upload
- [ ] Multiple images handling
- [ ] Delete from Cloudinary
- [ ] Image optimization settings

---

## Deliverables

- [ ] NextAuth.js authentication working
- [ ] Admin dashboard functional
- [ ] Complete CRUD for all entities
- [ ] Image upload & management
- [ ] Protected routes
- [ ] Form validation
- [ ] Error handling

---

## Definition of Done

- [ ] Admin can fully manage menu
- [ ] Authentication secure (session, CSRF)
- [ ] All forms have validation
- [ ] Image upload works reliably
- [ ] Error messages user-friendly
- [ ] Mobile-responsive admin panel

---

**Status:** ⏳ Not Started
**Dependencies:** Sprint 1 & 2 completion
