// /src/db/schema/character_classes.ts

import {
  mysqlTable,
  varchar,
  text,
  boolean,
  int,
  timestamp,
} from 'drizzle-orm/mysql-core';

//
// CHARACTER CLASSES
//
export const characterClasses = mysqlTable('character_classes', {
  id: varchar('id', { length: 36 }).primaryKey(),
  name: varchar('name', { length: 100 }).notNull().unique(),
  description: text('description'),
  lore: text('lore'),
  iconUrl: varchar('icon_url', { length: 255 }),
  isPlayable: boolean('is_playable').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'date', }).defaultNow().onUpdateNow(),
});

//
// CLASS STAT BONUSES (one-to-many)
export const classStatBonuses = mysqlTable('class_stat_bonuses', {
  id: varchar('id', { length: 36 }).primaryKey(),
  classId: varchar('class_id', { length: 36 }).notNull(),
  statName: varchar('stat_name', { length: 50 }).notNull(),
  statBonus: int('stat_bonus').notNull().default(0),
});

//
// CLASS PASSIVES (one-to-many)
export const classPassives = mysqlTable('class_passives', {
  id: varchar('id', { length: 36 }).primaryKey(),
  classId: varchar('class_id', { length: 36 }).notNull(),
  name: varchar('name', { length: 100 }).notNull(),
  effect: text('effect'),
});

//
// CLASS TAGS (many-to-many via linking table)
export const classTags = mysqlTable('class_tags', {
  id: varchar('id', { length: 36 }).primaryKey(),
  name: varchar('name', { length: 50 }).notNull().unique(),
});

export const classTagLinks = mysqlTable('class_tag_links', {
  id: varchar('id', { length: 36 }).primaryKey(),
  classId: varchar('class_id', { length: 36 }).notNull(),
  tagId: varchar('tag_id', { length: 36 }).notNull(),
});
