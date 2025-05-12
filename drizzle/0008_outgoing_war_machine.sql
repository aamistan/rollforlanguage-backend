CREATE TABLE `character_classes` (
	`id` varchar(36) NOT NULL,
	`name` varchar(100) NOT NULL,
	`description` text,
	`lore` text,
	`icon_url` varchar(255),
	`is_playable` boolean DEFAULT true,
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `character_classes_id` PRIMARY KEY(`id`),
	CONSTRAINT `character_classes_name_unique` UNIQUE(`name`)
);
--> statement-breakpoint
CREATE TABLE `class_passives` (
	`id` varchar(36) NOT NULL,
	`class_id` varchar(36) NOT NULL,
	`name` varchar(100) NOT NULL,
	`effect` text,
	CONSTRAINT `class_passives_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `class_stat_bonuses` (
	`id` varchar(36) NOT NULL,
	`class_id` varchar(36) NOT NULL,
	`stat_name` varchar(50) NOT NULL,
	`stat_bonus` int DEFAULT 0,
	CONSTRAINT `class_stat_bonuses_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `class_tag_links` (
	`id` varchar(36) NOT NULL,
	`class_id` varchar(36) NOT NULL,
	`tag_id` varchar(36) NOT NULL,
	CONSTRAINT `class_tag_links_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `class_tags` (
	`id` varchar(36) NOT NULL,
	`name` varchar(50) NOT NULL,
	CONSTRAINT `class_tags_id` PRIMARY KEY(`id`),
	CONSTRAINT `class_tags_name_unique` UNIQUE(`name`)
);
