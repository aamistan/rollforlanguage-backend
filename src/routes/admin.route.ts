// src/routes/admin.route.ts

import { FastifyInstance } from 'fastify';
import { createUserHandler } from '../controllers/admin.controller';

export async function adminRoutes(app: FastifyInstance) {
  // Protect entire admin route namespace
  app.register(async function (admin) {
    admin.addHook('onRequest', async (request, reply) => {
      if (!request.user) {
        return reply.status(401).send({ error: 'Unauthorized' });
      }
      if (
        !request.hasPermission('manage_users') &&
        !request.hasPermission('create_student')
      ) {
        return reply.status(403).send({ error: 'Forbidden' });
      }
    });

    admin.post('/users', createUserHandler);
  }, { prefix: '/admin' });
}
