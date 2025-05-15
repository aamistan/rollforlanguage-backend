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
ALTER TABLE `class_stat_bonuses` MODIFY COLUMN `stat_bonus` int NOT NULL;--> statement-breakpoint
ALTER TABLE `character_classes` ADD `updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP;--> statement-breakpoint
ALTER TABLE `class_tags` ADD `description` text;--> statement-breakpoint
ALTER TABLE `class_tags` ADD `created_at` timestamp DEFAULT (now());--> statement-breakpoint
ALTER TABLE `class_tags` ADD `updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP;