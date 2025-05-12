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
