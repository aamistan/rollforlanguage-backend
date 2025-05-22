import {
  mysqlTable,
  varchar,
  text,
  timestamp,
  int,
  boolean,
  primaryKey
} from 'drizzle-orm/mysql-core';
import { sql } from 'drizzle-orm';
import { idGenerator } from '../../utils/idGenerator';

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

export const playableTagCategories = mysqlTable('playable_tag_categories', {
  id: varchar('id', { length: 128 })
    .primaryKey()
    .$defaultFn(() => idGenerator()),

  name: varchar('name', { length: 64 }).notNull().unique(),
  displayName: varchar('display_name', { length: 128 }),
  description: text('description'),
  colorHex: varchar('color_hex', { length: 7 }),
  sortOrder: int('sort_order').default(0),
  isActive: boolean('is_active').default(true),

  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow().onUpdateNow(),
});

export const playableTagCategoryLinks = mysqlTable('playable_tag_category_links', {
  tagId: varchar('tag_id', { length: 36 }).notNull(),
  categoryId: varchar('category_id', { length: 128 }).notNull(),
  isPrimary: boolean('is_primary').default(false),
}, (table) => [
  primaryKey(table.tagId, table.categoryId)
]);

