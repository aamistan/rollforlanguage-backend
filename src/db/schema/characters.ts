import {
  mysqlTable,
  varchar,
  text,
  int,
  boolean,
  timestamp,
} from 'drizzle-orm/mysql-core';

// Characters table
export const characters = mysqlTable('characters', {
  id: varchar('id', { length: 36 }).primaryKey(),
  userId: varchar('user_id', { length: 36 }).notNull(),
  name: varchar('name', { length: 100 }).notNull(),
  level: int('level').default(1),
  experience: int('experience').default(0),
  createdAt: timestamp('created_at').defaultNow(),
});

// Character Stats table
export const characterStats = mysqlTable('character_stats', {
  id: varchar('id', { length: 36 }).primaryKey(),
  characterId: varchar('character_id', { length: 36 }).notNull(),
  statName: varchar('stat_name', { length: 50 }).notNull(),  // e.g., strength, dexterity
  statValue: int('stat_value').default(0),
});

// Skills table
export const skills = mysqlTable('skills', {
  id: varchar('id', { length: 36 }).primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  description: text('description'),
});

// Character Skills table
export const characterSkills = mysqlTable('character_skills', {
  id: varchar('id', { length: 36 }).primaryKey(),
  characterId: varchar('character_id', { length: 36 }).notNull(),
  skillId: varchar('skill_id', { length: 36 }).notNull(),
  level: int('level').default(1),
});

// Abilities table
export const abilities = mysqlTable('abilities', {
  id: varchar('id', { length: 36 }).primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  description: text('description'),
});

// Character Abilities table
export const characterAbilities = mysqlTable('character_abilities', {
  id: varchar('id', { length: 36 }).primaryKey(),
  characterId: varchar('character_id', { length: 36 }).notNull(),
  abilityId: varchar('ability_id', { length: 36 }).notNull(),
  isActive: boolean('is_active').default(false),
});

// Modifiers table
export const modifiers = mysqlTable('modifiers', {
  id: varchar('id', { length: 36 }).primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  description: text('description'),
  effect: text('effect'),  // optional JSON or structured string for effect details
});

// Character Modifiers table
export const characterModifiers = mysqlTable('character_modifiers', {
  id: varchar('id', { length: 36 }).primaryKey(),
  characterId: varchar('character_id', { length: 36 }).notNull(),
  modifierId: varchar('modifier_id', { length: 36 }).notNull(),
  appliedAt: timestamp('applied_at').defaultNow(),
});
