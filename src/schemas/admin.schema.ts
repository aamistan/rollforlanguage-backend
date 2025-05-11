// src/schemas/admin.schema.ts

import { z } from 'zod';

/**
 * Admin Schema
 * 
 * Related Documentation:
 * /docs/frontend/admin-user-system.md
 * 
 * Purpose:
 * - Centralizes all Zod schemas related to admin routes
 * - Validates query parameters, request bodies, etc.
 * - Supports clean controller logic by enforcing early input validation
 * 
 * Development Mantra:
 * "We build not for today, but for tomorrow and beyond."
 */

// 🧭 Role definitions shared across platform
const roleEnum = z.enum(['superadmin', 'admin', 'teacher', 'student']);

/**
 * Zod schema for GET /admin/users query parameters
 * NOTE: `.default()` was intentionally omitted to maintain Fastify compatibility.
 * Defaults are handled in the controller to avoid JSON Schema validation errors.
 */
export const getUsersQuerySchema = z.object({
  // 🔍 Search query
  search: z.string().min(1).max(100).optional(),

  // 🧩 Role filters
  role: roleEnum.optional(),               // single-role filter
  roles: z.array(roleEnum).optional(),     // multi-role filter (future-ready)

  // 📄 Pagination
  page: z.coerce.number().min(1).optional(),
  limit: z.coerce.number().min(1).max(100).optional(),

  // 📊 Sorting
  sortBy: z.enum(['username', 'email', 'createdAt']).optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),

  // 📅 Date range filters
  createdBefore: z.coerce.date().optional(),
  createdAfter: z.coerce.date().optional(),

  // ⚙️ Modifier flags
  includeSuspended: z.coerce.boolean().optional(),
  includeCountOnly: z.coerce.boolean().optional(),
});

// 🧠 Inferred type for use in controllers/services
export type GetUsersQuery = z.infer<typeof getUsersQuerySchema>;
