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

### Option A: Docker (Recommended)

```bash
# Clone and enter directory
git clone https://github.com/matthew-devOP/qr-menu-app.git
cd qr-menu-app

# Copy environment file
cp .env.example .env

# Start with Docker
docker compose up -d

# Run migrations and seed
docker compose exec app npx prisma db push
docker compose exec app npx prisma db seed
```

Aplicația va fi disponibilă la **http://localhost:3009** 🎉

### Option B: Local Development

#### Prerequisites

### Instalare Pas cu Pas

#### 1. Clone Repository

```bash
git clone https://github.com/matthew-devOP/qr-menu-app.git
cd qr-menu-app
```

#### 2. Install Dependencies

```bash
npm install
# sau
yarn install
```

#### 3. Setup Environment Variables

```bash
# Copy example file
cp .env.example .env

# Edit .env cu un editor de text
# nano .env
# sau
# code .env
```

**Configurări minime necesare:**

```env
# Database (required)
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/qr_menu_app"

# App URL (required)
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# NextAuth Secret (required - generate a secure key)
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"
```

**Generare NextAuth Secret:**
```bash
openssl rand -base64 32
```

#### 4. Setup Database

**Opțiunea A: PostgreSQL Local**

```bash
# Create database
createdb qr_menu_app

# Run Prisma migrations
npm run prisma:migrate

# Seed database cu date sample
npm run prisma:seed
```

**Opțiunea B: Cloud Database (Supabase/Railway)**

1. Creează cont pe [Supabase](https://supabase.com) sau [Railway](https://railway.app)
2. Creează un nou proiect PostgreSQL
3. Copiază connection string în `.env` la `DATABASE_URL`
4. Run migrations:
   ```bash
   npm run prisma:migrate
   npm run prisma:seed
   ```

#### 5. Start Development Server

```bash
npm run dev
# sau
yarn dev
```

Aplicația va fi disponibilă la **http://localhost:3000** 🎉

#### 6. (Optional) Open Prisma Studio

Pentru a vizualiza și edita datele din database:

```bash
npm run prisma:studio
```

### Verificare Setup

După pornirea serverului, verifică:

- ✅ Homepage se încarcă la http://localhost:3000
- ✅ Prisma Studio funcționează (dacă l-ai pornit)
- ✅ Nu apar erori în consolă

### Comenzi Disponibile

```bash
# Development
npm run dev              # Start dev server (cu hot reload)

# Database
npm run prisma:generate  # Generate Prisma Client
npm run prisma:migrate   # Run database migrations
npm run prisma:seed      # Seed database cu date sample
npm run prisma:studio    # Open Prisma Studio GUI

# Build & Production
npm run build            # Build pentru producție
npm run start            # Start production server

# Code Quality
npm run lint             # Run ESLint
npm run type-check       # Check TypeScript errors
```

### Troubleshooting

**Eroare: "Can't reach database server"**
- Verifică dacă PostgreSQL rulează: `pg_isready`
- Verifică DATABASE_URL în .env
- Verifică username/password/port

**Eroare: "Prisma Client not generated"**
```bash
npm run prisma:generate
```

**Eroare: "Module not found"**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Port 3000 deja folosit**
```bash
# Schimbă portul
PORT=3001 npm run dev
```

## 📖 Documentație

Documentația completă este disponibilă în folder-ul `/docs`:

- [**Plan Detaliat**](docs/plan-detaliat.md) - Planificare completă a proiectului
- [**Arhitectură**](docs/arhitectura.md) - Detalii tehnice & decizii arhitecturale
- [**Design System**](docs/design-system.md) - Componente UI & guidelines
- [**API Documentation**](docs/API_DOCUMENTATION.md) - Endpoint-uri & exemple
- [**Current Status**](docs/CURRENT_IMPLEMENTATION_STATUS.md) - Status implementare
- [**Changelog**](docs/CHANGELOG.md) - Istoricul versiunilor
- [**Development Log**](docs/DEVELOPMENT_LOG.md) - Jurnal sesiuni de lucru

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

**Status:** 🟢 Production Ready
**Versiune:** 0.3.0
**Ultima actualizare:** Februarie 2026
