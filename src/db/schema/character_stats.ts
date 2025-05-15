// src/db/schema/character_stats.ts

import { mysqlTable, varchar, text, timestamp, int, boolean } from 'drizzle-orm/mysql-core';

export const characterStats = mysqlTable('character_stats', {
  id: varchar('id', { length: 36 }).primaryKey(),
  name: varchar('name', { length: 50 }).notNull().unique(),
  displayName: varchar('display_name', { length: 100 }).notNull(),
  description: text('description'),
  isActive: boolean('is_active').default(true),
  sortOrder: int('sort_order').default(0),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').onUpdateNow().defaultNow(),
});
