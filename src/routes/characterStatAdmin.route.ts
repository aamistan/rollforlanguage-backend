// src/routes/characterStatAdmin.route.ts

import { FastifyInstance } from 'fastify';
import {
  getAllStatsHandler,
  createStatHandler,
  updateStatHandler,
  deleteStatHandler,
} from '../controllers/adminCharacterStat.controller';

/**
 * Character Stat Admin Routes
 * 
 * Related Documentation:
 * /docs/backend/character-management-api.md
 * 
 * Purpose:
 * - Enables stat validation, glossary use, and dropdown-driven UI
 * - All routes protected by `manage_characters` permission
 * 
 * Development Mantra:
 * "We build not for today, but for tomorrow and beyond."
 */

export async function characterStatAdminRoutes(app: FastifyInstance) {
  app.register(async function (statRoutes) {
    statRoutes.addHook('onRequest', async (request, reply) => {
      await request.jwtVerify();

      if (!request.hasPermission('manage_characters')) {
        return reply.status(403).send({ error: 'Forbidden' });
      }
    });

    statRoutes.get('/characters/stats', getAllStatsHandler);
    statRoutes.post('/characters/stats', createStatHandler);
    statRoutes.patch('/characters/stats/:id', updateStatHandler);
    statRoutes.delete('/characters/stats/:id', deleteStatHandler);
  }, { prefix: '/admin' });
}
