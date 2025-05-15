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
CREATE TABLE `character_passives` (
	`id` varchar(36) NOT NULL,
	`name` varchar(100) NOT NULL,
	`description` text,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `character_passives_id` PRIMARY KEY(`id`),
	CONSTRAINT `character_passives_name_unique` UNIQUE(`name`)
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
	`name` varchar(50) NOT NULL,
	`display_name` varchar(100) NOT NULL,
	`description` text,
	`is_active` boolean DEFAULT true,
	`sort_order` int DEFAULT 0,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `character_stats_id` PRIMARY KEY(`id`),
	CONSTRAINT `character_stats_name_unique` UNIQUE(`name`)
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
CREATE TABLE `class_enrollments` (
	`id` varchar(36) NOT NULL,
	`class_id` varchar(36) NOT NULL,
	`student_id` varchar(36) NOT NULL,
	`status` varchar(20) DEFAULT 'active',
	`joined_at` timestamp DEFAULT (now()),
	CONSTRAINT `class_enrollments_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `classes` (
	`id` varchar(36) NOT NULL,
	`teacher_id` varchar(36) NOT NULL,
	`name` varchar(255) NOT NULL,
	`description` text,
	`join_code` varchar(20) NOT NULL,
	`max_students` int,
	`is_active` boolean DEFAULT true,
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `classes_id` PRIMARY KEY(`id`),
	CONSTRAINT `classes_join_code_unique` UNIQUE(`join_code`)
);
--> statement-breakpoint
CREATE TABLE `teacher_profiles` (
	`user_id` varchar(36) NOT NULL,
	`school_name` varchar(255),
	`department` varchar(100),
	`bio` text,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `teacher_profiles_user_id` PRIMARY KEY(`user_id`)
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
CREATE TABLE `refresh_tokens` (
	`id` varchar(36) NOT NULL,
	`user_id` varchar(36) NOT NULL,
	`token` varchar(255) NOT NULL,
	`is_revoked` boolean DEFAULT false,
	`created_at` timestamp DEFAULT (now()),
	`expires_at` timestamp NOT NULL,
	CONSTRAINT `refresh_tokens_id` PRIMARY KEY(`id`)
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
	`username` varchar(100) NOT NULL,
	`display_name` varchar(100),
	`gender_identity` varchar(100),
	`pronouns` varchar(100),
	`is_verified` boolean DEFAULT false,
	`is_active` boolean DEFAULT true,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_email_unique` UNIQUE(`email`),
	CONSTRAINT `users_username_unique` UNIQUE(`username`)
);
--> statement-breakpoint
CREATE TABLE `armor_details` (
	`id` varchar(36) NOT NULL,
	`item_id` varchar(36) NOT NULL,
	`defense_power` int DEFAULT 0,
	`weight` int DEFAULT 0,
	`resistances` text,
	CONSTRAINT `armor_details_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `character_equipment` (
	`id` varchar(36) NOT NULL,
	`character_id` varchar(36) NOT NULL,
	`slot_id` varchar(36) NOT NULL,
	`item_id` varchar(36) NOT NULL,
	`equipped_at` timestamp DEFAULT (now()),
	CONSTRAINT `character_equipment_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `character_inventory` (
	`id` varchar(36) NOT NULL,
	`character_id` varchar(36) NOT NULL,
	`item_id` varchar(36) NOT NULL,
	`quantity` int DEFAULT 1,
	`acquired_at` timestamp DEFAULT (now()),
	CONSTRAINT `character_inventory_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `equipment_slots` (
	`id` varchar(36) NOT NULL,
	`name` varchar(50) NOT NULL,
	`description` text,
	CONSTRAINT `equipment_slots_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `item_modifiers` (
	`id` varchar(36) NOT NULL,
	`item_id` varchar(36) NOT NULL,
	`modifier_id` varchar(36) NOT NULL,
	`effect_description` text,
	CONSTRAINT `item_modifiers_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `items` (
	`id` varchar(36) NOT NULL,
	`name` varchar(255) NOT NULL,
	`type` varchar(50) NOT NULL,
	`description` text,
	`rarity` varchar(50),
	`base_value` int DEFAULT 0,
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `items_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `potion_details` (
	`id` varchar(36) NOT NULL,
	`item_id` varchar(36) NOT NULL,
	`effect` text,
	`duration_seconds` int,
	CONSTRAINT `potion_details_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `weapon_details` (
	`id` varchar(36) NOT NULL,
	`item_id` varchar(36) NOT NULL,
	`attack_power` int DEFAULT 0,
	`attack_speed` int DEFAULT 0,
	`special_effect` text,
	CONSTRAINT `weapon_details_id` PRIMARY KEY(`id`)
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
CREATE TABLE `playable_class_passives` (
	`id` varchar(36) NOT NULL,
	`class_id` varchar(36) NOT NULL,
	`name` varchar(100) NOT NULL,
	`effect` text,
	CONSTRAINT `playable_class_passives_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `playable_class_stat_bonuses` (
	`id` varchar(36) NOT NULL,
	`class_id` varchar(36) NOT NULL,
	`stat_name` varchar(50) NOT NULL,
	`stat_bonus` int NOT NULL DEFAULT 0,
	CONSTRAINT `playable_class_stat_bonuses_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `playable_class_tag_links` (
	`id` varchar(36) NOT NULL,
	`class_id` varchar(36) NOT NULL,
	`tag_id` varchar(36) NOT NULL,
	CONSTRAINT `playable_class_tag_links_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `playable_classes` (
	`id` varchar(36) NOT NULL,
	`name` varchar(100) NOT NULL,
	`description` text,
	`lore` text,
	`icon_url` varchar(255),
	`is_playable` boolean DEFAULT true,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `playable_classes_id` PRIMARY KEY(`id`),
	CONSTRAINT `playable_classes_name_unique` UNIQUE(`name`)
);
--> statement-breakpoint
CREATE TABLE `playable_tags` (
	`id` varchar(36) NOT NULL,
	`name` varchar(50) NOT NULL,
	`description` text,
	`is_active` boolean DEFAULT true,
	`sort_order` int DEFAULT 0,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `playable_tags_id` PRIMARY KEY(`id`),
	CONSTRAINT `playable_tags_name_unique` UNIQUE(`name`)
);
--> statement-breakpoint
CREATE TABLE `character_species` (
	`id` varchar(36) NOT NULL,
	`name` varchar(100) NOT NULL,
	`description` text,
	`alignment` varchar(50),
	`size_category` varchar(50),
	`movement_type` varchar(50),
	`base_movement_speed` int,
	`visual_trait` varchar(100),
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `character_species_id` PRIMARY KEY(`id`),
	CONSTRAINT `character_species_name_unique` UNIQUE(`name`)
);
--> statement-breakpoint
CREATE TABLE `species_abilities` (
	`id` varchar(36) NOT NULL,
	`species_id` varchar(36) NOT NULL,
	`ability_name` varchar(100) NOT NULL,
	`description` text,
	`is_passive` boolean DEFAULT false,
	CONSTRAINT `species_abilities_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `species_lore` (
	`id` varchar(36) NOT NULL,
	`species_id` varchar(36) NOT NULL,
	`lore_entry` text NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `species_lore_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `species_stat_bonuses` (
	`id` varchar(36) NOT NULL,
	`species_id` varchar(36) NOT NULL,
	`stat_name` varchar(50) NOT NULL,
	`bonus_value` int DEFAULT 0,
	CONSTRAINT `species_stat_bonuses_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `species_tags` (
	`id` varchar(36) NOT NULL,
	`species_id` varchar(36) NOT NULL,
	`tag` varchar(50),
	CONSTRAINT `species_tags_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `character_tags` (
	`id` varchar(36) NOT NULL,
	`name` varchar(50) NOT NULL,
	`description` text,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `character_tags_id` PRIMARY KEY(`id`),
	CONSTRAINT `character_tags_name_unique` UNIQUE(`name`)
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
CREATE TABLE `admin_logs` (
	`id` varchar(36) NOT NULL,
	`admin_id` varchar(36) NOT NULL,
	`action` varchar(255) NOT NULL,
	`details` text,
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `admin_logs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `bans` (
	`id` varchar(36) NOT NULL,
	`user_id` varchar(36) NOT NULL,
	`reason` text NOT NULL,
	`banned_by` varchar(36) NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	`expires_at` timestamp,
	CONSTRAINT `bans_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `settings` (
	`id` varchar(36) NOT NULL,
	`key` varchar(255) NOT NULL,
	`value` text NOT NULL,
	`description` text,
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `settings_id` PRIMARY KEY(`id`),
	CONSTRAINT `settings_key_unique` UNIQUE(`key`)
);
--> statement-breakpoint
CREATE TABLE `support_tickets` (
	`id` varchar(36) NOT NULL,
	`user_id` varchar(36) NOT NULL,
	`subject` varchar(255) NOT NULL,
	`description` text NOT NULL,
	`status` varchar(50) DEFAULT 'open',
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`resolved_at` timestamp,
	CONSTRAINT `support_tickets_id` PRIMARY KEY(`id`)
);
