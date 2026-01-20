# Technology Stack Analysis - QR Menu App

## Table of Contents

1.  [Frontend Technologies](#frontend-technologies)
2.  [Backend Architecture](#backend-architecture)
3.  [Build and Development Tools](#build-and-development-tools)
4.  [Architecture Decisions](#architecture-decisions)

## Frontend Technologies

### Core Framework
**Next.js v16.1.1**
-   **Purpose**: A full-stack React framework providing the application shell, routing, and server capabilities.
-   **Rationale**: Chosen for its robust **App Router** architecture which offers React Server Components (RSC) by default, significantly reducing client-side JavaScript bundles and improving First Contentful Paint (FCP) - critical for mobile menu loading performance.
-   **Key Features**:
    -   **Server Actions**: For streamlined form submissions (Login, Reviews) without separate API route boilerplate.
    -   **Image Optimization**: `next/image` allows serving WebP images resized for specific device viewports.

### UI Library & Styling
**React v19 & Tailwind CSS v4.1.18**
-   **Components**: Built on **Radix UI** primitives (`@radix-ui/react-slot`) ensures accessibility (a11y) compliance for screen readers.
-   **Styling**: **Tailwind CSS** provides a utility-first approach, enabling rapid UI development and easy theming (via CSS variables) for Dark Mode support.
-   **Icons**: **Lucide React** (`v0.562.0`) for a consistent, lightweight SVG icon set (Eye, Trash2, Edit, Plus).
-   **Feedback**: **Sonner** (`v2.0.7`) for high-performance, stackable toast notifications.

## Backend Architecture

### Database Layer
**PostgreSQL & Prisma ORM v7.2.0**
-   **Database**: PostgreSQL is utilized for its relational integrity, essential for the structured hierarchy of Menus (Venue -> Category -> Subcategory -> Product).
-   **ORM**: **Prisma** provides type-safe database queries. The schema (`schema.prisma`) defines relationships and automatically generates TypeScript types, ensuring the frontend and backend are always in sync.
-   **Key Features**:
    -   `@default(cuid())`: Collision-resistant IDs for distributed systems.
    -   `Json` types: Used for storing flexible configuration data (`Venue.theme`, `Product.nutritionInfo`).

### Authentication
**NextAuth.js v4.24.13**
-   **Purpose**: Secure session management.
-   **Implementation**: Configured with `CredentialsProvider` for admin access.
-   **Security**: Uses `bcryptjs` (`v3.0.3`) for server-side password hashing. Sessions are protected via secure, HTTP-only JWT cookies.

## Build and Development Tools

### Compiler & Configuration
**TypeScript v5.9.3**
-   **Strict Mode**: Enabled strict type checking (`tsconfig.json`) to catch null/undefined errors at compile time, ensuring application stability.
-   **Alias Paths**: Configured (`@/components`, `@/lib`) for clean imports and better maintainability.

### Asset Generation
**QRCode** (`qrcode` v1.5.4)
-   **Purpose**: Server-side generation of QR code images.
-   **Usage**: Generates high-quality SVG/PNG data URIs that link directly to specific menu URLs.

### Package Management
**npm** (Node Package Manager)
-   **Scripts**:
    -   `dev`: Starts the Turbo-charged Next.js development server.
    -   `prisma:generate`: Updates TS types based on schema changes.
    -   `prisma:migrate`: Applies SQL migrations to the database.

## Architecture Decisions

### React Server Components (RSC)
-   **Decision**: Adopt the Next.js App Router model.
-   **Why**: Menu content is largely static per session. Rendering it on the server reduces the payload sent to mobile devices (often on 4G networks), resulting in near-instant load times.
-   **Benefit**: Better SEO indexing for menu items, allowing them to appear in Google Search results.

### Modular "Admin" vs "Public" Separation
-   **Decision**: Route groups (folder structure) separate `admin/` logic from public `[categorySlug]` views.
-   **Why**: Security boundary implementation. Middleware efficiently blocks `/admin` paths without affecting public route performance.
-   **Scalability**: Allows distinct layouts (Dashboard Sidebar vs. Public Header) without complex conditional logic.

### Utility-First CSS (Tailwind)
-   **Decision**: Use Tailwind over CSS-in-JS (Styled Components).
-   **Why**: **Zero-runtime overhead**. Styles are compiled to static CSS at build time, improving runtime performance on low-end mobile devices common in hospitality settings.
-   **Maintenance**: `tailwind-merge` and `clsx` utilities allow for creating reusable, resilient UI components (`Button`, `Card`) that accept dynamic class overrides.
