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
--> statement-breakpoint
ALTER TABLE `users` ADD `username` varchar(100) NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD CONSTRAINT `users_username_unique` UNIQUE(`username`);