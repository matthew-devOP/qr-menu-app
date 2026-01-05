# Sprint 2: Core Menu Features

**Durata:** 2 săptămâni (Săptămâna 3-4)
**Obiectiv:** Implementare navigare menu și componente UI esențiale

---

## Obiective Principale

1. ✅ Creare componente UI pentru meniu (CategoryCard, ProductCard, Breadcrumb, Header)
2. ✅ Implementare homepage cu grid de categorii
3. ✅ Implementare navigation flow complet (3 niveluri)
4. ✅ Product detail modal
5. ✅ Responsive design pentru toate device-urile

---

## Week 3: UI Components

### Day 1-2: Header Component
- [x] Create Header.tsx component
- [x] Sticky positioning with scroll effect
- [x] Logo integration (INFINITY LOUNGE)
- [x] Language switcher (RO/EN)
- [x] Mobile hamburger menu
- [x] Glassmorphism effect on scroll

### Day 3: CategoryCard Component
- [x] Create CategoryCard.tsx
- [x] 16:9 aspect ratio layout
- [x] Image with overlay gradient
- [x] Hover effects (scale, brightness)
- [x] Lazy loading pentru images (Next.js Image)
- [x] Progressive image loading (blur-up)

### Day 4: ProductCard Component
- [x] Create ProductCard.tsx
- [x] Square/portrait layout options
- [x] Price badge styling
- [x] Discount percentage display
- [x] Unavailable state (grayscale)
- [x] Allergen icons integration

### Day 5: Breadcrumb Component
- [x] Create Breadcrumb.tsx
- [x] Home icon + text links
- [x] Separator styling (chevron)
- [x] Mobile collapsed view
- [x] Active item highlighting

---

## Week 4: Pages & Navigation

### Day 6-7: Homepage
- [x] Create app/page.tsx
- [x] Hero section with CTA
- [x] Categories grid (mock data for now)
- [x] Responsive grid layout (1/2/3 columns)
- [x] Features showcase section
- [ ] Loading states ⏳
- [ ] Error handling ⏳
- [x] SEO metadata

### Day 8: Category Page
- [x] Create app/[categorySlug]/page.tsx
- [x] Display category + subcategories (mock data)
- [x] Breadcrumb integration
- [x] Subcategory grid
- [x] Handle no subcategories case
- [x] Show direct products if no subcategories

### Day 9: Products Page
- [x] Create app/[categorySlug]/[subcategorySlug]/page.tsx
- [x] Display products (mock data)
- [x] ProductGrid component with modal integration
- [x] Separate available/unavailable products
- [ ] Filter/sort UI ⏳
- [ ] Pagination/infinite scroll ⏳
- [x] Empty state

### Day 10: Product Modal
- [x] Create ProductModal component
- [x] Full-screen modal design
- [x] Product image display
- [x] Detailed information (name, description, price)
- [x] Allergen icons with Romanian labels
- [x] Nutrition info table
- [x] Close button + backdrop click + ESC key

---

## Deliverables

- [x] All UI components functional
- [x] Homepage with categories and hero
- [x] Complete navigation flow (3 levels)
- [x] Product modal with full details
- [x] Responsive design (mobile, tablet, desktop)
- [ ] Loading & error states ⏳ (needs database integration)

---

## Definition of Done

- [x] Navigation works seamlessly
- [x] Design matches design system
- [x] Mobile-friendly (touch targets, spacing)
- [ ] Lighthouse performance > 90 ⏳ (needs testing)
- [ ] No accessibility warnings ⏳ (needs audit)
- [x] TypeScript: no errors
- [x] Components implemented with proper types

**Note:** Currently using MOCK data. Database integration needed for dynamic content.

---

**Status:** 🟢 95% Complete (Using mock data, needs database integration)
**Dependencies:** Sprint 1 completion ✅
**Completed:** Ianuarie 2026 (3 commits)
**Remaining:** Connect to real Prisma queries when database is ready
