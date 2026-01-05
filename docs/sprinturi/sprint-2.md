# Sprint 2: Core Menu Features

**Durata:** 2 săptămâni (Săptămâna 3-4)
**Obiectiv:** Implementare navigare menu și componente UI esențiale

---

## Obiective Principale

1. Creare componente UI pentru meniu (CategoryCard, ProductCard, Breadcrumb, Header)
2. Implementare homepage cu grid de categorii
3. Implementare navigation flow complet (3 niveluri)
4. Product detail modal
5. Responsive design pentru toate device-urile

---

## Week 3: UI Components

### Day 1-2: Header Component
- [ ] Create Header.tsx component
- [ ] Sticky positioning with scroll effect
- [ ] Logo integration
- [ ] Language switcher (RO/EN placeholder)
- [ ] Mobile hamburger menu
- [ ] Glassmorphism effect on scroll

### Day 3: CategoryCard Component
- [ ] Create CategoryCard.tsx
- [ ] 16:9 aspect ratio layout
- [ ] Image with overlay gradient
- [ ] Hover effects (scale, brightness)
- [ ] Lazy loading pentru images
- [ ] Progressive image loading (blur-up)

### Day 4: ProductCard Component
- [ ] Create ProductCard.tsx
- [ ] Square/portrait layout options
- [ ] Price badge styling
- [ ] Discount percentage display
- [ ] Unavailable state (grayscale)
- [ ] Allergen icons integration

### Day 5: Breadcrumb Component
- [ ] Create Breadcrumb.tsx
- [ ] Home icon + text links
- [ ] Separator styling
- [ ] Mobile collapsed view
- [ ] Active item highlighting

---

## Week 4: Pages & Navigation

### Day 6-7: Homepage
- [ ] Create app/(public)/page.tsx
- [ ] Fetch categories from database
- [ ] Responsive grid layout (1/2/3 columns)
- [ ] Loading states
- [ ] Error handling
- [ ] SEO metadata

### Day 8: Category Page
- [ ] Create app/(public)/[categorySlug]/page.tsx
- [ ] Fetch category + subcategories
- [ ] Breadcrumb integration
- [ ] Subcategory grid
- [ ] Handle no subcategories case
- [ ] 404 handling

### Day 9: Products Page
- [ ] Create app/(public)/[categorySlug]/[subcategorySlug]/page.tsx
- [ ] Fetch products
- [ ] Product grid layout
- [ ] Filter/sort UI (basic)
- [ ] Pagination/infinite scroll
- [ ] Empty state

### Day 10: Product Modal
- [ ] Create ProductModal component
- [ ] Image carousel
- [ ] Detailed information display
- [ ] Allergen icons
- [ ] Nutrition info table
- [ ] Close/share buttons

---

## Deliverables

- [ ] All UI components functional
- [ ] Homepage with categories
- [ ] Complete navigation flow (3 levels)
- [ ] Product modal
- [ ] Responsive design (mobile, tablet, desktop)
- [ ] Loading & error states

---

## Definition of Done

- [ ] Navigation works seamlessly
- [ ] Design matches mockups
- [ ] Mobile-friendly (touch targets, spacing)
- [ ] Lighthouse performance > 90
- [ ] No accessibility warnings
- [ ] TypeScript: no errors
- [ ] Components documented

---

**Status:** ⏳ Not Started
**Dependencies:** Sprint 1 completion
