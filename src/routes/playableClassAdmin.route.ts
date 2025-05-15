// src/routes/admin/characterAdmin.route.ts
import { FastifyInstance } from 'fastify';
import {
  getAllCharacterClassesHandler,
  getCharacterClassByIdHandler,
  createCharacterClassHandler,
  updateCharacterClassHandler,
  deleteCharacterClassHandler,
} from '../controllers/adminPlayableClass.controller';

/**
 * Character Management Admin Routes
 * 
 * Related Documentation:
 * /docs/backend/character-management-api.md
 * 
 * Purpose:
 * - Registers all admin endpoints for managing RPG character classes
 * - Applies permission-based access control for `manage_characters`
 * - Powers dashboard CRUD operations, filters, and summaries
 * 
 * Development Mantra:
 * "We build not for today, but for tomorrow and beyond."
 */

export async function playableAdminRoutes(app: FastifyInstance) {
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

    // 🧾 GET /admin/characters/classes — paginated list
    admin.get('/classes', getAllCharacterClassesHandler);

    // 🔍 GET /admin/characters/classes/:id — get single class
    admin.get('/classes/:id', getCharacterClassByIdHandler);

    // ➕ POST /admin/characters/classes — create new class
    admin.post('/classes', createCharacterClassHandler);

    // ✏️ PATCH /admin/characters/classes/:id — update class
    admin.patch('/classes/:id', updateCharacterClassHandler);

    // ❌ DELETE /admin/characters/classes/:id — delete class
    admin.delete('/classes/:id', deleteCharacterClassHandler);
  }, { prefix: '/admin/characters' });
}
