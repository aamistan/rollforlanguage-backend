import {
  mysqlTable,
  varchar,
  text,
  timestamp,
  boolean,
} from 'drizzle-orm/mysql-core';

// Roles table
export const roles = mysqlTable('roles', {
  id: varchar('id', { length: 36 }).primaryKey(),
  name: varchar('name', { length: 50 }).notNull().unique(),
  description: text('description'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Users table
export const users = mysqlTable('users', {
  id: varchar('id', { length: 36 }).primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: varchar('password_hash', { length: 255 }).notNull(),
  roleId: varchar('role_id', { length: 36 }).notNull(),
  username: varchar('username', { length: 100 }).notNull().unique(),
  displayName: varchar('display_name', { length: 100 }),
  genderIdentity: varchar('gender_identity', { length: 100 }),  // newly added
  pronouns: varchar('pronouns', { length: 100 }),              // newly added
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
  isActive: boolean('is_active').default(true),
});


// Login Sessions table
export const loginSessions = mysqlTable('login_sessions', {
  id: varchar('id', { length: 36 }).primaryKey(),
  userId: varchar('user_id', { length: 36 }).notNull(),
  jwtToken: text('jwt_token').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  expiresAt: timestamp('expires_at').notNull(),
});

// Auth Providers table (for OAuth, SSO, etc.)
export const authProviders = mysqlTable('auth_providers', {
  id: varchar('id', { length: 36 }).primaryKey(),
  userId: varchar('user_id', { length: 36 }).notNull(),
  providerName: varchar('provider_name', { length: 100 }).notNull(),
  providerAccountId: varchar('provider_account_id', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});
