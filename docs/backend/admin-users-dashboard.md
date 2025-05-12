/**
 * Admin User Management System
 * 
 * Related Documentation:
 * /docs/frontend/admin-users-dashboard.md
 * 
 * Purpose:
 * - Implements full backend support for admin-level user creation, querying, and dashboard metrics
 * - Integrates JWT authentication, RBAC permission checks, and query validation with Zod
 * - Enables the Admin Users Dashboard and associated tools with secure, extensible endpoints
 * 
 * Development Mantra:
 * "We build not for today, but for tomorrow and beyond."
 */

# Admin User Management System

## Overview
> Provides secure endpoints for creating, listing, and analyzing users. Supports role-based restrictions (superadmin/admin/teacher), query validation, pagination, and real-time metrics for the Admin Dashboard.

## Location
> Core logic spans multiple files:  
> `/src/routes/admin.route.ts`  
> `/src/controllers/admin.controller.ts`  
> `/src/services/user.service.ts`  
> `/src/schemas/admin.schema.ts`

## Endpoints / Methods
| Endpoint/Method         | HTTP Verb | Description                                        |
|-------------------------|-----------|----------------------------------------------------|
| `/admin/users`          | POST      | Create a new user (with RBAC restrictions)         |
| `/admin/users`          | GET       | Fetch paginated, sortable, filtered user list      |
| `/admin/users/metrics`  | GET       | Retrieve user stats for dashboard overview widget  |

## Inputs (Parameters/Arguments)
| Name             | Type     | Required | Description                                                |
|------------------|----------|----------|------------------------------------------------------------|
| `email`          | String   | Yes      | Email of the new user (POST)                               |
| `username`       | String   | Yes      | Username for the new user (POST)                           |
| `password`       | String   | Yes      | Password to be hashed for new user (POST)                  |
| `role`           | String   | Yes      | Role to assign (must follow creator’s RBAC rules) (POST)   |
| `search`         | String   | No       | Fuzzy match username or email (GET)                        |
| `role` / `roles` | String[] | No       | Filter by single or multiple roles (GET)                   |
| `page`           | Number   | No       | Page number for pagination (default: 1)                    |
| `limit`          | Number   | No       | Items per page (default: 25, max: 100)                     |
| `sortBy`         | String   | No       | Field to sort by: `username`, `email`, `createdAt`         |
| `sortOrder`      | String   | No       | Sort direction: `asc` or `desc`                            |
| `createdBefore`  | Date     | No       | Return users created before this date                      |
| `createdAfter`   | Date     | No       | Return users created after this date                       |
| `includeSuspended` | Boolean | No      | Include inactive (suspended) users                         |
| `includeCountOnly` | Boolean | No      | Return only total count of matching users (no data array)  |

## Outputs / Returns
| Return Type             | Description                                                  |
|-------------------------|--------------------------------------------------------------|
| `UserObject`            | Response after user creation (201 Created)                   |
| `PaginatedUserList`     | Object with `data[]` and `pagination` info (GET /users)      |
| `UserMetricsResponse`   | Aggregated stats (GET /users/metrics): totals, roles, recent |

## Error Handling
| Error Type         | HTTP Status | Scenario                                              |
|--------------------|-------------|-------------------------------------------------------|
| `ValidationError`  | 400         | Missing or malformed input fields                     |
| `ForbiddenError`   | 403         | Creator lacks permission to assign given role         |
| `AuthError`        | 401         | Missing or invalid JWT access token                   |
| `DuplicateUser`    | 400         | Attempted to create a user with an existing email     |
| `InternalError`    | 500         | Unexpected DB or logic failure                        |

## Dependencies
- **External Libraries**
  - `drizzle-orm` — Query builder/ORM for PlanetScale-backed MySQL
  - `zod` — Input schema validation for queries and payloads
  - `@fastify/jwt` — Handles access token verification and decoding
  - `@fastify/swagger` — API documentation for dev/test environments

- **Internal Modules**
  - `permissions.plugin.ts` — Adds `request.hasPermission()` decorator
  - `auth.service.ts` — Handles user lookup and password hashing
  - `user.service.ts` — Encapsulates paginated querying logic

## Environment Variables
| Variable Name | Default | Description                        |
|---------------|---------|------------------------------------|
| `JWT_SECRET`  | none    | Required for signing/verifying JWT |
| `DB_URL`      | none    | PlanetScale database connection    |

## Example Usage

```http
# Create new teacher account (admin or superadmin only)
POST /admin/users
Authorization: Bearer <accessToken>
Content-Type: application/json

{
  "email": "julia@school.edu",
  "username": "frauleinJ",
  "password": "securePassword123",
  "role": "teacher"
}
