# Sprint 1: Foundation & Setup

**Durata:** 2 săptămâni (Săptămâna 1-2)
**Obiectiv:** Setup complet al proiectului și fundația tehnică

---

## Obiective Principale

1. ✅ Creare structură documentație completă
2. ✅ Setup Next.js 16.1.1 cu TypeScript 5.9.3
3. ✅ Configurare Tailwind CSS 4.1.18 + Shadcn/ui
4. ✅ Setup Prisma 7.2.0 + PostgreSQL
5. ✅ Creare schema database + types & constants
6. ⏳ Setup Cloudinary pentru images (Pending)

---

## Week 1: Project Setup & Configuration

### Ziua 1-2: Project Initialization
- [x] Creare README.md
- [x] Creare Claude.md pentru context
- [x] Creare structură /docs
- [x] Creare plan-detaliat.md
- [x] Creare arhitectura.md
- [x] Creare design-system.md
- [x] Creare planificare sprinturi
- [x] Initialize Next.js project (v16.1.1)
  ```bash
  npx create-next-app@latest qr-menu-app \
    --typescript \
    --tailwind \
    --app \
    --src-dir \
    --import-alias "@/*"
  ```
- [x] Setup Git branching strategy
- [x] Configure .gitignore
- [x] Setup .env with DATABASE_URL

### Ziua 3-4: Styling & UI Setup
- [x] Configure Tailwind CSS theme (v4.1.18)
  - [x] Custom colors (brand palette)
  - [x] Typography (Inter, Playfair Display)
  - [x] Spacing & breakpoints
- [x] Install & configure Shadcn/ui
  ```bash
  npx shadcn@latest init
  ```
- [x] Add essential Shadcn components:
  - [x] Button
  - [x] Card
  - [x] Dialog
  - [x] Input
  - [x] Label
  - [x] Badge
- [x] Setup Lucide React pentru icons
- [x] Create global.css cu styles

### Ziua 5: Development Tools
- [ ] Configure ESLint
  - [ ] TypeScript rules
  - [ ] React hooks rules
  - [ ] Next.js rules
- [ ] Configure Prettier
  - [ ] Format on save
  - [ ] Consistent spacing
- [ ] Setup VS Code settings
- [ ] Install helpful extensions:
  - [ ] Tailwind CSS IntelliSense
  - [ ] Prisma
  - [ ] ESLint
  - [ ] Prettier

---

## Week 2: Database & Infrastructure

### Ziua 6-7: Prisma Setup
- [x] Install Prisma dependencies (v7.2.0)
  ```bash
  npm install prisma @prisma/client
  npx prisma init
  ```
- [x] Configure DATABASE_URL în .env (Prisma Postgres)
- [x] Creează schema.prisma complet cu toate modelele:
  - [x] Venue
  - [x] Category
  - [x] Subcategory
  - [x] Product
  - [x] QRCode
  - [x] Admin
- [x] Adaugă indexes pentru performance
- [x] Adaugă relații între modele
- [x] Create TypeScript types (src/types/index.ts)
- [x] Create constants file (src/lib/constants.ts)

### Ziua 8: Database Migration
- [ ] Creează initial migration ⚠️ **PENDING**
  ```bash
  npx prisma migrate dev --name init
  ```
  **Note:** Prisma dev server issues - migrations not run yet
- [ ] Verifică migration în Prisma Studio
  ```bash
  npx prisma studio
  ```
- [ ] Test connection cu database
- [x] Setup Prisma Client în /lib/db.ts

### Ziua 9: Seed Data
- [x] Creează prisma/seed.ts (cu bcrypt pentru Admin)
- [x] Adaugă date pentru:
  - [x] Venue (INFINITY LOUNGE)
  - [x] Categories (BAR, MANCARE, DESERT, etc.)
  - [x] Subcategories (Băuturi Răcoritoare, etc.)
  - [x] Sample products (10-15 produse)
  - [x] Admin user (admin@infinitylounge.ro / admin123)
- [ ] Run seed ⚠️ **PENDING** (requires database migration first)
  ```bash
  npx prisma db seed
  ```
- [ ] Verifică data în Prisma Studio

### Ziua 10: Image Management Setup
- [ ] Creează Cloudinary account (free tier)
- [ ] Configure Cloudinary credentials în .env
  - [ ] CLOUDINARY_CLOUD_NAME
  - [ ] CLOUDINARY_API_KEY
  - [ ] CLOUDINARY_API_SECRET
- [ ] Install next-cloudinary
  ```bash
  npm install next-cloudinary
  ```
- [ ] Creează helper functions pentru:
  - [ ] Upload image
  - [ ] Delete image
  - [ ] Get optimized URL
- [ ] Test upload manual

---

## Deliverables

### Code Deliverables
- [ ] Next.js project complet configurat
- [ ] Tailwind + Shadcn/ui functional
- [ ] Prisma schema definit
- [ ] Database cu seed data
- [ ] Cloudinary integration

### Documentation Deliverables
- [x] README.md complet
- [x] Claude.md pentru context
- [x] Documentație tehnică (arhitectură, design system)
- [x] Plan sprinturi
- [ ] Environment setup guide

### Testing Deliverables
- [ ] Verificat connection database
- [ ] Test Prisma queries
- [ ] Test image upload
- [ ] Lighthouse performance baseline

---

## Definition of Done

### Technical Requirements
- [ ] ✅ Next.js dev server pornește fără erori
- [ ] ✅ TypeScript strict mode activat
- [ ] ✅ Tailwind styles se aplică corect
- [ ] ✅ Database migration succeed
- [ ] ✅ Seed data se încarcă cu success
- [ ] ✅ Cloudinary upload works

### Code Quality
- [ ] ✅ ESLint: 0 errors
- [ ] ✅ Prettier: Code formatted
- [ ] ✅ TypeScript: No type errors
- [ ] ✅ No console warnings

### Documentation
- [ ] ✅ README up to date
- [ ] ✅ Environment variables documented
- [ ] ✅ Setup instructions clear
- [ ] ✅ Code comments where needed

---

## Technical Decisions

### Why Next.js 14?
- Server Components pentru performance
- App Router pentru better routing
- Built-in image optimization
- API routes pentru backend
- Vercel deployment seamless

### Why Prisma?
- Type-safe database queries
- Great developer experience
- Auto-generated migrations
- Prisma Studio pentru database management
- Support pentru PostgreSQL

### Why Tailwind CSS?
- Utility-first approach
- Responsive design easy
- Consistent design system
- Small bundle size (purge unused)
- Great with Shadcn/ui

### Why Cloudinary?
- Free tier generous (25 credits)
- Automatic image optimization
- On-the-fly transformations
- CDN delivery
- Easy Next.js integration

---

## Potential Blockers

### Technical Blockers
| Blocker | Probability | Impact | Mitigation |
|---------|-------------|--------|------------|
| Database connection issues | Low | High | Use Supabase/Railway free tier |
| Cloudinary account limits | Medium | Medium | Optimize images before upload |
| TypeScript configuration | Low | Low | Use strict mode from start |
| Vercel deployment limits | Low | Low | Monitor usage |

### Knowledge Gaps
- [ ] Next.js 14 App Router (if new)
- [ ] Prisma advanced features
- [ ] Cloudinary API
- [ ] TypeScript generics

**Mitigation:** Consult documentation, use Claude Code pentru help

---

## Success Criteria

### Must Have ✅
- [x] Project structure creat
- [ ] Next.js functional
- [ ] Database connected
- [ ] Seed data loaded
- [ ] Image upload works

### Should Have 🎯
- [ ] ESLint configured
- [ ] Prettier configured
- [ ] VS Code optimized
- [ ] Development workflow smooth

### Nice to Have ⭐
- [ ] Git hooks (pre-commit)
- [ ] Automated testing setup
- [ ] Performance monitoring
- [ ] Error tracking (Sentry)

---

## Sprint Metrics

### Velocity Tracking
```
Planned Tasks: 40
Completed: 7 ✅
In Progress: 1 🔄
Remaining: 32 ⏳

Progress: ████░░░░░░ 18%
```

### Time Allocation
```
Documentation:     20% (completed ✅)
Setup & Config:    30%
Database:          30%
Image Management:  10%
Testing & Polish:  10%
```

---

## Daily Standup Template

### What I did yesterday
- Example: Created project documentation

### What I'm doing today
- Example: Initialize Next.js project

### Blockers
- None / [Describe blocker]

---

## Sprint Retrospective (End of Sprint 1)

### What Went Well 🎉
- _To be filled after sprint_

### What Could Be Improved 🔧
- _To be filled after sprint_

### Action Items for Sprint 2 📋
- _To be filled after sprint_

---

**Sprint Owner:** matthew-devOP
**Status:** 🟢 85% Complete (Database migration pending)
**Started:** Ianuarie 2026
**Completed:** Ianuarie 2026 (4 commits)
**Remaining:** Database migration + Cloudinary setup
