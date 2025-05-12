// src/services/characterStat.service.ts

import { db } from '../db';
import { characterStats } from '../db/schema/character_stats';
import { eq } from 'drizzle-orm';
import { idGenerator } from '../utils/idGenerator';

export async function getAllStats() {
  return await db
    .select()
    .from(characterStats)
    .orderBy(characterStats.displayName);
}

export async function createStat(name: string, displayName: string, description?: string) {
  const id = idGenerator(36);
  const now = new Date();

  await db.insert(characterStats).values({
    id,
    name,
    displayName,
    description,
    createdAt: now,
    updatedAt: now,
  });

  return { id, name, displayName, description };
}

export async function updateStat(id: string, updates: { name?: string; displayName?: string; description?: string }) {
  const now = new Date();

  await db.update(characterStats)
    .set({ ...updates, updatedAt: now })
    .where(eq(characterStats.id, id));

  return await getStatById(id);
}

export async function deleteStat(id: string): Promise<boolean> {
  const [existing] = await db
    .select({ id: characterStats.id })
    .from(characterStats)
    .where(eq(characterStats.id, id));

  if (!existing) return false;

  await db.delete(characterStats).where(eq(characterStats.id, id));
  return true;
}

export async function getStatById(id: string) {
  const [stat] = await db
    .select()
    .from(characterStats)
    .where(eq(characterStats.id, id));

  return stat || null;
}
