// src/schemas/playable_tags.ts

import { z } from 'zod';

// 💾 Drizzle table import
import { playableTags } from '../db/schema/playable_tags';
export { playableTags };


/**
 * Playable Tag Admin Schema
 *
 * Purpose:
 * - Validates inputs for tag creation and updates
 * - Ensures color-coding and naming constraints
 * - Supports tag filtering, sorting, and activation status
 *
 * Development Mantra:
 * "We build not for today, but for tomorrow and beyond."
 */

// 🎨 Color validation regex
const hexColorRegex = /^#([0-9A-Fa-f]{6})$/;

// 🧾 Create tag schema
export const createPlayableTagSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().max(1000).optional(),
  sortOrder: z.number().int().min(0).optional(),
  isActive: z.boolean().optional(),

  colorHex: z.string().regex(hexColorRegex, 'Must be a valid hex color').optional(),
  colorName: z.string().max(32).optional(),
});

// ✏️ Update tag schema (partial)
export const updatePlayableTagSchema = createPlayableTagSchema.partial();

// 🔍 Querystring support (for filters like ?includeInactive=true)
export const getPlayableTagsQuerySchema = z.object({
  includeInactive: z.coerce.boolean().optional(),
});

// 🧠 Types
export type CreatePlayableTagInput = z.infer<typeof createPlayableTagSchema>;
export type UpdatePlayableTagInput = z.infer<typeof updatePlayableTagSchema>;
export type GetPlayableTagsQuery = z.infer<typeof getPlayableTagsQuerySchema>;
