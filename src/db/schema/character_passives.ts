// src/db/schema/character_passives.ts

import { mysqlTable, varchar, text, timestamp } from 'drizzle-orm/mysql-core';

export const characterPassives = mysqlTable('character_passives', {
  id: varchar('id', { length: 36 }).primaryKey(),
  name: varchar('name', { length: 100 }).notNull().unique(),
  description: text('description'), // Optional tooltip or glossary explanation
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow().onUpdateNow(),
});
