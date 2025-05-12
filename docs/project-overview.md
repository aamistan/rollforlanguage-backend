# 🏰 **Roll for Language Backend: Project Overview**

> *“We build not for today, but for tomorrow and beyond.”*

---

## 🌟 **Project Purpose & Vision**

The Roll for Language backend is a modular, scalable Node.js + Fastify system designed to power an immersive, RPG-style language-learning platform.
It handles user management, authentication, fine-grained permissions, real-time features, multilingual support, and integration with a modern frontend, all crafted with long-term maintainability and future expansions in mind.

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

| Area               | Tech                                           |
| ------------------ | ---------------------------------------------- |
| Runtime            | Node.js                                        |
| Web Framework      | Fastify                                        |
| Database           | PlanetScale (MySQL) + Drizzle ORM              |
| Authentication     | JWT (access + refresh tokens) via @fastify/jwt |
| Authorization      | Role-Based Access Control (RBAC)               |
| Real-Time Layer    | Socket.IO                                      |
| API Documentation  | Swagger (via @fastify/swagger + swagger-ui)    |
| Security Hardening | @fastify/helmet, @fastify/rate-limit           |
| CORS               | Centralized config via `/config/cors.ts`       |
| Environment Config | dotenv + zod                                   |
| Monitoring         | Sentry, Vercel logs                            |
| Analytics          | PostHog                                        |

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

* `/drizzle.config.ts`
* `.env`
* `/drizzle/`

Commands:

```bash
npx drizzle-kit generate
npx drizzle-kit push
```

</details>

---

### 2️⃣ Database Seeding Script

<details>
<summary>View details</summary>

✅ Initial roles: `superadmin`, `admin`, `teacher`, `student`
✅ Pre-seeded admin and superadmin users
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

✅ Installed Fastify + plugins (`@fastify/jwt`, `@fastify/swagger`, `@fastify/helmet`, etc.)
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
  └── sockets/
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
✅ Role-based user creation (student/admin/superadmin)
✅ Logout + global logout handling
✅ Full Swagger API documentation
✅ JWT payload returns `id`, `email`, `username`, `role`

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

### 9️⃣ Role-Based Access Control (RBAC)

<details>
<summary>View details</summary>

✅ Centralized role-permission mapping in `/src/utils/permissions.ts`
✅ Fastify request decorator: `request.hasPermission()`
✅ Supports roles: superadmin, admin, teacher, student
✅ Granular permission checks (e.g., `manage_users`, `view_reports`)
✅ Ready for expansion into ABAC (attribute-based access control)

Key Files:

* `/src/utils/permissions.ts`
* `/src/plugins/permissions.plugin.ts`

</details>

---

### 1️⃣️ Admin User Management System

<details>
<summary>View details</summary>

✅ `POST /admin/users` allows superadmins, admins, and teachers to create users within their role scope
✅ `GET /admin/users` fetches paginated, sortable, searchable user data

**Query Features Supported:**

* role & multi-role filters (`role`, `roles[]`)
* fuzzy search on username or email
* sorting (`sortBy`, `sortOrder`)
* pagination (`page`, `limit`)
* date filtering (`createdBefore`, `createdAfter`)
* inactive toggle (`includeSuspended`)
* count-only mode (`includeCountOnly`)

**Security:**

* `request.hasPermission('manage_users')` required to access
* Zod schema validation
* JWT auth enforced

Key Files:

* `/src/routes/admin.route.ts`
* `/src/controllers/admin.controller.ts`
* `/src/services/user.service.ts`
* `/src/schemas/admin.schema.ts`

</details>

---

Here's the ✨ updated block for your **Project Overview** to include the newly completed `GET /admin/users/metrics` endpoint and its backend infrastructure.

You can append this directly after the existing **Admin User Management System** section as **Section 11️⃣**:

---

### 1️⃣1️⃣ Admin User Metrics Endpoint

<details>
<summary>View details</summary>

✅ `GET /admin/users/metrics` returns dashboard-ready user statistics in bulk

**Metrics Returned:**

* `totalUsers` — all users in the system
* `activeUsers` — users with `is_active = true`
* `suspendedUsers` — users with `is_active = false`
* `roles` — object mapping each role to its user count
* `newUsersPast7Days` — count of accounts created in the past 7 days

**Security:**

* JWT auth enforced (`Bearer <accessToken>`)
* Permission required: `request.hasPermission('manage_users')`

Key Files:

* `/src/routes/admin.route.ts`
* `/src/controllers/admin.controller.ts`

</details>

---

## 📋 How to Use This Document

✅ Update this overview **after each major backend milestone**
✅ Reference it during **onboarding, planning, or handoff sessions**
✅ Treat it as the **single source of truth** for backend progress and decisions

---
