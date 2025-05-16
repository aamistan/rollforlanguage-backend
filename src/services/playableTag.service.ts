// src/services/characterTag.service.ts

import { db } from '../db';
import { playableTags, playableClassTagLinks } from '../db/schema/playable_classes';
import { eq, count } from 'drizzle-orm';
import { idGenerator } from '../utils/idGenerator';

export async function getAllTags(includeInactive = false) {
  const query = db.select().from(playableTags).orderBy(playableTags.sortOrder, playableTags.name);

  if (!includeInactive) {
    query.where(eq(playableTags.isActive, true));
  }

  return await query;
}

export async function getTagById(id: string) {
  const [tag] = await db
    .select()
    .from(playableTags)
    .where(eq(playableTags.id, id));

  return tag || null;
}

export async function createTag(name: string, description?: string, sortOrder = 0) {
  const id = idGenerator(36);
  const now = new Date();

  await db.insert(playableTags).values({
    id,
    name,
    description,
    sortOrder,
    isActive: true,
    createdAt: now,
    updatedAt: now,
  });

  return { id, name, description, sortOrder };
}

export async function updateTag(id: string, updates: { name?: string; description?: string; sortOrder?: number }) {
  const now = new Date();

  await db.update(playableTags)
    .set({
      ...updates,
      updatedAt: now,
    })
    .where(eq(playableTags.id, id));

  return await getTagById(id);
}

export async function setTagActiveState(id: string, isActive: boolean): Promise<boolean> {
  const result = await db
    .update(playableTags)
    .set({ isActive, updatedAt: new Date() })
    .where(eq(playableTags.id, id));

  return !!result;
}

export async function deleteTag(id: string): Promise<boolean> {
  const [{ count: usageCount }] = await db
    .select({ count: count() })
    .from(playableClassTagLinks)
    .where(eq(playableClassTagLinks.tagId, id));

  if (usageCount > 0) {
    throw new Error('Tag is in use and cannot be deleted.');
  }

  const [existing] = await db
    .select({ id: playableTags.id })
    .from(playableTags)
    .where(eq(playableTags.id, id));

  if (!existing) return false;

  await db.delete(playableTags).where(eq(playableTags.id, id));
  return true;
}

