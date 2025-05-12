// src/db/schema/character_stats.ts

import { mysqlTable, varchar, text, timestamp } from 'drizzle-orm/mysql-core';

export const characterStats = mysqlTable('character_stats', {
  id: varchar('id', { length: 36 }).primaryKey(),
  name: varchar('name', { length: 50 }).notNull().unique(),        // e.g. "strength"
  displayName: varchar('display_name', { length: 100 }).notNull(), // e.g. "Strength"
  description: text('description'),                                 // Optional glossary text
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow().onUpdateNow(),
});
