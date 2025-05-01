import {
  mysqlTable,
  varchar,
  text,
  boolean,
  timestamp,
} from 'drizzle-orm/mysql-core';

// Languages table
export const languages = mysqlTable('languages', {
  id: varchar('id', { length: 36 }).primaryKey(),
  name: varchar('name', { length: 100 }).notNull().unique(),
  code: varchar('code', { length: 10 }).notNull().unique(),  // e.g., 'en', 'de'
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
});

// Lessons table
export const lessons = mysqlTable('lessons', {
  id: varchar('id', { length: 36 }).primaryKey(),
  languageId: varchar('language_id', { length: 36 }).notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Lesson Sections table
export const lessonSections = mysqlTable('lesson_sections', {
  id: varchar('id', { length: 36 }).primaryKey(),
  lessonId: varchar('lesson_id', { length: 36 }).notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  content: text('content'),
  order: varchar('order', { length: 10 }),  // e.g., '1', '2', 'A'
  createdAt: timestamp('created_at').defaultNow(),
});

// Quizzes table
export const quizzes = mysqlTable('quizzes', {
  id: varchar('id', { length: 36 }).primaryKey(),
  lessonId: varchar('lesson_id', { length: 36 }).notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Questions table
export const questions = mysqlTable('questions', {
  id: varchar('id', { length: 36 }).primaryKey(),
  quizId: varchar('quiz_id', { length: 36 }).notNull(),
  text: text('text').notNull(),
  type: varchar('type', { length: 50 }).notNull(),  // e.g., multiple_choice, fill_in_the_blank
  createdAt: timestamp('created_at').defaultNow(),
});

// Answers table
export const answers = mysqlTable('answers', {
  id: varchar('id', { length: 36 }).primaryKey(),
  questionId: varchar('question_id', { length: 36 }).notNull(),
  text: text('text').notNull(),
  isCorrect: boolean('is_correct').default(false),
  createdAt: timestamp('created_at').defaultNow(),
});
