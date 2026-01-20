# Application Overview - QR Menu App

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Business Problem](#business-problem)
3. [Solution Overview](#solution-overview)
4. [System Architecture](#system-architecture)
5. [Data Flow](#data-flow)
6. [Key Entities and Relationships](#key-entities-and-relationships)
7. [Efficiency Improvements](#efficiency-improvements)

## Executive Summary

**QR Menu App** is a modern, enterprise-grade digital menu platform designed for "Infinity Lounge" and scalable to other hospitality venues. Developed to replace static physical menus, this solution offers a dynamic, interactive, and contactless dining experience.

The application empowers restaurant owners to manage their offerings in real-time while providing customers with an instant, rich, and accessible digital menu via QR codes. It significantly reduces operational costs associated with printing, enhances the customer experience with detailed product information (allergens, nutrition), and streamlines the ordering process through intuitive navigation.

**Value Proposition**: "Instant updates, zero printing costs, and a premium digital experience for modern diners."

## Business Problem

### Challenge

Traditional hospitality venues face significant operational inefficiencies with physical menus:

1.  **Static Content**: Updating prices or items requires costly reprinting and physical replacement.
2.  **Limited Information**: Physical space constrains the ability to show detailed descriptions, high-quality images, allergens, and nutritional values.
3.  **Hygiene Concerns**: Physical menus are high-touch surfaces requiring constant sanitization.
4.  **Operational Lag**: "Sold out" items remain on the menu, leading to customer disappointment and waiter friction.
5.  **Language Barriers**: Single-language menus alienate international guests.

### Impact

-   **Financial Loss**: Recurring printing costs and lost revenue from outdated pricing.
-   **Customer Dissatisfaction**: Frustration over unavailable items or lack of dietary information.
-   **Operational Inefficiency**: Staff time wasted explaining dishes or apologizing for out-of-stock items.

## Solution Overview

### How the Application Works

The QR Menu App provides a seamless dual-interface workflow:

#### Stage 1: Content Management (Admin)

-   **Dashboard Central**: Administrators access a secure dashboard to manage the entire venue profile.
-   **Dynamic Catalog**: Create and organize Categories (Drinks, Food) and Subcategories with drag-and-drop ordering.
-   **Product Management**: Detailed item entry including prices, ingredients, allergens (critical for compliance), and high-resolution imagery.
-   **QR Generation**: Generate unique, trackable QR codes for specific tables or areas (Bar, Terrace).

#### Stage 2: Customer Experience (Public)

-   **Instant Access**: Guests scan a QR code to instantly load the application without downloads.
-   **Interactive Browsing**: Users navigate a responsive, branded interface (e.g., "Infinity Lounge") to explore offerings.
-   **Rich Details**: Clicking a product reveals full specs—calories, allergens, and vivid photos.
-   **Bilingual Support**: Instant toggle between Romanian (RO) and English (EN).

## System Architecture

### High-Level Architecture

The application is built on a modern **Next.js** framework, tailored for performance and SEO.

```mermaid
graph TD
    Client[Client Device (Mobile/Desktop)]
    Admin[Admin Dashboard]
    
    subgraph "Application Layer (Next.js 16)"
        Router[App Router]
        API[API Routes / Server Actions]
        Auth[NextAuth.js]
    end
    
    subgraph "Data Layer"
        Prisma[Prisma ORM]
        DB[(PostgreSQL Database)]
    end
    
    Client -->|HTTP/HTTPS| Router
    Admin -->|Secure Auth| Auth
    Auth --> Router
    Router --> API
    API --> Prisma
    Prisma --> DB
```

### Component Architecture

-   **Frontend**: React Server Components (RSC) for performance, with Client Components for interactivity (Modals, Forms).
-   **Styling**: **Tailwind CSS** with **Radix UI** primitives ensures a consistent, accessible design system.
-   **Database Access**: Type-safe database interactions via **Prisma Client**.
-   **Image Handling**: Optimized image serving for fast load times on mobile networks.

## Data Flow

### Primary Data Flow Sequence

1.  **Admin Update**: Admin updates a price in the Dashboard.
2.  **Persistence**: Data is validated and written to PostgreSQL via Prisma.
3.  **Revalidation**: Next.js cache is invalidated for relevant menu pages.
4.  **Customer View**: Next customer scan serves the updated content immediately via Server Components.

### State Management

-   **Server State**: Managed via Next.js App Router caching and revalidation strategies.
-   **Client State**: React `useState` and `useEffect` for interactive UI elements (Modals, Toasts).
-   **URL State**: Navigation and selection state maintained in URL parameters for shareability.

## Key Entities and Relationships

Core data models defined in `prisma/schema.prisma`:

### Core Entities

```typescript
// Venue - The root entity for multi-tenancy support
interface Venue {
  id: string;
  slug: string; // URL friendly identifier
  theme: Json;  // Custom branding
  isActive: boolean;
}

// Category - High-level menu sections
interface Category {
  id: string;
  venueId: string;
  nameRo: string;
  nameEn: string;
  products: Product[];
  subcategories: Subcategory[];
}

// Product - The menu item
interface Product {
  id: string;
  categoryId: string;
  price: Decimal;
  allergens: string[];
  nutritionInfo: Json; // Flexible structure for complex data
  isAvailable: boolean;
}
```

### Entity Relationships

-   **Venue 1:N Category**: A venue has multiple categories.
-   **Category 1:N Product**: Categories contain products (Cascade delete enabled).
-   **Category 1:N Subcategory**: Categories can be further divided.
-   **Venue 1:N QRCode**: Venues manage their own QR codes.

## Efficiency Improvements

### Quantifiable Metrics

| Metric | Traditional Menu | QR Menu App | Improvement |
| :--- | :--- | :--- | :--- |
| **Update Time** | 3-5 Business Days (Print) | Instant (< 1 sec) | **99.9% Faster** |
| **Update Cost** | $100+ per batch | $0 | **100% Savings** |
| **Content Depth** | Limited by paper size | Unlimited scroll | **Infinite** |
| **Error Correction** | Reprint required | Instant Edit | **Immediate** |

### Business Impact

-   **Regulatory Compliance**: Native support for declaring allergens and nutritional info ensures compliance with food safety laws (e.g., EU Order 201/2022).
-   **Upselling**: High-quality images and "Featured" status flags drive sales of high-margin items.
-   **Brand Perception**: Modern, "Infinity Lounge" branded interface elevates the customer perception of the venue.
-   **Sustainability**: Elimination of paper waste aligns with eco-friendly business practices.
