
import { db } from '../db';
import { playablePassives } from '../db/schema/playable_passives';
import { eq } from 'drizzle-orm';
import { idGenerator } from '../utils/idGenerator';

export async function getAllPassives() {
  return await db
    .select()
    .from(playablePassives)
    .orderBy(playablePassives.name);
}

export async function createPassive(name: string, description?: string) {
  const id = idGenerator(36);
  const now = new Date();

  await db.insert(playablePassives).values({
    id,
    name,
    description,
    createdAt: now,
    updatedAt: now,
  });

  return { id, name, description };
}

export async function updatePassive(id: string, updates: { name?: string; description?: string }) {
  const now = new Date();

  await db.update(playablePassives)
    .set({ ...updates, updatedAt: now })
    .where(eq(playablePassives.id, id));

  return await getPassiveById(id);
}

export async function deletePassive(id: string): Promise<boolean> {
  const [existing] = await db
    .select({ id: playablePassives.id })
    .from(playablePassives)
    .where(eq(playablePassives.id, id));

  if (!existing) return false;

  await db.delete(playablePassives).where(eq(playablePassives.id, id));
  return true;
}

export async function getPassiveById(id: string) {
  const [passive] = await db
    .select()
    .from(playablePassives)
    .where(eq(playablePassives.id, id));

  return passive || null;
}
