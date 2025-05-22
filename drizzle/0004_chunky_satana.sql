CREATE TABLE `playable_tag_categories` (
	`id` varchar(128) NOT NULL,
	`name` varchar(64) NOT NULL,
	`display_name` varchar(128),
	`description` text,
	`color_hex` varchar(7),
	`sort_order` int DEFAULT 0,
	`is_active` boolean DEFAULT true,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `playable_tag_categories_id` PRIMARY KEY(`id`),
	CONSTRAINT `playable_tag_categories_name_unique` UNIQUE(`name`)
);
--> statement-breakpoint
CREATE TABLE `playable_tag_category_links` (
	`tag_id` varchar(36) NOT NULL,
	`category_id` varchar(128) NOT NULL,
	`is_primary` boolean DEFAULT false,
	CONSTRAINT `playable_tag_category_links_tag_id_category_id_pk` PRIMARY KEY(`tag_id`,`category_id`)
);
