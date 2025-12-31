# KITS Ramtek Issue Reporting Portal

## Overview

A full-stack web application for students of Kavikulguru Institute of Technology and Science (KITS), Ramtek to report campus and hostel issues and track their resolution status. The system supports general issue reporting (electricity, water, internet, cleanliness) and confidential anti-ragging reports with anonymous submission options.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript using functional components and hooks
- **Routing**: Wouter for lightweight client-side routing with protected route patterns
- **State Management**: TanStack React Query for server state with custom hooks for data fetching
- **UI Components**: Shadcn/UI component library built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design tokens, Framer Motion for animations
- **Form Handling**: React Hook Form with Zod validation schemas

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **API Design**: REST API with typed route definitions in `shared/routes.ts`
- **Authentication**: Passport.js with local strategy, session-based auth using memory store
- **Password Security**: Scrypt hashing with random salts

### Data Layer
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema Location**: `shared/schema.ts` contains all table definitions with Zod validation
- **Migrations**: Drizzle Kit for database migrations stored in `/migrations`

### Build System
- **Development**: Vite dev server with HMR, tsx for server hot reload
- **Production**: esbuild bundles server code, Vite builds client to `dist/public`
- **Path Aliases**: `@/` maps to client/src, `@shared/` maps to shared folder

### Key Design Patterns
- **Shared Types**: Schema definitions and route types shared between frontend and backend
- **Storage Abstraction**: `IStorage` interface in `server/storage.ts` abstracts database operations
- **Auth Context**: React context provides authentication state throughout the app
- **Protected Routes**: HOC pattern wraps authenticated pages with loading states

## External Dependencies

### Database
- **PostgreSQL**: Primary database, connection via `DATABASE_URL` environment variable
- **connect-pg-simple**: Session storage (configured but using MemoryStore currently)

### Authentication
- **passport**: Authentication middleware
- **passport-local**: Username/password authentication strategy
- **express-session**: Session management

### UI Libraries
- **@radix-ui/***: Headless UI component primitives (dialogs, dropdowns, forms, etc.)
- **framer-motion**: Animation library for page transitions
- **lucide-react**: Icon library
- **date-fns**: Date formatting utilities

### Development Tools
- **Vite**: Frontend build tool with React plugin
- **Drizzle Kit**: Database migration tooling
- **TypeScript**: Type checking across the entire codebase