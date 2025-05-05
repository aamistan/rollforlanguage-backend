✅ Here’s the fully updated **`/docs/backend/auth-system.md`** reflecting the work we’ve done in this chat, including the RBAC foundation and permissions integration.

---

```markdown
/**
 * Authentication & Authorization System (Backend)
 * 
 * Related Documentation:
 * /docs/backend/auth-system.md
 * 
 * Purpose:
 * - Provides secure, JWT-based authentication for the Roll for Language platform
 * - Integrates Fastify routes, services, and controllers using modular clean architecture
 * - Adds fine-grained Role-Based Access Control (RBAC) for scalable multi-role management
 * 
 * Development Mantra:
 * "We build not for today, but for tomorrow and beyond."
 */

# Authentication & Authorization System

## Overview
> The authentication and authorization system is the backbone of user identity, session control, and permission management on the platform.  
> It handles account creation, login, token issuance, session invalidation, and fine-grained role-based access, while maintaining clean separation across routes, controllers, services, and plugins.

## Location
> Core system lives in:  
> - `/src/routes/auth.route.ts` → Route registration + Swagger schema  
> - `/src/controllers/auth.controller.ts` → Request handling logic  
> - `/src/services/auth.service.ts` → Business logic (DB queries, password checks)  
> - `/src/plugins/jwt.plugin.ts` → JWT signing/verification  
> - `/src/plugins/permissions.plugin.ts` → Fastify decorator for permission checks  
> - `/src/utils/permissions.ts` → Centralized role-permission mapping  
> - `/src/config/env.ts` → Centralized environment loading with Zod validation

---

## Features
- [x] **User signup** → Creates user, hashes password, assigns role
- [x] **User login** → Validates credentials, issues JWT access token
- [x] **Token refresh** → Issues new access token using refresh token
- [x] **Logout** → Invalidates refresh token for single session
- [x] **Global logout** → Invalidates all user sessions
- [x] **Swagger integration** → API docs with live endpoint testing
- [x] **.env validation** → Prevents booting with missing secrets or configs
- [x] **Fine-grained RBAC** → Checks permissions using a Fastify request decorator

---

## Key Flow Diagram

```

\[Client Request]
↓
\[Fastify Route (auth.route.ts)]
↓
\[Controller (auth.controller.ts)]
↓
\[Service (auth.service.ts)]
↓
\[Database (Drizzle ORM → PlanetScale)]
↓
\[Response + JWT Issuance]

````

---

## Role-Based Access Control (RBAC)

- **Roles supported:**
  - `superadmin` → full access, system-level control
  - `admin` → manage users, campaigns, reports
  - `teacher` → manage campaigns, view reports
  - `student` → submit progress, view own data

- **Permissions:**
  Managed via:
  - `/src/utils/permissions.ts` → defines which actions each role can perform
  - `/src/plugins/permissions.plugin.ts` → exposes `request.hasPermission(permission)` for routes to use

---

## Dependencies
- **bcrypt** → Secure password hashing (12 salt rounds)
- **@fastify/jwt** → Fast JWT signing/verification attached to Fastify reply
- **@fastify/swagger** → OpenAPI doc generator
- **@fastify/swagger-ui** → Swagger web UI under `/docs`
- **@fastify/helmet** → Security headers for anti-abuse hardening
- **@fastify/rate-limit** → Request throttling
- **zod** → Strong schema validation for env + request body
- **zod-to-json-schema** → Converts Zod schemas to Swagger-friendly JSON
- **drizzle-orm** → Structured, type-safe SQL queries (no raw SQL)
- **PlanetScale** → Serverless production database

---

## Usage

### Registering Routes
```ts
import { authRoutes } from './routes/auth.route';

app.register(authRoutes, { prefix: '/auth' });
````

---

### Protecting Routes with RBAC

```ts
if (!request.hasPermission('manage_users')) {
  return reply.status(403).send({ error: 'Forbidden', message: 'You do not have permission.' });
}
```

---

### Signup Example

`POST /auth/signup`

Request Body:

```json
{
  "email": "user@example.com",
  "username": "mycoolusername",
  "password": "StrongPass123!"
}
```

Response:

```json
{
  "message": "User created successfully",
  "user": {
    "id": "abc123",
    "email": "user@example.com",
    "username": "mycoolusername",
    "roleId": "student"
  }
}
```

---

### Login Example

`POST /auth/login`

Request Body:

```json
{
  "email": "user@example.com",
  "password": "StrongPass123!"
}
```

Response:

```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6...",
  "refreshToken": "abc123refresh..."
}
```

---

### Swagger Access

Visit:

```
http://localhost:3000/docs
```

✅ Provides a full list of auth routes with live testing capabilities.

---

## Best Practices + Future Expansions

| Best Practice                | Future Plans                                            |
| ---------------------------- | ------------------------------------------------------- |
| Use `.env` + Zod validation  | Add encryption for refresh tokens                       |
| Limit JWT token lifespan     | Add 2FA or MFA hooks                                    |
| Centralize auth services     | Expand admin/teacher/student workflows                  |
| Document all APIs in Swagger | Expand real-time auth events via Socket.IO              |
| Fine-grained RBAC            | Build ABAC (attribute-based access) or role hierarchies |

---

## Quick Commands

| Command                                  | Purpose                                  |
| ---------------------------------------- | ---------------------------------------- |
| `npm run dev`                            | Start backend in dev mode                |
| `npx drizzle-kit push`                   | Push DB schema updates                   |
| `npx ts-node src/db/seeds/seed.ts`       | Run DB seed script (initial roles/users) |
| `curl -X POST http://localhost:3000/...` | Test auth endpoints manually             |

---

## Summary

The authentication and authorization system is now:
✅ Modular
✅ Secure
✅ RBAC-enabled
✅ Swagger-documented
✅ Ready for future real-time and multi-role expansions

Keep the dev mantra close:

> *“We build not for today, but for tomorrow and beyond.”*

---

