/**
 * Database Seeding Script
 * 
 * Related Documentation:
 * /docs/backend/database-seeding.md
 * 
 * Purpose:
 * - Populates essential initial data into the database (roles, admin users, languages)
 * - Uses mysql2 + drizzle-orm/mysql2 adapter for reliable Node.js server execution
 * - Integrates internal utilities like idGenerator for secure ID creation
 * 
 * Development Mantra:
 * "We build not for today, but for tomorrow and beyond."
 */

# Seed Script

## Overview
> This script sets up the initial required records in the database, such as system roles, a superadmin user, an admin user, and supported languages. It ensures the platform has its foundational data in place after migrations.

## Location
> Path to the component inside the repo.  
Example: `/src/db/seeds/seed.ts`

## Features
- [x] Insert predefined roles (`superadmin`, `admin`, `teacher`, `student`)
- [x] Insert core user accounts for superadmin and admin
- [x] Insert base languages (English, German)
- [x] Uses idGenerator utility for safe random ID creation

## Dependencies
- `mysql2` — Database connection pooling
- `drizzle-orm/mysql2` — ORM layer for structured queries
- `idGenerator` (internal) — Utility to generate unique IDs

## Usage
```bash
# Run the seed script
npx ts-node src/db/seeds/seed.ts
