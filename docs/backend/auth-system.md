✅ Absolutely! Here's the **fully updated `/docs/backend/auth-system.md`** reflecting **everything we've built so far**, including **authentication**, **authorization with RBAC**, **permissions integration**, and even **backend CORS + security hardening**.

I've incorporated:

* The **modular CORS config (via `/config/cors.ts`)**
* The **permissions plugin decorator**
* Our current **role/permissions model**
* Additional **logging and debugging hooks**
* Any missing or outdated details

---

### ✅ **Here’s the final cleaned version ready to paste:**

```markdown
/**
 * Authentication & Authorization System (Backend)
 * 
 * Related Documentation:
 * /docs/backend/auth-system.md
 * 
 * Purpose:
 * - Provides secure, JWT-based authentication for the Roll for Language platform
 * - Integrates Fastify routes, services, controllers, plugins, and utilities
 * - Adds fine-grained Role-Based Access Control (RBAC) for scalable multi-role management
 * - Ensures security hardening via helmet, rate limiting, CORS, and future extensibility
 * 
 * Development Mantra:
 * "We build not for today, but for tomorrow and beyond."
 */

# Authentication & Authorization System

## Overview
> The authentication and authorization system is the backbone of user identity, session control, and permission management on the platform.  
> It handles account creation, login, token issuance, session invalidation, fine-grained role-based access, and anti-abuse protections, while maintaining clean separation across routes, controllers, services, plugins, and utils.

## 📂 Location
Core system lives in:
- `/src/routes/auth.route.ts` → Route registration + Swagger schema
- `/src/controllers/auth.controller.ts` → Request handling logic
- `/src/services/auth.service.ts` → Business logic (DB queries, password checks)
- `/src/plugins/jwt.plugin.ts` → JWT signing/verification
- `/src/plugins/permissions.plugin.ts` → Fastify decorator for permission checks
- `/src/utils/permissions.ts` → Centralized role-permission mapping
- `/src/config/cors.ts` → Centralized CORS configuration
- `/src/config/env.ts` → Centralized environment loading with Zod validation

---

## ✅ Features
- [x] **User signup** → Creates user, hashes password, assigns default role
- [x] **User login** → Validates credentials, issues JWT access token
- [x] **Token refresh** → Issues new access token using refresh token
- [x] **Logout** → Invalidates refresh token for a single session
- [x] **Global logout** → Invalidates all user sessions
- [x] **RBAC permissions** → Per-role permission checking via `hasPermission()`
- [x] **Swagger integration** → Auto-generated API docs with live testing
- [x] **CORS via config file** → Centralized, environment-ready allowed origins
- [x] **Security headers (helmet)** → Built-in hardening
- [x] **Rate limiter** → Request throttling via @fastify/rate-limit
- [x] **.env validation** → Boot-time schema validation via Zod

---

## 🏗️ Architecture Flow

```

\[Client Request]
↓
\[Fastify Route → auth.route.ts]
↓
\[Controller → auth.controller.ts]
↓
\[Service → auth.service.ts]
↓
\[Database → Drizzle ORM → PlanetScale]
↓
\[JWT Generation + Response]

````

---

## 🏹 Role-Based Access Control (RBAC)

**Roles supported:**
| Role        | Description                                |
|-------------|------------------------------------------|
| superadmin  | Full access, system-level control         |
| admin       | Manage users, campaigns, reports         |
| teacher     | Manage campaigns, view reports           |
| student     | Submit progress, view own data           |

**Permissions are defined in `/src/utils/permissions.ts`:**
```ts
superadmin: [ 'manage_users', 'manage_campaigns', 'view_reports', 'system_settings', 'full_access' ],
admin: [ 'manage_users', 'manage_campaigns', 'view_reports' ],
teacher: [ 'manage_campaigns', 'view_reports' ],
student: [ 'submit_progress' ],
````

Permissions are exposed in request handlers via:

```ts
if (!request.hasPermission('manage_users')) {
  return reply.status(403).send({ error: 'Forbidden' });
}
```

---

## 🔌 Dependencies

| Purpose           | Package                      |
| ----------------- | ---------------------------- |
| JWT auth          | @fastify/jwt                 |
| OpenAPI docs      | @fastify/swagger, swagger-ui |
| Password hashing  | bcrypt                       |
| Schema validation | zod, zod-to-json-schema      |
| Database ORM      | drizzle-orm                  |
| Rate limiting     | @fastify/rate-limit          |
| CORS              | @fastify/cors (via config)   |
| Security headers  | @fastify/helmet              |

---

## 🚀 Usage

### Registering Routes

```ts
import { authRoutes } from './routes/auth.route';
app.register(authRoutes, { prefix: '/auth' });
```

---

### Protecting Routes with Permissions

```ts
if (!request.hasPermission('manage_users')) {
  return reply.status(403).send({ error: 'Forbidden' });
}
```

---

### Sample Signup Request

`POST /auth/signup`

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

### Sample Login Request

`POST /auth/login`

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

✅ `accessToken` includes `id`, `email`, `username`, `role` in JWT payload
(optional `genderIdentity` and `pronouns` can be added if needed)

---

### Swagger Access

Visit:

```
http://localhost:3000/docs
```

→ Provides complete auth API documentation with live testing.

---

## 📝 Quick Commands

| Command                                  | Purpose                      |
| ---------------------------------------- | ---------------------------- |
| `npm run dev`                            | Start backend in dev mode    |
| `npx drizzle-kit push`                   | Push DB schema updates       |
| `npx ts-node src/db/seeds/seed.ts`       | Run DB seed script           |
| `curl -X POST http://localhost:3000/...` | Test auth endpoints manually |

---

## 📈 Future Expansions

| Best Practice          | Next Steps                                     |
| ---------------------- | ---------------------------------------------- |
| Limit token lifespan   | Add 2FA/MFA                                    |
| RBAC foundation        | Consider ABAC or role inheritance              |
| JWT payload minimalism | Expand claims or signed attributes as needed   |
| Security hardening     | Consider JWT revocation, blacklist, encryption |

---

## ✅ Summary

The authentication & authorization system is:
✅ Modular
✅ Secure
✅ Swagger-documented
✅ RBAC-enabled
✅ Ready for frontend integration & production hardening
✅ Built for long-term scalability

> *“We build not for today, but for tomorrow and beyond.”*

```
