CREATE TABLE `playable_species` (
	`id` varchar(36) NOT NULL,
	`name` varchar(100) NOT NULL,
	`description` text,
	`alignment` varchar(50),
	`size_category` varchar(50),
	`movement_type` varchar(50),
	`base_movement_speed` int,
	`visual_trait` varchar(100),
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `playable_species_id` PRIMARY KEY(`id`),
	CONSTRAINT `playable_species_name_unique` UNIQUE(`name`)
);
--> statement-breakpoint
CREATE TABLE `playable_species_abilities` (
	`id` varchar(36) NOT NULL,
	`species_id` varchar(36) NOT NULL,
	`ability_name` varchar(100) NOT NULL,
	`description` text,
	`is_passive` boolean DEFAULT false,
	CONSTRAINT `playable_species_abilities_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `playable_species_lore` (
	`id` varchar(36) NOT NULL,
	`species_id` varchar(36) NOT NULL,
	`lore_entry` text NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `playable_species_lore_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `playable_species_stat_bonuses` (
	`id` varchar(36) NOT NULL,
	`species_id` varchar(36) NOT NULL,
	`stat_name` varchar(50) NOT NULL,
	`bonus_value` int DEFAULT 0,
	CONSTRAINT `playable_species_stat_bonuses_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `playable_species_tags` (
	`id` varchar(36) NOT NULL,
	`species_id` varchar(36) NOT NULL,
	`tag` varchar(50),
	CONSTRAINT `playable_species_tags_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `playable_stats` (
	`id` varchar(36) NOT NULL,
	`name` varchar(50) NOT NULL,
	`display_name` varchar(100) NOT NULL,
	`description` text,
	`is_active` boolean DEFAULT true,
	`sort_order` int DEFAULT 0,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `playable_stats_id` PRIMARY KEY(`id`),
	CONSTRAINT `playable_stats_name_unique` UNIQUE(`name`)
);
--> statement-breakpoint
DROP TABLE `character_species`;--> statement-breakpoint
DROP TABLE `species_abilities`;--> statement-breakpoint
DROP TABLE `species_lore`;--> statement-breakpoint
DROP TABLE `species_stat_bonuses`;--> statement-breakpoint
DROP TABLE `species_tags`;--> statement-breakpoint
DROP TABLE `character_tags`;--> statement-breakpoint
ALTER TABLE `character_stats` DROP INDEX `character_stats_name_unique`;--> statement-breakpoint
ALTER TABLE `character_stats` ADD `character_id` varchar(36) NOT NULL;--> statement-breakpoint
ALTER TABLE `character_stats` ADD `stat_name` varchar(50) NOT NULL;--> statement-breakpoint
ALTER TABLE `character_stats` ADD `stat_value` int DEFAULT 0;--> statement-breakpoint
ALTER TABLE `character_stats` DROP COLUMN `name`;--> statement-breakpoint
ALTER TABLE `character_stats` DROP COLUMN `display_name`;--> statement-breakpoint
ALTER TABLE `character_stats` DROP COLUMN `description`;--> statement-breakpoint
ALTER TABLE `character_stats` DROP COLUMN `is_active`;--> statement-breakpoint
ALTER TABLE `character_stats` DROP COLUMN `sort_order`;--> statement-breakpoint
ALTER TABLE `character_stats` DROP COLUMN `created_at`;--> statement-breakpoint
ALTER TABLE `character_stats` DROP COLUMN `updated_at`;