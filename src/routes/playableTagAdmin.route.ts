// src/routes/characterTagAdmin.route.ts

import { FastifyInstance } from 'fastify';
import {
  getAllTagsHandler,
  createTagHandler,
  updateTagHandler,
  deleteTagHandler,
  patchTagActiveHandler, // 🆕 Soft delete / restore
} from '../controllers/adminPlayableTag.controller';

/**
 * Character Tag Admin Routes
 * 
 * Related Documentation:
 * /docs/backend/character-management-api.md
 * 
 * Purpose:
 * - Enables frontend tag browsing, autocompletion, editing, and removal
 * - Supports soft-deletion and reactivation of tags via isActive flag
 * - All endpoints are protected and require `manage_characters` permission
 * 
 * Development Mantra:
 * "We build not for today, but for tomorrow and beyond."
 */

export async function playableTagAdminRoutes(app: FastifyInstance) {
  app.register(async function (tagRoutes) {
    tagRoutes.addHook('onRequest', async (request, reply) => {
      await request.jwtVerify();

      if (!request.hasPermission('manage_characters')) {
        return reply.status(403).send({ error: 'Forbidden' });
      }
    });

    // Core CRUD
    tagRoutes.get('/playable/tags', getAllTagsHandler);
    tagRoutes.post('/playable/tags', createTagHandler);
    tagRoutes.patch('/playable/tags/:id', updateTagHandler);
    tagRoutes.delete('/playable/tags/:id', deleteTagHandler);

    // 🔁 Soft-delete and restore toggle
    tagRoutes.patch('/playable/tags/:id/active', patchTagActiveHandler);
  });
}
