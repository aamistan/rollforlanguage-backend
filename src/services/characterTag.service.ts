// src/services/characterTag.service.ts

import { db } from '../db';
import { classTags } from '../db/schema/character_tags';
import { eq } from 'drizzle-orm';
import { idGenerator } from '../utils/idGenerator';

export async function getAllTags() {
  return await db
    .select()
    .from(classTags)
    .orderBy(classTags.name);
}

export async function createTag(name: string, description?: string) {
  const id = idGenerator(36);
  const now = new Date();

  await db.insert(classTags).values({
    id,
    name,
    description,
    createdAt: now,
    updatedAt: now,
  });

  return { id, name, description };
}

export async function updateTag(id: string, updates: { name?: string; description?: string }) {
  const now = new Date();

  await db.update(classTags)
    .set({
      ...updates,
      updatedAt: now,
    })
    .where(eq(classTags.id, id));

  return await getTagById(id);
}

export async function deleteTag(id: string): Promise<boolean> {
  const [existing] = await db
    .select({ id: classTags.id })
    .from(classTags)
    .where(eq(classTags.id, id));

  if (!existing) return false;

  await db.delete(classTags).where(eq(classTags.id, id));
  return true;
}

export async function getTagById(id: string) {
  const [tag] = await db
    .select()
    .from(classTags)
    .where(eq(classTags.id, id));

  return tag || null;
}
