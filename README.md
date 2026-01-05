# 🍽️ QR Smart Menu App - INFINITY LOUNGE

Aplicație web modernă de meniu digital interactiv pentru restaurante și lounge-uri, accesibilă prin cod QR.

## 📋 Descriere

Sistem complet de meniu digital care permite clienților să acceseze meniul restaurantului prin scanarea unui cod QR. Aplicația oferă o experiență interactivă cu navigare pe trei niveluri: **Categorii** → **Subcategorii** → **Produse**.

### ✨ Caracteristici Principale

- 📱 **Mobile-First Design** - Optimizat pentru smartphone-uri
- 🔄 **Navigare Ierarhică** - Structură logică pe 3 niveluri
- 🖼️ **Imagini HD** - Poze atractive pentru fiecare produs
- 🌍 **Multi-lingvistic** - Suport RO/EN
- 📊 **Admin Panel** - Gestionare facilă a meniului
- 🎨 **Design Modern** - UI/UX profesional cu Tailwind CSS
- ⚡ **Performanță** - Image optimization & caching
- 🔐 **Securitate** - Autentificare admin & protecție API

## 🛠️ Stack Tehnologic

### Frontend
- **Next.js 14+** (App Router)
- **TypeScript**
- **Tailwind CSS** + **Shadcn/ui**
- **React Query** pentru state management

### Backend
- **Next.js API Routes**
- **Prisma ORM**
- **PostgreSQL**

### Servicii Externe
- **Cloudinary** - Image storage & optimization
- **Vercel** - Hosting & deployment
- **NextAuth.js** - Authentication

## 📁 Structura Proiectului

```
qr-menu-app/
├── app/                    # Next.js App Router
│   ├── api/               # API endpoints
│   ├── admin/             # Admin panel
│   └── [locale]/          # Public menu pages
├── components/            # React components
│   ├── ui/               # Shadcn components
│   ├── menu/             # Menu-specific components
│   └── admin/            # Admin components
├── lib/                   # Utilities & helpers
├── prisma/               # Database schema & migrations
├── public/               # Static assets
└── docs/                 # Documentation
    ├── plan-detaliat.md
    ├── arhitectura.md
    ├── design-system.md
    └── sprinturi/
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- PostgreSQL 14+
- npm sau yarn

### Instalare

```bash
# Clone repository
git clone https://github.com/matthew-devOP/qr-menu-app.git
cd qr-menu-app

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
# Edit .env cu configurările tale

# Setup database
npx prisma migrate dev

# Seed initial data
npx prisma db seed

# Start development server
npm run dev
```

Aplicația va fi disponibilă la `http://localhost:3000`

## 📖 Documentație

Documentația completă este disponibilă în folder-ul `/docs`:

- [**Plan Detaliat**](docs/plan-detaliat.md) - Planificare completă a proiectului
- [**Arhitectură**](docs/arhitectura.md) - Detalii tehnice & decizii arhitecturale
- [**Design System**](docs/design-system.md) - Componente UI & guidelines
- [**API Documentation**](docs/api/endpoints.md) - Endpoint-uri & exemple
- [**Sprinturi**](docs/sprinturi/overview.md) - Planificare & tracking

## 🎯 Roadmap

### ✅ Sprint 1 - Foundation (Săptămâna 1-2)
- Setup proiect Next.js
- Configurare Prisma & Database
- Componente UI de bază
- Homepage cu categorii

### 🔄 Sprint 2 - Core Features (Săptămâna 3-4)
- Navigation flow complet
- Pagini categorii & produse
- Breadcrumb navigation
- Product modal

### 📋 Sprint 3 - Admin Panel (Săptămâna 5-6)
- Authentication
- CRUD categorii
- CRUD produse
- Image upload

### 🚀 Sprint 4 - Advanced Features (Săptămâna 7-8)
- QR Code generator
- Multi-language support
- Search & filters
- Analytics dashboard

### 🎨 Sprint 5 - Polish & Deploy (Săptămâna 9-10)
- Testing & optimization
- SEO optimization
- Deployment
- Documentation

## 👥 Contribuție

Proiectul este dezvoltat de matthew-devOP cu asistența Claude Code.

## 📄 Licență

Acest proiect este proprietate privată.

## 📞 Contact

Pentru întrebări sau sugestii, contactați echipa de dezvoltare.

---

**Status:** 🟡 In Development
**Versiune:** 0.1.0 (Alpha)
**Ultima actualizare:** Ianuarie 2026
