// src/schemas/admin.schema.ts

import { z } from 'zod';

/**
 * Admin Schema
 * 
 * Purpose:
 * - Centralizes all Zod schemas related to admin routes
 * - Validates query parameters, request bodies, etc.
 * - Supports clean controller logic by enforcing early input validation
 * 
 * Development Mantra:
 * "We build not for today, but for tomorrow and beyond."
 */

const roleEnum = z.enum(['superadmin', 'admin', 'teacher', 'student']);

export const getUsersQuerySchema = z.object({
  search: z.string().min(1).max(100).optional(), // fuzzy match username or email
  role: roleEnum.optional(),                    // single role
  roles: z.array(roleEnum).optional(),          // multi-role

  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(25),

  sortBy: z.enum(['username', 'email', 'createdAt']).default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),

  createdBefore: z.coerce.date().optional(),
  createdAfter: z.coerce.date().optional(),

  includeSuspended: z.coerce.boolean().optional(),
  includeCountOnly: z.coerce.boolean().optional(),
});

// 🧠 Parsed type for controller/service use
export type GetUsersQuery = z.infer<typeof getUsersQuerySchema>;
