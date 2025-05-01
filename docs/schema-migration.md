/**
 * Database Schema and Migration Setup
 * 
 * Related Documentation:
 * /docs/backend/schema-migrations.md
 * 
 * Purpose:
 * - Defines, tracks, and manages the Drizzle ORM schema files for the backend database
 * - Generates and applies SQL migrations to the PlanetScale dev branch
 * - Ensures all schema updates are forward-compatible and PlanetScale-compliant (no foreign keys)
 * 
 * Development Mantra:
 * "We build not for today, but for tomorrow and beyond."
 */

# Database Schema and Migration Setup

## Overview
> This setup manages all database table definitions under Drizzle ORM, organizes schema files by functional domain, and uses Drizzle Kit to generate and push migrations to PlanetScale. It ensures the platform’s evolving data model is tracked, versioned, and applied safely.

## Location
> Path inside the repo:  
Example: `/src/db/schema/` and `/drizzle/`

## Features
- [x] Drizzle ORM schema definitions for all platform areas (users, RPG, quests, lessons, etc.)
- [x] Migration generation and syncing using Drizzle Kit CLI
- [x] PlanetScale-compatible (foreign key constraints removed, dev branch safe)

## Props (if applicable)
| Prop Name | Type | Default | Description |
|:----------|:-----|:--------|:------------|
| N/A       |      |         | This is a backend system layer, not a component |

## Emits (if applicable)
| Event Name | Payload | Description |
|:-----------|:--------|:------------|
| N/A        |         | This is a backend system layer, not a component |

## Dependencies
- `drizzle-orm` — Defines TypeScript schema models
- `drizzle-kit` — CLI for generating and applying SQL migrations
- `mysql2` — Driver used to connect to PlanetScale
- `dotenv` — Loads database credentials from `.env`

## Usage
```bash
# Generate migrations from schema files
npx drizzle-kit generate

# Push migrations to the PlanetScale dev branch
npx drizzle-kit push

# Check the generated files
ls drizzle/
