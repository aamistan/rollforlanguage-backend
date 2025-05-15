import {
  mysqlTable,
  varchar,
  text,
  int,
  boolean,
  timestamp,
} from 'drizzle-orm/mysql-core';

//
// 🧬 PLAYABLE SPECIES MASTER TABLE
//
export const playableSpecies = mysqlTable('playable_species', {
  id: varchar('id', { length: 36 }).primaryKey(),
  name: varchar('name', { length: 100 }).notNull().unique(),
  description: text('description'),
  alignment: varchar('alignment', { length: 50 }), // e.g., neutral, chaotic
  sizeCategory: varchar('size_category', { length: 50 }), // e.g., small, medium
  movementType: varchar('movement_type', { length: 50 }), // e.g., walking, flying
  baseMovementSpeed: int('base_movement_speed'), // e.g., 30 feet
  visualTrait: varchar('visual_trait', { length: 100 }), // e.g., horned, glowing eyes
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow().onUpdateNow(),
});

//
// ⚙️ STAT BONUSES
//
export const playableSpeciesStatBonuses = mysqlTable('playable_species_stat_bonuses', {
  id: varchar('id', { length: 36 }).primaryKey(),
  speciesId: varchar('species_id', { length: 36 }).notNull(),
  statName: varchar('stat_name', { length: 50 }).notNull(),
  bonusValue: int('bonus_value').default(0),
});

//
// 🧠 ABILITIES
//
export const playableSpeciesAbilities = mysqlTable('playable_species_abilities', {
  id: varchar('id', { length: 36 }).primaryKey(),
  speciesId: varchar('species_id', { length: 36 }).notNull(),
  abilityName: varchar('ability_name', { length: 100 }).notNull(),
  description: text('description'),
  isPassive: boolean('is_passive').default(false),
});

//
// 🏷 TAGS
//
export const playableSpeciesTags = mysqlTable('playable_species_tags', {
  id: varchar('id', { length: 36 }).primaryKey(),
  speciesId: varchar('species_id', { length: 36 }).notNull(),
  tag: varchar('tag', { length: 50 }),
});

//
// 📖 LORE ENTRIES
//
export const playableSpeciesLore = mysqlTable('playable_species_lore', {
  id: varchar('id', { length: 36 }).primaryKey(),
  speciesId: varchar('species_id', { length: 36 }).notNull(),
  loreEntry: text('lore_entry').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});
