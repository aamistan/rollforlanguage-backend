// src/db/schema/character_tags.ts

import { mysqlTable, varchar, text, timestamp } from 'drizzle-orm/mysql-core';

export const classTags = mysqlTable('class_tags', {
  id: varchar('id', { length: 36 }).primaryKey(),
  name: varchar('name', { length: 50 }).notNull().unique(),
  description: text('description'),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow().onUpdateNow(),
});
