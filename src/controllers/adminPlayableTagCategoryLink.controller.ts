import { FastifyRequest, FastifyReply } from 'fastify';
import { db } from '../db';
import { eq, and } from 'drizzle-orm';
import { playableTagCategoryLinks, playableTagCategories } from '../db/schema/playable_tags';

type LinkInput = {
  categoryId: string;
  isPrimary?: boolean;
};

// 🔍 GET /admin/playable-tags/:tagId/categories
export async function getCategoriesForTagHandler(
  req: FastifyRequest<{ Params: { tagId: string } }>,
  reply: FastifyReply
) {
  const { tagId } = req.params;

  const result = await db
    .select()
    .from(playableTagCategoryLinks)
    .where(eq(playableTagCategoryLinks.tagId, tagId));

  return reply.send(result);
}

// ➕ POST /admin/playable-tags/:tagId/categories
export async function addCategoryToTagHandler(
  req: FastifyRequest<{ Params: { tagId: string }; Body: LinkInput }>,
  reply: FastifyReply
) {
  const { tagId } = req.params;
  const { categoryId, isPrimary = false } = req.body;

  // Enforce single primary per tag
  if (isPrimary) {
    await db
      .update(playableTagCategoryLinks)
      .set({ isPrimary: false })
      .where(eq(playableTagCategoryLinks.tagId, tagId));
  }

  await db.insert(playableTagCategoryLinks).values({
    tagId,
    categoryId,
    isPrimary,
  });

  return reply.status(201).send({ success: true });
}

// ✏️ PATCH /admin/playable-tags/:tagId/categories/:categoryId
export async function updateTagCategoryLinkHandler(
  req: FastifyRequest<{ Params: { tagId: string; categoryId: string }; Body: { isPrimary?: boolean } }>,
  reply: FastifyReply
) {
  const { tagId, categoryId } = req.params;
  const { isPrimary } = req.body;

  if (typeof isPrimary !== 'boolean') {
    return reply.status(400).send({ error: 'Missing or invalid isPrimary flag.' });
  }

  if (isPrimary) {
    // Clear all others before promoting this one
    await db
      .update(playableTagCategoryLinks)
      .set({ isPrimary: false })
      .where(eq(playableTagCategoryLinks.tagId, tagId));
  }

  await db
    .update(playableTagCategoryLinks)
    .set({ isPrimary })
    .where(
      and(
        eq(playableTagCategoryLinks.tagId, tagId),
        eq(playableTagCategoryLinks.categoryId, categoryId)
      )
    );

  return reply.send({ success: true });
}

// ❌ DELETE /admin/playable-tags/:tagId/categories/:categoryId
export async function removeCategoryFromTagHandler(
  req: FastifyRequest<{ Params: { tagId: string; categoryId: string } }>,
  reply: FastifyReply
) {
  const { tagId, categoryId } = req.params;

  await db
    .delete(playableTagCategoryLinks)
    .where(
      and(
        eq(playableTagCategoryLinks.tagId, tagId),
        eq(playableTagCategoryLinks.categoryId, categoryId)
      )
    );

  return reply.status(204).send();
}
