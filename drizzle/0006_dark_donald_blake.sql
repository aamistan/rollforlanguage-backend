CREATE TABLE `refresh_tokens` (
	`id` varchar(36) NOT NULL,
	`user_id` varchar(36) NOT NULL,
	`token` varchar(255) NOT NULL,
	`is_revoked` boolean DEFAULT false,
	`created_at` timestamp DEFAULT (now()),
	`expires_at` timestamp NOT NULL,
	CONSTRAINT `refresh_tokens_id` PRIMARY KEY(`id`)
);
