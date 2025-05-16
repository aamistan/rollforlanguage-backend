// src/routes/characterStatAdmin.route.ts

import { FastifyInstance } from 'fastify';
import {
  getAllStatsHandler,
  createStatHandler,
  updateStatHandler,
  deleteStatHandler,
  patchStatActiveHandler, // 🆕 soft-delete / restore
} from '../controllers/adminPlayableStat.controller';

/**
 * Character Stat Admin Routes
 * 
 * Related Documentation:
 * /docs/backend/character-management-api.md
 * 
 * Purpose:
 * - Enables stat validation, glossary use, and dropdown-driven UI
 * - Supports soft-deletion and reactivation of stats via isActive flag
 * - All routes protected by `manage_characters` permission
 * 
 * Development Mantra:
 * "We build not for today, but for tomorrow and beyond."
 */

export async function playableStatAdminRoutes(app: FastifyInstance) {
  app.register(async function (statRoutes) {
    statRoutes.addHook('onRequest', async (request, reply) => {
      await request.jwtVerify();

      if (!request.hasPermission('manage_characters')) {
        return reply.status(403).send({ error: 'Forbidden' });
      }
    });

    statRoutes.get('/playable/stats', getAllStatsHandler);
    statRoutes.post('/playable/stats', createStatHandler);
    statRoutes.patch('/playable/stats/:id', updateStatHandler);
    statRoutes.delete('/playable/stats/:id', deleteStatHandler);

    // 🔁 Soft-delete and restore toggle
    statRoutes.patch('/playable/stats/:id/active', patchStatActiveHandler);
  }, { prefix: '/admin' });
}
