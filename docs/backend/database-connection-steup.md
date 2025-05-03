/**
 * Database Connection & Drizzle Configuration Setup
 * 
 * Related Documentation:
 * /docs/backend/database-connection-setup.md
 * 
 * Purpose:
 * - Sets up initial connection between the backend and PlanetScale database
 * - Configures Drizzle ORM (≥0.21) and Drizzle Kit CLI for schema management and migrations
 * - Prepares local development environment with secure .env-driven database credentials
 * 
 * Development Mantra:
 * "We build not for today, but for tomorrow and beyond."
 */

# Database Connection & Drizzle Configuration

## Overview
> Establishes a secure, version-controlled connection between the backend and PlanetScale using Drizzle ORM and Drizzle Kit. This forms the foundation for defining, migrating, and managing the project’s MySQL schema.

## Location
> `/drizzle.config.ts`  
> `.env` (root of repo)  
> `/drizzle/` (migration + schema output folder)

## Features
- [x] Secure `.env`-based database configuration
- [x] Drizzle Kit CLI aligned with latest ≥0.21 schema (no deprecated fields)
- [x] Verified PlanetScale connection using `npx drizzle-kit introspect`

## Props (if applicable)
| Prop Name | Type | Default | Description |
|:----------|:-----|:--------|:------------|
| N/A       |      |         | This is a system configuration file, no props apply |

## Emits (if applicable)
| Event Name | Payload | Description |
|:-----------|:--------|:------------|
| N/A        |         | This is a system configuration file, no events apply |

## Dependencies
- `drizzle-orm` — ORM library used for schema + query management
- `drizzle-kit` — CLI tool used for migrations and introspection
- `mysql2` — MySQL driver required for CLI migrations
- `dotenv` — Loads `.env` variables for secure credential handling

## Usage
```bash
# Generate migration + schema after writing schema files
npx drizzle-kit generate

# Push migrations to PlanetScale
npx drizzle-kit push

# Introspect the live PlanetScale schema
npx drizzle-kit introspect
