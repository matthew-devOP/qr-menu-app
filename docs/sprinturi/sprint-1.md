# Sprint 1: Foundation & Setup

**Durata:** 2 săptămâni (Săptămâna 1-2)
**Obiectiv:** Setup complet al proiectului și fundația tehnică

---

## Obiective Principale

1. ✅ Creare structură documentație completă
2. 🔄 Setup Next.js 14 cu TypeScript
3. 🔄 Configurare Tailwind CSS + Shadcn/ui
4. 🔄 Setup Prisma + PostgreSQL
5. 🔄 Creare schema database
6. 🔄 Setup Cloudinary pentru images

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
- [ ] Initialize Next.js project
  ```bash
  npx create-next-app@latest qr-menu-app \
    --typescript \
    --tailwind \
    --app \
    --src-dir \
    --import-alias "@/*"
  ```
- [ ] Setup Git branching strategy
- [ ] Configure .gitignore
- [ ] Setup .env.example

### Ziua 3-4: Styling & UI Setup
- [ ] Configure Tailwind CSS theme
  - [ ] Custom colors (brand palette)
  - [ ] Typography (Inter, Playfair Display)
  - [ ] Spacing & breakpoints
- [ ] Install & configure Shadcn/ui
  ```bash
  npx shadcn-ui@latest init
  ```
- [ ] Add essential Shadcn components:
  - [ ] Button
  - [ ] Card
  - [ ] Dialog
  - [ ] Input
  - [ ] Select
  - [ ] Form components
- [ ] Setup Lucide React pentru icons
- [ ] Create global.css cu styles

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
- [ ] Install Prisma dependencies
  ```bash
  npm install prisma @prisma/client
  npx prisma init
  ```
- [ ] Configure DATABASE_URL în .env
- [ ] Creează schema.prisma complet cu toate modelele:
  - [ ] Venue
  - [ ] Category
  - [ ] Subcategory
  - [ ] Product
  - [ ] QRCode
  - [ ] Admin
- [ ] Adaugă indexes pentru performance
- [ ] Adaugă relații între modele

### Ziua 8: Database Migration
- [ ] Creează initial migration
  ```bash
  npx prisma migrate dev --name init
  ```
- [ ] Verifică migration în Prisma Studio
  ```bash
  npx prisma studio
  ```
- [ ] Test connection cu database
- [ ] Setup Prisma Client în /lib/db.ts

### Ziua 9: Seed Data
- [ ] Creează prisma/seed.ts
- [ ] Adaugă date pentru:
  - [ ] Venue (INFINITY LOUNGE)
  - [ ] Categories (BAR, MANCARE, DESERT, etc.)
  - [ ] Subcategories (Băuturi Răcoritoare, etc.)
  - [ ] Sample products (10-15 produse)
  - [ ] Admin user (pentru testing)
- [ ] Run seed
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
**Status:** 🟡 In Progress (18% complete)
**Started:** Ianuarie 2026
**Target Completion:** ~2 săptămâni
