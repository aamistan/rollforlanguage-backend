// src/routes/characterTagAdmin.route.ts

import { FastifyInstance } from 'fastify';
import {
  getAllTagsHandler,
  createTagHandler,
  updateTagHandler,
  deleteTagHandler,
} from '../controllers/adminCharacterTag.controller';

/**
 * Character Tag Admin Routes
 * 
 * Related Documentation:
 * /docs/backend/character-management-api.md
 * 
 * Purpose:
 * - Enables frontend tag browsing, autocompletion, editing, and removal
 * - All endpoints are protected and require `manage_characters` permission
 * 
 * Development Mantra:
 * "We build not for today, but for tomorrow and beyond."
 */

export async function characterTagAdminRoutes(app: FastifyInstance) {
  app.register(async function (tagRoutes) {
    tagRoutes.addHook('onRequest', async (request, reply) => {
      await request.jwtVerify();

      if (!request.hasPermission('manage_characters')) {
        return reply.status(403).send({ error: 'Forbidden' });
      }
    });

    tagRoutes.get('/characters/tags', getAllTagsHandler);
    tagRoutes.post('/characters/tags', createTagHandler);
    tagRoutes.patch('/characters/tags/:id', updateTagHandler);
    tagRoutes.delete('/characters/tags/:id', deleteTagHandler);
  }, { prefix: '/admin' });
}
