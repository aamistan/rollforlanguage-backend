import {
    mysqlTable,
    varchar,
    text,
    int,
    boolean,
    timestamp,
  } from 'drizzle-orm/mysql-core';
  
  // Settings table (global system configs)
  export const settings = mysqlTable('settings', {
    id: varchar('id', { length: 36 }).primaryKey(),
    key: varchar('key', { length: 255 }).notNull().unique(), // e.g., site_name, max_login_attempts
    value: text('value').notNull(),
    description: text('description'),
    updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
  });
  
  // Admin Logs table (system actions)
  export const adminLogs = mysqlTable('admin_logs', {
    id: varchar('id', { length: 36 }).primaryKey(),
    adminId: varchar('admin_id', { length: 36 }).notNull(),
    action: varchar('action', { length: 255 }).notNull(),
    details: text('details'),
    createdAt: timestamp('created_at').defaultNow(),
  });
  
  // Bans table (banned users)
  export const bans = mysqlTable('bans', {
    id: varchar('id', { length: 36 }).primaryKey(),
    userId: varchar('user_id', { length: 36 }).notNull(),
    reason: text('reason').notNull(),
    bannedBy: varchar('banned_by', { length: 36 }).notNull(), // admin or super admin ID
    createdAt: timestamp('created_at').defaultNow(),
    expiresAt: timestamp('expires_at'), // optional, for temporary bans
  });
  
  // Support Tickets table
  export const supportTickets = mysqlTable('support_tickets', {
    id: varchar('id', { length: 36 }).primaryKey(),
    userId: varchar('user_id', { length: 36 }).notNull(),
    subject: varchar('subject', { length: 255 }).notNull(),
    description: text('description').notNull(),
    status: varchar('status', { length: 50 }).default('open'), // open, in_progress, resolved, closed
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
    resolvedAt: timestamp('resolved_at'),
  });
  