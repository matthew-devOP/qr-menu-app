# Claude Code Context - QR Smart Menu App

## 📌 Despre Proiect

Aceasta este o aplicație **Node.js/Next.js** pentru un **meniu digital interactiv** accesibil prin **cod QR**, destinată restaurantelor și lounge-urilor (cazul specific: INFINITY LOUNGE).

## 🎯 Obiectivul Principal

Construirea unei aplicații web complete care permite:
1. Clienților să scaneze un QR code și să vadă meniul interactiv
2. Administratorilor să gestioneze meniul (categorii, subcategorii, produse)
3. Generarea automată de coduri QR pentru mese/zone

## 🏗️ Arhitectură Tehnică

### Stack Principal
- **Framework:** Next.js 14+ (App Router, TypeScript)
- **Styling:** Tailwind CSS + Shadcn/ui
- **Database:** PostgreSQL cu Prisma ORM
- **Image Storage:** Cloudinary
- **Auth:** NextAuth.js
- **Deployment:** Vercel

### Structura Ierarhică a Meniului
```
Categorii (BAR, MANCARE, DESERT, etc.)
  └── Subcategorii (Băuturi Răcoritoare, Băuturi Calde)
       └── Produse (Pepsi Regular, Cafea, etc.)
```

## 📂 Fișiere Importante

### Documentație
- `/docs/plan-detaliat.md` - Plan complet cu toate detaliile tehnice
- `/docs/arhitectura.md` - Decizii arhitecturale & patterns
- `/docs/design-system.md` - Componente UI & design guidelines
- `/docs/sprinturi/` - Planificare & tracking sprinturi

### Configurare
- `prisma/schema.prisma` - Schema bazei de date
- `.env` - Environment variables (DATABASE_URL, CLOUDINARY_*, etc.)
- `tailwind.config.ts` - Theme configuration

### Cod
- `app/` - Next.js pages & API routes
- `components/` - React components (menu/, admin/, ui/)
- `lib/` - Utilities & helpers

## 🎨 Design System

### Culori
- **Primary:** #1a1a1a (Dark)
- **Secondary:** #fbbf24 (Gold accent)
- **Background:** #f5f5f5 (Light gray)

### Componente Cheie
1. **CategoryCard** - Card pentru categorii (16:9 aspect ratio, overlay gradient)
2. **ProductCard** - Card pentru produse (1:1 sau 3:4, price badge)
3. **Breadcrumb** - Navigare (Home > Category > Subcategory)
4. **Header** - Sticky header cu logo & language switcher

### Fonts
- **Sans:** Inter
- **Display:** Playfair Display

## 📋 Modele Database (Prisma)

### Principale Entități
1. **Venue** - Restaurantul/locația (INFINITY LOUNGE)
2. **Category** - Categorii principale (BAR, MANCARE, etc.)
3. **Subcategory** - Subcategorii (Băuturi Răcoritoare, etc.)
4. **Product** - Produse individuale (Pepsi Regular, etc.)
5. **QRCode** - Coduri QR generate pentru mese
6. **Admin** - Utilizatori admin

### Relații
- Venue → Categories (1:N)
- Category → Subcategories (1:N)
- Category/Subcategory → Products (1:N)
- Venue → QRCodes (1:N)

## 🚀 Workflow Dezvoltare

### Abordare Sprint-based
- **Sprint 1:** Setup & Foundation (2 săptămâni)
- **Sprint 2:** Core Features (2 săptămâni)
- **Sprint 3:** Admin Panel (2 săptămâni)
- **Sprint 4:** Advanced Features (2 săptămâni)
- **Sprint 5:** Polish & Deploy (2 săptămâni)

### Best Practices
- **Mobile-First:** Design & develop pentru mobile primul
- **Component-Driven:** Componente reusabile & isolated
- **Type-Safe:** TypeScript strict mode
- **Performance:** Image optimization, code splitting, caching
- **Accessibility:** WCAG 2.1 AA compliance
- **SEO:** Metadata, structured data, sitemaps

## 🔄 Git Workflow

### Branch Strategy
- `main` - Production-ready code
- `claude/qr-smart-menu-app-VB1R0` - Current development branch
- Feature branches: `feature/component-name`

### Commit Messages
```
feat: add CategoryCard component
fix: resolve breadcrumb navigation issue
docs: update API documentation
style: improve mobile responsiveness
refactor: optimize image loading
test: add unit tests for ProductCard
```

## 📝 Convenții de Cod

### Naming
- Components: PascalCase (`CategoryCard.tsx`)
- Utils/Helpers: camelCase (`formatPrice.ts`)
- Constants: UPPER_SNAKE_CASE (`MAX_IMAGE_SIZE`)
- CSS Classes: kebab-case (`category-card`)

### File Organization
```typescript
// Component structure
ComponentName/
├── ComponentName.tsx      // Main component
├── ComponentName.test.tsx // Tests
├── types.ts              // TypeScript types
└── utils.ts              // Helper functions
```

### TypeScript
- Use interfaces pentru props
- Evită `any` - folosește `unknown` sau type-specific
- Export types din fișiere separate când sunt shared

## 🎯 Priorități Curente

### Must-Have (MVP)
1. ✅ Setup proiect Next.js + Prisma
2. ⏳ Homepage cu categorii
3. ⏳ Navigation flow (Category → Subcategory → Product)
4. ⏳ Product detail view
5. ⏳ Responsive design

### Should-Have
6. ⏳ Admin authentication
7. ⏳ Admin CRUD pentru categorii
8. ⏳ Admin CRUD pentru produse
9. ⏳ Image upload (Cloudinary)
10. ⏳ QR Code generator

### Nice-to-Have
11. ⏳ Multi-language (RO/EN)
12. ⏳ Search & filters
13. ⏳ Analytics dashboard
14. ⏳ PWA support

## 🐛 Known Issues & Considerations

### Lucruri de Verificat
- [ ] Image optimization strategy (Cloudinary vs Next.js Image)
- [ ] Caching strategy (ISR revalidation time)
- [ ] Mobile performance (lazy loading, infinite scroll vs pagination)
- [ ] SEO requirements (structured data pentru meniu)

### Decizii de Luat
- [ ] Ordinea produselor (alfabetică, custom, popularitate?)
- [ ] Allergen icons & design
- [ ] QR code design (frame, logo, colors)
- [ ] Admin panel layout (sidebar vs top nav)

## 💡 Tips pentru Claude Code

### Când creezi componente:
1. Verifică întâi dacă există în Shadcn/ui
2. Creează TypeScript interfaces pentru props
3. Adaugă JSDoc comments pentru complex logic
4. Include responsive breakpoints (mobile, tablet, desktop)
5. Adaugă loading & error states

### Când lucrezi cu Prisma:
1. Rulează `npx prisma format` după modificări schema
2. Creează migrations cu nume descriptive
3. Include indexes pentru query performance
4. Verifică relationships & cascade delete

### Când lucrezi cu API routes:
1. Validează input cu Zod
2. Handle errors cu try/catch
3. Return consistent response format
4. Add rate limiting pentru production
5. Document endpoints în `/docs/api/`

## 📚 Resurse Utile

### Documentație Oficială
- [Next.js Docs](https://nextjs.org/docs)
- [Prisma Docs](https://www.prisma.io/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Shadcn/ui](https://ui.shadcn.com)

### Design Inspiration
- [Dribbble - Restaurant Menus](https://dribbble.com/tags/restaurant-menu)
- [Me-QR Menu Examples](https://www.me-qr.com/menu)

### Tools
- Prisma Studio: `npx prisma studio`
- Database migrations: `npx prisma migrate dev`
- Type generation: `npx prisma generate`

## 🎤 Communication Style

Când comunici cu userul (matthew-devOP):
- Fii concis dar complet
- Explică deciziile tehnice când sunt importante
- Sugerează best practices dar lasă flexibilitate
- Cere clarificări când ceva nu e clar
- Propune alternative când sunt multiple soluții valide

## 📊 Current Sprint Status

**Sprint Activ:** Sprint 1 - Foundation
**Progres:** 10% (Setup documentație)
**Next Steps:**
1. Creează structura Next.js
2. Setup Prisma & database schema
3. Creează componente UI de bază

---

**Ultima actualizare:** 2026-01-05
**Context Version:** 1.0
