// src/routes/playableClassAdmin.route.ts
import { FastifyInstance } from 'fastify';
import {
  getAllPlayableClassesHandler,
  getPlayableClassByIdHandler,
  createPlayableClassHandler,
  updatePlayableClassHandler,
  deletePlayableClassHandler,
} from '../controllers/adminPlayableClass.controller';

/**
 * Playable Class Management Admin Routes
 * 
 * Related Documentation:
 * /docs/backend/character-management-api.md
 * 
 * Purpose:
 * - Registers all admin endpoints for managing RPG playable classes
 * - Applies permission-based access control for `manage_characters`
 * - Powers dashboard CRUD operations, filters, and summaries
 * 
 * Development Mantra:
 * "We build not for today, but for tomorrow and beyond."
 */

export async function playableClassAdminRoutes(app: FastifyInstance) {
  app.register(async function (admin) {
    // ✅ Global protection: JWT + manage_characters required
    admin.addHook('onRequest', async (request, reply) => {
      try {
        await request.jwtVerify();
      } catch (err) {
        return reply.status(401).send({ error: 'Unauthorized' });
      }

      const hasPermission = request.hasPermission('manage_characters');
      if (!hasPermission) {
        return reply.status(403).send({ error: 'Forbidden' });
      }
    });

    // 🧾 GET /admin/playable/classes — paginated list
    admin.get('/classes', getAllPlayableClassesHandler);

    // 🔍 GET /admin/playable/classes/:id — get single class
    admin.get('/classes/:id', getPlayableClassByIdHandler);

    // ➕ POST /admin/playable/classes — create new class
    admin.post('/classes', createPlayableClassHandler);

    // ✏️ PATCH /admin/playable/classes/:id — update class
    admin.patch('/classes/:id', updatePlayableClassHandler);

    // ❌ DELETE /admin/playable/classes/:id — delete class
    admin.delete('/classes/:id', deletePlayableClassHandler);
  }, { prefix: '/admin/playable' });
}
