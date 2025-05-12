import {
  mysqlTable,
  varchar,
  text,
  int,
  boolean,
  timestamp,
} from 'drizzle-orm/mysql-core';

// Master table: Character Species
export const characterSpecies = mysqlTable('character_species', {
  id: varchar('id', { length: 36 }).primaryKey(),
  name: varchar('name', { length: 100 }).notNull().unique(),
  description: text('description'),
  alignment: varchar('alignment', { length: 50 }), // e.g., neutral, chaotic, lawful
  sizeCategory: varchar('size_category', { length: 50 }), // e.g., small, medium, large
  movementType: varchar('movement_type', { length: 50 }), // e.g., walking, flying, swimming
  baseMovementSpeed: int('base_movement_speed'), // e.g., 30 feet
  visualTrait: varchar('visual_trait', { length: 100 }), // cosmetic traits like "horned", "glowing eyes"
  createdAt: timestamp('created_at').defaultNow(),
});

// Species Stat Bonuses
export const speciesStatBonuses = mysqlTable('species_stat_bonuses', {
  id: varchar('id', { length: 36 }).primaryKey(),
  speciesId: varchar('species_id', { length: 36 }).notNull(),
  statName: varchar('stat_name', { length: 50 }).notNull(), // e.g., strength
  bonusValue: int('bonus_value').default(0),
});

// Species Abilities
export const speciesAbilities = mysqlTable('species_abilities', {
  id: varchar('id', { length: 36 }).primaryKey(),
  speciesId: varchar('species_id', { length: 36 }).notNull(),
  abilityName: varchar('ability_name', { length: 100 }).notNull(),
  description: text('description'),
  isPassive: boolean('is_passive').default(false),
});

// Species Tags
export const speciesTags = mysqlTable('species_tags', {
  id: varchar('id', { length: 36 }).primaryKey(),
  speciesId: varchar('species_id', { length: 36 }).notNull(),
  tag: varchar('tag', { length: 50 }), // e.g., 'aquatic', 'mystical', 'undead'
});

// Species Lore (multi-paragraph entries, for encyclopedic entries or campaign info)
export const speciesLore = mysqlTable('species_lore', {
  id: varchar('id', { length: 36 }).primaryKey(),
  speciesId: varchar('species_id', { length: 36 }).notNull(),
  loreEntry: text('lore_entry').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});
