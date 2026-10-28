import { z } from 'zod';

export const AchievementIdSchema = z.enum([
  'first_blood',
  'five_puzzles',
  'ten_puzzles',
  'cipher_master',
  'item_master',
  'secret_master',
  'weekly_streak',
  'hundred_points',
]);

export type AchievementId = z.infer<typeof AchievementIdSchema>;

export const AchievementSchema = z.object({
  id: AchievementIdSchema,
  title: z.string(),
  description: z.string(),
  icon: z.string(),
});

export type Achievement = z.infer<typeof AchievementSchema>;

export const DailyProgressSchema = z.object({
  score: z.number().int().min(0).default(0),
  solvedCipher: z.number().int().min(0).default(0),
  solvedItem: z.number().int().min(0).default(0),
  solvedSecret: z.number().int().min(0).default(0),
  unlockedAchievements: z.array(AchievementIdSchema).default([]),
});

export type DailyProgress = z.infer<typeof DailyProgressSchema>;
