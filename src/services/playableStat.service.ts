
import { db } from '../db';
import { playableClassStatBonuses } from '../db/schema/playable_classes';
import { playableStats } from '../db/schema/playable_stats';
import { eq, count } from 'drizzle-orm';
import { idGenerator } from '../utils/idGenerator';

export async function getAllStats(includeInactive = false) {
  const query = db
    .select()
    .from(playableStats)
    .orderBy(playableStats.sortOrder, playableStats.displayName);

  if (!includeInactive) {
    query.where(eq(playableStats.isActive, true));
  }

  return await query;
}

export async function getStatById(id: string) {
  const [stat] = await db
    .select()
    .from(playableStats)
    .where(eq(playableStats.id, id));

  return stat || null;
}

export async function createStat(
  name: string,
  displayName: string,
  description?: string,
  sortOrder = 0
) {
  const id = idGenerator(36);
  const now = new Date();

  await db.insert(playableStats).values({
    id,
    name,
    displayName,
    description,
    sortOrder,
    isActive: true,
    createdAt: now,
    updatedAt: now,
  });

  return { id, name, displayName, description, sortOrder };
}

export async function updateStat(
  id: string,
  updates: { name?: string; displayName?: string; description?: string; sortOrder?: number }
) {
  const now = new Date();

  await db.update(playableStats)
    .set({ ...updates, updatedAt: now })
    .where(eq(playableStats.id, id));

  return await getStatById(id);
}

export async function setStatActiveState(id: string, isActive: boolean): Promise<boolean> {
  const result = await db
    .update(playableStats)
    .set({ isActive, updatedAt: new Date() })
    .where(eq(playableStats.id, id));

  return !!result;
}

export async function deleteStat(id: string): Promise<boolean> {
  // 🚫 Check if stat is in use
  const [{ count: usageCount }] = await db
    .select({ count: count() })
    .from(playableClassStatBonuses)
    .where(eq(playableClassStatBonuses.statName, id));

  if (usageCount > 0) {
    throw new Error('Stat is in use and cannot be deleted.');
  }

  const [existing] = await db
    .select({ id: playableStats.id })
    .from(playableStats)
    .where(eq(playableStats.id, id));

  if (!existing) return false;

  await db.delete(playableStats).where(eq(playableStats.id, id));
  return true;
}
