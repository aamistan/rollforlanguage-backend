import { FastifyInstance } from 'fastify';
import {
  getCategoriesForTagHandler,
  addCategoryToTagHandler,
  updateTagCategoryLinkHandler,
  removeCategoryFromTagHandler,
} from '../controllers/adminPlayableTagCategoryLink.controller';

/**
 * Tag-to-Category Admin Routes
 *
 * Endpoint Prefix: /admin/playable-tags/:tagId/categories
 * 
 * Purpose:
 * - Manage associations between tags and category groups
 * - Supports setting one category as primary for styling/theming
 * - All routes protected by `manage_characters`
 *
 * Dev Mantra:
 * "We build not for today, but for tomorrow and beyond."
 */

export async function playableTagCategoryLinkAdminRoutes(app: FastifyInstance) {
  app.register(async function (linkRoutes) {
    linkRoutes.addHook('onRequest', async (request, reply) => {
      await request.jwtVerify();

      if (!request.hasPermission('manage_characters')) {
        return reply.status(403).send({ error: 'Forbidden' });
      }
    });

    // 🔍 Get all categories for a given tag
    linkRoutes.get('/playable-tags/:tagId/categories', getCategoriesForTagHandler);

    // ➕ Link a tag to a category
    linkRoutes.post('/playable-tags/:tagId/categories', addCategoryToTagHandler);

    // ✏️ Update isPrimary flag
    linkRoutes.patch('/playable-tags/:tagId/categories/:categoryId', updateTagCategoryLinkHandler);

    // ❌ Unlink a tag from a category
    linkRoutes.delete('/playable-tags/:tagId/categories/:categoryId', removeCategoryFromTagHandler);
  });
}
