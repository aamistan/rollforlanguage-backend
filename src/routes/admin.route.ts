// src/routes/admin.route.ts
import type {} from '../types/fastify';

import { FastifyInstance } from 'fastify';
import {
  createUserHandler,
  getUsersHandler,
  getUserMetricsHandler, // 🆕
} from '../controllers/admin.controller';

/**
 * Admin Routes
 * 
 * Purpose:
 * - Handles administrative endpoints related to user management
 * - Integrates permission gate for superadmin, admin, and teacher controls
 * - Powers user creation and admin dashboard data tools (tables + metrics)
 * 
 * Development Mantra:
 * "We build not for today, but for tomorrow and beyond."
 */

export async function adminRoutes(app: FastifyInstance) {
  app.register(async function (admin) {
    // ✅ Global gate: All /admin routes require JWT + at least one user-management permission
    admin.addHook('onRequest', async (request, reply) => {
      try {
        await request.jwtVerify();
      } catch (err) {
        return reply.status(401).send({ error: 'Unauthorized' });
      }

      const hasManageUsers = request.hasPermission('manage_users');
      const hasCreateStudent = request.hasPermission('create_student');

      if (!hasManageUsers && !hasCreateStudent) {
        return reply.status(403).send({ error: 'Forbidden' });
      }

      // Limit GET /admin/users strictly to admins/superadmins
      if (
        request.method === 'GET' &&
        request.url.startsWith('/users') &&
        !hasManageUsers
      ) {
        return reply.status(403).send({ error: 'Insufficient permissions to view users.' });
      }
    });

    // 🧩 POST /admin/users — create user (RBAC handled in controller)
    admin.post('/users', createUserHandler);

    // 📄 GET /admin/users — paginated list of users (Fastify-safe querystring + Zod fallback in controller)
    admin.get('/users', {
      schema: {
        querystring: {
          type: 'object',
          properties: {
            search: { type: 'string' },
            role: { type: 'string' },
            roles: { type: 'array', items: { type: 'string' } },
            page: { type: 'number' },
            limit: { type: 'number' },
            sortBy: { type: 'string' },
            sortOrder: { type: 'string' },
            createdBefore: { type: 'string', format: 'date-time' },
            createdAfter: { type: 'string', format: 'date-time' },
            includeSuspended: { type: 'boolean' },
            includeCountOnly: { type: 'boolean' },
          },
          additionalProperties: true,
        },
        tags: ['Admin'],
        summary: 'Get paginated list of users for admin dashboard',
        description:
          'Returns filtered, sortable, paginated user data. Supports role filters, date range, and future enhancements.',
      },
      handler: getUsersHandler,
    });

    // 📊 GET /admin/users/metrics — aggregate user stats for dashboard widget
    admin.get('/users/metrics', {
      schema: {
        tags: ['Admin'],
        summary: 'Get user statistics for admin overview widget',
        description:
          'Returns total, active, suspended user counts, role distribution, and new users in the last 7 days.',
      },
      handler: getUserMetricsHandler,
    });
  }, { prefix: '/admin' });
}
