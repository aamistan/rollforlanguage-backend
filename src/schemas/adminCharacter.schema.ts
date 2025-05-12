// src/schemas/adminCharacter.schema.ts

import { z } from 'zod';

/**
 * Admin Character Schema
 * 
 * Related Documentation:
 * /docs/backend/character-management-api.md
 * 
 * Purpose:
 * - Validates inputs for character class admin endpoints
 * - Supports clean controller/service logic with typed inference
 * - Handles paginated filters, creation, updates, and tag assignments
 * 
 * Development Mantra:
 * "We build not for today, but for tomorrow and beyond."
 */

// 🧭 Tag array type
export const tagArraySchema = z.array(z.string().min(1).max(50)).optional();

// 📊 Stat bonuses: { statName: number }
export const statBonusesSchema = z.record(z.string().min(1), z.number()).optional();

// ✨ Passive abilities: string[]
export const passiveAbilitiesSchema = z.array(z.string().min(1).max(100)).optional();

// 🧾 Class creation schema
export const createCharacterClassSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().min(1_000).max(10_000).optional(),
  lore: z.string().max(25_000).optional(),

  iconUrl: z.string().url().max(255).optional(), // ✅ Newly added

  tags: tagArraySchema,
  statBonuses: statBonusesSchema,
  passiveAbilities: passiveAbilitiesSchema,
});

// ✏️ Class update schema
export const updateCharacterClassSchema = createCharacterClassSchema.partial();

// 🔍 Class list query params
export const getCharacterClassesQuerySchema = z.object({
  search: z.string().min(1).max(100).optional(),

  page: z.coerce.number().min(1).optional(),
  limit: z.coerce.number().min(1).max(100).optional(),

  sortBy: z.enum(['name', 'createdAt', 'updatedAt']).optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
});

// 🧠 Inferred types
export type CreateCharacterClassInput = z.infer<typeof createCharacterClassSchema>;
export type UpdateCharacterClassInput = z.infer<typeof updateCharacterClassSchema>;
export type GetCharacterClassesQuery = z.infer<typeof getCharacterClassesQuerySchema>;
