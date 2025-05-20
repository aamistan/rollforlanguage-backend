import {
  mysqlTable,
  varchar,
  text,
  boolean,
  int,
  timestamp,
} from 'drizzle-orm/mysql-core';

//
// 🧙‍♂️ PLAYABLE CLASSES
//
export const playableClasses = mysqlTable('playable_classes', {
  id: varchar('id', { length: 36 }).primaryKey(),
  name: varchar('name', { length: 100 }).notNull().unique(),
  description: text('description'),
  lore: text('lore'),
  iconUrl: varchar('icon_url', { length: 255 }),
  isPlayable: boolean('is_playable').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow().onUpdateNow(),
});

//
// ⚙️ STAT BONUSES (one-to-many)
//
export const playableClassStatBonuses = mysqlTable('playable_class_stat_bonuses', {
  id: varchar('id', { length: 36 }).primaryKey(),
  classId: varchar('class_id', { length: 36 }).notNull(),
  statName: varchar('stat_name', { length: 50 }).notNull(),
  statBonus: int('stat_bonus').notNull().default(0),
});

//
// 🧠 PASSIVES (one-to-many)
//
export const playableClassPassives = mysqlTable('playable_class_passives', {
  id: varchar('id', { length: 36 }).primaryKey(),
  classId: varchar('class_id', { length: 36 }).notNull(),
  name: varchar('name', { length: 100 }).notNull(),
  effect: text('effect'),
});

//
// 🧩 CLASS–TAG LINK (many-to-many join)
//
export const playableClassTagLinks = mysqlTable('playable_class_tag_links', {
  id: varchar('id', { length: 36 }).primaryKey(),
  classId: varchar('class_id', { length: 36 }).notNull(),
  tagId: varchar('tag_id', { length: 36 }).notNull(),
});
