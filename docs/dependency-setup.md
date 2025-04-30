/**
 * Backend Dependency Installation Session
 * 
 * Related Documentation:
 * /docs/backend/dependency-setup.md
 * 
 * Purpose:
 * - Install and track all core, support, and meta dependencies for the backend
 * - Ensure compatibility with devcontainer and Codespaces environments
 * - Establish a clean, modular, and scalable backend foundation
 * 
 * Development Mantra:
 * "We build not for today, but for tomorrow and beyond."
 */

# Backend Dependency Setup (Mini Doc)

## Overview
> This setup initializes all essential dependencies for the Fastify-based backend, including tools for API handling, database access, real-time communication, auth, monitoring, testing, and deployment readiness.

## Location
> Root of backend repo  
Example: `/package.json` and `/node_modules/` (via devcontainer)

## Key Features
- Full Fastify server toolkit (with JWT, CORS, logging, Swagger, etc.)
- PlanetScale + Drizzle ORM integration with Zod validation
- Real-time support via Socket.IO and production readiness tools like Sentry, PostHog, and AWS SDK

## Props
None

## Emits
None

## Usage Example
```bash
# Bootstrapping dev environment inside Codespace
npm install
npm run dev

# All dependencies tracked via git after install
# See commit history for clear dependency rationale
