# 🏰 **Roll for Language Frontend: Project Overview**

> *“We build not for today, but for tomorrow and beyond.”*

---

## 🌟 **Project Purpose & Vision**

The Roll for Language frontend is a modular, scalable Vue 3 application designed to deliver an immersive, gamified language-learning experience. Built for global deployment, it integrates responsive layouts, internationalization, real-time features, and continuous deployment pipelines — all guided by a forward-thinking clean architecture philosophy.

---

## 🏹 **Guiding Mantra**

> Every component, script, and deployment decision is made to support long-term growth, modularity, and maintainability. We don’t just code for today’s needs; we architect for tomorrow’s expansions — scalable, international, and game-ready.

1. We build clean code.
2. We build optimized code.
3. We build using best practices.
4. We build modernly.
5. We write our wish list of tools/components/features…then make it so!
We ask the questions:
What are the must-haves? What are the should-haves? What are the would-be-nice-to-haves?
After we answer those questions, we include all of them! We build not for today, but for tomorrow and beyond.

---

## 💻 **Tech Stack**

Frontend Framework	Vue 3 + Vite + Tailwind CSS
Frontend Hosting	Vercel
Backend Language	Node.js
Backend Hosting	Railway
API Structure	Fastify
Real-Time Layer	Socket.IO
Database	PlanetScale
Authentication	JWT
Static Asset Hosting	Vercel + GitHub
i18n Support	Vue I18n + JSON + Strapi (future)
Audio Features	Web MediaRecorder + Backblaze B2
Monitoring	Sentry + Vercel logs
Analytics	PostHog

---
# Backend Project Overview

**Project:** Roll for Language — Fantasy RPG Language Learning Platform
**Backend:** Node.js + Fastify + PlanetScale + Drizzle ORM + JWT + Socket.IO

**Development Mantra:**

> *We build not for today, but for tomorrow and beyond.*

---

## Purpose

This document tracks and summarizes each backend component completed in the project.
It serves as a master reference and onboarding overview at the start of each new backend development phase or chat.
It is meant to evolve — update it as new components are built.

---

## Completed Components

---

### 1️⃣ Database Connection & Drizzle Configuration

<details>
<summary>View details</summary>

**Overview:**
Establishes a secure, version-controlled connection between the backend and PlanetScale using Drizzle ORM and Drizzle Kit.

**Location:**

* `/drizzle.config.ts`
* `.env`
* `/drizzle/`

**Key Features:**
✅ Secure `.env`-based credentials
✅ Drizzle Kit CLI (≥0.21)
✅ Verified PlanetScale connection

**Dependencies:**

* `drizzle-orm`
* `drizzle-kit`
* `mysql2`
* `dotenv`

**Usage:**

```bash
npx drizzle-kit generate
npx drizzle-kit push
npx drizzle-kit introspect
```

</details>

---

### 2️⃣ Database Seeding Script

<details>
<summary>View details</summary>

**Overview:**
Populates essential initial records like roles, admin users, and supported languages.

**Location:**

* `/src/db/seeds/seed.ts`

**Key Features:**
✅ Predefined roles (`superadmin`, `admin`, `teacher`, `student`)
✅ Core user accounts
✅ Base languages (English, German)
✅ Safe ID generation with `idGenerator`

**Dependencies:**

* `mysql2`
* `drizzle-orm/mysql2`
* `idGenerator` (internal)

**Usage:**

```bash
npx ts-node src/db/seeds/seed.ts
```

</details>

---

### 3️⃣ Backend Dependency Setup

<details>
<summary>View details</summary>

**Overview:**
Sets up and installs all core backend dependencies for the Fastify server stack.

**Location:**

* `/package.json`
* `/node_modules/` (devcontainer)

**Key Features:**
✅ Fastify core (JWT, CORS, logging, Swagger)
✅ PlanetScale + Drizzle ORM + Zod
✅ Real-time (Socket.IO) + monitoring tools (Sentry, PostHog)

**Usage Example:**

```bash
npm install
npm run dev
```

</details>

---

### 4️⃣ DevContainer & VSCode Extensions Setup

<details>
<summary>View details</summary>

**Overview:**
Prepares the `devcontainer.json` and recommends/installs Codespaces-compatible VSCode extensions for backend development.

**Location:**

* `.devcontainer/devcontainer.json`

**Key Features:**
✅ Pre-configured for Node.js, Fastify, PlanetScale, JWT, Socket.IO stack
✅ Auto-loads backend developer tools

</details>

---

### 5️⃣ Database Schema Definitions

<details>
<summary>View details</summary>

**Overview:**
Defines all backend database tables using Drizzle ORM, organized by functional area.

**Location:**

* `/src/db/schema/`

**Key Features:**
✅ Core: users, roles, sessions, auth
✅ Learning: languages, lessons, quizzes, questions, answers
✅ RPG: characters, stats, skills, abilities, modifiers
✅ Quests, achievements, social, media, localization

**Dependencies:**

* `drizzle-orm`
* `drizzle-kit`
* `mysql2`

**Usage:**

```bash
npx drizzle-kit generate
npx drizzle-kit push
ls drizzle/
```

</details>

---

### 6️⃣ Database Schema & Migration Setup

<details>
<summary>View details</summary>

**Overview:**
Manages schema definitions and migration flow for the evolving data model.

**Location:**

* `/src/db/schema/`
* `/drizzle/`

**Key Features:**
✅ PlanetScale-compatible migrations (no foreign keys)
✅ Drizzle CLI for generation and push

**Dependencies:**

* `drizzle-orm`
* `drizzle-kit`
* `mysql2`
* `dotenv`

**Usage:**

```bash
npx drizzle-kit generate
npx drizzle-kit push
ls drizzle/
```

</details>

---

### 7️⃣ Backend Directory Structure

<details>
<summary>View details</summary>

**Overview:**
Organizes the backend codebase for modularity, maintainability, and scalability.

**Location:**

* `/backend/src/`

**Key Features:**
✅ Structured folders: `routes`, `controllers`, `schemas`, `plugins`, `services`, `db`, `sockets`
✅ Supports Fastify, JWT, Zod, Socket.IO, Swagger
✅ Includes placeholder scaffolding command

**Usage Example:**

```bash
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
```

</details>

---

## How to Use This Document

✅ Update this document after each **new backend component** is completed.
✅ Review this document at the **start of each backend-focused chat or planning session**.
✅ Use this as the **single source of truth** for backend implementation progress.

---