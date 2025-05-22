import { FastifyRequest, FastifyReply } from 'fastify';
import { eq } from 'drizzle-orm';
import { db } from '../db';
import { playableTagCategories, playableTagCategoryLinks } from '../db/schema/playable_tags';
import { idGenerator } from '../utils/idGenerator';

type CategoryInput = {
  name: string;
  displayName?: string;
  description?: string;
  colorHex?: string;
  sortOrder?: number;
  isActive?: boolean;
};

// 🧾 GET /admin/playable-tag-categories
export async function getAllTagCategoriesHandler(req: FastifyRequest, reply: FastifyReply) {
  const results = await db.select().from(playableTagCategories);
  return reply.send(results);
}

// ➕ POST /admin/playable-tag-categories
export async function createTagCategoryHandler(req: FastifyRequest<{ Body: CategoryInput }>, reply: FastifyReply) {
  const body = req.body;
  const newCategory = {
    id: idGenerator(),
    name: body.name,
    displayName: body.displayName,
    description: body.description,
    colorHex: body.colorHex ?? '#888888',
    sortOrder: body.sortOrder ?? 0,
    isActive: body.isActive ?? true,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  await db.insert(playableTagCategories).values(newCategory);
  return reply.status(201).send(newCategory);
}

// ✏️ PATCH /admin/playable-tag-categories/:id
export async function updateTagCategoryHandler(req: FastifyRequest<{ Params: { id: string }; Body: Partial<CategoryInput> }>, reply: FastifyReply) {
  const { id } = req.params;
  const updates = req.body;

  const result = await db
    .update(playableTagCategories)
    .set({ ...updates, updatedAt: new Date() })
    .where(eq(playableTagCategories.id, id)) as unknown as { affectedRows: number };

  return reply.send({ success: result.affectedRows > 0 });
}

// ❌ DELETE /admin/playable-tag-categories/:id
export async function deleteTagCategoryHandler(req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
  const { id } = req.params;

  // Check if the category is in use
  const usage = await db
    .select()
    .from(playableTagCategoryLinks)
    .where(eq(playableTagCategoryLinks.categoryId, id));

  if (usage.length > 0) {
    return reply.status(409).send({ error: 'Cannot delete: category is in use' });
  }

  await db
    .update(playableTagCategories)
    .set({ isActive: false, updatedAt: new Date() })
    .where(eq(playableTagCategories.id, id));

  return reply.status(204).send();
}
