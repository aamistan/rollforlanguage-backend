import {
  mysqlTable,
  varchar,
  text,
  timestamp,
  int,
  boolean,
} from 'drizzle-orm/mysql-core';

//
// 🏷️ PLAYABLE TAG GLOSSARY
//
export const playableTags = mysqlTable('playable_tags', {
  id: varchar('id', { length: 36 }).primaryKey(),
  name: varchar('name', { length: 50 }).notNull().unique(), // e.g., "Tank", "Undead"
  description: text('description'),
  isActive: boolean('is_active').default(true),
  sortOrder: int('sort_order').default(0),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow().onUpdateNow(),
  colorHex: varchar('color_hex', { length: 7 }).default('#888888'),
  colorName: varchar('color_name', { length: 32 }),
});

