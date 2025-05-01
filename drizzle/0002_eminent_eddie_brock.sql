ALTER TABLE `character_achievement_unlocks` DROP FOREIGN KEY `character_achievement_unlocks_achievement_id_achievements_id_fk`;
--> statement-breakpoint
ALTER TABLE `leaderboard_entries` DROP FOREIGN KEY `leaderboard_entries_leaderboard_id_leaderboards_id_fk`;
--> statement-breakpoint
ALTER TABLE `character_abilities` DROP FOREIGN KEY `character_abilities_character_id_characters_id_fk`;
--> statement-breakpoint
ALTER TABLE `character_abilities` DROP FOREIGN KEY `character_abilities_ability_id_abilities_id_fk`;
--> statement-breakpoint
ALTER TABLE `character_modifiers` DROP FOREIGN KEY `character_modifiers_character_id_characters_id_fk`;
--> statement-breakpoint
ALTER TABLE `character_modifiers` DROP FOREIGN KEY `character_modifiers_modifier_id_modifiers_id_fk`;
--> statement-breakpoint
ALTER TABLE `character_skills` DROP FOREIGN KEY `character_skills_character_id_characters_id_fk`;
--> statement-breakpoint
ALTER TABLE `character_skills` DROP FOREIGN KEY `character_skills_skill_id_skills_id_fk`;
--> statement-breakpoint
ALTER TABLE `character_stats` DROP FOREIGN KEY `character_stats_character_id_characters_id_fk`;
--> statement-breakpoint
ALTER TABLE `auth_providers` DROP FOREIGN KEY `auth_providers_user_id_users_id_fk`;
--> statement-breakpoint
ALTER TABLE `login_sessions` DROP FOREIGN KEY `login_sessions_user_id_users_id_fk`;
--> statement-breakpoint
ALTER TABLE `users` DROP FOREIGN KEY `users_role_id_roles_id_fk`;
--> statement-breakpoint
ALTER TABLE `answers` DROP FOREIGN KEY `answers_question_id_questions_id_fk`;
--> statement-breakpoint
ALTER TABLE `lesson_sections` DROP FOREIGN KEY `lesson_sections_lesson_id_lessons_id_fk`;
--> statement-breakpoint
ALTER TABLE `lessons` DROP FOREIGN KEY `lessons_language_id_languages_id_fk`;
--> statement-breakpoint
ALTER TABLE `questions` DROP FOREIGN KEY `questions_quiz_id_quizzes_id_fk`;
--> statement-breakpoint
ALTER TABLE `quizzes` DROP FOREIGN KEY `quizzes_lesson_id_lessons_id_fk`;
--> statement-breakpoint
ALTER TABLE `audio_feedback` DROP FOREIGN KEY `audio_feedback_audio_upload_id_audio_uploads_id_fk`;
--> statement-breakpoint
ALTER TABLE `character_quest_progress` DROP FOREIGN KEY `character_quest_progress_quest_id_quests_id_fk`;
--> statement-breakpoint
ALTER TABLE `quest_objective_links` DROP FOREIGN KEY `quest_objective_links_quest_id_quests_id_fk`;
--> statement-breakpoint
ALTER TABLE `quest_objective_links` DROP FOREIGN KEY `quest_objective_links_objective_id_quest_objectives_id_fk`;
--> statement-breakpoint
ALTER TABLE `quest_rewards` DROP FOREIGN KEY `quest_rewards_quest_id_quests_id_fk`;
--> statement-breakpoint
ALTER TABLE `quests` DROP FOREIGN KEY `quests_campaign_id_campaigns_id_fk`;
--> statement-breakpoint
ALTER TABLE `party_members` DROP FOREIGN KEY `party_members_party_id_parties_id_fk`;
