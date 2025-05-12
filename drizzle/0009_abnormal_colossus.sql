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
