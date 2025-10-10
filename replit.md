# Fusion Starter - Replit Configuration

## Overview
A production-ready full-stack React application template with integrated Express server, featuring React Router 6 SPA mode, TypeScript, Vitest, Zod and modern tooling.

**Current State:** Fully configured and running on Replit with proper port binding and deployment settings.

## Recent Changes
- **October 10, 2025:** Initial Replit setup completed
  - Configured Vite dev server to use port 5000 (required for Replit)
  - Added Node types to TypeScript configuration
  - Set up development workflow with `pnpm dev`
  - Configured autoscale deployment with build and production commands

## Project Architecture

### Tech Stack
- **Package Manager:** PNPM (v10.14.0)
- **Frontend:** React 18 + React Router 6 (SPA) + TypeScript + Vite
- **Backend:** Express 5 server integrated with Vite dev server
- **Testing:** Vitest
- **UI:** Radix UI + TailwindCSS 3 + Lucide React icons
- **Styling:** TailwindCSS 3 with custom theming in `client/global.css`

### Project Structure
```
client/                   # React SPA frontend
├── pages/                # Route components (Index.tsx = home)
├── components/ui/        # Pre-built UI component library
├── App.tsx              # App entry point with SPA routing setup
└── global.css           # TailwindCSS theming and global styles

server/                   # Express API backend
├── index.ts             # Main server setup (express config + routes)
├── routes/              # API handlers
└── node-build.ts        # Production server entry point

shared/                   # Types used by both client & server
└── api.ts               # Shared API interfaces
```

### Key Features
- **Single-port development:** Vite dev server with Express middleware integration
- **Full hot reload:** Both client and server code in development
- **API endpoints:** Prefixed with `/api/`
- **Path aliases:** `@/*` for client, `@shared/*` for shared code
- **Type-safe API:** Shared TypeScript interfaces between client and server

## Replit Configuration

### Development Setup
- **Port:** 5000 (configured in `vite.config.ts`)
- **Host:** `::` (IPv6/all-interface binding for Replit)
- **Workflow:** `pnpm dev` starts Vite dev server with Express middleware
- **HMR:** Auto-configured by Vite (no manual override needed)

### Deployment (Production)
- **Target:** Autoscale (stateless application)
- **Build:** `pnpm build` (builds client SPA + server bundle)
  - Client output: `dist/spa/`
  - Server output: `dist/server/`
- **Run:** `pnpm start` (runs Node server on PORT env var, defaults to 3000)
- **Server:** Serves API routes and static SPA files

### Environment Variables
Configure any required environment variables in Replit Secrets:
- `PORT` - Auto-set by Replit in production
- `PING_MESSAGE` - Example env var for `/api/ping` endpoint
- Add any additional API keys or secrets as needed

## Development Commands

```bash
pnpm dev        # Start dev server (client + server on port 5000)
pnpm build      # Production build (client + server)
pnpm start      # Start production server
pnpm typecheck  # TypeScript validation
pnpm test       # Run Vitest tests
```

## User Preferences
- **Package Manager:** Prefer PNPM for all package operations
- **Code Style:** TypeScript throughout, Tailwind for styling
- **Server Routes:** Only create API endpoints when strictly necessary (e.g., for private keys, DB operations)

## Important Notes

### Vite Configuration
- **Port 5000 is required** for Replit frontend workflow
- **Host `::`** preserves IPv4/IPv6 binding compatible with Replit
- **No HMR override** - Vite auto-negotiates WebSocket correctly with Replit's proxy

### TypeScript Configuration
- Node types added to `tsconfig.json` for server-side code
- `vite/client` types for Vite-specific features
- Path aliases configured for `@/` and `@shared/` imports

### Adding Features

#### New API Route
1. Create shared interface in `shared/api.ts` (optional)
2. Create route handler in `server/routes/`
3. Register route in `server/index.ts`
4. Use in React components with type safety

#### New Page Route
1. Create component in `client/pages/`
2. Add route in `client/App.tsx` before the catch-all `*` route

### Deployment Notes
- Autoscale deployment automatically handles scaling based on traffic
- Server binds to `process.env.PORT` in production (Replit sets this)
- All static SPA assets are served from `dist/spa/`
- API routes handled by Express server at `/api/*`
