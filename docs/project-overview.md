Here’s the fully prepared, ready-to-paste
**`/docs/backend/project-overview.md`** with everything we’ve built so far:

---

````markdown
# 🏰 **Roll for Language Backend: Project Overview**

> *“We build not for today, but for tomorrow and beyond.”*

---

## 🌟 **Project Purpose & Vision**

The Roll for Language backend is a modular, scalable Node.js + Fastify system designed to power an immersive, RPG-style language-learning platform.  
It handles user management, authentication, real-time features, multilingual support, and integration with a modern frontend, all crafted with long-term maintainability and future expansions in mind.

---

## 🏹 **Guiding Mantra**

> Every module, service, and deployment choice is made to future-proof the platform, ensuring scalability, security, and adaptability as the product evolves.

1. We build clean code.
2. We build optimized code.
3. We follow best practices.
4. We use modern architectures.
5. We design for growth, not just today’s needs.

We continuously ask:  
✅ What are the must-haves?  
✅ What are the should-haves?  
✅ What are the would-be-nice-to-haves?

And we commit to building **all of them** thoughtfully.

---

## 💻 **Backend Tech Stack**

| Area                | Tech                                        |
|---------------------|--------------------------------------------|
| Runtime             | Node.js                                     |
| Web Framework       | Fastify                                     |
| Database            | PlanetScale (MySQL) + Drizzle ORM           |
| Authentication      | JWT (access + refresh tokens) via @fastify/jwt |
| Real-Time Layer     | Socket.IO                                   |
| API Documentation   | Swagger (via @fastify/swagger + swagger-ui) |
| Environment Config  | dotenv + zod                                |
| Monitoring          | Sentry, Vercel logs                         |
| Analytics           | PostHog                                     |

---

## ✅ Completed Components

---

### 1️⃣ Database Connection & Drizzle Configuration

<details>
<summary>View details</summary>

✅ `.env` integration with secure credential loading  
✅ Drizzle ORM + PlanetScale CLI setup  
✅ Verified database connection

Key Files:
- `/drizzle.config.ts`
- `.env`
- `/drizzle/`

Commands:
```bash
npx drizzle-kit generate
npx drizzle-kit push
````

</details>

---

### 2️⃣ Database Seeding Script

<details>
<summary>View details</summary>

✅ Initial roles: `superadmin`, `admin`, `teacher`, `student`
✅ Pre-seeded admin user
✅ Uses internal `idGenerator` for unique IDs

Key File:

* `/src/db/seeds/seed.ts`

Command:

```bash
npx ts-node src/db/seeds/seed.ts
```

</details>

---

### 3️⃣ Backend Dependency Setup

<details>
<summary>View details</summary>

✅ Installed Fastify + plugins (`@fastify/jwt`, `@fastify/swagger`, etc.)
✅ Installed dev tools (`ts-node`, `nodemon`, `eslint`, etc.)
✅ Audit-cleaned (or flagged for watch) security vulnerabilities

Key File:

* `/package.json`

Command:

```bash
npm install
npm run dev
```

</details>

---

### 4️⃣ DevContainer & VSCode Extensions Setup

<details>
<summary>View details</summary>

✅ Devcontainer configured for Node.js 20 backend
✅ Recommends essential Codespaces-compatible VSCode extensions

Key File:

* `.devcontainer/devcontainer.json`

</details>

---

### 5️⃣ Database Schema Definitions

<details>
<summary>View details</summary>

✅ Users, roles, sessions, auth providers
✅ Modular schema organization under `/src/db/schema/`
✅ Ready for future learning, RPG, and social modules

Dependencies:

* `drizzle-orm`
* `drizzle-kit`

</details>

---

### 6️⃣ Database Migration & Management

<details>
<summary>View details</summary>

✅ CLI-driven migrations
✅ PlanetScale-friendly (avoids foreign keys)
✅ Auto-generates SQL via Drizzle Kit

Commands:

```bash
npx drizzle-kit generate
npx drizzle-kit push
```

</details>

---

### 7️⃣ Backend Directory Structure

<details>
<summary>View details</summary>

✅ Modular directories:

```
/src
  ├── config/
  ├── plugins/
  ├── routes/
  ├── controllers/
  ├── services/
  ├── schemas/
  ├── db/
  ├── utils/
  ├── sockets/
```

✅ Scaffolding script used to pre-create folders and placeholders

</details>

---

### 8️⃣ Authentication System (Access + Refresh Tokens)

<details>
<summary>View details</summary>

✅ Modular routes, controllers, services
✅ JWT-based access + refresh tokens
✅ Bcrypt password hashing
✅ Role-based user creation (student/admin)
✅ Logout + global logout handling
✅ Full Swagger API documentation

Key Files:

* `/src/routes/auth.route.ts`
* `/src/controllers/auth.controller.ts`
* `/src/services/auth.service.ts`
* `/src/plugins/jwt.plugin.ts`

✅ Tested via:

```bash
curl -X POST http://localhost:3000/auth/signup
curl -X POST http://localhost:3000/auth/login
```

✅ Swagger UI live at:

```
http://localhost:3000/docs
```

</details>

---

### 9️⃣ Swagger / OpenAPI Documentation

<details>
<summary>View details</summary>

✅ Integrated `@fastify/swagger` + `@fastify/swagger-ui`
✅ Converts Zod schemas into Swagger-compatible schemas
✅ Documents all auth endpoints with descriptions, tags, request bodies, and responses
✅ Example payloads for developers

Access:

```
http://localhost:3000/docs
```

</details>

---

### 🔟 Environment & Secrets Management

<details>
<summary>View details</summary>

✅ Centralized `env.ts` file
✅ Uses `zod` to validate required environment variables
✅ Halts server boot if any critical env vars are missing or invalid

Key File:

* `/src/config/env.ts`

</details>

---

## 📋 How to Use This Document

✅ Update this overview **after each major backend milestone**
✅ Reference it during **onboarding, planning, or handoff sessions**
✅ Treat it as the **single source of truth** for backend progress and decisions

---

