/**
 * Backend Directory Structure Setup
 * 
 * Related Documentation:
 * /docs/backend/structure-overview.md
 * 
 * Purpose:
 * - Defines a clean, scalable, and future-ready directory structure for the backend
 * - Integrates support for Fastify plugins, Drizzle ORM, JWT auth, Socket.IO, Swagger docs, and more
 * - Includes a terminal command to scaffold the structure with placeholder files
 * 
 * Development Mantra:
 * "We build not for today, but for tomorrow and beyond."
 */

# Backend Directory Structure (Mini Doc)

## Overview
> This structure organizes the backend codebase for modularity, maintainability, and future scalability across services like auth, real-time, monitoring, and analytics.

## Location  
> Root backend path.  
Example: `/backend/src/`

## Key Features
- Modular folders for `routes`, `controllers`, `schemas`, `plugins`, `services`, `db`, `sockets`, and more
- Integrates with Fastify, PlanetScale (via Drizzle ORM), JWT, Zod, and Socket.IO
- Supports auto-generated Swagger docs, environment configs, and structured testing

## Props  
None

## Emits  
None

## Usage Example
```bash
# Terminal command to scaffold structure
mkdir -p src/{config,plugins,routes,controllers,schemas,db/{schema,seeds},services,utils,types,sockets} tests/{integration,unit} && \
touch src/{app.ts,server.ts} \
src/config/{env.ts,cors.ts,rateLimit.ts} \
src/plugins/{jwt.plugin.ts,swagger.plugin.ts,sentry.plugin.ts,sensible.plugin.ts} \
src/routes/{index.ts,hello.route.ts} \
src/controllers/hello.controller.ts \
src/schemas/hello.schema.ts \
src/db/index.ts src/db/schema/users.ts src/db/seeds/seed.ts \
src/services/{auth.service.ts,s3.service.ts,posthog.service.ts} \
src/utils/logger.ts \
src/types/index.d.ts \
src/sockets/index.ts \
tests/integration/hello.integration.test.ts \
tests/unit/hello.unit.test.ts
