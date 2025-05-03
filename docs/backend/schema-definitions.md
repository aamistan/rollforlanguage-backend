/**
 * Database Schema Definitions Setup
 * 
 * Related Documentation:
 * /docs/backend/schema-definitions.md
 * 
 * Purpose:
 * - Defines all backend database tables using Drizzle ORM schema files
 * - Organizes schema files by functional area for clarity and modularity
 * - Prepares the project for generating and pushing migrations to PlanetScale
 * 
 * Development Mantra:
 * "We build not for today, but for tomorrow and beyond."
 */

# Database Schema Definitions

## Overview
> This collection of schema files defines the full backend database structure for the RPG language-learning platform, covering system tables, language learning, RPG mechanics, quests, achievements, social features, and media. It is designed for use with Drizzle ORM and is modularly organized for future scalability and maintainability.

## Location
> `/src/db/schema/`  
Example: `/src/db/schema/core.ts`, `/src/db/schema/lessons.ts`

## Features
- [x] Core system tables: users, roles, sessions, auth providers
- [x] Language learning: languages, lessons, quizzes, questions, answers
- [x] RPG mechanics: characters, stats, skills, abilities, modifiers
- [x] Quests and campaigns: modular objectives and rewards
- [x] Achievements and leaderboards: progress tracking and competition
- [x] Messaging and social: safe, teacher-supervised communication
- [x] Audio and media: student uploads and asset management
- [x] Localization: dynamic translations and UI fallback labels

## Props (if applicable)
| Prop Name | Type | Default | Description |
|:----------|:-----|:--------|:------------|
| N/A       |      |         | This is a backend system layer, not a component |

## Emits (if applicable)
| Event Name | Payload | Description |
|:-----------|:--------|:------------|
| N/A        |         | This is a backend system layer, not a component |

## Dependencies
- `drizzle-orm` — Defines schema models and TypeScript types
- `drizzle-kit` — Generates SQL migrations from schema files
- `mysql2` — Required driver for connecting to PlanetScale via CLI

## Usage
```bash
# Generate SQL migrations from the schema files
npx drizzle-kit generate

# Push generated migrations to the PlanetScale dev branch
npx drizzle-kit push

# Review schema outputs under /drizzle/
ls drizzle/
