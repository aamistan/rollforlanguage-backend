Here’s the full, ready-to-paste **`/docs/backend/auth-system.md`**:

---

```markdown
/**
 * Authentication System (Backend)
 * 
 * Related Documentation:
 * /docs/backend/auth-system.md
 * 
 * Purpose:
 * - Provides secure, JWT-based authentication for the Roll for Language platform
 * - Integrates Fastify routes, services, and controllers using modular clean architecture
 * - Enables future expansions like real-time auth updates, multi-factor auth, and role-based controls
 * 
 * Development Mantra:
 * "We build not for today, but for tomorrow and beyond."
 */

# Authentication System

## Overview
> The authentication system is the backbone of user identity and session control on the platform.  
> It manages account creation, login, secure token issuance, and session invalidation while maintaining clear separation of concerns across routes, controllers, and services.

## Location
> Core auth system lives in:  
> - `/src/routes/auth.route.ts` → Route registration + Swagger schema  
> - `/src/controllers/auth.controller.ts` → Request handling logic  
> - `/src/services/auth.service.ts` → Business logic (DB queries, password checks)  
> - `/src/plugins/jwt.plugin.ts` → JWT signing/verification  
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

## Dependencies
- **bcrypt** → Secure password hashing (12 salt rounds)
- **@fastify/jwt** → Fast JWT signing/verification attached to Fastify reply
- **@fastify/swagger** → OpenAPI doc generator
- **@fastify/swagger-ui** → Swagger web UI under `/docs`
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

### Refresh Example

`POST /auth/refresh`

Header:

```
Authorization: Bearer <accessToken>
```

Body:

```json
{
  "refreshToken": "abc123refresh..."
}
```

Response:

```json
{
  "accessToken": "newAccessToken...",
  "refreshToken": "newRefreshToken..."
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

| Best Practice                | Future Plans                               |
| ---------------------------- | ------------------------------------------ |
| Use `.env` + Zod validation  | Add encryption for refresh tokens          |
| Limit JWT token lifespan     | Add 2FA or MFA hooks                       |
| Centralize auth services     | Introduce admin/teacher user roles         |
| Document all APIs in Swagger | Expand real-time auth events via Socket.IO |

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

The authentication system is now:
✅ Modular
✅ Secure
✅ Swagger-documented
✅ Ready for future real-time and multi-role expansions

Keep the dev mantra close:

> *“We build not for today, but for tomorrow and beyond.”*

---
