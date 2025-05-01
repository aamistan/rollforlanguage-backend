import {
    mysqlTable,
    varchar,
    text,
    int,
    timestamp,
  } from 'drizzle-orm/mysql-core';
  
  // Achievements table
  export const achievements = mysqlTable('achievements', {
    id: varchar('id', { length: 36 }).primaryKey(),
    title: varchar('title', { length: 255 }).notNull(),
    description: text('description'),
    criteria: text('criteria'),  // optional JSON or description
    icon: varchar('icon', { length: 255 }),  // image URL or path
    createdBy: varchar('created_by', { length: 36 }),
    createdAt: timestamp('created_at').defaultNow(),
  });
  
  // Character Achievement Unlocks table
  export const characterAchievementUnlocks = mysqlTable('character_achievement_unlocks', {
    id: varchar('id', { length: 36 }).primaryKey(),
    characterId: varchar('character_id', { length: 36 }).notNull(),
    achievementId: varchar('achievement_id', { length: 36 }).notNull().references(() => achievements.id),
    unlockedAt: timestamp('unlocked_at').defaultNow(),
  });
  
  // Leaderboards table
  export const leaderboards = mysqlTable('leaderboards', {
    id: varchar('id', { length: 36 }).primaryKey(),
    name: varchar('name', { length: 255 }).notNull(),
    scopeType: varchar('scope_type', { length: 50 }).notNull(),  // global, lesson, campaign, party
    scopeId: varchar('scope_id', { length: 36 }),
    metric: varchar('metric', { length: 50 }).notNull(),  // xp, level, quests_completed, etc.
    createdAt: timestamp('created_at').defaultNow(),
  });
  
  // Leaderboard Entries table
  export const leaderboardEntries = mysqlTable('leaderboard_entries', {
    id: varchar('id', { length: 36 }).primaryKey(),
    leaderboardId: varchar('leaderboard_id', { length: 36 }).notNull().references(() => leaderboards.id),
    characterId: varchar('character_id', { length: 36 }).notNull(),
    rank: int('rank').notNull(),
    score: int('score').notNull(),
    recordedAt: timestamp('recorded_at').defaultNow(),
  });
  