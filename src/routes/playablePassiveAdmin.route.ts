// src/routes/characterPassiveAdmin.route.ts

import { FastifyInstance } from 'fastify';
import {
  getAllPassivesHandler,
  createPassiveHandler,
  updatePassiveHandler,
  deletePassiveHandler,
} from '../controllers/adminPlayablePassive.controller';

/**
 * Character Passive Admin Routes
 * 
 * Related Documentation:
 * /docs/backend/character-management-api.md
 * 
 * Purpose:
 * - Enables glossary-level management of passive abilities
 * - All endpoints are protected by `manage_characters` permission
 * 
 * Development Mantra:
 * "We build not for today, but for tomorrow and beyond."
 */

export async function playablePassiveAdminRoutes(app: FastifyInstance) {
  app.register(async function (passiveRoutes) {
    passiveRoutes.addHook('onRequest', async (request, reply) => {
      await request.jwtVerify();

      if (!request.hasPermission('manage_characters')) {
        return reply.status(403).send({ error: 'Forbidden' });
      }
    });

    passiveRoutes.get('/playable/passives', getAllPassivesHandler);
    passiveRoutes.post('/playable/passives', createPassiveHandler);
    passiveRoutes.patch('/playable/passives/:id', updatePassiveHandler);
    passiveRoutes.delete('/playable/passives/:id', deletePassiveHandler);
  }, { prefix: '/admin' });
}
