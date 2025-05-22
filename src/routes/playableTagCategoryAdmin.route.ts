import { FastifyInstance } from 'fastify';
import {
  getAllTagCategoriesHandler,
  createTagCategoryHandler,
  updateTagCategoryHandler,
  deleteTagCategoryHandler,
} from '../controllers/adminPlayableTagCategory.controller';

/**
 * Tag Category Admin Routes
 *
 * Endpoint Prefix: /admin/playable-tag-categories
 * 
 * Purpose:
 * - Manage creation and editing of tag category records
 * - Used for structured tag theming and filter logic
 * - Requires `manage_characters` permission
 *
 * Dev Mantra:
 * "We build not for today, but for tomorrow and beyond."
 */

export async function playableTagCategoryAdminRoutes(app: FastifyInstance) {
  app.register(async function (admin) {
    admin.addHook('onRequest', async (request, reply) => {
      await request.jwtVerify();

      if (!request.hasPermission('manage_characters')) {
        return reply.status(403).send({ error: 'Forbidden' });
      }
    });

    // 🧾 GET all categories
    admin.get('/playable-tag-categories', getAllTagCategoriesHandler);

    // ➕ Create new
    admin.post('/playable-tag-categories', createTagCategoryHandler);

    // ✏️ Update existing
    admin.patch('/playable-tag-categories/:id', updateTagCategoryHandler);

    // ❌ Soft-delete (if unused)
    admin.delete('/playable-tag-categories/:id', deleteTagCategoryHandler);
  });
}
