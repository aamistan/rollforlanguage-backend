// src/services/playableTag.service.ts

import { db } from '../db';
import { playableClassTagLinks } from '../db/schema/playable_classes';
import { eq, count } from 'drizzle-orm';
import { idGenerator } from '../utils/idGenerator';
import { CreatePlayableTagInput, UpdatePlayableTagInput, playableTags,  } from '../schemas/playable_tags';

/**
 * Tag Service
 *
 * Purpose:
 * - Provides tag CRUD operations for the admin dashboard
 * - Supports soft-deletion, color-coded classification, and sorting
 *
 * Development Mantra:
 * "We build not for today, but for tomorrow and beyond."
 */

// GET all tags (optionally including inactive ones)
export async function getAllTags(includeInactive = false) {
  const query = db
    .select()
    .from(playableTags)
    .orderBy(playableTags.sortOrder, playableTags.name);

  if (!includeInactive) {
    query.where(eq(playableTags.isActive, true));
  }

  return await query;
}

// GET tag by ID
export async function getTagById(id: string) {
  const [tag] = await db
    .select()
    .from(playableTags)
    .where(eq(playableTags.id, id));

  return tag || null;
}

// CREATE new tag
export async function createTag(input: CreatePlayableTagInput) {
  const {
    name,
    description,
    sortOrder = 0,
    colorHex = '#888888',
    colorName,
    isActive = true,
  } = input;

  const id = idGenerator(36);
  const now = new Date();

  await db.insert(playableTags).values({
    id,
    name,
    description,
    sortOrder,
    colorHex,
    colorName,
    isActive,
    createdAt: now,
    updatedAt: now,
  });

  return { id, name, description, sortOrder, colorHex, colorName, isActive };
}

// UPDATE tag
export async function updateTag(id: string, updates: UpdatePlayableTagInput) {
  const now = new Date();

  await db
    .update(playableTags)
    .set({
      ...updates,
      updatedAt: now,
    })
    .where(eq(playableTags.id, id));

  return await getTagById(id);
}

// SET active/inactive
export async function setTagActiveState(id: string, isActive: boolean): Promise<boolean> {
  const result = await db
    .update(playableTags)
    .set({ isActive, updatedAt: new Date() })
    .where(eq(playableTags.id, id));

  return !!result;
}

// DELETE tag (only if not in use)
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
