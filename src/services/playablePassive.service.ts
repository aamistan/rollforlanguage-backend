// src/services/characterPassive.service.ts

import { db } from '../db';
import { characterPassives } from '../db/schema/playeable_passives';
import { eq } from 'drizzle-orm';
import { idGenerator } from '../utils/idGenerator';

export async function getAllPassives() {
  return await db
    .select()
    .from(characterPassives)
    .orderBy(characterPassives.name);
}

export async function createPassive(name: string, description?: string) {
  const id = idGenerator(36);
  const now = new Date();

  await db.insert(characterPassives).values({
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

  await db.update(characterPassives)
    .set({ ...updates, updatedAt: now })
    .where(eq(characterPassives.id, id));

  return await getPassiveById(id);
}

export async function deletePassive(id: string): Promise<boolean> {
  const [existing] = await db
    .select({ id: characterPassives.id })
    .from(characterPassives)
    .where(eq(characterPassives.id, id));

  if (!existing) return false;

  await db.delete(characterPassives).where(eq(characterPassives.id, id));
  return true;
}

export async function getPassiveById(id: string) {
  const [passive] = await db
    .select()
    .from(characterPassives)
    .where(eq(characterPassives.id, id));

  return passive || null;
}
