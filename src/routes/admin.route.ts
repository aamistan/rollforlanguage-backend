// src/routes/admin.route.ts
import type {} from '../types/fastify';

import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { createUserHandler, getUsersHandler } from '../controllers/admin.controller';
import { getUsersQuerySchema } from '../schemas/admin.schema';

export async function adminRoutes(app: FastifyInstance) {
  app.register(async function (admin) {
    // ✅ Auth + permission gate
    admin.addHook('onRequest', async (request, reply) => {
      try {
        await request.jwtVerify(); // Populate request.user
      } catch (err) {
        return reply.status(401).send({ error: 'Unauthorized' });
      }

      const hasManageUsers = request.hasPermission('manage_users');
      const hasCreateStudent = request.hasPermission('create_student');

      // Only allow access to /admin routes if they have *some* user permissions
      if (!hasManageUsers && !hasCreateStudent) {
        return reply.status(403).send({ error: 'Forbidden' });
      }

      // Limit GET /admin/users to only manage_users
      if (
        request.method === 'GET' &&
        request.url.startsWith('/users') &&
        !hasManageUsers
      ) {
        return reply.status(403).send({ error: 'Insufficient permissions to view users.' });
      }
    });

    // ✅ POST /admin/users — add new user
    admin.post('/users', createUserHandler);

    // ✅ GET /admin/users — admin-facing user table API
    admin.get('/users', {
      schema: {
        querystring: getUsersQuerySchema,
        response: {
          200: {
            type: 'object',
            properties: {
              data: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: { type: 'string' },
                    username: { type: 'string' },
                    email: { type: 'string' },
                    role: { type: 'string' },
                    createdAt: { type: 'string', format: 'date-time' },
                  },
                  required: ['id', 'username', 'email', 'role', 'createdAt'],
                },
              },
              pagination: {
                type: 'object',
                properties: {
                  total: { type: 'number' },
                  page: { type: 'number' },
                  limit: { type: 'number' },
                  totalPages: { type: 'number' },
                },
                required: ['total', 'page', 'limit', 'totalPages'],
              },
            },
            required: ['data', 'pagination'],
          },
        },
        tags: ['Admin'],
        summary: 'Get paginated list of users for admin dashboard',
        description:
          'Returns user records with optional filters, search, role filters, date ranges, and pagination controls.',
      },
      handler: getUsersHandler,
    });
  }, { prefix: '/admin' });
}
