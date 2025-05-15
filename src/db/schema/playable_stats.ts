import {
  mysqlTable,
  varchar,
  text,
  timestamp,
  int,
  boolean,
} from 'drizzle-orm/mysql-core';

//
// 📊 PLAYABLE STATS REGISTRY
//
export const playableStats = mysqlTable('playable_stats', {
  id: varchar('id', { length: 36 }).primaryKey(),
  name: varchar('name', { length: 50 }).notNull().unique(), // e.g., "strength"
  displayName: varchar('display_name', { length: 100 }).notNull(), // e.g., "Strength"
  description: text('description'),
  isActive: boolean('is_active').default(true),
  sortOrder: int('sort_order').default(0),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').onUpdateNow().defaultNow(),
});
