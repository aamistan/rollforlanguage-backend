import {
    mysqlTable,
    varchar,
    text,
    int,
    boolean,
    timestamp,
  } from 'drizzle-orm/mysql-core';
  
  // Campaigns table
  export const campaigns = mysqlTable('campaigns', {
    id: varchar('id', { length: 36 }).primaryKey(),
    title: varchar('title', { length: 255 }).notNull(),
    description: text('description'),
    createdBy: varchar('created_by', { length: 36 }).notNull(),  // teacher or admin user
    createdAt: timestamp('created_at').defaultNow(),
  });
  
  // Quests table
  export const quests = mysqlTable('quests', {
    id: varchar('id', { length: 36 }).primaryKey(),
    campaignId: varchar('campaign_id', { length: 36 }).references(() => campaigns.id),
    title: varchar('title', { length: 255 }).notNull(),
    description: text('description'),
    type: varchar('type', { length: 50 }).notNull(),  // main_story, daily, side, etc.
    repeatable: boolean('repeatable').default(false),
    createdBy: varchar('created_by', { length: 36 }).notNull(),
    createdAt: timestamp('created_at').defaultNow(),
  });
  
  // Quest Objectives table
  export const questObjectives = mysqlTable('quest_objectives', {
    id: varchar('id', { length: 36 }).primaryKey(),
    description: text('description').notNull(),
    objectiveType: varchar('objective_type', { length: 50 }).notNull(),  // e.g., complete_lesson, defeat_enemy
    lessonId: varchar('lesson_id', { length: 36 }),
    lessonSectionId: varchar('lesson_section_id', { length: 36 }),
    createdBy: varchar('created_by', { length: 36 }).notNull(),
  });
  
  // Quest Objective Links table (many-to-many)
  export const questObjectiveLinks = mysqlTable('quest_objective_links', {
    id: varchar('id', { length: 36 }).primaryKey(),
    questId: varchar('quest_id', { length: 36 }).notNull().references(() => quests.id),
    objectiveId: varchar('objective_id', { length: 36 }).notNull().references(() => questObjectives.id),
    order: int('order'),
  });
  
  // Quest Rewards table
  export const questRewards = mysqlTable('quest_rewards', {
    id: varchar('id', { length: 36 }).primaryKey(),
    questId: varchar('quest_id', { length: 36 }).notNull().references(() => quests.id),
    rewardType: varchar('reward_type', { length: 50 }).notNull(),  // xp, item, currency
    rewardValue: varchar('reward_value', { length: 255 }).notNull(),  // could be numeric or FK reference
  });
  
  // Character Quest Progress table
  export const characterQuestProgress = mysqlTable('character_quest_progress', {
    id: varchar('id', { length: 36 }).primaryKey(),
    characterId: varchar('character_id', { length: 36 }).notNull(),
    questId: varchar('quest_id', { length: 36 }).notNull().references(() => quests.id),
    status: varchar('status', { length: 50 }).notNull(),  // not_started, in_progress, completed, failed
    startedAt: timestamp('started_at').defaultNow(),
    completedAt: timestamp('completed_at'),
    lastUpdatedAt: timestamp('last_updated_at').defaultNow().onUpdateNow(),
  });
  