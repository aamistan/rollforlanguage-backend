// src/services/characterTag.service.ts

import { db } from '../db';
import { classTags, classTagLinks } from '../db/schema/character_classes';
import { eq, count } from 'drizzle-orm';
import { idGenerator } from '../utils/idGenerator';

export async function getAllTags(includeInactive = false) {
  const query = db.select().from(classTags).orderBy(classTags.sortOrder, classTags.name);

  if (!includeInactive) {
    query.where(eq(classTags.isActive, true));
  }

  return await query;
}

export async function getTagById(id: string) {
  const [tag] = await db
    .select()
    .from(classTags)
    .where(eq(classTags.id, id));

  return tag || null;
}

export async function createTag(name: string, description?: string, sortOrder = 0) {
  const id = idGenerator(36);
  const now = new Date();

  await db.insert(classTags).values({
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

  await db.update(classTags)
    .set({
      ...updates,
      updatedAt: now,
    })
    .where(eq(classTags.id, id));

  return await getTagById(id);
}

export async function setTagActiveState(id: string, isActive: boolean): Promise<boolean> {
  const result = await db
    .update(classTags)
    .set({ isActive, updatedAt: new Date() })
    .where(eq(classTags.id, id));

  return !!result;
}

export async function deleteTag(id: string): Promise<boolean> {
  const [{ count: usageCount }] = await db
    .select({ count: count() })
    .from(classTagLinks)
    .where(eq(classTagLinks.tagId, id));

  if (usageCount > 0) {
    throw new Error('Tag is in use and cannot be deleted.');
  }

  const [existing] = await db
    .select({ id: classTags.id })
    .from(classTags)
    .where(eq(classTags.id, id));

  if (!existing) return false;

  await db.delete(classTags).where(eq(classTags.id, id));
  return true;
}

