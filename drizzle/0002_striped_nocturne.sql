CREATE TABLE `playable_passives` (
	`id` varchar(36) NOT NULL,
	`name` varchar(100) NOT NULL,
	`description` text,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `playable_passives_id` PRIMARY KEY(`id`),
	CONSTRAINT `playable_passives_name_unique` UNIQUE(`name`)
);
--> statement-breakpoint
DROP TABLE `character_passives`;