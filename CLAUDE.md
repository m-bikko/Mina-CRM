# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Mina CRM (Amina) - A CRM and inventory management system for a women's fashion boutique. Built with Next.js 15 (App Router), TypeScript, Tailwind CSS, MongoDB/Mongoose, and Cloudinary for image storage.

## Commands

```bash
npm run dev      # Start development server (localhost:3000)
npm run build    # Production build
npm run start    # Run production server
npm run lint     # Run ESLint
```

## Architecture

### Directory Structure
- `app/` - Next.js App Router pages and API routes
  - `app/admin/` - Admin panel (dashboard, products, supply, sales, delivery, write-off, payment-types, finance)
  - `app/api/` - REST API endpoints
- `components/` - React components (including shadcn/ui primitives in `components/ui/`)
- `lib/` - Utilities, database connection, FIFO logic, Zod validations
- `models/` - Mongoose schemas and TypeScript interfaces

### Key Business Logic

**FIFO Inventory System** (`lib/fifo/`):
- Supplies create `InventoryBatch` records with cost prices
- Sales allocate inventory from oldest batches first via `allocateBatches.ts`
- Each sale item tracks `batchAllocations` for accurate cost calculation

**Snapshot Pattern**:
- Payment type names, tax rates, and commission rates are captured at transaction time
- Protects historical data from future reference changes

### Core Models
- `Product` - Catalog items with sizes, images (Cloudinary), quantities
- `Sale` - Transactions with FIFO batch allocations, delivery info, tax/commission tracking
- `Supply` - Incoming inventory that creates `InventoryBatch` records
- `InventoryBatch` - FIFO tracking with remaining quantities
- `PaymentType` - Payment methods with tax and bank commission rates
- `Transaction` / `FinancialStats` - Financial history and current balance

### API Response Format
```typescript
{ success: boolean; data?: T; error?: string; }
```

## Coding Rules

**Required:**
- Strict TypeScript - no `any`, no `@ts-ignore`
- Named exports over default exports
- Zod validation for all API inputs
- Tailwind CSS utilities only (no custom CSS)
- MongoDB transactions for multi-document operations

**Forbidden:**
- Suppressing ESLint/TypeScript errors without documented justification
- Leaving TODOs unresolved
- Creating new files when editing existing ones would suffice
- Writing code comments (keep code self-explanatory)

## Environment Variables

```
MONGODB_URI_DEV=mongodb+srv://...
MONGODB_URI=mongodb+srv://...
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
```
