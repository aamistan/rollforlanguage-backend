
import {
  mysqlTable,
  varchar,
  text,
  timestamp,
  int,
  boolean,
} from 'drizzle-orm/mysql-core';

// 1. Teacher Profiles table (extra info for teacher users)
export const teacherProfiles = mysqlTable('teacher_profiles', {
  userId: varchar('user_id', { length: 36 }).primaryKey(),
  schoolName: varchar('school_name', { length: 255 }),
  department: varchar('department', { length: 100 }),
  bio: text('bio'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
});

// 2. Classes table
export const classes = mysqlTable('classes', {
  id: varchar('id', { length: 36 }).primaryKey(),
  teacherId: varchar('teacher_id', { length: 36 }).notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  joinCode: varchar('join_code', { length: 20 }).notNull().unique(),
  maxStudents: int('max_students'),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
});

// 3. Class Enrollments table
export const classEnrollments = mysqlTable('class_enrollments', {
  id: varchar('id', { length: 36 }).primaryKey(),
  classId: varchar('class_id', { length: 36 }).notNull(),
  studentId: varchar('student_id', { length: 36 }).notNull(),
  status: varchar('status', { length: 20 }).default('active'), // active, removed, banned
  joinedAt: timestamp('joined_at').defaultNow(),
});
