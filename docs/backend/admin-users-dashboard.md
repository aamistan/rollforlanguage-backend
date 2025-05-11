/\*\*

* Admin User Management System
*
* Related Documentation:
* /docs/frontend/admin-users-dashboard.md
*
* Purpose:
* * Implements complete backend support for admin-level user creation and management
* * Powers the frontend Admin Users Dashboard and User Table tool
* * Provides robust filtering, sorting, search, pagination, and RBAC enforcement
*
* Development Mantra:
* "We build not for today, but for tomorrow and beyond."
  \*/

# Admin User Management System

## Overview

> This system provides a secure, extensible API for superadmins, admins, and teachers to manage users on the platform. It supports creating users with appropriate role-based restrictions, and fetching paginated user lists with advanced filters and sorting.

## Location

> Core logic is split across multiple backend files:
>
> * `/src/routes/admin.route.ts`
> * `/src/controllers/admin.controller.ts`
> * `/src/services/user.service.ts`
> * `/src/schemas/admin.schema.ts`

## Features

* [x] `POST /admin/users` — Securely create new users with role restrictions
* [x] `GET /admin/users` — Fetch paginated user list with:

  * Role filters (`role`, `roles[]`)
  * Fuzzy search (`username`, `email`)
  * Date filtering (`createdBefore`, `createdAfter`)
  * Sorting (`sortBy`, `sortOrder`)
  * Pagination (`page`, `limit`)
  * Inactive user toggle (`includeSuspended`)
  * Count-only toggle (`includeCountOnly`)
* [x] Permission enforcement with `request.hasPermission()`
* [x] JWT auth + global user parsing middleware
* [x] Zod query validation for strong type safety
* [x] Fully typed Swagger documentation

## Props

None

## Emits

None

## Dependencies

* \[drizzle-orm] — Used for querying PlanetScale-backed MySQL schema
* \[zod] — For validating query strings and generating safe types
* \[@fastify/jwt] — Provides JWT parsing and validation for access control
* \[@fastify/swagger] — Used to generate and expose documentation

## Usage

```http
# Create user
POST /admin/users
Authorization: Bearer <accessToken>
Content-Type: application/json

{
  "email": "newuser@example.com",
  "username": "newuser",
  "password": "StrongPassword123!",
  "role": "teacher"
}
```

```http
# Fetch paginated user list
GET /admin/users?page=1&limit=25&sortBy=createdAt&sortOrder=desc&roles[]=teacher&search=aaron
Authorization: Bearer <accessToken>
```

```http
# Count-only query for dashboard metrics
GET /admin/users?includeCountOnly=true&roles[]=student
Authorization: Bearer <accessToken>
```
