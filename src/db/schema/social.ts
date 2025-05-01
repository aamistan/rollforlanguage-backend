import {
  mysqlTable,
  varchar,
  text,
  boolean,
  timestamp,
} from 'drizzle-orm/mysql-core';

// Messages table (teacher always included)
export const messages = mysqlTable('messages', {
  id: varchar('id', { length: 36 }).primaryKey(),
  senderId: varchar('sender_id', { length: 36 }).notNull(),
  receiverId: varchar('receiver_id', { length: 36 }).notNull(),
  teacherId: varchar('teacher_id', { length: 36 }).notNull(),  // supervising teacher
  content: text('content').notNull(),
  isRead: boolean('is_read').default(false),
  isTeacherRead: boolean('is_teacher_read').default(false),
  sentAt: timestamp('sent_at').defaultNow(),
});

// Parties table (guilds, teams)
export const parties = mysqlTable('parties', {
  id: varchar('id', { length: 36 }).primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  createdBy: varchar('created_by', { length: 36 }).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

// Party Members table
export const partyMembers = mysqlTable('party_members', {
  id: varchar('id', { length: 36 }).primaryKey(),
  partyId: varchar('party_id', { length: 36 }).notNull(),
  userId: varchar('user_id', { length: 36 }).notNull(),
  role: varchar('role', { length: 50 }).default('member'),  // leader, member
  joinedAt: timestamp('joined_at').defaultNow(),
});

// Notifications table
export const notifications = mysqlTable('notifications', {
  id: varchar('id', { length: 36 }).primaryKey(),
  userId: varchar('user_id', { length: 36 }).notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  message: text('message'),
  type: varchar('type', { length: 50 }),  // quest_update, feedback, system_alert
  isRead: boolean('is_read').default(false),
  createdAt: timestamp('created_at').defaultNow(),
});

// Friends table
export const friends = mysqlTable('friends', {
  id: varchar('id', { length: 36 }).primaryKey(),
  userId: varchar('user_id', { length: 36 }).notNull(),
  friendId: varchar('friend_id', { length: 36 }).notNull(),
  status: varchar('status', { length: 50 }).default('pending'),  // pending, accepted, blocked
  createdAt: timestamp('created_at').defaultNow(),
});
