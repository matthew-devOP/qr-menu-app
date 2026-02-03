# Changelog - QR Menu App

Toate schimbările notabile ale proiectului sunt documentate în acest fișier.

Formatul este bazat pe [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [0.3.0] - 2026-02-03 (Production Readiness)

### Added
- **QR Tracking System**
  - `/api/qr-codes/scan` - API pentru tracking scanări după locație
  - `QRScanTracker` component montat în layout pentru tracking automat
  
- **Admin Subcategories Management**
  - Pagina `/admin/subcategories` cu filtru pe categorie
  - `CreateSubcategoryModal`, `EditSubcategoryModal`, `DeleteSubcategoryDialog`
  - Link în sidebar pentru accesarea paginii

- **Dashboard Live Data**
  - Dashboard conectat la `/api/dashboard/stats`
  - Afișează statistici reale: categorii, produse, subcategorii, scanări QR
  - Top 5 categorii după număr de produse

- **Settings Funcțional**
  - Formular venue cu salvare în baza de date
  - Formular profil admin cu actualizare
  - Schimbare parolă funcțională

- **Expanded Seed Data**
  - 8 subcategorii (BAR: 3, MANCARE: 3, DESERT: 2)
  - 23 produse complete cu prețuri și alergeni
  - 5 coduri QR (Masa 1-3, Bar, Terasa)

- **Security Headers**
  - HSTS, X-Content-Type-Options, X-Frame-Options
  - X-XSS-Protection, Referrer-Policy, Permissions-Policy
  - NEXTAUTH_SECRET enforcement în producție

### Changed
- Pagini publice setate pe `dynamic = 'force-dynamic'` pentru interogări DB
- Removed MobileBreadcrumb from barrel export (unused)

### Fixed
- Dashboard stats API - câmpuri corecte (`scans`, `lastScanned`)
- Venue API - eliminat câmpuri inexistente în schema
- Subcategories API - aliniat cu Prisma schema
- CategoryCard, ProductCard, ProductModal - image fallbacks

### Removed
- `SessionProvider.tsx` - cod nefolosit

---

## [0.2.0] - 2026-01-31 (Docker & Validation)

### Added
- **Docker Development Environment**
  - `Dockerfile` cu node:20-slim
  - `docker-compose.yml` cu PostgreSQL
  - Hot reloading prin volume mounting
  - Port configurat pe 3009

- **Zod Validation**
  - Schema validare pentru produse
  - Validare strictă pe API POST/PUT
  - Răspunsuri 400 cu mesaje de eroare detaliate

- **Testing Infrastructure**
  - Jest + React Testing Library pentru unit tests
  - Playwright pentru E2E tests
  - Teste pentru componente UI (Button, Card, Input)
  - Teste API pentru validare

- **Production Build**
  - `Dockerfile.prod` multi-stage build
  - `docker-compose.prod.yml` 
  - `output: 'standalone'` în next.config.ts

### Fixed
- `slugify` function - normalizare Unicode corectă pentru diacritice
- Middleware matcher syntax corectată
- Prisma schema - URL adăugat, engine type setat pe binary
- Downgrade Prisma la 5.10.2 pentru stabilitate Docker

---

## [0.1.0] - 2026-01-29 (Initial Setup)

### Added
- Proiect Next.js 14+ cu App Router
- Prisma ORM cu PostgreSQL
- Tailwind CSS + Shadcn/ui
- NextAuth.js pentru autentificare
- Structură categorii → subcategorii → produse
- Admin panel cu CRUD operații
- QR code generator
- Suport multi-lingvistic (RO/EN)
