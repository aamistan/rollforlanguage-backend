CREATE TABLE `achievements` (
	`id` varchar(36) NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text,
	`criteria` text,
	`icon` varchar(255),
	`created_by` varchar(36),
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `achievements_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `character_achievement_unlocks` (
	`id` varchar(36) NOT NULL,
	`character_id` varchar(36) NOT NULL,
	`achievement_id` varchar(36) NOT NULL,
	`unlocked_at` timestamp DEFAULT (now()),
	CONSTRAINT `character_achievement_unlocks_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `leaderboard_entries` (
	`id` varchar(36) NOT NULL,
	`leaderboard_id` varchar(36) NOT NULL,
	`character_id` varchar(36) NOT NULL,
	`rank` int NOT NULL,
	`score` int NOT NULL,
	`recorded_at` timestamp DEFAULT (now()),
	CONSTRAINT `leaderboard_entries_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `leaderboards` (
	`id` varchar(36) NOT NULL,
	`name` varchar(255) NOT NULL,
	`scope_type` varchar(50) NOT NULL,
	`scope_id` varchar(36),
	`metric` varchar(50) NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `leaderboards_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `abilities` (
	`id` varchar(36) NOT NULL,
	`name` varchar(100) NOT NULL,
	`description` text,
	CONSTRAINT `abilities_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `character_abilities` (
	`id` varchar(36) NOT NULL,
	`character_id` varchar(36) NOT NULL,
	`ability_id` varchar(36) NOT NULL,
	`is_active` boolean DEFAULT false,
	CONSTRAINT `character_abilities_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `character_modifiers` (
	`id` varchar(36) NOT NULL,
	`character_id` varchar(36) NOT NULL,
	`modifier_id` varchar(36) NOT NULL,
	`applied_at` timestamp DEFAULT (now()),
	CONSTRAINT `character_modifiers_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `character_skills` (
	`id` varchar(36) NOT NULL,
	`character_id` varchar(36) NOT NULL,
	`skill_id` varchar(36) NOT NULL,
	`level` int DEFAULT 1,
	CONSTRAINT `character_skills_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `character_stats` (
	`id` varchar(36) NOT NULL,
	`character_id` varchar(36) NOT NULL,
	`stat_name` varchar(50) NOT NULL,
	`stat_value` int DEFAULT 0,
	CONSTRAINT `character_stats_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `characters` (
	`id` varchar(36) NOT NULL,
	`user_id` varchar(36) NOT NULL,
	`name` varchar(100) NOT NULL,
	`level` int DEFAULT 1,
	`experience` int DEFAULT 0,
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `characters_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `modifiers` (
	`id` varchar(36) NOT NULL,
	`name` varchar(100) NOT NULL,
	`description` text,
	`effect` text,
	CONSTRAINT `modifiers_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `skills` (
	`id` varchar(36) NOT NULL,
	`name` varchar(100) NOT NULL,
	`description` text,
	CONSTRAINT `skills_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `auth_providers` (
	`id` varchar(36) NOT NULL,
	`user_id` varchar(36) NOT NULL,
	`provider_name` varchar(100) NOT NULL,
	`provider_account_id` varchar(255) NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `auth_providers_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `login_sessions` (
	`id` varchar(36) NOT NULL,
	`user_id` varchar(36) NOT NULL,
	`jwt_token` text NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	`expires_at` timestamp NOT NULL,
	CONSTRAINT `login_sessions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `roles` (
	`id` varchar(36) NOT NULL,
	`name` varchar(50) NOT NULL,
	`description` text,
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `roles_id` PRIMARY KEY(`id`),
	CONSTRAINT `roles_name_unique` UNIQUE(`name`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` varchar(36) NOT NULL,
	`email` varchar(255) NOT NULL,
	`password_hash` varchar(255) NOT NULL,
	`role_id` varchar(36) NOT NULL,
	`display_name` varchar(100),
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`is_active` boolean DEFAULT true,
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE `answers` (
	`id` varchar(36) NOT NULL,
	`question_id` varchar(36) NOT NULL,
	`text` text NOT NULL,
	`is_correct` boolean DEFAULT false,
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `answers_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `languages` (
	`id` varchar(36) NOT NULL,
	`name` varchar(100) NOT NULL,
	`code` varchar(10) NOT NULL,
	`is_active` boolean DEFAULT true,
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `languages_id` PRIMARY KEY(`id`),
	CONSTRAINT `languages_name_unique` UNIQUE(`name`),
	CONSTRAINT `languages_code_unique` UNIQUE(`code`)
);
--> statement-breakpoint
CREATE TABLE `lesson_sections` (
	`id` varchar(36) NOT NULL,
	`lesson_id` varchar(36) NOT NULL,
	`title` varchar(255) NOT NULL,
	`content` text,
	`order` varchar(10),
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `lesson_sections_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `lessons` (
	`id` varchar(36) NOT NULL,
	`language_id` varchar(36) NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text,
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `lessons_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `questions` (
	`id` varchar(36) NOT NULL,
	`quiz_id` varchar(36) NOT NULL,
	`text` text NOT NULL,
	`type` varchar(50) NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `questions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `quizzes` (
	`id` varchar(36) NOT NULL,
	`lesson_id` varchar(36) NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text,
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `quizzes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `translations` (
	`id` varchar(36) NOT NULL,
	`key` varchar(255) NOT NULL,
	`language` varchar(10) NOT NULL,
	`text` text NOT NULL,
	`context` varchar(50),
	`linked_id` varchar(36),
	`submitted_by` varchar(36),
	`is_approved` boolean DEFAULT false,
	`approved_by` varchar(36),
	`approved_at` timestamp,
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `translations_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `ui_labels` (
	`id` varchar(36) NOT NULL,
	`label_key` varchar(255) NOT NULL,
	`default_text` text NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `ui_labels_id` PRIMARY KEY(`id`),
	CONSTRAINT `ui_labels_label_key_unique` UNIQUE(`label_key`)
);
--> statement-breakpoint
CREATE TABLE `audio_feedback` (
	`id` varchar(36) NOT NULL,
	`audio_upload_id` varchar(36) NOT NULL,
	`reviewer_id` varchar(36),
	`comments` text,
	`score` int,
	`reviewed_at` timestamp DEFAULT (now()),
	CONSTRAINT `audio_feedback_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `audio_uploads` (
	`id` varchar(36) NOT NULL,
	`user_id` varchar(36) NOT NULL,
	`lesson_id` varchar(36) NOT NULL,
	`audio_url` varchar(255) NOT NULL,
	`status` varchar(50) DEFAULT 'pending',
	`submitted_at` timestamp DEFAULT (now()),
	CONSTRAINT `audio_uploads_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `media_assets` (
	`id` varchar(36) NOT NULL,
	`name` varchar(255) NOT NULL,
	`type` varchar(50) NOT NULL,
	`url` varchar(255) NOT NULL,
	`linked_to` varchar(50),
	`linked_id` varchar(36),
	`uploaded_by` varchar(36),
	`uploaded_at` timestamp DEFAULT (now()),
	CONSTRAINT `media_assets_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `campaigns` (
	`id` varchar(36) NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text,
	`created_by` varchar(36) NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `campaigns_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `character_quest_progress` (
	`id` varchar(36) NOT NULL,
	`character_id` varchar(36) NOT NULL,
	`quest_id` varchar(36) NOT NULL,
	`status` varchar(50) NOT NULL,
	`started_at` timestamp DEFAULT (now()),
	`completed_at` timestamp,
	`last_updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `character_quest_progress_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `quest_objective_links` (
	`id` varchar(36) NOT NULL,
	`quest_id` varchar(36) NOT NULL,
	`objective_id` varchar(36) NOT NULL,
	`order` int,
	CONSTRAINT `quest_objective_links_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `quest_objectives` (
	`id` varchar(36) NOT NULL,
	`description` text NOT NULL,
	`objective_type` varchar(50) NOT NULL,
	`lesson_id` varchar(36),
	`lesson_section_id` varchar(36),
	`created_by` varchar(36) NOT NULL,
	CONSTRAINT `quest_objectives_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `quest_rewards` (
	`id` varchar(36) NOT NULL,
	`quest_id` varchar(36) NOT NULL,
	`reward_type` varchar(50) NOT NULL,
	`reward_value` varchar(255) NOT NULL,
	CONSTRAINT `quest_rewards_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `quests` (
	`id` varchar(36) NOT NULL,
	`campaign_id` varchar(36),
	`title` varchar(255) NOT NULL,
	`description` text,
	`type` varchar(50) NOT NULL,
	`repeatable` boolean DEFAULT false,
	`created_by` varchar(36) NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `quests_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `friends` (
	`id` varchar(36) NOT NULL,
	`user_id` varchar(36) NOT NULL,
	`friend_id` varchar(36) NOT NULL,
	`status` varchar(50) DEFAULT 'pending',
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `friends_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `messages` (
	`id` varchar(36) NOT NULL,
	`sender_id` varchar(36) NOT NULL,
	`receiver_id` varchar(36) NOT NULL,
	`teacher_id` varchar(36) NOT NULL,
	`content` text NOT NULL,
	`is_read` boolean DEFAULT false,
	`is_teacher_read` boolean DEFAULT false,
	`sent_at` timestamp DEFAULT (now()),
	CONSTRAINT `messages_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `notifications` (
	`id` varchar(36) NOT NULL,
	`user_id` varchar(36) NOT NULL,
	`title` varchar(255) NOT NULL,
	`message` text,
	`type` varchar(50),
	`is_read` boolean DEFAULT false,
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `notifications_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `parties` (
	`id` varchar(36) NOT NULL,
	`name` varchar(255) NOT NULL,
	`created_by` varchar(36) NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `parties_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `party_members` (
	`id` varchar(36) NOT NULL,
	`party_id` varchar(36) NOT NULL,
	`user_id` varchar(36) NOT NULL,
	`role` varchar(50) DEFAULT 'member',
	`joined_at` timestamp DEFAULT (now()),
	CONSTRAINT `party_members_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `character_achievement_unlocks` ADD CONSTRAINT `character_achievement_unlocks_achievement_id_achievements_id_fk` FOREIGN KEY (`achievement_id`) REFERENCES `achievements`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `leaderboard_entries` ADD CONSTRAINT `leaderboard_entries_leaderboard_id_leaderboards_id_fk` FOREIGN KEY (`leaderboard_id`) REFERENCES `leaderboards`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `character_abilities` ADD CONSTRAINT `character_abilities_character_id_characters_id_fk` FOREIGN KEY (`character_id`) REFERENCES `characters`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `character_abilities` ADD CONSTRAINT `character_abilities_ability_id_abilities_id_fk` FOREIGN KEY (`ability_id`) REFERENCES `abilities`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `character_modifiers` ADD CONSTRAINT `character_modifiers_character_id_characters_id_fk` FOREIGN KEY (`character_id`) REFERENCES `characters`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `character_modifiers` ADD CONSTRAINT `character_modifiers_modifier_id_modifiers_id_fk` FOREIGN KEY (`modifier_id`) REFERENCES `modifiers`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `character_skills` ADD CONSTRAINT `character_skills_character_id_characters_id_fk` FOREIGN KEY (`character_id`) REFERENCES `characters`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `character_skills` ADD CONSTRAINT `character_skills_skill_id_skills_id_fk` FOREIGN KEY (`skill_id`) REFERENCES `skills`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `character_stats` ADD CONSTRAINT `character_stats_character_id_characters_id_fk` FOREIGN KEY (`character_id`) REFERENCES `characters`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `auth_providers` ADD CONSTRAINT `auth_providers_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `login_sessions` ADD CONSTRAINT `login_sessions_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `users` ADD CONSTRAINT `users_role_id_roles_id_fk` FOREIGN KEY (`role_id`) REFERENCES `roles`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `answers` ADD CONSTRAINT `answers_question_id_questions_id_fk` FOREIGN KEY (`question_id`) REFERENCES `questions`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `lesson_sections` ADD CONSTRAINT `lesson_sections_lesson_id_lessons_id_fk` FOREIGN KEY (`lesson_id`) REFERENCES `lessons`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `lessons` ADD CONSTRAINT `lessons_language_id_languages_id_fk` FOREIGN KEY (`language_id`) REFERENCES `languages`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `questions` ADD CONSTRAINT `questions_quiz_id_quizzes_id_fk` FOREIGN KEY (`quiz_id`) REFERENCES `quizzes`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `quizzes` ADD CONSTRAINT `quizzes_lesson_id_lessons_id_fk` FOREIGN KEY (`lesson_id`) REFERENCES `lessons`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `audio_feedback` ADD CONSTRAINT `audio_feedback_audio_upload_id_audio_uploads_id_fk` FOREIGN KEY (`audio_upload_id`) REFERENCES `audio_uploads`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `character_quest_progress` ADD CONSTRAINT `character_quest_progress_quest_id_quests_id_fk` FOREIGN KEY (`quest_id`) REFERENCES `quests`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `quest_objective_links` ADD CONSTRAINT `quest_objective_links_quest_id_quests_id_fk` FOREIGN KEY (`quest_id`) REFERENCES `quests`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `quest_objective_links` ADD CONSTRAINT `quest_objective_links_objective_id_quest_objectives_id_fk` FOREIGN KEY (`objective_id`) REFERENCES `quest_objectives`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `quest_rewards` ADD CONSTRAINT `quest_rewards_quest_id_quests_id_fk` FOREIGN KEY (`quest_id`) REFERENCES `quests`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `quests` ADD CONSTRAINT `quests_campaign_id_campaigns_id_fk` FOREIGN KEY (`campaign_id`) REFERENCES `campaigns`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `party_members` ADD CONSTRAINT `party_members_party_id_parties_id_fk` FOREIGN KEY (`party_id`) REFERENCES `parties`(`id`) ON DELETE no action ON UPDATE no action;